## **UI Design Style Brief for Finn UI**

## **Executive summary**

The strongest default visual direction for **Finn UI** is **Modern SaaS with a Minimal/Clean foundation**. In practice, that means semantic tokens, soft-but-not-fragile surfaces, generous spacing, restrained elevation, strong typography, and brand color used intentionally rather than everywhere. This direction aligns best with the current product landscape represented by Linear, Vercel’s Geist, Stripe’s componentized checkout UI, and token-driven systems such as Material 3, Fluent 2, Atlassian, and Carbon: it looks polished enough for a public demo landing page, but it is still structured enough to scale into forms, settings, and dashboards.

The two secondary themes most worth implementing after the default are **Minimal/Clean** and **Enterprise/Admin**. Minimal/Clean gives Finn UI a quieter, highly reusable mode for docs, portfolios, note-taking tools, and developer products. Enterprise/Admin gives you a denser, clearer mode for tables, settings, complex forms, and dashboards, and it maps well to the foundations used by Atlassian and Carbon. These two themes meaningfully expand Finn UI’s use-cases without fragmenting the component model.

Two styles should **not** be promoted to first-class global themes at the start: **Glassmorphism** and **Neo-brutalism**. They are useful as **localized appearances** for marketing surfaces, hero sections, showcase cards, or one-off brand experiments, but both introduce higher usability risk or reduced reusability if applied system-wide. Nielsen Norman Group explicitly warns about glassmorphism’s contrast and legibility risks and treats neobrutalism as a deliberately raw aesthetic that must be used carefully.

A few details were not specified in the request: Finn UI’s final brand color, whether dark mode is mandatory on day one, whether the first consumer is mostly a landing page or a dashboard, and whether compact density is needed immediately. The recommendations below therefore assume **WCAG AA as the minimum bar**, **light and dark themes eventually**, **React web + Storybook**, and a product mix of **demo landing + reusable app UI**. WCAG’s text-contrast, non-text-contrast, and focus-appearance guidance should be treated as non-negotiable guardrails for every theme.

## **Source priority and evaluation criteria**

This brief prioritizes **primary or official sources** wherever possible: Material 3 for role-based theming and motion, Fluent 2 for token architecture and spacing/radius defaults, Atlassian and Carbon for enterprise-grade foundations, Apple’s HIG for material/glass guidance, Vercel Geist for minimal developer-facing craft, Stripe Elements for component customization patterns, and Linear for high-end modern SaaS execution. Those eight references are the best first review set for Finn UI design decisions.

| **Priority source** | **Why it matters for Finn UI** |
| --- | --- |
| Material 3 foundations and theming | Best reference for semantic roles, theming primitives, elevation, shape, and motion. |
| Fluent 2 | Excellent reference for token layering, shape values, spacing ramps, and productive cross-platform UI. |
| Atlassian Design System | Strong enterprise foundation for spacing, elevation, radius, and pragmatic token usage. |
| IBM Carbon | Best example of themeable enterprise layering, especially White / Gray 10 / Gray 90 / Gray 100 theme structure. |
| Vercel Geist | Clear reference for Clean/Minimal developer-facing UI with accessible color, grid discipline, and restrained component craft. |
| Stripe Elements and Appearance API | Excellent reference for component-level customization through theme variables instead of ad hoc overrides. |
| Linear | Strong benchmark for premium Modern SaaS visual tone and product-focused polish. |
| Apple HIG materials and accessibility | Best reference for blur/material usage and the accessibility constraints around translucent surfaces. |

The comparison and scoring in this brief use six practical criteria: **showcase beauty**, **reusability**, **ease of implementation**, **accessibility headroom**, **fit for a demo landing**, and **fit for a dashboard**. Usability guardrails are informed by WCAG 2.2, WAI modal guidance, and Nielsen Norman Group guidance on whitespace, hierarchy, dashboards, neobrutalism, and glassmorphism.

For quick visual inspiration, the most useful official pages to keep open during theming reviews are Geist, Linear, Stripe Elements, Fluent 2, Material 3, Carbon themes, Apple materials, and Atlassian foundations. Those links are better primary references than third-party screenshots because they show the systems in the context their owners consider canonical.

## **Style profiles**

