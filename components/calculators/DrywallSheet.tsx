'use client';

import React, { useState } from 'react';
import { useUnit } from '@/context/UnitContext';
import { CalculatorContainer } from '@/components/ui/CalculatorContainer';
import { InputField } from '@/components/ui/InputField';
import { UnitToggle } from '@/components/ui/UnitToggle';
import { ResultDisplay } from '@/components/ui/ResultDisplay';

export function DrywallSheet() {
  const { unit, setUnit } = useUnit();
  const [length, setLength] = useState<string>('12');
  const [width, setWidth] = useState<string>('12');
  const [height, setHeight] = useState<string>('8');
  const [sheetSize, setSheetSize] = useState<string>('4x8'); // '4x8' or '4x12'
  
  const l = parseFloat(length);
  const w = parseFloat(width);
  const h = parseFloat(height);

  let sheets = 0;
  let sqft = 0;

  if (!isNaN(l) && !isNaN(w) && !isNaN(h) && l > 0 && w > 0 && h > 0) {
    let totalAreaSqFt = 0;

    if (unit === 'imperial') {
      // Walls: 2 * (l * h) + 2 * (w * h)
      // Ceiling: l * w
      totalAreaSqFt = (2 * l * h) + (2 * w * h) + (l * w);
    } else {
      // Convert meters to feet first
      const lFt = l * 3.28084;
      const wFt = w * 3.28084;
      const hFt = h * 3.28084;
      totalAreaSqFt = (2 * lFt * hFt) + (2 * wFt * hFt) + (lFt * wFt);
    }

    // Add 10% waste
    const areaWithWaste = totalAreaSqFt * 1.1;
    
    // Sheet size in sq ft
    const sheetArea = sheetSize === '4x8' ? 32 : 48;
    
    sheets = Math.ceil(areaWithWaste / sheetArea);
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
          label="Ceiling Height"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          onClear={() => setHeight('')}
        />
        
        <h3 className="text-[16px] font-bold uppercase text-[#111111] border-b-2 border-[#000000] pb-1 mt-4">Sheet Size</h3>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setSheetSize('4x8')}
            className={`flex-1 h-[48px] border-2 border-[#000000] text-[16px] font-bold uppercase transition-colors ${sheetSize === '4x8' ? 'bg-[#FF5E00] text-white' : 'bg-white text-[#111111] hover:bg-[#F4F5F7]'}`}
          >
            4&apos; x 8&apos;
          </button>
          <button
            type="button"
            onClick={() => setSheetSize('4x12')}
            className={`flex-1 h-[48px] border-2 border-[#000000] text-[16px] font-bold uppercase transition-colors ${sheetSize === '4x12' ? 'bg-[#FF5E00] text-white' : 'bg-white text-[#111111] hover:bg-[#F4F5F7]'}`}
          >
            4&apos; x 12&apos;
          </button>
        </div>
      </div>

      <ResultDisplay
        label={`Sheets of ${sheetSize} Drywall`}
        value={sheets > 0 ? sheets : '-'}
        subValue={sqft > 0 ? `(Total Area: ${sqft} sq ft + 10% waste)` : undefined}
      />
    </CalculatorContainer>
  );
}
