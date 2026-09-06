import React from 'react';
import { cn } from '@/lib/utils';

interface AdSlotProps {
  id: string;
  className?: string;
  format?: 'banner' | 'rectangle' | 'fluid';
}

export function AdSlot({ id, className, format = 'banner' }: AdSlotProps) {
  /**
   * Google AdSense-ready responsive container.
   * Uses fluid sizing with reserved min-height to eliminate Cumulative Layout Shift (CLS).
   * Do NOT use fixed pixel heights (e.g. h-[90px]), as responsive <ins> units must adapt to viewport widths.
   */

  return (
    <div
      className={cn(
        "w-full max-w-full overflow-hidden transition-all my-8",
        className
      )}
      data-ad-slot-id={id}
      aria-label="Advertisement Slot"
    >
      {/* 
        ADSENSE_SLOT: Insert Google AdSense responsive ad unit here upon account approval
        Example:
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={id}
             data-ad-format="auto"
             data-full-width-responsive="true" />
      */}
      <div
        className={cn(
          "w-full bg-[#EAECEF] border border-dashed border-[#888888] flex flex-col items-center justify-center text-[#666666] text-[11px] font-mono uppercase tracking-widest px-4 py-3 transition-colors",
          format === 'rectangle'
            ? "min-h-[250px] sm:min-h-[280px]"
            : "min-h-[100px] sm:min-h-[120px] md:min-h-[140px]"
        )}
      >
        <span className="font-bold tracking-wider">Advertisement</span>
        <span className="text-[10px] text-[#888888] font-normal mt-0.5 lowercase">
          [slot: {id} — responsive unit]
        </span>
      </div>
    </div>
  );
}
