import type { DossierRendererProps } from "../types";

export function MaterialFluentDossier({ renderTab, style }: DossierRendererProps) {
  const variants = ["Filled", "Outlined", "Tonal", "Text"];

  return (
    <div className="material-fluent-dossier-layout">
      <section className="material-component-board" aria-hidden="true">
        <div className="material-state-header">
          <span>Component anatomy</span>
          <strong>{style.name}</strong>
        </div>
        <div className="material-button-row">
          {variants.map((variant) => (
            <span key={variant}>{variant}</span>
          ))}
        </div>
        <div className="material-field-card">
          <label>Text field</label>
          <div>Helper text and explicit focus state</div>
        </div>
        <div className="material-dialog-card">
          <strong>Dialog recipe</strong>
          <p>Title, content, action row, trapped focus.</p>
        </div>
      </section>
      <aside className="material-role-panel">
        {style.componentExamples.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <p>{item.detail}</p>
          </article>
        ))}
      </aside>
      {renderTab("dossier-content-material")}
    </div>
  );
}

