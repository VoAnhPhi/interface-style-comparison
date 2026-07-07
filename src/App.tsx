import { useMemo, useState } from "react";
import { designStyles, recommendations, type DesignStyle } from "./data/designStyles";

type PreviewMode = "section" | "components" | "tokens";
type SurfaceId = keyof DesignStyle["suitability"];
type PriorityState = "high" | "trade" | "low";
type PriorityLabel = "Clarity" | "Density" | "Trust" | "Speed";

type SurfaceOption = {
  id: SurfaceId;
  label: string;
  description: string;
  icon: string;
};

type SurfaceRecommendation = {
  styleId: string;
  icon: string;
  traits: string;
  note: string;
  caution: string;
  priorities: Record<PriorityLabel, PriorityState[]>;
};

type SurfaceDecision = {
  recommendations: SurfaceRecommendation[];
  careful: Array<{
    styleId: string;
    icon: string;
    traits: string;
    note: string;
    segments: PriorityState[];
  }>;
};

const priorityLabels: PriorityLabel[] = ["Clarity", "Density", "Trust", "Speed"];

const surfaceOptions: SurfaceOption[] = [
  { id: "landing", label: "Landing", description: "Marketing & conversion pages", icon: "landing" },
  { id: "dashboard", label: "Dashboard", description: "Admin & analytics dashboards", icon: "dashboard" },
  { id: "portfolio", label: "Portfolio", description: "Personal & creative portfolios", icon: "portfolio" },
  { id: "productApp", label: "Product App", description: "Core product experiences", icon: "product-app" },
  { id: "docs", label: "Docs", description: "Documentation & knowledge", icon: "docs" },
  { id: "experimentalVisual", label: "Experimental", description: "New ideas & prototypes", icon: "experimental" },
];

