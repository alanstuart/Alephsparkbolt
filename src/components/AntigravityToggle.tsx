import React from 'react';
import { Orbit } from 'lucide-react';

interface AntigravityToggleProps {
  isActive: boolean;
  onToggle: () => void;
}

const AntigravityToggle: React.FC<AntigravityToggleProps> = ({ isActive, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-8 right-8 z-50 px-6 py-3 rounded-full glass transition-all duration-300 flex items-center gap-3 hover:scale-110 ${
        isActive ? 'glow-purple animate-pulse' : 'glow-blue'
      }`}
      style={{
        background: isActive
          ? 'linear-gradient(135deg, rgba(176, 38, 255, 0.3), rgba(0, 212, 255, 0.3))'
          : 'rgba(26, 26, 36, 0.8)',
      }}
    >
      <Orbit
        size={20}
        className={`transition-all duration-300 ${
          isActive ? 'text-cyber-purple animate-spin' : 'text-electric-blue'
        }`}
        style={{ animationDuration: isActive ? '3s' : undefined }}
      />
      <span className={`font-mono text-sm tracking-wider ${
        isActive ? 'text-white' : 'text-electric-blue'
      }`}>
        {isActive ? 'DISABLE' : 'ANTIGRAVITY'}
      </span>
    </button>
  );
};

export default AntigravityToggle;
