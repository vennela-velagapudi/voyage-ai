import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-10rem)] flex items-center justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center z-10">
        {/* Decorative Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-6"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Next Generation Travel</span>
        </motion.div>

        {/* Brand Name / Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display font-extrabold text-5xl md:text-7xl tracking-tight mb-4"
          id="hero-title"
        >
          <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-400 bg-clip-text text-transparent">
            Voyage AI
          </span>
        </motion.h1>

        {/* Subtitle / Catchphrase */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display font-medium text-2xl md:text-4xl text-slate-300 tracking-normal mb-8 max-w-2xl mx-auto"
          id="hero-subtitle"
        >
          Plan Your Perfect Trip with AI
        </motion.p>

        {/* Descriptive sentence */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
          id="hero-description"
        >
          Generate custom itineraries tailored to your dates, preferences, and style. Say goodbye to
          hours of planning and hello to seamless travel.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button
            id="hero-cta-primary"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3.5 rounded-xl transition-all duration-300 glow-effect hover:scale-102 cursor-pointer shadow-lg"
          >
            Start Planning
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            id="hero-cta-secondary"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-medium px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-102 cursor-pointer"
          >
            View Demo
          </button>
        </motion.div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950 pointer-events-none -z-20" />
    </div>
  );
}
