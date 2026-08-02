import { buildDesignStyleCatalog } from "../domain/research/dataset";
import { migratedResearchStyles } from "../domain/research/data/migratedStyles";
import { modernSaasResearchStyle } from "../domain/research/data/modernSaas";

export type FitLevel = "High" | "Medium" | "Low" | "Use carefully";
export type StyleClassification = "production-safe" | "expressive" | "experimental" | "historical-reference" | "system-language";

export type StyleExample = {
  label: string;
  detail: string;
};

export type ColorToken = {
  name: string;
  value: string;
  description: string;
  usage: string;
};

export type DesignStyle = {
  id: string;
  name: string;
  summary: string;
  feeling: string[];
  characteristics: string[];
  distinguishingSignals?: string[];
  colorTokens?: ColorToken[];
  dossierUsage?: StyleExample[];
  visualRuleUsage?: {
    typography: string;
    radius: string;
    shadow: string;
    border: string;
    spacing: string;
    density: string;
    motion: string;
  };
  commonPatterns: string[];
  useCases: string[];
  strengths: string[];
  weaknesses: string[];
  accessibilityRisks: string[];
  recommendedFor: string[];
  avoidFor: string[];
  tags: string[];
  classification: StyleClassification;
  realWorldExamples: StyleExample[];
  componentExamples: StyleExample[];
  layoutExamples: StyleExample[];
  implementationNotes: string[];
  doDont: {
    do: string[];
    dont: string[];
  };
  suitability: {
    landing: FitLevel;
    dashboard: FitLevel;
    portfolio: FitLevel;
    productApp: FitLevel;
    docs: FitLevel;
    experimentalVisual: FitLevel;
  };
  tokenRecipe: {
    colors: string[];
    typography: string;
    radius: string;
    shadow: string;
    border: string;
    spacing: string;
    density: string;
    motion: string;
  };
};

