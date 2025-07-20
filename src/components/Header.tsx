'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  variant?: 'home' | 'full'
}

export default function Header({ variant = 'full' }: HeaderProps) {
  const pathname = usePathname()
  const [isTemplatesDropdownOpen, setIsTemplatesDropdownOpen] = useState(false)
  
  const isActivePage = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  useEffect(() => {
    if (variant === 'home') return // Не потрібен JavaScript для домашнього хедера

    const burger = document.getElementById('burger')
    const mobileMenu = document.getElementById('mobileMenu')
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay')
    const mobileMenuClose = document.getElementById('mobileMenuClose')

    const openMenu = () => {
      mobileMenu?.classList.add('open')
      mobileMenuOverlay?.classList.add('open')
      document.body.style.overflow = 'hidden'
    }

    const closeMenu = () => {
      mobileMenu?.classList.remove('open')
      mobileMenuOverlay?.classList.remove('open')
      document.body.style.overflow = ''
    }

    burger?.addEventListener('click', openMenu)
    mobileMenuClose?.addEventListener('click', closeMenu)
    mobileMenuOverlay?.addEventListener('click', closeMenu)

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu?.querySelectorAll('a')
    mobileLinks?.forEach(link => {
      link.addEventListener('click', closeMenu)
    })

    return () => {
      burger?.removeEventListener('click', openMenu)
      mobileMenuClose?.removeEventListener('click', closeMenu)
      mobileMenuOverlay?.removeEventListener('click', closeMenu)
      mobileLinks?.forEach(link => {
        link.removeEventListener('click', closeMenu)
      })
    }
  }, [variant])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.templates-dropdown')) {
        setIsTemplatesDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (variant === 'home') {
    return (
      <header className="next-header home-header">
        <div className="header__content">
                      <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: 'inherit'
            }}>
              <div style={{
                position: 'relative',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, #00FFE7, #00BFAE) !important',
                  borderRadius: '4px',
                  transform: 'rotate(-5deg)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}></div>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#1A1A1A !important',
                  zIndex: 1,
                  position: 'relative'
                }}>K</span>
              </div>
              <span style={{ color: '#1A1A1A', fontWeight: 'bold', fontSize: '20px' }}>Kampaio</span>
            </Link>
          <div className="header__right">
            <a href="/login" className="header-btn header-btn-login">Login</a>
            <a href="/demo" className="header-btn header-btn-demo">
              Get Free
            </a>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header className="next-header">
        <div className="header__content">
          <div className="header__left">
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: 'inherit',
              marginRight: '40px'
            }}>
              <div style={{
                position: 'relative',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, #00FFE7, #00BFAE) !important',
                  borderRadius: '4px',
                  transform: 'rotate(-5deg)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}></div>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#1A1A1A !important',
                  zIndex: 1,
                  position: 'relative'
                }}>K</span>
              </div>
              <span style={{ color: '#1A1A1A', fontWeight: 'bold', fontSize: '20px' }}>Kampaio</span>
            </Link>
            <nav className="header__nav">
              <div className="templates-dropdown">
                <button 
                  className="templates-dropdown-toggle"
                  onClick={() => setIsTemplatesDropdownOpen(!isTemplatesDropdownOpen)}
                  onMouseEnter={() => setIsTemplatesDropdownOpen(true)}
                >
                  Templates
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{
                      marginLeft: '4px',
                      transition: 'transform 0.2s ease',
                      transform: isTemplatesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </button>
                <div 
                  className={`templates-dropdown-menu ${isTemplatesDropdownOpen ? 'show' : ''}`}
                  onMouseLeave={() => setIsTemplatesDropdownOpen(false)}
                >
                  <a href="/templates/dentist">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    Dentist
                  </a>
                  <a href="/templates/real-estate">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9,22 9,12 15,12 15,22"/>
                    </svg>
                    Real Estate
                  </a>
                  <a href="/templates/saas">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                    SaaS
                  </a>
                  <a href="/templates/lawyer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                    Lawyer
                  </a>
                </div>
              </div>
              <a href="/use-cases">Use Cases</a>
              <a href="/blog">Blog</a>
              <a href="/pricing">Pricing</a>
            </nav>
          </div>
          <div className="header__right">
            <a href="/login" className="header-btn header-btn-login">Login</a>
            <a href="/demo" className="header-btn header-btn-demo">
              Get Free
            </a>
          </div>
        </div>
        <div className="burger" id="burger" aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div className="mobile-menu-overlay" id="mobileMenuOverlay"></div>
      <nav className="mobile-menu" id="mobileMenu">
        <button className="mobile-menu-close" id="mobileMenuClose" aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="mobile-menu-buttons">
          <a href="/login" className="mobile-btn mobile-btn-login">Login</a>
          <a href="/demo" className="mobile-btn mobile-btn-demo">
            Get Free
          </a>
        </div>
        <ul className="mobile-menu-list">
          <li>
            <div className="mobile-templates-section">
              <span className="mobile-templates-title">Templates</span>
              <ul className="mobile-templates-submenu">
                <li>
                  <a href="/templates/dentist">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    Dentist
                  </a>
                </li>
                <li>
                  <a href="/templates/real-estate">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <polyline points="9,22 9,12 15,12 15,22"/>
                    </svg>
                    Real Estate
                  </a>
                </li>
                <li>
                  <a href="/templates/saas">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                    SaaS
                  </a>
                </li>
                <li>
                  <a href="/templates/lawyer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                    Lawyer
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li><a href="/use-cases">Use Cases</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/pricing">Pricing</a></li>
        </ul>
      </nav>
    </>
  )
} 