import type { DossierRendererProps } from "../types";

const modernSaaSAssetPath = "/style-assets/modern-saas/modern-saas-product-gradient-frame.png";

function ModernSaaSReferenceImage() {
  return (
    <figure className="modern-saas-reference-frame">
      <img
        alt="Modern SaaS reference interface with style catalog, research dossier, dashboard preview, and decision guide."
        height="992"
        src={modernSaaSAssetPath}
        width="1586"
      />
    </figure>
  );
}

function ModernSaaSAnatomyBoard({ style }: Pick<DossierRendererProps, "style">) {
  const workflowItems = [
    style.useCases[0] ?? "Product landing",
    style.useCases[1] ?? "Demo app",
    style.useCases[2] ?? "Developer tools",
  ];
  const integrations = style.tags.slice(0, 3).concat(["Tokenized UI", "Focus ring"]);

  return (
    <section className="modern-saas-product" aria-label="Modern SaaS coded UI anatomy">
      <div className="modern-product-topbar">
        <div>
          <span>Product anatomy</span>
          <strong>Code-native component board</strong>
        </div>
        <button type="button">Share preview</button>
      </div>

      <div className="modern-command-row">
        <label>
          <span>Primary workflow input</span>
          <input readOnly tabIndex={-1} value="Launch dashboard handoff for review" />
        </label>
        <strong>Ready to ship</strong>
      </div>

      <div className="modern-product-grid">
        <article className="modern-metric-card">
          <span>Button recipe</span>
          <strong>46px CTA</strong>
          <em>Soft radius, confident fill</em>
        </article>
        <article className="modern-metric-card">
          <span>Card system</span>
          <strong>Layered panels</strong>
          <em>Light border, subtle depth</em>
        </article>
        <article className="modern-chart-card">
          <div>
            <span>Signal density</span>
            <strong>Readable visual hierarchy</strong>
          </div>
          <div className="modern-chart-bars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </article>
        <article className="modern-workflow-card">
          {workflowItems.map((item) => (
            <div key={item}>
              <span aria-hidden="true" />
              <strong>{item}</strong>
              <em>Live</em>
            </div>
          ))}
        </article>
      </div>

      <div className="modern-integration-strip" aria-label="Modern SaaS integration cues">
        {integrations.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function ModernSaaSExampleBoard({ style }: Pick<DossierRendererProps, "style">) {
  return (
    <section className="modern-saas-example-board" aria-label="Modern SaaS visual examples">
      <article className="modern-example-card is-primary">
        <span>Primary action</span>
        <button type="button">Start workspace</button>
      </article>
      <article className="modern-example-card">
        <span>Secondary action</span>
        <button className="is-secondary" type="button">
          View docs
        </button>
      </article>
      <article className="modern-example-card">
        <span>Status badge</span>
        <strong>{style.realWorldExamples[0]?.label ?? "SaaS benchmark"}</strong>
        <em>Polished, calm, product-led</em>
      </article>
      <article className="modern-example-card is-wide">
        <span>Component recipe</span>
        <p>{style.componentExamples[0]?.detail}</p>
      </article>
    </section>
  );
}

export function ModernSaaSDossier({ renderTab, style }: DossierRendererProps) {
  const notes = [
    { label: "Why it works", value: style.strengths[0] },
    { label: "Risk", value: style.weaknesses[0] },
    { label: "Implementation", value: style.implementationNotes[0] },
  ];

  return (
    <div className="modern-saas-dossier-layout">
      <section className="modern-saas-hero-panel">
        <ModernSaaSReferenceImage />
      </section>

      <ModernSaaSAnatomyBoard style={style} />

      <aside className="modern-saas-insights">
        {notes.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <p>{item.value}</p>
          </article>
        ))}
      </aside>

      {renderTab("dossier-content-modern-saas")}
      <ModernSaaSExampleBoard style={style} />
    </div>
  );
}
