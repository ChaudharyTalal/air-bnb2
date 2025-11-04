// Three.js Scene Setup
let scene, camera, renderer, particles, torus, sphere, clock;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Initialize Three.js Scene
function init() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 1, 100);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 30;

    // Renderer
    const canvas = document.getElementById('webgl-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clock for animations
    clock = new THREE.Clock();

    // Create 3D Objects
    createParticles();
    createTorus();
    createSphere();
    createLights();

    // Event Listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll);

    // Start Animation Loop
    animate();

    // Initialize GSAP Animations
    initGSAPAnimations();
}

// Create Particle System
function createParticles() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

// Create Torus
function createTorus() {
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff006e,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    torus = new THREE.Mesh(geometry, material);
    torus.position.set(-15, 5, -10);
    scene.add(torus);
}

// Create Sphere
function createSphere() {
    const geometry = new THREE.IcosahedronGeometry(8, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00f5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.4
    });
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(15, -5, -15);
    scene.add(sphere);
}

// Create Lights
function createLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff006e, 2);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00f5ff, 2);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 1);
    pointLight3.position.set(0, 0, 30);
    scene.add(pointLight3);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Rotate particles
    if (particles) {
        particles.rotation.y = elapsedTime * 0.05;
        particles.rotation.x = elapsedTime * 0.03;
    }

    // Rotate torus
    if (torus) {
        torus.rotation.x = elapsedTime * 0.3;
        torus.rotation.y = elapsedTime * 0.2;
    }

    // Rotate sphere
    if (sphere) {
        sphere.rotation.x = elapsedTime * 0.2;
        sphere.rotation.y = elapsedTime * 0.3;
    }

    // Mouse parallax effect
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Mouse Move Handler
function onMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

// Scroll Handler
function onScroll() {
    const scrollY = window.scrollY;
    
    if (camera) {
        camera.position.y = scrollY * 0.01;
        camera.rotation.z = scrollY * 0.0001;
    }

    if (torus) {
        torus.position.y = 5 + scrollY * 0.005;
    }

    if (sphere) {
        sphere.position.y = -5 - scrollY * 0.003;
    }
}

// Window Resize Handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// GSAP Animations
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scroll
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        gsap.from(section, {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Hero title animation
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3
    });

    gsap.from('.hero-tagline', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
    });

    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9
    });

    // About cards animation
    gsap.from('.about-card', {
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%'
        }
    });

    // Project cards animation
    gsap.from('.project-card', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 70%'
        }
    });

    // Skills animation
    gsap.from('.skill-category', {
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 70%'
        }
    });

    // Skill bars animation
    gsap.from('.skill-progress', {
        width: 0,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 60%'
        }
    });

    // Contact section animation
    gsap.from('.contact-info', {
        opacity: 0,
        x: -80,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%'
        }
    });

    gsap.from('.contact-form', {
        opacity: 0,
        x: 80,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%'
        }
    });

    // Scroll indicator animation
    gsap.to('.scroll-indicator', {
        y: 20,
        duration: 1.5,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
    });

    // Mouse wheel animation
    gsap.to('.wheel', {
        y: 8,
        duration: 1,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true
    });
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a, .hero-buttons a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                }
            }
        });
    });

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form.');
            contactForm.reset();
        });
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

// Initialize scene when page loads
window.addEventListener('load', init);
