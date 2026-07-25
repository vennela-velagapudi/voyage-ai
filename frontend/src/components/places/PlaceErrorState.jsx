import React from 'react';
import { AlertCircle, ExternalLink, RefreshCw, MapPin } from 'lucide-react';

export default function PlaceErrorState({ error, placeName, onRetry, destination }) {
  const query =
    destination && !placeName?.toLowerCase().includes(destination.toLowerCase())
      ? `${placeName}, ${destination}`
      : placeName;

  const fallbackMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query || 'attraction')}`;

  return (
    <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-5 my-auto">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
        <AlertCircle className="h-8 w-8 animate-pulse" />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-lg sm:text-xl font-display font-extrabold text-white">
          Location Details Unavailable
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          {error?.message ||
            'We were unable to load real-time Google Places details for this attraction. Your API key or internet connection might be unconfigured.'}
        </p>
      </div>

      <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 w-full max-w-xs text-left text-xs text-slate-400 flex items-center gap-3">
        <MapPin className="h-4 w-4 text-sky-400 flex-shrink-0" />
        <span className="truncate text-slate-300 font-medium">
          {placeName || 'Selected Location'}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold flex items-center gap-2 transition-colors border border-slate-700 cursor-pointer shadow-sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry Loading</span>
          </button>
        )}

        <a
          href={fallbackMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-sm font-extrabold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/25"
        >
          <span>Search Google Maps</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
