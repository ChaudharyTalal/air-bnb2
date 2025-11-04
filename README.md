# 3D Portfolio Website

A modern, interactive portfolio website featuring 3D animations, smooth scrolling, and stunning visual effects built with Three.js, GSAP, and Locomotive Scroll.

## Features

- **3D Background Scene**: Animated particle system and geometric shapes using Three.js
- **Smooth Scrolling**: Buttery smooth scroll experience powered by Locomotive Scroll
- **Scroll-Triggered Animations**: GSAP animations that trigger as you scroll through sections
- **Interactive Elements**: Mouse-responsive 3D objects that follow cursor movement
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean, professional design with gradient effects and glass morphism
- **Performance Optimized**: Reduced particle count on mobile for better performance

## Tech Stack

- **Backend**: Express.js (Node.js)
- **Templating**: EJS
- **3D Graphics**: Three.js
- **Animations**: GSAP (GreenSock Animation Platform)
- **Smooth Scroll**: Locomotive Scroll
- **Styling**: Custom CSS with modern effects

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm start
```

The application will be available at:
- Local: http://localhost:3000
- Portfolio: http://localhost:3000/portfolio

### Customization

You can customize the portfolio content by editing `/vercel/sandbox/routes/portfolioRouter.js`:

- Change your name, tagline, and about section
- Update projects with your own work
- Modify skills list
- Update contact information (email, GitHub, LinkedIn)

### Project Structure

```
/vercel/sandbox/
├── app.js                      # Main Express application
├── routes/
│   └── portfolioRouter.js      # Portfolio route with data
├── views/
│   └── portfolio.ejs           # Portfolio HTML template
├── public/
│   ├── portfolio.css           # Portfolio styles
│   └── portfolio.js            # 3D animations and interactions
└── package.json                # Dependencies
```

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` configuration is already set up.

To deploy:
1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy

## Sections

The portfolio includes the following sections:

1. **Hero**: Eye-catching introduction with animated title and call-to-action buttons
2. **About**: Personal information and statistics
3. **Projects**: Showcase of your best work with descriptions and tech stack
4. **Skills**: Grid of your technical skills
5. **Contact**: Contact information and social links

## Performance Tips

- The 3D elements are hidden on mobile devices for better performance
- Animations use hardware acceleration for smooth 60fps performance
- Images and assets are optimized for fast loading

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## License

ISC

## Credits

Built with Three.js, GSAP, and Locomotive Scroll