import { defineStore } from 'pinia'
import axios from 'axios'

export const useHeroStore = defineStore('hero', {
  state: () => ({
    backgrounds: [],
    avatars: [],
    hero: null,
  }),
  actions: {
    async fetchBackgrounds() {
      const res = await axios.get('/api/hero/backgrounds')
      this.backgrounds = res.data
    },
    async fetchAvatars(race) {
      const res = await axios.get(`/api/hero/avatars?race=${race}`)
      this.avatars = res.data
    },
    async createHero(heroData) {
      const res = await axios.post('/api/hero', heroData)
      this.hero = res.data
    },
    async fetchHero() {
      const res = await axios.get('/api/hero')
      this.hero = res.data
    },
  },
})
