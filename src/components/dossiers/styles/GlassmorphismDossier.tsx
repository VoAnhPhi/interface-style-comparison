import type { DossierRendererProps } from "../types";

const glassColorRoles = [
  ["Base", "#192F28"],
  ["Deep teal", "#214E46"],
  ["Muted jade", "#4F806F"],
  ["Moss", "#78956F"],
  ["Warm amber", "#D2A25F"],
] as const;

export function GlassmorphismDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="dossier-body dossier-glass-layout">
      <section className="glass-forest-canvas" aria-label="Forest glass component study">
        <header className="glass-forest-header">
          <div>
            <span className="glass-forest-kicker">Natural material study</span>
            <h3>{style.name}</h3>
            <p>A layered interface language shaped by forest light, depth, and calm.</p>
          </div>
          <div className="glass-forest-actions">
            <span className="glass-forest-status">Natural</span>
            <button className="glass-forest-primary" type="button">Explore tokens</button>
            <button className="glass-forest-secondary" type="button">View patterns</button>
          </div>
        </header>

        <figure className="glass-forest-hero">
          <img src="/style-assets/glass/glass-forest-backdrop.png" alt="Fern leaves and moss illuminated by warm light in a dark forest." />
          <figcaption className="glass-forest-hero-copy">
            <span>Material direction</span>
            <strong>Forest glass</strong>
            <p>Depth, clarity, and calm. Glass surfaces preserve the environment while keeping the reading layer grounded.</p>
            <div className="glass-forest-dots" aria-label="First visual study selected">
              <span className="is-active" />
              <span />
              <span />
            </div>
          </figcaption>
        </figure>

        <section className="glass-forest-tokens" aria-label="Glassmorphism contextual color roles">
          {glassColorRoles.map(([label, value]) => (
            <article key={label}>
              <span style={{ background: value }} />
              <div><strong>{label}</strong><code>{value}</code></div>
            </article>
          ))}
        </section>

        <section className="glass-forest-examples" aria-label="Glassmorphism component examples">
          <article className="glass-example-card glass-example-navigation">
            <span>01</span>
            <h4>Navigation</h4>
            <p>Subtle surfaces with clear hierarchy.</p>
            <nav aria-label="Glass example navigation">
              <strong>Overview</strong><span>Tokens</span><span>Patterns</span><span>Examples</span>
            </nav>
          </article>

          <article className="glass-example-card glass-example-data">
            <span>02</span>
            <h4>Data card</h4>
            <p>Readable signals through layered glass.</p>
            <div className="glass-data-panel">
              <small>Canopy coverage</small><strong>72%</strong><em>+8%</em>
              <div className="glass-data-line" aria-hidden="true" />
            </div>
          </article>

          <article className="glass-example-card glass-example-modal">
            <span>03</span>
            <h4>Modal</h4>
            <p>Focused content with safe opacity.</p>
            <form className="glass-modal-panel">
              <label>Observation<input defaultValue="Fern study" /></label>
              <div><button type="button">Cancel</button><button className="is-save" type="button">Save</button></div>
            </form>
          </article>
        </section>

        <section className="glass-forest-rules" aria-label="Glassmorphism visual rules">
          <strong>Visual rules</strong>
          <span>Blur <b>12–20px</b></span>
          <span>Border <b>1px / 14%</b></span>
          <span>Opacity <b>60–80%</b></span>
          <span>Contrast <b>AA minimum</b></span>
          <span>Fallback <b>Solid #192F28</b></span>
        </section>
      </section>
      {renderTab("dossier-content-glass")}
    </div>
  );
}
