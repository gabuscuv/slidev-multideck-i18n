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
  <div class="slidev-layout two-cols-header" :class="props.layoutClass">
    <div v-if="logo" class="logo">
      <img :src="logoSrc" alt="" />
    </div>
    <div class="col-header">
      <slot />
    </div>
    <div class="col-left" :class="props.class">
      <slot name="left" />
    </div>
    <div class="col-right" :class="props.class">
      <slot name="right" />
    </div>
    <div class="col-bottom" :class="props.class">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped>
.two-cols-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 1.5rem;
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

.col-header {
  grid-column: 1 / 3;
}

.col-header :deep(h1),
.col-header :deep(h2) {
  margin-bottom: 0.5rem;
}

.col-left {
  grid-column: 1 / 2;
}

.col-right {
  grid-column: 2 / 3;
}

.col-bottom {
  grid-column: 1 / 3;
  align-self: end;
}
</style>
