// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
const cursorHoverElements = document.querySelectorAll('a, button, .platform-button, .faq-question');

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

// Platform toggle
const platformButtons = document.querySelectorAll('.platform-button');
const qrContainers = document.querySelectorAll('.qr-container');

platformButtons.forEach(button => {
    button.addEventListener('click', () => {
        const platform = button.getAttribute('data-platform');
        
        // Update active state for buttons
        platformButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Show correct QR container
        qrContainers.forEach(container => {
            container.style.display = 'none';
        });
        document.getElementById(`qr-${platform}`).style.display = 'flex';
    });
});

// FAQ toggle
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Toggle active class
        faqItem.classList.toggle('active');
    });
});

// Animate gradient blobs
const blobs = document.querySelectorAll('.blob');

blobs.forEach((blob, index) => {
    // Set initial positions
    gsap.set(blob, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 0.3
    });
    
    // Create animation
    const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        delay: index * 1.5
    });
    
    tl.to(blob, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        scale: 0.9 + Math.random() * 0.3,
        opacity: 0.2 + Math.random() * 0.2,
        duration: 15 + index * 5,
        ease: "sine.inOut"
    });
    
    // Add scroll-based parallax
    gsap.to(blob, {
        y: (index % 2 === 0) ? "+=80" : "-=80",
        scrollTrigger: {
            trigger: ".hero",
            scrub: 1,
            start: "top bottom",
            end: "bottom top"
        }
    });
});

// GSAP animations for content
window.addEventListener('load', () => {
    // Hero section animations
    gsap.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3
    });
    
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.5
    });
    
    gsap.to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.7
    });
    
    gsap.to('.download-options', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.9
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
    
    // App showcase animations
    gsap.utils.toArray('.showcase-item').forEach((item, index) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2 * index
        });
    });
    
    // Features animations
    gsap.utils.toArray('.feature-box').forEach((box, index) => {
        gsap.to(box, {
            scrollTrigger: {
                trigger: box,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.1 * index
        });
    });
    
    // FAQ animations
    gsap.utils.toArray('.faq-item').forEach((item, index) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
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
});
