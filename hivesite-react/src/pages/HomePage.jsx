import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/Home.module.css';

const HomePage = () => {
  // State for testimonials
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonialInterval = useRef(null);
  
  // Register ScrollTrigger plugin outside useEffect
  gsap.registerPlugin(ScrollTrigger);

  // Refs for elements to animate
  const heroTitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  const heroCTAGroupRef = useRef(null);
  const devicePreviewRef = useRef(null);
  const heroScrollRef = useRef(null);
  const canvasRef = useRef(null);
  const blobsRef = useRef([]);
  const heroBadgeRef = useRef(null);
  
  // Refs for sections
  const sectionRefs = {
    subtitles: useRef([]),
    titles: useRef([]),
    descriptions: useRef([]),
    featureCards: useRef([]),
    processSteps: useRef([]),
    metricCards: useRef([]),
    testimonialSlides: useRef([]),
    ctaTitle: useRef(null),
    ctaDescription: useRef(null),
    ctaButtons: useRef(null),
    appStores: useRef(null)
  };

  // Function to add elements to refs arrays
  const addToRef = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  // Testimonial slider functionality
  const showSlide = (index) => {
    // Clear any existing interval
    if (testimonialInterval.current) {
      clearInterval(testimonialInterval.current);
    }
    
    setCurrentSlide(index);
  };

  // Setup testimonial auto-rotation after initial render
  useEffect(() => {
    testimonialInterval.current = setInterval(() => {
      const nextSlide = (currentSlide + 1) % 3; // assuming 3 slides
      setCurrentSlide(nextSlide);
    }, 6000);

    return () => {
      if (testimonialInterval.current) {
        clearInterval(testimonialInterval.current);
      }
    };
  }, [currentSlide]);

  // Canvas for hexagon background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      drawHexagons();
    };
    
    const drawHexagons = () => {
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
    };
    
    const drawHexagon = (x, y, size, color) => {
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
    };

    // Initial draw
    resizeCanvas();
    
    // Redraw on resize
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    // Function to initialize animations - separated for clarity
    const initAnimations = () => {
      console.log('Initializing HomePage GSAP animations');
      
      // Kill any existing ScrollTrigger instances to prevent conflicts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Animate blobs with GSAP
      if (blobsRef.current && blobsRef.current.length) {
        blobsRef.current.forEach((blob, index) => {
          if (!blob) return;
          
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
      }

      // Hero section animations
      if (heroTitleRef.current) {
        gsap.to(heroTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3
        });
      }
      
      if (heroBadgeRef.current) {
        gsap.to(heroBadgeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.1
        });
      }
      
      if (heroDescriptionRef.current) {
        gsap.to(heroDescriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5
        });
      }
      
      if (heroCTAGroupRef.current) {
        gsap.to(heroCTAGroupRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.7
        });
      }
      
      if (devicePreviewRef.current) {
        gsap.to(devicePreviewRef.current, {
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.9
        });
      }
      
      // Use gsap utils to select and animate section elements
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
      
      // Feature cards animation
      if (sectionRefs.featureCards.current && sectionRefs.featureCards.current.length) {
        sectionRefs.featureCards.current.forEach((card, index) => {
          if (!card) return;
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
      }
      
      // Process steps animation
      if (sectionRefs.processSteps.current && sectionRefs.processSteps.current.length) {
        sectionRefs.processSteps.current.forEach((step, index) => {
          if (!step) return;
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
      }
      
      // Metrics animation with stagger
      if (sectionRefs.metricCards.current && sectionRefs.metricCards.current.length) {
        sectionRefs.metricCards.current.forEach((card, index) => {
          if (!card) return;
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
      
      if (sectionRefs.appStores.current) {
        gsap.to(sectionRefs.appStores.current, {
          scrollTrigger: {
            trigger: sectionRefs.appStores.current,
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.6
        });
      }
      
      // Parallax effect
      const parallaxElements = document.querySelectorAll(`.${styles.parallax_element}`);
      
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
      
      if (testimonialInterval.current) {
        clearInterval(testimonialInterval.current);
      }
    };
  }, []); // Empty dependency array to run once on mount

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
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
          <h1 className={styles.hero_title} ref={heroTitleRef} style={{ opacity: 0, transform: 'translateY(30px)' }}>Revolutionizing <span>Beekeeping</span> Through Innovation</h1>
          <p className={styles.hero_description} ref={heroDescriptionRef} style={{ opacity: 0, transform: 'translateY(30px)' }}>HIVE connects IoT technology with AI-driven insights to make beekeeping more accessible, efficient, and sustainable. Real-time monitoring, smart analytics, and actionable recommendations to ensure thriving colonies.</p>
          <div className={styles.hero_cta_group} ref={heroCTAGroupRef} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <a href="#" className="cta-button">Download the App</a>
            <a href="#" className={styles.hero_cta_secondary}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              Watch Demo
            </a>
          </div>
        </div>

        {/* 3D Device Preview */}
        <div className={styles.device_preview} ref={devicePreviewRef} style={{ opacity: 0 }}>
          <div className={styles.device_screen}>
            <div className={styles.device_header}>
              <div className={styles.device_status_bar}>
                <span>21:10</span>
                <div className={styles.device_status_icons}>
                  <span>•••</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
              </div>
              <div className={styles.device_title}>Hive Dashboard</div>
              <div className={styles.device_hive_selector}>
                <div className={styles.device_hive_name}>
                  <span>Hive Alpha</span>
                  <span className={styles.device_status_dot}></span>
                </div>
                <button className={styles.device_add_btn}>
                  <span>+</span>
                  Add Hive
                </button>
              </div>
            </div>
            
            <div className={styles.device_content}>
              <div className={styles.device_hive_status}>
                <span className={styles.device_status_indicator}></span>
                <span>Healthy</span>
              </div>
              
              <div className={styles.device_location}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Galway</span>
              </div>
              
              <div className={styles.device_update_time}>
                Last updated: Apr 15 at 9:10 PM
              </div>
              
              <div className={styles.device_metrics_grid}>
                <div className={styles.device_metric_card}>
                  <div className={styles.device_metric_icon} style={{ color: '#f44336' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1 7 7 0 10-14 0A7 7 0 0012 18a1 1 0 100 2 9 9 0 110-18 9 9 0 019 9 3 3 0 01-3 3h-7a3 3 0 01-3-3V5a3 3 0 013-3 1 1 0 100-2 5 5 0 00-5 5v7a5 5 0 005 5h7a5 5 0 005-5 11 11 0 00-11-11z"></path>
                    </svg>
                  </div>
                  <div className={styles.device_metric_value}>32°C</div>
                  <div className={styles.device_metric_label}>Temperature</div>
                </div>
                
                <div className={styles.device_metric_card}>
                  <div className={styles.device_metric_icon} style={{ color: '#2196f3' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path>
                    </svg>
                  </div>
                  <div className={styles.device_metric_value}>45%</div>
                  <div className={styles.device_metric_label}>Humidity</div>
                </div>
                
                <div className={styles.device_metric_card}>
                  <div className={styles.device_metric_icon} style={{ color: '#ff9800' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"></path>
                    </svg>
                  </div>
                  <div className={styles.device_metric_value}>2</div>
                  <div className={styles.device_metric_label}>Varroa Index</div>
                </div>
                
                <div className={styles.device_metric_card}>
                  <div className={styles.device_metric_icon} style={{ color: '#4caf50' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2c-5.33 4-8 8-8 12 0 4.42 3.58 8 8 8s8-3.58 8-8c0-4-2.67-8-8-12zm0 20c-4.41 0-8-3.59-8-8 0-3.45 2.32-6.97 8-11.35 5.68 4.38 8 7.9 8 11.35 0 4.41-3.59 8-8 8z"></path>
                      <path d="M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                    </svg>
                  </div>
                  <div className={styles.device_metric_value}>15 kg</div>
                  <div className={styles.device_metric_label}>Weight</div>
                </div>
              </div>
              
              <div className={styles.device_actions}>
                <div className={styles.device_action_button}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                  Details
                </div>
                <div className={styles.device_action_button}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                  </svg>
                  Edit
                </div>
                <div className={styles.device_action_button}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v4M12 16h.01"></path>
                  </svg>
                  Insights
                </div>
              </div>
              
              <div className={styles.device_trends}>
                <h4>Sensor Trends</h4>
                <div className={styles.device_trend_category}>Temperature (°C)</div>
                <div className={styles.device_chart}>
                  <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="tempGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f44336" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#f44336" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path className={styles.chart_line_path} style={{ stroke: '#f44336' }} d="M0,70 C20,55 40,80 60,75 C80,70 100,40 120,15 C140,30 160,50 180,40 C200,30 220,50 240,75 C260,70 280,75 300,70"></path>
                    <path className={styles.chart_line_area} style={{ fill: 'url(#tempGradient)' }} d="M0,70 C20,55 40,80 60,75 C80,70 100,40 120,15 C140,30 160,50 180,40 C200,30 220,50 240,75 C260,70 280,75 300,70 L300,100 L0,100 Z"></path>
                    
                    <circle cx="0" cy="70" r="3" fill="#f44336" />
                    <circle cx="60" cy="75" r="3" fill="#f44336" />
                    <circle cx="120" cy="15" r="3" fill="#f44336" />
                    <circle cx="180" cy="40" r="3" fill="#f44336" />
                    <circle cx="240" cy="75" r="3" fill="#f44336" />
                    <circle cx="300" cy="70" r="3" fill="#f44336" />
                  </svg>
                  
                  <div className={styles.device_chart_labels}>
                    <div>30.6</div>
                    <div>31.5</div>
                    <div>32.3</div>
                    <div>33.2</div>
                    <div>34.0</div>
                  </div>
                </div>
              </div>
              
              <div className={styles.device_nav}>
                <div className={styles.device_nav_item}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFC107" stroke="#FFC107" strokeWidth="1">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Dashboard</span>
                </div>
                <div className={styles.device_nav_item}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12" y2="16"></line>
                  </svg>
                  <span>Insights</span>
                </div>
                <div className={styles.device_nav_item}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <span>Notifications</span>
                </div>
                <div className={styles.device_nav_item}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <span>Settings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.hero_scroll} ref={heroScrollRef} style={{ opacity: 0 }}>
          <span className={styles.scroll_text}>Scroll Down</span>
          <div className={styles.scroll_icon}>
            <div className={styles.scroll_dot}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features} id="features">
        <canvas className={styles.hexagon_canvas} ref={canvasRef}></canvas>
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Smart Beekeeping</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>The Future of Hive Management</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Our cutting-edge IoT technology and AI algorithms work together to provide unprecedented insights into your beehive's health and productivity.</p>
        </div>
        <div className={styles.features_grid}>
          <div className={styles.feature_card} ref={el => addToRef(el, sectionRefs.featureCards)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
              </svg>
            </div>
            <h3 className={styles.feature_title}>Real-time Monitoring</h3>
            <p className={styles.feature_description}>Track crucial hive metrics like temperature, humidity, bee activity, and varroa mite presence with our advanced sensors.</p>
          </div>
          <div className={styles.feature_card} ref={el => addToRef(el, sectionRefs.featureCards)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <h3 className={styles.feature_title}>AI-Powered Insights</h3>
            <p className={styles.feature_description}>Our smart algorithms analyze data patterns to predict issues before they become problems and suggest optimal interventions.</p>
          </div>
          <div className={styles.feature_card} ref={el => addToRef(el, sectionRefs.featureCards)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
            <h3 className={styles.feature_title}>Colony Protection</h3>
            <p className={styles.feature_description}>Early detection of threats like disease, pests, or unfavorable conditions helps protect your colonies and improve survival rates.</p>
          </div>
          <div className={styles.feature_card} ref={el => addToRef(el, sectionRefs.featureCards)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
            <h3 className={styles.feature_title}>Smart Reporting</h3>
            <p className={styles.feature_description}>Generate detailed reports about your hive's performance, health trends, and productivity to make informed management decisions.</p>
          </div>
          <div className={styles.feature_card} ref={el => addToRef(el, sectionRefs.featureCards)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
              </svg>
            </div>
            <h3 className={styles.feature_title}>Community Insights</h3>
            <p className={styles.feature_description}>Connect with other beekeepers to share data, strategies, and advice. Leverage collective knowledge to improve your beekeeping practices.</p>
          </div>
          <div className={styles.feature_card} ref={el => addToRef(el, sectionRefs.featureCards)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
              </svg>
            </div>
            <h3 className={styles.feature_title}>Smart Alerts</h3>
            <p className={styles.feature_description}>Receive instant notifications about urgent issues requiring immediate attention, ensuring you never miss critical changes in hive conditions.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.how_it_works} id="how-it-works">
        <div className={styles.parallax_container}>
          <div className={styles.parallax_element} style={{ width: '300px', height: '300px', top: '10%', left: '5%' }}></div>
          <div className={styles.parallax_element} style={{ width: '200px', height: '200px', top: '60%', left: '80%' }}></div>
          <div className={styles.parallax_element} style={{ width: '150px', height: '150px', top: '30%', left: '90%' }}></div>
        </div>
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Simple & Effective</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>How HIVE Works</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Our innovative system makes advanced beekeeping technology accessible to everyone from hobbyists to commercial apiaries.</p>
        </div>
        <div className={styles.process_steps}>
          <div className={styles.process_step} ref={el => addToRef(el, sectionRefs.processSteps)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.process_number}>1</div>
            <div className={styles.process_content}>
              <h3 className={styles.process_title}>Install IoT Sensors</h3>
              <p className={styles.process_description}>Our modular sensors seamlessly integrate with any hive type. Simply place them in strategic locations to collect comprehensive data about your colony's environment and activity.</p>
            </div>
            <div className={styles.process_image}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z" />
              </svg>
            </div>
          </div>
          <div className={styles.process_step} ref={el => addToRef(el, sectionRefs.processSteps)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.process_number}>2</div>
            <div className={styles.process_content}>
              <h3 className={styles.process_title}>Connect to the HIVE App</h3>
              <p className={styles.process_description}>Download our intuitive app and pair it with your sensors. The setup wizard guides you through the process in minutes, with no technical expertise required.</p>
            </div>
            <div className={styles.process_image}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
              </svg>
            </div>
          </div>
          <div className={styles.process_step} ref={el => addToRef(el, sectionRefs.processSteps)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.process_number}>3</div>
            <div className={styles.process_content}>
              <h3 className={styles.process_title}>Analyze Real-Time Data</h3>
              <p className={styles.process_description}>Our AI algorithms continuously monitor and analyze data from your hives, identifying patterns and potential issues before they become serious problems.</p>
            </div>
            <div className={styles.process_image}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
            </div>
          </div>
          <div className={styles.process_step} ref={el => addToRef(el, sectionRefs.processSteps)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.process_number}>4</div>
            <div className={styles.process_content}>
              <h3 className={styles.process_title}>Receive Smart Recommendations</h3>
              <p className={styles.process_description}>Get personalized, actionable insights based on your specific hive conditions. Our recommendations help you make informed decisions to optimize colony health and productivity.</p>
            </div>
            <div className={styles.process_image}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className={styles.metrics} id="metrics">
        <div className={styles.blob_container}>
          <div className={styles.blob} style={{ width: '400px', height: '400px', top: '-100px', left: '-100px' }} ref={el => addToRef(el, blobsRef)}></div>
          <div className={styles.blob} style={{ width: '500px', height: '500px', top: '30%', right: '-150px' }} ref={el => addToRef(el, blobsRef)}></div>
          <div className={styles.blob} style={{ width: '300px', height: '300px', bottom: '-50px', left: '40%' }} ref={el => addToRef(el, blobsRef)}></div>
        </div>
        <div className={styles.section_header}>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Proven Results</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>HIVE technology has already made a significant impact on beekeeping worldwide. Here's what our system has achieved:</p>
        </div>
        <div className={styles.metrics_grid}>
          <div className={styles.metric_card} ref={el => addToRef(el, sectionRefs.metricCards)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.metric_value}>32%</div>
            <div className={styles.metric_label}>Increase in Honey Production</div>
          </div>
          <div className={styles.metric_card} ref={el => addToRef(el, sectionRefs.metricCards)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.metric_value}>45%</div>
            <div className={styles.metric_label}>Reduction in Colony Losses</div>
          </div>
          <div className={styles.metric_card} ref={el => addToRef(el, sectionRefs.metricCards)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.metric_value}>10,000+</div>
            <div className={styles.metric_label}>Active Hives Monitored</div>
          </div>
          <div className={styles.metric_card} ref={el => addToRef(el, sectionRefs.metricCards)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.metric_value}>87%</div>
            <div className={styles.metric_label}>Early Problem Detection</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials} id="testimonials">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Trusted by Beekeepers</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>What Our Users Say</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Hear from beekeepers who have transformed their apiaries with HIVE technology.</p>
        </div>
        <div className={styles.testimonials_container}>
          <div className={styles.testimonial_slider}>
            <div 
              className={styles.testimonial_slide} 
              style={{ 
                display: currentSlide === 0 ? 'block' : 'none',
                opacity: currentSlide === 0 ? 1 : 0,
                transform: `translateX(${currentSlide === 0 ? 0 : '100%'})`
              }}
            >
              <div className={styles.testimonial_card}>
                <div className={styles.testimonial_content}>
                  HIVE has completely transformed my beekeeping operation. The real-time monitoring has allowed me to detect and address issues before they become serious, and my honey yields have increased by over 40% in just one season.
                </div>
                <div className={styles.testimonial_author}>
                  <div className={styles.testimonial_avatar}>JM</div>
                  <div className={styles.testimonial_info}>
                    <div className={styles.testimonial_name}>John Markson</div>
                    <div className={styles.testimonial_role}>Commercial Beekeeper, Oregon</div>
                  </div>
                </div>
              </div>
            </div>
            <div 
              className={styles.testimonial_slide} 
              style={{ 
                display: currentSlide === 1 ? 'block' : 'none',
                opacity: currentSlide === 1 ? 1 : 0,
                transform: `translateX(${currentSlide === 1 ? 0 : '100%'})`
              }}
            >
              <div className={styles.testimonial_card}>
                <div className={styles.testimonial_content}>
                  As a hobby beekeeper, I was always worried about missing important changes in my hives. With HIVE, I get alerts directly to my phone and clear guidance on what actions to take. It's like having an expert beekeeper by my side 24/7.
                </div>
                <div className={styles.testimonial_author}>
                  <div className={styles.testimonial_avatar}>SL</div>
                  <div className={styles.testimonial_info}>
                    <div className={styles.testimonial_name}>Sarah Linden</div>
                    <div className={styles.testimonial_role}>Hobby Beekeeper, Vermont</div>
                  </div>
                </div>
              </div>
            </div>
            <div 
              className={styles.testimonial_slide} 
              style={{ 
                display: currentSlide === 2 ? 'block' : 'none',
                opacity: currentSlide === 2 ? 1 : 0,
                transform: `translateX(${currentSlide === 2 ? 0 : '100%'})`
              }}
            >
              <div className={styles.testimonial_card}>
                <div className={styles.testimonial_content}>
                  The insights provided by HIVE are invaluable. We've been able to optimize our beekeeping practices based on data rather than guesswork, resulting in healthier colonies and more sustainable operations.
                </div>
                <div className={styles.testimonial_author}>
                  <div className={styles.testimonial_avatar}>RM</div>
                  <div className={styles.testimonial_info}>
                    <div className={styles.testimonial_name}>Robert Martinez</div>
                    <div className={styles.testimonial_role}>Apiary Manager, California</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.testimonial_nav}>
            <div 
              className={`${styles.testimonial_dot} ${currentSlide === 0 ? styles.active : ''}`} 
              onClick={() => showSlide(0)}
            ></div>
            <div 
              className={`${styles.testimonial_dot} ${currentSlide === 1 ? styles.active : ''}`} 
              onClick={() => showSlide(1)}
            ></div>
            <div 
              className={`${styles.testimonial_dot} ${currentSlide === 2 ? styles.active : ''}`} 
              onClick={() => showSlide(2)}
            ></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta_section} id="cta">
        <div className={styles.parallax_container}>
          <div className={styles.parallax_element} style={{ width: '350px', height: '350px', top: '30%', left: '20%' }}></div>
          <div className={styles.parallax_element} style={{ width: '250px', height: '250px', top: '60%', left: '70%' }}></div>
        </div>
        <div className={styles.cta_content}>
          <h2 className={styles.cta_title} ref={sectionRefs.ctaTitle} style={{ opacity: 0, transform: 'translateY(30px)' }}>Ready to Transform Your Beekeeping?</h2>
          <p className={styles.cta_description} ref={sectionRefs.ctaDescription} style={{ opacity: 0, transform: 'translateY(30px)' }}>Join thousands of beekeepers who are using HIVE technology to create healthier, more productive colonies while contributing to global bee conservation efforts.</p>
          <div className={styles.cta_buttons} ref={sectionRefs.ctaButtons} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <a href="#" className="cta-button">Get Started Today</a>
            <a href="#" className={styles.hero_cta_secondary}>Contact Sales</a>
          </div>
          <div className={styles.app_stores} ref={sectionRefs.appStores} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <a href="#" className={styles.app_store_button}>
              <div className={styles.app_store_icon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.17-.29 2.28-.95 3.53-.84 1.5.17 2.63.64 3.38 1.64-2.36 1.62-1.35 5.2.93 6.18-1.05 2.47-2.49 4.37-4.12 6.1zm-3.44-17.5c.05 1.87-1.37 3.4-3.1 3.58-.03-1.95 1.41-3.47 3.1-3.58z"/>
                </svg>
              </div>
              <div className={styles.app_store_text}>
                <small>Download on the</small>
                <span>App Store</span>
              </div>
            </a>
            <a href="#" className={styles.app_store_button}>
              <div className={styles.app_store_icon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M3.18 23L20.6 12 3.18 1l.01 22zM6.97 4.7l9.44 7.3-9.44 7.3V4.7z"/>
                </svg>
              </div>
              <div className={styles.app_store_text}>
                <small>Get it on</small>
                <span>Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;