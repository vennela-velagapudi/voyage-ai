import React from 'react';
import TripPlannerCard from '../components/form/TripPlannerCard';

export default function Plan() {
  return (
    <div className="relative overflow-hidden pt-12 pb-24 min-h-screen">
      {/* Decorative Atmosphere Gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-40 left-1/4 w-[550px] h-[550px] bg-sky-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TripPlannerCard />
      </div>
    </div>
  );
}
