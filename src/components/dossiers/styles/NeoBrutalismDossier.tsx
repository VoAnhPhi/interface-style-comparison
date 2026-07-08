import type { DossierRendererProps } from "../types";

export function NeoBrutalismDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="dossier-brutal-layout">
      <div className="brutal-poster">
        <div className="brutal-title-block">
          <span>{style.classification}</span>
          <strong>{style.name}</strong>
        </div>
        <div className="brutal-sticker">{style.feeling[0]}</div>
        <div className="brutal-columns">
          {style.characteristics.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
      {renderTab("dossier-content-brutal")}
    </div>
  );
}

