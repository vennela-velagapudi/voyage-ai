import React from 'react';
import { Camera, Star, MapPin, ExternalLink, Sparkles } from 'lucide-react';

export default function BestPhotoSpots({ spots, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-3 pt-6 border-t border-slate-800/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Locating Best Photo Spots & Vistas...</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-28 bg-slate-900/60 rounded-2xl border border-slate-800 animate-pulse" />
          <div className="h-28 bg-slate-900/60 rounded-2xl border border-slate-800 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!Array.isArray(spots) || spots.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 pt-6 border-t border-slate-800/80 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
          <Camera className="h-4 w-4 text-rose-400" />
          <span>Best Photo Spots & Scenic Vistas</span>
        </h3>
        <span className="text-[11px] font-mono font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
          {spots.length} Photo Spots
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {spots.map((item, index) => (
          <a
            key={item.id || index}
            href={item.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 shadow-sm relative cursor-pointer"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-rose-300 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded-md">
                <Camera className="h-3 w-3 text-rose-400" />
                <span className="truncate max-w-[120px]">{item.category || 'Photo Spot'}</span>
              </span>

              <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded text-xs font-extrabold flex-shrink-0">
                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                <span>{item.rating?.toFixed(1) || '4.7'}</span>
              </span>
            </div>

            <h4 className="text-base font-display font-black text-white group-hover:text-rose-200 truncate transition-colors mt-1">
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
