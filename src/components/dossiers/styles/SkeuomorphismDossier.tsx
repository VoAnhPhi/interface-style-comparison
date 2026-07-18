import { FontAwesomeIcon } from "../../icons/FontAwesomeIcon";
import type { DossierRendererProps } from "../types";

const sources = [
  ["Field rec 001", "Wilderness_North.wav", "44.1 kHz · 24-bit · stereo", "is-active"],
  ["Intercept 07A", "Transmission_07A.wav", "48 kHz · 24-bit · mono", ""],
  ["Urbex 19", "Factory_Floor.wav", "44.1 kHz · 16-bit · stereo", ""],
  ["Archive B-roll", "Drone_Feed_03.mov", "48 kHz · 24-bit · stereo", ""],
];

const tasks = [
  ["Detect transient events", "Queued", "is-queued"],
  ["Identify recurring patterns", "Running", "is-running"],
  ["Classify anomalies", "Queued", "is-queued"],
  ["Generate research summary", "Draft", "is-draft"],
];

const meters = Array.from({ length: 36 }, (_, index) => 24 + ((index * 17) % 48));

export function SkeuomorphismDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="skeuo-dossier-layout">
      <section className="skeuo-signal-console" aria-labelledby="skeuo-console-title">
        <header className="skeuo-console-header">
          <div className="skeuo-console-brand">
            <span>Signal desk</span>
            <strong id="skeuo-console-title">Research dossier</strong>
          </div>
          <div className="skeuo-console-meta" aria-label="Signal Desk session details">
            <span><b>Dossier</b> Project Aurora</span>
            <span><b>Session</b> Morning analysis</span>
            <span><b>Last saved</b> 09:41:23</span>
          </div>
          <button className="skeuo-header-action" type="button">
            Session notes <FontAwesomeIcon name="file-lines" size={14} />
          </button>
        </header>

        <div className="skeuo-console-grid">
          <aside className="skeuo-source-rail" aria-label="Audio source examples">
            <div className="skeuo-rail-heading"><span>Sources</span><button type="button" aria-label="Add source"><FontAwesomeIcon name="plus" size={13} /></button></div>
            <div className="skeuo-source-stack">
              {sources.map(([name, file, detail, active]) => (
                <button className={`skeuo-source-card ${active}`} key={name} type="button">
                  <i aria-hidden="true" />
                  <span><strong>{name}</strong><small>{file}</small><em>{detail}</em></span>
                  <b aria-hidden="true" />
                </button>
              ))}
            </div>
            <button className="skeuo-import-action" type="button"><FontAwesomeIcon name="download" size={14} /> Import source</button>
            <div className="skeuo-output-knob">
              <span>Source output</span><i aria-hidden="true" /><small>Level</small>
            </div>
          </aside>

          <div className="skeuo-main-deck">
            <section className="skeuo-meter-deck" aria-label="Input and output meters">
              <div className="skeuo-dial-group"><span>Input</span><button className="skeuo-dial" type="button" aria-label="Adjust input level"><i /></button><small>−12 · +12</small></div>
              <div className="skeuo-meter-display" aria-label="Stereo level meter example">
                <div><span>L</span><p>{meters.map((height, index) => <i key={`left-${index}`} style={{ height: `${height}%` }} />)}</p></div>
                <div><span>R</span><p>{meters.map((height, index) => <i key={`right-${index}`} style={{ height: `${Math.max(18, height - 9)}%` }} />)}</p></div>
              </div>
              <div className="skeuo-dial-group"><span>Output</span><button className="skeuo-dial" type="button" aria-label="Adjust output level"><i /></button><small>−12 · +12</small></div>
            </section>

            <section className="skeuo-command-deck" aria-labelledby="skeuo-command-title">
              <label htmlFor="skeuo-command"><span id="skeuo-command-title">Command / input</span><textarea defaultValue="Analyze signal for anomalies, transient events, and recurring patterns." id="skeuo-command" /></label>
              <div className="skeuo-command-actions">
                <button className="skeuo-primary-action" type="button">Execute</button>
                <button className="skeuo-secondary-action" type="button">Clear</button>
                <button className="skeuo-pressed-action" type="button">Save query</button>
                <button className="skeuo-priority" type="button">Priority <b>Normal</b>⌄</button>
              </div>
              <p>Context: Project Aurora <i /> Session: Morning analysis</p>
            </section>

            <div className="skeuo-analysis-grid">
              <section className="skeuo-waveform-card" aria-label="Activity timeline example">
                <header><span>Activity timeline</span><div><button type="button">Waveform</button><button type="button">Spectrum</button><button type="button" aria-label="Zoom in">+</button></div></header>
                <div className="skeuo-waveform" aria-hidden="true">{meters.concat(meters.slice(0, 18)).map((height, index) => <i key={index} style={{ height: `${Math.max(13, height)}%` }} />)}</div>
                <footer><span>00:00</span><span>00:30</span><span>01:00</span><span>01:30</span><span>02:00</span></footer>
              </section>
              <section className="skeuo-task-queue" aria-labelledby="skeuo-task-title">
                <header><span id="skeuo-task-title">Task queue</span><small>4 tasks</small></header>
                {tasks.map(([title, state, stateClass], index) => (
                  <article key={title}><b>{`0${index + 1}`}</b><div><strong>{title}</strong><small className={stateClass}>{state}</small></div><button type="button" aria-label={`Manage ${title}`}>{state === "Running" ? "Ⅱ" : "×"}</button></article>
                ))}
                <button className="skeuo-add-task" type="button"><FontAwesomeIcon name="plus" size={12} /> Add task</button>
              </section>
            </div>

            <section className="skeuo-control-strip" aria-label="Instrument control examples">
              {[["Filter", "HPF"], ["Dynamics", "Ratio"], ["Tone", "Mid"], ["Output", "Gain"]].map(([label, value]) => <div key={label}><span>{label}</span><button className="skeuo-small-dial" type="button" aria-label={`Adjust ${label}`}><i /></button><small>{value}</small></div>)}
              <div className="skeuo-monitor"><span>Monitor</span><button className="skeuo-small-dial" type="button" aria-label="Adjust monitor"><i /></button><small>Input / output</small></div>
            </section>
          </div>

          <aside className="skeuo-component-rail" aria-label="Skeuomorphism component anatomy">
            <section><h3>Components</h3><div className="skeuo-control-samples"><div><i className="skeuo-sample-knob" /><small>Knob</small></div><div><i className="skeuo-sample-toggle" /><small>Toggle</small></div><div><i className="skeuo-sample-button" /><small>Bevel</small></div></div></section>
            <section className="skeuo-status-card"><h3>Status</h3><p><i /> System operational</p><small>Material cues supplement text and color.</small></section>
            <section><h3>Button anatomy</h3><div className="skeuo-anatomy"><button className="skeuo-anatomy-button" type="button" aria-label="Raised button example" /><ul><li>Highlight</li><li>Bevel edge</li><li>Pressed shadow</li></ul></div></section>
            <section><h3>Material palette</h3><div className="skeuo-material-swatches"><i /><i /><i /><i /></div><div className="skeuo-texture-swatch" aria-label="Generated paper texture swatch" /></section>
          </aside>
        </div>
      </section>

      <section className="skeuo-example-board" aria-labelledby="skeuo-examples-title">
        <div><span>Local application</span><h3 id="skeuo-examples-title">Physical cues earn their place when they explain the interaction.</h3></div>
        <div className="skeuo-example-cards">
          <article><FontAwesomeIcon name="file-lines" size={18} /><strong>Notebook metaphor</strong><p>Paper-like reading areas make a new research workflow feel familiar.</p></article>
          <article><span className="skeuo-mini-knob" aria-hidden="true" /><strong>Instrument controls</strong><p>Dials and meter grouping help people scan a specialist tool.</p></article>
          <article><FontAwesomeIcon name="circle-check" size={18} /><strong>Onboarding object</strong><p>A physical frame can teach the first task without hiding standard focus states.</p></article>
        </div>
      </section>

      <aside className="skeuo-guardrail">
        <span>Accessibility guardrail</span><h3>Texture frames the tool; it never competes with its reading surface.</h3><p>{style.accessibilityRisks[0]}</p>
      </aside>

      {renderTab("dossier-content-skeuo")}
    </div>
  );
}
