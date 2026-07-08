import type { DossierRendererProps } from "../types";

export function DarkFuturisticDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="dark-tech-dossier-layout">
      <section className="dark-tech-console" aria-hidden="true">
        <div className="dark-console-topbar">
          <span>system.console</span>
          <strong>Active</strong>
        </div>
        <div className="dark-console-grid">
          {style.commonPatterns.slice(0, 4).map((item, index) => (
            <article key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
            </article>
          ))}
        </div>
        <div className="dark-signal-chart">
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
      <aside className="dark-tech-readout">
        <span>{style.classification}</span>
        <h3>{style.summary}</h3>
        <p>{style.accessibilityRisks[0]}</p>
      </aside>
      {renderTab("dossier-content-dark-tech")}
    </div>
  );
}

