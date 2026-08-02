import type { ResearchStyle } from "./style";
import {
  STYLE_CLASSIFICATIONS,
  type StyleClassification,
} from "./vocabulary";

export type ExplorerClassification = StyleClassification | "all";

export const CLASSIFICATION_LABELS: Record<StyleClassification, string> = {
  "interface-direction": "Interface direction",
  "visual-aesthetic": "Visual aesthetic",
  "design-language": "Design language",
  "historical-movement": "Historical movement",
  "interface-pattern": "Interface pattern",
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

export function filterResearchStyles(
  styles: readonly ResearchStyle[],
  query: string,
  classification: ExplorerClassification = "all",
): ResearchStyle[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return styles.filter((style) => {
    const matchesClassification =
      classification === "all" || style.classifications.includes(classification);
    const matchesQuery =
      !normalizedQuery || getSearchableText(style).includes(normalizedQuery);

    return matchesClassification && matchesQuery;
  });
}

export function getAvailableClassifications(
  styles: readonly ResearchStyle[],
): StyleClassification[] {
  return STYLE_CLASSIFICATIONS.filter((classification) =>
    styles.some((style) => style.classifications.includes(classification)),
  );
}
