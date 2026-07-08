import { formatClassification, type DossierRendererProps } from "../types";

export function EditorialPortfolioDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="dossier-editorial-layout">
      <div className="editorial-feature">
        <div>
          <span>{formatClassification(style)}</span>
          <h3>{style.feeling.join(" / ")}</h3>
        </div>
        <p>{style.summary}</p>
      </div>
      <div className="editorial-composition" aria-hidden="true">
        <span />
        <strong>{style.commonPatterns[0]}</strong>
        <em>{style.commonPatterns[1]}</em>
      </div>
      {renderTab("dossier-content-editorial")}
    </div>
  );
}

