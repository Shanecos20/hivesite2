import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import styles from '../css/GetStarted.module.css';
import { getApiUrl } from '../config/api';

const GetStartedPage = () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // State management
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // References for animations
  const pageRefs = {
    subtitle: useRef(null),
    title: useRef(null),
    description: useRef(null),
    form: useRef(null),
    success: useRef(null)
  };

  const blobsRef = useRef([]);

  // Function to add elements to refs arrays
  const addToRef = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      // Send email to backend to store in database
      const response = await fetch(getApiUrl('/api/preorder'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit email');
      }
      
      // Show success message
      setSubmitted(true);
      
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Apply animations on mount
  useEffect(() => {
    // Add the animation class to make elements appear
    const elements = [
      pageRefs.subtitle?.current,
      pageRefs.title?.current,
      pageRefs.description?.current
    ];

    elements.forEach((el, index) => {
      if (el) {
        el.classList.add(styles.fade_up_in);
        el.style.animationDelay = `${0.2 * index}s`;
      }
    });

    // Animate form or success message
    if (!submitted && pageRefs.form?.current) {
      pageRefs.form.current.classList.add(styles.fade_up_in);
      pageRefs.form.current.style.animationDelay = "0.4s";
    } else if (submitted && pageRefs.success?.current) {
      pageRefs.success.current.classList.add(styles.fade_up_in);
      pageRefs.success.current.style.animationDelay = "0.2s";
    }

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

    // Cleanup function
    return () => {
      gsap.killTweensOf("*");
    };
  }, [submitted]);

  return (
    <div className={styles.page_container}>
      {/* Honeycomb Grid Background */}
      <div className={styles.honeycomb_grid}></div>
      
      {/* Decorative Blobs */}
      <div className={styles.blob_container}>
        <div 
          className={styles.blob} 
          style={{ width: '400px', height: '400px', top: '-100px', left: '-100px' }} 
          ref={el => addToRef(el, blobsRef)}>
        </div>
        <div 
          className={styles.blob} 
          style={{ width: '500px', height: '500px', top: '30%', right: '-150px' }} 
          ref={el => addToRef(el, blobsRef)}>
        </div>
        <div 
          className={styles.blob} 
          style={{ width: '300px', height: '300px', bottom: '-50px', left: '40%' }} 
          ref={el => addToRef(el, blobsRef)}>
        </div>
      </div>
      
      <div className={styles.content}>
        {/* Page Header */}
        <div className={styles.page_header}>
          <div ref={pageRefs.subtitle} className={styles.subtitle}>
            EU Green Award Winner
          </div>
          <h1 ref={pageRefs.title} className={styles.title}>
            Get Notified When We Launch
          </h1>
          <p ref={pageRefs.description} className={styles.description}>
            Be the first to know when our smart beekeeping monitoring system launches. 
            Enter your email below to join our waiting list.
          </p>
        </div>
        
        {!submitted ? (
          <form 
            ref={pageRefs.form}
            className={styles.email_form} 
            onSubmit={handleSubmit}
          >
            <div className={styles.form_logo_container}>
              <img src="/assets/HiveBoxLogo.png" alt="HIVE Logo" className={styles.form_logo} />
            </div>
            
            <h3 className={styles.form_heading}>Join Our Beekeeping Community</h3>
            
            <div className={styles.form_group}>
              <label className={styles.form_label}>Email Address</label>
              <div className={styles.input_with_icon}>
                <input
                  type="email"
                  className={styles.form_input}
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  disabled={loading}
                />
                <div className={styles.email_icon}>✉</div>
              </div>
              {error && <div className={styles.error_message}>{error}</div>}
            </div>
            
            <button 
              type="submit" 
              className={styles.submit_button}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Notify Me'}
            </button>
            
            <div className={styles.form_footer}>
              <div className={styles.form_separator}>
                <span>Benefits</span>
              </div>
              <div className={styles.benefits_list}>
                <div className={styles.benefit_item}>
                  <div className={styles.benefit_icon}>✓</div>
                  <span>Early access to product launch</span>
                </div>
                <div className={styles.benefit_item}>
                  <div className={styles.benefit_icon}>✓</div>
                  <span>Exclusive newsletter updates</span>
                </div>
                <div className={styles.benefit_item}>
                  <div className={styles.benefit_icon}>✓</div>
                  <span>Special launch discounts</span>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div ref={pageRefs.success} className={styles.success_container}>
            <div className={styles.form_logo_container}>
              <img src="/assets/HiveBoxLogo.png" alt="HIVE Logo" className={styles.form_logo} />
            </div>
            <div className={styles.success_icon}>✓</div>
            <h2 className={styles.success_title}>Thank You For Pre-ordering!</h2>
            <p className={styles.success_message}>
              Your email has been registered. We'll notify you as soon as our HIVE monitoring kits 
              are available for purchase. Thank you for your interest in HIVE Smart Beekeeping!
            </p>
            
            <Link to="/" className={styles.home_button}>
              Return to Homepage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStartedPage; 