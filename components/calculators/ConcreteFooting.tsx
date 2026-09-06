'use client';

import React, { useState } from 'react';
import { useUnit } from '@/context/UnitContext';
import { CalculatorContainer } from '@/components/ui/CalculatorContainer';
import { InputField } from '@/components/ui/InputField';
import { UnitToggle } from '@/components/ui/UnitToggle';
import { ResultDisplay } from '@/components/ui/ResultDisplay';

export function ConcreteFooting() {
  const { unit, setUnit } = useUnit();
  const [length, setLength] = useState<string>('20');
  const [width, setWidth] = useState<string>('16'); // width in inches
  const [depth, setDepth] = useState<string>('8'); // depth in inches
  
  const l = parseFloat(length);
  const w = parseFloat(width);
  const d = parseFloat(depth);

  let bags = 0;
  let yards = 0;

  if (!isNaN(l) && !isNaN(w) && !isNaN(d) && l > 0 && w > 0 && d > 0) {
    let volumeCubicYards = 0;

    if (unit === 'imperial') {
      // l(ft) * w(in) * d(in)
      const volumeCubicFeet = l * (w / 12) * (d / 12);
      volumeCubicYards = volumeCubicFeet / 27;
    } else {
      // l(m) * w(cm) * d(cm)
      const volumeCubicMeters = l * (w / 100) * (d / 100);
      volumeCubicYards = volumeCubicMeters * 1.30795; // convert m3 to yd3
    }

    // Rough estimate: 1 cubic yard = ~45 bags of 80lb concrete
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
          label="Total Length"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          onClear={() => setLength('')}
        />
        <InputField
          label="Footing Width"
          unit={unit === 'imperial' ? 'in' : 'cm'}
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          onClear={() => setWidth('')}
        />
        <InputField
          label="Footing Depth"
          unit={unit === 'imperial' ? 'in' : 'cm'}
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          onClear={() => setDepth('')}
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
