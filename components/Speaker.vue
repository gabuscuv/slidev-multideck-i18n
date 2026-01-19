<script setup lang="ts">
defineProps<{
  name: string
  role?: string
  image?: string
  social?: { platform: string; url: string }[]
}>()
</script>

<template>
  <div class="speaker">
    <div v-if="image" class="avatar">
      <img :src="image" :alt="name" />
    </div>
    <div class="info">
      <h3>{{ name }}</h3>
      <p v-if="role" class="role">{{ role }}</p>
      <div v-if="social?.length" class="social">
        <a
          v-for="s in social"
          :key="s.platform"
          :href="s.url"
          target="_blank"
          rel="noopener"
        >
          {{ s.platform }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.speaker {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.role {
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.social {
  display: flex;
  gap: 1rem;
}

.social a {
  color: var(--color-link);
}
</style>
