<template>
  <div class="race-selector">
    <h4>Select Race</h4>
    <div class="races">
      <div
        v-for="race in races"
        :key="race.id"
        :class="['race-card', { selected: race.id === selectedRace }]"
        @click="selectRace(race.id)"
      >
        <img :src="race.icon" :alt="race.name" class="race-icon" />
        <p>{{ race.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
})
const emit = defineEmits(['update:modelValue'])

// Placeholder race data
const races = ref([
  { id: 'Eldorian', name: 'Eldorian', icon: '/races/Eldorian.png' },
  { id: 'Solarian', name: 'Solarian', icon: '/races/Solarian.png' },
  { id: 'Stoneborn', name: 'Stoneborn', icon: '/races/Stoneborn.png' },
  { id: 'Maritans', name: 'Maritans', icon: '/races/Maritans.png' },
  { id: 'Zephyrians', name: 'Zephyrians', icon: '/races/Zephyrians.png' },
  { id: 'Vortani', name: 'Vortani', icon: '/races/Vortani.png' },
])

const selectedRace = ref(props.modelValue)

watchEffect(() => {
  selectedRace.value = props.modelValue
})

function selectRace(id) {
  selectedRace.value = id
  emit('update:modelValue', id)
}
</script>

<style scoped>
.race-selector {
  text-align: center;
}
.races {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}
.race-card {
  width: 100px;
  padding: 0.5rem;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition:
    transform 0.2s,
    border-color 0.2s;
  text-align: center;
}
.race-card.selected {
  border-color: var(--color-accent);
  transform: scale(1.1);
}
.race-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
}
</style>
