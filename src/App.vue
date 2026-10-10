<script setup lang="ts">
import { computed } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import StatsStrip from './components/StatsStrip.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import AchievementsSection from './components/AchievementsSection.vue'
import ContactSection from './components/ContactSection.vue'
import { profile, contact, skills, projects, experience, achievements } from './data/portfolio'
import type { Stat } from './types'

// These numbers come from your data, so they update when you edit portfolio.ts.
const stats = computed<Stat[]>(() => [
  { label: 'Projects built', value: projects.length },
  { label: 'Technologies used', value: skills.reduce((n, g) => n + g.items.length, 0) },
  { label: 'Experience roles', value: experience.length },
  { label: 'Awards and certificates', value: achievements.length },
])
</script>

<template>
  <NavBar :name="profile.name" :image="profile.image" />
  <main>
    <HeroSection :profile="profile" />
    <StatsStrip :stats="stats" />
    <AboutSection :profile="profile" />
    <SkillsSection :skills="skills" />
    <ProjectsSection :projects="projects" />
    <ExperienceSection :experience="experience" />
    <AchievementsSection :achievements="achievements" />
    <ContactSection :contact="contact" />
  </main>
  <footer class="border-t border-silk/10 py-8">
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-muted sm:flex-row sm:px-8">
      <p>&copy; {{ new Date().getFullYear() }} {{ profile.name }}. Built with Vue 3, TypeScript and Tailwind CSS.</p>
      <a href="#home" class="font-semibold text-gold hover:text-silk">Back to top</a>
    </div>
  </footer>
</template>
