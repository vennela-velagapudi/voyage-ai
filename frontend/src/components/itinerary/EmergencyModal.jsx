import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  PhoneCall,
  Hospital,
  MapPin,
  X,
  ExternalLink,
  Flame,
  Siren,
  HeartPulse,
} from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose, destination, emergencyInfo = {} }) {
  if (!isOpen) return null;

  const police = emergencyInfo.police || '110 / 112 (Local Police)';
  const ambulance = emergencyInfo.ambulance || '119 / 102 (Local Medical Rescue)';
  const fire = emergencyInfo.fire || '119 / 101 (Fire Brigade)';
  const touristHelpline =
    emergencyInfo.touristHelpline || '24/7 National Tourist Assistance Helpline';
  const hospitalName = emergencyInfo.nearestHospitalName || 'Central District General Hospital';
  const hospitalAddress =
    emergencyInfo.nearestHospitalAddress || `Main Medical Center, ${destination || 'City Center'}`;
  const mapsUrl =
    emergencyInfo.googleMapsUrl ||
    `https://maps.google.com/?q=${encodeURIComponent('emergency hospital in ' + (destination || 'my area'))}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-lg rounded-3xl glass-effect bg-slate-900 border border-rose-500/50 shadow-2xl shadow-rose-950/50 overflow-hidden text-left relative overflow-x-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 p-4 sm:p-6 border-b border-rose-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shadow-inner flex-shrink-0">
                <ShieldAlert className="h-5 sm:h-6 w-5 sm:w-6 animate-pulse" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-bold text-rose-300 uppercase tracking-wider block truncate">
                  Emergency Information
                </span>
                <h3 className="text-base sm:text-xl font-display font-black text-white capitalize truncate">
                  {destination || 'Destination'} Support
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center p-2.5 sm:p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Close emergency modal"
            >
              <X className="h-5 sm:h-5 w-5 sm:w-5 flex-shrink-0" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-h-[75vh] overflow-y-auto overflow-x-hidden">
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium break-words">
              Keep these verified local helpline numbers accessible during your stay in{' '}
              <strong className="text-rose-300 capitalize">
                {destination || 'your destination'}
              </strong>
              . In case of urgent assistance, dial direct or proceed to the nearest emergency room.
            </p>

            {/* Helpline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Siren className="h-5 w-5" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Police
                  </span>
                  <span className="text-white text-sm font-black truncate block">{police}</span>
                </div>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center flex-shrink-0">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Ambulance
                  </span>
                  <span className="text-white text-sm font-black truncate block">{ambulance}</span>
                </div>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Flame className="h-5 w-5" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Fire Brigade
                  </span>
                  <span className="text-white text-sm font-black truncate block">{fire}</span>
                </div>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Tourist Helpline
                  </span>
                  <span className="text-white text-sm font-black truncate block">
                    {touristHelpline}
                  </span>
                </div>
              </div>
            </div>

            {/* Nearest Hospital Card */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 rounded-2xl border border-indigo-500/30 shadow-inner">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Hospital className="h-5 w-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                      Nearest Emergency Hospital
                    </span>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] sm:min-h-0 inline-flex items-center gap-1 text-xs sm:text-[11px] font-extrabold text-sky-400 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 px-3 py-1.5 sm:px-2.5 sm:py-1 rounded-full transition-all"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="h-3.5 w-3.5 sm:h-3 sm:w-3 flex-shrink-0" />
                    </a>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1.5 break-words">
                    {hospitalName}
                  </h4>
                  <p className="text-slate-400 text-xs flex items-center gap-1 mt-1 break-words">
                    <MapPin className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                    <span>{hospitalAddress}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-950/90 p-4 border-t border-slate-800 text-center">
            <button
              onClick={onClose}
              className="w-full min-h-[44px] sm:min-h-0 py-3 sm:py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold transition-all border border-slate-700 cursor-pointer shadow flex items-center justify-center"
            >
              Done & Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
