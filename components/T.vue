<script setup lang="ts">
import { useTranslation } from '../composables/useTranslation'

const props = defineProps<{
  k?: string
}>()

const text = useTranslation(() => props.k)
</script>

<template>
  {{ text }}
</template>