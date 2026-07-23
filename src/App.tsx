import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { designStyles, recommendations, type DesignStyle, type FitLevel } from "./data/designStyles";
import { ResearchDossier } from "./components/dossiers/ResearchDossier";
import { FontAwesomeIcon } from "./components/icons/FontAwesomeIcon";
import { LandingPage } from "./components/LandingPage";
import { StylePreview } from "./components/StylePreview";

type SurfaceId = keyof DesignStyle["suitability"];

const surfaceLabels: Record<SurfaceId, string> = {
  landing: "Landing",
  dashboard: "Dashboard",
  portfolio: "Portfolio",
  productApp: "Product app",
  docs: "Docs",
  experimentalVisual: "Experimental",
};

const surfaceShortLabels: Record<SurfaceId, string> = {
  landing: "Mkt",
  dashboard: "Data",
  portfolio: "Brand",
  productApp: "App",
  docs: "Docs",
  experimentalVisual: "Lab",
};

const fitScore: Record<FitLevel, number> = {
  High: 3,
  Medium: 2,
  "Use carefully": 1,
  Low: 0,
};

const fitTone: Record<FitLevel, string> = {
  High: "high",
  Medium: "medium",
  "Use carefully": "careful",
  Low: "low",
};

const tagFilters = ["All", ...Array.from(new Set(designStyles.flatMap((style) => style.tags))).sort()];
const surfaces = Object.keys(surfaceLabels) as SurfaceId[];

function getTopSurfaces(style: DesignStyle) {
  return surfaces
    .map((surface) => ({ surface, fit: style.suitability[surface] }))
    .sort((a, b) => fitScore[b.fit] - fitScore[a.fit])
    .slice(0, 3);
}

function getBestFitLabel(style: DesignStyle) {
  const top = getTopSurfaces(style).filter((item) => fitScore[item.fit] >= 2);
  return top.length ? top.map((item) => surfaceLabels[item.surface]).join(", ") : "Accent only";
}

function FitDots({ style }: { style: DesignStyle }) {
  const topFits = getTopSurfaces(style);

  return (
    <span className="fit-dots" aria-label={`Best fit: ${getBestFitLabel(style)}`}>
      {topFits.map((item) => (
        <span className={`fit-dot fit-${fitTone[item.fit]}`} key={item.surface} title={`${surfaceLabels[item.surface]}: ${item.fit}`} />
      ))}
    </span>
  );
}

function AppHeader({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (query: string) => void;
}) {
  return (
    <header className="app-header">
      <div className="brand-lockup">
        <span className="brand-mark">UI</span>
        <h1>UI Style Research</h1>
      </div>

      <label className="search-box">
        <span aria-hidden="true" />
        <input
          aria-label="Search styles"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search styles"
          type="search"
          value={query}
        />
      </label>
    </header>
  );
}

