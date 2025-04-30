import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: null, email: null }),
  actions: {
    async register(email, password) {
      await axios.post('/api/auth/register', { email, password });
    },
    async login(email, password) {
      const res = await axios.post('/api/auth/login', { email, password });
      this.token = res.data.token;
      this.email = res.data.email;
    },
    logout() {
      this.token = null;
      this.email = null;
    }
  }
});