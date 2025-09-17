import React, { useState } from 'react';
import Tags from './Tags';
import './InsightDetailsModal.css';

const InsightDetailsModal = ({ isOpen, onClose, insight }) => {
  const [activeTab, setActiveTab] = useState('details');
  
  if (!isOpen || !insight) return null;

  // Sample extended data for deep dive
  const extendedData = {
    research: {
      fullContext: `This insight emerged from our Q3 2024 checkout optimization initiative. 
      After analyzing 50,000+ user sessions, we discovered that 68% of cart abandonments 
      occurred at the payment step, with users spending an average of 3.2 minutes on the 
      payment form before abandoning.`,
      methodology: `We conducted a mixed-methods study combining:
      • Quantitative analysis of 50,000 user sessions
      • 25 user interviews with customers who abandoned carts
      • A/B testing with 5 different checkout flow variations
      • Heatmap and scroll depth analysis on payment pages`,
      keyFindings: [
        'Users were confused by the credit card field auto-formatting',
        'Mobile users struggled with the expiry date selector',
        '42% of users attempted to use saved payment methods that failed',
        'Error messages were unclear, leading to repeated failed attempts'
      ]
    },
    decisions: {
      fullContext: `The Design System team established new form validation patterns in 2023 
      that significantly improved user comprehension and reduced errors by 34%. These patterns 
      were adopted across 12 different product teams and became our standard approach.`,
      methodology: `Decision process included:
      • Review of 8 competing validation approaches
      • Accessibility audit with WCAG 2.1 compliance
      • Performance testing across different devices
      • User testing with 50 participants`,
      keyFindings: [
        'Inline validation reduced errors by 34%',
        'Real-time feedback improved completion rates by 23%',
        'Clear error messages with suggested fixes had 89% success rate',
        'Progressive disclosure worked better than showing all fields at once'
      ]
    },
    crossteam: {
      fullContext: `The Platform team's new API gateway implementation provides standardized 
      error handling and retry logic that can resolve the timeout issues you're experiencing. 
      This was rolled out in response to similar issues faced by the Payments and Identity teams.`,
      methodology: `Cross-team collaboration included:
      • Architecture review with 5 engineering teams
      • Load testing with 10x current traffic
      • Gradual rollout across 3 months
      • Weekly sync meetings with stakeholders`,
      keyFindings: [
        'Reduced API timeout errors by 78%',
        'Improved retry logic handles 95% of transient failures',
        'Standardized error codes across all services',
        'Built-in circuit breaker prevents cascade failures'
      ]
    },
    technical: {
      fullContext: `Security requirements mandate OAuth 2.0 implementation with PKCE flow 
      for all public clients. This affects your authentication implementation and requires 
      specific changes to how tokens are handled and stored.`,
      methodology: `Technical analysis covered:
      • Security audit by external firm
      • Penetration testing on staging environment
      • Performance benchmarking with 1M requests/hour
      • Compliance review for SOC2 and GDPR`,
      keyFindings: [
        'PKCE flow required for all public clients by Q1 2025',
        'Token rotation must happen every 15 minutes',
        'Refresh tokens limited to 7-day lifetime',
        'All tokens must be stored in secure, httpOnly cookies'
      ]
    }
  };

  const getExtendedData = () => {
    const category = insight.category.toLowerCase().replace(' ', '');
    return extendedData[category] || extendedData.research;
  };

  const data = getExtendedData();

  // Sample metrics data
  const metrics = {
    impact: insight.category === 'Research Insights' ? '68% cart abandonment' : '34% error reduction',
    timeline: insight.category === 'Technical Constraints' ? 'Required by Q1 2025' : 'Implemented Q3 2024',
    adoption: insight.category === 'Cross-Team Work' ? '12 teams adopted' : '50,000 users analyzed',
    priority: insight.category === 'Technical Constraints' ? 'High' : insight.category === 'Research Insights' ? 'Medium' : 'Low'
  };

  // Sample data sources
  const sources = [
    { type: 'report', name: 'Q3 2024 Checkout Analysis', url: '#' },
    { type: 'dashboard', name: 'Real-time Metrics Dashboard', url: '#' },
    { type: 'confluence', name: 'Implementation Guide', url: '#' },
    { type: 'jira', name: 'Original Research Ticket', url: '#' }
  ];

  return (
    <div className="insight-details-overlay" onClick={onClose}>
      <div className="insight-details-modal jira-style" onClick={(e) => e.stopPropagation()}>
        {/* Enhanced Modal Header */}
        <div className="modal-header">
          <div className="header-container">
            <div className="header-top-bar">
              <div className="header-left">
                <span className={`category-badge ${insight.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <i className={insight.icon}></i>
                  {insight.category}
                </span>
              </div>
              <div className="header-actions">
                <button className="header-action-btn" title="Share">
                  <i className="fa-solid fa-share"></i>
                </button>
                <button className="header-action-btn" title="More actions">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
                <button className="header-action-btn" title="Close" onClick={onClose}>
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Jira-style Content Layout */}
        <div className="jira-content">
          {/* Left Main Content */}
          <div className="main-content">
            {/* Tab Navigation */}
            <div className="tab-navigation">
              <button 
                className={`tab ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button 
                className={`tab ${activeTab === 'analysis' ? 'active' : ''}`}
                onClick={() => setActiveTab('analysis')}
              >
                Analysis
              </button>
              <button 
                className={`tab ${activeTab === 'sources' ? 'active' : ''}`}
                onClick={() => setActiveTab('sources')}
              >
                Sources & Links
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'details' && (
                <div className="details-tab jira-ticket-view">
                  {/* Ticket Structure matching main page cards */}
                  <div className="ticket-card-header">
                    <div className="ticket-card-meta">
                      <div className="ticket-card-meta-left">
                        <span className={`team-badge ${
                          insight.team === 'Research Team' ? 'team-badge-research' :
                          insight.team === 'Platform Team' ? 'team-badge-platform' :
                          insight.team === 'Product Team' ? 'team-badge-product' :
                          insight.team === 'Design System Team' ? 'team-badge-design' : ''
                        }`}>
                          <i className={
                            insight.team === 'Research Team' ? 'fa-solid fa-flask' :
                            insight.team === 'Platform Team' ? 'fa-solid fa-laptop-code' :
                            insight.team === 'Design System Team' ? 'fa-solid fa-palette' :
                            insight.team === 'Product Team' ? 'fa-solid fa-laptop' :
                            'fa-solid fa-users'
                          }></i> {insight.team}
                        </span>
                      </div>
                      <div className="ticket-card-meta-right">
                        <Tags 
                          text={metrics.priority} 
                          variant={
                            metrics.priority === 'High' ? 'danger' : 
                            metrics.priority === 'Medium' ? 'warning' : 
                            'success'
                          } 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h1 className="ticket-card-title">{insight.title}</h1>
                  
                  <div className="ticket-card-description">
                    {data.fullContext}
                  </div>
                  
                  <div className="ticket-comments-section">
                    <h4>Comments</h4>
                    <div className="comment-item">
                      <div className="comment-header">
                        <div className="comment-avatar">
                          <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="comment-meta">
                          <span className="comment-author">Research Team</span>
                          <span className="comment-time">Added 3 days ago</span>
                        </div>
                      </div>
                      <div className="comment-body">
                        {data.methodology}
                      </div>
                    </div>
                  </div>
                  
                  
                  <div className="ticket-card-tags">
                    {insight.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="ticket-card-footer">
                    <div className="ticket-footer-info">
                      <div className="ticket-assignee-info">
                        <i className="fa-solid fa-user"></i>
                        <span>{insight.assignee || 'Team Member'}</span>
                      </div>
                      <span className="ticket-completion-info">Completed {insight.completedDaysAgo} days ago</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analysis' && (
                <div className="analysis-tab">
                  <div className="findings-section">
                    <h3>Key Findings</h3>
                    <ul className="findings-list">
                      {data.keyFindings.map((finding, index) => (
                        <li key={index}>
                          <i className="fa-solid fa-check-circle"></i>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="impact-metrics-section">
                    <h3>Business Metrics</h3>
                    <div className="metrics-grid">
                      <div className="metric-card">
                        <span className="metric-label">Business Impact</span>
                        <span className="metric-value">{metrics.impact}</span>
                      </div>
                      <div className="metric-card">
                        <span className="metric-label">Timeline</span>
                        <span className="metric-value">{metrics.timeline}</span>
                      </div>
                      <div className="metric-card">
                        <span className="metric-label">Adoption</span>
                        <span className="metric-value">{metrics.adoption}</span>
                      </div>
                      <div className="metric-card">
                        <span className="metric-label">Priority</span>
                        <span className="metric-value priority-indicator">{metrics.priority}</span>
                      </div>
                    </div>
                  </div>

                  <div className="visuals-section">
                    <h3>Visual Analysis</h3>
                    <div className="visuals-grid">
                      <div className="visual-placeholder">
                        <i className="fa-solid fa-chart-column"></i>
                        <span>Conversion Funnel Analysis</span>
                        <button className="view-btn">View</button>
                      </div>
                      <div className="visual-placeholder">
                        <i className="fa-solid fa-map-location-dot"></i>
                        <span>User Journey Heatmap</span>
                        <button className="view-btn">View</button>
                      </div>
                      <div className="visual-placeholder">
                        <i className="fa-solid fa-diagram-project"></i>
                        <span>System Architecture</span>
                        <button className="view-btn">View</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sources' && (
                <div className="sources-tab">
                  <div className="sources-section">
                    <h3>Related Links</h3>
                    <div className="sources-list">
                      {sources.map((source, index) => (
                        <a key={index} href={source.url} className="source-item">
                          <div className="source-icon">
                            <i className={`fa-solid ${
                              source.type === 'report' ? 'fa-file-lines' :
                              source.type === 'dashboard' ? 'fa-chart-pie' :
                              source.type === 'confluence' ? 'fa-book' :
                              'fa-ticket'
                            }`}></i>
                          </div>
                          <div className="source-info">
                            <span className="source-name">{source.name}</span>
                            <span className="source-type">{source.type.charAt(0).toUpperCase() + source.type.slice(1)}</span>
                          </div>
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar (Jira Details Panel Style) */}
          <div className="details-sidebar">
            <div className="sidebar-section">
              <h4>Details</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Type</label>
                  <span>{insight.category}</span>
                </div>
                <div className="detail-item">
                  <label>Team</label>
                  <span className={`team-badge ${
                    insight.team === 'Research Team' ? 'team-badge-research' :
                    insight.team === 'Platform Team' ? 'team-badge-platform' :
                    insight.team === 'Product Team' ? 'team-badge-product' :
                    insight.team === 'Design System Team' ? 'team-badge-design' : ''
                  }`}>
                    <i className={
                      insight.team === 'Research Team' ? 'fa-solid fa-flask' :
                      insight.team === 'Platform Team' ? 'fa-solid fa-laptop-code' :
                      insight.team === 'Product Team' ? 'fa-solid fa-chart-line' :
                      insight.team === 'Design System Team' ? 'fa-solid fa-palette' : 'fa-solid fa-users'
                    }></i>
                    {insight.team}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Assignee</label>
                  <div className="assignee-info">
                    <div className="avatar-small">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <span>{insight.assignee || 'Team Member'}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <label>Created</label>
                  <span>{insight.completedDaysAgo} days ago</span>
                </div>
                <div className="detail-item">
                  <label>Impact</label>
                  <span className="metric-value">{metrics.impact}</span>
                </div>
                <div className="detail-item">
                  <label>Priority</label>
                  <Tags 
                    text={metrics.priority} 
                    variant={
                      metrics.priority === 'High' ? 'danger' : 
                      metrics.priority === 'Medium' ? 'warning' : 
                      'success'
                    } 
                  />
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h4>Tags</h4>
              <div className="tags-list">
                {insight.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h4>Actions</h4>
              <div className="action-buttons">
                <button className="action-btn full-width">
                  <i className="fa-solid fa-link"></i>
                  Link to PT-1
                </button>
                <button className="action-btn full-width">
                  <i className="fa-solid fa-bookmark"></i>
                  Save for Later
                </button>
                <button className="action-btn full-width">
                  <i className="fa-solid fa-file-export"></i>
                  Export Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightDetailsModal;