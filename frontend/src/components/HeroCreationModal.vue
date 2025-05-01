<template>
  <Modal @close="close">
    <template #header>
      <h3>Create Your Hero</h3>
    </template>
    <template #body>
      <div class="wizard">
        <div v-if="step === 1" class="step">
          <label>Name</label>
          <input v-model="localHero.name" placeholder="Enter hero name" />
        </div>
        <div v-else-if="step === 2" class="step">
          <RaceSelector v-model:selectedRace="localHero.race" />
        </div>
        <div v-else-if="step === 3" class="step">
          <BackgroundSelector v-model:selectedBackground="localHero.background" />
        </div>
        <div v-else-if="step === 4" class="step">
          <AvatarSelector :race="localHero.race" v-model:selectedAvatar="localHero.avatar" />
        </div>
      </div>
    </template>
    <template #footer>
      <button @click="prev" :disabled="step === 1">Back</button>
      <button v-if="step < 4" @click="next" :disabled="!canNext">Next</button>
      <button v-else @click="createHero" :disabled="!canCreate">Create</button>
    </template>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from '@/components/Modal.vue'
import RaceSelector from '@/components/RaceSelector.vue'
import BackgroundSelector from '@/components/BackgroundSelector.vue'
import AvatarSelector from '@/components/AvatarSelector.vue'

const emit = defineEmits(['close', 'created'])
const step = ref(1)
const localHero = ref({ name: '', race: null, background: null, avatar: null })

const canNext = computed(() => {
  if (step.value === 1) return !!localHero.value.name
  if (step.value === 2) return !!localHero.value.race
  if (step.value === 3) return !!localHero.value.background
  return true
})
const canCreate = computed(
  () =>
    localHero.value.name &&
    localHero.value.race &&
    localHero.value.background &&
    localHero.value.avatar,
)

function next() {
  if (canNext.value && step.value < 4) step.value++
}
function prev() {
  if (step.value > 1) step.value--
}
function close() {
  emit('close')
}
function createHero() {
  emit('created', { ...localHero.value, level: 1, imageUrl: '' })
}
</script>

<style scoped>
.wizard {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.step label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
}
button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  font-family: 'Cinzel', serif;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
