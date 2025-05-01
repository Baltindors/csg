<template>
  <div
    class="login-background"
    @mousemove="handleMouseMove"
    :style="{ backgroundPosition: `${bgX}% ${bgY}%` }"
  >
    <div class="login-container">
      <h1>Zephyria's Battleground</h1>
      <h3 class="subheader">Zephyria Awaits—Swift as Wind, Sharp as Steel.</h3>
      <img src="/bannerOne.png" alt="Game Banner" class="banner" />

      <form @submit.prevent="onSubmit">
        <div>
          <label>Email</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" v-model="password" minlength="6" required />
        </div>
        <button type="submit">{{ isRegister ? 'Register' : 'Login' }}</button>
        <p @click="toggleMode" class="toggle">
          {{ isRegister ? 'Have an account? Login' : 'New user? Create one' }}
        </p>
      </form>
    </div>
    <div class="description">
      <p>
        Enter the windswept plains of <strong>Zephyria's Battleground</strong>, where strategy,
        speed, and divine favor decide the fate of warriors. Inspired by the legendary trials of
        Zephyrus, this high-stakes battleground challenges players to conquer strategic towers,
        gather vital resources, and rally their forces for war. Whether battling other champions in
        <em>PvP</em> skirmishes or leading your army against fearsome AI in <em>PvE</em> sieges,
        every choice carves your path to victory. Gear up, command your troops, and bring down the
        enemy leader in this epic clash of tactics and tenacity.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const isRegister = ref(false)
const auth = useAuthStore()
const router = useRouter()

// Parallax state
const bgX = ref(50)
const bgY = ref(50)

// Update bgX/bgY on mouse move
function handleMouseMove(e) {
  bgX.value = (e.clientX / window.innerWidth) * 80
  bgY.value = (e.clientY / window.innerHeight) * 30
}

async function onSubmit() {
  try {
    if (isRegister.value) await auth.register(email.value, password.value)
    await auth.login(email.value, password.value)
    router.push({ name: 'home' })
  } catch (e) {
    alert(e.response?.data?.error || e.message)
  }
}

function toggleMode() {
  isRegister.value = !isRegister.value
}
</script>

<style scoped>
/* Full-screen background with parallax */
.login-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('/background-image.png') no-repeat center center/cover;
  z-index: 1;
  background-position: 50% 50%;
}

/* Centered login panel lifted above background */
.login-container {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: auto;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 0.5rem;
}

/* Subheader */
.subheader {
  color: #141414;
}

/* Banner and inputs share width */
.banner,
input[type='email'],
input[type='password'] {
  width: 70%;
  display: block;
  margin: 0.75rem auto;
  box-sizing: border-box;
}

/* Mobile: full width */
@media (max-width: 768px) {
  .banner,
  input[type='email'],
  input[type='password'] {
    width: 100%;
  }
}

/* Toggle link */
.toggle {
  color: blue;
  cursor: pointer;
  margin-top: 0.5em;
}

/* Description */
.description {
  margin: 1em auto; /* vertical spacing + center block */
  font-size: 1.2rem;
  color: #e0e0e0;
  max-width: 800px; /* constrain width */
  text-align: center; /* center the text */
  background: rgba(0, 0, 0, 0.7); /* dark overlay at 50% opacity */
  padding: 1.4rem; /* breathing room around the text */
  border-radius: 0.5rem; /* soften the corners */
  line-height: 130%;
}
</style>
