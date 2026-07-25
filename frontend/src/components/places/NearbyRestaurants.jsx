import React from 'react';
import { Utensils, Star, MapPin, ExternalLink, Clock } from 'lucide-react';

export default function NearbyRestaurants({ restaurants, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-3 pt-6 border-t border-slate-800/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
          <Utensils className="h-4 w-4 animate-bounce" />
          <span>Discovering Nearby Restaurants...</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-32 bg-slate-900/60 rounded-2xl border border-slate-800 animate-pulse" />
          <div className="h-32 bg-slate-900/60 rounded-2xl border border-slate-800 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!Array.isArray(restaurants) || restaurants.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 pt-6 border-t border-slate-800/80 mb-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
          <Utensils className="h-4 w-4" />
          <span>Nearby Culinary & Dining Options</span>
        </h3>
        <span className="text-[11px] font-mono font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
          {restaurants.length} Places
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {restaurants.map((item, index) => (
          <a
            key={item.id || index}
            href={item.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_-5px_rgba(244,63,94,0.15)] relative cursor-pointer"
          >
            {/* Header: Rating & Price */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-md text-xs font-extrabold">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span>{item.rating?.toFixed(1) || '4.5'}</span>
              </span>

              <span className="text-xs font-bold font-mono text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800/80">
                {item.priceLevel || '$$'}
              </span>
            </div>

            {/* Restaurant Name */}
            <h4 className="text-base font-display font-black text-white group-hover:text-rose-200 truncate transition-colors">
              {item.name}
            </h4>
            <p className="text-xs text-rose-300/90 font-medium truncate mt-0.5">
              {item.category || 'Specialty Cuisine'}
            </p>

            {/* Footer Meta: Distance & Open Now */}
            <div className="flex items-center justify-between gap-2 mt-3.5 pt-2.5 border-t border-slate-800/60 text-[11px]">
              <span className="inline-flex items-center gap-1 text-slate-300 font-medium truncate">
                <MapPin className="h-3 w-3 text-sky-400 flex-shrink-0" />
                <span className="truncate">{item.distance || 'Walking Distance'}</span>
              </span>

              <span
                className={`inline-flex items-center gap-1 font-extrabold flex-shrink-0 ${
                  item.openNow ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                <Clock className="h-3 w-3" />
                <span>{item.openNow ? 'Open Now' : 'Closed'}</span>
              </span>
            </div>

            {/* External hover icon */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="h-4 w-4 text-rose-400" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
