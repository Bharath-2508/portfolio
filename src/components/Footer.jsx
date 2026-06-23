import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Bharath Suresh</h3>
          <p>Full Stack Developer | AI Enthusiast</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            {quickLinks.map(l => (
              <li key={l.href}>
                <motion.button
                  onClick={() => scrollTo(l.href)}
                  whileHover={{ x: 4 }}
                >
                  {l.label}
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-social">
          <h4>Connect</h4>
          <div className="footer-social-icons">
            {[
              { icon: <Github size={20} />, href: 'https://github.com/bharathsuresh', label: 'GitHub' },
              { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/bharathsuresh', label: 'LinkedIn' },
              { icon: <Mail size={20} />, href: 'mailto:bharathstu07@gmail.com', label: 'Email' },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3, boxShadow: '0 0 16px rgba(59,130,246,0.3)' }}
                whileTap={{ scale: 0.9 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          &copy; {new Date().getFullYear()} Bharath Suresh. Made with <Heart size={14} className="heart-icon" /> using React
        </motion.p>
      </div>
    </footer>
  )
}
