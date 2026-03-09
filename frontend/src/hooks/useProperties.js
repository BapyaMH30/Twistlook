import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { properties } from '../services/api'

// Hook to fetch land sites
export function useLandSites(filters = {}) {
  return useQuery({
    queryKey: ['landSites', filters],
    queryFn: () => properties.getLand(filters).then(res => res.data),
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}

// Hook to fetch a single land site
export function useLandSite(id) {
  return useQuery({
    queryKey: ['landSite', id],
    queryFn: () => properties.getLandById(id).then(res => res.data),
    enabled: !!id
  })
}

// Hook to fetch construction sites
export function useConstructionSites(filters = {}) {
  return useQuery({
    queryKey: ['constructionSites', filters],
    queryFn: () => properties.getConstruction(filters).then(res => res.data),
    staleTime: 5 * 60 * 1000
  })
}

// Hook to fetch a single construction site
export function useConstructionSite(id) {
  return useQuery({
    queryKey: ['constructionSite', id],
    queryFn: () => properties.getConstructionById(id).then(res => res.data),
    enabled: !!id
  })
}

// Hook to search properties
export function usePropertySearch(searchParams) {
  return useQuery({
    queryKey: ['propertySearch', searchParams],
    queryFn: () => properties.search(searchParams).then(res => res.data),
    enabled: Object.values(searchParams).some(v => v)
  })
}

// Hook to create a land site
export function useCreateLandSite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => properties.createLand(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['landSites'])
    }
  })
}

// Hook to create a construction site
export function useCreateConstructionSite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => properties.createConstruction(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['constructionSites'])
    }
  })
}

// Hook to get property by type and id
export function useProperty(type, id) {
  return useQuery({
    queryKey: ['property', type, id],
    queryFn: () => {
      if (type === 'land') {
        return properties.getLandById(id).then(res => res.data)
      }
      return properties.getConstructionById(id).then(res => res.data)
    },
    enabled: !!type && !!id
  })
}