Visual style names such as “Modern SaaS,” “Minimal/Clean,” or “Editorial/Portfolio” are **industry shorthand**, not formal standards. The more durable decision is the **token recipe** behind the style: color roles, corner radius, spacing rhythm, elevation behavior, typography scale, density, and motion defaults. All of the strongest design systems in the source set rely on tokenized decisions rather than hard-coded one-off visuals.

**Minimal/Clean**

This style emphasizes clarity, whitespace, hierarchy, and a quiet visual system. Vercel’s Geist is a strong contemporary reference, especially its emphasis on high-contrast accessible color, disciplined grid use, and developer-centered typography; NN/guidance on hierarchy and whitespace explains why this style stays readable and reusable. It is ideal for docs, productivity tools, portfolios, and a “neutral base theme” for Finn UI.

| **Aspect** | **Recommended Finn UI token values** |
| --- | --- |
| Color | `--bg: #ffffff`; `--surface: #ffffff`; `--muted: #f8fafc`; `--text: #0f172a`; `--text-muted: #475569`; `--border: rgba(15,23,42,.08)`; `--primary: #2563eb` |
| Radius | `8 / 12 / 16 / full` |
| Shadow | `none / 0 1px 2px rgba(15,23,42,.04)` |
| Border | `1px solid rgba(15,23,42,.08)` |
| Typography | system or Inter/Geist-like sans; body `15/24`; heading range `24–40` with moderate weight contrast |
| Density | comfortable; inner padding mostly `12 / 16 / 20`; section spacing `72–96` |
| Motion | subtle; `120–160ms` ease-out; almost no “showy” transform |
| Surface model | flat, solid surfaces; depth comes from spacing and contrast, not blur |
| Button | 44px height; solid primary or neutral outline; no gradient; 12px radius; hover darkens by 4–6% |
| Card | white surface; subtle border; optional `shadow-xs`; padding `20–24` |
| Input | 44px height; quiet border; 2px focus ring; no inset effects |
| Section | mostly white or muted background bands; large vertical spacing; restrained dividers |
| Modal | simple sheet; solid surface; 16px radius; shadow only enough to separate from page |

Accessibility and usability risk is low compared with most other styles, but the main failure mode is **under-signaled affordance**: if borders, focus rings, and active states get too quiet, buttons and inputs can look inert. Keep contrast and focus states comfortably above WCAG minimums.

**Modern SaaS**

This is the best default for Finn UI. It combines semantic clarity with tasteful polish: soft corners, gentle elevation, stronger visual hierarchy, slightly richer brand color, and enough component presence to look “finished” on a landing page. Linear, Stripe, and modern Geist/Vercel surfaces collectively demonstrate the current benchmark for this direction.

| **Aspect** | **Recommended Finn UI token values** |
| --- | --- |
| Color | `--bg: #f8fafc`; `--surface: #ffffff`; `--surface-2: #f8fafc`; `--text: #0f172a`; `--text-muted: #475569`; `--border: rgba(15,23,42,.08)`; `--primary: #4f46e5`; `--accent: #06b6d4` |
| Radius | `10 / 14 / 20 / 24 / full` |
| Shadow | layered soft elevation: `xs / sm / md / lg`; avoid hard black shadows |
| Border | subtle outline plus light tint on interactive surfaces |
| Typography | Geist/Inter-style sans; body `15–16`; label `13–14`; display `44–56`; mono for code/docs |
| Density | comfortable to spacious; cards `20–24`; hero sections `96–128` vertical padding |
| Motion | polished; `140–220ms`, slightly eased; micro-transforms on hover acceptable |
| Surface model | layered cards and panels; occasional quiet gradient or brand tint |
| Button | primary button can have stronger brand fill, 46px height, 14px radius, small lift on hover |
| Card | elevated or outlined surface; 16–20px radius; soft shadow and subtle tint |
| Input | 44–48px height; 14px radius; strong focus ring; clearer placeholder hierarchy |
| Section | hero sections may use soft gradients or muted brand backgrounds; content sections stay restrained |
| Modal | 20px radius; overlay blur optional but light; spacing `24–28`; header and footer clearly separated |

The main risk is **over-decoration**. Once gradients, glows, tinted borders, and hover motion stack together, components start feeling “template-y” rather than premium. The best SaaS examples remain disciplined: polish comes from consistency, not effect count.

