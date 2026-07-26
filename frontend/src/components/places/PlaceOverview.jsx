import React from 'react';
import { MapPin, Clock, Globe, ExternalLink, Navigation } from 'lucide-react';

export default function PlaceOverview({ place }) {
  if (!place) return null;

  const { address, openingHours, website, googleMapsUrl } = place;

  const displayHours = openingHours || 'Not available';

  return (
    <div className="space-y-4 pt-4 border-t border-slate-800/80 mb-8">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
        Location & Operating Details
      </h3>

      <div className="space-y-3">
        {/* Address Card */}
        <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Address</p>
            <p className="text-slate-200 text-sm font-medium leading-relaxed mt-0.5">
              {address || 'Not available'}
            </p>
          </div>
        </div>

        {/* Hours Card */}
        <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Clock className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
              Opening Hours
            </p>
            <p className="text-slate-200 text-sm font-extrabold mt-0.5">{displayHours}</p>
          </div>
        </div>

        {/* Official Website */}
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 bg-slate-900/70 hover:bg-slate-800 p-3.5 rounded-xl border border-slate-800 hover:border-indigo-500/40 text-slate-200 hover:text-white transition-all group cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Globe className="h-4.5 w-4.5" />
              </div>
              <div className="truncate text-left">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                  Official Website
                </p>
                <p className="text-sm font-medium truncate text-indigo-300 group-hover:underline">
                  {website}
                </p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-white flex-shrink-0" />
          </a>
        )}
      </div>

      {/* Primary Google Maps Button */}
      <div className="pt-2">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Navigation className="h-5 w-5 fill-white/20 animate-pulse" />
          <span>Open Direct in Google Maps</span>
          <ExternalLink className="h-4 w-4 opacity-80 ml-1" />
        </a>
      </div>
    </div>
  );
}
