'use client'

import { useState } from 'react'

export default function ModernPPCContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateName = (name: string) => {
    return name.trim().length >= 2
  }

  const showError = (input: HTMLInputElement | HTMLTextAreaElement, message: string) => {
    let errorDiv = input.parentNode?.querySelector('.error-message') as HTMLElement
    if (!errorDiv) {
      errorDiv = document.createElement('div')
      errorDiv.className = 'error-message'
      errorDiv.style.cssText = 'color: #dc3545; font-size: 12px; margin-top: 4px; display: block;'
      input.parentNode?.appendChild(errorDiv)
    }
    errorDiv.textContent = message
    input.style.borderColor = '#dc3545'
  }

  const hideError = (input: HTMLInputElement | HTMLTextAreaElement) => {
    const errorDiv = input.parentNode?.querySelector('.error-message') as HTMLElement
    if (errorDiv) {
      errorDiv.remove()
    }
    input.style.borderColor = ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    let hasErrors = false
    
    // Validate Name
    const name = formData.name.trim()
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement
    if (name === '') {
      showError(nameInput, 'Please fill in your name')
      hasErrors = true
      nameInput.focus()
    } else if (!validateName(name)) {
      showError(nameInput, 'Please enter a valid name')
      hasErrors = true
      nameInput.focus()
    } else {
      hideError(nameInput)
    }
    
    // Validate Email
    const email = formData.email.trim()
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement
    if (email === '') {
      showError(emailInput, 'Please enter a valid email address')
      hasErrors = true
      if (!nameInput.value.trim()) emailInput.focus()
    } else if (!validateEmail(email)) {
      showError(emailInput, 'Please enter a valid email address')
      hasErrors = true
      if (!nameInput.value.trim()) emailInput.focus()
    } else {
      hideError(emailInput)
    }
    
    if (!hasErrors) {
      // Form is valid, you can submit it here
      console.log('Form is valid, submitting...', formData)
      // form.submit(); // Uncomment to actually submit
    }
  }

  return (
    <form className="neo-contact-form" id="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="neo-input-group">
        <input 
          type="text" 
          className="neo-input" 
          name="name" 
          placeholder="Your Name *" 
          title="Please fill in your name" 
          autoComplete="off"
          value={formData.name}
          onChange={handleInputChange}
          onBlur={(e) => {
            const name = e.target.value.trim()
            if (name === '') {
              showError(e.target, 'Please fill in your name')
            } else if (!validateName(name)) {
              showError(e.target, 'Please enter a valid name')
            }
          }}
          onInput={(e) => {
            const name = e.currentTarget.value.trim()
            if (name === '') {
              hideError(e.currentTarget)
            } else if (!validateName(name)) {
              showError(e.currentTarget, 'Please enter a valid name')
            } else {
              hideError(e.currentTarget)
            }
          }}
        />
      </div>
      <div className="neo-input-group">
        <input 
          type="email" 
          className="neo-input" 
          name="email" 
          placeholder="Email Address *" 
          title="Please enter a valid email address" 
          autoComplete="off"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={(e) => {
            const email = e.target.value.trim()
            if (email === '') {
              showError(e.target, 'Please enter a valid email address')
            } else if (!validateEmail(email)) {
              showError(e.target, 'Please enter a valid email address')
            }
          }}
          onInput={(e) => {
            const email = e.currentTarget.value.trim()
            if (email === '') {
              hideError(e.currentTarget)
            } else if (!validateEmail(email)) {
              showError(e.currentTarget, 'Please enter a valid email address')
            } else {
              hideError(e.currentTarget)
            }
          }}
        />
      </div>
      <div className="neo-input-group">
        <input 
          type="text" 
          className="neo-input" 
          name="company" 
          placeholder="Company"
          value={formData.company}
          onChange={handleInputChange}
        />
      </div>
      <div className="neo-input-group">
        <textarea 
          className="neo-textarea" 
          name="message" 
          placeholder="Describe your needs" 
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <button type="submit" className="neo-submit">Send Inquiry</button>
    </form>
  )
} 