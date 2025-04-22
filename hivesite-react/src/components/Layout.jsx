import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from '../css/Layout.module.css';

function Layout() {
    const location = useLocation(); // Hook to get the current path
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Handle page navigation and cleanup
    useEffect(() => {
        // Kill any GSAP animations that might be running
        const cleanupGSAP = async () => {
            try {
                const gsapModule = await import('gsap');
                const scrollTriggerModule = await import('gsap/ScrollTrigger');
                
                const gsap = gsapModule.default;
                const ScrollTrigger = scrollTriggerModule.default;
                
                // Register ScrollTrigger plugin
                gsap.registerPlugin(ScrollTrigger);
                
                // Kill all animations and ScrollTriggers
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
                gsap.killTweensOf("*");
                
                // Force refresh after small delay
                setTimeout(() => {
                    ScrollTrigger.refresh();
                    window.dispatchEvent(new Event('resize'));
                }, 50);
            } catch (error) {
                console.error("Error cleaning up GSAP animations:", error);
            }
        };
        
        cleanupGSAP();
        
        // Scroll to top on page navigation
        window.scrollTo(0, 0);
        
        // Close mobile menu when navigating
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Initialization effect that runs once for direct page loads
    useEffect(() => {
        // Force a refresh on initial load
        const initialGSAPSetup = async () => {
            try {
                // Small delay to let the DOM render
                setTimeout(async () => {
                    const gsapModule = await import('gsap');
                    const scrollTriggerModule = await import('gsap/ScrollTrigger');
                    
                    const gsap = gsapModule.default;
                    const ScrollTrigger = scrollTriggerModule.default;
                    
                    // Register ScrollTrigger plugin
                    gsap.registerPlugin(ScrollTrigger);
                    
                    // Force refresh to properly set up animations
                    ScrollTrigger.refresh();
                    window.dispatchEvent(new Event('resize'));
                    
                    // Second refresh after slightly longer delay
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                        window.dispatchEvent(new Event('resize'));
                    }, 300);
                }, 50);
            } catch (error) {
                console.error("Error setting up initial GSAP:", error);
            }
        };
        
        initialGSAPSetup();
    }, []); // Empty dependency array means this runs once on mount

    // Navbar Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check in case the page loads already scrolled
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // EU Green Award Badge Animation
    useEffect(() => {
        const loadGSAP = async () => {
            try {
                const gsapModule = await import('gsap');
                const gsap = gsapModule.default;
                
                const euBadge = document.getElementById('eu-badge');
                if (!euBadge) return;
        
                // Initially hide the badge
                gsap.set(euBadge, { opacity: 0, scale: 0.8, y: 20 });
                
                // Animate it in with a small delay
                gsap.to(euBadge, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    delay: 1.5
                });
                
                // Optional pulse animation that repeats a few times
                gsap.to(euBadge, {
                    scale: 1.05,
                    duration: 0.8,
                    repeat: 3,
                    yoyo: true,
                    delay: 2.5
                });
            } catch (error) {
                console.error("Error loading GSAP for badge animation:", error);
            }
        };
        
        loadGSAP();
    }, [location.pathname]); // Re-run on route change

    // Custom Cursor Logic
    useEffect(() => {
        const loadGSAP = async () => {
            try {
                const gsapModule = await import('gsap');
                const gsap = gsapModule.default;
                
                const cursor = document.getElementById('custom-cursor');
                if (!cursor) return;
        
                // Query for hoverable elements
                const cursorHoverElements = document.querySelectorAll(
                    'a, button, .platform-button, .faq-question, .feature-card, .testimonial-dot, .app-store-button'
                );
        
                const onMouseMove = (e) => {
                    gsap.to(cursor, {
                        x: e.clientX,
                        y: e.clientY,
                        duration: 0.2,
                    });
                };
        
                document.addEventListener('mousemove', onMouseMove);
                
                const onMouseEnter = () => cursor.classList.add(styles.hover);
                const onMouseLeave = () => cursor.classList.remove(styles.hover);
                
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
            } catch (error) {
                console.error("Error loading GSAP for cursor animation:", error);
            }
        };
        
        const cleanupFunc = loadGSAP();
        
        return () => {
            if (cleanupFunc && typeof cleanupFunc === 'function') {
                cleanupFunc();
            }
        };
    }, [location.pathname]); // Re-run on route change

    // Helper function to determine if a link is active
    const isNavLinkActive = (path) => {
        // Handle the base path explicitly
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    // Custom navigation handler
    const handleNavigation = (e, to) => {
        e.preventDefault();
        
        // If clicking on the already active page, just ignore
        if (location.pathname === to) {
            return;
        }
        
        // Navigate to the new page
        navigate(to);
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    
    // Close mobile menu when a link is clicked
    const handleMobileNavigation = (e, to) => {
        handleNavigation(e, to);
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Custom Cursor */}
            <div id="custom-cursor" className={styles.custom_cursor}></div>

            {/* Navbar */}
            <nav id="navbar" className={styles.navbar}>
                <Link to="/" className={styles.logo} onClick={(e) => handleNavigation(e, '/')}>
                    <img src="/src/assets/logov3.png" alt="HIVE Logo" className={styles.logo_img} />
                </Link>
                <div className={`${styles.nav_links_container} ${scrolled ? styles.nav_links_scrolled : ''}`}>
                    <div className={styles.nav_links}>
                        <Link to="/" onClick={(e) => handleNavigation(e, '/')} className={`${styles.nav_link} ${isNavLinkActive('/') ? styles.active : ''}`}>Home</Link>
                        <Link to="/download" onClick={(e) => handleNavigation(e, '/download')} className={`${styles.nav_link} ${isNavLinkActive('/download') ? styles.active : ''}`}>Download</Link>
                        <Link to="/about" onClick={(e) => handleNavigation(e, '/about')} className={`${styles.nav_link} ${isNavLinkActive('/about') ? styles.active : ''}`}>About</Link>
                        <Link to="/mission" onClick={(e) => handleNavigation(e, '/mission')} className={`${styles.nav_link} ${isNavLinkActive('/mission') ? styles.active : ''}`}>Mission</Link>
                        <Link to="/contact" onClick={(e) => handleNavigation(e, '/contact')} className={`${styles.nav_link} ${isNavLinkActive('/contact') ? styles.active : ''}`}>Contact</Link>
                    </div>
                </div>
                <Link to="/get-started" onClick={(e) => handleNavigation(e, '/get-started')} className={styles.cta_button}>Get Started</Link>
            </nav>
            
            {/* Mobile Menu Button - Moved outside nav */}
            <button className={`${styles.mobile_menu_btn} ${mobileMenuOpen ? styles.menu_open : ''}`} onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
                <div className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            
            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobile_menu} ${mobileMenuOpen ? styles.open : ''}`}>
                <div className={styles.mobile_menu_links}>
                    <Link to="/" onClick={(e) => handleMobileNavigation(e, '/')} className={`${styles.mobile_nav_link} ${isNavLinkActive('/') ? styles.active : ''}`}>Home</Link>
                    <Link to="/download" onClick={(e) => handleMobileNavigation(e, '/download')} className={`${styles.mobile_nav_link} ${isNavLinkActive('/download') ? styles.active : ''}`}>Download</Link>
                    <Link to="/about" onClick={(e) => handleMobileNavigation(e, '/about')} className={`${styles.mobile_nav_link} ${isNavLinkActive('/about') ? styles.active : ''}`}>About</Link>
                    <Link to="/mission" onClick={(e) => handleMobileNavigation(e, '/mission')} className={`${styles.mobile_nav_link} ${isNavLinkActive('/mission') ? styles.active : ''}`}>Mission</Link>
                    <Link to="/contact" onClick={(e) => handleMobileNavigation(e, '/contact')} className={`${styles.mobile_nav_link} ${isNavLinkActive('/contact') ? styles.active : ''}`}>Contact</Link>
                    <Link to="/get-started" onClick={(e) => handleMobileNavigation(e, '/get-started')} className={`${styles.mobile_cta_button}`}>Get Started</Link>
                </div>
            </div>

            {/* Main content area where routed components will render */}
            <main className={styles.main_content}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footer_content}>
                    <div className={styles.footer_column}>
                        <div className={styles.footer_logo}>
                            <img src="/src/assets/logov4.png" alt="HIVE Logo" className={styles.footer_logo_img} />
                        </div>
                        <p className={styles.footer_description}>Revolutionizing beekeeping through innovative IoT technology and AI-driven insights to create a sustainable future for bees and beekeepers.</p>
                        <div className={styles.footer_social}>
                            <a href="#" className={styles.footer_social_link}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" fill="#FFFFFF"/>
                                </svg>
                            </a>
                            <a href="#" className={styles.footer_social_link}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" fill="#FFFFFF"/>
                                </svg>
                            </a>
                            <a href="#" className={styles.footer_social_link}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" fill="#FFFFFF"/>
                                </svg>
                            </a>
                            <a href="#" className={styles.footer_social_link}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="#FFFFFF"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className={styles.footer_column}>
                        <h3 className={styles.footer_title}>Company</h3>
                        <div className={styles.footer_links}>
                            <Link to="/about" className={styles.footer_link}>About Us</Link>
                            <Link to="/mission" className={styles.footer_link}>Our Mission</Link>
                            <Link to="/team" className={styles.footer_link}>Team</Link>
                            <Link to="/careers" className={styles.footer_link}>Careers</Link>
                            <Link to="/press" className={styles.footer_link}>Press</Link>
                        </div>
                    </div>
                    <div className={styles.footer_column}>
                        <h3 className={styles.footer_title}>Product</h3>
                        <div className={styles.footer_links}>
                            <Link to="/features" className={styles.footer_link}>Features</Link>
                            <Link to="/pricing" className={styles.footer_link}>Pricing</Link>
                            <Link to="/download" className={styles.footer_link}>Download</Link>
                            <Link to="/integration" className={styles.footer_link}>Integration</Link>
                            <Link to="/api" className={styles.footer_link}>API</Link>
                        </div>
                    </div>
                    <div className={styles.footer_column}>
                        <h3 className={styles.footer_title}>Resources</h3>
                        <div className={styles.footer_links}>
                            <Link to="/docs" className={styles.footer_link}>Documentation</Link>
                            <Link to="/guides" className={styles.footer_link}>Guides</Link>
                            <Link to="/support" className={styles.footer_link}>Support Center</Link>
                            <Link to="/community" className={styles.footer_link}>Community</Link>
                            <Link to="/blog" className={styles.footer_link}>Blog</Link>
                        </div>
                    </div>
                    <div className={styles.footer_column}>
                        <h3 className={styles.footer_title}>Contact</h3>
                        <div className={styles.footer_links}>
                            <Link to="/contact" className={styles.footer_link}>Contact Us</Link>
                            <Link to="/support" className={styles.footer_link}>Support</Link>
                            <Link to="/sales" className={styles.footer_link}>Sales</Link>
                            <Link to="/partnerships" className={styles.footer_link}>Partnerships</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.footer_copyright}>
                    <p>© 2025 HIVE - Honeybee Innovation for Vibrant Ecosystems. All rights reserved.</p>
                </div>
            </footer>

            {/* EU Green Award Badge */}
            <div id="eu-badge" className={styles.eu_badge}>
                <img src="/api/placeholder/30/30" alt="EU Green Award" />
                <div className={styles.eu_badge_text}>EU Green Award Winner</div>
            </div>
        </>
    );
}

export default Layout;