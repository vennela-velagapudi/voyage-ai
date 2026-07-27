import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, EyeOff, Server, CheckCircle } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="w-full relative overflow-hidden pt-12 pb-28 min-h-screen">
      {/* Background Atmosphere contained in bounds */}
      <div className="absolute inset-0 w-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold uppercase tracking-wide mb-6 shadow-inner"
          >
            <Lock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Privacy & Security Protection</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black text-text-main tracking-tight mb-4 leading-tight"
          >
            Your Travel Plans, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-emerald-400 dark:via-teal-400 dark:to-sky-400 bg-clip-text text-transparent">
              Completely Private
            </span>
          </motion.h1>
          <p className="text-text-muted text-sm sm:text-base max-w-2xl mx-auto">
            We operate under a simple principle: your travel dreams belong to you. Learn how Voyage
            AI processes itinerary generations with zero invasive tracking or data mining.
          </p>
        </div>

        {/* Policy Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl glass-effect border border-border-theme bg-surface-card/90 p-8 sm:p-12 shadow-2xl space-y-10 text-text-body text-sm sm:text-base leading-relaxed"
        >
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-text-main flex items-center gap-2.5">
              <EyeOff className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span>1. Zero Personal Identity Collection in Public Beta</span>
            </h2>
            <p className="text-text-muted font-normal">
              During our public beta testing phase, Voyage AI requires zero mandatory user
              registration, login credentials, email verification, or billing profiling. You may
              utilize our AI itinerary engine anonymously without disclosing personally identifiable
              information (PII).
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border-theme">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-text-main flex items-center gap-2.5">
              <Server className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              <span>2. How We Process AI Trip Requests</span>
            </h2>
            <p className="text-text-muted font-normal">
              When you interact with the trip planning tool, the parameters you select (destination
              city, travel duration, group composition, budget preference, and optional
              dietary/wellness notes) are transmitted directly over encrypted SSL/TLS channels to
              our secure backend API service.
            </p>
            <p className="text-text-muted font-normal mt-2">
              Our backend formats these variables into a strict JSON schema prompt submitted to
              Google Gemini generative API services. We do not attach personal tracking identifiers
              to these inference requests, ensuring your custom routes are computed anonymously and
              safely.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border-theme">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-text-main flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              <span>3. Cookies & Browser Session Memory</span>
            </h2>
            <p className="text-text-muted font-normal">
              Voyage AI avoids cross-site tracking advertising scripts and intrusive third-party
              analytical pixels. Any temporary preferences or interface state configurations (such
              as active Day Accordions or pre-filled destination fields) are retained solely within
              your local browser memory and reset cleanly between sessions.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border-theme">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-text-main flex items-center gap-2.5">
              <CheckCircle className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              <span>4. Future User Vault & Syncing Upgrades</span>
            </h2>
            <p className="text-text-muted font-normal">
              When optional user authentication and cloud itinerary synchronization are introduced
              in a future release, data storage will remain strictly opt-in with robust
              cryptographic hashing. We pledge to never sell, monetize, or broker user travel
              schedules or historical location searches to third-party advertisers or travel
              brokers.
            </p>
          </section>

          <div className="pt-8 border-t border-border-theme text-xs text-text-subtle text-center">
            Voyage AI operates in full alignment with international data privacy best practices,
            including GDPR and CCPA privacy standards.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
