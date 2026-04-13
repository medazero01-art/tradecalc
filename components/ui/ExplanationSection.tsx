import React from 'react';
import { cn } from '@/lib/utils';

interface ExplanationSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ExplanationSection({ title, children, className }: ExplanationSectionProps) {
  return (
    <section className={cn("mt-12 w-full max-w-[800px] mx-auto px-4", className)}>
      <h2 className="text-[22px] font-bold text-[#111111] mb-4 border-b-2 border-[#000000] pb-2">
        {title}
      </h2>
      <div className="text-[16px] leading-[1.6] text-[#111111] space-y-4">
        {children}
      </div>
    </section>
  );
}
