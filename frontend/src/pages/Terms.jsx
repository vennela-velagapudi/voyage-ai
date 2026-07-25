import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="relative overflow-hidden pt-12 pb-28 min-h-screen">
      {/* Background Atmosphere */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900 text-slate-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner"
          >
            <FileText className="h-4 w-4 text-indigo-400" />
            <span>Legal Agreement</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight mb-4 leading-tight"
          >
            Terms of Service & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300 bg-clip-text text-transparent">
              Beta Conditions
            </span>
          </motion.h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
            . Please read these terms carefully before utilizing Voyage AI generative planning
            services.
          </p>
        </div>

        {/* Legal Sections Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl glass-effect border border-slate-800/80 bg-slate-950/90 p-8 sm:p-12 shadow-2xl space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed"
        >
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              <span>1. Acceptance of Terms & Public Beta Scope</span>
            </h2>
            <p className="text-slate-400 font-normal">
              By accessing or using the Voyage AI web application, you agree to be bound by these
              Terms of Service. Voyage AI is currently operating in a public beta promotional phase.
              During this period, all itinerary generation functions and AI travel optimizations are
              provided completely free of charge without requiring billing information or formal
              user registration.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-900">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center gap-2.5">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <span>2. Artificial Intelligence & Content Accuracy</span>
            </h2>
            <p className="text-slate-400 font-normal">
              Voyage AI leverages Google Gemini artificial intelligence reasoning models to generate
              bespoke travel roadmaps, activity pricing forecasts, and local dining recommendations.
              While we engineer strict prompt constraints and formatting validations, AI-generated
              schedules are probabilistic estimations.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 pt-2 text-sm pl-2">
              <li>
                You agree to independently verify business operating hours, seasonal weather
                conditions, ticket costs, and visa entry requirements prior to completing travel
                bookings.
              </li>
              <li>
                Voyage AI is not a licensed travel agency or booking portal, and assumes no
                financial responsibility for disruptions, third-party cancellations, or pricing
                shifts.
              </li>
            </ul>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-900">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center gap-2.5">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span>3. Acceptable Use Policy</span>
            </h2>
            <p className="text-slate-400 font-normal">
              Users agree to utilize Voyage AI solely for lawful travel discovery and itinerary
              experimentation. Prohibited behaviors include automated scraping of AI responses,
              reverse engineering prompt methodologies, submitting harmful or illegal destination
              payloads, or attempting to compromise backend service integrity.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-900">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center gap-2.5">
              <span>4. Future Commercial Offerings & Amendments</span>
            </h2>
            <p className="text-slate-400 font-normal">
              As described on our official pricing announcements, optional paid plans and VIP cloud
              account syncing will be introduced in future production updates. Any transitions to
              commercial pricing will be accompanied by transparent notification and will never
              result in retroactive charges for itineraries generated during the public beta.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-900 text-xs text-slate-500 text-center">
            If you have legal questions regarding these terms, please contact our community
            administrators via our social channels.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
