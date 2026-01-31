import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import TechHeader from './components/TechHeader';
import TechHero from './components/TechHero';
import TechServices from './components/TechServices';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ToggleDemo from './components/ToggleDemo';
import TechBackground from './components/TechBackground';
import ErrorFallback from './components/ErrorFallback';
import AntigravityMode from './components/AntigravityMode';
import AntigravityToggle from './components/AntigravityToggle';
import './styles/tech-theme.css';
import './styles/toggle-demo.css';

const App: React.FC = () => {
  const [showBackground, setShowBackground] = useState(false);
  const [isAntigravityActive, setIsAntigravityActive] = useState(false);

  useEffect(() => {
    document.title = "AlephSpark | Modern Web Development Solutions";
    // Delay background initialization
    const timer = setTimeout(() => {
      setShowBackground(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleAntigravity = () => {
    setIsAntigravityActive(!isAntigravityActive);
  };

  return (
    <div className="font-inter text-white min-h-screen overflow-x-hidden relative" style={{ background: 'var(--primary-bg)' }}>
      {showBackground && (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()}
        >
          <TechBackground />
        </ErrorBoundary>
      )}
      <div className="relative z-10">
        <TechHeader />
        <main>
          <TechHero />
          <TechServices />
          <ToggleDemo />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
      <AntigravityMode isActive={isAntigravityActive} />
      <AntigravityToggle isActive={isAntigravityActive} onToggle={handleToggleAntigravity} />
    </div>
  );
};

export default App;