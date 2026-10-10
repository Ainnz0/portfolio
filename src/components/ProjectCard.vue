<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '../types'

defineProps<{ project: Project }>()

const card = ref<HTMLElement | null>(null)

// Tilts toward the pointer and moves a light across the surface.
function onMove(e: PointerEvent) {
  const el = card.value
  if (!el || e.pointerType === 'touch') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.style.setProperty('--mx', `${x * 100}%`)
  el.style.setProperty('--my', `${y * 100}%`)
  el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg)`
}

function onLeave() {
  const el = card.value
  if (!el) return
  el.style.transform = ''
  el.style.setProperty('--mx', '50%')
  el.style.setProperty('--my', '-40%')
}
</script>

<template>
  <article
    ref="card"
    class="pads group relative flex h-full flex-col overflow-hidden border border-silk/25 bg-mask-2 p-6 transition-[transform,border-color] duration-200 ease-out hover:border-gold"
    style="--mx: 50%; --my: -40%"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style="background: radial-gradient(260px circle at var(--mx) var(--my), rgba(79, 209, 255, 0.16), transparent 70%)"
      aria-hidden="true"
    ></div>

    <h3 class="relative font-display text-2xl font-bold">{{ project.title }}</h3>
    <p class="relative mt-3 grow text-muted">{{ project.description }}</p>
    <ul class="relative mt-5 flex flex-wrap gap-2">
      <li v-for="t in project.tags" :key="t" class="border border-signal/40 px-2 py-0.5 font-mono text-xs text-signal">{{ t }}</li>
    </ul>
    <div v-if="project.repo || project.demo" class="relative mt-5 flex gap-5 text-sm font-semibold">
      <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">Source code</a>
      <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">Live demo</a>
    </div>
  </article>
</template>
