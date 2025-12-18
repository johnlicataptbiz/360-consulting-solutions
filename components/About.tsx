
import React from 'react';
import { CheckCircle2, Linkedin, Instagram, Facebook } from 'lucide-react';
import { SectionId } from '../types';

const About: React.FC = () => {
  return (
    <section id={SectionId.About} className="py-32 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-5/12">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                alt="Principal Consultant" 
                className="rounded-[40px] shadow-2xl grayscale transition-all duration-700 hover:grayscale-0"
              />
              <div className="absolute -bottom-10 -right-10 bg-black text-white p-10 rounded-3xl hidden md:block rotate-3">
                <p className="text-5xl font-black italic tracking-tighter leading-none">"Impact <br /> & Scale"</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-7/12">
            <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase mb-6 block">Our Story</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
              Coaching the <br /> modern founder.
            </h2>
            <div className="space-y-6 text-xl text-gray-600 mb-10 leading-relaxed font-light">
              <p>
                360 Consulting Solutions was born out of a simple observation: most brilliant founders are prisoners to their own success.
              </p>
              <p>
                My work is focused on holistic business health. We don't just fix one thing; we realign the entire organization so it serves you, rather than you serving it.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {[
                "Data-driven decision frameworks",
                "Automated operational workflows",
                "Strategic talent acquisition",
                "Sustainable revenue modeling"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black/60">
                  <CheckCircle2 className="text-black" size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-black transition-colors"><Linkedin size={24} /></a>
              <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-black transition-colors"><Instagram size={24} /></a>
              <a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-black transition-colors"><Facebook size={24} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
