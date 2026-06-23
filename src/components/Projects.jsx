import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2 } from 'lucide-react'
import { useTilt } from '../hooks/index'

const projects = [
  {
    id: 'bus',
    title: 'Bus Attendance Management System',
    description: 'A comprehensive attendance tracking system for student buses with admin dashboard, bus allocation, and secure JWT authentication. Containerized with Docker for easy deployment.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Docker'],
    category: 'fullstack',
  },
  {
    id: 'election',
    title: 'Election AI Assistant',
    description: 'An AI-powered voice and text chatbot providing information about Tamil Nadu politics, elections, and candidates. Features offline support and real-time responses.',
    tech: ['Flutter', 'FastAPI', 'Python', 'AI/ML'],
    category: 'ai',
  },
  {
    id: 'farm',
    title: 'FarmNetStore',
    description: 'A livestock trading platform connecting farmers and buyers with product listings, user authentication, and real-time database synchronization using Firebase.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    category: 'web',
  },
]

const filters = [
  { key: 'all', label: 'All Projects' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'ai', label: 'AI/ML' },
  { key: 'web', label: 'Web Dev' },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  useTilt(ref)

  return (
    <motion.div
      ref={ref}
      className="project-card glass"
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -6 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="project-icon">
        <Code2 size={22} />
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="project-tech">
        {project.tech.map(t => (
          <span key={t} className="tech-badge">{t}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-subtitle">My Work</span>
        <h2 className="section-title">Projects Showcase</h2>
        <div className="section-divider" />
      </motion.div>

      <div className="project-filters">
        {filters.map(f => (
          <motion.button
            key={f.key}
            className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {f.label}
          </motion.button>
        ))}
      </div>

      <motion.div className="projects-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
