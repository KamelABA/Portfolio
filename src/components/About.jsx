import React from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const About = () => {
  const sectionRef = useScrollReveal()

  return (
    <section id="about" className="relative py-24 bg-slate-50 dark:bg-navy-950 overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-violet-500/10 dark:bg-violet-600/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <p className="text-violet-600 dark:text-violet-400 font-medium tracking-widest uppercase text-sm mb-3">Get to know me</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Avatar + Bio */}
          <div className="grid md:grid-cols-5 gap-12 items-center mb-16">
            <div className="md:col-span-2 flex justify-center reveal reveal-delay-1">
              <div className="relative">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 glass flex items-center justify-center shadow-lg">
                  <span className="font-display text-6xl md:text-7xl font-bold gradient-text">KA</span>
                </div>
                {/* Decorative dots */}
                <div className="absolute -bottom-4 -right-4 w-12 h-12 grid grid-cols-3 gap-1 opacity-40">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-5 reveal reveal-delay-2">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                I'm a passionate full-stack developer with a love for creating elegant solutions
                to complex problems. With experience in both front-end and back-end development,
                I bring a comprehensive approach to building web applications.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to
                open-source projects, or sharing my knowledge with the developer community.
              </p>
            </div>
          </div>

          {/* Education & Experience Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="reveal reveal-delay-3 group">
              <div className="glass rounded-2xl p-8 hover-glow h-full relative overflow-hidden">
                {/* Gradient top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-transparent" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 transition-colors">
                    <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Education</h3>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">Bachelor's in Computer Science</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Ibn Khaldoun University, 2024</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal reveal-delay-4 group">
              <div className="glass rounded-2xl p-8 hover-glow h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                    <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Experience</h3>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">3+ Years of Development</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Working with various startups and agencies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
