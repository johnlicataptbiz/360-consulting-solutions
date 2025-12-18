
import React from 'react';
import { SectionId } from '../types';

const Partners: React.FC = () => {
  const partners = [
    { name: 'Holo Footwear', description: 'NBA/WNBA Signatures. Available at Nordstrom, Finish Line.' },
    { name: 'Sneaker Impact', description: 'Strategic Sustainability Partner.' },
    { name: 'Physical Therapy Biz', description: 'Shared Growth & Booking Integration.' },
  ];

  return (
    <section id={SectionId.Clients} className="py-24 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">Trusted By Industry Leaders</span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 items-center justify-center">
          {partners.map((p, i) => (
            <div key={i} className="group p-8 text-center border border-transparent hover:border-white/10 rounded-3xl transition-all">
              <h3 className="text-3xl font-black tracking-tighter text-white mb-2 grayscale group-hover:grayscale-0 transition-all duration-500">{p.name}</h3>
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">{p.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 flex flex-wrap justify-center items-center gap-16 opacity-20 grayscale hover:opacity-40 transition-opacity">
           <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/National_Basketball_Association_logo.svg/105px-National_Basketball_Association_logo.svg.png" alt="NBA" className="h-12" />
           <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WNBA_logo.svg/200px-WNBA_logo.svg.png" alt="WNBA" className="h-8" />
           <img src="https://logos-world.net/wp-content/uploads/2021/08/Nordstrom-Logo.png" alt="Nordstrom" className="h-6" />
        </div>
      </div>
    </section>
  );
};

export default Partners;
