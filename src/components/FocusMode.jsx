import React, { useState } from 'react';
import './FocusMode.css';

const FocusMode = ({ isOpen, onClose, onMinimize }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({
    researchInsights: false,
    pastDecisions: false,
    crossTeamWork: false,
    technicalConstraints: false,
  });
  const [selectedTeams, setSelectedTeams] = useState({
    researchTeam: false,
    productTeam: false,
    platformTeam: false,
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [lastMonths, setLastMonths] = useState(6);
  const [savedInsights, setSavedInsights] = useState(new Set());
  const [linkedInsights, setLinkedInsights] = useState(new Set());
  const [viewedInsights, setViewedInsights] = useState(new Set());
  const [collapsedSections, setCollapsedSections] = useState({
    categories: false,
    teams: false,
  });
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // AI Search keyword mapping
  const searchPatterns = {
    'error patterns': ['error', 'frustration', 'message', 'usability', 'retry', 'failure'],
    'authentication security': ['auth', 'security', 'oauth', 'token', 'biometric', 'mfa', '2fa'],
    'mobile login': ['mobile', 'biometric', 'touch', 'fingerprint', 'ios', 'android'],
    'retry button': ['retry', 'error', 'attempt', 'recovery', 'failure'],
    'password reset': ['password', 'reset', 'recovery', 'forgot'],
    'session management': ['session', 'timeout', 'expire', 'keepalive'],
    'rate limiting': ['rate', 'limit', 'brute', 'force', 'security'],
    'accessibility': ['accessibility', 'wcag', 'screen', 'reader', 'a11y']
  };

  const performAISearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const queryLower = query.toLowerCase();
      const results = insights.map(insight => {
        let relevanceScore = 0;
        let matchedTerms = [];
        let isAIMatch = false;

        // Check against search patterns
        Object.entries(searchPatterns).forEach(([pattern, keywords]) => {
          if (queryLower.includes(pattern.toLowerCase())) {
            isAIMatch = true;
            relevanceScore += 100;
          }
          keywords.forEach(keyword => {
            if (queryLower.includes(keyword.toLowerCase())) {
              relevanceScore += 10;
              matchedTerms.push(keyword);
            }
          });
        });

        // Check title, description, and tags
        const searchText = `${insight.title} ${insight.description} ${insight.tags.join(' ')}`.toLowerCase();
        const queryWords = queryLower.split(' ');
        
        queryWords.forEach(word => {
          if (word.length > 2 && searchText.includes(word)) {
            relevanceScore += 5;
            matchedTerms.push(word);
          }
        });

        return {
          ...insight,
          relevanceScore,
          matchedTerms: [...new Set(matchedTerms)],
          isAIMatch
        };
      })
      .filter(insight => insight.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

      setSearchResults(results);
      setHasSearched(true);
      setIsSearching(false);
    }, 800);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    performAISearch(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    setIsSearching(false);
  };

  const highlightText = (text, terms) => {
    if (!terms || terms.length === 0) return text;
    
    let highlightedText = text;
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const categories = [
    { id: 'researchInsights', name: 'Research Insights', count: 4, icon: 'fa-solid fa-chart-line' },
    { id: 'pastDecisions', name: 'Past Decisions', count: 6, icon: 'fa-solid fa-clock-rotate-left' },
    { id: 'crossTeamWork', name: 'Cross-Team Work', count: 12, icon: 'fa-solid fa-users' },
    { id: 'technicalConstraints', name: 'Technical Constraints', count: 8, icon: 'fa-solid fa-wrench' },
  ];

  const teams = [
    { id: 'researchTeam', name: 'Research Team', count: 4, icon: 'fa-solid fa-flask' },
    { id: 'productTeam', name: 'Product Team', count: 10, icon: 'fa-solid fa-laptop' },
    { id: 'platformTeam', name: 'Platform Team', count: 3, icon: 'fa-solid fa-laptop-code' },
  ];

  const insights = [
    {
      id: 1,
      title: 'Authentication Error Message Usability Study',
      description: 'Users experienced 67% higher frustration when error messages lacked actionable guidance. The study revealed that clear retry instructions reduced support tickets by 43% and improved user satisfaction scores by 2.1 points.',
      tags: ['User-Testing', 'Error-Analysis', 'Mobile-Focused'],
      team: 'Research Team',
      category: 'researchInsights',
      priority: 'High-Priority',
      completedDaysAgo: 3,
    },
    {
      id: 2,
      title: 'Password Reset Flow Analysis',
      description: 'Analysis of 2,847 password reset attempts showed that users abandon the process 34% of the time when error states are unclear. Implementing contextual help reduced abandonment by 28% across all device types.',
      tags: ['User-Testing', 'Error-Analysis', 'Mobile-Focused'],
      team: 'Research Team',
      category: 'researchInsights',
      priority: 'Medium-Priority',
      completedDaysAgo: 3,
    },
    {
      id: 3,
      title: 'Session Timeout Behavior Research',
      description: 'Study found that 78% of users prefer a warning before session timeout with an option to extend. Silent timeouts caused 52% of users to lose form data, resulting in significant frustration and task abandonment.',
      tags: ['Session-Management', 'UX-Research', 'Data-Loss-Prevention'],
      team: 'Research Team',
      category: 'researchInsights',
      priority: 'High-Priority',
      completedDaysAgo: 5,
    },
    {
      id: 4,
      title: 'Biometric Authentication Adoption Study',
      description: 'Research shows 83% of mobile users prefer biometric authentication over passwords. Implementation reduced login time by 4.2 seconds average and decreased password reset requests by 71%.',
      tags: ['Biometrics', 'Mobile-Auth', 'User-Preference'],
      team: 'Research Team',
      category: 'researchInsights',
      priority: 'Medium-Priority',
      completedDaysAgo: 7,
    },
    {
      id: 5,
      title: 'Previous OAuth Implementation Decision',
      description: 'Team decided to use OAuth 2.0 with PKCE flow for mobile apps in Q2 2023. This decision improved security posture and reduced authentication-related vulnerabilities by 89%.',
      tags: ['OAuth', 'Security-Decision', 'Mobile-Architecture'],
      team: 'Platform Team',
      category: 'pastDecisions',
      priority: 'High-Priority',
      completedDaysAgo: 45,
    },
    {
      id: 6,
      title: 'Token Refresh Strategy Decision',
      description: 'Architectural decision to implement sliding session windows with 15-minute access tokens and 7-day refresh tokens. This balanced security with user experience, reducing forced logouts by 65%.',
      tags: ['Token-Management', 'Architecture', 'Security'],
      team: 'Platform Team',
      category: 'pastDecisions',
      priority: 'Medium-Priority',
      completedDaysAgo: 30,
    },
    {
      id: 7,
      title: 'Error Message Standardization',
      description: 'Design system team created standardized error message components with consistent icons, colors, and copy patterns. Adoption across 12 products improved error comprehension by 41%.',
      tags: ['Design-System', 'Standardization', 'Error-Handling'],
      team: 'Design System Team',
      category: 'crossTeamWork',
      priority: 'Medium-Priority',
      completedDaysAgo: 14,
    },
    {
      id: 8,
      title: 'Accessibility Audit for Auth Flows',
      description: 'WCAG 2.1 AA compliance audit revealed 23 issues in authentication flows. Screen reader compatibility improved by 94% after implementing recommended changes, especially for error announcements.',
      tags: ['Accessibility', 'WCAG', 'Screen-Readers'],
      team: 'Design System Team',
      category: 'crossTeamWork',
      priority: 'High-Priority',
      completedDaysAgo: 10,
    },
    {
      id: 9,
      title: 'Multi-Factor Authentication Rollout',
      description: 'Platform team successfully deployed MFA to 500K users with 92% adoption rate. SMS-based 2FA most popular (67%), followed by authenticator apps (25%) and hardware keys (8%).',
      tags: ['MFA', '2FA', 'Security-Enhancement'],
      team: 'Platform Team',
      category: 'crossTeamWork',
      priority: 'High-Priority',
      completedDaysAgo: 21,
    },
    {
      id: 10,
      title: 'Rate Limiting Implementation',
      description: 'Implemented progressive rate limiting on authentication endpoints: 5 attempts per minute, increasing lockout periods. Reduced brute force attempts by 99.2% without impacting legitimate users.',
      tags: ['Rate-Limiting', 'Security', 'Brute-Force-Protection'],
      team: 'Platform Team',
      category: 'technicalConstraints',
      priority: 'High-Priority',
      completedDaysAgo: 18,
    },
    {
      id: 11,
      title: 'Login Analytics Dashboard',
      description: 'Analytics team created real-time dashboard tracking authentication metrics: success rates (87%), error types, retry patterns, and device breakdowns. Identified mobile Safari as highest error rate (23%).',
      tags: ['Analytics', 'Metrics', 'Dashboard'],
      team: 'Analytics Team',
      category: 'crossTeamWork',
      priority: 'Medium-Priority',
      completedDaysAgo: 12,
    },
    {
      id: 12,
      title: 'Password Complexity Study',
      description: 'Research found users prefer passphrases over complex passwords. Allowing 4+ word passphrases increased password strength by 156% while reducing reset requests by 34%.',
      tags: ['Password-Policy', 'User-Research', 'Security-UX'],
      team: 'Research Team',
      category: 'researchInsights',
      priority: 'Medium-Priority',
      completedDaysAgo: 25,
    },
    {
      id: 13,
      title: 'CAPTCHA Performance Impact',
      description: 'Technical constraint: reCAPTCHA v3 adds 1.2s average to page load. Invisible challenges reduced bot traffic by 97% but increased legitimate user friction by 8% on suspicious networks.',
      tags: ['CAPTCHA', 'Performance', 'Bot-Protection'],
      team: 'Platform Team',
      category: 'technicalConstraints',
      priority: 'Low-Priority',
      completedDaysAgo: 35,
    },
    {
      id: 14,
      title: 'GDPR Compliance for Auth Data',
      description: 'Legal requirement to anonymize authentication logs after 90 days. Implemented data retention policies and automated cleanup jobs to ensure compliance across all regions.',
      tags: ['GDPR', 'Compliance', 'Data-Retention'],
      team: 'Platform Team',
      category: 'technicalConstraints',
      priority: 'High-Priority',
      completedDaysAgo: 60,
    },
    {
      id: 15,
      title: 'Social Login Integration Analysis',
      description: 'Product team found 45% of users prefer social login options. Google (62%), Apple (23%), and Facebook (15%) most requested. Reduced signup friction by 73% where implemented.',
      tags: ['Social-Login', 'OAuth', 'User-Preference'],
      team: 'Product Team',
      category: 'crossTeamWork',
      priority: 'Medium-Priority',
      completedDaysAgo: 8,
    },
    {
      id: 16,
      title: 'Mobile Biometric Fallback Strategy',
      description: 'Defined fallback hierarchy: biometric → PIN → password. This approach maintained 99.8% authentication success rate even when biometric sensors fail or are unavailable.',
      tags: ['Biometrics', 'Fallback-Strategy', 'Mobile'],
      team: 'Platform Team',
      category: 'pastDecisions',
      priority: 'Medium-Priority',
      completedDaysAgo: 15,
    },
    {
      id: 17,
      title: 'API Response Time Optimization',
      description: 'Performance constraint: Auth API must respond within 200ms at p99. Implemented caching and connection pooling to achieve 187ms p99 latency under peak load.',
      tags: ['Performance', 'API', 'Optimization'],
      team: 'Platform Team',
      category: 'technicalConstraints',
      priority: 'High-Priority',
      completedDaysAgo: 4,
    },
    {
      id: 18,
      title: 'Legacy System Migration Plan',
      description: 'Decision to migrate from monolithic auth service to microservices architecture. Phased approach over 6 months to minimize risk and maintain backward compatibility.',
      tags: ['Migration', 'Architecture-Decision', 'Legacy-Systems'],
      team: 'Platform Team',
      category: 'pastDecisions',
      priority: 'High-Priority',
      completedDaysAgo: 90,
    },
    {
      id: 19,
      title: 'Customer Support Auth Insights',
      description: 'Support team analysis: 34% of tickets related to authentication. Top issues: password reset (42%), MFA setup (31%), account lockouts (27%). Created self-service guides reducing tickets by 56%.',
      tags: ['Support-Analysis', 'User-Issues', 'Self-Service'],
      team: 'Product Team',
      category: 'crossTeamWork',
      priority: 'Medium-Priority',
      completedDaysAgo: 20,
    },
    {
      id: 20,
      title: 'Browser Compatibility Testing',
      description: 'QA team tested auth flows across 15 browser versions. Found critical issues with Safari 14 WebAuthn support and IE11 OAuth redirects. Implemented polyfills and fallbacks.',
      tags: ['Browser-Testing', 'Compatibility', 'QA'],
      team: 'Product Team',
      category: 'crossTeamWork',
      priority: 'Medium-Priority',
      completedDaysAgo: 28,
    },
  ];

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleTeamToggle = (teamId) => {
    setSelectedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId],
    }));
  };

  const handleSelectAll = (type) => {
    if (type === 'categories') {
      const allSelected = Object.values(selectedCategories).every(v => v);
      const newState = {};
      categories.forEach(cat => {
        newState[cat.id] = !allSelected;
      });
      setSelectedCategories(newState);
    } else if (type === 'teams') {
      const allSelected = Object.values(selectedTeams).every(v => v);
      const newState = {};
      teams.forEach(team => {
        newState[team.id] = !allSelected;
      });
      setSelectedTeams(newState);
    }
  };

  const handleClearAll = (type) => {
    if (type === 'categories') {
      const newState = {};
      categories.forEach(cat => {
        newState[cat.id] = false;
      });
      setSelectedCategories(newState);
    } else if (type === 'teams') {
      const newState = {};
      teams.forEach(team => {
        newState[team.id] = false;
      });
      setSelectedTeams(newState);
    }
  };

  const getTotalInsights = () => {
    let total = 0;
    categories.forEach(cat => {
      if (selectedCategories[cat.id]) {
        total += cat.count;
      }
    });
    return total;
  };

  const getTotalTeams = () => {
    let total = 0;
    teams.forEach(team => {
      if (selectedTeams[team.id]) {
        total += team.count;
      }
    });
    return total;
  };

  const toggleSaved = (insightId) => {
    setSavedInsights(prev => {
      const newSet = new Set(prev);
      if (newSet.has(insightId)) {
        newSet.delete(insightId);
      } else {
        newSet.add(insightId);
      }
      return newSet;
    });
  };

  const toggleLinked = (insightId) => {
    setLinkedInsights(prev => {
      const newSet = new Set(prev);
      if (newSet.has(insightId)) {
        newSet.delete(insightId);
      } else {
        newSet.add(insightId);
      }
      return newSet;
    });
  };

  const toggleViewed = (insightId) => {
    setViewedInsights(prev => {
      const newSet = new Set(prev);
      if (newSet.has(insightId)) {
        newSet.delete(insightId);
      } else {
        newSet.add(insightId);
      }
      return newSet;
    });
  };

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Filter insights based on time range, categories, and teams
  const getFilteredInsights = () => {
    const daysLimit = lastMonths * 30; // Convert months to days
    let filtered = insights.filter(insight => {
      // Filter by time
      if (insight.completedDaysAgo > daysLimit) return false;
      
      // Filter by team if any team filters are active
      const activeTeams = Object.entries(selectedTeams)
        .filter(([_, selected]) => selected)
        .map(([teamId, _]) => teams.find(t => t.id === teamId)?.name);
      
      if (activeTeams.length > 0 && !activeTeams.includes(insight.team)) {
        return false;
      }
      
      // Filter by categories
      const activeCategoryFilters = Object.entries(selectedCategories)
        .filter(([_, selected]) => selected)
        .map(([catId, _]) => catId);
      
      if (activeCategoryFilters.length > 0 && !activeCategoryFilters.includes(insight.category)) {
        return false;
      }
      
      return true;
    });
    
    // Apply sorting
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => a.completedDaysAgo - b.completedDaysAgo);
        break;
      case 'priority':
        const priorityOrder = { 'High-Priority': 1, 'Medium-Priority': 2, 'Low-Priority': 3 };
        filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case 'relevance':
      default:
        // Keep original order for relevance (or could implement a relevance score)
        break;
    }
    
    return filtered;
  };

  // Apply sorting to search results too
  const getSortedResults = (results) => {
    const sorted = [...results];
    switch (sortBy) {
      case 'date':
        sorted.sort((a, b) => a.completedDaysAgo - b.completedDaysAgo);
        break;
      case 'priority':
        const priorityOrder = { 'High-Priority': 1, 'Medium-Priority': 2, 'Low-Priority': 3 };
        sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case 'relevance':
      default:
        // For search results, already sorted by relevance score
        // For regular insights, keep original order
        break;
    }
    return sorted;
  };

  const displayInsights = searchQuery.trim() 
    ? getSortedResults(searchResults) 
    : getFilteredInsights();

  if (!isOpen) return null;

  return (
    <div className="focus-mode-overlay">
      <div className="focus-mode-container">
        <div className="focus-mode-header">
          <div className="header-left">
            <i className="fa-solid fa-lightbulb focus-icon"></i>
            <h1>Focus Mode</h1>
          </div>
          <div className="header-center">
            <div className="search-container">
              <input
                type="text"
                placeholder="Ask AI: Try 'error message patterns' or 'mobile authentication'"
                value={searchQuery}
                onChange={handleSearchChange}
                className={`search-input ${searchQuery ? 'has-query' : ''}`}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={clearSearch}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
              {isSearching && <div className="search-spinner"></div>}
            </div>
          </div>
          <div className="header-right">
            {savedInsights.size > 0 && (
              <button 
                className={`bookmarks-toggle ${rightPanelOpen ? 'active' : ''}`}
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                title={`${rightPanelOpen ? 'Hide' : 'Show'} bookmarked insights`}
              >
                <i className="fa-solid fa-bookmark"></i>
                <span className="bookmark-badge">{savedInsights.size}</span>
              </button>
            )}
            <button className="minimize-btn" onClick={onMinimize}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <button className="close-btn" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <div className="focus-mode-body">
          <div className="sidebar">
            <div className="sidebar-section task-section">
              <div className="sidebar-header">
                <div className="ticket-header">
                  <i className="fa-solid fa-ticket"></i>
                  <span className="section-title">PT-1</span>
                </div>
                <span className="section-subtitle">Display authentication error messages with retry options</span>
              </div>
            </div>

            <div className="sidebar-section filter-sections">
              <div className="sidebar-section">
                <div className="section-header collapsible" onClick={() => toggleSection('categories')}>
                  <div className="section-header-left">
                    <button className="collapse-btn">
                      <i className={`fa-solid fa-chevron-${collapsedSections.categories ? 'right' : 'down'}`}></i>
                    </button>
                    <h3>Insights</h3>
                  </div>
                  <div className="section-actions">
                    <button className="link-btn" onClick={(e) => {e.stopPropagation(); handleSelectAll('categories')}}>Select All</button>
                    <button className="link-btn" onClick={(e) => {e.stopPropagation(); handleClearAll('categories')}}>Clear All</button>
                  </div>
                </div>
                {!collapsedSections.categories && (
                  <>
                    <div className="filter-list">
                      {categories.map(category => (
                        <label key={category.id} className={`filter-item ${selectedCategories[category.id] ? 'selected' : ''}`}>
                          <input
                            type="checkbox"
                            checked={selectedCategories[category.id]}
                            onChange={() => handleCategoryToggle(category.id)}
                          />
                          <i className={`filter-icon ${category.icon}`}></i>
                          <span className="filter-name">{category.name}</span>
                          <span className="filter-count">{category.count}</span>
                        </label>
                      ))}
                    </div>
                    <div className="insight-count">
                      Showing {Object.values(selectedCategories).filter(Boolean).length} of {categories.length} categories ({getTotalInsights()} total insights)
                    </div>
                  </>
                )}
              </div>

              <div className="sidebar-section">
                <div className="section-header collapsible" onClick={() => toggleSection('teams')}>
                  <div className="section-header-left">
                    <button className="collapse-btn">
                      <i className={`fa-solid fa-chevron-${collapsedSections.teams ? 'right' : 'down'}`}></i>
                    </button>
                    <h3>Team(s)</h3>
                  </div>
                  <div className="section-actions">
                    <button className="link-btn" onClick={(e) => {e.stopPropagation(); handleSelectAll('teams')}}>Select All</button>
                    <button className="link-btn" onClick={(e) => {e.stopPropagation(); handleClearAll('teams')}}>Clear All</button>
                  </div>
                </div>
                {!collapsedSections.teams && (
                  <>
                    <div className="filter-list">
                      {teams.map(team => (
                        <label key={team.id} className={`filter-item ${selectedTeams[team.id] ? 'selected' : ''}`}>
                          <input
                            type="checkbox"
                            checked={selectedTeams[team.id]}
                            onChange={() => handleTeamToggle(team.id)}
                          />
                          <i className={`filter-icon ${team.icon}`}></i>
                          <span className="filter-name">{team.name}</span>
                          <span className="filter-count">{team.count}</span>
                        </label>
                      ))}
                    </div>
                    <div className="insight-count">
                      Showing {Object.values(selectedTeams).filter(Boolean).length} of {teams.length} teams ({getTotalTeams()} total insights)
                    </div>
                  </>
                )}
              </div>
            </div>


            <div className="sidebar-actions">
              <button className="btn btn-primary" onClick={onMinimize}>
                <i className="fa-solid fa-minimize"></i> minimize Session
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i> Exit Focus Mode
              </button>
            </div>
          </div>

          <div className="main-content">

            <div className="content-header">
              <h2>Insights</h2>
              <p className="content-subtitle">
                User behavior patterns, pain points, and feedback related to authentication flows
              </p>
            </div>

            <div className="filters-bar">
              <div className="filter-chips">
                {/* Show active team filters only */}
                {teams.filter(team => selectedTeams[team.id]).map(team => (
                  <span key={team.id} className={`chip chip-team ${team.id === 'researchTeam' ? 'chip-team-research' : ''}`}>
                    <i className={team.icon}></i>
                    {team.name}
                    <button 
                      className="chip-remove"
                      onClick={() => handleTeamToggle(team.id)}
                      aria-label={`Remove ${team.name} filter`}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </span>
                ))}
              </div>
              <div className="filter-controls">
                <div className="sort-control">
                  <label>Sort by:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="relevance">Relevance</option>
                    <option value="date">Date</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                <div className="time-control">
                  <label>Last</label>
                  <select value={lastMonths} onChange={(e) => setLastMonths(Number(e.target.value))}>
                    <option value="1">1 month</option>
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="24">All time</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="insights-list">
              {displayInsights.map(insight => (
                <div key={insight.id} className="insight-card">
                  <div className="card-header">
                    <div className="card-meta">
                      <div className="card-meta-left">
                        <span className={`team-badge ${
                          insight.team === 'Research Team' ? 'team-badge-research' :
                          insight.team === 'Platform Team' ? 'team-badge-platform' :
                          insight.team === 'Product Team' ? 'team-badge-product' : ''
                        }`}>
                          <i className={
                            insight.team === 'Research Team' ? 'fa-solid fa-flask' :
                            insight.team === 'Platform Team' ? 'fa-solid fa-laptop-code' :
                            insight.team === 'Design System Team' ? 'fa-solid fa-palette' :
                            insight.team === 'Analytics Team' ? 'fa-solid fa-chart-line' :
                            insight.team === 'Product Team' ? 'fa-solid fa-laptop' :
                            'fa-solid fa-users'
                          }></i> {insight.team}
                        </span>
                        {searchQuery.trim() && insight.isAIMatch && (
                          <span className="ai-badge">
                            <i className="fa-solid fa-sparkles"></i> AI Insight
                          </span>
                        )}
                      </div>
                      <div className="card-meta-right">
                        <span className={`priority-badge priority-${insight.priority.toLowerCase().replace('-', '')}`}>
                          {insight.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="card-title">
                    {searchQuery.trim() && insight.matchedTerms ? highlightText(insight.title, insight.matchedTerms) : insight.title}
                  </h3>
                  <p className="card-description">
                    {searchQuery.trim() && insight.matchedTerms ? highlightText(insight.description, insight.matchedTerms) : insight.description}
                  </p>
                  <div className="card-tags">
                    {insight.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="card-footer">
                    <span className="completion-info">Completed {insight.completedDaysAgo} days ago</span>
                    <div className="card-actions">
                      <button 
                        className={`action-btn icon-only ${viewedInsights.has(insight.id) ? 'active' : ''}`}
                        title="View details"
                        onClick={() => toggleViewed(insight.id)}
                      >
                        <i className={`fa-${viewedInsights.has(insight.id) ? 'solid' : 'regular'} fa-eye`}></i>
                      </button>
                      <button 
                        className={`action-btn icon-only ${linkedInsights.has(insight.id) ? 'active' : ''}`}
                        title="Link to ticket"
                        onClick={() => toggleLinked(insight.id)}
                      >
                        <i className={`fa-solid fa-${linkedInsights.has(insight.id) ? 'link' : 'link'}`}></i>
                      </button>
                      <button 
                        className={`action-btn icon-only ${savedInsights.has(insight.id) ? 'active' : ''}`}
                        title="Save for later"
                        onClick={() => toggleSaved(insight.id)}
                      >
                        <i className={`fa-${savedInsights.has(insight.id) ? 'solid' : 'regular'} fa-bookmark`}></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="content-footer">
              <p>
                {searchQuery.trim()
                  ? `Found ${searchResults.length} insight${searchResults.length !== 1 ? 's' : ''} matching "${searchQuery}"`
                  : `Showing ${displayInsights.length} of ${insights.length} insights from last ${lastMonths === 24 ? 'all time' : `${lastMonths} month${lastMonths !== 1 ? 's' : ''}`}`
                }
              </p>
              <p className="update-info">Last updated 2 minutes ago</p>
            </div>
          </div>

          {/* Right Panel for Bookmarked Insights */}
          {rightPanelOpen && savedInsights.size > 0 && (
            <div className="right-panel">
              <div className="right-panel-header">
                <h3>Bookmarked Insights</h3>
                <button 
                  className="panel-close-btn"
                  onClick={() => setRightPanelOpen(false)}
                  title="Close panel"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="right-panel-content">
                {insights
                  .filter(insight => savedInsights.has(insight.id))
                  .map(insight => (
                    <div key={insight.id} className="bookmark-card">
                      <div className="bookmark-card-header">
                        <span className={`bookmark-team-badge ${
                          insight.team === 'Research Team' ? 'research' :
                          insight.team === 'Platform Team' ? 'platform' :
                          insight.team === 'Product Team' ? 'product' : ''
                        }`}>
                          <i className={
                            insight.team === 'Research Team' ? 'fa-solid fa-flask' :
                            insight.team === 'Platform Team' ? 'fa-solid fa-laptop-code' :
                            insight.team === 'Design System Team' ? 'fa-solid fa-palette' :
                            insight.team === 'Analytics Team' ? 'fa-solid fa-chart-line' :
                            insight.team === 'Product Team' ? 'fa-solid fa-laptop' :
                            'fa-solid fa-users'
                          }></i>
                          {insight.team}
                        </span>
                        <button 
                          className="bookmark-card-remove"
                          onClick={() => toggleSaved(insight.id)}
                          title="Remove bookmark"
                        >
                          <i className="fa-solid fa-bookmark"></i>
                        </button>
                      </div>
                      <h4 className="bookmark-card-title">{insight.title}</h4>
                      <p className="bookmark-card-description">
                        {insight.description.substring(0, 120)}...
                      </p>
                      <div className="bookmark-card-tags">
                        {insight.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="bookmark-tag">{tag}</span>
                        ))}
                        {insight.tags.length > 3 && (
                          <span className="bookmark-tag-more">+{insight.tags.length - 3}</span>
                        )}
                      </div>
                      <div className="bookmark-card-footer">
                        <span className="bookmark-completion">
                          Completed {insight.completedDaysAgo} days ago
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusMode;