<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
/* Make the app fill the viewport */
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

/* Center your routed view (e.g. the login page) */
#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
