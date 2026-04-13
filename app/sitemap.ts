import { MetadataRoute } from 'next';
import calculators from '@/config/calculators.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tradecalc.com';

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  const categories = Array.from(new Set(calculators.map((c) => c.category)));
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/calculators/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const calculatorPages = calculators.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.category}/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...categoryPages, ...calculatorPages];
}