**Enterprise/Admin**

This style optimizes for throughput, dense information, predictable patterns, and clarity in forms, tables, and configuration pages. Atlassian and Carbon are particularly useful references here: Atlassian’s foundations show disciplined spacing, radius, and elevation usage, while Carbon’s theme layering demonstrates how to structure surfaces for app shells and dashboards. NN/guidance on dashboards further supports this direction.

| **Aspect** | **Recommended Finn UI token values** |
| --- | --- |
| Color | `--bg: #f8fafc`; `--surface: #ffffff`; `--surface-shell: #f1f5f9`; `--text: #111827`; `--text-muted: #4b5563`; `--border: #d1d5db`; `--primary: #2563eb`; status colors restrained but clear |
| Radius | `4 / 6 / 8 / 12` |
| Shadow | minimal; rely more on borders and layered backgrounds than on big shadows |
| Border | explicit; `1px solid #d1d5db`, stronger dividers in tables and forms |
| Typography | body `14/20`; helper `12/16`; headings `20–28`; monospace where operational data benefits |
| Density | compact to comfortable; controls `36–40` height by default, with compact mode possible |
| Motion | highly functional; `80–160ms`; avoid floaty animations |
| Surface model | shell + content + inset panels; clear page scaffolding |
| Button | 36–40px height; 6–8px radius; strong disabled and pressed states |
| Card | often more like a panel than a marketing card; defined border, muted header strip optional |
| Input | compact outline input with clearly positioned labels, help text, and error text |
| Section | app-shell sections, filter bars, KPI rows, and settings groups benefit from strong framing |
| Modal | structured dialog with form-first layout, predictable actions, strict focus order |

The risk is not accessibility but **perceived blandness**. Enterprise/Admin often looks less “beautiful” in a screenshot unless typography, spacing, and sectional rhythm are polished. Do not confuse this with bad design; it is often the most usable option for data-heavy applications

**Editorial/Portfolio**

This style is led by typography, composition, and imagery more than by component chrome. Framer’s gallery shows how often bold editorial layouts dominate modern portfolio and agency sites, and Aesop is a useful example of how typography and restrained surfaces can carry a brand-heavy experience. This is a good direction for showcase templates, personal sites, and premium marketing pages, but it is weaker as a generic UI-library default.

| **Aspect** | **Recommended Finn UI token values** |
| --- | --- |
| Color | strong contrast or muted luxury palette; often more neutral than colorful; brand tone does the heavy lifting |
| Radius | `0 / 8 / 12` depending brand character |
| Shadow | little or none |
| Border | often none, or used graphically rather than systemically |
| Typography | expressive scale; serif or refined sans for display; body remains readable |
| Density | spacious; large margins and asymmetrical rhythm |
| Motion | `180–260ms`; scroll reveals and media transitions acceptable if respectful of reduced-motion preferences |
| Surface model | content-first; sections feel like layouts rather than cards |
| Button | frequently understated: text-button, quiet pill, or editorial outline treatment |
| Card | image-led module more than “UI card”; typography and crop matter more than elevation |
| Input | usually secondary; forms should keep a more neutral sub-style for usability |
| Section | large display headlines, asymmetry, image/text contrast, and composition-led hierarchy |
| Modal | rare; when needed, it should return to a calmer utility treatment |

The risk is **weak portability**. Once the style depends heavily on a specific display typeface, photography system, or asymmetrical layout language, it stops being a general-purpose component theme and becomes a brand system.

**Neo-brutalism**

Nielsen Norman Group defines neobrutalism as a UI style focused on raw, unrefined elements, bold colors, simple shapes, and intentionally unfinished aesthetics; their earlier brutalism guidance similarly describes digital brutalism as intentionally raw or haphazard. This style is memorable and easy to differentiate in a crowded market, but it is a poor default for a reusable component library unless your brand explicitly depends on that personality.