const surfaceDecisions: Record<SurfaceId, SurfaceDecision> = {
  landing: {
    recommendations: [
      {
        styleId: "modern-saas",
        icon: "modern",
        traits: "Polished / Flexible / Demo-ready",
        note: "Strong for hero, feature, pricing, and product proof sections.",
        caution: "Keep gradients and shadows disciplined so it does not feel generic.",
        priorities: {
          Clarity: ["high", "high", "high", "high"],
          Density: ["high", "high", "trade", "low"],
          Trust: ["high", "high", "high", "trade"],
          Speed: ["high", "high", "high", "trade"],
        },
      },
      {
        styleId: "editorial-portfolio",
        icon: "portfolio",
        traits: "Expressive / Curated / Brand-led",
        note: "Gives campaigns and creative landing pages a stronger point of view.",
        caution: "Needs careful responsive type so the page stays readable.",
        priorities: {
          Clarity: ["high", "high", "trade", "trade"],
          Density: ["trade", "trade", "low", "low"],
          Trust: ["high", "trade", "trade", "low"],
          Speed: ["trade", "trade", "low", "low"],
        },
      },
      {
        styleId: "glassmorphism",
        icon: "glass",
        traits: "Premium / Atmospheric / Immersive",
        note: "Works well for hero moments, overlays, and high-impact showcase cards.",
        caution: "Contrast can break quickly over busy backgrounds.",
        priorities: {
          Clarity: ["trade", "trade", "low", "low"],
          Density: ["trade", "low", "low", "low"],
          Trust: ["high", "trade", "trade", "low"],
          Speed: ["trade", "trade", "low", "low"],
        },
      },
    ],
    careful: [
      {
        styleId: "enterprise-admin",
        icon: "enterprise",
        traits: "Structured / Serious",
        note: "Reliable but rarely persuasive for brand-first pages.",
        segments: ["trade", "trade", "low", "low"],
      },
      {
        styleId: "neumorphism",
        icon: "modern",
        traits: "Soft / Tactile",
        note: "Use only as a small decorative accent.",
        segments: ["trade", "low", "low", "low"],
      },
    ],
  },
  dashboard: {
    recommendations: [
      {
        styleId: "enterprise-admin",
        icon: "enterprise",
        traits: "Structured / Professional / Reliable",
        note: "Optimized for clarity and data-heavy tasks.",
        caution: "Can feel rigid for highly creative or playful brands.",
        priorities: {
          Clarity: ["high", "high", "high", "high"],
          Density: ["high", "high", "high", "high"],
          Trust: ["high", "high", "high", "high"],
          Speed: ["high", "high", "high", "trade"],
        },
      },
      {
        styleId: "material-fluent",
        icon: "material",
        traits: "Clean / Systemic / Familiar",
        note: "Balanced and widely adaptable.",
        caution: "Can feel generic without careful branding and detail.",
        priorities: {
          Clarity: ["high", "high", "high", "high"],
          Density: ["high", "high", "high", "low"],
          Trust: ["high", "high", "high", "low"],
          Speed: ["high", "high", "high", "low"],
        },
      },
      {
        styleId: "modern-saas",
        icon: "modern",
        traits: "Friendly / Efficient / Contemporary",
        note: "Fast to ship, approachable experience.",
        caution: "May struggle with very complex data hierarchy.",
        priorities: {
          Clarity: ["high", "high", "high", "high"],
          Density: ["trade", "trade", "trade", "low"],
          Trust: ["high", "high", "high", "low"],
          Speed: ["high", "high", "high", "low"],
        },
      },
    ],
    careful: [
      {
        styleId: "glassmorphism",
        icon: "glass",
        traits: "Premium / Immersive",
        note: "Use sparingly; risks readability and focus.",
        segments: ["trade", "trade", "low", "low"],
      },
      {
        styleId: "neo-brutalism",
        icon: "brutal",
        traits: "Bold / Edgy / Experimental",
        note: "Attention-grabbing but can tire users quickly.",
        segments: ["trade", "low", "low", "low"],
      },
    ],
  },
  portfolio: {
    recommendations: [
      {
        styleId: "editorial-portfolio",
        icon: "portfolio",
        traits: "Expressive / Curated / Story-led",
        note: "Best when work samples, type, and art direction need to carry the page.",
        caution: "Keep navigation and case-study scanning straightforward.",
        priorities: {
          Clarity: ["high", "high", "trade", "trade"],
          Density: ["trade", "trade", "low", "low"],
          Trust: ["high", "high", "trade", "low"],
          Speed: ["trade", "trade", "low", "low"],
        },
      },
      {
        styleId: "minimal-clean",
        icon: "material",
        traits: "Calm / Precise / Timeless",
        note: "Lets content and imagery feel more premium without heavy decoration.",
        caution: "Can feel plain if typography and spacing are not excellent.",
        priorities: {
          Clarity: ["high", "high", "high", "high"],
          Density: ["high", "trade", "trade", "low"],
          Trust: ["high", "high", "high", "trade"],
          Speed: ["high", "high", "trade", "trade"],
        },
      },
      {
        styleId: "neo-brutalism",
        icon: "brutal",
        traits: "Bold / Graphic / Memorable",
        note: "Creates a distinct voice for experimental personal or studio brands.",
        caution: "Avoid it for portfolios that need quiet credibility.",
        priorities: {
          Clarity: ["trade", "trade", "low", "low"],
          Density: ["trade", "low", "low", "low"],
          Trust: ["trade", "trade", "low", "low"],
          Speed: ["trade", "low", "low", "low"],
        },
      },
    ],
    careful: [
      {
        styleId: "enterprise-admin",
        icon: "enterprise",
        traits: "Serious / Operational",
        note: "Usually too rigid for expressive creative work.",
        segments: ["trade", "trade", "low", "low"],
      },
      {
        styleId: "neumorphism",
        icon: "modern",
        traits: "Soft / Subtle",
        note: "Low contrast can weaken project presentation.",
        segments: ["trade", "low", "low", "low"],
      },
    ],
  },
  productApp: {
    recommendations: [
      {
        styleId: "minimal-clean",
        icon: "material",
        traits: "Calm / Durable / Readable",
        note: "Good default for repeated product workflows and long-lived UI.",
        caution: "Make actions and selected states visible enough.",
        priorities: {
          Clarity: ["high", "high", "high", "high"],
          Density: ["high", "high", "trade", "low"],
          Trust: ["high", "high", "high", "trade"],
          Speed: ["high", "high", "trade", "trade"],
        },
      },
      {
        styleId: "material-fluent",
        icon: "material",
        traits: "Systemic / Familiar / Scalable",
        note: "Strong for components, states, and cross-platform patterns.",
        caution: "Needs brand-specific details to avoid feeling default.",
        priorities: {
          Clarity: ["high", "high", "high", "high"],
          Density: ["high", "high", "high", "trade"],
          Trust: ["high", "high", "high", "trade"],
          Speed: ["high", "high", "high", "trade"],
        },
      },
      {
        styleId: "modern-saas",
        icon: "modern",
        traits: "Polished / Friendly / Flexible",
        note: "Works well for demoable product surfaces and onboarding.",
        caution: "Reduce decorative depth in dense product areas.",
        priorities: {
          Clarity: ["high", "high", "high", "trade"],
          Density: ["high", "trade", "trade", "low"],
          Trust: ["high", "high", "trade", "trade"],
          Speed: ["high", "high", "trade", "trade"],
        },
      },
    ],
    careful: [
      {
        styleId: "glassmorphism",
        icon: "glass",
        traits: "Atmospheric / Premium",
        note: "Better for modal or hero accents than core workflows.",
        segments: ["trade", "low", "low", "low"],
      },
      {
        styleId: "neo-brutalism",
        icon: "brutal",
        traits: "Bold / Experimental",
        note: "Use for campaign-like product moments, not daily tasks.",
        segments: ["trade", "low", "low", "low"],
      },
    ],
  },
  docs: {
    recommendations: [
      {
        styleId: "minimal-clean",
        icon: "docs",
        traits: "Readable / Stable / Low-noise",
        note: "Best for long-form reading, navigation, and knowledge structure.",
        caution: "Keep examples and callouts visually discoverable.",
        priorities: {
          Clarity: ["high", "high", "high", "high"],
          Density: ["high", "high", "trade", "trade"],
          Trust: ["high", "high", "high", "high"],
          Speed: ["high", "high", "high", "trade"],
        },
      },
      {
        styleId: "material-fluent",
        icon: "material",
        traits: "Systemic / Accessible / Familiar",
        note: "Useful when docs need many states, callouts, search, and filters.",
        caution: "Watch for overly generic component styling.",
        priorities: {
          Clarity: ["high", "high", "high", "high"],
          Density: ["high", "high", "high", "trade"],
          Trust: ["high", "high", "high", "trade"],
          Speed: ["high", "high", "high", "trade"],
        },
      },
      {
        styleId: "enterprise-admin",
        icon: "enterprise",
        traits: "Structured / Dense / Reliable",
        note: "Good for internal knowledge bases, settings docs, and reference-heavy pages.",
        caution: "Can feel too operational for public product education.",
        priorities: {
          Clarity: ["high", "high", "high", "trade"],
          Density: ["high", "high", "high", "high"],
          Trust: ["high", "high", "high", "high"],
          Speed: ["high", "high", "trade", "trade"],
        },
      },
    ],
    careful: [
      {
        styleId: "glassmorphism",
        icon: "glass",
        traits: "Atmospheric / Decorative",
        note: "Background variance can hurt reading comfort.",
        segments: ["trade", "low", "low", "low"],
      },
      {
        styleId: "neumorphism",
        icon: "modern",
        traits: "Soft / Low-contrast",
        note: "Poor fit for dense text and accessibility.",
        segments: ["low", "low", "low", "low"],
      },
    ],
  },
  experimentalVisual: {
    recommendations: [
      {
        styleId: "neo-brutalism",
        icon: "brutal",
        traits: "Bold / Direct / Memorable",
        note: "Strong when the goal is to test a visual point of view quickly.",
        caution: "Can fatigue users if used for full product workflows.",
        priorities: {
          Clarity: ["trade", "trade", "low", "low"],
          Density: ["trade", "low", "low", "low"],
          Trust: ["trade", "trade", "low", "low"],
          Speed: ["high", "trade", "trade", "low"],
        },
      },
      {
        styleId: "glassmorphism",
        icon: "glass",
        traits: "Immersive / Premium / Layered",
        note: "Useful for experimental hero moments and atmospheric prototypes.",
        caution: "Treat contrast as the primary risk.",
        priorities: {
          Clarity: ["trade", "trade", "low", "low"],
          Density: ["trade", "low", "low", "low"],
          Trust: ["high", "trade", "low", "low"],
          Speed: ["trade", "trade", "low", "low"],
        },
      },
      {
        styleId: "editorial-portfolio",
        icon: "portfolio",
        traits: "Curated / Expressive / Story-led",
        note: "Good when the experiment is about content, hierarchy, or brand tone.",
        caution: "Requires stronger art direction than a default app surface.",
        priorities: {
          Clarity: ["high", "trade", "trade", "low"],
          Density: ["trade", "trade", "low", "low"],
          Trust: ["high", "trade", "trade", "low"],
          Speed: ["trade", "trade", "low", "low"],
        },
      },
    ],
    careful: [
      {
        styleId: "enterprise-admin",
        icon: "enterprise",
        traits: "Operational / Serious",
        note: "Too practical unless the experiment is workflow density.",
        segments: ["trade", "trade", "low", "low"],
      },
      {
        styleId: "minimal-clean",
        icon: "material",
        traits: "Quiet / Safe",
        note: "Reliable but may not create enough visual signal.",
        segments: ["trade", "trade", "low", "low"],
      },
    ],
  },
};

