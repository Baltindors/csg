<template>
    <div class="home-container">
      <button class="logout-button" @click="logout">Logout</button>
      <h1>Welcome, {{ auth.email }}</h1>
      <p>This is the main homepage of the game.</p>
      <!-- future game content goes here -->
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/authStore'
  
  const auth = useAuthStore()
  const router = useRouter()
  
  function logout() {
    auth.logout()
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .home-container {
    position: relative;
    max-width: 800px;
    margin: auto;
    text-align: center;
    padding: 2rem;
  }
  
  .logout-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    background: var(--color-accent);
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-family: 'Cinzel', serif;
  }
  .logout-button:hover {
    background: var(--color-primary);
  }
  </style>