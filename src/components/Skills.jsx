import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import useScrollReveal from '../hooks/useScrollReveal'

// ── Skill SVG Icons ────────────────────────────────────────────────────────
const skillIcons = {
  react: (
    <svg viewBox="-11.5 -10.23 23 20.46" className="w-4 h-4">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  ),
  vue: (
    <svg viewBox="0 0 262 227" className="w-4 h-4">
      <path d="M161.1 0l-30.2 52.4L100.6 0H0l130.9 226.7L261.7 0z" fill="#41B883"/>
      <path d="M161.1 0l-30.2 52.4L100.6 0H52.2l78.6 136.2L209.5 0z" fill="#34495E"/>
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
      <path d="M6 16.5l2.2-.4c.3.7.8 1.1 1.6 1.1.8 0 1.3-.4 1.3-1.3v-6.4h2.7v6.5c0 2.2-1.3 3.3-3.7 3.3-2.1 0-3.3-1.1-3.8-2.6l-.3-.6zm8.1-.2l2.2-.5c.4.8 1.1 1.3 2.1 1.3 1 0 1.6-.5 1.6-1.1 0-.8-.7-1.1-1.9-1.6l-.8-.3c-2.1-.9-3.4-2-3.4-4.1 0-2.3 1.8-3.9 4.3-3.9 1.9 0 3.3.7 4.2 2.3l-2.1 1.2c-.4-.8-1-1.2-1.9-1.2-.9 0-1.4.5-1.4 1 0 .7.6 1 1.6 1.4l.8.3c2.4 1 3.7 2.1 3.7 4.3 0 2.6-2 4.1-4.7 4.1-2.6 0-4.3-1.3-4.9-3.2l.1-.3z" fill="#000"/>
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <rect width="24" height="24" rx="4" fill="#3178C6"/>
      <path d="M4 8h8v2.5H9.5V19H6.5v-8.5H4V8zm9.5 5.5c.5-.8 1.4-1.3 2.6-1.3 1.5 0 2.5.8 2.5 2.1 0 1.4-.9 1.9-2.3 2.5l-.6.2c-.9.4-1.4.8-1.4 1.5 0 .8.7 1.3 1.6 1.3 1 0 1.7-.5 2.1-1.2l1.8 1.2c-.8 1.3-2.1 2.1-3.9 2.1-2.4 0-4-1.5-4-3.5 0-1.7 1-2.7 2.7-3.4l.6-.2c.8-.3 1.2-.6 1.2-1.2 0-.6-.5-1-1.3-1-.8 0-1.4.4-1.7 1l-1.8-1.2z" fill="#FFF"/>
    </svg>
  ),
  htmlcss: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#06B6D4">
      <path d="M12 4.8C8.8 4.8 6.8 6.4 6 9.6c1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6-1.2-1.2-2.5-2.6-5.5-2.6zM6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.2 1.2 2.5 2.6 5.5 2.6 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C9.3 13.4 8 12 6 12z"/>
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#339933">
      <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z"/>
    </svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M11.9 2c-3.6 0-3.4 1.6-3.4 1.6l.01 1.65h3.49v.5H5.8S2.2 5.3 2.2 9.7c0 4.4 3.1 4.2 3.1 4.2h1.85v-2.6s-.1-3.1 3.1-3.1h5.35s3 0 3-2.9c0-2.9-2.7-3.9-6.7-3.9zm-2.07 1.34a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="#3776AB"/>
      <path d="M12.1 22c3.6 0 3.4-1.6 3.4-1.6l-.01-1.65H12v-.5h6.2s3.6.45 3.6-3.95c0-4.4-3.1-4.2-3.1-4.2h-1.85v2.6s.1 3.1-3.1 3.1H8.4s-3 0-3 2.9c0 2.9 2.7 3.9 6.7 3.9zm2.07-1.34a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" fill="#FFD438"/>
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#47A248">
      <path d="M12 1.5s-6 6.8-6 12.3c0 4.2 3.3 6.7 6 8.7 2.7-2 6-4.5 6-8.7 0-5.5-6-12.3-6-12.3zm.4 18.5v-6.9h-1v6.9c-2.3-1.6-4.4-3.5-4.4-6.2 0-3.8 3.5-8.5 5-10.4 1.5 1.9 5 6.6 5 10.4 0 2.7-2.1 4.6-4.6 6.2z"/>
    </svg>
  ),
  postgres: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#336791">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),
  laravel: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#FF2D20">
      <path d="M8.2 3.8l5.6 3.2-3.1 1.8-5.6-3.2 3.1-1.8zm11.9 6.8l-8.8 5.1v6.5l8.8-5.1v-6.5zm-16.2 0l8.8 5.1v6.5l-8.8-5.1v-6.5zm7.5-4.3l5.6 3.2-5.6 3.2-5.6-3.2 5.6-3.2z"/>
    </svg>
  ),
  flask: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.942a4.5 4.5 0 01-4.46 0L12 15.2M19.8 15.3A2.25 2.25 0 0121 17.25v1.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75v-1.5a2.25 2.25 0 011.2-1.95L5 14.5"/>
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#00758F">
      <path d="M12 3c-4.97 0-9 1.79-9 4s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4zm0 6c-3.87 0-7-1.12-7-2.5S8.13 4 12 4s7 1.12 7 2.5S15.87 9 12 9zm0 3c-4.97 0-9 1.79-9 4v2c0 2.21 4.03 4 9 4s9-1.79 9-4v-2c0-2.21-4.03-4-9-4zm0 8c-3.87 0-7-1.12-7-2.5v-1.1c1.8 1.1 4.3 1.6 7 1.6s5.2-.5 7-1.6v1.1c0 1.38-3.13 2.5-7 2.5z"/>
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#F05032">
      <path d="M21.6 10.9L13.1 2.4c-.8-.8-2.1-.8-2.9 0L8.1 4.5l3.6 3.6c.9-.3 1.9 0 2.5.7.7.7.9 1.8.5 2.7l3.5 3.5c.9-.4 2-.2 2.7.5 1.1 1.1 1.1 2.9 0 4-1.1 1.1-2.9 1.1-4 0-.8-.8-.9-2-.4-2.9L12.5 13v5.1c.3.2.6.4.8.7 1.1 1.1 1.1 2.9 0 4-1.1 1.1-2.9 1.1-4 0-1.1-1.1-1.1-2.9 0-4 .3-.3.6-.5.9-.7v-5.2c-.3-.2-.6-.4-.9-.7-.8-.8-.9-2-.4-2.9L5.3 7.3 2.4 10.2c-.8.8-.8 2.1 0 2.9l8.5 8.5c.8.8 2.1.8 2.9 0l7.8-7.8c.8-.8.8-2.1 0-2.9z"/>
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M8.5 12a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="#1ABCFE"/>
      <path d="M5 19a3.5 3.5 0 0 0 3.5 3.5 3.5 3.5 0 0 0 3.5-3.5v-3.5H8.5A3.5 3.5 0 0 0 5 19z" fill="#0ACF83"/>
      <path d="M5 5a3.5 3.5 0 0 1 3.5-3.5H12v7H8.5A3.5 3.5 0 0 1 5 5z" fill="#F24E1E"/>
      <path d="M12 1.5h3.5a3.5 3.5 0 0 1 0 7H12v-7z" fill="#FF7262"/>
      <path d="M12 8.5h3.5a3.5 3.5 0 0 1 0 7H12v-7z" fill="#A259FF"/>
    </svg>
  ),
  vite: (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      <path d="M21.4 3.7l-9.1 16.8c-.3.5-1 .5-1.3 0L1.9 3.7c-.4-.7.1-1.5.9-1.5h17.7c.8 0 1.3.8.9 1.5z" fill="#BD34FE"/>
      <path d="M12.9 2.5l-6.8 9.5h4.2l-2.1 5.8 7.3-8.8h-4.3l1.7-6.5z" fill="#FFD622"/>
    </svg>
  ),
  webpack: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#8DD6F9">
      <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2zm0 2.2L5.2 8.1 12 12l6.8-3.9L12 4.2zm-7 5.1v7.4l6 3.5v-7.3L5 9.3zm14 0l-6 3.6v7.3l6-3.5V9.3z"/>
    </svg>
  ),
  expo: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M18.8 19.3L13.2 9.6c-.5-.9-1.9-.9-2.4 0L5.2 19.3c-.6 1 .1 2.2 1.2 2.2h11.2c1.1 0 1.8-1.2 1.2-2.2zM12 12.3l3.8 6.7H8.2l3.8-6.7zM12 2L6.3 11.8c-.2.4-.2.9 0 1.3.2.4.7.7 1.2.7h9c.5 0 1-.3 1.2-.7.2-.4.2-.9 0-1.3L12 2z"/>
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#2496ED">
      <path d="M13.9 8.2h2v2h-2v-2zm-2.7 0h2v2h-2v-2zm-2.8 0h2v2h-2v-2zm8.3 0h2v2h-2v-2zm-8.3-2.7h2v2h-2v-2zm2.8 0h2v2h-2v-2zm2.7 0h2v2h-2v-2zm-5.5 5.4h2v2h-2v-2zm2.8 0h2v2h-2v-2zm2.7 0h2v2h-2v-2zm8.3 0h2v2h-2v-2zm4.3 1.4c-.6-.4-1.9-.5-2.8.2-.1-1.3-.8-2.6-2-3.4-.2-.1-.5 0-.6.2-.2.4-.3.9-.3 1.4 0 1.8.9 3.2 2.3 3.9-.7 1.1-1.9 1.9-3.2 2.2-2.8.6-5.8.5-8.6-.3-1.6-.5-3.1-1.4-4.5-2.4l-.5-.4c-.3.3-.5.7-.6 1.1-.9 2.5 1.4 5.3 4.8 5.7 4.1.4 8.7-.3 12.1-2.7 2.2-1.5 3.3-3.6 3.6-5.8.1-.4 0-.6-.3-.7z"/>
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#FF9900">
      <path d="M18.8 14.5c-2.3 1.7-5.5 2.6-8.4 2.6-4 0-7.6-1.5-10.4-4-.2-.2 0-.5.2-.3 2.9 1.7 6.4 2.7 10.1 2.7 2.6 0 5.4-.7 7.9-2.1.4-.2.8.2.6.5zm1.5-1.2c-.3-.4-1.9-.2-2.6-.1-.2 0-.3-.2-.1-.3 1.2-.9 3.1-.6 3.4-.3.3.4-.1 2.3-1.2 3.3-.2.2-.3.1-.2-.1.3-.7.9-2.1.7-2.5z"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  capcut: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  bootstrap: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#7952B3">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.8 14.5H7.5V7.5h3c1.6 0 2.7.8 2.7 2.1 0 .9-.5 1.6-1.3 1.9 1 .3 1.7 1.1 1.7 2.2 0 1.5-1.2 2.8-3.4 2.8zm.2-5.4h-1.3v-2.3h1.3c.7 0 1.2.3 1.2.9s-.5 1.4-1.2 1.4zm.3 3.6h-1.6v-2.3h1.6c.8 0 1.4.3 1.4 1s-.6 1.3-1.4 1.3z"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.07a4.5 4.5 0 004.486-6.32l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.32 4.486c.09.49.232 1.01.442 1.503z"/>
    </svg>
  ),
}

