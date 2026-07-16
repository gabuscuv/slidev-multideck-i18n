<script setup lang="ts">
import { useTranslation } from '../composables/useTranslation'

const title = useTranslation('slides.cover.heading')
const subtitle = useTranslation('slides.cover.subtitle')
</script>

<template>
  <h1>{{ title }}</h1>
  <p>{{ subtitle }}</p>
  <p>Gaby Bustillo del Cuvillo</p>
</template>