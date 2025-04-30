import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'

const routes = [
  // Always have login route first to prevent fallback conflicts
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/', name: 'home', component: HomePage },
  // Catch-all must come last; use named redirect
  { path: '/:pathMatch(.*)*', redirect: { name: 'login' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
