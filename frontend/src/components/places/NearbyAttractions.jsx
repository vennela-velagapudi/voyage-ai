import React from 'react';
import { Landmark, Star, MapPin, ExternalLink, Sparkles, ShoppingBag, Trees } from 'lucide-react';

/**
 * Helper icon assigner for nearby tourist attractions
 */
const getAttractionIcon = (category = '') => {
  const clean = category.toLowerCase();
  if (clean.includes('park') || clean.includes('garden') || clean.includes('nature')) return Trees;
  if (clean.includes('shop') || clean.includes('mall') || clean.includes('market'))
    return ShoppingBag;
  if (
    clean.includes('museum') ||
    clean.includes('temple') ||
    clean.includes('shrine') ||
    clean.includes('history')
  )
    return Landmark;
  return Sparkles;
};

export default function NearbyAttractions({ attractions, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-3 pt-6 border-t border-slate-800/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Locating Nearby Museums & Highlights...</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-28 bg-slate-900/60 rounded-2xl border border-slate-800 animate-pulse" />
          <div className="h-28 bg-slate-900/60 rounded-2xl border border-slate-800 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!Array.isArray(attractions) || attractions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 pt-6 border-t border-slate-800/80 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Nearby Museums, Temples & Hidden Gems</span>
        </h3>
        <span className="text-[11px] font-mono font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 px-2.5 py-0.5 rounded-full">
          {attractions.length} Sights
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {attractions.map((item, index) => {
          const Icon = getAttractionIcon(item.category);
          return (
            <a
              key={item.id || index}
              href={item.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_-5px_rgba(56,189,248,0.15)] relative cursor-pointer"
            >
              {/* Top Category Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-sky-300 bg-sky-500/10 border border-sky-500/30 px-2 py-0.5 rounded-md">
                  <Icon className="h-3 w-3 text-sky-400" />
                  <span className="truncate max-w-[120px]">{item.category || 'Attraction'}</span>
                </span>

                <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded text-xs font-extrabold flex-shrink-0">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  <span>{item.rating?.toFixed(1) || '4.6'}</span>
                </span>
              </div>

              {/* Attraction Name */}
              <h4 className="text-base font-display font-black text-white group-hover:text-sky-200 truncate transition-colors mt-1">
                {item.name}
              </h4>

              {/* Footer Meta: Distance */}
              <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1 text-slate-300 font-medium truncate">
                  <MapPin className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
                  <span>{item.distance || 'Close by'}</span>
                </span>

                <span className="text-indigo-400 font-extrabold group-hover:underline text-[11px] inline-flex items-center gap-0.5">
                  <span>View Map</span>
                  <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
