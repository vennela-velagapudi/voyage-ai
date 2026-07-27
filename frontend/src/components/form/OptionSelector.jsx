import React from 'react';
import { motion } from 'framer-motion';

export default function OptionSelector({
  label,
  options,
  selectedValue,
  onChange,
  required = true,
}) {
  return (
    <div className="flex flex-col space-y-2.5 text-left">
      <label className="text-sm font-medium text-text-body flex items-center gap-1.5">
        <span>{label}</span>
        {required && (
          <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">*</span>
        )}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
        {options.map((option) => {
          const isSelected = selectedValue === option.id;
          const OptionIcon = option.icon;

          return (
            <motion.button
              key={option.id}
              type="button"
              id={`option-${option.id}`}
              onClick={() => onChange(option.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex flex-col items-start min-h-[52px] lg:min-h-0 w-full p-3.5 sm:p-4 lg:p-3.5 rounded-xl border transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600/15 border-indigo-500 text-indigo-700 dark:text-white shadow-[0_0_15px_-3px_rgba(99,102,241,0.25)]'
                  : 'bg-surface-card border-border-theme text-text-muted hover:border-border-subtle hover:text-text-main'
              }`}
            >
              {OptionIcon && (
                <OptionIcon
                  className={`h-5 w-5 mb-2 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-text-subtle'}`}
                />
              )}
              <span className="text-sm font-semibold">{option.label}</span>
              {option.description && (
                <span className="text-xs text-text-subtle mt-0.5 leading-tight">
                  {option.description}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
