export type FitLevel = "High" | "Medium" | "Low" | "Use carefully";

export type DesignStyle = {
  id: string;
  name: string;
  summary: string;
  feeling: string[];
  characteristics: string[];
  commonPatterns: string[];
  useCases: string[];
  strengths: string[];
  weaknesses: string[];
  accessibilityRisks: string[];
  recommendedFor: string[];
  avoidFor: string[];
  tags: string[];
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

export const designStyles: DesignStyle[] = [
  {
    id: "modern-saas",
    name: "Modern SaaS",
    summary: "Polished product UI with soft surfaces, clear hierarchy, and restrained brand tint.",
    feeling: ["premium", "focused", "demo-ready"],
    characteristics: ["Soft radius", "Layered cards", "Light gradients", "Crisp labels", "Prominent primary actions"],
    commonPatterns: ["Hero dashboard mock", "Feature cards", "Metric rows", "Command buttons"],
    useCases: ["Product landing", "Demo app", "Developer tools", "Startup dashboards"],
    strengths: ["Looks finished quickly", "Balances marketing and app UI", "Easy to make responsive"],
    weaknesses: ["Can become generic if gradients and shadows are overused", "Needs disciplined spacing"],
    accessibilityRisks: ["Tinted low-contrast secondary text", "Decorative gradients behind body copy"],
    recommendedFor: ["Landing", "Dashboard", "Product app"],
    avoidFor: ["Very dense admin tools"],
    tags: ["Landing", "Dashboard", "Product"],
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
    commonPatterns: ["Outlined cards", "Simple forms", "Text-first sections", "Subtle dividers"],
    useCases: ["Docs", "Productivity apps", "Portfolios", "Long-lived internal tools"],
    strengths: ["High readability", "Low maintenance", "Strong accessibility headroom"],
    weaknesses: ["Can feel plain without excellent typography", "Affordances may be too quiet"],
    accessibilityRisks: ["Under-signaled buttons or inputs", "Focus rings made too subtle"],
    recommendedFor: ["Product app", "Docs", "Portfolio"],
    avoidFor: ["Campaigns that need strong visual punch"],
    tags: ["Product", "Portfolio", "Accessible"],
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
    commonPatterns: ["Filter bars", "Data panels", "Settings groups", "Status badges"],
    useCases: ["Admin consoles", "Dashboards", "Back-office tools", "Settings-heavy products"],
    strengths: ["Excellent for dense information", "Predictable", "Easy to validate visually"],
    weaknesses: ["Less expressive for marketing", "Can look bland without polish"],
    accessibilityRisks: ["Too many small controls", "Dense tables without row focus states"],
    recommendedFor: ["Dashboard", "Product app"],
    avoidFor: ["Portfolio", "Brand-heavy landing pages"],
    tags: ["Dashboard", "Admin", "Data"],
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
    commonPatterns: ["Magazine hero", "Project index", "Case study modules", "Text buttons"],
    useCases: ["Portfolio", "Agency sites", "Editorial landing", "Creative campaigns"],
    strengths: ["Memorable personality", "Strong storytelling", "Excellent for case studies"],
    weaknesses: ["Not portable to dense app workflows", "Depends on content quality"],
    accessibilityRisks: ["Oversized type can crowd mobile", "Decorative layouts can weaken reading order"],
    recommendedFor: ["Portfolio", "Landing"],
    avoidFor: ["Admin dashboards", "Form-heavy workflows"],
    tags: ["Portfolio", "Landing", "Brand"],
    suitability: {
      landing: "High",
      dashboard: "Low",
      portfolio: "High",
      productApp: "Low",
      docs: "Medium",
      experimentalVisual: "Medium",
    },
    tokenRecipe: {
      colors: ["#fafaf9", "#111111", "#ef4444", "#f5f5f4", "#737373"],
      typography: "Expressive display face paired with readable sans body",
      radius: "0px / 8px / 12px",
      shadow: "Little to none",
      border: "Graphic rules, hairlines, and section dividers",
      spacing: "Large margins, asymmetrical rhythm",
      density: "Spacious",
      motion: "180-260ms scroll and media transitions",
    },
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    summary: "Frosted translucent surfaces over rich backgrounds, useful as an accent rather than a full system.",
    feeling: ["atmospheric", "premium", "fragile"],
    characteristics: ["Backdrop blur", "Transparent panels", "Edge highlights", "Gradient backdrops", "Soft depth"],
    commonPatterns: ["Glass cards", "Floating nav", "Hero overlays", "Modal panels"],
    useCases: ["Hero sections", "Media products", "Showcase cards", "Premium visual accents"],
    strengths: ["Strong visual impact", "Creates depth without heavy chrome"],
    weaknesses: ["Hard to scale to dense forms", "Can hurt performance and legibility"],
    accessibilityRisks: ["Text contrast over variable backgrounds", "Reduced transparency preferences", "Ambiguous layering"],
    recommendedFor: ["Landing", "Experimental"],
    avoidFor: ["Dense dashboard", "Critical forms", "Accessibility-first production apps"],
    tags: ["Landing", "Experimental", "Accessibility Risk"],
    suitability: {
      landing: "High",
      dashboard: "Low",
      portfolio: "Medium",
      productApp: "Low",
      docs: "Low",
      experimentalVisual: "Use carefully",
    },
    tokenRecipe: {
      colors: ["#0f172a", "rgba(255,255,255,.68)", "#a78bfa", "#22d3ee", "#ffffff"],
      typography: "Medium-weight sans; avoid thin text",
      radius: "16px / 20px / 24px / 28px",
      shadow: "Soft ambient shadow and subtle highlights",
      border: "1px solid rgba(255,255,255,.32)",
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
    commonPatterns: ["Outlined buttons", "Chunky cards", "Sticker badges", "Graphic hero blocks"],
    useCases: ["Creative portfolios", "Campaign pages", "Experimental products", "Youthful brands"],
    strengths: ["Highly distinctive", "Fast to visually differentiate", "Strong affordance when contrast is high"],
    weaknesses: ["Can be tiring", "Narrow brand fit", "Poor for serious dense workflows"],
    accessibilityRisks: ["Visual overload", "Color combinations can fail contrast", "Aggressive motion can distract"],
    recommendedFor: ["Portfolio", "Experimental", "Landing"],
    avoidFor: ["Enterprise dashboards", "Medical/finance workflows"],
    tags: ["Portfolio", "Experimental", "High Contrast"],
    suitability: {
      landing: "Medium",
      dashboard: "Low",
      portfolio: "High",
      productApp: "Low",
      docs: "Low",
      experimentalVisual: "Use carefully",
    },
    tokenRecipe: {
      colors: ["#fff7ed", "#111111", "#facc15", "#fb7185", "#60a5fa"],
      typography: "Bold grotesk, heavy labels, occasional all-caps",
      radius: "0px / 4px / 8px",
      shadow: "4px 4px 0 #111 or 6px 6px 0 #111",
      border: "2-3px solid #111",
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
    commonPatterns: ["Filled/outlined buttons", "Text fields with helper text", "Elevated cards", "App bars"],
    useCases: ["Cross-platform apps", "Design-system demos", "Product apps", "Accessible forms"],
    strengths: ["Clear states", "Scales well", "Strong accessibility baseline"],
    weaknesses: ["Can feel less distinctive", "Requires disciplined token modeling"],
    accessibilityRisks: ["Over-customizing can break known state patterns", "Too subtle state layers"],
    recommendedFor: ["Product app", "Dashboard", "Forms"],
    avoidFor: ["Highly bespoke editorial pages"],
    tags: ["Product", "Dashboard", "Accessible"],
    suitability: {
      landing: "Medium",
      dashboard: "High",
      portfolio: "Low",
      productApp: "High",
      docs: "Medium",
      experimentalVisual: "Low",
    },
    tokenRecipe: {
      colors: ["#fefbff", "#ffffff", "#6750a4", "#e7e0ec", "#1d1b20"],
      typography: "Structured role scale: label, body, title, headline",
      radius: "4px / 8px / 12px / 16px",
      shadow: "Formal elevation levels",
      border: "Role-based outlines that change by state",
      spacing: "Tokenized 4px grid with comfortable defaults",
      density: "Comfortable, compact variants possible",
      motion: "Functional, documented, tokenized",
    },
  },
  {
    id: "neumorphism",
    name: "Neumorphism",
    summary: "Soft embossed tone-on-tone surfaces with tactile shadows and weak visual boundaries.",
    feeling: ["soft", "tactile", "experimental"],
    characteristics: ["Embossed controls", "Inset states", "Tone-on-tone palette", "Large radius", "Very soft shadows"],
    commonPatterns: ["Raised buttons", "Inset inputs", "Embossed cards", "Monochrome panels"],
    useCases: ["Experimental labs", "Decorative widgets", "Non-critical playful surfaces"],
    strengths: ["Distinct tactile feel", "Memorable in small doses"],
    weaknesses: ["Poor discoverability", "Low contrast by default", "Hard to scale accessibly"],
    accessibilityRisks: ["Weak affordance", "Insufficient non-text contrast", "Pressed states can be ambiguous"],
    recommendedFor: ["Experimental"],
    avoidFor: ["Production apps", "Accessibility-first products", "Dense dashboards"],
    tags: ["Experimental", "Accessibility Risk"],
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
      typography: "Restrained sans with stronger-than-usual text contrast",
      radius: "12px / 16px / 20px / 24px",
      shadow: "Dual outer/inset shadows, soft blur, low spread",
      border: "Usually none; add subtle focus outline for usability",
      spacing: "Comfortable, tactile, not compact",
      density: "Low to medium",
      motion: "150-220ms soft press transitions",
    },
  },
];

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
