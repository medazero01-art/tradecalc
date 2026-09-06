'use client';

import React, { useState } from 'react';
import { useUnit } from '@/context/UnitContext';
import { CalculatorContainer } from '@/components/ui/CalculatorContainer';
import { InputField } from '@/components/ui/InputField';
import { UnitToggle } from '@/components/ui/UnitToggle';
import { ResultDisplay } from '@/components/ui/ResultDisplay';

export function DeckBoard() {
  const { unit, setUnit } = useUnit();
  const [length, setLength] = useState<string>('12');
  const [width, setWidth] = useState<string>('12');
  const [boardWidth, setBoardWidth] = useState<string>('5.5'); // standard 6" board is 5.5"
  const [boardLength, setBoardLength] = useState<string>('12'); // 12ft boards
  const [spacing, setSpacing] = useState<string>('0.125'); // 1/8 inch spacing
  const [waste, setWaste] = useState<string>('10'); // 10% waste
  
  const l = parseFloat(length);
  const w = parseFloat(width);
  const bw = parseFloat(boardWidth);
  const bl = parseFloat(boardLength);
  const s = parseFloat(spacing);
  const wst = parseFloat(waste);

  let boards = 0;
  let sqft = 0;

  if (!isNaN(l) && !isNaN(w) && !isNaN(bw) && !isNaN(bl) && !isNaN(s) && !isNaN(wst) && l > 0 && w > 0 && bw > 0 && bl > 0 && s >= 0 && wst >= 0) {
    let totalAreaSqFt = 0;
    let boardAreaSqFt = 0;

    if (unit === 'imperial') {
      totalAreaSqFt = l * w;
      // Board width + spacing in inches, converted to feet
      const effectiveBoardWidthFt = (bw + s) / 12;
      boardAreaSqFt = effectiveBoardWidthFt * bl;
    } else {
      // Convert meters to feet
      const lFt = l * 3.28084;
      const wFt = w * 3.28084;
      totalAreaSqFt = lFt * wFt;
      
      // Board width + spacing in cm, converted to feet
      const effectiveBoardWidthFt = ((bw + s) / 2.54) / 12;
      // Board length in meters, converted to feet
      const blFt = bl * 3.28084;
      boardAreaSqFt = effectiveBoardWidthFt * blFt;
    }

    const baseBoards = totalAreaSqFt / boardAreaSqFt;
    boards = Math.ceil(baseBoards * (1 + (wst / 100)));
    sqft = Number(totalAreaSqFt.toFixed(2));
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
        <h3 className="text-[16px] font-bold uppercase text-[#111111] border-b-2 border-[#000000] pb-1">Deck Dimensions</h3>
        <InputField
          label="Deck Length"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          onClear={() => setLength('')}
        />
        <InputField
          label="Deck Width"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          onClear={() => setWidth('')}
        />
        
        <h3 className="text-[16px] font-bold uppercase text-[#111111] border-b-2 border-[#000000] pb-1 mt-4">Board Details</h3>
        <InputField
          label="Board Width"
          unit={unit === 'imperial' ? 'in' : 'cm'}
          value={boardWidth}
          onChange={(e) => setBoardWidth(e.target.value)}
          onClear={() => setBoardWidth('')}
        />
        <InputField
          label="Board Length"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={boardLength}
          onChange={(e) => setBoardLength(e.target.value)}
          onClear={() => setBoardLength('')}
        />
        <InputField
          label="Gap Spacing"
          unit={unit === 'imperial' ? 'in' : 'cm'}
          value={spacing}
          onChange={(e) => setSpacing(e.target.value)}
          onClear={() => setSpacing('')}
        />
        
        <h3 className="text-[16px] font-bold uppercase text-[#111111] border-b-2 border-[#000000] pb-1 mt-4">Waste Factor</h3>
        <InputField
          label="Waste Percentage"
          unit="%"
          value={waste}
          onChange={(e) => setWaste(e.target.value)}
          onClear={() => setWaste('')}
        />
      </div>

      <ResultDisplay
        label="Deck Boards Needed"
        value={boards > 0 ? boards : '-'}
        subValue={sqft > 0 ? `(Total Area: ${sqft} sq ft)` : undefined}
      />
    </CalculatorContainer>
  );
}
