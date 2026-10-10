export interface Profile {
  name: string
  role: string
  /** Extra titles the hero cycles through while typing. */
  roles: string[]
  tagline: string
  about: string[]
  /** Short facts shown in the "datasheet" panel in the About section. */
  facts: { label: string; value: string }[]
  image: string
  resumeUrl: string
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
  links: { label: string; url: string }[]
}

export interface Skill {
  name: string
  /** 0 to 100. Controls the bar length. */
  level: number
}

export interface SkillGroup {
  title: string
  blurb: string
  items: Skill[]
}

export interface Project {
  title: string
  description: string
  tags: string[]
  repo?: string
  demo?: string
  featured: boolean
}

export interface Experience {
  role: string
  org: string
  period: string
  details: string[]
}

export interface Achievement {
  title: string
  issuer: string
  year: string
  file?: string
}

export interface Stat {
  label: string
  value: number
  suffix?: string
}
