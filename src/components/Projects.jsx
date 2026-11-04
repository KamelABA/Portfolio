import React, { useState, useEffect } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import useScrollReveal from '../hooks/useScrollReveal'

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[1].length === 11
    ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1`
    : null
}

const Projects = () => {
  const { projects } = usePortfolio()
  const sectionRef = useScrollReveal()
  const [activeVideoProject, setActiveVideoProject] = useState(null)

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideoProject(null)
      }
    }
    if (activeVideoProject) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [activeVideoProject])

  const renderImage = (project) => {
    if (project.image && project.image.startsWith('data:image')) {
      return (
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      )
    }
    if (project.image && (project.image.startsWith('http') || project.image.startsWith('/'))) {
      return (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            if (!e.target.parentElement.querySelector('span')) {
              const fallback = document.createElement('span')
              fallback.className = 'flex items-center justify-center w-full h-full text-6xl bg-gradient-to-br from-violet-600 to-cyan-500'
              fallback.textContent = '📁'
              e.target.parentElement.appendChild(fallback)
            }
          }}
        />
      )
    }
    if (project.image && project.image.includes('.') && !project.image.match(/[\u{1F300}-\u{1F9FF}]/u)) {
      return (
        <img
          src={`/components/images/${project.image}`}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            if (!e.target.parentElement.querySelector('span')) {
              const fallback = document.createElement('span')
              fallback.className = 'flex items-center justify-center w-full h-full text-6xl bg-gradient-to-br from-violet-600 to-cyan-500'
              fallback.textContent = '📁'
              e.target.parentElement.appendChild(fallback)
            }
          }}
        />
      )
    }
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-600/60 to-cyan-500/60">
        <span className="text-6xl">{project.image || '📁'}</span>
      </div>
    )
  }

  return (
    <section id="projects" className="relative py-24 bg-slate-50 dark:bg-navy-950 overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 dark:bg-violet-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <p className="text-violet-600 dark:text-violet-400 font-medium tracking-widest uppercase text-sm mb-3">My recent work</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`reveal reveal-delay-${Math.min(index + 1, 6)} group`}
            >
              <div className="glass rounded-2xl overflow-hidden hover-glow h-full flex flex-col">
                {/* Image */}
                <div className="relative w-full h-56 md:h-64 overflow-hidden bg-slate-100 dark:bg-navy-800">
                  {renderImage(project)}

                  {/* Video Demo Badge if video exists */}
                  {project.video && (
                    <div className="absolute top-3 right-3 z-10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveVideoProject(project)
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-600 text-white shadow-lg shadow-rose-600/30 hover:bg-rose-500 hover:scale-105 transition-all"
                        title="Watch Video Demo"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Video Demo
                      </button>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div
                    onClick={() => {
                      if (project.video) setActiveVideoProject(project)
                    }}
                    className={`absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent dark:from-navy-950/90 dark:via-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 ${project.video ? 'cursor-pointer' : ''}`}
                  >
                    {project.video ? (
                      <span className="text-white font-semibold text-sm tracking-wide flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-600 shadow-lg shadow-rose-600/30 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Watch Video Demo
                      </span>
                    ) : (
                      <span className="text-white font-semibold text-sm tracking-wide flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    )}
                  </div>

                  {/* Subtle zoom on hover */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed text-sm flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/90 dark:border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action / Video Link Section */}
                  {project.video && (
                    <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveVideoProject(project)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors group/btn"
                      >
                        <span className="w-7 h-7 rounded-full bg-rose-500/10 dark:bg-rose-500/20 flex items-center justify-center group-hover/btn:scale-110 group-hover/btn:bg-rose-600 group-hover/btn:text-white transition-all text-rose-600 dark:text-rose-400">
                          <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                        <span>Watch Demo</span>
                      </button>

                      <a
                        href={project.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 flex items-center gap-1 transition-colors"
                        title="Open video on YouTube"
                      >
                        <span>YouTube</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideoProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300"
          onClick={() => setActiveVideoProject(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <h3 className="font-display text-lg font-semibold text-white truncate max-w-md">
                  {activeVideoProject.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={activeVideoProject.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Open on YouTube
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button
                  onClick={() => setActiveVideoProject(null)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black">
              {getYouTubeEmbedUrl(activeVideoProject.video) ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeVideoProject.video)}
                  title={activeVideoProject.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-slate-400">
                  Video player unavailable
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-400 line-clamp-2">
                {activeVideoProject.description}
              </p>
              <a
                href={activeVideoProject.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex sm:hidden items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors self-end"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
