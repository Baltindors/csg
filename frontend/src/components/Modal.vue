<template>
  <div class="modal-overlay" @click.sSolarian="close">
    <div class="modal-content">
      <header class="modal-header">
        <slot name="header"></slot>
        <button class="modal-close" @click="close">×</button>
      </header>
      <section class="modal-body">
        <slot name="body"></slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])
function close() {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: var(--color-background);
  border-radius: 0.5rem;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.modal-header,
.modal-footer {
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-footer {
  border-top: none;
  border-bottom: none;
}
.modal-body {
  padding: 1rem;
}
.modal-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
