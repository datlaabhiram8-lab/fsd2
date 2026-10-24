import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const statusConfig = {
  todo: {
    label: 'To Do',
    className: 'bg-slate-100 text-slate-700 border-slate-300',
    dotColor: 'bg-slate-400',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    dotColor: 'bg-blue-500',
  },
  submitted: {
    label: 'Submitted',
    className: 'bg-amber-50 text-amber-800 border-amber-300',
    dotColor: 'bg-amber-500',
  },
  in_review: {
    label: 'In Review',
    className: 'bg-purple-50 text-purple-700 border-purple-200',
    dotColor: 'bg-purple-500',
  },
  changes_requested: {
    label: 'Changes Requested',
    className: 'bg-rose-50 text-rose-700 border-rose-200',
    dotColor: 'bg-rose-500',
  },
  approved: {
    label: 'Approved',
    className: 'bg-teal-50 text-teal-800 border-teal-200',
    dotColor: 'bg-teal-500',
  },
  completed: {
    label: 'Completed',
    className: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    dotColor: 'bg-emerald-500',
  },
  blocked: {
    label: 'Blocked',
    className: 'bg-red-50 text-red-800 border-red-200 font-semibold',
    dotColor: 'bg-red-600',
  },
};

export const StatusPill = ({ status = 'todo', size = 'md', className = '' }) => {
  const normalized = (status || 'todo')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_');

  const config = statusConfig[normalized] || statusConfig.todo;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors',
          config.className,
          sizeClasses[size] || sizeClasses.md,
          className
        )
      )}
    >
      <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', config.dotColor)} />
      {config.label}
    </span>
  );
};
