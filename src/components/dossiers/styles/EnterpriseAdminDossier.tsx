import { FontAwesomeIcon } from "../../icons/FontAwesomeIcon";
import type { DossierRendererProps } from "../types";

const enterpriseAsset = "/style-assets/enterprise/enterprise-admin-data-grid.png";

const queueRows = [
  { account: "Northwind Ops", status: "Needs approval", owner: "Lina Tran", risk: "Billing mismatch", selected: true },
  { account: "Greenline Retail", status: "Pending review", owner: "Marcus Lee", risk: "Policy conflict", selected: true },
  { account: "Atlas Health", status: "Healthy", owner: "Diana Pham", risk: "No blocker", selected: false },
  { account: "Summit Logistics", status: "Escalated", owner: "Harper Vo", risk: "Manual verification", selected: false },
  { account: "Harbor Finance", status: "Healthy", owner: "Nina Ho", risk: "No blocker", selected: false },
  { account: "FieldCore APAC", status: "Pending review", owner: "Ethan Bui", risk: "Owner confirmation", selected: false },
  { account: "Cinder Manufacturing", status: "Needs approval", owner: "Maya Tran", risk: "Threshold override", selected: false },
  { account: "Beacon Services", status: "Escalated", owner: "Owen Le", risk: "SLA breach risk", selected: false },
];

const auditEvents = [
  "Policy settings updated 12m ago",
  "Queue exported for finance review",
  "Ownership reassigned to Ops East",
];

