import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95, color: '#3B82F6' },
      { name: 'CSS3', level: 90, color: '#3B82F6' },
      { name: 'JavaScript', level: 85, color: '#3B82F6' },
      { name: 'React.js', level: 80, color: '#3B82F6' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 80, color: '#3B82F6' },
      { name: 'Express.js', level: 78, color: '#3B82F6' },
      { name: 'REST APIs', level: 85, color: '#3B82F6' },
    ],
  },
  {
    title: 'Database',
    skills: [
      { name: 'MongoDB', level: 75, color: '#3B82F6' },
      { name: 'MySQL', level: 70, color: '#3B82F6' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', level: 85, color: '#3B82F6' },
      { name: 'GitHub', level: 88, color: '#3B82F6' },
      { name: 'VS Code', level: 92, color: '#3B82F6' },
      { name: 'ChatGPT', level: 90, color: '#3B82F6' },
      { name: 'Ollama', level: 75, color: '#3B82F6' },
    ],
  },
]

const experiences = [
  { role: 'Frontend Developer Intern', company: 'DarkCodex', year: '2025', points: ['Built responsive user interfaces', 'Optimized frontend performance', 'Collaborated with development teams'] },
  { role: 'MERN Stack Intern', company: 'CodeTechIT Solutions', year: '2024', points: ['Developed REST APIs', 'Implemented authentication systems', 'Performed CRUD operations'] },
  { role: 'Web Development Intern', company: 'Ebix Global Services', year: '2023', points: ['Backend integration', 'Database management', 'Bug fixing and testing'] },
]

function SkillBar({ name, level, color, index }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true) } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      className="skill-item"
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ x: 4 }}
    >
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: visible ? `${level}%` : '0%',
            backgroundColor: color,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="skills" className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-subtitle">My Abilities</span>
        <h2 className="section-title">Skills & Experience</h2>
        <div className="section-divider" />
      </motion.div>

      <div className="skills-experience-grid">
        <div>
          <div className="skills-tabs">
            {skillCategories.map((cat, i) => (
              <motion.button
                key={cat.title}
                className={`skills-tab ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.title}
              </motion.button>
            ))}
          </div>
          <motion.div
            className="skills-content glass"
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="skills-category-title">{skillCategories[activeTab].title}</h3>
            {skillCategories[activeTab].skills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} index={i} />
            ))}
          </motion.div>
        </div>

        <div>
          <motion.h3
            className="experience-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Briefcase size={22} /> Internship Timeline
          </motion.h3>
          <div className="timeline">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className="timeline-item glass"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                whileHover={{ x: 4 }}
              >
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <span className="timeline-year">{exp.year}</span>
                  <h4 className="timeline-role">{exp.role}</h4>
                  <p className="timeline-company">{exp.company}</p>
                  <ul className="timeline-points">
                    {exp.points.map((pt, j) => <li key={j}>{pt}</li>)}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
