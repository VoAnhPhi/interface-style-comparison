import { FontAwesomeIcon } from "../../icons/FontAwesomeIcon";
import { formatClassification, type DossierRendererProps } from "../types";

const editorialAssets = {
  hero: "/style-assets/editorial/editorial-furniture-02.jpg",
  gallery: [
    {
      title: "Custom furniture collection",
      image: "/style-assets/editorial/editorial-furniture-04.jpg",
    },
    {
      title: "Material exploration",
      image: "/style-assets/editorial/editorial-furniture-05.jpg",
    },
    {
      title: "Process and craft",
      image: "/style-assets/editorial/editorial-furniture-01.jpg",
    },
  ],
  footer: "/style-assets/editorial/editorial-furniture-03.jpg",
} as const;

const projectFacts = [
  { label: "Project", value: "Arquetype website" },
  { label: "Industry", value: "Furniture design" },
  { label: "Duration", value: "12 weeks" },
  { label: "Team", value: "Studio Mono" },
  { label: "Tools", value: "Figma, Webflow" },
  { label: "Deliverables", value: "Brand identity, website, photography" },
] as const;

const journalEntries = [
  "Thoughts on material and time",
  "The details no one sees",
  "Building a brand with depth",
] as const;

export function EditorialPortfolioDossier({ renderTab, style }: DossierRendererProps) {
  return (
    <div className="dossier-editorial-layout">
      <section className="editorial-showcase">
        <div className="editorial-side-image">
          <img alt="Warm minimal furniture interior with soft daylight." src={editorialAssets.hero} />
        </div>

        <div className="editorial-main-column">
          <header className="editorial-header-bar">
            <span className="editorial-case-pill">Case study</span>
            <div className="editorial-header-meta">
              <article>
                <span>Client</span>
                <strong>Arquetype</strong>
              </article>
              <article>
                <span>Year</span>
                <strong>2024</strong>
              </article>
              <article>
                <span>Services</span>
                <strong>Branding, digital</strong>
              </article>
              <article>
                <span>Role</span>
                <strong>Art direction</strong>
              </article>
            </div>
          </header>

          <section className="editorial-hero">
            <div className="editorial-hero-copy">
              <span>{formatClassification(style)}</span>
              <h3>
                Design that feels <em>inevitable.</em>
              </h3>
              <p>
                A branding and digital experience for Arquetype, a contemporary furniture studio rooted in material
                honesty and calm detail.
              </p>
              <button type="button">
                <span>View project</span>
                <FontAwesomeIcon name="arrow-up-right-from-square" size={15} />
              </button>
            </div>

            <aside className="editorial-project-facts">
              {projectFacts.map((fact) => (
                <article key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </article>
              ))}
            </aside>
          </section>

          <section className="editorial-gallery-band" aria-label="Editorial portfolio gallery">
            <article className="editorial-gallery-quote">
              <strong>The quiet power of well-made things.</strong>
              <span>Arquetype manifesto</span>
            </article>

            {editorialAssets.gallery.map((item) => (
              <article key={item.title} className="editorial-gallery-card">
                <img alt={item.title} src={item.image} />
                <div>
                  <p>{item.title}</p>
                </div>
              </article>
            ))}
          </section>

          <footer className="editorial-footer">
            <article className="editorial-footer-copy">
              <span>/ Approach</span>
              <strong>{style.feeling.join(" / ")}</strong>
              <p>
                We crafted a visual language that balances architectural rigor with emotional warmth. Every detail is
                intentional, every material chosen for longevity.
              </p>
              <button type="button">
                <span>Read the full story</span>
                <FontAwesomeIcon name="arrow-up-right-from-square" size={15} />
              </button>
            </article>

            <article className="editorial-footer-image">
              <img alt="Minimal furniture vignette." src={editorialAssets.footer} />
            </article>

            <article className="editorial-footer-journal">
              <span>/ Journal</span>
              <ul>
                {journalEntries.map((entry, index) => (
                  <li key={entry}>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <p>{entry}</p>
                    <FontAwesomeIcon name="arrow-up-right-from-square" size={14} />
                  </li>
                ))}
              </ul>
            </article>

            <article className="editorial-footer-newsletter">
              <span>/ Newsletter</span>
              <p>Reflections on design, culture, and the details that matter.</p>
              <div className="editorial-newsletter-form">
                <button type="button" className="is-ghost">
                  <span>Your email</span>
                </button>
                <button type="button" className="is-solid">
                  <span>Subscribe</span>
                </button>
              </div>
            </article>
          </footer>
        </div>
      </section>

      {renderTab("dossier-content-editorial editorial-utility-panel")}
    </div>
  );
}
