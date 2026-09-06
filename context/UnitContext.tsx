'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UnitSystem = 'metric' | 'imperial';

interface UnitContextType {
  unit: UnitSystem;
  setUnit: (unit: UnitSystem | string) => void;
  isMetric: boolean;
  isImperial: boolean;
}

const STORAGE_KEY = 'tradecalc_unit_system';

/**
 * Determine default unit system from browser locale on first visit:
 * - en-US and US-region tags -> 'imperial'
 * - en-GB, fr-FR, and most other global locales -> 'metric'
 */
function getLocaleDefaultUnit(): UnitSystem {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'metric';
  }

  const locales: string[] = [];
  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
    locales.push(...navigator.languages);
  } else if (navigator.language) {
    locales.push(navigator.language);
  }

  for (const loc of locales) {
    if (!loc) continue;
    const cleaned = loc.replace('_', '-').trim();
    const parts = cleaned.split('-');
    const region = parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';

    // Check for US and countries adhering to US Customary / Imperial
    if (region === 'US' || region === 'LR' || region === 'MM') {
      return 'imperial';
    }

    if (cleaned.toLowerCase() === 'en-us') {
      return 'imperial';
    }
  }

  return 'metric';
}

const UnitContext = createContext<UnitContextType>({
  unit: 'metric',
  setUnit: () => {},
  isMetric: true,
  isImperial: false,
});

export function UnitProvider({ children }: { children: React.ReactNode }) {
  // Start with 'metric' during SSR to match hydration baseline
  const [unit, setUnitState] = useState<UnitSystem>('metric');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      // 1. Check if user already explicitly chose a unit in a past visit
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'imperial' || saved === 'metric') {
        setUnitState(saved);
        return;
      }

      // Check cookie fallback
      const cookieMatch = document.cookie.match(new RegExp('(^| )' + STORAGE_KEY + '=([^;]+)'));
      if (cookieMatch && (cookieMatch[2] === 'imperial' || cookieMatch[2] === 'metric')) {
        setUnitState(cookieMatch[2] as UnitSystem);
        return;
      }
    } catch {
      // Ignore storage errors in restricted iframe/browser modes
    }

    // 2. On first visit with no explicit user override: derive from browser locale
    const localeDefault = getLocaleDefaultUnit();
    setUnitState(localeDefault);
  }, []);

  const setUnit = (newUnit: UnitSystem | string) => {
    const validUnit: UnitSystem = newUnit === 'imperial' ? 'imperial' : 'metric';
    setUnitState(validUnit);
    try {
      localStorage.setItem(STORAGE_KEY, validUnit);
    } catch {
      // Ignore localStorage write errors
    }
    try {
      document.cookie = `${STORAGE_KEY}=${validUnit};path=/;max-age=31536000;SameSite=Lax`;
    } catch {
      // Ignore cookie write errors
    }
  };

  return (
    <UnitContext.Provider
      value={{
        unit,
        setUnit,
        isMetric: unit === 'metric',
        isImperial: unit === 'imperial',
      }}
    >
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit(): UnitContextType {
  return useContext(UnitContext);
}
