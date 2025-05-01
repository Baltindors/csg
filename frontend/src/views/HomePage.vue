<template>
  <div class="home-container">
    <button class="logout-button" @click="logout">Logout</button>
    <div class="content">
      <!-- Hero Profile Card: shows name, level, and image or creation prompt -->
      <HeroProfileCard v-if="hero" :hero="hero" />

      <!-- If hero exists, show Background Card -->
      <HeroBackgroundCard v-if="hero" v-model:background="hero.background" />

      <!-- Actions: start new PvE game -->
      <div class="actions" v-if="hero">
        <button class="pve-button" @click="startPveGame">Start New PvE Game</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useHeroStore } from '@/stores/heroStore'
import HeroProfileCard from '@/components/HeroProfileCard.vue'
import HeroBackgroundCard from '@/components/HeroBackgroundCard.vue'

const auth = useAuthStore()
const heroStore = useHeroStore()
const router = useRouter()

// Fetch current hero on mount
onMounted(() => {
  heroStore.fetchHero().catch(() => {
    /* No hero yet */
  })
})

const hero = computed(() => heroStore.hero)

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
  max-width: 800px;
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
