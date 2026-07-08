import { StylePreview } from "../../StylePreview";
import type { DossierRendererProps } from "../types";

export function DefaultDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="dossier-body dossier-default-layout">
      <div className="preview-stage">
        <StylePreview style={style} />
      </div>
      {renderTab()}
    </div>
  );
}

