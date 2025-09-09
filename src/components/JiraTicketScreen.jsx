import React from 'react';
import './JiraTicketScreen.css';

const JiraTicketScreen = ({ onFocusModeOpen }) => {
  return (
    <div className="jira-screen">
      {/* Top Navigation */}
      <header className="jira-header">
        <div className="header-left">
          <div className="app-switcher">
            <i className="fa-solid fa-th"></i>
          </div>
          <div className="app-switcher">
            <i className="fa-solid fa-grip"></i>
          </div>
          <div className="jira-logo">
            <i className="fa-brands fa-atlassian"></i>
            <span>Jira</span>
          </div>
        </div>
        
        <div className="header-center">
          <div className="search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        
        <div className="header-right">
          <button className="create-btn">
            <i className="fa-solid fa-plus"></i>
            <span className="btn-text">Create</span>
          </button>
          <button className="upgrade-btn">
            <i className="fa-solid fa-crown"></i>
            Upgrade
          </button>
          <div className="header-icons">
            <button className="header-icon">
              <i className="fa-solid fa-bell"></i>
            </button>
            <button className="header-icon">
              <i className="fa-solid fa-circle-question"></i>
            </button>
            <button className="header-icon">
              <i className="fa-solid fa-gear"></i>
            </button>
            <div className="user-avatar">JS</div>
          </div>
        </div>
      </header>

      <div className="jira-body">
        {/* Sidebar */}
        <aside className="jira-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-item">
              <i className="fa-solid fa-user"></i>
              <span>For you</span>
            </div>
            <div className="sidebar-item">
              <i className="fa-solid fa-clock"></i>
              <span>Recent</span>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
            <div className="sidebar-item">
              <i className="fa-solid fa-star"></i>
              <span>Starred</span>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
            <div className="sidebar-item">
              <i className="fa-solid fa-th-large"></i>
              <span>Apps</span>
            </div>
            <div className="sidebar-item">
              <i className="fa-solid fa-clipboard-list"></i>
              <span>Plans</span>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
            <div className="sidebar-item">
              <i className="fa-solid fa-folder"></i>
              <span>Projects</span>
              <button className="add-btn">
                <i className="fa-solid fa-plus"></i>
              </button>
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Recent</h4>
            <div className="project-item active">
              <div className="project-icon">PT</div>
              <span>Project test</span>
              <button className="add-btn">
                <i className="fa-solid fa-plus"></i>
              </button>
              <i className="fa-solid fa-ellipsis"></i>
            </div>
            <div className="project-item">
              <div className="project-icon board">PT</div>
              <span>PT board</span>
            </div>
            <div className="project-item">
              <div className="project-icon discovery">MD</div>
              <span>My discovery project</span>
            </div>
            <div className="project-item">
              <div className="project-icon web">W</div>
              <span>Web test project</span>
            </div>
            <div className="project-item">
              <div className="project-icon kanban">MK</div>
              <span>My Kanban Project</span>
            </div>
            <div className="more-projects">
              <i className="fa-solid fa-ellipsis"></i>
              <span>More projects</span>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-item">
              <i className="fa-solid fa-users"></i>
              <span>Teams</span>
              <i className="fa-solid fa-external-link"></i>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-item">
              <i className="fa-solid fa-ellipsis"></i>
              <span>More</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="jira-main">
          {/* Breadcrumb */}
          <div className="breadcrumb-section">
            <div className="breadcrumb">
              <span>Projects</span>
              <i className="fa-solid fa-chevron-right"></i>
              <div className="project-badge">
                <i className="fa-solid fa-flask"></i>
                <span>Project test</span>
              </div>
              <i className="fa-solid fa-chevron-right"></i>
              <div className="parent-link">
                <i className="fa-solid fa-link"></i>
                <span>Add parent</span>
              </div>
              <i className="fa-solid fa-chevron-right"></i>
              <span className="ticket-key">PT-3</span>
            </div>
            
            <div className="ticket-actions-top">
              <button className="focus-mode-btn" onClick={onFocusModeOpen}>
                <i className="fa-solid fa-lightbulb"></i>
                Focus Mode
              </button>
              <button className="action-icon">
                <i className="fa-solid fa-share"></i>
              </button>
              <button className="action-icon">
                <i className="fa-solid fa-copy"></i>
              </button>
              <button className="action-icon">
                <i className="fa-solid fa-link"></i>
              </button>
              <button className="more-actions">
                <i className="fa-solid fa-ellipsis"></i>
              </button>
            </div>
          </div>

          <div className="ticket-content">
            {/* Main ticket area */}
            <div className="ticket-main">
              <div className="ticket-header-main">
                <h1 className="ticket-title">Test 1</h1>
                <div className="ticket-status">
                  <button className="status-dropdown">
                    To Do
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                  <button className="automation-btn">
                    <i className="fa-solid fa-bolt"></i>
                  </button>
                </div>
              </div>

              <div className="ticket-actions-bar">
                <button className="action-btn">
                  <i className="fa-solid fa-plus"></i>
                </button>
                <button className="action-btn">
                  <i className="fa-solid fa-paperclip"></i>
                </button>
              </div>

              <div className="ticket-description">
                <h3>Description</h3>
                <p className="add-description">Add a description...</p>
              </div>

              <div className="confluence-content">
                <div className="confluence-header">
                  <h3>Confluence content</h3>
                  <i className="fa-solid fa-circle-info"></i>
                  <button className="confluence-actions">
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>
                  <button className="add-content">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div className="confluence-item">
                  <i className="fa-solid fa-file-alt"></i>
                  <span>Product requirements</span>
                  <button className="try-template">TRY TEMPLATE</button>
                </div>
              </div>

              <div className="activity-section">
                <h3>Activity</h3>
                <div className="activity-tabs">
                  <button className="tab">All</button>
                  <button className="tab active">Comments</button>
                  <button className="tab">History</button>
                  <button className="tab">Work log</button>
                  <button className="activity-settings">
                    <i className="fa-solid fa-sliders"></i>
                  </button>
                </div>

                <div className="comment-section">
                  <div className="user-avatar-small">JS</div>
                  <div className="comment-input">
                    <input type="text" placeholder="Add a comment..." />
                    <div className="comment-reactions">
                      <span>👍 Looks good!</span>
                      <span>👋 Need help?</span>
                      <span>🔴 This is blocked...</span>
                      <span>🤔 Can you clarify...?</span>
                      <span>✅ This is on track</span>
                    </div>
                    <div className="pro-tip">
                      <strong>Pro tip:</strong> press <kbd>M</kbd> to comment
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar with details */}
            <div className="ticket-details-sidebar">
              <div className="details-header">
                <h3>Details</h3>
                <button className="configure-btn">
                  <i className="fa-solid fa-gear"></i>
                </button>
                <i className="fa-solid fa-chevron-down"></i>
              </div>

              <div className="details-content">
                <div className="detail-row">
                  <span className="detail-label">Assignee</span>
                  <div className="detail-value">
                    <i className="fa-solid fa-user-plus"></i>
                    <span>Unassigned</span>
                  </div>
                  <button className="assign-btn">Assign to me</button>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Reporter</span>
                  <div className="detail-value">
                    <div className="user-avatar-tiny">JS</div>
                    <span>John Smith</span>
                  </div>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Development</span>
                  <div className="detail-value">
                    <button className="development-action">
                      <i className="fa-solid fa-code-branch"></i>
                      Create branch
                    </button>
                  </div>
                  <i className="fa-solid fa-chevron-down"></i>
                  <button className="development-action">
                    <i className="fa-solid fa-code-commit"></i>
                    Create commit
                  </button>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Labels</span>
                  <span className="detail-value-empty">Add labels</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Due date</span>
                  <span className="detail-value-empty">Add due date</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Start date</span>
                  <span className="detail-value-empty">Add date</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Sprint</span>
                  <div className="detail-value">
                    <span className="sprint-link">PT Sprint 1</span>
                  </div>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Priority</span>
                  <div className="detail-value">
                    <i className="fa-solid fa-arrow-up priority-medium"></i>
                    <span>Medium</span>
                  </div>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Story Points</span>
                  <span className="detail-value-empty">Add story points</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Original estimate</span>
                  <span className="detail-value-empty">Add estimate</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Time tracking</span>
                  <span className="detail-value-empty">No time logged</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Components</span>
                  <span className="detail-value-empty">None</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Team</span>
                  <span className="detail-value-empty">Add team</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Fix versions</span>
                  <span className="detail-value-empty">None</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Parent</span>
                  <span className="detail-value-empty">Add parent</span>
                </div>
              </div>

              <div className="automation-section">
                <div className="automation-header">
                  <h4>Automation</h4>
                  <i className="fa-solid fa-bolt"></i>
                  <span>Rule executions</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>

              <div className="ticket-meta">
                <div className="meta-row">
                  <span>Created 4 days ago</span>
                </div>
                <div className="meta-row">
                  <span>Updated 4 days ago</span>
                </div>
                <button className="configure-link">
                  <i className="fa-solid fa-gear"></i>
                  Configure
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JiraTicketScreen;