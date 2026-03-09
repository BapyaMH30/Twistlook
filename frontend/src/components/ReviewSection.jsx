import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reviews } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function ReviewSection({ propertyId, propertyType }) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['reviews', propertyType, propertyId],
    queryFn: () => reviews.getReviews(propertyType, propertyId).then(res => res.data)
  })

  const mutation = useMutation({
    mutationFn: (data) => reviews.createReview(propertyType, propertyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', propertyType, propertyId])
      setComment('')
      setRating(5)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({ rating, comment })
  }

  if (isLoading) return <div>Loading reviews...</div>

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">
        Reviews ({data?.count || 0})
        {data?.avgRating > 0 && (
          <span className="ml-2 text-yellow-500">
            {'★'.repeat(Math.round(data.avgRating))}
            {'☆'.repeat(5 - Math.round(data.avgRating))}
            <span className="text-gray-500 text-sm ml-1">({data.avgRating.toFixed(1)})</span>
          </span>
        )}
      </h3>

      {user && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-2"
            rows={3}
          />
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {mutation.isPending ? 'Submitting...' : 'Submit Review'}
          </button>
          {mutation.isError && (
            <p className="text-red-500 text-sm mt-2">{mutation.error.response?.data?.error}</p>
          )}
        </form>
      )}

      <div className="space-y-4">
        {data?.reviews?.map((review) => (
          <div key={review._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-medium">{review.userId?.name || 'Anonymous'}</span>
                <span className="ml-2 text-yellow-500">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </span>
              </div>
              <span className="text-gray-400 text-sm">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            {review.comment && <p className="mt-2 text-gray-600">{review.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
