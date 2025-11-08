import React from 'react'

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-12">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-6 flex items-center justify-center text-white text-6xl font-bold">
            KA
            </div>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed text-center mb-6">
            I'm a passionate full-stack developer with a love for creating elegant solutions
            to complex problems. With experience in both front-end and back-end development,
            I bring a comprehensive approach to building web applications.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed text-center mb-6">
            When I'm not coding, you can find me exploring new technologies, contributing to
            open-source projects, or sharing my knowledge with the developer community.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Education</h3>
              <p className="text-gray-300">Bachelor's in Computer Science</p>
              <p className="text-gray-400 text-sm">Ibn Khaldoun University, 2024</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Experience</h3>
              <p className="text-gray-300">3+ Years of Development</p>
              <p className="text-gray-400 text-sm">Working with various startups and agencies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About


