import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Sparkles } from 'lucide-react';
import { ApiService } from '../../services/apiService';
import PlaceLoadingSkeleton from './PlaceLoadingSkeleton';
import PlaceErrorState from './PlaceErrorState';
import PlaceHeader from './PlaceHeader';
import PlaceOverview from './PlaceOverview';

export default function PlaceDrawer({ isOpen, onClose, placeQuery, destination }) {
  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPlaceData() {
      if (!isOpen || !placeQuery) return;
      setIsLoading(true);
      setError(null);
      setPlace(null);

      try {
        const response = await ApiService.searchPlace({
          query: placeQuery,
          destination: destination || '',
        });

        if (isMounted && response?.data) {
          const fetchedPlace = response.data.data || response.data;
          setPlace(fetchedPlace);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.error ? { message: err.response.data.error } : err);
          setIsLoading(false);
        }
      }
    }

    if (isOpen) {
      fetchPlaceData();
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, placeQuery, destination]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end sm:flex-row sm:justify-end">
          {/* Backdrop Blur Overaly */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 dark:bg-slate-950/80 backdrop-blur-sm transition-opacity cursor-pointer"
          />

          {/* Responsive Drawer Panel: Bottom sheet/full modal on mobile, right panel on desktop */}
          <motion.div
            initial={{ opacity: 0, y: '10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '10%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="relative w-full sm:max-w-xl md:max-w-2xl bg-surface-card/98 text-text-main h-[92vh] sm:h-full max-h-screen overflow-y-auto overflow-x-hidden shadow-2xl rounded-t-3xl sm:rounded-t-none border-t sm:border-t-0 sm:border-l border-indigo-500/40 flex flex-col z-10 scrollbar-thin scrollbar-thumb-border-theme scrollbar-track-surface-base pb-safe sm:pb-0"
          >
            {/* Mobile Bottom-Sheet Grab Pill Handle */}
            <div className="w-12 h-1.5 bg-border-subtle rounded-full mx-auto my-2.5 sm:hidden flex-shrink-0" />

            {/* Top Fixed Drawer Navbar */}
            <div className="sticky top-0 z-20 bg-surface-card/95 backdrop-blur-md border-b border-border-theme px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                <div className="w-9 h-9 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <MapPin className="h-4.5 w-4.5 sm:h-4 sm:w-4 text-white flex-shrink-0" />
                </div>
                <div className="truncate min-w-0">
                  <h3 className="text-sm sm:text-sm font-extrabold text-text-main truncate font-display">
                    {place ? place.name : placeQuery || 'Destination Information'}
                  </h3>
                  <p className="text-[11px] text-text-muted truncate flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    <span className="truncate">
                      {destination ? `Location in ${destination}` : 'Location Information'}
                    </span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 sm:w-10 sm:h-10 rounded-xl bg-surface-inner border border-border-theme text-text-muted hover:text-text-main hover:bg-surface-hover transition-colors flex items-center justify-center flex-shrink-0 cursor-pointer shadow-md"
              >
                <X className="h-5 w-5 sm:h-5 sm:w-5 flex-shrink-0" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="p-4 sm:p-8 flex-grow flex flex-col overflow-x-hidden min-w-0 pb-10 sm:pb-8">
              {isLoading && <PlaceLoadingSkeleton />}

              {!isLoading && error && (
                <PlaceErrorState
                  error={error}
                  placeName={placeQuery}
                  destination={destination}
                  onRetry={() => {
                    setIsLoading(true);
                    setError(null);
                    // Force state trigger
                    setTimeout(() => setIsLoading(false), 50);
                  }}
                />
              )}

              {!isLoading && !error && place && (
                <div className="space-y-2">
                  <PlaceHeader place={place} />
                  <PlaceOverview place={place} />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
