import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function ContactPage() {
    const cursorRef = useRef(null);
    const heroContentRef = useRef(null);
    const faqItemsRef = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initialize animations
        gsap.fromTo(
            heroContentRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.3 }
        );

        // Animate sections on scroll
        const sections = document.querySelectorAll('.section-header');
        sections.forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                    },
                }
            );
        });

        // Custom cursor
        const onMouseMove = (e) => {
            if (cursorRef.current) {
                const { clientX, clientY } = e;
                gsap.to(cursorRef.current, {
                    x: clientX,
                    y: clientY,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        // FAQ functionality
        const toggleFaqItem = (index) => {
            const item = faqItemsRef.current[index];
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItemsRef.current.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't already open
            if (!isActive) {
                item.classList.add('active');
            }
        };

        // Initialize FAQ event listeners
        const faqItems = document.querySelectorAll('.faq-item');
        faqItemsRef.current = Array.from(faqItems);
        
        faqItemsRef.current.forEach((item, index) => {
            item.addEventListener('click', () => toggleFaqItem(index));
        });

        // Cleanup function
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            faqItemsRef.current.forEach((item, index) => {
                item.removeEventListener('click', () => toggleFaqItem(index));
            });
        };
    }, []);

    return (
        <>
            {/* Custom Cursor */}
            <div className="custom-cursor" ref={cursorRef}></div>

            {/* Navbar */}
            <nav className="navbar">
                <a href="/" className="logo">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L4.5 7.5V16.5L12 21L19.5 16.5V7.5L12 3Z" fill="#FFC107" stroke="#FF6F00" strokeWidth="1.5"/>
                        <path d="M12 8L7 11V14L12 17L17 14V11L12 8Z" fill="#FFFFFF" stroke="#FF6F00" strokeWidth="1"/>
                    </svg>
                    <span className="logo-text">HIVE</span>
                </a>
                <div className="nav-links">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/download" className="nav-link">Download</a>
                    <a href="/about" className="nav-link">About</a>
                    <a href="/mission" className="nav-link">Mission</a>
                    <a href="/contact" className="nav-link active">Contact</a>
                </div>
                <a href="#" className="cta-button">Get Started</a>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="honeycomb-grid"></div>
                    <div className="blob-container">
                        <div className="blob" style={{ width: "400px", height: "400px", top: "-100px", left: "-100px" }}></div>
                        <div className="blob" style={{ width: "500px", height: "500px", top: "30%", right: "-150px" }}></div>
                        <div className="blob" style={{ width: "300px", height: "300px", bottom: "-50px", left: "40%" }}></div>
                    </div>
                </div>
                <div className="hero-content" ref={heroContentRef}>
                    <div className="hero-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span style={{ marginLeft: "8px" }}>EU Green Award Winner</span>
                    </div>
                    <h1 className="hero-title">We're Here To <span>Help</span></h1>
                    <p className="hero-description">Whether you have questions about our technology, need technical support, or want to explore partnership opportunities, our team is ready to assist you every step of the way.</p>
                </div>
            </section>

            {/* Contact Methods Section */}
            <section className="section bg-white" id="contact-methods">
                <div className="section-header">
                    <span className="section-subtitle">Get In Touch</span>
                    <h2 className="section-title">Contact Methods</h2>
                    <p className="section-description">Choose the most convenient way to reach our dedicated support team.</p>
                </div>
                
                <div className="contact-methods">
                    <div className="contact-card">
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>
                        <h3 className="contact-title">Email Support</h3>
                        <p className="contact-info">For general inquiries and non-urgent technical support, email us and we'll respond within 24 hours.</p>
                        <a href="mailto:support@hiveproject.com" className="contact-link">support@hiveproject.com</a>
                    </div>
                    
                    <div className="contact-card">
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                        </div>
                        <h3 className="contact-title">Phone Support</h3>
                        <p className="contact-info">For urgent technical issues, our dedicated support line is available during business hours.</p>
                        <a href="tel:+18005551234" className="contact-link">+1 (800) 555-1234</a>
                    </div>
                    
                    <div className="contact-card">
                        <div className="contact-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                        </div>
                        <h3 className="contact-title">Live Chat</h3>
                        <p className="contact-info">For quick questions and real-time assistance, connect with our support team through live chat.</p>
                        <a href="#" className="contact-link">Start a chat</a>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="section bg-off-white" id="contact-form">
                <div className="section-header">
                    <span className="section-subtitle">Send A Message</span>
                    <h2 className="section-title">Contact Form</h2>
                    <p className="section-description">Have a specific question or inquiry? Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>
                
                <div className="contact-container">
                    <div className="contact-form-container">
                        <h3 className="form-title">Get in Touch</h3>
                        <form className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" id="name" name="name" className="form-input" placeholder="Your full name" required />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" id="email" name="email" className="form-input" placeholder="Your email address" required />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <select id="subject" name="subject" className="form-select" required>
                                    <option value="" disabled selected>Select a topic</option>
                                    <option value="technical-support">Technical Support</option>
                                    <option value="account-help">Account Help</option>
                                    <option value="product-inquiry">Product Inquiry</option>
                                    <option value="partnership">Partnership Opportunity</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea id="message" name="message" className="form-textarea" placeholder="How can we help you?" required></textarea>
                            </div>
                            
                            <button type="submit" className="form-submit">Send Message</button>
                        </form>
                    </div>
                    
                    <div className="social-container">
                        <div className="social-content">
                            <h3 className="social-title">Connect With Us</h3>
                            <p className="social-description">Follow us on social media for the latest updates, beekeeping tips, and community stories.</p>
                            
                            <div className="social-grid">
                                <div className="social-card">
                                    <div className="social-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                        </svg>
                                    </div>
                                    <div className="social-name">Twitter</div>
                                    <div className="social-handle">@HIVEproject</div>
                                </div>
                                
                                <div className="social-card">
                                    <div className="social-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                                        </svg>
                                    </div>
                                    <div className="social-name">Facebook</div>
                                    <div className="social-handle">/HIVEproject</div>
                                </div>
                                
                                <div className="social-card">
                                    <div className="social-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                                        </svg>
                                    </div>
                                    <div className="social-name">Instagram</div>
                                    <div className="social-handle">@hive_project</div>
                                </div>
                                
                                <div className="social-card">
                                    <div className="social-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                        </svg>
                                    </div>
                                    <div className="social-name">LinkedIn</div>
                                    <div className="social-handle">/company/hive</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="office-info">
                            <h3 className="office-title">Headquarters</h3>
                            <p className="office-address">
                                HIVE Innovation Center<br />
                                123 Apiary Lane<br />
                                Brussels, BE 1000<br />
                                European Union
                            </p>
                            <div className="office-map">
                                [Interactive Map]
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="support-hours">
                    <h3 className="hours-title">Support Hours</h3>
                    <p className="section-description">Our technical support team is available during the following hours to assist you with any questions or issues.</p>
                    
                    <div className="hours-grid">
                        <div className="hours-card">
                            <div className="hours-day">Monday - Friday</div>
                            <div className="hours-time">8:00 AM - 8:00 PM CET</div>
                        </div>
                        <div className="hours-card">
                            <div className="hours-day">Saturday</div>
                            <div className="hours-time">9:00 AM - 5:00 PM CET</div>
                        </div>
                        <div className="hours-card">
                            <div className="hours-day">Sunday</div>
                            <div className="hours-time">Closed</div>
                        </div>
                    </div>
                </div>
                
                <div className="faq-section">
                    <h3 className="faq-title">Frequently Asked Questions</h3>
                    
                    <div className="faq-container">
                        <div className="faq-item active">
                            <div className="faq-question">
                                <div className="question-text">How quickly will I receive a response to my inquiry?</div>
                                <div className="question-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="faq-answer">
                                We strive to respond to all inquiries within 24 hours during business days. For urgent technical issues, please use our phone support option for immediate assistance during our support hours.
                            </div>
                        </div>
                        
                        <div className="faq-item">
                            <div className="faq-question">
                                <div className="question-text">How can I request a product demonstration?</div>
                                <div className="question-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="faq-answer">
                                You can request a product demonstration by selecting "Product Inquiry" in the contact form subject dropdown and specifying your interest in a demo. Alternatively, you can email our sales team directly at sales@hiveproject.com to schedule a personalized demonstration.
                            </div>
                        </div>
                        
                        <div className="faq-item">
                            <div className="faq-question">
                                <div className="question-text">Do you offer support in languages other than English?</div>
                                <div className="question-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="faq-answer">
                                Yes, we offer support in multiple languages including English, French, German, Spanish, and Italian. Please indicate your preferred language when contacting us, and we'll do our best to accommodate your request.
                            </div>
                        </div>
                        
                        <div className="faq-item">
                            <div className="faq-question">
                                <div className="question-text">How can I report a bug or suggest a feature?</div>
                                <div className="question-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="faq-answer">
                                We value your feedback! To report a bug, please select "Technical Support" in the contact form and provide as much detail as possible about the issue you're experiencing. For feature suggestions, select "Feedback" and share your ideas with us. Our product team reviews all suggestions as we continue to improve HIVE.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <div className="footer-content">
                    <div className="footer-column">
                        <div className="footer-logo">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3L4.5 7.5V16.5L12 21L19.5 16.5V7.5L12 3Z" fill="#FFC107" stroke="#FF6F00" strokeWidth="1.5"/>
                                <path d="M12 8L7 11V14L12 17L17 14V11L12 8Z" fill="#FFFFFF" stroke="#FF6F00" strokeWidth="1"/>
                            </svg>
                            <span className="footer-logo-text">HIVE</span>
                        </div>
                        <p className="footer-description">Revolutionizing beekeeping through innovative IoT technology and AI-driven insights to create a sustainable future for bees and beekeepers.</p>
                        <div className="footer-social">
                            <a href="#" className="footer-social-link">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" fill="#FFFFFF"/>
                                </svg>
                            </a>
                            <a href="#" className="footer-social-link">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" fill="#FFFFFF"/>
                                </svg>
                            </a>
                            <a href="#" className="footer-social-link">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" fill="#FFFFFF"/>
                                </svg>
                            </a>
                            <a href="#" className="footer-social-link">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="#FFFFFF"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h3 className="footer-title">Company</h3>
                        <div className="footer-links">
                            <a href="#" className="footer-link">About Us</a>
                            <a href="#" className="footer-link">Our Mission</a>
                            <a href="#" className="footer-link">Team</a>
                            <a href="#" className="footer-link">Careers</a>
                            <a href="#" className="footer-link">Press</a>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h3 className="footer-title">Product</h3>
                        <div className="footer-links">
                            <a href="#" className="footer-link">Features</a>
                            <a href="#" className="footer-link">Pricing</a>
                            <a href="#" className="footer-link">Download</a>
                            <a href="#" className="footer-link">Integration</a>
                            <a href="#" className="footer-link">API</a>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h3 className="footer-title">Resources</h3>
                        <div className="footer-links">
                            <a href="#" className="footer-link">Documentation</a>
                            <a href="#" className="footer-link">Guides</a>
                            <a href="#" className="footer-link">Support Center</a>
                            <a href="#" className="footer-link">Community</a>
                            <a href="#" className="footer-link">Blog</a>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h3 className="footer-title">Contact</h3>
                        <div className="footer-links">
                            <a href="#" className="footer-link">Contact Us</a>
                            <a href="#" className="footer-link">Support</a>
                            <a href="#" className="footer-link">Sales</a>
                            <a href="#" className="footer-link">Partnerships</a>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <p>© 2025 HIVE - Honeybee Innovation for Vibrant Ecosystems. All rights reserved.</p>
                </div>
            </footer>

            {/* EU Green Award Badge */}
            <div className="eu-badge">
                <img src="/api/placeholder/30/30" alt="EU Green Award" />
                <div className="eu-badge-text">EU Green Award Winner</div>
            </div>
        </>
    );
}

export default ContactPage;
