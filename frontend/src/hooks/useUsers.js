import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { users } from '../services/api'

// Hook to fetch user profile
export function useUser(userId) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => users.getUser(userId).then(res => res.data),
    enabled: !!userId
  })
}

// Hook to update user profile
export function useUpdateUser(userId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => users.updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['user', userId])
    }
  })
}

// Hook to fetch user's listings
export function useUserListings(userId) {
  return useQuery({
    queryKey: ['userListings', userId],
    queryFn: () => users.getUserListings(userId).then(res => res.data),
    enabled: !!userId
  })
}
