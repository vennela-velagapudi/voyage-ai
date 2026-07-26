import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';
import TripSummary from './TripSummary';
import DayAccordion from './DayAccordion';
import ActionToolbar from './ActionToolbar';
import PlaceDrawer from '../places/PlaceDrawer';

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

  // State for interactive right-side place drawer (Milestone 4A)
  const [activePlaceQuery, setActivePlaceQuery] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!itinerary || !Array.isArray(itinerary.dailyItinerary)) {
    return null;
  }

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleOpenPlaceDrawer = (placeName) => {
    if (!placeName) return;
    setActivePlaceQuery(placeName);
    setIsDrawerOpen(true);
  };

  const currentDestination = itinerary.destination || userParams.destination || '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-8"
      id="itinerary-dashboard"
    >
      {/* Top Personalized Summary Card */}
      <TripSummary itinerary={itinerary} userParams={userParams} />

      {/* Main Itinerary Section Header */}
      <div className="max-w-4xl mx-auto my-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5 text-center sm:text-left">
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
            <Compass className="h-6 w-6 text-sky-400" />
            <span>Your Itinerary</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Click any place to view photos, opening hours, and maps.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-300 text-xs font-semibold shadow-inner">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>
            {itinerary.dailyItinerary.length}{' '}
            {itinerary.dailyItinerary.length === 1 ? 'Day' : 'Days'}
          </span>
        </div>
      </div>

      {/* Daily Accordions Collection */}
      <div className="space-y-6 max-w-4xl mx-auto mb-12">
        {itinerary.dailyItinerary.map((day, index) => (
          <DayAccordion
            key={day.dayNumber || index}
            day={day}
            isOpen={expandedIndex === index}
            onToggle={() => handleToggle(index)}
            onPlaceClick={handleOpenPlaceDrawer}
          />
        ))}
      </div>

      {/* Single Action Toolbar at the End of the Itinerary */}
      <ActionToolbar
        onNewTrip={onNewTrip}
        onEditForm={onEditForm}
        onRegenerate={onRegenerate}
        isRegenerating={isRegenerating}
      />

      {/* Interactive Right-Side Information Drawer */}
      <PlaceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placeQuery={activePlaceQuery}
        destination={currentDestination}
      />
    </motion.div>
  );
}
