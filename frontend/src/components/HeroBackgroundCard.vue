<template>
  <div class="hero-background-card">
    <h2>Background</h2>
    <div class="background-content" v-html="background"></div>
    <button class="edit-button" @click="openEditor = true">Edit Background</button>

    <Modal v-if="openEditor" @close="openEditor = false">
      <template #header>
        <h3>Edit Hero Background</h3>
      </template>
      <template #body>
        <textarea v-model="editedBackground" class="editor-textarea" />
      </template>
      <template #footer>
        <button @click="saveBackground">Save</button>
        <button @click="openEditor = false">Cancel</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Modal from '@/components/Modal.vue'

const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const openEditor = ref(false)
const editedBackground = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    editedBackground.value = newVal
  },
)

function saveBackground() {
  emit('update:modelValue', editedBackground.value)
  openEditor.value = false
}
</script>

<style scoped>
.hero-background-card {
  border: 2px solid var(--color-border);
  padding: 1rem;
  border-radius: 0.5rem;
  background: var(--color-background-soft);
}
.hero-background-card h2 {
  margin-top: 0;
  font-family: 'Cinzel', serif;
}
.background-content {
  min-height: 100px;
  margin-bottom: 1rem;
}
.edit-button {
  background: var(--color-primary);
  color: var(--vt-c-white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
.edit-button:hover {
  background: var(--color-accent);
}
.editor-textarea {
  width: 100%;
  height: 200px;
  font-family: serif;
}
</style>
