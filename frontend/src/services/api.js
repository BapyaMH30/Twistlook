import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const auth = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me')
}

export const properties = {
  getLand: (params) => api.get('/properties/land', { params }),
  getLandById: (id) => api.get(`/properties/land/${id}`),
  createLand: (data) => api.post('/properties/land', data),
  getConstruction: (params) => api.get('/properties/construction', { params }),
  getConstructionById: (id) => api.get(`/properties/construction/${id}`),
  createConstruction: (data) => api.post('/properties/construction', data),
  search: (params) => api.get('/properties/search', { params })
}

export const messages = {
  getConversations: () => api.get('/messages'),
  getMessages: (userId) => api.get(`/messages/${userId}`),
  sendMessage: (userId, data) => api.post(`/messages/${userId}`, data)
}

export const reviews = {
  getReviews: (type, propertyId) => api.get(`/reviews/${type}/${propertyId}`),
  createReview: (type, propertyId, data) => api.post(`/reviews/${type}/${propertyId}`, data)
}

export const users = {
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  getUserListings: (id) => api.get(`/users/${id}/listings`)
}

export default api
