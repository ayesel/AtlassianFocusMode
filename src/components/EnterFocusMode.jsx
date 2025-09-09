import React, { useState, useEffect } from 'react';
import './EnterFocusMode.css';

const EnterFocusMode = ({ isOpen, onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingText, setLoadingText] = useState('Scanning cross-project relationships...');
  const [loadedCategories, setLoadedCategories] = useState([]);
  
  const categories = [
    { 
      id: 'research', 
      name: 'Research Insights', 
      icon: 'fa-solid fa-chart-line',
      description: 'User research, A/B tests, and behavioral data from checkout work',
      findings: 4
    },
    { 
      id: 'decisions', 
      name: 'Past Decisions', 
      icon: 'fa-solid fa-clock-rotate-left',
      description: 'Past design patterns and architectural decisions',
      findings: 6
    },
    { 
      id: 'crossteam', 
      name: 'Cross-Team Work', 
      icon: 'fa-solid fa-users',
      description: 'Initiatives from Platform, Design System, and Analytics teams',
      findings: 12
    },
    { 
      id: 'technical', 
      name: 'Technical Constraints', 
      icon: 'fa-solid fa-wrench',
      description: 'Security, performance, and integration requirements',
      findings: 8
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setLoadedCategories([]);
      setCurrentStep(0);
      setLoadingText('Scanning cross-project relationships...');
      return;
    }

    const loadingSteps = [
      'Scanning cross-project relationships...',
      'Analyzing project ecosystem...',
      'Gathering insights from teams...',
      'Connecting related work...',
      'Finalizing discovery...'
    ];

    // Update loading text
    const textInterval = setInterval(() => {
      setCurrentStep(prev => {
        const next = (prev + 1) % loadingSteps.length;
        setLoadingText(loadingSteps[next]);
        return next;
      });
    }, 2000);

    // Load categories one by one with smooth timing
    const loadCategory = (index) => {
      if (index < categories.length) {
        setTimeout(() => {
          setLoadedCategories(prev => [...prev, categories[index].id]);
          loadCategory(index + 1);
        }, 1200); // Increased delay for smoother loading
      } else {
        // All categories loaded, wait a bit then complete
        setTimeout(() => {
          setLoadingText('Analysis complete!');
          setTimeout(() => {
            onComplete();
          }, 1500);
        }, 800);
      }
    };

    // Start loading after initial delay
    setTimeout(() => {
      loadCategory(0);
    }, 1500);

    return () => {
      clearInterval(textInterval);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="enter-focus-overlay">
      <div className="enter-focus-modal">
        <div className="modal-header">
          <div className="loading-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <h1>Discovering Related Work...</h1>
          <p className="header-description">
            Analyzing your project ecosystem to surface relevant insights and connections across teams...
          </p>
        </div>

        <div className="loading-status">
          <div className="loading-spinner"></div>
          <span className="loading-text">{loadingText}</span>
        </div>

        <div className="categories-preview">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className={`category-card ${loadedCategories.includes(category.id) ? 'loaded' : ''}`}
            >
              <div className="category-header">
                <i className={category.icon}></i>
                <h3>{category.name}</h3>
                {loadedCategories.includes(category.id) && (
                  <div className="findings-badge">
                    <span>Findings</span>
                    <span className="count">{category.findings}</span>
                  </div>
                )}
              </div>
              <p className="category-description">{category.description}</p>
              {!loadedCategories.includes(category.id) && (
                <div className="category-loading-bar">
                  <div className="loading-progress"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            <i className="fa-solid fa-arrow-left"></i>
            Return to Ticket
          </button>
          <button 
            className={`continue-btn ${loadedCategories.length === categories.length ? 'ready' : ''}`}
            disabled={loadedCategories.length !== categories.length}
            onClick={onComplete}
          >
            <i className="fa-solid fa-lightbulb"></i>
            Enter Focus workspace
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterFocusMode;