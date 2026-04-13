import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'TradeCalc | Construction & Trade Calculators',
  description: 'Fast, accurate, and mobile-friendly calculators for construction professionals, roofers, carpenters, and DIYers.',
  openGraph: {
    title: 'TradeCalc | Construction & Trade Calculators',
    description: 'Fast, accurate, and mobile-friendly calculators for construction professionals, roofers, carpenters, and DIYers.',
    url: 'https://tradecalc.com',
    siteName: 'TradeCalc',
    images: [
      {
        url: 'https://tradecalc.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-white font-sans text-[#111111] antialiased flex flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1 flex flex-col w-full max-w-[1200px] mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
