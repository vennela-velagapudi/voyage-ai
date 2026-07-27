import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Globe, Compass, Users, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full relative overflow-hidden pt-12 pb-28 min-h-screen">
      {/* Background Decorative Atmosphere contained in bounds */}
      <div className="absolute inset-0 w-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-10 right-1/4 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[130px]" />
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-inner"
          >
            <Compass
              className="h-4 w-4 text-indigo-600 dark:text-indigo-400 animate-spin"
              style={{ animationDuration: '12s' }}
            />
            <span>Our Origin & Purpose</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-text-main tracking-tight mb-6 leading-tight"
          >
            Pioneering Intelligent <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 dark:from-indigo-400 dark:via-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Travel Architecture
            </span>
          </motion.h1>
          <p className="text-text-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Voyage AI merges state-of-the-art Google Gemini reasoning models with high-precision
            interface design to turn hours of tedious travel planning into seconds of inspiration.
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 sm:p-10 rounded-3xl glass-effect border border-border-theme bg-surface-card/90 shadow-xl"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 shadow-inner">
              <Brain className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-display font-extrabold text-text-main mb-4">
              The AI Intelligence Engine
            </h2>
            <p className="text-text-body leading-relaxed font-normal mb-4">
              Traditional travel planning requires cross-referencing dozens of guidebooks, hotel
              review portals, regional maps, and transportation forums. Voyage AI changes this
              paradigm by integrating deep generative reasoning directly into an interactive
              itinerary builder.
            </p>
            <p className="text-text-muted text-sm leading-relaxed">
              Our algorithms evaluate geographic proximity, seasonal opening hours, local weather
              trends, and personalized dietary constraints to compute mathematically sound daily
              pacing—ensuring you spend less time commuting and more time absorbing authentic
              culture.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="p-8 rounded-3xl glass-effect border border-border-theme bg-surface-card/90 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-6 shadow-inner">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-text-main mb-3">
                  Global Accessibility
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  We believe that intelligent travel curation should be universally accessible. From
                  bustling metropolises to remote mountain wilderness trails, our engine covers over
                  190 countries with accurate neighborhood insights and local etiquette hacks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-theme text-xs font-semibold text-text-subtle flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>100% Unconstrained Coverage</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl glass-effect border border-border-theme bg-surface-card/90 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 shadow-inner">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-text-main mb-3">
                  Community & Craftsmanship
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Built by passionate software engineers and seasoned global travelers, our goal is
                  to build an ecosystem where bespoke itineraries can be shared, refined, and
                  enjoyed without commercial interference or hidden booking biases.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-theme text-xs font-semibold text-text-subtle flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <span>Beta Public Preview V1.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
