import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import calculators from '@/config/calculators.json';
import { getCalculatorContent } from '@/config/calculatorContent';
import { CalculatorRegistry } from '@/components/calculators';
import { AdSlot } from '@/components/ui/AdSlot';
import { CalculatorContentSection } from '@/components/ui/CalculatorContentSection';
import { RelatedCalculators, RelatedCalculatorItem } from '@/components/ui/RelatedCalculators';
import {
  generateSoftwareApplicationSchema,
  generateFAQSchema,
  generateHowToSchema,
} from '@/seo/schema';
import { SITE_URL } from '@/lib/site';

interface CalculatorPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return calculators.map((calc) => ({
    category: calc.category,
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const calc = calculators.find((c) => c.category === category && c.slug === slug);

  if (!calc) {
    return {};
  }

  const pageUrl = `${SITE_URL}/calculators/${calc.category}/${calc.slug}`;

  return {
    title: calc.seoTitle,
    description: calc.seoDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: calc.seoTitle,
      description: calc.seoDescription,
      url: pageUrl,
      type: 'website',
    },
  };
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { category, slug } = await params;
  const calc = calculators.find((c) => c.category === category && c.slug === slug);

  if (!calc) {
    notFound();
  }

  const CalculatorComponent = CalculatorRegistry[calc.id as keyof typeof CalculatorRegistry];

  if (!CalculatorComponent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <h1 className="text-[24px] font-bold text-red-600 mb-4">Calculator Not Found</h1>
        <p className="text-[#555555]">The calculator component for &quot;{calc.id}&quot; has not been implemented yet.</p>
      </div>
    );
  }

  const calcContent = getCalculatorContent(calc.id);
  const pageUrl = `${SITE_URL}/calculators/${calc.category}/${calc.slug}`;

  // Structured Data Schemas
  const softwareSchema = generateSoftwareApplicationSchema({
    name: calc.name,
    description: calc.description,
    url: pageUrl,
  });

  const faqSchema = calcContent ? generateFAQSchema(calcContent.faqs) : null;
  const howToSchema = calcContent
    ? generateHowToSchema(
        { name: calc.name, description: calc.description, url: pageUrl },
        calcContent.howItCalculated.metric.steps
      )
    : null;

  // Build related calculators: combine same-category with cross-category recommendations
  const sameCategoryRelated: RelatedCalculatorItem[] = calculators
    .filter((c) => c.category === calc.category && c.id !== calc.id)
    .slice(0, 2)
    .map((c) => ({
      title: c.name,
      href: `/calculators/${c.category}/${c.slug}`,
      category: c.category,
    }));

  const crossCategoryRelated: RelatedCalculatorItem[] = (calcContent?.crossCategoryCalculators || [])
    .filter((c) => c.category !== calc.category)
    .map((rec) => ({
      title: rec.name,
      href: `/calculators/${rec.category}/${rec.slug}`,
      category: rec.category,
      jobContext: rec.jobContext,
      isCrossCategory: true,
    }));

  const allRelated: RelatedCalculatorItem[] = [...sameCategoryRelated, ...crossCategoryRelated];

  const categoryDisplayName = calc.category.charAt(0).toUpperCase() + calc.category.slice(1);

  return (
    <div className="flex flex-col items-center w-full px-4 py-8 sm:py-12">
      {/* Structured Data: SoftwareApplication, FAQPage, HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="w-full max-w-[800px] mb-6 flex items-center gap-2 text-[13px] font-bold text-[#555555]">
        <Link href="/" className="hover:text-[#FF5E00] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/calculators/${calc.category}`}
          className="hover:text-[#FF5E00] uppercase tracking-wider transition-colors"
        >
          {categoryDisplayName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#111111] truncate">{calc.name}</span>
      </nav>

      {/* Calculator Header */}
      <div className="w-full max-w-[800px] mb-8">
        <h1 className="text-[28px] sm:text-[38px] font-black leading-[1.15] text-[#111111] uppercase tracking-tight mb-3">
          {calc.name}
        </h1>
        <p className="text-[16px] sm:text-[17px] text-[#555555] font-medium leading-relaxed">
          {calc.description}
        </p>
      </div>

      {/* Main Interactive Calculator Widget */}
      <div className="w-full max-w-[800px] mb-10">
        <CalculatorComponent />
      </div>

      {/* Ad slot between widget and content */}
      <AdSlot id={`calc-${calc.id}-middle`} className="max-w-[800px] mb-8" />

      {/* Reusable Rich Technical Content Section (How It's Calculated, Worked Example, Common Mistakes, FAQs) */}
      {calcContent && <CalculatorContentSection content={calcContent} />}

      {/* Related & Cross-Category Calculators */}
      <RelatedCalculators calculators={allRelated} className="mt-8 mb-4" />
    </div>
  );
}
