import React from 'react';
import { motion } from 'framer-motion';
import {
  Utensils,
  Camera,
  Landmark,
  ShoppingBag,
  Coffee,
  Compass,
  Moon,
  Sparkles,
  Clock,
  Tag,
  MapPin,
  ArrowUpRight,
  Trash2,
  RefreshCw,
  ShieldAlert,
  Users,
  Lightbulb,
  AlertTriangle,
  ShieldCheck,
  Navigation,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

const getCategoryConfig = (category) => {
  const cleanCat = (category || '').toLowerCase().trim();

  if (cleanCat.includes('breakfast')) {
    return {
      icon: Utensils,
      color: 'text-amber-400',
      bg: 'bg-amber-500/15 border-amber-500/30',
      badge: 'bg-amber-500/20 text-amber-300',
    };
  }
  if (
    cleanCat.includes('coffee') ||
    cleanCat.includes('tea') ||
    cleanCat.includes('break') ||
    cleanCat.includes('cafe') ||
    cleanCat.includes('dessert')
  ) {
    return {
      icon: Coffee,
      color: 'text-amber-300',
      bg: 'bg-amber-600/15 border-amber-600/30',
      badge: 'bg-amber-600/20 text-amber-200',
    };
  }
  if (
    cleanCat.includes('lunch') ||
    cleanCat.includes('dining') ||
    cleanCat.includes('food') ||
    cleanCat.includes('street')
  ) {
    return {
      icon: Utensils,
      color: 'text-rose-400',
      bg: 'bg-rose-500/15 border-rose-500/30',
      badge: 'bg-rose-500/20 text-rose-300',
    };
  }
  if (cleanCat.includes('dinner') || cleanCat.includes('supper')) {
    return {
      icon: Utensils,
      color: 'text-fuchsia-400',
      bg: 'bg-fuchsia-500/15 border-fuchsia-500/30',
      badge: 'bg-fuchsia-500/20 text-fuchsia-300',
    };
  }
  if (
    cleanCat.includes('museum') ||
    cleanCat.includes('history') ||
    cleanCat.includes('culture') ||
    cleanCat.includes('gallery')
  ) {
    return {
      icon: Landmark,
      color: 'text-purple-400',
      bg: 'bg-purple-500/15 border-purple-500/30',
      badge: 'bg-purple-500/20 text-purple-300',
    };
  }
  if (
    cleanCat.includes('shopping') ||
    cleanCat.includes('market') ||
    cleanCat.includes('boutique')
  ) {
    return {
      icon: ShoppingBag,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/15 border-emerald-500/30',
      badge: 'bg-emerald-500/20 text-emerald-300',
    };
  }
  if (
    cleanCat.includes('night') ||
    cleanCat.includes('bar') ||
    cleanCat.includes('club') ||
    cleanCat.includes('twilight')
  ) {
    return {
      icon: Moon,
      color: 'text-violet-400',
      bg: 'bg-violet-500/15 border-violet-500/30',
      badge: 'bg-violet-500/20 text-violet-300',
    };
  }
  if (
    cleanCat.includes('sightseeing') ||
    cleanCat.includes('photo') ||
    cleanCat.includes('view') ||
    cleanCat.includes('walk')
  ) {
    return {
      icon: Camera,
      color: 'text-sky-400',
      bg: 'bg-sky-500/15 border-sky-500/30',
      badge: 'bg-sky-500/20 text-sky-300',
    };
  }

  return {
    icon: Compass,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/15 border-indigo-500/30',
    badge: 'bg-indigo-500/20 text-indigo-300',
  };
};

export default function TimelineItem({
  item,
  isFirst = false,
  isLast = false,
  index = 0,
  onPlaceClick,
  onDelete,
  onReplace,
  isReplacing = false,
  onOpenEmergency,
  onMoveUp,
  onMoveDown,
}) {
  if (!item) return null;

  const {
    time,
    title,
    description,
    category,
    duration,
    cost,
    suitabilityNote,
    travelNote,
    scamTip,
    safetyNote,
    transportToNext,
  } = item;
  const config = getCategoryConfig(category || title);
  const Icon = config.icon || Sparkles;

  const handlePlaceClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlaceClick && title) {
      onPlaceClick(title);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(index);
  };

  const handleReplaceClick = (e) => {
    e.stopPropagation();
    if (onReplace && !isReplacing) onReplace(index, item);
  };

  const handleEmergencyClick = (e) => {
    e.stopPropagation();
    if (onOpenEmergency) onOpenEmergency();
  };

  const formatCost = (val) => {
    if (!val) return 'Cost unavailable';
    return String(val).replace(/\$/g, '₹');
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        className="relative flex gap-2 sm:gap-5 group transition-all duration-200 opacity-100"
      >
        {/* Vertical Node Indicator & Track Connector */}
        <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
          {/* Timeline Node Circle */}
          <div
            onClick={handlePlaceClick}
            className={`w-9 h-9 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border shadow-md transition-transform duration-200 group-hover:scale-105 z-10 flex-shrink-0 cursor-pointer ${config.bg}`}
          >
            <Icon className={`h-4.5 w-4.5 sm:h-6 sm:w-6 ${config.color}`} />
          </div>

          {/* Vertical track connector */}
          {!isLast && (
            <div className="w-0.5 flex-grow bg-gradient-to-b from-indigo-500/50 via-slate-700 to-slate-800 my-1 min-h-[50px] group-hover:from-indigo-400 transition-colors relative flex items-center justify-center" />
          )}
        </div>

        {/* Interactive Activity Details Card */}
        <div className="flex-grow pb-5 min-w-0 max-w-[calc(100%-2.75rem)] sm:max-w-none">
          <div
            onClick={handlePlaceClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePlaceClick(e)}
            aria-label={`Explore interactive details for ${title}`}
            className={`p-3.5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-indigo-500/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.25)] bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 cursor-pointer relative overflow-hidden text-left ${
              isReplacing ? 'opacity-70 pointer-events-none ring-2 ring-indigo-500/50' : ''
            }`}
          >
            {/* Top indicator beam on hover */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Header Row: Time, Category, Duration & Cost Tag */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2.5 pb-2 border-b border-slate-800/70">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                <div className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-extrabold text-indigo-300 bg-indigo-500/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-indigo-500/30">
                  <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-indigo-400" />
                  <span>{time || 'Scheduled'}</span>
                </div>
                {duration && (
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 bg-slate-950/60 px-2 sm:px-2.5 py-0.5 rounded-full border border-slate-800">
                    {duration}
                  </span>
                )}
                <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-300 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {formatCost(cost)}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {category && (
                  <div
                    className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full border border-current opacity-90 ${config.color} bg-slate-950/70`}
                  >
                    <Tag className="h-3 w-3" />
                    <span>{category}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Title & Aligned Action Controls Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-2.5">
              <h4 className="text-sm sm:text-xl font-display font-black text-white group-hover:text-indigo-300 transition-colors tracking-tight flex items-center gap-2 min-w-0 break-words pr-1">
                <span>{title || 'Curated Activity Experience'}</span>
              </h4>

              {/* Aligned Interactive Action Toolbar on Right Side */}
              <div
                className="flex flex-wrap items-center gap-1 sm:gap-1.5 w-full sm:w-auto justify-start sm:justify-end flex-shrink-0 pt-1 sm:pt-0"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Reorder Up & Down Arrows Grouped at Handle Position */}
                <div className="flex items-center gap-0.5 bg-slate-950/90 p-0.5 rounded-xl border border-slate-800/80 mr-0.5">
                  <button
                    type="button"
                    disabled={isFirst}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onMoveUp) onMoveUp();
                    }}
                    title="Move activity earlier"
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isFirst
                        ? 'opacity-30 cursor-not-allowed border-transparent text-slate-600'
                        : 'hover:bg-slate-800 border-transparent hover:border-slate-700 text-slate-300 hover:text-white'
                    }`}
                    aria-label="Move activity earlier"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    disabled={isLast}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onMoveDown) onMoveDown();
                    }}
                    title="Move activity later"
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isLast
                        ? 'opacity-30 cursor-not-allowed border-transparent text-slate-600'
                        : 'hover:bg-slate-800 border-transparent hover:border-slate-700 text-slate-300 hover:text-white'
                    }`}
                    aria-label="Move activity later"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Replace Activity Option */}
                <button
                  type="button"
                  onClick={handleReplaceClick}
                  disabled={isReplacing}
                  title="Replace this activity with an AI alternative"
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer shadow-xs ${
                    isReplacing
                      ? 'bg-indigo-600/30 border-indigo-500/40 text-indigo-300 cursor-wait'
                      : 'bg-indigo-500/15 hover:bg-indigo-500/25 border-indigo-500/30 hover:border-indigo-400 text-indigo-300'
                  }`}
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isReplacing ? 'animate-spin' : ''}`} />
                  <span>{isReplacing ? 'Replacing...' : 'Replace'}</span>
                </button>

                {/* Delete Activity Option */}
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  title="Delete this activity"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 bg-slate-950/60 hover:bg-rose-500/15 border border-slate-800 hover:border-rose-500/40 transition-all cursor-pointer"
                  aria-label="Delete activity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Explore Place button */}
                <span
                  onClick={handlePlaceClick}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 group-hover:border-indigo-400/60 px-2.5 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer"
                  title="View Google Places Photos & Opening Hours"
                >
                  <MapPin className="h-3.5 w-3.5 text-sky-400" />
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal mb-3.5 break-words">
              {description || 'Enjoy this custom experience tailored to your travel parameters.'}
            </p>

            {/* Consultant Intelligence Badges Grid */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/50 min-w-0 max-w-full">
              {/* Smart Suitability Note */}
              {suitabilityNote && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-200 break-words max-w-full">
                  <Users className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                  <span className="truncate">{suitabilityNote}</span>
                </span>
              )}

              {/* Local Travel Note */}
              {travelNote && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold bg-teal-500/10 border border-teal-500/30 text-teal-200 break-words max-w-full">
                  <Lightbulb className="h-3.5 w-3.5 text-teal-400 flex-shrink-0" />
                  <span className="truncate">{travelNote}</span>
                </span>
              )}

              {/* Scam Prevention Alert */}
              {scamTip && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-bold bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-inner break-words max-w-full">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                  <span className="truncate">Tip: {scamTip}</span>
                </span>
              )}

              {/* Women's Safety Insight */}
              {safetyNote && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-200 break-words max-w-full">
                  <ShieldCheck className="h-3.5 w-3.5 text-rose-400 flex-shrink-0" />
                  <span className="truncate">Safety: {safetyNote}</span>
                </span>
              )}

              {/* Emergency Support Modal Button */}
              <button
                type="button"
                onClick={handleEmergencyClick}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-bold bg-rose-950/70 hover:bg-rose-900 border border-rose-500/50 text-rose-300 transition-colors shadow-xs ml-auto cursor-pointer flex-shrink-0"
                title="View Local Emergency Helplines & Hospital routing"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
                <span>Emergency Support</span>
              </button>
            </div>
          </div>

          {/* Transport Between Activities Bridge */}
          {!isLast && transportToNext && (
            <div
              className="pl-4 sm:pl-10 pt-2.5 pb-1 min-w-0 max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-950/90 border border-indigo-500/40 text-slate-300 text-[11px] sm:text-xs font-bold shadow-md max-w-full break-words">
                <Navigation className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-sky-400 rotate-45 flex-shrink-0" />
                <span className="text-white font-extrabold capitalize">
                  {transportToNext.mode || 'Transit'}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-indigo-300">{transportToNext.duration || '15 mins'}</span>
                {transportToNext.cost && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span className="text-emerald-300 font-extrabold">
                      {formatCost(transportToNext.cost)}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
