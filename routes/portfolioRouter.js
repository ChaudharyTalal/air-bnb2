const express = require("express");
const portfolioRouter = express.Router();

portfolioRouter.get("/portfolio", (req, res, next) => {
    res.render('portfolio', {
        pageTitle: '3D Portfolio - Smooth Animations',
        name: 'Your Name',
        tagline: 'Creative Developer & 3D Enthusiast',
        about: 'I create immersive web experiences with cutting-edge technologies.',
        projects: [
            {
                title: '3D Web Experience',
                description: 'Interactive 3D website built with Three.js',
                tech: ['Three.js', 'WebGL', 'GSAP']
            },
            {
                title: 'E-commerce Platform',
                description: 'Full-stack e-commerce solution with modern UX',
                tech: ['React', 'Node.js', 'MongoDB']
            },
            {
                title: 'Portfolio Generator',
                description: 'AI-powered portfolio website generator',
                tech: ['Next.js', 'OpenAI', 'TailwindCSS']
            }
        ],
        skills: ['JavaScript', 'Three.js', 'React', 'Node.js', 'WebGL', 'GSAP', 'CSS3', 'HTML5'],
        email: 'your.email@example.com',
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername'
    });
});

module.exports = portfolioRouter;
