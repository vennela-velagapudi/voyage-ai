import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import TripPlannerCard from '../components/form/TripPlannerCard';

export default function Plan() {
  return (
    <div className="relative overflow-hidden pt-10 pb-24 min-h-screen">
      {/* Decorative Atmosphere Gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-40 left-1/4 w-[550px] h-[550px] bg-sky-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto pt-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-4 backdrop-blur-md shadow-inner"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            <span>AI Itinerary Architect</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight mb-4"
          >
            Design Your Tailored <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300 bg-clip-text text-transparent">
              AI Travel Blueprint
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Customize your dream journey below. Our Gemini 2.5 AI engine synthesizes weather, local
            gems, and your exact budget style into a complete multi-day schedule.
          </motion.p>
        </div>

        <TripPlannerCard />
      </div>
    </div>
  );
}
