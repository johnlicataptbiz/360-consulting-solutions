
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { SectionId } from '../types';

const Contact: React.FC = () => {
  return (
    <section id={SectionId.Contact} className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase block mb-6">Let's Connect</span>
            <h2 className="text-6xl md:text-[90px] font-black tracking-tighter mb-8 text-gradient leading-none uppercase">
              Book Your <br /> Consult.
            </h2>
            <p className="text-2xl text-gray-300 font-light mb-12 leading-relaxed italic">
              "The best time to build a system was a year ago. The second best time is now."
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                  <Calendar className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl mb-1 uppercase tracking-tight">30-Minute Discovery</h4>
                  <p className="text-gray-400 font-medium">Complimentary strategy session via HubSpot.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl p-10 md:p-16 rounded-[60px] border border-white/10">
            <h3 className="text-3xl font-black text-white mb-8 tracking-tighter">Ready to evolve?</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-white transition-all outline-none font-bold uppercase tracking-widest text-[10px]" 
                  placeholder="Full Name"
                />
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-white transition-all outline-none font-bold uppercase tracking-widest text-[10px]" 
                  placeholder="Email Address"
                />
              </div>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-white transition-all outline-none font-bold uppercase tracking-widest text-[10px]" 
                placeholder="Company Website"
              />
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-gray-400 focus:border-white transition-all outline-none font-bold uppercase tracking-widest text-[10px] appearance-none cursor-pointer">
                <option className="bg-black">What's your primary bottleneck?</option>
                <option className="bg-black">Operations / Efficiency</option>
                <option className="bg-black">Growth / Revenue</option>
                <option className="bg-black">Strategy / Direction</option>
              </select>
              
              <button 
                type="button"
                className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm shadow-2xl shadow-white/10"
              >
                Book My 30m Consult <ArrowRight size={20} />
              </button>
            </form>
            <p className="mt-8 text-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
              Secured & Managed via HubSpot
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
