'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

interface HeaderProps {
  variant?: 'home' | 'full'
}

export default function Header({ variant = 'full' }: HeaderProps) {
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

  if (variant === 'home') {
    return (
      <header className="next-header home-header">
        <div className="header__content">
          <Link href="/" className="header__logo">
            <img src="/logo.png" alt="Logo" className="logo-img" />
            <span>PPCSet</span>
          </Link>
          <a href="https://www.linkedin.com/in/vitali-ppc%E2%9C%94-26b294b4/" className="linkedin-link" target="_blank" rel="noopener" title="Connect on LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="linkedin-text">LinkedIn</span>
          </a>
        </div>
      </header>
    )
  }

  return (
    <>
      <header className="next-header">
        <div className="header__content">
          <div className="header__left">
            <Link href="/" className="header__logo">
              <img src="/logo.png" alt="Logo" className="logo-img" />
              <span>PPCSet</span>
            </Link>
            <nav className="header__nav">
              <a href="/">Home</a>
              <a href="/analytics">Analytics</a>
              <a href="#problems">Problems</a>
              <a href="#process">Process</a>
              <a href="#results">Results</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
          <div className="header__right">
            <a href="https://www.linkedin.com/in/vitali-ppc%E2%9C%94-26b294b4/" className="linkedin-link" target="_blank" rel="noopener" title="Connect on LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="linkedin-text">LinkedIn</span>
            </a>
            <div className="linkedin-link" style={{visibility: 'hidden'}}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="linkedin-text">LinkedIn</span>
            </div>
          </div>
        </div>
        <div className="burger" id="burger">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="mobile-menu-linkedin">
          <a href="https://www.linkedin.com/in/vitali-ppc%E2%9C%94-26b294b4/" target="_blank" rel="noopener" title="LinkedIn" className="mobile-linkedin">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle'}}>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
        <ul className="mobile-menu-list">
          <li><a href="/">Home</a></li>
          <li><a href="/analytics">Analytics</a></li>
          <li><a href="#problems">Problems</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#results">Results</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </>
  )
} 