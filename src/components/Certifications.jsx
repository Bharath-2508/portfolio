import { motion } from 'framer-motion'
import { Award, BookOpen } from 'lucide-react'

const certifications = [
  { title: 'Full Stack Development', issuer: 'PrepInsta' },
  { title: 'Foundations of Generative AI', issuer: 'Simplilearn' },
  { title: 'Python Programming', issuer: 'PrepInsta' },
]

const coursework = [
  'Data Structures & Algorithms',
  'DBMS',
  'Operating Systems',
  'Computer Networks',
  'Object Oriented Programming',
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-subtitle">Achievements</span>
        <h2 className="section-title">Certifications & Coursework</h2>
        <div className="section-divider" />
      </motion.div>

      <div className="certs-grid">
        <div>
          <motion.h3
            className="certs-column-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Award size={22} /> Certifications
          </motion.h3>
          <motion.div
            className="certs-list"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {certifications.map((cert, i) => (
              <motion.div key={i} className="cert-card glass" variants={item} whileHover={{ x: 6 }}>
                <div className="cert-icon"><Award size={24} /></div>
                <div className="cert-info">
                  <h4 className="cert-title">{cert.title}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div>
          <motion.h3
            className="certs-column-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <BookOpen size={22} /> Key Coursework
          </motion.h3>
          <motion.div
            className="course-list"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {coursework.map((course, i) => (
              <motion.div key={i} className="course-item glass" variants={item} whileHover={{ x: 6 }}>
                <span className="course-dot" />
                <span className="course-name">{course}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
