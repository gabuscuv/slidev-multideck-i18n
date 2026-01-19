<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  url?: string
  class?: string
  layoutClass?: string
}>()
</script>

<template>
  <div class="slidev-layout iframe" :class="props.layoutClass">
    <iframe
      v-if="url"
      :src="url"
      :class="props.class"
      frameborder="0"
      allowfullscreen
    />
    <div v-if="$slots.default" class="overlay">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.iframe {
  position: relative;
  height: 100%;
  width: 100%;
}

.iframe iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.overlay {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