export const legacyDesignStyles: DesignStyle[] = [
  {
    id: "modern-saas",
    name: "Modern SaaS",
    summary: "Polished product UI with soft surfaces, clear hierarchy, and restrained brand tint.",
    feeling: ["premium", "focused", "demo-ready"],
    characteristics: ["Soft radius", "Layered cards", "Light gradients", "Crisp labels", "Prominent primary actions"],
    distinguishingSignals: [
      "Product proof and conversion hierarchy appear early in the experience.",
      "Layered surfaces add polish while keeping controls familiar and reusable.",
      "Brand color supports primary actions, focus, and status instead of filling every surface.",
      "Density stays comfortable enough for both marketing and product UI.",
    ],
    colorTokens: [
      {
        name: "Canvas",
        value: "#F8FAFC",
        description: "A cool neutral foundation that supports polished product framing.",
        usage: "Dossier background, metric cards, and quiet product regions.",
      },
      {
        name: "Surface",
        value: "#FFFFFF",
        description: "Solid foreground panels keep product content and controls readable.",
        usage: "Anatomy board, inputs, insight cards, and example modules.",
      },
      {
        name: "Ink",
        value: "#0F172A",
        description: "A dark slate hierarchy that feels technical without reading as pure black.",
        usage: "Headings, metric values, workflow labels, and primary copy.",
      },
      {
        name: "Muted copy",
        value: "#475569",
        description: "Secondary information stays legible while product proof remains dominant.",
        usage: "Labels, supporting notes, and integration cues.",
      },
      {
        name: "Primary",
        value: "#4F46E5",
        description: "The main product accent establishes action and focus hierarchy.",
        usage: "CTA gradients, input focus treatment, charts, and active cues.",
      },
      {
        name: "Signal",
        value: "#06B6D4",
        description: "A secondary accent adds technical energy without replacing the primary color.",
        usage: "CTA gradient endpoint, chart bars, badges, and subtle tinting.",
      },
    ],
    dossierUsage: [
      { label: "Product proof", detail: "The reference frame and anatomy board show the product before long-form research content." },
      { label: "Command surface", detail: "A focused workflow input, status badge, and share action establish clear interaction hierarchy." },
      { label: "Layered modules", detail: "Metric, chart, and workflow cards demonstrate reusable SaaS surface anatomy." },
      { label: "Brand restraint", detail: "Indigo and cyan appear in actions, state, and data signals while reading surfaces remain neutral." },
    ],
    visualRuleUsage: {
      typography: "Inter Variable UI/display; IBM Plex Mono workflow and integration labels",
      radius: "14px input; 16px cards; 18-20px panels; 999px pills",
      shadow: "0 16px 44px rgba(15,23,42,.08); CTA 0 12px 28px rgba(79,70,229,.22)",
      border: "1px rgba(15,23,42,.08); focus tint rgba(79,70,229,.16)",
      spacing: "8 / 12 / 14 / 16 / 18px",
      density: "Comfortable; 16px panel padding and 12-14px grid gaps",
      motion: "180ms ease-out; small product-state and hover transitions",
    },
    commonPatterns: ["Hero dashboard mock", "Feature cards", "Metric rows", "Command buttons"],
    useCases: ["Product landing", "Demo app", "Developer tools", "Startup dashboards"],
    strengths: ["Looks finished quickly", "Balances marketing and app UI", "Easy to make responsive"],
    weaknesses: ["Can become generic if gradients and shadows are overused", "Needs disciplined spacing"],
    accessibilityRisks: ["Tinted low-contrast secondary text", "Decorative gradients behind body copy"],
    recommendedFor: ["Landing", "Dashboard", "Product app"],
    avoidFor: ["Very dense admin tools"],
    tags: ["Landing", "Dashboard", "Product"],
    classification: "production-safe",
    realWorldExamples: [
      { label: "Stripe", detail: "Polished product surfaces, restrained brand color, strong CTA hierarchy, and modular checkout/product examples." },
      { label: "Linear", detail: "Premium dark/light SaaS execution with crisp labels, soft depth, and product-first storytelling." },
      { label: "Vercel", detail: "Developer-facing minimal polish, high typography discipline, and subtle product chrome." },
    ],
    componentExamples: [
      { label: "Button", detail: "46px primary button, soft radius, confident brand fill, subtle hover lift, and strong focus ring." },
      { label: "Card", detail: "Outlined or lightly elevated surface with 16-20px radius, 20-24px padding, and restrained tint." },
      { label: "Input", detail: "44-48px field, quiet border, rounded corners, clear placeholder hierarchy, and visible focus state." },
    ],
    layoutExamples: [
      { label: "Product hero", detail: "Large headline, one clear CTA, and a dashboard or workflow mock that shows the product early." },
      { label: "Feature grid", detail: "Compact feature cards with short labels, small visuals, and one consistent spacing rhythm." },
      { label: "Pricing/demo page", detail: "Works well for trust blocks, integration rows, customer proof, and app screenshots." },
    ],
    implementationNotes: [
      "Use semantic tokens for surfaces, borders, primary color, focus ring, and elevation.",
      "Keep gradients and shadows as accents; polish should come from spacing, hierarchy, and consistency.",
      "Build from the same component anatomy as Minimal/Clean so it can scale into app UI.",
    ],
    doDont: {
      do: ["Use one or two brand accents intentionally", "Keep body text on solid or very calm surfaces", "Make product screenshots or previews legible"],
      dont: ["Stack glow, gradient, shadow, and glass on the same element", "Let secondary text fall below contrast comfort", "Turn every section into a floating card"],
    },
    suitability: {
      landing: "High",
      dashboard: "Medium",
      portfolio: "Medium",
      productApp: "High",
      docs: "Medium",
      experimentalVisual: "Medium",
    },
    tokenRecipe: {
      colors: ["#f8fafc", "#ffffff", "#4f46e5", "#06b6d4", "#0f172a"],
      typography: "Inter/Geist-like sans, 15-16px body, 44-56px display",
      radius: "10px / 14px / 20px / 24px",
      shadow: "Soft layered elevation, low-opacity slate shadows",
      border: "Subtle rgba slate borders with occasional brand tint",
      spacing: "Comfortable, 20-24px cards, 96px sections",
      density: "Comfortable to spacious",
      motion: "140-220ms ease-out, tiny hover lift",
    },
  },
  {
    id: "minimal-clean",
    name: "Minimal / Clean",
    summary: "Quiet, durable UI where clarity, whitespace, and typography do most of the work.",
    feeling: ["calm", "precise", "timeless"],
    characteristics: ["Neutral palette", "Flat surfaces", "Light borders", "Generous whitespace", "Few effects"],
    distinguishingSignals: [
      "Whitespace and alignment establish grouping before decoration is added.",
      "Borders, contrast, and focus states carry interaction affordance.",
      "Neutral surfaces keep content portable across long-lived products.",
      "Effects stay minimal so component anatomy remains easy to inspect.",
    ],
    colorTokens: [
      {
        name: "Canvas",
        value: "#FFFFFF",
        description: "A plain reading surface keeps attention on content and structure.",
        usage: "Workspace shell, controls, document canvas, and primary surfaces.",
      },
      {
        name: "Soft surface",
        value: "#F8FAFC",
        description: "A near-white layer separates groups without requiring elevation.",
        usage: "Selected outline item, image backing, and quiet content blocks.",
      },
      {
        name: "Ink",
        value: "#111827",
        description: "High-contrast text provides the main visual hierarchy.",
        usage: "Headings, brand label, primary action, and document titles.",
      },
      {
        name: "Muted copy",
        value: "#4B5563",
        description: "Secondary content remains readable without adding decorative color.",
        usage: "Outline labels, helper text, and secondary actions.",
      },
      {
        name: "Primary",
        value: "#2563EB",
        description: "A restrained blue marks focus and selection when neutral contrast is not enough.",
        usage: "Active outline border, focus cues, and selective state emphasis.",
      },
      {
        name: "Divider",
        value: "#E5E7EB",
        description: "Hairline structure replaces heavy shadows and decorative framing.",
        usage: "Workspace borders, section rules, controls, and content separation.",
      },
    ],
    dossierUsage: [
      { label: "Document workspace", detail: "The layout uses an outline, editor canvas, and restrained toolbar instead of decorative panels." },
      { label: "Whitespace hierarchy", detail: "Open margins and consistent alignment separate content before color or shadow is introduced." },
      { label: "Border-first states", detail: "Search, navigation, buttons, and cards rely on edges and contrast for affordance." },
      { label: "Quiet actions", detail: "Primary, secondary, and text-link actions remain distinct without gradients or strong elevation." },
    ],
    visualRuleUsage: {
      typography: "Inter Variable UI/display; IBM Plex Mono outline indices",
      radius: "10px controls; 12-16px panels; 999px status and line details",
      shadow: "0 1px 2px rgba(15,23,42,.04)",
      border: "1px rgba(17,24,39,.08-.12); active tint rgba(37,99,235,.12)",
      spacing: "8 / 10 / 12 / 16 / 18 / 20px",
      density: "Comfortable; 18px shell padding and 18px layout gaps",
      motion: "140ms ease-out; restrained color and state transitions",
    },
    commonPatterns: ["Outlined cards", "Simple forms", "Text-first sections", "Subtle dividers"],
    useCases: ["Docs", "Productivity apps", "Portfolios", "Long-lived internal tools"],
    strengths: ["High readability", "Low maintenance", "Strong accessibility headroom"],
    weaknesses: ["Can feel plain without excellent typography", "Affordances may be too quiet"],
    accessibilityRisks: ["Under-signaled buttons or inputs", "Focus rings made too subtle"],
    recommendedFor: ["Product app", "Docs", "Portfolio"],
    avoidFor: ["Campaigns that need strong visual punch"],
    tags: ["Product", "Portfolio", "Accessible"],
    classification: "production-safe",
    realWorldExamples: [
      { label: "GitHub", detail: "Readable productivity surfaces with restrained chrome, clear affordances, and durable interaction patterns." },
      { label: "Notion Help", detail: "Text-first documentation with quiet hierarchy and low decoration." },
      { label: "Apple product pages", detail: "High whitespace discipline and typography-led product explanation." },
    ],
    componentExamples: [
      { label: "Button", detail: "Solid primary or neutral outline, no gradient, 8-12px radius, and direct hover/focus states." },
      { label: "Card", detail: "White or neutral surface, hairline border, optional tiny shadow, and typography doing most hierarchy work." },
      { label: "Input", detail: "Simple outlined field with clear label, visible focus ring, and no decorative inset treatment." },
    ],
    layoutExamples: [
      { label: "Docs page", detail: "Strong content column, useful side navigation, and calm dividers instead of decorative panels." },
      { label: "Productivity app", detail: "List/detail or editor layout with low ornament and high scan quality." },
      { label: "Portfolio index", detail: "Project list, clean thumbnails, and strong typographic rhythm without heavy visual effects." },
    ],
    implementationNotes: [
      "Let whitespace, contrast, and type scale carry hierarchy before adding effects.",
      "Use slightly stronger focus and active states than the visual style might initially suggest.",
      "This is the best baseline to compare other styles against because the component anatomy stays visible.",
    ],
    doDont: {
      do: ["Use clear borders for controls", "Keep text contrast high", "Make empty space intentional and aligned"],
      dont: ["Make affordances so quiet they look inert", "Depend on placeholder text as labels", "Remove focus states for visual purity"],
    },
    suitability: {
      landing: "Medium",
      dashboard: "Medium",
      portfolio: "High",
      productApp: "High",
      docs: "High",
      experimentalVisual: "Low",
    },
    tokenRecipe: {
      colors: ["#ffffff", "#f8fafc", "#e2e8f0", "#2563eb", "#0f172a"],
      typography: "System sans, moderate weights, body 15/24",
      radius: "8px / 12px / 16px",
      shadow: "None or 0 1px 2px rgba(15,23,42,.04)",
      border: "1px solid rgba(15,23,42,.08)",
      spacing: "Generous whitespace, 72-96px sections",
      density: "Comfortable",
      motion: "120-160ms, mostly opacity/color changes",
    },
  },
  {
    id: "enterprise-admin",
    name: "Enterprise / Admin",
    summary: "Operational UI optimized for scanning, forms, filters, tables, and repeated work.",
    feeling: ["serious", "compact", "reliable"],
    characteristics: ["Clear borders", "Compact controls", "Status colors", "Table-like rhythm", "Low decoration"],
    distinguishingSignals: [
      "Information throughput and repeated actions take priority over visual drama.",
      "Explicit borders, labels, and states reduce ambiguity in dense workflows.",
      "Status color is semantic and reserved for operational meaning.",
      "Tables, filters, KPIs, and inspectors share a compact scanning rhythm.",
    ],
    colorTokens: [
      {
        name: "Shell",
        value: "#F5F3EF",
        description: "A quiet operational canvas separates the application shell from working surfaces.",
        usage: "Dossier background and layered administrative regions.",
      },
      {
        name: "Surface",
        value: "#FFFDF9",
        description: "A warm solid surface keeps dense controls and tables readable.",
        usage: "Toolbar, KPI cards, table panel, inspector, inputs, and buttons.",
      },
      {
        name: "Ink",
        value: "#293129",
        description: "A dark neutral supports compact labels and repeated scanning.",
        usage: "Headings, table values, controls, and inspector content.",
      },
      {
        name: "Muted copy",
        value: "#687264",
        description: "Secondary operational information remains visible without competing with status.",
        usage: "Field labels, table metadata, helper text, and toolbar copy.",
      },
      {
        name: "Action",
        value: "#1F6B5B",
        description: "A restrained green identifies primary actions and healthy operational state.",
        usage: "Assign-owner action, healthy badge, active labels, and chart accents.",
      },
      {
        name: "Divider",
        value: "#D9D3C7",
        description: "Visible structure supports dense grouping without relying on elevation.",
        usage: "Panel edges, table divisions, filters, and form boundaries.",
      },
    ],
    dossierUsage: [
      { label: "Operational toolbar", detail: "Search, filters, status, export, and ownership actions stay visible in one repeated-work surface." },
      { label: "KPI strip", detail: "Compact metrics establish system state before users enter the queue." },
      { label: "Queue table", detail: "Selection, status, owner, and risk columns optimize scanning and bulk decisions." },
      { label: "Settings inspector", detail: "Fields, validation, toggles, and audit events keep configuration context beside the data." },
    ],
    visualRuleUsage: {
      typography: "IBM Plex Sans Variable UI/display; IBM Plex Mono metrics and operational labels",
      radius: "8px tabs; 10px controls; 12-16px panels; 999px status",
      shadow: "0 1px 2px token; 0 6px 18px and 0 10px 24px shell layers",
      border: "1px rgba(41,49,41,.08-.12); semantic divider #D9D3C7",
      spacing: "4 / 6 / 8 / 10 / 12 / 14 / 16 / 18px",
      density: "Compact; 38-40px controls and 12-14px row/panel padding",
      motion: "120ms ease-out; direct functional state changes",
    },
    commonPatterns: ["Filter bars", "Data panels", "Settings groups", "Status badges"],
    useCases: ["Admin consoles", "Dashboards", "Back-office tools", "Settings-heavy products"],
    strengths: ["Excellent for dense information", "Predictable", "Easy to validate visually"],
    weaknesses: ["Less expressive for marketing", "Can look bland without polish"],
    accessibilityRisks: ["Too many small controls", "Dense tables without row focus states"],
    recommendedFor: ["Dashboard", "Product app"],
    avoidFor: ["Portfolio", "Brand-heavy landing pages"],
    tags: ["Dashboard", "Admin", "Data"],
    classification: "production-safe",
    realWorldExamples: [
      { label: "Atlassian", detail: "Operational product surfaces with disciplined spacing, semantic status, and predictable controls." },
      { label: "IBM Carbon", detail: "Enterprise-grade layering, dense forms/tables, and themeable system foundations." },
      { label: "GitHub Projects", detail: "Task and table workflows where scan speed matters more than visual drama." },
    ],
    componentExamples: [
      { label: "Button", detail: "36-40px control, 6-8px radius, obvious disabled/pressed states, and semantic variants." },
      { label: "Table", detail: "Strong row rhythm, sticky headers when useful, visible sort/filter affordances, and status badges." },
      { label: "Form field", detail: "Label, helper text, error text, and validation state are all explicit." },
    ],
    layoutExamples: [
      { label: "Admin console", detail: "Sidebar, filter bar, table/list body, and right-side detail or settings panel." },
      { label: "Settings workflow", detail: "Grouped sections with clear dividers, compact controls, and predictable save/cancel actions." },
      { label: "Dashboard", detail: "KPI row, charts, tables, and alerts with restrained status color." },
    ],
    implementationNotes: [
      "Prioritize density controls, semantic status tokens, and keyboard/focus clarity.",
      "Use borders and shell layers more than large shadows.",
      "Polish comes from alignment and information hierarchy, not expressive decoration.",
    ],
    doDont: {
      do: ["Use compact but readable spacing", "Keep table states visible", "Reserve color for status and primary actions"],
      dont: ["Shrink controls below usable targets without a compact-mode reason", "Use marketing-style cards everywhere", "Hide critical actions behind vague icons"],
    },
    suitability: {
      landing: "Low",
      dashboard: "High",
      portfolio: "Low",
      productApp: "High",
      docs: "Medium",
      experimentalVisual: "Low",
    },
    tokenRecipe: {
      colors: ["#f8fafc", "#ffffff", "#d1d5db", "#2563eb", "#111827"],
      typography: "14/20 body, 12/16 helper labels, compact headings",
      radius: "4px / 6px / 8px / 12px",
      shadow: "Minimal; borders and shell layers carry separation",
      border: "Explicit #d1d5db borders and table dividers",
      spacing: "8-16px controls, 16-20px panels",
      density: "Compact to comfortable",
      motion: "80-160ms functional state changes",
    },
  },
  {
    id: "editorial-portfolio",
    name: "Editorial / Portfolio",
    summary: "Typography-led composition with expressive hierarchy and fewer conventional app surfaces.",
    feeling: ["expressive", "curated", "personal"],
    characteristics: ["Large headlines", "Asymmetry", "Graphic spacing", "Image-like cards", "Understated controls"],
    distinguishingSignals: [
      "Hierarchy comes from typography and composition rather than dense controls.",
      "Images carry narrative meaning instead of acting as decorative thumbnails.",
      "Whitespace creates pacing between story beats and project details.",
      "Metadata and actions stay selective so the content remains the main subject.",
    ],
    colorTokens: [
      {
        name: "Canvas",
        value: "#FAFAF8",
        description: "A warm neutral base that lets imagery and type set the mood.",
        usage: "Showcase background and quiet content areas.",
      },
      {
        name: "Ink",
        value: "#111111",
        description: "The highest-contrast tone, reserved for the reading hierarchy.",
        usage: "Hero headline, project facts, and text CTAs.",
      },
      {
        name: "Editorial accent",
        value: "#B42318",
        description: "A single directional accent that adds editorial emphasis without becoming a system color.",
        usage: "Case-study label, italic headline emphasis, and selected details.",
      },
      {
        name: "Divider",
        value: "#EAE7E1",
        description: "A low-contrast structural tone that separates story sections quietly.",
        usage: "Hairlines, gallery edges, and footer boundaries.",
      },
      {
        name: "Muted copy",
        value: "#6B675F",
        description: "Secondary information stays present without competing with the narrative.",
        usage: "Labels, journal metadata, and newsletter supporting copy.",
      },
    ],
    dossierUsage: [
      {
        label: "Hero hierarchy",
        detail: "A large display headline and short narrative establish the story before any dense product UI appears.",
      },
      {
        label: "Image-led composition",
        detail: "The side image and gallery act as story breaks, not decorative cards beside generic content.",
      },
      {
        label: "Selective metadata",
        detail: "Client, year, services, and role are presented as compact project facts instead of a dense specification table.",
      },
      {
        label: "Quiet actions",
        detail: "Text-first CTAs and the newsletter form support the narrative without competing with the headline or imagery.",
      },
      {
        label: "Section rhythm",
        detail: "Hairline dividers, whitespace, and a journal footer pace the page like a case-study story rather than an app dashboard.",
      },
    ],
    visualRuleUsage: {
      typography: "Newsreader display; Inter UI copy; IBM Plex Mono metadata",
      radius: "0px sections/media; 8px utility surfaces; 999px case label",
      shadow: "None",
      border: "1px solid #EAE7E1; quiet text-CTA underline",
      spacing: "12 / 24 / 32 / 44 / 48px",
      density: "Low; 32px section padding and 12px section gap",
      motion: "220ms ease-out; gallery image scale 1.04 on hover",
    },
    commonPatterns: ["Magazine hero", "Project index", "Case study modules", "Text buttons"],
    useCases: ["Portfolio", "Agency sites", "Editorial landing", "Creative campaigns"],
    strengths: ["Memorable personality", "Strong storytelling", "Excellent for case studies"],
    weaknesses: ["Not portable to dense app workflows", "Depends on content quality"],
    accessibilityRisks: ["Oversized type can crowd mobile", "Decorative layouts can weaken reading order"],
    recommendedFor: ["Portfolio", "Landing"],
    avoidFor: ["Admin dashboards", "Form-heavy workflows"],
    tags: ["Portfolio", "Landing", "Brand"],
    classification: "expressive",
    realWorldExamples: [
      { label: "A24", detail: "Cinematic content pacing, strong visual mood, and art-directed hierarchy." },
      { label: "Framer gallery sites", detail: "Portfolio and agency examples where typography and composition carry the experience." },
      { label: "Aesop", detail: "Brand-forward editorial commerce with restrained UI chrome and careful content rhythm." },
    ],
    componentExamples: [
      { label: "Button", detail: "Text button, quiet outline, or understated pill that does not compete with the composition." },
      { label: "Project card", detail: "Image-led module with title, year/category, and art-directed crop rather than generic elevation." },
      { label: "Form", detail: "Should fall back to a calmer utility treatment with readable labels and validation." },
    ],
    layoutExamples: [
      { label: "Case study", detail: "Large opener, narrative sections, image breaks, and selective project metadata." },
      { label: "Portfolio index", detail: "Typographic project list, large thumbnails, asymmetry, and generous margins." },
      { label: "Campaign landing", detail: "Editorial hero, strong imagery, limited CTAs, and scroll-paced storytelling." },
    ],
    implementationNotes: [
      "Separate display typography from utility UI typography.",
      "Keep source order and mobile reading flow clear even when desktop layout is asymmetrical.",
      "Use imagery and spacing as first-class tokens, not afterthought decoration.",
    ],
    doDont: {
      do: ["Use expressive type scale deliberately", "Let imagery define sections", "Keep utility controls calmer than hero typography"],
      dont: ["Apply editorial asymmetry to dense forms", "Let mobile headlines crowd the viewport", "Depend on custom fonts without readable fallbacks"],
    },
    suitability: {
      landing: "High",
      dashboard: "Low",
      portfolio: "High",
      productApp: "Low",
      docs: "Medium",
      experimentalVisual: "Medium",
    },
    tokenRecipe: {
      colors: ["Warm neutral base", "Ink-like contrast", "Muted secondary tone", "Single editorial accent"],
      typography: "Expressive display scale paired with restrained utility copy",
      radius: "Mostly square or lightly rounded",
      shadow: "Minimal; composition carries the depth",
      border: "Graphic rules, hairlines, and section dividers",
      spacing: "Spacious, asymmetrical, and paced around imagery",
      density: "Spacious",
      motion: "Subtle reveal and image transitions that support the story",
    },
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    summary: "Frosted translucent surfaces over rich backgrounds, useful as an accent rather than a full system.",
    feeling: ["atmospheric", "premium", "fragile"],
    characteristics: ["Backdrop blur", "Transparent panels", "Edge highlights", "Gradient backdrops", "Soft depth"],
    distinguishingSignals: [
      "Translucent surfaces preserve environmental context while solid reading layers protect clarity.",
      "Depth comes from opacity, blur, edge light, and overlap rather than heavy elevation.",
      "A dark botanical backdrop makes the material effect visible without defaulting to neon gradients.",
      "Glass stays local to showcase surfaces while forms and long copy use safer opacity.",
    ],
    colorTokens: [
      { name: "Forest base", value: "#192F28", description: "The dominant dark botanical canvas anchors every translucent layer.", usage: "Dossier canvas, fallback surfaces, hero shadows, and modal base." },
      { name: "Deep teal", value: "#214E46", description: "A cool green layer creates depth without shifting into blue-purple glass.", usage: "Ambient gradients, secondary panels, and image tint." },
      { name: "Muted jade", value: "#4F806F", description: "A softened middle tone separates interactive glass from the background.", usage: "Active navigation, panel tint, and data treatment." },
      { name: "Moss", value: "#78956F", description: "A natural signal color supports charts and positive state without neon glare.", usage: "Status, focus support, data line, and secondary accents." },
      { name: "Warm amber", value: "#D2A25F", description: "The warm highlight creates a clear action hierarchy against the green canvas.", usage: "Primary CTA, selected indicator, labels, and focus treatment." },
      { name: "Ivory", value: "#F2F6F3", description: "A soft near-white maintains readable contrast without looking stark.", usage: "Headlines, control text, panel copy, and glass edge highlights." },
    ],
    dossierUsage: [
      { label: "Forest hero", detail: "One generated local image is framed by a strong shadow gradient so type remains readable over variable imagery." },
      { label: "Contextual crops", detail: "Navigation and data examples reuse different crops of the same forest asset to keep the scene cohesive and lightweight." },
      { label: "Safe form glass", detail: "The modal uses a more opaque inner panel, explicit field edge, solid action, and visible focus treatment." },
      { label: "Opaque fallback", detail: "Browsers without backdrop blur receive a solid #192F28 surface instead of losing hierarchy." },
    ],
    visualRuleUsage: {
      typography: "DM Sans UI; Newsreader display accent; Roboto Mono labels and token values",
      radius: "10px controls; 13-18px glass panels; 24px dossier canvas; 999px status",
      shadow: "0 24px 56px rgba(10,29,23,.24); amber CTA 0 10px 24px rgba(210,162,95,.2)",
      border: "1px rgba(242,246,243,.14-.18); amber focus rgba(210,162,95,.42)",
      spacing: "7 / 9 / 12 / 16 / 18 / 20px",
      density: "Low to medium; compact component study inside the existing dossier shell",
      motion: "180-240ms opacity and transform; reduced-motion compatible",
    },
    commonPatterns: ["Glass cards", "Floating nav", "Hero overlays", "Modal panels"],
    useCases: ["Hero sections", "Media products", "Showcase cards", "Premium visual accents"],
    strengths: ["Strong visual impact", "Creates depth without heavy chrome"],
    weaknesses: ["Hard to scale to dense forms", "Can hurt performance and legibility"],
    accessibilityRisks: ["Text contrast over variable backgrounds", "Reduced transparency preferences", "Ambiguous layering"],
    recommendedFor: ["Landing", "Experimental"],
    avoidFor: ["Dense dashboard", "Critical forms", "Accessibility-first production apps"],
    tags: ["Landing", "Experimental", "Accessibility Risk"],
    classification: "experimental",
    realWorldExamples: [
      { label: "Apple Liquid Glass / materials", detail: "Platform-native translucency with strong accessibility constraints and content/control separation." },
      { label: "Windows Aero / Fluent references", detail: "System chrome using transparency, blur, and light to suggest depth." },
      { label: "Premium media hero sections", detail: "Frosted navs and overlays above imagery or gradient backdrops." },
    ],
    componentExamples: [
      { label: "Glass card", detail: "Translucent surface, backdrop blur, edge highlight, and solid foreground text." },
      { label: "Modal", detail: "More opaque than decorative glass cards, with strong boundaries and readable action row." },
      { label: "Input", detail: "Use an opaque or semi-opaque field inside glass; fully transparent inputs are usually too weak." },
    ],
    layoutExamples: [
      { label: "Hero overlay", detail: "A low-density glass panel over a rich but controlled background." },
      { label: "Floating nav", detail: "Compact translucent chrome with solid text and clear active state." },
      { label: "Showcase card", detail: "One or two premium cards, not a full dense form system." },
    ],
    implementationNotes: [
      "Always test text contrast against the actual background behind the glass.",
      "Support reduced transparency preferences with an opaque fallback.",
      "Limit blur area for performance and keep z-index/layering unambiguous.",
    ],
    doDont: {
      do: ["Use glass as a local appearance", "Keep foreground content solid and high contrast", "Add an opaque fallback for accessibility"],
      dont: ["Use variable imagery behind body copy without a contrast layer", "Make every app surface translucent", "Blur dense tables or long forms"],
    },
    suitability: {
      landing: "High",
      dashboard: "Low",
      portfolio: "Medium",
      productApp: "Low",
      docs: "Low",
      experimentalVisual: "Use carefully",
    },
    tokenRecipe: {
      colors: ["#192f28", "#214e46", "#4f806f", "#78956f", "#d2a25f", "#f2f6f3"],
      typography: "DM Sans for UI, Newsreader for display emphasis, Roboto Mono for technical labels",
      radius: "10px / 13px / 18px / 24px",
      shadow: "Deep green ambient shadow with restrained internal highlights",
      border: "1px solid rgba(242,246,243,.14)",
      spacing: "Spacious; glass needs air around content",
      density: "Low to medium",
      motion: "180-240ms fade/scale, reduced-motion aware",
    },
  },
  {
    id: "neo-brutalism",
    name: "Neo-brutalism",
    summary: "Loud, graphic interface style with thick outlines, hard shadows, and high-contrast color.",
    feeling: ["bold", "raw", "playful"],
    characteristics: ["Thick black borders", "Hard offset shadows", "Saturated fills", "Bold type", "Poster-like modules"],
    distinguishingSignals: [
      "A poster-first composition puts direct hierarchy and one loud action ahead of quiet chrome.",
      "Three-pixel ink borders and hard offset shadows make affordances visible without relying on gradients.",
      "Warm paper, acid yellow, coral, and cobalt create graphic contrast while white cards protect reading areas.",
      "The localized Signal Pop variant swaps in electric violet, cyan, orange, and lavender without changing the component anatomy.",
    ],
    colorTokens: [
      { name: "Paper canvas", value: "#FFF7ED", description: "A warm poster-paper foundation keeps the saturated blocks from feeling like a full-screen alert.", usage: "Dossier canvas, poster field, and primary reading surface." },
      { name: "Ink", value: "#111111", description: "Near-black ink creates the decisive edge, type, and hard-shadow language.", usage: "Headings, borders, focus edges, button shadows, and pressed states." },
      { name: "Acid yellow", value: "#FACC15", description: "The loudest action color establishes the primary CTA and progress signal.", usage: "Primary button, active palette state, progress fill, and status badge." },
      { name: "Cobalt", value: "#60A5FA", description: "A cool saturated counterpoint keeps the poster palette graphic rather than monochrome.", usage: "Secondary accent token and future graphic blocks." },
      { name: "Coral", value: "#FB7185", description: "A warm alert-like fill adds personality while keeping black ink readable.", usage: "Sticker, featured creator card, and expressive emphasis." },
      { name: "Signal Pop", value: "#D8B4FE", description: "The alternate palette introduces electric violet as a distinct comparison layout.", usage: "Signal Pop canvas, with cyan #22D3EE and orange #FB923C accents." },
    ],
    dossierUsage: [
      { label: "Poster texture", detail: "One generated local screenprint texture sits behind the hero blocks and remains low-opacity so copy stays readable." },
      { label: "Hard anatomy", detail: "Primary/secondary buttons, heavy input, framed cards, sticker badge, progress bar, and pressed state are all code-native." },
      { label: "Protected reading", detail: "White and warm-paper slabs hold the explanation copy instead of placing long text directly over saturated texture." },
      { label: "Palette comparison", detail: "The Signal Pop switch changes violet/cyan/orange tokens while preserving the same Neo-brutal component anatomy." },
    ],
    visualRuleUsage: {
      typography: "Space Grotesk UI/display; IBM Plex Mono for palette switch labels",
      radius: "4px dossier/panels; 0px controls; 999px sticker/status",
      shadow: "6px 6px 0 #111111 poster; 4px 4px 0 #111111 cards/buttons; 1px 1px 0 pressed switch",
      border: "3px solid #111111 controls/cards; 2px solid #111111 palette switcher",
      spacing: "8 / 10 / 12 / 14 / 18 / 22px across controls, cards, and poster blocks",
      density: "Medium; compact visual anatomy with high-weight edges and short copy",
      motion: "120ms ease-out; active controls translate 2-3px and reduce the hard shadow",
    },
    commonPatterns: ["Outlined buttons", "Chunky cards", "Sticker badges", "Graphic hero blocks"],
    useCases: ["Creative portfolios", "Campaign pages", "Experimental products", "Youthful brands"],
    strengths: ["Highly distinctive", "Fast to visually differentiate", "Strong affordance when contrast is high"],
    weaknesses: ["Can be tiring", "Narrow brand fit", "Poor for serious dense workflows"],
    accessibilityRisks: ["Visual overload", "Color combinations can fail contrast", "Aggressive motion can distract"],
    recommendedFor: ["Portfolio", "Experimental", "Landing"],
    avoidFor: ["Enterprise dashboards", "Medical/finance workflows"],
    tags: ["Portfolio", "Experimental", "High Contrast"],
    classification: "expressive",
    realWorldExamples: [
      { label: "Gumroad-like creator pages", detail: "Loud graphic surfaces, thick outlines, and intentionally raw product personality." },
      { label: "Playful launch microsites", detail: "Poster-like color blocks and hard shadow modules that create instant differentiation." },
      { label: "Creative portfolios", detail: "High-contrast typography and chunky cards for a memorable personal brand." },
    ],
    componentExamples: [
      { label: "Button", detail: "Bright fill, 2-3px black border, hard offset shadow, and pressed state that moves the shadow." },
      { label: "Card", detail: "Solid slab with thick frame, sticker-like labels, and unapologetic hierarchy." },
      { label: "Input", detail: "White or bright fill, heavy outline, conspicuous focus state, and simple validation treatment." },
    ],
    layoutExamples: [
      { label: "Launch page", detail: "Poster sections, bold CTA blocks, and graphic feature modules." },
      { label: "Portfolio", detail: "Chunky project cards, visible metadata, and direct copy." },
      { label: "Experimental tool", detail: "Works for playful generators or creator utilities, not serious operational workflows." },
    ],
    implementationNotes: [
      "Create tokens for border thickness and hard shadow offset.",
      "Keep contrast strong; loud color does not automatically mean accessible color.",
      "Use motion sparingly and keep it snappy rather than floaty.",
    ],
    doDont: {
      do: ["Make affordances obvious", "Use hard shadow and outlines consistently", "Pair bright color with readable text"],
      dont: ["Use random saturated colors without contrast checks", "Apply the style to serious dense workflows", "Let visual noise bury content priority"],
    },
    suitability: {
      landing: "Medium",
      dashboard: "Low",
      portfolio: "High",
      productApp: "Low",
      docs: "Low",
      experimentalVisual: "Use carefully",
    },
    tokenRecipe: {
      colors: ["#fff7ed", "#111111", "#facc15", "#fb7185", "#60a5fa", "#d8b4fe"],
      typography: "Bold grotesk, heavy labels, occasional all-caps",
      radius: "0px / 4px / 8px",
      shadow: "6px 6px 0 #111 poster; 4px 4px 0 #111 cards/buttons",
      border: "3px solid #111 controls/cards; 2px solid #111 switcher",
      spacing: "Medium spacing with high visual weight",
      density: "Medium",
      motion: "80-140ms snappy pressed states",
    },
  },
  {
    id: "material-fluent",
    name: "Material / Fluent-like",
    summary: "Systemized, token-led UI with clear states, formal elevation, and familiar component anatomy.",
    feeling: ["standardized", "stable", "usable"],
    characteristics: ["State layers", "Semantic roles", "Documented elevations", "Consistent fields", "Structured dialogs"],
    distinguishingSignals: [
      "A scaffold-like app shell makes navigation, content hierarchy, and dialog behavior part of the visual language.",
      "Semantic roles and state layers explain why a surface changes instead of treating every control as a one-off style.",
      "Formal elevation, shape, and spacing scales create consistency across buttons, fields, cards, and dialogs.",
      "The dossier teaches the component contract beside the rendered component: label, helper, focus, disabled, error, and action behavior.",
    ],
    colorTokens: [
      { name: "Canvas", value: "#F8F9FD", description: "A calm shell foundation keeps layered surfaces legible.", usage: "App shell background and navigation context." },
      { name: "Surface", value: "#FFFFFF", description: "Solid content surfaces protect text, form controls, and dialog anatomy.", usage: "Cards, fields, dialog, and top navigation." },
      { name: "Primary", value: "#2563EB", description: "A clear action role anchors selected, focused, and filled states.", usage: "Filled actions, focus rings, active navigation, and status cues." },
      { name: "Secondary", value: "#6750A4", description: "A restrained system accent supports token and surface annotations.", usage: "Surface-stack artwork, token labels, and secondary emphasis." },
      { name: "Outline", value: "#AEBBD1", description: "Role-based outlines preserve affordance without heavy decoration.", usage: "Fields, outlined buttons, cards, and state previews." },
      { name: "Error", value: "#DC2626", description: "A semantic danger role pairs color with explicit error copy.", usage: "Error state preview and validation messaging." },
    ],
    dossierUsage: [
      { label: "App scaffold", detail: "The top bar and navigation rail show how component language sits inside a reusable product shell." },
      { label: "Form anatomy", detail: "Labels, helper text, focus treatment, select, textarea, and action hierarchy are shown together." },
      { label: "Dialog behavior", detail: "The dialog includes title, content, semantic icon, divider, and explicit footer actions." },
      { label: "State strip", detail: "Default, hover, focus, pressed, disabled, and error states are documented beside the same control." },
    ],
    visualRuleUsage: {
      typography: "Roboto Variable UI/display; Roboto Mono token and state labels",
      radius: "8px fields; 9px buttons; 12px rail items; 16px cards/dialog; 999px chips",
      shadow: "Formal elevation: 0 6px 18px rgba(29,27,32,.07); dialog 0 12px 26px rgba(29,27,32,.10)",
      border: "1px role-based outlines; 3px focus ring with semantic blue tint",
      spacing: "4px grid rhythm; 8 / 12 / 16 / 18 / 24px applied in shell and components",
      density: "Comfortable shell with compact component states and responsive rail collapse",
      motion: "120ms ease-out for hover, focus, press, and elevation changes",
    },
    commonPatterns: ["Filled/outlined buttons", "Text fields with helper text", "Elevated cards", "App bars"],
    useCases: ["Cross-platform apps", "Design-system demos", "Product apps", "Accessible forms"],
    strengths: ["Clear states", "Scales well", "Strong accessibility baseline"],
    weaknesses: ["Can feel less distinctive", "Requires disciplined token modeling"],
    accessibilityRisks: ["Over-customizing can break known state patterns", "Too subtle state layers"],
    recommendedFor: ["Product app", "Dashboard", "Forms"],
    avoidFor: ["Highly bespoke editorial pages"],
    tags: ["Product", "Dashboard", "Accessible"],
    classification: "system-language",
    realWorldExamples: [
      { label: "Material 3", detail: "Semantic color roles, shape system, state layers, and documented component anatomy." },
      { label: "Fluent 2", detail: "Token layering, spacing/radius foundations, and cross-platform product behavior." },
      { label: "Carbon-inspired enterprise systems", detail: "Formal theme structure and reusable component rules for complex products." },
    ],
    componentExamples: [
      { label: "Button", detail: "Filled, tonal, outlined, and text variants with documented state layers." },
      { label: "Card", detail: "Filled, outlined, and elevated recipes rather than one generic card treatment." },
      { label: "Dialog", detail: "Clear title, content, action row, focus trap, inert background, and accessible dismissal behavior." },
    ],
    layoutExamples: [
      { label: "Cross-platform app", detail: "Consistent components, semantic roles, app bars, lists, dialogs, and settings surfaces." },
      { label: "Design-system demo", detail: "Token tables, component anatomy, and theme switcher examples." },
      { label: "Accessible form flow", detail: "Full field anatomy with label, helper, error, disabled, read-only, and focus states." },
    ],
    implementationNotes: [
      "Use this as an architectural reference more than a visual costume.",
      "Model states and component anatomy explicitly before styling one-off screens.",
      "Keep semantic tokens stable so themes can vary without changing component APIs.",
    ],
    doDont: {
      do: ["Name tokens by role", "Document states before custom styling", "Use formal component variants"],
      dont: ["Clone Material or Fluent superficially without behavior", "Override known state patterns into ambiguity", "Make every component bespoke"],
    },
    suitability: {
      landing: "Medium",
      dashboard: "High",
      portfolio: "Low",
      productApp: "High",
      docs: "Medium",
      experimentalVisual: "Low",
    },
    tokenRecipe: {
      colors: ["#f8f9fd", "#ffffff", "#2563eb", "#6750a4", "#aebbd1", "#dc2626"],
      typography: "Structured role scale: label, body, title, headline",
      radius: "4px / 8px / 12px / 16px",
      shadow: "Formal elevation levels with reduced depth for pressed and disabled states",
      border: "Role-based outlines with explicit focus ring and error treatment",
      spacing: "Tokenized 4px grid with 8-24px component spacing",
      density: "Comfortable, compact variants possible",
      motion: "Functional, documented, tokenized",
    },
  },
  {
    id: "neumorphism",
    name: "Neumorphism",
    summary: "A soft, tactile control language that uses raised and inset surfaces, but needs explicit labels, contrast, and focus cues to stay usable.",
    feeling: ["soft", "tactile", "experimental"],
    characteristics: ["Embossed controls", "Inset states", "Tone-on-tone palette", "Large radius", "Very soft shadows"],
    distinguishingSignals: [
      "Light and shadow imply whether a surface is raised, inset, or resting; they should never be the only state signal.",
      "A single quiet canvas creates the tactile illusion, while labels and focus rings add the clarity that pure neumorphism lacks.",
      "The most credible use is a small, low-density control cluster—not a dense form, data table, or full product shell.",
      "Accessibility-aware neumorphism deliberately breaks the visual purity with contrast, borders, and explicit keyboard focus.",
    ],
    colorTokens: [
      {
        name: "Soft canvas",
        value: "#E9EEF5",
        description: "The shared blue-gray base that lets outer and inset shadows describe shallow depth.",
        usage: "Dossier canvas, raised cards, and quiet button backgrounds.",
      },
      {
        name: "Highlight",
        value: "#FFFFFF",
        description: "The upper-left light edge that makes raised controls feel gently lifted.",
        usage: "Negative shadow in cards, buttons, and media controls.",
      },
      {
        name: "Recess shadow",
        value: "#CFD6DE",
        description: "The cool lower-right shadow that defines inset fields and outer elevation.",
        usage: "Inset inputs, progress tracks, and raised control depth.",
      },
      {
        name: "Readable ink",
        value: "#1F2937",
        description: "A dark slate that keeps headings and control labels readable on the pale surface.",
        usage: "Headings, action labels, and primary interface copy.",
      },
      {
        name: "Supporting copy",
        value: "#64748B",
        description: "Muted information stays calm while retaining enough contrast for descriptions and metadata.",
        usage: "Helper text, progress labels, and quiet state descriptions.",
      },
      {
        name: "Focus signal",
        value: "#2563EB",
        description: "A deliberate non-neumorphic signal that makes keyboard focus and interactive fields unambiguous.",
        usage: "Focus-safe state card and the workspace-label input outline.",
      },
    ],
    dossierUsage: [
      {
        label: "Soft control board",
        detail: "The primary media board demonstrates raised play, skip, and favorite actions without turning the page into a generic dashboard.",
      },
      {
        label: "State comparison",
        detail: "Raised, inset, and focus-safe cards make the visual language legible as a system rather than a collection of soft shadows.",
      },
      {
        label: "Accessible exception",
        detail: "The labeled field, border, and blue focus outline intentionally introduce stronger cues where pure tone-on-tone styling would be ambiguous.",
      },
      {
        label: "Low-density examples",
        detail: "Wellness, settings, and media modules keep the style scoped to calm, non-critical interactions.",
      },
    ],
    visualRuleUsage: {
      typography: "DM Sans for UI and headings; IBM Plex Mono for playback timing and compact technical labels.",
      radius: "13px field/actions; 16px example cards; 22-24px panels; circular media controls.",
      shadow: "Raised: 7px 7px 14px #CFD6DE and -7px -7px 14px #FFFFFF; inset fields reverse the depth.",
      border: "1px rgba(71,85,105,.30) for fields; 2px #2563EB on the focus-safe control.",
      spacing: "14px inside examples, 18-22px card padding, 22-28px between visual modules.",
      density: "Low density: one primary control board, three state cards, and three compact use-case examples.",
      motion: "200ms ease-out hover lift; movement stays secondary to the tactile surface state.",
    },
    commonPatterns: ["Raised action buttons", "Inset labeled inputs", "Embossed low-density cards", "Explicit focus-safe controls"],
    useCases: ["Wellness widgets", "Media controls", "Experimental design labs", "Non-critical playful surfaces"],
    strengths: ["Creates a distinct tactile focal point", "Makes small control clusters feel calm and intentional", "Useful for teaching visual-affordance tradeoffs"],
    weaknesses: ["Poor discoverability without added cues", "Low contrast by default", "Hard to scale across dense workflows"],
    accessibilityRisks: ["Weak affordance", "Insufficient non-text contrast", "Pressed states can be ambiguous without a second signal"],
    recommendedFor: ["Experimental"],
    avoidFor: ["Production apps", "Accessibility-first products", "Dense dashboards"],
    tags: ["Experimental", "Accessibility Risk"],
    classification: "experimental",
    realWorldExamples: [
      { label: "Soft UI concept studies", detail: "Raised and inset controls demonstrate the aesthetic, but usually omit the production safeguards this dossier makes visible." },
      { label: "Wellness or media widgets", detail: "Small, non-critical controls can use soft tactility when labels and state cues remain explicit." },
      { label: "Accessibility comparison labs", detail: "Useful for showing why affordance and contrast cannot depend on a shadow-only treatment." },
    ],
    componentExamples: [
      { label: "Raised action", detail: "A lifted action has a readable label and a press/focus treatment beyond its dual outer shadow." },
      { label: "Inset field", detail: "A recessed field keeps a visible label, dark value text, border, and blue focus outline." },
      { label: "State card", detail: "Raised, inset, and focus-safe variants make the affordance comparison visible in one glance." },
    ],
    layoutExamples: [
      { label: "Ambient media board", detail: "A low-density player with one dominant action and a simple progress track is an appropriate tactile scene." },
      { label: "Guided wellness check-in", detail: "A calm, short interaction can use softness if controls still expose labels and selected state." },
      { label: "Accessibility caution demo", detail: "Compare the pure raised/inset treatment with a focus-safe control to explain the tradeoff." },
    ],
    implementationNotes: [
      "Use additional borders, labels, or focus outlines even if they slightly break the pure style.",
      "Avoid using shadow as the only difference between enabled, disabled, and pressed states.",
      "Keep it opt-in and limited to low-density, non-critical surfaces such as media or wellness widgets.",
    ],
    doDont: {
      do: ["Add explicit focus outlines", "Use labels, borders, or color alongside depth", "Limit the style to low-density widgets"],
      dont: ["Use it for dense dashboards or forms", "Depend on low-contrast shadows for affordance", "Hide disabled, pressed, or selected state in tone-on-tone surfaces"],
    },
    suitability: {
      landing: "Low",
      dashboard: "Low",
      portfolio: "Medium",
      productApp: "Low",
      docs: "Low",
      experimentalVisual: "Use carefully",
    },
    tokenRecipe: {
      colors: ["#e9eef5", "#f4f7fb", "#c8d1df", "#64748b", "#1f2937"],
      typography: "DM Sans UI with stronger-than-usual text contrast; IBM Plex Mono for compact technical metadata",
      radius: "12px / 16px / 20px / 24px",
      shadow: "Dual outer/inset shadows, soft blur, low spread",
      border: "Subtle field border plus a strong, visible focus outline where interaction needs clarity",
      spacing: "Comfortable and low-density; 14-22px within components and 22px+ between modules",
      density: "Low; reserve space around the tactile focal interaction",
      motion: "200ms soft press/hover transitions with no decorative drift",
    },
  },
  {
    id: "flat-design",
    name: "Flat Design",
    summary: "A direct 2D UI language where solid fills, dividers, typography, and explicit state changes replace simulated depth.",
    feeling: ["direct", "scalable", "functional"],
    characteristics: ["Flat fills", "Simple icons", "Few shadows", "Typography-led hierarchy", "Clear color blocks"],
    distinguishingSignals: [
      "Flat Design removes fake depth, so borders, alignment, typography, and state layers carry the hierarchy instead.",
      "A visible change in fill, outline, icon, or label makes interaction clear without a shadow or bevel.",
      "The same simple geometry works across mobile lists, settings forms, and dense tile systems when spacing remains disciplined.",
      "The B2 implementation uses ink and teal as the functional base, with coral and yellow reserved for status and information.",
    ],
    colorTokens: [
      { name: "Cool canvas", value: "#F5F7F7", description: "A pale neutral foundation that keeps flat modules calm and readable.", usage: "Dossier canvas and section panels." },
      { name: "Ink", value: "#112B36", description: "High-contrast dark text and focus outline for reliable hierarchy.", usage: "Headings, labels, and strong focus treatment." },
      { name: "Teal action", value: "#087E8B", description: "The main interactive color for navigation, buttons, and selected controls.", usage: "Mobile header, primary actions, and active state." },
      { name: "Aqua selected", value: "#00A6A6", description: "A brighter state color that separates selected controls from the default action fill.", usage: "Selected state column and emphasis cues." },
      { name: "Coral alert", value: "#E05263", description: "A reserved alert/status color that adds a clear non-primary signal.", usage: "Status examples and palette demonstration." },
      { name: "Info yellow", value: "#F4C95D", description: "A warm informational block that remains separate from action and error semantics.", usage: "No-fake-depth principle card and information cues." },
    ],
    dossierUsage: [
      { label: "Mobile list", detail: "The mobile preview uses an active row, teal app bar, labels, and dividers instead of elevation." },
      { label: "State matrix", detail: "Default, hover, selected, focus, and disabled columns make flat interaction feedback comparable at a glance." },
      { label: "Settings form", detail: "Outlined fields, segmented choices, checkboxes, and action buttons show clear affordance in a form-heavy surface." },
      { label: "Principle strips", detail: "Three compact panels explain color blocks, type hierarchy, and the absence of simulated depth." },
    ],
    visualRuleUsage: {
      typography: "Roboto for direct UI copy; Roboto Mono is reserved for compact token labels and technical data.",
      radius: "2-4px controls and cards; geometry stays crisp rather than pill-like.",
      shadow: "None. Separation comes from 1px dividers, solid fills, and spacing.",
      border: "1px #B8C9D1 structural dividers; #112B36 focus outline; #087E8B interactive borders.",
      spacing: "10-18px within modules and 18-20px between the major mobile, state, and settings panels.",
      density: "Medium: information-rich, but each control state remains individually scannable.",
      motion: "Direct 120ms color and outline changes; no float, blur, or elevation animation.",
    },
    commonPatterns: ["Flat navigation bars", "Explicit state matrices", "Divider-based pane layouts", "Solid color-block actions"],
    useCases: ["Mobile apps", "Settings forms", "Tile dashboards", "Design-system baselines"],
    strengths: ["Scales well across screen sizes", "Makes layout and state logic easy to inspect", "Works with responsive systems"],
    weaknesses: ["Affordance can become weak", "Can feel dated if too plain", "Depth hierarchy needs explicit substitutes"],
    accessibilityRisks: ["Clickable elements may look like static labels", "Color-only affordance can fail", "Focus state can disappear without an outline"],
    recommendedFor: ["Product app", "Dashboard", "Mobile UI"],
    avoidFor: ["Premium showcase pages", "Interfaces needing rich material metaphor"],
    tags: ["Product", "Dashboard", "Historical"],
    classification: "historical-reference",
    realWorldExamples: [
      { label: "Microsoft Metro", detail: "A typographic interface language built from clear tiles, direct motion, and deliberate color blocks." },
      { label: "iOS 7 era app UI", detail: "The move away from heavy realism made labels, navigation, and state treatment carry more of the interaction work." },
      { label: "Product settings surfaces", detail: "Flat panes, bordered fields, and solid actions are a practical baseline for configuration interfaces." },
    ],
    componentExamples: [
      { label: "Stateful button", detail: "Default, hover, selected, focus, and disabled variants change fill or outline instead of elevation." },
      { label: "Outlined field", detail: "A labeled border-driven field gives the user a stable text-entry affordance without depth." },
      { label: "Segmented control", detail: "Adjacent rectangular options show selection with solid fill plus label, not color alone." },
    ],
    layoutExamples: [
      { label: "Mobile messages", detail: "An active row, teal app bar, and divider-separated list make a compact mobile state easy to scan." },
      { label: "State system", detail: "A side-by-side component matrix documents the exact state changes a flat control needs." },
      { label: "Component settings", detail: "Fields, checkboxes, radios, segmented options, and clear save/cancel actions show a functional flat form." },
    ],
    implementationNotes: [
      "Add non-color cues for interactivity: border, label, icon, focus ring, or state layer.",
      "Use spacing and typography to compensate for low elevation.",
      "Treat it as a clean baseline, not automatically as a modern premium style.",
    ],
    doDont: {
      do: ["Make interactive states explicit", "Use typography and dividers for hierarchy", "Keep icons and labels consistent"],
      dont: ["Make every element equally flat", "Use color as the only click cue", "Remove focus and hierarchy cues in pursuit of purity"],
    },
    suitability: {
      landing: "Medium",
      dashboard: "Medium",
      portfolio: "Low",
      productApp: "Medium",
      docs: "Medium",
      experimentalVisual: "Low",
    },
    tokenRecipe: {
      colors: ["#F5F7F7", "#087E8B", "#112B36", "#E05263", "#F4C95D", "#B8C9D1"],
      typography: "Roboto, 14-16px body, clear label hierarchy",
      radius: "0px / 4px / 8px",
      shadow: "None or hairline-only separation",
      border: "1px blue-gray dividers and explicit interactive/focus outlines",
      spacing: "Compact to medium, 10-18px controls",
      density: "Medium",
      motion: "Direct 120ms color and outline state changes",
    },
  },
  {
    id: "skeuomorphism",
    name: "Skeuomorphism / Realistic UI",
    summary: "Object-inspired UI that borrows physical materials, bevels, textures, and metaphors to signal use.",
    feeling: ["familiar", "tactile", "nostalgic"],
    characteristics: ["Material textures", "Beveled edges", "Inner shadows", "Object metaphors", "Layered highlights"],
    distinguishingSignals: [
      "Material, depth, and a physical metaphor make controls understandable before a user reads every label.",
      "Raised, inset, and pressed surfaces use directional light to communicate distinct interaction states.",
      "Skeuomorphic cues work best inside specialist tools or bounded moments, not as a default product shell.",
    ],
    colorTokens: [
      { name: "Paper reading surface", value: "#F7F2E8", description: "A quiet ivory surface that keeps dense command and research text legible.", usage: "Command input, notes, and explanatory content." },
      { name: "Enamel frame", value: "#171816", description: "A restrained charcoal housing that groups instrument-like controls.", usage: "Signal Desk rails, meters, and task queue framing." },
      { name: "Brushed aluminum", value: "#AAA59A", description: "A neutral material role that gives controls durable separation without decorative chrome.", usage: "Meter deck, control strip, and bevel edges." },
      { name: "Walnut accent", value: "#5A371E", description: "A warm material note used sparingly to anchor the monitor and selected source.", usage: "Selected source, monitor block, and small material samples." },
      { name: "Amber action", value: "#B87A2A", description: "A visible action color that retains contrast against dark and light material surfaces.", usage: "Execute action, active source outline, and meter threshold." },
      { name: "Operational green", value: "#8FCB66", description: "A non-decorative operational signal paired with status text.", usage: "Source presence, running state, and system status." },
    ],
    dossierUsage: [
      { label: "Signal Desk console", detail: "A bounded audio-analysis scene uses hardware grouping to make input, output, and monitoring relationships immediately scannable." },
      { label: "Quiet paper command area", detail: "The generated paper texture stays outside the text field so commands and supporting copy remain reliably readable." },
      { label: "Stateful control anatomy", detail: "Raised, inset, and pressed buttons demonstrate a tactile hierarchy while retaining standard semantic button elements." },
      { label: "Material inspection rail", detail: "A right-hand specimen rail names the physical cues instead of treating realism as decoration without explanation." },
    ],
    visualRuleUsage: {
      typography: "Fraunces Variable for display labels; Inter Variable for controls and body; IBM Plex Mono for session metadata.",
      radius: "4px controls, 8px panels, 14px bounded console housing.",
      shadow: "One directional outer shadow plus restrained inner highlight; pressed controls invert the depth.",
      border: "Dark enamel or muted-metal borders define material joins and focus-safe controls.",
      spacing: "12px internal control rhythm, 18px panel gaps, and denser specialist-tool grouping.",
      density: "Medium-high within the console, with quiet reading surfaces and named subgroups.",
      motion: "120–180ms mechanical press and focus transitions; no ornamental movement.",
    },
    commonPatterns: ["Realistic knobs", "Notebook panels", "Leather/metal textures", "Embossed controls"],
    useCases: ["Specialty tools", "Audio interfaces", "Onboarding metaphors", "Nostalgia-driven products"],
    strengths: ["Strong perceived affordance", "Memorable and tactile", "Helpful when physical metaphor clarifies function"],
    weaknesses: ["Heavy to implement", "Can feel dated", "Hard to keep consistent across responsive layouts"],
    accessibilityRisks: ["Texture can reduce text clarity", "Decorative realism can hide actual state", "Complex shadows can distract"],
    recommendedFor: ["Specialty tools", "Experimental", "Onboarding"],
    avoidFor: ["Generic SaaS", "Dense dashboards", "Fast-loading docs"],
    tags: ["Experimental", "Historical", "Tactile"],
    classification: "historical-reference",
    realWorldExamples: [
      { label: "Early iOS apps", detail: "Notes, calendar, and bookshelf metaphors used physical cues to teach interaction." },
      { label: "Audio plugins", detail: "Knobs, meters, and rack units still benefit from familiar physical affordances." },
      { label: "Specialized simulators", detail: "Realistic controls help when the interface maps to a real-world device." },
    ],
    componentExamples: [
      { label: "Button", detail: "Beveled surface with highlight, shadow, and pressed inset state." },
      { label: "Panel", detail: "Paper, metal, leather, or instrument-like surface with layered depth." },
      { label: "Dial/control", detail: "Physical metaphor with clear value indicator and keyboard-accessible equivalent." },
    ],
    layoutExamples: [
      { label: "Audio console", detail: "Knobs, meters, sliders, and hardware-inspired grouping." },
      { label: "Onboarding metaphor", detail: "Notebook, card, or workspace object that explains a new concept." },
      { label: "Nostalgia promo", detail: "A themed landing or concept surface rather than a broad app default." },
    ],
    implementationNotes: [
      "Use realistic effects only where the physical metaphor improves comprehension.",
      "Keep text on quiet solid areas; avoid putting body copy over texture.",
      "Provide standard keyboard/focus behavior even when the control looks like an object.",
    ],
    doDont: {
      do: ["Use physical metaphor intentionally", "Keep state changes obvious", "Protect text readability from texture"],
      dont: ["Apply textures to every surface", "Let realism override responsive usability", "Hide accessibility states behind decorative shadows"],
    },
    suitability: {
      landing: "Low",
      dashboard: "Low",
      portfolio: "Medium",
      productApp: "Low",
      docs: "Low",
      experimentalVisual: "Use carefully",
    },
    tokenRecipe: {
      colors: ["#f7f2e8", "#e8dcc7", "#b79f79", "#2f2418", "#ffffff"],
      typography: "Mixed UI sans plus themed display only when brand-appropriate",
      radius: "6px / 12px / 20px, object-dependent",
      shadow: "Layered inner and outer shadows with highlights",
      border: "Material-colored bevel borders",
      spacing: "Medium object-like padding",
      density: "Medium",
      motion: "Pressed and mechanical transitions, 120-220ms",
    },
  },
  {
    id: "claymorphism",
    name: "Claymorphism / Soft 3D",
    summary: "A low-density soft-3D learning scene where inflated geometry, matte pastel depth, and explicit copy make exploration feel inviting rather than busy.",
    feeling: ["playful", "friendly", "soft"],
    characteristics: ["Large radius", "Puffed surfaces", "Pastel gradients", "Soft 3D shadows", "Rounded illustration cues"],
    distinguishingSignals: [
      "Bloom Studio uses a consistent upper-left light direction so raised cards, inset fields, and the pressed tab read as one tactile material system.",
      "A single generated learning-orbit image anchors the featured path; the rest of the interface uses code-native soft objects so the scene stays flexible and responsive.",
      "Explore and Progress share one shell but change the primary task: discovery is visual and spacious, while progress makes milestones, time, and completion explicit.",
    ],
    colorTokens: [
      { name: "Oat workspace", value: "#FBF4EB", description: "A warm low-contrast frame that keeps the product friendly without using a blank white application shell.", usage: "Bloom Studio housing, navigation rail, and page gutters." },
      { name: "Quiet surface", value: "#FFFAF4", description: "The calm reading layer that supports dark copy and tactile elevation.", usage: "Cards, schedule rows, inner panels, and input surfaces." },
      { name: "Plum ink", value: "#382946", description: "The high-contrast text role that preserves hierarchy over pastel material colors.", usage: "Headlines, control labels, primary content, and selected states." },
      { name: "Peach action", value: "#F4AB86", description: "A warm, raised action tone used only for the active tab and primary next step.", usage: "Explore/Progress selected tab, featured action, and focus session CTA." },
      { name: "Lavender depth", value: "#C7B9E9", description: "A soft dimensional accent that reinforces the hero object and calmer achievement states.", usage: "Learning-orbit hero, progress steps, and restrained secondary highlights." },
      { name: "Mint status", value: "#BFD8C2", description: "A gentle completion and wellbeing signal that is always paired with text or an icon.", usage: "Milestone status, topic illustration, and learning pulse breakdown." },
    ],
    dossierUsage: [
      { label: "Bloom Studio Explore", detail: "The selected layout uses a generated soft-3D orbit as a hero background with code-native topic cards, search control, learning pulse, and schedule." },
      { label: "Bloom Studio Progress", detail: "A real inner tab swaps to a three-step learning path, current-course progress, achievements, and a focus-time companion panel." },
      { label: "Tactile state grammar", detail: "Raised primary actions, inset search, active topic outline, and selected tab use different semantic states while keeping a single soft light direction." },
      { label: "Bounded use case", detail: "The scene demonstrates onboarding, education, and wellness modules at intentionally low density rather than presenting clay surfaces as a generic admin dashboard." },
    ],
    visualRuleUsage: {
      typography: "Poppins for all interface hierarchy; IBM Plex Mono only for compact labels such as Learning library and Weekly rhythm.",
      radius: "20px topic tiles, 27-30px cards, 32px hero, and fully rounded 999px actions and segmented tabs.",
      shadow: "Soft upper-left highlight with 9px/10px muted outer shadow; primary actions invert to an inset press state.",
      border: "Subtle warm edge tint only; focusable controls receive a visible indigo 3px focus ring that does not depend on shadow.",
      spacing: "13-18px local gaps, 22-30px internal card padding, and intentional negative space around the hero object.",
      density: "Low in the Explore canvas and medium in the Progress path, with the detail rail collapsing beneath the content before mobile.",
      motion: "220ms lift and press feedback for controls; no decorative looping movement on the 3D asset.",
    },
    commonPatterns: ["Chunky cards", "Bubble buttons", "Soft 3D icons", "Onboarding panels", "Pill status and progress modules"],
    useCases: ["Playful onboarding", "Education", "Wellness", "Consumer launch pages"],
    strengths: ["Friendly tone", "Strong visual personality", "Works well with illustration", "Makes a first learning step feel approachable"],
    weaknesses: ["Too whimsical for serious workflows", "Low density", "Can become childish quickly", "Shadow-only state cues fail without clear labels"],
    accessibilityRisks: ["Pastel contrast failures", "Large soft forms can reduce scan efficiency", "Decorative shadows may obscure hierarchy"],
    recommendedFor: ["Onboarding", "Education", "Wellness", "Consumer promo", "Experimental"],
    avoidFor: ["Enterprise dashboards", "Finance/medical tools", "Dense forms", "High-volume operational work"],
    tags: ["Experimental", "Education", "Playful"],
    classification: "experimental",
    realWorldExamples: [
      { label: "Playful onboarding screens", detail: "Soft 3D icons and rounded panels give a first consumer or education task a gentle focal point." },
      { label: "Learning companions", detail: "A small set of course cards, milestones, and a focus timer can feel encouraging when status remains explicit." },
      { label: "Wellness apps", detail: "Friendly pastel surfaces can reduce perceived severity when body copy and controls retain contrast." },
    ],
    componentExamples: [
      { label: "Primary action", detail: "Chunky peach pill with a text label, focus ring, and an inset press response." },
      { label: "Search control", detail: "Rounded inset field with an icon and real search input rather than a purely decorative placeholder." },
      { label: "Progress module", detail: "Milestones, percent value, and status text communicate completion independently of soft color or shadow." },
    ],
    layoutExamples: [
      { label: "Discover learning", detail: "A featured hero with an open copy zone, topic cards, and a supportive weekly rail keeps the first decision easy." },
      { label: "Learning progress", detail: "A matching tab changes the task to milestones and a current course without changing the workspace shell." },
      { label: "Feature cards", detail: "Works when each feature has a small playful visual object but still reserves enough area for readable copy." },
    ],
    implementationNotes: [
      "Keep body text on high-contrast foreground colors, not low-contrast pastel pairings.",
      "Use one consistent radius and light direction so the style feels intentional rather than randomly puffy.",
      "Limit density; use a generated hero object once and let code-native forms carry the responsive interface details.",
    ],
    doDont: {
      do: ["Use friendly rounded geometry", "Check contrast on pastel surfaces", "Pair soft surfaces with direct labels and text-based progress"],
      dont: ["Use it for serious admin tools", "Crowd many clay cards into a dense grid", "Let decorative objects compete with the main action or hide focus states"],
    },
    suitability: {
      landing: "Medium",
      dashboard: "Low",
      portfolio: "Medium",
      productApp: "Medium",
      docs: "Low",
      experimentalVisual: "Use carefully",
    },
    tokenRecipe: {
      colors: ["#FBF4EB", "#FFFAF4", "#382946", "#F4AB86", "#C7B9E9", "#BFD8C2"],
      typography: "Poppins, 15-18px body, compact mono labels only where scan support helps",
      radius: "20px / 27px / 30px / 999px",
      shadow: "Soft 9px 10px 22px shadow plus upper-left highlight; selected controls retain an explicit outline",
      border: "Subtle warm edge tint and a high-contrast indigo focus outline",
      spacing: "Low-density 13-30px modules with a protected copy zone in the generated hero",
      density: "Low to medium by task; the support rail stacks below content before mobile",
      motion: "220ms lift and press; no ornamental looping animation",
    },
  },
  {
    id: "dark-futuristic",
    name: "Dark Futuristic / Neon Tech",
    summary: "A market-made technical aesthetic that combines dark canvases, luminous accents, fine grids or gradient meshes, and controlled motion to signal advanced tooling, AI, or developer sophistication.",
    feeling: ["advanced", "cinematic", "technical"],
    characteristics: ["Dark surfaces", "Luminous accents", "Fine grid or mesh depth", "Glow edges", "Sans and mono pairing"],
    distinguishingSignals: [
      "A dark canvas, light signals, and grid or mesh depth create an advanced technical mood without relying on a single fixed template.",
      "It is strongest on premium launch and system-console surfaces; the visual vocabulary should not overpower the task.",
      "Keep tables, long forms, and dense data areas calmer than the hero so the interface remains usable.",
    ],
    colorTokens: [
      { name: "Signal Grid canvas", value: "#0B0F16", description: "Local dossier runtime token: a near-black workspace base that creates focus without reading as pure black.", usage: "Dossier ground, terminal backdrop, and negative space around the workflow graph." },
      { name: "Signal Grid surface", value: "#101722", description: "Local dossier runtime token: a blue-black panel layer that separates controls and data without heavy elevation.", usage: "Incident rail, deploy controls, cards, and content panels." },
      { name: "Signal Grid raised surface", value: "#1C293B", description: "Local dossier runtime token: a brighter layer that gives inputs and research cards a legible edge.", usage: "Command input, example cards, and selected information groups." },
      { name: "Signal Grid lime", value: "#B7F34A", description: "Local primary-action and healthy-state token; it stays scarce so it retains urgency.", usage: "Deploy action, selected pipeline stage, and healthy status." },
      { name: "Signal Grid cyan", value: "#39D8FF", description: "Local information and focus token for technical data and keyboard navigation.", usage: "Focus rings, informational alerts, graph connections, and status details." },
      { name: "Signal Grid violet", value: "#8F7CFF", description: "Local secondary workflow token that does not compete with the primary action.", usage: "Secondary graph branches, pending verification, and explanatory emphasis." },
    ],
    dossierUsage: [
      { label: "Local Signal Grid control room", detail: "This dossier implementation prioritizes live incidents, command input, deployment controls, and a dependency field over decorative hero treatment." },
      { label: "State-led color", detail: "Lime identifies the active deploy path and healthy status; cyan and violet explain supporting system information." },
      { label: "Calm dark reading", detail: "Overview and Examples use elevated opaque panels with bright copy so research content remains usable after the visual console." },
      { label: "Responsive fallback", detail: "At narrow widths, the command workspace remains first and each rail becomes a readable single-column block." },
    ],
    visualRuleUsage: {
      typography: "Local Signal Grid: Space Grotesk for operational hierarchy; Roboto Mono for timestamps, command prompts, IDs, and metrics.",
      radius: "Local Signal Grid: 5px controls, 7-8px panels and cards, 10-12px dossier containers.",
      shadow: "Local Signal Grid: low-opacity blue-black elevation; focused or selected states receive one restrained colored glow.",
      border: "Local Signal Grid: 1px rgba(162,188,222,.18-.28) separates surfaces; focus uses a 3px cyan outline.",
      spacing: "Local Signal Grid: 9-16px local gaps, 12-13px panel padding, and compact single-line control labels.",
      density: "Local Signal Grid: high operational density, with grouped rails and a protected central workflow field.",
      motion: "Local Signal Grid: 160-220ms state feedback only; no looping graph motion and reduced-motion support is required.",
    },
    commonPatterns: ["AI launch hero", "Console panels", "Technical workflow preview", "Signal and status chips"],
    useCases: ["AI products", "Developer tools", "Security tools", "Technical launch pages"],
    strengths: ["Creates a credible advanced-product point of view", "Makes technical hierarchy feel intentional", "Works across launch and system-console surfaces"],
    weaknesses: ["Can become theatrical or visually tiring", "Accent color loses meaning when overused", "Dense forms and tables need a calmer treatment"],
    accessibilityRisks: ["Muted text can disappear on near-black panels", "Glow-only states are not reliable affordances", "Continuous motion can distract or trigger vestibular sensitivity"],
    recommendedFor: ["Landing", "Developer tools", "Experimental"],
    avoidFor: ["Long-form docs", "Everyday back-office tools", "High-volume data entry"],
    tags: ["Landing", "Product", "Experimental"],
    classification: "expressive",
    realWorldExamples: [
      { label: "AI launch pages", detail: "A restrained dark hero, luminous accent, and technical product preview can signal model capability without obscuring the message." },
      { label: "Developer-tool demos", detail: "Console, workflow, or code-adjacent previews make the product feel tangible when the primary task remains legible." },
      { label: "Security products", detail: "Dark monitoring surfaces can use explicit severity labels and icons, with color as a secondary scan cue." },
    ],
    componentExamples: [
      { label: "Primary action", detail: "A high-contrast dark or luminous CTA with a visible focus state; reserve its glow for the actual primary decision." },
      { label: "Dark panel", detail: "A dark, readable surface with a fine edge and restrained accent glow, not transparent text over an effect-heavy background." },
      { label: "Command and status control", detail: "A real labeled control or status chip with text and icon support; mono treatment is used only where it improves scanning." },
    ],
    layoutExamples: [
      { label: "AI product hero", detail: "A dark launch surface places the message and one primary action beside a readable technical preview." },
      { label: "Command center", detail: "A console or workflow workspace uses clear status grouping, while long data entry and tables stay comparatively calm." },
      { label: "Technical launch page", detail: "Layered grid or mesh depth supports product proof and feature modules without becoming the content itself." },
    ],
    implementationNotes: [
      "Start with readable dark surfaces and high-contrast copy before adding accents, gradients, grids, or glow.",
      "Assign signal colors meaningful roles and preserve a clearly visible focus treatment that does not depend on glow alone.",
      "Use dense technical previews selectively; responsive layouts should keep the message, task, and primary action easy to scan.",
    ],
    doDont: {
      do: ["Pair state color with text and icons", "Keep reading surfaces opaque and high contrast", "Use mono only where it improves scanning"],
      dont: ["Use glow as the only state cue", "Let muted text disappear into dark panels", "Apply the hero treatment unchanged to dense forms and tables"],
    },
    suitability: {
      landing: "High",
      dashboard: "Medium",
      portfolio: "Medium",
      productApp: "Medium",
      docs: "Low",
      experimentalVisual: "Use carefully",
    },
    tokenRecipe: {
      colors: ["#0B1020", "#111827", "#22D3EE", "#A78BFA", "#E5E7EB"],
      typography: "Modern sans with mono accents, 14-16px body, 40px display",
      radius: "12px / 16px / 24px",
      shadow: "0 0 0 1px rgba(255,255,255,.08), 0 0 32px rgba(34,211,238,.12)",
      border: "Fine light edges and accent focus rings; maintain visible non-glow focus feedback",
      spacing: "8px / 16px / 24px / 40px",
      density: "Low to medium overall; keep dense tables and forms calmer than the hero",
      motion: "Smooth, controlled transitions; provide reduced-motion support and avoid ornamental looping",
    },
  },
  {
    id: "web20-gloss",
    name: "Web 2.0 Gloss / Frutiger Aero",
    summary: "Glossy, optimistic, eco-tech nostalgia with aqua gradients, shine, transparency, and rounded gel controls.",
    feeling: ["nostalgic", "bright", "optimistic"],
    characteristics: ["Gloss highlights", "Aqua gradients", "Rounded gel buttons", "Transparency", "Eco-tech imagery"],
    distinguishingSignals: [
      "Aqua sky, water, bubbles, and friendly technology create an optimistic early-web world rather than a neutral product shell.",
      "Gloss is structural: white highlight bands, bevels, and blue edge shadows establish controls before decorative detail.",
      "Use the visual language for a themed promo or experiment, then protect text and form controls with quiet opaque reading surfaces.",
    ],
    colorTokens: [
      { name: "Aero sky", value: "#29BFF2", description: "The bright optimistic page field behind the promo scene.", usage: "Hero sky band and open negative space." },
      { name: "Aqua gel", value: "#00AEEF", description: "The signature Web 2.0 interaction blue.", usage: "Nav chrome, rounded controls, and gloss edges." },
      { name: "Cloud white", value: "#FFFFFF", description: "A clean highlight and readable content surface.", usage: "Inset shine, image frames, and input field." },
      { name: "Leaf lime", value: "#8DD61E", description: "A playful eco-tech secondary signal.", usage: "Online badge and the green feature tile." },
      { name: "Sun orange", value: "#FF9D06", description: "Warm action color that breaks the blue field without looking corporate.", usage: "Primary gel CTA and energy tile." },
      { name: "Ocean ink", value: "#07558B", description: "Dark blue copy color that stays legible over light aqua.", usage: "Labels, body copy, and focus-adjacent detail." },
    ],
    dossierUsage: [
      { label: "Aqua Bloom promo", detail: "The dossier uses a code-native eco-tech promo beside the local layout reference, not a modern SaaS dashboard." },
      { label: "Gel interaction anatomy", detail: "Blue navigation, an orange primary action, a secondary gloss action, selectable rounded tiles, and an inset search control show the intended hierarchy." },
      { label: "Protected reading layer", detail: "The generated sky and water image stays in a framed visual panel while copy and form input remain on opaque or high-contrast surfaces." },
      { label: "Responsive fallback", detail: "At mobile width the visual, tile stack, and input collapse into one readable column without removing the playful material language." },
    ],
    visualRuleUsage: {
      typography: "Local Aqua Bloom: Poppins for upbeat display and controls; Roboto Mono remains reserved for compact technical labels.",
      radius: "Local Aqua Bloom: 999px buttons and input, 13-14px controls, and 18-22px framed visual panels.",
      shadow: "Local Aqua Bloom: white inset highlight plus a soft blue outer shadow; no neutral gray elevation.",
      border: "Local Aqua Bloom: cyan-blue edges, white highlight lines, and a visible focus outline that does not depend on shine.",
      spacing: "Local Aqua Bloom: 7-16px compact promo gaps with 12px outer framing.",
      density: "Local Aqua Bloom: medium, with three themed tiles and a contained illustrated hero rather than dense operational data.",
      motion: "Local Aqua Bloom: 120-200ms press and hover feedback only; no perpetual decorative animation.",
    },
    commonPatterns: ["Glossy nav", "Gel CTAs", "Aero panels", "Orb badges"],
    useCases: ["Nostalgia campaigns", "Concept art", "Themed promo pages", "Retro interface studies"],
    strengths: ["Highly recognizable", "Emotionally specific", "Useful for nostalgia and concept work"],
    weaknesses: ["Feels dated as a default", "Visually loaded", "Hard to reconcile with modern dense UI"],
    accessibilityRisks: ["Highlight glare can reduce readability", "Busy backgrounds harm contrast", "Gloss can obscure state differences"],
    recommendedFor: ["Experimental", "Nostalgia promo", "Portfolio"],
    avoidFor: ["Modern SaaS default", "Docs", "Enterprise workflows"],
    tags: ["Experimental", "Historical", "Landing"],
    classification: "historical-reference",
    realWorldExamples: [
      { label: "Windows Aero era", detail: "Transparent chrome, glossy surfaces, and optimistic early web UI language." },
      { label: "Frutiger Aero nostalgia", detail: "Sky, water, glass, greenery, and technology-in-harmony imagery." },
      { label: "Retro campaign sites", detail: "Themed interfaces that intentionally reference 2004-2013 web aesthetics." },
    ],
    componentExamples: [
      { label: "Button", detail: "Rounded gel button with vertical gradient, inner highlight, and strong readable label." },
      { label: "Panel", detail: "Glossy aqua or translucent card with visible edge and controlled background." },
      { label: "Badge", detail: "Shiny orb or pill used sparingly for nostalgia, not every label." },
    ],
    layoutExamples: [
      { label: "Retro promo", detail: "Bright hero, glossy CTA, optimistic imagery, and simple offer." },
      { label: "Concept study", detail: "Side-by-side comparison of old glossy chrome versus modern flat/minimal UI." },
      { label: "Portfolio experiment", detail: "A deliberately nostalgic visual statement with modern accessibility safeguards." },
    ],
    implementationNotes: [
      "Keep gloss effects away from small text and important status labels.",
      "Use the nostalgia intentionally; otherwise it reads as outdated rather than styled.",
      "Control gradients and highlights so states remain distinguishable.",
    ],
    doDont: {
      do: ["Use glossy highlights selectively", "Keep labels high contrast", "Frame it as nostalgic or experimental"],
      dont: ["Use busy nature/sky imagery behind body copy", "Make every control shiny", "Use it as the default for modern productivity UI"],
    },
    suitability: {
      landing: "Medium",
      dashboard: "Low",
      portfolio: "Medium",
      productApp: "Low",
      docs: "Low",
      experimentalVisual: "Use carefully",
    },
    tokenRecipe: {
      colors: ["#00aeef", "#6ee7b7", "#ffffff", "#1e3a8a", "#a7f3d0"],
      typography: "Humanist/system sans, 14-18px body, friendly bold headings",
      radius: "12px / 20px / 28px",
      shadow: "Glossy inner highlights plus soft aqua shadow",
      border: "Light translucent borders and inset highlight lines",
      spacing: "Medium, 16-32px modules",
      density: "Medium",
      motion: "Gloss hover shine and direct press states, 120-200ms",
    },
  },
];

