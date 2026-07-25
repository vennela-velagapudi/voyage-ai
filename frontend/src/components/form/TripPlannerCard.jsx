import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Wallet,
  CreditCard,
  Gem,
  User,
  Heart,
  Users,
  Briefcase,
  Compass,
  Utensils,
  Landmark,
  Palette,
  Trees,
  Sparkles,
  ShoppingBag,
  Moon,
  Camera,
  Waves,
  Send,
  CheckCircle2,
} from 'lucide-react';
import FormInput from './FormInput';
import OptionSelector from './OptionSelector';
import InterestChips from './InterestChips';

const BUDGET_OPTIONS = [
  { id: 'budget', label: 'Budget', description: 'Smart & thrifty ($)', icon: Wallet },
  { id: 'moderate', label: 'Moderate', description: 'Balanced & comfy ($$)', icon: CreditCard },
  { id: 'luxury', label: 'Luxury', description: 'Premium luxury ($$$)', icon: Gem },
];

const TRAVEL_STYLE_OPTIONS = [
  { id: 'solo', label: 'Solo Wanderer', icon: User },
  { id: 'couple', label: 'Couple Retreat', icon: Heart },
  { id: 'family', label: 'Family Vacation', icon: Users },
  { id: 'friends', label: 'Friends Trip', icon: Palette },
  { id: 'business', label: 'Business Travel', icon: Briefcase },
];

const INTEREST_OPTIONS = [
  { id: 'adventure', label: 'Adventure', icon: Compass },
  { id: 'culture', label: 'Culture & Art', icon: Landmark },
  { id: 'food', label: 'Culinary & Food', icon: Utensils },
  { id: 'nature', label: 'Nature & Trails', icon: Trees },
  { id: 'wellness', label: 'Relax & Wellness', icon: Sparkles },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'nightlife', label: 'Nightlife & Bars', icon: Moon },
  { id: 'beach', label: 'Beach & Coastal', icon: Waves },
  { id: 'history', label: 'Historical Sites', icon: Landmark },
  { id: 'photo', label: 'Photography', icon: Camera },
];

