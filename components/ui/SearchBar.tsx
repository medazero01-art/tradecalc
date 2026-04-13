'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={cn("relative flex items-center w-full max-w-[400px]", className)}>
      <input
        type="text"
        placeholder="Search calculators..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-[48px] pl-10 pr-4 bg-[#F4F5F7] border-2 border-[#000000] text-[16px] font-medium text-[#111111] focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00] transition-colors rounded-full"
      />
      <Search className="absolute left-3 text-[#555555]" size={20} />
    </form>
  );
}
