<template>
  <div class="hero-profile-card">
    <!-- Prompt creation if no hero exists -->
    <div v-if="!hero || !hero.name" class="create-hero">
      <button @click="openModal = true" class="create-button">Choose Your Hero</button>
    </div>

    <!-- Show profile when hero exists -->
    <div v-else class="profile-info">
      <img :src="hero.imageUrl" alt="Hero Image" class="hero-image" />
      <h2 class="hero-name">{{ hero.name }}</h2>
      <p class="hero-level">Level {{ hero.level }}</p>
      <p class="hero-email">Account: {{ auth.email }}</p>
    </div>

    <!-- Hero Creation Modal -->
    <HeroCreationModal v-if="openModal" @close="openModal = false" @created="onHeroCreated" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useHeroStore } from '@/stores/heroStore'
import HeroCreationModal from '@/components/HeroCreationModal.vue'

// Access current user email
const auth = useAuthStore()
// Pinia store for hero data
const heroStore = useHeroStore()

// Accept a possibly-null hero
const props = defineProps({
  hero: {
    type: Object,
    default: null,
  },
})

// If there's no hero, start with the modal open
const openModal = ref(!props.hero || !props.hero.name)

// When HeroCreationModal emits “created” with the new hero data:
// 1) persist to backend via Pinia action
// 2) re-fetch the hero to populate the card
// 3) close the modal
async function onHeroCreated(newHeroData) {
  try {
    await heroStore.createHero(newHeroData)
    await heroStore.fetchHero()
    openModal.value = false
  } catch (err) {
    console.error('Error creating hero:', err)
  }
}
</script>

<style scoped>
.hero-profile-card {
  position: relative;
  border: 2px solid var(--color-border);
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: var(--color-background-soft);
  text-align: center;
  width: 550px;
  margin: auto;
}

.create-hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.create-button {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: var(--vt-c-white);
  border: none;
  border-radius: 0.5rem;
  font-family: 'Cinzel', serif;
  cursor: pointer;
  transition: transform 0.2s;
}

.create-button:hover {
  transform: scale(1.05);
}

.profile-info {
  text-align: center;
}

.hero-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem;
  border: 2px solid var(--color-primary);
}

.hero-name {
  font-family: 'Cinzel', serif;
  margin: 0.5rem 0;
  color: var(--color-primary);
}

.hero-level {
  margin: 0.25rem 0;
  font-weight: bold;
}

.hero-email {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--vt-c-indigo);
}
</style>
