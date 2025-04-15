import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/Mission.module.css';

const MissionPage = () => {
  // Add loading state
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Refs for animation targets
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroCtaRef = useRef(null);
  const blobsRef = useRef([]);
  const missionStatementRef = useRef(null);
  const valueCardsRef = useRef([]);
  const impactContentRef = useRef([]);
  const impactImageRef = useRef([]);
  const goalItemsRef = useRef([]);
  const euInitiativeRef = useRef(null);
  const joinTitleRef = useRef(null);
  const joinDescriptionRef = useRef(null);
  const joinOptionsRef = useRef(null);
  const ctaTitleRef = useRef(null);
  const ctaDescriptionRef = useRef(null);
  const ctaButtonsRef = useRef(null);
  const testimonialSlidesRef = useRef([]);
  const testimonialDotsRef = useRef([]);
  
  // Testimonial state
  const testimonialIntervalRef = useRef(null);
  const currentSlideRef = useRef(0);

  // Function to handle testimonial slide change
  const showSlide = (index) => {
    // Clear any existing interval
    if (testimonialIntervalRef.current) {
      clearInterval(testimonialIntervalRef.current);
    }
    
    // Hide all slides first
    testimonialSlidesRef.current.forEach((slide) => {
      gsap.set(slide, {
        opacity: 0,
        display: 'none',
        x: '100%'
      });
    });
    
    // Show selected slide with animation
    gsap.set(testimonialSlidesRef.current[index], { display: 'block' });
    gsap.to(testimonialSlidesRef.current[index], {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power2.out'
    });
    
    // Update active dot
    testimonialDotsRef.current.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add(styles.active);
      } else {
        dot.classList.remove(styles.active);
      }
    });
    
    currentSlideRef.current = index;
    
    // Set up the interval again
    testimonialIntervalRef.current = setInterval(() => {
      const nextSlide = (currentSlideRef.current + 1) % testimonialSlidesRef.current.length;
      showSlide(nextSlide);
    }, 6000);
  };

  // Function to animate progress bars
  const animateProgressBars = () => {
    const progressBars = document.querySelectorAll(`.${styles.progress_bar}`);
    
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
  };

  // Initialize animations when component mounts
  useEffect(() => {
    // First mark component as loaded
    setIsLoaded(true);
    
    // Use a short timeout to ensure DOM is fully rendered
    const initTimeout = setTimeout(() => {
      // Kill any existing ScrollTrigger instances to prevent conflicts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Store references to DOM elements
      blobsRef.current = Array.from(document.querySelectorAll(`.${styles.blob}`));
      valueCardsRef.current = Array.from(document.querySelectorAll(`.${styles.value_card}`));
      impactContentRef.current = Array.from(document.querySelectorAll(`.${styles.impact_content}`));
      impactImageRef.current = Array.from(document.querySelectorAll(`.${styles.impact_image}`));
      goalItemsRef.current = Array.from(document.querySelectorAll(`.${styles.goal_item}`));
      testimonialSlidesRef.current = Array.from(document.querySelectorAll(`.${styles.testimonial_slide}`));
      testimonialDotsRef.current = Array.from(document.querySelectorAll(`.${styles.testimonial_dot}`));

      // Animate blobs
      blobsRef.current.forEach((blob, index) => {
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
            trigger: `.${styles.hero}`,
            scrub: 1,
            start: "top bottom",
            end: "bottom top"
          }
        });
      });

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
      
      if (heroCtaRef.current) {
        gsap.to(heroCtaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.9
        });
      }

      // Section subtitles, titles, and descriptions
      gsap.utils.toArray(`.${styles.section_subtitle}`).forEach(element => {
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
      
      gsap.utils.toArray(`.${styles.section_title}`).forEach(element => {
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
      
      gsap.utils.toArray(`.${styles.section_description}`).forEach(element => {
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
      if (missionStatementRef.current) {
        gsap.to(missionStatementRef.current, {
          scrollTrigger: {
            trigger: missionStatementRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      
      // Values cards animations
      valueCardsRef.current.forEach((card, index) => {
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
      impactContentRef.current.forEach((content) => {
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
      
      impactImageRef.current.forEach((image) => {
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
      goalItemsRef.current.forEach((item, index) => {
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
      if (euInitiativeRef.current) {
        gsap.to(euInitiativeRef.current, {
          scrollTrigger: {
            trigger: euInitiativeRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      
      // Join movement section animations
      if (joinTitleRef.current) {
        gsap.to(joinTitleRef.current, {
          scrollTrigger: {
            trigger: joinTitleRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      
      if (joinDescriptionRef.current) {
        gsap.to(joinDescriptionRef.current, {
          scrollTrigger: {
            trigger: joinDescriptionRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2
        });
      }
      
      if (joinOptionsRef.current) {
        gsap.to(joinOptionsRef.current, {
          scrollTrigger: {
            trigger: joinOptionsRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.4
        });
      }
      
      // CTA section animations
      if (ctaTitleRef.current) {
        gsap.to(ctaTitleRef.current, {
          scrollTrigger: {
            trigger: ctaTitleRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      
      if (ctaDescriptionRef.current) {
        gsap.to(ctaDescriptionRef.current, {
          scrollTrigger: {
            trigger: ctaDescriptionRef.current,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2
        });
      }
      
      if (ctaButtonsRef.current) {
        gsap.to(ctaButtonsRef.current, {
          scrollTrigger: {
            trigger: ctaButtonsRef.current,
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.4
        });
      }
  
      // Initialize testimonial slider
      if (testimonialSlidesRef.current.length > 0) {
        showSlide(0);
      }
  
      // Add event listeners for testimonial dots
      testimonialDotsRef.current.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          showSlide(i);
        });
      });
    }, 100); // Small delay to ensure DOM is ready

    // Cleanup function
    return () => {
      clearTimeout(initTimeout);
      
      // Kill all animations and ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clear any running intervals
      if (testimonialIntervalRef.current) {
        clearInterval(testimonialIntervalRef.current);
      }
      
      // Clean up other event listeners if needed
      if (testimonialDotsRef.current.length > 0) {
        testimonialDotsRef.current.forEach((dot) => {
          dot.removeEventListener('click', () => {});
        });
      }
    };
  }, []);

  // Need to force a refresh on the window on initial load to ensure GSAP animations work properly
  useEffect(() => {
    // Force a reflow to ensure everything loads correctly
    window.addEventListener('load', () => {
      window.dispatchEvent(new Event('resize'));
    });
    
    // Force a refresh of scroll triggers when the component is mounted
    const refreshTimeout = setTimeout(() => {
      if (ScrollTrigger.refresh) {
        ScrollTrigger.refresh();
      }
    }, 200);

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, [isLoaded]);

  return (
    <div className={styles.mission_page}>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.hero_bg}>
          <div className={styles.honeycomb_grid}></div>
          <div className={styles.blob_container}>
            <div 
              className={styles.blob} 
              style={{ width: '400px', height: '400px', top: '-100px', left: '-100px' }}
            ></div>
            <div 
              className={styles.blob} 
              style={{ width: '500px', height: '500px', top: '30%', right: '-150px' }}
            ></div>
            <div 
              className={styles.blob} 
              style={{ width: '300px', height: '300px', bottom: '-50px', left: '40%' }}
            ></div>
          </div>
        </div>
        <div className={styles.hero_content}>
          <div className={styles.hero_badge} ref={heroBadgeRef}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span style={{ marginLeft: '8px' }}>EU Green Award Winner</span>
          </div>
          <h1 className={styles.hero_title} ref={heroTitleRef}>
            Our <span>Mission</span> Is To Save The Bees
          </h1>
          <p className={styles.hero_description} ref={heroDescriptionRef}>
            At HIVE, we believe that the future of our ecosystems depends on the health and proliferation of honeybees. Our mission is to empower beekeepers with innovative technology that promotes sustainable practices and ensures thriving colonies worldwide.
          </p>
          <div className={styles.hero_cta} ref={heroCtaRef}>
            <a href="#join-movement" className={styles.cta_button}>Join Our Movement</a>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className={`${styles.section} ${styles.bg_white}`} id="mission-statement">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle}>Our Purpose</span>
          <h2 className={styles.section_title}>Mission Statement</h2>
          <p className={styles.section_description}>
            The driving force behind everything we do at HIVE.
          </p>
        </div>
        
        <div className={styles.mission_statement} ref={missionStatementRef}>
          <p className={styles.mission_quote}>
            To revolutionize beekeeping through technology that enhances colony health, empowers beekeepers, and contributes to global biodiversity, ensuring a sustainable future where both bees and humans thrive together.
          </p>
          <p className={styles.mission_author}>
            — Dr. Elena Rodriguez, Founder & CEO
          </p>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section className={`${styles.section} ${styles.bg_off_white}`} id="vision-values">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle}>What Guides Us</span>
          <h2 className={styles.section_title}>Our Core Values</h2>
          <p className={styles.section_description}>
            The principles that define our approach and shape our decisions.
          </p>
        </div>
        
        <div className={styles.values_container}>
          <div className={styles.value_card}>
            <div className={styles.value_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className={styles.value_title}>Environmental Stewardship</h3>
            <p className={styles.value_description}>
              We recognize that bees are essential for ecological balance and food security. Every decision we make considers its impact on the environment and biodiversity.
            </p>
          </div>
          
          <div className={styles.value_card}>
            <div className={styles.value_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <h3 className={styles.value_title}>Innovation</h3>
            <p className={styles.value_description}>
              We constantly push the boundaries of what's possible, combining traditional beekeeping wisdom with cutting-edge technology to create solutions that make a real difference.
            </p>
          </div>
          
          <div className={styles.value_card}>
            <div className={styles.value_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className={styles.value_title}>Community</h3>
            <p className={styles.value_description}>
              We believe in the power of shared knowledge and collective action. Our platform connects beekeepers worldwide, fostering collaboration and mutual support.
            </p>
          </div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className={`${styles.section} ${styles.bg_white}`} id="environmental-impact">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle}>Making A Difference</span>
          <h2 className={styles.section_title}>Our Environmental Impact</h2>
          <p className={styles.section_description}>
            Real-world results that demonstrate our commitment to bee conservation and sustainable agriculture.
          </p>
        </div>
        
        <div className={styles.impact_container}>
          <div className={styles.impact_row}>
            <div className={styles.impact_content}>
              <h3 className={styles.impact_title}>Increasing Colony Survival Rates</h3>
              <p className={styles.impact_text}>
                By enabling early detection of threats like diseases, parasites, and environmental stressors, our technology has significantly improved colony survival rates among our users.
              </p>
              <p className={styles.impact_text}>
                This directly contributes to maintaining healthy bee populations, which are essential for pollinating approximately 75% of the world's food crops.
              </p>
              <div className={styles.impact_metrics}>
                <div className={styles.impact_metric}>
                  <div className={styles.metric_value}>45%</div>
                  <div className={styles.metric_label}>Reduction in Colony Losses</div>
                </div>
                <div className={styles.impact_metric}>
                  <div className={styles.metric_value}>12K+</div>
                  <div className={styles.metric_label}>Colonies Saved</div>
                </div>
              </div>
            </div>
            <div className={styles.impact_image}>
              <img src="/api/placeholder/400/350" alt="Healthy beehive with HIVE technology" />
            </div>
          </div>
          
          <div className={styles.impact_row}>
            <div className={styles.impact_content}>
              <h3 className={styles.impact_title}>Promoting Sustainable Practices</h3>
              <p className={styles.impact_text}>
                Our data-driven approach enables beekeepers to make more informed decisions, reducing the need for chemical interventions and promoting organic beekeeping methods.
              </p>
              <p className={styles.impact_text}>
                By minimizing the use of antibiotics and pesticides, we help create healthier hive environments and protect surrounding ecosystems from harmful chemicals.
              </p>
              <div className={styles.impact_metrics}>
                <div className={styles.impact_metric}>
                  <div className={styles.metric_value}>68%</div>
                  <div className={styles.metric_label}>Reduction in Chemical Use</div>
                </div>
                <div className={styles.impact_metric}>
                  <div className={styles.metric_value}>82%</div>
                  <div className={styles.metric_label}>Users Adopting Organic Methods</div>
                </div>
              </div>
            </div>
            <div className={styles.impact_image}>
              <img src="/api/placeholder/400/350" alt="Organic beekeeping with HIVE" />
            </div>
          </div>
          
          <div className={styles.impact_row}>
            <div className={styles.impact_content}>
              <h3 className={styles.impact_title}>Expanding Pollination Capacity</h3>
              <p className={styles.impact_text}>
                Healthier, more productive colonies have a greater capacity for pollination, benefiting both agricultural crops and wild plant species that rely on bees for reproduction.
              </p>
              <p className={styles.impact_text}>
                Our users report increased foraging activity and pollen collection, indicating enhanced pollination services that support biodiversity and food production.
              </p>
              <div className={styles.impact_metrics}>
                <div className={styles.impact_metric}>
                  <div className={styles.metric_value}>35%</div>
                  <div className={styles.metric_label}>Increase in Foraging Activity</div>
                </div>
                <div className={styles.impact_metric}>
                  <div className={styles.metric_value}>4.2M</div>
                  <div className={styles.metric_label}>Hectares Pollinated</div>
                </div>
              </div>
            </div>
            <div className={styles.impact_image}>
              <img src="/api/placeholder/400/350" alt="Bees pollinating flowers" />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Goals Section */}
      <section className={`${styles.section} ${styles.bg_off_white}`} id="sustainability-goals">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle}>Looking Forward</span>
          <h2 className={styles.section_title}>Our 2030 Sustainability Goals</h2>
          <p className={styles.section_description}>
            Ambitious targets we've set to maximize our positive impact on bee populations and global ecosystems.
          </p>
        </div>
        
        <div className={styles.goals_container}>
          <div className={styles.goal_progress_bars}>
            <div className={styles.goal_item}>
              <div className={styles.goal_header}>
                <h3 className={styles.goal_title}>Protect 10 Million Bee Colonies Worldwide</h3>
                <div className={styles.goal_percentage}>34%</div>
              </div>
              <div className={styles.progress_container}>
                <div className={styles.progress_bar} data-percentage="34"></div>
              </div>
            </div>
            
            <div className={styles.goal_item}>
              <div className={styles.goal_header}>
                <h3 className={styles.goal_title}>Reduce Chemical Interventions by 90%</h3>
                <div className={styles.goal_percentage}>68%</div>
              </div>
              <div className={styles.progress_container}>
                <div className={styles.progress_bar} data-percentage="68"></div>
              </div>
            </div>
            
            <div className={styles.goal_item}>
              <div className={styles.goal_header}>
                <h3 className={styles.goal_title}>Achieve Carbon-Neutral Operations</h3>
                <div className={styles.goal_percentage}>85%</div>
              </div>
              <div className={styles.progress_container}>
                <div className={styles.progress_bar} data-percentage="85"></div>
              </div>
            </div>
            
            <div className={styles.goal_item}>
              <div className={styles.goal_header}>
                <h3 className={styles.goal_title}>Train 100,000 New Beekeepers in Sustainable Practices</h3>
                <div className={styles.goal_percentage}>42%</div>
              </div>
              <div className={styles.progress_container}>
                <div className={styles.progress_bar} data-percentage="42"></div>
              </div>
            </div>
            
            <div className={styles.goal_item}>
              <div className={styles.goal_header}>
                <h3 className={styles.goal_title}>Establish 500 Bee Sanctuaries in Threatened Habitats</h3>
                <div className={styles.goal_percentage}>26%</div>
              </div>
              <div className={styles.progress_container}>
                <div className={styles.progress_bar} data-percentage="26"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EU Green Initiative Section */}
      <section className={`${styles.section} ${styles.bg_white}`} id="eu-initiative">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle}>Recognition</span>
          <h2 className={styles.section_title}>EU Green Initiative Partnership</h2>
          <p className={styles.section_description}>
            Our collaboration with the European Union's sustainability program to advance shared environmental goals.
          </p>
        </div>
        
        <div className={styles.eu_initiative} ref={euInitiativeRef}>
          <div className={styles.initiative_top}>
            <div className={styles.initiative_logo}>
              <img src="/api/placeholder/120/120" alt="EU Green Initiative Logo" />
            </div>
            <div>
              <h3 className={styles.initiative_title}>Official EU Green Award Recipient</h3>
              <p className={styles.initiative_subtitle}>Recognized for Excellence in Eco-Innovation and Sustainability</p>
            </div>
          </div>
          
          <p className={styles.initiative_text}>
            HIVE is proud to be a partner in the European Union's Green Initiative, which aims to support innovative technologies that address climate change and biodiversity loss. As a recipient of the prestigious EU Green Award, we've received both recognition and funding to expand our impact across Europe and beyond.
          </p>
          
          <p className={styles.initiative_text}>
            This partnership enables us to collaborate with leading research institutions, policy makers, and environmental organizations to develop best practices for bee conservation and sustainable agriculture.
          </p>
          
          <div className={styles.initiative_highlights}>
            <div className={styles.initiative_highlight}>
              <h4 className={styles.highlight_title}>Research Collaboration</h4>
              <p className={styles.highlight_text}>
                Joint research projects with EU universities studying the correlation between bee health and ecosystem resilience.
              </p>
            </div>
            <div className={styles.initiative_highlight}>
              <h4 className={styles.highlight_title}>Policy Development</h4>
              <p className={styles.highlight_text}>
                Contributing data and insights to inform EU agricultural policies that support pollinator conservation.
              </p>
            </div>
            <div className={styles.initiative_highlight}>
              <h4 className={styles.highlight_title}>Knowledge Sharing</h4>
              <p className={styles.highlight_text}>
                Participating in EU-sponsored workshops and conferences to share our expertise with stakeholders across sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className={`${styles.section} ${styles.bg_off_white}`} id="community-impact">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle}>Real Stories</span>
          <h2 className={styles.section_title}>Community Impact</h2>
          <p className={styles.section_description}>
            Hear from beekeepers who are part of our mission to create a more sustainable future for bees and humans alike.
          </p>
        </div>
        
        <div className={styles.testimonials_container}>
          <div className={styles.testimonial_slider}>
            {/* Testimonial Slides */}
            <div className={styles.testimonial_slide}>
              <div className={styles.testimonial_content}>
                <p className={styles.testimonial_quote}>
                  "HIVE's technology has transformed how I care for my bees. I've seen a remarkable improvement in colony health and honey production, all while reducing my reliance on chemical treatments. It's not just about better beekeeping—it's about being part of a movement that's making a real difference."
                </p>
                <div className={styles.testimonial_author}>
                  <img src="/api/placeholder/60/60" alt="Marco Rossi" className={styles.author_image} />
                  <div className={styles.author_info}>
                    <p className={styles.author_name}>Marco Rossi</p>
                    <p className={styles.author_title}>Professional Beekeeper, Italy</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonial_slide}>
              <div className={styles.testimonial_content}>
                <p className={styles.testimonial_quote}>
                  "As a first-time beekeeper, I was overwhelmed by the learning curve. HIVE has not only made the process manageable but enjoyable. The community support and data-driven insights have given me confidence that I'm doing right by my bees and the environment."
                </p>
                <div className={styles.testimonial_author}>
                  <img src="/api/placeholder/60/60" alt="Sarah Johnson" className={styles.author_image} />
                  <div className={styles.author_info}>
                    <p className={styles.author_name}>Sarah Johnson</p>
                    <p className={styles.author_title}>Hobbyist Beekeeper, United States</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.testimonial_slide}>
              <div className={styles.testimonial_content}>
                <p className={styles.testimonial_quote}>
                  "Our agricultural cooperative has been using HIVE's technology across all our apiaries for the past three years. The data collected has been invaluable for optimizing pollination services and ensuring our bees remain healthy throughout the growing season. This technology is the future of sustainable agriculture."
                </p>
                <div className={styles.testimonial_author}>
                  <img src="/api/placeholder/60/60" alt="Dr. Luisa Fernandez" className={styles.author_image} />
                  <div className={styles.author_info}>
                    <p className={styles.author_name}>Dr. Luisa Fernandez</p>
                    <p className={styles.author_title}>Agricultural Scientist, Spain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.testimonial_navigation}>
            <div className={styles.testimonial_dots}>
              <button className={`${styles.testimonial_dot} ${styles.active}`}></button>
              <button className={styles.testimonial_dot}></button>
              <button className={styles.testimonial_dot}></button>
            </div>
          </div>
        </div>
      </section>

      {/* Join Movement Section */}
      <section className={`${styles.section} ${styles.bg_white} ${styles.join_movement_section}`} id="join-movement">
        {/* Add Blob Container for this section */}
        <div className={styles.join_movement_blob_container}>
          <div 
            className={styles.blob} 
            style={{ width: '350px', height: '350px', top: '10%', left: '-100px', opacity: 0.15 }}
          ></div>
          <div 
            className={styles.blob} 
            style={{ width: '450px', height: '450px', bottom: '5%', right: '-150px', opacity: 0.15, background: 'linear-gradient(135deg, var(--leaf-green), var(--honey-yellow))' }}
          ></div>
        </div>

        <div className={styles.section_header}>
          <span className={styles.section_subtitle}>Take Action</span>
          <h2 className={styles.section_title} ref={joinTitleRef}>Join Our Movement</h2>
          <p className={styles.section_description} ref={joinDescriptionRef}>
            There are many ways to contribute to our mission of bee conservation and sustainable beekeeping. Find the path that's right for you.
          </p>
        </div>
        
        <div className={styles.join_options} ref={joinOptionsRef}>
          <div className={styles.join_option}>
            <div className={styles.option_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className={styles.option_title}>Become a HIVE Beekeeper</h3>
            <p className={styles.option_description}>
              Integrate our technology into your beekeeping practice and join thousands of beekeepers while contributing valuable data to our research efforts.
            </p>
            <a href="/products" className={styles.option_button}>Get Started</a>
          </div>
          
          <div className={styles.join_option}>
            <div className={styles.option_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className={styles.option_title}>Partner With Us</h3>
            <p className={styles.option_description}>
              Whether you're a research institution, environmental organization, or business that shares our values, we welcome collaborations that will expand our impact.
            </p>
            <a href="/partner" className={styles.option_button}>Contact Us</a>
          </div>
          
          <div className={styles.join_option}>
            <div className={styles.option_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3 className={styles.option_title}>Spread The Word</h3>
            <p className={styles.option_description}>
              Help raise awareness about the importance of bee conservation by sharing our mission with your network. Follow us on social media for sustainable beekeeping tips.
            </p>
            <a href="/social" className={styles.option_button}>Follow Us</a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.section} ${styles.cta_section}`}>
        <div className={styles.cta_content}>
          <h2 className={styles.cta_title} ref={ctaTitleRef}>Ready to Make a Difference?</h2>
          <p className={styles.cta_description} ref={ctaDescriptionRef}>
            Take the first step toward supporting bee conservation and sustainable agriculture by exploring how HIVE can transform your beekeeping practice.
          </p>
          <div className={styles.cta_buttons} ref={ctaButtonsRef}>
            <a href="/download" className={styles.cta_button_primary}>Download the App</a>
            <a href="/demo" className={styles.cta_button_secondary}>Request a Demo</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionPage;