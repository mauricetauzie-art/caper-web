'use client';

import { useState } from 'react';

interface ContactFormProps {
  currentPillar: 'creative' | 'analytics' | 'experiences';
}

export default function ContactForm({ currentPillar }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    details: '',
  });

  // Dynamic configuration maps based on the current pillar context
  const config = {
    creative: {
      accentColor: 'focus:border-white',
      options: ['Commercial Video', 'Brand Photography', 'Identity Systems'],
      budgets: ['$1,500 - $3,000', '$3,000 - $5,000', '$5,000+'],
    },
    analytics: {
      accentColor: 'focus:border-emerald-500',
      options: ['Field Operations Tracking', 'Geospatial Architecture', 'Data Pipeline Security'],
      budgets: ['Milestone-Based', 'Full Project Contract', 'Long-Term Advisory'],
    },
    experiences: {
      accentColor: 'focus:border-violet-500',
      options: ['Corporate Team-Building', 'Custom App/Game Build', 'Esports/Gaming Activation'],
      budgets: ['Single Event Tier', 'Custom Software Dev', 'Enterprise Consultation'],
    },
  };

  const activeConfig = config[currentPillar];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Route payload to your existing backend system or EmailAPI, tagged with the active pillar
    const payload = { ...formData, pillar: currentPillar };
    console.log('Submitting elite inquiry:', payload);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6 font-sans text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">[ YOUR NAME ]</label>
          <input 
            type="text" required
            className={`w-full bg-zinc-900/40 border border-zinc-800 rounded-sm px-4 py-3 text-sm text-white outline-none transition-all ${activeConfig.accentColor}`}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">[ WORK EMAIL ]</label>
          <input 
            type="email" required
            className={`w-full bg-zinc-900/40 border border-zinc-800 rounded-sm px-4 py-3 text-sm text-white outline-none transition-all ${activeConfig.accentColor}`}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">[ PROJECT SCOPE ]</label>
          <select 
            required
            className={`w-full bg-zinc-900 border border-zinc-800 rounded-sm px-4 py-3 text-sm text-white outline-none transition-all ${activeConfig.accentColor}`}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          >
            <option value="">Select scope...</option>
            {activeConfig.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">[ ALLOCATION SCALE ]</label>
          <select 
            required
            className={`w-full bg-zinc-900 border border-zinc-800 rounded-sm px-4 py-3 text-sm text-white outline-none transition-all ${activeConfig.accentColor}`}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          >
            <option value="">Select range...</option>
            {activeConfig.budgets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">[ BRIEF ARCHITECTURE ]</label>
        <textarea 
          rows={4} required
          placeholder="Outline the parameters, goals, and delivery timelines..."
          className={`w-full bg-zinc-900/40 border border-zinc-800 rounded-sm px-4 py-3 text-sm text-zinc-300 placeholder-zinc-600 outline-none transition-all resize-none ${activeConfig.accentColor}`}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
        />
      </div>

      <button 
        type="submit" 
        className="text-[10px] font-mono tracking-[0.3em] uppercase bg-white text-black font-bold px-8 py-4 rounded-sm hover:bg-zinc-200 transition-colors"
      >
        INITIATE PROJECT BRIEF →
      </button>
    </form>
  );
}