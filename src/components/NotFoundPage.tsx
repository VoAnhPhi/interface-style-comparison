import { Link } from "react-router";
import { APP_ROUTES } from "../routing/routes";

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-panel">
        <p className="not-found-code">404</p>
        <p className="landing-eyebrow">Route not found</p>
        <h1>This research path does not exist.</h1>
        <p>
          Return to the research landing page or open the current catalog of
          interface directions.
        </p>
        <div className="not-found-actions">
          <Link className="landing-button" to={APP_ROUTES.landing}>
            Return home
          </Link>
          <Link className="landing-button is-secondary" to={APP_ROUTES.explorer}>
            Explore styles
          </Link>
        </div>
      </div>
    </main>
  );
}
