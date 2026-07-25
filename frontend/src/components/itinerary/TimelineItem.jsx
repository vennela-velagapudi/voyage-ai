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

  // Default Fallback
  return {
    icon: Compass,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/15 border-indigo-500/30',
    line: 'border-indigo-500/40',
    badge: 'bg-indigo-500/20 text-indigo-300',
  };
};

export default function TimelineItem({ item, isLast = false, index = 0 }) {
  if (!item) return null;

  const { time, title, description, category } = item;
  const config = getCategoryConfig(category || title);
  const Icon = config.icon || Sparkles;

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

      {/* Activity Details Box */}
      <div className="flex-grow pb-8">
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-md group-hover:shadow-[0_0_20px_-5px_rgba(129,140,248,0.15)] bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900">
          {/* Header Row: Time & Category Tag */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5 pb-2 border-b border-slate-800/60">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/30">
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              <span>{time || 'Scheduled Time'}</span>
            </div>

            {category && (
              <div
                className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-current opacity-90 ${config.color} bg-slate-950/60`}
              >
                <Tag className="h-3 w-3" />
                <span>{category}</span>
              </div>
            )}
          </div>

          {/* Activity Title & Description */}
          <h4 className="text-base sm:text-lg font-display font-black text-white group-hover:text-indigo-200 transition-colors tracking-tight mb-2">
            {title || 'Curated Activity Experience'}
          </h4>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            {description || 'Enjoy this bespoke experience tailored to your itinerary schedule.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
