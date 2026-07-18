import { FontAwesomeIcon } from "../../icons/FontAwesomeIcon";
import type { DossierRendererProps } from "../types";

const stateColumns = [
  { name: "Default", className: "is-default" },
  { name: "Hover", className: "is-hover" },
  { name: "Selected", className: "is-selected" },
  { name: "Focus", className: "is-focus" },
  { name: "Disabled", className: "is-disabled" },
];

const messages = [
  ["CS", "Casey Smith", "Let’s align on the brief.", "9:41 AM"],
  ["AK", "Alex Kim", "Shared the latest designs.", "9:20 AM"],
  ["MP", "Morgan Patel", "Looks good! Ship it.", "Yesterday"],
  ["JT", "Jordan Taylor", "Can we review this?", "Yesterday"],
];

export function FlatDesignDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="flat-design-dossier-layout">
      <section className="flat-showcase" aria-labelledby="flat-showcase-title">
		<div className="flat-showcase-copy">
          <span>Flat mobile app</span>
          <h3 id="flat-showcase-title">Make the active state unmistakable.</h3>
          <p>Solid fills, aligned rows, and visible dividers create hierarchy without simulated depth.</p>
          <div><b>Product-ready baseline</b><b>Color + label cues</b></div>
        </div>
        <div className="flat-mobile-preview">
          <header>
            <button type="button" aria-label="Open mobile menu">☰</button>
            <strong>Messages</strong>
            <button type="button" aria-label="Create message">＋</button>
          </header>
          <div className="flat-message-list">
            {messages.map(([initials, name, copy, time], index) => (
              <article className={index === 2 ? "is-active" : ""} key={name}>
                <b>{initials}</b>
                <div><strong>{name}</strong><span>{copy}</span></div>
                <time>{time}</time>
                <i>›</i>
              </article>
            ))}
          </div>
          <nav aria-label="Mobile app navigation">
            <span className="is-active">▣<small>Messages</small></span>
            <span>⌕<small>Search</small></span>
            <span>☑<small>Tasks</small></span>
            <span>♙<small>Profile</small></span>
          </nav>
          <button className="flat-compose" type="button"><FontAwesomeIcon name="pen-line" size={15} /> New message</button>
        </div>
      </section>

      <section className="flat-state-system" aria-labelledby="flat-state-title">
        <div className="flat-section-heading">
          <div><span>State system</span><h3 id="flat-state-title">A flat control still needs a visible response.</h3></div>
          <p>Fill, outline, icon, and focus treatment carry the interaction signal.</p>
        </div>
        <div className="flat-state-grid">
          {stateColumns.map((state) => (
            <article className={`flat-state-column ${state.className}`} key={state.name}>
              <h4>{state.name}</h4>
              <button type="button">{state.name === "Selected" ? "✓ Selected" : "Button"}</button>
              <button className="flat-outline-button" type="button">Outline</button>
              <span className="flat-switch"><i /></span>
              <span className="flat-check"><i />Checkbox</span>
              <span className="flat-radio"><i />Radio</span>
            </article>
          ))}
        </div>
      </section>

      <section className="flat-settings" aria-labelledby="flat-settings-title">
        <div className="flat-settings-form">
          <h3 id="flat-settings-title">Component settings</h3>
          <label>Label<input placeholder="Enter value" /></label>
          <span className="flat-field-label">Category</span>
          <div className="flat-segmented" role="group" aria-label="Category example"><button type="button">All</button><button className="is-active" type="button">Active</button><button type="button">Archived</button></div>
        </div>
        <div className="flat-notifications">
          <h3>Notifications</h3>
          <label><input defaultChecked type="checkbox" /> Email updates</label>
          <label><input type="checkbox" /> Push notifications</label>
          <span className="flat-field-label">Visibility</span>
          <label><input defaultChecked name="flat-visibility" type="radio" /> Public</label>
          <label><input name="flat-visibility" type="radio" /> Private</label>
          <div className="flat-settings-actions"><button type="button">Cancel</button><button type="button">Save changes</button></div>
        </div>
      </section>

      <section className="flat-principles" aria-label="Flat Design principles">
        <article><div className="flat-color-blocks"><i /><i /><i /><i /><i /></div><div><strong>Color blocks</strong><p>Use color with purpose for action, status, and active navigation.</p></div></article>
        <article><b className="flat-type-sample">Aa</b><div><strong>Typography hierarchy</strong><p>Spacing and type weight replace elevation as the main hierarchy tools.</p></div></article>
        <article><b className="flat-cube">◇</b><div><strong>No fake depth</strong><p>Flat surfaces use crisp edges, borders, and clear states—not shadows or bevels.</p></div></article>
      </section>

      <aside className="flat-affordance-note">
        <span>Affordance rule</span>
        <h3>Flat does not mean ambiguous.</h3>
        <p>{style.doDont.do[0]}</p>
      </aside>

      {renderTab("dossier-content-flat")}
    </div>
  );
}
