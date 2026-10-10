<script setup lang="ts">
import SectionWrapper from './SectionWrapper.vue'
import type { Profile } from '../types'
defineProps<{ profile: Profile }>()
</script>

<template>
  <SectionWrapper id="about" title="About me">
    <div class="grid gap-12 md:grid-cols-5">
      <div class="max-w-xl space-y-5 text-lg leading-relaxed text-silk/90 md:col-span-3">
        <p v-for="(p, i) in profile.about" :key="i">{{ p }}</p>
      </div>

      <!-- Laid out like the spec table on a component datasheet. -->
      <dl class="pads self-start border border-silk/25 bg-mask-2 md:col-span-2">
        <div v-for="f in profile.facts" :key="f.label" class="grid grid-cols-3 gap-3 border-b border-silk/10 px-5 py-3.5 last:border-b-0">
          <dt class="font-mono text-sm text-muted">{{ f.label }}</dt>
          <dd class="col-span-2 font-medium">{{ f.value }}</dd>
        </div>
      </dl>
    </div>
  </SectionWrapper>
</template>
