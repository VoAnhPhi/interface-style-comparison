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
