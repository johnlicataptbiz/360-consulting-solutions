import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CustomCalendar from './CustomCalendar';
import { ServiceItem } from '../types';

interface ConsultModalProps {
  onClose: () => void;
  selectedService?: ServiceItem | null;
}

const ConsultModal: React.FC<ConsultModalProps> = ({ onClose, selectedService }) => {
  const [loading, setLoading] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
    };
  }, []);

  // No HubSpot embed – we will render the custom calendar component directly.

  const defaultDetails = [
    'Identify core operational and life bottlenecks.',
    'Define clear trajectory for the next 12 months.',
    'No-obligation strategic audit.',
  ];
  const details = selectedService?.details || defaultDetails;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/95 backdrop-blur-xl"
      />

      {/* Modal container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 w-full max-w-6xl h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row bg-gray-950"
      >
        {/* ═══════════════════════════════════════════════════════════════
            LEFT PANEL – Branding, Details, Photo (Desktop only)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex w-[360px] bg-gradient-to-b from-gray-900 to-gray-950 border-r border-white/10 flex-col shrink-0 overflow-hidden">
          {/* Top section: Logo + Text */}
          <div className="p-10 pb-8">
            {/* Logo */}
            <img
              src="/images/360-logo-new.png"
              alt="360 Consulting Solutions"
              className="h-12 w-auto object-contain brightness-0 invert mb-10"
            />

            {/* Headline */}
            <h2 className="text-4xl font-black mb-8 leading-[1.05] tracking-tight uppercase font-heading text-white">
              {selectedService ? (
                <>
                  The <span className="text-orange-500">{selectedService.title.split(' ')[0]}</span>
                  <br />Logic.
                </>
              ) : (
                <>
                  The Logic of
                  <br />
                  <span className="text-orange-500">Success.</span>
                </>
              )}
            </h2>

            {/* Details list */}
            <div className="space-y-5">
              {details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-xs mt-0.5 shrink-0 font-bold">
                    ✓
                  </div>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo section – contained at bottom */}
          <div className="flex-1 relative mt-auto min-h-[280px]">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/images/john-office-headshot.jpg"
                alt="John Licata"
                className="w-full h-full object-cover object-top scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />
            </div>
            {/* Name badge */}
            <div className="absolute bottom-8 left-10 z-10">
              <p className="text-white font-black text-2xl uppercase tracking-tight font-heading leading-none mb-1">
                John Licata
              </p>
              <p className="text-orange-500 text-[10px] uppercase font-black tracking-[0.35em]">
                Principal Coach
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            RIGHT PANEL – HubSpot Embed with Strategic Overlays
        ═══════════════════════════════════════════════════════════════ */}
        <div className="flex-1 bg-white relative flex flex-col overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-[70] w-11 h-11 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all active:scale-95 shadow-lg border border-gray-200"
            aria-label="Close Modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* ══════ STRATEGIC OVERLAYS ══════ */}

          {/* Top overlay - covers HubSpot profile photo, adds custom header */}
          <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-white via-white to-white/95 z-[60] pointer-events-none flex items-center justify-center">
            <div className="text-center pt-2">
              <p className="text-[10px] font-black tracking-[0.4em] text-orange-500 uppercase mb-1">
                Schedule Your Session
              </p>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">
                Select a Date & Time
              </h3>
            </div>
          </div>

          {/* Right side overlay - covers "Meeting duration" header area */}
          <div className="absolute top-[100px] right-0 w-[220px] h-[120px] bg-white z-[60] pointer-events-none flex flex-col justify-center px-4">
            <p className="text-[9px] font-black tracking-[0.3em] text-gray-400 uppercase mb-1">
              Available
            </p>
            <p className="text-lg font-black text-gray-900 tracking-tight">
              Time Slots
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              30-minute session
            </p>
          </div>

          {/* Mobile header (only visible on small screens) */}
          <div className="lg:hidden p-6 pb-4 border-b border-gray-100 relative z-[65]">
            <img
              src="/images/360-logo-new.png"
              alt="360 Consulting Solutions"
              className="h-8 w-auto object-contain mb-3"
            />
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              Book Your Session
            </h3>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-[80] bg-white">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 border-[3px] border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-5" />
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                  Loading Calendar...
                </p>
              </div>
            </div>
          )}

          {/* Render the custom calendar component */}
          <CustomCalendar onClose={onClose} selectedService={selectedService?.title} />

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/80 relative z-[60]">
            <p className="text-center text-[10px] text-gray-400 font-semibold uppercase tracking-[0.3em]">
              Secure Booking • 30-Min Strategic Audit • Priority Access
            </p>
          </div>
        </div>
      </motion.div>

      {/* Global styles for HubSpot iframe */}
      <style>{`
        .meetings-iframe-container iframe {
          border: none !important;
          border-radius: 0 !important;
          width: 100% !important;
          height: 100% !important;
          min-height: 500px !important;
        }
      `}</style>
    </div>
  );
};

export default ConsultModal;
