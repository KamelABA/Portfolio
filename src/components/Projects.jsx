import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'

const Projects = () => {
  const { projects } = usePortfolio()

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Projects</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-600"
            >
              <div className="w-full h-64 bg-gray-800 overflow-hidden">
                {project.image && project.image.startsWith('data:image') ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : project.image && (project.image.startsWith('http') || project.image.startsWith('/')) ? (
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      e.target.style.display = 'none'
                      if (!e.target.parentElement.querySelector('span')) {
                        const fallback = document.createElement('span')
                        fallback.className = 'flex items-center justify-center w-full h-full text-6xl bg-gradient-to-br from-blue-600 to-indigo-700'
                        fallback.textContent = '📁'
                        e.target.parentElement.appendChild(fallback)
                      }
                    }}
                  />
                ) : project.image && project.image.includes('.') && !project.image.match(/[\u{1F300}-\u{1F9FF}]/u) ? (
                  <img 
                    src={`/components/images/${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      e.target.style.display = 'none'
                      if (!e.target.parentElement.querySelector('span')) {
                        const fallback = document.createElement('span')
                        fallback.className = 'flex items-center justify-center w-full h-full text-6xl bg-gradient-to-br from-blue-600 to-indigo-700'
                        fallback.textContent = '📁'
                        e.target.parentElement.appendChild(fallback)
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
                    <span className="text-6xl">{project.image || '📁'}</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="text-blue-400 font-semibold hover:text-blue-300 transition">
                  View Project →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects


