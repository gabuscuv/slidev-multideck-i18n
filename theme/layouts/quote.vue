<script setup lang="ts">
import { computed } from 'vue'
defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  logo?: boolean | string
  author?: string
  class?: string
  layoutClass?: string
}>()

const logoSrc = computed(() => typeof props.logo === 'string' ? props.logo : '/logo.png')
</script>

<template>
  <div class="slidev-layout quote" :class="props.layoutClass">
    <div v-if="logo" class="logo">
      <img :src="logoSrc" alt="" />
    </div>
    <div class="quote-mark">"</div>
    <blockquote class="content">
      <slot />
    </blockquote>
    <cite v-if="author" class="author">
      — {{ author }}
    </cite>
  </div>
</template>

<style scoped>
.quote {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 3rem 4rem;
  text-align: center;
  position: relative;
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

.quote-mark {
  font-size: 8rem;
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.2;
  position: absolute;
  top: 2rem;
  left: 3rem;
  font-family: Georgia, serif;
}

.content {
  border: none;
  padding: 0;
  max-width: 80%;
  font-size: 1.75rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--color-text);
}

.content :deep(p) {
  font-size: inherit;
}

.author {
  margin-top: 2rem;
  font-size: 1.25rem;
  color: var(--color-primary);
  font-style: normal;
}
</style>
