<script setup lang="ts">
import { reactive, ref } from 'vue'
import SectionWrapper from './SectionWrapper.vue'
import type { ContactInfo } from '../types'

const props = defineProps<{ contact: ContactInfo }>()

const form = reactive({ name: '', message: '' })
const sent = ref(false)
const copied = ref(false)

// No backend: opens the visitor's email app with the message filled in.
function send() {
  const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
  const body = encodeURIComponent(form.message)
  window.location.href = `mailto:${props.contact.email}?subject=${subject}&body=${body}`
  sent.value = true
  form.name = ''
  form.message = ''
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(props.contact.email)
    copied.value = true
    window.setTimeout(() => (copied.value = false), 2000)
  } catch {
    copied.value = false
  }
}

const field =
  'mt-2 w-full border border-silk/30 bg-mask-2 px-4 py-3 text-silk placeholder:text-muted/60 focus:border-gold focus:outline-none'
</script>

<template>
  <SectionWrapper id="contact" title="Contact">
    <div class="grid gap-14 md:grid-cols-2">
      <div class="space-y-5">
        <p class="max-w-md text-lg text-silk/90">Have an internship, a project, or a question? Send me a message.</p>
        <div class="flex flex-wrap items-center gap-3">
          <a :href="`mailto:${contact.email}`" class="font-mono text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">{{ contact.email }}</a>
          <button type="button" class="border border-silk/30 px-3 py-1 text-sm transition-colors hover:border-gold hover:text-gold" @click="copyEmail">
            {{ copied ? 'Copied' : 'Copy email' }}
          </button>
        </div>
        <p class="text-muted">{{ contact.phone }}</p>
        <p class="text-muted">{{ contact.address }}</p>
        <ul class="flex gap-3 pt-2">
          <li v-for="l in contact.links" :key="l.label">
            <a :href="l.url" target="_blank" rel="noopener" class="inline-block border border-gold px-4 py-2 font-semibold text-gold transition-colors hover:bg-gold hover:text-mask">{{ l.label }}</a>
          </li>
        </ul>
      </div>

      <form class="pads space-y-5 border border-silk/25 bg-mask-2/60 p-6 sm:p-8" @submit.prevent="send">
        <div>
          <label for="name" class="block text-sm font-semibold">Your name</label>
          <input id="name" v-model.trim="form.name" required autocomplete="name" :class="field" />
        </div>
        <div>
          <label for="message" class="block text-sm font-semibold">Message</label>
          <textarea id="message" v-model.trim="form.message" required rows="5" :class="field"></textarea>
        </div>
        <button type="submit" class="bg-gold px-6 py-3 font-semibold text-mask transition-colors hover:bg-silk">Send message</button>
        <p v-if="sent" role="status" class="text-sm text-signal">Your email app should open with the message ready to send.</p>
      </form>
    </div>
  </SectionWrapper>
</template>
