
import React from 'react';
import { Linkedin, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { SectionId } from '../types';

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-20 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-32">
          <div className="max-w-sm">
            <div 
              className="text-3xl font-black tracking-tighter mb-8 flex items-center gap-2 cursor-pointer"
              onClick={() => scrollTo(SectionId.Home)}
            >
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-[11px]">360</span>
              </div>
              <span>360</span>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">
              Full-circle consulting for founders and executives who want to build something that scales without them.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24 w-full">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Focus</span>
              <button onClick={() => scrollTo(SectionId.Clients)} className="text-gray-500 hover:text-white transition-colors text-left font-bold uppercase text-[10px] tracking-widest">Our Clients</button>
              <button onClick={() => scrollTo(SectionId.Testimonials)} className="text-gray-500 hover:text-white transition-colors text-left font-bold uppercase text-[10px] tracking-widest">Testimonials</button>
              <button onClick={() => scrollTo(SectionId.WhatWeDo)} className="text-gray-500 hover:text-white transition-colors text-left font-bold uppercase text-[10px] tracking-widest">What We Do</button>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Connect</span>
              <button onClick={() => scrollTo(SectionId.About)} className="text-gray-500 hover:text-white transition-colors text-left font-bold uppercase text-[10px] tracking-widest">About 360</button>
              <button onClick={() => scrollTo(SectionId.Blog)} className="text-gray-500 hover:text-white transition-colors text-left font-bold uppercase text-[10px] tracking-widest">Blog</button>
              <button onClick={() => scrollTo(SectionId.Contact)} className="text-gray-500 hover:text-white transition-colors text-left font-bold uppercase text-[10px] tracking-widest">Book Consult</button>
            </div>
            <div className="hidden md:flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Office</span>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest leading-loose">
                Remote / Global <br />
                Headquartered in <br />
                the United States
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-600 font-bold uppercase text-[10px] tracking-widest">
            © {new Date().getFullYear()} 360 Consulting Solutions. High Performance Systems.
          </p>
          <button 
            onClick={() => scrollTo(SectionId.Home)}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white"
          >
            Back to top
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
              <ArrowUp size={16} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
