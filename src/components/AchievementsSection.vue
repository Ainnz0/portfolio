<script setup lang="ts">
import SectionWrapper from './SectionWrapper.vue'
import type { Achievement } from '../types'
defineProps<{ achievements: Achievement[] }>()
</script>

<template>
  <SectionWrapper id="achievements" title="Achievements and certificates">
    <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="a in achievements" :key="a.title" class="pads flex flex-col border border-silk/25 bg-mask-2 p-6">
        <p class="font-display text-4xl font-extrabold text-gold">{{ a.year }}</p>
        <h3 class="mt-4 font-display text-xl font-bold">{{ a.title }}</h3>
        <p class="mt-1 grow text-muted">{{ a.issuer }}</p>
        <a
          v-if="a.file"
          :href="a.file"
          target="_blank"
          rel="noopener"
          class="mt-5 inline-block self-start text-sm font-semibold text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
        >
          View certificate
        </a>
      </li>
    </ul>
  </SectionWrapper>
</template>
