import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, ArrowRight, ChevronDown } from 'lucide-react'

const roles = [
  'Full Stack Developer',
  'AI Enthusiast',
  'MERN Stack Developer',
  'Problem Solver',
]

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.4 },
  }),
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!deleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }, 80)
    } else if (!deleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
      }, 40)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setRoleIndex(prev => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, roleIndex])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const name = 'Bharath Suresh'

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <motion.p
            className="hero-greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Hello, I'm
          </motion.p>

          <h1 className="hero-name">
            {name.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

          <motion.div
            className="hero-typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span>{displayText}</span>
            <span className="typing-cursor">|</span>
          </motion.div>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Aspiring Full Stack Developer with hands-on experience in MERN Stack development,
            REST API creation, and responsive web applications. Passionate about building scalable
            digital solutions and continuously learning emerging technologies.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.a
              href="/resume.pdf"
              download
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(59,130,246,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} /> Download Resume
            </motion.a>
            <motion.button
              className="btn btn-secondary"
              onClick={() => scrollTo('#projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects <ArrowRight size={18} />
            </motion.button>
            <motion.button
              className="btn btn-outline"
              onClick={() => scrollTo('#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            {[
              { icon: <Github size={22} />, href: 'https://github.com/bharathsuresh', label: 'GitHub' },
              { icon: <Linkedin size={22} />, href: 'https://linkedin.com/in/bharathsuresh', label: 'LinkedIn' },
              { icon: <Mail size={22} />, href: 'mailto:bharathstu07@gmail.com', label: 'Email' },
            ].map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={s.label}
                whileHover={{ y: -4, boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="hero-image-glow" />
          <div className="hero-image-container">
            <div className="hero-image-placeholder">
              <span>BS</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        className="scroll-down"
        onClick={() => scrollTo('#about')}
        aria-label="Scroll down"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  )
}
