import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
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
  onMoveDayUp,
  onMoveDayDown,
  isFirstDay = false,
  isLastDay = false,
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
    <div className="w-full max-w-4xl mx-auto mb-6 rounded-3xl glass-effect border border-border-theme hover:border-border-subtle overflow-hidden transition-all duration-300 shadow-xl backdrop-blur-xl bg-surface-card/95">
      {/* Accordion Header Toggle Button & Regenerate Option */}
      <div
        onClick={handleToggleClick}
        className={`w-full px-3.5 sm:px-8 py-3.5 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left transition-colors duration-200 cursor-pointer group select-none ${
          isOpen
            ? 'bg-surface-inner border-b border-border-theme'
            : 'bg-surface-card hover:bg-surface-inner'
        }`}
      >
        <div className="flex items-center gap-2.5 sm:gap-5 w-full sm:w-auto min-w-0 pr-1">
          <div
            className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg flex-shrink-0 transition-transform duration-200 group-hover:scale-105 ${
              isOpen
                ? 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-500 ring-2 ring-indigo-400/30'
                : 'bg-gradient-to-br from-indigo-600/80 to-sky-600/80'
            }`}
          >
            <span className="text-[10px] sm:text-xs font-extrabold uppercase leading-none opacity-90">
              Day
            </span>
            <span className="text-base sm:text-xl font-display font-black leading-none mt-1">
              {dayNumber || dayIndex + 1}
            </span>
          </div>

          <div className="min-w-0 flex-grow">
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-[11px] sm:text-sm font-bold uppercase tracking-wider">
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0" />
              <span>Day {dayNumber || dayIndex + 1} Schedule</span>
            </div>
            <h3 className="text-sm sm:text-2xl font-display font-black text-text-main group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors tracking-tight mt-0.5 truncate">
              {theme || 'Exploring Highlights & Marvels'}
            </h3>
          </div>
        </div>

        {/* Action Controls in Header: Move Day Up/Down, Regenerate Day & Toggle Arrow */}
        <div className="flex flex-wrap items-center justify-between sm:justify-end w-full sm:w-auto gap-2 sm:gap-3 flex-shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border-theme">
          {/* Reorder Entire Days Up & Down Controls */}
          <div
            className="flex items-center gap-0.5 bg-surface-card/90 p-0.5 rounded-xl border border-border-theme"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              disabled={isFirstDay}
              onClick={(e) => {
                e.stopPropagation();
                if (onMoveDayUp) onMoveDayUp();
              }}
              title="Move entire day earlier in itinerary"
              className={`min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center p-2 sm:p-1.5 rounded-lg border transition-all cursor-pointer ${
                isFirstDay
                  ? 'opacity-30 cursor-not-allowed border-transparent text-text-subtle'
                  : 'hover:bg-surface-hover border-transparent hover:border-border-theme text-text-muted hover:text-text-main'
              }`}
              aria-label="Move entire day earlier"
            >
              <ChevronUp className="h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0" />
            </button>
            <button
              type="button"
              disabled={isLastDay}
              onClick={(e) => {
                e.stopPropagation();
                if (onMoveDayDown) onMoveDayDown();
              }}
              title="Move entire day later in itinerary"
              className={`min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center p-2 sm:p-1.5 rounded-lg border transition-all cursor-pointer ${
                isLastDay
                  ? 'opacity-30 cursor-not-allowed border-transparent text-text-subtle'
                  : 'hover:bg-surface-hover border-transparent hover:border-border-theme text-text-muted hover:text-text-main'
              }`}
              aria-label="Move entire day later"
            >
              <ChevronDown className="h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0" />
            </button>
          </div>

          {/* Regenerate a Single Day Button */}
          <button
            type="button"
            onClick={handleRegenerateClick}
            disabled={isRegeneratingDay}
            title="Regenerate this entire day itinerary with AI"
            className={`min-h-[44px] sm:min-h-0 inline-flex items-center justify-center gap-1.5 sm:gap-1.5 px-2.5 sm:px-3 py-2.5 sm:py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-all shadow-xs cursor-pointer min-w-0 ${
              isRegeneratingDay
                ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-200 cursor-wait animate-pulse'
                : 'bg-indigo-500/15 hover:bg-indigo-500/25 border-indigo-500/40 hover:border-indigo-500 text-indigo-700 dark:text-indigo-300'
            }`}
          >
            <RefreshCw
              className={`h-4 w-4 sm:h-3.5 sm:w-3.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 ${isRegeneratingDay ? 'animate-spin' : ''}`}
            />
            <span className="truncate">
              {isRegeneratingDay ? 'Regenerating...' : 'Regenerate Day'}
            </span>
          </button>

          {hasTimeline && !isOpen && (
            <span className="hidden md:inline-flex items-center gap-1 text-xs text-text-muted bg-surface-inner px-3 py-1.5 rounded-full border border-border-theme">
              <Clock className="h-3 w-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span>{timeline.length} activities</span>
            </span>
          )}

          <div
            className={`min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all flex-shrink-0 ml-auto sm:ml-1 ${
              isOpen
                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-700 dark:text-indigo-300 shadow-sm'
                : 'bg-surface-hover border-border-theme text-text-muted group-hover:text-text-main group-hover:border-border-subtle'
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
            <div className="w-full p-2 sm:p-8 pt-4 sm:pt-6 border-t border-border-theme bg-surface-card/50 space-y-6 sm:space-y-8 relative">
              {/* Shimmer loading overlay during single day regeneration */}
              {isRegeneratingDay && (
                <div className="absolute inset-0 bg-surface-base/80 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mb-3" />
                  <p className="text-text-main text-base font-bold">
                    Regenerating Day {dayNumber || dayIndex + 1} Schedule...
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    Our Gemini travel AI is designing a fresh timeline.
                  </p>
                </div>
              )}

              {/* Daily Theme Subnote */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-text-body pb-3 border-b border-border-theme">
                <span className="flex items-center gap-1.5 font-medium pr-2">
                  <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                  <span>Use the up/down arrows to smoothly reorder your activities or days.</span>
                </span>
                {hasTimeline ? (
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-[11px] sm:text-xs">
                    {timeline.length} ACTIVITIES
                  </span>
                ) : (
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-[11px] sm:text-xs">
                    0 ACTIVITIES
                  </span>
                )}
              </div>

              {/* Primary Chronological Vertical Timeline Layout */}
              {hasTimeline ? (
                <div className="pt-1.5 pl-1 sm:pl-4">
                  {timeline.map((item, index) => {
                    const activityKey = `${dayIndex}-${index}`;
                    const isReplacingThis = replacingKey === activityKey;
                    const stableKey = `item-${item.title}-${item.time || ''}-${item.category || ''}`;
                    return (
                      <TimelineItem
                        key={stableKey}
                        item={item}
                        index={index}
                        isFirst={index === 0}
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
                        onMoveUp={() =>
                          index > 0 &&
                          onReorderActivities &&
                          onReorderActivities(dayIndex, index, index - 1)
                        }
                        onMoveDown={() =>
                          index < timeline.length - 1 &&
                          onReorderActivities &&
                          onReorderActivities(dayIndex, index, index + 1)
                        }
                      />
                    );
                  })}
                </div>
              ) : (
                /* Empty State when all activities in a day are deleted */
                <div className="py-12 px-6 rounded-2xl bg-surface-inner/60 border border-border-theme text-center space-y-3">
                  <AlertCircle className="h-10 w-10 text-amber-500 dark:text-amber-400 mx-auto opacity-80 animate-bounce" />
                  <p className="text-lg sm:text-xl font-display font-bold text-text-body">
                    No activities scheduled for this day.
                  </p>
                  <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto">
                    You have cleared today&apos;s timeline. Click <strong>Regenerate Day</strong>{' '}
                    above to generate a new AI schedule for Day {dayNumber || dayIndex + 1}.
                  </p>
                </div>
              )}

              {/* Bottom Day Card Section: Estimated Spend & Local Tip */}
              <div className="pt-6 mt-6 border-t border-border-theme grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Estimated Spend */}
                {formattedCost && (
                  <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/30 flex items-start gap-3.5 shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                      <Wallet className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-1">
                        Estimated Spend
                      </h4>
                      <p className="text-text-body text-sm sm:text-base font-extrabold tracking-wide">
                        {formattedCost}
                      </p>
                      <p className="text-[11px] text-text-muted mt-1">
                        Covers local dining, activities & internal transit in INR
                      </p>
                    </div>
                  </div>
                )}

                {/* Local Tip */}
                {localTip && (
                  <div className="bg-amber-500/10 p-5 rounded-2xl border border-amber-500/30 flex items-start gap-3.5 shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                      <Lightbulb className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-1">
                        Insider Local Tip
                      </h4>
                      <p className="text-text-body text-sm sm:text-base font-medium leading-relaxed">
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
