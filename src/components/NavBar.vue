<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{ name: string; image: string }>()

const open = ref(false)
const active = ref('')
const progress = ref(0)

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

const initials = () =>
  props.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('')

let observer: IntersectionObserver | null = null

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) active.value = '#' + e.target.id
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const l of links) {
    const el = document.querySelector(l.href)
    if (el) observer.observe(el)
  }
  const home = document.querySelector('#home')
  if (home) observer.observe(home)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-silk/10 bg-mask/85 backdrop-blur">
    <div class="h-[3px] origin-left bg-signal" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true"></div>
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8" aria-label="Main">
      <a href="#home" class="flex items-center gap-3 font-display text-lg font-extrabold">
        <img :src="image" alt="" class="h-8 w-8 object-cover" />
        <span class="hidden sm:inline">{{ name }}</span>
      </a>

      <button
        class="border border-silk/30 px-3 py-1.5 text-sm font-medium md:hidden"
        :aria-expanded="open"
        aria-controls="menu"
        @click="open = !open"
      >
        {{ open ? 'Close' : 'Menu' }}
      </button>

      <ul class="hidden gap-7 text-sm font-medium md:flex">
        <li v-for="l in links" :key="l.href">
          <a
            :href="l.href"
            class="border-b-2 py-1 transition-colors hover:text-gold"
            :class="active === l.href ? 'border-gold text-gold' : 'border-transparent text-muted'"
            :aria-current="active === l.href ? 'true' : undefined"
          >
            {{ l.label }}
          </a>
        </li>
      </ul>
    </nav>

    <ul v-if="open" id="menu" class="border-t border-silk/10 px-5 pb-3 md:hidden">
      <li v-for="l in links" :key="l.href">
        <a :href="l.href" class="block py-2.5 font-medium" @click="open = false">{{ l.label }}</a>
      </li>
    </ul>
  </header>
</template>
