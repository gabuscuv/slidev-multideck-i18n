<script setup lang="ts">
import { computed } from 'vue'
defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  logo?: boolean | string
  image?: string
  imageAlt?: string
  class?: string
  layoutClass?: string
}>()

const logoSrc = computed(() => typeof props.logo === 'string' ? props.logo : '/logo.png')
</script>

<template>
  <div class="slidev-layout image-right" :class="props.layoutClass">
    <div v-if="logo" class="logo">
      <img :src="logoSrc" alt="" />
    </div>
    <div class="col-left">
      <slot />
    </div>
    <div class="col-right">
      <img
        v-if="image"
        :src="image"
        :alt="imageAlt || ''"
        class="image"
      />
    </div>
  </div>
</template>

<style scoped>
.image-right {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}

.logo {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  height: 2rem;
  opacity: 0.7;
  z-index: 1;
}

.logo img {
  height: 100%;
  width: auto;
}

.col-left {
  padding: 2.5rem 2rem 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.col-left :deep(h1),
.col-left :deep(h2) {
  margin-bottom: 1rem;
}

.col-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--color-bg-alt);
}

.image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}
</style>
