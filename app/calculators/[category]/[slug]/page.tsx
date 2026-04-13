import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import calculators from '@/config/calculators.json';
import { CalculatorRegistry } from '@/components/calculators';
import { AdSlot } from '@/components/ui/AdSlot';
import { ExplanationSection } from '@/components/ui/ExplanationSection';
import { RelatedCalculators } from '@/components/ui/RelatedCalculators';
import { generateSoftwareApplicationSchema, generateFAQSchema } from '@/seo/schema';

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

  return {
    title: calc.seoTitle,
    description: calc.seoDescription,
    openGraph: {
      title: calc.seoTitle,
      description: calc.seoDescription,
      url: `https://tradecalc.com/calculators/${calc.category}/${calc.slug}`,
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

  const related = calculators
    .filter((c) => c.category === calc.category && c.id !== calc.id)
    .slice(0, 3)
    .map((c) => ({
      title: c.name,
      href: `/calculators/${c.category}/${c.slug}`,
    }));

  const softwareSchema = generateSoftwareApplicationSchema(calc);
  const faqSchema = generateFAQSchema([
    {
      question: `How do I use the ${calc.name}?`,
      answer: `To use the ${calc.name}, simply enter your measurements into the input fields. The calculator will automatically compute the results for you instantly.`,
    },
    {
      question: `Is the ${calc.name} free to use?`,
      answer: `Yes, the ${calc.name} is completely free to use for both professionals and DIYers.`,
    }
  ]);

  return (
    <div className="flex flex-col items-center w-full px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="w-full max-w-[800px] mb-8">
        <h1 className="text-[28px] sm:text-[36px] font-black leading-[1.2] text-[#111111] uppercase tracking-tight mb-2">
          {calc.name}
        </h1>
        <p className="text-[16px] text-[#555555] font-medium">
          {calc.description}
        </p>
      </div>

      <div className="w-full max-w-[800px] mb-12">
        <CalculatorComponent />
      </div>

      <AdSlot id={`calc-${calc.id}-middle`} className="max-w-[800px] mb-12" />

      <ExplanationSection title={`How to use the ${calc.name}`}>
        <p>
          This calculator is designed to provide instant, accurate results for your construction projects.
          Simply enter your measurements in the fields above, and the result will update automatically.
        </p>
        <p>
          <strong>Pro Tip:</strong> You can switch between metric and imperial units using the toggle at the top of the calculator.
          The results are calculated instantly without needing to press a calculate button.
        </p>
      </ExplanationSection>

      <RelatedCalculators calculators={related} />
    </div>
  );
}
