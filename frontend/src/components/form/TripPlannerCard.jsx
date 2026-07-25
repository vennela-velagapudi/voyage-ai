import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useSearchParams } from 'react-router-dom';
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
  Sliders,
  PenTool,
} from 'lucide-react';
import FormInput from './FormInput';
import OptionSelector from './OptionSelector';
import InterestChips from './InterestChips';
import { ApiService } from '../../services/apiService';
import LoadingOverlay from '../itinerary/LoadingOverlay';
import ErrorCard from '../itinerary/ErrorCard';
import ItineraryDashboard from '../itinerary/ItineraryDashboard';

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
  { id: 'other', label: 'Other', icon: Sliders },
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
  { id: 'other', label: 'Other', icon: Sliders },
];

// Helper: Validation for Destination
const isValidDestination = (val) => {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed.length < 2) return false;
  // Reject if only numbers or only symbols (must contain at least one alphabetical letter)
  if (!/[a-zA-Z]/.test(trimmed)) return false;
  // Reject repeated random characters (e.g. "aaaaa", "!!!!!", "@@@@@", "11111")
  const stripped = trimmed.replace(/[\s,.'&-]+/g, '').toLowerCase();
  if (stripped.length > 1 && /^(.)\1+$/.test(stripped)) return false;
  // Reject known keyboard mashing sequence strings (e.g. 12345, @@@@@, asdfghjkl, qwerty)
  if (/(asdfgh|qwert|zxcvb|hjkl|12345|poiuy|lkjhg|mnbvc)/i.test(stripped)) return false;
  // Reject unsupported illegal symbol overload
  if (!/^[a-zA-Z0-9\s,.'&()/-]+$/.test(trimmed)) return false;
  // Must have at least two alphabetic characters in total
  if (trimmed.replace(/[^a-zA-Z]/g, '').length < 2) return false;
  return true;
};

// Helper: Validation for Meaningful Write-in Text ("Other" specify fields)
const isMeaningfulText = (val) => {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed.length < 2) return false;
  // Must contain letters and NO digits or random symbols
  if (!/[a-zA-Z]/.test(trimmed) || /\d/.test(trimmed)) return false;
  if (!/^[a-zA-Z\s,.'&-]+$/.test(trimmed)) return false;
  // Reject repeated characters or keyboard mashing
  const stripped = trimmed.replace(/[\s,.'&-]+/g, '').toLowerCase();
  if (stripped.length > 1 && /^(.)\1+$/.test(stripped)) return false;
  if (/(asdfgh|qwert|zxcvb|hjkl|poiuy|lkjhg|mnbvc)/i.test(stripped)) return false;
  return true;
};

export default function TripPlannerCard() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const prefillDestination = location.state?.destination || searchParams.get('destination') || '';

  // Application flow state: 'form' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('form');
  const [itinerary, setItinerary] = useState(null);
  const [apiError, setApiError] = useState(null);

  const [formData, setFormData] = useState({
    destination: prefillDestination,
    days: '',
    budget: 'moderate',
    travelStyle: 'couple',
    travelStyleOther: '',
    interests: ['food', 'culture'],
    interestsOther: '',
    notes: '',
  });

  const [touched, setTouched] = useState({
    destination: Boolean(prefillDestination),
    days: false,
    travelStyleOther: false,
    interestsOther: false,
  });

  // Keep destination synced if navigating directly with state/params
  useEffect(() => {
    const target = location.state?.destination || searchParams.get('destination');
    if (target) {
      setFormData((prev) =>
        prev.destination !== target ? { ...prev, destination: target } : prev
      );
      setTouched((prev) => (!prev.destination ? { ...prev, destination: true } : prev));
    }
  }, [location.state, searchParams]);

  // Client-side validation logic
  const errors = useMemo(() => {
    const newErrors = {};
    if (touched.destination && !isValidDestination(formData.destination)) {
      newErrors.destination = 'Please enter a valid city, state, country or destination name.';
    }
    const daysNum = parseInt(formData.days, 10);
    if (touched.days && (isNaN(daysNum) || daysNum < 1 || daysNum > 60)) {
      newErrors.days = 'Please specify a trip duration between 1 and 60 days.';
    }
    if (
      formData.travelStyle === 'other' &&
      touched.travelStyleOther &&
      !isMeaningfulText(formData.travelStyleOther)
    ) {
      newErrors.travelStyleOther =
        'Please enter at least 2 characters of meaningful text (no numbers or random symbols).';
    }
    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest area.';
    }
    if (
      formData.interests.includes('other') &&
      touched.interestsOther &&
      !isMeaningfulText(formData.interestsOther)
    ) {
      newErrors.interestsOther =
        'Please enter at least 2 characters of meaningful text (no numbers or random symbols).';
    }
    return newErrors;
  }, [formData, touched]);

  const isValid = useMemo(() => {
    const destValid = isValidDestination(formData.destination);
    const daysNum = parseInt(formData.days, 10);
    const daysValid = !isNaN(daysNum) && daysNum >= 1 && daysNum <= 60;
    const budgetValid = Boolean(formData.budget);
    const styleValid = Boolean(formData.travelStyle);
    const styleOtherValid =
      formData.travelStyle !== 'other' || isMeaningfulText(formData.travelStyleOther);
    const interestsValid = formData.interests.length > 0;
    const interestsOtherValid =
      !formData.interests.includes('other') || isMeaningfulText(formData.interestsOther);
    return (
      destValid &&
      daysValid &&
      budgetValid &&
      styleValid &&
      styleOtherValid &&
      interestsValid &&
      interestsOtherValid
    );
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

  const scrollToView = () => {
    const element =
      document.getElementById('trip-planner-card') ||
      document.getElementById('itinerary-dashboard');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle generation via backend AI API
  const executeGeneration = async () => {
    if (!isValid) {
      setTouched({ destination: true, days: true, travelStyleOther: true, interestsOther: true });
      return;
    }
    setStatus('loading');
    setApiError(null);
    scrollToView();

    try {
      // Map 'other' write-in fields into clean strings for Gemini AI reasoning
      const payload = { ...formData };
      if (payload.travelStyle === 'other' && payload.travelStyleOther) {
        payload.travelStyle = payload.travelStyleOther.trim();
      }
      if (payload.interests.includes('other') && payload.interestsOther) {
        payload.interests = payload.interests.map((item) =>
          item === 'other' ? payload.interestsOther.trim() : item
        );
      }

      const response = await ApiService.generateTripItinerary(payload);
      const generatedData = response.data || response;
      setItinerary(generatedData);
      setStatus('success');
      scrollToView();
    } catch (error) {
      console.error('[AI Trip Generation Error]:', error);
      setApiError(error);
      setStatus('error');
      scrollToView();
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    executeGeneration();
  };

  const handleNewTrip = () => {
    setFormData({
      destination: '',
      days: '',
      budget: 'moderate',
      travelStyle: 'couple',
      travelStyleOther: '',
      interests: ['food', 'culture'],
      interestsOther: '',
      notes: '',
    });
    setTouched({ destination: false, days: false, travelStyleOther: false, interestsOther: false });
    setItinerary(null);
    setApiError(null);
    setStatus('form');
    scrollToView();
  };

  const handleEditForm = () => {
    setStatus('form');
    scrollToView();
  };

  // Render loading state
  if (status === 'loading') {
    return <LoadingOverlay destination={formData.destination || 'your dream destination'} />;
  }

  // Render error state
  if (status === 'error') {
    return <ErrorCard error={apiError} onRetry={executeGeneration} onEdit={handleEditForm} />;
  }

  // Render AI generated itinerary state
  if (status === 'success' && itinerary) {
    return (
      <ItineraryDashboard
        itinerary={itinerary}
        userParams={formData}
        onNewTrip={handleNewTrip}
        onEditForm={handleEditForm}
        onRegenerate={executeGeneration}
        isRegenerating={false}
      />
    );
  }

  // Render Trip Planner Form state
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
            placeholder="e.g. Tokyo, New York, Goa, Paris, Bali, Swiss Alps"
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

        {/* Row 3: Travel Style & Conditional Write-in */}
        <div className="space-y-4">
          <OptionSelector
            label="Who Are You Traveling With?"
            options={TRAVEL_STYLE_OPTIONS}
            selectedValue={formData.travelStyle}
            onChange={(val) => {
              handleChange('travelStyle', val);
              if (val === 'other') setTouched((prev) => ({ ...prev, travelStyleOther: false }));
            }}
          />
          <AnimatePresence>
            {formData.travelStyle === 'other' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-1"
              >
                <FormInput
                  id="input-travel-style-other"
                  label="Please specify companion group"
                  placeholder="e.g. Backpacking club or Senior tour group..."
                  value={formData.travelStyleOther}
                  onChange={(e) => handleChange('travelStyleOther', e.target.value)}
                  onBlur={() => handleBlur('travelStyleOther')}
                  error={errors.travelStyleOther}
                  icon={PenTool}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Row 4: Interests Multi-Select & Conditional Write-in */}
        <div className="space-y-4">
          <InterestChips
            label="What Experience Are You Looking For?"
            options={INTEREST_OPTIONS}
            selectedInterests={formData.interests}
            onToggle={handleInterestToggle}
            error={errors.interests}
          />
          <AnimatePresence>
            {formData.interests.includes('other') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden pt-1"
              >
                <FormInput
                  id="input-interests-other"
                  label="Please specify preferred activity or experience"
                  placeholder="e.g. Architectural photography, Scuba diving, or Classical operas..."
                  value={formData.interestsOther}
                  onChange={(e) => handleChange('interestsOther', e.target.value)}
                  onBlur={() => handleBlur('interestsOther')}
                  error={errors.interestsOther}
                  icon={PenTool}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
                Please ensure valid destination, duration, and meaningful text specifies to unlock
                trip generation.
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
    </motion.div>
  );
}
