<script setup lang="ts">
defineProps<{ id: string; title: string }>()
</script>

<template>
  <section :id="id" class="board relative border-t border-silk/10">
    <div class="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <div class="flex items-center gap-4">
        <h2 class="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">{{ title }}</h2>
        <span class="relative hidden h-px grow bg-gold/50 sm:block" aria-hidden="true">
          <span class="absolute -right-1 -top-[3px] h-[7px] w-[7px] rounded-full border border-gold bg-mask"></span>
        </span>
      </div>
      <div class="mt-12"><slot /></div>
    </div>
  </section>
</template>