export function EnterpriseAdminDossier({ renderTab, style }: DossierRendererProps) {
  const fitLabels = [
    { label: "Approval queue", value: "32 open" },
    { label: "Healthy accounts", value: "184" },
    { label: "Escalations", value: "7 active" },
    { label: "Median resolve", value: "1h 24m" },
  ];

  const exampleModules = [
    {
      title: "Queue control",
      summary: "Filter bar, explicit selection, and status-first rows for scan speed.",
      metric: "32 open",
      accent: "Operations",
    },
    {
      title: "Settings panel",
      summary: "Labels, helper text, and one error state make the workflow legible.",
      metric: "1 unresolved",
      accent: "Policy",
    },
    {
      title: "Audit trail",
      summary: "Tight timestamps and event rows keep the control room accountable.",
      metric: "3 events",
      accent: "Review",
    },
  ];

  return (
    <div className="enterprise-admin-dossier-layout">
      <section className="enterprise-admin-main" aria-label="Enterprise Admin coded UI sample">
        <header className="enterprise-admin-topbar">
          <div className="enterprise-admin-hero-copy">
            <span>Dense operational mode</span>
            <h3>{style.name}</h3>
            <p>
              This layout emphasizes filters, tables, KPI strips, and settings controls. The local data-grid backdrop keeps the
              control-room mood visible while the UI stays readable and compact.
            </p>

            {/* <div className="enterprise-admin-hero-meta" aria-label="Enterprise Admin summary metrics">
              <article>
                <span>Role</span>
                <strong>{style.classification.replace(/-/g, " ")}</strong>
              </article>
              <article>
                <span>Layout</span>
                <strong>Queue + inspector</strong>
              </article>
              <article>
                <span>Density</span>
                <strong>{style.tokenRecipe.density}</strong>
              </article>
            </div> */}
          </div>
        </header>

        <section className="enterprise-admin-kpis" aria-label="Enterprise Admin KPI row">
          {fitLabels.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <em>{style.recommendedFor[0] ?? "Dashboard"} fit</em>
            </article>
          ))}
        </section>

        <section className="enterprise-admin-toolbar" aria-label="Enterprise Admin filters">
          <label className="enterprise-admin-search">
            <FontAwesomeIcon name="magnifying-glass" size={15} />
            <input readOnly tabIndex={-1} value="Search records" />
          </label>

          <button className="enterprise-admin-filter" type="button" tabIndex={-1}>
            <FontAwesomeIcon name="bars-filter" size={15} />
            <span>Apply filters</span>
            <FontAwesomeIcon name="chevron-down" size={12} />
          </button>

          <button className="enterprise-admin-filter" type="button" tabIndex={-1}>
            <FontAwesomeIcon name="building" size={15} />
            <span>Operations</span>
            <FontAwesomeIcon name="chevron-down" size={12} />
          </button>

          <button className="enterprise-admin-filter" type="button" tabIndex={-1}>
            <FontAwesomeIcon name="users" size={15} />
            <span>Pending review</span>
            <FontAwesomeIcon name="chevron-down" size={12} />
          </button>

          <div className="enterprise-admin-toolbar-meta">
            <span className="is-live">Healthy</span>
            <button className="enterprise-admin-icon-button" type="button" tabIndex={-1} aria-label="Notifications sample">
              <FontAwesomeIcon name="bell" size={15} />
            </button>
            <button className="enterprise-admin-icon-button" type="button" tabIndex={-1} aria-label="Settings sample">
              <FontAwesomeIcon name="gear" size={15} />
            </button>
          </div>

		  <div className="enterprise-admin-actions">
            <button className="enterprise-admin-secondary" type="button" tabIndex={-1}>
              <FontAwesomeIcon name="download" size={15} />
              <span>Export report</span>
            </button>
            <button className="enterprise-admin-primary" type="button" tabIndex={-1}>
              <FontAwesomeIcon name="circle-check" size={15} />
              <span>Assign owner</span>
            </button>
          </div>
        </section>

        <div className="enterprise-admin-content">
          <section className="enterprise-admin-table-panel" aria-label="Enterprise review queue sample">
            <div className="enterprise-admin-panel-head">
              <div className="enterprise-admin-tabs" role="tablist" aria-label="Queue sample tabs">
                {["Queue", "Reviews", "Audit log"].map((tab, index) => (
                  <button className={index === 0 ? "is-active" : ""} key={tab} type="button" tabIndex={-1}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="enterprise-admin-bulkbar">
                <span>2 selected</span>
                <button type="button" tabIndex={-1}>
                  Resolve selected
                </button>
                <button type="button" tabIndex={-1}>
                  Escalate
                </button>
              </div>
            </div>

            <div className="enterprise-admin-table">
              <div className="enterprise-admin-table-head">
                <span />
                <span>Account</span>
                <span>Status</span>
                <span>Owner</span>
                <span>Risk</span>
              </div>

              {queueRows.map((row) => (
                <div className={`enterprise-admin-row ${row.selected ? "is-selected" : ""}`} key={row.account}>
                  <span className={`enterprise-admin-check ${row.selected ? "is-checked" : ""}`} aria-hidden="true" />
                  <strong>{row.account}</strong>
                  <em className={`enterprise-admin-status ${row.status.toLowerCase().replace(/\s+/g, "-")}`}>{row.status}</em>
                  <span>{row.owner}</span>
                  <span>{row.risk}</span>
                </div>
              ))}
            </div>

            <div className="enterprise-admin-footer-note">
              <FontAwesomeIcon name="circle-exclamation" size={15} />
              <p>Retry sync is blocked until the policy owner field is resolved for Greenline Retail.</p>
            </div>
          </section>

          <aside className="enterprise-admin-inspector" aria-label="Enterprise settings inspector sample">
            <div className="enterprise-admin-inspector-head">
              <span>Policy settings</span>
              <strong>Northwind Ops</strong>
            </div>

            <div className="enterprise-admin-fields">
              <label>
                <span>Queue status</span>
                <button type="button" tabIndex={-1}>
                  Pending review
                  <FontAwesomeIcon name="chevron-down" size={12} />
                </button>
              </label>

              <label>
                <span>Owner</span>
                <button type="button" tabIndex={-1}>
                  Lina Tran
                  <FontAwesomeIcon name="chevron-down" size={12} />
                </button>
              </label>

              <label className="has-error">
                <span>Due date</span>
                <input readOnly tabIndex={-1} value="Required before retry sync" />
                <small>Needs approval before the record can move back to Healthy.</small>
              </label>
            </div>

            <div className="enterprise-admin-toggles">
              <article>
                <div>
                  <strong>Escalate finance review</strong>
                  <p>Required when billing mismatches exceed threshold.</p>
                </div>
                <span className="enterprise-admin-toggle is-on" aria-hidden="true" />
              </article>

              <article>
                <div>
                  <strong>Auto retry sync</strong>
                  <p>Disabled while the due date remains unresolved.</p>
                </div>
                <span className="enterprise-admin-toggle" aria-hidden="true" />
              </article>
            </div>

            <div className="enterprise-admin-audit">
              <div className="enterprise-admin-inspector-head">
                <span>Audit log</span>
                <strong>Latest events</strong>
              </div>

              <ul>
                {auditEvents.map((item) => (
                  <li key={item}>
                    <FontAwesomeIcon name="file-lines" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="enterprise-admin-example-board" aria-label="Enterprise Admin visual examples">
        {exampleModules.map((module) => (
          <article className="enterprise-admin-example-card" key={module.title}>
            <div className="enterprise-admin-example-head">
              <span>{module.accent}</span>
              <strong>{module.metric}</strong>
            </div>
            <h4>{module.title}</h4>
            <p>{module.summary}</p>
            <div className="enterprise-admin-example-mini" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </article>
        ))}
      </section>

      {renderTab("dossier-content-enterprise")}
    </div>
  );
}
