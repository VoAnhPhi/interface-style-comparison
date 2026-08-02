import {
  PRODUCT_TYPES,
  VISUAL_DNA_DIMENSIONS,
  type ComplexityLevel,
  type DimensionLevel,
  type ProductType,
  type StyleClassification,
  type StyleMaturity,
  type ProductionReadiness,
  type VisualDNADimension,
} from "../vocabulary";
import { INITIAL_SCENARIO_IDS } from "../scenarios";
import type {
  CoreEvaluationSet,
  ProductFit,
} from "../evaluation";
import type {
  ResearchClaim,
  ResearchSource,
  ReviewMetadata,
} from "../evidence";
import type {
  LegacyRendererClassification,
  ResearchStatement,
  ResearchStyle,
  VisualDNA,
} from "../style";

const MIGRATION_DATE = "2026-08-02";
const MIGRATION_VERSION = "0.2.0-migration";

type MigratedStyleBlueprint = {
  id: string;
  name: string;
  aliases: readonly string[];
  summary: string;
  characteristics: readonly string[];
  classification: StyleClassification;
  maturity: StyleMaturity;
  productionReadiness: ProductionReadiness;
  rendererClassification: LegacyRendererClassification;
  complexity: ComplexityLevel;
  definition: string;
  principles: readonly string[];
  signals: readonly string[];
  visualDNA: Record<VisualDNADimension, DimensionLevel>;
};

const incompleteReview: ReviewMetadata = {
  contentStatus: "incomplete",
  reviewStatus: "not-reviewed",
  version: MIGRATION_VERSION,
};