| **Aspect** | **Recommended Finn UI token values** |
| --- | --- |
| Color | high-saturation fills, frequent black outlines, loud contrast pairs |
| Radius | `0 / 4 / 8` |
| Shadow | hard offset shadow, often `4px 4px 0` or `6px 6px 0` |
| Border | thick `2–3px solid #000` |
| Typography | bold grotesk or display sans; large labels; frequent all-caps accents |
| Density | medium; spacing is not cramped, but the visual weight is high |
| Motion | snappy `80–140ms`; avoid soft springiness |
| Surface model | flat bold slabs; depth comes from offset shadow, not blur |
| Button | solid bright fill, thick outline, visible offset shadow, heavy pressed state |
| Card | thick border, loud title treatment, bold status chips |
| Input | filled or white background with thick dark stroke and conspicuous focus state |
| Section | poster-like blocks; heavy dividers; graphic color bands |
| Modal | comic-book or poster aesthetic: thick frame, hard contrast, almost no transparency |

The risks are **visual fatigue**, **brand narrowness**, and **reduced professional range**. It can be usable if contrast is strong, but it quickly dominates every surface and can make serious workflows feel toy-like or abrasive.

**Glassmorphism**

NN/guidance defines glassmorphism as a style that uses translucency to create depth and contrast, mimicking frosted glass. Apple’s materials guidance and newer Liquid Glass documentation reinforce both the visual potential and the need to manage contrast, separation, reduced transparency, and accessibility settings carefully. It is visually effective on hero surfaces, floating nav bars, overlays, and premium media contexts. It is risky as a system-wide style for dense UI.

| **Aspect** | **Recommended Finn UI token values** |
| --- | --- |
| Color | semitransparent surface tints over strong or graphic backdrops; foreground colors must remain solid and high-contrast |
| Radius | `16 / 20 / 24 / 28` |
| Shadow | soft ambient depth; glows only if subtle |
| Border | `1px solid rgba(255,255,255,.22)` plus stronger edge when needed |
| Typography | medium-weight sans; avoid ultra-thin text |
| Density | spacious; glass needs air around it |
| Motion | `180–240ms`; smooth fade/scale; honor reduced-motion preferences |
| Surface model | translucent surfaces with `backdrop-filter: blur(12px–24px)` |
| Button | either translucent with strong border/text contrast or a fully opaque brand button placed on glass |
| Card | frosted surface with edge highlight; content density kept low |
| Input | dangerous if fully glass; better to use a more opaque fill and a stronger stroke than the surrounding card |
| Section | best as a hero or floating nav band over gradient or imagery, not as every section treatment |
| Modal | very effective visually, but must have stronger opacity and clear boundaries than background glass panels |

The primary risks are **contrast loss**, **ambiguous layering**, and **performance cost**. Apple explicitly notes the role of reduced-transparency accessibility settings, and WCAG contrast requirements still apply regardless of aesthetic trend. Glass should be an appearance, not a baseline theme, for Finn UI.

**Material/Fluent-like**

Material 3 and Fluent 2 are not visually identical, but they share a very important product philosophy: semantic tokens, documented states, standardized shape/spacing systems, and functional motion. Material 3 centers theming on color, typography, and shape roles, while Fluent 2 documents token layers plus concrete radius and spacing scales. If you want Finn UI to feel “professionally systemized,” this family is the best implementation reference.

| **Aspect** | **Recommended Finn UI token values** |
| --- | --- |
| Color | semantic roles first: `primary`, `on-primary`, `surface`, `surface-variant`, `outline`, `error`, `success`, `warning` |
| Radius | `4 / 8 / 12 / 16` with component-specific recipes |
| Shadow | formal elevation levels or shadow aliases rather than freehand values |
| Border | role-based; border strength changes by state and surface context |
| Typography | structured type scale; body, label, title, headline, display roles |
| Density | comfortable by default; compact variants available |
| Motion | functional, documented, and tokenized |
| Surface model | explicit surface layers and state layers rather than ad hoc card treatments |
| Button | standardized filled / tonal / outlined / text variants with state tokens |
| Card | distinct filled / outlined / elevated recipes, not “one card to rule them all” |
| Input | full field anatomy: label, helper, error, prefix/suffix, focus, disabled, read-only |
| Section | scaffold-like layout primitives, app bars, shells, list-group patterns |
| Modal | behavior and accessibility matter as much as visuals: trapped focus, inert background, structured actions |

The main tradeoff is **implementation complexity**. This family is excellent for consistency and accessibility, but it demands more discipline in token naming, state modeling, and component anatomy than lighter visual styles do.

