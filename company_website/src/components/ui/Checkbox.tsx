'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, checked, ...props }, ref) => {
    const checkboxId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex items-start gap-2.5">
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            checked={checked}
            className={cn(
              'peer appearance-none w-4 h-4 rounded border border-slate-300 bg-white checked:bg-teal-700 checked:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-rose-500',
              className
            )}
            {...props}
          />
          <Check className="w-3 h-3 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity stroke-[3]" />
        </div>
        {(label || description) && (
          <div className="text-xs">
            {label && (
              <label htmlFor={checkboxId} className="font-medium text-slate-700 cursor-pointer select-none">
                {label}
              </label>
            )}
            {description && <p className="text-slate-500 mt-0.5">{description}</p>}
            {error && <p className="text-rose-600 font-medium mt-0.5">{error}</p>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
