import { useState } from "react";
import { FontAwesomeIcon } from "../../icons/FontAwesomeIcon";
import type { DossierRendererProps } from "../types";

const sparklinePoints = [
  "2,22 13,21 23,15 35,18 47,9 58,17 70,5 82,7 94,2",
  "2,23 14,19 26,20 38,12 50,15 62,5 74,18 86,10 94,3",
  "2,17 14,20 26,14 38,10 50,16 62,22 74,12 86,15 94,4",
  "2,13 14,9 26,15 38,12 50,21 62,7 74,19 86,18 94,9",
];

function Sparkline({ index }: { index: number }) {
  return (
    <svg className={`modern-reference-spark spark-${index + 1}`} viewBox="0 0 96 26" aria-hidden="true" preserveAspectRatio="none">
      <polyline points={sparklinePoints[index]} />
    </svg>
  );
}

function ModernSaaSWorkspace({ style }: Pick<DossierRendererProps, "style">) {
  const [activeSection, setActiveSection] = useState("Overview");
  const dashboardNavigation = [
    { icon: "rocket" as const, label: "Overview" },
    { icon: "arrows-rotate" as const, label: "Analytics" },
    { icon: "file-lines" as const, label: "Projects" },
    { icon: "users" as const, label: "Users" },
    { icon: "building" as const, label: "Billing" },
    { icon: "database" as const, label: "Integrations" },
    { icon: "gear" as const, label: "Settings" },
  ];
  const metrics = [
    { label: "Revenue", value: "$168,430", change: "Up 12.6%", tone: "positive" },
    { label: "Active users", value: "24,850", change: "Up 8.2%", tone: "positive" },
    { label: "Subscriptions", value: "1,245", change: "Up 4.1%", tone: "positive" },
    { label: "Churn rate", value: "2.45%", change: "Down 0.6%", tone: "caution" },
  ];
  const integrations = [
    { icon: "database" as const, label: "Payments" },
    { icon: "shield" as const, label: "Auth" },
    { icon: "file-lines" as const, label: "Email" },
    { icon: "cube" as const, label: "Storage" },
    { icon: "code-branch" as const, label: "Webhooks" },
  ];
  const workflow = ["Connect", "Sync", "Process", "Deploy"];
  const insightCards = [
    { icon: "circle-check" as const, title: "Why it works", points: style.strengths.slice(0, 5), tone: "success" },
    { icon: "triangle-exclamation" as const, title: "Risks", points: style.weaknesses.slice(0, 3), tone: "warning" },
    { icon: "code-branch" as const, title: "Implementation notes", points: style.implementationNotes.slice(0, 4), tone: "info" },
  ];

  return (
    <section className="modern-reference-dashboard" aria-label="Modern SaaS code-native dashboard">
      <aside className="modern-reference-nav" aria-label="Dashboard navigation">
        <span className="modern-reference-app-mark"><FontAwesomeIcon name="cube" size={16} /></span>
        <nav>
          {dashboardNavigation.map((item) => (
            <button aria-pressed={activeSection === item.label} key={item.label} onClick={() => setActiveSection(item.label)} type="button">
              <FontAwesomeIcon name={item.icon} size={13} /><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="modern-reference-profile" type="button"><FontAwesomeIcon name="user" size={13} /><span>Product Manager</span><FontAwesomeIcon name="chevron-down" size={11} /></button>
      </aside>

      <main className="modern-reference-main">
        <header className="modern-reference-main-head"><strong>{activeSection}</strong><div><button type="button">May 12 - Jun 11</button><button type="button">Export</button></div></header>
        <section className="modern-reference-metrics" aria-label="Key performance metrics">
          {metrics.map((metric, index) => <article key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><em className={metric.tone}>{metric.change}</em><Sparkline index={index} /></article>)}
        </section>
        <div className="modern-reference-analytics">
          <section aria-label="Usage chart"><header><strong>Usage</strong><span><i /> Active Users <i /> New Users</span></header><div className="modern-reference-usage-plot"><div className="modern-reference-y-axis" aria-hidden="true"><span>30K</span><span>20K</span><span>10K</span><span>0</span></div><div><div className="modern-reference-line-chart" aria-label="Active and new users trend from May 12 to June 9"><svg viewBox="0 0 260 94" aria-hidden="true" preserveAspectRatio="none"><polyline className="modern-reference-active-line" points="0,65 15,55 30,62 45,52 60,42 75,55 90,48 105,35 120,44 135,31 150,38 165,28 180,36 195,20 210,28 225,18 240,24 260,12" /><polyline className="modern-reference-new-line" points="0,84 15,74 30,80 45,70 60,74 75,65 90,77 105,64 120,69 135,55 150,67 165,59 180,63 195,51 210,59 225,45 240,50 260,39" /></svg></div><div className="modern-reference-x-axis" aria-hidden="true"><span>May 12</span><span>May 19</span><span>May 26</span><span>Jun 2</span><span>Jun 9</span></div></div></div></section>
          <section aria-label="Top features"><header><strong>Top Features</strong></header><div className="modern-reference-feature-mix"><div><p><i />Analytics <strong>42%</strong></p><p><i />Reports <strong>28%</strong></p><p><i />Automation <strong>17%</strong></p><p><i />Integrations <strong>13%</strong></p></div><span aria-hidden="true" /></div></section>
        </div>
        <section className="modern-reference-integrations" aria-label="Dashboard integrations"><header><strong>Integrations</strong><button type="button">View all</button></header><div>{integrations.map((item) => <article key={item.label}><FontAwesomeIcon name={item.icon} size={13} /><span>{item.label}</span><em>Active</em></article>)}<button type="button"><FontAwesomeIcon name="plus" size={13} /> Add new</button></div></section>
        <section className="modern-reference-workflow" aria-label="Dashboard workflow"><header><strong>Workflow</strong></header><div>{workflow.map((item, index) => <article key={item}><span>{index + 1}</span><strong>{item}</strong><em>{index === 0 ? "Data source" : index === 1 ? "In progress" : index === 2 ? "Queued" : "Pending"}</em></article>)}</div></section>
      </main>

      <aside className="modern-reference-insights" aria-label="Modern SaaS insights">
        {insightCards.map((card) => <section className={`modern-reference-insight is-${card.tone}`} key={card.title}><header><FontAwesomeIcon name={card.icon} size={18} /><strong>{card.title}</strong></header><ul>{card.points.map((point) => <li key={point}>{point}</li>)}</ul></section>)}
      </aside>
    </section>
  );
}

function ModernSaaSExampleBoard({ style }: Pick<DossierRendererProps, "style">) {
  return (
    <section className="modern-saas-example-board" aria-label="Modern SaaS visual examples">
      <article className="modern-example-card is-primary">
        <span>Primary action</span>
        <button type="button">Start workspace</button>
      </article>
      <article className="modern-example-card">
        <span>Secondary action</span>
        <button className="is-secondary" type="button">
          View docs
        </button>
      </article>
      <article className="modern-example-card">
        <span>Status badge</span>
        <strong>{style.realWorldExamples[0]?.label ?? "SaaS benchmark"}</strong>
        <em>Polished, calm, product-led</em>
      </article>
      <article className="modern-example-card is-wide">
        <span>Component recipe</span>
        <p>{style.componentExamples[0]?.detail}</p>
      </article>
    </section>
  );
}

export function ModernSaaSDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="modern-saas-dossier-layout">
      <section className="modern-saas-hero-panel">
        <ModernSaaSWorkspace style={style} />
      </section>

      {renderTab("dossier-content-modern-saas")}
      <ModernSaaSExampleBoard style={style} />
    </div>
  );
}
