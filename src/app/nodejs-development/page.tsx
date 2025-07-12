'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Breadcrumbs from '@/components/Breadcrumbs'
import Footer from '@/components/Footer'

export default function NodeJsDevelopmentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateName = (name: string) => {
    return name.trim().length >= 2
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Real-time validation
    if (name === 'name') {
      if (value.trim() === '') {
        setErrors(prev => ({ ...prev, name: '' }))
      } else if (!validateName(value)) {
        setErrors(prev => ({ ...prev, name: 'Please fill in your name' }))
      } else {
        setErrors(prev => ({ ...prev, name: '' }))
      }
    }

    if (name === 'email') {
      if (value.trim() === '') {
        setErrors(prev => ({ ...prev, email: '' }))
      } else if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
      } else {
        setErrors(prev => ({ ...prev, email: '' }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    const newErrors = {
      name: '',
      email: ''
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Please fill in your name'
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Please fill in your name'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter a valid email address'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    setErrors(newErrors)

    if (newErrors.name || newErrors.email) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      })
      setErrors({
        name: '',
        email: ''
      })
      setIsSubmitted(true)
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <>
      <Header />
      <Breadcrumbs />
      
      <section className="professional-hero">
        <div className="container">
          <div className="professional-hero-grid">
            <div className="professional-hero-main">
              <h1 className="professional-hero-title">Business-Driven Node.js Solutions</h1>
              <p className="professional-hero-subtitle">Build fast, scalable, and future-ready products with Node.js</p>
              <div className="professional-btn-group">
                <a href="#contact" className="professional-btn premium-gradient-btn" aria-label="Get started with Node.js development">
                  <svg className="btn-calendar-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style={{ verticalAlign: 'middle', marginRight: '10px' }}>
                    <rect x="3" y="5" width="14" height="12" rx="3" fill="#23272f"/>
                    <path d="M3 8.5H17" stroke="#23272f" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="7" y="11" width="2" height="2" rx="1" fill="#fff"/>
                    <rect x="11" y="11" width="2" height="2" rx="1" fill="#fff"/>
                  </svg>
                  Get Started
                </a>
              </div>
            </div>
            
            <div className="professional-hero-cards">
              <div className="professional-mini-card" style={{ padding: '24px 20px', height: 'fit-content' }}>
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M3 17V21H21" />
                    <rect x="7" y="13" width="3" height="5" />
                    <rect x="12" y="9" width="3" height="9" />
                    <rect x="17" y="5" width="3" height="13" />
                  </svg>
                </div>
                <h3>Scalable Design</h3>
                <p>Easily grow from MVP to enterprise — Node.js adapts as your business expands</p>
              </div>
              <div className="professional-mini-card" style={{ padding: '24px 20px', height: 'fit-content' }}>
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="4"/>
                    <line x1="12" y1="2" x2="12" y2="8"/>
                    <line x1="12" y1="16" x2="12" y2="22"/>
                    <line x1="2" y1="12" x2="8" y2="12"/>
                    <line x1="16" y1="12" x2="22" y2="12"/>
                    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
                    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
                    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
                    <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
                  </svg>
                </div>
                <h3>Universal Platform</h3>
                <p>Build web apps, APIs, automation, and more — all in one stack</p>
              </div>
              <div className="professional-mini-card" style={{ padding: '24px 20px', height: 'fit-content' }}>
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M10 13a5 5 0 0 1 7 7l-3 3a5 5 0 0 1-7-7"/>
                    <path d="M14 11a5 5 0 0 0-7-7l-3 3a5 5 0 0 0 7 7"/>
                  </svg>
                </div>
                <h3>Seamless Integration</h3>
                <p>Connect your apps, data, and cloud services for a unified workflow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Block */}
      <section id="services" className="professional-problems-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Node.js Services for Business Growth</h2>
            <p>Unlock new opportunities with flexible, scalable, and integrated Node.js solutions</p>
          </div>
          <div className="professional-problems-grid">
            <div className="professional-problem-card" style={{ padding: '32px 24px', height: 'fit-content' }}>
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M9 18h6"/>
                  <path d="M10 22h4"/>
                  <path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6-4 7.5a2 2 0 0 1-6 0C7.5 15 5 12.5 5 9a7 7 0 0 1 7-7z"/>
                </svg>
              </div>
              <h3>Custom Web Solutions</h3>
              <p>Transform your ideas into powerful digital products that drive growth and engagement</p>
            </div>
            <div className="professional-problem-card" style={{ padding: '32px 24px', height: 'fit-content' }}>
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <polyline points="13 2 13 13 17 13 7 22 11 11 7 11 13 2"/>
                </svg>
              </div>
              <h3>Real-Time Experiences</h3>
              <p>Deliver instant updates, live collaboration, and interactive features for your users</p>
            </div>
            <div className="professional-problem-card" style={{ padding: '32px 24px', height: 'fit-content' }}>
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-1.82-.33l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <h3>Automation & Efficiency</h3>
              <p>Streamline operations and save time with smart automation powered by Node.js</p>
            </div>
            <div className="professional-problem-card" style={{ padding: '32px 24px', height: 'fit-content' }}>
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
                  <path d="M3 12a9 3 0 0 0 18 0"/>
                </svg>
              </div>
              <h3>Data Integration</h3>
              <p>Unify your business data with seamless connections to modern databases and cloud storage</p>
            </div>
            <div className="professional-problem-card" style={{ padding: '32px 24px', height: 'fit-content' }}>
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <circle cx="6" cy="6" r="3"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="12" r="3"/>
                  <path d="M6 9v6a6 6 0 0 0 6 6h0a6 6 0 0 0 6-6V9"/>
                </svg>
              </div>
              <h3>API & Integration</h3>
              <p>Connect your business systems and automate workflows with secure, scalable APIs</p>
            </div>
          </div>
        </div>
      </section>

      {/* This Website Is Powered by Node.js */}
      <section className="nodejs-powered-section" style={{ background: '#fff', padding: '72px 0 64px 0' }}>
        <div className="container">
          <div className="professional-section-header" style={{ marginBottom: 40 }}>
            <h2 style={{ color: '#23272f' }}>This Website Is Powered by Node.js</h2>
            <p style={{ color: '#666', fontSize: '1.18rem', maxWidth: 540, margin: '16px auto 0 auto' }}>
              Experience the speed, flexibility, and scalability of Node.js — right here, right now
            </p>
          </div>
          <div className="nodejs-powered-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 32, maxWidth: 980, margin: '0 auto' }}>
            <div className="nodejs-powered-card material-card">
              <div className="material-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7f9cf5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><polyline points="13 2 13 13 17 13 7 22 11 11 7 11 13 2"/></svg>
              </div>
              <h3>Fast & Real-Time</h3>
              <p>Lightning-fast loading and real-time updates for a seamless user experience</p>
            </div>
            <div className="nodejs-powered-card material-card">
              <div className="material-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7f9cf5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M10 13a5 5 0 0 1 7 7l-3 3a5 5 0 0 1-7-7"/><path d="M14 11a5 5 0 0 0-7-7l-3 3a5 5 0 0 0 7 7"/></svg>
              </div>
              <h3>Seamless Integration</h3>
              <p>Effortless integration with analytics, cloud and business tools</p>
            </div>
            <div className="nodejs-powered-card material-card">
              <div className="material-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7f9cf5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M3 17V21H21"/><rect x="7" y="13" width="3" height="5"/><rect x="12" y="9" width="3" height="9"/><rect x="17" y="5" width="3" height="13"/></svg>
              </div>
              <h3>Scalable Architecture</h3>
              <p>Ready for any traffic — from startups to enterprise-level loads</p>
            </div>
            <div className="nodejs-powered-card material-card">
              <div className="material-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7f9cf5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3>Secure & Reliable</h3>
              <p>Enterprise-grade security and reliability for your business data</p>
            </div>
            <div className="nodejs-powered-card material-card">
              <div className="material-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7f9cf5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/></svg>
              </div>
              <h3>SEO & Mobile-Ready</h3>
              <p>Optimized for search engines and mobile devices from day one</p>
            </div>
          </div>
          <p style={{ marginTop: 36, color: '#888', fontSize: '1.01rem', textAlign: 'center', maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
            Node.js is the foundation of our backend expertise, including advanced projects built with <a href="/nextjs-development" className="accent-link">Next.js</a>.
          </p>
        </div>
      </section>

      {/* Schema.org SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Node.js Development Services by PPCSet",
            "description": "Professional Node.js development services: full-stack web apps, APIs, real-time solutions, and scalable business platforms.",
            "url": "https://ppcset.com/nodejs-development",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "provider": {
              "@type": "Organization",
              "name": "PPCSet",
              "url": "https://ppcset.com",
              "logo": "https://ppcset.com/logo.png"
            },
            "featureList": [
              "Full-stack Node.js web apps",
              "RESTful API development",
              "Real-time applications",
              "Scalable business solutions",
              "Agile delivery"
            ]
          })
        }}
      />

      {/* FAQ Section */}
      <section className="faq-section" style={{ background: '#1a1a1a', padding: '80px 0 64px 0', position: 'relative' }}>
        <div className="container">
          <div className="professional-section-header" style={{ marginBottom: 48 }}>
            <h2 style={{ color: '#ffffff' }}>Node.js Development FAQ</h2>
            <p style={{ color: '#a0a0a0', fontSize: '1.18rem', maxWidth: 540, margin: '16px auto 0 auto' }}>
              Everything you need to know before starting your Node.js project
            </p>
          </div>
          
          <div className="faq-container" style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="faq-item" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, marginBottom: 24, overflow: 'hidden', transition: 'all 0.3s ease' }}>
              <div className="faq-question" style={{ padding: '32px 40px 24px 40px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.08)', transition: 'background 0.3s ease' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.22rem', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>Why is Node.js a good choice for business?</h3>
              </div>
              <div className="faq-answer" style={{ padding: '0 40px 32px 40px' }}>
                <p style={{ color: '#a0a0a0', fontSize: '1.08rem', lineHeight: 1.7, margin: 0 }}>Node.js allows you to create fast, scalable, and reliable solutions that easily integrate with any modern services. It's the perfect choice for projects where speed, flexibility, and the ability to grow quickly are important.</p>
              </div>
            </div>

            <div className="faq-item" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, marginBottom: 24, overflow: 'hidden', transition: 'all 0.3s ease' }}>
              <div className="faq-question" style={{ padding: '32px 40px 24px 40px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.08)', transition: 'background 0.3s ease' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.22rem', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>What tasks are best solved with Node.js?</h3>
              </div>
              <div className="faq-answer" style={{ padding: '0 40px 32px 40px' }}>
                <p style={{ color: '#a0a0a0', fontSize: '1.08rem', lineHeight: 1.7, margin: 0 }}>Node.js is excellent for developing web applications, APIs, real-time services (chats, notifications), business process automation, cloud and analytics integrations, as well as for startups where quick hypothesis testing is important.</p>
              </div>
            </div>

            <div className="faq-item" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, marginBottom: 24, overflow: 'hidden', transition: 'all 0.3s ease' }}>
              <div className="faq-question" style={{ padding: '32px 40px 24px 40px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.08)', transition: 'background 0.3s ease' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.22rem', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>Can I integrate Node.js with existing systems?</h3>
              </div>
              <div className="faq-answer" style={{ padding: '0 40px 32px 40px' }}>
                <p style={{ color: '#a0a0a0', fontSize: '1.08rem', lineHeight: 1.7, margin: 0 }}>Absolutely! Node.js excels at integrations. We can connect your Node.js application with databases, payment systems, CRM, analytics platforms, cloud services, and any third-party APIs. This ensures seamless data flow and process automation.</p>
              </div>
            </div>

            <div className="faq-item" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, marginBottom: 24, overflow: 'hidden', transition: 'all 0.3s ease' }}>
              <div className="faq-question" style={{ padding: '32px 40px 24px 40px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.08)', transition: 'background 0.3s ease' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.22rem', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>How long does it take to develop a Node.js project?</h3>
              </div>
              <div className="faq-answer" style={{ padding: '0 40px 32px 40px' }}>
                <p style={{ color: '#a0a0a0', fontSize: '1.08rem', lineHeight: 1.7, margin: 0 }}>Development time depends on project complexity. A simple API can be ready in 2-3 weeks, while a complex web application might take 2-3 months. We always provide detailed timelines and can start with an MVP to get you to market faster.</p>
              </div>
            </div>

            <div className="faq-item" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, marginBottom: 24, overflow: 'hidden', transition: 'all 0.3s ease' }}>
              <div className="faq-question" style={{ padding: '32px 40px 24px 40px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.08)', transition: 'background 0.3s ease' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.22rem', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>What about security and maintenance?</h3>
              </div>
              <div className="faq-answer" style={{ padding: '0 40px 32px 40px' }}>
                <p style={{ color: '#a0a0a0', fontSize: '1.08rem', lineHeight: 1.7, margin: 0 }}>We implement security best practices from day one: input validation, authentication, HTTPS, regular updates, and monitoring. We also provide ongoing maintenance, performance optimization, and 24/7 support to ensure your application runs smoothly and securely.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Ideas & Tech Trends Section */}
      <section className="startup-ideas-section" style={{ background: '#fff', padding: '80px 0 64px 0' }}>
        <div className="container">
          <div className="professional-section-header" style={{ marginBottom: 48 }}>
            <h2 style={{ color: '#23272f' }}>Startup Ideas & Tech Trends</h2>
            <p style={{ color: '#666', fontSize: '1.18rem', maxWidth: 540, margin: '16px auto 0 auto' }}>
              Innovative business opportunities powered by modern technology
            </p>
          </div>
          
          <div className="startup-ideas-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 32, maxWidth: 1000, margin: '0 auto' }}>
            <div className="startup-idea-card material-card" style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 16, padding: '40px 32px', transition: 'all 0.3s ease', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
              <div className="startup-idea-icon" style={{ marginBottom: 24 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#7f9cf5' }} aria-hidden="true" focusable="false">
                  <path d="M3 3V21H21"/>
                  <path d="M9 9L12 6L16 10L21 5"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3 style={{ color: '#23272f', fontSize: '1.22rem', fontWeight: 600, marginBottom: 16, lineHeight: 1.3 }}>AI-Powered Analytics Platform</h3>
              <p style={{ color: '#666', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: 20 }}>Automated data analysis and reporting platform that provides actionable insights for businesses.</p>
              <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Node.js</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Machine Learning</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Real-time APIs</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Cloud</span>
              </div>
            </div>

            <div className="startup-idea-card material-card" style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 16, padding: '40px 32px', transition: 'all 0.3s ease', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
              <div className="startup-idea-icon" style={{ marginBottom: 24 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#7f9cf5' }} aria-hidden="true" focusable="false">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 style={{ color: '#23272f', fontSize: '1.22rem', fontWeight: 600, marginBottom: 16, lineHeight: 1.3 }}>Real-Time Collaboration Hub</h3>
              <p style={{ color: '#666', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: 20 }}>Advanced tools for remote work and team communication with real-time features.</p>
              <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Node.js</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>WebSockets</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Next.js</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Real-time DB</span>
              </div>
            </div>

            <div className="startup-idea-card material-card" style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 16, padding: '40px 32px', transition: 'all 0.3s ease', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
              <div className="startup-idea-icon" style={{ marginBottom: 24 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#7f9cf5' }} aria-hidden="true" focusable="false">
                  <path d="M6 6h15l-1.5 9h-13z"/>
                  <circle cx="9" cy="20" r="1.5"/>
                  <circle cx="18" cy="20" r="1.5"/>
                  <path d="M9 9h6"/>
                </svg>
              </div>
              <h3 style={{ color: '#23272f', fontSize: '1.22rem', fontWeight: 600, marginBottom: 16, lineHeight: 1.3 }}>Smart E-commerce Solution</h3>
              <p style={{ color: '#666', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: 20 }}>Intelligent online sales platform with personalized recommendations and automation.</p>
              <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Node.js</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Next.js</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Personalization Engine</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Payment APIs</span>
              </div>
            </div>

            <div className="startup-idea-card material-card" style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 16, padding: '40px 32px', transition: 'all 0.3s ease', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
              <div className="startup-idea-icon" style={{ marginBottom: 24 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#7f9cf5' }} aria-hidden="true" focusable="false">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </div>
              <h3 style={{ color: '#23272f', fontSize: '1.22rem', fontWeight: 600, marginBottom: 16, lineHeight: 1.3 }}>API Integration Platform</h3>
              <p style={{ color: '#666', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: 20 }}>Centralized hub for business process automation and third-party integrations.</p>
              <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Node.js</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Microservices</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Cloud</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Third-party APIs</span>
              </div>
            </div>

            <div className="startup-idea-card material-card" style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 16, padding: '40px 32px', transition: 'all 0.3s ease', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
              <div className="startup-idea-icon" style={{ marginBottom: 24 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#7f9cf5' }} aria-hidden="true" focusable="false">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                  <path d="M2 17L12 22L22 17"/>
                  <path d="M2 12L12 17L22 12"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3 style={{ color: '#23272f', fontSize: '1.22rem', fontWeight: 600, marginBottom: 16, lineHeight: 1.3 }}>IoT Data Management Platform</h3>
              <p style={{ color: '#666', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: 20 }}>Comprehensive system for collecting, analyzing, and managing data from IoT devices.</p>
              <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Node.js</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>IoT APIs</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Data Streaming</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Cloud</span>
              </div>
            </div>

            <div className="startup-idea-card material-card" style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 16, padding: '40px 32px', transition: 'all 0.3s ease', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
              <div className="startup-idea-icon" style={{ marginBottom: 24 }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#7f9cf5' }} aria-hidden="true" focusable="false">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/>
                  <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                  <path d="M2 17L12 22L22 17"/>
                  <path d="M2 12L12 17L22 12"/>
                </svg>
              </div>
              <h3 style={{ color: '#23272f', fontSize: '1.22rem', fontWeight: 600, marginBottom: 16, lineHeight: 1.3 }}>Automated Marketing Suite</h3>
              <p style={{ color: '#666', fontSize: '1.08rem', lineHeight: 1.7, marginBottom: 20 }}>Comprehensive platform for marketing automation and CRM integration.</p>
              <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Node.js</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Marketing Intelligence</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Marketing APIs</span>
                <span style={{ background: '#f0f4ff', color: '#7f9cf5', padding: '4px 12px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 500 }}>Automation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Block */}
      <section id="contact" className="professional-contact-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Ready to Start Your Node.js Project?</h2>
            <p>Contact me to discuss your Node.js development needs and project requirements</p>
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
                  <p>info@ppcset.com</p>
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
                  <p><a href="https://www.linkedin.com/in/vitali-ppc%E2%9C%94-26b294b4/" target="_blank" rel="noopener" style={{ color: 'inherit', textDecoration: 'none' }}>linkedin.com/in/ppcset</a></p>
                </div>
              </div>
            </div>
            <div className="professional-contact-form">
              <h3>Send Inquiry</h3>
              <form className="professional-contact-form-inner" action="/contact" method="POST" noValidate onSubmit={handleSubmit}>
                <div className="professional-input-group">
                  <input 
                    type="text" 
                    className={`professional-input ${errors.name ? 'error' : ''}`}
                    name="name" 
                    placeholder="Your Name *" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    required
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="professional-input-group">
                  <input 
                    type="email" 
                    className={`professional-input ${errors.email ? 'error' : ''}`}
                    name="email" 
                    placeholder="Email Address *" 
                    value={formData.email} 
                    onChange={handleInputChange}
                    required
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="professional-input-group">
                  <input type="text" className="professional-input" name="company" placeholder="Company" value={formData.company} onChange={handleInputChange} />
                </div>
                <div className="professional-input-group">
                  <textarea className="professional-textarea" name="message" placeholder="Describe your business needs" rows={4} value={formData.message} onChange={handleInputChange}></textarea>
                </div>
                <button type="submit" className="professional-submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {isSubmitted && (
        <div className="success-message">
          <p>Your inquiry has been sent successfully!</p>
        </div>
      )}

      <Footer compact={true} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Node.js Development Services",
            "description": "Professional Node.js development services: full-stack web apps, APIs, real-time solutions, and scalable business platforms. Get expert Node.js consulting and agile delivery from PPCSet.",
            "provider": {
              "@type": "Organization",
              "name": "PPCSet",
              "url": "https://ppcset.com",
              "logo": "https://ppcset.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@ppcset.com"
              }
            },
            "areaServed": "Worldwide",
            "serviceType": "Web Development",
            "category": "Software Development",
            "offers": {
              "@type": "Offer",
              "description": "Node.js development services including web applications, APIs, real-time solutions, and scalable platforms",
              "availability": "https://schema.org/InStock"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Node.js Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Custom Web Applications",
                    "description": "Full-stack web applications built with Node.js"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "API Development",
                    "description": "RESTful and GraphQL APIs for business integration"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Real-time Solutions",
                    "description": "WebSocket-based real-time applications and collaboration tools"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Scalable Platforms",
                    "description": "Enterprise-grade scalable Node.js platforms"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What tasks are best solved with Node.js?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Node.js is excellent for developing web applications, APIs, real-time services (chats, notifications), business process automation, cloud and analytics integrations, as well as for startups where quick hypothesis testing is important."
                }
              },
              {
                "@type": "Question",
                "name": "Can I integrate Node.js with existing systems?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! Node.js excels at integrations. We can connect your Node.js application with databases, payment systems, CRM, analytics platforms, cloud services, and any third-party APIs. This ensures seamless data flow and process automation."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to develop a Node.js project?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Development time depends on project complexity. A simple API can be ready in 2-3 weeks, while a complex web application might take 2-3 months. We always provide detailed timelines and can start with an MVP to get you to market faster."
                }
              },
              {
                "@type": "Question",
                "name": "What about security and maintenance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We implement security best practices from day one: input validation, authentication, HTTPS, regular updates, and monitoring. We also provide ongoing maintenance, performance optimization, and 24/7 support to ensure your application runs smoothly and securely."
                }
              }
            ]
          })
        }}
      />
    </>
  )
} 