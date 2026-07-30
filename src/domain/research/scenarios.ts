import {
  type DomainValidationIssue,
  isNonEmptyString,
  isRecord,
  isStringArray,
} from "./validation";

export const SCENARIO_IDS = [
  "dashboard",
  "landing",
  "form",
  "navigation",
  "pricing",
  "ecommerce-product",
  "content-card",
] as const;

export type ScenarioId = (typeof SCENARIO_IDS)[number];

export const INITIAL_SCENARIO_IDS = [
  "dashboard",
  "form",
  "ecommerce-product",
] as const satisfies readonly ScenarioId[];

export type ScenarioContentItem = {
  id: string;
  label: string;
  value: string;
};

export type SharedScenario = {
  id: ScenarioId;
  name: string;
  userGoal: string;
  content: readonly ScenarioContentItem[];
  informationStructure: readonly string[];
  requiredActions: readonly string[];
  semanticStructure: readonly string[];
  taskFlow: readonly string[];
};

function deepFreeze<Value>(value: Value): Readonly<Value> {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.values(value).forEach((child) => deepFreeze(child));
    Object.freeze(value);
  }

  return value;
}

const scenarioRecords = [
  {
    id: "dashboard",
    name: "Business performance dashboard",
    userGoal: "Monitor business performance.",
    content: [
      { id: "revenue", label: "Revenue", value: "$128,400" },
      { id: "orders", label: "Orders", value: "1,284" },
      { id: "conversion", label: "Conversion", value: "3.8%" },
      { id: "transactions", label: "Transactions", value: "2,416" },
    ],
    informationStructure: [
      "Dashboard heading",
      "Date range and filters",
      "Key performance indicators",
      "Transaction activity",
    ],
    requiredActions: ["Change date range", "Inspect transactions"],
    semanticStructure: ["main", "header", "form", "section", "dl", "table"],
    taskFlow: ["Review KPI summary", "Identify a change", "Inspect transaction detail"],
  },
  {
    id: "form",
    name: "Structured account form",
    userGoal: "Complete structured input.",
    content: [
      { id: "full-name", label: "Full name", value: "Jordan Lee" },
      { id: "email", label: "Work email", value: "jordan@example.com" },
      { id: "role", label: "Role", value: "Product designer" },
      { id: "validation", label: "Validation", value: "Email must use a valid format" },
    ],
    informationStructure: [
      "Form heading and instructions",
      "Identity fields",
      "Role selection",
      "Validation status",
      "Submission action",
    ],
    requiredActions: ["Enter identity details", "Select a role", "Submit the form"],
    semanticStructure: ["main", "form", "fieldset", "label", "input", "select", "button"],
    taskFlow: ["Read instructions", "Complete fields", "Resolve validation", "Submit"],
  },
  {
    id: "ecommerce-product",
    name: "E-commerce product detail",
    userGoal: "Evaluate and purchase a product.",
    content: [
      { id: "product", label: "Product", value: "Orbit Desk Lamp" },
      { id: "image", label: "Product image", value: "Black adjustable desk lamp" },
      { id: "price", label: "Price", value: "$129" },
      { id: "variant", label: "Color", value: "Matte black" },
      { id: "reviews", label: "Reviews", value: "4.7 from 218 reviews" },
    ],
    informationStructure: [
      "Product media",
      "Product identity and price",
      "Variant selection",
      "Purchase action",
      "Review summary",
    ],
    requiredActions: ["Select a variant", "Add the product to cart", "Read reviews"],
    semanticStructure: ["main", "article", "figure", "form", "button", "section"],
    taskFlow: ["Review product", "Choose variant", "Evaluate reviews", "Add to cart"],
  },
] as const satisfies readonly SharedScenario[];

export const CANONICAL_SCENARIOS =
  deepFreeze(scenarioRecords) as readonly SharedScenario[];

