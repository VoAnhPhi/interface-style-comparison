import type { DossierRendererProps } from "../types";

export function Web20GlossDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="web20-dossier-layout">
      <section className="web20-gloss-panel" aria-hidden="true">
        <div className="web20-sky-band" />
        <div className="web20-gel-card">
          <span>{style.feeling.join(" / ")}</span>
          <strong>{style.commonPatterns[0]}</strong>
          <button type="button" tabIndex={-1}>
            Gloss CTA
          </button>
        </div>
        <div className="web20-chip-row">
          {style.characteristics.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      <aside className="web20-notes">
        <h3>{style.summary}</h3>
        <p>{style.doDont.dont[0]}</p>
      </aside>
      {renderTab("dossier-content-web20")}
    </div>
  );
}
