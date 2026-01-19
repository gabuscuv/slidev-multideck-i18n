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
  <div class="slidev-layout none" :class="[props.layoutClass, props.class]">
    <slot />
  </div>
</template>

<style scoped>
.none {
  /* No styling - raw canvas */
}
</style>
