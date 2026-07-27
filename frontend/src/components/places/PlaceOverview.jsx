import React from 'react';
import { MapPin, Clock, Globe, ExternalLink, Navigation } from 'lucide-react';

export default function PlaceOverview({ place }) {
  if (!place) return null;

  const { address, openingHours, website, googleMapsUrl } = place;

  const displayHours =
    openingHours && openingHours !== 'Not available' && openingHours !== 'Hours not available'
      ? openingHours
      : 'Hours not available';

  return (
    <div className="space-y-6 pt-4 border-t border-border-theme mb-8">
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">
          Location & Operating Details
        </h3>

        <div className="space-y-3">
          {/* Address Card */}
          <div className="flex items-start gap-3 bg-surface-inner/60 p-3.5 rounded-xl border border-border-theme shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs text-text-muted font-bold uppercase tracking-wide">Address</p>
              <p className="text-text-body text-xs sm:text-sm font-medium leading-relaxed mt-0.5 break-words">
                {address && address !== 'Not available' && address !== 'Address unavailable'
                  ? address
                  : 'Address unavailable'}
              </p>
            </div>
          </div>

          {/* Hours Card */}
          <div className="flex items-start gap-3 bg-surface-inner/60 p-3.5 rounded-xl border border-border-theme shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs text-text-muted font-bold uppercase tracking-wide">
                Opening Hours
              </p>
              <p className="text-text-body text-xs sm:text-sm font-extrabold mt-0.5 break-words">
                {displayHours}
              </p>
            </div>
          </div>

          {/* Official Website */}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 bg-surface-inner/70 hover:bg-surface-hover p-3.5 rounded-xl border border-border-theme hover:border-indigo-500/40 text-text-body hover:text-text-main transition-all group cursor-pointer shadow-2xs min-w-0"
            >
              <div className="flex items-center gap-3 truncate min-w-0">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-4.5 w-4.5" />
                </div>
                <div className="truncate text-left min-w-0">
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wide">
                    Official Website
                  </p>
                  <p className="text-xs sm:text-sm font-medium truncate text-indigo-600 dark:text-indigo-300 group-hover:underline">
                    {website}
                  </p>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-text-subtle group-hover:text-text-main flex-shrink-0" />
            </a>
          )}
        </div>

        {/* Primary Google Maps Button - Final Section of Panel */}
        <div className="pt-1">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[48px] sm:min-h-0 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-2.5 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
          >
            <Navigation className="h-5 w-5 sm:h-5 sm:w-5 fill-white/20 animate-pulse flex-shrink-0" />
            <span>Open Direct in Google Maps</span>
            <ExternalLink className="h-4 w-4 sm:h-4 sm:w-4 opacity-80 ml-1 flex-shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
