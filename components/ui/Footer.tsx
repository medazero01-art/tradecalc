import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
  return (
    <footer className={cn("w-full bg-[#111111] text-white py-12 px-4 mt-24 border-t-4 border-[#FF5E00]", className)}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-[24px] font-black tracking-tight uppercase">
            Trade<span className="text-[#FF5E00]">Calc</span>
          </span>
          <p className="text-[14px] text-[#A0A0A0] leading-relaxed">
            Fast, accurate, and mobile-friendly calculators for construction professionals and DIYers.
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
          <h3 className="text-[16px] font-bold uppercase tracking-wider text-[#F4F5F7]">Legal</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/terms" className="text-[14px] text-[#A0A0A0] hover:text-[#FF5E00] transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-[14px] text-[#A0A0A0] hover:text-[#FF5E00] transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-[#333333] text-center text-[12px] text-[#A0A0A0]">
        &copy; {new Date().getFullYear()} TradeCalc. All rights reserved.
      </div>
    </footer>
  );
}
