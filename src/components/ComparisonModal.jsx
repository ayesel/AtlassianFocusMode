import React from 'react';
import './ComparisonModal.css';

const ComparisonModal = ({ isOpen, onClose, selectedInsight }) => {
  if (!isOpen || !selectedInsight) return null;

  // Current ticket data (PT-1)
  const currentTicket = {
    id: 'PT-1',
    title: 'Display authentication error messages with retry options',
    team: 'Platform Team',
    assignee: 'Alex Chen',
    description: 'Users experiencing authentication errors need clear error messages that provide actionable guidance. Current error states are unclear and don\'t offer retry mechanisms, leading to user frustration and increased support tickets.',
    tags: ['Authentication', 'Error-Handling', 'User-Experience', 'Retry-Logic'],
    priority: 'High-Priority',
    timeframe: 'Current Sprint'
  };

  // Find overlapping tags
  const currentTags = currentTicket.tags.map(tag => tag.toLowerCase());
  const insightTags = selectedInsight.tags.map(tag => tag.toLowerCase());
  const overlappingTags = currentTags.filter(tag => 
    insightTags.some(insightTag => insightTag.includes(tag) || tag.includes(insightTag))
  );

  const isTagOverlapping = (tag) => {
    const lowerTag = tag.toLowerCase();
    return overlappingTags.some(overlapTag => 
      lowerTag.includes(overlapTag) || overlapTag.includes(lowerTag)
    );
  };

  return (
    <div className="comparison-modal-overlay">
      <div className="comparison-modal">
        <div className="comparison-modal-header">
          <h2>Compare Insights</h2>
          <button className="comparison-close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className="comparison-content">
          {/* Current Ticket - Left Side */}
          <div className="comparison-side current-ticket">
            <div className="comparison-card">
              <div className="comparison-card-header">
                <div className="header-left">
                  <div className="ticket-badge">
                    <i className="fa-solid fa-ticket"></i>
                    {currentTicket.id}
                  </div>
                  <span className="team-badge team-badge-platform">
                    <i className="fa-solid fa-laptop-code"></i>
                    {currentTicket.team}
                  </span>
                </div>
                <div className="header-right">
                  <span className={`priority-badge priority-${currentTicket.priority.toLowerCase().replace('-', '-')}`}>
                    {currentTicket.priority}
                  </span>
                </div>
              </div>
              
              <h3 className="comparison-title">{currentTicket.title}</h3>
              
              <div className="comparison-description">
                <p>{currentTicket.description}</p>
              </div>
              
              <div className="comparison-tags">
                {currentTicket.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`tag ${isTagOverlapping(tag) ? 'tag-overlap' : ''}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="comparison-meta">
                <div className="assignee-info">
                  <i className="fa-solid fa-user"></i>
                  <span>Assigned to {currentTicket.assignee}</span>
                </div>
                <span className="timeframe">{currentTicket.timeframe}</span>
              </div>
            </div>
          </div>
          
          {/* Selected Insight - Right Side */}
          <div className="comparison-side selected-insight">
            <div className="comparison-card">
              <div className="comparison-card-header">
                <div className="header-left">
                  <span className="insight-badge">
                    <i className="fa-solid fa-lightbulb"></i>
                    Insight
                  </span>
                  <span className={`team-badge ${
                    selectedInsight.team === 'Research Team' ? 'team-badge-research' :
                    selectedInsight.team === 'Platform Team' ? 'team-badge-platform' :
                    selectedInsight.team === 'Product Team' ? 'team-badge-product' :
                    selectedInsight.team === 'Design System Team' ? 'team-badge-design' : ''
                  }`}>
                    <i className={
                      selectedInsight.team === 'Research Team' ? 'fa-solid fa-flask' :
                      selectedInsight.team === 'Platform Team' ? 'fa-solid fa-laptop-code' :
                      selectedInsight.team === 'Design System Team' ? 'fa-solid fa-palette' :
                      selectedInsight.team === 'Product Team' ? 'fa-solid fa-laptop' :
                      'fa-solid fa-users'
                    }></i>
                    {selectedInsight.team}
                  </span>
                </div>
                <div className="header-right">
                  <span className={`priority-badge priority-${selectedInsight.priority.toLowerCase().replace('-', '-')}`}>
                    {selectedInsight.priority}
                  </span>
                </div>
              </div>
              
              <h3 className="comparison-title">{selectedInsight.title}</h3>
              
              <div className="comparison-description">
                <p>{selectedInsight.description}</p>
              </div>
              
              <div className="comparison-tags">
                {selectedInsight.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`tag ${isTagOverlapping(tag) ? 'tag-overlap' : ''}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="comparison-meta">
                <div className="assignee-info">
                  <i className="fa-solid fa-user"></i>
                  <span>Completed by {selectedInsight.assignee || 'Team Member'}</span>
                </div>
                <span className="timeframe">Completed {selectedInsight.completedDaysAgo} days ago</span>
              </div>
            </div>
          </div>
        </div>
        
        {overlappingTags.length > 0 && (
          <div className="comparison-footer">
            <div className="overlap-summary">
              <i className="fa-solid fa-circle-check"></i>
              <span>Found {overlappingTags.length} overlapping area{overlappingTags.length > 1 ? 's' : ''}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonModal;