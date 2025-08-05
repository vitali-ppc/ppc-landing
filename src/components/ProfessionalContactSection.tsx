'use client'

import { useState } from 'react'

interface ProfessionalContactSectionProps {
  title: string
  description: string
}

export default function ProfessionalContactSection({ title, description }: ProfessionalContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      newErrors.name = 'Please fill in your name'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid name'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter a valid email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
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
        message: ''
      })
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }
  }

  return (
    <section id="contact" className="professional-contact-section">
      <div className="container">
        <div className="professional-section-header">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="professional-contact-content">
          <div className="professional-contact-info">
            <div className="professional-contact-item">
              <div className="professional-contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3>Email</h3>
                <p>info@kampaio.com</p>
              </div>
            </div>
            <div className="professional-contact-item">
              <div className="professional-contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.366.711.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
                  <path d="M12.004 2.003c-5.523 0-9.997 4.474-9.997 9.997 0 1.762.464 3.484 1.345 4.997L2 22l5.09-1.333c1.47.803 3.13 1.236 4.914 1.236 5.523 0 9.997-4.474 9.997-9.997 0-5.523-4.474-9.997-9.997-9.997zm0 17.995c-1.627 0-3.217-.438-4.59-1.267l-.328-.195-3.018.791.805-2.942-.213-.302c-.822-1.166-1.257-2.537-1.257-3.98 0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h3>WhatsApp</h3>
                <p>Available upon request</p>
              </div>
            </div>
            <div className="professional-contact-item">
              <div className="professional-contact-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <h3>LinkedIn</h3>
                <p><a href="https://www.linkedin.com/in/vitali-ppc%E2%9C%94-26b294b4/" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}} aria-label="Visit our LinkedIn profile">linkedin.com/in/kampaio</a></p>
              </div>
            </div>
          </div>
          <div className="professional-contact-form">
            <h3>Send Inquiry</h3>
            <form className="professional-contact-form-inner" onSubmit={handleSubmit} noValidate>
              <div className="professional-input-group">
                <input 
                  type="text" 
                  id="name"
                  className={`professional-input ${errors.name ? 'error' : ''}`}
                  name="name" 
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-required="true"
                />
                {errors.name && <span id="name-error" className="error-message" role="alert">{errors.name}</span>}
              </div>
              <div className="professional-input-group">
                <input 
                  type="email" 
                  id="email"
                  className={`professional-input ${errors.email ? 'error' : ''}`}
                  name="email" 
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-required="true"
                />
                {errors.email && <span id="email-error" className="error-message" role="alert">{errors.email}</span>}
              </div>
              <div className="professional-input-group">
                <input 
                  type="text" 
                  id="company"
                  className="professional-input"
                  name="company" 
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="professional-input-group">
                <textarea 
                  id="message"
                  className="professional-textarea"
                  name="message" 
                  placeholder="Describe your business needs" 
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button type="submit" className="professional-submit" aria-label="Send inquiry form">Send Inquiry</button>
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