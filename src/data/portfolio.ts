import type {
  Achievement, ContactInfo, Experience, Profile, Project, SkillGroup,
} from '../types'

// Edit this file to personalize the whole site.

export const profile: Profile = {
  name: 'Aldrin P. Luis',
  role: 'Computer Engineering Student',
  roles: [
    'Computer Engineering Student',
    'POGI',
  ],
  tagline: 'Building practical software, embedded systems, and hardware solutions.',
  about: [
    'I am a Computer Engineering student at Cagayan State University - Carig Campus with an interest in programming, embedded systems, electronics, and hardware development. I enjoy turning ideas into practical solutions through software and hardware projects.',
'Outside academics, I am a member of the COEA Pep Squad, where I develop teamwork, discipline, and commitment through training and competitions.',
'Beyond technology, I am passionate about engines, particularly understanding how they work, their components, and how modifications affect performance and efficiency.',
  ],
  facts: [
    { label: 'Program', value: 'BS Computer Engineering' },
    { label: 'School', value: 'Cagayan State University - Carig' },
    { label: 'Focus', value: 'Hardware, IoT, embedded systems' },
    { label: 'Career Goal', value: 'Aspiring Computer Engineer' },
  ],
  image: '/b993f48b-d7e0-4628-bf7a-8e0e6845e008.jpg',
  resumeUrl: '/objective.pdf',
}

export const contact: ContactInfo = {
  email: 'luisaldrin2005@gmail.com',
  phone: '+63 975 242 2880',
  address: 'Carig, Tuguegarao City, Cagayan, Philippines',
  links: [
    { label: 'GitHub', url: 'https://github.com/Ainnz0' },
  ],
}

export const skills: SkillGroup[] = [
{
title: 'Programming and Database',
blurb: 'Writing code and managing data for academic and software projects.',
items: [
{ name: 'C/C++', level: 70 },
{ name: 'Arduino Programming', level: 80 },
{ name: 'SQL', level: 65 },
{ name: 'PostgreSQL', level: 60 },
],
},
{
title: 'Embedded Systems and Electronics',
blurb: 'Building microcontroller-based projects and working with electronic components.',
items: [
{ name: 'Arduino Uno/Nano', level: 80 },
{ name: 'ESP32', level: 65 },
{ name: 'Sensors and Motor Drivers', level: 75 },
{ name: 'Hardware Troubleshooting', level: 65 },
],
},
{
title: 'Software Tools and Development',
blurb: 'Using development tools and collaborating on academic software projects.',
items: [
{ name: 'Arduino IDE', level: 80 },
{ name: 'pgAdmin', level: 65 },
{ name: 'Microsoft Office', level: 80 },
{ name: 'Web-Based System Development', level: 65 },
],
},
]


export const projects: Project[] = [
{
    title: 'SmartBoard Retrofit',
    description: 'A thesis proposal for an affordable system that captures classroom whiteboard content, organizes digital lesson records, and explores a local AI assistant for lesson-based learning support. Status: proposed / in development.',
    tags: ['IoT', 'Computer Vision', 'AI', 'Web Development'],
    featured: true,
  },
  {
    title: 'Autonomous Line Follower Robot',
    description: 'An Arduino-based robotics project concept using line sensors and motor control, with Proportional-Derivative (PD) control to improve track following.',
    tags: ['Arduino', 'Robotics', 'C/C++'],
    featured: true,
  },
  {
    title: 'Tapat Kalusugan: Vaccination and Appointment System',
    description: 'An academic software project focused on organizing vaccination information and appointment scheduling. Add screenshots and a repository link if available.',
    tags: ['Web Development', 'Database', 'System Design'],
    featured: true,
  },
  {
    title: 'ESP32 and Arduino Experiments',
    description: 'Microcontroller practice involving LED output on GPIO2, buzzer control on GPIO14, a push button on GPIO5, and PWM/servo control on GPIO4.',
    tags: ['ESP32', 'Arduino', 'Embedded Systems'],
    featured: false,
  },
  {
    title: 'DIY Audio Amplifier Exploration',
    description: 'A personal electronics project exploring amplifier modules, speaker drivers, and basic power and audio connections.',
    tags: ['Electronics', 'Audio'],
    featured: false,
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive personal portfolio built with Vue 3, TypeScript, and Tailwind CSS to present skills, academic projects, and experience.',
    tags: ['Vue 3', 'TypeScript', 'Tailwind CSS'],
    featured: false,
  },
];


export const experience: Experience[] = [
{
role: 'OJT Trainee',
org: 'Abana Computer Services and Merchandise',
period: 'May - June 2026',
details: [
'Gained practical exposure to computer hardware troubleshooting and technical support.',
'Observed and assisted with computer and printer servicing in the Technical / Repair Department.',
'Applied Computer Engineering knowledge in a professional technical service environment.',
'Developed problem-solving, teamwork, and technical communication skills.',
],
},
];


export const achievements: Achievement[] = [
{
title: 'Intramurals Cheerdance Competition - 1st Runner-Up',
issuer: 'Cagayan State University',
year: '2023',
},
{
  title: 'Tapat Kalusugan: Vaccination and Appointment System',
  issuer: 'Computer Engineering Academic Project',
  year: '2024',
},
{
    title: 'Arduino Line Follower Robot Project',
    issuer: 'Computer Engineering Academic Project',
    year: '2025',
  },
{
title: 'Intramurals Cheerdance Competition - Champion',
issuer: 'Cagayan State University',
year: '2025',
},
{
title: 'CSU University Meet Cheerdance Competition - Champion',
issuer: 'Cagayan State University',
year: '2025',
},
{
title: 'CaVRASUC Cheerdance Competition - 1st Runner-Up',
issuer: 'Cagayan Valley Regional Association of State Universities and Colleges',
year: '2025',
},
{
title: 'Regional ITE Convention Participant',
issuer: 'St. Paul University Philippines — “Building Smarter Futures through Technology and Engineering”; July 20–22, 2026. Sessions included Python game programming, Django web development, and engineering solutions for global challenges.',
year: '2026',
},
{
title: 'Intramurals Cheerdance Competition - 1st Runner-Up',
issuer: 'Cagayan State University',
year: '2026',
},

{
title: 'Safety Officer 1 (SO1) Certificate',
issuer: 'Occupational Safety and Health Training',
year: '2026',
},
];

