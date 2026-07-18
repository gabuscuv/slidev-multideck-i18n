<script setup lang="ts">
import { useTranslation } from '../composables/useTranslation'

const props = defineProps<{
  k?: string
}>()

const texts = useTranslation(() => props.k)

</script>

<template>
  <div v-for="(text, index) in texts">
    {{ text }}
  </div>
</template>