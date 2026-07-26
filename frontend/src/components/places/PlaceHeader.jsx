import React from 'react';
import { Star, Tag, Clock, Wallet, Sparkles } from 'lucide-react';

const formatPriceLevel = (level) => {
  if (!level) return null;
  const str = String(level);
  if (str.includes('Inexpensive') || str === '$') return 'Budget-friendly';
  if (str.includes('Moderate') || str === '$$') return 'Moderate';
  if (str.includes('Upscale') || str.includes('Expensive') || str === '$$$') return 'Premium';
  if (str.includes('Fine Dining') || str === '$$$$') return 'Luxury';
  return str.replace(/\$/g, '').replace(/\(|\)/g, '').trim() || 'Moderate';
};

export default function PlaceHeader({ place }) {
  if (!place) return null;

  const { name, category, rating, reviewsCount, openNow, priceLevel, description } = place;
  const formattedPrice = formatPriceLevel(priceLevel);

  return (
    <div className="space-y-4 mb-6">
      {/* Category & Status Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold uppercase tracking-wider">
          <Tag className="h-3.5 w-3.5 text-indigo-400" />
          <span>{category || 'Attraction'}</span>
        </span>

        {openNow !== null && openNow !== undefined && (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${
              openNow
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>{openNow ? 'Open Now' : 'Closed Now'}</span>
          </span>
        )}

        {formattedPrice && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300 text-xs font-bold">
            <Wallet className="h-3.5 w-3.5 text-amber-400" />
            <span>{formattedPrice}</span>
          </span>
        )}
      </div>

      {/* Place Name */}
      <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-snug">
        {name || 'Destination Highlight'}
      </h2>

      {/* Google Rating & Review Count */}
      <div className="flex items-center gap-3 bg-slate-900/70 p-3 rounded-xl border border-slate-800/80 shadow-inner">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/40 font-extrabold text-sm shadow-sm">
          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span>{rating?.toFixed(1) || '4.6'}</span>
        </div>

        <div className="text-xs text-slate-300 font-medium">
          <span>Based on </span>
          <strong className="text-white font-mono">
            {reviewsCount ? Number(reviewsCount).toLocaleString() : '200+'}
          </strong>
          <span> Google Reviews</span>
        </div>
      </div>

      {/* Short Description */}
      {description && (
        <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/60 mt-2">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>About this Place</span>
          </h4>
          <p className="text-slate-200 text-sm leading-relaxed font-normal">{description}</p>
        </div>
      )}
    </div>
  );
}
