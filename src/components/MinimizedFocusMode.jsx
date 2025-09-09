import React, { useState, useEffect } from 'react';
import './MinimizedFocusMode.css';

const MinimizedFocusMode = ({ 
  isVisible, 
  onExpand, 
  onClose, 
  currentTicket = 'PT-1',
  ticketTitle = 'Authentication errors',
  insightsCount = 4,
  teamsCount = 3,
  lastUpdated = 0 // minutes ago
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  // Pulse animation every 3 seconds
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => setShowTooltip(true), 200);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
  };

  const formatLastUpdated = () => {
    if (lastUpdated === 0) return 'Just now';
    if (lastUpdated === 1) return '1 minute ago';
    return `${lastUpdated} minutes ago`;
  };

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={`minimized-focus-widget ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onExpand}
      >
        {/* Active session indicator */}
        <div className="session-indicator"></div>

        {/* Main content */}
        <div className="widget-content">
          {/* Left: Focus icon with pulse */}
          <div className="widget-icon">
            <i className={`fa-solid fa-lightbulb ${pulseCount > 0 ? 'pulse' : ''}`}></i>
          </div>

          {/* Center: Session info */}
          <div className="widget-info">
            <div className="session-title">Focus Session Active</div>
            <div className="session-context">
              {currentTicket}: {ticketTitle}
            </div>
          </div>

          {/* Right: Action buttons */}
          <div className="widget-actions">
            <button 
              className="action-btn expand-btn" 
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
              title="Expand Focus Mode"
            >
              <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
            </button>
            <button 
              className="action-btn close-btn" 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              title="Close Focus Session"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Hover preview */}
        {showTooltip && (
          <div className="widget-preview">
            <div className="preview-content">
              <div className="preview-stats">
                <span className="stat-item">
                  <i className="fa-solid fa-lightbulb"></i>
                  {insightsCount} insights discovered
                </span>
                <span className="stat-separator">•</span>
                <span className="stat-item">
                  <i className="fa-solid fa-users"></i>
                  {teamsCount} teams
                </span>
              </div>
              <div className="preview-timestamp">
                Last updated {formatLastUpdated()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click overlay to detect clicks outside */}
      <div className="widget-overlay" onClick={onExpand}></div>
    </>
  );
};

export default MinimizedFocusMode;