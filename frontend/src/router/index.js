import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import { useHeroStore } from '@/stores/heroStore'

const routes = [
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/', name: 'home', component: HomePage },
  { path: '/:pathMatch(.*)*', redirect: { name: 'login' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Route guard: if no hero exists, stay on Home and trigger creation modal
router.beforeEach(async (to, from, next) => {
  const heroStore = useHeroStore()
  // Ensure hero data is loaded
  await heroStore.fetchHero().catch(() => {})

  const hasHero = !!heroStore.hero
  if (!hasHero && to.name !== 'home') {
    // Redirect to home to create hero
    return next({ name: 'home' })
  }
  if (hasHero && to.name === 'login') {
    // Prevent going back to login once hero exists
    return next({ name: 'home' })
  }
  next()
})

export default router