const getSkillIcon = (name) => {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (key.includes('react')) return skillIcons.react
  if (key.includes('vue')) return skillIcons.vue
  if (key === 'js' || key.includes('javascript')) return skillIcons.javascript
  if (key === 'ts' || key.includes('typescript')) return skillIcons.typescript
  if (key.includes('tailwind')) return skillIcons.tailwind
  if (key.includes('html') || key.includes('css')) return skillIcons.htmlcss
  if (key.includes('node')) return skillIcons.node
  if (key.includes('python')) return skillIcons.python
  if (key.includes('mongo')) return skillIcons.mongodb
  if (key.includes('postgres')) return skillIcons.postgres
  if (key.includes('laravel')) return skillIcons.laravel
  if (key.includes('flask')) return skillIcons.flask
  if (key.includes('mysql') || key.includes('sql')) return skillIcons.mysql
  if (key.includes('git')) return skillIcons.git
  if (key.includes('figma')) return skillIcons.figma
  if (key.includes('vite')) return skillIcons.vite
  if (key.includes('webpack')) return skillIcons.webpack
  if (key.includes('expo')) return skillIcons.expo
  if (key.includes('docker')) return skillIcons.docker
  if (key.includes('aws')) return skillIcons.aws
  if (key.includes('tiktok')) return skillIcons.tiktok
  if (key.includes('capcut')) return skillIcons.capcut
  if (key.includes('bootstrap')) return skillIcons.bootstrap
  return skillIcons.default
}

