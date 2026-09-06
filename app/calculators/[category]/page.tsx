import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import calculators from '@/config/calculators.json';
import { AdSlot } from '@/components/ui/AdSlot';
import { SITE_URL } from '@/lib/site';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = Array.from(new Set(calculators.map((c) => c.category)));
  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryCalculators = calculators.filter((c) => c.category === category);

  if (categoryCalculators.length === 0) {
    return {};
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const title = `${categoryName} Calculators | TradeCalc`;
  const description = `Free, fast, and mobile-friendly ${categoryName.toLowerCase()} calculators for construction professionals, trade contractors, and DIYers.`;
  const pageUrl = `${SITE_URL}/calculators/${category}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryCalculators = calculators.filter((c) => c.category === category);

  if (categoryCalculators.length === 0) {
    notFound();
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="flex flex-col items-center w-full px-4 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="w-full max-w-[800px] mb-6 flex items-center gap-2 text-[13px] font-bold text-[#555555]">
        <Link href="/" className="hover:text-[#FF5E00] flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Categories
        </Link>
        <span>/</span>
        <span className="text-[#111111] uppercase tracking-wider">{categoryName}</span>
      </nav>

      <div className="w-full max-w-[800px] mb-8">
        <h1 className="text-[32px] sm:text-[48px] font-black leading-[1.1] text-[#111111] uppercase tracking-tight mb-4">
          {category} <span className="text-[#FF5E00]">Calculators</span>
        </h1>
        <p className="text-[18px] text-[#555555] font-medium">
          Select a trade calculator below to calculate materials and dimensions instantly.
        </p>
      </div>

      <AdSlot id={`category-${category}-top`} className="max-w-[800px] mb-12" />

      <div className="w-full max-w-[800px] grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categoryCalculators.map((calc) => (
          <Link
            key={calc.id}
            href={`/calculators/${calc.category}/${calc.slug}`}
            className="flex flex-col justify-between min-h-[120px] bg-white border-2 border-[#000000] p-4 hover:bg-[#F4F5F7] hover:border-[#FF5E00] transition-colors group shadow-[4px_4px_0_0_#000000]"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-[18px] font-bold text-[#111111] group-hover:text-[#FF5E00] transition-colors leading-tight">
                {calc.name}
              </h2>
              <ChevronRight className="text-[#555555] group-hover:text-[#FF5E00] transition-colors shrink-0" />
            </div>
            <p className="text-[14px] text-[#555555] mt-2 line-clamp-2">
              {calc.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
