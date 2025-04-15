  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Custom cursor
  const cursor = document.querySelector('.custom-cursor');
  const cursorHoverElements = document.querySelectorAll('a, button, .vision-card, .team-member, .partner-item');

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
      
      // Story section animations
      gsap.to('.story-content', {
          scrollTrigger: {
              trigger: '.story-content',
              start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
      });
      
      gsap.to('.story-image', {
          scrollTrigger: {
              trigger: '.story-image',
              start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3
      });
      
      // Vision cards animations
      gsap.utils.toArray('.vision-card').forEach((card, index) => {
          gsap.to(card, {
              scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
              },
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: 0.1 * index
          });
      });
      
      // Team members animations
      gsap.utils.toArray('.team-member').forEach((member, index) => {
          gsap.to(member, {
              scrollTrigger: {
                  trigger: member,
                  start: "top 85%",
              },
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: 0.1 * index
          });
      });
      
      // Technology section animations
      gsap.utils.toArray('.tech-content').forEach((content, index) => {
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
      
      gsap.utils.toArray('.tech-image').forEach((image, index) => {
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
      
      // Timeline animations
      gsap.utils.toArray('.timeline-item').forEach((item, index) => {
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
      
      // Partners animations
      gsap.utils.toArray('.partner-item').forEach((item, index) => {
          gsap.to(item, {
              scrollTrigger: {
                  trigger: item,
                  start: "top 85%",
              },
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: 0.05 * index
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