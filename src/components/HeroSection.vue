<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CircuitCanvas from './CircuitCanvas.vue'
import type { Profile } from '../types'

const props = defineProps<{ profile: Profile }>()

const typed = ref(props.profile.role)
const pins = Array.from({ length: 6 }, (_, i) => i)

let timer = 0
let roleIndex = 0
let charIndex = 0
let deleting = false

function tick() {
  const roles = props.profile.roles.length ? props.profile.roles : [props.profile.role]
  const full = roles[roleIndex % roles.length] as string

  if (!deleting) {
    charIndex++
    typed.value = full.slice(0, charIndex)
    if (charIndex >= full.length) {
      deleting = true
      timer = window.setTimeout(tick, 1800)
      return
    }
    timer = window.setTimeout(tick, 70)
  } else {
    charIndex--
    typed.value = full.slice(0, charIndex)
    if (charIndex <= 0) {
      deleting = false
      roleIndex++
      timer = window.setTimeout(tick, 350)
      return
    }
    timer = window.setTimeout(tick, 35)
  }
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return
  typed.value = ''
  timer = window.setTimeout(tick, 700)
})

onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <section id="home" class="relative isolate overflow-hidden">
    <CircuitCanvas />
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_40%,var(--color-mask-3)_0%,var(--color-mask)_70%)]" aria-hidden="true"></div>

    <div class="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-5 md:py-24">
      <div class="md:col-span-3">
        <p class="rise font-mono text-base text-signal" style="animation-delay: 0.1s" aria-label="Role">
          {{ typed }}<span class="caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-signal"></span>
        </p>
        <h1 class="rise mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl" style="animation-delay: 0.25s">
          {{ profile.name }}
        </h1>
        <p class="rise mt-7 max-w-xl text-lg text-muted sm:text-xl" style="animation-delay: 0.4s">{{ profile.tagline }}</p>
        <div class="rise mt-10 flex flex-wrap gap-3" style="animation-delay: 0.55s">
          <a href="#projects" class="bg-gold px-6 py-3 font-semibold text-mask transition-colors hover:bg-silk">View projects</a>
          <a :href="profile.resumeUrl" download class="border-2 border-silk/70 px-6 py-3 font-semibold transition-colors hover:border-gold hover:text-gold">
            Download resume
          </a>
        </div>
      </div>

      <!-- The photo sits on an IC package with pins down both sides. -->
      <div class="rise relative mx-auto w-60 sm:w-72 md:col-span-2 md:w-full md:max-w-sm" style="animation-delay: 0.45s">
        <div class="absolute inset-y-6 -left-4 flex flex-col justify-between" aria-hidden="true">
          <span v-for="p in pins" :key="'l' + p" class="block h-2.5 w-4 bg-gold/80"></span>
        </div>
        <div class="absolute inset-y-6 -right-4 flex flex-col justify-between" aria-hidden="true">
          <span v-for="p in pins" :key="'r' + p" class="block h-2.5 w-4 bg-gold/80"></span>
        </div>
        <div class="relative border-2 border-silk/60 bg-mask-2 p-3">
          <span class="absolute left-1/2 top-0 h-3 w-6 -translate-x-1/2 rounded-b-full border-x-2 border-b-2 border-silk/60 bg-mask" aria-hidden="true"></span>
          <img :src="profile.image" :alt="`Photo of ${profile.name}`" class="aspect-[5/6] w-full object-cover" />
          <p class="mt-3 font-mono text-xs text-muted">{{ profile.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
