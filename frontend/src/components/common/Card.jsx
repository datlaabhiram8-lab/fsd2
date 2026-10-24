import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({
  children,
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          'bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden transition-all duration-200',
          hover && 'hover:shadow-elevated hover:border-slate-300 cursor-pointer',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={twMerge(clsx('px-6 py-4 border-b border-slate-100 flex items-center justify-between', className))}>
      <div>
        {title && <h3 className="text-sm sm:text-base font-bold text-navy-900">{title}</h3>}
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardBody = ({ children, className = '' }) => {
  return <div className={twMerge(clsx('p-5 sm:p-6', className))}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={twMerge(clsx('px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs', className))}>
      {children}
    </div>
  );
};
