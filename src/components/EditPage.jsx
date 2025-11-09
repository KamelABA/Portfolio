import React, { useState, useEffect } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import Footer from './Footer'

// Helper functions to read from localStorage with defaults
const getFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
  }
  return defaultValue
}

const getProfilePhotoFromStorage = () => {
  try {
    const saved = localStorage.getItem('portfolio-profile')
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed.photo || '/components/images/kamoula.jpg'
    }
    // Try old format for migration
    const oldSaved = localStorage.getItem('portfolio-profile-photo')
    if (oldSaved) {
      return oldSaved
    }
  } catch (error) {
    console.error('Error reading profile photo from localStorage:', error)
  }
  return '/components/images/kamoula.jpg'
}

// Default values (matching PortfolioContext defaults)
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

const EditPage = () => {
  const {
    skills: contextSkills,
    projects: contextProjects,
    footer: contextFooter,
    profilePhoto: contextProfilePhoto,
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
  } = usePortfolio()

  // Use context values which are already synced with localStorage
  // These are the source of truth for display
  const skills = contextSkills
  const projects = contextProjects
  const footer = contextFooter

  // Skills editing state
  const [editingSkillCategory, setEditingSkillCategory] = useState(null)
  const [newSkillCategory, setNewSkillCategory] = useState({ title: '', skills: [] })
  const [newSkillName, setNewSkillName] = useState('')
  const [editingSkillName, setEditingSkillName] = useState({ categoryIndex: null, skillIndex: null, value: '' })

  // Projects editing state
  const [editingProject, setEditingProject] = useState(null)
  const [newProject, setNewProject] = useState({ title: '', description: '', tech: [], image: '' })
  const [newTech, setNewTech] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [editingImagePreview, setEditingImagePreview] = useState(null)

  // Footer editing state - initialize from localStorage
  const [footerText, setFooterText] = useState(() => {
    const saved = getFromLocalStorage('portfolio-footer', defaultFooter)
    return saved.text || ''
  })
  const [editingSocialMedia, setEditingSocialMedia] = useState(null)
  const [newSocialMedia, setNewSocialMedia] = useState({ name: '', url: '', icon: '' })

  // Profile photo editing state - initialize from localStorage
  const [profilePhotoValue, setProfilePhotoValue] = useState(() => {
    return getProfilePhotoFromStorage()
  })
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(() => {
    const photo = getProfilePhotoFromStorage()
    return photo && photo.startsWith('data:image') ? photo : null
  })

  // Sync with context changes (which sync with localStorage)
  useEffect(() => {
    const saved = getFromLocalStorage('portfolio-footer', defaultFooter)
    setFooterText(saved.text || '')
  }, [contextFooter])

  useEffect(() => {
    const photo = getProfilePhotoFromStorage()
    setProfilePhotoValue(photo)
    if (photo && photo.startsWith('data:image')) {
      setProfilePhotoPreview(photo)
    } else {
      setProfilePhotoPreview(null)
    }
  }, [contextProfilePhoto])
  
  // Update skills and projects when context changes
  useEffect(() => {
    // Skills and projects are displayed from context, so we don't need local state for them
    // They're already synced through the context updates
  }, [contextSkills, contextProjects])

  // Skills functions
  const handleAddSkillCategory = () => {
    if (newSkillCategory.title.trim()) {
      addSkillCategory(newSkillCategory)
      setNewSkillCategory({ title: '', skills: [] })
    }
  }

  const handleUpdateSkillCategory = (index) => {
    updateSkillCategory(index, editingSkillCategory)
    setEditingSkillCategory(null)
  }

  const handleAddSkill = (categoryIndex) => {
    if (newSkillName.trim()) {
      addSkillToCategory(categoryIndex, newSkillName.trim())
      setNewSkillName('')
    }
  }

  const handleRemoveSkill = (categoryIndex, skillIndex) => {
    removeSkillFromCategory(categoryIndex, skillIndex)
  }

  // Projects functions
  const handleUpdateProject = () => {
    if (editingProject.title.trim() && editingProject.description.trim()) {
      updateProject(editingProject.id, editingProject)
      setEditingProject(null)
      setEditingImagePreview(null)
    }
  }

  // Image upload handlers
  const handleImageUpload = (event, isEditing = false) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        if (isEditing && editingProject) {
          setEditingProject({ ...editingProject, image: base64String })
          setEditingImagePreview(base64String)
        } else {
          setNewProject({ ...newProject, image: base64String })
          setImagePreview(base64String)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (isEditing = false) => {
    if (isEditing && editingProject) {
      setEditingProject({ ...editingProject, image: '' })
      setEditingImagePreview(null)
    } else {
      setNewProject({ ...newProject, image: '' })
      setImagePreview(null)
    }
  }

  const handleAddProject = () => {
    if (newProject.title.trim() && newProject.description.trim()) {
      addProject(newProject)
      setNewProject({ title: '', description: '', tech: [], image: '' })
      setNewTech('')
      setImagePreview(null)
    }
  }

  const handleAddTech = (project) => {
    if (newTech.trim()) {
      if (editingProject && editingProject.id === project.id) {
        // Update editing project state
        setEditingProject({ ...editingProject, tech: [...editingProject.tech, newTech.trim()] })
      } else {
        // Update project directly
        const updatedProject = { ...project, tech: [...project.tech, newTech.trim()] }
        updateProject(project.id, updatedProject)
      }
      setNewTech('')
    }
  }

  const handleRemoveTech = (project, techIndex) => {
    if (editingProject && editingProject.id === project.id) {
      // Update editing project state
      setEditingProject({ 
        ...editingProject, 
        tech: editingProject.tech.filter((_, i) => i !== techIndex) 
      })
    } else {
      // Update project directly
      const updatedProject = { ...project, tech: project.tech.filter((_, i) => i !== techIndex) }
      updateProject(project.id, updatedProject)
    }
  }

  const handleSaveFooter = () => {
    updateFooter({ ...footer, text: footerText })
    alert('Footer updated successfully!')
  }

  // Social Media functions
  const handleAddSocialMedia = () => {
    if (newSocialMedia.name.trim() && newSocialMedia.url.trim() && newSocialMedia.icon.trim()) {
      addSocialMedia(newSocialMedia)
      setNewSocialMedia({ name: '', url: '', icon: '' })
    }
  }

  const handleUpdateSocialMedia = () => {
    if (editingSocialMedia.name.trim() && editingSocialMedia.url.trim() && editingSocialMedia.icon.trim()) {
      updateSocialMedia(editingSocialMedia.id, editingSocialMedia)
      setEditingSocialMedia(null)
    }
  }

  // Profile photo functions
  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setProfilePhotoValue(base64String)
        setProfilePhotoPreview(base64String)
        updateProfilePhoto(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveProfilePhoto = () => {
    setProfilePhotoValue('/components/images/kamoula.jpg')
    setProfilePhotoPreview(null)
    updateProfilePhoto('/components/images/kamoula.jpg')
  }

  const handleSaveProfilePhoto = () => {
    updateProfilePhoto(profilePhotoValue)
    alert('Profile photo updated successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Edit Portfolio</h1>
          <a href="/" className="text-blue-400 hover:text-blue-300">← Back to Portfolio</a>
        </div>

        {/* Profile Photo Section */}
        <section className="mb-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Profile Photo</h2>
          
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="space-y-4">
              {/* Current Photo Preview */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img 
                    src={
                      profilePhotoPreview || 
                      (profilePhotoValue && profilePhotoValue.startsWith('data:image') ? profilePhotoValue : 
                      (profilePhotoValue && (profilePhotoValue.startsWith('http') || profilePhotoValue.startsWith('/')) ? profilePhotoValue :
                      (profilePhotoValue ? `/components/images/${profilePhotoValue}` : '/components/images/kamoula.jpg')))
                    }
                    alt="Profile Preview" 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-400 shadow-lg"
                    onError={(e) => {
                      e.target.src = '/components/images/kamoula.jpg'
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 mb-4">This photo appears in the hero section of your portfolio.</p>
                </div>
              </div>

              {/* Upload Section */}
              <div className="space-y-2">
                <label className="block text-white font-semibold">Change Profile Photo</label>
                <div className="flex gap-4 items-center flex-wrap">
                  <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition cursor-pointer">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-gray-300 text-sm">OR</span>
                  <input
                    type="text"
                    placeholder="URL (https://...) or filename from /components/images/"
                    value={profilePhotoValue && !profilePhotoValue.startsWith('data:image') ? profilePhotoValue : ''}
                    onChange={(e) => {
                      setProfilePhotoValue(e.target.value)
                      setProfilePhotoPreview(null)
                    }}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400 min-w-[200px]"
                  />
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  Tip: Upload image above, paste image URL, or reference image from /components/images/ folder (e.g., kamoula.jpg)
                </p>
              </div>

              {/* Preview for URL/local images */}
              {profilePhotoValue && !profilePhotoValue.startsWith('data:image') && !profilePhotoPreview && (
                <div className="mt-2">
                  {(profilePhotoValue.startsWith('http') || profilePhotoValue.startsWith('/')) ? (
                    <div className="w-32 h-32 bg-gray-600 rounded-full overflow-hidden border-4 border-blue-400">
                      <img 
                        src={profilePhotoValue} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  ) : profilePhotoValue.includes('.') && !profilePhotoValue.match(/[\u{1F300}-\u{1F9FF}]/u) ? (
                    <div className="w-32 h-32 bg-gray-600 rounded-full overflow-hidden border-4 border-blue-400">
                      <img 
                        src={`/components/images/${profilePhotoValue}`}
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfilePhoto}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                >
                  Save Photo
                </button>
                <button
                  onClick={handleRemoveProfilePhoto}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Skills</h2>
          
          {/* Add New Skill Category */}
          <div className="mb-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Add New Skill Category</h3>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="Category Title"
                value={newSkillCategory.title}
                onChange={(e) => setNewSkillCategory({ ...newSkillCategory, title: e.target.value })}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={handleAddSkillCategory}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
              >
                Add Category
              </button>
            </div>
          </div>

          {/* Existing Skill Categories */}
          {skills.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-6 p-4 bg-gray-700 rounded-lg">
              {editingSkillCategory?.index === categoryIndex ? (
                <div>
                  <input
                    type="text"
                    value={editingSkillCategory.title}
                    onChange={(e) => setEditingSkillCategory({ ...editingSkillCategory, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400 mb-4"
                  />
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => handleUpdateSkillCategory(categoryIndex)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingSkillCategory(null)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingSkillCategory({ ...category, index: categoryIndex })}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSkillCategory(categoryIndex)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {/* Skills in Category */}
              <div className="flex flex-wrap gap-2 mb-4">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-blue-900 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-700 flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(categoryIndex, skillIndex)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Skill to Category */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new skill"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(categoryIndex)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={() => handleAddSkill(categoryIndex)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                >
                  Add Skill
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Projects Section */}
        <section className="mb-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Projects</h2>
          
          {/* Add New Project */}
          <div className="mb-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Add New Project</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400"
              />
              <textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400"
                rows="3"
              />
              
              {/* Image Upload Section */}
              <div className="space-y-2">
                <label className="block text-white font-semibold">Project Image</label>
                <div className="flex gap-4 items-center">
                  <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition cursor-pointer">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      className="hidden"
                    />
                  </label>
                  <span className="text-gray-300 text-sm">OR</span>
                  <input
                    type="text"
                    placeholder="Emoji (🛒), URL (https://...), or filename from /components/images/"
                    value={newProject.image && !newProject.image.startsWith('data:image') ? newProject.image : ''}
                    onChange={(e) => {
                      setNewProject({ ...newProject, image: e.target.value })
                      setImagePreview(null)
                    }}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400"
                  />
                  <p className="text-gray-400 text-xs mt-1">
                    Tip: Upload image above, use emoji, paste image URL, or reference image from /components/images/ folder
                  </p>
                </div>
                {(imagePreview || (newProject.image && newProject.image.startsWith('data:image'))) && (
                  <div className="relative mt-2">
                    <div className="w-full h-48 bg-gray-600 rounded-lg overflow-hidden border border-gray-500">
                      <img 
                        src={imagePreview || newProject.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveImage(false)}
                      className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {newProject.image && !newProject.image.startsWith('data:image') && !imagePreview && (
                  <div className="mt-2 text-gray-300 text-sm">
                    {newProject.image.startsWith('http') || newProject.image.startsWith('/') ? (
                      <div className="w-full h-48 bg-gray-600 rounded-lg overflow-hidden border border-gray-500">
                        <img 
                          src={newProject.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      </div>
                    ) : newProject.image.includes('.') && !newProject.image.match(/[\u{1F300}-\u{1F9FF}]/u) ? (
                      <div className="w-full h-48 bg-gray-600 rounded-lg overflow-hidden border border-gray-500">
                        <img 
                          src={`/components/images/${newProject.image}`}
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            const parent = e.target.parentElement
                            if (!parent.querySelector('span')) {
                              const fallback = document.createElement('span')
                              fallback.className = 'flex items-center justify-center w-full h-full text-4xl'
                              fallback.textContent = '📁'
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-48 bg-gray-600 rounded-lg border border-gray-500">
                        <span className="text-6xl">{newProject.image}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Technology (press Enter to add)"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setNewProject({ ...newProject, tech: [...newProject.tech, newTech.trim()] })
                      setNewTech('')
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {newProject.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-700 flex items-center gap-1"
                  >
                    {tech}
                    <button
                      onClick={() => setNewProject({ ...newProject, tech: newProject.tech.filter((_, i) => i !== index) })}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <button
                onClick={handleAddProject}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
              >
                Add Project
              </button>
            </div>
          </div>

          {/* Existing Projects */}
          {projects.map((project) => (
            <div key={project.id} className="mb-6 p-4 bg-gray-700 rounded-lg">
              {editingProject?.id === project.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400"
                  />
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400"
                    rows="3"
                  />
                  {/* Image Upload Section for Editing */}
                  <div className="space-y-2">
                    <label className="block text-white font-semibold">Project Image</label>
                    <div className="flex gap-4 items-center">
                      <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition cursor-pointer">
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                          className="hidden"
                        />
                      </label>
                      <span className="text-gray-300 text-sm">OR</span>
                      <input
                        type="text"
                        placeholder="Emoji (🛒), URL (https://...), or filename from /components/images/"
                        value={editingProject.image && !editingProject.image.startsWith('data:image') ? editingProject.image : ''}
                        onChange={(e) => {
                          setEditingProject({ ...editingProject, image: e.target.value })
                          setEditingImagePreview(null)
                        }}
                        className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400"
                      />
                      <p className="text-gray-400 text-xs mt-1">
                        Tip: Upload image above, use emoji, paste image URL, or reference image from /components/images/ folder
                      </p>
                    </div>
                    {(editingImagePreview || (editingProject.image && editingProject.image.startsWith('data:image'))) && (
                      <div className="relative mt-2">
                        <div className="w-full h-48 bg-gray-600 rounded-lg overflow-hidden border border-gray-500">
                          <img 
                            src={editingImagePreview || editingProject.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveImage(true)}
                          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    {editingProject.image && !editingProject.image.startsWith('data:image') && !editingImagePreview && (
                      <div className="mt-2">
                        {editingProject.image.startsWith('http') || editingProject.image.startsWith('/') ? (
                          <div className="w-full h-48 bg-gray-600 rounded-lg overflow-hidden border border-gray-500">
                            <img 
                              src={editingProject.image} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none'
                              }}
                            />
                          </div>
                        ) : editingProject.image.includes('.') && !editingProject.image.match(/[\u{1F300}-\u{1F9FF}]/u) ? (
                          <div className="w-full h-48 bg-gray-600 rounded-lg overflow-hidden border border-gray-500">
                            <img 
                              src={`/components/images/${editingProject.image}`}
                              alt="Preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none'
                                const parent = e.target.parentElement
                                if (!parent.querySelector('span')) {
                                  const fallback = document.createElement('span')
                                  fallback.className = 'flex items-center justify-center w-full h-full text-4xl'
                                  fallback.textContent = '📁'
                                  parent.appendChild(fallback)
                                }
                              }}
                            />
                          </div>
                        ) : editingProject.image ? (
                          <div className="flex items-center justify-center w-full h-48 bg-gray-600 rounded-lg border border-gray-500">
                            <span className="text-6xl">{editingProject.image}</span>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add technology"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTech(editingProject)}
                      className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400"
                    />
                    <button
                      onClick={() => handleAddTech(editingProject)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                    >
                      Add Tech
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editingProject.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-700 flex items-center gap-1"
                      >
                        {tech}
                        <button
                          onClick={() => handleRemoveTech(editingProject, index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateProject}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingProject(null)
                        setNewTech('')
                        setEditingImagePreview(null)
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-2">{project.description}</p>
                      <div className="mb-2 w-full h-32 bg-gray-600 rounded-lg overflow-hidden border border-gray-500 flex items-center justify-center">
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
                              e.target.style.display = 'none'
                              if (!e.target.parentElement.querySelector('span')) {
                                const fallback = document.createElement('span')
                                fallback.className = 'text-4xl'
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
                              e.target.style.display = 'none'
                              if (!e.target.parentElement.querySelector('span')) {
                                const fallback = document.createElement('span')
                                fallback.className = 'text-4xl'
                                fallback.textContent = '📁'
                                e.target.parentElement.appendChild(fallback)
                              }
                            }}
                          />
                        ) : (
                          <span className="text-4xl">{project.image || '📁'}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProject({ ...project })
                          // Set preview if image is base64
                          if (project.image && project.image.startsWith('data:image')) {
                            setEditingImagePreview(project.image)
                          } else {
                            setEditingImagePreview(null)
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Footer Section */}
        <section className="mb-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Footer</h2>
          
          {/* Footer Text */}
          <div className="p-4 bg-gray-700 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Footer Text</h3>
            <textarea
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              placeholder="Footer text (use {year} for current year)"
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:border-blue-400 mb-4"
              rows="3"
            />
            <button
              onClick={handleSaveFooter}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            >
              Save Footer Text
            </button>
          </div>

          {/* Social Media Links */}
          <div className="p-4 bg-gray-700 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Social Media Links</h3>
            
            {/* Add New Social Media */}
            <div className="mb-6 p-4 bg-gray-600 rounded-lg">
              <h4 className="text-lg font-semibold text-white mb-4">Add New Social Media</h4>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name (e.g., GitHub, LinkedIn)"
                  value={newSocialMedia.name}
                  onChange={(e) => setNewSocialMedia({ ...newSocialMedia, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg border border-gray-400 focus:outline-none focus:border-blue-400"
                />
                <input
                  type="url"
                  placeholder="URL (e.g., https://github.com/username)"
                  value={newSocialMedia.url}
                  onChange={(e) => setNewSocialMedia({ ...newSocialMedia, url: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg border border-gray-400 focus:outline-none focus:border-blue-400"
                />
                <input
                  type="text"
                  placeholder="Icon (emoji, e.g., 📱, 💼, 🐦)"
                  value={newSocialMedia.icon}
                  onChange={(e) => setNewSocialMedia({ ...newSocialMedia, icon: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg border border-gray-400 focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={handleAddSocialMedia}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                >
                  Add Social Media
                </button>
              </div>
            </div>

            {/* Existing Social Media */}
            <div className="space-y-4">
              {(footer.socialMedia || []).map((social) => (
                <div key={social.id} className="p-4 bg-gray-600 rounded-lg">
                  {editingSocialMedia?.id === social.id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editingSocialMedia.name}
                        onChange={(e) => setEditingSocialMedia({ ...editingSocialMedia, name: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg border border-gray-400 focus:outline-none focus:border-blue-400"
                        placeholder="Name"
                      />
                      <input
                        type="url"
                        value={editingSocialMedia.url}
                        onChange={(e) => setEditingSocialMedia({ ...editingSocialMedia, url: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg border border-gray-400 focus:outline-none focus:border-blue-400"
                        placeholder="URL"
                      />
                      <input
                        type="text"
                        value={editingSocialMedia.icon}
                        onChange={(e) => setEditingSocialMedia({ ...editingSocialMedia, icon: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg border border-gray-400 focus:outline-none focus:border-blue-400"
                        placeholder="Icon"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdateSocialMedia}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingSocialMedia(null)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{social.icon}</span>
                        <div>
                          <p className="text-white font-semibold">{social.name}</p>
                          <a 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm"
                          >
                            {social.url}
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingSocialMedia({ ...social })}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteSocialMedia(social.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Preview */}
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Preview:</h3>
            <Footer />
          </div>
        </section>
      </div>
    </div>
  )
}

export default EditPage

