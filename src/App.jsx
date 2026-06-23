import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { useMousePosition, useScrollProgress } from './hooks/index'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setDone(true), 400)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      style={{ pointerEvents: done ? 'none' : 'auto' }}
    >
      <motion.div
        className="preloader-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        BS
      </motion.div>
      <div className="preloader-bar">
        <motion.div
          className="preloader-bar-fill"
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  )
}

function Spotlight() {
  const { x, y } = useMousePosition()
  return <div className="spotlight" style={{ left: x, top: y }} />
}

function ScrollProgress() {
  const progress = useScrollProgress()
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />
}

function AppContent() {
  return (
    <>
      <Preloader />
      <Spotlight />
      <ScrollProgress />
      <div className="grid-bg" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
