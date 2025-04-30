<template>
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
  
      <p class="description">
  Enter the windswept plains of <strong>Zephyria's Battleground</strong>, where strategy, speed, and divine favor decide the fate of warriors. 
  Inspired by the legendary trials of Zephyrus, this high-stakes battleground challenges players to conquer strategic towers, gather vital resources, 
  and rally their forces for war. Whether battling other champions in <em>PvP</em> skirmishes or leading your army against fearsome AI in <em>PvE</em> sieges, 
  every choice carves your path to victory. Gear up, command your troops, and bring down the enemy leader in this epic clash of tactics and tenacity.
</p>

    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/authStore';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const isRegister = ref(false);
  const auth = useAuthStore();
  const router = useRouter();
  
  async function onSubmit() {
    try {
      if (isRegister.value) await auth.register(email.value, password.value);
      await auth.login(email.value, password.value);
      router.push({ name: 'home' })
      } catch (e) {
      alert(e.response?.data?.error || e.message);
    }
  }
  
  function toggleMode() {
    isRegister.value = !isRegister.value;
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 800px;
    margin: auto;
    text-align: center;
    padding: 1rem;
  }
  
  /* Subheader */
  .subheader {
    color: #141414;
  }
  
  /* Banner and form fields share width */
  .banner,
  input[type="email"],
  input[type="password"] {
    width: 70%;
    display: block;
    margin: 0.75rem auto;
    box-sizing: border-box;
  }
  
  /* Responsive: full width on smaller screens */
  @media (max-width: 768px) {
    .banner,
    input[type="email"],
    input[type="password"] {
      width: 100%;
    }
  }
  
  /* Toggle link */
  .toggle {
    color: blue;
    cursor: pointer;
    margin-top: 0.5em;
  }
  
  /* Description paragraph */
  .description {
    margin-top: 1em;
    font-size: 0.9rem;
    color: #141414;
  }

  .login-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/public/background.png') no-repeat center center/cover;
  z-index: -1;
}
  </style>
  