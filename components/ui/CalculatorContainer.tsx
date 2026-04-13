import React from 'react';
import { cn } from '@/lib/utils';

interface CalculatorContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function CalculatorContainer({ children, className }: CalculatorContainerProps) {
  return (
    <div className={cn("w-full max-w-[600px] mx-auto bg-[#F4F5F7] border-2 border-[#000000] p-4 sm:p-6 shadow-[8px_8px_0_0_#000000] rounded-lg", className)}>
      {children}
    </div>
  );
}
