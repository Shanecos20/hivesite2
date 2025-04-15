  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Custom cursor
  const cursor = document.querySelector('.custom-cursor');
  const cursorHoverElements = document.querySelectorAll('a, button, .contact-card, .social-card, .faq-question, input, textarea, select');

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

  // FAQ Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
          const faqItem = question.parentElement;
          faqItem.classList.toggle('active');
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
      
      // Contact cards animations
      gsap.utils.toArray('.contact-card').forEach((card, index) => {
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
      
      // Contact form and social container animations
      gsap.to('.contact-form-container', {
          scrollTrigger: {
              trigger: '.contact-form-container',
              start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
      });
      
      gsap.to('.social-container', {
          scrollTrigger: {
              trigger: '.social-container',
              start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3
      });
      
      // Support hours animation
      gsap.to('.support-hours', {
          scrollTrigger: {
              trigger: '.support-hours',
              start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
      });
      
      // FAQ section animation
      gsap.to('.faq-section', {
          scrollTrigger: {
              trigger: '.faq-section',
              start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
      });

      // Form input focus effect
      const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
      
      formInputs.forEach(input => {
          input.addEventListener('focus', () => {
              gsap.to(input, {
                  borderColor: '#FFC107',
                  boxShadow: '0 0 0 3px rgba(255, 193, 7, 0.2)',
                  duration: 0.3
              });
          });
          
          input.addEventListener('blur', () => {
              if (!input.value) {
                  gsap.to(input, {
                      borderColor: '#EEEEEE',
                      boxShadow: 'none',
                      duration: 0.3
                  });
              }
          });
      });
  });