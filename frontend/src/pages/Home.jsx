import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Compass,
  Calendar,
  Award,
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate('/plan');
  };

  return (
    <div className="w-full relative overflow-hidden pt-10 pb-24 lg:pb-32">
      {/* Background Decorative Gradients and Grid contained within bounds */}
      <div className="absolute inset-0 w-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="w-full max-w-4xl mx-auto text-center pt-8 sm:pt-16 pb-16 sm:pb-24">
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
            className="font-display font-black text-5xl sm:text-6xl md:text-7xl tracking-tight text-white mb-6 leading-[1.08]"
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

          {/* Action CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={handleStartPlanning}
              id="hero-cta-plan"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-extrabold px-9 py-4.5 rounded-2xl transition-all duration-300 glow-effect shadow-2xl hover:scale-103 cursor-pointer text-base sm:text-lg"
            >
              <span>Start Planning</span>
              <ArrowRight className="h-5 w-5 animate-pulse" />
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold transition-all shadow-md cursor-pointer text-base sm:text-lg"
            >
              <Compass className="h-5 w-5 text-sky-400" />
              <span>Explore Routes</span>
            </button>
          </motion.div>

          {/* Quick Value Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8 border-t border-slate-800/80 text-left sm:text-center text-slate-400 text-sm"
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

        {/* How It Works Section */}
        <div className="my-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight mb-3">
              How Voyage AI Transforms Travel Planning
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              From blank canvas to a fully staged daily travel itinerary in under 30 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl glass-effect border border-slate-800/80 bg-slate-950/60 relative overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition-all">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 font-display font-black text-xl shadow-inner">
                  01
                </div>
                <h3 className="text-xl font-display font-extrabold text-white mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-400" />
                  <span>Define Parameters</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Enter your destination, desired duration (up to 60 days), budget limits, companion
                  types, and unique personal interests or dietary preferences.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl glass-effect border border-slate-800/80 bg-slate-950/60 relative overflow-hidden flex flex-col justify-between hover:border-sky-500/40 transition-all">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-6 font-display font-black text-xl shadow-inner">
                  02
                </div>
                <h3 className="text-xl font-display font-extrabold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-sky-400" />
                  <span>AI Route Curation</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our Google Gemini generative AI analyzes thousands of geographical attractions,
                  culinary hotspots, and seasonal hidden gems to structure seamless day-by-day
                  pacing.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl glass-effect border border-slate-800/80 bg-slate-950/60 relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 font-display font-black text-xl shadow-inner">
                  03
                </div>
                <h3 className="text-xl font-display font-extrabold text-white mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-400" />
                  <span>Interactive Dashboard</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Receive a production-quality, expandable daily travel schedule featuring
                  breakfast-to-dinner breakdowns, approximate ticket expenses, and local life hacks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Banner */}
        <div className="mt-20 mb-10 max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900/90 to-sky-900/60 p-10 sm:p-14 border border-indigo-500/40 text-center relative overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-4 tracking-tight">
            Ready to Experience Intelligent Travel Planning?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8 font-normal">
            Voyage AI is currently 100% free during our public beta. Design unconstrained
            itineraries anywhere on earth today.
          </p>
          <button
            onClick={handleStartPlanning}
            className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-extrabold px-10 py-4.5 rounded-2xl shadow-xl hover:scale-103 transition-all duration-300 cursor-pointer text-lg"
          >
            <span>Launch Itinerary Planner</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
