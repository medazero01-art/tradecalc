import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  onClear?: () => void;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, unit, className, onClear, value, onChange, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-[14px] font-bold uppercase text-[#555555]">
          {label}
        </label>
        <div className="relative flex items-center w-full">
          <input
            ref={ref}
            type="number"
            inputMode="decimal"
            pattern="[0-9]*"
            className={cn(
              "w-full h-[56px] border-2 border-[#000000] bg-white px-4 text-[20px] font-medium text-[#111111] focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00] transition-colors",
              unit ? "pr-24" : "pr-12",
              className
            )}
            value={value}
            onChange={onChange}
            {...props}
          />
          <div className="absolute right-2 flex items-center gap-2">
            {value && String(value).length > 0 && onClear && (
              <button
                type="button"
                onClick={onClear}
                className="p-2 text-[#555555] hover:text-[#111111] transition-colors"
                aria-label="Clear input"
              >
                <X size={20} />
              </button>
            )}
            {unit && (
              <span className="text-[16px] font-bold text-[#555555] select-none min-w-[32px] text-right">
                [{unit}]
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);
InputField.displayName = "InputField";
