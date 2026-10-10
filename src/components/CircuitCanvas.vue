<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Point { x: number; y: number }
interface Trace { pts: Point[]; cum: number[]; len: number; pulse: number; speed: number }

const canvas = ref<HTMLCanvasElement | null>(null)

const CELL = 36
const TRAIL = 16
const GLOW_RADIUS = 190
// 8 directions, clockwise from east. Even indexes are straight, odd are 45 degree bends.
const DIRS: number[][] = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]

let ctx: CanvasRenderingContext2D | null = null
let traces: Trace[] = []
let width = 0
let height = 0
let raf = 0
let last = 0
let visible = true
let reduced = false
let mouseX = -9999
let mouseY = -9999
let glow = 0 // 0 to 1, eases toward 1 while the pointer is over the hero
let glowTarget = 0
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

function makeTrace(cols: number, rows: number): Trace | null {
  let cx = rand(0, cols)
  let cy = rand(0, rows)
  let d = rand(0, 3) * 2
  const pts: Point[] = [{ x: cx * CELL, y: cy * CELL }]
  const segments = rand(4, 9)

  for (let i = 0; i < segments; i++) {
    const dir = DIRS[d] as number[]
    const steps = d % 2 === 0 ? rand(2, 7) : rand(1, 3)
    const nx = cx + (dir[0] as number) * steps
    const ny = cy + (dir[1] as number) * steps
    if (nx < 0 || ny < 0 || nx > cols || ny > rows) break
    cx = nx
    cy = ny
    pts.push({ x: cx * CELL, y: cy * CELL })
    const turn = Math.random() < 0.5 ? 1 : 7
    d = d % 2 === 0 && Math.random() < 0.45 ? d : (d + turn) % 8
  }
  if (pts.length < 3) return null

  const cum = [0]
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1] as Point
    const b = pts[i] as Point
    cum.push((cum[i - 1] as number) + Math.hypot(b.x - a.x, b.y - a.y))
  }
  const len = cum[cum.length - 1] as number
  return { pts, cum, len, pulse: -rand(0, 600), speed: rand(80, 170) }
}

function build() {
  const cols = Math.floor(width / CELL)
  const rows = Math.floor(height / CELL)
  const target = Math.max(14, Math.min(60, Math.round((width * height) / 16000)))
  traces = []
  let guard = 0
  while (traces.length < target && guard++ < target * 6) {
    const t = makeTrace(cols, rows)
    if (t) traces.push(t)
  }
}

function pointAt(t: Trace, s: number): Point {
  const d = Math.max(0, Math.min(t.len, s))
  let i = 1
  while (i < t.cum.length - 1 && (t.cum[i] as number) < d) i++
  const a = t.pts[i - 1] as Point
  const b = t.pts[i] as Point
  const segLen = (t.cum[i] as number) - (t.cum[i - 1] as number)
  const k = segLen === 0 ? 0 : (d - (t.cum[i - 1] as number)) / segLen
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }
}

function strokeTraces(c: CanvasRenderingContext2D, color: string, lineWidth: number) {
  c.strokeStyle = color
  c.lineWidth = lineWidth
  c.beginPath()
  for (const t of traces) {
    const first = t.pts[0] as Point
    c.moveTo(first.x, first.y)
    for (let i = 1; i < t.pts.length; i++) {
      const p = t.pts[i] as Point
      c.lineTo(p.x, p.y)
    }
  }
  c.stroke()
}

function drawPads(c: CanvasRenderingContext2D, color: string) {
  c.strokeStyle = color
  c.lineWidth = 2
  for (const t of traces) {
    for (const p of [t.pts[0] as Point, t.pts[t.pts.length - 1] as Point]) {
      c.beginPath()
      c.arc(p.x, p.y, 4, 0, Math.PI * 2)
      c.stroke()
    }
  }
}

