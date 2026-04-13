'use client';

import React, { useState } from 'react';
import { CalculatorContainer } from '@/components/ui/CalculatorContainer';
import { InputField } from '@/components/ui/InputField';
import { UnitToggle } from '@/components/ui/UnitToggle';
import { ResultDisplay } from '@/components/ui/ResultDisplay';

export function LaminateFlooring() {
  const [unit, setUnit] = useState('imperial'); // 'imperial' or 'metric'
  const [length, setLength] = useState<string>('12');
  const [width, setWidth] = useState<string>('12');
  const [boxCoverage, setBoxCoverage] = useState<string>('24'); // sq ft per box
  const [waste, setWaste] = useState<string>('10'); // 10% waste
  
  const l = parseFloat(length);
  const w = parseFloat(width);
  const bc = parseFloat(boxCoverage);
  const wst = parseFloat(waste);

  let boxes = 0;
  let sqft = 0;

  if (!isNaN(l) && !isNaN(w) && !isNaN(bc) && !isNaN(wst) && l > 0 && w > 0 && bc > 0 && wst >= 0) {
    let totalAreaSqFt = 0;

    if (unit === 'imperial') {
      totalAreaSqFt = l * w;
    } else {
      // Convert meters to feet
      const lFt = l * 3.28084;
      const wFt = w * 3.28084;
      totalAreaSqFt = lFt * wFt;
    }

    const areaWithWaste = totalAreaSqFt * (1 + (wst / 100));
    
    // Box coverage is assumed to be in sq ft if imperial, or sq m if metric.
    let effectiveBoxCoverage = bc;
    if (unit === 'metric') {
      // If user enters 2.2 sq meters per box, we convert it to sq ft for calculation
      effectiveBoxCoverage = bc * 10.7639;
    }

    boxes = Math.ceil(areaWithWaste / effectiveBoxCoverage);
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
        
        <h3 className="text-[16px] font-bold uppercase text-[#111111] border-b-2 border-[#000000] pb-1 mt-4">Material Details</h3>
        <InputField
          label="Coverage per Box"
          unit={unit === 'imperial' ? 'sq ft' : 'sq m'}
          value={boxCoverage}
          onChange={(e) => setBoxCoverage(e.target.value)}
          onClear={() => setBoxCoverage('')}
        />
        <InputField
          label="Waste Percentage"
          unit="%"
          value={waste}
          onChange={(e) => setWaste(e.target.value)}
          onClear={() => setWaste('')}
        />
      </div>

      <ResultDisplay
        label="Boxes of Flooring"
        value={boxes > 0 ? boxes : '-'}
        subValue={sqft > 0 ? `(Total Area: ${sqft} sq ft)` : undefined}
      />
    </CalculatorContainer>
  );
}