const blueprints = [
  {
    id: "minimal-clean",
    name: "Minimal / Clean",
    aliases: ["minimal", "clean-ui"],
    summary: "Quiet, durable UI where clarity, whitespace, and typography do most of the work.",
    characteristics: ["Neutral palette", "Flat surfaces", "Light borders", "Generous whitespace", "Few effects"],
    classification: "interface-direction",
    maturity: "established",
    productionReadiness: "production-ready",
    rendererClassification: "production-safe",
    complexity: "low",
    definition: "A restrained interface direction that uses whitespace, typography, borders, and alignment as its primary visual system.",
    principles: [
      "Use hierarchy, spacing, and alignment before decorative effects.",
      "Keep surfaces and interaction states quiet enough for long-lived product work.",
    ],
    signals: [
      "Whitespace establishes grouping before decoration is added.",
      "Borders, contrast, and focus states carry most interaction affordance.",
    ],
    visualDNA: {
      depth: "very-low", decoration: "very-low", density: "medium", "visual-weight": "low",
      motion: "low", "contrast-dependency": "low", "brand-expression": "low", "surface-complexity": "low",
    },
  },
  {
    id: "enterprise-admin",
    name: "Enterprise / Admin",
    aliases: ["admin-ui", "enterprise-ui"],
    summary: "Operational UI optimized for scanning, forms, filters, tables, and repeated work.",
    characteristics: ["Clear borders", "Compact controls", "Status colors", "Table-like rhythm", "Low decoration"],
    classification: "interface-direction",
    maturity: "established",
    productionReadiness: "production-ready",
    rendererClassification: "production-safe",
    complexity: "medium",
    definition: "A dense operational direction organized around predictable navigation, compact controls, status clarity, and repeated task completion.",
    principles: [
      "Prioritize scan rhythm, stable alignment, and explicit system state.",
      "Use compact controls without sacrificing keyboard access or row-level focus.",
    ],
    signals: [
      "Tables, filters, forms, and status badges dominate the visual grammar.",
      "Low decoration keeps repeated operational work legible.",
    ],
    visualDNA: {
      depth: "low", decoration: "very-low", density: "very-high", "visual-weight": "medium",
      motion: "low", "contrast-dependency": "low", "brand-expression": "low", "surface-complexity": "medium",
    },
  },
  {
    id: "editorial-portfolio",
    name: "Editorial / Portfolio",
    aliases: ["editorial-ui", "portfolio-ui"],
    summary: "Typography-led composition with expressive hierarchy and fewer conventional app surfaces.",
    characteristics: ["Large headlines", "Asymmetry", "Graphic spacing", "Image-like cards", "Understated controls"],
    classification: "interface-direction",
    maturity: "established",
    productionReadiness: "production-with-constraints",
    rendererClassification: "expressive",
    complexity: "high",
    definition: "An image- and typography-led direction that treats composition, pacing, and content framing as the primary interface material.",
    principles: [
      "Let type scale and editorial pacing create hierarchy.",
      "Use asymmetry and image framing deliberately while preserving reading order.",
    ],
    signals: [
      "Large headlines and asymmetrical spacing replace dense application chrome.",
      "The quality of the content and imagery strongly affects the perceived system.",
    ],
    visualDNA: {
      depth: "medium", decoration: "high", density: "low", "visual-weight": "high",
      motion: "medium", "contrast-dependency": "medium", "brand-expression": "high", "surface-complexity": "medium",
    },
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    aliases: ["frosted-glass", "glass-ui"],
    summary: "Frosted translucent surfaces over rich backgrounds, useful as an accent rather than a full system.",
    characteristics: ["Backdrop blur", "Transparent panels", "Edge highlights", "Gradient backdrops", "Soft depth"],
    classification: "visual-aesthetic",
    maturity: "established",
    productionReadiness: "use-selectively",
    rendererClassification: "experimental",
    complexity: "high",
    definition: "A translucent visual treatment that uses blur, transparency, edge highlights, and layered backgrounds to create depth.",
    principles: [
      "Protect important reading surfaces from variable backgrounds.",
      "Treat blur, transparency, and contrast as controlled material choices.",
    ],
    signals: [
      "Frosted panels depend on backdrop context to communicate depth.",
      "Contrast and performance risks increase as translucent layers multiply.",
    ],
    visualDNA: {
      depth: "high", decoration: "high", density: "low", "visual-weight": "medium",
      motion: "medium", "contrast-dependency": "very-high", "brand-expression": "high", "surface-complexity": "very-high",
    },
  },
  {
    id: "neo-brutalism",
    name: "Neo-brutalism",
    aliases: ["neobrutalism", "neo-brutalist"],
    summary: "Loud, graphic interface style with thick outlines, hard shadows, and high-contrast color.",
    characteristics: ["Thick black borders", "Hard offset shadows", "Saturated fills", "Bold type", "Poster-like modules"],
    classification: "visual-aesthetic",
    maturity: "emerging",
    productionReadiness: "prototype-only",
    rendererClassification: "expressive",
    complexity: "high",
    definition: "A graphic treatment built from blunt borders, hard offsets, saturated fills, and deliberately exposed interface structure.",
    principles: [
      "Make structure and affordance visible through strong edges and contrast.",
      "Use visual intensity selectively so emphasis remains meaningful.",
    ],
    signals: [
      "Thick outlines and hard offset shadows replace subtle elevation.",
      "Saturated fills and poster-like modules create a narrow but memorable voice.",
    ],
    visualDNA: {
      depth: "medium", decoration: "high", density: "medium", "visual-weight": "very-high",
      motion: "medium", "contrast-dependency": "high", "brand-expression": "very-high", "surface-complexity": "high",
    },
  },
  {
    id: "material-fluent",
    name: "Material / Fluent-like",
    aliases: ["material", "fluent"],
    summary: "Systemized, token-led UI with clear states, formal elevation, and familiar component anatomy.",
    characteristics: ["State layers", "Semantic roles", "Documented elevations", "Consistent fields", "Structured dialogs"],
    classification: "design-language",
    maturity: "established",
    productionReadiness: "production-ready",
    rendererClassification: "system-language",
    complexity: "medium",
    definition: "A design-language direction that organizes components, states, elevation, and semantic roles into a documented system.",
    principles: [
      "Model component states and semantic roles consistently across surfaces.",
      "Use documented tokens and predictable anatomy instead of local decoration.",
    ],
    signals: [
      "State layers, fields, dialogs, and elevation follow reusable conventions.",
      "Consistency and scale are more important than bespoke visual expression.",
    ],
    visualDNA: {
      depth: "medium", decoration: "low", density: "high", "visual-weight": "medium",
      motion: "low", "contrast-dependency": "low", "brand-expression": "medium", "surface-complexity": "medium",
    },
  },
  {
    id: "neumorphism",
    name: "Neumorphism",
    aliases: ["soft-ui", "neuromorphic"],
    summary: "A soft tactile control language that needs explicit labels, contrast, and focus cues to stay usable.",
    characteristics: ["Embossed controls", "Inset states", "Tone-on-tone palette", "Large radius", "Very soft shadows"],
    classification: "visual-aesthetic",
    maturity: "revived",
    productionReadiness: "use-selectively",
    rendererClassification: "experimental",
    complexity: "high",
    definition: "A soft-surface treatment that uses inset and raised shadows to suggest tactile controls on a low-contrast canvas.",
    principles: [
      "Treat tactile depth as a visual accent rather than the only state signal.",
      "Add explicit labels, outlines, and focus feedback wherever affordance is ambiguous.",
    ],
    signals: [
      "Tone-on-tone surfaces and soft shadows carry most of the material metaphor.",
      "Discoverability drops when state changes rely on shadow alone.",
    ],
    visualDNA: {
      depth: "high", decoration: "low", density: "low", "visual-weight": "medium",
      motion: "low", "contrast-dependency": "very-high", "brand-expression": "low", "surface-complexity": "high",
    },
  },
  {
    id: "flat-design",
    name: "Flat Design",
    aliases: ["flat-ui", "2d-ui"],
    summary: "A direct 2D UI language where solid fills, dividers, typography, and explicit state changes replace simulated depth.",
    characteristics: ["Flat fills", "Simple icons", "Few shadows", "Typography-led hierarchy", "Clear color blocks"],
    classification: "historical-movement",
    maturity: "established",
    productionReadiness: "production-with-constraints",
    rendererClassification: "historical-reference",
    complexity: "low",
    definition: "A two-dimensional interface movement that removes simulated material depth and makes layout and state logic explicit.",
    principles: [
      "Use solid fills, typography, and clear grouping instead of faux material effects.",
      "Replace removed depth cues with explicit borders, labels, and focus states.",
    ],
    signals: [
      "Few shadows and simple icons keep the visual system inspectable.",
      "Affordance depends on explicit state treatment rather than physical metaphor.",
    ],
    visualDNA: {
      depth: "very-low", decoration: "low", density: "high", "visual-weight": "medium",
      motion: "low", "contrast-dependency": "medium", "brand-expression": "medium", "surface-complexity": "low",
    },
  },
  {
    id: "skeuomorphism",
    name: "Skeuomorphism / Realistic UI",
    aliases: ["realistic-ui", "skeuo"],
    summary: "Object-inspired UI that borrows physical materials, bevels, textures, and metaphors to signal use.",
    characteristics: ["Material textures", "Beveled edges", "Inner shadows", "Object metaphors", "Layered highlights"],
    classification: "historical-movement",
    maturity: "legacy",
    productionReadiness: "historical-reference",
    rendererClassification: "historical-reference",
    complexity: "very-high",
    definition: "A historically significant interface movement that uses physical materials, texture, bevels, and object metaphors to communicate function.",
    principles: [
      "Use a physical metaphor when it genuinely clarifies an interaction.",
      "Keep texture and realism subordinate to readable state and content.",
    ],
    signals: [
      "Bevels, inner shadows, and material textures create perceived affordance.",
      "Realistic detail increases implementation and responsive maintenance cost.",
    ],
    visualDNA: {
      depth: "very-high", decoration: "very-high", density: "medium", "visual-weight": "very-high",
      motion: "low", "contrast-dependency": "high", "brand-expression": "medium", "surface-complexity": "very-high",
    },
  },
  {
    id: "claymorphism",
    name: "Claymorphism / Soft 3D",
    aliases: ["soft-3d", "clay-ui"],
    summary: "A low-density soft-3D learning scene where inflated geometry and explicit copy make exploration approachable.",
    characteristics: ["Large radius", "Puffed surfaces", "Pastel gradients", "Soft 3D shadows", "Rounded illustration cues"],
    classification: "visual-aesthetic",
    maturity: "emerging",
    productionReadiness: "use-selectively",
    rendererClassification: "experimental",
    complexity: "high",
    definition: "A soft-3D treatment built from inflated forms, matte pastel depth, large radii, and friendly illustration cues.",
    principles: [
      "Use approachable material depth for learning, onboarding, or expressive scenes.",
      "Keep labels and state cues explicit when soft shadows are insufficient.",
    ],
    signals: [
      "Puffed surfaces and pastel depth make the interface feel friendly and low density.",
      "Large soft forms consume space and are difficult to translate to dense workflows.",
    ],
    visualDNA: {
      depth: "high", decoration: "high", density: "low", "visual-weight": "high",
      motion: "low", "contrast-dependency": "high", "brand-expression": "high", "surface-complexity": "high",
    },
  },
  {
    id: "dark-futuristic",
    name: "Dark Futuristic / Neon Tech",
    aliases: ["neon-tech", "dark-tech"],
    summary: "A technical aesthetic combining dark canvases, luminous accents, fine grids, and controlled motion.",
    characteristics: ["Dark surfaces", "Luminous accents", "Fine grid or mesh depth", "Glow edges", "Sans and mono pairing"],
    classification: "visual-aesthetic",
    maturity: "emerging",
    productionReadiness: "production-with-constraints",
    rendererClassification: "expressive",
    complexity: "high",
    definition: "A dark technical treatment that uses luminous accents, grid or mesh depth, mono labels, and restrained motion to signal advanced tooling.",
    principles: [
      "Use luminous accents to establish technical hierarchy, not to decorate every surface.",
      "Protect readable text and calm dense controls beneath the dramatic launch layer.",
    ],
    signals: [
      "Near-black canvases and glow edges create a strong technical point of view.",
      "Muted text, glow-only states, and motion need explicit accessibility safeguards.",
    ],
    visualDNA: {
      depth: "medium", decoration: "high", density: "medium", "visual-weight": "high",
      motion: "high", "contrast-dependency": "very-high", "brand-expression": "very-high", "surface-complexity": "high",
    },
  },
  {
    id: "web20-gloss",
    name: "Web 2.0 Gloss / Frutiger Aero",
    aliases: ["frutiger-aero", "web-2-0"],
    summary: "Glossy, optimistic, eco-tech nostalgia with aqua gradients, shine, transparency, and rounded gel controls.",
    characteristics: ["Gloss highlights", "Aqua gradients", "Rounded gel buttons", "Transparency", "Eco-tech imagery"],
    classification: "historical-movement",
    maturity: "legacy",
    productionReadiness: "historical-reference",
    rendererClassification: "historical-reference",
    complexity: "high",
    definition: "A nostalgic early-web movement that combines aqua gradients, glossy controls, transparency, and optimistic eco-tech imagery.",
    principles: [
      "Use the visual language intentionally for themed, nostalgic, or experimental work.",
      "Keep important reading and form surfaces opaque and high contrast.",
    ],
    signals: [
      "Sky, water, bubbles, and friendly technology create an optimistic early-web world.",
      "Gloss and bevels establish control hierarchy but can obscure state or readability.",
    ],
    visualDNA: {
      depth: "high", decoration: "very-high", density: "low", "visual-weight": "high",
      motion: "medium", "contrast-dependency": "very-high", "brand-expression": "very-high", "surface-complexity": "very-high",
    },
  },
] as const satisfies readonly MigratedStyleBlueprint[];

