import type { ReactElement } from "react";
import type { DesignStyle } from "../../data/designStyles";

export type DossierTab = "overview" | "tokens" | "patterns" | "examples";

export type DossierRendererProps = {
  renderTab: (className?: string) => ReactElement;
  style: DesignStyle;
  visibleTab: DossierTab;
};

export type DossierRenderer = (props: DossierRendererProps) => ReactElement;

export function formatClassification(style: DesignStyle) {
  return style.classification.replace(/-/g, " ");
}

