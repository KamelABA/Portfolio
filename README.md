# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern and clean UI design
- 📱 Fully responsive layout
- ⚡ Fast build with Vite
- 🎯 Sections: Header, Hero, About, Skills, Projects, Contact, Footer
- 🎨 Styled with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Customization

You can easily customize the portfolio by editing the components in the `src/components/` directory:

- Update personal information in `Hero.jsx` and `About.jsx`
- Add your skills in `Skills.jsx`
- Showcase your projects in `Projects.jsx`
- Update social links in `Contact.jsx`

## Technologies Used

- React 18
- Vite 5
- Tailwind CSS 3
- PostCSS
- Autoprefixer

## License

MIT