function createStatement(
  id: string,
  text: string,
  claimId: string,
): ResearchStatement {
  return { id, text, claimId };
}

function createCoreEvaluations(
  blueprint: MigratedStyleBlueprint,
  sourceId: string,
): CoreEvaluationSet {
  const incompleteDetail = {
    reason: "This criterion remains not-evaluated in the first migration batch; normalized research review is still required.",
    strengths: [],
    risks: [],
    conditions: ["Complete criterion-specific research before publishing this record."],
    evidence: [sourceId],
    claimType: "project-inference" as const,
  };

  return {
    usability: { ...incompleteDetail, criterion: "usability", level: "not-evaluated" },
    accessibility: { ...incompleteDetail, criterion: "accessibility", level: "not-evaluated" },
    "implementation-complexity": {
      ...incompleteDetail,
      criterion: "implementation-complexity",
      level: blueprint.complexity,
      reason: "This is a migration estimate based on the current local renderer; it is not a completed normalized evaluation.",
    },
    scalability: { ...incompleteDetail, criterion: "scalability", level: "not-evaluated" },
    "information-density": { ...incompleteDetail, criterion: "information-density", level: "not-evaluated" },
    "visual-expression": { ...incompleteDetail, criterion: "visual-expression", level: "not-evaluated" },
  } satisfies CoreEvaluationSet;
}

