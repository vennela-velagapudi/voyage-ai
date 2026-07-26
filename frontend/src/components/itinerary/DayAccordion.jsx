import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronDown,
  Sparkles,
  Wallet,
  Lightbulb,
  Clock,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import TimelineItem from './TimelineItem';

export default function DayAccordion({
  day,
  dayIndex = 0,
  isOpen: controlledIsOpen,
  onToggle,
  onPlaceClick,
  onDeleteActivity,
  onReplaceActivity,
  onRegenerateDay,
  onReorderActivities,
  onOpenEmergency,
  isRegeneratingDay = false,
  replacingKey = '',
  isDefaultOpen = false,
}) {
  const [internalOpen, setInternalOpen] = useState(isDefaultOpen);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const handleToggleClick = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  if (!day) return null;

  const { dayNumber, theme, timeline = [], estimatedDailyCost, localTip } = day;

  const hasTimeline = Array.isArray(timeline) && timeline.length > 0;
  const formattedCost = estimatedDailyCost
    ? String(estimatedDailyCost).replace(/\$/g, '₹').trim()
    : null;

  const handleRegenerateClick = (e) => {
    e.stopPropagation();
    if (onRegenerateDay && !isRegeneratingDay) {
      onRegenerateDay(dayIndex, day);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 rounded-3xl glass-effect border border-slate-800/80 hover:border-slate-700/80 overflow-hidden transition-all duration-300 shadow-xl backdrop-blur-xl bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950">
      {/* Accordion Header Toggle Button & Regenerate Option */}
      <div
        onClick={handleToggleClick}
        className={`w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left transition-colors duration-200 cursor-pointer group select-none ${
          isOpen
            ? 'bg-slate-900/95 border-b border-slate-800/80'
            : 'bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 hover:bg-slate-800/60'
        }`}
      >
        <div className="flex items-center gap-4 sm:gap-5 min-w-0 pr-2">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${
              isOpen
                ? 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-500 ring-2 ring-indigo-400/30'
                : 'bg-gradient-to-br from-indigo-600/80 to-sky-600/80'
            }`}
          >
            <span className="text-[10px] sm:text-xs font-extrabold uppercase leading-none opacity-90">
              Day
            </span>
            <span className="text-lg sm:text-xl font-display font-black leading-none mt-1">
              {dayNumber || dayIndex + 1}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-indigo-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Day {dayNumber || dayIndex + 1} Schedule</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-display font-black text-white group-hover:text-indigo-200 transition-colors tracking-tight mt-1 truncate">
              {theme || 'Exploring Highlights & Marvels'}
            </h3>
          </div>
        </div>

        {/* Action Controls in Header: Regenerate Day & Toggle Arrow */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Regenerate a Single Day Button */}
          <button
            type="button"
            onClick={handleRegenerateClick}
            disabled={isRegeneratingDay}
            title="Regenerate this entire day itinerary with AI"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-all shadow-xs cursor-pointer ${
              isRegeneratingDay
                ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-200 cursor-wait animate-pulse'
                : 'bg-indigo-600/20 hover:bg-indigo-600/35 border-indigo-500/40 hover:border-indigo-400 text-indigo-300'
            }`}
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-indigo-400 ${isRegeneratingDay ? 'animate-spin' : ''}`}
            />
            <span className="hidden sm:inline">
              {isRegeneratingDay ? 'Regenerating...' : 'Regenerate Day'}
            </span>
          </button>

          {hasTimeline && !isOpen && (
            <span className="hidden md:inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              <Clock className="h-3 w-3 text-indigo-400" />
              <span>{timeline.length} activities</span>
            </span>
          )}

          <div
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all flex-shrink-0 ml-1 ${
              isOpen
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm'
                : 'bg-slate-800/80 border-slate-700/60 text-slate-400 group-hover:text-white group-hover:border-slate-600'
            }`}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expandable Activities Timeline & Advice Footer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="p-6 sm:p-8 pt-6 border-t border-slate-800/80 bg-slate-950/50 space-y-8 relative">
              {/* Shimmer loading overlay during single day regeneration */}
              {isRegeneratingDay && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mb-3" />
                  <p className="text-white text-base font-bold">
                    Regenerating Day {dayNumber || dayIndex + 1} Schedule...
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    Our Gemini travel AI is designing a fresh timeline.
                  </p>
                </div>
              )}

              {/* Daily Theme Subnote */}
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300 pb-3 border-b border-slate-800/80">
                <span className="flex items-center gap-2 font-medium">
                  <Sparkles className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span>Drag activities using the handle to customize your schedule.</span>
                </span>
                {hasTimeline ? (
                  <span className="font-mono font-bold text-indigo-400 text-xs">
                    {timeline.length} ACTIVITIES
                  </span>
                ) : (
                  <span className="font-mono font-bold text-rose-400 text-xs">0 ACTIVITIES</span>
                )}
              </div>

              {/* Primary Chronological Vertical Timeline Layout */}
              {hasTimeline ? (
                <div className="pt-2 pl-2 sm:pl-4">
                  {timeline.map((item, index) => {
                    const activityKey = `${dayIndex}-${index}`;
                    const isReplacingThis = replacingKey === activityKey;
                    return (
                      <TimelineItem
                        key={`${index}-${item.time || item.title}`}
                        item={item}
                        index={index}
                        isLast={index === timeline.length - 1}
                        onPlaceClick={onPlaceClick}
                        onDelete={(actIndex) =>
                          onDeleteActivity && onDeleteActivity(dayIndex, actIndex)
                        }
                        onReplace={(actIndex, currentItem) =>
                          onReplaceActivity && onReplaceActivity(dayIndex, actIndex, currentItem)
                        }
                        isReplacing={isReplacingThis}
                        onOpenEmergency={() => onOpenEmergency && onOpenEmergency()}
                        onDrop={(sourceIdx, targetIdx) =>
                          onReorderActivities && onReorderActivities(dayIndex, sourceIdx, targetIdx)
                        }
                      />
                    );
                  })}
                </div>
              ) : (
                /* Empty State when all activities in a day are deleted */
                <div className="py-12 px-6 rounded-2xl bg-slate-900/50 border border-slate-800/90 text-center space-y-3">
                  <AlertCircle className="h-10 w-10 text-amber-400 mx-auto opacity-80 animate-bounce" />
                  <p className="text-lg sm:text-xl font-display font-bold text-slate-200">
                    No activities scheduled for this day.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                    You have cleared today&apos;s timeline. Click <strong>Regenerate Day</strong>{' '}
                    above to generate a new AI schedule for Day {dayNumber || dayIndex + 1}.
                  </p>
                </div>
              )}

              {/* Bottom Day Card Section: Estimated Spend & Local Tip */}
              <div className="pt-6 mt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Estimated Spend */}
                {formattedCost && (
                  <div className="bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-slate-900 p-5 rounded-2xl border border-emerald-500/30 flex items-start gap-3.5 shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                      <Wallet className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                        Estimated Spend
                      </h4>
                      <p className="text-slate-200 text-sm sm:text-base font-extrabold tracking-wide">
                        {formattedCost}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Covers local dining, activities & internal transit in INR
                      </p>
                    </div>
                  </div>
                )}

                {/* Local Tip */}
                {localTip && (
                  <div className="bg-gradient-to-br from-amber-950/40 via-slate-900/80 to-slate-900 p-5 rounded-2xl border border-amber-500/30 flex items-start gap-3.5 shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                      <Lightbulb className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
                        Insider Local Tip
                      </h4>
                      <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
                        {typeof localTip === 'string'
                          ? localTip
                          : localTip.activity || localTip.description || JSON.stringify(localTip)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
