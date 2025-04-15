import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './index.css'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import DownloadPage from './pages/DownloadPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import MissionPage from './pages/MissionPage.jsx'

// ScrollToTop component to ensure page scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Force refresh of any active GSAP animations/ScrollTriggers
    if (typeof window !== 'undefined') {
      // Immediately dispatch resize event
      window.dispatchEvent(new Event('resize'));
      
      // Set up multiple refresh attempts with increasing delays
      // This helps ensure animations initialize properly regardless of when content loads
      const refreshDelays = [50, 150, 300, 600];
      
      const refreshTimeouts = refreshDelays.map(delay => {
        return setTimeout(() => {
          console.log(`GSAP refresh at ${delay}ms`);
          window.dispatchEvent(new Event('resize'));
          
          // Also try to refresh ScrollTrigger if available
          try {
            const refreshScrollTrigger = async () => {
              try {
                const { ScrollTrigger } = await import('gsap/ScrollTrigger');
                if (ScrollTrigger && ScrollTrigger.refresh) {
                  ScrollTrigger.refresh();
                }
              } catch (e) {
                // Silent fail if GSAP/ScrollTrigger isn't available yet
              }
            };
            
            refreshScrollTrigger();
          } catch (e) {
            // Silent fail if import fails
          }
        }, delay);
      });
      
      return () => {
        refreshTimeouts.forEach(timeout => clearTimeout(timeout));
      };
    }
  }, [pathname]);
  
  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="download" element={<DownloadPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="mission" element={<MissionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
