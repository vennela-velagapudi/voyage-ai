import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import TripSummary from './TripSummary';
import DayAccordion from './DayAccordion';
import ActionToolbar from './ActionToolbar';

export default function ItineraryDashboard({
  itinerary,
  userParams = {},
  onNewTrip,
  onEditForm,
  onRegenerate,
  isRegenerating = false,
}) {
  // Enforce accordion rule: only Day 1 (index 0) expanded initially, only one open at a time
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!itinerary || !Array.isArray(itinerary.dailyItinerary)) {
    return null;
  }

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-8"
      id="itinerary-dashboard"
    >
      {/* Top Personalized Summary Card with friendly introduction */}
      <TripSummary itinerary={itinerary} userParams={userParams} />

      {/* Primary Action Toolbar */}
      <ActionToolbar
        onNewTrip={onNewTrip}
        onEditForm={onEditForm}
        onRegenerate={onRegenerate}
        isRegenerating={isRegenerating}
      />

      {/* Daily Itinerary Header Bar */}
      <div className="max-w-4xl mx-auto my-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5 text-center sm:text-left">
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
            <Compass className="h-7 w-7 text-sky-400 animate-pulse" />
            <span>Daily Itinerary Schedule</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Explore your step-by-step chronological timeline. Click any day header to collapse or
            expand details.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-indigo-300 text-xs font-semibold shadow-inner">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span>{itinerary.dailyItinerary.length} Curated Days</span>
        </div>
      </div>

      {/* Daily Accordions Collection */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {itinerary.dailyItinerary.map((day, index) => (
          <DayAccordion
            key={day.dayNumber || index}
            day={day}
            isOpen={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>

      {/* Bottom Repeat Toolbar for Convenience */}
      <div className="mt-14 max-w-4xl mx-auto">
        <ActionToolbar
          onNewTrip={onNewTrip}
          onEditForm={onEditForm}
          onRegenerate={onRegenerate}
          isRegenerating={isRegenerating}
        />
      </div>
    </motion.div>
  );
}
