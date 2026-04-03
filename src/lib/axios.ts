import axios from 'axios'
import { store } from '@/store'
import { setTokens, logoutUser } from '@/features/user'

export const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor: attach access token from Redux state
api.interceptors.request.use((config) => {
  const token = store.getState().user.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: auto-refresh on 401
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: string) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token!)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    const axiosError = error as import('axios').AxiosError & { config: import('axios').InternalAxiosRequestConfig & { _retry?: boolean } }
    const originalRequest = axiosError.config

    if (axiosError.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        store.dispatch(logoutUser())
        return Promise.reject(error)
      }

      try {
        const { data } = await axios.post<{ access: string }>('/api/token/refresh/', { refresh: refreshToken })
        const newAccess = data.access
        store.dispatch(setTokens({ accessToken: newAccess }))
        sessionStorage.setItem('accessToken', newAccess)
        processQueue(null, newAccess)
        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        store.dispatch(logoutUser())
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
