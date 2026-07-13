import { useState } from "react";
import type { DossierRendererProps } from "../types";

export function NeoBrutalismDossier({ renderTab, style }: DossierRendererProps) {
  const [palette, setPalette] = useState<"classic" | "signal">("classic");
  const isSignal = palette === "signal";

  return (
    <div className={`dossier-brutal-layout ${isSignal ? "brutal-theme-signal" : "brutal-theme-classic"}`}>
      <div className="brutal-variant-switcher" role="group" aria-label="Neo-brutalism layout variants">
        <span>Compare layouts</span>
        <button
          aria-pressed={!isSignal}
          className={!isSignal ? "is-active" : ""}
          onClick={() => setPalette("classic")}
          type="button"
        >
          01 / Current palette
        </button>
        <button
          aria-pressed={isSignal}
          className={isSignal ? "is-active" : ""}
          onClick={() => setPalette("signal")}
          type="button"
        >
          02 / Signal Pop palette
        </button>
      </div>

      <div className="brutal-poster">
        <div className="brutal-poster-art" aria-hidden="true" />
        <div className="brutal-title-block">
          <span>{isSignal ? "new color system / signal pop" : style.classification}</span>
          <strong>{style.name}</strong>
          <p>{isSignal ? "Electric violet, pool blue, and orange turn the same raw structure into a louder campaign surface." : style.summary}</p>
        </div>
        <div className="brutal-sticker">{isSignal ? "new palette" : style.feeling[0]}</div>
        <div className="brutal-columns">
          {style.characteristics.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="brutal-anatomy" aria-label="Neo-brutalism component anatomy">
        <div className="brutal-anatomy-heading">
          <span>Layout {isSignal ? "02" : "01"}</span>
          <strong>{isSignal ? "Signal Pop campaign kit" : "Raw poster workspace"}</strong>
        </div>
        <div className="brutal-controls">
          <button className="brutal-button brutal-button-primary" type="button">Make it loud</button>
          <button className="brutal-button brutal-button-secondary" type="button">View system</button>
          <label className="brutal-input-wrap">
            <span>Search the archive</span>
            <input aria-label="Search the archive" placeholder="Type a style, pattern, or signal" />
          </label>
        </div>
        <div className="brutal-example-grid">
          <article className="brutal-example-card brutal-example-card-featured">
            <span>Creator tool / 01</span>
            <strong>Build a loud idea.</strong>
            <p>Chunky controls, direct copy, and a hard edge that makes the next action obvious.</p>
            <button className="brutal-button brutal-button-small" type="button">Open canvas ↗</button>
          </article>
          <article className="brutal-example-card">
            <span>Launch block / 02</span>
            <strong>Make the scroll stop.</strong>
            <div className="brutal-progress"><i style={{ width: isSignal ? "72%" : "58%" }} /></div>
            <p>{isSignal ? "Signal Pop / 72% ready" : "Poster system / 58% ready"}</p>
          </article>
          <article className="brutal-example-card">
            <span>Price card / 03</span>
            <strong>{isSignal ? "$24 / signal" : "$18 / raw"}</strong>
            <p>One bold surface, one clear status, zero polite gradients.</p>
            <span className="brutal-status">available now</span>
          </article>
        </div>
      </div>

      {renderTab("dossier-content-brutal")}
    </div>
  );
}
