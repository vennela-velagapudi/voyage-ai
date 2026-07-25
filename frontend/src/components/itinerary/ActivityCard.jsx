import React from 'react';
import {
  Sun,
  CloudSun,
  Moon,
  Utensils,
  Lightbulb,
  MapPin,
  Tag,
  DollarSign,
  Award,
  ArrowUpRight,
} from 'lucide-react';

export default function ActivityCard({ type, title, data, onPlaceClick }) {
  if (!data) return null;

  let Icon = Sun;
  let bgGradient = 'from-amber-500/10 via-slate-900/60 to-slate-900';
  let badgeColor = 'bg-amber-500/20 border-amber-500/30 text-amber-400';
  let titleColor = 'text-amber-300';
  let label = title || 'Morning Session';

  if (type === 'afternoon') {
    Icon = CloudSun;
    bgGradient = 'from-sky-500/10 via-slate-900/60 to-slate-900';
    badgeColor = 'bg-sky-500/20 border-sky-500/30 text-sky-400';
    titleColor = 'text-sky-300';
    label = title || 'Afternoon Exploration';
  } else if (type === 'evening') {
    Icon = Moon;
    bgGradient = 'from-purple-500/10 via-slate-900/60 to-slate-900';
    badgeColor = 'bg-purple-500/20 border-purple-500/30 text-purple-400';
    titleColor = 'text-purple-300';
    label = title || 'Evening Experience';
  } else if (type === 'dining') {
    Icon = Utensils;
    bgGradient = 'from-rose-500/10 via-slate-900/60 to-slate-900';
    badgeColor = 'bg-rose-500/20 border-rose-500/30 text-rose-400';
    titleColor = 'text-rose-300';
    label = title || 'Curated Dining Highlight';
  } else if (type === 'tip') {
    Icon = Lightbulb;
    bgGradient = 'from-emerald-500/10 via-slate-900/60 to-slate-900';
    badgeColor = 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400';
    titleColor = 'text-emerald-300';
    label = title || 'Insider Local Tip';
  }

  // Determine contents based on structure (string vs object)
  const isString = typeof data === 'string';
  const activityText = isString ? data : data.activity || data.highlight || data.description || '';
  const locationText = isString ? null : data.location;
  const costText = isString ? null : data.approxCost;
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
      className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-r ${bgGradient} border border-slate-800/80 ${
        type !== 'tip' ? 'hover:border-indigo-500/60 cursor-pointer hover:shadow-lg' : ''
      } transition-all duration-300 shadow-sm flex flex-col justify-between group relative`}
    >
      <div>
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 pb-3 border-b border-slate-800/60">
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
                <p className="text-xs text-white font-semibold flex items-center gap-1 mt-0.5">
                  <Award className="h-3 w-3 text-amber-400" />
                  <span>
                    {diningName} ({diningCuisine || 'Specialty Dining'})
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {costText && (
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold shadow-inner">
                <DollarSign className="h-3 w-3 text-emerald-400" />
                <span>
                  Est. Cost: <strong className="text-white">{costText}</strong>
                </span>
              </div>
            )}
            {type !== 'tip' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-indigo-300 bg-indigo-500/15 px-2.5 py-1 rounded-lg border border-indigo-500/30">
                <span>Details</span>
                <ArrowUpRight className="h-3 w-3" />
              </span>
            )}
          </div>
        </div>

        {/* Activity or Highlight Text */}
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal mb-3">
          {activityText || (isString ? data : 'Curated local schedule recommendation.')}
        </p>
      </div>

      {/* Footer / Location meta */}
      {(locationText || (type === 'dining' && diningCuisine)) && (
        <div className="pt-2.5 mt-2 border-t border-slate-800/50 flex items-center gap-3 text-xs text-slate-400">
          {locationText && (
            <div className="inline-flex items-center gap-1 text-slate-400 font-medium">
              <MapPin className="h-3.5 w-3.5 text-sky-400 flex-shrink-0" />
              <span>
                Location: <strong className="text-slate-200">{locationText}</strong>
              </span>
            </div>
          )}
          {type === 'dining' && diningCuisine && (
            <div className="inline-flex items-center gap-1 text-slate-400 font-medium">
              <Tag className="h-3.5 w-3.5 text-rose-400 flex-shrink-0" />
              <span>
                Cuisine: <strong className="text-slate-200">{diningCuisine}</strong>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
