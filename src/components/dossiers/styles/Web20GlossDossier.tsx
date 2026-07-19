import { useState } from "react";
import type { DossierRendererProps } from "../types";

export function Web20GlossDossier({ renderTab, style }: DossierRendererProps) {
  const [activeTile, setActiveTile] = useState("Aqua pulse");
  return (
    <div className="web20-dossier-layout">
      <section className="web20-aero-promo" aria-labelledby="web20-aero-title">
        <header><strong id="web20-aero-title">Aqua Bloom</strong><nav aria-label="Glossy navigation"><button type="button">Home</button><button type="button">Explore</button><button type="button">Share</button></nav><b>Online</b></header>
        <div className="web20-aero-hero">
          <div><span>Eco-tech playground</span><h3>Make every day brighter.</h3><p>Optimistic tools for water, energy, and little moments of wonder.</p><button className="web20-primary" type="button">Start exploring</button><button className="web20-secondary" type="button">See the flow</button></div>
          <img alt="Aqua and sky Web 2.0 Gloss eco-tech layout reference" src="/style-assets/web20/web20-gloss-layout-option-b-eco-tech-promo.png" />
        </div>
        <div className="web20-tile-row">
          {[["Aqua pulse", "Water"], ["Leaf loop", "Green"], ["Sun spark", "Energy"]].map(([name, label]) => (
            <button aria-pressed={activeTile === name} key={name} onClick={() => setActiveTile(name)} type="button"><i aria-hidden="true" /><strong>{name}</strong><span>{label}</span></button>
          ))}
        </div>
        <div className="web20-gloss-input"><label htmlFor="web20-search">Find a bright idea</label><input id="web20-search" placeholder="Try water, sun, or a garden" /><button type="button">Go</button></div>
      </section>
      <aside className="web20-notes" aria-label="Web 2.0 Gloss notes">
        <h3>{style.summary}</h3>
        <p>{style.doDont.dont[0]}</p>
      </aside>
      {renderTab("dossier-content-web20")}
    </div>
  );
}
