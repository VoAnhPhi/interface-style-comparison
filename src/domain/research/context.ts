import {
  PRODUCT_TYPES,
  type DimensionLevel,
  type ProductPlatform,
  type ProductType,
  type UsageContext,
  isVocabularyValue,
} from "./vocabulary";
import {
  type DomainValidationIssue,
  isNonEmptyString,
  isStringArray,
} from "./validation";

export const ACCESSIBILITY_SENSITIVITIES = [
  "standard",
  "elevated",
  "critical",
] as const;

export type AccessibilitySensitivity = "standard" | "elevated" | "critical";

export type ProductContext = {
  id: ProductType;
  name: string;
  purpose: string;
  typicalUserGoals: readonly string[];
  characteristics: {
    informationDensity: DimensionLevel;
    sessionLength: DimensionLevel;
    taskComplexity: DimensionLevel;
    accessibilityCriticality: DimensionLevel;
    brandExpressionNeed: DimensionLevel;
  };
  usageContextHints: readonly UsageContext[];
  accessibilitySensitivity: AccessibilitySensitivity;
};

export type ProductContextSelection = {
  productType: ProductType;
  platforms: readonly ProductPlatform[];
  usageContexts: readonly UsageContext[];
};

export const PRODUCT_CONTEXTS = [
  {
    id: "saas-product",
    name: "SaaS product",
    purpose: "A subscription product that combines onboarding and recurring workflows.",
    typicalUserGoals: ["Understand value", "Complete recurring product tasks"],
    characteristics: {
      informationDensity: "medium",
      sessionLength: "high",
      taskComplexity: "high",
      accessibilityCriticality: "high",
      brandExpressionNeed: "high",
    },
    usageContextHints: ["frequent-daily-use", "task-heavy"],
    accessibilitySensitivity: "elevated",
  },
  {
    id: "dashboard-admin",
    name: "Dashboard / Admin",
    purpose: "An operational interface for monitoring data and managing system state.",
    typicalUserGoals: ["Scan status", "Investigate data", "Complete administrative actions"],
    characteristics: {
      informationDensity: "very-high",
      sessionLength: "very-high",
      taskComplexity: "very-high",
      accessibilityCriticality: "very-high",
      brandExpressionNeed: "low",
    },
    usageContextHints: ["long-session", "data-heavy", "task-heavy"],
    accessibilitySensitivity: "critical",
  },
  {
    id: "marketing-landing",
    name: "Marketing / Landing",
    purpose: "A public acquisition surface that communicates value and drives action.",
    typicalUserGoals: ["Understand the offer", "Build trust", "Choose a next action"],
    characteristics: {
      informationDensity: "low",
      sessionLength: "low",
      taskComplexity: "low",
      accessibilityCriticality: "high",
      brandExpressionNeed: "very-high",
    },
    usageContextHints: ["short-session", "brand-discovery"],
    accessibilitySensitivity: "elevated",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    purpose: "A curated presentation of work, authorship, and creative point of view.",
    typicalUserGoals: ["Evaluate work", "Understand authorship", "Make contact"],
    characteristics: {
      informationDensity: "medium",
      sessionLength: "medium",
      taskComplexity: "low",
      accessibilityCriticality: "medium",
      brandExpressionNeed: "very-high",
    },
    usageContextHints: ["content-reading", "brand-discovery"],
    accessibilitySensitivity: "standard",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    purpose: "A transactional product for discovering, evaluating, and purchasing goods.",
    typicalUserGoals: ["Find a product", "Evaluate details", "Complete a purchase"],
    characteristics: {
      informationDensity: "high",
      sessionLength: "medium",
      taskComplexity: "high",
      accessibilityCriticality: "very-high",
      brandExpressionNeed: "high",
    },
    usageContextHints: ["transactional", "task-heavy"],
    accessibilitySensitivity: "critical",
  },
  {
    id: "documentation",
    name: "Documentation",
    purpose: "A reference and learning surface for understanding a product or system.",
    typicalUserGoals: ["Find an answer", "Learn a workflow", "Copy a reliable example"],
    characteristics: {
      informationDensity: "high",
      sessionLength: "high",
      taskComplexity: "medium",
      accessibilityCriticality: "very-high",
      brandExpressionNeed: "low",
    },
    usageContextHints: ["content-reading", "long-session"],
    accessibilitySensitivity: "critical",
  },
  {
    id: "content-platform",
    name: "Content platform",
    purpose: "A publishing, news, blog, or knowledge experience centered on reading.",
    typicalUserGoals: ["Discover content", "Read comfortably", "Navigate related material"],
    characteristics: {
      informationDensity: "medium",
      sessionLength: "high",
      taskComplexity: "low",
      accessibilityCriticality: "very-high",
      brandExpressionNeed: "high",
    },
    usageContextHints: ["content-reading", "long-session"],
    accessibilitySensitivity: "critical",
  },
  {
    id: "consumer-product",
    name: "Consumer product",
    purpose: "A general audience product outside the narrower e-commerce category.",
    typicalUserGoals: ["Understand the product", "Complete a personal task", "Return regularly"],
    characteristics: {
      informationDensity: "medium",
      sessionLength: "medium",
      taskComplexity: "medium",
      accessibilityCriticality: "high",
      brandExpressionNeed: "high",
    },
    usageContextHints: ["frequent-daily-use", "short-session"],
    accessibilitySensitivity: "elevated",
  },
  {
    id: "enterprise-system",
    name: "Enterprise system",
    purpose: "A large operational system such as ERP, CRM, or an internal business tool.",
    typicalUserGoals: ["Complete complex work", "Manage records", "Audit system state"],
    characteristics: {
      informationDensity: "very-high",
      sessionLength: "very-high",
      taskComplexity: "very-high",
      accessibilityCriticality: "very-high",
      brandExpressionNeed: "low",
    },
    usageContextHints: ["long-session", "data-heavy", "task-heavy", "accessibility-critical"],
    accessibilitySensitivity: "critical",
  },
  {
    id: "experimental-experience",
    name: "Experimental experience",
    purpose: "An exploratory or expressive experience where novelty is part of the goal.",
    typicalUserGoals: ["Explore an idea", "Experience a visual concept", "Evaluate a prototype"],
    characteristics: {
      informationDensity: "low",
      sessionLength: "low",
      taskComplexity: "low",
      accessibilityCriticality: "medium",
      brandExpressionNeed: "very-high",
    },
    usageContextHints: ["short-session", "brand-discovery"],
    accessibilitySensitivity: "standard",
  },
] as const satisfies readonly ProductContext[];

