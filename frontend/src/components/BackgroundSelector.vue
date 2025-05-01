<template>
  <div class="background-selector">
    <h4>Select Background</h4>
    <div class="backgrounds">
      <div
        v-for="bg in backgrounds"
        :key="bg.id"
        :class="['background-card', { selected: bg.id === selectedBackground }]"
        @click="selectBackground(bg.id)"
      >
        <h5 class="bg-title">{{ bg.title }}</h5>
        <p class="bg-desc">{{ bg.description }}</p>
        <ul class="bg-attrs">
          <li v-for="attr in bg.attributes" :key="attr">{{ attr }}</li>
        </ul>
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

// Placeholder background data
const backgrounds = ref([
  {
    id: 1,
    title: "Warrior's Resolve",
    description: 'Brave and bold.',
    attributes: ['+5 Strength', '+2 Endurance'],
  },
  {
    id: 2,
    title: "Mage's Wisdom",
    description: 'Knowledge is power.',
    attributes: ['+5 Intelligence', '+2 Mana'],
  },
  {
    id: 3,
    title: "Rogue's Guile",
    description: 'Silent but deadly.',
    attributes: ['+5 Agility', '+2 Stealth'],
  },
  {
    id: 4,
    title: "Cleric's Faith",
    description: 'Healing light.',
    attributes: ['+5 Faith', '+2 Healing'],
  },
  {
    id: 5,
    title: "Ranger's Path",
    description: 'One with nature.',
    attributes: ['+5 Dexterity', '+2 Tracking'],
  },
  {
    id: 6,
    title: "Paladin's Oath",
    description: 'Honor above all.',
    attributes: ['+5 Charisma', '+2 Defense'],
  },
])

const selectedBackground = ref(props.modelValue)

watchEffect(() => {
  selectedBackground.value = props.modelValue
})

function selectBackground(id) {
  selectedBackground.value = id
  emit('update:modelValue', id)
}
</script>

<style scoped>
.background-selector {
  text-align: center;
}
.backgrounds {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  margin-top: 1rem;
}
.background-card {
  flex: 1 1 calc(33% - 1rem);
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition:
    transform 0.2s,
    border-color 0.2s;
  background: var(--color-background-soft);
  box-sizing: border-box;
}
.background-card.selected {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}
.bg-title {
  font-family: 'Cinzel', serif;
  margin: 0.5rem 0;
}
.bg-desc {
  font-size: 0.9rem;
  color: var(--vt-c-indigo);
}
.bg-attrs {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
}
.bg-attrs li {
  font-size: 0.8rem;
}
</style>
