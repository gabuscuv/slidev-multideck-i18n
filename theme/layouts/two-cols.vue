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
  <div class="slidev-layout two-cols" :class="props.layoutClass">
    <div v-if="logo" class="logo">
      <img :src="logoSrc" alt="" />
    </div>
    <div class="col-left" :class="props.class">
      <slot />
      <slot name="left" />
    </div>
    <div class="col-right" :class="props.class">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.two-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 100%;
  padding: 2.5rem 3rem;
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

.col-left,
.col-right {
  display: flex;
  flex-direction: column;
}

.col-left :deep(h1),
.col-left :deep(h2) {
  margin-bottom: 1rem;
}
</style>
