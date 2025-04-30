<template>
  <div class="hero-profile-card">
    <img :src="hero.imageUrl" alt="Hero Image" class="hero-image" />
    <h2 class="hero-name">{{ hero.name }}</h2>
    <p class="hero-level">Level {{ hero.level }}</p>
    <p class="hero-email">Account: {{ auth.email }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  hero: {
    type: Object,
    required: true,
  },
})
const auth = useAuthStore()
</script>

<style scoped>
.hero-profile-card {
  border: 2px solid var(--color-border);
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: var(--color-background-soft);
  text-align: left;
  width: 550px;
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