function StyleTag({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "risk" }) {
  return <span className={`style-tag style-tag-${tone}`}>{children}</span>;
}

function StylePreview({ style, size = "regular" }: { style: DesignStyle; size?: "tile" | "regular" | "showcase" }) {
  return (
    <div className={`style-preview style-preview-${size} preview-${style.id}`} aria-hidden="true">
      <div className="preview-topline">
        <span />
        <span />
        <span />
      </div>
      <div className="preview-hero">
        <div>
          <strong>{style.name.split(" ")[0]}</strong>
          <small>{style.feeling[0]}</small>
        </div>
        <span className="preview-action">Action</span>
      </div>
      <div className="preview-row">
        <div className="preview-input">Email address</div>
        <div className="preview-badge">Active</div>
      </div>
      <div className="preview-bars">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function StyleRail({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string, scrollToSelected?: boolean) => void;
}) {
  return (
    <div className="style-rail" aria-label="Choose a design style">
      <button type="button" className="all-styles-button" onClick={() => onSelect(designStyles[0].id)}>
        <span className="rail-icon" aria-hidden="true" />
        All styles
      </button>
      {designStyles.map((style) => (
        <button
          type="button"
          key={style.id}
          className={selectedId === style.id ? "is-active" : ""}
          onClick={() => onSelect(style.id, true)}
        >
          <span className="rail-icon" aria-hidden="true" />
          {style.name}
        </button>
      ))}
    </div>
  );
}

function StyleTile({
  style,
  selected,
  onSelect,
}: {
  style: DesignStyle;
  selected: boolean;
  onSelect: (id: string, scrollToSelected?: boolean) => void;
}) {
  return (
    <button
      className={`style-tile ${selected ? "is-selected" : ""}`}
      type="button"
      onClick={() => onSelect(style.id)}
      aria-pressed={selected}
    >
      <StylePreview style={style} size="tile" />
      <span className="style-tile-title">{style.name}</span>
      <span className="style-tile-tags">
        {style.tags.slice(0, 2).map((tag) => (
          <StyleTag key={tag} tone={tag.includes("Risk") ? "risk" : "default"}>
            {tag}
          </StyleTag>
        ))}
      </span>
    </button>
  );
}

function InteractiveStylePreview({ style }: { style: DesignStyle }) {
  const [mode, setMode] = useState<PreviewMode>("section");
  const palette = style.tokenRecipe.colors;
  const primaryUseCase = style.useCases[0] ?? "Product experience";
  const secondaryUseCase = style.useCases[1] ?? "Design system";
  const headline = style.commonPatterns[0] ?? `${style.name} interface`;

  return (
    <div className={`interactive-preview preview-${style.id}`}>
      <div className="interactive-preview-toolbar">
        <span className="interactive-preview-brand">{style.name.split(" ")[0]}</span>
        <div className="preview-mode-tabs" role="tablist" aria-label={`${style.name} preview modes`}>
          {(["section", "components", "tokens"] as PreviewMode[]).map((previewMode) => (
            <button
              type="button"
              role="tab"
              aria-selected={mode === previewMode}
              className={mode === previewMode ? "is-active" : ""}
              key={previewMode}
              onClick={() => setMode(previewMode)}
            >
              {previewMode === "section" ? "Section" : previewMode === "components" ? "Components" : "Tokens"}
            </button>
          ))}
        </div>
      </div>

      {mode === "section" && (
        <div className="interactive-preview-body section-preview" role="tabpanel">
          <div className="section-preview-copy">
            <span>{primaryUseCase}</span>
            <h3>{headline}</h3>
            <p>{style.summary}</p>
            <div className="preview-cta-row">
              <button type="button" className="preview-primary-action" onClick={() => setMode("components")}>
                Start preview
              </button>
              <button type="button" className="preview-secondary-action" onClick={() => setMode("tokens")}>
                View tokens
              </button>
            </div>
          </div>
          <div className="section-preview-visual" aria-label={`${style.name} visual example`}>
            <div className="preview-window">
              <div className="preview-window-topline">
                <span />
                <span />
                <span />
              </div>
              <div className="preview-window-main">
                <strong>{secondaryUseCase}</strong>
                <small>{style.feeling.slice(0, 2).join(" / ")}</small>
              </div>
              <div className="preview-window-grid">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === "components" && (
        <div className="interactive-preview-body component-preview-grid" role="tabpanel">
          <article className="component-preview-card">
            <span className="component-preview-label">Input</span>
            <div className="preview-input">Email address</div>
            <button type="button" className="preview-primary-action">
              Primary action
            </button>
          </article>
          <article className="component-preview-card">
            <span className="component-preview-label">Status</span>
            <div className="preview-badge">Active</div>
            <p>{style.strengths[0]}</p>
          </article>
          <article className="component-preview-card component-preview-wide">
            <span className="component-preview-label">Pattern</span>
            <div className="preview-token-line">
              <span />
              <span />
              <span />
            </div>
            <p>{style.commonPatterns.slice(0, 3).join(" / ")}</p>
          </article>
        </div>
      )}

      {mode === "tokens" && (
        <div className="interactive-preview-body token-preview-grid" role="tabpanel">
          <div className="token-swatch-row" aria-label={`${style.name} color tokens`}>
            {palette.map((color) => (
              <span key={color} style={{ background: color }} title={color} />
            ))}
          </div>
          <article className="token-preview-row">
            <span>Typography</span>
            <strong>{style.tokenRecipe.typography}</strong>
          </article>
          <article className="token-preview-row">
            <span>Radius</span>
            <strong>{style.tokenRecipe.radius}</strong>
          </article>
          <article className="token-preview-row">
            <span>Shadow</span>
            <strong>{style.tokenRecipe.shadow}</strong>
          </article>
          <article className="token-preview-row">
            <span>Density</span>
            <strong>{style.tokenRecipe.density}</strong>
          </article>
        </div>
      )}
    </div>
  );
}

function SelectedShowcase({ style }: { style: DesignStyle }) {
  return (
    <section className="selected-showcase surface-panel" id="selected">
      <div className="selected-copy">
        <div className="selected-heading">
          <span className="selected-pill">Selected style</span>
          <h2>{style.name}</h2>
          <p>{style.summary}</p>
        </div>
        <div className="insight-grid">
          <article>
            <span className="insight-icon" aria-hidden="true" />
            <h3>Visual DNA</h3>
            <p>{style.characteristics.slice(0, 3).join(", ")}.</p>
          </article>
          <article>
            <span className="insight-icon" aria-hidden="true" />
            <h3>Positioning</h3>
            <p>{style.feeling.join(", ")}. Best when that tone matches the product.</p>
          </article>
          <article>
            <span className="insight-icon" aria-hidden="true" />
            <h3>Best for</h3>
            <p>{style.useCases.slice(0, 3).join(", ")}.</p>
          </article>
          <article>
            <span className="insight-icon" aria-hidden="true" />
            <h3>Watch out</h3>
            <p>{style.accessibilityRisks[0] ?? style.weaknesses[0]}.</p>
          </article>
        </div>
      </div>
      <div className="selected-preview-card">
        <InteractiveStylePreview style={style} />
      </div>
    </section>
  );
}

function TokenComparisonPanel() {
  const tokenRows = [
    { label: "Type", key: "typography" },
    { label: "Radius", key: "radius" },
    { label: "Shadow", key: "shadow" },
    { label: "Border", key: "border" },
    { label: "Space", key: "spacing" },
    { label: "Motion", key: "motion" },
  ] as const;

  return (
    <section className="board-panel token-panel story-section" id="tokens">
      <div className="section-intro">
        <span>Token Atlas</span>
        <h2>Read the system before choosing the style.</h2>
        <p>Color mood, spacing, radius, and motion show how each style will feel once it becomes real UI.</p>
      </div>

      <div className="token-atlas-grid">
        {designStyles.map((style) => (
          <article className="token-atlas-card" key={style.id}>
            <div className="token-card-head">
              <div>
                <span>{style.feeling.slice(0, 2).join(" / ")}</span>
                <h3>{style.name}</h3>
              </div>
              <strong>{style.tokenRecipe.density}</strong>
            </div>
            <div className="token-spectrum" aria-label={`${style.name} color tokens`}>
              {style.tokenRecipe.colors.slice(0, 5).map((color) => (
                <span key={color} style={{ background: color }} title={color} />
              ))}
            </div>
            <dl className="token-facts">
              {tokenRows.map((row) => (
                <div key={row.key}>
                  <dt>{row.label}</dt>
                  <dd>{style.tokenRecipe[row.key]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function UseCaseGuidePanel() {
  const topRecommendations = recommendations.slice(0, 6);

  return (
    <section className="board-panel guide-panel story-section" id="guide">
      <div className="guide-hero">
        <div className="section-intro">
          <span>Use-case Guide</span>
          <h2>Pick by product goal, not by trend.</h2>
          <p>Start from the screen you need to ship, then choose the style language that reduces risk.</p>
        </div>
        <div className="guide-principle">
          <strong>Rule</strong>
          <p>Marketing can be expressive. Daily tools should stay calm, dense, and predictable.</p>
        </div>
      </div>

      <div className="recommendation-board">
        {topRecommendations.map((item, index) => (
          <article key={item.goal} className="recommendation-card">
            <span className="recommendation-number">{String(index + 1).padStart(2, "0")}</span>
            <div className="recommendation-copy">
              <h3>{item.goal}</h3>
              <p>{item.why}</p>
              <small>{item.caution}</small>
            </div>
            <strong>{item.recommendedStyle}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function SurfaceIcon({ name }: { name: string }) {
  return (
    <svg aria-hidden="true" className="surface-icon">
      <use href={`/surface-decision-guide/icons.svg#${name}`} />
    </svg>
  );
}

function PriorityBars({ segments }: { segments: PriorityState[] }) {
  return (
    <span className="priority-bars" aria-hidden="true">
      {segments.map((segment, index) => (
        <span className={`priority-segment priority-${segment}`} key={`${segment}-${index}`} />
      ))}
    </span>
  );
}

function SurfaceDecisionGuide() {
  const [selectedSurface, setSelectedSurface] = useState<SurfaceId>("dashboard");
  const activeSurface = surfaceOptions.find((surface) => surface.id === selectedSurface) ?? surfaceOptions[1];
  const decision = surfaceDecisions[selectedSurface];

  const styleName = (styleId: string) => designStyles.find((style) => style.id === styleId)?.name ?? styleId;

  return (
    <section className="surface-fit-panel surface-decision-panel" aria-labelledby="surface-decision-title">
      <div className="surface-decision-header">
        <div className="surface-decision-intro">
          <span>Surface Decision Guide</span>
          <h2 id="surface-decision-title">Choose the surface first.</h2>
          <p>
            Every surface has different priorities. Select your product surface to see the best design style fit,
            ranked with trade-offs and cautions.
          </p>
        </div>

        <aside className="surface-help-card" aria-label="How to use the surface decision guide">
          <span className="surface-icon-box">
            <SurfaceIcon name="bulb" />
          </span>
          <div>
            <h3>How to use</h3>
            <p>Pick a surface on the left. We rank styles based on what matters most.</p>
          </div>
        </aside>
      </div>

      <div className="surface-decision-frame">
        <div className="surface-selector-panel">
          <h3>1. Select your surface</h3>
          <div className="surface-selector-list" role="tablist" aria-label="Product surfaces">
            {surfaceOptions.map((surface) => (
              <button
                aria-selected={selectedSurface === surface.id}
                className={`surface-selector-row ${selectedSurface === surface.id ? "is-active" : ""}`}
                key={surface.id}
                onClick={() => setSelectedSurface(surface.id)}
                role="tab"
                type="button"
              >
                <span className="surface-icon-box">
                  <SurfaceIcon name={surface.icon} />
                </span>
                <span className="surface-selector-copy">
                  <strong>{surface.label}</strong>
                  <small>{surface.description}</small>
                </span>
                <span className="surface-chevron" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <div className="surface-recommendation-panel" role="tabpanel">
          <div className="surface-recommendation-heading">
            <span>2. Recommended styles for</span>
            <strong>
              <SurfaceIcon name={activeSurface.icon} />
              {activeSurface.label}
            </strong>
          </div>

          <div className="surface-ranking-list">
            {decision.recommendations.map((item, index) => (
              <article className="surface-ranking-row" key={item.styleId}>
                <div className="surface-rank">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {index === 0 && <strong>Best fit</strong>}
                </div>

                <div className="surface-style-summary">
                  <span className="surface-icon-box">
                    <SurfaceIcon name={item.icon} />
                  </span>
                  <div>
                    <h3>{styleName(item.styleId)}</h3>
                    <p>{item.traits}</p>
                    <small>{item.note}</small>
                  </div>
                </div>

                <div className="surface-priority-map">
                  <h4>Fit across priorities</h4>
                  {priorityLabels.map((priority) => (
                    <div className="priority-row" key={priority}>
                      <span>{priority}</span>
                      <PriorityBars segments={item.priorities[priority]} />
                    </div>
                  ))}
                </div>

                <div className="surface-caution">
                  <h4>
                    <SurfaceIcon name="caution" />
                    Caution
                  </h4>
                  <p>{item.caution}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="surface-careful-strip">
            <h3>Use carefully (accent only)</h3>
            <div className="surface-careful-grid">
              {decision.careful.map((item) => (
                <article className="surface-careful-card" key={item.styleId}>
                  <span className="surface-icon-box">
                    <SurfaceIcon name={item.icon} />
                  </span>
                  <div>
                    <h4>{styleName(item.styleId)}</h4>
                    <p>{item.traits}</p>
                  </div>
                  <PriorityBars segments={item.segments} />
                  <small>{item.note}</small>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-fit-legend" aria-label="Fit legend">
            <div>
              <span className="legend-dot legend-high" />
              <strong>High fit</strong>
              <small>Strong alignment with priorities</small>
            </div>
            <div>
              <span className="legend-dot legend-trade" />
              <strong>Trade-off</strong>
              <small>Works with compromises</small>
            </div>
            <div>
              <span className="legend-dot legend-low" />
              <strong>Avoid as primary</strong>
              <small>Low alignment with priorities</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [selectedStyleId, setSelectedStyleId] = useState(designStyles[0].id);
  const selectedStyle = useMemo(
    () => designStyles.find((style) => style.id === selectedStyleId) ?? designStyles[0],
    [selectedStyleId],
  );

  const selectStyle = (id: string, scrollToSelected = false) => {
    setSelectedStyleId(id);
    if (scrollToSelected) {
      window.requestAnimationFrame(() => {
        document.getElementById("selected")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  return (
    <main className="page-shell">
      <header className="hero">
        <div className="hero-mark" aria-hidden="true">
          *
        </div>
        <div className="hero-copy">
          <h1>
            UI Design <span>Style Explorer</span>
          </h1>
          <p>
            Explore, compare and choose the right UI design style for your product.
            Visual examples, tokens, components and recommendations in one place.
          </p>
        </div>
      </header>

      <StyleRail selectedId={selectedStyleId} onSelect={selectStyle} />

      <section className="style-gallery surface-panel" id="overview" aria-label="Style overview">
        {designStyles.map((style) => (
          <StyleTile key={style.id} style={style} selected={selectedStyleId === style.id} onSelect={selectStyle} />
        ))}
      </section>

      <SelectedShowcase style={selectedStyle} />

      <section className="research-board" aria-label="Research comparison panels">
        <TokenComparisonPanel />
        <UseCaseGuidePanel />
      </section>

      <SurfaceDecisionGuide />
    </main>
  );
}

export default App;
