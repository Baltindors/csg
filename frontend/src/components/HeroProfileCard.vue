<template>
  <div class="hero-profile-card">
    <!-- Show “Choose Your Hero” when no hero -->
    <div v-if="!hero || !hero.name" class="create-hero">
      <button @click="openModal = true" class="create-button">Choose Your Hero</button>
    </div>

    <!-- Show hero details once created -->
    <div v-else class="profile-info">
      <img :src="hero.imageUrl" alt="Hero Avatar" class="hero-image" />
      <h2 class="hero-name">{{ hero.name }}</h2>
      <p class="hero-race">Race: {{ hero.race }}</p>
      <p class="hero-level">Level: {{ hero.level }}</p>
      <p class="hero-background">Background: {{ hero.background.title }}</p>
    </div>

    <!-- Creation wizard -->
    <HeroCreationModal v-if="openModal" @close="openModal = false" @created="handleCreated" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import HeroCreationModal from '@/components/HeroCreationModal.vue'

// Pull in current hero prop (may be null)
const props = defineProps({
  hero: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['created'])

// Modal always starts closed; only opens on click
const openModal = ref(false)

// Re-open modal if parent ever clears the hero
watch(
  () => props.hero,
  (h) => {
    if (!h || !h.name) openModal.value = false
  },
)

// When creation finishes, bubble it up
function handleCreated(newHero) {
  emit('created', newHero)
  openModal.value = false
}
</script>

<style scoped>
.hero-profile-card {
  max-width: 550px;
  margin: auto;
  padding: 1.5rem;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-background-soft);
  text-align: center;
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
}

.hero-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 2px solid var(--color-primary);
}

.hero-name {
  font-family: 'Cinzel', serif;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.hero-race,
.hero-level,
.hero-background {
  margin: 0.25rem 0;
  color: var(--vt-c-indigo);
  font-size: 0.9rem;
}
</style>
