import React from 'react';
import {
  MapPin,
  Clock,
  Globe,
  ExternalLink,
  Navigation,
  ShieldAlert,
  HeartPulse,
  Flame,
  PhoneCall,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

export default function PlaceOverview({ place }) {
  if (!place) return null;

  const { address, openingHours, website, googleMapsUrl, emergencyContacts, travelTips } = place;

  const displayHours = openingHours || '9:00 AM – 6:00 PM';

  return (
    <div className="space-y-6 pt-4 border-t border-slate-800/80 mb-8">
      <div className="space-y-4">
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
        <div className="pt-1">
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

      {/* Emergency Contacts Section */}
      {emergencyContacts && (
        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-rose-400" />
            <span>Emergency & Medical Assistance</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center flex-shrink-0 font-bold">
                <PhoneCall className="h-4 w-4" />
              </div>
              <div className="truncate">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Police</p>
                <p className="text-xs font-mono font-extrabold text-white truncate">
                  {emergencyContacts.police || '110 / 911'}
                </p>
              </div>
            </div>

            <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0 font-bold">
                <HeartPulse className="h-4 w-4" />
              </div>
              <div className="truncate">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Ambulance & Fire</p>
                <p className="text-xs font-mono font-extrabold text-white truncate">
                  {emergencyContacts.ambulance || emergencyContacts.fire || '119 / 911'}
                </p>
              </div>
            </div>

            <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/80 sm:col-span-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold">
                <Flame className="h-4 w-4" />
              </div>
              <div className="truncate">
                <p className="text-[10px] text-slate-400 font-bold uppercase">
                  Nearest Medical Center
                </p>
                <p className="text-xs font-medium text-slate-200 truncate">
                  {emergencyContacts.hospital || 'Central City General Hospital & Medical Aid'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Travel Tips Section */}
      {travelTips && Array.isArray(travelTips) && travelTips.length > 0 && (
        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400 animate-bounce" />
            <span>Traveler Tips & Local Guidance</span>
          </h3>
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 space-y-3">
            {travelTips.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
