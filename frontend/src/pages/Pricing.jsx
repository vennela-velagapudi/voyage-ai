import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, Gift, CheckCircle2 } from 'lucide-react';

const BETA_BENEFITS = [
  'Unlimited AI trip itinerary generations',
  'Full duration customization (1 to 60 days per trip)',
  'All social & companion profiles (Solo, Couple, Family, Business)',
  'Advanced dietary, wellness, & culinary activity filters',
  'Interactive modular Day Accordion visual layout',
  'Estimated attraction ticketing & regional transit indicators',
  'Zero subscription costs or credit card verification required',
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative overflow-hidden pt-12 pb-28 min-h-screen flex items-center justify-center">
      {/* Background Decorative Atmosphere contained in bounds */}
      <div className="absolute inset-0 w-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main Informational Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-3xl glass-effect border border-indigo-500/40 p-8 sm:p-14 shadow-2xl relative overflow-hidden bg-surface-card/95 text-center backdrop-blur-2xl"
        >
          {/* Subtle Top Glowing Bar */}
          <div className="absolute -top-px left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent pointer-events-none shadow-[0_0_20px_rgba(99,102,241,0.8)]" />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold tracking-wide mb-8 shadow-inner"
          >
            <Gift className="h-4 w-4 text-emerald-600 dark:text-emerald-400 animate-bounce" />
            <span>Promotional Public Beta Notice</span>
          </motion.div>

          {/* Required Headline and Informational Texts */}
          <h1 className="text-3xl sm:text-5xl font-display font-black text-text-main tracking-tight leading-tight mb-6">
            Voyage AI is currently free <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-600 via-sky-600 to-indigo-600 dark:from-emerald-400 dark:via-sky-400 dark:to-indigo-400 bg-clip-text text-transparent">
              during public beta.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-text-body max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Payment plans and premium features will be introduced in a future release.
          </p>

          {/* Feature Highlights Card Box within Banner */}
          <div className="bg-surface-inner/80 border border-border-theme rounded-2xl p-6 sm:p-8 text-left mb-10 shadow-inner max-w-2xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
              <span>Available Right Now at Zero Cost:</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {BETA_BENEFITS.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-sm text-text-main">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="font-normal leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Call To Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/plan')}
              id="btn-pricing-plan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-extrabold text-base px-10 py-4.5 rounded-2xl transition-all duration-300 glow-effect shadow-xl hover:scale-103 cursor-pointer"
            >
              <span>Start Planning Your Trip Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Footer Security Note */}
          <div className="mt-8 pt-8 border-t border-border-theme flex items-center justify-center gap-2 text-xs text-text-muted">
            <ShieldCheck className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            <span>No payment methods collected. Unlimited exploration enabled.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
