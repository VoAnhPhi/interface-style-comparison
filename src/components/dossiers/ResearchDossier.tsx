import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import type { DesignStyle } from "../../data/designStyles";
import {
  CANONICAL_SCENARIOS,
  CORE_EVALUATION_CRITERIA,
  normalizedResearchStyles,
  type CoreEvaluationCriterion,
  type ProductFit,
  type ProductType,
  type ResearchSource,
  type ResearchStyle,
  type ScenarioId,
  type SharedScenario,
  type VisualDNADimension,
} from "../../domain/research";
import { getStyleRoute } from "../../routing/routes";
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

const visualDNADimensionLabels: Record<VisualDNADimension, string> = {
  depth: "Depth",
  decoration: "Decoration",
  density: "Density",
  motion: "Motion",
  "visual-weight": "Visual weight",
  "brand-expression": "Brand expression",
  "contrast-dependency": "Contrast dependency",
  "surface-complexity": "Surface complexity",
};

const evaluationLabels: Record<CoreEvaluationCriterion, string> = {
  usability: "Usability",
  accessibility: "Accessibility",
  "implementation-complexity": "Implementation complexity",
  scalability: "Scalability",
  "information-density": "Information density",
  "visual-expression": "Visual expression",
};

const productTypeLabels: Record<ProductType, string> = {
  "saas-product": "SaaS product",
  "dashboard-admin": "Dashboard / admin",
  "marketing-landing": "Marketing landing",
  portfolio: "Portfolio",
  ecommerce: "E-commerce",
  documentation: "Documentation",
  "content-platform": "Content platform",
  "consumer-product": "Consumer product",
  "enterprise-system": "Enterprise system",
  "experimental-experience": "Experimental experience",
};

function formatResearchLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isDefined<Value>(value: Value | undefined): value is Value {
  return value !== undefined;
}

function getCanonicalScenarios(researchStyle: ResearchStyle): SharedScenario[] {
  return researchStyle.scenarioIds
    .map((scenarioId: ScenarioId) => CANONICAL_SCENARIOS.find(({ id }) => id === scenarioId))
    .filter(isDefined);
}

function ResearchStatus({ researchStyle }: { researchStyle: ResearchStyle }) {
  return (
    <div className="normalized-status-list" aria-label="Research record status">
      <span>{formatResearchLabel(researchStyle.maturity)}</span>
      <span>{formatResearchLabel(researchStyle.productionReadiness)}</span>
      <span>{researchStyle.eras.join(" / ")}</span>
      <span>{formatResearchLabel(researchStyle.review.contentStatus)}</span>
    </div>
  );
}

function NormalizedOverview({ researchStyle }: { researchStyle: ResearchStyle }) {
  return (
    <div className="normalized-overview-grid">
      <article className="normalized-card normalized-card-featured">
        <span className="normalized-card-kicker">Definition</span>
        <p>{researchStyle.definition.text}</p>
        <small>Research claim: {researchStyle.definition.claimId}</small>
      </article>
      <article className="normalized-card">
        <span className="normalized-card-kicker">Core philosophy</span>
        <ul className="normalized-list">
          {researchStyle.principles.map((principle) => (
            <li key={principle.id}>{principle.text}</li>
          ))}
        </ul>
      </article>
      <article className="normalized-card">
        <span className="normalized-card-kicker">What makes it distinct</span>
        <ul className="normalized-list">
          {researchStyle.distinguishingSignals.map((signal) => (
            <li key={signal.id}>{signal.text}</li>
          ))}
        </ul>
      </article>
      <article className="normalized-card normalized-card-status">
        <span className="normalized-card-kicker">Research status</span>
        <ResearchStatus researchStyle={researchStyle} />
        <small>Updated {researchStyle.version.updatedAt}</small>
      </article>
    </div>
  );
}

