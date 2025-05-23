import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/About.module.css';

const About = () => {
  // Register ScrollTrigger plugin outside of useEffect
  gsap.registerPlugin(ScrollTrigger);
  
  // Create refs for elements we need to animate
  const heroRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  const blobsRef = useRef([]);
  
  // Refs for section elements
  const sectionRefs = {
    subtitles: useRef([]),
    titles: useRef([]),
    descriptions: useRef([]),
    storyContent: useRef(null),
    storyImage: useRef(null),
    visionCards: useRef([]),
    teamMembers: useRef([]),
    techContents: useRef([]),
    techImages: useRef([]),
    timelineItems: useRef([]),
    partnerItems: useRef([]),
    ctaTitle: useRef(null),
    ctaDescription: useRef(null),
    ctaButtons: useRef(null)
  };

  useEffect(() => {
    // Function to initialize animations - separated for clarity
    const initAnimations = () => {
      console.log('Initializing AboutPage GSAP animations');
      
      // Kill any existing ScrollTrigger instances to prevent conflicts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Animate gradient blobs
      if (blobsRef.current && blobsRef.current.length) {
        blobsRef.current.forEach((blob, index) => {
          if (!blob) return;
          
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
          if (heroRef.current) {
            gsap.to(blob, {
              y: (index % 2 === 0) ? "+=80" : "-=80",
              scrollTrigger: {
                trigger: heroRef.current,
                scrub: 1,
                start: "top bottom",
                end: "bottom top"
              }
            });
          }
        });
      }

      // Hero section animations
      if (heroBadgeRef.current) {
        gsap.to(heroBadgeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3
        });
      }
      
      if (heroTitleRef.current) {
        gsap.to(heroTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5
        });
      }
      
      if (heroDescriptionRef.current) {
        gsap.to(heroDescriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.7
        });
      }
      
      // Scroll animations for section elements
      if (sectionRefs.subtitles.current && sectionRefs.subtitles.current.length) {
        sectionRefs.subtitles.current.forEach(element => {
          if (!element) return;
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
      }
      
      if (sectionRefs.titles.current && sectionRefs.titles.current.length) {
        sectionRefs.titles.current.forEach(element => {
          if (!element) return;
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
      }
      
      if (sectionRefs.descriptions.current && sectionRefs.descriptions.current.length) {
        sectionRefs.descriptions.current.forEach(element => {
          if (!element) return;
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
      }
      
      // Story section animations
      if (sectionRefs.storyContent.current) {
        gsap.to(sectionRefs.storyContent.current, {
          scrollTrigger: {
            trigger: sectionRefs.storyContent.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      
      if (sectionRefs.storyImage.current) {
        gsap.to(sectionRefs.storyImage.current, {
          scrollTrigger: {
            trigger: sectionRefs.storyImage.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3
        });
      }
      
      // Vision cards animations
      if (sectionRefs.visionCards.current && sectionRefs.visionCards.current.length) {
        sectionRefs.visionCards.current.forEach((card, index) => {
          if (!card) return;
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
      }
      
      // Team members animations
      if (sectionRefs.teamMembers.current && sectionRefs.teamMembers.current.length) {
        sectionRefs.teamMembers.current.forEach((member, index) => {
          if (!member) return;
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
      }
      
      // Technology section animations
      if (sectionRefs.techContents.current && sectionRefs.techContents.current.length) {
        sectionRefs.techContents.current.forEach((content, index) => {
          if (!content) return;
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
      }
      
      if (sectionRefs.techImages.current && sectionRefs.techImages.current.length) {
        sectionRefs.techImages.current.forEach((image, index) => {
          if (!image) return;
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
      }
      
      // Timeline animations
      if (sectionRefs.timelineItems.current && sectionRefs.timelineItems.current.length) {
        sectionRefs.timelineItems.current.forEach((item, index) => {
          if (!item) return;
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
      }
      
      // Partner animations
      if (sectionRefs.partnerItems.current && sectionRefs.partnerItems.current.length) {
        sectionRefs.partnerItems.current.forEach((partner, index) => {
          if (!partner) return;
          gsap.to(partner, {
            scrollTrigger: {
              trigger: partner,
              start: "top 90%",
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.1 * index
          });
        });
      }
      
      // CTA section animations
      if (sectionRefs.ctaTitle.current) {
        gsap.to(sectionRefs.ctaTitle.current, {
          scrollTrigger: {
            trigger: sectionRefs.ctaTitle.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      
      if (sectionRefs.ctaDescription.current) {
        gsap.to(sectionRefs.ctaDescription.current, {
          scrollTrigger: {
            trigger: sectionRefs.ctaDescription.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2
        });
      }
      
      if (sectionRefs.ctaButtons.current) {
        gsap.to(sectionRefs.ctaButtons.current, {
          scrollTrigger: {
            trigger: sectionRefs.ctaButtons.current,
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.4
        });
      }
    };
    
    // First attempt - immediate initialization
    initAnimations();
    
    // Second attempt - with short delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      initAnimations();
    }, 100);
    
    // Third attempt - with longer delay for any lazy-loaded resources
    const refreshTimeout = setTimeout(() => {
      initAnimations();
      
      // Force refresh of all ScrollTriggers
      if (ScrollTrigger.refresh) {
        ScrollTrigger.refresh();
      }
      
      // Force window resize event to recalculate positions
      window.dispatchEvent(new Event('resize'));
    }, 500);

    // Cleanup function
    return () => {
      clearTimeout(initTimeout);
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []); // Empty dependency array to run once on mount

  // Function to add elements to our refs arrays
  const addToRef = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.hero_bg}>
          <div className={styles.honeycomb_grid}></div>
          <div className={styles.blob_container}>
            <div className={styles.blob} style={{ width: '400px', height: '400px', top: '-100px', left: '-100px' }} ref={el => addToRef(el, blobsRef)}></div>
            <div className={styles.blob} style={{ width: '500px', height: '500px', top: '30%', right: '-150px' }} ref={el => addToRef(el, blobsRef)}></div>
            <div className={styles.blob} style={{ width: '300px', height: '300px', bottom: '-50px', left: '40%' }} ref={el => addToRef(el, blobsRef)}></div>
          </div>
        </div>
        <div className={styles.hero_content}>
          <div className={styles.hero_badge} ref={heroBadgeRef} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span style={{ marginLeft: '8px' }}>EU Green Award Winner</span>
          </div>
          <h1 className={styles.hero_title} ref={heroTitleRef} style={{ opacity: 0, transform: 'translateY(20px)' }}>The Team Behind <span>HIVE</span></h1>
          <p className={styles.hero_description} ref={heroDescriptionRef} style={{ opacity: 0, transform: 'translateY(20px)' }}>We're a passionate group of technologists, beekeepers, and environmentalists united by a common goal: to revolutionise beekeeping through innovation while ensuring a sustainable future for honeybees worldwide.</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={`${styles.section} ${styles.bg_white}`} id="our-story">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Our Journey</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>The HIVE Story</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>How a simple idea evolved into a revolutionary beekeeping solution that's changing the industry.</p>
        </div>
        
        <div className={styles.story_container}>
          <div className={styles.story_content} ref={sectionRefs.storyContent} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <h3 className={styles.story_title}>A Vision Born from Necessity</h3>
            <p className={styles.story_text}>HIVE was born from a shared passion for sustainability, technology, and bee welfare. Founded in 2024 by a team of final-year computing and digital media students—and developed in close dialogue with real-world beekeepers—HIVE emerged in response to a simple but serious question: why are we still losing so many hives to preventable problems like mites, starvation, and disease?</p>
            <p className={styles.story_text}>Rather than replace the art of beekeeping, we set out to build a tool that complements it—a modular smart-hive system powered by AI and IoT that can alert, assist, and even act on a beekeeper's behalf when early signs of trouble appear. Drawing from sensor technology, cloud computing, and human-centred design, we created a prototype that brings precision and peace of mind to both hobbyists and commercial apiarists.</p>
            <p className={styles.story_text}>With strong early interest from local clubs, commercial beekeepers, and agri-tech mentors, we're working to launch a product that empowers keepers of all levels to protect their colonies, reduce manual labour, and improve outcomes—without losing the hands-on joy of the craft.</p>
          </div>
          <div className={styles.story_image} ref={sectionRefs.storyImage} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <img src="/assets/beeflower.jpg" alt="HIVE founders with beehives" />
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className={`${styles.section} ${styles.bg_off_white}`} id="our-vision">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Looking Forward</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Our Vision</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>We're committed to creating a world where beekeeping is accessible, sustainable, and technologically enhanced.</p>
        </div>
        
        <div className={styles.vision_cards}>
          <div className={styles.vision_card} ref={el => addToRef(el, sectionRefs.visionCards)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className={styles.vision_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className={styles.vision_title}>Innovation</h3>
            <p className={styles.vision_text}>We push the boundaries of what's possible in beekeeping technology, constantly developing new features and improvements based on real-world feedback from our community.</p>
          </div>
          
          <div className={styles.vision_card} ref={el => addToRef(el, sectionRefs.visionCards)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className={styles.vision_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div>
            <h3 className={styles.vision_title}>Sustainability</h3>
            <p className={styles.vision_text}>Our commitment to environmental responsibility extends beyond our product to every aspect of our business, from sustainable manufacturing to carbon-neutral operations.</p>
          </div>
          
          <div className={styles.vision_card} ref={el => addToRef(el, sectionRefs.visionCards)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className={styles.vision_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className={styles.vision_title}>Community</h3>
            <p className={styles.vision_text}>We believe in the power of collective knowledge and are building a global network of beekeepers who share insights, support each other, and collaborate to solve common challenges.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`${styles.section} ${styles.bg_white}`} id="our-team">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Meet The Experts</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Our Team</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>The passionate individuals driving HIVE's innovation and commitment to bee conservation.</p>
        </div>
        
        <div className={styles.team_container}>
          <div className={styles.team_grid}>
            <div className={styles.team_member} ref={el => addToRef(el, sectionRefs.teamMembers)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <div className={styles.member_image}>
                <img src="/assets/shane.png" alt="Shane Costello" />
              </div>
              <div className={styles.member_info}>
                <h3 className={styles.member_name}>Shane Costello</h3>
                <div className={styles.member_role}>Founder & CEO</div>
                <p className={styles.member_bio}>BsC (Hons) in Computing & Digital Media Student.</p>
                <div className={styles.member_social}>
                  <a href="#" className={styles.social_link}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className={styles.social_link}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className={styles.team_member} ref={el => addToRef(el, sectionRefs.teamMembers)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <div className={styles.member_image}>
                <img src="/assets/yana.png" alt="Yana Greer" />
              </div>
              <div className={styles.member_info}>
                <h3 className={styles.member_name}>Yana Greer</h3>
                <div className={styles.member_role}>CTO</div>
                <p className={styles.member_bio}>BsC (Hons) in Computing & Digital Media Student.</p>
                <div className={styles.member_social}>
                <a href="#" className={styles.social_link}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className={styles.social_link}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className={styles.team_member} ref={el => addToRef(el, sectionRefs.teamMembers)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <div className={styles.member_image}>
                <img src="/assets/matthew.png" alt="Matthew Creaven" />
              </div>
              <div className={styles.member_info}>
                <h3 className={styles.member_name}>Matthew Creaven</h3>
                <div className={styles.member_role}>Head of Research</div>
                <p className={styles.member_bio}>BsC (Hons) in Computing & Digital Media Student.</p>
                <div className={styles.member_social}>
                  <a href="#" className={styles.social_link}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className={styles.social_link}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className={`${styles.section} ${styles.bg_off_white}`} id="our-technology">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Innovation</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Our Technology</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>The revolutionary system that's transforming beekeeping through smart technology and data-driven insights.</p>
        </div>
        
        <div className={styles.tech_container}>
          <div className={styles.tech_row}>
            <div className={styles.tech_content} ref={el => addToRef(el, sectionRefs.techContents)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <h3 className={styles.tech_title}>IoT Sensor Network</h3>
              <p className={styles.tech_text}>Our proprietary network of sensors is designed specifically for the unique environment of beehives. These low-power, high-precision devices continuously monitor crucial metrics without disturbing the colony.</p>
              <div className={styles.tech_features}>
                <div className={styles.tech_feature}>
                  <div className={styles.feature_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p className={styles.feature_text}>Temperature and humidity sensors accurate to within 0.1°C/1% RH</p>
                </div>
                <div className={styles.tech_feature}>
                  <div className={styles.feature_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p className={styles.feature_text}>Weight monitoring system with precision load cells</p>
                </div>
                <div className={styles.tech_feature}>
                  <div className={styles.feature_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p className={styles.feature_text}>Acoustic monitoring for bee activity and queen status</p>
                </div>
              </div>
            </div>
            <div className={styles.tech_image} ref={el => addToRef(el, sectionRefs.techImages)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <img src="/assets/stockhive.jpg" alt="HIVE IoT sensors" />
            </div>
          </div>
          
          <div className={styles.tech_row}>
            <div className={styles.tech_content} ref={el => addToRef(el, sectionRefs.techContents)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <h3 className={styles.tech_title}>AI-Powered Analytics</h3>
              <p className={styles.tech_text}>Our machine learning algorithms analyse billions of data points to identify patterns and predict potential issues before they become problems. This predictive approach enables proactive management rather than reactive intervention.</p>
              <div className={styles.tech_features}>
                <div className={styles.tech_feature}>
                  <div className={styles.feature_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p className={styles.feature_text}>98% accuracy in predicting swarming events 5-7 days in advance</p>
                </div>
                <div className={styles.tech_feature}>
                  <div className={styles.feature_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p className={styles.feature_text}>Early detection of disease markers and parasite presence</p>
                </div>
                <div className={styles.tech_feature}>
                  <div className={styles.feature_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p className={styles.feature_text}>Personalised recommendations based on local conditions and hive history</p>
                </div>
              </div>
            </div>
            <div className={styles.tech_image} ref={el => addToRef(el, sectionRefs.techImages)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <img src="/assets/dashboardwide2.png" alt="HIVE Analytics Dashboard" />
            </div>
          </div>
          
          <div className={styles.tech_row}>
            <div className={styles.tech_content} ref={el => addToRef(el, sectionRefs.techContents)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <h3 className={styles.tech_title}>Mobile & Web Platform</h3>
              <p className={styles.tech_text}>Our intuitive, cross-platform application puts powerful tools in the hands of beekeepers everywhere. From comprehensive data visualisation to community insights, everything you need is just a tap away.</p>
              <div className={styles.tech_features}>
                <div className={styles.tech_feature}>
                  <div className={styles.feature_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p className={styles.feature_text}>Real-time alerts and notifications when attention is needed</p>
                </div>
                <div className={styles.tech_feature}>
                  <div className={styles.feature_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p className={styles.feature_text}>Comprehensive record-keeping and reporting tools</p>
                </div>
                <div className={styles.tech_feature}>
                  <div className={styles.feature_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <p className={styles.feature_text}>Secure cloud storage with offline capabilities for remote locations</p>
                </div>
              </div>
            </div>
            <div className={styles.tech_image} ref={el => addToRef(el, sectionRefs.techImages)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
              <img src="/assets/dashboardwide.png" alt="HIVE mobile app interface" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={`${styles.section} ${styles.bg_white}`} id="our-journey">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Milestones</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Our Journey</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>From concept to award-winning innovation, the story of HIVE's evolution and growth.</p>
        </div>
        
        <div className={styles.timeline_container}>
          <div className={styles.timeline_line}></div>
          
          <div className={styles.timeline_item} ref={el => addToRef(el, sectionRefs.timelineItems)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className={styles.timeline_dot}></div>
            <div className={styles.timeline_content}>
              <div className={styles.timeline_year}>September 2024</div>
              <h3 className={styles.timeline_title}>Hive App Concept</h3>
              <p className={styles.timeline_text}>The Hive App concept was ideated and our group was formed. Stemming from a shared passion for sustainability, technology, and bee welfare.</p>
            </div>
          </div>
          
          <div className={styles.timeline_item} ref={el => addToRef(el, sectionRefs.timelineItems)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className={styles.timeline_dot}></div>
            <div className={styles.timeline_content}>
              <div className={styles.timeline_year}>October 2024</div>
              <h3 className={styles.timeline_title}>Market Research</h3>
              <p className={styles.timeline_text}>Initial market research was conducted to determine the viability of the Hive App. This included a survey of beekeepers and a review of existing beekeeping apps.</p>
            </div>
          </div>
          
          <div className={styles.timeline_item} ref={el => addToRef(el, sectionRefs.timelineItems)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className={styles.timeline_dot}></div>
            <div className={styles.timeline_content}>
              <div className={styles.timeline_year}>November 2024</div>
              <h3 className={styles.timeline_title}>Prototype Concept</h3>
              <p className={styles.timeline_text}>A prototype concept was created to showcase the potential of the Hive App project. This included a prototype of the app and website as well as additional resources such as the first issue of our E-Book series.</p>
            </div>
          </div>
          
          <div className={styles.timeline_item} ref={el => addToRef(el, sectionRefs.timelineItems)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className={styles.timeline_dot}></div>
            <div className={styles.timeline_content}>
              <div className={styles.timeline_year}>February 2025</div>
              <h3 className={styles.timeline_title}>New Direction</h3>
              <p className={styles.timeline_text}>The HIVE team turned their focus to the redesign of the brand, including the app and website according to feedback recieved. We began finalising what we wanted our product to be.</p>
            </div>
          </div>
          
          <div className={styles.timeline_item} ref={el => addToRef(el, sectionRefs.timelineItems)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className={styles.timeline_dot}></div>
            <div className={styles.timeline_content}>
              <div className={styles.timeline_year}>March 2025</div>
              <h3 className={styles.timeline_title}>ATU Student Entrepreneur Awards</h3>
              <p className={styles.timeline_text}>HIVE was recognized with the prestigious EU Green Award for sustainable innovation that contributes to environmental conservation.</p>
            </div>
          </div>
          
          <div className={styles.timeline_item} ref={el => addToRef(el, sectionRefs.timelineItems)} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className={styles.timeline_dot}></div>
            <div className={styles.timeline_content}>
              <div className={styles.timeline_year}>April 2025</div>
              <h3 className={styles.timeline_title}>Enterprise Ireland Student Entrepreneur Awards</h3>
              <p className={styles.timeline_text}>HIVE was shortlisted for the Enterprise Ireland Student Entrepreneur Awards for 2025.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className={`${styles.section} ${styles.bg_off_white}`} id="our-partners">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Collaborations</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Our Partners</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>We're proud to work with leading organizations and institutions that share our commitment to bee conservation and sustainable agriculture.</p>
        </div>
        
        <div className={styles.partners_container}>
          <div className={styles.partners_grid}>
            {[
              { name: 'ATU', logo: '/assets/partnerATU.png' },
              { name: 'Bord Bia', logo: '/assets/partnerBordbia.png' },
              { name: 'Enterprise Ireland', logo: '/assets/partnerEnterprise.png' },
              { name: 'EU Green', logo: '/assets/partnerEUGREEN.png' },
              { name: 'IFA', logo: '/assets/partnerIFA.png' },
              { name: 'Innovation Hub', logo: '/assets/partnerIHUBS.jpg' },
              { name: 'Irish Beekeepers Association', logo: '/assets/partnerIrishBee.png' },
              { name: 'National Ploughing Championships', logo: '/assets/partnerPloughing.png' },
              { name: 'All-Ireland Pollinator Plan', logo: '/assets/partnerPollinator.png' },
              { name: 'Teagasc', logo: '/assets/partnerTeagasc.png' }
            ].map(({ name, logo }) => (
              <div
                className={styles.partner_item}
                key={name}
                ref={el => addToRef(el, sectionRefs.partnerItems)}
                style={{ opacity: 0, transform: 'translateY(20px)' }}
              >
                <img
                  src={logo}
                  alt={name}
                  className={styles.partner_logo}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta_section} id="cta">
        <div className={styles.cta_container}>
          <h2 className={styles.cta_title} ref={sectionRefs.ctaTitle} style={{ opacity: 0, transform: 'translateY(20px)' }}>Join Our Mission</h2>
          <p className={styles.cta_description} ref={sectionRefs.ctaDescription} style={{ opacity: 0, transform: 'translateY(20px)' }}>Whether you're a hobbyist with a single hive or manage thousands of colonies, HIVE is designed to help you become a better beekeeper while contributing to the global effort of bee conservation.</p>
          
          <div className={styles.cta_buttons} ref={sectionRefs.ctaButtons} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <a href="/download" className="cta-button">Get Started</a>
            <a href="/contact" className="cta-button cta-button--secondary">Contact Sales</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;