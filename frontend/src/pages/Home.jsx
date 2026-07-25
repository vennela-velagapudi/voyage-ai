import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, ShieldCheck, Zap, Globe } from 'lucide-react';
import TripPlannerCard from '../components/form/TripPlannerCard';

export default function Home() {
  const scrollToPlanner = () => {
    const element = document.getElementById('trip-planner-card');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden pt-10 pb-24 lg:pb-32">
      {/* Background Decorative Gradients and Grid */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center pt-8 sm:pt-16 pb-14 sm:pb-20">
          {/* Decorative Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-slate-900/80 to-sky-500/10 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide shadow-inner mb-8 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
            <span>AI-Powered Next Generation Travel Itineraries</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-7xl tracking-tight text-white mb-6 leading-[1.08]"
            id="hero-title"
          >
            Plan Your Perfect Trip <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300 bg-clip-text text-transparent">
              with Intelligent AI
            </span>
          </motion.h1>

          {/* Subtitle & Value Prop */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-lg sm:text-xl md:text-2xl text-slate-300 font-normal max-w-2xl mx-auto mb-10 leading-relaxed"
            id="hero-subtitle"
          >
            Experience personalized itineraries crafted in seconds. Match your exact dates, budget
            goals, and travel style without endless research.
          </motion.p>

          {/* Action CTA Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <button
              onClick={scrollToPlanner}
              id="hero-cta-scroll"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 glow-effect shadow-xl hover:scale-103 cursor-pointer text-base"
            >
              <span>Start Planning Below</span>
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </button>
          </motion.div>

          {/* Quick Value Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-6 border-t border-slate-800/80 text-left sm:text-center text-slate-400 text-sm"
          >
            <div className="flex items-center sm:justify-center gap-2.5">
              <Zap className="h-5 w-5 text-amber-400 flex-shrink-0" />
              <span>Instant Itinerary Optimization</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2.5">
              <Globe className="h-5 w-5 text-sky-400 flex-shrink-0" />
              <span>Global Destination Support</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              <span>Tailored Budget & Pace Control</span>
            </div>
          </motion.div>
        </div>

        {/* Centered Glassmorphism Trip Planner Form Card */}
        <div className="mt-2 mb-12 sm:mb-20">
          <TripPlannerCard />
        </div>
      </div>
    </div>
  );
}
