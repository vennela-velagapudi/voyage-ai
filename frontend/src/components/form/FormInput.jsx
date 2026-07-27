import React from 'react';

export default function FormInput({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon: Icon,
  min,
  max,
  required = true,
}) {
  return (
    <div className="flex flex-col space-y-2 text-left">
      <label htmlFor={id} className="text-sm font-medium text-text-body flex items-center gap-1.5">
        {Icon && <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />}
        <span>{label}</span>
        {required && (
          <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold">*</span>
        )}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          min={min}
          max={max}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full bg-surface-inner text-text-main placeholder-text-subtle text-base sm:text-sm lg:text-sm min-h-[48px] lg:min-h-0 rounded-xl px-4 py-3 border transition-all duration-200 focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-500 focus:ring-rose-500/30 text-rose-600 dark:text-rose-300'
              : 'border-border-theme hover:border-border-subtle focus:border-indigo-500 focus:ring-indigo-500/20'
          }`}
        />
      </div>
      {error && (
        <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
