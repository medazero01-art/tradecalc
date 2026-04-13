import { ConcreteSlab } from './ConcreteSlab';
import { RoofPitch } from './RoofPitch';
import { TileCoverage } from './TileCoverage';
import { DrywallSheet } from './DrywallSheet';
import { PaintCoverage } from './PaintCoverage';
import { DeckBoard } from './DeckBoard';
import { LaminateFlooring } from './LaminateFlooring';
import { ConcreteFooting } from './ConcreteFooting';

export const CalculatorRegistry = {
  'concrete-slab': ConcreteSlab,
  'concrete-footing': ConcreteFooting,
  'roof-pitch': RoofPitch,
  'tile-coverage': TileCoverage,
  'drywall-sheet': DrywallSheet,
  'paint-coverage': PaintCoverage,
  'deck-board': DeckBoard,
  'laminate-flooring': LaminateFlooring,
  // Add more calculators here as they are implemented
};