// ── Category SVG Icons ─────────────────────────────────────────────────────
const getCategoryIcon = (title) => {
  const t = title.toLowerCase()
  if (t.includes('front')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-violet-500/20 shadow-sm">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      </div>
    )
  }
  if (t.includes('back')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20 shadow-sm">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.7 4.95a2.25 2.25 0 011.8-.9h9a2.25 2.25 0 011.8.9l2.1 3.6a4.5 4.5 0 01.9 2.7" />
        </svg>
      </div>
    )
  }
  if (t.includes('tool')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-sm">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.07a4.5 4.5 0 004.486-6.32l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.32 4.486c.09.49.232 1.01.442 1.503z" />
        </svg>
      </div>
    )
  }
  if (t.includes('content') || t.includes('creator')) {
    return (
      <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center border border-pink-500/20 shadow-sm">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      </div>
    )
  }
  return (
    <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center border border-violet-500/20 shadow-sm">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
      </svg>
    </div>
  )
}

const Skills = () => {
  const { skills: skillCategories } = usePortfolio()
  const sectionRef = useScrollReveal()

  return (
    <section id="skills" className="relative py-24 bg-slate-100/60 dark:bg-navy-900/50 overflow-hidden transition-colors duration-300" ref={sectionRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-400/10 dark:bg-violet-600/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-medium uppercase text-xs tracking-wider mb-3">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.07a4.5 4.5 0 004.486-6.32l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.32 4.486c.09.49.232 1.01.442 1.503z" />
            </svg>
            <span>What I work with</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Skills & Tools</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            return (
              <div key={index} className={`reveal reveal-delay-${Math.min(index + 1, 6)}`}>
                <div className="glass rounded-2xl p-8 hover-glow h-full relative overflow-hidden group">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${
                    index % 2 === 0
                      ? 'from-violet-500 via-violet-400 to-transparent'
                      : 'from-cyan-400 via-cyan-300 to-transparent'
                  }`} />

                  <div className="flex items-center gap-3.5 mb-6">
                    {getCategoryIcon(category.title)}
                    <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300
                          cursor-default hover:scale-105 hover:-translate-y-0.5 shadow-sm
                          ${index % 2 === 0
                            ? 'bg-violet-50 text-slate-800 border border-violet-200/90 hover:bg-violet-100 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 dark:bg-violet-500/10 dark:text-violet-200 dark:border-violet-500/20 dark:hover:bg-violet-500/20 dark:hover:border-violet-500/40'
                            : 'bg-cyan-50 text-slate-800 border border-cyan-200/90 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10 dark:bg-cyan-500/10 dark:text-cyan-200 dark:border-cyan-500/20 dark:hover:bg-cyan-500/20 dark:hover:border-cyan-500/40'
                          }
                        `}
                      >
                        <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                          {getSkillIcon(skill)}
                        </span>
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
