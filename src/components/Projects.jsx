import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import useScrollReveal from '../hooks/useScrollReveal'

const Projects = () => {
  const { projects } = usePortfolio()
  const sectionRef = useScrollReveal()

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
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent dark:from-navy-950/90 dark:via-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-6">
                    <span className="text-white font-semibold text-sm tracking-wide flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                      View Details
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
