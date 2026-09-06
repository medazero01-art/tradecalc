import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import calculators from '@/config/calculators.json';
import { AdSlot } from '@/components/ui/AdSlot';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'TradeCalc | Free Construction & Trade Calculators',
  description: 'Fast, accurate, mobile-friendly calculators for concrete, roofing, framing, drywall, paint, tile, and laminate flooring. Get the number and get back to work.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'TradeCalc | Free Construction & Trade Calculators',
    description: 'Fast, accurate, mobile-friendly calculators for concrete, roofing, framing, drywall, paint, tile, and laminate flooring.',
    url: SITE_URL,
  },
};

interface HomePageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || '';

  // Filter calculators if there's a search query
  const filteredCalculators = query
    ? calculators.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query)
      )
    : calculators;

  // Group calculators by category
  const categories = filteredCalculators.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {} as Record<string, typeof calculators>);

  return (
    <div className="flex flex-col items-center w-full px-4 py-8 sm:py-12">
      <div className="w-full max-w-[800px] text-center mb-12">
        <h1 className="text-[32px] sm:text-[48px] font-black leading-[1.1] text-[#111111] mb-4 uppercase tracking-tight">
          Get the number.<br />
          <span className="text-[#FF5E00]">Get back to work.</span>
        </h1>
        <p className="text-[18px] sm:text-[20px] text-[#555555] font-medium max-w-[600px] mx-auto">
          Fast, accurate, mobile-friendly calculators for construction professionals and DIYers.
        </p>
      </div>

      <AdSlot id="home-top-banner" className="max-w-[800px] mb-12" />

      {query && (
        <div className="w-full max-w-[800px] mb-8">
          <h2 className="text-[20px] font-bold text-[#111111]">
            Search Results for &quot;{query}&quot;
          </h2>
          {filteredCalculators.length === 0 && (
            <p className="text-[#555555] mt-2">No calculators found matching your search.</p>
          )}
        </div>
      )}

      <div className="w-full max-w-[800px] flex flex-col gap-12">
        {Object.entries(categories).map(([category, calcs]) => (
          <section key={category} className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b-4 border-[#111111] pb-2">
              <h2 className="text-[24px] font-black uppercase tracking-wider text-[#111111]">
                {category}
              </h2>
              <Link
                href={`/calculators/${category}`}
                className="text-[14px] font-bold text-[#0056D2] hover:text-[#FF5E00] uppercase tracking-wider transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {calcs.map((calc) => (
                <Link
                  key={calc.id}
                  href={`/calculators/${calc.category}/${calc.slug}`}
                  className="flex flex-col justify-between min-h-[100px] bg-white border-2 border-[#000000] p-4 hover:bg-[#F4F5F7] hover:border-[#FF5E00] transition-colors group shadow-[4px_4px_0_0_#000000]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[18px] font-bold text-[#111111] group-hover:text-[#FF5E00] transition-colors leading-tight">
                      {calc.name}
                    </h3>
                    <ChevronRight className="text-[#555555] group-hover:text-[#FF5E00] transition-colors shrink-0" />
                  </div>
                  <p className="text-[14px] text-[#555555] mt-2 line-clamp-2">
                    {calc.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
