import React, { useState, useEffect } from 'react';
import './App.css';
import FocusMode from './components/FocusMode';
import JiraTicketScreen from './components/JiraTicketScreen';
import EnterFocusMode from './components/EnterFocusMode';
import MinimizedFocusMode from './components/MinimizedFocusMode';
import SpotlightIntro from './components/SpotlightIntro';

function App() {
  const [isEnterFocusModeOpen, setIsEnterFocusModeOpen] = useState(false);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(0);
  const [showSpotlight, setShowSpotlight] = useState(true);

  // Update last updated time
  useEffect(() => {
    if (!isMinimized || !sessionStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now - sessionStartTime) / (1000 * 60));
      setLastUpdated(diff);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [isMinimized, sessionStartTime]);

  const handleFocusModeRequest = () => {
    // If already minimized, expand directly
    if (isMinimized) {
      setIsMinimized(false);
      setIsFocusModeOpen(true);
      return;
    }
    setIsEnterFocusModeOpen(true);
  };

  const handleLoadingComplete = () => {
    setIsEnterFocusModeOpen(false);
    setIsFocusModeOpen(true);
    setSessionStartTime(new Date());
  };

  const handleLoadingCancel = () => {
    setIsEnterFocusModeOpen(false);
  };

  const handleFocusModeClose = () => {
    setIsFocusModeOpen(false);
    setIsMinimized(false);
    setSessionStartTime(null);
    setLastUpdated(0);
  };

  const handleFocusModeMinimize = () => {
    setIsFocusModeOpen(false);
    setIsMinimized(true);
    if (!sessionStartTime) {
      setSessionStartTime(new Date());
    }
  };

  const handleMinimizedExpand = () => {
    setIsMinimized(false);
    setIsFocusModeOpen(true);
  };

  const handleMinimizedClose = () => {
    setIsMinimized(false);
    setSessionStartTime(null);
    setLastUpdated(0);
  };

  const handleSpotlightClose = () => {
    setShowSpotlight(false);
  };

  return (
    <div className="App">
      <JiraTicketScreen 
        onFocusModeOpen={handleFocusModeRequest} 
      />
      
      <EnterFocusMode 
        isOpen={isEnterFocusModeOpen}
        onComplete={handleLoadingComplete}
        onCancel={handleLoadingCancel}
      />
      
      <FocusMode 
        isOpen={isFocusModeOpen} 
        onClose={handleFocusModeClose}
        onMinimize={handleFocusModeMinimize}
      />

      <MinimizedFocusMode
        isVisible={isMinimized}
        onExpand={handleMinimizedExpand}
        onClose={handleMinimizedClose}
        currentTicket="PT-1"
        ticketTitle="Authentication errors"
        insightsCount={4}
        teamsCount={3}
        lastUpdated={lastUpdated}
      />

      {showSpotlight && (
        <SpotlightIntro onClose={handleSpotlightClose} />
      )}
    </div>
  );
}

export default App;
