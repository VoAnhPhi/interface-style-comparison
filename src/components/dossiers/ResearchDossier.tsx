import { useState, type ReactNode } from "react";
import type { DesignStyle } from "../../data/designStyles";
import { ClaymorphismDossier } from "./styles/ClaymorphismDossier";
import { DefaultDossier } from "./styles/DefaultDossier";
import { DarkFuturisticDossier } from "./styles/DarkFuturisticDossier";
import { EditorialPortfolioDossier } from "./styles/EditorialPortfolioDossier";
import { EnterpriseAdminDossier } from "./styles/EnterpriseAdminDossier";
import { FlatDesignDossier } from "./styles/FlatDesignDossier";
import { GlassmorphismDossier } from "./styles/GlassmorphismDossier";
import { MaterialFluentDossier } from "./styles/MaterialFluentDossier";
import { MinimalCleanDossier } from "./styles/MinimalCleanDossier";
import { ModernSaaSDossier } from "./styles/ModernSaaSDossier";
import { NeoBrutalismDossier } from "./styles/NeoBrutalismDossier";
import { NeumorphismDossier } from "./styles/NeumorphismDossier";
import { SkeuomorphismDossier } from "./styles/SkeuomorphismDossier";
import { Web20GlossDossier } from "./styles/Web20GlossDossier";
import { formatClassification, type DossierRenderer, type DossierTab } from "./types";

const tabs: Array<{ id: DossierTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "tokens", label: "Tokens" },
  { id: "patterns", label: "Patterns" },
  { id: "examples", label: "Examples" },
];

const styleRendererMap: Partial<Record<string, DossierRenderer>> = {
  "modern-saas": ModernSaaSDossier,
  "minimal-clean": MinimalCleanDossier,
  "enterprise-admin": EnterpriseAdminDossier,
  "editorial-portfolio": EditorialPortfolioDossier,
  glassmorphism: GlassmorphismDossier,
  "neo-brutalism": NeoBrutalismDossier,
  "material-fluent": MaterialFluentDossier,
  neumorphism: NeumorphismDossier,
  "flat-design": FlatDesignDossier,
  skeuomorphism: SkeuomorphismDossier,
  claymorphism: ClaymorphismDossier,
  "dark-futuristic": DarkFuturisticDossier,
  "web20-gloss": Web20GlossDossier,
};

function QuickFacts({ style }: { style: DesignStyle }) {
  return (
    <div className="quick-facts">
      <article>
        <span>Best for</span>
        <p>{style.recommendedFor.slice(0, 3).join(", ")}</p>
      </article>
      <article>
        <span>Avoid for</span>
        <p>{style.avoidFor.slice(0, 2).join(", ")}</p>
      </article>
      <article>
        <span>Research note</span>
        <p>{style.summary}</p>
      </article>
      <article>
        <span>Classification</span>
        <p>{formatClassification(style)}</p>
      </article>
    </div>
  );
}

