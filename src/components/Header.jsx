import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { toggleTheme, isDark } = useTheme()

  // Track scroll for navbar opacity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const linkClasses = (href) => {
    const isActive = activeSection === href.slice(1)
    return `relative py-1 text-sm font-medium tracking-wide transition-colors duration-300
      ${isActive
        ? 'text-violet-600 dark:text-white font-semibold'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
      }
    `
  }

  const activeDot = (href) => {
    const isActive = activeSection === href.slice(1)
    return (
      <span
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300
          ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0'}
        `}
      />
    )
  }

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500
        ${scrolled
          ? 'glass-strong shadow-sm border-b border-slate-200/80 dark:border-white/10 dark:shadow-lg dark:shadow-black/20'
          : 'bg-transparent'
        }
      `}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-xl font-bold tracking-tight group flex items-center gap-1"
          >
            <span className="gradient-text group-hover:opacity-80 transition-opacity">
              Kamel
            </span>
            <span className="text-slate-800/80 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white/80 transition-colors">
              AB
            </span>
          </Link>

          {/* Desktop Nav + Theme Toggle */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={linkClasses(link.href)}>
                  {link.label}
                  {activeDot(link.href)}
                </a>
              ))}
            </div>

            {/* Theme Toggle Button (Desktop) */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="relative p-2.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-cyan-300 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
            >
              {isDark ? (
                <svg className="w-5 h-5 transition-transform duration-500 rotate-0 hover:rotate-90 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 transition-transform duration-500 -rotate-12 hover:rotate-0 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Theme Toggle Button (Mobile) */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-700 dark:text-slate-300"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>

            {/* Mobile Toggle Hamburger */}
            <button
              className="relative w-8 h-8 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <span className={`absolute h-[2px] w-5 bg-current rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
              <span className={`absolute h-[2px] w-5 bg-current rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
              <span className={`absolute h-[2px] w-5 bg-current rounded transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isMenuOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
          `}
        >
          <div className="glass rounded-xl p-4 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeSection === link.href.slice(1)
                    ? 'text-violet-600 dark:text-white bg-violet-50 dark:bg-white/5 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5'
                  }
                `}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
