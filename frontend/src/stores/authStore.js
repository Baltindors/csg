// frontend/src/stores/authStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

// 1) Point Axios at your API
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    email: localStorage.getItem('email') || null,
  }),
  actions: {
    // Register doesn’t log you in—just creates the user
    async register(email, password) {
      await axios.post('/api/auth/register', { email, password })
    },

    // Login to get and store the JWT
    async login(email, password) {
      const res = await axios.post('/api/auth/login', { email, password })
      this.token = res.data.token
      this.email = res.data.email

      // 2) Set the Authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

      // 3) Persist across reloads
      localStorage.setItem('token', this.token)
      localStorage.setItem('email', this.email)
    },

    // Clear everything out
    logout() {
      this.token = null
      this.email = null

      // Remove the header so protected endpoints return 401
      delete axios.defaults.headers.common['Authorization']

      // Clear persistence
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    },
  },
})
