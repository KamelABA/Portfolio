import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-gray-800 shadow-lg fixed w-full top-0 z-50 border-b border-gray-700">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
            KamelAB
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#home" className="text-gray-300 hover:text-blue-400 transition">Home</a>
            <a href="#about" className="text-gray-300 hover:text-blue-400 transition">About</a>
            <a href="#skills" className="text-gray-300 hover:text-blue-400 transition">Skills</a>
            <a href="#projects" className="text-gray-300 hover:text-blue-400 transition">Projects</a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400 transition">Contact</a>
          </div>
          <button 
            className="md:hidden text-gray-300"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-blue-400 transition">Home</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-blue-400 transition">About</a>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-blue-400 transition">Skills</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-blue-400 transition">Projects</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-blue-400 transition">Contact</a>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

