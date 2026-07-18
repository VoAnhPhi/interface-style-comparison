import { FontAwesomeIcon } from "../../icons/FontAwesomeIcon";
import type { DossierRendererProps } from "../types";

const surfaceStates = [
  {
    title: "Raised",
    detail: "Actions lift from the surface with gentle, directional depth.",
    control: "Primary action",
    icon: "circle-check" as const,
  },
  {
    title: "Inset",
    detail: "Fields sit within the surface to show containment without noise.",
    control: "Contained field",
    icon: "file-lines" as const,
  },
  {
    title: "Focus-safe",
    detail: "A clear outline keeps keyboard focus visible against soft depth.",
    control: "Focusable control",
    icon: "circle-exclamation" as const,
  },
];

export function NeumorphismDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="neumorph-dossier-layout">
      <section className="neumorph-hero" aria-labelledby="neumorph-hero-title">
        <div className="neumorph-hero-copy">
          <span className="neumorph-kicker">Soft UI study</span>
          <h3 id="neumorph-hero-title">Tactile depth, kept readable.</h3>
          <p>
            A calm control surface that shows how raised and inset states can support hierarchy without
            becoming the only affordance.
          </p>
          <div className="neumorph-hero-meta">
            <span>{style.classification}</span>
            <span>{style.feeling.slice(0, 2).join(" · ")}</span>
          </div>
        </div>
        <div className="neumorph-hero-forms" aria-label="Neumorphism control examples">
          <label>
            Workspace label
            <input defaultValue="Soft surface study" aria-label="Workspace label example" />
          </label>
          <div className="neumorph-action-row">
            <button className="neumorph-primary-action" type="button">
              <FontAwesomeIcon name="circle-check" size={16} />
              Save setting
            </button>
            <button className="neumorph-quiet-action" type="button">Reset</button>
          </div>
        </div>
      </section>

      <section className="neumorph-control-board" aria-labelledby="neumorph-control-title">
        <div className="neumorph-board-heading">
          <div>
            <span>Primary media control</span>
            <h3 id="neumorph-control-title">A soft control needs a clear state.</h3>
          </div>
          <button className="neumorph-more-action" type="button" aria-label="More media actions">•••</button>
        </div>

        <div className="neumorph-player">
          <button className="neumorph-skip" type="button" aria-label="Previous track">‹</button>
          <button className="neumorph-play" type="button" aria-label="Play ambient study">
            <span />
          </button>
          <button className="neumorph-skip" type="button" aria-label="Next track">›</button>
        </div>

        <div className="neumorph-progress" aria-label="Playback progress example">
          <span>02:16</span>
          <div><i /></div>
          <span>05:30</span>
        </div>
        <div className="neumorph-board-footer">
          <div className="neumorph-volume" aria-hidden="true"><span>◖</span><i /></div>
          <span>Ambient workspace</span>
          <button type="button" aria-label="Favorite this example"><FontAwesomeIcon name="heart" size={18} /></button>
        </div>
      </section>

      <aside className="neumorph-state-rail" aria-label="Neumorphism surface states">
        {surfaceStates.map((state) => (
          <article className={`neumorph-state-card is-${state.title.toLowerCase().replace("-", "")}`} key={state.title}>
            <div>
              <FontAwesomeIcon name={state.icon} size={17} />
              <div>
                <h3>{state.title}</h3>
                <p>{state.detail}</p>
              </div>
            </div>
            <button type="button">{state.control}</button>
          </article>
        ))}
      </aside>

      <section className="neumorph-examples" aria-labelledby="neumorph-examples-title">
        <div className="neumorph-examples-heading">
          <span>Examples</span>
          <h3 id="neumorph-examples-title">Use softness where it helps people focus.</h3>
        </div>
        <div className="neumorph-example-grid">
          <article><FontAwesomeIcon name="heart" size={19} /><div><strong>Wellness</strong><span>Low-noise daily check-in</span></div><b>›</b></article>
          <article><FontAwesomeIcon name="gear" size={19} /><div><strong>Settings toggle</strong><span>One clear selected state</span></div><button aria-label="Toggle settings example" type="button"><i /></button></article>
          <article><FontAwesomeIcon name="file-lines" size={19} /><div><strong>Media player</strong><span>Tactile controls, readable labels</span></div><b>›</b></article>
        </div>
      </section>

      <aside className="neumorph-warning">
        <span>Accessibility guardrail</span>
        <h3>Depth supports meaning; it never replaces it.</h3>
        <p>{style.accessibilityRisks[0]}</p>
      </aside>

      {renderTab("dossier-content-neumorph")}
    </div>
  );
}
