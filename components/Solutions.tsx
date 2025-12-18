
import React from 'react';
import { Target, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { SectionId } from '../types';

const Solutions: React.FC = () => {
  const solutions = [
    {
      title: 'Strategic Architecture',
      description: 'Defining clear, actionable paths from where you are to where you need to be. We build the vision.',
      icon: <Target className="text-white" size={32} />,
    },
    {
      title: 'Operational Excellence',
      description: 'Removing friction. We build systems that run smoothly so you can focus on leading.',
      icon: <ShieldCheck className="text-white" size={32} />,
    },
    {
      title: 'Growth Acceleration',
      description: 'Identifying high-leverage opportunities and implementing infrastructure to capture them.',
      icon: <TrendingUp className="text-white" size={32} />,
    },
    {
      title: 'The 360 Audit',
      description: 'A deep-dive analysis into every corner of your business to find hidden bottlenecks.',
      icon: <Zap className="text-white" size={32} />,
    },
  ];

  return (
    <section id={SectionId.WhatWeDo} className="py-32 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <span className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase mb-6 block">What We Do</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
              Holistic business <br /> alignment.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              Most consultants look at one piece of the puzzle. We look at the whole picture. If your strategy is great but your operations are broken, you fail. 
            </p>
            <div className="mt-12 w-20 h-2 bg-black" />
          </div>

          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
            {solutions.map((item, idx) => (
              <div key={idx} className="p-10 border border-gray-100 rounded-[40px] hover:border-black transition-all group">
                <div className="mb-8 bg-black p-4 inline-block rounded-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-2xl font-black tracking-tight mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
