'use client';

import React, { useState } from 'react';
import { useUnit } from '@/context/UnitContext';
import { CalculatorContainer } from '@/components/ui/CalculatorContainer';
import { InputField } from '@/components/ui/InputField';
import { UnitToggle } from '@/components/ui/UnitToggle';
import { ResultDisplay } from '@/components/ui/ResultDisplay';

export function PaintCoverage() {
  const { unit, setUnit } = useUnit();
  const [length, setLength] = useState<string>('12');
  const [width, setWidth] = useState<string>('12');
  const [height, setHeight] = useState<string>('8');
  const [coats, setCoats] = useState<string>('2');
  
  const l = parseFloat(length);
  const w = parseFloat(width);
  const h = parseFloat(height);
  const c = parseFloat(coats);

  let gallons = 0;
  let sqft = 0;

  if (!isNaN(l) && !isNaN(w) && !isNaN(h) && !isNaN(c) && l > 0 && w > 0 && h > 0 && c > 0) {
    let totalAreaSqFt = 0;

    if (unit === 'imperial') {
      // Walls: 2 * (l * h) + 2 * (w * h)
      totalAreaSqFt = (2 * l * h) + (2 * w * h);
    } else {
      // Convert meters to feet first
      const lFt = l * 3.28084;
      const wFt = w * 3.28084;
      const hFt = h * 3.28084;
      totalAreaSqFt = (2 * lFt * hFt) + (2 * wFt * hFt);
    }

    // 1 gallon of paint covers ~350 sq ft
    const coveragePerGallon = 350;
    const totalSqFtWithCoats = totalAreaSqFt * c;
    gallons = Math.ceil(totalSqFtWithCoats / coveragePerGallon);
    sqft = Number(totalAreaSqFt.toFixed(2));
  }

  return (
    <CalculatorContainer>
      <UnitToggle
        units={[
          { id: 'imperial', label: 'Feet' },
          { id: 'metric', label: 'Meters' }
        ]}
        activeUnit={unit}
        onChange={setUnit}
        className="mb-6"
      />

      <div className="flex flex-col gap-4 mb-8">
        <h3 className="text-[16px] font-bold uppercase text-[#111111] border-b-2 border-[#000000] pb-1">Room Dimensions</h3>
        <InputField
          label="Room Length"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          onClear={() => setLength('')}
        />
        <InputField
          label="Room Width"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          onClear={() => setWidth('')}
        />
        <InputField
          label="Wall Height"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          onClear={() => setHeight('')}
        />
        
        <h3 className="text-[16px] font-bold uppercase text-[#111111] border-b-2 border-[#000000] pb-1 mt-4">Coats</h3>
        <InputField
          label="Number of Coats"
          value={coats}
          onChange={(e) => setCoats(e.target.value)}
          onClear={() => setCoats('')}
        />
      </div>

      <ResultDisplay
        label="Gallons of Paint"
        value={gallons > 0 ? gallons : '-'}
        subValue={sqft > 0 ? `(Total Area: ${sqft} sq ft)` : undefined}
      />
    </CalculatorContainer>
  );
}
