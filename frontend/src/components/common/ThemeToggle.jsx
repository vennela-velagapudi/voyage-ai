import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      id="theme-toggle-btn"
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      className={`inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-1 rounded-full cursor-pointer focus:outline-none transition-transform active:scale-95 ${className}`}
    >
      {/* Pill Track */}
      <div
        className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-300 border shadow-inner flex items-center ${
          isDark
            ? 'bg-slate-900 border-slate-700/80 shadow-[0_0_15px_-3px_rgba(99,102,241,0.35)]'
            : 'bg-sky-100 border-sky-300 shadow-[0_0_15px_-3px_rgba(14,165,233,0.25)]'
        }`}
      >
        {/* Sliding Active Knob Background */}
        <motion.div
          layout
          initial={false}
          animate={{
            x: isDark ? 24 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className={`absolute left-1 top-1 w-6 h-6 rounded-full shadow-md z-0 transition-colors duration-300 ${
            isDark
              ? 'bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 border border-indigo-400/30'
              : 'bg-gradient-to-tr from-amber-400 to-amber-300 border border-amber-200/60'
          }`}
        />

        {/* Left Icon: Sun (Light Mode) */}
        <div className="absolute left-1 top-1 w-6 h-6 flex items-center justify-center pointer-events-none z-10 transition-transform duration-300">
          <Sun
            className={`h-3.5 w-3.5 transition-colors duration-300 stroke-[2.5px] ${
              !isDark ? 'text-amber-900 fill-amber-500/30' : 'text-amber-400 opacity-90'
            }`}
          />
        </div>

        {/* Right Icon: Moon (Dark Mode) */}
        <div className="absolute right-1 top-1 w-6 h-6 flex items-center justify-center pointer-events-none z-10 transition-transform duration-300">
          <Moon
            className={`h-3.5 w-3.5 transition-colors duration-300 stroke-[2.2px] ${
              isDark
                ? 'text-amber-300 fill-amber-300'
                : 'text-indigo-700 fill-indigo-700/80 opacity-90'
            }`}
          />
        </div>
      </div>
    </button>
  );
}
