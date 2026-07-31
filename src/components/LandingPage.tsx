import { designStyles } from "../data/designStyles";
import { type AppRoutePath } from "../routing/routes";
import { FontAwesomeIcon, type FontAwesomeIconName } from "./icons/FontAwesomeIcon";

type LandingPageProps = { onNavigate: (path: AppRoutePath) => void };

type Direction = {
  id: string;
  asset: string;
  label: string;
};

const directions: Direction[] = [
  {
    id: "modern-saas",
    asset: "/style-assets/modern-saas/modern-saas-product-gradient-frame.png",
    label: "Product systems",
  },
  {
    id: "minimal-clean",
    asset: "/style-assets/minimal/minimal-clean-paper-desk.png",
    label: "Clarity first",
  },
  {
    id: "glassmorphism",
    asset: "/style-assets/glass/glass-forest-backdrop.png",
    label: "Layered depth",
  },
  {
    id: "neo-brutalism",
    asset: "/style-assets/neo-brutal/neo-brutal-poster-texture.png",
    label: "Graphic expression",
  },
  {
    id: "flat-design",
    asset: "/style-assets/flat/flat-design-dossier-layout-b-teal.png",
    label: "Direct interaction",
  },
  {
    id: "web20-gloss",
    asset: "/style-assets/web20/web20-gloss-layout-option-b-eco-tech-promo.png",
    label: "Optimistic gloss",
  },
];

const lenses: Array<{ icon: FontAwesomeIconName; title: string; text: string }> = [
  {
    icon: "heart",
    title: "Aesthetics",
    text: "Visual language, brand expression, composition, and the emotional tone of an interface.",
  },
  {
    icon: "users",
    title: "Usability",
    text: "Learnability, interaction clarity, information hierarchy, and efficiency for real users.",
  },
  {
    icon: "circle-check",
    title: "Accessibility",
    text: "Contrast, readability, input affordances, motion, and support for diverse needs.",
  },
  {
    icon: "code-branch",
    title: "Implementation",
    text: "Component complexity, token strategy, responsive behavior, and maintenance cost.",
  },
  {
    icon: "rocket",
    title: "Product Fit",
    text: "Alignment with product goals, audience expectations, content density, and market context.",
  },
];

const comparisons = [
  { icon: "heart" as const, label: "Aesthetics", modern: 4.2, glass: 4.6 },
  { icon: "users" as const, label: "Usability", modern: 4.6, glass: 4.0 },
  { icon: "circle-check" as const, label: "Accessibility", modern: 4.4, glass: 3.6 },
  { icon: "code-branch" as const, label: "Implementation", modern: 4.3, glass: 3.1 },
  { icon: "rocket" as const, label: "Product Fit", modern: 4.5, glass: 4.2 },
];

const timeline = [
  {
    label: "Skeuomorphism",
    period: "2005-2010",
    asset: "/style-assets/skeuomorphic/skeuomorphic-paper-texture.png",
  },
  {
    label: "Flat Design",
    period: "2011-2014",
    asset: "/style-assets/flat/flat-design-dossier-layout-b.png",
  },
  {
    label: "Material Design",
    period: "2015-2018",
    asset: "/style-assets/material-fluent/material-fluent-surface-stack.png",
  },
  {
    label: "Modern Interfaces",
    period: "2019-2022",
    asset: "/style-assets/modern-saas/modern-saas-product-gradient-frame.png",
  },
  {
    label: "Liquid Glass",
    period: "2023+",
    asset: "/style-assets/glass/glass-forest-backdrop.png",
  },
];

function ActionIcon() {
  return <FontAwesomeIcon name="arrow-up-right-from-square" size={13} />;
}

