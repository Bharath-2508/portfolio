import { motion } from 'framer-motion'
import { GraduationCap, Star, Languages } from 'lucide-react'

const strengths = [
  'Full Stack Development',
  'Problem Solving',
  'Team Collaboration',
  'Adaptability',
  'Continuous Learning',
]

const languages = [
  { name: 'Tamil', level: 'Fluent' },
  { name: 'English', level: 'Fluent' },
  { name: 'German', level: 'Basic' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function About() {
  return (
    <section id="about" className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-subtitle">Get To Know</span>
        <h2 className="section-title">About Me</h2>
        <div className="section-divider" />
      </motion.div>

      <motion.div
        className="about-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="about-card glass" variants={item} whileHover={{ y: -6, transition: { duration: 0.2 } }}>
          <div className="about-card-icon"><GraduationCap size={28} /></div>
          <h3 className="about-card-title">Education</h3>
          <p className="about-degree">B.Tech Artificial Intelligence & Machine Learning</p>
          <p className="about-college">SNS College of Technology</p>
          <p className="about-cgpa">CGPA: 7.6</p>
        </motion.div>

        <motion.div className="about-card glass" variants={item} whileHover={{ y: -6, transition: { duration: 0.2 } }}>
          <div className="about-card-icon"><Star size={28} /></div>
          <h3 className="about-card-title">Strengths</h3>
          <ul className="about-list">
            {strengths.map(s => (
              <li key={s} className="about-list-item">{s}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="about-card glass" variants={item} whileHover={{ y: -6, transition: { duration: 0.2 } }}>
          <div className="about-card-icon"><Languages size={28} /></div>
          <h3 className="about-card-title">Languages</h3>
          <ul className="about-list">
            {languages.map(l => (
              <li key={l.name} className="about-list-item lang-item">
                <span className="lang-name">{l.name}</span>
                <span className="lang-level">{l.level}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
