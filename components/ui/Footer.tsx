'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SuggestCalculatorModal } from './SuggestCalculatorModal';

const categories = [
  { name: 'Concrete', href: '/calculators/concrete' },
  { name: 'Roofing', href: '/calculators/roofing' },
  { name: 'Tile', href: '/calculators/tile' },
  { name: 'Framing', href: '/calculators/framing' },
  { name: 'Flooring', href: '/calculators/flooring' },
  { name: 'Drywall', href: '/calculators/drywall' },
  { name: 'Paint', href: '/calculators/paint' },
];

export function Footer({ className }: { className?: string }) {
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);

  return (
    <>
      <footer className={cn("w-full bg-[#111111] text-white py-12 px-4 mt-24 border-t-4 border-[#FF5E00]", className)}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-[24px] font-black tracking-tight uppercase">
              Trade<span className="text-[#FF5E00]">Calc</span>
            </span>
            <p className="text-[14px] text-[#A0A0A0] leading-relaxed">
              Fast, accurate, and mobile-friendly calculators for construction professionals, trade contractors, and DIYers.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-[16px] font-bold uppercase tracking-wider text-[#F4F5F7]">Categories</h3>
            <ul className="flex flex-col gap-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="text-[14px] text-[#A0A0A0] hover:text-[#FF5E00] transition-colors">
                    {cat.name} Calculators
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[16px] font-bold uppercase tracking-wider text-[#F4F5F7]">Have an Idea?</h3>
            <p className="text-[14px] text-[#A0A0A0] leading-relaxed">
              Need a trade calculation we don&apos;t support yet? Let us know what you need on the job site.
            </p>
            <button
              type="button"
              id="footer-suggest-calculator-btn"
              onClick={() => setIsSuggestOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FF5E00] text-white font-black uppercase text-[13px] tracking-wider border-2 border-white shadow-[3px_3px_0_0_#FFFFFF] hover:bg-white hover:text-[#111111] hover:border-[#FF5E00] transition-all cursor-pointer w-fit"
            >
              <Lightbulb className="w-4 h-4" />
              Suggest Calculator
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[16px] font-bold uppercase tracking-wider text-[#F4F5F7]">Legal & Standards</h3>
            <p className="text-[13px] text-[#888888] leading-relaxed">
              Calculations are estimates for trade planning. Always verify with local building codes and structural engineer requirements.
            </p>
            <div className="text-[12px] text-[#666666]">
              All calculation formulas follow standard trade practices.
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-[12px] text-[#A0A0A0]">
          <div>
            &copy; {new Date().getFullYear()} TradeCalc. All rights reserved.
          </div>
          <button
            type="button"
            onClick={() => setIsSuggestOpen(true)}
            className="text-[#FF5E00] hover:underline font-bold text-[13px]"
          >
            Request a New Calculator &rarr;
          </button>
        </div>
      </footer>

      <SuggestCalculatorModal
        isOpen={isSuggestOpen}
        onClose={() => setIsSuggestOpen(false)}
      />
    </>
  );
}
