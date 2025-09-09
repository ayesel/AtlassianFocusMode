import React, { useState, useEffect, useMemo } from 'react';
import './EnterFocusMode.css';

const EnterFocusMode = ({ isOpen, onComplete, onCancel }) => {
  const [loadingText, setLoadingText] = useState('Scanning cross-project relationships...');
  const [loadedCategories, setLoadedCategories] = useState([]);
  
  const categories = useMemo(() => [
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
  ], []);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setLoadedCategories([]);
      setLoadingText('Scanning cross-project relationships...');
      return;
    }

    let cancelled = false;

    const loadingSteps = [
      'Scanning cross-project relationships...',
      'Analyzing project ecosystem...',
      'Gathering insights from teams...',
      'Connecting related work...',
      'Finalizing discovery...'
    ];

    // Update loading text
    let currentStep = 0;
    const textInterval = setInterval(() => {
      if (cancelled) return;
      currentStep = (currentStep + 1) % loadingSteps.length;
      setLoadingText(loadingSteps[currentStep]);
    }, 2000);

    // Load categories one by one with smooth timing
    const loadCategory = (index) => {
      if (cancelled || index >= categories.length) return;
      
      setTimeout(() => {
        if (cancelled) return;
        setLoadedCategories(prev => {
          if (cancelled) return prev;
          return [...prev, categories[index].id];
        });
        loadCategory(index + 1);
      }, 1200);
    };

    // Complete sequence when all categories are loaded
    const completeSequence = () => {
      if (cancelled) return;
      setTimeout(() => {
        if (cancelled) return;
        setLoadingText('Analysis complete!');
        setTimeout(() => {
          if (cancelled) return;
          onComplete();
        }, 1500);
      }, 800);
    };

    // Start loading after initial delay
    const startTimeout = setTimeout(() => {
      if (cancelled) return;
      loadCategory(0);
      // Complete after all categories should be loaded
      setTimeout(() => {
        if (cancelled) return;
        completeSequence();
      }, categories.length * 1200 + 500);
    }, 1500);

    return () => {
      cancelled = true;
      clearInterval(textInterval);
      clearTimeout(startTimeout);
    };
  }, [isOpen, categories]);

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