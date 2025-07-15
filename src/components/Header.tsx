'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  variant?: 'home' | 'full'
}

export default function Header({ variant = 'full' }: HeaderProps) {
  const pathname = usePathname()
  
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
                background: 'linear-gradient(45deg, #00ffe7, #7f9cf5)',
                borderRadius: '4px',
                transform: 'rotate(-5deg)',
                boxShadow: '0 2px 8px rgba(0, 255, 231, 0.3)'
              }}></div>
              <span style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#1a1a1a',
                zIndex: 1,
                position: 'relative'
              }}>K</span>
            </div>
            <span style={{ color: '#23272f', fontWeight: 'bold', fontSize: '20px' }}>Kampaio</span>
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
                  background: 'linear-gradient(45deg, #00ffe7, #7f9cf5)',
                  borderRadius: '4px',
                  transform: 'rotate(-5deg)',
                  boxShadow: '0 2px 8px rgba(0, 255, 231, 0.3)'
                }}></div>
                <span style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#1a1a1a',
                  zIndex: 1,
                  position: 'relative'
                }}>K</span>
              </div>
              <span style={{ color: '#23272f', fontWeight: 'bold', fontSize: '20px' }}>Kampaio</span>
            </Link>
            <nav className="header__nav">
              <a href="/ads-templates">Ads Templates</a>
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
          <li><a href="/ads-templates">Ads Templates</a></li>
          <li><a href="/use-cases">Use Cases</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/pricing">Pricing</a></li>
        </ul>
      </nav>
    </>
  )
} 