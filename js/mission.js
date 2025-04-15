 // Register ScrollTrigger plugin
 gsap.registerPlugin(ScrollTrigger);

 // Custom cursor
 const cursor = document.querySelector('.custom-cursor');
 const cursorHoverElements = document.querySelectorAll('a, button, .value-card, .join-option, .testimonial-dot');

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

 // Testimonial slider
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

 // Progress bars animation
 function animateProgressBars() {
     const progressBars = document.querySelectorAll('.progress-bar');
     
     progressBars.forEach(bar => {
         const percentage = bar.getAttribute('data-percentage');
         gsap.to(bar, {
             width: percentage + '%',
             duration: 1.5,
             ease: 'power2.out',
             scrollTrigger: {
                 trigger: bar,
                 start: "top 90%"
             }
         });
     });
 }

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
     
     gsap.to('.hero-cta', {
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
     
     // Mission statement animation
     gsap.to('.mission-statement', {
         scrollTrigger: {
             trigger: '.mission-statement',
             start: "top 80%",
         },
         opacity: 1,
         y: 0,
         duration: 0.8,
         ease: 'power2.out'
     });
     
     // Values cards animations
     gsap.utils.toArray('.value-card').forEach((card, index) => {
         gsap.to(card, {
             scrollTrigger: {
                 trigger: card,
                 start: "top 85%",
             },
             opacity: 1,
             y: 0,
             duration: 0.8,
             ease: 'power2.out',
             delay: 0.2 * index
         });
     });
     
     // Impact content animations
     gsap.utils.toArray('.impact-content').forEach((content) => {
         gsap.to(content, {
             scrollTrigger: {
                 trigger: content,
                 start: "top 80%",
             },
             opacity: 1,
             y: 0,
             duration: 0.8,
             ease: 'power2.out'
         });
     });
     
     gsap.utils.toArray('.impact-image').forEach((image) => {
         gsap.to(image, {
             scrollTrigger: {
                 trigger: image,
                 start: "top 80%",
             },
             opacity: 1,
             y: 0,
             duration: 0.8,
             ease: 'power2.out',
             delay: 0.3
         });
     });
     
     // Goal items animations
     gsap.utils.toArray('.goal-item').forEach((item, index) => {
         gsap.to(item, {
             scrollTrigger: {
                 trigger: item,
                 start: "top 85%",
             },
             opacity: 1,
             y: 0,
             duration: 0.6,
             ease: 'power2.out',
             delay: 0.1 * index,
             onComplete: animateProgressBars
         });
     });
     
     // EU initiative animation
     gsap.to('.eu-initiative', {
         scrollTrigger: {
             trigger: '.eu-initiative',
             start: "top 80%",
         },
         opacity: 1,
         y: 0,
         duration: 0.8,
         ease: 'power2.out'
     });
     
     // Join movement section animations
     gsap.to('.join-title', {
         scrollTrigger: {
             trigger: '.join-title',
             start: "top 80%",
         },
         opacity: 1,
         y: 0,
         duration: 0.8,
         ease: 'power2.out'
     });
     
     gsap.to('.join-description', {
         scrollTrigger: {
             trigger: '.join-description',
             start: "top 80%",
         },
         opacity: 1,
         y: 0,
         duration: 0.8,
         ease: 'power2.out',
         delay: 0.2
     });
     
     gsap.to('.join-options', {
         scrollTrigger: {
             trigger: '.join-options',
             start: "top 80%",
         },
         opacity: 1,
         y: 0,
         duration: 0.8,
         ease: 'power2.out',
         delay: 0.4
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