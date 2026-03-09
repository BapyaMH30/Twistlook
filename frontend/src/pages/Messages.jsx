import { useState, useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { messages } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function Messages() {
  const { userId } = useParams()
  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState('')
  const queryClient = useQueryClient()
  const messagesEndRef = useRef(null)

  const { data: conversations, isLoading: convsLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => messages.getConversations().then(res => res.data),
    enabled: !!user
  })

  const { data: threadMessages, isLoading: threadLoading } = useQuery({
    queryKey: ['messages', userId],
    queryFn: () => messages.getMessages(userId).then(res => res.data),
    enabled: !!userId && !!user
  })

  const sendMutation = useMutation({
    mutationFn: (content) => messages.sendMessage(userId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', userId])
      queryClient.invalidateQueries(['conversations'])
      setNewMessage('')
    }
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [threadMessages])

  if (!user) return <Navigate to="/login" />

  const handleSend = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      sendMutation.mutate(newMessage)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Messages</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '70vh' }}>
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r overflow-y-auto">
            {convsLoading ? (
              <div className="p-4 text-center">Loading...</div>
            ) : conversations?.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No conversations yet</div>
            ) : (
              conversations?.map((conv) => (
                <Link
                  key={conv._id}
                  to={`/messages/${conv._id}`}
                  className={`block p-4 border-b hover:bg-gray-50 ${
                    userId === conv._id ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{conv.otherUser.name}</span>
                    {conv.unreadCount > 0 && (
                      <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm truncate mt-1">
                    {conv.lastMessage.content}
                  </p>
                </Link>
              ))
            )}
          </div>

          {/* Message Thread */}
          <div className="flex-1 flex flex-col">
            {userId ? (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {threadLoading ? (
                    <div className="text-center">Loading messages...</div>
                  ) : threadMessages?.length === 0 ? (
                    <div className="text-center text-gray-500">Start the conversation</div>
                  ) : (
                    threadMessages?.map((msg) => (
                      <div
                        key={msg._id}
                        className={`flex ${
                          msg.sender._id === user.id ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.sender._id === user.id
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.sender._id === user.id ? 'text-primary-100' : 'text-gray-400'
                            }`}
                          >
                            {new Date(msg.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSend} className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      type="submit"
                      disabled={sendMutation.isPending}
                      className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
