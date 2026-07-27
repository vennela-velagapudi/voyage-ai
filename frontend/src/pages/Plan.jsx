import React from 'react';
import TripPlannerCard from '../components/form/TripPlannerCard';

export default function Plan() {
  return (
    <div className="w-full relative pt-6 sm:pt-12 pb-16 sm:pb-24 min-h-screen overflow-hidden">
      {/* Decorative Atmosphere Gradients contained within viewport */}
      <div className="absolute inset-0 w-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-40 left-1/4 w-[550px] h-[550px] bg-sky-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <TripPlannerCard />
      </div>
    </div>
  );
}
