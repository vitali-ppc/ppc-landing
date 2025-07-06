'use client'

import { useState } from 'react'

interface ContactFormProps {
  title: string
  description: string
  features: Array<{
    text: string
  }>
}

export default function ContactForm({ title, description, features }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    timeline: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.project.trim()) {
      newErrors.project = 'Project description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Here you would typically send the data to your server
      console.log('Contact form submitted:', formData)
      
      // Show success message
      setIsSubmitted(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        project: '',
        budget: '',
        timeline: ''
      })
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }
  }

  return (
    <section id="contact" className="professional-contact-section">
      <div className="container">
        <div className="professional-contact-grid">
          <div className="professional-contact-info">
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="professional-contact-features">
              {features.map((feature, index) => (
                <div key={index} className="professional-contact-feature">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="professional-contact-form">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                />
                <span className="error-message">{errors.name}</span>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                <span className="error-message">{errors.email}</span>
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="project">Project Description *</label>
                <textarea 
                  id="project" 
                  name="project" 
                  rows={4} 
                  placeholder="Tell us about your Next.js project requirements..."
                  value={formData.project}
                  onChange={handleInputChange}
                  className={errors.project ? 'error' : ''}
                ></textarea>
                <span className="error-message">{errors.project}</span>
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget Range</label>
                <select 
                  id="budget" 
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                >
                  <option value="">Select budget range</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="timeline">Timeline</label>
                <select 
                  id="timeline" 
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                >
                  <option value="">Select timeline</option>
                  <option value="1-2months">1-2 months</option>
                  <option value="2-4months">2-4 months</option>
                  <option value="4-6months">4-6 months</option>
                  <option value="6+months">6+ months</option>
                </select>
              </div>
              <button type="submit" className="professional-submit-btn">
                <svg className="btn-calendar-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle', marginRight: '10px'}} aria-hidden="true" focusable="false">
                  <rect x="3" y="5" width="14" height="12" rx="3" fill="#23272f"/>
                  <path d="M3 8.5H17" stroke="#23272f" strokeWidth="1.5" strokeLinecap="round"/>
                  <rect x="7" y="11" width="2" height="2" rx="1" fill="#fff"/>
                  <rect x="11" y="11" width="2" height="2" rx="1" fill="#fff"/>
                </svg>
                Schedule Consultation
              </button>
              {isSubmitted && (
                <div className="success-message">
                  Thank you for your message! We will get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
} 