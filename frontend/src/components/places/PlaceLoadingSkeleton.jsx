import React from 'react';

export default function PlaceLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-6">
      {/* Hero Image Skeleton */}
      <div className="w-full h-56 sm:h-64 bg-slate-800/80 rounded-2xl border border-slate-700/50 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />
      </div>

      {/* Header Info Skeleton */}
      <div className="space-y-3">
        <div className="w-3/4 h-8 bg-slate-800/80 rounded-xl" />
        <div className="flex items-center gap-3">
          <div className="w-24 h-6 bg-slate-800/80 rounded-full" />
          <div className="w-28 h-6 bg-slate-800/80 rounded-full" />
          <div className="w-20 h-6 bg-slate-800/80 rounded-full" />
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
        <div className="w-full h-4 bg-slate-800/80 rounded" />
        <div className="w-5/6 h-4 bg-slate-800/80 rounded" />
        <div className="w-4/6 h-4 bg-slate-800/80 rounded" />
      </div>

      {/* Overview Details Skeleton */}
      <div className="grid grid-cols-1 gap-3.5 pt-2">
        <div className="w-full h-14 bg-slate-900/80 rounded-xl border border-slate-800" />
        <div className="w-full h-14 bg-slate-900/80 rounded-xl border border-slate-800" />
        <div className="w-full h-12 bg-indigo-500/20 rounded-xl" />
      </div>

      {/* Nearby Sections Skeleton */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <div className="w-40 h-5 bg-slate-800/80 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800" />
          <div className="h-28 bg-slate-900/80 rounded-2xl border border-slate-800" />
        </div>
      </div>
    </div>
  );
}
