'use client';

import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'teal' | 'emerald' | 'amber' | 'rose' | 'slate' | 'blue';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'teal',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    teal: 'bg-teal-50 text-teal-800 border-teal-200/80',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/80',
    rose: 'bg-rose-50 text-rose-800 border-rose-200/80',
    slate: 'bg-slate-100 text-slate-800 border-slate-200',
    blue: 'bg-sky-50 text-sky-800 border-sky-200/80',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
