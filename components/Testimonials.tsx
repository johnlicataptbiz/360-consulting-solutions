
import React from 'react';
import { Quote } from 'lucide-react';
import { SectionId } from '../types';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      text: "360 didn't just give us a map; they built the engine. We've scaled 3x in 12 months without increasing my personal workload.",
      author: "Founder, Holo Footwear",
      position: "CEO & Visionary"
    },
    {
      text: "The operational audits alone were worth the entire investment. We found bottlenecks we didn't even know existed.",
      author: "Managing Partner",
      position: "Sneaker Impact"
    }
  ];

  return (
    <section id={SectionId.Testimonials} className="py-32 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase block mb-6">Testimonials</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
              What founders say <br /> about 360.
            </h2>
            <div className="w-20 h-2 bg-black" />
          </div>
          <div className="space-y-12">
            {reviews.map((r, i) => (
              <div key={i} className="relative pl-12">
                <Quote className="absolute left-0 top-0 text-gray-200" size={40} />
                <p className="text-2xl md:text-3xl font-light italic leading-relaxed mb-6">"{r.text}"</p>
                <div>
                  <h4 className="font-black text-lg">{r.author}</h4>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{r.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
