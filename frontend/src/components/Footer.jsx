import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlaneTakeoff, Github, Twitter, Linkedin, X, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState(null);

  const handleSocialClick = (platform) => {
    setActiveModal(platform);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <footer className="bg-slate-950 border-t border-slate-900 z-10 relative">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand section */}
            <div className="md:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2" id="footer-logo-link">
                <PlaneTakeoff className="h-6 w-6 text-indigo-500" />
                <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                  Voyage AI
                </span>
              </Link>
              <p className="text-slate-400 text-sm max-w-sm">
                Making travel planning effortless. Craft personalized itineraries tailored to your
                unique interests and destination choices in seconds with advanced AI.
              </p>

              {/* Interactive Social Buttons (Open Modals Instead of Dead Links) */}
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleSocialClick('X (Twitter)')}
                  id="footer-social-twitter"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200 cursor-pointer"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialClick('GitHub')}
                  id="footer-social-github"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200 cursor-pointer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialClick('LinkedIn')}
                  id="footer-social-linkedin"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-200 cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Nav Links Column 1: Product */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    to="/features"
                    id="footer-link-features"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    id="footer-link-pricing"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/explore"
                    id="footer-link-explore"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Explore Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/plan"
                    id="footer-link-plan"
                    className="text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>Trip Planner</span>
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nav Links Column 2: Company */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    to="/about"
                    id="footer-link-about"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    id="footer-link-terms"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    id="footer-link-privacy"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider and Copyright */}
          <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {currentYear} Voyage AI. All rights reserved.
            </p>
            <p className="text-sm text-slate-600">Engineered for excellence during public beta.</p>
          </div>
        </div>
      </footer>

      {/* Social Community Dialog Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-md rounded-3xl glass-effect border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-[0_0_50px_rgba(99,102,241,0.25)] text-center text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Icon & Message */}
              <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-6 shadow-inner">
                <MessageCircle className="h-7 w-7 animate-pulse" />
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-3">
                Official {activeModal} page coming soon.
              </h3>

              <p className="text-slate-300 text-base mb-8 leading-relaxed font-normal">
                We&apos;re currently building our community.
              </p>

              {/* Dismiss CTA */}
              <button
                type="button"
                onClick={closeModal}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-extrabold text-sm tracking-wide shadow-lg glow-effect transition-all duration-200 cursor-pointer"
              >
                Got It
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
