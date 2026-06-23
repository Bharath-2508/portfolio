import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    else if (form.message.trim().length < 10) errs.message = 'Min 10 characters'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  return (
    <section id="contact" className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-subtitle">Get In Touch</span>
        <h2 className="section-title">Contact Me</h2>
        <div className="section-divider" />
      </motion.div>

      <div className="contact-grid">
        <div className="contact-info">
          {[
            { icon: <Mail size={22} />, title: 'Email', value: 'bharathstu07@gmail.com', href: 'mailto:bharathstu07@gmail.com' },
            { icon: <Phone size={22} />, title: 'Phone', value: '+91 8637404318', href: 'tel:+918637404318' },
            { icon: <MapPin size={22} />, title: 'Location', value: 'Namakkal, Tamil Nadu, India' },
          ].map((info, i) => (
            <motion.div
              key={info.title}
              className="contact-info-card glass"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ x: 6 }}
            >
              <div className="contact-info-icon">{info.icon}</div>
              <div>
                <h4>{info.title}</h4>
                {info.href ? <a href={info.href}>{info.value}</a> : <p>{info.value}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.form
          className="contact-form glass"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {submitted && (
            <motion.div
              className="form-success"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}
          <div className="form-row">
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} className={errors.name ? 'input-error' : ''} />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} className={errors.email ? 'input-error' : ''} />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>
          <div className="form-group">
            <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} className={errors.subject ? 'input-error' : ''} />
            {errors.subject && <span className="error-text">{errors.subject}</span>}
          </div>
          <div className="form-group">
            <textarea name="message" rows="5" placeholder="Your Message" value={form.message} onChange={handleChange} className={errors.message ? 'input-error' : ''} />
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>
          <motion.button
            type="submit"
            className="btn btn-primary btn-submit"
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59,130,246,0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Send size={18} /> Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
