<script setup lang="ts">
withDefaults(defineProps<{
  points: string[]
  title?: string
  animate?: boolean
}>(), {
  animate: true
})
</script>

<template>
  <div class="key-points">
    <h3 v-if="title">{{ title }}</h3>
    <ul v-if="animate">
      <li v-for="(point, i) in points" :key="i" v-click>
        {{ point }}
      </li>
    </ul>
    <ul v-else>
      <li v-for="(point, i) in points" :key="i">
        {{ point }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.key-points {
  font-size: 1.25rem;
}

.key-points h3 {
  margin-bottom: 1rem;
  color: #3b82f6;
}

.key-points ul {
  list-style: none;
  padding: 0;
}

.key-points li {
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
}

.key-points li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #3b82f6;
}
</style>
