import React, { useState, useEffect } from 'react'
import { usePortfolio } from '../context/PortfolioContext'

const Footer = () => {
  const { footer } = usePortfolio()
  const footerText = footer.text.replace('{year}', new Date().getFullYear())
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="relative bg-slate-50 dark:bg-navy-950 py-10 transition-colors duration-300">
        {/* Gradient top border */}
        <div className="section-divider mb-10" />

        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 dark:text-slate-400 text-sm text-center md:text-left">
              {footerText}
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-xs">
              Crafted with <span className="text-violet-600 dark:text-violet-400">♥</span> and React
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl glass flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-white hover:bg-violet-50 dark:hover:bg-violet-500/20 border border-slate-200/90 dark:border-white/10 transition-all duration-300 shadow-md
          ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </>
  )
}

export default Footer
