<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  class?: string
  layoutClass?: string
}>()
</script>

<template>
  <div class="slidev-layout section" :class="props.layoutClass">
    <div class="content">
      <slot />
    </div>
    <div class="gradient-bar"></div>
  </div>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  background-color: var(--color-bg-alt);
}

.content {
  padding: 3rem;
}

.content :deep(h1) {
  font-size: 3rem;
}

.content :deep(p) {
  font-size: 1.5rem;
  color: var(--color-text-muted);
  margin-top: 1rem;
}

.gradient-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: var(--color-primary-gradient);
}
</style>
