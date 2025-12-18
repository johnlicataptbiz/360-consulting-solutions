
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { SectionId } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Clients', id: SectionId.Clients },
    { name: 'Testimonials', id: SectionId.Testimonials },
    { name: 'What We Do', id: SectionId.WhatWeDo },
    { name: 'About 360', id: SectionId.About },
    { name: 'Blog', id: SectionId.Blog },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-lg py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-xl font-black tracking-tighter cursor-pointer flex items-center gap-2"
          onClick={() => scrollToSection(SectionId.Home)}
        >
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-[10px]">360</span>
          </div>
          <span className="hidden sm:inline">360 CONSULTING</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection(SectionId.Contact)}
            className="px-6 py-2 bg-white text-black text-[11px] font-bold tracking-widest uppercase rounded-full hover:bg-gray-200 transition-colors"
          >
            Book Consult
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="fixed inset-0 top-[72px] bg-black z-40 p-6 flex flex-col gap-8 lg:hidden animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-2xl font-black tracking-tighter text-gray-300 border-b border-white/5 pb-4"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection(SectionId.Contact)}
            className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-full"
          >
            Book 30m Consult
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
