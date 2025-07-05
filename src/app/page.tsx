"use client"

import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumbs from '../components/Breadcrumbs'

export default function Home() {
  const [activeTab, setActiveTab] = useState('all')
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [progress, setProgress] = useState(25)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0))
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollPercentage = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100
      setProgress(Math.min(100, Math.max(0, scrollPercentage)))
    }
  }

  const handleLeftClick = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const handleRightClick = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Digital Cosmos animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const stars = Array.from({ length: 32 }, () => ({
      x: Math.random() * 900,
      y: Math.random() * 160,
      r: 2 + Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2
    }))

    function drawCosmos() {
      if (!ctx) return
      
      ctx.clearRect(0, 0, 900, 160)
      
      // Connections
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 120) {
            ctx.save()
            const grad = ctx.createLinearGradient(stars[i].x, stars[i].y, stars[j].x, stars[j].y)
            grad.addColorStop(0, '#7f9cf5')
            grad.addColorStop(1, '#00ffe7')
            ctx.strokeStyle = grad
            ctx.globalAlpha = 0.13
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
      
      // Stars
      for (const s of stars) {
        ctx.save()
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.5)
        grad.addColorStop(0, '#00ffe7')
        grad.addColorStop(0.5, '#7f9cf5')
        grad.addColorStop(1, 'rgba(0,255,231,0)')
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * 3.5, 0, 2 * Math.PI)
        ctx.globalAlpha = 0.25
        ctx.fillStyle = grad
        ctx.fill()
        ctx.restore()
        
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI)
        ctx.globalAlpha = 0.9
        ctx.fillStyle = '#7f9cf5'
        ctx.shadowColor = '#00ffe7'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      }
      
      // Movement
      for (const s of stars) {
        s.x += s.dx
        s.y += s.dy
        if (s.x < 0 || s.x > 900) s.dx *= -1
        if (s.y < 0 || s.y > 160) s.dy *= -1
      }
      
      requestAnimationFrame(drawCosmos)
    }

    drawCosmos()
  }, [])

  const getTabStyle = (tab: string) => {
    const isActive = activeTab === tab
    const isHovered = hoveredTab === tab && !isActive
    
    return {
      background: isActive ? '#fff' : isHovered ? 'rgba(127,156,245,0.15)' : 'rgba(255,255,255,0.03)',
      border: isActive ? '1.5px solid #7f9cf5' : isHovered ? '1.5px solid rgba(127,156,245,0.4)' : '1.5px solid rgba(255,255,255,0.08)',
      color: isActive ? '#23272f' : '#a0a0a0',
      fontSize:'16px',
      fontWeight:'600',
      padding:'16px 24px',
      borderRadius:'12px',
      transition:'all 0.3s ease',
      cursor:'pointer',
      minWidth:'80px',
      textAlign:'center' as const,
      backdropFilter:'blur(10px)',
      boxShadow: isActive ? '0 4px 20px rgba(127,156,245,0.2)' : isHovered ? '0 8px 24px rgba(127,156,245,0.2)' : '0 2px 12px rgba(0,0,0,0.1)',
      outline:'none',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
    }
  }

  return (
    <>
      <Head>
        <title>Digital. Performance. Results. | PPCSet Ecosystem</title>
        <meta name="description" content="Premium digital ecosystem: advertising, analytics, web development. For businesses that want more." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ppcset.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ppcset.com/" />
        <meta property="og:title" content="Digital. Performance. Results. | PPCSet Ecosystem" />
        <meta property="og:description" content="Premium digital ecosystem: advertising, analytics, web development. For businesses that want more." />
        <meta property="og:image" content="https://ppcset.com/logo.png" />
        <meta property="og:site_name" content="PPCSet" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ppcset.com/" />
        <meta name="twitter:title" content="Digital. Performance. Results. | PPCSet Ecosystem" />
        <meta name="twitter:description" content="Premium digital ecosystem: advertising, analytics, web development. For businesses that want more." />
        <meta name="twitter:image" content="https://ppcset.com/logo.png" />
        
        {/* Schema.org Organization */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PPCSet",
              "url": "https://ppcset.com/",
              "logo": "https://ppcset.com/logo.png",
              "sameAs": [
                "https://www.linkedin.com/company/ppcset/"
              ],
              "description": "Premium digital ecosystem: advertising, analytics, web development. For businesses that want more."
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://ppcset.com",
              "name": "PPCSet"
            }
          `}
        </script>
      </Head>
      <Header variant="home" />
      <Breadcrumbs />

      {/* HERO BLOCK */}
      <section style={{minHeight:'70vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#1a1a1a',position:'relative',overflow:'hidden',paddingTop:'32px',paddingBottom:'32px'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:0,opacity:0.18}}>
          <svg width="100%" height="100%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="180" fill="#fff" fillOpacity="0.08"/>
            <rect x="900" y="50" width="300" height="300" rx="60" fill="#fff" fillOpacity="0.06"/>
            <ellipse cx="1200" cy="100" rx="80" ry="40" fill="#fff" fillOpacity="0.10"/>
          </svg>
        </div>
        <div style={{position:'relative',zIndex:1,textAlign:'center',width:'100%',maxWidth:'700px',margin:'0 auto'}}>
          <h1 className="main-hero-title">
            Digital Ecosystem. Performance. Growth.
          </h1>
          <div className="main-hero-subtitle">
            All-in-one: advertising, analytics, web development, automation.
          </div>
        </div>
        {/* Вращающееся tech-кольцо */}
        <div style={{position:'absolute',left:'50%',top:'41%',transform:'translate(-50%,-50%)',zIndex:0,pointerEvents:'none'}}>
          <svg width="420" height="420" viewBox="0 0 420 420" fill="none" style={{opacity:0.18}}>
            <g style={{animation:'rotate360 18s linear infinite',transformOrigin:'50% 50%'}}>
              <ellipse cx="210" cy="210" rx="170" ry="170" stroke="#7f9cf5" strokeWidth="2.5" fill="none"/>
              <ellipse cx="210" cy="210" rx="120" ry="120" stroke="#fff" strokeWidth="1.2" fill="none" opacity="0.5"/>
              <ellipse cx="210" cy="210" rx="80" ry="80" stroke="#23272f" strokeWidth="1.2" fill="none" opacity="0.7"/>
              <circle cx="210" cy="50" r="6" fill="#7f9cf5" opacity="0.7"/>
              <circle cx="340" cy="210" r="4" fill="#fff" opacity="0.7"/>
              <circle cx="210" cy="370" r="5" fill="#7f9cf5" opacity="0.5"/>
              <circle cx="80" cy="210" r="3.5" fill="#fff" opacity="0.5"/>
            </g>
          </svg>
        </div>
      </section>

      {/* WOW TABS-SLIDER */}
      <section style={{background:'#1a1a1a',padding:'40px 0 40px 0'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div style={{display:'flex',gap:'16px',justifyContent:'center',marginBottom:'48px',flexWrap:'wrap'}}>
            <button 
              onClick={() => handleTabClick('all')}
              onMouseEnter={() => setHoveredTab('all')}
              onMouseLeave={() => setHoveredTab(null)}
              style={getTabStyle('all')}
            >
              All
            </button>
            <button 
              onClick={() => handleTabClick('ppc')}
              onMouseEnter={() => setHoveredTab('ppc')}
              onMouseLeave={() => setHoveredTab(null)}
              style={getTabStyle('ppc')}
            >
              PPC
            </button>
            <button 
              onClick={() => handleTabClick('analytics')}
              onMouseEnter={() => setHoveredTab('analytics')}
              onMouseLeave={() => setHoveredTab(null)}
              style={getTabStyle('analytics')}
            >
              Analytics
            </button>
            <button 
              onClick={() => handleTabClick('nodejs')}
              onMouseEnter={() => setHoveredTab('nodejs')}
              onMouseLeave={() => setHoveredTab(null)}
              style={getTabStyle('nodejs')}
            >
              Node.js
            </button>
            <button 
              onClick={() => handleTabClick('nextjs')}
              onMouseEnter={() => setHoveredTab('nextjs')}
              onMouseLeave={() => setHoveredTab(null)}
              style={getTabStyle('nextjs')}
            >
              Next.js
            </button>
          </div>
          
          <div style={{position:'relative',minHeight:'420px'}}>
            {/* All (default) */}
            <div style={{
              position:'absolute',
              top:0,
              left:0,
              width:'100%',
              transition:'opacity 0.4s',
              opacity: activeTab === 'all' ? 1 : 0,
              zIndex: activeTab === 'all' ? 2 : 1,
              pointerEvents: activeTab === 'all' ? 'auto' : 'none'
            }}>
              <div 
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                  display:'flex',
                  overflowX:'auto',
                  gap:'24px',
                  padding:'0 32px 16px 32px',
                  scrollSnapType:'x mandatory',
                  scrollbarWidth:'none',
                  msOverflowStyle:'none',
                  scrollBehavior:'smooth',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  userSelect:'none'
                }}
              >
                <div style={{flex:'0 0 380px',width:'380px',height:'380px',scrollSnapAlign:'start',borderRadius:'16px',padding:'40px 32px',background:'linear-gradient(135deg,#23272f 60%,#7f9cf5 100%)',boxShadow:'0 2px 24px rgba(127,156,245,0.10)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <div>
                    <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>Enterprise-level PPC. Google, Meta, LinkedIn</p>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                    <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>PPC & Performance</h3>
                    <a href="/ppc-performance" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                      View
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s',filter:'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'}}>
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div style={{flex:'0 0 380px',width:'380px',height:'380px',scrollSnapAlign:'start',borderRadius:'16px',padding:'40px 32px',background:'linear-gradient(135deg,#23272f 60%,#7f9cf5 100%)',boxShadow:'0 2px 24px rgba(127,156,245,0.10)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <div>
                    <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>Data, not guesswork — all your analytics in one place</p>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                    <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>Analytics</h3>
                    <a href="/analytics" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                      View
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s',filter:'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'}}>
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div style={{flex:'0 0 380px',width:'380px',height:'380px',scrollSnapAlign:'start',borderRadius:'16px',padding:'40px 32px',background:'linear-gradient(135deg,#23272f 60%,#7f9cf5 100%)',boxShadow:'0 2px 24px rgba(127,156,245,0.10)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <div>
                    <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>Business-ready Node.js for modern web and SEO</p>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                    <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>Node.js Development</h3>
                    <a href="/nodejs-development" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                      View
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s',filter:'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'}}>
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div style={{flex:'0 0 380px',width:'380px',height:'380px',scrollSnapAlign:'start',borderRadius:'16px',padding:'40px 32px',background:'linear-gradient(135deg,#23272f 60%,#7f9cf5 100%)',boxShadow:'0 2px 24px rgba(127,156,245,0.10)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <div>
                    <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>Modern, fast & scalable web solutions</p>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                    <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>Next.js Development</h3>
                    <a href="/nextjs-development" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                      View
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s',filter:'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'}}>
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Navigation dots with arrows */}
              <div style={{display:'flex',justifyContent:'flex-end',gap:'12px',marginTop:'32px',paddingRight:'32px'}}>
                <button 
                  onClick={handleLeftClick}
                  style={{
                    width:'20px',
                    height:'20px',
                    borderRadius:'50%',
                    background:'rgba(255,255,255,0.3)',
                    border:'none',
                    cursor:'pointer',
                    transition:'all 0.3s ease',
                    position:'relative',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}>
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button 
                  onClick={handleRightClick}
                  style={{
                    width:'20px',
                    height:'20px',
                    borderRadius:'50%',
                    background:'rgba(255,255,255,0.3)',
                    border:'none',
                    cursor:'pointer',
                    transition:'all 0.3s ease',
                    position:'relative',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}>
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
              
              {/* Progress bar */}
              <div style={{marginTop:'24px',padding:'0 32px'}}>
                <div style={{width:'100%',height:'2px',background:'rgba(255,255,255,0.1)',borderRadius:'1px',position:'relative'}}>
                  <div style={{width:`${progress}%`,height:'100%',background:'#fff',borderRadius:'1px',transition:'width 0.3s ease',position:'absolute',left:0,top:0}}></div>
                </div>
              </div>
            </div>

            {/* PPC */}
            <div style={{
              position:'absolute',
              top:0,
              left:0,
              width:'100%',
              transition:'opacity 0.4s',
              opacity: activeTab === 'ppc' ? 1 : 0,
              zIndex: activeTab === 'ppc' ? 2 : 1,
              pointerEvents: activeTab === 'ppc' ? 'auto' : 'none'
            }}>
              <div style={{margin:'0 auto',width:'380px',height:'380px',borderRadius:'16px',padding:'40px 32px',background:'linear-gradient(135deg,#23272f 60%,#7f9cf5 100%)',boxShadow:'0 2px 24px rgba(127,156,245,0.10)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <div>
                  <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>Enterprise-level PPC. Google, Meta, LinkedIn</p>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                  <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>PPC & Performance</h3>
                  <a href="/ppc-performance" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                    View
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s',filter:'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'}}>
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div style={{
              position:'absolute',
              top:0,
              left:0,
              width:'100%',
              transition:'opacity 0.4s',
              opacity: activeTab === 'analytics' ? 1 : 0,
              zIndex: activeTab === 'analytics' ? 2 : 1,
              pointerEvents: activeTab === 'analytics' ? 'auto' : 'none'
            }}>
              <div style={{margin:'0 auto',width:'380px',height:'380px',borderRadius:'16px',padding:'40px 32px',background:'linear-gradient(135deg,#23272f 60%,#7f9cf5 100%)',boxShadow:'0 2px 24px rgba(127,156,245,0.10)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <div>
                  <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>Data, not guesswork — all your analytics in one place</p>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                  <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>Analytics</h3>
                  <a href="/analytics" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                    View
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s',filter:'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'}}>
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Node.js */}
            <div style={{
              position:'absolute',
              top:0,
              left:0,
              width:'100%',
              transition:'opacity 0.4s',
              opacity: activeTab === 'nodejs' ? 1 : 0,
              zIndex: activeTab === 'nodejs' ? 2 : 1,
              pointerEvents: activeTab === 'nodejs' ? 'auto' : 'none'
            }}>
              <div style={{margin:'0 auto',width:'380px',height:'380px',borderRadius:'16px',padding:'40px 32px',background:'linear-gradient(135deg,#23272f 60%,#7f9cf5 100%)',boxShadow:'0 2px 24px rgba(127,156,245,0.10)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <div>
                  <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>Business-ready Node.js for modern web and SEO</p>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                  <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>Node.js Development</h3>
                  <a href="/nodejs-development" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                    View
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s',filter:'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'}}>
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Next.js */}
            <div style={{
              position:'absolute',
              top:0,
              left:0,
              width:'100%',
              transition:'opacity 0.4s',
              opacity: activeTab === 'nextjs' ? 1 : 0,
              zIndex: activeTab === 'nextjs' ? 2 : 1,
              pointerEvents: activeTab === 'nextjs' ? 'auto' : 'none'
            }}>
              <div style={{margin:'0 auto',width:'380px',height:'380px',borderRadius:'16px',padding:'40px 32px',background:'linear-gradient(135deg,#23272f 60%,#7f9cf5 100%)',boxShadow:'0 2px 24px rgba(127,156,245,0.10)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <div>
                  <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>Modern, fast & scalable web solutions</p>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                  <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>Next.js Development</h3>
                  <a href="/nextjs-development" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                    View
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s',filter:'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'}}>
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B, Enterprise, SaaS, eCommerce Icons Section */}
      <section style={{position:'relative',background:'#1a1a1a',padding:'56px 0 40px 0',overflow:'hidden'}}>
        {/* Blurred gradient background */}
        <div style={{position:'absolute',top:'-120px',left:'50%',transform:'translateX(-50%)',width:'900px',height:'340px',zIndex:0,pointerEvents:'none'}}>
          <svg width="900" height="340" viewBox="0 0 900 340" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="blur1" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#7f9cf5" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="#23272f" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <ellipse cx="450" cy="170" rx="340" ry="120" fill="url(#blur1)" filter="url(#blur)"/>
            <filter id="blur" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="60" result="blur"/>
            </filter>
          </svg>
        </div>
        <div style={{position:'relative',zIndex:1,maxWidth:'1200px',margin:'0 auto',textAlign:'center'}}>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'64px',alignItems:'flex-start'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:'180px',maxWidth:'240px'}}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom:'18px'}}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <div style={{fontSize:'18px',fontWeight:'700',color:'#fff',marginBottom:0}}>B2B</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:'180px',maxWidth:'240px'}}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom:'18px'}}>
                <path d="M12 3l8 4v5c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V7l8-4z"/>
              </svg>
              <div style={{fontSize:'18px',fontWeight:'700',color:'#fff',marginBottom:0}}>Enterprise</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:'180px',maxWidth:'240px'}}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom:'18px'}}>
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
              <div style={{fontSize:'18px',fontWeight:'700',color:'#fff',marginBottom:0}}>SaaS</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:'180px',maxWidth:'240px'}}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom:'18px'}}>
                <path d="M6 6h15l-1.5 9h-13z"/>
                <circle cx="9" cy="20" r="1.5"/>
                <circle cx="18" cy="20" r="1.5"/>
              </svg>
              <div style={{fontSize:'18px',fontWeight:'700',color:'#fff',marginBottom:0}}>eCommerce</div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Cosmos: анімований digital network/cosmos */}
      <section style={{background:'#1a1a1a',padding:'120px 0 48px 0',overflow:'hidden',position:'relative'}}>
        <canvas 
          ref={canvasRef}
          width="900" 
          height="160" 
          style={{
            display:'block',
            margin:'0 auto',
            width:'900px',
            height:'160px',
            background:'transparent'
          }}
        />
      </section>

      <Footer showTitle={true} />
    </>
  )
} 