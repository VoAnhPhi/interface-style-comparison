import type { DossierRendererProps } from "../types";

export function NeumorphismDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="neumorph-dossier-layout">
      <section className="neumorph-lab" aria-hidden="true">
        <div className="neumorph-display">
          <span>{style.feeling.join(" / ")}</span>
          <strong>{style.commonPatterns[0]}</strong>
        </div>
        <div className="neumorph-controls">
          {style.characteristics.slice(0, 4).map((item) => (
            <button key={item} type="button" tabIndex={-1}>
              {item}
            </button>
          ))}
        </div>
      </section>
      <aside className="neumorph-warning">
        <span>{style.classification}</span>
        <h3>{style.summary}</h3>
        <p>{style.accessibilityRisks[0]}</p>
      </aside>
      {renderTab("dossier-content-neumorph")}
    </div>
  );
}

