import type { DossierRendererProps } from "../types";

export function EnterpriseAdminDossier({ renderTab, style }: DossierRendererProps) {
  const tableRows = style.useCases.slice(0, 4);

  return (
    <div className="dossier-body dossier-enterprise-layout">
      <div className="enterprise-preview-stage">
        <div className="enterprise-toolbar">
          <span>Filters</span>
          <strong>{style.tokenRecipe.density}</strong>
        </div>
        <div className="enterprise-kpis">
          {style.recommendedFor.slice(0, 3).map((item) => (
            <article key={item}>
              <span>{item}</span>
              <strong>High fit</strong>
            </article>
          ))}
        </div>
        <div className="enterprise-table" aria-hidden="true">
          <div className="enterprise-table-head">
            <span>Surface</span>
            <span>State</span>
            <span>Risk</span>
          </div>
          {tableRows.map((item, index) => (
            <div className="enterprise-row" key={item}>
              <span>{item}</span>
              <strong>{index === 0 ? "Primary" : "Ready"}</strong>
              <em>{style.accessibilityRisks[index % style.accessibilityRisks.length]}</em>
            </div>
          ))}
        </div>
      </div>
      {renderTab("dossier-content-framed")}
    </div>
  );
}

