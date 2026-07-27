import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw, Edit3, WifiOff, Clock, AlertCircle } from 'lucide-react';

export default function ErrorCard({ error, onRetry, onEdit }) {
  // Parse error specifics to present user-friendly context
  let title = 'Unable to Generate Itinerary';
  let message = 'An unexpected error occurred while communicating with the travel engine.';
  let Icon = AlertTriangle;
  let accentColor =
    'from-rose-500/20 to-amber-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400';

  if (error) {
    const status = error.response?.status;
    const backendMsg = error.response?.data?.error;
    const rawMsg = error.message || '';

    if (rawMsg.includes('timeout') || error.code === 'ECONNABORTED') {
      title = 'Generation Timeout Exceeded';
      message =
        'Our AI travel engine took longer than expected to curate your complete schedule. Please try retrying with slightly simpler preferences or retry immediately.';
      Icon = Clock;
      accentColor =
        'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400';
    } else if (
      !error.response &&
      (rawMsg.includes('Network Error') || rawMsg.includes('ERR_CONNECTION_REFUSED'))
    ) {
      title = 'Server Connection Interrupted';
      message =
        'We could not reach the Voyage AI backend server. Please verify that your local server (http://localhost:5000) is online and accessible.';
      Icon = WifiOff;
      accentColor = 'from-rose-600/20 border-rose-500/40 text-rose-600 dark:text-rose-400';
    } else if (status === 400 && backendMsg) {
      title = 'Trip Parameters Need Attention';
      message = backendMsg;
      Icon = AlertCircle;
      accentColor =
        'from-amber-500/20 to-yellow-500/10 border-amber-500/40 text-amber-600 dark:text-amber-300';
    } else if (backendMsg) {
      title = 'AI Generation Alert';
      message = backendMsg;
      Icon = AlertTriangle;
      accentColor =
        'from-rose-500/20 via-indigo-900/40 border-rose-500/30 text-rose-600 dark:text-rose-400';
    } else if (rawMsg) {
      message = rawMsg;
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`w-full max-w-2xl mx-auto my-8 p-8 sm:p-10 rounded-3xl bg-gradient-to-br ${accentColor} bg-surface-card/90 border backdrop-blur-xl shadow-2xl relative overflow-hidden text-center sm:text-left`}
    >
      {/* Subtle top light */}
      <div className="absolute top-0 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-50" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center flex-shrink-0 text-rose-600 dark:text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
          <Icon className="h-8 w-8 animate-pulse" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-text-main tracking-tight mb-2.5">
            {title}
          </h3>
          <p className="text-text-body text-sm sm:text-base leading-relaxed mb-8 font-normal bg-surface-inner/80 p-4 rounded-2xl border border-border-theme">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRetry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-sm font-semibold shadow-lg glow-effect transition-all cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry Generation</span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onEdit}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-inner hover:bg-surface-hover text-text-body border border-border-theme text-sm font-semibold transition-all cursor-pointer shadow-sm"
            >
              <Edit3 className="h-4 w-4 text-text-muted" />
              <span>Edit Trip Form</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
