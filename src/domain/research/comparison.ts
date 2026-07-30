export type CompareSelectionRejectionReason =
  | "invalid"
  | "duplicate"
  | "over-limit";

export type CompareSelectionRejection = {
  slug: string;
  reason: CompareSelectionRejectionReason;
};

export type CompareSelection = {
  styles: string[];
  rejections: CompareSelectionRejection[];
  ready: boolean;
};

export function normalizeCompareSelection(
  requestedSlugs: readonly string[],
  validSlugs: ReadonlySet<string>,
): CompareSelection {
  const styles: string[] = [];
  const rejections: CompareSelectionRejection[] = [];
  const seen = new Set<string>();

  requestedSlugs.forEach((slug) => {
    if (!validSlugs.has(slug)) {
      rejections.push({ slug, reason: "invalid" });
      return;
    }

    if (seen.has(slug)) {
      rejections.push({ slug, reason: "duplicate" });
      return;
    }

    seen.add(slug);

    if (styles.length === 3) {
      rejections.push({ slug, reason: "over-limit" });
      return;
    }

    styles.push(slug);
  });

  return {
    styles,
    rejections,
    ready: styles.length >= 2,
  };
}
