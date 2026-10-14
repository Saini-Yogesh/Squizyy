import React, { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { subscribeNewsletter } from '../../services/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus({ loading: true, success: false, message: '' });
    try {
      const res = await subscribeNewsletter(email, 'homepage_signup_10');
      setStatus({ loading: false, success: true, message: res.message || 'Thanks for subscribing! Use code WELCOME10 at checkout.' });
      setEmail('');
    } catch {
      setStatus({ loading: false, success: false, message: 'Something went wrong. Please check your email and try again.' });
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl border-4 border-foreground p-8 sm:p-14 text-center shadow-xl relative overflow-hidden">
        
        {/* Floating Peanuts & Dripping Accents */}
        <div className="absolute -top-6 -left-6 w-20 h-auto opacity-70 pointer-events-none">
          <img src="/assets/images/Union.svg" alt="" className="w-full" />
        </div>
        <div className="absolute -bottom-6 -right-6 w-24 h-auto opacity-80 pointer-events-none">
          <img src="/assets/images/peanut-small.png" alt="" className="w-full" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-accent-green bg-accent-green/10 px-4 py-1.5 rounded-full inline-block mb-4 border border-accent-green/20">
            Exclusive Community Perks
          </span>
          <h2 className="font-champ text-3xl sm:text-5xl uppercase tracking-tight text-foreground">
            Sign up & save 10%
          </h2>
          <p className="mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed">
            Subscribe to our newsletter for first access to fresh roasted batches, secret flavor releases, and 10% off your first order.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full sm:flex-1 bg-background border-2 border-foreground rounded-full px-5 py-3.5 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent-purple"
            />
            <button
              type="submit"
              disabled={status.loading}
              className="w-full sm:w-auto btn-drizzy-primary text-sm py-3.5 px-8 whitespace-nowrap flex items-center justify-center gap-2"
            >
              {status.loading ? 'Signing Up...' : 'Get my 10% off'}
              <ArrowRight size={16} />
            </button>
          </form>

          {status.message && (
            <div className={`mt-4 text-sm font-medium flex items-center justify-center gap-1.5 ${status.success ? 'text-accent-green' : 'text-red-600'}`}>
              {status.success && <CheckCircle2 size={16} />}
              <span>{status.message}</span>
            </div>
          )}

          <p className="mt-4 text-xs font-mono text-foreground/50">
            By signing up, you agree to receive email updates. Unsubscribe anytime with 1 click.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;
