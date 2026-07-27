import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';

export default function InterestChips({
  label,
  options,
  selectedInterests,
  onToggle,
  required = true,
  error,
}) {
  return (
    <div className="flex flex-col space-y-2.5 text-left">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-body flex items-center gap-1.5">
          <span>{label}</span>
          {required && (
            <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">*</span>
          )}
        </label>
        <span className="text-xs text-text-subtle">
          {selectedInterests.length === 0
            ? 'Select at least 1'
            : `${selectedInterests.length} selected`}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        {options.map((interest) => {
          const isSelected = selectedInterests.includes(interest.id);
          const ChipIcon = interest.icon;

          return (
            <motion.button
              key={interest.id}
              type="button"
              id={`chip-${interest.id}`}
              onClick={() => onToggle(interest.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className={`inline-flex items-center gap-2 min-h-[44px] sm:min-h-[38px] lg:min-h-0 px-4 sm:px-3.5 py-2.5 lg:py-2 rounded-full text-sm sm:text-xs lg:text-xs font-semibold border transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-700 dark:text-indigo-200 shadow-sm'
                  : 'bg-surface-card border-border-theme text-text-muted hover:border-border-subtle hover:text-text-main'
              }`}
            >
              {ChipIcon && (
                <ChipIcon
                  className={`h-3.5 w-3.5 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-text-subtle'}`}
                />
              )}
              <span>{interest.label}</span>
              {isSelected ? (
                <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400 ml-0.5" />
              ) : (
                <Plus className="h-3 w-3 text-text-subtle ml-0.5" />
              )}
            </motion.button>
          );
        })}
      </div>
      {error && (
        <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
