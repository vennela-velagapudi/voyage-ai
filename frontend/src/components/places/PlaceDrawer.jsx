import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Sparkles } from 'lucide-react';
import { ApiService } from '../../services/apiService';
import PlaceLoadingSkeleton from './PlaceLoadingSkeleton';
import PlaceErrorState from './PlaceErrorState';
import PlaceGallery from './PlaceGallery';
import PlaceHeader from './PlaceHeader';
import PlaceOverview from './PlaceOverview';
import NearbyRestaurants from './NearbyRestaurants';
import NearbyAttractions from './NearbyAttractions';
import NearbyCafes from './NearbyCafes';
import BestPhotoSpots from './BestPhotoSpots';

export default function PlaceDrawer({ isOpen, onClose, placeQuery, destination }) {
  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // States for nearby discoveries
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [nearbyAttractions, setNearbyAttractions] = useState([]);
  const [nearbyCafes, setNearbyCafes] = useState([]);
  const [photoSpots, setPhotoSpots] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchPlaceData() {
      if (!isOpen || !placeQuery) return;
      setIsLoading(true);
      setError(null);
      setPlace(null);
      setNearbyRestaurants([]);
      setNearbyAttractions([]);
      setNearbyCafes([]);
      setPhotoSpots([]);

      try {
        const response = await ApiService.searchPlace({
          query: placeQuery,
          destination: destination || '',
        });

        if (isMounted && response?.data) {
          const fetchedPlace = response.data.data || response.data;
          setPlace(fetchedPlace);
          setIsLoading(false);

          // If GPS coordinates exist, automatically fetch nearby dining, sights, cafes and photo spots
          if (fetchedPlace.coordinates) {
            setLoadingNearby(true);
            try {
              const [restRes, attrRes, cafeRes, photoRes] = await Promise.all([
                ApiService.searchNearby({
                  lat: fetchedPlace.coordinates.lat,
                  lng: fetchedPlace.coordinates.lng,
                  category: 'restaurant',
                }),
                ApiService.searchNearby({
                  lat: fetchedPlace.coordinates.lat,
                  lng: fetchedPlace.coordinates.lng,
                  category: 'attraction',
                }),
                ApiService.searchNearby({
                  lat: fetchedPlace.coordinates.lat,
                  lng: fetchedPlace.coordinates.lng,
                  category: 'cafe',
                }),
                ApiService.searchNearby({
                  lat: fetchedPlace.coordinates.lat,
                  lng: fetchedPlace.coordinates.lng,
                  category: 'photo_spot',
                }),
              ]);
              if (isMounted) {
                setNearbyRestaurants(restRes?.data?.data || restRes?.data || []);
                setNearbyAttractions(attrRes?.data?.data || attrRes?.data || []);
                setNearbyCafes(cafeRes?.data?.data || cafeRes?.data || []);
                setPhotoSpots(photoRes?.data?.data || photoRes?.data || []);
              }
            } catch (nearbyErr) {
              console.warn('Nearby place search fallback triggered:', nearbyErr.message);
            } finally {
              if (isMounted) setLoadingNearby(false);
            }
          }
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
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity cursor-pointer"
          />

          {/* Responsive Drawer Panel: Bottom sheet/full modal on mobile, right panel on desktop */}
          <motion.div
            initial={{ opacity: 0, y: '10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '10%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="relative w-full sm:max-w-xl md:max-w-2xl bg-slate-950/98 text-white h-[95vh] sm:h-full max-h-screen overflow-y-auto shadow-2xl rounded-t-3xl sm:rounded-t-none border-t sm:border-t-0 sm:border-l border-indigo-500/40 flex flex-col z-10 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950"
          >
            {/* Top Fixed Drawer Navbar */}
            <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden pr-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center flex-shrink-0 shadow-md">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="truncate">
                  <h3 className="text-sm font-extrabold text-white truncate font-display">
                    {place ? place.name : placeQuery || 'Destination Information'}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-indigo-400" />
                    <span>
                      {destination ? `Location in ${destination}` : 'Location Information'}
                    </span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center flex-shrink-0 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="p-6 sm:p-8 flex-grow flex flex-col">
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
                  <PlaceGallery photos={place.photos} placeName={place.name} />
                  <PlaceHeader place={place} />
                  <PlaceOverview place={place} />

                  {/* Nearby Discoveries Section */}
                  <NearbyRestaurants restaurants={nearbyRestaurants} isLoading={loadingNearby} />
                  <NearbyCafes cafes={nearbyCafes} isLoading={loadingNearby} />
                  <NearbyAttractions attractions={nearbyAttractions} isLoading={loadingNearby} />
                  <BestPhotoSpots spots={photoSpots} isLoading={loadingNearby} />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
