import React, { useState, useEffect, useMemo } from 'react';
import './FocusModeTutorial.css';

const FocusModeTutorial = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const tutorialSteps = useMemo(() => [
    {
      id: 'welcome',
      title: 'Welcome to Focus Mode!',
      description: 'Let\'s take a quick tour of the powerful features that will help you find and organize relevant insights for your current work.',
      target: '.focus-mode-container',
      position: 'center',
      showHighlight: false,
      action: 'Let\'s get started!'
    },
    {
      id: 'search',
      title: 'AI-Powered Search',
      description: 'Use the search bar to find insights using natural language. Try searching for "authentication errors" or "user experience".',
      target: '.search-container',
      position: 'bottom',
      showHighlight: true,
      action: 'Next: Filtering'
    },
    {
      id: 'filters',
      title: 'Smart Filtering',
      description: 'Filter insights by team, category, time period, and priority. Mix and match filters to find exactly what you need.',
      target: '.filter-sections, .focus-sidebar .sidebar-section, .focus-sidebar',
      position: 'right',
      showHighlight: true,
      action: 'Next: View Options'
    },
    {
      id: 'views',
      title: 'View Options',
      description: 'Switch between list and tile views to see insights in different layouts. Choose what works best for your workflow.',
      target: '.view-controls',
      position: 'bottom',
      showHighlight: true,
      action: 'Next: Bookmarks'
    },
    {
      id: 'bookmark',
      title: 'Bookmark Important Items',
      description: 'Click the bookmark icon on any insight to save it for quick access later. Your bookmarks appear in the sidebar.',
      target: '.insight-card .card-actions button[title="Save for later"], .insight-card .card-actions button .fa-bookmark',
      position: 'left',
      showHighlight: true,
      action: 'Next: Comparison'
    },
    {
      id: 'compare',
      title: 'Compare with Current Work',
      description: 'Use the compare button to see how insights relate to your current ticket (PT-1). Find overlapping tags and relevant context.',
      target: '.insight-card .card-actions button[title="Compare with PT-1"], .insight-card .card-actions .fa-code-compare',
      position: 'left',
      showHighlight: true,
      action: 'Finish Tutorial'
    }
  ], []);

  useEffect(() => {
    const updateSpotlight = () => {
      const step = tutorialSteps[currentStep];
      if (!step.target || !step.showHighlight) return;

      // Try multiple selectors as fallbacks
      const selectors = step.target.split(',').map(s => s.trim());
      let targetElement = null;
      
      for (const selector of selectors) {
        targetElement = document.querySelector(selector);
        if (targetElement) break;
      }
      
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        document.documentElement.style.setProperty('--tutorial-spotlight-x', `${centerX}px`);
        document.documentElement.style.setProperty('--tutorial-spotlight-y', `${centerY}px`);
        document.documentElement.style.setProperty('--tutorial-spotlight-width', `${rect.width + 20}px`);
        document.documentElement.style.setProperty('--tutorial-spotlight-height', `${rect.height + 20}px`);
      } else {
        console.log(`Tutorial: Could not find target element for step ${step.id}:`, step.target);
      }
    };

    if (isOpen) {
      setIsVisible(true);
      // Delay spotlight positioning to ensure DOM is ready
      const timer = setTimeout(() => {
        updateSpotlight();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, currentStep, tutorialSteps]);

  const nextStep = () => {
    console.log(`Tutorial: Moving from step ${currentStep} (${tutorialSteps[currentStep].id}) to next step`);
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      console.log(`Tutorial: Now on step ${currentStep + 1} (${tutorialSteps[currentStep + 1].id})`);
    } else {
      console.log('Tutorial: Completing tutorial');
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    onClose();
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const getTutorialCardPosition = () => {
    const step = tutorialSteps[currentStep];
    if (step.position === 'center' || !step.target) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    // Try multiple selectors as fallbacks
    const selectors = step.target.split(',').map(s => s.trim());
    let targetElement = null;
    
    for (const selector of selectors) {
      targetElement = document.querySelector(selector);
      if (targetElement) break;
    }
    
    if (!targetElement) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    const rect = targetElement.getBoundingClientRect();
    const cardWidth = 450;
    const cardHeight = 200;
    const offset = 20;

    let position = {};

    switch (step.position) {
      case 'bottom':
        position = {
          top: `${rect.bottom + offset}px`,
          left: `${Math.max(20, Math.min(window.innerWidth - cardWidth - 20, rect.left + rect.width / 2 - cardWidth / 2))}px`
        };
        break;
      case 'top':
        position = {
          top: `${rect.top - cardHeight - offset}px`,
          left: `${Math.max(20, Math.min(window.innerWidth - cardWidth - 20, rect.left + rect.width / 2 - cardWidth / 2))}px`
        };
        break;
      case 'left':
        position = {
          top: `${Math.max(20, rect.top + rect.height / 2 - cardHeight / 2)}px`,
          left: `${rect.left - cardWidth - offset}px`
        };
        break;
      case 'right':
        position = {
          top: `${Math.max(20, rect.top + rect.height / 2 - cardHeight / 2)}px`,
          left: `${rect.right + offset}px`
        };
        break;
      default:
        position = {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }

    return position;
  };

  if (!isVisible) return null;

  const currentStepData = tutorialSteps[currentStep];

  return (
    <div className={`tutorial-overlay ${isVisible ? 'active' : ''}`}>
      {/* Dark backdrop with spotlight */}
      <div 
        className={`tutorial-backdrop ${currentStepData.showHighlight ? 'with-spotlight' : ''}`}
        onClick={skipTutorial}
      />
      
      {/* Tutorial card */}
      <div 
        className="tutorial-card"
        style={getTutorialCardPosition()}
        onClick={e => e.stopPropagation()}
      >
        <div className="tutorial-header">
          <div className="tutorial-progress">
            <span className="step-counter">{currentStep + 1} of {tutorialSteps.length}</span>
            <div className="progress-dots">
              {tutorialSteps.map((_, index) => (
                <span 
                  key={index} 
                  className={`progress-dot ${index <= currentStep ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
          <button className="tutorial-close" onClick={skipTutorial}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className="tutorial-content">
          <h3 className="tutorial-title">{currentStepData.title}</h3>
          <p className="tutorial-description">{currentStepData.description}</p>
        </div>
        
        <div className="tutorial-actions">
          {currentStep > 0 && (
            <button className="tutorial-btn tutorial-btn-secondary" onClick={prevStep}>
              <i className="fa-solid fa-arrow-left"></i>
              Previous
            </button>
          )}
          <div className="tutorial-actions-right">
            <button className="tutorial-btn tutorial-btn-ghost" onClick={skipTutorial}>
              Skip Tutorial
            </button>
            <button className="tutorial-btn tutorial-btn-primary" onClick={nextStep}>
              {currentStepData.action}
              {currentStep < tutorialSteps.length - 1 && <i className="fa-solid fa-arrow-right"></i>}
            </button>
          </div>
        </div>
      </div>
      
      {/* Rectangular spotlight overlays */}
      {currentStepData.showHighlight && (
        <>
          <div className="tutorial-spotlight-overlay tutorial-spotlight-top" />
          <div className="tutorial-spotlight-overlay tutorial-spotlight-bottom" />
          <div className="tutorial-spotlight-overlay tutorial-spotlight-left" />
          <div className="tutorial-spotlight-overlay tutorial-spotlight-right" />
          <div className="tutorial-spotlight-ring" />
        </>
      )}
    </div>
  );
};

export default FocusModeTutorial;