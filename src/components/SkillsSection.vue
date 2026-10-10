<script setup lang="ts">
import { computed, ref } from 'vue'
import SectionWrapper from './SectionWrapper.vue'
import type { SkillGroup } from '../types'

const props = defineProps<{ skills: SkillGroup[] }>()

const selected = ref(0)
const group = computed(() => props.skills[selected.value] ?? props.skills[0])
</script>

<template>
  <SectionWrapper id="skills" title="Skills">
    <div class="grid gap-10 md:grid-cols-5">
      <div class="md:col-span-2" role="group" aria-label="Skill groups">
        <ul class="flex flex-col gap-2">
          <li v-for="(g, i) in skills" :key="g.title">
            <button
              class="flex w-full items-center justify-between border px-5 py-4 text-left transition-colors"
              :class="selected === i ? 'border-gold bg-gold text-mask' : 'border-silk/25 hover:border-gold hover:text-gold'"
              :aria-pressed="selected === i"
              @click="selected = i"
            >
              <span class="font-display text-xl font-bold">{{ g.title }}</span>
              <span class="font-mono text-sm">{{ g.items.length }}</span>
            </button>
          </li>
        </ul>
      </div>

      <div v-if="group" :key="group.title" class="md:col-span-3" aria-live="polite">
        <p class="text-lg text-muted">{{ group.blurb }}</p>
        <ul class="mt-8 space-y-6">
          <li v-for="(s, i) in group.items" :key="s.name">
            <div class="flex items-baseline justify-between">
              <span class="font-semibold">{{ s.name }}</span>
              <span class="font-mono text-sm text-signal">{{ s.level }}%</span>
            </div>
            <div class="mt-2 h-2 bg-mask-3/60" role="presentation">
              <div
                class="fill h-full bg-gradient-to-r from-gold to-signal"
                :style="{ width: s.level + '%', animationDelay: i * 90 + 'ms' }"
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </SectionWrapper>
</template>
