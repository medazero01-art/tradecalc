'use client';

import React, { useState } from 'react';
import { CalculatorContainer } from '@/components/ui/CalculatorContainer';
import { InputField } from '@/components/ui/InputField';
import { UnitToggle } from '@/components/ui/UnitToggle';
import { ResultDisplay } from '@/components/ui/ResultDisplay';

export function TileCoverage() {
  const [unit, setUnit] = useState('imperial'); // 'imperial' or 'metric'
  const [areaLength, setAreaLength] = useState<string>('10');
  const [areaWidth, setAreaWidth] = useState<string>('10');
  const [tileLength, setTileLength] = useState<string>('12');
  const [tileWidth, setTileWidth] = useState<string>('12');
  const [waste, setWaste] = useState<string>('10'); // 10% waste
  
  const al = parseFloat(areaLength);
  const aw = parseFloat(areaWidth);
  const tl = parseFloat(tileLength);
  const tw = parseFloat(tileWidth);
  const w = parseFloat(waste);

  let tiles = 0;
  let sqft = 0;

  if (!isNaN(al) && !isNaN(aw) && !isNaN(tl) && !isNaN(tw) && !isNaN(w) && al > 0 && aw > 0 && tl > 0 && tw > 0 && w >= 0) {
    let areaSqFt = 0;
    let tileSqFt = 0;

    if (unit === 'imperial') {
      // Area in sq ft
      areaSqFt = al * aw;
      // Tile in sq inches -> sq ft
      tileSqFt = (tl * tw) / 144;
    } else {
      // Area in sq meters
      const areaSqM = al * aw;
      areaSqFt = areaSqM * 10.7639; // convert m2 to sqft
      // Tile in sq cm -> sq meters -> sq ft
      const tileSqM = (tl * tw) / 10000;
      tileSqFt = tileSqM * 10.7639;
    }

    const baseTiles = areaSqFt / tileSqFt;
    tiles = Math.ceil(baseTiles * (1 + (w / 100)));
    sqft = Number(areaSqFt.toFixed(2));
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
        <h3 className="text-[16px] font-bold uppercase text-[#111111] border-b-2 border-[#000000] pb-1">Area Dimensions</h3>
        <InputField
          label="Area Length"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={areaLength}
          onChange={(e) => setAreaLength(e.target.value)}
          onClear={() => setAreaLength('')}
        />
        <InputField
          label="Area Width"
          unit={unit === 'imperial' ? 'ft' : 'm'}
          value={areaWidth}
          onChange={(e) => setAreaWidth(e.target.value)}
          onClear={() => setAreaWidth('')}
        />
        
        <h3 className="text-[16px] font-bold uppercase text-[#111111] border-b-2 border-[#000000] pb-1 mt-4">Tile Dimensions</h3>
        <InputField
          label="Tile Length"
          unit={unit === 'imperial' ? 'in' : 'cm'}
          value={tileLength}
          onChange={(e) => setTileLength(e.target.value)}
          onClear={() => setTileLength('')}
        />
        <InputField
          label="Tile Width"
          unit={unit === 'imperial' ? 'in' : 'cm'}
          value={tileWidth}
          onChange={(e) => setTileWidth(e.target.value)}
          onClear={() => setTileWidth('')}
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
        label="Total Tiles Needed"
        value={tiles > 0 ? tiles : '-'}
        subValue={sqft > 0 ? `(Total Area: ${sqft} sq ft)` : undefined}
      />
    </CalculatorContainer>
  );
}
