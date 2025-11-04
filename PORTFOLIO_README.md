# 3D Portfolio Website

A stunning 3D portfolio website with smooth animations and interactive Three.js elements.

## Features

### 🎨 Visual Design
- **3D Background**: Animated geometric shapes (torus, sphere, particles) using Three.js
- **Glassmorphism UI**: Modern glass-effect cards with backdrop blur
- **Gradient Themes**: Beautiful color gradients with cyan and magenta accents
- **Responsive Design**: Fully responsive across all devices

### ✨ Animations
- **GSAP Powered**: Smooth scroll-triggered animations
- **Mouse Parallax**: 3D scene responds to mouse movement
- **Scroll Effects**: Elements animate as you scroll through sections
- **Hover Interactions**: Cards lift and glow on hover

### 📱 Sections
1. **Hero**: Eye-catching introduction with animated 3D background
2. **About**: Three cards explaining who you are, what you do, and your approach
3. **Projects**: Showcase of 4 featured projects with tags
4. **Skills**: Three categories (Frontend, Backend, Tools) with animated progress bars
5. **Contact**: Contact information and functional form

### 🚀 Technologies Used
- **Three.js**: 3D graphics and WebGL rendering
- **GSAP**: Animation library with ScrollTrigger
- **Express.js**: Backend routing
- **EJS**: Templating engine
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Additional styling for 3D effects

## Access the Portfolio

Visit: `http://localhost:PORT/portfolio`

Replace `PORT` with your server's port number (check your app configuration).

## Customization

### Update Personal Information
Edit `/vercel/sandbox/routes/portfolioRouter.js`:
```javascript
res.render('portfolio', { 
    pageTitle: '3D Portfolio',
    name: 'Your Name',  // Change this
    tagline: 'Creative Developer & 3D Enthusiast'  // Change this
});
```

### Modify Projects
Edit `/vercel/sandbox/views/portfolio.ejs` in the Projects Section to add your own projects.

### Adjust Colors
Edit `/vercel/sandbox/public/portfolio.css` CSS variables:
```css
:root {
    --primary-color: #00f5ff;    /* Cyan */
    --secondary-color: #ff006e;  /* Magenta */
    --bg-dark: #0a0a0a;
    /* ... */
}
```

### Customize 3D Scene
Edit `/vercel/sandbox/public/portfolio-scene.js` to:
- Change particle count
- Modify 3D object sizes and positions
- Adjust animation speeds
- Add new 3D elements

## Performance

The 3D scene is optimized for 60fps with:
- Efficient particle system (2000 particles)
- Wireframe geometries for better performance
- RequestAnimationFrame for smooth animations
- Responsive pixel ratio handling

## Browser Support

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

Requires WebGL support for 3D features.

## File Structure

```
/vercel/sandbox/
├── routes/
│   └── portfolioRouter.js       # Portfolio route handler
├── views/
│   └── portfolio.ejs            # Portfolio HTML template
├── public/
│   ├── portfolio.css            # Portfolio styles
│   └── portfolio-scene.js       # Three.js 3D scene
└── app.js                       # Main app (updated with portfolio route)
```

## Notes

- The portfolio uses CDN links for Three.js and GSAP (no npm install required)
- All animations are GPU-accelerated for smooth performance
- The 3D canvas is fixed in the background with content scrolling over it
- Form submission is currently a demo (shows alert)

Enjoy your new 3D portfolio! 🎉
