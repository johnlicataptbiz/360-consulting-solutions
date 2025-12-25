import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  BarChart3, 
  Users, 
  Settings, 
  Target, 
  Download, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';

// --- Types ---
interface WorkbookState {
  dependencyAudit: {
    sales: number;
    roadmap: number;
    hiring: number;
    crisis: number;
    financials: number;
    missingSystem: string;
  };
  stressTest: {
    processes: Array<{ name: string; weakness: string; upgrade: string }>;
  };
  leadershipShift: {
    currentTask: string;
    shiftAction: string;
    timeline: string;
  };
  decisionMatrix: {
    budget: string;
    risk: string;
    okr: string;
  };
  commitment: {
    priorities: [string, string, string];
  };
}

interface ScaleBlueprintWorkbookProps {
  onClose: () => void;
}

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div className="absolute inset-0 border-2 border-[#FF7A3D] rounded-full animate-pulse"></div>
      <div className="w-4 h-4 bg-[#FF7A3D] rounded-full"></div>
    </div>
    <div className="flex flex-col leading-tight">
      <span className="font-heading font-bold text-lg tracking-tight text-white">360</span>
      <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-slate-400">Consulting Solutions</span>
    </div>
  </div>
);

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
      <motion.div 
        className="bg-[#FF7A3D] h-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

// --- Step Content Components ---

