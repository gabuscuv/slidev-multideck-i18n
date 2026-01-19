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
  <div class="slidev-layout statement" :class="props.layoutClass">
    <div v-if="logo" class="logo">
      <img :src="logoSrc" alt="" />
    </div>
    <div class="content" :class="props.class">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.statement {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 3rem 4rem;
  text-align: center;
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
  max-width: 80%;
}

.content :deep(h1) {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.3;
}
</style>
