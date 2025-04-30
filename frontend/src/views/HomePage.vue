<template>
  <div class="home-container">
    <button class="logout-button" @click="logout">Logout</button>
    <div class="content">
      <!-- Hero Profile Card: shows name, level, and image -->
      <HeroProfileCard :hero="hero" />

      <!-- Hero Background Card: editable modal with rich text -->
      <HeroBackgroundCard v-model:background="hero.background" />

      <!-- Actions: start new PvE game -->
      <div class="actions">
        <button class="pve-button" @click="startPveGame">Start New PvE Game</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import HeroProfileCard from '@/components/HeroProfileCard.vue'
import HeroBackgroundCard from '@/components/HeroBackgroundCard.vue'

const auth = useAuthStore()
const router = useRouter()

// Placeholder hero data; replace with API call later
const hero = ref({
  name: 'Unnamed Hero',
  level: 1,
  imageUrl: '/default-hero.png',
  background: 'This is your hero background story.',
})

function logout() {
  auth.logout()
  router.push({ name: 'login' })
}

function startPveGame() {
  // TODO: implement PvE game start logic
  console.log('Starting new PvE game...')
}
</script>

<style scoped>
.home-container {
  position: relative;
  margin: auto;
  padding: 2rem;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.actions {
  text-align: center;
}

.pve-button {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: var(--vt-c-white);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: 'Cinzel', serif;
}
.pve-button:hover {
  background: var(--color-accent);
}
</style>
