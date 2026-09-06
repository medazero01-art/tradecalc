export interface FormulaVariable {
  symbol: string;
  name: string;
  description: string;
}

export interface CalculationStep {
  stepNumber: number;
  name: string;
  instruction: string;
}

export interface UnitCalculatedContent {
  title: string;
  formula: string;
  explanation: string;
  variables: FormulaVariable[];
  steps: CalculationStep[];
}

export interface WorkedExampleStep {
  label: string;
  formula: string;
  result: string;
}

export interface UnitWorkedExample {
  title: string;
  scenario: string;
  steps: WorkedExampleStep[];
  summary: string;
}

export interface CommonMistake {
  title: string;
  whyItMatters: string;
  howToAvoid: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CrossCategoryRecommendation {
  id: string;
  name: string;
  category: string;
  slug: string;
  jobContext: string;
}

export interface CalculatorContent {
  id: string;
  category: string;
  slug: string;
  name: string;
  howItCalculated: {
    imperial: UnitCalculatedContent;
    metric: UnitCalculatedContent;
  };
  workedExample: {
    imperial: UnitWorkedExample;
    metric: UnitWorkedExample;
  };
  commonMistakes: CommonMistake[];
  faqs: FAQItem[];
  crossCategoryCalculators: CrossCategoryRecommendation[];
}

export const calculatorContentMap: Record<string, CalculatorContent> = {
  'concrete-slab': {
    id: 'concrete-slab',
    category: 'concrete',
    slug: 'slab-calculator',
    name: 'Concrete Slab Calculator',
    howItCalculated: {
      imperial: {
        title: "How Concrete Slab Volume is Calculated (Imperial)",
        formula: "Volume (cu yd) = [Length (ft) × Width (ft) × (Thickness (in) / 12)] ÷ 27",
        /* SOURCE: ASTM C387 / Quikrete Technical Data Sheet - 80 lb (36.2 kg) bag yields approx 0.60 cu ft (0.017 m³) of mixed concrete; 27 cu ft per cu yd ÷ 0.60 = 45 bags per cubic yard */
        explanation: "Concrete slab estimation begins by calculating the three-dimensional geometric volume in cubic feet, multiplying surface length by width and converting slab thickness into feet by dividing inches by 12. Because ready-mix concrete suppliers batch and sell material in cubic yards, this cubic-foot total is divided by 27. When mixing bagged concrete on site, pre-blended 80-pound concrete bags produce approximately 0.60 cubic feet of consolidated wet concrete after mixing with water. Dividing 27 cubic feet per cubic yard by 0.60 yields exactly 45 eighty-pound bags per cubic yard. The calculation determines neat solid volume inside rigid forms prior to ground unevenness, base compaction, or form deflection allowances.",
        variables: [
          { symbol: "Length (ft)", name: "Slab Length", description: "The longest horizontal dimension of the poured slab measured in feet along the inner form board." },
          { symbol: "Width (ft)", name: "Slab Width", description: "The perpendicular horizontal dimension measured in feet between opposing form faces." },
          { symbol: "Thickness (in)", name: "Slab Thickness", description: "The vertical depth of the slab pour measured in inches (typically 4 inches for patios or 6 inches for driveways)." },
          { symbol: "Volume (cu yd)", name: "Cubic Yards", description: "The neat three-dimensional volume divided by 27 cubic feet per yard." },
          { symbol: "Bags", name: "80lb Pre-mix Bags", description: "The quantity of pre-blended 80-pound dry concrete bags needed at 45 bags per cubic yard." }
        ],
        steps: [
          { stepNumber: 1, name: "Convert Thickness to Feet", instruction: "Divide the slab thickness in inches by 12 to convert depth into decimal feet." },
          { stepNumber: 2, name: "Calculate Cubic Feet", instruction: "Multiply length in feet by width in feet by decimal thickness in feet to obtain total cubic volume." },
          { stepNumber: 3, name: "Convert to Cubic Yards", instruction: "Divide total cubic feet by 27 to find ready-mix volume in cubic yards." },
          { stepNumber: 4, name: "Calculate Pre-mix Bags", instruction: "Multiply cubic yards by 45 to determine 80lb bag requirements." }
        ]
      },
      metric: {
        title: "How Concrete Slab Volume is Calculated (Metric)",
        formula: "Volume (m³) = Length (m) × Width (m) × [Thickness (cm) ÷ 100]",
        /* SOURCE: European / International standard batching practice (EN 206) - Ready-mix dispatched by m³. Pre-blended 25 kg bags yield approx 0.012 m³ (12 L); 1 m³ ÷ 0.012 m³ = ~84 bags. Standard 35 kg bags yield approx 0.017 m³; 1 m³ ÷ 0.017 m³ = ~59 bags. */
        explanation: "Concrete slab estimation calculates the geometric volume in cubic meters by multiplying length and width by thickness converted from centimeters to meters (divided by 100). Ready-mix concrete suppliers deliver and batch material in cubic meters. When mixing bagged concrete on site, standard 25 kg bags yield approximately 0.012 cubic meters (12 liters) of consolidated wet concrete, requiring roughly 84 bags per cubic meter, while 35 kg bags yield roughly 0.017 cubic meters, requiring roughly 59 bags per cubic meter. The calculation determines neat solid volume inside rigid forms prior to ground unevenness, base compaction, or form deflection allowances.",
        variables: [
          { symbol: "Length (m)", name: "Slab Length", description: "The longest horizontal dimension of the poured slab measured in meters along the inner form board." },
          { symbol: "Width (m)", name: "Slab Width", description: "The perpendicular horizontal dimension measured in meters between opposing form faces." },
          { symbol: "Thickness (cm)", name: "Slab Thickness", description: "The vertical depth of the slab pour measured in centimeters (typically 10 cm for patios or 15 cm for driveways)." },
          { symbol: "Volume (m³)", name: "Cubic Meters", description: "The neat three-dimensional concrete volume in cubic meters." },
          { symbol: "Bags (25kg)", name: "25kg Pre-mix Bags", description: "The quantity of 25 kg pre-mix bags required based on standard yield of 84 bags per cubic meter." }
        ],
        steps: [
          { stepNumber: 1, name: "Convert Thickness to Meters", instruction: "Divide the slab thickness in centimeters by 100 to convert depth into decimal meters." },
          { stepNumber: 2, name: "Calculate Cubic Meters", instruction: "Multiply length in meters by width in meters by decimal thickness in meters." },
          { stepNumber: 3, name: "Calculate Ready-mix or Bags", instruction: "Use total cubic meters for ready-mix dispatch, or multiply by 84 for standard 25kg pre-mix bags." },
          { stepNumber: 4, name: "Apply Contingency Buffer", instruction: "Add 10% extra volume to compensate for subbase unevenness and spillage." }
        ]
      }
    },
    workedExample: {
      imperial: {
        title: "Worked Example: 10ft × 12ft Patio Slab at 4 Inches",
        scenario: "Pouring a residential backyard patio slab measuring 10 feet wide by 12 feet long with a standard nominal thickness of 4 inches using bagged 80-pound concrete mix.",
        steps: [
          { label: "Thickness conversion", formula: "4 in ÷ 12", result: "0.333 ft" },
          { label: "Cubic feet volume", formula: "10 ft × 12 ft × 0.333 ft", result: "40.0 cu ft" },
          { label: "Cubic yards conversion", formula: "40.0 cu ft ÷ 27", result: "1.48 cu yd" },
          { label: "80lb bags calculation", formula: "1.48 cu yd × 45 bags/cu yd", result: "66.6 bags → 67 bags" }
        ],
        summary: "Neat volume requires 1.48 cubic yards or 67 eighty-pound bags. Adding a standard 10% contingency buffer for subbase variations and spillage brings the recommended order to 74 bags (or 1.65 cubic yards from a ready-mix truck)."
      },
      metric: {
        title: "Worked Example: 3m × 4m Patio Slab at 10 cm Depth",
        scenario: "Pouring a residential outdoor patio slab measuring 3.0 meters wide by 4.0 meters long at a standard thickness of 10 centimeters using ready-mix delivery or pre-mix bags.",
        steps: [
          { label: "Thickness conversion", formula: "10 cm ÷ 100", result: "0.10 m" },
          { label: "Cubic meters volume", formula: "3.0 m × 4.0 m × 0.10 m", result: "1.20 m³" },
          { label: "Ready-mix order", formula: "1.20 m³ neat volume", result: "1.20 m³" },
          { label: "25kg bags equivalent", formula: "1.20 m³ × 84 bags/m³", result: "100.8 bags → 101 bags" }
        ],
        summary: "Neat volume is 1.20 cubic meters (or 101 bags of 25kg pre-mix). Adding a standard 10% contingency for subbase variations brings the recommended order to 1.32 cubic meters of ready-mix (or 111 bags)."
      }
    },
    commonMistakes: [
      {
        title: "Ignoring Subbase Unevenness and Settlement",
        whyItMatters: "An uncompacted or wavy gravel base often sits deeper than anticipated, creating an 8% to 12% shortfall during the pour.",
        /* SOURCE: ACI 302.1R-15 "Guide to Concrete Floor and Slab Construction": 10% contingency allowance covers subgrade grading tolerance of ±1/2 in (12 mm) */
        howToAvoid: "Screed and tamp your crushed gravel base completely flat and add a minimum 10% overage to your order."
      },
      {
        title: "Multiplying Inches and Feet Directly",
        whyItMatters: "Multiplying 10 ft × 12 ft × 4 gives 480 instead of converting 4 inches to 0.333 feet, resulting in a 12-fold overestimation.",
        howToAvoid: "Always divide thickness inches by 12 before multiplying, or divide the final inch-foot product by 12."
      },
      {
        title: "Confusing 60-Pound and 80-Pound Bag Yields",
        /* SOURCE: ASTM C387: 80 lb yields 0.60 cu ft; 60 lb yields 0.45 cu ft */
        whyItMatters: "An 80 lb bag yields 0.60 cu ft while a 60 lb bag yields only 0.45 cu ft; buying 60 lb bags using 80 lb calculations leaves you 25% short.",
        howToAvoid: "Verify the exact net weight printed on the bag before ordering to match your mix yields."
      },
      {
        title: "Underestimating Form Board Deflection",
        whyItMatters: "Wet concrete exerts outward hydrostatic pressure, causing unsupported form boards to bow outward and consume surplus volume.",
        howToAvoid: "Drive wooden or steel stakes every 60 cm (24 inches) along form boards and brace all corners securely."
      }
    ],
    faqs: [
      {
        question: "How much extra concrete should I order for waste and uneven ground?",
        answer: "Order an extra 10% for residential slabs under 5 cubic yards (or under 4 m³), and 5% to 8% for larger commercial pours. This buffer protects you against subbase dips, form flex, and wheelbarrow spillage without leaving you short mid-pour."
      },
      {
        question: "How many pre-mix bags make one cubic yard or cubic meter?",
        /* SOURCE: ASTM C387 & EN 206 */
        answer: "Exactly 45 bags of 80-pound concrete mix yield one cubic yard (27 cubic feet) based on a yield of 0.60 cubic feet per bag. In metric regions, standard 25 kg bags yield approximately 12 liters (0.012 m³), meaning roughly 84 bags produce one cubic meter."
      },
      {
        question: "What is the standard thickness for residential concrete slabs?",
        answer: "Pedestrian walkways and residential patio slabs are typically poured 10 cm (4 inches) thick. Driveways, garage floors, and heavy equipment pads require 15 cm (6 inches) reinforced with steel rebar or welded mesh."
      },
      {
        question: "At what volume does ready-mix delivery become cheaper than bagged concrete?",
        answer: "Ready-mix truck delivery generally becomes cost-effective once your pour exceeds 1.5 to 2 cubic yards (roughly 1.2 to 1.5 m³, or 70 to 90 bags). Hand-mixing more than 50 bags risks physical fatigue and cold joints where early batches set before later ones are placed."
      },
      {
        question: "Can I use this calculator for circular or irregular slabs?",
        answer: "Yes. For circular slabs, calculate area first as π × radius², multiply by thickness, and convert units. For a fast approximation with this calculator, enter 0.886 × diameter for both length and width."
      }
    ],
    crossCategoryCalculators: [
      {
        id: "concrete-footing",
        name: "Concrete Footing Calculator",
        category: "concrete",
        slug: "footing-calculator",
        jobContext: "Continuous or post footings supporting this slab or adjacent structures"
      },
      {
        id: "deck-board",
        name: "Deck Board Calculator",
        category: "framing",
        slug: "deck-board-calculator",
        jobContext: "Wood or composite decking connecting to your concrete patio slab"
      },
      {
        id: "tile-coverage",
        name: "Tile Coverage Calculator",
        category: "tile",
        slug: "coverage-calculator",
        jobContext: "Exterior porcelain or quarry tile applied over a cured concrete slab"
      }
    ]
  },

  'concrete-footing': {
    id: 'concrete-footing',
    category: 'concrete',
    slug: 'footing-calculator',
    name: 'Concrete Footing Calculator',
    howItCalculated: {
      imperial: {
        title: "How Concrete Footing Volume is Calculated (Imperial)",
        formula: "Volume (cu yd) = [Length (ft) × (Width (in) / 12) × (Depth (in) / 12)] ÷ 27",
        /* SOURCE: ASTM C387 & ACI 318 Building Code Requirements for Structural Concrete */
        explanation: "Continuous concrete footing calculations determine the structural volume required to spread building loads into undisturbed soil below the regional frost line. Both footing width and depth are measured in inches and converted to feet by dividing each dimension by 12. Multiplying the linear length of the trench by the converted width and depth gives the neat trench volume in cubic feet. Dividing by 27 converts the result into cubic yards for ready-mix dispatch. When mixing 80-pound pre-packaged dry concrete bags on site, multiplying the cubic yard figure by 45 calculates total bags based on a standard bag yield of 0.60 cubic feet. Because continuous footings are commonly poured into rough earth trenches without smooth timber formwork, soil jaggedness and machine gouges increase concrete consumption.",
        variables: [
          { symbol: "Length (ft)", name: "Total Footing Length", description: "The total linear running distance of the continuous trench in feet." },
          { symbol: "Width (in)", name: "Footing Width", description: "The horizontal spread of the footing base in inches, sized to match wall loads and soil capacity." },
          { symbol: "Depth (in)", name: "Footing Depth / Thickness", description: "The vertical thickness of the concrete pour in inches, which must sit below local frost depth." },
          { symbol: "Volume (cu yd)", name: "Cubic Yards", description: "The total structural concrete volume divided by 27 cubic feet per yard." },
          { symbol: "Bags", name: "80lb Bags", description: "The required count of 80-pound concrete pre-mix bags at 45 bags per cubic yard." }
        ],
        steps: [
          { stepNumber: 1, name: "Convert Width and Depth to Feet", instruction: "Divide footing width in inches by 12 and footing depth in inches by 12." },
          { stepNumber: 2, name: "Calculate Cubic Feet", instruction: "Multiply total running length by converted width and converted depth to obtain cubic feet." },
          { stepNumber: 3, name: "Convert to Cubic Yards", instruction: "Divide total cubic feet by 27 to obtain ready-mix delivery volume." },
          { stepNumber: 4, name: "Calculate Bag Count", instruction: "Multiply cubic yards by 45 to calculate the number of 80-pound bags needed." }
        ]
      },
      metric: {
        title: "How Concrete Footing Volume is Calculated (Metric)",
        formula: "Volume (m³) = Length (m) × [Width (cm) ÷ 100] × [Depth (cm) ÷ 100]",
        /* SOURCE: Eurocode 2 (EN 1992-1-1) & British Standards BS 8110 for foundation trenching */
        explanation: "Continuous concrete footing calculations determine the structural volume required to spread building loads into undisturbed soil below the regional frost line. Both footing width and depth are measured in centimeters and converted to meters by dividing each dimension by 100. Multiplying linear trench length by converted width and depth gives the neat trench volume in cubic meters for ready-mix dispatch. When batching with 25 kg pre-packaged concrete bags, multiply cubic meters by 84 bags per m³ (or by 59 for 35 kg bags). Because continuous footings are commonly poured into rough earth trenches without formwork, dirt sloughing and trench width variances increase concrete consumption.",
        variables: [
          { symbol: "Length (m)", name: "Total Footing Length", description: "The total linear running distance of the continuous trench in meters." },
          { symbol: "Width (cm)", name: "Footing Width", description: "The horizontal spread of the footing base in centimeters, sized for structural loads." },
          { symbol: "Depth (cm)", name: "Footing Depth", description: "The vertical thickness of the concrete pour in centimeters." },
          { symbol: "Volume (m³)", name: "Cubic Meters", description: "The total structural concrete volume in cubic meters." },
          { symbol: "Bags (25kg)", name: "25kg Bags", description: "The count of 25 kg concrete bags needed at approximately 84 bags per cubic meter." }
        ],
        steps: [
          { stepNumber: 1, name: "Convert Dimensions to Meters", instruction: "Divide width in cm by 100 and depth in cm by 100." },
          { stepNumber: 2, name: "Calculate Cubic Meters", instruction: "Multiply running length by converted width and converted depth." },
          { stepNumber: 3, name: "Determine Volume or Bags", instruction: "Use total cubic meters for ready-mix dispatch, or multiply by 84 for 25kg pre-mix bags." },
          { stepNumber: 4, name: "Apply Trench Allowance", instruction: "Add 15% to 20% extra volume for irregular earth-excavated trench sidewalls." }
        ]
      }
    },
    workedExample: {
      imperial: {
        title: "Worked Example: 20ft Trench Footing at 16in Wide × 8in Deep",
        scenario: "Pouring a continuous perimeter trench footing for a residential room addition measuring 20 linear feet, 16 inches wide and 8 inches deep.",
        steps: [
          { label: "Width conversion", formula: "16 in ÷ 12", result: "1.333 ft" },
          { label: "Depth conversion", formula: "8 in ÷ 12", result: "0.667 ft" },
          { label: "Cubic feet volume", formula: "20 ft × 1.333 ft × 0.667 ft", result: "17.78 cu ft" },
          { label: "Cubic yards conversion", formula: "17.78 cu ft ÷ 27", result: "0.66 cu yd" },
          { label: "80lb bags calculation", formula: "0.66 cu yd × 45 bags/cu yd", result: "29.7 bags → 30 bags" }
        ],
        summary: "The neat trench volume requires 0.66 cubic yards or 30 eighty-pound bags. Adding a 15% trench-wall allowance for rough excavation brings the practical purchase to 35 bags (or 0.76 cubic yards)."
      },
      metric: {
        title: "Worked Example: 6m Trench Footing at 40cm Wide × 20cm Deep",
        scenario: "Pouring a continuous perimeter trench footing for a home extension measuring 6.0 linear meters, 40 centimeters wide and 20 centimeters deep.",
        steps: [
          { label: "Width conversion", formula: "40 cm ÷ 100", result: "0.40 m" },
          { label: "Depth conversion", formula: "20 cm ÷ 100", result: "0.20 m" },
          { label: "Cubic meters volume", formula: "6.0 m × 0.40 m × 0.20 m", result: "0.48 m³" },
          { label: "25kg bags calculation", formula: "0.48 m³ × 84 bags/m³", result: "40.3 bags → 41 bags" }
        ],
        summary: "Neat volume requires 0.48 cubic meters (or 41 bags of 25kg pre-mix). Adding a 15% trench-wall allowance for unformed excavation brings the practical purchase to 0.55 m³ of ready-mix (or 47 bags)."
      }
    },
    commonMistakes: [
      {
        title: "Failing to Account for Rough Trench Sidewalls",
        /* SOURCE: NRMCA CIP 11: Earth-formed foundation trenches consume 15% to 20% extra volume due to bucket teeth gouges and sloughing */
        whyItMatters: "Backhoe and trenching buckets leave jagged, flared dirt walls that consume 15% to 20% more concrete than mathematical rectangle dimensions.",
        howToAvoid: "Order a 15% to 20% overage buffer for unformed earth trenches rather than the standard 10% used for framed slabs."
      },
      {
        title: "Placing Footings Above the Regional Frost Depth",
        /* SOURCE: IRC 2021 Section R403.1.4.1 (Frost Protection) */
        whyItMatters: "Footings positioned above the municipal frost line will heave during ground freezing, causing severe structural wall cracks.",
        howToAvoid: "Check local building codes and excavate the base of the trench to sit below the recorded regional frost depth."
      },
      {
        title: "Neglecting Steel Rebar Clearance",
        whyItMatters: "Rebar resting directly on raw dirt corrodes from moisture intrusion, destroying structural tensile strength.",
        howToAvoid: "Support steel reinforcing bars on plastic or concrete chairs to maintain at least 75 mm (3 inches) of concrete cover from earth."
      }
    ],
    faqs: [
      {
        question: "How deep does a concrete footing need to be?",
        /* SOURCE: IRC 2021 Section R403.1.4.1 */
        answer: "Footing depth depends on municipal building codes and regional frost penetration, ranging from 30 cm (12 inches) in frost-free regions to 1.2 m (48 inches) or more in cold climates. The footing bottom must always bear on undisturbed soil below the frost line."
      },
      {
        question: "How wide should a continuous residential footing be?",
        answer: "A standard rule of thumb is that a continuous footing should be twice the thickness of the foundation wall it supports (e.g., a 40 cm wide footing for a 20 cm concrete block wall), with a depth equal to the wall thickness."
      },
      {
        question: "Why should I add 15% to 20% waste for footings instead of 10%?",
        answer: "Earth-cast trenches have irregular sidewalls, root pockets, and machine gouges that expand trench volume. Shorting a footing pour causes cold joints that building inspectors will frequently fail."
      },
      {
        question: "Can I mix bagged concrete for structural footings?",
        /* SOURCE: IRC Table R402.2: Minimum 2,500 to 3,500 PSI specified compressive strength */
        answer: "Yes, provided the dry pre-mix meets structural code strength (minimum 2,500 to 3,500 PSI at 28 days per building code). For footings exceeding 1 cubic yard (or 0.8 m³), ready-mix truck delivery ensures uniform slump and continuous curing."
      }
    ],
    crossCategoryCalculators: [
      {
        id: "concrete-slab",
        name: "Concrete Slab Calculator",
        category: "concrete",
        slug: "slab-calculator",
        jobContext: "Interior slab or patio pour connecting to foundation footings"
      },
      {
        id: "deck-board",
        name: "Deck Board Calculator",
        category: "framing",
        slug: "deck-board-calculator",
        jobContext: "Framing deck substructures onto poured concrete pier footings"
      },
      {
        id: "drywall-sheet",
        name: "Drywall Sheet Calculator",
        category: "drywall",
        slug: "sheet-calculator",
        jobContext: "Finishing interior walls built over perimeter foundations"
      }
    ]
  },

  'roof-pitch': {
    id: 'roof-pitch',
    category: 'roofing',
    slug: 'pitch-calculator',
    name: 'Roof Pitch Calculator',
    howItCalculated: {
      imperial: {
        title: "How Roof Pitch and Multipliers are Calculated (Imperial)",
        formula: "Rafter Multiplier = √[Rise² + Run²] ÷ Run",
        explanation: "Roof pitch describes the vertical slope of a roof rafter assembly expressed as inches of rise per 12 inches of horizontal run (such as 4:12 or 8:12). The rafter length multiplier is derived geometrically using the Pythagorean theorem, where the rafter represents the hypotenuse of a right triangle formed by vertical rise and horizontal run. Dividing the hypotenuse length by the run produces a decimal multiplier. Multiplying this factor by the horizontal run yields true rafter slope length. The exact same multiplier converts flat building footprint square footage into true sloped roof surface area, which is required when ordering plywood sheathing, roofing underlayment, and asphalt shingles.",
        variables: [
          { symbol: "Rise (in)", name: "Vertical Rise", description: "The vertical distance in inches that the roof plane ascends over the given horizontal run." },
          { symbol: "Run (in)", name: "Horizontal Run", description: "The horizontal base distance in inches, conventionally standardized to 12 inches in carpentry." },
          { symbol: "Pitch", name: "Pitch Ratio", description: "The ratio notation (Rise/12) expressing the angle of roof incline." },
          { symbol: "Multiplier", name: "Rafter Multiplier", description: "The decimal factor used to convert flat horizontal distances and areas into true sloped surface dimensions." }
        ],
        steps: [
          { stepNumber: 1, name: "Measure Rise and Run", instruction: "Determine vertical rise in inches corresponding to the horizontal run (standardized to 12 inches)." },
          { stepNumber: 2, name: "Apply Pythagorean Theorem", instruction: "Square the rise, square the run, and sum them together (Rise² + Run²)." },
          { stepNumber: 3, name: "Compute Hypotenuse", instruction: "Calculate the square root of the sum to find the rafter diagonal length." },
          { stepNumber: 4, name: "Determine Multiplier", instruction: "Divide the hypotenuse by the run (12 inches) to obtain the decimal slope multiplier." }
        ]
      },
      metric: {
        title: "How Roof Pitch and Multipliers are Calculated (Metric)",
        formula: "Rafter Multiplier = √[Rise² + Run²] ÷ Run",
        explanation: "Roof pitch describes the vertical slope of a roof rafter assembly expressed as vertical rise over horizontal run (such as a 1:2 ratio or 50% grade). The rafter length multiplier is derived geometrically using the Pythagorean theorem, where the rafter represents the hypotenuse of a right triangle formed by vertical rise and horizontal run. Dividing the hypotenuse length by the horizontal run produces a decimal multiplier. Multiplying this factor by the horizontal building run yields true rafter slope length in meters. The same multiplier converts flat building footprint area in square meters into true sloped roof surface area for ordering sheathing and membranes.",
        variables: [
          { symbol: "Rise (cm)", name: "Vertical Rise", description: "The vertical distance in centimeters that the roof plane ascends over the given horizontal run." },
          { symbol: "Run (cm)", name: "Horizontal Run", description: "The horizontal base distance in centimeters (commonly standardized to 30 cm or 100 cm in metric carpentry)." },
          { symbol: "Slope (%)", name: "Grade Percentage", description: "The gradient expressed as (Rise ÷ Run) × 100." },
          { symbol: "Multiplier", name: "Rafter Multiplier", description: "The decimal factor used to convert flat horizontal dimensions into true sloped surface lengths and areas." }
        ],
        steps: [
          { stepNumber: 1, name: "Measure Rise and Run", instruction: "Determine vertical rise in centimeters corresponding to the horizontal run in centimeters." },
          { stepNumber: 2, name: "Apply Pythagorean Theorem", instruction: "Square the rise, square the run, and sum them together (Rise² + Run²)." },
          { stepNumber: 3, name: "Compute Hypotenuse", instruction: "Calculate the square root of the sum to determine rafter slope length." },
          { stepNumber: 4, name: "Determine Multiplier", instruction: "Divide the hypotenuse by the run to obtain the decimal rafter multiplier." }
        ]
      }
    },
    workedExample: {
      imperial: {
        title: "Worked Example: 6/12 Pitch on a 14ft Horizontal Run",
        scenario: "Calculating the rafter multiplier, true rafter length, and roof surface area for a roof with a 6-inch rise over a 12-inch run on a building with a 14-foot horizontal rafter run.",
        steps: [
          { label: "Pythagorean sum", formula: "6² + 12² = 36 + 144", result: "180" },
          { label: "Hypotenuse length", formula: "√180", result: "13.416 inches" },
          { label: "Rafter multiplier", formula: "13.416 in ÷ 12 in", result: "1.118" },
          { label: "True rafter slope length", formula: "14 ft run × 1.118", result: "15.65 ft (15 ft 7-3/4 in)" }
        ],
        summary: "A 6/12 pitch has a multiplier of 1.118 and an angle of 26.57 degrees. To order sheathing for a 1,000 sq ft flat building footprint with this slope, multiply 1,000 by 1.118 to calculate 1,118 sq ft of actual sloped decking."
      },
      metric: {
        title: "Worked Example: 15 cm Rise / 30 cm Run on a 4.0m Run",
        scenario: "Calculating the rafter multiplier, true rafter length, and sloped roof area for a roof with a 15 cm rise over a 30 cm run (1:2 ratio / 50% grade) on a building with a 4.0-meter horizontal run.",
        steps: [
          { label: "Pythagorean sum", formula: "15² + 30² = 225 + 900", result: "1,125" },
          { label: "Hypotenuse length", formula: "√1,125", result: "33.54 cm" },
          { label: "Rafter multiplier", formula: "33.54 cm ÷ 30 cm", result: "1.118" },
          { label: "True rafter slope length", formula: "4.0 m run × 1.118", result: "4.47 meters" }
        ],
        summary: "The 1:2 slope has a 1.118 multiplier and an angle of 26.57 degrees. For a building footprint of 100 m² with this pitch, true sloped surface area is 100 × 1.118 = 111.8 m²."
      }
    },
    commonMistakes: [
      {
        title: "Confusing Building Span with Rafter Run",
        whyItMatters: "Entering the full building width (span) instead of the half-span (distance from wall plate to ridge centerline) doubles calculated rafter length.",
        howToAvoid: "For standard symmetrical gable roofs, divide total building span by 2 to determine the true rafter run."
      },
      {
        title: "Forgetting to Deduct Ridge Beam Thickness",
        whyItMatters: "Rafters cut to raw mathematical length will push the fascia outward if half the ridge beam thickness is not deducted at the plumb cut.",
        howToAvoid: "Shorten the rafter length perpendicular to the plumb line by half the thickness of the center ridge beam."
      },
      {
        title: "Omitting Eave and Gable Overhangs",
        whyItMatters: "Calculating sheathing strictly from building footprint misses perimeter overhangs, creating material shortfalls.",
        howToAvoid: "Add horizontal overhang dimensions to your run before applying the pitch multiplier."
      },
      {
        title: "Installing Shingles on Slopes Under 2:12",
        /* SOURCE: IRC 2021 Section R905.1.1 & NRCA Roofing Manual: Slopes under 2:12 require continuous waterproof membrane (EPDM, TPO, or modified bitumen) */
        whyItMatters: "Asphalt shingles rely on gravity shedding; installing them on slopes below 2:12 causes severe capillary water leaks and voids warranties.",
        howToAvoid: "Use membrane roofing (EPDM or TPO) on pitches under 2:12, and double underlayment between 2:12 and 4:12."
      }
    ],
    faqs: [
      {
        question: "What does a 6/12 roof pitch mean?",
        answer: "A 6/12 roof pitch means the roof plane ascends 6 inches vertically for every 12 inches of horizontal distance toward the ridge (a 50% gradient). This corresponds to an incline angle of 26.57 degrees and a slope multiplier of 1.118."
      },
      {
        question: "How do I calculate total roof surface area from the pitch multiplier?",
        answer: "Measure the flat horizontal area covered by the roof including eave and rake overhangs (Length × Width), then multiply by the pitch multiplier. For example, a 100 m² flat footprint with a 1.118 multiplier equals 111.8 m² of sloped roof area."
      },
      {
        question: "How can I measure roof pitch from inside the attic?",
        answer: "Hold a level horizontally with one end touching the rafter underside. Adjust until the bubble centers, then measure the vertical distance from a known distance on the level up to the bottom of the rafter to calculate the rise."
      },
      {
        question: "What is considered a steep pitch roof?",
        answer: "Pitches between 4:12 and 8:12 (approx 18° to 34°) are standard walkable roofs. Pitches 9:12 and steeper (above 37°) are classified as steep-slope, requiring specialized roof brackets, safety harness tie-offs, and staging."
      }
    ],
    crossCategoryCalculators: [
      {
        id: "drywall-sheet",
        name: "Drywall Sheet Calculator",
        category: "drywall",
        slug: "sheet-calculator",
        jobContext: "Vaulted ceiling drywall sheet calculations matching your roof pitch"
      },
      {
        id: "paint-coverage",
        name: "Paint Coverage Calculator",
        category: "paint",
        slug: "coverage-calculator",
        jobContext: "Exterior paint estimation for high gable wall triangles"
      },
      {
        id: "deck-board",
        name: "Deck Board Calculator",
        category: "framing",
        slug: "deck-board-calculator",
        jobContext: "Framing covered porch roof assemblies over deck structures"
      }
    ]
  },

  'tile-coverage': {
    id: 'tile-coverage',
    category: 'tile',
    slug: 'coverage-calculator',
    name: 'Tile Coverage Calculator',
    howItCalculated: {
      imperial: {
        title: "How Tile Coverage is Calculated (Imperial)",
        formula: "Total Tiles = ⌈[Area (sq ft) ÷ Tile Area (sq ft)] × (1 + Waste% / 100)⌉",
        explanation: "Tile coverage estimation calculates the net square footage of the installation surface and divides it by the square footage covered by a single tile. Because room dimensions are measured in feet while commercial ceramic, porcelain, and stone tiles are sold in inches, the individual tile area is converted to square feet by dividing tile length times tile width by 144 (the number of square inches in one square foot). The base tile quantity represents perfect full-tile coverage without cuts. In actual installation, edge cuts, door threshold fitting, plumbing penetrations, and tile breakage consume material. A waste percentage (typically 10% for straight grid patterns and 15% for diagonal or herringbone layouts) is added, and the total is rounded up to the nearest whole tile.",
        variables: [
          { symbol: "Length (ft)", name: "Room Length", description: "The longest horizontal dimension of the floor or wall area in feet." },
          { symbol: "Width (ft)", name: "Room Width", description: "The perpendicular horizontal dimension of the floor or wall area in feet." },
          { symbol: "Tile Length (in)", name: "Tile Length", description: "The nominal length of one individual tile in inches." },
          { symbol: "Tile Width (in)", name: "Tile Width", description: "The nominal width of one individual tile in inches." },
          { symbol: "Waste (%)", name: "Waste Percentage", description: "The overage margin added for cutting scrap and breakage (standard at 10% for straight layouts)." }
        ],
        steps: [
          { stepNumber: 1, name: "Calculate Room Square Footage", instruction: "Multiply room length by width in feet to determine total square footage." },
          { stepNumber: 2, name: "Calculate Single Tile Area", instruction: "Multiply tile length by width in inches, then divide by 144 to convert to square feet." },
          { stepNumber: 3, name: "Calculate Base Tiles", instruction: "Divide room area by single tile area to get net tile count before waste." },
          { stepNumber: 4, name: "Apply Waste Allowance", instruction: "Multiply base tile count by (1 + waste% / 100) and round up to the nearest whole tile." }
        ]
      },
      metric: {
        title: "How Tile Coverage is Calculated (Metric)",
        formula: "Total Tiles = ⌈[Area (m²) ÷ Tile Area (m²)] × (1 + Waste% / 100)⌉",
        explanation: "Tile coverage calculates the net square meters of floor or wall surface and divides it by the square meters covered by a single tile. Tile dimensions in centimeters are converted to square meters by dividing tile length times width by 10,000 (the number of square centimeters in a square meter). Dividing room area by individual tile area yields the base tile count for full, uncut pieces. In actual installation, edge cuts, door threshold fitting, and corner wrapping produce offcut waste. A waste factor (typically 10% for straight grid patterns and 15% for diagonal or herringbone layouts) is added, rounding up to the next whole tile or full box.",
        variables: [
          { symbol: "Length (m)", name: "Room Length", description: "The horizontal length of the room or wall in meters." },
          { symbol: "Width (m)", name: "Room Width", description: "The horizontal width of the room or wall in meters." },
          { symbol: "Tile Length (cm)", name: "Tile Length", description: "The physical length of one tile in centimeters." },
          { symbol: "Tile Width (cm)", name: "Tile Width", description: "The physical width of one tile in centimeters." },
          { symbol: "Waste (%)", name: "Waste Percentage", description: "The allowance for offcuts, pattern alignment, and trimming scrap." }
        ],
        steps: [
          { stepNumber: 1, name: "Calculate Surface Area", instruction: "Multiply length in meters by width in meters to find total square meters." },
          { stepNumber: 2, name: "Calculate Single Tile Area", instruction: "Multiply tile length by width in cm, then divide by 10,000 to obtain square meters per tile." },
          { stepNumber: 3, name: "Divide Area by Tile Coverage", instruction: "Divide surface square meters by single tile square meters to find neat tile count." },
          { stepNumber: 4, name: "Apply Waste Percentage", instruction: "Multiply by (1 + waste% / 100) and round up to the next whole tile or carton." }
        ]
      }
    },
    workedExample: {
      imperial: {
        title: "Worked Example: 10ft × 10ft Floor with 12in × 12in Tiles",
        scenario: "Tiling a 10 ft by 10 ft bathroom floor (100 sq ft) with standard 12-inch by 12-inch ceramic tiles laid in a straight grid with a 10% waste factor.",
        steps: [
          { label: "Room surface area", formula: "10 ft × 10 ft", result: "100.0 sq ft" },
          { label: "Tile area in sq ft", formula: "(12 in × 12 in) ÷ 144", result: "1.0 sq ft" },
          { label: "Base tiles needed", formula: "100.0 sq ft ÷ 1.0 sq ft", result: "100 tiles" },
          { label: "Add 10% waste buffer", formula: "100 × (1 + 0.10)", result: "110 tiles" }
        ],
        summary: "You will need 110 tiles total. If your supplier packs 10 tiles per carton, order 11 full cartons. Never order exact square footage without a waste margin."
      },
      metric: {
        title: "Worked Example: 3m × 3m Floor with 30cm × 30cm Tiles",
        scenario: "Tiling a 3.0 meter by 3.0 meter bathroom floor (9.0 m²) with 30 cm by 30 cm ceramic tiles laid in a straight grid with a 10% waste factor.",
        steps: [
          { label: "Room surface area", formula: "3.0 m × 3.0 m", result: "9.0 m²" },
          { label: "Tile area in m²", formula: "(30 cm × 30 cm) ÷ 10,000", result: "0.09 m²" },
          { label: "Base tiles needed", formula: "9.0 m² ÷ 0.09 m²", result: "100 tiles" },
          { label: "Add 10% waste buffer", formula: "100 × (1 + 0.10)", result: "110 tiles" }
        ],
        summary: "You will need 110 tiles total. If packaged at 10 tiles per carton, purchase 11 full boxes to cover installation and future replacements."
      }
    },
    commonMistakes: [
      {
        title: "Confusing Nominal and Actual Tile Sizes",
        whyItMatters: "Rectified porcelain tiles labeled 12x24 inches often measure 11-7/8 by 23-7/8 inches (300mm × 600mm), creating dimensional creep across long runs.",
        howToAvoid: "Check the exact metric or decimal dimensions on the box specifications prior to setting out layout lines."
      },
      {
        title: "Underestimating Waste on Diagonal or Herringbone Layouts",
        /* SOURCE: Tile Council of North America (TCNA) Handbook: 15% to 20% waste factor recommended for diagonal cuts against perimeter walls */
        whyItMatters: "Herringbone, chevron, and 45-degree diagonal patterns create triangular offcuts at every wall, regularly producing 15% to 20% scrap.",
        howToAvoid: "Increase waste allowance from 10% to 15% or 20% whenever installing patterned or diagonal layouts."
      },
      {
        title: "Failing to Save Attic Stock for Future Repairs",
        whyItMatters: "Plumbing repairs or subfloor settling often require tile removal years later; dye lots change, making exact color matching impossible.",
        howToAvoid: "Order an extra full box (15–20 sq ft / 1.5–2 m²) to store for future maintenance."
      },
      {
        title: "Neglecting Grout Spacing in Mosaic Sheets",
        whyItMatters: "For mosaic sheets, grout lines make up a notable portion of total area; calculating individual chips instead of full sheets leads to inaccurate counts.",
        howToAvoid: "Treat each mounted mosaic mesh sheet as a single tile unit in your dimensions."
      }
    ],
    faqs: [
      {
        question: "How much extra tile should I order for waste?",
        /* SOURCE: TCNA Handbook for Ceramic, Glass, and Stone Tile Installation */
        answer: "Add 10% waste for standard square or rectangular tile in a straight grid. For rooms with multiple alcoves, diagonal patterns, or herringbone layouts, add 15% to 20% to account for perimeter cuts and broken pieces."
      },
      {
        question: "How do I calculate how many boxes of tile I need?",
        answer: "Find the 'coverage per box' on the tile carton (typically 1 to 2 m² or 10 to 18 sq ft). Divide your total area including waste by the box coverage, and always round up to the next full carton since retailers do not sell loose tiles."
      },
      {
        question: "Does this calculator account for grout line widths?",
        answer: "Grout joints (typically 2 mm to 5 mm, or 1/16\" to 3/16\") slightly reduce the true tile count. However, treating tile face dimensions as neat solid area provides a natural safety margin, ensuring you never run short."
      },
      {
        question: "How do I measure walls with tubs, showers, or windows?",
        answer: "Multiply total wall perimeter by wall height to get gross area, calculate and subtract large cutouts like windows and prefabricated shower bases, then add your 10% waste factor."
      }
    ],
    crossCategoryCalculators: [
      {
        id: "laminate-flooring",
        name: "Laminate Flooring Calculator",
        category: "flooring",
        slug: "laminate-calculator",
        jobContext: "Compare costs between tile and laminate/vinyl plank for adjoining rooms"
      },
      {
        id: "paint-coverage",
        name: "Paint Coverage Calculator",
        category: "paint",
        slug: "coverage-calculator",
        jobContext: "Wall and ceiling paint coverage for untiled bathroom surfaces"
      },
      {
        id: "drywall-sheet",
        name: "Drywall Sheet Calculator",
        category: "drywall",
        slug: "sheet-calculator",
        jobContext: "Cement backer board or green moisture-resistant drywall substrate"
      }
    ]
  },

  'drywall-sheet': {
    id: 'drywall-sheet',
    category: 'drywall',
    slug: 'sheet-calculator',
    name: 'Drywall Sheet Calculator',
    howItCalculated: {
      imperial: {
        title: "How Drywall Sheets are Calculated (Imperial)",
        formula: "Sheets Needed = ⌈[(Wall Area + Ceiling Area) × 1.10] ÷ Sheet Area⌉",
        /* SOURCE: Gypsum Association GA-216 "Application and Finishing of Gypsum Panel Products": Standard 10% waste factor for residential partitions */
        explanation: "Drywall estimation calculates the total surface area of all room walls and the ceiling plane, converting square footage into standard manufactured gypsum panels. Perimeter wall area is determined by multiplying room perimeter (two times length plus two times width) by ceiling height. Adding the ceiling area (length times width) yields gross room square footage. Because drywall panels are manufactured in standard dimensions of 4-foot by 8-foot (32 sq ft) or 4-foot by 12-foot (48 sq ft), a 10% waste allowance is added to accommodate window and door cutouts, outlet openings, and end trimming before dividing by panel area and rounding up to the next whole sheet.",
        variables: [
          { symbol: "Length (ft)", name: "Room Length", description: "The longest horizontal dimension of the room in feet." },
          { symbol: "Width (ft)", name: "Room Width", description: "The shorter horizontal dimension of the room in feet." },
          { symbol: "Height (ft)", name: "Ceiling Height", description: "The vertical distance from subfloor to bottom of ceiling joists in feet." },
          { symbol: "Sheet Size", name: "Panel Dimensions", description: "The standard manufactured gypsum board size (4'×8' = 32 sq ft or 4'×12' = 48 sq ft)." },
          { symbol: "Sheets Needed", name: "Total Panels", description: "The total number of full drywall sheets required including a 10% waste buffer." }
        ],
        steps: [
          { stepNumber: 1, name: "Calculate Wall Area", instruction: "Multiply total perimeter [2 × (Length + Width)] by wall height to find wall square footage." },
          { stepNumber: 2, name: "Calculate Ceiling Area", instruction: "Multiply room length by room width to find ceiling square footage." },
          { stepNumber: 3, name: "Sum and Add 10% Waste", instruction: "Add wall and ceiling areas together, then multiply by 1.10 to add standard 10% scrap." },
          { stepNumber: 4, name: "Divide by Panel Area", instruction: "Divide total area with waste by 32 (for 4x8) or 48 (for 4x12) and round up to the nearest integer." }
        ]
      },
      metric: {
        title: "How Drywall Sheets are Calculated (Metric)",
        formula: "Sheets Needed = ⌈[(Wall Area + Ceiling Area) × 1.10] ÷ Sheet Area⌉",
        /* SOURCE: EN 520 (Gypsum plasterboards) - Standard board dimensions are 1.2 m wide by 2.4 m long (2.88 m²) or 3.0 m long (3.60 m²) */
        explanation: "Drywall estimation calculates the combined surface area of all room walls and the ceiling plane in square meters, converting the area into standard manufactured gypsum panels (commonly 1.2 m × 2.4 m = 2.88 m²). Perimeter wall area is determined by multiplying room perimeter [2 × (Length + Width)] by ceiling height. Adding the ceiling area (Length × Width) yields gross room area. A standard 10% waste allowance is added to account for door and window openings, electrical outlet cutouts, and end trims before dividing by panel area and rounding up to the nearest whole sheet.",
        variables: [
          { symbol: "Length (m)", name: "Room Length", description: "The longest horizontal dimension of the room in meters." },
          { symbol: "Width (m)", name: "Room Width", description: "The shorter horizontal dimension of the room in meters." },
          { symbol: "Height (m)", name: "Ceiling Height", description: "The vertical distance from floor to ceiling joists in meters." },
          { symbol: "Sheet Size", name: "Panel Dimensions", description: "The standard metric plasterboard size (typically 1.2 m × 2.4 m = 2.88 m²)." },
          { symbol: "Sheets Needed", name: "Total Panels", description: "The total number of full plasterboard sheets required with a 10% waste buffer." }
        ],
        steps: [
          { stepNumber: 1, name: "Calculate Wall Area", instruction: "Multiply total perimeter [2 × (Length + Width)] by ceiling height in meters." },
          { stepNumber: 2, name: "Calculate Ceiling Area", instruction: "Multiply room length by width in meters." },
          { stepNumber: 3, name: "Sum and Add 10% Waste", instruction: "Add wall and ceiling areas, then multiply by 1.10 for cutting waste." },
          { stepNumber: 4, name: "Divide by Board Area", instruction: "Divide total square meters by 2.88 m² (for 1.2m × 2.4m) and round up to the nearest whole sheet." }
        ]
      }
    },
    workedExample: {
      imperial: {
        title: "Worked Example: 12ft × 12ft Room with 8ft Ceilings",
        scenario: "Hanging drywall on the walls and ceiling of a standard 12 ft by 12 ft bedroom with 8-foot ceilings using standard 4x8 gypsum panels.",
        steps: [
          { label: "Wall area", formula: "2 × (12 × 8) + 2 × (12 × 8)", result: "384.0 sq ft" },
          { label: "Ceiling area", formula: "12 ft × 12 ft", result: "144.0 sq ft" },
          { label: "Total room surface", formula: "384.0 + 144.0", result: "528.0 sq ft" },
          { label: "Add 10% waste factor", formula: "528.0 sq ft × 1.10", result: "580.8 sq ft" },
          { label: "4x8 sheets calculation", formula: "580.8 sq ft ÷ 32 sq ft/sheet", result: "18.15 → 19 sheets" }
        ],
        summary: "You will need 19 sheets of 4'×8' drywall. If choosing 4'×12' panels to eliminate butt joints, 580.8 ÷ 48 = 12.1, meaning 13 twelve-foot sheets."
      },
      metric: {
        title: "Worked Example: 4m × 4m Room with 2.5m Ceilings",
        scenario: "Hanging plasterboard on the walls and ceiling of a 4.0 m by 4.0 m bedroom with 2.5 m ceiling height using standard 1.2 m by 2.4 m panels (2.88 m²).",
        steps: [
          { label: "Wall area", formula: "2 × (4.0 × 2.5) + 2 × (4.0 × 2.5)", result: "40.0 m²" },
          { label: "Ceiling area", formula: "4.0 m × 4.0 m", result: "16.0 m²" },
          { label: "Total room surface", formula: "40.0 + 16.0", result: "56.0 m²" },
          { label: "Add 10% waste factor", formula: "56.0 m² × 1.10", result: "61.6 m²" },
          { label: "Panels calculation", formula: "61.6 m² ÷ 2.88 m²/sheet", result: "21.39 → 22 sheets" }
        ],
        summary: "You will need 22 sheets of 1.2m × 2.4m plasterboard to complete all walls and the ceiling with appropriate staggered seams."
      }
    },
    commonMistakes: [
      {
        title: "Deducting Full Window and Door Openings",
        whyItMatters: "Drywall installers hang full sheets over openings and rout them out in place; the cutout offcuts cannot be reused without creating weak seams.",
        howToAvoid: "Leave standard door and window openings in your gross wall area as part of your natural cutting waste."
      },
      {
        title: "Using 4x8 Panels When 4x12 Fits",
        whyItMatters: "Shorter panels create vertical butt joints that require difficult compound feathering to conceal.",
        howToAvoid: "Use longer panels (4x12 in imperial or 3.0 m in metric) on long walls to cut taping joints by 25% to 30%."
      },
      {
        title: "Installing Thin Drywall on Wide Joist Spacing",
        whyItMatters: "Standard 1/2-inch (12.7 mm) drywall sags over time when ceiling joists are spaced 60 cm (24 inches) on-center.",
        howToAvoid: "Use 5/8-inch (15.9 mm) drywall or specialized sag-resistant ceiling boards for wide spans."
      },
      {
        title: "Aligning Seams Continuously Instead of Staggering",
        whyItMatters: "Continuous 4-corner seam intersections create high stress points that crack along tape lines.",
        howToAvoid: "Hang panels horizontally and stagger vertical butt seams by at least 1.2 meters (4 feet) between adjacent rows."
      }
    ],
    faqs: [
      {
        question: "Should I buy shorter or longer drywall sheets?",
        answer: "Standard 2.4 m (8 ft) sheets are lighter and easier for one person to maneuver through doorways and hallways. Longer 3.0 m or 3.6 m (10 ft or 12 ft) sheets require two people to handle, but they eliminate 25% of taped seams for a flatter finish."
      },
      {
        question: "Why doesn't the calculator subtract doors and windows?",
        answer: "In professional installation, sheets are hung directly across openings and routed out with a rotary tool. The cutout material is scrap, so professional estimators include openings in gross calculations."
      },
      {
        question: "How much joint compound and tape do I need per room?",
        /* SOURCE: USG Sheetrock Installation Handbook: One 4.5 gal (17 L) pail of joint compound and 250 ft (75 m) of tape covers 500-600 sq ft (50-55 m²) of drywall */
        answer: "For a typical bedroom (around 50 to 60 m² or 500 to 600 sq ft of board surface), plan on one 4.5-gallon (17-liter) pail of ready-mix joint compound and one 250-foot (75-meter) roll of paper joint tape."
      },
      {
        question: "Should drywall be hung horizontally or vertically on walls?",
        answer: "Horizontal installation is standard for residential framing. It bridges framing imperfections, minimizes overall seam footage at eye level, and increases structural wall shear resistance."
      }
    ],
    crossCategoryCalculators: [
      {
        id: "paint-coverage",
        name: "Paint Coverage Calculator",
        category: "paint",
        slug: "coverage-calculator",
        jobContext: "Calculate PVA primer and topcoat paint needed for new drywall"
      },
      {
        id: "laminate-flooring",
        name: "Laminate Flooring Calculator",
        category: "flooring",
        slug: "laminate-calculator",
        jobContext: "Flooring requirements once drywall hanging and baseboard installation are done"
      },
      {
        id: "roof-pitch",
        name: "Roof Pitch Calculator",
        category: "roofing",
        slug: "pitch-calculator",
        jobContext: "Rafter slope multipliers for vaulted or cathedral ceiling drywall sheets"
      }
    ]
  },

  'paint-coverage': {
    id: 'paint-coverage',
    category: 'paint',
    slug: 'coverage-calculator',
    name: 'Paint Coverage Calculator',
    howItCalculated: {
      imperial: {
        title: "How Paint Coverage is Calculated (Imperial)",
        formula: "Gallons = ⌈[Wall Area (sq ft) × Number of Coats] ÷ 350 sq ft/gal⌉",
        /* SOURCE: Paint Quality Institute: 350 to 400 sq ft per US gallon on smooth sealed drywall */
        explanation: "Paint coverage calculations determine total wall surface area multiplied by the desired number of coats, then divided by the theoretical spreading rate of architectural coatings. Standard interior latex wall paint covers between 350 and 400 square feet per gallon on sealed, smooth drywall. Our formula utilizes 350 square feet per gallon to provide a reliable buffer for roller nap absorption, brush cut-in, and stipple texture. Gross wall area is calculated by multiplying room perimeter (two times length plus two times width) by wall height. Multiplying wall area by the number of coats (standard at 2 coats for full opacity) yields total coated square footage before dividing by 350 and rounding up to whole gallon cans.",
        variables: [
          { symbol: "Length (ft)", name: "Room Length", description: "The horizontal length of the room in feet." },
          { symbol: "Width (ft)", name: "Room Width", description: "The horizontal width of the room in feet." },
          { symbol: "Height (ft)", name: "Wall Height", description: "The vertical distance from floor to ceiling in feet." },
          { symbol: "Coats", name: "Number of Coats", description: "The count of paint layers applied (2 coats are recommended for durability and color depth)." },
          { symbol: "Gallons", name: "Total Paint Volume", description: "The required liquid paint volume in US gallons, rounded up to the nearest whole container." }
        ],
        steps: [
          { stepNumber: 1, name: "Calculate Perimeter Wall Area", instruction: "Multiply room perimeter [2 × (Length + Width)] by wall height to find gross wall area." },
          { stepNumber: 2, name: "Multiply by Number of Coats", instruction: "Multiply gross wall area by the number of coats (typically 2 coats)." },
          { stepNumber: 3, name: "Divide by Coverage Rate", instruction: "Divide total coated area by 350 sq ft per gallon." },
          { stepNumber: 4, name: "Round Up to Whole Gallons", instruction: "Round up the result to the next whole gallon container." }
        ]
      },
      metric: {
        title: "How Paint Coverage is Calculated (Metric)",
        formula: "Liters Needed = ⌈[Wall Area (m²) × Number of Coats] ÷ 10 m²/L⌉",
        /* SOURCE: European / International architectural paint coating standard (ISO 6504 / BS 6150) - 10 m² per liter on smooth primed plasterboard */
        explanation: "Paint coverage estimation determines total wall surface area in square meters multiplied by the desired number of coats, then divided by the spreading rate of architectural coating. Standard interior latex wall paint covers approximately 10 square meters per liter on sealed, smooth plasterboard or drywall. Gross wall area is calculated by multiplying room perimeter [2 × (Length + Width)] by ceiling height. Multiplying wall area by the number of coats (standard at 2 coats for full color depth and durability) yields total coated surface before dividing by 10 m²/L and rounding up to full liter or multi-liter can sizes.",
        variables: [
          { symbol: "Length (m)", name: "Room Length", description: "The horizontal length of the room in meters." },
          { symbol: "Width (m)", name: "Room Width", description: "The horizontal width of the room in meters." },
          { symbol: "Height (m)", name: "Wall Height", description: "The vertical height of the walls in meters." },
          { symbol: "Coats", name: "Number of Coats", description: "The number of paint coats (2 coats recommended for even sheen and scrub resistance)." },
          { symbol: "Liters", name: "Total Paint Volume", description: "The required paint volume in liters, rounded up to whole liter container increments." }
        ],
        steps: [
          { stepNumber: 1, name: "Calculate Wall Area", instruction: "Multiply perimeter [2 × (Length + Width)] by wall height in meters." },
          { stepNumber: 2, name: "Multiply by Coats", instruction: "Multiply gross wall area by the number of coats (standard 2 coats)." },
          { stepNumber: 3, name: "Divide by 10 m²/L", instruction: "Divide total coated area by standard coverage of 10 m² per liter." },
          { stepNumber: 4, name: "Round Up to Full Cans", instruction: "Round up to the nearest whole liter, 2.5L, 5L, or 10L commercial container." }
        ]
      }
    },
    workedExample: {
      imperial: {
        title: "Worked Example: 12ft × 12ft Room with 8ft Walls (2 Coats)",
        scenario: "Applying two coats of interior eggshell latex paint to the walls of a 12 ft by 12 ft bedroom with 8-foot ceiling heights.",
        steps: [
          { label: "Perimeter wall area", formula: "2 × (12 × 8) + 2 × (12 × 8)", result: "384.0 sq ft" },
          { label: "Two coat application", formula: "384.0 sq ft × 2 coats", result: "768.0 sq ft" },
          { label: "Gallons calculation", formula: "768.0 sq ft ÷ 350 sq ft/gal", result: "2.19 gallons" },
          { label: "Container rounding", formula: "Round up 2.19", result: "3 gallons" }
        ],
        summary: "You will need 3 gallons of wall paint. This provides enough coating for two complete coats plus a reserve for tray residue and future touch-ups."
      },
      metric: {
        title: "Worked Example: 4m × 4m Room with 2.5m Walls (2 Coats)",
        scenario: "Applying two coats of interior emulsion wall paint to the walls of a 4.0 m by 4.0 m bedroom with 2.5 m ceiling heights.",
        steps: [
          { label: "Perimeter wall area", formula: "2 × (4.0 × 2.5) + 2 × (4.0 × 2.5)", result: "40.0 m²" },
          { label: "Two coat application", formula: "40.0 m² × 2 coats", result: "80.0 m²" },
          { label: "Liters calculation", formula: "80.0 m² ÷ 10 m²/L", result: "8.0 Liters" },
          { label: "Container purchase", formula: "8.0 Liters", result: "8 Liters (e.g. two 5L cans)" }
        ],
        summary: "You will need 8.0 Liters of wall paint. Purchasing two 5-liter cans (or one 10-liter bucket) provides enough paint for two solid coats plus a touch-up reserve."
      }
    },
    commonMistakes: [
      {
        title: "Expecting 1-Coat Coverage Over Bare Drywall",
        whyItMatters: "Fresh drywall paper and taping compound absorb binder unevenly, producing dull patches known as suction flashing.",
        howToAvoid: "Apply a dedicated PVA drywall primer before applying your colored finish coats."
      },
      {
        title: "Ignoring Textured Wall Surfaces",
        /* SOURCE: Paint Quality Institute: Rough knockdown, heavy orange peel, or stucco reduces coverage by 20% to 30% */
        whyItMatters: "Rough knockdown, orange-peel, or masonry surfaces increase actual surface area, reducing coverage from 10 m²/L down to 7 m²/L (or 350 down to 250 sq ft/gal).",
        howToAvoid: "Budget for 20% to 30% more paint when coating heavily textured surfaces."
      },
      {
        title: "Not Reserving Paint for Future Touch-Ups",
        whyItMatters: "Computerized paint tinting formulas can drift between store batches; running out leaves you unable to spot-repair future scuffs.",
        howToAvoid: "Always round up to the next container size to ensure you keep a touch-up reserve from the original batch."
      },
      {
        title: "Assuming Wall Paint Covers Ceilings and Trim",
        whyItMatters: "Ceilings require flat non-reflective paint, while baseboards and doors require durable semi-gloss or satin enamel.",
        howToAvoid: "Calculate ceiling square footage and linear trim dimensions separately from wall paint."
      }
    ],
    faqs: [
      {
        question: "How much area does one gallon or liter of paint cover?",
        /* SOURCE: Sherwin-Williams & Benjamin Moore Technical Specifications */
        answer: "One US gallon covers 350 to 400 square feet (approx 33 to 37 m²) on smooth, primed surfaces, which equals roughly 10 square meters per liter. On textured walls or porous unprimed plaster, coverage drops closer to 7 to 8 m² per liter (275 to 300 sq ft/gal)."
      },
      {
        question: "Do I always need two coats of paint?",
        answer: "Yes. Even premium formulas require two coats to achieve uniform color saturation, scrub resistance, and sheen consistency without lap marks."
      },
      {
        question: "Should I deduct doors and windows from my wall area?",
        answer: "Standard practice is to ignore standard windows and doors. The small square footage accounted for serves as a natural reserve for roller tray residue, cutting-in brushes, and future touch-ups."
      },
      {
        question: "How much paint is needed for an average room?",
        answer: "A typical 4x4 meter (12x12 foot) room with standard ceiling height has around 40 m² (384 sq ft) of wall area. For two coats, you will need 8 liters (or approximately 2.2 gallons, which means purchasing 3 single-gallon cans)."
      }
    ],
    crossCategoryCalculators: [
      {
        id: "drywall-sheet",
        name: "Drywall Sheet Calculator",
        category: "drywall",
        slug: "sheet-calculator",
        jobContext: "Estimate drywall sheets prior to taping and painting room walls"
      },
      {
        id: "laminate-flooring",
        name: "Laminate Flooring Calculator",
        category: "flooring",
        slug: "laminate-calculator",
        jobContext: "Calculate flooring requirements after painting and trim work are done"
      },
      {
        id: "deck-board",
        name: "Deck Board Calculator",
        category: "framing",
        slug: "deck-board-calculator",
        jobContext: "Calculate exterior deck stain or sealant coverage for outdoor decking"
      }
    ]
  },

  'deck-board': {
    id: 'deck-board',
    category: 'framing',
    slug: 'deck-board-calculator',
    name: 'Deck Board Calculator',
    howItCalculated: {
      imperial: {
        title: "How Deck Boards are Calculated (Imperial)",
        formula: "Total Boards = ⌈[Deck Area ÷ Board Coverage Area] × (1 + Waste% / 100)⌉",
        /* SOURCE: NIST PS 20 American Softwood Lumber Standard & NADRA: Nominal 5/4x6 radius edge decking is surfaced to actual 5.5 inches (140 mm). Standard gap spacing is 1/8 inch (3 mm). */
        explanation: "Deck board estimation determines the number of decking planks required to surface a deck frame based on actual lumber dimensions, gap spacing, and board length. While decking lumber is commonly designated by nominal terms like '5/4x6' or '2x6', standard 6-inch deck boards actually measure 5.5 inches in width. When planks are installed, an expansion gap (typically 1/8-inch or 0.125 inches for treated wood to allow water drainage) is added to actual width. Multiplying this effective width in feet by board length yields single-board square footage. Dividing total deck square footage by single-board coverage and applying a waste allowance (10% for perpendicular decking, 15% for diagonal layouts) yields total boards needed.",
        variables: [
          { symbol: "Deck Length (ft)", name: "Deck Length", description: "The deck dimension in feet running parallel to joists." },
          { symbol: "Deck Width (ft)", name: "Deck Width", description: "The perpendicular deck dimension in feet." },
          { symbol: "Board Width (in)", name: "Actual Board Width", description: "The actual face width of the decking plank in inches (5.5 inches for nominal 6-inch lumber)." },
          { symbol: "Board Length (ft)", name: "Stock Board Length", description: "The purchased length of commercial lumber in feet (typically 12, 16, or 20 ft)." },
          { symbol: "Gap Spacing (in)", name: "Expansion Gap", description: "The space left between adjacent planks in inches (commonly 1/8-inch or 0.125\")." },
          { symbol: "Waste (%)", name: "Waste Percentage", description: "The cutting, trimming, and sorting buffer (typically 10%–15%)." }
        ],
        steps: [
          { stepNumber: 1, name: "Calculate Deck Area", instruction: "Multiply deck length by deck width in feet to obtain gross deck surface area." },
          { stepNumber: 2, name: "Calculate Effective Board Width", instruction: "Add actual board width and gap spacing in inches, then divide by 12 to convert to feet." },
          { stepNumber: 3, name: "Determine Single Board Coverage", instruction: "Multiply effective board width in feet by board length in feet to get square feet per board." },
          { stepNumber: 4, name: "Calculate Total Boards", instruction: "Divide deck area by single board coverage, multiply by (1 + waste% / 100), and round up." }
        ]
      },
      metric: {
        title: "How Deck Boards are Calculated (Metric)",
        formula: "Total Boards = ⌈[Deck Area (m²) ÷ Board Coverage (m²)] × (1 + Waste% / 100)⌉",
        /* SOURCE: European / Australian decking standards (e.g. AS 1684 / EN 338): Standard decking planks are 140 mm (0.14 m) in width with 4 mm expansion spacing */
        explanation: "Deck board estimation determines the number of decking planks required to surface a deck frame based on actual board dimensions, gap spacing, and board length. Standard commercial decking boards measure 140 mm (14 cm) in width. When installed, a drainage and expansion gap (typically 4 mm or 0.4 cm) is added to the board width. Multiplying effective width in meters (144 mm = 0.144 m) by plank length in meters yields single-board coverage area. Dividing total deck square meters by single-board coverage and applying a 10% waste allowance yields total boards required.",
        variables: [
          { symbol: "Deck Length (m)", name: "Deck Length", description: "The deck dimension in meters running parallel to joists." },
          { symbol: "Deck Width (m)", name: "Deck Width", description: "The perpendicular deck dimension in meters." },
          { symbol: "Board Width (cm)", name: "Actual Board Width", description: "The face width of the decking board in centimeters (standard 14.0 cm / 140 mm)." },
          { symbol: "Board Length (m)", name: "Plank Length", description: "The commercial purchased plank length in meters (typically 3.6 m, 4.0 m, or 4.8 m)." },
          { symbol: "Gap Spacing (cm)", name: "Expansion Gap", description: "The drainage space between planks (commonly 0.4 cm / 4 mm)." },
          { symbol: "Waste (%)", name: "Waste Percentage", description: "The cutting and trimming allowance (standard at 10% for straight layouts)." }
        ],
        steps: [
          { stepNumber: 1, name: "Calculate Deck Area", instruction: "Multiply deck length by deck width in meters to find total square meters." },
          { stepNumber: 2, name: "Calculate Effective Width", instruction: "Add board width and gap spacing in cm, then divide by 100 to convert to meters." },
          { stepNumber: 3, name: "Determine Board Coverage", instruction: "Multiply effective width in meters by board length in meters." },
          { stepNumber: 4, name: "Calculate Total Boards", instruction: "Divide deck area by board coverage, multiply by (1 + waste% / 100), and round up." }
        ]
      }
    },
    workedExample: {
      imperial: {
        title: "Worked Example: 12ft × 12ft Deck with 5.5in Boards (12ft Length)",
        scenario: "Surfacing a 12 ft long by 12 ft wide backyard deck using 12-foot nominal 6-inch boards (actual 5.5 inches) with 1/8-inch (0.125\") gap spacing and 10% waste.",
        steps: [
          { label: "Deck surface area", formula: "12 ft × 12 ft", result: "144.0 sq ft" },
          { label: "Effective board width", formula: "(5.5 in + 0.125 in) ÷ 12", result: "0.46875 ft" },
          { label: "Single 12ft board coverage", formula: "0.46875 ft × 12 ft", result: "5.625 sq ft" },
          { label: "Base boards needed", formula: "144.0 ÷ 5.625", result: "25.6 boards" },
          { label: "Apply 10% waste buffer", formula: "25.6 × 1.10", result: "28.16 → 29 boards" }
        ],
        summary: "You will need 29 twelve-foot deck boards. This ensures full coverage across your 12-foot span with sufficient material for end trimmings and knot culls."
      },
      metric: {
        title: "Worked Example: 4m × 4m Deck with 140mm Boards (4m Length)",
        scenario: "Surfacing a 4.0 meter by 4.0 meter deck using 4.0-meter planks measuring 140 mm in width with a 4 mm gap and 10% waste.",
        steps: [
          { label: "Deck surface area", formula: "4.0 m × 4.0 m", result: "16.0 m²" },
          { label: "Effective board width", formula: "(140 mm + 4 mm) ÷ 1,000", result: "0.144 m" },
          { label: "Single 4m board coverage", formula: "0.144 m × 4.0 m", result: "0.576 m²" },
          { label: "Base boards needed", formula: "16.0 ÷ 0.576", result: "27.78 boards" },
          { label: "Apply 10% waste buffer", formula: "27.78 × 1.10", result: "30.56 → 31 boards" }
        ],
        summary: "You will need 31 boards of 4.0-meter decking lumber to complete the deck surface with proper end cuts and sorting."
      }
    },
    commonMistakes: [
      {
        title: "Using Nominal 6-Inch Dimensions in Math",
        /* SOURCE: NIST PS 20: 6-inch nominal lumber is surfaced to 5.5 inches (140 mm) */
        whyItMatters: "Entering 6 inches instead of actual 5.5-inch board width underestimates board counts by nearly 10%, leaving you short.",
        howToAvoid: "Always enter the actual measured face width (5.5 inches / 140 mm for standard 6\" decking)."
      },
      {
        title: "Over-Gapping Wet Treated Lumber",
        whyItMatters: "Wet pressure-treated wood from supplier yards is saturated with preservative and shrinks significantly as it dries; installing wet wood with wide gaps leaves excessive gaps later.",
        howToAvoid: "Install wet pressure-treated lumber with minimal spacing (1.5 mm / 1/16-inch); gap dry or composite boards 3 mm to 5 mm (1/8 to 3/16 inch)."
      },
      {
        title: "Failing to Plan Joist Splices",
        whyItMatters: "Board ends must break centered over a joist; purchasing arbitrary board lengths creates awkward butt joints.",
        howToAvoid: "Order board lengths that match total deck width or break evenly on joist layouts."
      },
      {
        title: "Neglecting Picture-Frame Perimeter Borders",
        whyItMatters: "Installing a picture-frame border requires perimeter blocking and increases miter cut scrap by 10% to 15%.",
        howToAvoid: "Add extra boards to your order specifically for perimeter blocking and border runs."
      }
    ],
    faqs: [
      {
        question: "What is the actual width of a standard deck board?",
        /* SOURCE: NIST PS 20 Softwood Lumber Standard */
        answer: "A standard nominal 5/4x6 wood or composite deck board actually measures 1 inch thick by 5-1/2 inches (140 mm) wide. Nominal 2x6 framing lumber boards measure 1-1/2 inches thick by 5-1/2 inches (38 mm × 140 mm) wide."
      },
      {
        question: "How much gap should I leave between deck boards?",
        answer: "For composite and kiln-dried wood, leave a 3 mm to 5 mm (1/8-inch to 3/16-inch) gap for drainage and expansion. For wet pressure-treated wood fresh from the supplier, butt boards closely (approx 1.5 mm), as they shrink as they season."
      },
      {
        question: "Should deck boards be laid perpendicular or diagonal?",
        /* SOURCE: NADRA Deck Construction Guidelines */
        answer: "Perpendicular installation (90 degrees to joists) allows standard 400 mm (16-inch) joist spacing and keeps waste around 10%. Diagonal 45-degree layouts look upscale but require 300 mm (12-inch) joist spacing and generate 15% to 20% cut waste."
      },
      {
        question: "How do I choose between different board lengths?",
        answer: "Select board lengths that match your deck dimension without seams. For example, on a 4.0-meter or 16-foot wide deck, matching plank lengths eliminate all spliced butt joints, preventing water infiltration and rot at joint seams."
      }
    ],
    crossCategoryCalculators: [
      {
        id: "concrete-footing",
        name: "Concrete Footing Calculator",
        category: "concrete",
        slug: "footing-calculator",
        jobContext: "Poured concrete pier footings to support deck support posts"
      },
      {
        id: "concrete-slab",
        name: "Concrete Slab Calculator",
        category: "concrete",
        slug: "slab-calculator",
        jobContext: "Concrete patio or landing pad at the base of deck stairs"
      },
      {
        id: "paint-coverage",
        name: "Paint Coverage Calculator",
        category: "paint",
        slug: "coverage-calculator",
        jobContext: "Exterior deck stain or water sealant coverage for deck boards"
      }
    ]
  },

  'laminate-flooring': {
    id: 'laminate-flooring',
    category: 'flooring',
    slug: 'laminate-calculator',
    name: 'Laminate Flooring Calculator',
    howItCalculated: {
      imperial: {
        title: "How Laminate Flooring Boxes are Calculated (Imperial)",
        formula: "Boxes Needed = ⌈[Room Area (sq ft) × (1 + Waste% / 100)] ÷ Coverage Per Box⌉",
        /* SOURCE: NALFA (North American Laminate Flooring Association) Standard Installation Guidelines: 10% waste buffer for rectangular straight-lay rooms; typical cartons contain 18 to 24 sq ft */
        explanation: "Laminate and luxury vinyl plank (LVP) flooring estimation calculates total room floor area, adds a cutting waste allowance, and divides by the certified square footage contained inside one manufacturer carton. Rooms are rarely exact multiples of plank dimensions; every row ends with an offcut, and boards must be crosscut around door casings, closet alcoves, and heating vents. A 10% waste factor is standard for straight plank installations in rectangular rooms, while 15% is required for rooms with diagonal walls or continuous transitions through multiple doorways. Because suppliers do not sell individual planks, total required square footage is divided by box coverage (typically 20 to 24 sq ft) and rounded up to the nearest whole unopened carton.",
        variables: [
          { symbol: "Length (ft)", name: "Room Length", description: "The longer dimension of the room in feet." },
          { symbol: "Width (ft)", name: "Room Width", description: "The shorter dimension of the room in feet." },
          { symbol: "Coverage/Box", name: "Box Coverage", description: "The certified square footage contained in one sealed carton (typically 20–24 sq ft)." },
          { symbol: "Waste (%)", name: "Waste Percentage", description: "The cutting scrap and cull allowance (typically 10% for straight layouts)." },
          { symbol: "Boxes", name: "Total Cartons Needed", description: "The total integer count of full flooring boxes to order from the retailer." }
        ],
        steps: [
          { stepNumber: 1, name: "Calculate Room Square Footage", instruction: "Multiply room length by width in feet to find net floor area." },
          { stepNumber: 2, name: "Apply Waste Percentage", instruction: "Multiply net floor area by (1 + waste% / 100) to account for offcuts and end-plank trimming." },
          { stepNumber: 3, name: "Divide by Box Coverage", instruction: "Divide gross square footage by the specific square footage covered by one box." },
          { stepNumber: 4, name: "Round Up to Whole Boxes", instruction: "Round up to the nearest whole integer box count." }
        ]
      },
      metric: {
        title: "How Laminate Flooring Boxes are Calculated (Metric)",
        formula: "Boxes Needed = ⌈[Room Area (m²) × (1 + Waste% / 100)] ÷ Coverage Per Box (m²)⌉",
        /* SOURCE: European Producers of Laminate Flooring (EPLF) Technical Guidelines: Typical cartons contain 1.8 to 2.2 m² of flooring */
        explanation: "Laminate and vinyl plank flooring estimation calculates total room floor area in square meters, adds a cutting waste allowance, and divides by the certified square meter coverage inside each sealed manufacturer carton. Rooms are rarely exact multiples of plank dimensions; every row ends with an offcut, and boards must be crosscut around door frames and heating vents. A 10% waste allowance is standard for straight plank layouts in rectangular rooms, while 15% is required for diagonal layouts or multi-room continuous runs. Dividing gross square meters by box coverage (typically 2.0 to 2.2 m² per box) and rounding up yields total unopened cartons.",
        variables: [
          { symbol: "Length (m)", name: "Room Length", description: "The longer dimension of the room in meters." },
          { symbol: "Width (m)", name: "Room Width", description: "The shorter dimension of the room in meters." },
          { symbol: "Coverage/Box", name: "Box Coverage", description: "The certified square meters contained in one carton (typically 2.0 to 2.2 m²)." },
          { symbol: "Waste (%)", name: "Waste Percentage", description: "The cutting allowance for starter and end pieces (standard at 10%)." },
          { symbol: "Boxes", name: "Cartons Needed", description: "The total whole number of cartons to purchase." }
        ],
        steps: [
          { stepNumber: 1, name: "Calculate Room Area", instruction: "Multiply length in meters by width in meters to find floor square meters." },
          { stepNumber: 2, name: "Add 10% Waste Factor", instruction: "Multiply room area by 1.10 to account for cutting scrap." },
          { stepNumber: 3, name: "Divide by Box Coverage", instruction: "Divide gross area by the certified square meters per box." },
          { stepNumber: 4, name: "Round Up to Full Box", instruction: "Round up to the nearest whole number of unopened cartons." }
        ]
      }
    },
    workedExample: {
      imperial: {
        title: "Worked Example: 12ft × 15ft Room with 24 sq ft Boxes",
        scenario: "Flooring a 12 ft by 15 ft living room (180 sq ft) with interlocking laminate planks packed at 24 square feet per box with a 10% waste factor.",
        steps: [
          { label: "Net room surface area", formula: "12 ft × 15 ft", result: "180.0 sq ft" },
          { label: "Add 10% waste buffer", formula: "180.0 sq ft × 1.10", result: "198.0 sq ft" },
          { label: "Boxes calculation", formula: "198.0 sq ft ÷ 24 sq ft/box", result: "8.25 boxes" },
          { label: "Whole box rounding", formula: "Round up 8.25", result: "9 boxes" }
        ],
        summary: "You will need 9 full boxes (providing 216 square feet total). This covers all offcuts and provides a partial spare box for future plank replacements."
      },
      metric: {
        title: "Worked Example: 4m × 5m Room with 2.2 m² Boxes",
        scenario: "Flooring a 4.0 meter by 5.0 meter living room (20.0 m²) with laminate planks packaged at 2.2 square meters per carton with a 10% waste factor.",
        steps: [
          { label: "Net room surface area", formula: "4.0 m × 5.0 m", result: "20.0 m²" },
          { label: "Add 10% waste buffer", formula: "20.0 m² × 1.10", result: "22.0 m²" },
          { label: "Boxes calculation", formula: "22.0 m² ÷ 2.2 m²/box", result: "10.0 boxes" },
          { label: "Whole box rounding", formula: "Exact cartons", result: "10 boxes" }
        ],
        summary: "You will need 10 full boxes of flooring (providing 22.0 m² total). This covers all offcuts and provides spare planks for future board replacements."
      }
    },
    commonMistakes: [
      {
        title: "Failing to Acclimate Flooring to Indoor Climate",
        whyItMatters: "Laminate fiberboard cores expand and contract with indoor humidity; installing immediately out of a cold truck causes buckled joints later.",
        howToAvoid: "Store sealed boxes flat inside the conditioned installation room for at least 48 hours prior to unboxing."
      },
      {
        title: "Disregarding Minimum End-Joint Stagger",
        /* SOURCE: NALFA & NWFA Installation Guidelines: Minimum 8 inches (200 mm) end-joint overlap between adjacent rows */
        whyItMatters: "Placing end joints closer than 20 cm (8 inches) weakens the tongue-and-groove locking system, allowing planks to separate.",
        howToAvoid: "Stagger end joints by a minimum of 20 cm (8 inches) between adjacent plank rows."
      },
      {
        title: "Pinching Floating Floors Against Perimeter Walls",
        /* SOURCE: EPLF & NALFA Standards: Minimum 10 mm (3/8 in) expansion gap required around all perimeter walls and vertical obstacles */
        whyItMatters: "Floating floors expand seasonally; installing planks tight against drywall causes the entire floor to peak and buckle.",
        howToAvoid: "Maintain a minimum 10 mm (3/8-inch) expansion gap along all walls, covered by baseboards or scotia molding."
      },
      {
        title: "Installing Over Unlevel Subfloors",
        whyItMatters: "Dips or humps exceeding 5 mm across 3 meters (3/16-inch across 10 feet) cause floating planks to bounce, creak, and snap locking tabs under foot.",
        howToAvoid: "Check subfloors with a straight edge and level with self-leveling compound or sanding prior to plank layout."
      }
    ],
    faqs: [
      {
        question: "How much extra laminate flooring should I order for waste?",
        answer: "Order 10% extra for standard rectangular rooms. For rooms with angled walls, multiple doorways, diagonal layouts, or stairs, order 15% extra to avoid running short on final cuts."
      },
      {
        question: "How many square meters or feet are in a box of flooring?",
        /* SOURCE: EPLF / NALFA Carton Specifications */
        answer: "Most laminate and luxury vinyl plank cartons contain between 1.8 and 2.2 square meters (18 to 24 square feet), depending on plank width and thickness. Always verify the exact box coverage printed on your product carton."
      },
      {
        question: "Do I need to buy underlayment separately?",
        answer: "Many modern laminate planks come with pre-attached acoustic padding. If your planks have bare backing, you must purchase foam underlayment rolls, plus a 0.15 mm (6-mil) poly moisture barrier if installing over concrete."
      },
      {
        question: "Can I return unused boxes of flooring?",
        answer: "Most retailers accept returns of unopened full boxes within 30 to 90 days. However, keeping at least one spare box in conditioned storage is strongly recommended in case boards are damaged later, as patterns are frequently discontinued."
      }
    ],
    crossCategoryCalculators: [
      {
        id: "tile-coverage",
        name: "Tile Coverage Calculator",
        category: "tile",
        slug: "coverage-calculator",
        jobContext: "Calculate ceramic or stone tile coverage for adjacent entryway or kitchen areas"
      },
      {
        id: "paint-coverage",
        name: "Paint Coverage Calculator",
        category: "paint",
        slug: "coverage-calculator",
        jobContext: "Paint coverage for walls and baseboard molding before laying new flooring"
      },
      {
        id: "drywall-sheet",
        name: "Drywall Sheet Calculator",
        category: "drywall",
        slug: "sheet-calculator",
        jobContext: "Substrate and wall repairs prior to new flooring installation"
      }
    ]
  }
};

export function getCalculatorContent(id: string): CalculatorContent | undefined {
  return calculatorContentMap[id];
}