const Introduction = ({ next }: { next: () => void }) => (
  <div className="space-y-8">
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF7A3D]/10 text-[#FF7A3D] rounded-full text-xs font-bold uppercase tracking-widest border border-[#FF7A3D]/20">
      <Target size={14} /> Objective
    </div>
    <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-white leading-tight uppercase tracking-tighter">
      The Scale Blueprint: <br/>
      <span className="text-[#FF7A3D]">Digital Workbook</span>
    </h1>
    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-light">
      This interactive guide is designed for founders encountering growth ceilings. 
      The goal: move from ad-hoc success to sustainable nine-figure operations by addressing 
      three critical pillars: <strong>Core Systems</strong>, <strong>Leadership Shifts</strong>, 
      and <strong>Decision Frameworks</strong>.
    </p>
    <div className="grid md:grid-cols-3 gap-6 pt-6">
      {[
        { icon: <Users />, title: "Dependency", desc: "Audit your personal involvement in ops." },
        { icon: <Settings />, title: "Systems", desc: "Stress test your core processes." },
        { icon: <BarChart3 />, title: "Decisions", desc: "Codify frameworks for team velocity." },
      ].map((item, i) => (
        <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-[#FF7A3D]/30 transition-colors">
          <div className="text-[#FF7A3D] mb-4">{item.icon}</div>
          <h3 className="font-bold text-lg mb-2 text-white uppercase tracking-tight">{item.title}</h3>
          <p className="text-sm text-slate-500">{item.desc}</p>
        </div>
      ))}
    </div>
    <button 
      onClick={next}
      className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-[#FF7A3D] hover:text-white transition-all group"
    >
      Begin Blueprint <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);

const PillarOne = ({ data, onChange }: { data: WorkbookState['dependencyAudit'], onChange: (d: WorkbookState['dependencyAudit']) => void }) => {
  const fields: Array<{ key: keyof WorkbookState['dependencyAudit'], label: string }> = [
    { key: 'sales', label: 'Sales Closings' },
    { key: 'roadmap', label: 'Product Roadmap Decisions' },
    { key: 'hiring', label: 'Key Hiring Decisions' },
    { key: 'crisis', label: 'Crisis Management' },
    { key: 'financials', label: 'Financial Approvals' },
  ];

  const update = (key: string, val: any) => onChange({ ...data, [key]: val });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-bold text-[#FF7A3D] uppercase tracking-widest mb-2">Pillar One</h2>
        <h3 className="font-heading text-3xl font-bold text-white uppercase tracking-tight text-gradient">Breaking Founder Dependency</h3>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl space-y-10 border border-white/10">
        <div className="flex items-start gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <AlertCircle className="text-blue-400 mt-1 flex-shrink-0" />
          <p className="text-sm text-blue-100 font-light">
            <strong className="font-bold">Diagnostic: The Dependency Audit.</strong> Rate each area from 1 to 5. 
            <br/><span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">1 = Completely Independent | 5 = Founder Required</span>
          </p>
        </div>

        <div className="space-y-8">
          {fields.map(({ key, label }) => (
            <div key={key} className="space-y-4">
              <div className="flex justify-between items-center text-gradient">
                <label className="font-bold uppercase tracking-tight text-slate-300">{label}</label>
                <span className="text-[#FF7A3D] font-black text-xl">{data[key]}</span>
              </div>
              <input 
                type="range" min="1" max="5" 
                value={data[key] as number}
                onChange={(e) => update(key, parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF7A3D]"
                aria-label={label}
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <span>Hands-off</span>
                <span>Fully Dependent</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest">
          Workbook Prompt: Look at scores 4-5. What is the one specific playbook missing?
        </label>
        <textarea 
          placeholder="e.g., A standardized hiring rubric or a delegated sales commission structure..."
          className="w-full h-32 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white focus:border-[#FF7A3D] focus:ring-1 focus:ring-[#FF7A3D] outline-none transition-all"
          value={data.missingSystem}
          onChange={(e) => update('missingSystem', e.target.value)}
        />
      </div>
    </div>
  );
};

const PillarTwo = ({ data, onChange }: { data: WorkbookState['stressTest'], onChange: (d: WorkbookState['stressTest']) => void }) => {
  const updateRow = (idx: number, field: string, val: string) => {
    const newProcs = [...data.processes];
    newProcs[idx] = { ...newProcs[idx], [field]: val };
    onChange({ ...data, processes: newProcs });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-bold text-[#FF7A3D] uppercase tracking-widest mb-2">Pillar Two</h2>
        <h3 className="font-heading text-3xl font-bold text-white uppercase tracking-tight text-gradient">Core Systems for Scale</h3>
      </div>

      <div className="p-6 bg-[#FF7A3D]/5 border border-[#FF7A3D]/10 rounded-2xl">
        <p className="text-slate-400 font-light">
          <strong className="text-white font-bold">Exercise: The Scalability Stress Test.</strong> List your top revenue-generating processes. 
          If revenue tripled tomorrow, which of these would break?
        </p>
      </div>

      <div className="overflow-hidden bg-white/5 rounded-3xl border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Process Name</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Current Weakness</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Required Upgrade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.processes.map((proc, idx) => (
              <tr key={idx}>
                <td className="p-2">
                  <input 
                    placeholder="e.g., Onboarding"
                    className="w-full bg-transparent p-2 outline-none focus:text-[#FF7A3D] transition-colors text-white text-sm"
                    value={proc.name}
                    onChange={(e) => updateRow(idx, 'name', e.target.value)}
                  />
                </td>
                <td className="p-2 border-x border-white/5 text-sm">
                   <input 
                    placeholder="e.g., Manual data entry"
                    className="w-full bg-transparent p-2 outline-none focus:text-[#FF7A3D] transition-colors text-white"
                    value={proc.weakness}
                    onChange={(e) => updateRow(idx, 'weakness', e.target.value)}
                  />
                </td>
                <td className="p-2 text-sm">
                   <input 
                    placeholder="e.g., CRM automation"
                    className="w-full bg-transparent p-2 outline-none focus:text-[#FF7A3D] transition-colors text-white"
                    value={proc.upgrade}
                    onChange={(e) => updateRow(idx, 'upgrade', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PillarThree = ({ data, onChange }: { data: WorkbookState['leadershipShift'], onChange: (d: WorkbookState['leadershipShift']) => void }) => {
  const update = (key: string, val: string) => onChange({ ...data, [key]: val });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-bold text-[#FF7A3D] uppercase tracking-widest mb-2">Pillar Three</h2>
        <h3 className="font-heading text-3xl font-bold text-white uppercase tracking-tight text-gradient">Leadership Shifts</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center bg-white/5 p-8 rounded-3xl border border-white/10">
        <div className="w-24 h-24 bg-[#FF7A3D]/20 rounded-full flex items-center justify-center text-[#FF7A3D] flex-shrink-0">
          <Users size={40} />
        </div>
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-white uppercase tracking-tight">The "Who" vs. "How" Shift</h4>
          <p className="text-slate-400 font-light">
            To scale, you must stop asking <em>"How do I do this?"</em> and start asking 
            <span className="text-[#FF7A3D] font-black italic"> "Who creates this?"</span>
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Current "Doing" Task</label>
          <input 
            placeholder="e.g., Reviewing every marketing email"
            className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-[#FF7A3D] transition-all"
            value={data.currentTask}
            onChange={(e) => update('currentTask', e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">The Leadership Shift</label>
          <input 
            placeholder="e.g., Creating a Brand Guide + Hire VP Marketing"
            className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-[#FF7A3D] transition-all"
            value={data.shiftAction}
            onChange={(e) => update('shiftAction', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Timeline for Handoff</label>
          <input 
            placeholder="e.g., By end of Q3"
            className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-[#FF7A3D] transition-all"
            value={data.timeline}
            onChange={(e) => update('timeline', e.target.value)}
          />
        </div>
    </div>
  );
};

const PillarFour = ({ data, onChange }: { data: WorkbookState['decisionMatrix'], onChange: (d: WorkbookState['decisionMatrix']) => void }) => {
  const update = (key: string, val: string) => onChange({ ...data, [key]: val });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-bold text-[#FF7A3D] uppercase tracking-widest mb-2">Pillar Four</h2>
        <h3 className="font-heading text-3xl font-bold text-white uppercase tracking-tight text-gradient">Decision Frameworks</h3>
      </div>

      <div className="bg-white/5 p-8 rounded-3xl border border-white/10 border-l-4 border-l-[#FF7A3D]">
        <h4 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">The $100M Decision Matrix</h4>
        <p className="text-slate-400 mb-8 font-light leading-relaxed">
          Nine-figure operations require codified frameworks to maintain velocity. 
          Create a heuristic for your team to move forward without you.
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
             <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
               <CheckCircle2 size={24} />
             </div>
             <div className="font-black uppercase tracking-tight text-[10px] text-slate-200">The "Green Light" Protocol</div>
          </div>

          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="w-48 text-[10px] font-black text-slate-500 uppercase tracking-widest">Budget is under:</span>
              <input 
                placeholder="$10,000..."
                className="flex-1 bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none focus:border-[#FF7A3D]"
                value={data.budget}
                onChange={(e) => update('budget', e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="w-48 text-[10px] font-black text-slate-500 uppercase tracking-widest">Risk Level is:</span>
              <input 
                placeholder="Operational, non-brand affecting..."
                className="flex-1 bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none focus:border-[#FF7A3D]"
                value={data.risk}
                onChange={(e) => update('risk', e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="w-48 text-[10px] font-black text-slate-500 uppercase tracking-widest">It Aligns with:</span>
              <input 
                placeholder="Q2 Customer Retention OKR..."
                className="flex-1 bg-slate-900 border border-slate-800 p-3 rounded-xl text-white outline-none focus:border-[#FF7A3D]"
                value={data.okr}
                onChange={(e) => update('okr', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinalSummary = ({ data, onChange }: { data: WorkbookState, onChange: (p: WorkbookState['commitment']) => void }) => {
  const updatePriority = (idx: number, val: string) => {
    const newPs = [...data.commitment.priorities] as [string, string, string];
    newPs[idx] = val;
    onChange({ priorities: newPs });
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <h2 className="font-heading text-4xl font-black text-white uppercase tracking-tighter">Commitment to Scale</h2>
        <p className="text-[#FF7A3D] font-black uppercase tracking-[0.3em] text-[10px]">Target: Sustainable Nine-Figure Operations</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 no-print">
        <div className="bg-white/5 p-6 rounded-3xl space-y-4 border border-white/10">
          <h5 className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <TrendingUp size={14} className="text-[#FF7A3D]" /> Growth Readiness
          </h5>
          <div className="flex flex-col gap-2">
            {Object.entries(data.dependencyAudit).filter(([k]) => k !== 'missingSystem').map(([k, v]) => (
              <div key={k} className="flex justify-between items-center text-xs uppercase font-bold tracking-tight">
                <span className="capitalize">{k}</span>
                <div className="flex gap-1">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className={`w-3 h-1.5 rounded-full ${i < (v as number) ? 'bg-[#FF7A3D]' : 'bg-slate-800'}`}></div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl space-y-4 border border-white/10">
           <h5 className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <Settings size={14} className="text-[#FF7A3D]" /> System Priorities
          </h5>
          <ul className="space-y-2">
            {data.stressTest.processes.filter(p => p.name).map((p, i) => (
              <li key={i} className="text-[11px] flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#FF7A3D] rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <span className="text-slate-200 font-black uppercase tracking-tight">{p.name}</span>
                  <span className="text-slate-500 ml-1">→ {p.upgrade}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-sm font-black text-slate-300 uppercase tracking-widest text-center">Top 3 Priorities for the Next Quarter:</h4>
        <div className="space-y-4">
          {data.commitment.priorities.map((p, i) => (
            <div key={i} className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF7A3D] font-black italic opacity-50">0{i+1}</span>
              <input 
                placeholder="What is the high-leverage move?"
                className="w-full bg-slate-900 border border-slate-800 py-4 pl-12 pr-6 rounded-2xl text-white outline-none focus:border-[#FF7A3D] focus:bg-slate-800 transition-all font-light"
                value={p}
                onChange={(e) => updatePriority(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 text-center no-print">
        <button 
          onClick={() => window.print()}
          className="px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        >
          <Download size={20} /> Export Final Blueprint
        </button>
      </div>

      {/* Print only watermark */}
      <div className="hidden print:block pt-12 border-t border-slate-800 mt-20 text-center">
        <Logo />
        <p className="text-slate-500 mt-4 text-xs uppercase tracking-widest font-black">Verified Scale Roadmap | Generated {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

const ScaleBlueprintWorkbook: React.FC<ScaleBlueprintWorkbookProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WorkbookState>({
    dependencyAudit: {
      sales: 3,
      roadmap: 3,
      hiring: 3,
      crisis: 3,
      financials: 3,
      missingSystem: ""
    },
    stressTest: {
      processes: [
        { name: "", weakness: "", upgrade: "" },
        { name: "", weakness: "", upgrade: "" },
        { name: "", weakness: "", upgrade: "" }
      ]
    },
    leadershipShift: {
      currentTask: "",
      shiftAction: "",
      timeline: ""
    },
    decisionMatrix: {
      budget: "",
      risk: "",
      okr: ""
    },
    commitment: {
      priorities: ["", "", ""]
    }
  });

  const totalSteps = 6;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#030712] overflow-auto flex flex-col font-sans text-slate-200"
    >
      {/* Header */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-[#030712]/80 backdrop-blur-xl py-4 border-b border-white/5 no-print">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
              The Scale Blueprint <span className="text-[#FF7A3D]">Digital Workbook</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.print()}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
              title="Print to PDF"
            >
              <Download size={20} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
              title="Close Workbook"
              aria-label="Close Workbook"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-12 pb-24 flex flex-col">
        <div className="container mx-auto px-6 max-w-4xl flex-1 flex flex-col">
          
          <div className="mb-12 no-print">
            <ProgressBar current={step + 1} total={totalSteps} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {step === 0 && <Introduction next={nextStep} />}
              {step === 1 && (
                <PillarOne 
                  data={data.dependencyAudit} 
                  onChange={(val) => setData({ ...data, dependencyAudit: val })} 
                />
              )}
              {step === 2 && (
                <PillarTwo 
                  data={data.stressTest} 
                  onChange={(val) => setData({ ...data, stressTest: val })} 
                />
              )}
              {step === 3 && (
                <PillarThree 
                  data={data.leadershipShift} 
                  onChange={(val) => setData({ ...data, leadershipShift: val })} 
                />
              )}
              {step === 4 && (
                <PillarFour 
                  data={data.decisionMatrix} 
                  onChange={(val) => setData({ ...data, decisionMatrix: val })} 
                />
              )}
              {step === 5 && (
                <FinalSummary 
                  data={data} 
                  onChange={(val) => setData({ ...data, commitment: val })} 
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-12 flex justify-between items-center no-print">
            <button
              onClick={prevStep}
              disabled={step === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all ${
                step === 0 
                ? 'opacity-0 pointer-events-none' 
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <ChevronLeft size={18} /> Back
            </button>
            
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
              Step {step + 1} of {totalSteps}
            </div>

            <button
              onClick={nextStep}
              disabled={step === totalSteps - 1}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all ${
                step === totalSteps - 1
                ? 'opacity-0 pointer-events-none'
                : 'bg-[#FF7A3D] text-white hover:shadow-[0_0_40px_rgba(255,122,61,0.2)]'
              }`}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-white/5 text-center no-print">
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
          © 2025 360 Consulting Solutions. Designed for Legacy.
        </p>
      </footer>
    </motion.div>
  );
};

export default ScaleBlueprintWorkbook;
