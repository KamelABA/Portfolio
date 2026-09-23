import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Home from './components/Home'
import EditPage from './components/EditPage'

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 relative noise-overlay transition-colors duration-300">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<EditPage />} />
            </Routes>
          </div>
        </Router>
      </PortfolioProvider>
    </ThemeProvider>
  )
}

export default App
