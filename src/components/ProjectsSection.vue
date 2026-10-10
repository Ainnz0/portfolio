<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionWrapper from './SectionWrapper.vue'
import ProjectCard from './ProjectCard.vue'
import type { Project } from '../types'

const props = defineProps<{ projects: Project[] }>()

const activeTag = ref('All')
const tags = computed(() => ['All', ...new Set(props.projects.flatMap((p) => p.tags))])
const inFilter = (p: Project) => activeTag.value === 'All' || p.tags.includes(activeTag.value)
const recent = computed(() => props.projects.filter((p) => p.featured && inFilter(p)))
const others = computed(() => props.projects.filter((p) => !p.featured && inFilter(p)))
</script>

<template>
  <SectionWrapper id="projects" title="Projects">
    <div class="flex flex-wrap gap-2" role="group" aria-label="Filter projects by tag">
      <button
        v-for="t in tags"
        :key="t"
        class="border px-4 py-1.5 font-mono text-sm transition-colors"
        :class="activeTag === t ? 'border-gold bg-gold text-mask' : 'border-silk/30 hover:border-gold hover:text-gold'"
        :aria-pressed="activeTag === t"
        @click="activeTag = t"
      >
        {{ t }}
      </button>
    </div>

    <h3 class="mt-12 font-display text-2xl font-bold">Recent projects</h3>
    <div v-if="recent.length" class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="p in recent" :key="p.title" :project="p" />
    </div>
    <p v-else class="mt-6 text-muted">No recent projects match this tag. Pick another tag above.</p>

    <h3 class="mt-14 font-display text-2xl font-bold">Other projects</h3>
    <ul v-if="others.length" class="mt-6 divide-y divide-silk/10 border-y border-silk/10">
      <li v-for="p in others" :key="p.title" class="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-8">
        <span class="font-semibold">{{ p.title }}</span>
        <span class="text-muted sm:max-w-md sm:text-right">{{ p.description }}</span>
      </li>
    </ul>
    <p v-else class="mt-6 text-muted">No other projects match this tag.</p>
  </SectionWrapper>
</template>
