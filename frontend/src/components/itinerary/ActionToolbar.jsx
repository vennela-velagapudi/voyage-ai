import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Edit3, RefreshCw, Sparkles } from 'lucide-react';

export default function ActionToolbar({
  onNewTrip,
  onEditForm,
  onRegenerate,
  isRegenerating = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto my-12 p-4 sm:p-6 rounded-2xl glass-effect border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center gap-2 text-sm text-slate-300 font-medium text-center sm:text-left">
        <Sparkles className="h-4 w-4 text-indigo-400 flex-shrink-0 animate-pulse" />
        <span>Adjust your itinerary or start a new plan.</span>
      </div>

      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
        {/* Back to Form (Edit parameters) */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEditForm}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-all shadow-sm cursor-pointer"
        >
          <Edit3 className="h-4 w-4 text-slate-400" />
          <span>Back to Form</span>
        </motion.button>

        {/* Refresh Itinerary (Regenerate from current baseline) */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRegenerate}
          disabled={isRegenerating}
          className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer ${
            isRegenerating
              ? 'bg-indigo-600/50 text-indigo-300 cursor-wait'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          <RefreshCw className={`h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          <span>{isRegenerating ? 'Refreshing...' : 'Refresh Itinerary'}</span>
        </motion.button>

        {/* Plan Another Trip (Reset entirely) */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewTrip}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs sm:text-sm font-bold transition-all shadow-lg glow-effect cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Plan Another Trip</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
