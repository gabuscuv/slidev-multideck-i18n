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
  <div class="slidev-layout full" :class="[props.layoutClass, props.class]">
    <slot />
  </div>
</template>

<style scoped>
.full {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
