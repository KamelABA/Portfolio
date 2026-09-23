import React, { useState, useEffect, useMemo } from 'react'
import { usePortfolio } from '../context/PortfolioContext'

const subtitles = [
  'Full Stack Developer',
  'Content Creator',
  'Problem Solver',
]

const Hero = () => {
  const { profilePhoto } = usePortfolio()
  const [currentSubtitle, setCurrentSubtitle] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Entrance animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const target = subtitles[currentSubtitle]
    let timeout

    if (!isDeleting && displayText === target) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length)
    } else {
      const speed = isDeleting ? 40 : 80
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? target.substring(0, displayText.length - 1)
            : target.substring(0, displayText.length + 1)
        )
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentSubtitle])

  // Photo source resolver
  const getPhotoSrc = () => {
    if (profilePhoto.startsWith('data:image')) return profilePhoto
    if (profilePhoto.startsWith('http') || profilePhoto.startsWith('/')) return profilePhoto
    return `/components/images/${profilePhoto}`
  }

  // Generate floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-navy-950 transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-slate-50 to-cyan-500/10 dark:from-violet-600/10 dark:via-navy-950 dark:to-cyan-500/10" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-400/15 dark:bg-violet-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-400/15 dark:bg-cyan-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-400/10 dark:bg-violet-500/5 rounded-full blur-[160px]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-violet-500/30 dark:bg-white animate-float"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[15%] w-20 h-20 border border-violet-400/25 dark:border-violet-500/20 rounded-xl rotate-45 animate-float" />
        <div className="absolute bottom-32 left-[10%] w-16 h-16 border border-cyan-400/25 dark:border-cyan-400/20 rounded-full animate-float-delayed" />
        <div className="absolute top-[40%] right-[8%] w-3 h-3 bg-violet-500/30 dark:bg-violet-400/40 rounded-full animate-float-delayed" />
        <div className="absolute bottom-[20%] right-[25%] w-2 h-2 bg-cyan-500/30 dark:bg-cyan-400/40 rounded-full animate-float" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <div className="max-w-3xl mx-auto">
          {/* Profile Photo */}
          <div
            className={`mb-10 flex justify-center transition-all duration-1000
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <div className="relative group">
              {/* Rotating gradient ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-500 animate-ring-rotate opacity-70 blur-[2px] group-hover:opacity-100 transition-opacity" />
              <img
                src={getPhotoSrc()}
                alt="Kamel Abada"
                className="relative w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-white dark:border-navy-950 shadow-2xl"
                onError={(e) => {
                  e.target.src = '/components/images/kamoula.jpg'
                }}
              />
            </div>
          </div>

          {/* Heading */}
          <h1
            className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000 delay-200
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <span className="text-slate-900 dark:text-white">Hi, I'm </span>
            <span className="gradient-text">Kamel Abada</span>
          </h1>

          {/* Typewriter Subtitle */}
          <p
            className={`text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-4 h-8 transition-all duration-1000 delay-[400ms]
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <span className="typewriter-cursor">{displayText}</span>
          </p>

          {/* Description */}
          <p
            className={`text-base md:text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-[600ms]
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            I build beautiful and functional web experiences with modern technologies
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-[800ms]
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              View My Work
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white glass hover:bg-slate-100/90 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 border border-slate-200/90 dark:border-white/10 shadow-sm"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[1200ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <a href="#about" className="flex flex-col items-center gap-2 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300 transition-colors">
          <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-current animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero
