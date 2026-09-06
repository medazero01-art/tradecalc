'use client';

import React, { useState } from 'react';
import {
  CalculatorContent,
  UnitCalculatedContent,
  UnitWorkedExample,
} from '@/config/calculatorContent';
import { useUnit } from '@/context/UnitContext';
import { ChevronDown, Calculator, AlertTriangle, HelpCircle, CheckCircle2 } from 'lucide-react';

interface CalculatorContentSectionProps {
  content: CalculatorContent;
}

function CalculatedContentBlock({
  calculated,
  variantUnit,
}: {
  calculated: UnitCalculatedContent;
  variantUnit: 'metric' | 'imperial';
}) {
  return (
    <>
      <div className="flex items-center gap-3 border-b-2 border-[#000000] pb-3 mb-6">
        <div className="w-9 h-9 bg-[#FF5E00] text-white flex items-center justify-center font-black text-[18px] shrink-0 border border-[#000000]">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
          <h2 className="text-[20px] sm:text-[24px] font-black uppercase tracking-tight text-[#111111]">
            {calculated.title}
          </h2>
          <span className="text-[11px] font-black uppercase tracking-widest text-[#FF5E00] bg-[#FFF0E6] px-2 py-0.5 border border-[#FF5E00] w-fit">
            {variantUnit === 'metric' ? 'Metric Units' : 'Imperial Units'}
          </span>
        </div>
      </div>

      {/* Explicit Formula Box */}
      <div className="bg-[#F4F5F7] border-2 border-[#000000] p-4 sm:p-5 mb-6">
        <span className="block text-[11px] font-black uppercase tracking-widest text-[#555555] mb-1">
          Mathematical Formula ({variantUnit.toUpperCase()})
        </span>
        <code className="text-[15px] sm:text-[17px] font-bold text-[#111111] font-mono break-words">
          {calculated.formula}
        </code>
      </div>

      {/* Plain Language Explanation */}
      <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#333333] mb-6">
        {calculated.explanation}
      </p>

      {/* Variable Breakdown */}
      <div className="mb-6">
        <h3 className="text-[14px] font-black uppercase tracking-wider text-[#111111] mb-3">
          Formula Variables Explained
        </h3>
        <dl className="grid grid-cols-1 gap-2.5">
          {calculated.variables.map((variable, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 bg-[#FAFAFA] border border-[#E0E0E0] p-3"
            >
              <dt className="text-[14px] font-bold font-mono text-[#FF5E00] shrink-0 min-w-[120px]">
                {variable.symbol}
              </dt>
              <dd className="text-[14px] text-[#444444] leading-snug">
                <strong className="text-[#111111]">{variable.name}:</strong> {variable.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Calculation Steps */}
      <div>
        <h3 className="text-[14px] font-black uppercase tracking-wider text-[#111111] mb-3">
          Step-by-Step Method
        </h3>
        <ol className="flex flex-col gap-2.5">
          {calculated.steps.map((step) => (
            <li
              key={step.stepNumber}
              className="flex items-start gap-3 text-[14px] text-[#333333] leading-relaxed"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-none bg-[#111111] text-white text-[12px] font-black shrink-0 mt-0.5">
                {step.stepNumber}
              </span>
              <span>
                <strong className="text-[#111111]">{step.name}:</strong> {step.instruction}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

function WorkedExampleBlock({
  example,
  variantUnit,
}: {
  example: UnitWorkedExample;
  variantUnit: 'metric' | 'imperial';
}) {
  return (
    <>
      <div className="flex items-center gap-3 border-b-2 border-[#000000] pb-3 mb-6">
        <div className="w-9 h-9 bg-[#111111] text-white flex items-center justify-center font-black text-[18px] shrink-0 border border-[#000000]">
          <CheckCircle2 className="w-5 h-5 text-[#FF5E00]" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
          <h2 className="text-[20px] sm:text-[24px] font-black uppercase tracking-tight text-[#111111]">
            {example.title}
          </h2>
          <span className="text-[11px] font-black uppercase tracking-widest text-[#555555] bg-[#F4F5F7] px-2 py-0.5 border border-[#CCCCCC] w-fit">
            {variantUnit === 'metric' ? 'Metric Example' : 'Imperial Example'}
          </span>
        </div>
      </div>

      <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[#333333] mb-6">
        {example.scenario}
      </p>

      {/* Step-by-step breakdown */}
      <div className="flex flex-col gap-2 mb-6">
        {example.steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 bg-[#F4F5F7] border border-[#CCCCCC] px-4 py-2.5"
          >
            <span className="text-[14px] font-bold text-[#111111]">
              {step.label}
            </span>
            <div className="flex items-center gap-2 font-mono text-[14px]">
              <span className="text-[#555555]">{step.formula}</span>
              <span className="text-[#111111] font-bold">=</span>
              <span className="text-[#FF5E00] font-black">{step.result}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#FFF8F0] border-2 border-[#FF5E00] p-4 text-[14px] sm:text-[15px] font-medium text-[#111111] leading-relaxed">
        <strong className="text-[#FF5E00] font-black uppercase tracking-wide mr-1">Result:</strong>
        {example.summary}
      </div>
    </>
  );
}

export function CalculatorContentSection({ content }: CalculatorContentSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { unit } = useUnit();

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const metricCalculated = content.howItCalculated.metric;
  const imperialCalculated = content.howItCalculated.imperial;
  const metricExample = content.workedExample.metric;
  const imperialExample = content.workedExample.imperial;

  return (
    <div className="w-full max-w-[800px] flex flex-col gap-10 mt-6 px-4">
      {/* 1. HOW IT'S CALCULATED */}
      <section
        id="how-its-calculated"
        className="bg-white border-2 border-[#000000] p-6 sm:p-8 shadow-[4px_4px_0_0_#000000]"
      >
        {/* Metric Variant (always in DOM for search indexing; toggled via CSS) */}
        <div
          className={unit === 'metric' ? 'block' : 'hidden'}
          aria-hidden={unit !== 'metric'}
        >
          <CalculatedContentBlock calculated={metricCalculated} variantUnit="metric" />
        </div>

        {/* Imperial Variant (always in DOM for search indexing; toggled via CSS) */}
        <div
          className={unit === 'imperial' ? 'block' : 'hidden'}
          aria-hidden={unit !== 'imperial'}
        >
          <CalculatedContentBlock calculated={imperialCalculated} variantUnit="imperial" />
        </div>
      </section>

      {/* 2. WORKED EXAMPLE */}
      <section
        id="worked-example"
        className="bg-white border-2 border-[#000000] p-6 sm:p-8 shadow-[4px_4px_0_0_#000000]"
      >
        {/* Metric Example (always in DOM for search indexing; toggled via CSS) */}
        <div
          className={unit === 'metric' ? 'block' : 'hidden'}
          aria-hidden={unit !== 'metric'}
        >
          <WorkedExampleBlock example={metricExample} variantUnit="metric" />
        </div>

        {/* Imperial Example (always in DOM for search indexing; toggled via CSS) */}
        <div
          className={unit === 'imperial' ? 'block' : 'hidden'}
          aria-hidden={unit !== 'imperial'}
        >
          <WorkedExampleBlock example={imperialExample} variantUnit="imperial" />
        </div>
      </section>

      {/* 3. COMMON MISTAKES */}
      <section
        id="common-mistakes"
        className="bg-white border-2 border-[#000000] p-6 sm:p-8 shadow-[4px_4px_0_0_#000000]"
      >
        <div className="flex items-center gap-3 border-b-2 border-[#000000] pb-3 mb-6">
          <div className="w-9 h-9 bg-[#111111] text-white flex items-center justify-center font-black text-[18px] shrink-0 border border-[#000000]">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-[20px] sm:text-[24px] font-black uppercase tracking-tight text-[#111111]">
            Common Calculation Mistakes to Avoid
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {content.commonMistakes.map((item, idx) => (
            <div
              key={idx}
              className="border-2 border-[#000000] bg-[#FAFAFA] p-4 sm:p-5"
            >
              <h3 className="text-[16px] font-black text-[#111111] mb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-[#FF5E00] text-white text-[11px] font-black flex items-center justify-center shrink-0">
                  !
                </span>
                {item.title}
              </h3>
              <p className="text-[14px] text-[#444444] leading-relaxed mb-2">
                <strong className="text-[#111111]">Why it matters:</strong> {item.whyItMatters}
              </p>
              <p className="text-[14px] text-[#111111] leading-relaxed bg-white border border-[#DDDDDD] p-2.5">
                <strong className="text-[#0056D2]">How to avoid it:</strong> {item.howToAvoid}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section
        id="faq"
        className="bg-white border-2 border-[#000000] p-6 sm:p-8 shadow-[4px_4px_0_0_#000000]"
      >
        <div className="flex items-center gap-3 border-b-2 border-[#000000] pb-3 mb-6">
          <div className="w-9 h-9 bg-[#0056D2] text-white flex items-center justify-center font-black text-[18px] shrink-0 border border-[#000000]">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-[20px] sm:text-[24px] font-black uppercase tracking-tight text-[#111111]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {content.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border-2 border-[#000000] bg-white transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-[15px] sm:text-[16px] text-[#111111] hover:bg-[#F4F5F7] transition-colors"
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx}`}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FF5E00] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-ans-${idx}`}
                    className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 text-[14px] sm:text-[15px] leading-[1.7] text-[#444444] border-t border-[#E5E5E5] bg-[#FAFAFA]"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
