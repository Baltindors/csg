<template>
  <div class="avatar-selector">
    <h4>Select Avatar</h4>
    <div class="avatars">
      <div
        v-for="avatar in avatars"
        :key="avatar.id"
        :class="['avatar-card', { selected: avatar.id === selectedAvatar }]"
        @click="selectAvatar(avatar.id)"
      >
        <img :src="avatar.imageUrl" :alt="`Avatar ${avatar.id}`" class="avatar-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  race: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
})
const emit = defineEmits(['update:modelValue'])

// Placeholder avatars: 12 per race
const allAvatars = {
  Eldorian: Array.from({ length: 12 }, (_, i) => ({
    id: `Eldorian-${i + 1}`,
    imageUrl: `/avatars/Eldorian/${i + 1}.png`,
  })),
  Solarian: Array.from({ length: 12 }, (_, i) => ({
    id: `Solarian-${i + 1}`,
    imageUrl: `/avatars/Solarian/${i + 1}.png`,
  })),
  Stoneborn: Array.from({ length: 12 }, (_, i) => ({
    id: `Stoneborn-${i + 1}`,
    imageUrl: `/avatars/Stoneborn/${i + 1}.png`,
  })),
  Maritans: Array.from({ length: 12 }, (_, i) => ({
    id: `Maritans-${i + 1}`,
    imageUrl: `/avatars/Maritans/${i + 1}.png`,
  })),
  Zephyrians: Array.from({ length: 12 }, (_, i) => ({
    id: `Zephyrians-${i + 1}`,
    imageUrl: `/avatars/Zephyrians/${i + 1}.png`,
  })),
  Vortani: Array.from({ length: 12 }, (_, i) => ({
    id: `Vortani-${i + 1}`,
    imageUrl: `/avatars/Vortani/${i + 1}.png`,
  })),
}

const avatars = ref(allAvatars[props.race] || [])
const selectedAvatar = ref(props.modelValue)

watchEffect(() => {
  avatars.value = allAvatars[props.race] || []
  selectedAvatar.value = props.modelValue
})

function selectAvatar(id) {
  selectedAvatar.value = id
  emit('update:modelValue', id)
}
</script>

<style scoped>
.avatar-selector {
  text-align: center;
}
.avatars {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}
.avatar-card {
  width: 80px;
  height: 80px;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.2s,
    border-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-card.selected {
  border-color: var(--color-accent);
  transform: scale(1.1);
}
.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
