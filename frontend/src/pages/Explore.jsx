import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Sun,
  Wallet,
  ArrowRight,
  Sparkles,
  Compass,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import ResponsiveImage from '../components/common/ResponsiveImage';
import { ApiService } from '../services/apiService';

const DESTINATIONS = [
  {
    id: 'kyoto',
    name: 'Kyoto, Japan',
    title: 'Ancient Zen Temples & Bamboo Groves',
    description:
      'Immerse yourself in timeless Japanese culture, world-class Shojin Ryori gastronomy, and tranquil historic gardens.',
    season: 'Spring (March - April) & Autumn (Oct - Nov)',
    budget: 'Approx. 2500–4500 (Moderate to Luxury)',
    tag: 'Cultural Heritage',
    accent: 'indigo',
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast, Italy',
    title: 'Dramatic Cliffs & Positano Sunsets',
    description:
      'Wander pastel colored cliffside villas, luxury yachts, Mediterranean vistas, and artisanal culinary terraces.',
    season: 'Late Spring to Summer (May - Sept)',
    budget: 'Approx. 3200–6000 (Luxury Couple)',
    tag: 'Coastal & Luxury',
    accent: 'sky',
  },
  {
    id: 'santorini',
    name: 'Santorini, Greece',
    title: 'Whitewashed Aegean Calderas',
    description:
      'Experience romantic cliff-side infinity pools, volcanic wineries, and legendary Aegean sunsets over Oia.',
    season: 'Summer to Early Autumn (June - Oct)',
    budget: 'Approx. 2800–5000 (Romantic Escape)',
    tag: 'Romantic Escape',
    accent: 'purple',
  },
  {
    id: 'banff',
    name: 'Banff National Park, Canada',
    title: 'Turquoise Glacial Lakes & Alpine Peaks',
    description:
      'Hike rugged Rocky Mountain wilderness trails, canoe crystal-clear glacial waters, and soak in naturally hot thermal springs.',
    season: 'Summer (July - August) & Winter Skiing',
    budget: 'Approx. 1800–3400 (Adventure / Moderate)',
    tag: 'Nature & Adventure',
    accent: 'emerald',
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    title: 'Sacred Sanctuaries & Jungle Cascades',
    description:
      'Rejuvenate among emerald rice terraces in Ubud, vibrant beachside nightlife in Seminyak, and holistic wellness retreats.',
    season: 'Dry Season (April - October)',
    budget: 'Approx. 1200–2800 (Smart Budget / Moderate)',
    tag: 'Wellness & Tropics',
    accent: 'amber',
  },
  {
    id: 'swiss',
    name: 'Swiss Alps, Switzerland',
    title: 'Panoramic Peaks & Express Trains',
    description:
      'Ride world-renowned scenic mountain trains through Zermatt and Interlaken while tasting fine Swiss chocolate and fondue.',
    season: 'Summer Hiking (June - Sept) & Winter Ski',
    budget: 'Approx. 3500–6500 (Premium Experience)',
    tag: 'Scenic & Luxury',
    accent: 'rose',
  },
];

function DestinationCard({ dest, index, onPlan }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [fetchingPhoto, setFetchingPhoto] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchRealGooglePhoto = async () => {
      try {
        const placeData = await ApiService.searchPlace({ query: dest.name });
        if (
          isMounted &&
          placeData &&
          (placeData.primaryPhoto || (placeData.photos && placeData.photos[0]))
        ) {
          setPhotoUrl(placeData.primaryPhoto || placeData.photos[0]);
        }
      } catch {
        // Silently ignore search errors; no fabricated or fake stock image will be displayed
      } finally {
        if (isMounted) {
          setFetchingPhoto(false);
        }
      }
    };

    fetchRealGooglePhoto();
    return () => {
      isMounted = false;
    };
  }, [dest.name]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="rounded-3xl glass-effect border border-border-theme hover:border-indigo-500/50 overflow-hidden shadow-2xl transition-all duration-300 bg-surface-card/90 flex flex-col justify-between group"
    >
      <div>
        {/* Image & Tag Header */}
        <div className="relative h-56 w-full overflow-hidden bg-surface-inner">
          {photoUrl ? (
            <ResponsiveImage
              src={photoUrl}
              alt={dest.name}
              className="w-full h-full relative overflow-hidden bg-surface-inner"
              imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
            />
          ) : (
            /* Graceful "No photo available" architectural banner; zero fake/fabricated images */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-surface-inner text-text-muted">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-2 shadow-inner">
                {fetchingPhoto ? (
                  <Camera className="h-5 w-5 animate-pulse" />
                ) : (
                  <ImageIcon className="h-5 w-5 opacity-60" />
                )}
              </div>
              <p className="text-xs font-mono text-text-subtle uppercase tracking-wider">
                {fetchingPhoto ? 'Checking Google Places Media...' : 'Official Photo Unavailable'}
              </p>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 rounded-full bg-slate-900/90 text-indigo-300 border border-indigo-500/30 text-xs font-bold backdrop-blur-md shadow-lg">
              {dest.tag}
            </span>
          </div>

          <div className="absolute bottom-4 left-5 right-5 z-20">
            <div className="flex items-center gap-1.5 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{dest.name}</span>
            </div>
            <h3 className="text-xl font-display font-extrabold text-white group-hover:text-indigo-200 transition-colors leading-snug">
              {dest.title}
            </h3>
          </div>
        </div>

        {/* Description and Metadata */}
        <div className="p-6 pb-4 space-y-4">
          <p className="text-text-muted text-sm leading-relaxed line-clamp-3 font-normal">
            {dest.description}
          </p>

          <div className="space-y-2 pt-3 border-t border-border-theme text-xs text-text-body">
            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded-md bg-amber-500/10 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0">
                <Sun className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-text-muted font-medium">Best Season: </span>
                <strong className="text-text-main font-semibold">{dest.season}</strong>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0">
                <Wallet className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-text-muted font-medium">Estimated Spend: </span>
                <strong className="text-text-main font-semibold">{dest.budget}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button Footer */}
      <div className="p-6 pt-2">
        <button
          type="button"
          onClick={() => onPlan(dest.name)}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white text-sm font-bold shadow-lg glow-effect transition-all duration-300 cursor-pointer"
        >
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span>Plan Trip to {dest.name.split(',')[0]}</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Explore() {
  const navigate = useNavigate();

  const handlePlanForDestination = (destinationName) => {
    navigate(`/plan?destination=${encodeURIComponent(destinationName)}`, {
      state: { destination: destinationName },
    });
  };

  return (
    <div className="w-full relative overflow-hidden pt-12 pb-24 min-h-screen">
      {/* Background Atmosphere contained in bounds */}
      <div className="absolute inset-0 w-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-card border border-border-theme text-sky-600 dark:text-sky-400 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
          >
            <Compass className="h-4 w-4 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Curated Global Hotspots</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-text-main tracking-tight mb-4 leading-tight">
            Explore Iconic <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Travel Destinations
            </span>
          </h1>
          <p className="text-text-body text-base sm:text-lg leading-relaxed">
            Get inspired by world-renowned routes. Select any destination below to instantly launch
            our AI itinerary generator with pre-configured parameters.
          </p>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((dest, index) => (
            <DestinationCard
              key={dest.id}
              dest={dest}
              index={index}
              onPlan={handlePlanForDestination}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
