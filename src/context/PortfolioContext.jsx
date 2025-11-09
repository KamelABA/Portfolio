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
    skills: ["Node.js", "Python", "MongoDB", "PostgreSQL", "Laravel", "Flask", "MySQL"]
  },
  {
    title: "Tools & Others",
    skills: ["Git", "Figma", "Vite", "Webpack", "Expo"]
  },
  {
    title: "Content Creator", 
    skills: ["Tiktok", "CapCut"]
  }
]

const defaultProjects = [
  {
    id: 1,
    title: "E-Commerce Pharmacy products Platform",
    description: "An online pharmacy platform that enables users to browse, purchase, and manage pharmaceutical products securely and conveniently. It connects customers with licensed pharmacies for easy ordering, prescription uploads, and doorstep delivery.",
    tech: ["Laravel", "node.js", "PostgreSQL"],
    image: "/components/images/pharm.PNG"
  },
  {
    id: 2,
    title: "A Web Application for detecting plant disease",
    description: "A web application that uses computer vision and machine learning to analyze leaf images and automatically detect plant diseases. It provides farmers and gardeners with fast, accurate diagnoses, treatment recommendations, and tracking of plant health over time.",
    tech: ["Flask", "Tensorflow", "Yolo", "SQLite", "Bootstrap"],
    image: "/components/images/plant.png"
  },
  {
    id: 3,
    title: "RestaurantApp",
    description: "A web application that allows users to browse menus, place online orders, reserve tables, and manage deliveries with ease. It helps restaurants streamline their operations while offering customers a fast and convenient dining experience.",
    tech: ["TypeScript", "node.js", "Laravel", "TailwindCss", "vite.js", "PostgreSQL"],
    image: "/components/images/resteurantapp0.PNG"
  },
  {
    id: 4,
    title: "Ship game",
    description: "A strategic ship-battle game where players place fleets and take turns firing to locate and sink opponents' ships. Features single-player AI, local/online multiplayer, power-ups, and a scoring/ranking system.",
    tech: ["Laravel", "Node.js", "Bootstrap", "React"],
    image: "/components/images/play.PNG"
  }
]

const defaultFooter = {
  text: "© {year} Portfolio Website. Built with React, Vite & Tailwind CSS.",
  socialMedia: [
    {id: 1, name: "GitHub", url: "https://github.com/KamelABA", icon: "Github"},
    {id: 2, name: "LinkedIn", url: "https://www.linkedin.com/in/abada-kamel-b3554333b", icon: "LinkedIn"},
    {id: 3, name: "Facebook", url: "https://www.facebook.com/abada.kamel.447832", icon: "Facebook"},
    {id: 4, name: "Tiktok", url: "https://www.tiktok.com/@kamel_abada", icon: "Tiktok"}
  ]
}

const defaultProfile = {
  photo: '/components/images/kamoula.jpg'
}

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

  const [profile, setProfile] = useState(() => {
    // Check for new JSON format
    const saved = localStorage.getItem('portfolio-profile')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Ensure photo exists (for backward compatibility)
      if (!parsed.photo) {
        parsed.photo = defaultProfile.photo
      }
      return parsed
    }
    // Migrate from old string format if it exists
    const oldSaved = localStorage.getItem('portfolio-profile-photo')
    if (oldSaved) {
      const migrated = { photo: oldSaved }
      localStorage.setItem('portfolio-profile', JSON.stringify(migrated))
      localStorage.removeItem('portfolio-profile-photo')
      return migrated
    }
    return defaultProfile
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
    localStorage.setItem('portfolio-profile', JSON.stringify(profile))
  }, [profile])

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

  // Profile functions
  const updateProfilePhoto = (photo) => {
    setProfile({ ...profile, photo })
  }

  const value = {
    skills,
    projects,
    footer,
    profile,
    profilePhoto: profile.photo, // Keep for backward compatibility
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

