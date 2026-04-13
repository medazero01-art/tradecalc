'use client';

import React, { useState } from 'react';
import { CalculatorContainer } from '@/components/ui/CalculatorContainer';
import { InputField } from '@/components/ui/InputField';
import { UnitToggle } from '@/components/ui/UnitToggle';
import { ResultDisplay } from '@/components/ui/ResultDisplay';

export function ConcreteSlab() {
  const [unit, setUnit] = useState('imperial'); // 'imperial' or 'metric'
  const [length, setLength] = useState<string>('10');
  const [width, setWidth] = useState<string>('10');
  const [thickness, setThickness] = useState<string>('4');
  
  const l = parseFloat(length);
  const w = parseFloat(width);
  const t = parseFloat(thickness);

  let bags = 0;
  let yards = 0;

  if (!isNaN(l) && !isNaN(w) && !isNaN(t) && l > 0 && w > 0 && t > 0) {
    let volumeCubicYards = 0;

    if (unit === 'imperial') {
      // l(ft) * w(ft) * t(in)
      const volumeCubicFeet = l * w * (t / 12);
      volumeCubicYards = volumeCubicFeet / 27;
    } else {
      // l(m) * w(m) * t(cm)
      const volumeCubicMeters = l * w * (t / 100);
      volumeCubicYards = volumeCubicMeters * 1.30795; // convert m3 to yd3
    }

    // Rough estimate: 1 cubic yard = ~45 bags of 80lb concrete (actually 40.5, but let's use 45 for safety/waste)
    // Actually, 1 bag of 80lb concrete yields ~0.6 cubic feet.
    // 1 cubic yard = 27 cubic feet. 27 / 0.6 = 45 bags.
    bags = Math.ceil(volumeCubicYards * 45);
    yards = Number(volumeCubicYards.toFixed(2));
  }

  return (
    <CalculatorContainer>
      <UnitToggle
        units={[
          { id: 'imperial', label: 'Feet/Inches' },
          { id: 'metric', label: 'Meters/CM' }
        ]}
        activeUnit={unit}
        onChange={setUnit}
        className="mb-6"
      />

      <div className="flex flex-col gap-4 mb-8">
        <InputField
          label="Length"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          onClear={() => setLength('')}
        />
        <InputField
          label="Width"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          onClear={() => setWidth('')}
        />
        <InputField
          label="Thickness"
          unit={unit === 'imperial' ? 'in' : 'cm'}
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
          onClear={() => setThickness('')}
        />
      </div>

      <ResultDisplay
        label="80lb/36Kg Bags of Concrete"
        value={bags > 0 ? bags : '-'}
        subValue={yards > 0 ? `(${yards} Cubic Yards)` : undefined}
      />
    </CalculatorContainer>
  );
}
