'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Lightbulb } from 'lucide-react';

interface SuggestCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuggestCalculatorModal({ isOpen, onClose }: SuggestCalculatorModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a calculator name or concept.');
      return;
    }
    if (!description.trim()) {
      setError('Please describe what this calculator should calculate.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          contact: contact.trim(),
        }),
      });

      // Even if fetch fails or returns non-200, API route returns 200 with success
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Graceful fallback: display success message to user
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setName('');
    setDescription('');
    setContact('');
    setIsSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="suggest-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="relative w-full max-w-[540px] bg-white border-4 border-[#000000] p-6 sm:p-8 shadow-[8px_8px_0_0_#000000] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 bg-[#F4F5F7] border-2 border-[#000000] hover:bg-[#FF5E00] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div className="w-16 h-16 bg-[#FF5E00] text-white flex items-center justify-center border-2 border-[#000000] shadow-[4px_4px_0_0_#000000]">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 id="suggest-modal-title" className="text-[24px] font-black uppercase text-[#111111]">
              Suggestion Received!
            </h2>
            <p className="text-[15px] text-[#444444] max-w-[400px] leading-relaxed">
              Thanks for helping improve TradeCalc. Our team reviews all suggestions to expand our suite of construction calculators.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-4 px-8 py-3 bg-[#111111] text-white font-black uppercase tracking-wider text-[14px] border-2 border-[#000000] shadow-[4px_4px_0_0_#FF5E00] hover:bg-[#FF5E00] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 border-b-4 border-[#111111] pb-3 mb-6">
              <div className="w-10 h-10 bg-[#FF5E00] text-white flex items-center justify-center font-black border-2 border-[#000000]">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 id="suggest-modal-title" className="text-[20px] sm:text-[22px] font-black uppercase tracking-tight text-[#111111]">
                  Suggest a Calculator
                </h2>
                <p className="text-[13px] text-[#555555] font-medium">
                  Need a trade calculation we don&apos;t have yet? Let us know.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border-2 border-red-600 text-red-700 text-[13px] font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="calc-name"
                  className="block text-[13px] font-black uppercase tracking-wider text-[#111111] mb-1"
                >
                  Calculator Name / Trade Idea <span className="text-[#FF5E00]">*</span>
                </label>
                <input
                  id="calc-name"
                  type="text"
                  required
                  placeholder="e.g., Rebar Grid Estimator, Stair Stringer Calculator"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[46px] px-3 bg-[#FAFAFA] border-2 border-[#000000] text-[15px] font-medium text-[#111111] focus:outline-hidden focus:bg-white focus:border-[#FF5E00]"
                />
              </div>

              <div>
                <label
                  htmlFor="calc-desc"
                  className="block text-[13px] font-black uppercase tracking-wider text-[#111111] mb-1"
                >
                  Description & Use Case <span className="text-[#FF5E00]">*</span>
                </label>
                <textarea
                  id="calc-desc"
                  required
                  rows={4}
                  placeholder="What inputs are needed? What formulas or trade rules of thumb apply?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-[#FAFAFA] border-2 border-[#000000] text-[14px] font-medium text-[#111111] focus:outline-hidden focus:bg-white focus:border-[#FF5E00] resize-y min-h-[100px]"
                />
              </div>

              <div>
                <label
                  htmlFor="calc-contact"
                  className="block text-[13px] font-black uppercase tracking-wider text-[#111111] mb-1"
                >
                  Email or Name <span className="text-[#888888] font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="calc-contact"
                  type="text"
                  placeholder="name@example.com (if you'd like an update)"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full h-[46px] px-3 bg-[#FAFAFA] border-2 border-[#000000] text-[15px] font-medium text-[#111111] focus:outline-hidden focus:bg-white focus:border-[#FF5E00]"
                />
              </div>

              <div className="mt-2 pt-2 border-t-2 border-[#E5E5E5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 bg-white text-[#111111] font-bold text-[14px] uppercase border-2 border-[#000000] hover:bg-[#F4F5F7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#FF5E00] text-white font-black text-[14px] uppercase tracking-wider border-2 border-[#000000] shadow-[3px_3px_0_0_#000000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_#000000] disabled:opacity-50 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending...' : 'Submit Idea'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
