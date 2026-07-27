import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Brain,
  Wallet,
  Users,
  Utensils,
  Calendar,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const CAPABILITIES = [
  {
    icon: Brain,
    title: 'Generative Gemini 2.5 AI Engine',
    description:
      "Powered by Google's cutting-edge AI reasoning models. Evaluates thousands of attractions, local transport links, and seasonal nuances to compute mathematically balanced travel itineraries.",
    badge: 'Core Intelligence',
    color: 'indigo',
    gradient: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
  },
  {
    icon: Wallet,
    title: 'Precision Budget Allocation',
    description:
      'Avoid financial guesswork. Select Budget, Moderate, or Luxury tiers and let the AI estimate practical activity ticket costs and advise on cost-effective regional transit.',
    badge: 'Financial Control',
    color: 'emerald',
    gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    icon: Users,
    title: 'Companion Style Adaptability',
    description:
      'Whether planning a romantic candle-lit couple retreat, an educational family vacation with children, or an efficient solo adventure, every daily schedule adapts to your exact social dynamic.',
    badge: 'Personalized Routing',
    color: 'sky',
    gradient: 'from-sky-500/20 to-indigo-500/10 border-sky-500/30 text-sky-400',
  },
  {
    icon: Utensils,
    title: 'Bespoke Gastronomy & Dietary Filters',
    description:
      'No more searching for dietary accommodations. Input strict vegetarian, vegan, halal, or gourmet wine-pairing requirements, and receive highly regarded restaurant recommendations for every evening.',
    badge: 'Culinary Curations',
    color: 'rose',
    gradient: 'from-rose-500/20 to-orange-500/10 border-rose-500/30 text-rose-400',
  },
  {
    icon: Calendar,
    title: 'Interactive Modular Schedules',
    description:
      'Say goodbye to overwhelming text walls. Our collapsible Day Accordion UI organizes every 24-hour cycle into structured morning, afternoon, and evening sessions with estimated pricing.',
    badge: 'SaaS UX Mastery',
    color: 'purple',
    gradient: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
  },
  {
    icon: Lightbulb,
    title: 'Insider Local Hacks & Secret Paths',
    description:
      'Gain tactical travel advantages. Each daily blueprint includes exclusive local tips—such as arrival times to bypass crowds, dress code guidance for temples, or reservation tricks.',
    badge: 'Travel Hacks',
    color: 'amber',
    gradient: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
  },
];

export default function Features() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative overflow-hidden pt-12 pb-28 min-h-screen">
      {/* Background atmosphere contained in bounds */}
      <div className="absolute inset-0 w-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-10 right-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[130px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-purple-400 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
          >
            <Sparkles className="h-4 w-4 animate-pulse text-purple-400" />
            <span>Next-Gen Travel Technology</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight mb-6 leading-tight">
            Engineered for Perfect <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Travel Experiences
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Explore how Voyage AI bridges advanced artificial intelligence with premium interactive
            interface design to completely revolutionize itinerary planning.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {CAPABILITIES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-3xl glass-effect border border-slate-800/80 hover:border-indigo-500/50 bg-slate-950/80 shadow-2xl flex flex-col justify-between transition-all duration-300 group relative overflow-hidden"
              >
                {/* Subtle light accent */}
                <div className="absolute -top-px left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} border flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-3 tracking-tight group-hover:text-indigo-200 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  <span>Voyage V1 Architecture</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Call to Action Banner */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-900/40 via-slate-900/90 to-purple-900/40 p-10 sm:p-14 border border-indigo-500/40 text-center relative overflow-hidden shadow-2xl backdrop-blur-2xl">
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-4 tracking-tight">
            Put These Capabilities to Work Today
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Experience our Gemini 2.5 itinerary engine directly in your browser. Complete customized
            travel blueprints in seconds.
          </p>
          <button
            onClick={() => navigate('/plan')}
            className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-extrabold px-10 py-4.5 rounded-2xl shadow-xl hover:scale-103 transition-all duration-300 cursor-pointer text-base sm:text-lg"
          >
            <span>Launch Itinerary Planner</span>
            <ArrowRight className="h-5 w-5 animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
}
