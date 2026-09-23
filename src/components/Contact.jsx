import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import useScrollReveal from '../hooks/useScrollReveal'

const socialIcons = {
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  tiktok: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
}

const Contact = () => {
  const { footer } = usePortfolio()
  const socialMedia = footer.socialMedia || []
  const sectionRef = useScrollReveal()

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const isFieldActive = (field) => focusedField === field || formData[field] !== ''

  return (
    <section id="contact" className="relative py-24 bg-slate-100/60 dark:bg-navy-900/50 overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* Background Accents */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-violet-400/10 dark:bg-violet-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <p className="text-cyan-600 dark:text-cyan-400 font-medium tracking-widest uppercase text-sm mb-3">Let's connect</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Form */}
          <div className="md:col-span-3 reveal reveal-delay-1">
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-cyan-400 to-transparent" />

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-600 dark:text-slate-400">Thank you! I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none
                        ${isFieldActive('name')
                          ? 'top-1 text-xs text-violet-600 dark:text-violet-400 font-medium'
                          : 'top-3.5 text-sm text-slate-500 dark:text-slate-400'
                        }
                      `}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 pt-5 pb-2 bg-slate-50/90 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white dark:focus:border-violet-500/50 input-glow"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none
                        ${isFieldActive('email')
                          ? 'top-1 text-xs text-violet-600 dark:text-violet-400 font-medium'
                          : 'top-3.5 text-sm text-slate-500 dark:text-slate-400'
                        }
                      `}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 pt-5 pb-2 bg-slate-50/90 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white dark:focus:border-violet-500/50 input-glow"
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none
                        ${isFieldActive('message')
                          ? 'top-1 text-xs text-violet-600 dark:text-violet-400 font-medium'
                          : 'top-3.5 text-sm text-slate-500 dark:text-slate-400'
                        }
                      `}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows="5"
                      className="w-full px-4 pt-5 pb-2 bg-slate-50/90 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm outline-none resize-none transition-all duration-300 focus:border-violet-500 focus:bg-white dark:focus:border-violet-500/50 input-glow"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    Send Message
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info + Socials */}
          <div className="md:col-span-2 reveal reveal-delay-2 flex flex-col gap-6">
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-6">Connect with me</h3>
              <div className="space-y-4">
                {socialMedia.map((social) => {
                  const icon = socialIcons[social.name.toLowerCase()]
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-white/5 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-violet-600 dark:group-hover:text-white group-hover:border-violet-500/30 group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10 transition-all duration-300">
                        {icon || <span className="text-lg">{social.icon}</span>}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{social.name}</p>
                        <p className="text-xs text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-400 transition-colors">
                          {social.url.replace(/https?:\/\/(www\.)?/, '').split('/')[0]}
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-violet-600 dark:group-hover:text-slate-400 ml-auto transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Email CTA */}
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-transparent" />
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Email</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Drop me an email and I'll respond as soon as possible.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