function OverviewTab({ style }: { style: DesignStyle }) {
  return (
    <div className="dossier-grid">
      <section className="read-block">
        <h3>Why it works</h3>
        <ul>
          {style.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="read-block">
        <h3>Risks</h3>
        <ul>
          {[...style.weaknesses, ...style.accessibilityRisks.slice(0, 1)].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="read-block wide">
        <h3>Use cases</h3>
        <div className="tag-cloud">
          {style.useCases.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
      {style.distinguishingSignals?.length ? (
        <section className="read-block wide">
          <h3>What makes it different</h3>
          <ul>
            {style.distinguishingSignals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function TokensTab({ style }: { style: DesignStyle }) {
  const tokenRows = [
    { label: "Typography", description: style.tokenRecipe.typography, applied: style.visualRuleUsage?.typography },
    { label: "Radius", description: style.tokenRecipe.radius, applied: style.visualRuleUsage?.radius },
    { label: "Shadow", description: style.tokenRecipe.shadow, applied: style.visualRuleUsage?.shadow },
    { label: "Border", description: style.tokenRecipe.border, applied: style.visualRuleUsage?.border },
    { label: "Spacing", description: style.tokenRecipe.spacing, applied: style.visualRuleUsage?.spacing },
    { label: "Density", description: style.tokenRecipe.density, applied: style.visualRuleUsage?.density },
    { label: "Motion", description: style.tokenRecipe.motion, applied: style.visualRuleUsage?.motion },
  ];

  return (
    <div className="tokens-view">
      <section className="token-group">
        <h3>Color roles</h3>
        {style.colorTokens?.length ? (
          <div className="color-token-list">
            {style.colorTokens.map((token) => (
              <article className="color-token-item" key={token.name}>
                <span aria-hidden="true" className="color-token-swatch" style={{ background: token.value }} />
                <div className="color-token-copy">
                  <div>
                    <strong>{token.name}</strong>
                    <code>{token.value}</code>
                  </div>
                  <p>{token.description}</p>
                  <small>Used in: {token.usage}</small>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="swatch-row">
            {style.tokenRecipe.colors.map((color) => (
              <span key={color} style={{ background: color }} title={color} />
            ))}
          </div>
        )}
      </section>

      <section className="token-group">
        <h3>Visual rules</h3>
        <dl className={`token-list ${style.visualRuleUsage ? "has-applied-values" : ""}`}>
          {tokenRows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.description}</dd>
              {row.applied ? (
                <dd className="token-applied-value">
                  <span>Used here</span>
                  <strong>{row.applied}</strong>
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
      </section>

      {style.dossierUsage?.length ? (
        <section className="token-group">
          <h3>Used in this dossier</h3>
          <div className="token-usage-list">
            {style.dossierUsage.map((item) => (
              <article key={item.label}>
                <strong>{item.label}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function PatternsTab({ style }: { style: DesignStyle }) {
  return (
    <div className="patterns-view">
      <section>
        <h3>Common patterns</h3>
        <ol>
          {style.commonPatterns.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
      <section>
        <h3>Style anatomy</h3>
        <ol>
          {style.characteristics.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function ExamplesTab({ style }: { style: DesignStyle }) {
  const exampleGroups = [
    ["Real-world references", style.realWorldExamples],
    ["Component examples", style.componentExamples],
    ["Layout examples", style.layoutExamples],
  ] as const;

  return (
    <div className="examples-view">
      {exampleGroups.map(([title, examples]) => (
        <section key={title}>
          <h3>{title}</h3>
          <div className="example-list">
            {examples.map((example) => (
              <article key={example.label}>
                <strong>{example.label}</strong>
                <p>{example.detail}</p>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="example-guidance">
        <div>
          <h3>Do</h3>
          <ul>
            {style.doDont.do.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Don't</h3>
          <ul>
            {style.doDont.dont.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h3>Implementation notes</h3>
        <ul className="implementation-list">
          {style.implementationNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function TabContent({ className = "", style }: { className?: string; style: DesignStyle }) {
  const sectionContent: Record<DossierTab, ReactNode> = {
    overview: <OverviewTab style={style} />,
    tokens: <TokensTab style={style} />,
    patterns: <PatternsTab style={style} />,
    examples: <ExamplesTab style={style} />,
  };

  return (
    <div className={`dossier-content dossier-content-stacked ${className}`}>
      {tabs.map((tab) => (
        <section className={`dossier-section dossier-section-${tab.id}`} id={`dossier-${style.id}-${tab.id}`} key={tab.id}>
          <h3 className="dossier-section-title">{tab.label}</h3>
          {sectionContent[tab.id]}
        </section>
      ))}
    </div>
  );
}

export function ResearchDossier({ activeMode, style }: { activeMode: "fast" | "deep" | "compare"; style: DesignStyle }) {
  const [activeTab, setActiveTab] = useState<DossierTab>("overview");
  const visibleTab = activeMode === "compare" ? "tokens" : activeTab;
  const renderTab = (className?: string) => <TabContent className={className} style={style} />;
  const Renderer = styleRendererMap[style.id] ?? DefaultDossier;

  const handleTabClick = (tabId: DossierTab) => {
    setActiveTab(tabId);
    const target = document.getElementById(`dossier-${style.id}-${tabId}`);
    if (!target) return;

    const headerOffset = window.matchMedia("(max-width: 640px)").matches ? 174 : 136;
    window.scrollTo({
      behavior: "smooth",
      top: target.getBoundingClientRect().top + window.scrollY - headerOffset,
    });
  };

  return (
    <section className={`dossier-panel dossier-style-${style.id}`} aria-labelledby="dossier-title">
      <div className="dossier-header">
        <div>
          <p>Research dossier</p>
          <h2 id="dossier-title">{style.name}</h2>
        </div>
        <div className="style-tags">
          {style.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <QuickFacts style={style} />

      <div className="dossier-tabs" role="tablist" aria-label="Dossier sections">
        {tabs.map((tab) => (
          <button
            aria-selected={visibleTab === tab.id}
            className={visibleTab === tab.id ? "is-active" : ""}
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Renderer renderTab={renderTab} style={style} visibleTab={visibleTab} />
    </section>
  );
}