function NormalizedVisualDNA({ researchStyle }: { researchStyle: ResearchStyle }) {
  return (
    <div className="normalized-dna-grid">
      {(Object.keys(visualDNADimensionLabels) as VisualDNADimension[]).map((dimension) => {
        const signal = researchStyle.visualDNA[dimension];

        return (
          <article className="normalized-dna-card" key={dimension}>
            <div className="normalized-dna-heading">
              <span>{visualDNADimensionLabels[dimension]}</span>
              <strong>{formatResearchLabel(signal.level)}</strong>
            </div>
            <p>{signal.reason}</p>
            <small>Claim: {signal.claimId}</small>
          </article>
        );
      })}
    </div>
  );
}

function NormalizedImplementation({ researchStyle, style }: { researchStyle: ResearchStyle; style: DesignStyle }) {
  const tokens = [
    ["Color", style.colorTokens?.map(({ value }) => value).join(" / ") || style.tokenRecipe.colors.join(" / ")],
    ["Typography", style.tokenRecipe.typography],
    ["Surface", "Defined by the local renderer surface"],
    ["Radius", style.tokenRecipe.radius],
    ["Border", style.tokenRecipe.border],
    ["Shadow", style.tokenRecipe.shadow],
    ["Spacing", style.tokenRecipe.spacing],
    ["Motion", style.tokenRecipe.motion],
  ];

  return (
    <div className="normalized-implementation-grid">
      <article className="normalized-card normalized-implementation-note">
        <span className="normalized-card-kicker">Research → engineering</span>
        <p>
          This is the current local visual specimen for the normalized record. Its tokens and renderer show one
          implementation of the direction; they are not an official definition of the style.
        </p>
        <div className="normalized-implementation-meta">
          <span>Renderer: {researchStyle.legacyRenderer.rendererId}</span>
          <span>Classification: {formatResearchLabel(researchStyle.legacyRenderer.classification)}</span>
        </div>
      </article>
      <article className="normalized-card">
        <span className="normalized-card-kicker">Representative token recipe</span>
        <dl className="normalized-token-list">
          {tokens.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </article>
    </div>
  );
}

function NormalizedPatterns({ researchStyle, style }: { researchStyle: ResearchStyle; style: DesignStyle }) {
  return (
    <div className="normalized-pattern-grid">
      <article className="normalized-card">
        <span className="normalized-card-kicker">Principles in practice</span>
        <ol className="normalized-list normalized-list-numbered">
          {researchStyle.principles.map((principle) => (
            <li key={principle.id}>{principle.text}</li>
          ))}
        </ol>
      </article>
      <article className="normalized-card">
        <span className="normalized-card-kicker">Pattern signals</span>
        <ul className="normalized-list">
          {style.commonPatterns.map((pattern) => (
            <li key={pattern}>{pattern}</li>
          ))}
        </ul>
        <small>These patterns remain implementation observations during incremental migration.</small>
      </article>
    </div>
  );
}

function NormalizedDetailList({ label, values }: { label: string; values: readonly string[] }) {
  if (values.length === 0) return null;

  return (
    <div className="normalized-detail-list">
      <strong>{label}</strong>
      <ul className="normalized-list">
        {values.map((value) => <li key={value}>{value}</li>)}
      </ul>
    </div>
  );
}

function NormalizedEvidenceTrail({
  claimType,
  evidence,
}: {
  claimType: string;
  evidence: readonly string[];
}) {
  return (
    <div className="normalized-evidence-trail">
      <span>Claim type: {formatResearchLabel(claimType)}</span>
      <span>{evidence.length > 0 ? `Evidence: ${evidence.join(", ")}` : "Evidence: not recorded"}</span>
    </div>
  );
}

function NormalizedEvaluationCard({
  criterion,
  evaluation,
}: {
  criterion: CoreEvaluationCriterion;
  evaluation: ResearchStyle["evaluations"][CoreEvaluationCriterion];
}) {
  const isNotEvaluated = evaluation.level === "not-evaluated";

  return (
    <article className={`normalized-card normalized-evaluation-card${isNotEvaluated ? " is-not-evaluated" : ""}`}>
      <div className="normalized-dna-heading">
        <span>{evaluationLabels[criterion]}</span>
        <strong>{formatResearchLabel(evaluation.level)}</strong>
      </div>
      <p>{evaluation.reason}</p>
      <NormalizedDetailList label="Strengths" values={evaluation.strengths} />
      <NormalizedDetailList label="Risks" values={evaluation.risks} />
      <NormalizedDetailList label="Conditions" values={evaluation.conditions} />
      <NormalizedEvidenceTrail claimType={evaluation.claimType} evidence={evaluation.evidence} />
    </article>
  );
}

function NormalizedEvaluation({ researchStyle }: { researchStyle: ResearchStyle }) {
  return (
    <div className="normalized-evaluation-grid">
      {CORE_EVALUATION_CRITERIA.map((criterion) => (
        <NormalizedEvaluationCard
          criterion={criterion}
          evaluation={researchStyle.evaluations[criterion]}
          key={criterion}
        />
      ))}
    </div>
  );
}

function NormalizedProductFitCard({ fit }: { fit: ProductFit }) {
  const isNotEvaluated = fit.level === "not-evaluated";

  return (
    <article className={`normalized-card normalized-fit-card${isNotEvaluated ? " is-not-evaluated" : ""}`}>
      <div className="normalized-dna-heading">
        <span>{productTypeLabels[fit.productType]}</span>
        <strong>{formatResearchLabel(fit.level)}</strong>
      </div>
      <p>{fit.reason}</p>
      <NormalizedDetailList label="Strengths" values={fit.strengths} />
      <NormalizedDetailList label="Risks" values={fit.risks} />
      <NormalizedDetailList label="Conditions" values={fit.conditions} />
      <NormalizedEvidenceTrail claimType={fit.claimType} evidence={fit.evidence} />
    </article>
  );
}

function NormalizedProductFit({ researchStyle }: { researchStyle: ResearchStyle }) {
  return (
    <>
      <p className="normalized-section-note">
        Fit is contextual: these records explain conditions and evidence rather than declaring a universal winner.
      </p>
      <div className="normalized-product-fit-grid">
        {researchStyle.productFit.map((fit) => <NormalizedProductFitCard fit={fit} key={fit.productType} />)}
      </div>
    </>
  );
}

function NormalizedRelationships({ researchStyle }: { researchStyle: ResearchStyle }) {
  const relationships = researchStyle.relationships.filter(
    ({ sourceStyleId }) => sourceStyleId === researchStyle.id,
  );

  if (relationships.length === 0) {
    return (
      <article className="normalized-card normalized-empty-card">
        <span className="normalized-card-kicker">Relationship coverage</span>
        <p>No reviewed related direction is recorded for this style yet.</p>
        <small>Future relationship records will add evidence-backed dossier links here.</small>
      </article>
    );
  }

  return (
    <div className="normalized-related-grid">
      {relationships.map((relationship) => {
        const target = normalizedResearchStyles.find(({ id }) => id === relationship.targetStyleId);
        if (!target) return null;

        return (
          <article className="normalized-card normalized-related-card" key={relationship.id}>
            <div className="normalized-dna-heading">
              <span>{formatResearchLabel(relationship.type)}</span>
              <strong>{target.name}</strong>
            </div>
            <p>{relationship.explanation}</p>
            <NormalizedEvidenceTrail
              claimType={relationship.claimType}
              evidence={relationship.sourceIds}
            />
            <Link className="normalized-related-cta" to={getStyleRoute(target.slug)}>
              Open {target.name} dossier <span aria-hidden="true">→</span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

function NormalizedSourceCard({
  source,
  claims,
}: {
  source: ResearchSource;
  claims: ResearchStyle["claims"];
}) {
  const sourceClaims = claims.filter(({ sourceIds }) => sourceIds.includes(source.id));

  return (
    <article className="normalized-card normalized-source-card">
      <div className="normalized-source-heading">
        <div>
          <span className="normalized-card-kicker">{formatResearchLabel(source.type)}</span>
          <h4>{source.title}</h4>
        </div>
        <span className="normalized-source-review">{formatResearchLabel(source.review.reviewStatus)}</span>
      </div>
      <div className="normalized-source-meta">
        {source.publisher ? <span>{source.publisher}</span> : null}
        {source.retrievedAt ? <span>Retrieved {source.retrievedAt}</span> : null}
        {source.url ? <a href={source.url} rel="noreferrer" target="_blank">Open source</a> : null}
        {source.localReference ? <code>{source.localReference}</code> : null}
      </div>
      {source.notes ? <p>{source.notes}</p> : null}
      <NormalizedDetailList label="Limitations" values={source.limitations} />
      {sourceClaims.length > 0 ? (
        <div className="normalized-source-claims">
          <strong>Claims using this source</strong>
          <ul className="normalized-list">
            {sourceClaims.map((claim) => <li key={claim.id}>{claim.statement}</li>)}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

function NormalizedSources({ researchStyle }: { researchStyle: ResearchStyle }) {
  return (
    <>
      <p className="normalized-section-note">
        Sources show where the current record comes from and where its limits are. Claim text is kept alongside provenance
        so project observation and interpretation are not mistaken for universal history.
      </p>
      <div className="normalized-sources-grid">
        {researchStyle.sources.map((source) => (
          <NormalizedSourceCard claims={researchStyle.claims} key={source.id} source={source} />
        ))}
      </div>
    </>
  );
}

function NormalizedScenario({ scenario }: { scenario: SharedScenario }) {
  return (
    <article className="normalized-scenario-card">
      <div className="normalized-scenario-heading">
        <div>
          <span className="normalized-card-kicker">Shared scenario</span>
          <h4>{scenario.name}</h4>
        </div>
        <code>{scenario.id}</code>
      </div>
      <p className="normalized-scenario-goal">Goal: {scenario.userGoal}</p>
      <div className="normalized-scenario-columns">
        <div>
          <span className="normalized-card-kicker">Same content</span>
          <ul className="normalized-list">
            {scenario.content.map((item) => (
              <li key={item.id}><strong>{item.label}</strong> {item.value}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="normalized-card-kicker">Required actions</span>
          <ul className="normalized-list">
            {scenario.requiredActions.map((action) => <li key={action}>{action}</li>)}
          </ul>
        </div>
        <div>
          <span className="normalized-card-kicker">Task flow</span>
          <ol className="normalized-list normalized-list-numbered">
            {scenario.taskFlow.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>
      </div>
      <div className="normalized-scenario-structure">
        <span>Information structure: {scenario.informationStructure.join(" → ")}</span>
        <span>Semantics: {scenario.semanticStructure.join(" · ")}</span>
      </div>
    </article>
  );
}

function NormalizedDossierSections({ researchStyle, style }: { researchStyle: ResearchStyle; style: DesignStyle }) {
  const scenarios = getCanonicalScenarios(researchStyle);

  return (
    <div className="normalized-dossier" aria-label="Normalized research dossier">
      <div className="normalized-dossier-intro">
        <div>
          <span className="normalized-card-kicker">Spec 3 normalized record</span>
          <h3>Research contract</h3>
        </div>
        <p>Research facts stay separate from the visual renderer so the same direction can be compared fairly.</p>
      </div>

      <section className="normalized-section" id={`normalized-${style.id}-overview`} aria-labelledby={`normalized-${style.id}-overview-title`}>
        <div className="normalized-section-heading">
          <div>
            <span className="normalized-section-index">01</span>
            <h3 id={`normalized-${style.id}-overview-title`}>Overview</h3>
          </div>
          <span>What it is and what distinguishes it</span>
        </div>
        <NormalizedOverview researchStyle={researchStyle} />
      </section>

      <section className="normalized-section" id={`normalized-${style.id}-visual-dna`} aria-labelledby={`normalized-${style.id}-visual-dna-title`}>
        <div className="normalized-section-heading">
          <div>
            <span className="normalized-section-index">02</span>
            <h3 id={`normalized-${style.id}-visual-dna-title`}>Visual DNA</h3>
          </div>
          <span>Qualitative dimensions for comparison</span>
        </div>
        <NormalizedVisualDNA researchStyle={researchStyle} />
      </section>

      <section className="normalized-section" id={`normalized-${style.id}-implementation`} aria-labelledby={`normalized-${style.id}-implementation-title`}>
        <div className="normalized-section-heading">
          <div>
            <span className="normalized-section-index">03</span>
            <h3 id={`normalized-${style.id}-implementation-title`}>Reference implementation</h3>
          </div>
          <span>One local translation, not a universal definition</span>
        </div>
        <NormalizedImplementation researchStyle={researchStyle} style={style} />
      </section>

      <section className="normalized-section" id={`normalized-${style.id}-patterns`} aria-labelledby={`normalized-${style.id}-patterns-title`}>
        <div className="normalized-section-heading">
          <div>
            <span className="normalized-section-index">04</span>
            <h3 id={`normalized-${style.id}-patterns-title`}>Patterns</h3>
          </div>
          <span>Principles translated into reusable UI signals</span>
        </div>
        <NormalizedPatterns researchStyle={researchStyle} style={style} />
      </section>

      <section className="normalized-section" id={`normalized-${style.id}-same-context`} aria-labelledby={`normalized-${style.id}-same-context-title`}>
        <div className="normalized-section-heading">
          <div>
            <span className="normalized-section-index">05</span>
            <h3 id={`normalized-${style.id}-same-context-title`}>Same-context specimens</h3>
          </div>
          <span>Shared content, hierarchy, goal, and task flow</span>
        </div>
        <div className="normalized-scenario-grid">
          {scenarios.map((scenario) => <NormalizedScenario key={scenario.id} scenario={scenario} />)}
        </div>
      </section>

      <section className="normalized-section" id={`normalized-${style.id}-evaluation`} aria-labelledby={`normalized-${style.id}-evaluation-title`}>
        <div className="normalized-section-heading">
          <div>
            <span className="normalized-section-index">06</span>
            <h3 id={`normalized-${style.id}-evaluation-title`}>Evaluation</h3>
          </div>
          <span>Six criteria with reasons, conditions, and evidence</span>
        </div>
        <NormalizedEvaluation researchStyle={researchStyle} />
      </section>

      <section className="normalized-section" id={`normalized-${style.id}-product-fit`} aria-labelledby={`normalized-${style.id}-product-fit-title`}>
        <div className="normalized-section-heading">
          <div>
            <span className="normalized-section-index">07</span>
            <h3 id={`normalized-${style.id}-product-fit-title`}>Product fit</h3>
          </div>
          <span>Context-specific guidance, not a universal score</span>
        </div>
        <NormalizedProductFit researchStyle={researchStyle} />
      </section>

      <section className="normalized-section" id={`normalized-${style.id}-related`} aria-labelledby={`normalized-${style.id}-related-title`}>
        <div className="normalized-section-heading">
          <div>
            <span className="normalized-section-index">08</span>
            <h3 id={`normalized-${style.id}-related-title`}>Related directions</h3>
          </div>
          <span>Evidence-backed relationships and dossier CTAs</span>
        </div>
        <NormalizedRelationships researchStyle={researchStyle} />
      </section>

      <section className="normalized-section" id={`normalized-${style.id}-sources`} aria-labelledby={`normalized-${style.id}-sources-title`}>
        <div className="normalized-section-heading">
          <div>
            <span className="normalized-section-index">09</span>
            <h3 id={`normalized-${style.id}-sources-title`}>Sources</h3>
          </div>
          <span>Provenance, review status, claims, and limitations</span>
        </div>
        <NormalizedSources researchStyle={researchStyle} />
      </section>
    </div>
  );
}

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
  const researchStyle = normalizedResearchStyles.find(({ id }) => id === style.id);
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

      {researchStyle ? <NormalizedDossierSections researchStyle={researchStyle} style={style} /> : null}

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
