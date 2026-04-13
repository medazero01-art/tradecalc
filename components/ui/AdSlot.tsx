import React from 'react';
import { cn } from '@/lib/utils';

interface AdSlotProps {
  id: string;
  className?: string;
  format?: 'banner' | 'rectangle';
}

export function AdSlot({ id, className, format = 'banner' }: AdSlotProps) {
  // In a real implementation, this would load the ad network script
  // and initialize the ad unit based on the ID.
  return (
    <div
      className={cn(
        "w-full bg-[#e0e2e6] border border-dashed border-[#555555] flex items-center justify-center text-[#555555] text-[12px] font-bold uppercase tracking-widest my-8",
        format === 'banner' ? "h-[90px]" : "h-[250px]",
        className
      )}
      data-ad-id={id}
    >
      Advertisement
    </div>
  );
}
