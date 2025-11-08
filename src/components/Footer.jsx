import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'

const Footer = () => {
  const { footer } = usePortfolio()
  const footerText = footer.text.replace('{year}', new Date().getFullYear())
  
  return (
    <footer className="bg-gray-900 text-white py-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-400">
            {footerText}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


