<script setup lang="ts">
import { computed } from 'vue'
defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  logo?: boolean | string
  url?: string
  class?: string
  layoutClass?: string
}>()

const logoSrc = computed(() => typeof props.logo === 'string' ? props.logo : '/logo.png')
</script>

<template>
  <div class="slidev-layout iframe-left" :class="props.layoutClass">
    <div v-if="logo" class="logo">
      <img :src="logoSrc" alt="" />
    </div>
    <div class="col-left">
      <iframe
        v-if="url"
        :src="url"
        frameborder="0"
        allowfullscreen
      />
    </div>
    <div class="col-right" :class="props.class">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.iframe-left {
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
  background-color: var(--color-bg-alt);
}

.col-left iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.col-right {
  padding: 2.5rem 3rem 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.col-right :deep(h1),
.col-right :deep(h2) {
  margin-bottom: 1rem;
}
</style>
