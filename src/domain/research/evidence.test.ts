import { describe, expect, it } from "vitest";

import {
  type EvidenceBundle,
  validateEvidenceBundle,
  validateReviewMetadata,
} from "./evidence";

const approvedReview = {
  contentStatus: "published",
  reviewStatus: "approved",
  reviewedBy: "research-editor",
  reviewedAt: "2026-07-30",
  version: "1.0.0",
} as const;

const validBundle = {
  sources: [{
    id: "material-design-foundations",
    title: "Material Design foundations",
    type: "official-documentation",
    url: "https://m3.material.io/foundations",
    publisher: "Google",
    authors: [],
    retrievedAt: "2026-07-30",
    limitations: [],
    review: approvedReview,
  }],
  claims: [{
    id: "material-is-documented-system",
    statement: "Material Design is published as an official design system.",
    claimType: "documented-fact",
    sourceIds: ["material-design-foundations"],
    evidenceStrength: "primary",
    review: approvedReview,
  }],
} as const satisfies EvidenceBundle;

describe("Spec 3 evidence contract", () => {
  it("accepts reviewed sources and source-backed claims", () => {
    expect(validateEvidenceBundle(validBundle)).toEqual([]);
  });

  it("rejects duplicate sources and broken claim references", () => {
    const issues = validateEvidenceBundle({
      sources: [validBundle.sources[0], validBundle.sources[0]],
      claims: [{
        ...validBundle.claims[0],
        sourceIds: ["unknown-source"],
      }],
    });

    expect(issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ code: "duplicate-id" }),
      expect.objectContaining({ code: "invalid-reference" }),
    ]));
  });

  it("requires sources for documented facts", () => {
    const issues = validateEvidenceBundle({
      sources: validBundle.sources,
      claims: [{
        ...validBundle.claims[0],
        sourceIds: [],
      }],
    });

    expect(issues).toEqual(expect.arrayContaining([
      expect.objectContaining({
        code: "missing-required-field",
        path: "evidence.claims[0].sourceIds",
      }),
    ]));
  });

  it("requires an interpretation note for non-documented claims", () => {
    const issues = validateEvidenceBundle({
      sources: validBundle.sources,
      claims: [{
        ...validBundle.claims[0],
        claimType: "project-inference",
        sourceIds: [],
      }],
    });

    expect(issues).toEqual(expect.arrayContaining([
      expect.objectContaining({
        path: "evidence.claims[0].interpretationNote",
      }),
    ]));
  });

  it("rejects unreviewed published content and incomplete approval metadata", () => {
    expect(validateReviewMetadata({
      contentStatus: "published",
      reviewStatus: "not-reviewed",
      version: "1.0.0",
    })).toEqual(expect.arrayContaining([
      expect.objectContaining({ code: "invalid-status" }),
    ]));

    expect(validateReviewMetadata({
      contentStatus: "published",
      reviewStatus: "approved",
      version: "1.0.0",
    })).toEqual(expect.arrayContaining([
      expect.objectContaining({ code: "invalid-status" }),
    ]));
  });

  it("allows honest draft metadata without pretending it was reviewed", () => {
    expect(validateReviewMetadata({
      contentStatus: "draft",
      reviewStatus: "not-reviewed",
      version: "0.1.0",
    })).toEqual([]);
  });
});
