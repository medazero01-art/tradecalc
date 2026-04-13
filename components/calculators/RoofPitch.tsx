'use client';

import React, { useState } from 'react';
import { CalculatorContainer } from '@/components/ui/CalculatorContainer';
import { InputField } from '@/components/ui/InputField';
import { UnitToggle } from '@/components/ui/UnitToggle';
import { ResultDisplay } from '@/components/ui/ResultDisplay';

export function RoofPitch() {
  const [unit, setUnit] = useState('imperial'); // 'imperial' or 'metric'
  const [rise, setRise] = useState<string>('4');
  const [run, setRun] = useState<string>('12');
  
  const r = parseFloat(rise);
  const rn = parseFloat(run);

  let pitch = '-';
  let multiplier = 0;

  if (!isNaN(r) && !isNaN(rn) && r > 0 && rn > 0) {
    // Pitch is rise/run.
    pitch = `${r}/${rn}`;
    
    // Multiplier = sqrt(rise^2 + run^2) / run
    multiplier = Number((Math.sqrt(Math.pow(r, 2) + Math.pow(rn, 2)) / rn).toFixed(3));
  }

  return (
    <CalculatorContainer>
      <UnitToggle
        units={[
          { id: 'imperial', label: 'Inches' },
          { id: 'metric', label: 'CM' }
        ]}
        activeUnit={unit}
        onChange={setUnit}
        className="mb-6"
      />

      <div className="flex flex-col gap-4 mb-8">
        <InputField
          label="Rise"
          unit={unit === 'imperial' ? 'in' : 'cm'}
          value={rise}
          onChange={(e) => setRise(e.target.value)}
          onClear={() => setRise('')}
        />
        <InputField
          label="Run"
          unit={unit === 'imperial' ? 'in' : 'cm'}
          value={run}
          onChange={(e) => setRun(e.target.value)}
          onClear={() => setRun('')}
        />
      </div>

      <ResultDisplay
        label="Roof Pitch Multiplier"
        value={multiplier > 0 ? multiplier : '-'}
        subValue={pitch !== '-' ? `(Pitch: ${pitch})` : undefined}
      />
    </CalculatorContainer>
  );
}
