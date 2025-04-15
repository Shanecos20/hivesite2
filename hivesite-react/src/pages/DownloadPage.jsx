import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/Download.module.css';

const DownloadPage = () => {
  // State for platform toggle
  const [activePlatform, setActivePlatform] = useState('ios');
  
  // State for FAQ items
  const [activeFaqItem, setActiveFaqItem] = useState(0);

  // Register ScrollTrigger plugin outside useEffect
  gsap.registerPlugin(ScrollTrigger);
  
  // Refs for elements to animate
  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  const downloadOptionsRef = useRef(null);
  const blobsRef = useRef([]);
  
  // Refs for sections
  const sectionRefs = {
    subtitles: useRef([]),
    titles: useRef([]),
    descriptions: useRef([]),
    showcaseItems: useRef([]),
    featureBoxes: useRef([]),
    faqItems: useRef([]),
    ctaTitle: useRef(null),
    ctaDescription: useRef(null),
    ctaButtons: useRef(null)
  };

  // Function to add elements to refs arrays
  const addToRef = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  // Handle platform button click
  const handlePlatformClick = (platform) => {
    setActivePlatform(platform);
  };

  // Handle FAQ item click
  const toggleFaqItem = (index) => {
    setActiveFaqItem(index === activeFaqItem ? null : index);
  };

  // GSAP animations
  useEffect(() => {
    // Function to initialize animations - separated for clarity
    const initAnimations = () => {
      console.log('Initializing DownloadPage GSAP animations');
      
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
      
      if (downloadOptionsRef.current) {
        gsap.to(downloadOptionsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.9
        });
      }

      // Scroll animations
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
      
      // App showcase animations
      if (sectionRefs.showcaseItems.current && sectionRefs.showcaseItems.current.length) {
        sectionRefs.showcaseItems.current.forEach((item, index) => {
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
      
      // Features animations
      if (sectionRefs.featureBoxes.current && sectionRefs.featureBoxes.current.length) {
        sectionRefs.featureBoxes.current.forEach((box, index) => {
          if (!box) return;
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
      }
      
      // FAQ animations
      if (sectionRefs.faqItems.current && sectionRefs.faqItems.current.length) {
        sectionRefs.faqItems.current.forEach((item, index) => {
          if (!item) return;
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

  // FAQ data
  const faqData = [
    {
      question: "Do I need special hardware to use the HIVE app?",
      answer: "Yes, the full functionality of the HIVE app requires our IoT sensors that are installed in your beehives. These sensors collect real-time data on temperature, humidity, weight, bee activity, and more. However, you can still use the app without sensors for manual record-keeping and accessing the beekeeping community."
    },
    {
      question: "Is the app compatible with all beehive types?",
      answer: "The HIVE system is designed to work with most standard beehive types, including Langstroth, Warre, Top Bar, and Flow hives. Our modular sensors can be adapted to fit any conventional hive structure, making them versatile for various beekeeping setups."
    },
    {
      question: "How often does the app update with new data?",
      answer: "The HIVE sensors collect data continuously and transmit updates to the app every 15 minutes under normal conditions. During critical events or when values exceed set thresholds, the system switches to real-time updates to ensure you're immediately notified of any urgent issues requiring attention."
    },
    {
      question: "What kind of battery life can I expect from the sensors?",
      answer: "Our sensors are equipped with high-efficiency batteries and solar-charging capabilities. Under typical usage, the batteries last 6-8 months on a single charge. With adequate sunlight exposure for the solar panel, the system can operate indefinitely without manual recharging in most climates."
    },
    {
      question: "Can multiple people access the same hive data?",
      answer: "Yes, HIVE supports team management features. The primary account holder can invite family members, employees, or collaborators to access specific hives or entire apiaries with customizable permission levels. This makes it perfect for commercial operations, educational settings, or shared beekeeping projects."
    }
  ];

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
          <h1 className={styles.hero_title} ref={heroTitleRef} style={{ opacity: 0, transform: 'translateY(30px)' }}>Transform Your Beekeeping with <span>HIVE</span></h1>
          <p className={styles.hero_description} ref={heroDescriptionRef} style={{ opacity: 0, transform: 'translateY(30px)' }}>Download our revolutionary app that connects with IoT-enabled hives to provide real-time monitoring, AI-powered insights, and actionable recommendations for healthier, more productive colonies.</p>
          
          <div className={styles.download_options} ref={downloadOptionsRef} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.platforms}>
              <div 
                className={`${styles.platform_button} ${activePlatform === 'ios' ? styles.active : ''}`} 
                onClick={() => handlePlatformClick('ios')}
              >
                <svg className={styles.platform_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.17-.29 2.28-.95 3.53-.84 1.5.17 2.63.64 3.38 1.64-2.36 1.62-1.35 5.2.93 6.18-1.05 2.47-2.49 4.37-4.12 6.1zm-3.44-17.5c.05 1.87-1.37 3.4-3.1 3.58-.03-1.95 1.41-3.47 3.1-3.58z"/>
                </svg>
                <span className={styles.platform_text}>iOS</span>
              </div>
              <div 
                className={`${styles.platform_button} ${activePlatform === 'android' ? styles.active : ''}`} 
                onClick={() => handlePlatformClick('android')}
              >
                <svg className={styles.platform_icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                  <path d="M3.18 23L20.6 12 3.18 1l.01 22zM6.97 4.7l9.44 7.3-9.44 7.3V4.7z"/>
                </svg>
                <span className={styles.platform_text}>Android</span>
              </div>
            </div>
            
            <div className={styles.qr_container} style={{ display: activePlatform === 'ios' ? 'flex' : 'none' }}>
              <div className={styles.qr_code}>
                <img src="/api/placeholder/150/150" alt="QR Code for iOS app" />
              </div>
              <div className={styles.qr_content}>
                <h3 className={styles.qr_title}>Download HIVE for iOS</h3>
                <p className={styles.qr_step_text}>Get our powerful beekeeping companion app for your iPhone or iPad.</p>
                
                <div className={styles.qr_steps}>
                  <div className={styles.qr_step}>
                    <div className={styles.qr_step_number}>1</div>
                    <p className={styles.qr_step_text}>Open your iPhone camera app</p>
                  </div>
                  <div className={styles.qr_step}>
                    <div className={styles.qr_step_number}>2</div>
                    <p className={styles.qr_step_text}>Point it at the QR code</p>
                  </div>
                  <div className={styles.qr_step}>
                    <div className={styles.qr_step_number}>3</div>
                    <p className={styles.qr_step_text}>Tap the notification to open the App Store</p>
                  </div>
                </div>
                
                <div className={styles.app_stores}>
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
                </div>
              </div>
            </div>
            
            <div className={styles.qr_container} style={{ display: activePlatform === 'android' ? 'flex' : 'none' }}>
              <div className={styles.qr_code}>
                <img src="/api/placeholder/150/150" alt="QR Code for Android app" />
              </div>
              <div className={styles.qr_content}>
                <h3 className={styles.qr_title}>Download HIVE for Android</h3>
                <p className={styles.qr_step_text}>Get our powerful beekeeping companion app for your Android device.</p>
                
                <div className={styles.qr_steps}>
                  <div className={styles.qr_step}>
                    <div className={styles.qr_step_number}>1</div>
                    <p className={styles.qr_step_text}>Open your Android camera app or QR scanner</p>
                  </div>
                  <div className={styles.qr_step}>
                    <div className={styles.qr_step_number}>2</div>
                    <p className={styles.qr_step_text}>Scan the QR code</p>
                  </div>
                  <div className={styles.qr_step}>
                    <div className={styles.qr_step_number}>3</div>
                    <p className={styles.qr_step_text}>Follow the link to Google Play Store</p>
                  </div>
                </div>
                
                <div className={styles.app_stores}>
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
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className={styles.app_showcase} id="app-showcase">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>App Highlights</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Powerful Features at Your Fingertips</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Our intuitive interface provides easy access to all the tools you need to revolutionize your beekeeping practice.</p>
        </div>
        
        <div className={styles.showcase_container}>
          <div className={styles.showcase_item} ref={el => addToRef(el, sectionRefs.showcaseItems)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.showcase_image}>
              <img src="/api/placeholder/300/550" alt="HIVE app dashboard" />
              <div className={styles.phone_frame}></div>
            </div>
            <h3 className={styles.showcase_title}>Smart Dashboard</h3>
            <p className={styles.showcase_description}>Get a comprehensive overview of all your hives with real-time metrics and alerts.</p>
          </div>
          
          <div className={styles.showcase_item} ref={el => addToRef(el, sectionRefs.showcaseItems)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.showcase_image}>
              <img src="/api/placeholder/300/550" alt="HIVE app analytics" />
              <div className={styles.phone_frame}></div>
            </div>
            <h3 className={styles.showcase_title}>Detailed Analytics</h3>
            <p className={styles.showcase_description}>Track trends and patterns with in-depth data visualization and analysis tools.</p>
          </div>
          
          <div className={styles.showcase_item} ref={el => addToRef(el, sectionRefs.showcaseItems)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.showcase_image}>
              <img src="/api/placeholder/300/550" alt="HIVE app recommendations" />
              <div className={styles.phone_frame}></div>
            </div>
            <h3 className={styles.showcase_title}>Smart Recommendations</h3>
            <p className={styles.showcase_description}>Receive AI-powered suggestions tailored to your specific hive conditions.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.download_features} id="features">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>App Advantages</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Why Beekeepers Love HIVE</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Our innovative mobile application is designed with both novice and experienced beekeepers in mind.</p>
        </div>
        
        <div className={styles.features_row}>
          <div className={styles.feature_box} ref={el => addToRef(el, sectionRefs.featureBoxes)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3 className={styles.feature_title}>User-Friendly Interface</h3>
            <p className={styles.feature_description}>Intuitive design makes it easy to navigate through complex data and features without any technical expertise required.</p>
          </div>
          
          <div className={styles.feature_box} ref={el => addToRef(el, sectionRefs.featureBoxes)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className={styles.feature_title}>Secure Data Storage</h3>
            <p className={styles.feature_description}>End-to-end encryption ensures your apiary data remains private and secure while syncing across all your devices.</p>
          </div>
          
          <div className={styles.feature_box} ref={el => addToRef(el, sectionRefs.featureBoxes)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h3 className={styles.feature_title}>Offline Functionality</h3>
            <p className={styles.feature_description}>Continue monitoring and entering data even without internet access – perfect for remote apiaries with limited connectivity.</p>
          </div>
        </div>
        
        <div className={styles.features_row} style={{ marginTop: '2rem' }}>
          <div className={styles.feature_box} ref={el => addToRef(el, sectionRefs.featureBoxes)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className={styles.feature_title}>Customizable Alerts</h3>
            <p className={styles.feature_description}>Set personalized notification thresholds for temperature, humidity, and other critical metrics based on your specific needs.</p>
          </div>
          
          <div className={styles.feature_box} ref={el => addToRef(el, sectionRefs.featureBoxes)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className={styles.feature_title}>Community Access</h3>
            <p className={styles.feature_description}>Connect with fellow beekeepers, share insights, and leverage collective knowledge to improve your beekeeping practices.</p>
          </div>
          
          <div className={styles.feature_box} ref={el => addToRef(el, sectionRefs.featureBoxes)} style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <div className={styles.feature_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <h3 className={styles.feature_title}>Expert Support</h3>
            <p className={styles.feature_description}>Access to beekeeping specialists and technical support whenever you need assistance with the app or your hives.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq_section} id="faq">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle} ref={el => addToRef(el, sectionRefs.subtitles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Questions & Answers</span>
          <h2 className={styles.section_title} ref={el => addToRef(el, sectionRefs.titles)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Frequently Asked Questions</h2>
          <p className={styles.section_description} ref={el => addToRef(el, sectionRefs.descriptions)} style={{ opacity: 0, transform: 'translateY(20px)' }}>Everything you need to know about the HIVE app and how it can transform your beekeeping experience.</p>
        </div>
        
        <div className={styles.faq_container}>
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faq_item} ${activeFaqItem === index ? styles.active : ''}`} 
              ref={el => addToRef(el, sectionRefs.faqItems)} 
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <div className={styles.faq_question} onClick={() => toggleFaqItem(index)}>
                <div className={styles.question_text}>{faq.question}</div>
                <div className={styles.question_icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              <div className={styles.faq_answer}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta_section} id="cta">
        <div className={styles.cta_container}>
          <h2 className={styles.cta_title} ref={sectionRefs.ctaTitle} style={{ opacity: 0, transform: 'translateY(20px)' }}>Ready to Transform Your Beekeeping?</h2>
          <p className={styles.cta_description} ref={sectionRefs.ctaDescription} style={{ opacity: 0, transform: 'translateY(20px)' }}>Join thousands of beekeepers who are already using HIVE to create healthier, more productive colonies while contributing to global bee conservation efforts.</p>
          
          <div className={styles.cta_buttons} ref={sectionRefs.ctaButtons} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <a href="#" className="cta-button">Download Now</a>
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

export default DownloadPage;