**Neumorphism**

Neumorphism uses tone-on-tone surfaces, light and shadow, and inset/extruded treatments to make elements feel soft and tactile. The problem is structural: even accessibility-focused commentators note that low contrast and subtle affordances are intrinsic risks, and Smashing Magazine has called out neopmorphism’s serious accessibility flaws when overused. Treat it as an experiment or decorative accent, not a primary production style.

| **Aspect** | **Recommended Finn UI token values** |
| --- | --- |
| Color | monochrome or near-monochrome surface palette; avoid pure white-on-white |
| Radius | `12 / 16 / 20 / 24` |
| Shadow | dual outer/inset shadows with soft blur and low spread |
| Border | usually none, which is part of the problem |
| Typography | restrained sans; contrast must come from tone and weight |
| Density | comfortable, tactile, not compact |
| Motion | `150–220ms`; soft press transitions |
| Surface model | component and background share nearly the same tone |
| Button | extruded by default; inset on press |
| Card | embossed rather than elevated |
| Input | inset treatment can look attractive but often weakens affordance |
| Section | monochrome panels; decorative more than informational |
| Modal | difficult to separate from background without breaking the style |

The primary risks are **poor discoverability**, **low contrast**, and **weak state signaling**. If you ship any neumorphic appearance at all, it should be opt-in and limited to non-critical surfaces.

## **Comparison matrix**

The table below uses a **1–5 scale**, where **5 is best** for Finn UI’s goals. The numbers are synthesized from the official systems above, plus WCAG and NN/guidance on accessibility and visual hierarchy. They are comparative planning scores, not objective truths.

| **Style** | **Showcase beauty** | **Reusability** | **Ease of implementation** | **Accessibility headroom** | **Demo landing fit** | **Dashboard fit** | **Recommended role in Finn UI** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Modern SaaS | 5.0 | 4.5 | 4.0 | 4.0 | 5.0 | 4.0 | **Default visual direction** |
| Minimal/Clean | 3.5 | 5.0 | 5.0 | 5.0 | 4.0 | 4.0 | **Secondary theme** |
| Enterprise/Admin | 3.0 | 5.0 | 4.5 | 5.0 | 2.5 | 5.0 | **Secondary theme** |
| Material/Fluent-like | 4.0 | 4.5 | 3.5 | 5.0 | 3.5 | 4.5 | Architectural reference, not a direct visual copy |
| Editorial/Portfolio | 4.5 | 2.5 | 3.0 | 3.5 | 5.0 | 2.0 | Template/marketing mode only |
| Glassmorphism | 4.5 | 2.5 | 2.5 | 2.5 | 4.5 | 2.0 | Appearance for select surfaces only |
| Neo-brutalism | 3.5 | 2.0 | 4.0 | 2.5 | 3.5 | 1.5 | Experimental appearance only |
| Neumorphism | 2.5 | 1.5 | 3.0 | 1.5 | 2.5 | 1.5 | Avoid except as a lab experiment |

A useful way to read this matrix is simple: **Modern SaaS wins on balance**, **Minimal/Clean wins on neutrality**, and **Enterprise/Admin wins on operational clarity**. The rest are valuable as references or accents, but not as the center of gravity for Finn UI.

## **Recommended direction for Finn UI**

Finn UI should ship with **one default theme** and **two secondary themes**:

| **Role** | **Recommendation** | **Why** |
| --- | --- | --- |
| Default | **Modern SaaS** | Best combination of polish, reuse, and demo value |
| Secondary | **Minimal/Clean** | Gives you a quieter, more universal mode |
| Secondary | **Enterprise/Admin** | Gives you a denser, operational mode for apps and dashboards |
| Appearance-only | **Glass**, **Neo-brutal** | Use as local visual treatments, not full-system themes |

That recommendation is consistent with how the strongest modern systems separate **semantic theming** from **component anatomy**: Material, Fluent, Atlassian, Carbon, and Stripe all emphasize tokenized customization instead of cloning entirely different component APIs for each look.

A practical token scale for Finn UI should be small, semantic, and stable enough to survive theme expansion. A good first scale is shown below.

