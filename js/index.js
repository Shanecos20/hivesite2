// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
const cursorHoverElements = document.querySelectorAll('a, button, .feature-card, .testimonial-dot, .app-store-button');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
    });
});

cursorHoverElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animate blobs with GSAP
const blobs = document.querySelectorAll('.blob');
blobs.forEach((blob, index) => {
    // Starting position and properties
    gsap.set(blob, {
        x: 0,
        y: 0,
        opacity: 0.3
    });
    
    // Animation with more natural movement
    gsap.to(blob, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        duration: 20 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.8
    });
});

// Hexagon canvas background
const canvas = document.getElementById('hexagonCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawHexagons();
}

function drawHexagons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const hexSize = 30;
    const hexHeight = hexSize * Math.sqrt(3);
    const columns = Math.ceil(canvas.width / (hexSize * 1.5)) + 1;
    const rows = Math.ceil(canvas.height / hexHeight) + 1;
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const x = col * hexSize * 1.5;
            const y = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);
            
            drawHexagon(x, y, hexSize, `rgba(255, 193, 7, ${Math.random() * 0.05 + 0.02})`);
        }
    }
}

function drawHexagon(x, y, size, color) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const xPos = x + size * Math.cos(angle);
        const yPos = y + size * Math.sin(angle);
        
        if (i === 0) {
            ctx.moveTo(xPos, yPos);
        } else {
            ctx.lineTo(xPos, yPos);
        }
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Testimonial slider - improved version
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentSlide = 0;
let testimonialInterval;

function showSlide(index) {
    // Clear any existing interval
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
    }
    
    // Hide all slides first
    testimonialSlides.forEach((slide) => {
        gsap.set(slide, {
            opacity: 0,
            display: 'none',
            x: '100%'
        });
    });
    
    // Show selected slide with animation
    gsap.set(testimonialSlides[index], { display: 'block' });
    gsap.to(testimonialSlides[index], {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power2.out'
    });
    
    // Update active dot
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
    
    // Set up the interval again
    testimonialInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(nextSlide);
    }, 6000);
}

testimonialDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
    });
});

// Initialize first slide
showSlide(0);

// GSAP animations for content
window.addEventListener('load', () => {
    // Hero section animations
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3
    });
    
    gsap.to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.5
    });
    
    gsap.to('.hero-cta-group', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.7
    });
    
    gsap.to('.device-preview', {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.9
    });
    
    gsap.to('.hero-scroll', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.5
    });

    // EU Badge animation
    gsap.to('.eu-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.2
    });
    
    // Scroll animations
    gsap.utils.toArray('.section-subtitle').forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
    
    gsap.utils.toArray('.section-title').forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.2
        });
    });
    
    gsap.utils.toArray('.section-description').forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.4
        });
    });
    
    // Feature cards animation with stagger
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.1 * index
        });
    });
    
    // Process steps animation
    gsap.utils.toArray('.process-step').forEach((step, index) => {
        gsap.to(step, {
            scrollTrigger: {
                trigger: step,
                start: "top 80%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2 * index
        });
    });
    
    // Metrics animation with stagger
    gsap.utils.toArray('.metric-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.1 * index
        });
    });
    
    // CTA section animations
    gsap.to('.cta-title', {
        scrollTrigger: {
            trigger: '.cta-title',
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
    
    gsap.to('.cta-description', {
        scrollTrigger: {
            trigger: '.cta-description',
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2
    });
    
    gsap.to('.cta-buttons', {
        scrollTrigger: {
            trigger: '.cta-buttons',
            start: "top 85%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.4
    });
    
    gsap.to('.app-stores', {
        scrollTrigger: {
            trigger: '.app-stores',
            start: "top 85%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.6
    });
    
    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        gsap.to(element, {
            y: Math.random() * 100 - 50,
            scrollTrigger: {
                trigger: element.parentElement,
                scrub: true,
                start: "top bottom",
                end: "bottom top"
            }
        });
    });
});