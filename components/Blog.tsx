
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionId, BlogPost } from '../types';

const Blog: React.FC = () => {
  const posts: BlogPost[] = [
    {
      id: 1,
      title: "The 360 Framework for Scale",
      excerpt: "How to decouple your growth from your hours. A deep dive into systems thinking for modern founders.",
      date: "Oct 24, 2024",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Lessons from the Sneaker Industry",
      excerpt: "Why logistics is the hidden competitive advantage for retail brands in 2025 and beyond.",
      date: "Sep 12, 2024",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Coaching vs Consulting",
      excerpt: "Why high-performers need both to reach the next tier of professional achievement.",
      date: "Aug 05, 2024",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id={SectionId.Blog} className="py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase block mb-6">Insights</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-gradient leading-none">
              The 360 Blog.
            </h2>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border-b border-white/20 pb-2 hover:border-white transition-all">
            View All Posts <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-6">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-3">{post.date}</span>
              <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-gray-300 transition-colors">{post.title}</h3>
              <p className="text-gray-400 leading-relaxed font-light line-clamp-2">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
