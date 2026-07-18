import type { DossierRendererProps } from "../types";
import { FontAwesomeIcon } from "../../icons/FontAwesomeIcon";

const stateItems = [
	{ label: "Default", className: "is-default", detail: "Neutral outline and resting elevation." },
	{ label: "Hover", className: "is-hover", detail: "Subtle state layer signals pointer intent." },
	{ label: "Focus", className: "is-focus", detail: "Visible ring keeps keyboard focus discoverable." },
	{ label: "Pressed", className: "is-pressed", detail: "Lowered surface confirms activation." },
	{ label: "Disabled", className: "is-disabled", detail: "Reduced emphasis preserves the control shape." },
	{ label: "Error", className: "is-error", detail: "Danger uses color plus a supporting message." },
];

const paletteItems = [
	["Primary", "#6750A4"],
	["Secondary", "#D7CFEA"],
	["Accent", "#4A70B7"],
	["Action", "#4168B0"],
	["Ink", "#3B3A49"],
	["Muted", "#D8D6DF"],
	["Canvas", "#FFFFFF"],
];

const spacingItems = ["4", "8", "12", "16", "24", "32", "40"];

export function MaterialFluentDossier({ renderTab, style }: DossierRendererProps) {
	return (
		<div className="material-fluent-dossier-layout">
			<section className="material-reference-board" aria-label="Material and Fluent three-column visual system board">
				<div className="material-board-column material-board-left">
					<div className="material-surface-stack" aria-label="Layered surface example">
						<img src="/style-assets/material-fluent/material-fluent-surface-stack-v2.png" alt="" />
						<div className="material-stack-caption">
							<span>Surface language</span>
							<strong>Layer before ornament.</strong>
							<small>Five roles · one elevation system</small>
						</div>
					</div>
					<section className="material-field-specimens" aria-label="Field state specimens">
						<div className="material-specimen-title">
							<span />
							Field states
						</div>
						{stateItems.slice(0, 4).map((item, index) => (
							<label className={`material-field-specimen ${item.className}`} key={item.label} title={item.detail}>
								<span>{item.label}</span>
								<div>
									<input
										aria-label={`${item.label} field`}
										defaultValue={index === 1 ? "" : index === 2 ? "Error message" : "Workspace name"}
										placeholder={index === 1 ? "Type to continue" : undefined}
									/>
									<b aria-hidden="true">⌾</b>
								</div>
								<small>{item.detail}</small>
							</label>
						))}
					</section>
				</div>

				<div className="material-board-column material-board-center">
					<header className="material-reference-toolbar">
						<button className="material-reference-menu" type="button" aria-label="Open navigation">
							<FontAwesomeIcon name="bars-filter" size={16} />
							☰
						</button>
						<span className="material-reference-brand" aria-hidden="true" />
						<div className="material-reference-toolbar-actions" aria-label="Toolbar actions">
							<button type="button" aria-label="Search">
								<FontAwesomeIcon name="magnifying-glass" size={15} />
								⌕
							</button>
							<button type="button" aria-label="Favorite">
								<FontAwesomeIcon name="heart" size={15} />
								♡
							</button>
							<button type="button" aria-label="Notifications">
								<FontAwesomeIcon name="bell" size={15} />
								♧
							</button>
							<button className="material-reference-avatar" type="button" aria-label="Account">
								<FontAwesomeIcon name="user" size={14} />
							</button>
						</div>
					</header>
					<div className="material-state-matrix">
						<div className="material-matrix-rail" aria-label="State controls">
							{stateItems.map((item) => (
								<span key={item.label} className={item.className} title={item.detail} />
							))}
						</div>
						<div className="material-matrix-grid">
							{stateItems.map((item) => (
								<article className={`material-matrix-cell ${item.className}`} key={item.label} title={item.detail}>
									<strong>{item.label}</strong>
									<span className="material-matrix-dot" aria-hidden="true" />
									<span className="material-matrix-line" />
								</article>
							))}
						</div>
					</div>
					<section className="material-content-specimens" aria-label="Card and action specimens">
						<div className="material-card-specimen-row">
							{style.componentExamples.slice(0, 2).map((item) => (
								<article className="material-content-card" key={item.label} title={item.detail}>
									<div className="material-card-avatar" aria-hidden="true" />
									<strong>{item.label}</strong>
									<p>{item.detail}</p>
									<div className="material-card-media" />
								</article>
							))}
						</div>
						<article className="material-action-card">
							<div>
								<span className="material-specimen-title">
									<span />
									Dialog actions
								</span>
								<p>Actions stay aligned to the surface hierarchy.</p>
							</div>
							<div className="material-action-buttons">
								<button type="button">Cancel</button>
								<button type="button">Preview</button>
								<button className="is-filled" type="button">
									Save
								</button>
							</div>
						</article>
					</section>
				</div>

				<aside className="material-board-column material-specimen-rail" aria-label="Material and Fluent token specimens">
					<section className="material-token-specimen">
						<div className="material-specimen-title">
							<span />
							Color roles
						</div>
						<div className="material-palette-row">
							{paletteItems.map(([label, color]) => (
								<div key={label} title={`${label}: ${color}`}>
									<i style={{ background: color }} />
									<small>{label}</small>
								</div>
							))}
						</div>
					</section>
					<section className="material-token-specimen">
						<div className="material-specimen-title">
							<span />
							Elevation
						</div>
						<div className="material-elevation-row">
							{[1, 2, 3, 4, 5, 6].map((level) => (
								<div key={level} title={`Elevation level ${level}`}>
									<i className={`level-${level}`} />
									<small>level {level}</small>
								</div>
							))}
						</div>
					</section>
					<section className="material-token-specimen">
						<div className="material-specimen-title">
							<span />
							Shape scale
						</div>
						<div className="material-shape-row">
							{[4, 8, 12, 16, 24, 999].map((radius) => (
								<div key={radius} title={`Radius ${radius}px`}>
									<i style={{ borderRadius: radius }} />
									<small>{radius}px</small>
								</div>
							))}
						</div>
					</section>
					<section className="material-token-specimen">
						<div className="material-specimen-title">
							<span />
							Spacing scale
						</div>
						<div className="material-spacing-row">
							{spacingItems.map((space) => (
								<div key={space} title={`${space}px spacing`}>
									<i style={{ height: `${Math.max(8, Number(space) * 1.45)}px` }} />
									<small>{space}</small>
								</div>
							))}
						</div>
					</section>
					<section className="material-token-specimen">
						<div className="material-specimen-title">
							<span />
							Motion rules
						</div>
						<div className="material-motion-row">
							{["Enter", "Move", "Press", "Focus", "Exit"].map((label) => (
								<div key={label} title={`${label}: 120ms ease-out`}>
									<i className={`motion-${label.toLowerCase()}`} />
									<small>{label}</small>
								</div>
							))}
						</div>
					</section>
				</aside>
			</section>
			{renderTab("dossier-content-material")}
		</div>
	);
}
