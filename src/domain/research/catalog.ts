import { migratedResearchStyles } from "./data/migratedStyles";
import { modernSaasResearchStyle } from "./data/modernSaas";
import type { ResearchStyle } from "./style";

/** The normalized source-of-truth order used by Explorer and the adapter. */
export const normalizedResearchStyles: readonly ResearchStyle[] = [
  modernSaasResearchStyle,
  ...migratedResearchStyles,
];