| **Token family** | **Suggested scale** |
| --- | --- |
| Colors | `bg`, `surface`, `surface-2`, `surface-3`, `text`, `text-muted`, `border`, `border-strong`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `success`, `warning`, `danger`, `info`, `focus-ring` |
| Radius | `0`, `4`, `8`, `12`, `16`, `20`, `24`, `full` |
| Spacing | `0`, `2`, `4`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `64`, `80`, `96`, `128` |
| Shadow | `none`, `xs`, `sm`, `md`, `lg`, `xl` |
| Typography roles | `display`, `headline`, `title`, `body`, `label`, `code` |
| Density modes | `compact`, `cozy`, `comfortable` |
| Motion | `fast=120ms`, `normal=180ms`, `slow=240ms`; easing aliases for `standard`, `decelerate`, `emphasized` |
| Borders | `subtle`, `default`, `strong`, plus focus-ring thickness tokens |

This favors semantic naming over raw visual naming, which is the same direction recommended by Material 3 migration guidance and by the token models in Fluent, Atlassian, and Carbon. In other words, name tokens by **role**, not by the old hard-coded color or an aesthetic style.

The first components to polish should be the ones that most clearly broadcast a visual system in both **landing** and **app** contexts: **Button**, **Card/Surface**, **Input/TextField**, **Section/Container**, and **Modal/Dialog**. After those, the next most valuable pieces are **Select**, **Badge**, **Tabs**, and **Table/Data surface**. This order gives you the most visual leverage per component while also covering the core accessibility and interaction risks called out by WCAG and the WAI dialog pattern.

Finn UI should implement visual direction across **three layers**, not one:

| **Layer** | **What belongs here** | **What does not** |
| --- | --- | --- |
| Theme | large token differences such as Minimal, Modern SaaS, Enterprise | component-specific hacks |
| Appearance | localized style treatments such as `glass`, `brutal`, or `editorial` on select components/sections | app-wide semantic meaning |
| Variant | component semantics such as `solid`, `outline`, `ghost`, `elevated`, `quiet`, `danger` | global branding choices |

This structure prevents API sprawl. A `Button` should not become `SaaSButton`, `BrutalButton`, and `GlassButton`; it should remain a stable component with theme-driven styles and a small, semantic variant set. That approach matches the broader token-and-theme philosophy documented by Material, Fluent, Atlassian, Carbon, and Stripe.

The architecture should look like this:

- code diagram
    
    flowchart LR
    A[Base token scales<br/>color radius space type motion] --> B[Semantic theme tokens<br/>bg surface text border primary status]
    B --> C[Component recipes<br/>Button Card Input Modal Section]
    C --> D[Variants<br/>solid outline ghost elevated]
    C --> E[Appearances<br/>glass brutal editorial]
    D --> F[Blocks and sections<br/>Hero Pricing Dashboard Settings]
    E --> F
    F --> G[Pages and Storybook demos]
    

!image.png

That flow is directly aligned with how modern systems describe tokens as the building blocks of components, and how themes modify components without redefining their structure.

The most important migration note is this: **do not encode style names into component anatomy**. Keep your core component API stable, keep tokens semantic, and add new looks by swapping theme values or opt-in appearances. If Finn UI later introduces an editorial landing template or a glass hero, those should sit above the base primitives rather than forcing the primitives themselves to become style-specific. Material’s migration guidance is especially clear that semantic roles scale better than hex-based naming; the same logic applies to style-specific props.

## **Implementation appendix**

The CSS variable model below is suitable for a design-spec PR and for Storybook theme switching. It keeps the same semantic token names across themes and only changes values, which is exactly the approach promoted by the primary systems in this research set.

