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

    const stars = Array.from({ length: 32 }, (_, i) => ({
      x: (i * 28) % 900,
      y: (i * 5) % 160,
      r: 2 + (i % 3),
      dx: ((i % 10) - 5) * 0.04,
      dy: ((i % 7) - 3) * 0.04
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
        <title>AI-Powered Google Ads Assistant | Kampaio</title>
        <meta name="description" content="Intelligent AI assistant for Google Ads analytics, strategy generation, and campaign optimization. Boost your PPC performance with AI." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://kampaio.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kampaio.com/" />
        <meta property="og:title" content="AI-Powered Google Ads Assistant | Kampaio" />
        <meta property="og:description" content="Intelligent AI assistant for Google Ads analytics, strategy generation, and campaign optimization. Boost your PPC performance with AI." />
        <meta property="og:image" content="https://kampaio.com/logo.png" />
        <meta property="og:site_name" content="Kampaio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://kampaio.com/" />
        <meta name="twitter:title" content="AI-Powered Google Ads Assistant | Kampaio" />
        <meta name="twitter:description" content="Intelligent AI assistant for Google Ads analytics, strategy generation, and campaign optimization. Boost your PPC performance with AI." />
        <meta name="twitter:image" content="https://kampaio.com/logo.png" />
        
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
            AI-Powered Google Ads Assistant
          </h1>
          <div className="main-hero-subtitle">
            Intelligent analytics, strategy generation, and campaign optimization powered by AI.
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
              All Features
            </button>
            <button 
              onClick={() => handleTabClick('chat')}
              onMouseEnter={() => setHoveredTab('chat')}
              onMouseLeave={() => setHoveredTab(null)}
              style={getTabStyle('chat')}
            >
              AI Chat
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
              onClick={() => handleTabClick('strategy')}
              onMouseEnter={() => setHoveredTab('strategy')}
              onMouseLeave={() => setHoveredTab(null)}
              style={getTabStyle('strategy')}
            >
              Strategy Generator
            </button>
            <button 
              onClick={() => handleTabClick('export')}
              onMouseEnter={() => setHoveredTab('export')}
              onMouseLeave={() => setHoveredTab(null)}
              style={getTabStyle('export')}
            >
              Export Tools
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
                    <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>Intelligent AI chat for Google Ads analysis and optimization</p>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                    <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>AI Chat Assistant</h3>
                    <a href="/chat" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                      Try Now
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s',filter:'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'}}>
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div style={{flex:'0 0 380px',width:'380px',height:'380px',scrollSnapAlign:'start',borderRadius:'16px',padding:'40px 32px',background:'linear-gradient(135deg,#23272f 60%,#7f9cf5 100%)',boxShadow:'0 2px 24px rgba(127,156,245,0.10)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <div>
                    <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>Advanced Google Ads analytics with AI-powered insights</p>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                    <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>AI Analytics</h3>
                    <a href="/analytics" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                      Explore
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s',filter:'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'}}>
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div style={{flex:'0 0 380px',width:'380px',height:'380px',scrollSnapAlign:'start',borderRadius:'16px',padding:'40px 32px',background:'linear-gradient(135deg,#23272f 60%,#7f9cf5 100%)',boxShadow:'0 2px 24px rgba(127,156,245,0.10)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <div>
                    <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>AI-powered strategy generation for Google Ads campaigns</p>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                    <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>Strategy Generator</h3>
                    <a href="/generate" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                      Generate
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s',filter:'drop-shadow(0 1px 6px rgba(0,0,0,0.18))'}}>
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div style={{flex:'0 0 380px',width:'380px',height:'380px',scrollSnapAlign:'start',borderRadius:'16px',padding:'40px 32px',background:'linear-gradient(135deg,#23272f 60%,#7f9cf5 100%)',boxShadow:'0 2px 24px rgba(127,156,245,0.10)',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                  <div>
                    <p style={{fontSize:'17px',color:'#e0e6f7',fontWeight:'500',marginBottom:0,lineHeight:'1.3'}}>Export your AI conversations in PDF, Excel, CSV formats</p>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',width:'100%',marginTop:'32px'}}>
                    <h3 style={{fontSize:'18px',fontWeight:'700',color:'#fff',letterSpacing:'0.2px',margin:0}}>Export Tools</h3>
                    <a href="/chat" style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'16px',fontWeight:'600',color:'#fff',textShadow:'0 1px 6px rgba(0,0,0,0.18)',textDecoration:'none',transition:'color 0.2s'}}>
                      Export
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
          <h2 style={{fontSize:'32px',fontWeight:'700',color:'#fff',marginBottom:'48px',marginTop:0}}>Industries We Serve</h2>
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
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'32px',fontWeight:'700',color:'#fff',marginBottom:'16px',marginTop:0}}>Digital Network</h2>
          <p style={{fontSize:'18px',color:'#a0a0a0',margin:0}}>Connecting businesses through technology</p>
        </div>
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

      {/* AI в дії: спрощена візуалізація AI процесу */}
      <section style={{background:'#0f0f0f',padding:'120px 0',overflow:'hidden',position:'relative'}}>
        {/* Анімований фон */}
        <div style={{
          position:'absolute',
          top:0,
          left:0,
          width:'100%',
          height:'100%',
          background:'radial-gradient(circle at 30% 50%, rgba(127,156,245,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0,255,231,0.1) 0%, transparent 50%)',
          zIndex:0
        }}></div>
        
        <div style={{position:'relative',zIndex:1,maxWidth:'1200px',margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:'48px',fontWeight:'700',color:'#fff',marginBottom:'24px',marginTop:0}}>AI в дії</h2>
          <p style={{fontSize:'20px',color:'#a0a0a0',marginBottom:'80px',maxWidth:'600px',marginLeft:'auto',marginRight:'auto'}}>
            Подивіться, як наш AI аналізує ваші Google Ads дані та генерує оптимізації в реальному часі
          </p>
          
          {/* Основна візуалізація */}
          <div style={{
            position:'relative',
            width:'100%',
            height:'500px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            marginBottom:'60px'
          }}>
            
            {/* Вхідні дані */}
            <div style={{
              position:'absolute',
              left:'10%',
              top:'50%',
              transform:'translateY(-50%)',
              width:'200px',
              height:'200px',
              background:'linear-gradient(135deg, #23272f 0%, #2d3748 100%)',
              borderRadius:'20px',
              border:'2px solid rgba(127,156,245,0.3)',
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'center',
              boxShadow:'0 8px 32px rgba(127,156,245,0.2)',
              animation:'pulse 3s ease-in-out infinite'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7f9cf5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <div style={{fontSize:'16px',fontWeight:'600',color:'#fff',marginTop:'16px',textAlign:'center'}}>Google Ads<br/>Дані</div>
            </div>

            {/* Анімовані лінії даних */}
            <svg style={{
              position:'absolute',
              top:0,
              left:0,
              width:'100%',
              height:'100%',
              zIndex:1
            }} viewBox="0 0 1200 500" fill="none">
              <defs>
                <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7f9cf5" stopOpacity="0"/>
                  <stop offset="50%" stopColor="#7f9cf5" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#7f9cf5" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path 
                d="M 240 250 Q 400 200 600 250" 
                stroke="url(#dataFlow)" 
                strokeWidth="3" 
                strokeDasharray="10 10"
                style={{
                  animation:'flow 2s linear infinite'
                }}
              />
              <path 
                d="M 240 250 Q 400 300 600 250" 
                stroke="url(#dataFlow)" 
                strokeWidth="3" 
                strokeDasharray="10 10"
                style={{
                  animation:'flow 2s linear infinite 0.5s'
                }}
              />
            </svg>

            {/* Центральний AI блок */}
            <div style={{
              position:'relative',
              width:'300px',
              height:'300px',
              background:'linear-gradient(135deg, #7f9cf5 0%, #00ffe7 100%)',
              borderRadius:'50%',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              boxShadow:'0 0 60px rgba(127,156,245,0.4), inset 0 0 60px rgba(255,255,255,0.1)',
              animation:'aiPulse 2s ease-in-out infinite',
              zIndex:2
            }}>
              <div style={{
                width:'200px',
                height:'200px',
                background:'rgba(255,255,255,0.1)',
                borderRadius:'50%',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                backdropFilter:'blur(10px)',
                border:'2px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{textAlign:'center'}}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <div style={{fontSize:'18px',fontWeight:'700',color:'#fff',marginTop:'12px'}}>AI Аналіз</div>
                </div>
              </div>
              
              {/* Обертаючі елементи */}
              <div style={{
                position:'absolute',
                top:'-20px',
                left:'50%',
                transform:'translateX(-50%)',
                width:'40px',
                height:'40px',
                background:'rgba(255,255,255,0.2)',
                borderRadius:'50%',
                animation:'rotate 4s linear infinite'
              }}></div>
              <div style={{
                position:'absolute',
                bottom:'-20px',
                left:'50%',
                transform:'translateX(-50%)',
                width:'40px',
                height:'40px',
                background:'rgba(255,255,255,0.2)',
                borderRadius:'50%',
                animation:'rotate 4s linear infinite reverse'
              }}></div>
            </div>

            {/* Анімовані лінії результатів */}
            <svg style={{
              position:'absolute',
              top:0,
              left:0,
              width:'100%',
              height:'100%',
              zIndex:1
            }} viewBox="0 0 1200 500" fill="none">
              <path 
                d="M 900 250 Q 1100 200 1200 250" 
                stroke="url(#dataFlow)" 
                strokeWidth="3" 
                strokeDasharray="10 10"
                style={{
                  animation:'flow 2s linear infinite 1s'
                }}
              />
              <path 
                d="M 900 250 Q 1100 300 1200 250" 
                stroke="url(#dataFlow)" 
                strokeWidth="3" 
                strokeDasharray="10 10"
                style={{
                  animation:'flow 2s linear infinite 1.5s'
                }}
              />
            </svg>

            {/* Результати */}
            <div style={{
              position:'absolute',
              right:'10%',
              top:'50%',
              transform:'translateY(-50%)',
              width:'200px',
              height:'200px',
              background:'linear-gradient(135deg, #23272f 0%, #2d3748 100%)',
              borderRadius:'20px',
              border:'2px solid rgba(0,255,231,0.3)',
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'center',
              boxShadow:'0 8px 32px rgba(0,255,231,0.2)',
              animation:'pulse 3s ease-in-out infinite 1s'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00ffe7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
              <div style={{fontSize:'16px',fontWeight:'600',color:'#fff',marginTop:'16px',textAlign:'center'}}>Оптимізації<br/>& Рекомендації</div>
            </div>
          </div>

          {/* Метрики в реальному часі */}
          <div style={{
            display:'flex',
            justifyContent:'center',
            gap:'60px',
            marginBottom:'60px'
          }}>
            <div style={{textAlign:'center'}}>
              <div style={{
                fontSize:'36px',
                fontWeight:'700',
                color:'#7f9cf5',
                marginBottom:'8px',
                animation:'countUp 3s ease-out'
              }}>98%</div>
              <div style={{fontSize:'16px',color:'#a0a0a0'}}>Точність аналізу</div>
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{
                fontSize:'36px',
                fontWeight:'700',
                color:'#00ffe7',
                marginBottom:'8px',
                animation:'countUp 3s ease-out 0.5s'
              }}>3.2x</div>
              <div style={{fontSize:'16px',color:'#a0a0a0'}}>Покращення ROI</div>
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{
                fontSize:'36px',
                fontWeight:'700',
                color:'#7f9cf5',
                marginBottom:'8px',
                animation:'countUp 3s ease-out 1s'
              }}>24/7</div>
              <div style={{fontSize:'16px',color:'#a0a0a0'}}>Моніторинг</div>
            </div>
          </div>

          {/* CTA кнопка */}
          <button style={{
            background:'linear-gradient(135deg, #7f9cf5 0%, #00ffe7 100%)',
            color:'#fff',
            border:'none',
            padding:'16px 32px',
            borderRadius:'12px',
            fontSize:'18px',
            fontWeight:'600',
            cursor:'pointer',
            transition:'all 0.3s ease',
            boxShadow:'0 8px 32px rgba(127,156,245,0.3)'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(127,156,245,0.4)'
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(127,156,245,0.3)'
          }}>
            Спробувати AI безкоштовно
          </button>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% { transform: translateY(-50%) scale(1); }
            50% { transform: translateY(-50%) scale(1.05); }
          }
          
          @keyframes aiPulse {
            0%, 100% { 
              transform: scale(1);
              box-shadow: 0 0 60px rgba(127,156,245,0.4), inset 0 0 60px rgba(255,255,255,0.1);
            }
            50% { 
              transform: scale(1.1);
              box-shadow: 0 0 80px rgba(127,156,245,0.6), inset 0 0 80px rgba(255,255,255,0.2);
            }
          }
          
          @keyframes flow {
            0% { stroke-dashoffset: 20; }
            100% { stroke-dashoffset: 0; }
          }
          
          @keyframes rotate {
            0% { transform: translateX(-50%) rotate(0deg); }
            100% { transform: translateX(-50%) rotate(360deg); }
          }
          
          @keyframes countUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      <Footer showTitle={true} />
    </>
  )
} 