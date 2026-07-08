import type { DossierRendererProps } from "../types";

export function ClaymorphismDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="clay-dossier-layout">
      <section className="clay-playground" aria-hidden="true">
        <div className="clay-shape-main">
          <span>{style.feeling[0]}</span>
          <strong>{style.commonPatterns[0]}</strong>
        </div>
        <div className="clay-capsules">
          {style.characteristics.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      <aside className="clay-guidance">
        <h3>{style.summary}</h3>
        <p>{style.implementationNotes[0]}</p>
      </aside>
      {renderTab("dossier-content-clay")}
    </div>
  );
}
