import { useMemo, useState } from "react";
import { designStyles, recommendations, type DesignStyle, type FitLevel } from "./data/designStyles";

const fitClass: Record<FitLevel, string> = {
  High: "fit-high",
  Medium: "fit-medium",
  Low: "fit-low",
  "Use carefully": "fit-careful",
};

const surfaceLabels: Record<keyof DesignStyle["suitability"], string> = {
  landing: "Landing",
  dashboard: "Dashboard",
  portfolio: "Portfolio",
  productApp: "Product app",
  docs: "Docs",
  experimentalVisual: "Experimental",
};

type PreviewMode = "section" | "components" | "tokens";

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

function ComponentShowcasePanel() {
  return (
    <section className="board-panel component-panel" id="showcase">
      <div className="panel-heading">
        <h2>Component Showcase</h2>
        <p>Same UI pattern, different styles.</p>
      </div>
      <div className="mini-comparison-grid">
        {designStyles.map((style) => (
          <article className={`mini-comparison-card preview-${style.id}`} key={style.id}>
            <h3>{style.name}</h3>
            <p>This is a sample text</p>
            <div className="preview-input">Input placeholder</div>
            <button type="button">Primary Button</button>
            <div className="status-line">
              <span />
              Active
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TokenComparisonPanel() {
  return (
    <section className="board-panel token-panel" id="tokens">
      <div className="panel-heading">
        <h2>Design Token Comparison</h2>
        <p>Core tokens across styles.</p>
      </div>
      <div className="compact-table-wrap">
        <table className="compact-token-table">
          <thead>
            <tr>
              <th>Token</th>
              {designStyles.map((style) => (
                <th key={style.id}>{style.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Color</th>
              {designStyles.map((style) => (
                <td key={style.id}>
                  <div className="mini-swatches">
                    {style.tokenRecipe.colors.slice(0, 4).map((color) => (
                      <span key={color} style={{ background: color }} title={color} />
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <th>Radius</th>
              {designStyles.map((style) => (
                <td key={style.id}>{style.tokenRecipe.radius}</td>
              ))}
            </tr>
            <tr>
              <th>Shadow</th>
              {designStyles.map((style) => (
                <td key={style.id}>{style.tokenRecipe.shadow}</td>
              ))}
            </tr>
            <tr>
              <th>Density</th>
              {designStyles.map((style) => (
                <td key={style.id}>{style.tokenRecipe.density}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function UseCaseGuidePanel() {
  const topRecommendations = recommendations.slice(0, 5);

  return (
    <section className="board-panel guide-panel" id="guide">
      <div className="panel-heading">
        <h2>Use-case Fit & Recommendation</h2>
        <p>Decision helper to choose the right style.</p>
      </div>
      <div className="recommendation-stack">
        {topRecommendations.map((item, index) => (
          <article key={item.goal} className="recommendation-row">
            <span className="recommendation-icon" aria-hidden="true" />
            <div>
              <h3>{item.goal}</h3>
              <p>{item.recommendedStyle}. {item.why}</p>
            </div>
            <strong>{(9.2 - index * 0.45).toFixed(1)}</strong>
          </article>
        ))}
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
        <ComponentShowcasePanel />
        <TokenComparisonPanel />
        <UseCaseGuidePanel />
      </section>

      <section className="surface-fit-panel surface-panel" aria-label="Surface fit matrix">
        <div className="panel-heading">
          <h2>Surface Fit Matrix</h2>
          <p>High means the style can carry that surface. Use carefully means accent or experiment.</p>
        </div>
        <div className="surface-fit-grid">
          {designStyles.map((style) => (
            <article className="surface-fit-card" key={style.id}>
              <h3>{style.name}</h3>
              {Object.entries(style.suitability).map(([surface, fit]) => (
                <div className="fit-row" key={surface}>
                  <span>{surfaceLabels[surface as keyof DesignStyle["suitability"]]}</span>
                  <strong className={fitClass[fit]}>{fit}</strong>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
