import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reviews } from '../services/api'

// Hook to fetch reviews for a property
export function useReviews(propertyType, propertyId) {
  return useQuery({
    queryKey: ['reviews', propertyType, propertyId],
    queryFn: () => reviews.getReviews(propertyType, propertyId).then(res => res.data),
    enabled: !!propertyType && !!propertyId
  })
}

// Hook to create a review
export function useCreateReview(propertyType, propertyId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => reviews.createReview(propertyType, propertyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', propertyType, propertyId])
    }
  })
}

// Hook to delete a review
export function useDeleteReview(propertyType, propertyId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reviewId) => reviews.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', propertyType, propertyId])
    }
  })
}
