'use client';
import { useState } from 'react';

export default function Booking() {
  // 1. Manage form state fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Photography',
    eventDate: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // 2. Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Simple client-side submission wrapper
  const handleSubmit = (e) => {
    e.preventDefault();
    // Later we can hook this up to send real emails via EmailJS or an API route
    console.log("Client Booking Data:", formData);
    setSubmitted(true);
  };

  return (
    <section id="booking" className="min-h-screen w-full bg-zinc-950 px-6 md:px-24 py-24 border-t border-zinc-900">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-xs tracking-[0.4em] uppercase text-zinc-500 font-bold mb-4">
            // COLLABORATION & REQUISITIONS
          </h2>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            Book a Session
          </h3>
          <p className="text-zinc-400 font-light mt-2 text-sm md:text-base">
            Let's translate your concepts into exceptional, life-filled media assets.
          </p>
        </div>

        {submitted ? (
          <div className="border border-zinc-700 bg-zinc-900/20 p-8 text-center animate-fadeIn">
            <h4 className="text-xl font-bold uppercase tracking-wider text-white mb-2">Thank You</h4>
            <p className="text-sm text-zinc-400 font-light">
              Your inquiry has been logged successfully. We'll review your creative details and get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">Your Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  className="w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors rounded-none"
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  className="w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors rounded-none"
                />
              </div>
            </div>

            {/* Service Selection and Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">Select Service Type</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors rounded-none appearance-none cursor-pointer"
                >
                  <option value="Photography">Photography</option>
                  <option value="Videography">Videography</option>
                  <option value="Graphic Designing">Graphic Designing</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">Proposed Session Date</label>
                <input 
                  type="date" 
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors rounded-none dark:[color-scheme:dark]"
                />
              </div>
            </div>

            {/* Creative Brief Details */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">Creative Project Brief & Vision</label>
              <textarea 
                name="details"
                rows="5"
                value={formData.details}
                onChange={handleChange}
                placeholder="Tell us about your event, desired output aesthetic, or promotional design parameters..." 
                className="w-full bg-zinc-900/50 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 transition-colors rounded-none resize-none"
              />
            </div>

            {/* Action Submit Button */}
            <button 
              type="submit"
              className="w-full md:w-auto bg-white text-black text-xs font-black uppercase tracking-widest px-10 py-4 hover:bg-zinc-200 transition-colors rounded-none duration-300"
            >
              Send Project Request →
            </button>

          </form>
        )}

      </div>
    </section>
  );
}