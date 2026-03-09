import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { messages } from '../services/api'

// Hook to fetch all conversations
export function useConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: () => messages.getConversations().then(res => res.data),
    refetchInterval: 30000 // Refetch every 30 seconds
  })
}

// Hook to fetch messages with a specific user
export function useMessages(userId) {
  return useQuery({
    queryKey: ['messages', userId],
    queryFn: () => messages.getMessages(userId).then(res => res.data),
    enabled: !!userId,
    refetchInterval: 10000 // Refetch every 10 seconds for active chat
  })
}

// Hook to send a message
export function useSendMessage(userId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => messages.sendMessage(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', userId])
      queryClient.invalidateQueries(['conversations'])
    }
  })
}

// Hook to get unread count
export function useUnreadCount() {
  return useQuery({
    queryKey: ['unreadCount'],
    queryFn: async () => {
      try {
        const res = await messages.getConversations()
        const total = res.data.reduce((sum, conv) => sum + (conv.unreadCount || 0), 0)
        return total
      } catch {
        return 0
      }
    },
    refetchInterval: 30000
  })
}
