import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router";
import { designStyles, recommendations, type DesignStyle, type FitLevel } from "./data/designStyles";
import { ResearchDossier } from "./components/dossiers/ResearchDossier";
import { FontAwesomeIcon, type FontAwesomeIconName } from "./components/icons/FontAwesomeIcon";
import { LandingPage } from "./components/LandingPage";
import { NotFoundPage } from "./components/NotFoundPage";
import { StylePreview } from "./components/StylePreview";
import {
  CLASSIFICATION_LABELS,
  DEFAULT_EXPLORER_FILTERS,
  DIMENSION_LEVEL_LABELS,
  ERA_LABELS,
  MATURITY_LABELS,
  filterResearchStyles,
  getAvailableClassifications,
  getAvailableExplorerFilters,
  normalizedResearchStyles,
  parseExplorerFilters,
  serializeExplorerFilters,
  type ExplorerFilterOptions,
  type ExplorerFilterState,
  type ExplorerClassification,
} from "./domain/research";
import { APP_ROUTES, getStyleRoute, type AppRoutePath } from "./routing/routes";

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
const classificationFilters: ExplorerClassification[] = [
  "all",
  ...getAvailableClassifications(normalizedResearchStyles),
];
const explorerFilterOptions = getAvailableExplorerFilters(normalizedResearchStyles);
const classificationDetails: Record<Exclude<ExplorerClassification, "all">, {
  description: string;
  icon: FontAwesomeIconName;
  tone: string;
}> = {
  "interface-direction": {
    description: "The way information is organized and user flows.",
    icon: "bars-filter",
    tone: "violet",
  },
  "visual-aesthetic": {
    description: "The visual tone, mood, and styling approach.",
    icon: "flask",
    tone: "rose",
  },
  "design-language": {
    description: "The system of visual rules and patterns.",
    icon: "code-branch",
    tone: "green",
  },
  "historical-movement": {
    description: "Design movements and historical context.",
    icon: "building",
    tone: "orange",
  },
  "interface-pattern": {
    description: "Common interaction models and behaviors.",
    icon: "gear",
    tone: "blue",
  },
};
const tagIconNames: FontAwesomeIconName[] = ["circle-check", "heart", "rocket", "building", "database", "cube", "flask", "gear"];
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
  activeFilterCount,
  isSearchOpen,
  query,
  onOpenSearch,
}: {
  activeFilterCount: number;
  isSearchOpen: boolean;
  query: string;
  onOpenSearch: () => void;
}) {
  return (
    <header className="app-header">
      <div className="brand-lockup">
        <span className="brand-mark">UI</span>
        <h1>UI Style Research</h1>
      </div>

      <button
        aria-controls="style-search-dialog"
        aria-expanded={isSearchOpen}
        aria-haspopup="dialog"
        aria-label="Open style search"
        className={`search-trigger ${activeFilterCount > 0 ? "has-active-filters" : ""}`}
        onClick={onOpenSearch}
        type="button"
      >
        <FontAwesomeIcon name="magnifying-glass" size={17} />
        <span className="search-trigger-copy">{query || "Search styles, aliases, classifications..."}</span>
        {activeFilterCount > 0 && <span className="search-filter-count">{activeFilterCount}</span>}
        <kbd>⌘ K</kbd>
      </button>
    </header>
  );
}