function createProductFit(sourceId: string): readonly ProductFit[] {
  return PRODUCT_TYPES.map((productType: ProductType) => ({
    productType,
    level: "not-evaluated" as const,
    reason: "Product fit remains not-evaluated until the normalized record receives context-specific research review.",
    strengths: [],
    risks: [],
    conditions: ["Do not use this migration record as a product recommendation."],
    evidence: [sourceId],
    claimType: "project-inference" as const,
  }));
}

function createVisualDNA(
  blueprint: MigratedStyleBlueprint,
  claimId: string,
): VisualDNA {
  return Object.fromEntries(
    VISUAL_DNA_DIMENSIONS.map((dimension: VisualDNADimension) => [
      dimension,
      {
        dimension,
        level: blueprint.visualDNA[dimension],
        reason: "This dimension is a migration observation from the current local dossier and needs normalized research review.",
        claimId,
      },
    ]),
  ) as VisualDNA;
}

function createMigratedStyle(
  blueprint: MigratedStyleBlueprint,
): ResearchStyle {
  const sourceId = `${blueprint.id}-legacy-catalog`;
  const claimId = `${blueprint.id}-migration-observation`;
  const statement = createStatement(
    `${blueprint.id}-definition`,
    blueprint.definition,
    claimId,
  );

  const source: ResearchSource = {
    id: sourceId,
    title: `${blueprint.name} legacy catalog record`,
    type: "production-reference",
    localReference: "src/data/designStyles.ts",
    publisher: "Interface Style Research project",
    authors: [],
    retrievedAt: MIGRATION_DATE,
    notes: "This source preserves the current local renderer and catalog implementation during incremental migration.",
    limitations: [
      "The local catalog is an implementation reference, not a complete historical or external research source.",
      "This record remains incomplete until its normalized evidence and context evaluations are reviewed.",
    ],
    review: incompleteReview,
  };

  const claim: ResearchClaim = {
    id: claimId,
    statement: `The local project currently represents ${blueprint.name} through the migrated visual and content contract.`,
    claimType: "production-observation",
    sourceIds: [sourceId],
    evidenceStrength: "observational",
    interpretationNote: "This claim describes the current repository implementation and is not a universal definition of the style.",
    review: incompleteReview,
  };

  return {
    id: blueprint.id,
    slug: blueprint.id,
    name: blueprint.name,
    aliases: blueprint.aliases,
    summary: blueprint.summary,
    characteristics: blueprint.characteristics,
    classifications: [blueprint.classification],
    maturity: blueprint.maturity,
    productionReadiness: blueprint.productionReadiness,
    review: incompleteReview,
    definition: statement,
    principles: blueprint.principles.map((text, index) => createStatement(
      `${blueprint.id}-principle-${index + 1}`,
      text,
      claimId,
    )),
    distinguishingSignals: blueprint.signals.map((text, index) => createStatement(
      `${blueprint.id}-signal-${index + 1}`,
      text,
      claimId,
    )),
    visualDNA: createVisualDNA(blueprint, claimId),
    evaluations: createCoreEvaluations(blueprint, sourceId),
    productFit: createProductFit(sourceId),
    sources: [source],
    claims: [claim],
    relationships: [],
    evolution: [],
    scenarioIds: INITIAL_SCENARIO_IDS,
    version: {
      schemaVersion: "1.0.0",
      contentVersion: MIGRATION_VERSION,
      updatedAt: MIGRATION_DATE,
    },
    legacyRenderer: {
      rendererId: blueprint.id,
      classification: blueprint.rendererClassification,
    },
  };
}

export const migratedResearchStyles: readonly ResearchStyle[] =
  blueprints.map(createMigratedStyle);

export const migratedResearchStyleIds = new Set(
  migratedResearchStyles.map(({ id }) => id),
);
