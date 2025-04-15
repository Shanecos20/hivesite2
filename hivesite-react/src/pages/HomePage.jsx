import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/index.css'; // Import the CSS for this page
// import mainLogoColor from '../assets/main-logo-colors.png'; // Example asset import - Adjust path as needed

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0); // State for testimonial slider
    const testimonialIntervalRef = useRef(null); // Ref to store interval ID
    const testimonialSlidesRef = useRef([]); // Ref to store slide elements
    const testimonialDotsRef = useRef([]); // Ref to store dot elements

    // Refs for elements if needed later, for now using selectors
    // const heroTitleRef = useRef(null);

    useEffect(() => {
        // --- Initial Animations & Setup --- (Replaces window.onload and direct script execution)

        // Custom cursor
        const cursor = document.querySelector('.custom-cursor');
        const cursorHoverElements = document.querySelectorAll('a, button, .feature-card, .testimonial-dot, .app-store-button');

        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
            });
        };

        document.addEventListener('mousemove', onMouseMove);

        cursorHoverElements.forEach((element) => {
            element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        const onScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll);

        // Animate blobs with GSAP
        const blobs = document.querySelectorAll('.blob');
        blobs.forEach((blob, index) => {
            gsap.set(blob, { x: 0, y: 0, opacity: 0.3 });
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

        // Hero section animations
        gsap.to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.3
        });
        gsap.to('.hero-description', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.5
        });
        gsap.to('.hero-cta-group', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.7
        });
        gsap.to('.device-preview', {
            opacity: 1,
            // y: 0, // Assuming initial state is handled by CSS
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.9
        });
        gsap.to('.hero-scroll', {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 1.5
        });

        // EU Badge animation
        gsap.to('.eu-badge', {
            opacity: 1,
            y: 0, // Assuming initial state is translateY(20px) or similar in CSS
            duration: 0.8,
            ease: 'power2.out',
            delay: 1.2
        });

        // Scroll animations for common elements
        gsap.utils.toArray('.section-subtitle, .section-title, .section-description').forEach(element => {
            gsap.fromTo(element, // Use fromTo if initial state (opacity: 0, y: 20) is in CSS
                { opacity: 0, y: 20 },
                {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%", // Trigger a bit sooner
                        toggleActions: "play none none none", // Play animation once
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    // Stagger based on class if needed, or use delay like original
                    delay: element.classList.contains('section-title') ? 0.2 : (element.classList.contains('section-description') ? 0.4 : 0)
                });
        });

        // Scroll animations for specific cards
        gsap.utils.toArray('.feature-card, .process-step, .metric-card, .testimonial-card').forEach((element, index) => {
            gsap.fromTo(element,
                { opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    delay: (index % (element.classList.contains('process-step') ? 1 : 3)) * 0.15 // Simple stagger
                });
        });

        // Animate CTA section content
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) { // Check if the section exists
            gsap.fromTo(ctaSection.querySelector('.cta-title'),
                { opacity: 0, y: 20 },
                {
                    scrollTrigger: {
                        trigger: ctaSection,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                    opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2
                });
            gsap.fromTo(ctaSection.querySelector('.cta-description'),
                { opacity: 0, y: 20 },
                {
                    scrollTrigger: {
                        trigger: ctaSection,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                    opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.4
                });
            gsap.fromTo(ctaSection.querySelector('.cta-buttons'),
                { opacity: 0, y: 20 },
                {
                    scrollTrigger: {
                        trigger: ctaSection,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                    opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.6
                });
             gsap.fromTo(ctaSection.querySelector('.app-stores'),
                 { opacity: 0, y: 20 },
                 {
                     scrollTrigger: {
                         trigger: ctaSection,
                         start: "top 80%",
                         toggleActions: "play none none none",
                     },
                     opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.8
                 });
        }

        // Testimonial slider logic
        const slidesNodeList = document.querySelectorAll('.testimonial-slide');
        const dotsNodeList = document.querySelectorAll('.testimonial-dot');
        testimonialSlidesRef.current = Array.from(slidesNodeList);
        testimonialDotsRef.current = Array.from(dotsNodeList);

        const showSlide = (index) => {
            if (testimonialIntervalRef.current) {
                clearInterval(testimonialIntervalRef.current);
            }

            if (testimonialSlidesRef.current.length === 0) return; // Guard clause

            const slides = testimonialSlidesRef.current;
            const dots = testimonialDotsRef.current;
            const activeSlideIndex = index % slides.length; // Ensure index loops correctly

            slides.forEach((slide, i) => {
                if (i !== activeSlideIndex) {
                    gsap.to(slide, { opacity: 0, x: '-100%', duration: 0.5, onComplete: () => slide.style.display = 'none' });
                } else {
                    gsap.set(slide, { display: 'block', x: '100%' }); // Start off-screen right
                    gsap.to(slide, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' });
                }
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === activeSlideIndex);
            });

            setCurrentSlide(activeSlideIndex);

            testimonialIntervalRef.current = setInterval(() => {
                showSlide(activeSlideIndex + 1);
            }, 6000);
        };

        // Initial setup
        if (testimonialSlidesRef.current.length > 0) {
            showSlide(0);
        }

        // Dot click listeners
        const dotClickHandlers = [];
        testimonialDotsRef.current.forEach((dot, i) => {
            const handler = () => showSlide(i);
            dotClickHandlers.push({ element: dot, handler });
            dot.addEventListener('click', handler);
        });

        // TODO: Hexagon canvas logic
        // const canvas = document.getElementById('hexagonCanvas');
        // if (canvas) {
        //     const ctx = canvas.getContext('2d');
        //     // ... resizeCanvas() and drawHexagons() logic translated to React ...
        // }

        // Cleanup function to remove listeners when component unmounts
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', onScroll);
            ScrollTrigger.getAll().forEach(st => st.kill()); // Kill ScrollTriggers
            gsap.killTweensOf('.blob'); // Stop blob animations
             // Remove hover listeners
            cursorHoverElements.forEach((element) => {
                element.removeEventListener('mouseenter', () => cursor.classList.add('hover'));
                element.removeEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
            // Cleanup testimonial slider
            if (testimonialIntervalRef.current) {
                clearInterval(testimonialIntervalRef.current);
            }
            dotClickHandlers.forEach(({ element, handler }) => {
                element.removeEventListener('click', handler);
            });
        };

    }, []); // Empty dependency array ensures this runs only once after mount

    return (
        <> {/* Using Fragment as the top-level element */}
            {/* Custom Cursor - We might need a React-specific solution later */}
            <div className="custom-cursor"></div>

            {/* Navbar - Consider making this a reusable component later */}
            <nav className="navbar">
                <a href="#" className="logo">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L4.5 7.5V16.5L12 21L19.5 16.5V7.5L12 3Z" fill="#FFC107" stroke="#FF6F00" strokeWidth="1.5"/>
                        <path d="M12 8L7 11V14L12 17L17 14V11L12 8Z" fill="#FFFFFF" stroke="#FF6F00" strokeWidth="1"/>
                    </svg>
                    <span className="logo-text">HIVE</span>
                </a>
                <div className="nav-links">
                     {/* Replace with React Router Links later */}
                    <a href="index.html" className="nav-link active">Home</a>
                    <a href="download.html" className="nav-link">Download</a>
                    <a href="about.html" className="nav-link">About</a>
                    <a href="mission.html" className="nav-link">Mission</a>
                    <a href="contact.html" className="nav-link">Contact</a>
                </div>
                <a href="#" className="cta-button">Get Started</a>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="honeycomb-grid"></div> {/* JS might be needed for this */}
                    <div className="blob-container">
                        {/* Use React style objects for inline styles */}
                        <div className="blob" style={{ width: '400px', height: '400px', top: '-100px', left: '-100px' }}></div>
                        <div className="blob" style={{ width: '500px', height: '500px', top: '30%', right: '-150px' }}></div>
                        <div className="blob" style={{ width: '300px', height: '300px', bottom: '-50px', left: '40%' }}></div>
                    </div>
                </div>
                <div className="hero-content">
                    <h1 className="hero-title">Revolutionizing <span>Beekeeping</span> Through Innovation</h1>
                    <p className="hero-description">HIVE connects IoT technology with AI-driven insights to make beekeeping more accessible, efficient, and sustainable. Real-time monitoring, smart analytics, and actionable recommendations to ensure thriving colonies.</p>
                    <div className="hero-cta-group">
                        <a href="#" className="cta-button">Download the App</a>
                        <a href="#" className="hero-cta-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polygon points="10 8 16 12 10 16 10 8"></polygon>
                            </svg>
                            Watch Demo
                        </a>
                    </div>
                </div>

                {/* 3D Device Preview */}
                <div className="device-preview">
                    <div className="device-screen">
                        <div className="device-header">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Use strokeWidth attribute */}
                                <path d="M12 3L4.5 7.5V16.5L12 21L19.5 16.5V7.5L12 3Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1.5"/>
                                <path d="M12 8L7 11V14L12 17L17 14V11L12 8Z" fill="#FF6F00" stroke="#FFFFFF" strokeWidth="1"/>
                            </svg>
                            HIVE Dashboard
                        </div>
                        <div className="device-content">
                            <div className="device-data-card">
                                <div className="label">Temperature</div>
                                <div className="value">34.2°C</div>
                            </div>
                            <div className="device-data-card">
                                <div className="label">Humidity</div>
                                <div className="value">65%</div>
                            </div>
                            <div className="device-chart">
                                <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#FFC107" stopOpacity="0.8"/>
                                            <stop offset="100%" stopColor="#FFC107" stopOpacity="0"/>
                                        </linearGradient>
                                    </defs>
                                    <path className="chart-line-path" d="M0,80 C20,70 40,40 60,30 C80,20 100,50 120,40 C140,30 160,60 180,50 C200,40 220,20 240,30 C260,40 280,60 300,50"></path>
                                    <path className="chart-line-area" d="M0,80 C20,70 40,40 60,30 C80,20 100,50 120,40 C140,30 160,60 180,50 C200,40 220,20 240,30 C260,40 280,60 300,50 L300,100 L0,100 Z"></path>
                                </svg>
                            </div>
                            <div className="device-data-card">
                                <div className="label">Bee Activity</div>
                                <div className="value">High</div>
                            </div>
                            <div className="device-actions">
                                <div className="device-action-button">Details</div>
                                <div className="device-action-button">Actions</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hero-scroll">
                    <span className="scroll-text">Scroll Down</span>
                    <div className="scroll-icon">
                        <div className="scroll-dot"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="features">
                <canvas id="hexagonCanvas"></canvas> {/* JS will be needed to draw on this */}
                <div className="section-header">
                    <span className="section-subtitle">Smart Beekeeping</span>
                    <h2 className="section-title">The Future of Hive Management</h2>
                    <p className="section-description">Our cutting-edge IoT technology and AI algorithms work together to provide unprecedented insights into your beehive's health and productivity.</p>
                </div>
                <div className="features-grid">
                    {/* Feature Card 1 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#FF6F00"/>
                            </svg>
                        </div>
                        <h3 className="feature-title">Real-time Monitoring</h3>
                        <p className="feature-description">Track crucial hive metrics like temperature, humidity, bee activity, and varroa mite presence with our advanced sensors.</p>
                    </div>
                    {/* Feature Card 2 */}
                    <div className="feature-card">
                         <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#FF6F00"/>
                            </svg>
                        </div>
                        <h3 className="feature-title">AI-Powered Insights</h3>
                        <p className="feature-description">Our smart algorithms analyze data patterns to predict issues before they become problems and suggest optimal interventions.</p>
                    </div>
                    {/* Feature Card 3 */}
                     <div className="feature-card">
                        <div className="feature-icon">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="#FF6F00"/>
                            </svg>
                        </div>
                        <h3 className="feature-title">Colony Protection</h3>
                        <p className="feature-description">Early detection of threats like disease, pests, or unfavorable conditions helps protect your colonies and improve survival rates.</p>
                    </div>
                     {/* Feature Card 4 */}
                     <div className="feature-card">
                        <div className="feature-icon">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                 <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#FF6F00"/>
                             </svg>
                        </div>
                        <h3 className="feature-title">Smart Reporting</h3>
                        <p className="feature-description">Generate detailed reports about your hive's performance, health trends, and productivity to make informed management decisions.</p>
                    </div>
                    {/* Feature Card 5 */}
                     <div className="feature-card">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" fill="#FF6F00"/>
                            </svg>
                        </div>
                        <h3 className="feature-title">Community Insights</h3>
                        <p className="feature-description">Connect with other beekeepers to share data, strategies, and advice. Leverage collective knowledge to improve your beekeeping practices.</p>
                    </div>
                    {/* Feature Card 6 */}
                     <div className="feature-card">
                        <div className="feature-icon">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="#FF6F00"/>
                            </svg>
                        </div>
                        <h3 className="feature-title">Smart Alerts</h3>
                        <p className="feature-description">Receive instant notifications about urgent issues requiring immediate attention, ensuring you never miss critical changes in hive conditions.</p>
                    </div>
                </div>
            </section>

             {/* How It Works Section */}
            <section className="how-it-works" id="how-it-works">
                 {/* Parallax elements might need JS */}
                <div className="parallax-container">
                     <div className="parallax-element" style={{ width: '300px', height: '300px', top: '10%', left: '5%' }}></div>
                     <div className="parallax-element" style={{ width: '200px', height: '200px', top: '60%', left: '80%' }}></div>
                     <div className="parallax-element" style={{ width: '150px', height: '150px', top: '30%', left: '90%' }}></div>
                </div>
                <div className="section-header">
                    <span className="section-subtitle">Simple & Effective</span>
                    <h2 className="section-title">How HIVE Works</h2>
                    <p className="section-description">Our innovative system makes advanced beekeeping technology accessible to everyone from hobbyists to commercial apiaries.</p>
                </div>
                <div className="process-steps">
                    {/* Process Step 1 */}
                    <div className="process-step">
                        <div className="process-number">1</div>
                        <div className="process-content">
                            <h3 className="process-title">Install IoT Sensors</h3>
                            <p className="process-description">Our modular sensors seamlessly integrate with any hive type. Simply place them in strategic locations to collect comprehensive data about your colony's environment and activity.</p>
                        </div>
                        <div className="process-image">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z" fill="#FF6F00"/>
                            </svg>
                        </div>
                    </div>
                     {/* Process Step 2 */}
                    <div className="process-step">
                        <div className="process-number">2</div>
                        <div className="process-content">
                            <h3 className="process-title">Connect to the HIVE App</h3>
                            <p className="process-description">Download our intuitive app and pair it with your sensors. The setup wizard guides you through the process in minutes, with no technical expertise required.</p>
                        </div>
                         <div className="process-image">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" fill="#FF6F00"/>
                            </svg>
                        </div>
                    </div>
                     {/* Process Step 3 */}
                    <div className="process-step">
                        <div className="process-number">3</div>
                        <div className="process-content">
                            <h3 className="process-title">Analyze Real-Time Data</h3>
                            <p className="process-description">Our AI algorithms continuously monitor and analyze data from your hives, identifying patterns and potential issues before they become serious problems.</p>
                        </div>
                         <div className="process-image">
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="#FF6F00"/>
                            </svg>
                        </div>
                    </div>
                    {/* Process Step 4 */}
                    <div className="process-step">
                        <div className="process-number">4</div>
                        <div className="process-content">
                            <h3 className="process-title">Receive Smart Recommendations</h3>
                            <p className="process-description">Get personalized, actionable insights based on your specific hive conditions. Our recommendations help you make informed decisions to optimize colony health and productivity.</p>
                        </div>
                        <div className="process-image">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#FF6F00"/>
                           </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="metrics" id="metrics">
                 <div className="blob-container">
                     <div className="blob" style={{ width: '400px', height: '400px', top: '-100px', left: '-100px' }}></div>
                     <div className="blob" style={{ width: '500px', height: '500px', top: '30%', right: '-150px' }}></div>
                     <div className="blob" style={{ width: '300px', height: '300px', bottom: '-50px', left: '40%' }}></div>
                 </div>
                 <div className="section-header">
                     <h2 className="section-title">Proven Results</h2>
                     <p className="section-description">HIVE technology has already made a significant impact on beekeeping worldwide. Here's what our system has achieved:</p>
                 </div>
                 <div className="metrics-grid">
                     <div className="metric-card">
                         <div className="metric-value">32%</div>
                         <div className="metric-label">Increase in Honey Production</div>
                     </div>
                     <div className="metric-card">
                         <div className="metric-value">45%</div>
                         <div className="metric-label">Reduction in Colony Losses</div>
                     </div>
                     <div className="metric-card">
                         <div className="metric-value">10,000+</div>
                         <div className="metric-label">Active Hives Monitored</div>
                     </div>
                     <div className="metric-card">
                         <div className="metric-value">87%</div>
                         <div className="metric-label">Early Problem Detection</div>
                     </div>
                 </div>
             </section>

             {/* Testimonials Section */}
            <section className="testimonials" id="testimonials">
                <div className="section-header">
                    <span className="section-subtitle">Trusted by Beekeepers</span>
                    <h2 className="section-title">What Our Users Say</h2>
                    <p className="section-description">Hear from beekeepers who have transformed their apiaries with HIVE technology.</p>
                </div>
                 <div className="testimonials-container"> {/* JS needed for slider */}
                     <div className="testimonial-slider">
                         <div className="testimonial-slide" data-index="0">
                             <div className="testimonial-card">
                                 <div className="testimonial-content">
                                     HIVE has completely transformed my beekeeping operation. The real-time monitoring has allowed me to detect and address issues before they become serious, and my honey yields have increased by over 40% in just one season.
                                 </div>
                                 <div className="testimonial-author">
                                     <div className="testimonial-avatar">JM</div>
                                     <div className="testimonial-info">
                                         <div className="testimonial-name">John Markson</div>
                                         <div className="testimonial-role">Commercial Beekeeper, Oregon</div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="testimonial-slide" data-index="1">
                             <div className="testimonial-card">
                                 <div className="testimonial-content">
                                     As a hobby beekeeper, I was always worried about missing important changes in my hives. With HIVE, I get alerts directly to my phone and clear guidance on what actions to take. It's like having an expert beekeeper by my side 24/7.
                                 </div>
                                 <div className="testimonial-author">
                                     <div className="testimonial-avatar">SL</div>
                                     <div className="testimonial-info">
                                         <div className="testimonial-name">Sarah Linden</div>
                                         <div className="testimonial-role">Hobby Beekeeper, Vermont</div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="testimonial-slide" data-index="2">
                             <div className="testimonial-card">
                                 <div className="testimonial-content">
                                     The insights provided by HIVE are invaluable. We've been able to optimize our beekeeping practices based on data rather than guesswork, resulting in healthier colonies and more sustainable operations.
                                 </div>
                                 <div className="testimonial-author">
                                     <div className="testimonial-avatar">RM</div>
                                     <div className="testimonial-info">
                                         <div className="testimonial-name">Robert Martinez</div>
                                         <div className="testimonial-role">Apiary Manager, California</div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div className="testimonial-nav">
                         <div className="testimonial-dot active" data-index="0"></div>
                         <div className="testimonial-dot" data-index="1"></div>
                         <div className="testimonial-dot" data-index="2"></div>
                     </div>
                 </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section" id="cta">
                <div className="parallax-container"> {/* JS needed for parallax */}
                    <div className="parallax-element" style={{ width: '350px', height: '350px', top: '30%', left: '20%' }}></div>
                    <div className="parallax-element" style={{ width: '250px', height: '250px', top: '60%', left: '70%' }}></div>
                 </div>
                 <div className="cta-content">
                     <h2 className="cta-title">Ready to Transform Your Beekeeping?</h2>
                     <p className="cta-description">Join thousands of beekeepers who are using HIVE technology to create healthier, more productive colonies while contributing to global bee conservation efforts.</p>
                     <div className="cta-buttons">
                         <a href="#" className="cta-button">Get Started Today</a>
                         <a href="#" className="hero-cta-secondary">Contact Sales</a>
                     </div>
                     <div className="app-stores">
                         <a href="#" className="app-store-button">
                             <div className="app-store-icon">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
                                     <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.17-.29 2.28-.95 3.53-.84 1.5.17 2.63.64 3.38 1.64-2.36 1.62-1.35 5.2.93 6.18-1.05 2.47-2.49 4.37-4.12 6.1zm-3.44-17.5c.05 1.87-1.37 3.4-3.1 3.58-.03-1.95 1.41-3.47 3.1-3.58z"/>
                                 </svg>
                             </div>
                             <div className="app-store-text">
                                 <small>Download on the</small>
                                 <span>App Store</span>
                             </div>
                         </a>
                         <a href="#" className="app-store-button">
                             <div className="app-store-icon">
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
                                     <path d="M3.18 23L20.6 12 3.18 1l.01 22zM6.97 4.7l9.44 7.3-9.44 7.3V4.7z"/>
                                 </svg>
                             </div>
                             <div className="app-store-text">
                                 <small>Get it on</small>
                                 <span>Google Play</span>
                             </div>
                         </a>
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
                             {/* Replace with React Router Link components later */}
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
                 {/* Need to import the image and use it in src */}
                 {/* <img src={mainLogoColor} alt="EU Green Award" /> */}
                 <img src="assets/main-logo-colors.png" alt="EU Green Award" /> {/* Placeholder src */}
                 <div className="eu-badge-text">EU Green Award Winner</div>
             </div>

             {/* Script tags removed - Functionality handled in useEffect */}
        </>
    );
}

export default HomePage; 