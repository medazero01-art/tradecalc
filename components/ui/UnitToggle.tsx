import React from 'react';
import { cn } from '@/lib/utils';

interface UnitToggleProps {
  units: { id: string; label: string }[];
  activeUnit: string;
  onChange: (id: string) => void;
  className?: string;
}

export function UnitToggle({ units, activeUnit, onChange, className }: UnitToggleProps) {
  return (
    <div className={cn("flex w-full h-[48px] rounded-md overflow-hidden border-2 border-[#000000]", className)}>
      {units.map((unit) => {
        const isActive = activeUnit === unit.id;
        return (
          <button
            key={unit.id}
            type="button"
            onClick={() => onChange(unit.id)}
            className={cn(
              "flex-1 flex items-center justify-center text-[16px] font-bold uppercase transition-colors",
              isActive
                ? "bg-[#FF5E00] text-white"
                : "bg-[#F4F5F7] text-[#111111] hover:bg-[#e0e2e6]"
            )}
            aria-pressed={isActive}
          >
            {unit.label}
          </button>
        );
      })}
    </div>
  );
}
