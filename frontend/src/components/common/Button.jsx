import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const variants = {
  primary: 'bg-royal-600 hover:bg-royal-700 text-white shadow-sm focus:ring-royal-500 font-semibold',
  secondary: 'bg-white hover:bg-slate-50 text-navy-900 border border-slate-200 shadow-soft focus:ring-royal-500 font-medium',
  outline: 'bg-transparent border border-royal-600 text-royal-700 hover:bg-royal-50 focus:ring-royal-500 font-medium',
  ghost: 'bg-transparent hover:bg-navy-50 text-navy-700 focus:ring-navy-400 font-medium',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500 font-semibold',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500 font-semibold',
};

const sizes = {
  sm: 'px-2.5 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-3.5 py-2 text-xs sm:text-sm rounded-lg gap-2',
  lg: 'px-4.5 py-2.5 text-sm sm:text-base rounded-xl gap-2.5',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  type = 'button',
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center transition-all duration-150 outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]',
          variants[variant] || variants.primary,
          sizes[size] || sizes.md,
          className
        )
      )}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-0.5 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      )}
      {children}
    </button>
  );
};
