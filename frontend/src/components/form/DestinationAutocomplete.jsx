import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, AlertCircle, Loader2, Sparkles, Trees, Landmark, Globe } from 'lucide-react';
import { ApiService } from '../../services/apiService';

/**
 * Assigns icon based on Google place prediction type tags
 */
const getSuggestionIcon = (types = []) => {
  if (types.includes('country')) return Globe;
  if (
    types.includes('national_park') ||
    types.includes('park') ||
    types.includes('natural_feature')
  )
    return Trees;
  if (
    types.includes('tourist_attraction') ||
    types.includes('amusement_park') ||
    types.includes('museum')
  )
    return Landmark;
  if (types.includes('locality') || types.includes('political') || types.includes('geocode'))
    return MapPin;
  return Sparkles;
};

export default function DestinationAutocomplete({
  id = 'input-destination-autocomplete',
  label = 'Destination City, Country or Highlight',
  placeholder = 'Search destinations e.g. Kyoto, Paris, Swiss Alps...',
  value = '',
  onChange,
  onBlur,
  error = null,
  icon: InputIcon = MapPin,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Debounced real-time query to Google Places Autocomplete API
  useEffect(() => {
    let isCancelled = false;
    if (!value || value.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await ApiService.getDestinationSuggestions(value);
        if (!isCancelled && response?.data) {
          const list = response.data.data || response.data || [];
          setSuggestions(list);
          if (list.length > 0) {
            setIsOpen(true);
          }
        }
      } catch (err) {
        console.warn('Autocomplete fetch error:', err.message);
        if (!isCancelled) setSuggestions([]);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [value]);

  // Handle clicks outside of dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelect = (item) => {
    const selectedText = item.label || item.mainText;
    if (onChange) {
      onChange(selectedText);
    }
    setIsOpen(false);
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="flex flex-col space-y-2 text-left relative" ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-slate-200 flex items-center justify-between"
        >
          <span>{label}</span>
          {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" />}
        </label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <InputIcon className="h-5 w-5 text-indigo-400" />
        </div>
        <input
          id={id}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full pl-11 pr-4 py-3.5 min-h-[48px] lg:min-h-0 rounded-xl bg-slate-900/80 text-slate-100 placeholder-slate-500 text-base sm:text-sm lg:text-sm border transition-all duration-200 focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-500/80 focus:ring-rose-500/30 text-rose-100 bg-rose-950/10'
              : 'border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete="off"
        />
      </div>

      {/* Real-time Google Places Autocomplete Dropdown Menu */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-slate-950/98 backdrop-blur-xl border border-indigo-500/30 rounded-2xl shadow-2xl max-h-72 sm:max-h-80 overflow-y-auto divide-y divide-slate-800/80 scrollbar-thin scrollbar-thumb-slate-800"
          >
            {suggestions.map((item) => {
              const Icon = getSuggestionIcon(item.types);
              return (
                <li key={item.placeId}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-4 py-3.5 min-h-[48px] flex items-center gap-3 hover:bg-slate-800/70 transition-colors duration-150 cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-indigo-500/40 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-sky-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="truncate flex-grow">
                      <p className="text-sm font-extrabold text-white truncate group-hover:text-indigo-300 transition-colors">
                        {item.mainText || item.label}
                      </p>
                      {item.secondaryText && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {item.secondaryText}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Validation Error Banner directly beneath destination input */}
      {error && (
        <motion.div
          id={`${id}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 pt-1 text-xs text-rose-400 font-semibold leading-relaxed"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-400 mt-0.5 animate-pulse" />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
}
