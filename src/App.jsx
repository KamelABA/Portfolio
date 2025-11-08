import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioContext'
import Header from './components/Header'
import Home from './components/Home'
import EditPage from './components/EditPage'

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit" element={<EditPage />} />
          </Routes>
        </div>
      </Router>
    </PortfolioProvider>
  )
}

export default App


