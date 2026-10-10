<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SectionWrapper from './SectionWrapper.vue'
import type { Experience } from '../types'

defineProps<{ experience: Experience[] }>()

const list = ref<HTMLElement | null>(null)
const fill = ref(0) // 0 to 1: how far the visitor has scrolled down the timeline
const reached = ref<boolean[]>([])

function update() {
  const el = list.value
  if (!el) return
  const line = window.innerHeight * 0.6
  const rect = el.getBoundingClientRect()
  fill.value = Math.max(0, Math.min(1, (line - rect.top) / rect.height))
  const items = Array.from(el.querySelectorAll('li[data-item]'))
  reached.value = items.map((li) => li.getBoundingClientRect().top < line)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <SectionWrapper id="experience" title="Experience">
    <div ref="list" class="relative pl-8 sm:pl-10">
      <div class="absolute bottom-0 left-[7px] top-0 w-0.5 bg-silk/15" aria-hidden="true">
        <div class="w-full origin-top bg-gold" :style="{ height: fill * 100 + '%' }"></div>
      </div>
      <ol class="space-y-12">
        <li v-for="(e, i) in experience" :key="e.role + e.period" data-item class="relative">
          <span
            class="absolute -left-[33px] top-1.5 h-4 w-4 border-2 transition-colors duration-300 sm:-left-[41px]"
            :class="reached[i] ? 'border-gold bg-gold' : 'border-silk/40 bg-mask'"
            aria-hidden="true"
          ></span>
          <p class="font-mono text-sm text-signal">{{ e.period }}</p>
          <h3 class="mt-1 font-display text-2xl font-bold">{{ e.role }}</h3>
          <p class="font-medium text-muted">{{ e.org }}</p>
          <ul class="mt-3 max-w-2xl list-disc space-y-1.5 pl-5 text-silk/90 marker:text-gold">
            <li v-for="d in e.details" :key="d">{{ d }}</li>
          </ul>
        </li>
      </ol>
    </div>
  </SectionWrapper>
</template>
