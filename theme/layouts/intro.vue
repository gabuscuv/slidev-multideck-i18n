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
  <div class="slidev-layout intro" :class="props.layoutClass">
    <div class="gradient-bar"></div>
    <div class="content" :class="props.class">
      <div v-if="logo" class="logo">
        <img :src="logoSrc" alt="" />
      </div>
      <div class="main">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-bg);
}

.gradient-bar {
  height: 8px;
  background: var(--color-primary-gradient);
  flex-shrink: 0;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
}

.logo {
  position: absolute;
  top: 2.5rem;
  right: 2rem;
  height: 3rem;
}

.logo img {
  height: 100%;
  width: auto;
}

.main {
  max-width: 70%;
}

.main :deep(h1) {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.main :deep(p) {
  font-size: 1.25rem;
  color: var(--color-text-muted);
}
</style>
