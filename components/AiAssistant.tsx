
import React, { useState } from 'react';
import { Send, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { getBusinessAnalysis } from '../services/gemini';
import { AnalysisResult, SectionId } from '../types';

const AiAssistant: React.FC = () => {
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await getBusinessAnalysis(challenge);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={SectionId.Analysis} className="py-32 px-6 bg-black border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-400 mb-6">
            <Sparkles size={14} className="text-white" />
            BETA: 360 AI STRATEGIST
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 text-gradient">
            Get a 360 Perspective. <br /> Instantly.
          </h2>
          <p className="text-gray-400 text-lg">
            Tell our AI what your biggest business hurdle is right now. We'll give you a high-level strategic, operational, and growth-focused breakdown.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="relative mb-12">
          <textarea
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            placeholder="e.g., 'We are struggling to maintain service quality while scaling our client base...'"
            className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all min-h-[200px] resize-none"
          />
          <button
            type="submit"
            disabled={loading || !challenge.trim()}
            className="absolute bottom-6 right-6 p-4 bg-white text-black rounded-full hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
          </button>
        </form>

        {error && (
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-200 mb-12">
            <AlertCircle className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Strategy</h4>
                <p className="text-gray-300 leading-relaxed">{result.strategy}</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Operations</h4>
                <p className="text-gray-300 leading-relaxed">{result.operations}</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Growth</h4>
                <p className="text-gray-300 leading-relaxed">{result.growth}</p>
              </div>
            </div>
            <div className="p-10 bg-white text-black rounded-3xl mt-4">
              <h3 className="text-2xl font-bold mb-4">360 Executive Summary</h3>
              <p className="text-lg leading-relaxed">{result.summary}</p>
              <button 
                onClick={() => document.getElementById(SectionId.Contact)?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-8 px-6 py-3 bg-black text-white rounded-full font-bold hover:opacity-80 transition-opacity"
              >
                Discuss This Plan With Me
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AiAssistant;
