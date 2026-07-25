import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Globe, Compass, MapPin } from 'lucide-react';

const PROGRESS_MESSAGES = [
  'Planning your journey...',
  'Finding hidden gems...',
  'Building your itinerary...',
  'Looking for amazing restaurants...',
  'Curating authentic cultural highlights...',
  'Almost ready...',
];

export default function LoadingOverlay({ destination = 'your destination' }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % PROGRESS_MESSAGES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto my-6 p-10 sm:p-16 rounded-3xl glass-effect border border-indigo-500/30 text-center relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.15)] backdrop-blur-2xl flex flex-col items-center justify-center min-h-[420px]"
    >
      {/* Decorative floating lights */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Animated Orbiting Icons Indicator */}
      <div className="relative w-28 h-28 mb-10 flex items-center justify-center">
        {/* Outer glowing pulsing circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/40 w-full h-full"
        />

        {/* Inner reverse rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border border-sky-400/30 w-[84px] h-[84px]"
        />

        {/* Center icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center shadow-lg text-white"
        >
          <Globe className="h-8 w-8 animate-pulse" />
        </motion.div>

        {/* Floating miniature satellites */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute w-full h-full pointer-events-none"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-900 border border-indigo-400 flex items-center justify-center text-indigo-400 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute w-full h-full pointer-events-none"
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-900 border border-sky-400 flex items-center justify-center text-sky-400 shadow-sm">
            <Compass className="h-3.5 w-3.5" />
          </div>
        </motion.div>
      </div>

      {/* Rotating Progress Message */}
      <div className="h-14 flex items-center justify-center max-w-md px-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-xl sm:text-2xl font-display font-extrabold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent tracking-tight"
          >
            {PROGRESS_MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-slate-400 text-sm font-medium">
        <MapPin className="h-4 w-4 text-sky-400 animate-bounce" />
        <span>
          Architecting custom journey for <strong className="text-slate-200">{destination}</strong>
        </span>
      </div>

      {/* Subtext info */}
      <p className="text-xs text-slate-500 mt-8 max-w-sm">
        Our Gemini AI engine is performing multi-day schedule optimization. This typically takes
        10–25 seconds.
      </p>
    </motion.div>
  );
}