```css
cssCopy
:root[data-theme="modern-saas"] {
  --finn-bg: #f8fafc;
  --finn-surface: #ffffff;
  --finn-surface-2: #f8fafc;
  --finn-text: #0f172a;
  --finn-text-muted: #475569;
  --finn-border: rgba(15, 23, 42, 0.08);
  --finn-border-strong: rgba(15, 23, 42, 0.16);
  --finn-primary: #4f46e5;
  --finn-primary-foreground: #ffffff;
  --finn-radius-sm: 10px;
  --finn-radius-md: 14px;
  --finn-radius-lg: 20px;
  --finn-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
  --finn-shadow-md: 0 8px 24px rgba(15, 23, 42, 0.08);
  --finn-focus-ring: 0 0 0 3px rgba(79, 70, 229, 0.28);
}

:root[data-theme="minimal-clean"] {
  --finn-bg: #ffffff;
  --finn-surface: #ffffff;
  --finn-surface-2: #f8fafc;
  --finn-text: #0f172a;
  --finn-text-muted: #475569;
  --finn-border: rgba(15, 23, 42, 0.08);
  --finn-border-strong: rgba(15, 23, 42, 0.14);
  --finn-primary: #2563eb;
  --finn-primary-foreground: #ffffff;
  --finn-radius-sm: 8px;
  --finn-radius-md: 12px;
  --finn-radius-lg: 16px;
  --finn-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.04);
  --finn-shadow-md: 0 8px 20px rgba(15, 23, 42, 0.06);
  --finn-focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.24);
}

:root[data-theme="enterprise-admin"] {
  --finn-bg: #f8fafc;
  --finn-surface: #ffffff;
  --finn-surface-2: #f1f5f9;
  --finn-text: #111827;
  --finn-text-muted: #4b5563;
  --finn-border: #d1d5db;
  --finn-border-strong: #9ca3af;
  --finn-primary: #2563eb;
  --finn-primary-foreground: #ffffff;
  --finn-radius-sm: 4px;
  --finn-radius-md: 6px;
  --finn-radius-lg: 8px;
  --finn-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.04);
  --finn-shadow-md: 0 8px 18px rgba(15, 23, 42, 0.06);
  --finn-focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.22);
}
```

A component recipe should consume semantic tokens rather than theme names:

```css
cssCopy
.finn-button[data-variant="solid"] {
  background: var(--finn-primary);
  color: var(--finn-primary-foreground);
  border: 1px solid transparent;
  border-radius: var(--finn-radius-md);
  box-shadow: var(--finn-shadow-sm);
}

.finn-card[data-variant="elevated"] {
  background: var(--finn-surface);
  color: var(--finn-text);
  border: 1px solid var(--finn-border);
  border-radius: var(--finn-radius-lg);
  box-shadow: var(--finn-shadow-md);
}

.finn-input {
  background: var(--finn-surface);
  color: var(--finn-text);
  border: 1px solid var(--finn-border);
  border-radius: var(--finn-radius-md);
}

.finn-input:focus-visible,
.finn-button:focus-visible {
  outline: none;
  box-shadow: var(--finn-focus-ring);
}
```

That separation is what will let Finn UI support a future `glass` or `editorial` appearance on top of the same primitives without rewriting the primitives themselves. It also keeps you aligned with WCAG focus guidance and semantic role-based theming.

A short implementation timeline that fits a theme-first Storybook workflow is below.

- **code diagram**
    
    gantt
    title Finn UI style rollout
    dateFormat  YYYY-MM-DD
    section Foundations
    Token audit and semantic map            :a1, 2026-07-07, 5d
    Storybook theme switcher and docs       :a2, after a1, 4d
    section Default theme
    Modern SaaS token pass                  :b1, after a2, 5d
    Polish Button Card Input Section Modal  :b2, after b1, 10d
    section Secondary themes
    Minimal/Clean theme                     :c1, after b2, 4d
    Enterprise/Admin theme                  :c2, after c1, 5d
    section Optional appearances
    Glass appearance for Card Modal Hero    :d1, after c2, 4d
    Neo-brutal appearance lab               :d2, after d1, 3d
    section Quality
    Contrast, focus, dialog, dark-mode QA   :e1, after d2, 5d
    

!image.png

Before merging any theme PR, Storybook should show every polished component in at least these states: default, hover, focus-visible, disabled, destructive, loading, light mode, dark mode, and the three recommended themes. Modal stories should also verify focus trapping and inert background behavior per the WAI modal-dialog pattern.

The practical takeaway is straightforward: **start with Modern SaaS**, keep the **token language semantic**, add **Minimal/Clean** and **Enterprise/Admin** next, and reserve heavier stylistic treatments like **Glass** or **Neo-brutalism** for appearances and showcase sections rather than for the whole component library. That gives Finn UI the best chance to be both personally useful and publicly convincing.