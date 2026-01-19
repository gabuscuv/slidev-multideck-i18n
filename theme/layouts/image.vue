<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  image?: string
  imageAlt?: string
  class?: string
  layoutClass?: string
}>()
</script>

<template>
  <div class="slidev-layout image" :class="props.layoutClass">
    <div class="image-container">
      <img
        v-if="image"
        :src="image"
        :alt="imageAlt || ''"
        class="main-image"
      />
    </div>
    <div v-if="$slots.default" class="overlay" :class="props.class">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.image {
  position: relative;
  height: 100%;
  width: 100%;
}

.image-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-alt);
}

.main-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.overlay {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.overlay :deep(p) {
  margin: 0;
  font-size: 1rem;
}
</style>
