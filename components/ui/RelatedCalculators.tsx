import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RelatedCalculatorsProps {
  calculators: {
    title: string;
    href: string;
  }[];
  className?: string;
}

export function RelatedCalculators({ calculators, className }: RelatedCalculatorsProps) {
  if (!calculators || calculators.length === 0) return null;

  return (
    <section className={cn("mt-12 w-full max-w-[800px] mx-auto px-4", className)}>
      <h2 className="text-[22px] font-bold text-[#111111] mb-6 border-b-2 border-[#000000] pb-2">
        Related Calculators
      </h2>
      <div className="flex flex-col gap-4">
        {calculators.map((calc, idx) => (
          <Link
            key={idx}
            href={calc.href}
            className="flex items-center justify-between w-full min-h-[56px] bg-white border-2 border-[#000000] px-4 py-3 hover:bg-[#F4F5F7] hover:border-[#FF5E00] transition-colors group shadow-[4px_4px_0_0_#000000]"
          >
            <span className="text-[16px] font-bold text-[#111111] group-hover:text-[#FF5E00] transition-colors">
              {calc.title}
            </span>
            <ChevronRight className="text-[#555555] group-hover:text-[#FF5E00] transition-colors" />
          </Link>
        ))}
      </div>
    </section>
  );
}