export default function TripPlannerCard() {
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    budget: 'moderate',
    travelStyle: 'couple',
    interests: ['food', 'culture'],
    notes: '',
  });

  const [touched, setTouched] = useState({
    destination: false,
    days: false,
  });

  const [submitted, setSubmitted] = useState(false);

  // Client-side validation logic
  const errors = useMemo(() => {
    const newErrors = {};
    if (touched.destination && formData.destination.trim().length < 2) {
      newErrors.destination =
        'Please enter a valid destination city or country (min 2 characters).';
    }
    const daysNum = parseInt(formData.days, 10);
    if (touched.days && (isNaN(daysNum) || daysNum < 1 || daysNum > 60)) {
      newErrors.days = 'Please specify a trip duration between 1 and 60 days.';
    }
    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest area.';
    }
    return newErrors;
  }, [formData, touched]);

  const isValid = useMemo(() => {
    const destValid = formData.destination.trim().length >= 2;
    const daysNum = parseInt(formData.days, 10);
    const daysValid = !isNaN(daysNum) && daysNum >= 1 && daysNum <= 60;
    const budgetValid = Boolean(formData.budget);
    const styleValid = Boolean(formData.travelStyle);
    const interestsValid = formData.interests.length > 0;
    return destValid && daysValid && budgetValid && styleValid && interestsValid;
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleInterestToggle = (id) => {
    setFormData((prev) => {
      const current = prev.interests;
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      return { ...prev, interests: next };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // Client-side simulation only as requested in Milestone 2
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto rounded-3xl glass-effect p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800/80 backdrop-blur-xl"
      id="trip-planner-card"
    >
      {/* Top subtle glow bar */}
      <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent pointer-events-none" />

      <div className="mb-8 text-center sm:text-left border-b border-slate-800/80 pb-6">
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
          <Sparkles className="h-6 w-6 text-indigo-400" />
          <span>Design Your Itinerary</span>
        </h2>
        <p className="text-slate-400 text-sm mt-1.5">
          Provide your travel parameters below. Our intelligent engine optimizes your perfect trip
          route.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {/* Row 1: Destination & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput
            id="input-destination"
            label="Destination City or Country"
            placeholder="e.g. Kyoto, Japan or Amalfi Coast"
            value={formData.destination}
            onChange={(e) => handleChange('destination', e.target.value)}
            onBlur={() => handleBlur('destination')}
            error={errors.destination}
            icon={MapPin}
          />
          <FormInput
            id="input-days"
            label="Number of Days (1-60)"
            type="number"
            min="1"
            max="60"
            placeholder="e.g. 7"
            value={formData.days}
            onChange={(e) => handleChange('days', e.target.value)}
            onBlur={() => handleBlur('days')}
            error={errors.days}
            icon={Calendar}
          />
        </div>

        {/* Row 2: Budget Selection */}
        <OptionSelector
          label="Estimated Budget Profile"
          options={BUDGET_OPTIONS}
          selectedValue={formData.budget}
          onChange={(val) => handleChange('budget', val)}
        />

        {/* Row 3: Travel Style */}
        <OptionSelector
          label="Who Are You Traveling With?"
          options={TRAVEL_STYLE_OPTIONS}
          selectedValue={formData.travelStyle}
          onChange={(val) => handleChange('travelStyle', val)}
        />

        {/* Row 4: Interests Multi-Select */}
        <InterestChips
          label="What Experience Are You Looking For?"
          options={INTEREST_OPTIONS}
          selectedInterests={formData.interests}
          onToggle={handleInterestToggle}
          error={errors.interests}
        />

        {/* Row 5: Additional Notes */}
        <div className="flex flex-col space-y-2 text-left">
          <label
            htmlFor="input-notes"
            className="text-sm font-medium text-slate-300 flex items-center justify-between"
          >
            <span>Additional Preferences & Dietary Requirements</span>
            <span className="text-slate-500 text-xs font-normal">Optional</span>
          </label>
          <textarea
            id="input-notes"
            rows="3"
            placeholder="e.g. Prefer accessible walking routes, vegan-friendly restaurants, or boutique heritage hotels..."
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            maxLength={500}
            className="w-full bg-slate-900/80 text-slate-100 placeholder-slate-500 text-sm rounded-xl p-4 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 resize-none"
          />
        </div>

        {/* Submission & Validation Notice */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            {!isValid ? (
              <span className="text-amber-400 font-medium flex items-center gap-1.5 justify-center sm:justify-start">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Please complete valid destination and duration fields to unlock trip generation.
              </span>
            ) : (
              <span className="text-emerald-400 font-medium flex items-center gap-1.5 justify-center sm:justify-start">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                All criteria verified and ready to generate!
              </span>
            )}
          </div>

          <motion.button
            type="submit"
            id="btn-generate-trip"
            disabled={!isValid}
            whileHover={isValid ? { scale: 1.03 } : {}}
            whileTap={isValid ? { scale: 0.98 } : {}}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-display font-bold text-sm tracking-wide transition-all duration-300 shadow-lg ${
              isValid
                ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white glow-effect cursor-pointer'
                : 'bg-slate-800/80 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-60'
            }`}
          >
            <span>Generate Trip</span>
            <Send
              className={`h-4 w-4 ${isValid ? 'text-white animate-bounce' : 'text-slate-600'}`}
            />
          </motion.button>
        </div>
      </form>

      {/* Interactive simulation confirmation toast */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center rounded-3xl border border-indigo-500/30"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-display font-extrabold text-white mb-2">
            Trip Parameters Captured!
          </h3>
          <p className="text-slate-400 text-sm max-w-md mb-6">
            Your customized itinerary profile for{' '}
            <strong className="text-white">{formData.destination}</strong> over{' '}
            <strong className="text-white">{formData.days} days</strong> has passed validation.
            (Milestone 2 Front-End Simulation Completed).
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors cursor-pointer"
          >
            Return to Form
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