function drawPulses(c: CanvasRenderingContext2D) {
  for (const t of traces) {
    if (t.pulse < 0) continue
    for (let k = 0; k < TRAIL; k++) {
      const s0 = t.pulse - k * 7
      const s1 = t.pulse - (k + 1) * 7
      if (s1 > t.len) continue
      if (s0 < 0) break
      const a = pointAt(t, s0)
      const b = pointAt(t, s1)
      c.strokeStyle = `rgba(79, 209, 255, ${(1 - k / TRAIL) * 0.9})`
      c.lineWidth = 2.5
      c.beginPath()
      c.moveTo(a.x, a.y)
      c.lineTo(b.x, b.y)
      c.stroke()
    }
    if (t.pulse <= t.len) {
      const head = pointAt(t, t.pulse)
      const g = c.createRadialGradient(head.x, head.y, 0, head.x, head.y, 14)
      g.addColorStop(0, 'rgba(79, 209, 255, 0.75)')
      g.addColorStop(1, 'rgba(79, 209, 255, 0)')
      c.fillStyle = g
      c.beginPath()
      c.arc(head.x, head.y, 14, 0, Math.PI * 2)
      c.fill()
    }
  }
}

function draw() {
  const c = ctx
  if (!c) return
  c.clearRect(0, 0, width, height)
  c.lineJoin = 'round'
  c.lineCap = 'round'

  strokeTraces(c, 'rgba(233, 180, 76, 0.16)', 2)
  drawPads(c, 'rgba(233, 180, 76, 0.3)')

  if (glow > 0.01) {
    c.save()
    c.beginPath()
    c.arc(mouseX, mouseY, GLOW_RADIUS, 0, Math.PI * 2)
    c.clip()
    strokeTraces(c, `rgba(233, 180, 76, ${0.6 * glow})`, 2)
    drawPads(c, `rgba(233, 180, 76, ${0.9 * glow})`)
    c.restore()

    const g = c.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, GLOW_RADIUS)
    g.addColorStop(0, `rgba(79, 209, 255, ${0.12 * glow})`)
    g.addColorStop(1, 'rgba(79, 209, 255, 0)')
    c.fillStyle = g
    c.fillRect(mouseX - GLOW_RADIUS, mouseY - GLOW_RADIUS, GLOW_RADIUS * 2, GLOW_RADIUS * 2)
  }

  drawPulses(c)
}

function frame(now: number) {
  raf = 0
  if (!visible) return
  const dt = Math.min(0.05, (now - last) / 1000)
  last = now
  glow += (glowTarget - glow) * Math.min(1, dt * 6)
  for (const t of traces) {
    t.pulse += t.speed * dt
    if (t.pulse > t.len + TRAIL * 7) t.pulse = -rand(0, 500)
  }
  draw()
  raf = requestAnimationFrame(frame)
}

function start() {
  if (reduced || raf || !visible) return
  last = performance.now()
  raf = requestAnimationFrame(frame)
}

function resize() {
  const el = canvas.value
  if (!el) return
  const parent = el.parentElement
  if (!parent) return
  const rect = parent.getBoundingClientRect()
  width = Math.max(1, Math.floor(rect.width))
  height = Math.max(1, Math.floor(rect.height))
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.width = Math.floor(width * dpr)
  el.height = Math.floor(height * dpr)
  ctx = el.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  build()
  if (reduced) {
    // Still image: park each pulse part-way along its trace.
    for (const t of traces) t.pulse = t.len * 0.5
    draw()
  } else {
    draw()
  }
}

function onMove(e: PointerEvent) {
  const el = canvas.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  mouseX = e.clientX - rect.left
  mouseY = e.clientY - rect.top
  glowTarget = 1
}

function onLeave() {
  glowTarget = 0
}

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const el = canvas.value
  const parent = el?.parentElement
  if (!el || !parent) return

  resize()
  resizeObserver = new ResizeObserver(() => resize())
  resizeObserver.observe(parent)

  parent.addEventListener('pointermove', onMove)
  parent.addEventListener('pointerleave', onLeave)

  intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true
    if (visible) start()
  })
  intersectionObserver.observe(el)

  start()
})

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  const parent = canvas.value?.parentElement
  parent?.removeEventListener('pointermove', onMove)
  parent?.removeEventListener('pointerleave', onLeave)
})
</script>

<template>
  <canvas ref="canvas" class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true"></canvas>
</template>
