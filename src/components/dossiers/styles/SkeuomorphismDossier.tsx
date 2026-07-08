import type { DossierRendererProps } from "../types";

export function SkeuomorphismDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="skeuo-dossier-layout">
      <section className="skeuo-object-panel" aria-hidden="true">
        <div className="skeuo-paper">
          <span>{style.name}</span>
          <strong>{style.commonPatterns[0]}</strong>
          <p>{style.characteristics.slice(0, 3).join(" / ")}</p>
        </div>
        <div className="skeuo-controls">
          <span />
          <span />
          <span />
        </div>
      </section>
      <aside className="skeuo-material-note">
        <span>{style.classification}</span>
        <h3>{style.summary}</h3>
        <p>{style.doDont.dont[0]}</p>
      </aside>
      {renderTab("dossier-content-skeuo")}
    </div>
  );
}

