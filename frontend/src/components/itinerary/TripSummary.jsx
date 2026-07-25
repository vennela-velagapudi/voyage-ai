import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Wallet,
  Users,
  Sparkles,
  Lightbulb,
  Compass,
  Heart,
  FileText,
  Tag,
  Smile,
} from 'lucide-react';

export default function TripSummary({ itinerary, userParams = {} }) {
  if (!itinerary) return null;

  const tripTitle = itinerary.tripTitle;
  const destination = itinerary.destination || userParams.destination || 'your destination';
  const durationDays = itinerary.durationDays || userParams.days || 1;
  const budget = itinerary.budget || userParams.budget || 'moderate';
  const travelStyle = itinerary.travelStyle || userParams.travelStyle || 'travel';
  const overview = itinerary.overview;
  const estimatedTotalBudgetTip = itinerary.estimatedTotalBudgetTip;

  // Retrieve interests and notes cleanly from userParams or fallback
  const interestsList = Array.isArray(userParams.interests)
    ? userParams.interests.map((item) =>
        item === 'other' && userParams.interestsOther ? userParams.interestsOther.trim() : item
      )
    : [];

  const notesText = userParams.notes ? userParams.notes.trim() : null;

  // Generate a friendly, heartwarming introductory paragraph summarizing the selected trip
  const formattedInterests =
    interestsList.length > 0
      ? interestsList.length === 1
        ? interestsList[0]
        : interestsList.slice(0, -1).join(', ') + ' and ' + interestsList[interestsList.length - 1]
      : 'discovery and authentic sights';

  const friendlyIntro = `Get ready for an unforgettable adventure to ${destination}! We have crafted this personalized ${durationDays}-day journey designed especially for a ${budget} ${travelStyle} trip. Centered around your passions for ${formattedInterests}, every single hour has been thoughtfully routed to maximize joy, cultural immersion, and stress-free exploration${
    notesText ? ' while keeping all your custom requirements front and center' : ''
  }. Explore your daily roadmap below!`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto rounded-3xl glass-effect p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-indigo-500/40 backdrop-blur-2xl mb-12 text-left bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-950"
    >
      {/* Decorative gradient atmosphere */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-sky-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent pointer-events-none shadow-[0_0_20px_rgba(99,102,241,0.8)]" />

      {/* Top Tag & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-inner">
          <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
          <span>Personalized Trip Summary</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs font-semibold">
          <Compass className="h-3.5 w-3.5 text-sky-400" />
          <span>AI Curated Blueprint</span>
        </div>
      </div>

      {/* Trip Title */}
      <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight sm:leading-snug mb-6">
        {tripTitle || `Your Tailored Journey to ${destination}`}
      </h1>

      {/* Friendly Introductory Paragraph */}
      <div className="bg-gradient-to-r from-indigo-950/50 via-slate-900/70 to-sky-950/40 p-5 sm:p-6 rounded-2xl border border-indigo-500/30 my-6 flex items-start gap-4 shadow-md">
        <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Smile
            className="h-6 w-6 text-indigo-400 animate-bounce"
            style={{ animationDuration: '4s' }}
          />
        </div>
        <div>
          <h3 className="text-sm font-bold text-indigo-300 mb-1.5 flex items-center gap-1.5">
            <span>Your Personalized Adventure Awaits</span>
          </h3>
          <p className="text-slate-200 text-base leading-relaxed font-medium">{friendlyIntro}</p>
        </div>
      </div>

      {/* 6 Core Metrics & Preferences Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 my-8 pt-6 border-t border-slate-800/80">
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
              <span>Selected Interests & Themes</span>
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
                <span className="text-slate-500 text-sm italic">General city Highlights</span>
              )}
            </div>
          </div>
        </div>

        {/* Optional Notes */}
        <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between shadow-inner">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-emerald-400" />
              <span>Custom Preferences & Notes</span>
            </h4>
            {notesText ? (
              <p className="text-slate-200 text-sm italic leading-relaxed pt-1 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 font-mono">
                &ldquo;{notesText}&rdquo;
              </p>
            ) : (
              <p className="text-slate-500 text-sm italic pt-2">
                No specific notes or dietary restrictions provided for this itinerary.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Executive Overview */}
      {overview && (
        <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800/90 my-6 shadow-inner">
          <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>AI Executive Journey Synthesis</span>
          </h3>
          <p className="text-slate-200 text-base leading-relaxed font-normal">{overview}</p>
        </div>
      )}

      {/* Budget & Logistics Advice */}
      {estimatedTotalBudgetTip && (
        <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-indigo-950/30 p-5 sm:p-6 rounded-2xl border border-emerald-500/30 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/30 shadow-inner">
            <Lightbulb className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-300 mb-1">
              Curated Financial & Logistics Advisory
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              {estimatedTotalBudgetTip}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
