import React, { createContext, useContext, useState, useEffect } from 'react'

const PortfolioContext = createContext()

// Default data
const defaultSkills = [
  {
    title: "Frontend",
    skills: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "Express", "MongoDB", "PostgreSQL", "REST APIs"]
  },
  {
    title: "Tools & Others",
    skills: ["Git", "Docker", "AWS", "Figma", "Vite", "Webpack"]
  }
]

const defaultProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with payment integration and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "🛒"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates and team collaboration features.",
    tech: ["Vue.js", "Firebase", "Tailwind CSS"],
    image: "✓"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Beautiful weather dashboard with forecasts and interactive maps.",
    tech: ["React", "API Integration", "Chart.js"],
    image: "☀️"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Responsive portfolio website showcasing projects and skills with modern design.",
    tech: ["React", "Tailwind CSS", "Vite"],
    image: "💼"
  }
]

const defaultFooter = {
  text: "© {year} Portfolio Website. Built with React, Vite & Tailwind CSS.",
  socialMedia: [
    { id: 1, name: "GitHub", url: "https://github.com", icon: "📱" },
    { id: 2, name: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
    { id: 3, name: "Twitter", url: "https://twitter.com", icon: "🐦" }
  ]
}

// Default profile photo - will try to use the image from public/images/ or fallback
const defaultProfilePhoto = '/images/kamoula.jpg'

export const PortfolioProvider = ({ children }) => {
  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('portfolio-skills')
    return saved ? JSON.parse(saved) : defaultSkills
  })

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('portfolio-projects')
    return saved ? JSON.parse(saved) : defaultProjects
  })

  const [footer, setFooter] = useState(() => {
    const saved = localStorage.getItem('portfolio-footer')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Ensure socialMedia array exists (for backward compatibility)
      if (!parsed.socialMedia) {
        parsed.socialMedia = defaultFooter.socialMedia
      }
      return parsed
    }
    return defaultFooter
  })

  const [profilePhoto, setProfilePhoto] = useState(() => {
    const saved = localStorage.getItem('portfolio-profile-photo')
    return saved || defaultProfilePhoto
  })

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('portfolio-skills', JSON.stringify(skills))
  }, [skills])

  useEffect(() => {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects))
  }, [projects])

  useEffect(() => {
    localStorage.setItem('portfolio-footer', JSON.stringify(footer))
  }, [footer])

  useEffect(() => {
    localStorage.setItem('portfolio-profile-photo', profilePhoto)
  }, [profilePhoto])

  // Skills functions
  const addSkillCategory = (category) => {
    setSkills([...skills, { ...category, skills: category.skills || [] }])
  }

  const updateSkillCategory = (index, category) => {
    const updated = [...skills]
    updated[index] = category
    setSkills(updated)
  }

  const deleteSkillCategory = (index) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const addSkillToCategory = (categoryIndex, skill) => {
    const updated = [...skills]
    updated[categoryIndex].skills = [...updated[categoryIndex].skills, skill]
    setSkills(updated)
  }

  const removeSkillFromCategory = (categoryIndex, skillIndex) => {
    const updated = [...skills]
    updated[categoryIndex].skills = updated[categoryIndex].skills.filter((_, i) => i !== skillIndex)
    setSkills(updated)
  }

  // Projects functions
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      tech: project.tech || []
    }
    setProjects([...projects, newProject])
  }

  const updateProject = (id, project) => {
    setProjects(projects.map(p => p.id === id ? { ...project, id } : p))
  }

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  // Footer functions
  const updateFooter = (footerData) => {
    setFooter(footerData)
  }

  const addSocialMedia = (socialMedia) => {
    const newSocial = {
      ...socialMedia,
      id: Date.now()
    }
    setFooter({ ...footer, socialMedia: [...footer.socialMedia, newSocial] })
  }

  const updateSocialMedia = (id, socialMedia) => {
    setFooter({
      ...footer,
      socialMedia: footer.socialMedia.map(sm => sm.id === id ? { ...socialMedia, id } : sm)
    })
  }

  const deleteSocialMedia = (id) => {
    setFooter({
      ...footer,
      socialMedia: footer.socialMedia.filter(sm => sm.id !== id)
    })
  }

  // Profile photo functions
  const updateProfilePhoto = (photo) => {
    setProfilePhoto(photo)
  }

  const value = {
    skills,
    projects,
    footer,
    profilePhoto,
    addSkillCategory,
    updateSkillCategory,
    deleteSkillCategory,
    addSkillToCategory,
    removeSkillFromCategory,
    addProject,
    updateProject,
    deleteProject,
    updateFooter,
    addSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
    updateProfilePhoto
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider')
  }
  return context
}

