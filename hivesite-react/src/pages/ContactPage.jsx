import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/Contact.module.css';

const ContactPage = () => {
  // Add loading state
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Refs for GSAP animations
  const blobsRef = useRef([]);
  const heroRef = useRef(null);
  
  useEffect(() => {
    // First mark component as loaded
    setIsLoaded(true);
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Use a short timeout to ensure DOM is fully rendered
    const initTimeout = setTimeout(() => {
      // Clear any existing ScrollTriggers to prevent conflicts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Animate gradient blobs
      const blobs = blobsRef.current;
      
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

      // FAQ Toggle functionality
      const faqQuestions = document.querySelectorAll(`.${styles.faq_question}`);
      
      faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
          const faqItem = question.parentElement;
          faqItem.classList.toggle(styles.active);
        });
      });

      // GSAP animations for content
      // Hero section animations
      const heroBadge = document.querySelector(`.${styles.hero_badge}`);
      if (heroBadge) {
        gsap.to(heroBadge, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3
        });
      }
      
      const heroTitle = document.querySelector(`.${styles.hero_title}`);
      if (heroTitle) {
        gsap.to(heroTitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5
        });
      }
      
      const heroDescription = document.querySelector(`.${styles.hero_description}`);
      if (heroDescription) {
        gsap.to(heroDescription, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.7
        });
      }
      
      // Scroll animations
      const sectionSubtitles = document.querySelectorAll(`.${styles.section_subtitle}`);
      sectionSubtitles.forEach(element => {
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
      
      const sectionTitles = document.querySelectorAll(`.${styles.section_title}`);
      sectionTitles.forEach(element => {
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
      
      const sectionDescriptions = document.querySelectorAll(`.${styles.section_description}`);
      sectionDescriptions.forEach(element => {
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
      const contactCards = document.querySelectorAll(`.${styles.contact_card}`);
      contactCards.forEach((card, index) => {
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
      const contactFormContainer = document.querySelector(`.${styles.contact_form_container}`);
      if (contactFormContainer) {
        gsap.to(contactFormContainer, {
          scrollTrigger: {
            trigger: contactFormContainer,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      
      const socialContainer = document.querySelector(`.${styles.social_container}`);
      if (socialContainer) {
        gsap.to(socialContainer, {
          scrollTrigger: {
            trigger: socialContainer,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3
        });
      }
      
      // Support hours animation
      const supportHours = document.querySelector(`.${styles.support_hours}`);
      if (supportHours) {
        gsap.to(supportHours, {
          scrollTrigger: {
            trigger: supportHours,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      
      // FAQ section animation
      const faqSection = document.querySelector(`.${styles.faq_section}`);
      if (faqSection) {
        gsap.to(faqSection, {
          scrollTrigger: {
            trigger: faqSection,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }

      // Form input focus effect
      const formInputs = document.querySelectorAll(`.${styles.form_input}, .${styles.form_select}, .${styles.form_textarea}`);
      
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
      
    }, 100); // Small delay to ensure DOM is ready
    
    // Cleanup event listeners
    return () => {
      clearTimeout(initTimeout);
      
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clean up event listeners
      const faqQuestions = document.querySelectorAll(`.${styles.faq_question}`);
      faqQuestions.forEach(question => {
        question.removeEventListener('click', () => {});
      });
      
      const formInputs = document.querySelectorAll(`.${styles.form_input}, .${styles.form_select}, .${styles.form_textarea}`);
      formInputs.forEach(input => {
        input.removeEventListener('focus', () => {});
        input.removeEventListener('blur', () => {});
      });
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

  // Function to add blobs to the ref
  const addBlobRef = (element) => {
    if (element && !blobsRef.current.includes(element)) {
      blobsRef.current.push(element);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.hero_bg}>
          <div className={styles.honeycomb_grid}></div>
          <div className={styles.blob_container}>
            <div 
              ref={addBlobRef}
              className={styles.blob} 
              style={{ width: '400px', height: '400px', top: '-100px', left: '-100px' }}
            ></div>
            <div 
              ref={addBlobRef}
              className={styles.blob} 
              style={{ width: '500px', height: '500px', top: '30%', right: '-150px' }}
            ></div>
            <div 
              ref={addBlobRef}
              className={styles.blob} 
              style={{ width: '300px', height: '300px', bottom: '-50px', left: '40%' }}
            ></div>
          </div>
        </div>
        <div className={styles.hero_content}>
          <div className={styles.hero_badge}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span style={{ marginLeft: '8px' }}>EU Green Award Winner</span>
          </div>
          <h1 className={styles.hero_title}>We're Here To <span>Help</span></h1>
          <p className={styles.hero_description}>
            Whether you have questions about our technology, need technical support, or want to explore partnership opportunities, our team is ready to assist you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className={`${styles.section} ${styles.bg_white}`} id="contact-methods">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle}>Get In Touch</span>
          <h2 className={styles.section_title}>Contact Methods</h2>
          <p className={styles.section_description}>Choose the most convenient way to reach our dedicated support team.</p>
        </div>
        
        <div className={styles.contact_methods}>
          <div className={styles.contact_card}>
            <div className={styles.contact_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h3 className={styles.contact_title}>Email Support</h3>
            <p className={styles.contact_info}>For general inquiries and non-urgent technical support, email us and we'll respond within 24 hours.</p>
            <a href="mailto:support@hiveproject.com" className={styles.contact_link}>support@hiveproject.com</a>
          </div>
          
          <div className={styles.contact_card}>
            <div className={styles.contact_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 className={styles.contact_title}>Phone Support</h3>
            <p className={styles.contact_info}>For urgent technical issues, our dedicated support line is available during business hours.</p>
            <a href="tel:+18005551234" className={styles.contact_link}>+1 (800) 555-1234</a>
          </div>
          
          <div className={styles.contact_card}>
            <div className={styles.contact_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <h3 className={styles.contact_title}>Live Chat</h3>
            <p className={styles.contact_info}>For quick questions and real-time assistance, connect with our support team through live chat.</p>
            <a href="#" className={styles.contact_link}>Start a chat</a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={`${styles.section} ${styles.bg_off_white}`} id="contact-form">
        <div className={styles.section_header}>
          <span className={styles.section_subtitle}>Send A Message</span>
          <h2 className={styles.section_title}>Contact Form</h2>
          <p className={styles.section_description}>Have a specific question or inquiry? Fill out the form below and we'll get back to you as soon as possible.</p>
        </div>
        
        <div className={styles.contact_container}>
          <div className={styles.contact_form_container}>
            <h3 className={styles.form_title}>Get in Touch</h3>
            <form className={styles.contact_form}>
              <div className={styles.form_group}>
                <label htmlFor="name" className={styles.form_label}>Name</label>
                <input type="text" id="name" name="name" className={styles.form_input} placeholder="Your full name" required />
              </div>
              
              <div className={styles.form_group}>
                <label htmlFor="email" className={styles.form_label}>Email</label>
                <input type="email" id="email" name="email" className={styles.form_input} placeholder="Your email address" required />
              </div>
              
              <div className={styles.form_group}>
                <label htmlFor="subject" className={styles.form_label}>Subject</label>
                <select id="subject" name="subject" className={styles.form_select} required>
                  <option value="" disabled selected>Select a topic</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="account-help">Account Help</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className={styles.form_group}>
                <label htmlFor="message" className={styles.form_label}>Message</label>
                <textarea id="message" name="message" className={styles.form_textarea} placeholder="How can we help you?" required></textarea>
              </div>
              
              <button type="submit" className={styles.form_submit}>Send Message</button>
            </form>
          </div>
          
          <div className={styles.social_container}>
            <div className={styles.social_content}>
              <h3 className={styles.social_title}>Connect With Us</h3>
              <p className={styles.social_description}>Follow us on social media for the latest updates, beekeeping tips, and community stories.</p>
              
              <div className={styles.social_grid}>
                <div className={styles.social_card}>
                  <div className={styles.social_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </div>
                  <div className={styles.social_name}>Twitter</div>
                  <div className={styles.social_handle}>@HIVEproject</div>
                </div>
                
                <div className={styles.social_card}>
                  <div className={styles.social_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                    </svg>
                  </div>
                  <div className={styles.social_name}>Facebook</div>
                  <div className={styles.social_handle}>/HIVEproject</div>
                </div>
                
                <div className={styles.social_card}>
                  <div className={styles.social_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                    </svg>
                  </div>
                  <div className={styles.social_name}>Instagram</div>
                  <div className={styles.social_handle}>@hive_project</div>
                </div>
                
                <div className={styles.social_card}>
                  <div className={styles.social_icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </div>
                  <div className={styles.social_name}>LinkedIn</div>
                  <div className={styles.social_handle}>/company/hive</div>
                </div>
              </div>
            </div>
            
            <div className={styles.office_info}>
              <h3 className={styles.office_title}>Headquarters</h3>
              <p className={styles.office_address}>
                HIVE Innovation Center<br />
                123 Apiary Lane<br />
                Brussels, BE 1000<br />
                European Union
              </p>
              <div className={styles.office_map}>
                [Interactive Map]
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.support_hours}>
          <h3 className={styles.hours_title}>Support Hours</h3>
          <p className={styles.section_description}>Our technical support team is available during the following hours to assist you with any questions or issues.</p>
          
          <div className={styles.hours_grid}>
            <div className={styles.hours_card}>
              <div className={styles.hours_day}>Monday - Friday</div>
              <div className={styles.hours_time}>8:00 AM - 8:00 PM CET</div>
            </div>
            <div className={styles.hours_card}>
              <div className={styles.hours_day}>Saturday</div>
              <div className={styles.hours_time}>9:00 AM - 5:00 PM CET</div>
            </div>
            <div className={styles.hours_card}>
              <div className={styles.hours_day}>Sunday</div>
              <div className={styles.hours_time}>Closed</div>
            </div>
          </div>
        </div>
        
        <div className={styles.faq_section}>
          <h3 className={styles.faq_title}>Frequently Asked Questions</h3>
          
          <div className={styles.faq_container}>
            <div className={styles.faq_item}>
              <div className={styles.faq_question}>
                <div className={styles.question_text}>How quickly will I receive a response to my inquiry?</div>
                <div className={styles.question_icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              <div className={styles.faq_answer}>
                We strive to respond to all inquiries within 24 hours during business days. For urgent technical issues, please use our phone support option for immediate assistance during our support hours.
              </div>
            </div>
            
            <div className={styles.faq_item}>
              <div className={styles.faq_question}>
                <div className={styles.question_text}>How can I request a product demonstration?</div>
                <div className={styles.question_icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              <div className={styles.faq_answer}>
                You can request a product demonstration by selecting "Product Inquiry" in the contact form subject dropdown and specifying your interest in a demo. Alternatively, you can email our sales team directly at sales@hiveproject.com to schedule a personalized demonstration.
              </div>
            </div>
            
            <div className={styles.faq_item}>
              <div className={styles.faq_question}>
                <div className={styles.question_text}>Do you offer support in languages other than English?</div>
                <div className={styles.question_icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              <div className={styles.faq_answer}>
                Yes, we offer support in multiple languages including English, French, German, Spanish, and Italian. Please indicate your preferred language when contacting us, and we'll do our best to accommodate your request.
              </div>
            </div>
            
            <div className={styles.faq_item}>
              <div className={styles.faq_question}>
                <div className={styles.question_text}>How can I report a bug or suggest a feature?</div>
                <div className={styles.question_icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              <div className={styles.faq_answer}>
                We value your feedback! To report a bug, please select "Technical Support" in the contact form and provide as much detail as possible about the issue you're experiencing. For feature suggestions, select "Feedback" and share your ideas with us. Our product team reviews all suggestions as we continue to improve HIVE.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;