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
} from 'lucide-react';

/**
 * Helper to get icon and color styling based on activity category
 */
const getCategoryConfig = (category) => {
  const cleanCat = (category || '').toLowerCase().trim();

  if (cleanCat.includes('breakfast')) {
    return {
      icon: Utensils,
      color: 'text-amber-400',
      bg: 'bg-amber-500/15 border-amber-500/30',
      line: 'border-amber-500/40',
      badge: 'bg-amber-500/20 text-amber-300',
    };
  }
  if (cleanCat.includes('coffee') || cleanCat.includes('tea') || cleanCat.includes('break')) {
    return {
      icon: Coffee,
      color: 'text-amber-300',
      bg: 'bg-amber-600/15 border-amber-600/30',
      line: 'border-amber-600/40',
      badge: 'bg-amber-600/20 text-amber-200',
    };
  }
  if (cleanCat.includes('lunch') || cleanCat.includes('dining') || cleanCat.includes('food')) {
    return {
      icon: Utensils,
      color: 'text-rose-400',
      bg: 'bg-rose-500/15 border-rose-500/30',
      line: 'border-rose-500/40',
      badge: 'bg-rose-500/20 text-rose-300',
    };
  }
  if (cleanCat.includes('dinner') || cleanCat.includes('supper')) {
    return {
      icon: Utensils,
      color: 'text-fuchsia-400',
      bg: 'bg-fuchsia-500/15 border-fuchsia-500/30',
      line: 'border-fuchsia-500/40',
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
      line: 'border-purple-500/40',
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
      line: 'border-emerald-500/40',
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
      line: 'border-violet-500/40',
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
      line: 'border-sky-500/40',
      badge: 'bg-sky-500/20 text-sky-300',
    };
  }

  return {
    icon: Compass,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/15 border-indigo-500/30',
    line: 'border-indigo-500/40',
    badge: 'bg-indigo-500/20 text-indigo-300',
  };
};

export default function TimelineItem({ item, isLast = false, index = 0, onPlaceClick }) {
  if (!item) return null;

  const { time, title, description, category } = item;
  const config = getCategoryConfig(category || title);
  const Icon = config.icon || Sparkles;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlaceClick && title) {
      onPlaceClick(title);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="relative flex gap-4 sm:gap-6 group"
    >
      {/* Vertical Connecting Timeline Line & Node */}
      <div className="flex flex-col items-center">
        {/* Timeline Node Circle */}
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border shadow-lg transition-transform duration-200 group-hover:scale-110 z-10 flex-shrink-0 ${config.bg}`}
        >
          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${config.color}`} />
        </div>

        {/* Vertical track connector */}
        {!isLast && (
          <div className="w-0.5 flex-grow bg-gradient-to-b from-indigo-500/50 via-slate-700 to-slate-800 my-1 min-h-[40px] group-hover:from-indigo-400 transition-colors" />
        )}
      </div>

      {/* Interactive Activity Details Card */}
      <div className="flex-grow pb-8">
        <div
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick(e)}
          aria-label={`Explore interactive details for ${title}`}
          className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/60 transition-all duration-300 shadow-md hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.25)] bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 hover:from-slate-900 hover:to-indigo-950/30 cursor-pointer relative overflow-hidden text-left"
        >
          {/* Subtle top indicator beam on hover */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Header Row: Time & Category Tag */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 pb-2.5 border-b border-slate-800/60">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30">
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              <span>{time || 'Scheduled Time'}</span>
            </div>

            <div className="flex items-center gap-2">
              {category && (
                <div
                  className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-current opacity-90 ${config.color} bg-slate-950/60`}
                >
                  <Tag className="h-3 w-3" />
                  <span>{category}</span>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Place Title Row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="text-base sm:text-xl font-display font-black text-white group-hover:text-indigo-300 transition-colors tracking-tight flex items-center gap-2">
              <span>{title || 'Curated Activity Experience'}</span>
            </h4>

            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 group-hover:border-indigo-400/60 px-3 py-1 rounded-xl transition-all flex-shrink-0 shadow-sm">
              <MapPin className="h-3.5 w-3.5 text-sky-400" />
              <span className="hidden sm:inline">Explore Place</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            {description || 'Enjoy this bespoke experience tailored to your itinerary schedule.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
