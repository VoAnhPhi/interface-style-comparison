import { useState } from "react";
import { FontAwesomeIcon } from "../../icons/FontAwesomeIcon";
import type { DossierRendererProps } from "../types";

const incidents = [
  ["14:32", "Latency threshold breached", "warning"],
  ["14:28", "Auto-scaling triggered", "info"],
  ["14:24", "Deploy started", "violet"],
  ["14:20", "Database pool elevated", "info"],
  ["14:16", "WAF rule blocked", "info"],
] as const;

const services = [
  ["API Gateway", "server" as const, "healthy"],
  ["Auth Service", "shield" as const, "healthy"],
  ["User Service", "cube" as const, "healthy"],
  ["Order Service", "code-branch" as const, "healthy"],
  ["Payment Service", "database" as const, "watch"],
] as const;

const pipeline = [
  ["Source", "code-branch" as const],
  ["Build", "cube" as const],
  ["Test", "flask" as const],
  ["Security", "shield" as const],
  ["Deploy", "rocket" as const],
  ["Verify", "magnifying-glass" as const],
] as const;

const alerts = [
  ["Latency threshold breached", "triangle-exclamation" as const, "warning"],
  ["Database pool high", "circle-exclamation" as const, "info"],
  ["Deploy verification pending", "arrows-rotate" as const, "violet"],
] as const;

const serviceCards = [
  ["API Gateway", "28%", "41%", "1.2K", "lime"],
  ["Order Service", "36%", "58%", "842", "cyan"],
  ["Payment Service", "22%", "35%", "303", "cyan"],
] as const;

export function DarkFuturisticDossier({ renderTab }: DossierRendererProps) {
  const [activeStage, setActiveStage] = useState("Deploy");
  const [environment, setEnvironment] = useState("Production");
  const [command, setCommand] = useState("");

  return (
    <div className="dark-tech-dossier-layout">
      <section className="dark-signal-grid" aria-labelledby="dark-signal-grid-title">
        <header className="dark-signal-header">
          <strong id="dark-signal-grid-title">Signal Grid</strong>
          <label className="dark-environment-select">
            <span>Environment</span>
            <select aria-label="Environment" onChange={(event) => setEnvironment(event.target.value)} value={environment}>
              <option>Production</option>
              <option>Staging</option>
              <option>Development</option>
            </select>
            <FontAwesomeIcon name="chevron-down" size={12} />
          </label>
        </header>

        <div className="dark-signal-workspace">
          <aside className="dark-signal-incident-rail" aria-label="Live incident and system list">
            <section className="dark-signal-panel dark-live-incident" aria-labelledby="dark-live-incident-title">
              <header><FontAwesomeIcon name="circle-exclamation" size={17} /><h3 id="dark-live-incident-title">Live incident</h3></header>
              <div className="dark-incident-list">
                {incidents.map(([time, label, tone]) => (
                  <button className={`dark-incident-row is-${tone}`} key={time} type="button">
                    <time>{time}</time><span>{label}</span><i aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>
            <section className="dark-signal-panel dark-system-list" aria-labelledby="dark-system-list-title">
              <header><h3 id="dark-system-list-title">System list</h3></header>
              <div>
                {services.map(([name, icon, status]) => (
                  <button className="dark-service-row" key={name} type="button">
                    <FontAwesomeIcon name={icon} size={14} /><span>{name}</span><b className={status}>{status === "healthy" ? "Healthy" : "Watch"}</b>
                  </button>
                ))}
              </div>
              <button className="dark-view-all" type="button">View all systems <FontAwesomeIcon name="arrow-up-right-from-square" size={12} /></button>
            </section>
          </aside>

          <main className="dark-signal-command-workspace">
            <section className="dark-signal-panel dark-command-terminal" aria-labelledby="dark-command-title">
              <header><h3 id="dark-command-title">Command terminal</h3></header>
              <label className="dark-command-input"><span>Command input</span><b aria-hidden="true">&gt;</b><input onChange={(event) => setCommand(event.target.value)} placeholder="Enter a command" value={command} /></label>
              <div className="dark-command-actions"><button className="is-primary" type="button">Run</button><button type="button">Clear</button></div>
              <div className="dark-pipeline" aria-label="Deployment pipeline">
                {pipeline.map(([label, icon], index) => (
                  <button aria-pressed={activeStage === label} className={activeStage === label ? "is-active" : ""} key={label} onClick={() => setActiveStage(label)} type="button">
                    <FontAwesomeIcon name={icon} size={19} /><span>{label}</span>{index < pipeline.length - 1 && <i aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </section>

            <section className="dark-signal-panel dark-workflow-map" aria-labelledby="dark-workflow-title">
              <header><span>Active workflow</span><h3 id="dark-workflow-title">{activeStage}</h3></header>
              <div className="dark-workflow-graph" aria-label={`${activeStage} dependency graph`}>
                <div className="dark-graph-core"><FontAwesomeIcon name="cube" size={33} /><strong>{activeStage}</strong><span>Healthy</span></div>
                <div className="dark-graph-branch is-left"><i /><i /><i /><i /></div>
                <div className="dark-graph-branch is-right"><i /><i /><i /></div>
              </div>
            </section>
          </main>

          <aside className="dark-signal-deploy-rail" aria-label="Deploy controls and alert queue">
            <section className="dark-signal-panel dark-deploy-controls" aria-labelledby="dark-deploy-title">
              <header><h3 id="dark-deploy-title">Deploy controls</h3></header>
              <p><FontAwesomeIcon name="circle-check" size={24} /><strong>Healthy</strong></p>
              <label>Deployment target<select defaultValue="Production"><option>Production</option><option>Staging</option></select></label>
              <label>Strategy<select defaultValue="Rolling"><option>Rolling</option><option>Blue/green</option></select></label>
              <button className="is-primary" type="button">Deploy</button><button type="button">Rollback</button>
            </section>
            <section className="dark-signal-panel dark-alert-queue" aria-labelledby="dark-alert-title">
              <header><h3 id="dark-alert-title">Alert queue</h3><b>3</b></header>
              {alerts.map(([label, icon, tone]) => <button className={`is-${tone}`} key={label} type="button"><FontAwesomeIcon name={icon} size={16} /><span>{label}</span><i aria-hidden="true" /></button>)}
              <button className="dark-view-all" type="button">View all alerts <FontAwesomeIcon name="arrow-up-right-from-square" size={12} /></button>
            </section>
          </aside>
        </div>

        <section className="dark-service-card-strip" aria-label="Service health examples">
          {serviceCards.map(([name, cpu, memory, traffic, tone]) => (
            <article key={name}><header><span><i className={tone} />{name}</span><b>Healthy</b></header><div className="dark-service-card-body"><FontAwesomeIcon name="server" size={31} /><dl><div><dt>CPU</dt><dd>{cpu}</dd></div><div><dt>Memory</dt><dd>{memory}</dd></div><div><dt>RPS</dt><dd>{traffic}</dd></div></dl><div className={`dark-sparkline is-${tone}`} aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div></div></article>
          ))}
        </section>
      </section>
      {renderTab("dossier-content-dark-tech")}
    </div>
  );
}
