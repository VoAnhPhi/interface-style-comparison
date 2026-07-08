import type { DesignStyle } from "../data/designStyles";

export function StylePreview({ style }: { style: DesignStyle }) {
  return (
    <div className={`style-preview preview-${style.id}`} aria-hidden="true">
      <div className="preview-sidebar">
        <span />
        <span />
        <span />
      </div>
      <div className="preview-body">
        <div className="preview-head">
          <strong>{style.name.split(" ")[0]}</strong>
          <span />
        </div>
        <div className="preview-chart">
          <span />
          <span />
          <span />
        </div>
        <div className="preview-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

