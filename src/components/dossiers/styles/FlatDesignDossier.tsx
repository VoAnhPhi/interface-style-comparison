import type { DossierRendererProps } from "../types";

export function FlatDesignDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="flat-design-dossier-layout">
      <section className="flat-board" aria-hidden="true">
        <div className="flat-nav">
          <span>Menu</span>
          <span>State</span>
          <span>Action</span>
        </div>
        <div className="flat-tile-grid">
          {style.commonPatterns.map((item) => (
            <article key={item}>
              <span />
              <strong>{item}</strong>
            </article>
          ))}
        </div>
      </section>
      <aside className="flat-affordance-note">
        <h3>{style.summary}</h3>
        <p>{style.doDont.do[0]}</p>
      </aside>
      {renderTab("dossier-content-flat")}
    </div>
  );
}

