<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Stat } from '../types'

const props = defineProps<{ stats: Stat[] }>()

const shown = ref<number[]>(props.stats.map(() => 0))
const root = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
let raf = 0

function run() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    shown.value = props.stats.map((s) => s.value)
    return
  }
  const start = performance.now()
  const duration = 1400
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    shown.value = props.stats.map((s) => Math.round(s.value * eased))
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => {
  if (!root.value) return
  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      run()
      observer?.disconnect()
    }
  }, { threshold: 0.4 })
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="root" class="border-y border-gold/40 bg-mask-2">
    <dl class="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-5 py-8 sm:px-8 md:grid-cols-4">
      <div v-for="(s, i) in stats" :key="s.label" class="md:border-l md:border-silk/10 md:pl-6 md:first:border-l-0 md:first:pl-0">
        <dd class="font-display text-4xl font-extrabold text-gold sm:text-5xl">{{ shown[i] }}{{ s.suffix ?? '' }}</dd>
        <dt class="mt-1 text-sm text-muted">{{ s.label }}</dt>
      </div>
    </dl>
  </div>
</template>
