import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'

const Hero = () => {
  const { profilePhoto } = usePortfolio()
  
  // Handle different photo formats: base64, URL, or local path
  const getPhotoSrc = () => {
    if (profilePhoto.startsWith('data:image')) {
      return profilePhoto
    } else if (profilePhoto.startsWith('http') || profilePhoto.startsWith('/')) {
      return profilePhoto
    } else {
      // If it's a filename, try to load from components/images folder
      return `/components/images/${profilePhoto}`
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 pt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img 
                src={getPhotoSrc()} 
                alt="Profile" 
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-blue-400 shadow-2xl"
                onError={(e) => {
                  // Fallback to default image if error
                  e.target.src = '/components/images/kamoula.jpg'
                }}
              />
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-20 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Hi, I'm <span className="text-blue-400">Kamel Abada</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Full Stack Developer & Content Creator
          </p>
          <p className="text-lg text-gray-400 mb-10">
            I build beautiful and functional web experiences with modern technologies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#projects" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition shadow-lg"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="bg-gray-800 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition shadow-lg border-2 border-blue-400"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero


