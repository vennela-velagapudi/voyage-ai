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
      <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-inner">
        <AlertCircle className="h-8 w-8 animate-pulse" />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-lg sm:text-xl font-display font-extrabold text-text-main">
          Location Details Unavailable
        </h3>
        <p className="text-text-body text-sm leading-relaxed">
          {error?.message ||
            'We were unable to load real-time Google Places details for this attraction. Your API key or internet connection might be unconfigured.'}
        </p>
      </div>

      <div className="bg-surface-card/80 p-4 rounded-xl border border-border-theme w-full max-w-xs text-left text-xs text-text-muted flex items-center gap-3">
        <MapPin className="h-4 w-4 text-sky-600 dark:text-sky-400 flex-shrink-0" />
        <span className="truncate text-text-body font-medium">
          {placeName || 'Selected Location'}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-5 py-2.5 rounded-xl bg-surface-inner hover:bg-surface-hover text-text-body hover:text-text-main text-sm font-bold flex items-center gap-2 transition-colors border border-border-theme cursor-pointer shadow-sm"
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
