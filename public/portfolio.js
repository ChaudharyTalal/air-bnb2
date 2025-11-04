// Initialize smooth scroll with Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false,
    smartphone: {
        smooth: false
    },
    tablet: {
        smooth: false
    }
});

// Update ScrollTrigger when Locomotive Scroll updates
scroll.on('scroll', ScrollTrigger.update);

// Tell ScrollTrigger to use Locomotive Scroll's proxy methods
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
        return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: document.querySelector('[data-scroll-container]').style.transform
        ? 'transform'
        : 'fixed'
});

// Three.js Scene Setup
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create particle system
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x6366f1,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create geometric shapes
const geometries = [
    new THREE.TorusGeometry(10, 3, 16, 100),
    new THREE.OctahedronGeometry(8, 0),
    new THREE.IcosahedronGeometry(7, 0)
];

const material = new THREE.MeshStandardMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});

const shapes = [];

geometries.forEach((geometry, index) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (index - 1) * 30;
    mesh.position.z = -20;
    scene.add(mesh);
    shapes.push(mesh);
});

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x6366f1, 2);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x8b5cf6, 2);
pointLight2.position.set(-20, -20, 20);
scene.add(pointLight2);

camera.position.z = 30;

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Animate particles
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.03;

    // Animate shapes
    shapes.forEach((shape, index) => {
        shape.rotation.x = elapsedTime * 0.3 * (index + 1);
        shape.rotation.y = elapsedTime * 0.2 * (index + 1);
        shape.position.y = Math.sin(elapsedTime + index) * 5;
    });

    // Smooth camera movement based on mouse
    targetX = mouseX * 5;
    targetY = mouseY * 5;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scroll.update();
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate section titles
gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            scroller: '[data-scroll-container]',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Animate project cards
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            scroller: '[data-scroll-container]',
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out'
    });
});

// Animate skill items with stagger
gsap.from('.skill-item', {
    scrollTrigger: {
        trigger: '.skills-grid',
        scroller: '[data-scroll-container]',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: 'back.out(1.7)'
});

// Animate stats
gsap.utils.toArray('.stat-item').forEach((stat, index) => {
    gsap.from(stat, {
        scrollTrigger: {
            trigger: stat,
            scroller: '[data-scroll-container]',
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out'
    });

    // Animate numbers counting up
    const numberElement = stat.querySelector('.stat-number');
    const finalNumber = parseInt(numberElement.textContent);

    ScrollTrigger.create({
        trigger: stat,
        scroller: '[data-scroll-container]',
        start: 'top 85%',
        onEnter: () => {
            gsap.from(numberElement, {
                textContent: 0,
                duration: 2,
                ease: 'power1.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                    numberElement.textContent = Math.ceil(this.targets()[0].textContent) + '+';
                }
            });
        }
    });
});

// Animate contact links
gsap.utils.toArray('.contact-link').forEach((link, index) => {
    gsap.from(link, {
        scrollTrigger: {
            trigger: link,
            scroller: '[data-scroll-container]',
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Parallax effect for about text
gsap.to('.about-text', {
    scrollTrigger: {
        trigger: '.about-section',
        scroller: '[data-scroll-container]',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    },
    y: 50,
    ease: 'none'
});

// Refresh ScrollTrigger after everything is set up
ScrollTrigger.addEventListener('refresh', () => scroll.update());
ScrollTrigger.refresh();

// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            scroll.scrollTo(target);
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    gsap.to('body', {
        opacity: 1,
        duration: 0.5
    });
});

// Performance optimization: Reduce particle count on mobile
if (window.innerWidth < 768) {
    particlesMesh.visible = false;
    shapes.forEach(shape => {
        shape.visible = false;
    });
}

// Update Locomotive Scroll on DOM changes
const resizeObserver = new ResizeObserver(() => {
    scroll.update();
});

resizeObserver.observe(document.querySelector('[data-scroll-container]'));

console.log('3D Portfolio initialized successfully!');