function StyleCatalog({
  activeTag,
  filteredStyles,
  onSelect,
  selectedId,
  onTagChange,
}: {
  activeTag: string;
  filteredStyles: DesignStyle[];
  onSelect: (id: string) => void;
  selectedId: string;
  onTagChange: (tag: string) => void;
}) {
  return (
    <aside className="catalog-panel" aria-label="Style catalog">
      <div className="panel-title-row">
        <div>
          <h2>Style catalog</h2>
          <p>{filteredStyles.length} styles shown</p>
        </div>
        <button className="icon-button" type="button" aria-label="Filter catalog">
          <span />
        </button>
      </div>

      <div className="filter-strip" aria-label="Filter by tag">
        {tagFilters.map((tag) => (
          <button className={activeTag === tag ? "is-active" : ""} key={tag} onClick={() => onTagChange(tag)} type="button">
            {tag}
          </button>
        ))}
      </div>

      <div className="style-list">
        {filteredStyles.map((style) => (
          <button
            aria-pressed={selectedId === style.id}
            className={`style-row ${selectedId === style.id ? "is-active" : ""}`}
            key={style.id}
            onClick={() => onSelect(style.id)}
            type="button"
          >
            <StylePreview style={style} />
            <span className="style-row-copy">
              <strong>{style.name}</strong>
              <small>{style.feeling.slice(0, 2).join(" / ")}</small>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function SurfaceFitMatrix({ style }: { style: DesignStyle }) {
  return (
    <div className="surface-matrix">
      {surfaces.map((surface) => {
        const fit = style.suitability[surface];
        return (
          <div key={surface}>
            <span>{surfaceShortLabels[surface]}</span>
            <strong className={`fit-pill fit-${fitTone[fit]}`}>{fit}</strong>
          </div>
        );
      })}
    </div>
  );
}

function DecisionRail({ style }: { style: DesignStyle }) {
  const matchingRecommendations = recommendations.filter((item) => item.recommendedStyle.includes(style.name.split(" ")[0])).slice(0, 2);
  const suggested = matchingRecommendations.length ? matchingRecommendations : recommendations.slice(0, 2);
  const recommendedUseCases = Array.from(new Set([...style.recommendedFor, ...style.useCases])).slice(0, 5);

  return (
    <aside className="decision-panel" aria-label="Decision guide">
      <div className="panel-title-row">
        <div>
          <h2>Decision guide</h2>
          <p>Fast fit signals</p>
        </div>
      </div>

      <section className="rail-section">
        <h3>Recommended use cases</h3>
        <ul className="check-list">
          {recommendedUseCases.map((item) => (
            <li key={item}>
              <FontAwesomeIcon name="circle-check" size={15} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rail-section">
        <h3>Surface fit</h3>
        <SurfaceFitMatrix style={style} />
      </section>

      <section className="rail-section notes-section">
        <h3>Notes</h3>
        {suggested.map((item) => (
          <article key={item.goal}>
            <strong>{item.goal}</strong>
            <p>{item.caution}</p>
          </article>
        ))}
      </section>
    </aside>
  );
}

function ComparisonTable({ selectedStyleId }: { selectedStyleId: string }) {
  return (
    <section className="compare-panel" aria-labelledby="compare-title">
      <div className="compare-header">
        <div>
          <h2 id="compare-title">Compare styles</h2>
          <p>Select a style from the catalog to inspect it above.</p>
        </div>
        <span>{designStyles.length} styles</span>
      </div>

      <div className="compare-scroll">
        <table>
          <thead>
            <tr>
              <th>Style</th>
              {designStyles.map((style) => (
                <th className={style.id === selectedStyleId ? "is-selected" : ""} key={style.id}>
                  {style.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Fit</th>
              {designStyles.map((style) => (
                <td key={style.id}>
                  <FitDots style={style} />
                </td>
              ))}
            </tr>
            <tr>
              <th>Density</th>
              {designStyles.map((style) => (
                <td key={style.id}>{style.tokenRecipe.density}</td>
              ))}
            </tr>
            <tr>
              <th>Visual weight</th>
              {designStyles.map((style) => (
                <td key={style.id}>{style.feeling.slice(0, 2).join(", ")}</td>
              ))}
            </tr>
            <tr>
              <th>Best for</th>
              {designStyles.map((style) => (
                <td key={style.id}>{style.recommendedFor.slice(0, 2).join(", ")}</td>
              ))}
            </tr>
            <tr>
              <th>Primary risk</th>
              {designStyles.map((style) => (
                <td key={style.id}>{style.accessibilityRisks[0] ?? style.weaknesses[0]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function isTextInputTarget(target: EventTarget | null) {
  return target instanceof Element && !!target.closest("input, textarea, select, [contenteditable='true']");
}

function getScrollableTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return document.scrollingElement;

  let current: Element | null = target;

  while (current && current !== document.body) {
    const style = window.getComputedStyle(current);
    const canScrollY = /(auto|scroll)/.test(style.overflowY) && current.scrollHeight > current.clientHeight;
    const canScrollX = /(auto|scroll)/.test(style.overflowX) && current.scrollWidth > current.clientWidth;

    if (canScrollY || canScrollX) {
      return current;
    }

    current = current.parentElement;
  }

  return document.scrollingElement;
}

function useTouchPointer(active: boolean) {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, enabled: false, pressed: false });
  const dragRef = useRef({
    active: false,
    moved: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    locked: false,
    scroller: null as Element | null,
  });
  const suppressClickRef = useRef(false);
  const finePointerRef = useRef(false);

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const syncPointerMode = () => {
      const enabled = active && finePointerQuery.matches;
      finePointerRef.current = enabled;
      document.documentElement.classList.toggle("has-touch-cursor", enabled);
      setCursor((current) => ({ ...current, enabled, visible: enabled ? current.visible : false, pressed: false }));
    };

    syncPointerMode();
    finePointerQuery.addEventListener("change", syncPointerMode);

    return () => {
      document.documentElement.classList.remove("has-touch-cursor");
      finePointerQuery.removeEventListener("change", syncPointerMode);
    };
  }, [active]);

  const handlers = {
    onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
      const isDesktopPointer = finePointerRef.current && event.pointerType === "mouse";

      if (isDesktopPointer) {
        setCursor((current) => ({
          ...current,
          x: event.clientX,
          y: event.clientY,
          visible: true,
          enabled: true,
        }));
      }

      const drag = dragRef.current;
      if (!isDesktopPointer || !drag.active || drag.locked || drag.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - drag.lastX;
      const deltaY = event.clientY - drag.lastY;
      const totalMove = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);

      if (totalMove > 5) {
        drag.moved = true;
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        event.preventDefault();
        const scroller = drag.scroller;
        if (scroller) {
          scroller.scrollLeft -= deltaX;
          scroller.scrollTop -= deltaY;
        }
      }

      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
    },
    onPointerDown: (event: ReactPointerEvent<HTMLElement>) => {
      const isDesktopPointer = finePointerRef.current && event.pointerType === "mouse" && event.button === 0;
      const isTouchPointer = event.pointerType === "touch";

      if (!isDesktopPointer && !isTouchPointer) return;

      dragRef.current = {
        active: isDesktopPointer,
        moved: false,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastY: event.clientY,
        locked: isTextInputTarget(event.target),
        scroller: getScrollableTarget(event.target),
      };

      if (isDesktopPointer) {
        setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY, visible: true, enabled: true, pressed: true }));
      }
    },
    onPointerUp: (event: ReactPointerEvent<HTMLElement>) => {
      const drag = dragRef.current;
      const isDesktopPointer = finePointerRef.current && event.pointerType === "mouse";

      if (drag.moved) {
        suppressClickRef.current = true;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }

      if (isDesktopPointer && event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      dragRef.current = { ...dragRef.current, active: false, moved: false, pointerId: -1 };
      setCursor((current) => ({ ...current, pressed: false }));
    },
    onPointerCancel: (event: ReactPointerEvent<HTMLElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      dragRef.current = { ...dragRef.current, active: false, moved: false, pointerId: -1 };
      setCursor((current) => ({ ...current, pressed: false }));
    },
    onPointerLeave: () => {
      if (!dragRef.current.active) {
        setCursor((current) => ({ ...current, visible: false, pressed: false }));
      }
    },
    onClickCapture: (event: ReactMouseEvent<HTMLElement>) => {
      if (!suppressClickRef.current) return;

      event.preventDefault();
      event.stopPropagation();
    },
  };

  const feedback = (
    <div className="pointer-feedback" aria-hidden="true">
      {cursor.enabled && (
        <span
          className={`touch-cursor ${cursor.visible ? "is-visible" : ""} ${cursor.pressed ? "is-pressed" : ""}`}
          style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
        />
      )}
    </div>
  );

  return { feedback, handlers };
}

function App() {
  const [route, setRoute] = useState<"landing" | "styles">(() => window.location.pathname === "/styles" ? "styles" : "landing");
  const [selectedStyleId, setSelectedStyleId] = useState(designStyles[0].id);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [activeMode, setActiveMode] = useState<"fast" | "deep" | "compare">("deep");

  const filteredStyles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return designStyles.filter((style) => {
      const matchesTag = activeTag === "All" || style.tags.includes(activeTag);
      const searchable = [
        style.name,
        style.summary,
        style.classification,
        ...style.tags,
        ...style.feeling,
        ...style.useCases,
        ...style.realWorldExamples.map((example) => example.label),
      ]
        .join(" ")
        .toLowerCase();
      return matchesTag && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeTag, query]);

  const selectedStyle = useMemo(
    () => designStyles.find((style) => style.id === selectedStyleId) ?? designStyles[0],
    [selectedStyleId],
  );

  const handleSelectStyle = (id: string) => {
    setSelectedStyleId(id);
    setActiveMode("deep");
  };

  const touchPointer = useTouchPointer(route === "styles");

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.pathname === "/styles" ? "styles" : "landing");
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  const navigate = (path: "/" | "/styles") => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
    setRoute(path === "/styles" ? "styles" : "landing");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (route === "landing") {
    return <LandingPage onNavigate={navigate} />;
  }

  return (
    <main className="research-shell" {...touchPointer.handlers}>
      {touchPointer.feedback}
      <AppHeader onQueryChange={setQuery} query={query} />

      <div className="workspace-grid">
        <StyleCatalog
          activeTag={activeTag}
          filteredStyles={filteredStyles}
          onSelect={handleSelectStyle}
          onTagChange={setActiveTag}
          selectedId={selectedStyleId}
        />
        <ResearchDossier activeMode={activeMode} style={selectedStyle} />
        <DecisionRail style={selectedStyle} />
      </div>

    </main>
  );
}

export default App;
