import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'

const Skills = () => {
  const { skills: skillCategories } = usePortfolio()

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Skills</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-blue-900 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills


