import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  MapPin,
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
  X,
  Info,
} from 'lucide-react';

export default function DestinationValidationModal({
  isOpen,
  warning,
  onClose,
  onChangeDestination,
  onReduceDuration,
  onContinueAnyway,
}) {
  if (!isOpen || !warning) return null;

  const {
    destination,
    placeCategory,
    requestedDays,
    recommendedDuration,
    message,
    suggestedDestination,
    suggestedDays,
  } = warning;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-2xl rounded-3xl bg-slate-900/95 border border-amber-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-2xl text-left z-10"
        >
          {/* Subtle atmospheric glow */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-indigo-500/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors duration-150 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-inner">
              <AlertTriangle className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                <span>Destination & Duration Intelligence</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                Trip Customization Guidance
              </h3>
            </div>
          </div>

          {/* Core Guidance Explanation Box */}
          <div className="bg-gradient-to-r from-amber-950/40 via-slate-900/80 to-slate-950 p-5 rounded-2xl border border-amber-500/30 my-6 shadow-inner flex items-start gap-3.5">
            <Info className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="text-slate-100 text-base font-bold leading-relaxed">{message}</p>
              <p className="text-slate-400 text-xs leading-normal">
                <span className="text-slate-300 font-semibold">{destination}</span> is classified as
                a <span className="text-amber-300 font-semibold capitalize">{placeCategory}</span>{' '}
                with a typical visit duration of{' '}
                <span className="text-sky-300 font-semibold">{recommendedDuration}</span>. Choose
                how you would like to tailor your itinerary below:
              </p>
            </div>
          </div>

          {/* Interactive Action Options Grid */}
          <div className="space-y-3.5 my-6">
            {/* Action 1 (Recommended): Switch to Broader City / Region */}
            {suggestedDestination && (
              <div className="relative group p-4 sm:p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800/90 border border-indigo-500/40 hover:border-indigo-400 transition-all duration-200 shadow-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 flex-shrink-0 mt-0.5">
                      <MapPin className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded uppercase tracking-wider mb-1">
                        ★ Recommended Option
                      </span>
                      <h4 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors flex items-center gap-1.5">
                        <span>Change destination to {suggestedDestination}</span>
                        <ArrowRight className="h-4 w-4 text-indigo-400" />
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        Plan a comprehensive {requestedDays}-day exploration across all of{' '}
                        <strong className="text-white">{suggestedDestination}</strong>, featuring{' '}
                        <strong className="text-white">{destination}</strong> as a prominent
                        itinerary highlight.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onChangeDestination(suggestedDestination)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer flex-shrink-0 glow-effect"
                  >
                    <span>Explore {suggestedDestination}</span>
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* Action 2: Reduce Duration */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700 hover:border-sky-500/40 transition-all duration-200 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0 mt-0.5">
                    <Calendar className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                      <span>Reduce duration to {suggestedDays || 1} Day</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      Keep <strong className="text-slate-200">{destination}</strong> as your core
                      focus and generate an optimized, high-impact {suggestedDays || 1}-day visit
                      blueprint.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onReduceDuration(suggestedDays || 1)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/40 hover:border-sky-500 text-xs sm:text-sm font-bold shadow transition-all duration-200 cursor-pointer flex-shrink-0"
                >
                  <span>Adjust to {suggestedDays || 1} Day</span>
                </button>
              </div>
            </div>

            {/* Action 3: Continue Anyway (Optional) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/50 border border-slate-800 hover:border-slate-700 transition-all duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 flex-shrink-0 mt-0.5">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
                      <span>
                        Continue with {destination} for {requestedDays} Days
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      Generate anyway. The AI will extend the trip scope outward into surrounding
                      neighborhoods and regional day trips to fill {requestedDays} days.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onContinueAnyway}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold hover:text-white border border-slate-700 transition-all duration-150 cursor-pointer flex-shrink-0"
                >
                  <span>Continue Anyway</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer cancel note */}
          <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-500">
            Click outside or{' '}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              cancel
            </button>{' '}
            to manually edit your form settings.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
