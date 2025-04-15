import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/download.css'; // Assuming CSS is moved here

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function DownloadPage() {
    const [activePlatform, setActivePlatform] = useState('ios');
    const [activeFaq, setActiveFaq] = useState(0); // Index of the initially active FAQ
    const pageRef = useRef(null); // Ref for the main page container

    // Custom Cursor Logic
    useEffect(() => {
        const cursor = pageRef.current.querySelector('.custom-cursor');
        if (!cursor) return; // Exit if cursor element is not found

        const cursorHoverElements = pageRef.current.querySelectorAll('a, button, .platform-button, .faq-question');

        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
            });
        };

        const onMouseEnter = () => cursor.classList.add('hover');
        const onMouseLeave = () => cursor.classList.remove('hover');

        document.addEventListener('mousemove', onMouseMove);
        cursorHoverElements.forEach((element) => {
            element.addEventListener('mouseenter', onMouseEnter);
            element.addEventListener('mouseleave', onMouseLeave);
        });

        // Cleanup function
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            cursorHoverElements.forEach((element) => {
                element.removeEventListener('mouseenter', onMouseEnter);
                element.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []); // Runs once on mount

    // Navbar Scroll Effect
    useEffect(() => {
        const navbar = document.querySelector('.navbar'); // Assuming navbar is outside this component, otherwise use ref
        if (!navbar) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Cleanup
    }, []); // Runs once on mount


    // GSAP Animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate gradient blobs
            const blobs = pageRef.current.querySelectorAll('.blob');
            blobs.forEach((blob, index) => {
                gsap.set(blob, { x: 0, y: 0, scale: 1, opacity: 0.3 });
                const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: index * 1.5 });
                tl.to(blob, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    scale: 0.9 + Math.random() * 0.3,
                    opacity: 0.2 + Math.random() * 0.2,
                    duration: 15 + index * 5,
                    ease: "sine.inOut"
                });
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

            // Hero section animations (run on load/mount)
            gsap.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 });
            gsap.fromTo('.hero-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 });
            gsap.fromTo('.hero-description', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.7 });
            gsap.fromTo('.download-options', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.9 });
            gsap.fromTo('.eu-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.2 });

            // Scroll animations for sections
            gsap.utils.toArray('.section-subtitle, .section-title, .section-description').forEach(element => {
                gsap.fromTo(element,
                    { opacity: 0, y: 30 },
                    {
                        scrollTrigger: { trigger: element, start: "top 85%", toggleActions: "play none none none" },
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        delay: element.classList.contains('section-title') ? 0.2 : (element.classList.contains('section-description') ? 0.4 : 0)
                    }
                );
            });

             // App showcase animations
            gsap.utils.toArray('.showcase-item').forEach((item, index) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 50 },
                    {
                        scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" },
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        delay: 0.2 * index
                    }
                );
            });

            // Features animations
            gsap.utils.toArray('.feature-box').forEach((box, index) => {
                gsap.fromTo(box,
                    { opacity: 0, y: 50 },
                    {
                        scrollTrigger: { trigger: box, start: "top 85%", toggleActions: "play none none none" },
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        delay: 0.1 * index
                    }
                );
            });

            // FAQ animations
            gsap.utils.toArray('.faq-item').forEach((item, index) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 30 },
                    {
                        scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        delay: 0.1 * index
                    }
                );
            });

             // CTA section animations
            gsap.fromTo('.cta-title', { opacity: 0, y: 30 }, {
                scrollTrigger: { trigger: '.cta-title', start: "top 85%", toggleActions: "play none none none" },
                opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'
            });
            gsap.fromTo('.cta-description', { opacity: 0, y: 30 }, {
                scrollTrigger: { trigger: '.cta-description', start: "top 85%", toggleActions: "play none none none" },
                opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2
            });
             gsap.fromTo('.cta-buttons > a', { opacity: 0, y: 20 }, {
                scrollTrigger: { trigger: '.cta-buttons', start: "top 85%", toggleActions: "play none none none" },
                opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.15, delay: 0.4
            });


        }, pageRef); // Scope animations to the component

        return () => ctx.revert(); // Cleanup GSAP animations and ScrollTriggers
    }, []); // Runs once on mount

    const handlePlatformToggle = (platform) => {
        setActivePlatform(platform);
    };

    const handleFaqToggle = (index) => {
        setActiveFaq(activeFaq === index ? null : index); // Toggle: set to null if same is clicked
    };

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
        <div ref={pageRef}> {/* Main container ref */}
            {/* Custom Cursor - positioned absolutely by CSS */}
            <div className="custom-cursor"></div>

            {/* Navbar should be handled by a Layout component, assuming it's outside */}

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="honeycomb-grid"></div>
                    <div className="blob-container">
                        <div className="blob" style={{ width: '400px', height: '400px', top: '-100px', left: '-100px' }}></div>
                        <div className="blob" style={{ width: '500px', height: '500px', top: '30%', right: '-150px' }}></div>
                        <div className="blob" style={{ width: '300px', height: '300px', bottom: '-50px', left: '40%' }}></div>
                    </div>
                </div>
                <div className="hero-content">
                    <div className="hero-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span style={{ marginLeft: '8px' }}>EU Green Award Winner</span>
                    </div>
                    <h1 className="hero-title">Transform Your Beekeeping with <span>HIVE</span></h1>
                    <p className="hero-description">Download our revolutionary app that connects with IoT-enabled hives to provide real-time monitoring, AI-powered insights, and actionable recommendations for healthier, more productive colonies.</p>

                    <div className="download-options">
                        <div className="platforms">
                            <div
                                className={`platform-button ${activePlatform === 'ios' ? 'active' : ''}`}
                                onClick={() => handlePlatformToggle('ios')}
                            >
                                <svg className="platform-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.17-.29 2.28-.95 3.53-.84 1.5.17 2.63.64 3.38 1.64-2.36 1.62-1.35 5.2.93 6.18-1.05 2.47-2.49 4.37-4.12 6.1zm-3.44-17.5c.05 1.87-1.37 3.4-3.1 3.58-.03-1.95 1.41-3.47 3.1-3.58z"/>
                                </svg>
                                <span className="platform-text">iOS</span>
                            </div>
                            <div
                                className={`platform-button ${activePlatform === 'android' ? 'active' : ''}`}
                                onClick={() => handlePlatformToggle('android')}
                            >
                                <svg className="platform-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                                    <path d="M3.18 23L20.6 12 3.18 1l.01 22zM6.97 4.7l9.44 7.3-9.44 7.3V4.7z"/>
                                </svg>
                                <span className="platform-text">Android</span>
                            </div>
                        </div>

                        {/* iOS QR Container */}
                        <div className="qr-container" id="qr-ios" style={{ display: activePlatform === 'ios' ? 'flex' : 'none' }}>
                            <div className="qr-code">
                                {/* Assuming assets are in public/assets */}
                                <img src="/assets/adobe-express-qr-code.png" alt="QR Code for iOS app" />
                            </div>
                            <div className="qr-content">
                                <h3 className="qr-title">Download HIVE for iOS</h3>
                                <p className="qr-step-text">Get our powerful beekeeping companion app for your iPhone or iPad.</p>
                                <div className="qr-steps">
                                    <div className="qr-step"><div className="qr-step-number">1</div><p className="qr-step-text">Open your iPhone camera app</p></div>
                                    <div className="qr-step"><div className="qr-step-number">2</div><p className="qr-step-text">Point it at the QR code</p></div>
                                    <div className="qr-step"><div className="qr-step-number">3</div><p className="qr-step-text">Tap the notification to open the App Store</p></div>
                                </div>
                                <div className="app-stores">
                                    <a href="#" className="app-store-button">
                                        <div className="app-store-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.17-.29 2.28-.95 3.53-.84 1.5.17 2.63.64 3.38 1.64-2.36 1.62-1.35 5.2.93 6.18-1.05 2.47-2.49 4.37-4.12 6.1zm-3.44-17.5c.05 1.87-1.37 3.4-3.1 3.58-.03-1.95 1.41-3.47 3.1-3.58z"/></svg>
                                        </div>
                                        <div className="app-store-text"><small>Download on the</small><span>App Store</span></div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Android QR Container */}
                        <div className="qr-container" id="qr-android" style={{ display: activePlatform === 'android' ? 'flex' : 'none' }}>
                            <div className="qr-code">
                                {/* Assuming assets are in public/assets */}
                                <img src="/assets/adobe-express-qr-code.png" alt="QR Code for Android app" />
                            </div>
                            <div className="qr-content">
                                <h3 className="qr-title">Download HIVE for Android</h3>
                                <p className="qr-step-text">Get our powerful beekeeping companion app for your Android device.</p>
                                <div className="qr-steps">
                                    <div className="qr-step"><div className="qr-step-number">1</div><p className="qr-step-text">Open your Android camera app or QR scanner</p></div>
                                    <div className="qr-step"><div className="qr-step-number">2</div><p className="qr-step-text">Scan the QR code</p></div>
                                    <div className="qr-step"><div className="qr-step-number">3</div><p className="qr-step-text">Follow the link to Google Play Store</p></div>
                                </div>
                                <div className="app-stores">
                                    <a href="#" className="app-store-button">
                                        <div className="app-store-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M3.18 23L20.6 12 3.18 1l.01 22zM6.97 4.7l9.44 7.3-9.44 7.3V4.7z"/></svg>
                                        </div>
                                        <div className="app-store-text"><small>Get it on</small><span>Google Play</span></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* App Showcase Section */}
            <section className="app-showcase" id="app-showcase">
                <div className="section-header">
                    <span className="section-subtitle">App Highlights</span>
                    <h2 className="section-title">Powerful Features at Your Fingertips</h2>
                    <p className="section-description">Our intuitive interface provides easy access to all the tools you need to revolutionize your beekeeping practice.</p>
                </div>

                <div className="showcase-container">
                    {/* Repeat for each showcase item */}
                    <div className="showcase-item">
                        <div className="showcase-image">
                             {/* Using placeholder, replace with actual image path if available */}
                            <img src="/api/placeholder/300/550" alt="HIVE app dashboard" />
                            <div className="phone-frame"></div>
                        </div>
                        <h3 className="showcase-title">Smart Dashboard</h3>
                        <p className="showcase-description">Get a comprehensive overview of all your hives with real-time metrics and alerts.</p>
                    </div>
                    <div className="showcase-item">
                        <div className="showcase-image">
                            <img src="/api/placeholder/300/550" alt="HIVE app analytics" />
                            <div className="phone-frame"></div>
                        </div>
                        <h3 className="showcase-title">Detailed Analytics</h3>
                        <p className="showcase-description">Track trends and patterns with in-depth data visualization and analysis tools.</p>
                    </div>
                    <div className="showcase-item">
                        <div className="showcase-image">
                            <img src="/api/placeholder/300/550" alt="HIVE app recommendations" />
                            <div className="phone-frame"></div>
                        </div>
                        <h3 className="showcase-title">Smart Recommendations</h3>
                        <p className="showcase-description">Receive AI-powered suggestions tailored to your specific hive conditions.</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="download-features" id="features">
                <div className="section-header">
                    <span className="section-subtitle">App Advantages</span>
                    <h2 className="section-title">Why Beekeepers Love HIVE</h2>
                    <p className="section-description">Our innovative mobile application is designed with both novice and experienced beekeepers in mind.</p>
                </div>

                <div className="features-row">
                     {/* Feature Box 1 */}
                    <div className="feature-box">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        </div>
                        <h3 className="feature-title">User-Friendly Interface</h3>
                        <p className="feature-description">Intuitive design makes it easy to navigate through complex data and features without any technical expertise required.</p>
                    </div>
                     {/* Feature Box 2 */}
                    <div className="feature-box">
                        <div className="feature-icon">
                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        </div>
                        <h3 className="feature-title">Secure Data Storage</h3>
                        <p className="feature-description">End-to-end encryption ensures your apiary data remains private and secure while syncing across all your devices.</p>
                    </div>
                     {/* Feature Box 3 */}
                    <div className="feature-box">
                        <div className="feature-icon">
                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                        </div>
                        <h3 className="feature-title">Offline Functionality</h3>
                        <p className="feature-description">Continue monitoring and entering data even without internet access – perfect for remote apiaries with limited connectivity.</p>
                    </div>
                </div>

                <div className="features-row" style={{ marginTop: '2rem' }}>
                     {/* Feature Box 4 */}
                    <div className="feature-box">
                        <div className="feature-icon">
                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        </div>
                        <h3 className="feature-title">Customizable Alerts</h3>
                        <p className="feature-description">Set personalized notification thresholds for temperature, humidity, and other critical metrics based on your specific needs.</p>
                    </div>
                     {/* Feature Box 5 */}
                    <div className="feature-box">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <h3 className="feature-title">Community Access</h3>
                        <p className="feature-description">Connect with fellow beekeepers, share insights, and leverage collective knowledge to improve your beekeeping practices.</p>
                    </div>
                     {/* Feature Box 6 */}
                    <div className="feature-box">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        </div>
                        <h3 className="feature-title">Expert Support</h3>
                        <p className="feature-description">Access to beekeeping specialists and technical support whenever you need assistance with the app or your hives.</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section" id="faq">
                <div className="section-header">
                    <span className="section-subtitle">Questions & Answers</span>
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="section-description">Everything you need to know about the HIVE app and how it can transform your beekeeping experience.</p>
                </div>

                <div className="faq-container">
                    {faqData.map((faq, index) => (
                        <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={index}>
                            <div className="faq-question" onClick={() => handleFaqToggle(index)}>
                                <div className="question-text">{faq.question}</div>
                                <div className="question-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        {activeFaq !== index && <line x1="5" y1="12" x2="19" y2="12"></line>} {/* Only show horizontal line if not active */}
                                    </svg>
                                </div>
                            </div>
                            {/* Conditionally render answer based on active state */}
                            <div className="faq-answer" style={{ maxHeight: activeFaq === index ? '1000px' : '0', opacity: activeFaq === index ? 1 : 0 }}>
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section" id="cta">
                <div className="cta-container">
                    <h2 className="cta-title">Ready to Transform Your Beekeeping?</h2>
                    <p className="cta-description">Join thousands of beekeepers who are already using HIVE to create healthier, more productive colonies while contributing to global bee conservation efforts.</p>
                    <div className="cta-buttons">
                        <a href="#" className="cta-button">Download Now</a>
                        <a href="#" className="app-store-button">
                            <div className="app-store-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.17-.29 2.28-.95 3.53-.84 1.5.17 2.63.64 3.38 1.64-2.36 1.62-1.35 5.2.93 6.18-1.05 2.47-2.49 4.37-4.12 6.1zm-3.44-17.5c.05 1.87-1.37 3.4-3.1 3.58-.03-1.95 1.41-3.47 3.1-3.58z"/></svg></div>
                            <div className="app-store-text"><small>Download on the</small><span>App Store</span></div>
                        </a>
                        <a href="#" className="app-store-button">
                            <div className="app-store-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M3.18 23L20.6 12 3.18 1l.01 22zM6.97 4.7l9.44 7.3-9.44 7.3V4.7z"/></svg></div>
                            <div className="app-store-text"><small>Get it on</small><span>Google Play</span></div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer should be handled by a Layout component, assuming it's outside */}

            {/* EU Green Award Badge - Positioned by CSS */}
             <div className="eu-badge">
                {/* Placeholder image, adjust path as needed */}
                <img src="/api/placeholder/30/30" alt="EU Green Award" />
                <div className="eu-badge-text">EU Green Award Winner</div>
            </div>
        </div>
    );
}

export default DownloadPage;
