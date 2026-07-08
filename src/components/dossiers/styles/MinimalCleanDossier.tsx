import { FontAwesomeIcon } from "../../icons/FontAwesomeIcon";
import type { DossierRendererProps } from "../types";

const minimalCleanAssetPath = "/style-assets/minimal/minimal-clean-paper-desk.png";

export function MinimalCleanDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="minimal-clean-dossier-layout">
      <section className="minimal-clean-workspace" aria-label="Minimal Clean coded UI sample">
        <div className="minimal-clean-topbar">
          <div className="minimal-clean-brand">
            <FontAwesomeIcon name="file-lines" size={18} />
            <span>Quiet Notes</span>
          </div>
          <label className="minimal-clean-search">
            <FontAwesomeIcon name="magnifying-glass" size={16} />
            <input readOnly tabIndex={-1} value="Search workspace" />
          </label>
          <div className="minimal-clean-toolbar">
            <button className="minimal-clean-icon-button" type="button" tabIndex={-1} aria-label="Filter sample">
              <FontAwesomeIcon name="bars-filter" size={16} />
            </button>
            <button className="minimal-clean-icon-button" type="button" tabIndex={-1} aria-label="Settings sample">
              <FontAwesomeIcon name="gear" size={16} />
            </button>
          </div>
        </div>

        <div className="minimal-clean-grid">
          <aside className="minimal-clean-outline" aria-label="Document outline sample">
            <span>Outline</span>
            {["Principles", "Layout", "States", "Review"].map((item, index) => (
              <button className={index === 0 ? "is-active" : ""} key={item} type="button" tabIndex={-1}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </button>
            ))}
          </aside>

          <article className="minimal-clean-editor">
            <div className="minimal-clean-editor-head">
              <div>
                <span>{style.classification.replace(/-/g, " ")}</span>
                <h3>{style.summary}</h3>
                <p>
                  A quiet list-detail workspace where whitespace, hairline structure, and deliberate type rhythm keep the product
                  usable for years.
                </p>
              </div>
              <strong>
                <FontAwesomeIcon name="circle-check" size={15} />
                Ready
              </strong>
            </div>

            <div className="minimal-clean-meta" aria-label="Minimal Clean style signals">
              <article>
                <span>Visual weight</span>
                <strong>Low noise</strong>
              </article>
              <article>
                <span>Interaction rule</span>
                <strong>Border-first states</strong>
              </article>
              <article>
                <span>Best surfaces</span>
                <strong>{style.recommendedFor.slice(0, 2).join(" / ")}</strong>
              </article>
            </div>

            <div className="minimal-clean-paper-row">
              <figure className="minimal-clean-image">
                <img alt="Minimal paper editor workspace asset." height="900" src={minimalCleanAssetPath} width="1400" />
              </figure>
              <aside className="minimal-clean-sidecar" aria-label="Minimal Clean side notes">
                <div className="minimal-clean-note-card">
                  <span>Focus rule</span>
                  <p>Use quiet contrast, clear whitespace, and visible states without decorative noise.</p>
                </div>
                <div className="minimal-clean-note-card">
                  <span>Affordance check</span>
                  <p>Primary actions should read instantly even when the palette stays neutral and restrained.</p>
                </div>
              </aside>
            </div>

            <div className="minimal-clean-canvas">
              <section className="minimal-clean-document" aria-label="Minimal Clean document sample">
                <header>
                  <span>Editor canvas</span>
                  <strong>Workspace notes</strong>
                </header>
                <div className="minimal-clean-document-block">
                  <h4>Clarity before decoration</h4>
                  <p>
                    Reduce chrome until content, actions, and hierarchy stay obvious without gradients, heavy shadows, or novelty
                    framing.
                  </p>
                </div>
                <div className="minimal-clean-lines" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </section>

              <aside className="minimal-clean-manifest" aria-label="Minimal Clean design manifest">
                <span>Surface notes</span>
                <h3>Quiet structure with deliberate alignment.</h3>
                <div className="minimal-clean-rule">
                  <strong>Whitespace</strong>
                  <p>Open margins create separation before borders or color do.</p>
                </div>
                <div className="minimal-clean-rule">
                  <strong>States</strong>
                  <p>Inputs, buttons, and nav items rely on contrast and edges instead of decoration.</p>
                </div>
              </aside>
            </div>

            <div className="minimal-clean-actions">
              <button className="minimal-clean-primary" type="button" tabIndex={-1}>
                <FontAwesomeIcon name="plus" size={16} />
                <span>New note</span>
              </button>
              <button className="minimal-clean-secondary" type="button" tabIndex={-1}>
                <FontAwesomeIcon name="pen-line" size={16} />
                <span>Edit draft</span>
              </button>
              <a href="#dossier-minimal-clean-examples" tabIndex={-1}>
                <FontAwesomeIcon name="arrow-up-right-from-square" size={15} />
                <span>View examples</span>
              </a>
            </div>
          </article>
        </div>

        <section className="minimal-clean-checks" aria-label="Minimal Clean visual requirements">
          {style.characteristics.slice(0, 4).map((item) => (
            <article key={item}>
              <FontAwesomeIcon name="circle-check" size={17} />
              <span>{item}</span>
            </article>
          ))}
        </section>
      </section>

      {renderTab("dossier-content-minimal")}
    </div>
  );
}
