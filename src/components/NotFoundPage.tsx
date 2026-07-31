import { Link, useLocation } from "react-router";
import { APP_ROUTES } from "../routing/routes";
import { FontAwesomeIcon } from "./icons/FontAwesomeIcon";

export function NotFoundPage() {
  const location = useLocation();
  const requestedPath = `${location.pathname}${location.search}`;

  return (
    <main className="not-found-page">
      <div className="not-found-workspace">
        <header className="not-found-topbar">
          <Link className="not-found-brand" to={APP_ROUTES.landing}>
            <span aria-hidden="true">UI</span>
            <strong>Interface Style Research</strong>
          </Link>
          <p className="not-found-workspace-status">
            <span aria-hidden="true" />
            Research workspace
          </p>
        </header>

        <section className="not-found-main-grid" aria-labelledby="not-found-title">
          <div className="not-found-copy">
            <p className="not-found-route-label">
              <span>Route</span>
              <span aria-hidden="true">/</span>
              <strong>Not found</strong>
            </p>
            <p className="not-found-code">404</p>
            <h1 id="not-found-title">This research path does not exist.</h1>
            <p className="not-found-description">
              We could not find the path you are looking for. It may have been
              moved, renamed, or removed.
            </p>

            <div className="not-found-requested-path">
              <span>Requested path</span>
              <code>{requestedPath}</code>
            </div>

            <div className="not-found-actions">
              <Link className="not-found-primary-action" to={APP_ROUTES.landing}>
                <FontAwesomeIcon name="arrow-up-right-from-square" size={14} />
                Return to workspace
              </Link>
              <Link className="not-found-secondary-action" to={APP_ROUTES.explorer}>
                <FontAwesomeIcon name="magnifying-glass" size={14} />
                Browse style catalog
              </Link>
            </div>
          </div>

          <div
            aria-label="Research path resolution diagram"
            className="not-found-route-map"
            role="img"
          >
            <div className="not-found-route-map-header">
              <div>
                <span>Path resolution</span>
                <strong>Research route map</strong>
              </div>
              <FontAwesomeIcon name="code-branch" size={17} />
            </div>
            <div className="not-found-route-graph" aria-hidden="true">
              <span className="not-found-graph-line is-vertical" />
              <span className="not-found-graph-line is-branch-one" />
              <span className="not-found-graph-line is-branch-two" />
              <span className="not-found-graph-line is-branch-unknown" />
              <span className="not-found-route-node is-root">
                <span className="not-found-route-dot">
                  <FontAwesomeIcon name="magnifying-glass" size={15} />
                </span>
                <b>Research home</b>
              </span>
              <span className="not-found-route-node is-foundation">
                <span className="not-found-route-dot" />
                <b>Foundations</b>
              </span>
              <span className="not-found-route-node is-patterns">
                <span className="not-found-route-dot" />
                <b>Patterns</b>
              </span>
              <span className="not-found-route-node is-components">
                <span className="not-found-route-dot" />
                <b>Components</b>
              </span>
              <span className="not-found-route-node is-unknown">
                <span className="not-found-route-dot">
                  <FontAwesomeIcon name="circle-exclamation" size={15} />
                </span>
                <b>Unknown path</b>
              </span>
            </div>
            <p className="not-found-route-map-note">
              <FontAwesomeIcon name="circle-exclamation" size={14} />
              The catalog is the fastest way to find a valid research direction.
            </p>
          </div>
        </section>

        <aside className="not-found-help-strip">
          <span className="not-found-help-icon" aria-hidden="true">
            <FontAwesomeIcon name="magnifying-glass" size={16} />
          </span>
          <div>
            <strong>Need help finding something?</strong>
            <p>Browse the catalog to continue your research.</p>
          </div>
          <Link to={APP_ROUTES.explorer}>
            Open catalog <FontAwesomeIcon name="arrow-up-right-from-square" size={12} />
          </Link>
        </aside>
      </div>
    </main>
  );
}
