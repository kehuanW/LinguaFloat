import React, { useEffect, useState } from 'react';
import FloatingWindow from './pages/FloatingWindow';
import SettingsWindow from './pages/SettingsWindow';

/**
 * Main App component - routes between FloatingWindow and SettingsWindow
 * based on URL hash
 */
function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    // Listen for hash changes
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Route to appropriate page
  if (route === '#/settings') {
    return <SettingsWindow />;
  }

  return <FloatingWindow />;
}

export default App;