export function validateProductContexts(
  contexts: readonly ProductContext[],
): DomainValidationIssue[] {
  const issues: DomainValidationIssue[] = [];
  const seenIds = new Set<string>();

  contexts.forEach((context, index) => {
    const path = `contexts[${index}]`;

    if (!isVocabularyValue("productType", context.id)) {
      issues.push({
        code: "invalid-value",
        path: `${path}.id`,
        message: `${String(context.id)} is not a supported product type.`,
      });
    } else if (seenIds.has(context.id)) {
      issues.push({
        code: "duplicate-id",
        path: `${path}.id`,
        message: `Duplicate product context id: ${context.id}.`,
      });
    }
    seenIds.add(context.id);

    if (!isNonEmptyString(context.name)) {
      issues.push({
        code: "empty-value",
        path: `${path}.name`,
        message: "Product context name is required.",
      });
    }

    if (!isNonEmptyString(context.purpose)) {
      issues.push({
        code: "empty-value",
        path: `${path}.purpose`,
        message: "Product context purpose is required.",
      });
    }

    if (!isStringArray(context.typicalUserGoals)) {
      issues.push({
        code: "invalid-value",
        path: `${path}.typicalUserGoals`,
        message: "Typical user goals must be an array of non-empty strings.",
      });
    }

    Object.entries(context.characteristics).forEach(([name, level]) => {
      if (!isVocabularyValue("dimensionLevel", level)) {
        issues.push({
          code: "invalid-level",
          path: `${path}.characteristics.${name}`,
          message: `${String(level)} is not a supported characteristic level.`,
        });
      }
    });

    if (
      !ACCESSIBILITY_SENSITIVITIES.includes(context.accessibilitySensitivity)
    ) {
      issues.push({
        code: "invalid-value",
        path: `${path}.accessibilitySensitivity`,
        message: "Accessibility sensitivity must be standard, elevated, or critical.",
      });
    }

    context.usageContextHints.forEach((usageContext, usageIndex) => {
      if (!isVocabularyValue("usageContext", usageContext)) {
        issues.push({
          code: "invalid-value",
          path: `${path}.usageContextHints[${usageIndex}]`,
          message: `${String(usageContext)} is not a supported usage context.`,
        });
      }
    });
  });

  PRODUCT_TYPES.forEach((productType) => {
    if (!seenIds.has(productType)) {
      issues.push({
        code: "missing-product-type",
        path: "contexts",
        message: `Missing canonical product context: ${productType}.`,
      });
    }
  });

  return issues;
}

export function validateProductContextSelection(
  value: ProductContextSelection,
  path = "productContext",
): DomainValidationIssue[] {
  const issues: DomainValidationIssue[] = [];

  if (!isVocabularyValue("productType", value.productType)) {
    issues.push({
      code: "invalid-value",
      path: `${path}.productType`,
      message: `${String(value.productType)} is not a supported product type.`,
    });
  }

  value.platforms.forEach((platform, index) => {
    if (!isVocabularyValue("productPlatform", platform)) {
      issues.push({
        code: "invalid-value",
        path: `${path}.platforms[${index}]`,
        message: `${String(platform)} is not a supported product platform.`,
      });
    }
  });

  value.usageContexts.forEach((usageContext, index) => {
    if (!isVocabularyValue("usageContext", usageContext)) {
      issues.push({
        code: "invalid-value",
        path: `${path}.usageContexts[${index}]`,
        message: `${String(usageContext)} is not a supported usage context.`,
      });
    }
  });

  return issues;
}
