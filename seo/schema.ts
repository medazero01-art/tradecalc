/**
 * Structured Data (Schema.org) Generators for TradeCalc
 * Provides valid JSON-LD for SoftwareApplication, FAQPage, and HowTo schemas.
 */

export function generateSoftwareApplicationSchema(calc: {
  name: string;
  description: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calc.name,
    description: calc.description,
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'All',
    ...(calc.url ? { url: calc.url } : {}),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateHowToSchema(
  calc: { name: string; description: string; url: string },
  steps: { stepNumber: number; name: string; instruction: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate ${calc.name.replace(/\s*Calculator\s*/i, '')}`,
    description: `Step-by-step mathematical method for calculating ${calc.name.toLowerCase()} requirements accurately.`,
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: step.stepNumber || idx + 1,
      name: step.name,
      text: step.instruction,
      url: `${calc.url}#how-its-calculated`,
    })),
  };
}
