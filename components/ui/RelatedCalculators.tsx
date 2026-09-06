import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RelatedCalculatorItem {
  title: string;
  href: string;
  category?: string;
  jobContext?: string;
  isCrossCategory?: boolean;
}

interface RelatedCalculatorsProps {
  calculators: RelatedCalculatorItem[];
  className?: string;
}

export function RelatedCalculators({ calculators, className }: RelatedCalculatorsProps) {
  if (!calculators || calculators.length === 0) return null;

  return (
    <section className={cn("mt-12 w-full max-w-[800px] mx-auto px-4", className)}>
      <div className="flex items-center justify-between border-b-2 border-[#000000] pb-2 mb-6">
        <h2 className="text-[20px] sm:text-[22px] font-black uppercase tracking-tight text-[#111111]">
          Related & Complementary Calculators
        </h2>
        <span className="text-[12px] font-bold text-[#555555] uppercase tracking-wider hidden sm:inline-block">
          Frequently Used on Same Job
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {calculators.map((calc, idx) => (
          <Link
            key={idx}
            href={calc.href}
            className="flex flex-col sm:flex-row sm:items-center justify-between w-full min-h-[64px] bg-white border-2 border-[#000000] p-4 hover:bg-[#F4F5F7] hover:border-[#FF5E00] transition-colors group shadow-[4px_4px_0_0_#000000]"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {calc.category && (
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-[#111111] text-white">
                    {calc.category}
                  </span>
                )}
                <span className="text-[16px] font-bold text-[#111111] group-hover:text-[#FF5E00] transition-colors">
                  {calc.title}
                </span>
              </div>
              {calc.jobContext && (
                <p className="text-[13px] text-[#666666] leading-snug">
                  {calc.jobContext}
                </p>
              )}
            </div>
            <ChevronRight className="text-[#555555] group-hover:text-[#FF5E00] transition-colors self-end sm:self-center shrink-0 mt-2 sm:mt-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
