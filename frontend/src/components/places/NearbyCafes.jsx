import React from 'react';
import { Coffee, Star, MapPin, ExternalLink, Sparkles } from 'lucide-react';

export default function NearbyCafes({ cafes, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-3 pt-6 border-t border-slate-800/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Discovering Nearby Cafes & Tea Houses...</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-28 bg-slate-900/60 rounded-2xl border border-slate-800 animate-pulse" />
          <div className="h-28 bg-slate-900/60 rounded-2xl border border-slate-800 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!Array.isArray(cafes) || cafes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 pt-6 border-t border-slate-800/80 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
          <Coffee className="h-4 w-4 text-amber-400" />
          <span>Nearby Cafes, Bakeries & Tea Rooms</span>
        </h3>
        <span className="text-[11px] font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
          {cafes.length} Cafes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {cafes.map((item, index) => (
          <a
            key={item.id || index}
            href={item.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 shadow-sm relative cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-md">
                <Coffee className="h-3 w-3 text-amber-400" />
                <span className="truncate max-w-[120px]">{item.category || 'Cafe'}</span>
              </span>

              <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded text-xs font-extrabold flex-shrink-0">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span>{item.rating?.toFixed(1) || '4.5'}</span>
              </span>
            </div>

            <h4 className="text-base font-display font-black text-white group-hover:text-amber-200 truncate transition-colors mt-1">
              {item.name}
            </h4>

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
        ))}
      </div>
    </div>
  );
}
