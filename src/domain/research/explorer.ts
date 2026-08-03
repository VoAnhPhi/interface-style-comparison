import type { ResearchStyle } from "./style";
import {
  DIMENSION_LEVELS,
  STYLE_CLASSIFICATIONS,
  STYLE_ERAS,
  STYLE_MATURITIES,
  type DimensionLevel,
  type StyleClassification,
  type StyleEra,
  type StyleMaturity,
} from "./vocabulary";

export type ExplorerClassification = StyleClassification | "all";
export type ExplorerEra = StyleEra | "all";
export type ExplorerDimensionLevel = DimensionLevel | "all";
export type ExplorerMaturity = StyleMaturity | "all";

export type ExplorerFilterState = {
  query: string;
  tag: string;
  classification: ExplorerClassification;
  era: ExplorerEra;
  density: ExplorerDimensionLevel;
  visualWeight: ExplorerDimensionLevel;
  maturity: ExplorerMaturity;
};

export const DEFAULT_EXPLORER_FILTERS: ExplorerFilterState = {
  query: "",
  tag: "All",
  classification: "all",
  era: "all",
  density: "all",
  visualWeight: "all",
  maturity: "all",
};

export const CLASSIFICATION_LABELS: Record<StyleClassification, string> = {
  "interface-direction": "Interface direction",
  "visual-aesthetic": "Visual aesthetic",
  "design-language": "Design language",
  "historical-movement": "Historical movement",
  "interface-pattern": "Interface pattern",
};

export const ERA_LABELS: Record<StyleEra, string> = {
  "2000s": "2000s",
  "2010s": "2010s",
  "2020s": "2020s",
  revival: "Revival",
};

export const DIMENSION_LEVEL_LABELS: Record<DimensionLevel, string> = {
  "very-low": "Very low",
  low: "Low",
  medium: "Medium",
  high: "High",
  "very-high": "Very high",
};

export const MATURITY_LABELS: Record<StyleMaturity, string> = {
  emerging: "Emerging",
  established: "Established",
  legacy: "Legacy",
  revived: "Revived",
  experimental: "Experimental",
};

export type ExplorerFilterOptions = {
  eras: StyleEra[];
  densities: DimensionLevel[];
  visualWeights: DimensionLevel[];
  maturities: StyleMaturity[];
};

function getSearchableText(style: ResearchStyle): string {
  return [
    style.name,
    style.summary,
    ...style.aliases,
    ...style.characteristics,
    ...style.classifications,
    style.definition.text,
    ...style.principles.map(({ text }) => text),
    ...style.distinguishingSignals.map(({ text }) => text),
  ].join(" ").toLocaleLowerCase();
}

function matchesOption<T extends string>(
  selected: T | "all",
  value: T,
): boolean {
  return selected === "all" || selected === value;
}

export function filterResearchStyles(
  styles: readonly ResearchStyle[],
  query: string,
  classification?: ExplorerClassification,
): ResearchStyle[];
export function filterResearchStyles(
  styles: readonly ResearchStyle[],
  filters: ExplorerFilterState,
): ResearchStyle[];
export function filterResearchStyles(
  styles: readonly ResearchStyle[],
  queryOrFilters: string | ExplorerFilterState,
  classification: ExplorerClassification = "all",
): ResearchStyle[] {
  const filters: ExplorerFilterState = typeof queryOrFilters === "string"
    ? {
      ...DEFAULT_EXPLORER_FILTERS,
      query: queryOrFilters,
      classification,
    }
    : queryOrFilters;
  const normalizedQuery = filters.query.trim().toLocaleLowerCase();

  return styles.filter((style) => {
    const matchesClassification =
      filters.classification === "all"
      || style.classifications.includes(filters.classification);
    const matchesQuery =
      !normalizedQuery || getSearchableText(style).includes(normalizedQuery);
    const matchesEra = filters.era === "all" || style.eras.includes(filters.era);
    const matchesDensity = matchesOption(
      filters.density,
      style.visualDNA.density.level,
    );
    const matchesVisualWeight = matchesOption(
      filters.visualWeight,
      style.visualDNA["visual-weight"].level,
    );
    const matchesMaturity = matchesOption(filters.maturity, style.maturity);

    return matchesClassification
      && matchesQuery
      && matchesEra
      && matchesDensity
      && matchesVisualWeight
      && matchesMaturity;
  });
}

export function getAvailableClassifications(
  styles: readonly ResearchStyle[],
): StyleClassification[] {
  return STYLE_CLASSIFICATIONS.filter((classification) =>
    styles.some((style) => style.classifications.includes(classification)),
  );
}

export function getAvailableExplorerFilters(
  styles: readonly ResearchStyle[],
): ExplorerFilterOptions {
  return {
    eras: STYLE_ERAS.filter((era) => styles.some((style) => style.eras.includes(era))),
    densities: DIMENSION_LEVELS.filter((level) =>
      styles.some((style) => style.visualDNA.density.level === level),
    ),
    visualWeights: DIMENSION_LEVELS.filter((level) =>
      styles.some((style) => style.visualDNA["visual-weight"].level === level),
    ),
    maturities: STYLE_MATURITIES.filter((maturity) =>
      styles.some((style) => style.maturity === maturity),
    ),
  };
}

function readOption<T extends string>(
  value: string | null,
  values: readonly T[],
  fallback: "all",
): T | "all" {
  return value && values.includes(value as T) ? value as T : fallback;
}

export function parseExplorerFilters(
  search: string,
  validTags: readonly string[] = [],
): ExplorerFilterState {
  const params = new URLSearchParams(search);
  const tag = params.get("tag");

  return {
    query: params.get("q") ?? "",
    tag: tag && (tag === "All" || validTags.includes(tag)) ? tag : "All",
    classification: readOption(params.get("classification"), STYLE_CLASSIFICATIONS, "all"),
    era: readOption(params.get("era"), STYLE_ERAS, "all"),
    density: readOption(params.get("density"), DIMENSION_LEVELS, "all"),
    visualWeight: readOption(params.get("weight"), DIMENSION_LEVELS, "all"),
    maturity: readOption(params.get("maturity"), STYLE_MATURITIES, "all"),
  };
}

export function serializeExplorerFilters(filters: ExplorerFilterState): string {
  const params = new URLSearchParams();
  const query = filters.query.trim();

  if (query) params.set("q", query);
  if (filters.tag !== "All") params.set("tag", filters.tag);
  if (filters.classification !== "all") params.set("classification", filters.classification);
  if (filters.era !== "all") params.set("era", filters.era);
  if (filters.density !== "all") params.set("density", filters.density);
  if (filters.visualWeight !== "all") params.set("weight", filters.visualWeight);
  if (filters.maturity !== "all") params.set("maturity", filters.maturity);

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}
