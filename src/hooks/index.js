import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return pos
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return progress
}

export function useTilt(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handler = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -8
      const rotateY = ((x - centerX) / centerX) * 8
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const leave = () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    }

    el.addEventListener('mousemove', handler)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', handler)
      el.removeEventListener('mouseleave', leave)
    }
  }, [ref])
}
