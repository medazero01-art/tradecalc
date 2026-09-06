'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lightbulb } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { SuggestCalculatorModal } from './SuggestCalculatorModal';

export function Header() {
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-[64px] bg-white border-b-2 border-[#000000] flex items-center justify-between px-4 sm:px-6 shadow-xs">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[24px] font-black tracking-tight text-[#111111] uppercase">
            Trade<span className="text-[#FF5E00]">Calc</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-full max-w-[280px]">
            <SearchBar />
          </div>
          <button
            type="button"
            id="header-suggest-btn"
            onClick={() => setIsSuggestOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-black uppercase tracking-wider text-[#111111] bg-[#F4F5F7] border-2 border-[#000000] hover:bg-[#FF5E00] hover:text-white transition-colors cursor-pointer"
            title="Suggest a new trade calculator"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Suggest Calc</span>
          </button>
        </div>
      </header>

      <SuggestCalculatorModal
        isOpen={isSuggestOpen}
        onClose={() => setIsSuggestOpen(false)}
      />
    </>
  );
}
