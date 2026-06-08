'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'photography',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    try {
      // Wired up with your production Formspree ID: xdajzzaq
      const response = await fetch('https://formspree.io/f/xdajzzaq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          'Requested Service': formData.service,
          Message: formData.message
        })
      });

      if (response.ok) {
        setStatus({ loading: false, success: true, error: false });
        setFormData({ name: '', email: '', service: 'photography', message: '' });
        
        // Clear success message after 5 seconds
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        throw new Error('Transmission failed');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return (
    <section id="contact" className="w-full bg-zinc-950 px-6 md:px-24 py-24 border-t border-zinc-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        
        {/* Left Column: Info Layout */}
        <div className="flex flex-col justify-between space-y-12">
          <div>
            <h2 className="text-xs tracking-[0.4em] uppercase text-zinc-500 font-bold mb-3">// COLLABORATION</h2>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">LET'S BUILD <br />SOMETHING REAL</h3>
            <p className="text-zinc-400 font-light max-w-md leading-relaxed">
              Have a narrative, a brand identity, or a visual space that needs high-end creative execution? Drop the details here, and let's bring it to life.
            </p>
          </div>

          <div className="space-y-4 border-t border-zinc-900 pt-8 text-sm text-zinc-500">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600 font-semibold mb-1">Socials</p>
              <p className="text-zinc-300 font-mono">Instagram: @caper_mw</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600 font-semibold mb-1">Location</p>
              <p className="text-zinc-300">Available for Global Bookings</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Intake Form */}
        <div className="bg-zinc-900/30 border border-zinc-900 p-8 md:p-10 backdrop-blur-sm relative">
          
          {/* Formspree Transmission Success Screen */}
          {status.success && (
            <div className="absolute inset-0 bg-zinc-950/90 z-20 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <span className="text-emerald-500 text-3xl mb-4">✓</span>
              <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-2">Transmission Received</h4>
              <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
                Your project brief has been logged. We'll review the scope and get back to you within 24 hours.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">Your Name</label>
              <input 
                type="text" required value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-950/50 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors duration-300 rounded-none"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">Email Address</label>
              <input 
                type="email" required value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-zinc-950/50 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors duration-300 rounded-none"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">Required Creative Pillar</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {['photography', 'videography', 'graphic design'].map((service) => (
                  <button
                    key={service} type="button" onClick={() => setFormData({...formData, service})}
                    className={`py-2 text-center text-xs tracking-wider uppercase border font-medium transition-all duration-300 rounded-none ${
                      formData.service === service
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-transparent text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    {service === 'graphic design' ? 'Design' : service === 'videography' ? 'Motion' : 'Still'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">Project Brief / Scope</label>
              <textarea 
                rows="4" required value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-zinc-950/50 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors duration-300 resize-none rounded-none"
                placeholder="Describe your vision, timeline, or asset needs..."
              />
            </div>

            <button 
              type="submit" disabled={status.loading}
              className="w-full bg-white text-black hover:bg-zinc-200 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 rounded-none mt-4 disabled:bg-zinc-700"
            >
              {status.loading ? 'Sending Request...' : 'Submit Project Brief'}
            </button>

            {status.error && (
              <p className="text-xs text-red-500 font-medium tracking-wide text-center">
                An error occurred. Please try again or email directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}