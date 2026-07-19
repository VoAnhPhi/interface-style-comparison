import { useId, useState } from "react";
import { FontAwesomeIcon } from "../../icons/FontAwesomeIcon";
import type { DossierRendererProps } from "../types";

type BloomTab = "explore" | "progress";

const topics = [
  { name: "Creativity", detail: "Make room for original ideas.", objectClass: "is-flower" },
  { name: "Mindset", detail: "Build focus with small rituals.", objectClass: "is-stones" },
  { name: "Productivity", detail: "Shape a rhythm that lasts.", objectClass: "is-pencil" },
  { name: "Wellbeing", detail: "Keep learning human.", objectClass: "is-cloud" },
];

const milestones = [
  { step: "01", title: "Foundations", detail: "Complete", state: "is-complete" },
  { step: "02", title: "Core concepts", detail: "In progress · 60%", state: "is-current" },
  { step: "03", title: "Apply & create", detail: "Upcoming", state: "is-upcoming" },
];

const examples = [
  { label: "Onboarding", title: "One gentle next step", detail: "A single prompt and one inflated action preserve focus during a first-run moment.", icon: "heart" as const },
  { label: "Education", title: "Lesson progress", detail: "A calm course card pairs a readable completion bar with a clearly labeled continue action.", icon: "file-lines" as const },
  { label: "Wellness", title: "Pause without friction", detail: "A low-pressure focus dial uses text and time together instead of color or depth alone.", icon: "bell" as const },
];