function FilterChipGroup({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  value: string;
}) {
  return (
    <div className="command-filter-group">
      <h3>{label}</h3>
      <div className="command-filter-options" role="group" aria-label={`${label} filter`}>
        {options.map((option) => (
          <button
            aria-pressed={value === option.value}
            className={`command-filter-option ${value === option.value ? "is-active" : ""}`}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CommandPalette({
  filterOptions,
  filteredStylesCount,
  filters,
  isOpen,
  onClearFilters,
  onClose,
  onFilterChange,
}: {
  filterOptions: ExplorerFilterOptions;
  filteredStylesCount: number;
  filters: ExplorerFilterState;
  isOpen: boolean;
  onClearFilters: () => void;
  onClose: () => void;
  onFilterChange: (updates: Partial<ExplorerFilterState>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(focusFrame);
  }, [isOpen]);

  if (!isOpen) return null;

  const availableClassifications = classificationFilters.filter(
    (classification): classification is Exclude<ExplorerClassification, "all"> => classification !== "all",
  );

  return (
    <div
      id="style-search-dialog"
      aria-label="Style search and filters"
      aria-modal="true"
      className="search-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
    >
      <div className="command-panel">
        <div className="command-search-box">
          <FontAwesomeIcon name="magnifying-glass" size={18} />
          <input
            ref={inputRef}
            aria-label="Search styles, aliases, classifications"
            onChange={(event) => onFilterChange({ query: event.target.value })}
            placeholder="Search styles, aliases, classifications..."
            type="search"
            value={filters.query}
          />
          <button aria-label="Close search" className="command-close" onClick={onClose} type="button">
            <FontAwesomeIcon name="plus" size={16} />
          </button>
        </div>

        <div className="command-scroll">
          <section className="command-section" aria-labelledby="primary-category-title">
            <div className="command-section-heading">
              <div>
                <span className="command-eyebrow">Browse by</span>
                <h2 id="primary-category-title">Primary categories</h2>
              </div>
              <span className="command-section-count">{availableClassifications.length} categories</span>
            </div>
            <div className="command-category-grid">
              {availableClassifications.map((classification) => {
                const detail = classificationDetails[classification];
                const isActive = filters.classification === classification;

                return (
                  <button
                    aria-pressed={isActive}
                    className={`command-category ${isActive ? "is-active" : ""}`}
                    key={classification}
                    onClick={() => onFilterChange({ classification })}
                    type="button"
                  >
                    <span className={`command-icon command-icon-${detail.tone}`}>
                      <FontAwesomeIcon name={detail.icon} size={17} />
                    </span>
                    <span className="command-category-copy">
                      <strong>{CLASSIFICATION_LABELS[classification]}</strong>
                      <small>{detail.description}</small>
                    </span>
                    {isActive && <FontAwesomeIcon className="command-selected-icon" name="circle-check" size={15} />}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="command-section command-tags-section" aria-labelledby="popular-tags-title">
            <div className="command-section-heading">
              <div>
                <span className="command-eyebrow">Refine the catalog</span>
                <h2 id="popular-tags-title">Popular tags</h2>
              </div>
              <span className="command-section-count">{tagFilters.length - 1} tags</span>
            </div>
            <div className="command-tag-grid">
              {tagFilters.map((tag, index) => {
                const isActive = filters.tag === tag;

                return (
                  <button
                    aria-pressed={isActive}
                    className={`command-tag ${isActive ? "is-active" : ""}`}
                    key={tag}
                    onClick={() => onFilterChange({ tag })}
                    type="button"
                  >
                    <FontAwesomeIcon name={tag === "All" ? "circle-check" : tagIconNames[index % tagIconNames.length]} size={15} />
                    <span>{tag === "All" ? "All tags" : tag}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="command-section" aria-labelledby="secondary-filters-title">
            <div className="command-section-heading">
              <div>
                <span className="command-eyebrow">Narrow the research set</span>
                <h2 id="secondary-filters-title">Secondary filters</h2>
              </div>
              <span className="command-section-count">URL-shareable</span>
            </div>
            <div className="command-filter-grid">
              <FilterChipGroup
                label="Era"
                onChange={(era) => onFilterChange({ era: era as ExplorerFilterState["era"] })}
                options={[
                  { value: "all", label: "All eras" },
                  ...filterOptions.eras.map((era) => ({ value: era, label: ERA_LABELS[era] })),
                ]}
                value={filters.era}
              />
              <FilterChipGroup
                label="Density"
                onChange={(density) => onFilterChange({ density: density as ExplorerFilterState["density"] })}
                options={[
                  { value: "all", label: "All densities" },
                  ...filterOptions.densities.map((level) => ({ value: level, label: DIMENSION_LEVEL_LABELS[level] })),
                ]}
                value={filters.density}
              />
              <FilterChipGroup
                label="Visual weight"
                onChange={(visualWeight) => onFilterChange({ visualWeight: visualWeight as ExplorerFilterState["visualWeight"] })}
                options={[
                  { value: "all", label: "All weights" },
                  ...filterOptions.visualWeights.map((level) => ({ value: level, label: DIMENSION_LEVEL_LABELS[level] })),
                ]}
                value={filters.visualWeight}
              />
              <FilterChipGroup
                label="Production maturity"
                onChange={(maturity) => onFilterChange({ maturity: maturity as ExplorerFilterState["maturity"] })}
                options={[
                  { value: "all", label: "All maturity" },
                  ...filterOptions.maturities.map((level) => ({ value: level, label: MATURITY_LABELS[level] })),
                ]}
                value={filters.maturity}
              />
            </div>
          </section>
        </div>

        <footer className="command-footer">
          <span aria-live="polite">
            <strong>{filteredStylesCount}</strong> styles match
          </span>
          <div className="command-footer-actions">
            {filters.query.trim() || filters.tag !== "All" || filters.classification !== "all" || filters.era !== "all" || filters.density !== "all" || filters.visualWeight !== "all" || filters.maturity !== "all" ? (
              <button className="command-clear" onClick={onClearFilters} type="button">
                Clear filters
              </button>
            ) : null}
            <span className="command-key-hint"><kbd>Esc</kbd> to close</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function StyleCatalog({
  filteredStyles,
  onSelect,
  selectedId,
}: {
  filteredStyles: DesignStyle[];
  onSelect: (id: string) => void;
  selectedId: string;
}) {
  return (
    <aside className="catalog-panel" aria-label="Style catalog">
      <div className="panel-title-row">
        <div>
          <h2>Style catalog</h2>
          <p>{filteredStyles.length} styles shown</p>
        </div>
        <span className="catalog-count" aria-live="polite">{filteredStyles.length} shown</span>
      </div>

      {filteredStyles.length > 0 ? (
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
      ) : (
        <div className="catalog-empty" role="status" aria-live="polite">
          <strong>No matching UI direction found.</strong>
          <p>Try a broader keyword or classification.</p>
        </div>
      )}
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

function ResearchWorkspace() {
  const { slug } = useParams<{ slug?: string }>();
  const [activeMode, setActiveMode] = useState<"fast" | "deep" | "compare">("deep");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const routerNavigate = useNavigate();
  const selectedStyleId = slug ?? designStyles[0].id;
  const filters = useMemo(
    () => parseExplorerFilters(location.search, tagFilters),
    [location.search],
  );

  useEffect(() => {
    const canonicalSearch = serializeExplorerFilters(filters);

    if (location.search !== canonicalSearch) {
      routerNavigate(
        { pathname: location.pathname, search: canonicalSearch },
        { replace: true },
      );
    }
  }, [filters, location.pathname, location.search, routerNavigate]);

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
        return;
      }

      if (event.key === "Escape" && isSearchOpen) {
        event.preventDefault();
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleSearchShortcut);
    return () => document.removeEventListener("keydown", handleSearchShortcut);
  }, [isSearchOpen]);

  const filteredStyles = useMemo(() => {
    const normalizedIds = new Set(
      filterResearchStyles(normalizedResearchStyles, filters)
        .map(({ id }) => id),
    );

    return designStyles.filter((style) =>
      normalizedIds.has(style.id)
      && (filters.tag === "All" || style.tags.includes(filters.tag)),
    );
  }, [filters]);

  const activeFilterCount = Number(Boolean(filters.query.trim()))
    + Number(filters.tag !== "All")
    + Number(filters.classification !== "all")
    + Number(filters.era !== "all")
    + Number(filters.density !== "all")
    + Number(filters.visualWeight !== "all")
    + Number(filters.maturity !== "all");

  const clearExplorerFilters = () => {
    updateExplorerFilters(DEFAULT_EXPLORER_FILTERS);
  };

  const updateExplorerFilters = (updates: Partial<ExplorerFilterState>) => {
    const nextFilters = { ...filters, ...updates };
    const nextSearch = serializeExplorerFilters(nextFilters);

    if (location.search !== nextSearch) {
      routerNavigate(
        { pathname: location.pathname, search: nextSearch },
        { replace: true },
      );
    }
  };

  const selectedStyle = useMemo(() => designStyles.find((style) => style.id === selectedStyleId), [selectedStyleId]);

  const handleSelectStyle = (id: string) => {
    setActiveMode("deep");

    const nextPath = getStyleRoute(id);
    if (location.pathname !== nextPath) {
      routerNavigate({ pathname: nextPath, search: location.search });
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const touchPointer = useTouchPointer(location.pathname === APP_ROUTES.explorer || Boolean(selectedStyle));

  const navigate = (path: AppRoutePath) => {
    if (location.pathname !== path) {
      routerNavigate(path);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (slug && !selectedStyle) {
    return <NotFoundPage />;
  }

  return (
      <main className="research-shell" {...touchPointer.handlers}>
      {touchPointer.feedback}
      <AppHeader
        activeFilterCount={activeFilterCount}
        isSearchOpen={isSearchOpen}
        onOpenSearch={() => setIsSearchOpen(true)}
        query={filters.query}
      />
      <CommandPalette
        filterOptions={explorerFilterOptions}
        filteredStylesCount={filteredStyles.length}
        filters={filters}
        isOpen={isSearchOpen}
        onClearFilters={clearExplorerFilters}
        onClose={() => setIsSearchOpen(false)}
        onFilterChange={updateExplorerFilters}
      />

      <div className="workspace-grid">
        <StyleCatalog
          filteredStyles={filteredStyles}
          onSelect={handleSelectStyle}
          selectedId={selectedStyleId}
        />
        <ResearchDossier activeMode={activeMode} style={selectedStyle ?? designStyles[0]} />
        <DecisionRail style={selectedStyle ?? designStyles[0]} />
      </div>
    </main>
  );
}

function App() {
  const routerNavigate = useNavigate();
  const location = useLocation();

  const navigate = (path: AppRoutePath) => {
    if (location.pathname !== path) {
      routerNavigate(path);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <Routes>
      <Route path={APP_ROUTES.landing} element={<LandingPage onNavigate={navigate} />} />
      <Route path={APP_ROUTES.explorer} element={<ResearchWorkspace />} />
      <Route path={APP_ROUTES.styleDetail} element={<ResearchWorkspace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