const SCENARIO_ID_SET = new Set<string>(SCENARIO_IDS);
const FORBIDDEN_SCENARIO_KEYS = new Set([
  "recommendedStyle",
  "styleId",
  "visualTreatment",
  "designTokens",
]);

function findForbiddenScenarioKeys(
  value: unknown,
  path: string,
): DomainValidationIssue[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      findForbiddenScenarioKeys(item, `${path}[${index}]`)
    );
  }

  if (!isRecord(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([key, child]) => {
    const childPath = `${path}.${key}`;
    const ownIssue: DomainValidationIssue[] = FORBIDDEN_SCENARIO_KEYS.has(key)
      ? [{
          code: "forbidden-field",
          path: childPath,
          message: `${key} is style-specific and cannot be canonical scenario content.`,
        }]
      : [];

    return [...ownIssue, ...findForbiddenScenarioKeys(child, childPath)];
  });
}

export function validateSharedScenarios(
  values: readonly unknown[],
  path = "scenarios",
): DomainValidationIssue[] {
  const issues: DomainValidationIssue[] = [];
  const ids = new Set<string>();

  values.forEach((value, index) => {
    const scenarioPath = `${path}[${index}]`;

    if (!isRecord(value)) {
      issues.push({
        code: "invalid-value",
        path: scenarioPath,
        message: "Shared scenario must be an object.",
      });
      return;
    }

    if (!isNonEmptyString(value.id) || !SCENARIO_ID_SET.has(value.id)) {
      issues.push({
        code: "invalid-value",
        path: `${scenarioPath}.id`,
        message: "Unsupported canonical scenario id.",
      });
    } else if (ids.has(value.id)) {
      issues.push({
        code: "duplicate-id",
        path: `${scenarioPath}.id`,
        message: `Duplicate shared scenario id: ${value.id}.`,
      });
    } else {
      ids.add(value.id);
    }

    for (const field of ["name", "userGoal"] as const) {
      if (!isNonEmptyString(value[field])) {
        issues.push({
          code: "missing-required-field",
          path: `${scenarioPath}.${field}`,
          message: `${field} is required.`,
        });
      }
    }

    for (
      const field of [
        "informationStructure",
        "requiredActions",
        "semanticStructure",
        "taskFlow",
      ] as const
    ) {
      if (!isStringArray(value[field]) || value[field].length === 0) {
        issues.push({
          code: "missing-required-field",
          path: `${scenarioPath}.${field}`,
          message: `${field} requires at least one non-empty item.`,
        });
      }
    }

    if (!Array.isArray(value.content) || value.content.length === 0) {
      issues.push({
        code: "missing-required-field",
        path: `${scenarioPath}.content`,
        message: "Canonical business content is required.",
      });
    } else {
      value.content.forEach((item, contentIndex) => {
        if (
          !isRecord(item)
          || !isNonEmptyString(item.id)
          || !isNonEmptyString(item.label)
          || !isNonEmptyString(item.value)
        ) {
          issues.push({
            code: "invalid-value",
            path: `${scenarioPath}.content[${contentIndex}]`,
            message: "Scenario content requires non-empty id, label, and value.",
          });
        }
      });
    }

    issues.push(...findForbiddenScenarioKeys(value, scenarioPath));
  });

  INITIAL_SCENARIO_IDS.forEach((id) => {
    if (!ids.has(id)) {
      issues.push({
        code: "missing-required-field",
        path,
        message: `Missing initial canonical scenario: ${id}.`,
      });
    }
  });

  return issues;
}

export function validateScenarioAgainstCanonical(
  value: SharedScenario,
  path = "scenario",
): DomainValidationIssue[] {
  const canonical = CANONICAL_SCENARIOS.find(({ id }) => id === value.id);

  if (!canonical || JSON.stringify(value) !== JSON.stringify(canonical)) {
    return [{
      code: "scenario-mismatch",
      path,
      message: `Scenario ${value.id} differs from its canonical business contract.`,
    }];
  }

  return [];
}
