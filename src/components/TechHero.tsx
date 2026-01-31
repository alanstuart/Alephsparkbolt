import React, { useEffect, useState } from 'react';
import { ChevronRight, Code2, Cpu, Zap, ArrowRight } from 'lucide-react';

const TechHero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Building the future, one line at a time.';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden tech-grid">
      {/* Floating Tech Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 glass glow-blue rounded-lg flex items-center justify-center float">
        <Code2 size={24} className="text-electric-blue" />
      </div>
      <div className="absolute top-40 right-20 w-20 h-20 glass glow-green rounded-lg flex items-center justify-center float" style={{ animationDelay: '2s' }}>
        <Cpu size={28} className="text-neon-green" />
      </div>
      <div className="absolute bottom-40 left-20 w-12 h-12 glass glow-purple rounded-lg flex items-center justify-center float" style={{ animationDelay: '4s' }}>
        <Zap size={20} className="text-cyber-purple" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto pt-32">
          {/* Status Indicator */}
          <div className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 rounded-full glass glow-blue mb-6 md:mb-8 text-xs md:text-sm">
            <div className="w-2 h-2 bg-neon-green rounded-full pulse mr-3"></div>
            <span className="text-electric-blue font-mono tracking-wider">SYSTEM ONLINE</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight px-2" data-physics="hero-title">
            <span className="block text-white">Next-Gen</span>
            <span className="block bg-gradient-to-r from-electric-blue via-cyber-purple to-neon-green bg-clip-text text-transparent">
              Web Solutions
            </span>
          </h1>

          {/* Typed Subtitle */}
          <div className="terminal p-3 md:p-6 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base" data-physics="hero-subtitle">
            <div className="pt-8">
              <span className="text-neon-green font-mono">$ </span>
              <span className="text-white font-mono">{typedText}</span>
              <span className="animate-pulse text-electric-blue font-mono">|</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
            <button className="cyber-btn bg-gradient-to-r from-electric-blue to-cyber-purple border-none text-white text-sm md:text-base py-3 md:py-4" data-physics="cta-button-1">
              Launch Project <ArrowRight size={16} className="ml-2" />
            </button>
            <button className="cyber-btn border-neon-green text-neon-green hover:text-black text-sm md:text-base py-3 md:py-4" data-physics="cta-button-2">
              View Portfolio <ChevronRight size={16} className="ml-2" />
            </button>
          </div>

          {/* Tech Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto px-4">
            <div className="glass p-4 md:p-6 rounded-lg holographic" data-physics="stat-card-1">
              <div className="text-2xl md:text-3xl font-bold text-electric-blue mb-2">99.9%</div>
              <div className="text-gray-300 font-mono text-xs md:text-sm">Uptime</div>
              <div className="data-bar mt-3" style={{ '--progress': '99%' } as React.CSSProperties}></div>
            </div>
            <div className="glass p-4 md:p-6 rounded-lg holographic" style={{ animationDelay: '1s' }} data-physics="stat-card-2">
              <div className="text-2xl md:text-3xl font-bold text-neon-green mb-2">{'<100ms'}</div>
              <div className="text-gray-300 font-mono text-xs md:text-sm">Response Time</div>
              <div className="data-bar mt-3" style={{ '--progress': '95%' } as React.CSSProperties}></div>
            </div>
            <div className="glass p-4 md:p-6 rounded-lg holographic" style={{ animationDelay: '2s' }} data-physics="stat-card-3">
              <div className="text-2xl md:text-3xl font-bold text-cyber-purple mb-2">24/7</div>
              <div className="text-gray-300 font-mono text-xs md:text-sm">Support</div>
              <div className="data-bar mt-3" style={{ '--progress': '100%' } as React.CSSProperties}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-electric-blue/5 via-transparent to-cyber-purple/5 pointer-events-none"></div>
    </section>
  );
};

export default TechHero;