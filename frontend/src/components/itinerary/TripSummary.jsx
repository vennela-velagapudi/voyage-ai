import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Wallet,
  Users,
  Sparkles,
  Lightbulb,
  Heart,
  FileText,
  Tag,
  Smile,
  AlertCircle,
  Clock,
  Navigation,
  Footprints,
  Gauge,
} from 'lucide-react';
import ResponsiveImage from '../common/ResponsiveImage';

export default function TripSummary({ itinerary, userParams = {} }) {
  if (!itinerary) return null;

  const tripTitle = itinerary.tripTitle;
  const destination = itinerary.destination || userParams.destination || 'your destination';
  const durationDays = itinerary.durationDays || userParams.days || 1;
  const rawBudget = itinerary.budget || userParams.budget || 'Moderate';
  const budget =
    String(rawBudget).replace(/\$/g, '₹').charAt(0).toUpperCase() +
    String(rawBudget).slice(1).toLowerCase();
  const travelStyle = itinerary.travelStyle || userParams.travelStyle || 'travel';
  const overview = itinerary.overview;
  const estimatedTotalBudgetTip = itinerary.estimatedTotalBudgetTip
    ? String(itinerary.estimatedTotalBudgetTip).replace(/\$/g, '₹')
    : null;
  const expansionNotice = itinerary.expansionNotice || userParams.expansionNotice;

  // Dynamically compute summary statistics whenever activities are modified (Milestone 5 Requirement 7)
  let totalActivities = 0;
  let totalWalkingMins = 0;
  let totalTransitMins = 0;

  if (Array.isArray(itinerary.dailyItinerary)) {
    itinerary.dailyItinerary.forEach((day) => {
      if (Array.isArray(day.timeline)) {
        totalActivities += day.timeline.length;
        day.timeline.forEach((item) => {
          if (item.transportToNext && item.transportToNext.duration) {
            const match = String(item.transportToNext.duration).match(/(\d+)/);
            const mins = match ? parseInt(match[0], 10) : 12;
            if (
              String(item.transportToNext.mode).toLowerCase() === 'walk' ||
              String(item.transportToNext.mode).toLowerCase() === 'walking'
            ) {
              totalWalkingMins += mins;
            } else {
              totalTransitMins += mins;
            }
          } else {
            // Default baseline walking estimate between standard activities
            totalWalkingMins += 10;
          }
        });
      }
    });
  }

  const formatMinutes = (totalMins) => {
    if (totalMins < 60) return `${totalMins} mins`;
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return mins > 0 ? `${hrs} hr ${mins} mins` : `${hrs} hrs`;
  };

  const avgPerDay = durationDays > 0 ? totalActivities / durationDays : 5;
  let estimatedPace = 'Relaxed';
  let paceColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/15';
  if (avgPerDay >= 6.5) {
    estimatedPace = 'Active & Fast-Paced';
    paceColor = 'text-rose-400 border-rose-500/30 bg-rose-500/15';
  } else if (avgPerDay >= 4.5) {
    estimatedPace = 'Balanced / Moderate';
    paceColor = 'text-sky-400 border-sky-500/30 bg-sky-500/15';
  }

  // Retrieve interests and notes cleanly from userParams or fallback
  const interestsList = Array.isArray(userParams.interests)
    ? userParams.interests.map((item) =>
        item === 'other' && userParams.interestsOther ? userParams.interestsOther.trim() : item
      )
    : [];

  const notesText = userParams.notes ? userParams.notes.trim() : null;

  // Generate a friendly introductory paragraph summarizing the selected trip
  const formattedInterests =
    interestsList.length > 0
      ? interestsList.length === 1
        ? interestsList[0]
        : interestsList.slice(0, -1).join(', ') + ' and ' + interestsList[interestsList.length - 1]
      : 'discovery and local attractions';

  const friendlyIntro = `Here is your custom ${durationDays}-day itinerary for ${destination}, tailored for a ${budget} ${travelStyle} travel style. Built around your interests in ${formattedInterests}, this schedule is organized into chronological daily timelines to make your trip enjoyable and seamless${
    notesText ? ', while respecting your notes and custom preferences' : ''
  }.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto rounded-3xl glass-effect p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-indigo-500/40 backdrop-blur-2xl mb-8 text-left bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-950"
    >
      {/* Decorative gradient atmosphere */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-sky-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent pointer-events-none shadow-[0_0_20px_rgba(99,102,241,0.8)]" />

      {/* Top Tag */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-inner">
          <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
          <span>Trip Summary</span>
        </div>
      </div>

      {/* Trip Title */}
      <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight sm:leading-snug mb-6">
        {tripTitle || 'Your Itinerary'}
      </h1>

      {/* Destination Hero Photography */}
      {(itinerary.destinationImage ||
        (Array.isArray(itinerary.destinationPhotos) && itinerary.destinationPhotos[0])) && (
        <ResponsiveImage
          src={itinerary.destinationImage || itinerary.destinationPhotos[0]}
          alt={destination}
          className="w-full h-64 sm:h-80 sm:max-h-96 relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800/80 shadow-2xl mb-8 group"
          imageClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 brightness-[0.95]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200 text-xs font-bold shadow">
              <MapPin className="h-3.5 w-3.5 text-sky-400" />
              <span>{destination}</span>
            </span>
          </div>
        </ResponsiveImage>
      )}

      {/* Expanded Duration Notice Banner */}
      {expansionNotice && (
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900/90 to-amber-950/40 p-4 sm:p-5 rounded-2xl border border-amber-500/40 mb-6 flex items-start gap-3.5 shadow-md">
          <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300 mb-1">
              Destination Scope Notice
            </h4>
            <p className="text-slate-200 text-sm leading-relaxed font-normal">{expansionNotice}</p>
          </div>
        </div>
      )}

      {/* Introductory Paragraph */}
      <div className="bg-slate-900/60 p-5 sm:p-6 rounded-2xl border border-slate-800/80 my-6 flex items-start gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Smile className="h-5 w-5 text-indigo-400" />
        </div>
        <div className="flex-grow">
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
            {friendlyIntro}
          </p>
        </div>
      </div>

      {/* Dynamic Interactive Travel Pace & Transit Summary Metrics */}
      <div className="bg-slate-950/80 p-5 rounded-3xl border border-slate-800 mb-6 shadow-inner">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3.5 flex items-center gap-2">
          <Gauge className="h-4 w-4 text-indigo-400" />
          <span>Dynamic Schedule Statistics</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800/80 flex flex-col justify-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Total Activities
            </span>
            <span className="text-white font-display font-black text-xl flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-indigo-400" />
              <span>{totalActivities}</span>
            </span>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800/80 flex flex-col justify-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Walking Time
            </span>
            <span className="text-white font-display font-bold text-base sm:text-lg flex items-center gap-1.5 truncate">
              <Footprints className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>{formatMinutes(totalWalkingMins)}</span>
            </span>
          </div>

          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800/80 flex flex-col justify-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Transport Time
            </span>
            <span className="text-white font-display font-bold text-base sm:text-lg flex items-center gap-1.5 truncate">
              <Navigation className="h-4 w-4 text-sky-400 flex-shrink-0 rotate-45" />
              <span>{formatMinutes(totalTransitMins)}</span>
            </span>
          </div>

          <div className={`p-3.5 rounded-2xl border flex flex-col justify-center ${paceColor}`}>
            <span className="text-[11px] font-bold uppercase tracking-wider block mb-1 opacity-90">
              Estimated Pace
            </span>
            <span className="text-white font-display font-extrabold text-xs sm:text-sm truncate block">
              {estimatedPace}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-6 pt-2">
        <div className="flex items-center gap-3 bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-colors shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Destination
            </p>
            <p className="text-white text-sm font-extrabold truncate capitalize">{destination}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-sky-500/40 transition-colors shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Duration
            </p>
            <p className="text-white text-sm font-extrabold">
              {durationDays} {Number(durationDays) === 1 ? 'Day' : 'Days'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 transition-colors shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Budget</p>
            <p className="text-white text-sm font-extrabold capitalize">{budget}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-purple-500/40 transition-colors shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Style</p>
            <p className="text-white text-sm font-extrabold capitalize">{travelStyle}</p>
          </div>
        </div>
      </div>

      {/* Selected Interests & Optional Notes Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Interests */}
        <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between shadow-inner">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-sky-400" />
              <span>Interests</span>
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {interestsList.length > 0 ? (
                interestsList.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 shadow-2xs"
                  >
                    <Heart className="h-3 w-3 text-indigo-400 fill-indigo-400" />
                    <span className="capitalize">{interest}</span>
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-sm italic">General highlights</span>
              )}
            </div>
          </div>
        </div>

        {/* Optional Notes */}
        <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between shadow-inner">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-emerald-400" />
              <span>Notes</span>
            </h4>
            {notesText ? (
              <p className="text-slate-200 text-sm italic leading-relaxed pt-1 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 font-mono">
                &ldquo;{notesText}&rdquo;
              </p>
            ) : (
              <p className="text-slate-500 text-sm italic pt-2">
                No custom notes or dietary instructions provided.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Trip Overview */}
      {overview && (
        <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800/90 my-6 shadow-inner">
          <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Overview</span>
          </h3>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
            {overview}
          </p>
        </div>
      )}

      {/* Budget & Logistics Advice */}
      {estimatedTotalBudgetTip && (
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-indigo-950/30 p-5 sm:p-6 rounded-2xl border border-emerald-500/30 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30 shadow-inner">
            <Lightbulb className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-300 mb-1">Budget & Logistics Guidance</h4>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              {estimatedTotalBudgetTip}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