function Dots({ score }: { score: number }) {
  const active = Math.round(score);
  return (
    <span className="landing-rating" aria-label={`${score} out of 5`}>
      {[1, 2, 3, 4, 5].map((item) => (
        <i className={item <= active ? "is-active" : ""} key={item} />
      ))}
    </span>
  );
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const featuredDirections = directions
    .map((direction) => {
      const style = designStyles.find((item) => item.id === direction.id);
      return style ? { ...direction, style } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <main className="landing-page" id="top">
      <header className="landing-nav">
        <button className="landing-brand" onClick={() => onNavigate("/")} type="button">
          <span aria-hidden="true">UI</span>
          <strong>Interface Style Research</strong>
        </button>
        <nav aria-label="Landing navigation">
          <a href="#directions">Directions</a>
          <a href="#methodology">Methodology</a>
          <a href="#compare">Compare</a>
          <a href="#history">Visual History</a>
          <a href="#about">About</a>
        </nav>
        <button className="landing-button is-compact" onClick={() => onNavigate("/styles")} type="button">
          Explore Styles
        </button>
      </header>

      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">Interface style research</p>
          <h1 id="landing-title">
            <span className="is-ink">Understand. Compare.</span>
            <span>Choose better UI directions.</span>
          </h1>
          <p className="landing-hero-intro">
            A visual research system exploring how interface styles differ in aesthetics, usability,
            accessibility, implementation, and product fit.
          </p>
          <div className="landing-actions">
            <button className="landing-button" onClick={() => onNavigate("/styles")} type="button">
              Explore Styles <ActionIcon />
            </button>
            <a className="landing-button is-secondary" href="#compare">
              Compare Styles
            </a>
          </div>
        </div>

        <div className="landing-hero-specimens" aria-label="Selected interface style references">
          <figure className="landing-specimen-main">
            <img
              alt="Modern SaaS interface reference"
              fetchPriority="high"
              src="/style-assets/modern-saas/modern-saas-product-gradient-frame.png"
            />
            <figcaption>
              <span>Modern SaaS</span>
              <small>Product system reference</small>
            </figcaption>
          </figure>
          <figure className="landing-specimen-side is-glass">
            <img alt="Glassmorphism interface reference" src="/style-assets/glass/glass-forest-backdrop.png" />
            <figcaption>Glassmorphism</figcaption>
          </figure>
          <figure className="landing-specimen-side is-brutal">
            <img
              alt="Neo Brutalism interface reference"
              src="/style-assets/neo-brutal/neo-brutal-poster-texture.png"
            />
            <figcaption>Neo Brutalism</figcaption>
          </figure>
        </div>
      </section>

      <aside className="landing-index" aria-label="Research scope">
        <div><strong>13</strong><span>UI directions</span></div>
        <div><strong>5</strong><span>research lenses</span></div>
        <div><strong>1</strong><span>visual history</span></div>
        <p>Built to support early product decisions, design critiques, and implementation planning.</p>
      </aside>

      <section className="landing-directions landing-section" id="directions">
        <header className="landing-section-heading">
          <p className="landing-eyebrow">Style catalog</p>
          <h2>Explore interface directions as complete systems.</h2>
          <p>Each dossier connects visual principles to tokens, interaction patterns, accessibility, and product fit.</p>
        </header>

        <div className="landing-direction-grid">
          {featuredDirections.map(({ asset, label, style }) => (
            <article className={`landing-direction-card is-${style.id}`} key={style.id}>
              <img alt={`${style.name} interface research reference`} loading="lazy" src={asset} />
              <div>
                <small>{label}</small>
                <h3>{style.name}</h3>
                <p>{style.summary}</p>
                <button onClick={() => onNavigate("/styles")} type="button">
                  Open dossier <ActionIcon />
                </button>
              </div>
            </article>
          ))}
        </div>

        <button className="landing-text-action" onClick={() => onNavigate("/styles")} type="button">
          Explore all 13 directions <ActionIcon />
        </button>
      </section>

      <section className="landing-method landing-section" id="methodology">
        <header className="landing-section-heading">
          <p className="landing-eyebrow">Not just visual styles</p>
          <h2>Research every direction through five practical lenses.</h2>
          <p>The same framework is applied to every style, so visual appeal never becomes the only decision criterion.</p>
        </header>
        <div className="landing-lens-grid">
          {lenses.map((lens, index) => (
            <article key={lens.title}>
              <div className="landing-lens-icon">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <FontAwesomeIcon name={lens.icon} size={24} />
              </div>
              <h3>{lens.title}</h3>
              <p>{lens.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-compare landing-section" id="compare">
        <header className="landing-section-heading">
          <p className="landing-eyebrow">Compare directions</p>
          <h2>See where a style performs, and where it asks for compromise.</h2>
          <p>Compare the same research lenses side by side before committing to a visual language.</p>
        </header>

        <div className="landing-compare-layout">
          <div className="landing-compare-subjects">
            <figure>
              <img alt="Modern SaaS comparison reference" loading="lazy" src={directions[0].asset} />
              <figcaption><strong>Modern SaaS</strong><span>Clear, scalable, product-focused</span></figcaption>
            </figure>
            <span className="landing-versus">vs</span>
            <figure>
              <img alt="Glassmorphism comparison reference" loading="lazy" src={directions[2].asset} />
              <figcaption><strong>Glassmorphism</strong><span>Expressive, layered, atmosphere-led</span></figcaption>
            </figure>
          </div>

          <div className="landing-score-matrix">
            <div className="landing-score-head">
              <span>Research lens</span><strong>Modern SaaS</strong><strong>Glassmorphism</strong>
            </div>
            {comparisons.map((item) => (
              <div className="landing-score-row" key={item.label}>
                <span><FontAwesomeIcon name={item.icon} size={16} />{item.label}</span>
                <div><strong>{item.modern.toFixed(1)}</strong><Dots score={item.modern} /></div>
                <div><strong>{item.glass.toFixed(1)}</strong><Dots score={item.glass} /></div>
              </div>
            ))}
            <button className="landing-text-action" onClick={() => onNavigate("/styles")} type="button">
              Start comparing <ActionIcon />
            </button>
          </div>
        </div>
      </section>

      <section className="landing-history landing-section" id="history">
        <header className="landing-section-heading">
          <p className="landing-eyebrow">Visual history</p>
          <h2>From Skeuomorphism to Liquid Glass.</h2>
          <p>Follow how interface aesthetics evolved, reacted to earlier movements, and adapted to new devices.</p>
        </header>
        <ol className="landing-timeline">
          {timeline.map((item) => (
            <li key={item.label}>
              <figure>
                <img alt={`${item.label} visual reference`} loading="lazy" src={item.asset} />
              </figure>
              <small>{item.period}</small>
              <strong>{item.label}</strong>
            </li>
          ))}
        </ol>
        <button className="landing-text-action" onClick={() => onNavigate("/styles")} type="button">
          Explore visual history <ActionIcon />
        </button>
      </section>

      <section className="landing-closing" id="about">
        <FontAwesomeIcon name="flask" size={28} />
        <h2>Choose with evidence, not surface preference.</h2>
        <p>Open the research workspace to inspect tokens, patterns, examples, strengths, risks, and product fit.</p>
        <button className="landing-button" onClick={() => onNavigate("/styles")} type="button">
          Enter the research workspace <ActionIcon />
        </button>
      </section>

      <footer className="landing-footer">
        <div className="landing-brand">
          <span aria-hidden="true">UI</span>
          <strong>Interface Style Research</strong>
        </div>
        <p>A continuous study of interface directions and the decisions behind them.</p>
        <nav aria-label="Footer navigation">
          <a href="#directions">Directions</a>
          <a href="#methodology">Methodology</a>
          <a href="#history">History</a>
          <a href="#top">Back to top</a>
        </nav>
      </footer>
    </main>
  );
}
