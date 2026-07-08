export type FitLevel = "High" | "Medium" | "Low" | "Use carefully";
export type StyleClassification = "production-safe" | "expressive" | "experimental" | "historical-reference" | "system-language";

export type StyleExample = {
  label: string;
  detail: string;
};

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
    classification: "experimental",
    realWorldExamples: [
      { label: "2019 neumorphic concept shots", detail: "Soft extruded controls and inset panels that emphasize tactile novelty." },
      { label: "Wellness or media widgets", detail: "Small, non-critical controls where soft tactility can be decorative." },
      { label: "Lab experiments", detail: "Useful for teaching why affordance and contrast cannot depend on shadow alone." },
    ],
    componentExamples: [
      { label: "Button", detail: "Raised tone-on-tone pill with inset pressed state and an added focus outline for usability." },
      { label: "Input", detail: "Inset field can look tactile, but needs visible label, text contrast, and focus border." },
      { label: "Toggle", detail: "Small decorative control where state is also shown by color or text, not shadow only." },
    ],
    layoutExamples: [
      { label: "Widget panel", detail: "A low-density player, calculator, or control cluster with large tactile surfaces." },
      { label: "Concept portfolio", detail: "A small visual experiment rather than a complete production system." },
      { label: "Accessibility caution demo", detail: "Good comparison point for weak non-text contrast and ambiguous states." },
    ],
    implementationNotes: [
      "Use additional borders, labels, or focus outlines even if they slightly break the pure style.",
      "Avoid using shadow as the only difference between enabled, disabled, and pressed states.",
      "Keep it opt-in and limited to non-critical surfaces.",
    ],
    doDont: {
      do: ["Add explicit focus outlines", "Use stronger text contrast than the background suggests", "Limit the style to decorative widgets"],
      dont: ["Use it for dense dashboards or forms", "Depend on low-contrast shadows for affordance", "Hide disabled and pressed states in tone-on-tone surfaces"],
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
      typography: "Restrained sans with stronger-than-usual text contrast",
      radius: "12px / 16px / 20px / 24px",
      shadow: "Dual outer/inset shadows, soft blur, low spread",
      border: "Usually none; add subtle focus outline for usability",
      spacing: "Comfortable, tactile, not compact",
      density: "Low to medium",
      motion: "150-220ms soft press transitions",
    },
  },
  {
    id: "flat-design",
    name: "Flat Design",
    summary: "Simple shape, color, typography, and iconography with little to no simulated depth.",
    feeling: ["direct", "scalable", "functional"],
    characteristics: ["Flat fills", "Simple icons", "Few shadows", "Typography-led hierarchy", "Clear color blocks"],
    commonPatterns: ["Flat nav bars", "Color-block CTAs", "Icon grids", "Pane layouts"],
    useCases: ["Mobile apps", "Simple web apps", "Dashboards", "Design-system baselines"],
    strengths: ["Scales well across screen sizes", "Easy to implement", "Works with responsive systems"],
    weaknesses: ["Affordance can become weak", "Can feel dated if too plain", "Depth hierarchy needs other cues"],
    accessibilityRisks: ["Clickable elements may look like static labels", "Color-only affordance can fail"],
    recommendedFor: ["Product app", "Dashboard", "Mobile UI"],
    avoidFor: ["Premium showcase pages", "Interfaces needing rich material metaphor"],
    tags: ["Product", "Dashboard", "Historical"],
    classification: "historical-reference",
    realWorldExamples: [
      { label: "Microsoft Metro", detail: "Early flat, typographic interface language focused on simple shapes and motion." },
      { label: "iOS 7 era app UI", detail: "Widespread shift from heavy skeuomorphic realism to cleaner flat surfaces." },
      { label: "Basic admin templates", detail: "Flat panes, solid buttons, and divider-based hierarchy." },
    ],
    componentExamples: [
      { label: "Button", detail: "Solid rectangular or slightly rounded color block with strong hover/focus state." },
      { label: "Card", detail: "Flat pane with border or divider lines instead of shadow depth." },
      { label: "Icon", detail: "Simple geometric glyphs with consistent stroke/fill treatment." },
    ],
    layoutExamples: [
      { label: "Mobile settings", detail: "List groups, flat rows, clear text hierarchy, and simple active states." },
      { label: "Dashboard shell", detail: "Flat sidebar, content panes, and color-coded status without decorative depth." },
      { label: "Marketing block", detail: "Works for simple icon-feature sections but can lack premium impact." },
    ],
    implementationNotes: [
      "Add non-color cues for interactivity: border, underline, focus ring, or state layer.",
      "Use spacing and typography to compensate for low elevation.",
      "Treat it as a clean baseline, not automatically as a modern premium style.",
    ],
    doDont: {
      do: ["Make interactive states explicit", "Use typography and spacing for depth", "Keep icons consistent"],
      dont: ["Make every element equally flat", "Use color as the only click cue", "Remove all hierarchy cues in pursuit of purity"],
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
      colors: ["#ffffff", "#0078d4", "#111827", "#6b7280", "#d1d5db"],
      typography: "Segoe/System/Inter, 14-16px body, clear label hierarchy",
      radius: "0px / 4px / 8px",
      shadow: "None or hairline-only separation",
      border: "1px neutral dividers and state outlines",
      spacing: "Compact to medium, 8-16px controls",
      density: "Medium",
      motion: "Direct 80-160ms color/position state changes",
    },
  },
  {
    id: "skeuomorphism",
    name: "Skeuomorphism / Realistic UI",
    summary: "Object-inspired UI that borrows physical materials, bevels, textures, and metaphors to signal use.",
    feeling: ["familiar", "tactile", "nostalgic"],
    characteristics: ["Material textures", "Beveled edges", "Inner shadows", "Object metaphors", "Layered highlights"],
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
    summary: "Playful soft-3D surfaces with inflated geometry, pastel color, and toy-like depth.",
    feeling: ["playful", "friendly", "soft"],
    characteristics: ["Large radius", "Puffed surfaces", "Pastel gradients", "Soft 3D shadows", "Rounded illustration cues"],
    commonPatterns: ["Chunky cards", "Bubble buttons", "Soft 3D icons", "Onboarding panels"],
    useCases: ["Playful onboarding", "Education", "Wellness", "Consumer launch pages"],
    strengths: ["Friendly tone", "Strong visual personality", "Works well with illustration"],
    weaknesses: ["Too whimsical for serious workflows", "Low density", "Can become childish quickly"],
    accessibilityRisks: ["Pastel contrast failures", "Large soft forms can reduce scan efficiency", "Decorative shadows may obscure hierarchy"],
    recommendedFor: ["Onboarding", "Consumer promo", "Experimental"],
    avoidFor: ["Enterprise dashboards", "Finance/medical tools", "Dense forms"],
    tags: ["Experimental", "Landing", "Playful"],
    classification: "experimental",
    realWorldExamples: [
      { label: "Playful onboarding screens", detail: "Soft 3D icons and rounded panels for consumer or education products." },
      { label: "Wellness apps", detail: "Friendly pastel surfaces that reduce perceived severity." },
      { label: "Creative web showcases", detail: "Illustration-led promo pages with soft dimensional modules." },
    ],
    componentExamples: [
      { label: "Button", detail: "Chunky pill with soft depth, clear label, and a visible pressed state." },
      { label: "Card", detail: "Inflated rounded block with pastel background and generous padding." },
      { label: "Icon tile", detail: "Soft 3D object or glyph inside a stable rounded container." },
    ],
    layoutExamples: [
      { label: "Onboarding", detail: "Low-density panels, friendly illustrations, and one action per step." },
      { label: "Consumer hero", detail: "Large soft modules, pastel palette, and simple product promise." },
      { label: "Feature cards", detail: "Works when each feature has a playful visual object or icon." },
    ],
    implementationNotes: [
      "Keep body text on high-contrast foreground colors, not low-contrast pastel pairings.",
      "Use large radius and soft shadows consistently so the style feels intentional.",
      "Limit density; this style needs breathing room.",
    ],
    doDont: {
      do: ["Use friendly rounded geometry", "Check contrast on pastel surfaces", "Pair with simple copy"],
      dont: ["Use it for serious admin tools", "Crowd many clay cards into a dense grid", "Let decorative objects compete with the main action"],
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
      colors: ["#fde68a", "#f9a8d4", "#93c5fd", "#ffffff", "#1f2937"],
      typography: "Rounded friendly sans, 15-18px body, bold but soft headings",
      radius: "24px / 32px / 40px",
      shadow: "Soft puffed depth, 0 20px 40px rgba(31,41,55,.14)",
      border: "Usually none; use subtle edge tint where needed",
      spacing: "Spacious, 20-40px modules",
      density: "Low",
      motion: "Soft scale/press, 160-240ms",
    },
  },
  {
    id: "dark-futuristic",
    name: "Dark Futuristic / Neon Tech",
    summary: "Dark technical canvas with luminous accents, fine grids, glow edges, and system-console energy.",
    feeling: ["advanced", "cinematic", "technical"],
    characteristics: ["Dark surfaces", "Neon accents", "Grid lines", "Glow edges", "Mono data labels"],
    commonPatterns: ["AI launch hero", "Console panels", "Dark dashboards", "Signal/status chips"],
    useCases: ["AI products", "Developer tools", "Security tools", "Launch pages"],
    strengths: ["Strong product drama", "Good for technical positioning", "Works well for demos and command surfaces"],
    weaknesses: ["Long-session readability can suffer", "Glow can become noisy", "Forms and tables need calmer treatment"],
    accessibilityRisks: ["Low-contrast gray on dark", "Overuse of neon bloom", "Motion and glow may distract"],
    recommendedFor: ["Landing", "Developer tools", "Experimental"],
    avoidFor: ["Long-form docs", "Everyday back-office tools", "High-volume data entry"],
    tags: ["Landing", "Product", "Experimental"],
    classification: "expressive",
    realWorldExamples: [
      { label: "AI launch sites", detail: "Dark hero canvases, luminous product screenshots, and future-facing messaging." },
      { label: "Developer tool demos", detail: "Terminal, console, and workflow panels that benefit from dark technical framing." },
      { label: "Security dashboards", detail: "Dark operational surfaces with restrained status color and alert emphasis." },
    ],
    componentExamples: [
      { label: "Button", detail: "High-contrast dark or neon CTA with clear edge, not low-contrast glow-only treatment." },
      { label: "Card", detail: "Dark panel with subtle border, glow edge only for emphasis, and readable text hierarchy." },
      { label: "Code/console", detail: "Mono labels, command rows, status chips, and careful color semantics." },
    ],
    layoutExamples: [
      { label: "AI hero", detail: "Dark first viewport, product signal, luminous workflow preview, and one strong CTA." },
      { label: "Command center", detail: "Console-like panels, compact metadata, and calm table/form zones." },
      { label: "Launch page", detail: "Alternating dark sections, diagram panels, and technical proof points." },
    ],
    implementationNotes: [
      "Keep most text high contrast; reserve neon for focus, state, and emphasis.",
      "Use glow as a boundary or focal cue, not as a universal decoration.",
      "Test mobile carefully because dark panels and grids can crowd small screens.",
    ],
    doDont: {
      do: ["Use semantic status color sparingly", "Keep body text readable", "Pair sans UI with mono data labels"],
      dont: ["Put low-contrast gray text everywhere", "Add glow to every border", "Make forms feel like decorative sci-fi panels"],
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
      colors: ["#0b1020", "#111827", "#22d3ee", "#a78bfa", "#e5e7eb"],
      typography: "Modern sans plus mono accents, 14-16px body, 40px+ display",
      radius: "12px / 16px / 24px",
      shadow: "Glow edges and subtle dark elevation",
      border: "rgba(255,255,255,.08) with accent focus rings",
      spacing: "Medium to spacious, 16-40px modules",
      density: "Low to medium",
      motion: "Smooth reveal/status transitions, reduced-motion aware",
    },
  },
  {
    id: "web20-gloss",
    name: "Web 2.0 Gloss / Frutiger Aero",
    summary: "Glossy, optimistic, eco-tech nostalgia with aqua gradients, shine, transparency, and rounded gel controls.",
    feeling: ["nostalgic", "bright", "optimistic"],
    characteristics: ["Gloss highlights", "Aqua gradients", "Rounded gel buttons", "Transparency", "Eco-tech imagery"],
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
