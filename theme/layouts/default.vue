<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  logo?: boolean | string
  class?: string
  layoutClass?: string
}>()

const logoSrc = computed(() => typeof props.logo === 'string' ? props.logo : '/logo.png')
</script>

<template>
  <div class="slidev-layout default" :class="props.layoutClass">
    <div v-if="logo" class="logo">
      <img :src="logoSrc" alt="" />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.default {
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.logo {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  height: 2rem;
  opacity: 0.7;
}

.logo img {
  height: 100%;
  width: auto;
}

.content {
  flex: 1;
}

.content :deep(h1) {
  margin-bottom: 1.5rem;
}

.content :deep(h2) {
  margin-bottom: 1rem;
}
</style>
