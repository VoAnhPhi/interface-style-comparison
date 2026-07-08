import type { DossierRendererProps } from "../types";

export function GlassmorphismDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="dossier-body dossier-glass-layout">
      <div className="glass-preview-stage">
        <div className="glass-ambient-plane" />
        <section className="glass-card-main">
          <span>{style.name}</span>
          <strong>{style.commonPatterns[0]}</strong>
          <p>{style.accessibilityRisks[0]}</p>
        </section>
        <section className="glass-card-secondary">
          <strong>{style.tokenRecipe.radius}</strong>
          <span>{style.tokenRecipe.motion}</span>
        </section>
      </div>
      {renderTab("dossier-content-glass")}
    </div>
  );
}

