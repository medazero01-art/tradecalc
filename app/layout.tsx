import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SITE_URL } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'TradeCalc | Fast, Accurate Construction & Trade Calculators',
  description: 'Fast, accurate, and mobile-friendly calculators for construction contractors, roofers, carpenters, concrete finishers, and DIY builders.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'TradeCalc | Fast, Accurate Construction & Trade Calculators',
    description: 'Fast, accurate, and mobile-friendly calculators for construction contractors, roofers, carpenters, concrete finishers, and DIY builders.',
    url: SITE_URL,
    siteName: 'TradeCalc',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'TradeCalc - Construction and Trade Calculators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { UnitProvider } from '@/context/UnitContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-white font-sans text-[#111111] antialiased flex flex-col" suppressHydrationWarning>
        <UnitProvider>
          <Header />
          <main className="flex-1 flex flex-col w-full max-w-[1200px] mx-auto">
            {children}
          </main>
          <Footer />
        </UnitProvider>
      </body>
    </html>
  );
}