const catalogResult = buildDesignStyleCatalog(
  legacyDesignStyles,
  [modernSaasResearchStyle, ...migratedResearchStyles],
);

if (!catalogResult.ok) {
  throw new Error(
    `Invalid normalized style catalog: ${catalogResult.issues
      .map(({ path, message }) => `${path}: ${message}`)
      .join("; ")}`,
  );
}

export const designStyles: DesignStyle[] = catalogResult.value;

export type StyleRecommendation = {
  goal: string;
  recommendedStyle: string;
  why: string;
  caution: string;
};

export const recommendations: StyleRecommendation[] = [
  {
    goal: "Build a polished landing or product demo",
    recommendedStyle: "Modern SaaS",
    why: "Looks premium, stays flexible, and works well for hero, feature, pricing, and product surfaces.",
    caution: "Avoid stacking too much gradient, glow, or shadow.",
  },
  {
    goal: "Create a clean product that should age well",
    recommendedStyle: "Minimal / Clean",
    why: "Keeps cognitive load low and gives typography, spacing, and content room to work.",
    caution: "Make affordances and focus states visible enough.",
  },
  {
    goal: "Design internal tools, forms, and dashboards",
    recommendedStyle: "Enterprise / Admin",
    why: "Optimizes for scanning, repeated action, tables, filters, status, and predictable layouts.",
    caution: "Polish spacing and hierarchy so it does not feel generic.",
  },
  {
    goal: "Build a portfolio or creative brand page",
    recommendedStyle: "Editorial / Portfolio or Neo-brutalism",
    why: "Typography-led composition and bold visual treatments create a stronger point of view.",
    caution: "Do not use these as the default for dense product workflows.",
  },
  {
    goal: "Add a premium visual accent",
    recommendedStyle: "Glassmorphism",
    why: "Frosted surfaces can make hero areas, overlays, and showcase cards feel atmospheric.",
    caution: "Use carefully because contrast, blur, and background variance can hurt readability.",
  },
  {
    goal: "Prioritize accessibility and production reliability",
    recommendedStyle: "Minimal / Clean, Enterprise / Admin, or Material / Fluent-like",
    why: "These styles provide clearer states, stronger contrast headroom, and more predictable patterns.",
    caution: "Avoid Neumorphism and full-page Glassmorphism as primary styles.",
  },
];
