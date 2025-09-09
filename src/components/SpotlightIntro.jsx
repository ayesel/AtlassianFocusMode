import React, { useState, useEffect } from 'react';
import './SpotlightIntro.css';
import Tags from './Tags';

const SpotlightIntro = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // For development: Show intro on every reload (comment out for production)
    localStorage.removeItem('focusModeIntroSeen');
    
    // Check if user has seen the intro before
    const hasSeenIntro = localStorage.getItem('focusModeIntroSeen');
    
    // For development: Add a way to reset the intro by pressing Ctrl+R
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'r' && e.ctrlKey) {
        localStorage.removeItem('focusModeIntroSeen');
        window.location.reload();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    if (!hasSeenIntro) {
      setIsVisible(true);
      
      // Calculate Focus Mode button position
      setTimeout(() => {
        const focusButton = document.querySelector('.focus-mode-btn');
        if (focusButton) {
          const rect = focusButton.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Update CSS custom properties for spotlight position
          document.documentElement.style.setProperty('--spotlight-x', `${centerX}px`);
          document.documentElement.style.setProperty('--spotlight-y', `${centerY}px`);
        }
        setStep(1);
      }, 300);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleClose = () => {
    setStep(2); // Animate out
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('focusModeIntroSeen', 'true');
      onClose();
    }, 300);
  };

  const handleTryIt = () => {
    handleClose();
    // Find and click the Focus Mode button
    const focusButton = document.querySelector('.focus-mode-btn');
    if (focusButton) {
      focusButton.click();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`spotlight-overlay ${step === 1 ? 'active' : ''} ${step === 2 ? 'closing' : ''}`}>
      <div className="spotlight-backdrop" onClick={handleClose}></div>
      
      {/* Spotlight circle */}
      <div className="spotlight-circle"></div>
      
      {/* Intro content */}
      <div className="spotlight-content">
        <div className="spotlight-card">
          <div className="spotlight-header">
            <div className="spotlight-icon">
              <i className="fa-solid fa-lightbulb"></i>
            </div>
            <h2>Introducing Focus Mode</h2>
            <button className="spotlight-close" onClick={handleClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          
          <div className="spotlight-body">
            <p>
              Discover relevant insights from across your organization. Focus Mode analyzes 
              your project ecosystem to surface related work, research, and decisions.
            </p>
            
            <div className="spotlight-features">
              <Tags icon="fa-solid fa-chart-line" text="Research Insights" variant="primary" />
              <Tags icon="fa-solid fa-users" text="Cross-Team Work" variant="primary" />
              <Tags icon="fa-solid fa-clock-rotate-left" text="Past Decisions" variant="primary" />
            </div>
          </div>
          
          <div className="spotlight-footer">
            <button className="btn-secondary" onClick={handleClose}>
              Maybe Later
            </button>
            <button className="btn-primary" onClick={handleTryIt}>
              <i className="fa-solid fa-lightbulb"></i>
              Try Focus Mode
            </button>
          </div>
        </div>
        
        {/* Arrow pointing to Focus Mode button */}
        <div className="spotlight-arrow">
          <div className="arrow-line"></div>
          <div className="arrow-tip"></div>
        </div>
      </div>
    </div>
  );
};

export default SpotlightIntro;