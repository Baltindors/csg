import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import { useHeroStore } from '@/stores/heroStore'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/', name: 'home', component: HomePage },
  { path: '/:pathMatch(.*)*', redirect: { name: 'login' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Route guard: ensure user is authenticated (token present), otherwise redirect to login
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const heroStore = useHeroStore()

  // Redirect to login if not logged in
  if (!auth.token && to.name !== 'login') {
    return next({ name: 'login' })
  }

  // Prevent logged in user from accessing login page
  if (auth.token && to.name === 'login') {
    return next({ name: 'home' })
  }

  // If logged in, fetch hero data (optional hero guard)
  if (auth.token) {
    await heroStore.fetchHero().catch(() => {})
    // If no hero yet and not on home, redirect to home (to trigger creation)
    if (!heroStore.hero && to.name !== 'home') {
      return next({ name: 'home' })
    }
  }

  next()
})

export default router
