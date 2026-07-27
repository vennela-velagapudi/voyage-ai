import React from 'react';
import {
  Sun,
  CloudSun,
  Moon,
  Utensils,
  Lightbulb,
  MapPin,
  Tag,
  Wallet,
  Award,
  ArrowUpRight,
} from 'lucide-react';

export default function ActivityCard({ type, title, data, onPlaceClick }) {
  if (!data) return null;

  let Icon = Sun;
  let badgeColor = 'bg-amber-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400';
  let titleColor = 'text-amber-600 dark:text-amber-300';
  let label = title || 'Morning Session';

  if (type === 'afternoon') {
    Icon = CloudSun;
    badgeColor = 'bg-sky-500/20 border-sky-500/30 text-sky-600 dark:text-sky-400';
    titleColor = 'text-sky-600 dark:text-sky-300';
    label = title || 'Afternoon Exploration';
  } else if (type === 'evening') {
    Icon = Moon;
    badgeColor = 'bg-purple-500/20 border-purple-500/30 text-purple-600 dark:text-purple-400';
    titleColor = 'text-purple-600 dark:text-purple-300';
    label = title || 'Evening Experience';
  } else if (type === 'dining') {
    Icon = Utensils;
    badgeColor = 'bg-rose-500/20 border-rose-500/30 text-rose-600 dark:text-rose-400';
    titleColor = 'text-rose-600 dark:text-rose-300';
    label = title || 'Curated Dining Highlight';
  } else if (type === 'tip') {
    Icon = Lightbulb;
    badgeColor = 'bg-emerald-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400';
    titleColor = 'text-emerald-600 dark:text-emerald-300';
    label = title || 'Insider Local Tip';
  }

  // Determine contents based on structure (string vs object)
  const isString = typeof data === 'string';
  const activityText = isString ? data : data.activity || data.highlight || data.description || '';
  const locationText = isString ? null : data.location;
  const rawCost = isString ? null : data.approxCost;
  const formattedCost = rawCost ? String(rawCost).replace(/\$/g, '').trim() : null;
  const diningName = isString ? null : data.name;
  const diningCuisine = isString ? null : data.cuisine;

  const targetPlace =
    diningName || locationText || (isString ? data.split(' at ')[1] || data.slice(0, 40) : label);

  const handleClick = () => {
    if (onPlaceClick && type !== 'tip') {
      onPlaceClick(targetPlace);
    }
  };

  return (
    <div
      onClick={handleClick}
      role={type !== 'tip' ? 'button' : 'region'}
      tabIndex={type !== 'tip' ? 0 : -1}
      onKeyDown={(e) => type !== 'tip' && (e.key === 'Enter' || e.key === ' ') && handleClick()}
      className={`p-5 sm:p-6 rounded-2xl bg-surface-inner/80 border border-border-theme ${
        type !== 'tip' ? 'hover:border-indigo-500/60 cursor-pointer hover:shadow-lg' : ''
      } transition-all duration-300 shadow-sm flex flex-col justify-between group relative`}
    >
      <div>
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 pb-3 border-b border-border-theme">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm ${badgeColor}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className={`text-sm sm:text-base font-display font-extrabold ${titleColor}`}>
                {label}
              </h4>
              {diningName && (
                <p className="text-xs text-text-main font-semibold flex items-center gap-1 mt-0.5">
                  <Award className="h-3 w-3 text-amber-500 dark:text-amber-400" />
                  <span>
                    {diningName} ({diningCuisine || 'Specialty Dining'})
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {formattedCost && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-card border border-border-theme text-text-body text-xs font-semibold shadow-inner">
                <Wallet className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                <span>
                  Estimated Spend: <strong className="text-text-main">{formattedCost}</strong>
                </span>
              </div>
            )}
            {type !== 'tip' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-indigo-700 dark:text-indigo-300 bg-indigo-500/15 px-2.5 py-1 rounded-lg border border-indigo-500/30">
                <span>Details</span>
                <ArrowUpRight className="h-3 w-3" />
              </span>
            )}
          </div>
        </div>

        {/* Activity or Highlight Text */}
        <p className="text-text-body text-sm sm:text-base leading-relaxed font-normal mb-3">
          {activityText || (isString ? data : 'Curated local schedule recommendation.')}
        </p>
      </div>

      {/* Footer / Location meta */}
      {(locationText || (type === 'dining' && diningCuisine)) && (
        <div className="pt-2.5 mt-2 border-t border-border-theme flex items-center gap-3 text-xs text-text-muted">
          {locationText && (
            <div className="inline-flex items-center gap-1 text-text-muted font-medium">
              <MapPin className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400 flex-shrink-0" />
              <span>
                Location: <strong className="text-text-body">{locationText}</strong>
              </span>
            </div>
          )}
          {type === 'dining' && diningCuisine && (
            <div className="inline-flex items-center gap-1 text-text-muted font-medium">
              <Tag className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
              <span>
                Cuisine: <strong className="text-text-body">{diningCuisine}</strong>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
