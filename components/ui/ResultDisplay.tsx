'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultDisplayProps {
  label: string;
  value: string | number;
  subValue?: string;
  className?: string;
}

export function ResultDisplay({ label, value, subValue, className }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${value} ${label}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={cn("w-full border-4 border-[#000000] bg-[#0E702F] text-white p-6 flex flex-col items-center justify-center relative shadow-[4px_4px_0_0_#000000]", className)}>
      <span className="text-[14px] font-bold uppercase tracking-wider opacity-90 mb-2">
        You Will Need:
      </span>
      <div className="text-[40px] font-black leading-[1.1] text-center mb-1">
        {value}
      </div>
      <div className="text-[20px] font-bold text-center opacity-90">
        {label}
      </div>
      {subValue && (
        <div className="text-[16px] font-medium text-center opacity-80 mt-2">
          {subValue}
        </div>
      )}
      
      <button
        onClick={handleCopy}
        className="absolute bottom-4 right-4 flex items-center gap-2 text-[14px] font-bold uppercase bg-white/20 hover:bg-white/30 px-3 py-2 rounded transition-colors"
        aria-label="Copy Result"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
