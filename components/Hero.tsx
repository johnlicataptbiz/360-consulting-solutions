
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { SectionId } from '../types';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={SectionId.Home} className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Video Background Placeholder / Atmospheric Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-30 grayscale"
          alt="Atmospheric workspace"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Full-Circle Business Evolution
        </div>
        
        <h1 className="text-6xl md:text-[120px] font-black tracking-tighter mb-10 leading-[0.9] text-gradient uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Coaching <br /> For Life.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-14 max-w-3xl mx-auto leading-relaxed font-light italic">
          Breaking through plateaus by implementing the 360 Growth Framework: <br className="hidden md:block" />
          Strategy, Operations, and Execution in perfect alignment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => scrollTo(SectionId.Contact)}
            className="group px-10 py-5 bg-white text-black font-black rounded-full flex items-center gap-3 hover:scale-105 transition-all text-sm uppercase tracking-widest shadow-2xl shadow-white/10"
          >
            Book your complimentary 30 minute consult
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => scrollTo(SectionId.WhatWeDo)}
            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-gray-400 transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
              <Play size={16} fill="white" />
            </div>
            See What We Do
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <div className="w-[1px] h-12 bg-white" />
      </div>
    </section>
  );
};

export default Hero;
