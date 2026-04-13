import React from 'react';
import Link from 'next/link';
import { SearchBar } from './SearchBar';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full h-[64px] bg-white border-b-2 border-[#000000] flex items-center justify-between px-4 sm:px-6 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-[24px] font-black tracking-tight text-[#111111] uppercase">
          Trade<span className="text-[#FF5E00]">Calc</span>
        </span>
      </Link>
      <div className="hidden sm:block w-full max-w-[300px] ml-4">
        <SearchBar />
      </div>
    </header>
  );
}