export function ClaymorphismDossier({ renderTab, style }: DossierRendererProps) {
  const [activeBloomTab, setActiveBloomTab] = useState<BloomTab>("explore");
  const [activeTopic, setActiveTopic] = useState(topics[0].name);
  const tabId = useId();
  const activePanel = `${tabId}-${activeBloomTab}`;

  return (
    <div className="clay-dossier-layout">
      <section className="clay-bloom-studio" aria-labelledby="clay-studio-title">
        <header className="clay-studio-topbar">
          <div className="clay-studio-brand">
            <span className="clay-brand-bloom" aria-hidden="true"><i /><i /><i /></span>
            <strong id="clay-studio-title">Bloom Studio</strong>
          </div>

          <div className="clay-bloom-tabs" role="tablist" aria-label="Bloom Studio layout states">
            <button
              aria-controls={`${tabId}-explore`}
              aria-selected={activeBloomTab === "explore"}
              className={activeBloomTab === "explore" ? "is-active" : ""}
              id={`${tabId}-explore-tab`}
              onClick={() => setActiveBloomTab("explore")}
              role="tab"
              type="button"
            >
              Explore
            </button>
            <button
              aria-controls={`${tabId}-progress`}
              aria-selected={activeBloomTab === "progress"}
              className={activeBloomTab === "progress" ? "is-active" : ""}
              id={`${tabId}-progress-tab`}
              onClick={() => setActiveBloomTab("progress")}
              role="tab"
              type="button"
            >
              Progress
            </button>
          </div>

          <button className="clay-studio-profile" type="button" aria-label="Open learner profile">
            <FontAwesomeIcon name="user" size={14} />
            <span>Profile</span>
          </button>
        </header>

        <div className="clay-bloom-workspace">
          <aside className="clay-studio-nav" aria-label="Bloom Studio sections">
            <span className="clay-nav-label">Learning space</span>
            <button className="is-active" type="button"><FontAwesomeIcon name="magnifying-glass" size={15} /><span>Discover</span></button>
            <button type="button"><FontAwesomeIcon name="file-lines" size={15} /><span>My lessons</span></button>
            <button type="button"><FontAwesomeIcon name="heart" size={15} /><span>Saved sparks</span></button>
            <button type="button"><FontAwesomeIcon name="users" size={15} /><span>Circle</span></button>
            <div className="clay-nav-root" aria-hidden="true"><i /><i /><i /></div>
          </aside>

          <main
            aria-labelledby={`${tabId}-${activeBloomTab}-tab`}
            className="clay-bloom-main"
            id={activePanel}
            role="tabpanel"
          >
            {activeBloomTab === "explore" ? (
              <section className="clay-explore-view" aria-labelledby="clay-discovery-title">
                <header className="clay-explore-heading">
                  <div>
                    <span>Learning library</span>
                    <h3 id="clay-discovery-title">Find your next spark</h3>
                  </div>
                  <label className="clay-search-field">
                    <FontAwesomeIcon name="magnifying-glass" size={14} />
                    <span className="sr-only">Search topics or skills</span>
                    <input type="search" placeholder="Search topics or skills" />
                  </label>
                </header>

                <section className="clay-discovery-hero" aria-label="Featured learning prompt">
                  <img alt="" aria-hidden="true" className="clay-hero-art" src="/style-assets/clay/clay-soft-3d-object-bloom.png" />
                  <div className="clay-hero-copy">
                    <span>Featured path</span>
                    <h4>Design beautiful learning</h4>
                    <p>Handpicked lessons for building a practice that feels clear, curious, and kind.</p>
                    <button type="button" onClick={() => setActiveBloomTab("progress")}>View learning path <b aria-hidden="true">→</b></button>
                  </div>
                  <div className="clay-hero-pages" aria-label="Featured path 1 of 3"><i className="is-active" /><i /><i /></div>
                </section>

                <section className="clay-topic-section" aria-labelledby="clay-topic-title">
                  <header>
                    <div><span>Start small</span><h4 id="clay-topic-title">Explore by topic</h4></div>
                    <p aria-live="polite">Selected: <strong>{activeTopic}</strong></p>
                  </header>
                  <div className="clay-topic-grid">
                    {topics.map((topic) => (
                      <button
                        aria-pressed={activeTopic === topic.name}
                        className={`clay-topic-card ${topic.objectClass} ${activeTopic === topic.name ? "is-selected" : ""}`}
                        key={topic.name}
                        onClick={() => setActiveTopic(topic.name)}
                        type="button"
                      >
                        <span className="clay-topic-object" aria-hidden="true"><i /><i /><i /><b /></span>
                        <strong>{topic.name}</strong>
                        <small>{topic.detail}</small>
                        <em aria-hidden="true">→</em>
                      </button>
                    ))}
                  </div>
                </section>
              </section>
            ) : (
              <section className="clay-progress-view" aria-labelledby="clay-progress-title">
                <header className="clay-progress-heading">
                  <div><span>Weekly rhythm</span><h3 id="clay-progress-title">Your learning path</h3></div>
                  <span className="clay-status-pill"><i /> 2 of 3 milestones</span>
                </header>

                <section className="clay-path-card" aria-label="Three learning milestones">
                  <div className="clay-path-line" aria-hidden="true" />
                  {milestones.map((milestone) => (
                    <article className={`clay-milestone ${milestone.state}`} key={milestone.step}>
                      <b>{milestone.step}</b>
                      <span className="clay-milestone-mark" aria-hidden="true">{milestone.state === "is-complete" ? "✓" : milestone.step}</span>
                      <strong>{milestone.title}</strong>
                      <small>{milestone.detail}</small>
                    </article>
                  ))}
                </section>

                <section className="clay-current-course" aria-labelledby="clay-course-title">
                  <span className="clay-course-object" aria-hidden="true"><i /><i /><i /></span>
                  <div>
                    <span>Current course</span>
                    <h4 id="clay-course-title">Research methods</h4>
                    <p>Design stronger studies and analyze what your audience needs with confidence.</p>
                    <div className="clay-course-progress"><i><b /></i><span>60%</span></div>
                  </div>
                  <div className="clay-course-actions">
                    <button className="clay-course-primary" type="button">Continue <b aria-hidden="true">→</b></button>
                    <button className="clay-course-secondary" type="button">View details</button>
                  </div>
                </section>

                <section className="clay-achievement-row" aria-label="Recent achievements">
                  <span>Recent achievements</span>
                  <div>
                    <b><i>★</i> 7-day streak</b>
                    <b><i>✦</i> Quiz master</b>
                    <b><i>⌁</i> Deep focus</b>
                  </div>
                </section>
              </section>
            )}
          </main>

          <aside className="clay-study-rail" aria-label="Learning support">
            {activeBloomTab === "explore" ? (
              <>
                <section className="clay-pulse-card" aria-labelledby="clay-pulse-title">
                  <header><span>Weekly view</span><button type="button" aria-label="Learning pulse options">•••</button></header>
                  <h3 id="clay-pulse-title">Learning pulse</h3>
                  <div className="clay-pulse-content">
                    <div className="clay-pulse-ring"><span>This week<strong>4.5h</strong>Learning time</span></div>
                    <ul>
                      <li><i /> Creativity <b>1.6h</b></li>
                      <li><i /> Mindset <b>1.2h</b></li>
                      <li><i /> Productivity <b>1.0h</b></li>
                      <li><i /> Wellbeing <b>0.7h</b></li>
                    </ul>
                  </div>
                  <p><span>✦</span> You are building momentum. Keep the next session small.</p>
                </section>

                <section className="clay-schedule-card" aria-labelledby="clay-schedule-title">
                  <header><div><span>Today</span><h3 id="clay-schedule-title">Your gentle plan</h3></div><button type="button">View all</button></header>
                  <ol>
                    <li><time>10:00<small>AM</small></time><span><strong>Design thinking 101</strong><small>Continue lesson</small></span><button type="button" aria-label="Start Design thinking 101">▶</button></li>
                    <li><time>1:00<small>PM</small></time><span><strong>Focus flow</strong><small>Live session</small></span><button type="button" aria-label="Start Focus flow">▶</button></li>
                    <li><time>4:00<small>PM</small></time><span><strong>Journaling for clarity</strong><small>15 min practice</small></span><button type="button" aria-label="Start Journaling for clarity">▶</button></li>
                  </ol>
                </section>
              </>
            ) : (
              <>
                <section className="clay-focus-card" aria-labelledby="clay-focus-title">
                  <header><span>Protect attention</span><button type="button" aria-label="Focus time information">i</button></header>
                  <h3 id="clay-focus-title">Focus time</h3>
                  <div className="clay-focus-dial"><span>25<small>min</small></span></div>
                  <button className="clay-focus-action" type="button">Start focus session <b aria-hidden="true">▶</b></button>
                </section>
                <section className="clay-encouragement-card">
                  <span className="clay-encouragement-plant" aria-hidden="true"><i /><i /><i /></span>
                  <strong>Keep growing</strong>
                  <p>Small steps today, bigger confidence tomorrow.</p>
                  <span aria-hidden="true">♥</span>
                </section>
              </>
            )}
          </aside>
        </div>
      </section>

      <section className="clay-example-board" aria-labelledby="clay-examples-title">
        <div className="clay-example-heading"><span>Where the style fits</span><h3 id="clay-examples-title">Soft depth invites a person in; clear copy tells them what to do next.</h3></div>
        <div className="clay-example-grid">
          {examples.map((example) => (
            <article key={example.label}>
              <span className="clay-example-icon"><FontAwesomeIcon name={example.icon} size={16} /></span>
              <div><small>{example.label}</small><strong>{example.title}</strong><p>{example.detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <aside className="clay-guidance">
        <span>Accessibility guardrail</span>
        <h3>Pastel is the atmosphere, not the only way a state is expressed.</h3>
        <p><strong>Risk:</strong> {style.accessibilityRisks[0]}. Bloom Studio pairs clear labels, dark body copy, a selected topic state, and text-based progress with each soft surface.</p>
      </aside>

      {renderTab("dossier-content-clay")}
    </div>
  );
}
