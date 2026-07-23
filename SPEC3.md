# INTERFACE STYLE RESEARCH

## Product, Business Logic & UX Specification — Version 2

**Project:** Interface Style Research
**Research scope:** Modern Interface Styles 2000–2026
**Product type:** Interactive Research & Decision-Support Platform

---

# 1. PRODUCT OVERVIEW

Interface Style Research là một nền tảng nghiên cứu tương tác giúp người dùng:

1. Khám phá các hướng thiết kế giao diện.
2. Hiểu nguyên lý phía sau từng phong cách.
3. So sánh nhiều hướng thiết kế trong cùng một bối cảnh.
4. Hiểu lịch sử và mối quan hệ giữa các phong cách.
5. Đánh giá trade-off về usability, accessibility, implementation và product fit.
6. Hỗ trợ lựa chọn hướng thiết kế phù hợp với một sản phẩm cụ thể.

Sản phẩm không chỉ là:

```text
UI Style Gallery
```

mà là:

```text
Research Knowledge Base

+

Comparison System

+

Decision-Support Tool
```

---

# 2. CORE PRODUCT PROBLEM

Khi bắt đầu thiết kế một sản phẩm, developer hoặc designer thường gặp vấn đề:

> “Tôi biết nhiều phong cách UI khác nhau nhưng không biết chúng thực sự khác nhau thế nào và phong cách nào phù hợp với sản phẩm của mình.”

Thông tin hiện tại thường bị phân tán:

```text
Pinterest
Awwwards
Dribbble
Articles
Design Systems
Trend reports
```

Các nguồn này thường trả lời tốt câu hỏi:

> “UI này trông như thế nào?”

nhưng không trả lời đầy đủ:

> “Tại sao nên dùng?”

> “Khi nào không nên dùng?”

> “Trade-off là gì?”

> “Style A khác Style B trong cùng một product context như thế nào?”

Interface Style Research giải quyết khoảng trống này.

---

# 3. PRODUCT VALUE PROPOSITION

Sản phẩm chuyển đổi:

```text
Visual Inspiration
```

thành:

```text
Structured Design Knowledge
```

và tiếp tục chuyển:

```text
Structured Knowledge
```

thành:

```text
Design Decision Support
```

Core flow:

```text
DISCOVER

↓

UNDERSTAND

↓

COMPARE

↓

EVALUATE

↓

DECIDE
```

---

# 4. TARGET USERS

## 4.1. Frontend Developer

Nhu cầu:

* hiểu visual characteristics;
* hiểu token;
* xem implementation pattern;
* biết độ phức tạp khi triển khai;
* lựa chọn style phù hợp với project.

---

## 4.2. UI/UX Designer

Nhu cầu:

* nghiên cứu design direction;
* so sánh visual language;
* hiểu strengths / limitations;
* tham khảo product-context fit;
* xây dựng visual direction.

---

## 4.3. Product Designer

Nhu cầu:

* cân bằng aesthetics với usability;
* đánh giá scalability;
* đánh giá accessibility;
* lựa chọn direction phù hợp với business/product context.

---

## 4.4. Student / Learner

Nhu cầu:

* hiểu lịch sử UI;
* hiểu terminology;
* hiểu quan hệ giữa các style;
* học cách phân tích UI có hệ thống.

---

# 5. PRIMARY BUSINESS OBJECTIVES

Sản phẩm có 5 business/product objectives chính.

## Objective 1 — Knowledge Organization

Biến research phân tán thành:

```text
Structured Knowledge System
```

---

## Objective 2 — Reduce Decision Complexity

Giảm việc lựa chọn UI dựa hoàn toàn vào:

```text
"I think this looks nice."
```

Thay bằng:

```text
Product Context

+

User Needs

+

Constraints

+

Trade-offs
```

---

## Objective 3 — Enable Fair Comparison

Cho phép so sánh:

```text
same content
same functionality
same context
different design direction
```

để tránh comparison sai lệch.

---

## Objective 4 — Preserve Research Traceability

Mọi conclusion quan trọng phải có thể truy ngược về:

```text
Source

Observation

Reasoning
```

---

## Objective 5 — Turn Research into Action

Research không chỉ để đọc.

Phải có khả năng dẫn tới:

```text
Recommendation

Decision

Implementation Direction
```

---

# 6. CORE BUSINESS PRINCIPLE

Không tồn tại:

```text
BEST UI STYLE
```

Chỉ tồn tại:

```text
BETTER FIT
```

cho một:

```text
Product

User

Context

Constraint
```

Do đó hệ thống không được tạo:

```text
Global ranking
```

kiểu:

```text
1. Minimal
2. Modern SaaS
3. Glass
```

Thay vào đó:

```text
Best fit for dense dashboard

Best fit for expressive portfolio

Best fit for accessibility-critical product
```

---

# 7. DOMAIN MODEL

Hệ thống xoay quanh 7 domain entity chính.

```text
STYLE

CONTEXT

CRITERION

EVALUATION

COMPARISON

SOURCE

RELATIONSHIP
```

Sau này thêm:

```text
RECOMMENDATION
```

---

# 8. DOMAIN ENTITY — STYLE

`Style` là một design direction được nghiên cứu.

Ví dụ:

```text
Modern SaaS

Minimal

Glassmorphism

Neo-Brutalism

Material

Flat Design
```

Một Style phải chứa:

```text
Identity

Classification

Definition

Principles

Visual DNA

Reference Tokens

Patterns

Evaluation

Product Fit

Historical Context

Relationships

Evidence
```

---

# 9. BUSINESS RULE — STYLE KHÔNG NHẤT THIẾT CÙNG LOẠI

Hệ thống phải phân biệt:

## Interface Direction

Ví dụ:

```text
Modern SaaS
Enterprise/Admin
Editorial
```

---

## Visual Aesthetic

```text
Glassmorphism
Neumorphism
Neo-Brutalism
```

---

## Design Language

```text
Material
Fluent
```

---

## Historical Movement

```text
Skeuomorphism
Flat Design
Web 2.0
```

Business rule:

```text
A real product may combine multiple categories.
```

Ví dụ:

```text
Enterprise Dashboard

+

Material interaction language

+

Minimal visual treatment
```

Do đó không được coi:

```text
Enterprise vs Material
```

luôn là hai lựa chọn mutually exclusive.

---

# 10. DOMAIN ENTITY — PRODUCT CONTEXT

Một style không được đánh giá độc lập với context.

Các Product Context ban đầu:

```text
SaaS Product

Dashboard / Admin

Marketing / Landing

Portfolio

E-commerce

Documentation

Mobile Application

Experimental Experience
```

Sau này có thể mở rộng.

---

# 11. DOMAIN ENTITY — EVALUATION CRITERION

Các style được đánh giá theo cùng một framework.

Core criteria:

```text
Usability

Accessibility

Implementation Complexity

Scalability

Information Density

Visual Expression
```

Không dùng:

```text
Beauty
```

như một scientific metric tuyệt đối.

Có thể dùng:

```text
Visual Expression
```

vì dễ định nghĩa hơn.

---

# 12. EVALUATION BUSINESS LOGIC

Một Evaluation không chỉ là số.

Cấu trúc:

```text
Criterion

↓

Level

↓

Reasoning

↓

Strengths

↓

Risks

↓

Evidence
```

Ví dụ:

```text
ACCESSIBILITY

Requires Care

Why:

Transparent surfaces make effective
contrast dependent on background content.

Strength:

Can remain accessible with controlled surfaces.

Risks:

Contrast loss
Boundary ambiguity

Evidence:

WCAG principles
Production observations
```

---

# 13. EVALUATION LEVELS

Dùng controlled vocabulary:

```text
VERY STRONG

STRONG

MODERATE

REQUIRES CARE

WEAK
```

Không dùng decimal giả chính xác như:

```text
4.37 / 5
```

trừ khi sau này có methodology định lượng thực sự.

---

# 14. PRODUCT FIT BUSINESS LOGIC

Một style có một tập `ProductFit`.

Ví dụ:

```text
Glassmorphism

Landing
HIGH

Dashboard
LOW

Portfolio
HIGH
```

Mỗi fit phải có:

```text
level

reason

conditions

risks
```

Ví dụ:

```text
Dashboard

LOW

Reason:
Dense information requires stable hierarchy
and predictable surface boundaries.

Condition:
Localized glass can still be used for overlays
or navigation surfaces.
```

---

# 15. IMPORTANT BUSINESS RULE

Không được kết luận:

```text
Glassmorphism is bad for dashboards.
```

Phải nói:

```text
Glassmorphism as a dominant visual system
has lower suitability for dense dashboards.

Selective use may still be appropriate.
```

Hệ thống cần tránh binary reasoning.

---

# 16. DOMAIN ENTITY — RELATIONSHIP

Style relationships gồm:

```text
Influenced By

Reacted Against

Related To

Shares Principles With

Revives Concepts From

Often Combined With
```

Không dùng duy nhất:

```text
parent → child
```

vì lịch sử design không phải cây genealogy đơn giản.

---

# 17. DOMAIN ENTITY — SOURCE

Research Source gồm:

```text
Primary Documentation

Production Reference

Historical Reference

Secondary Analysis
```

Mọi critical claim nên liên kết tới ít nhất một source hoặc research inference.

---

# 18. CORE USER JOURNEY

User journey chính:

```text
LANDING

↓

EXPLORE

↓

SELECT STYLE

↓

UNDERSTAND STYLE

↓

COMPARE

↓

UNDERSTAND TRADE-OFF

↓

MAKE DECISION
```

Parallel journey:

```text
LANDING

↓

EVOLUTION

↓

DISCOVER HISTORICAL MOVEMENT

↓

OPEN STYLE DOSSIER
```

Future journey:

```text
LANDING

↓

FIND A STYLE

↓

ENTER PRODUCT CONTEXT

↓

ENTER PRIORITIES

↓

RECOMMENDATION

↓

COMPARE RECOMMENDATIONS
```

---

# 19. SYSTEM ROUTES

```text
/

├── /styles
│     └── /styles/:slug
│
├── /compare
│
├── /evolution
│
├── /methodology
│
├── /finder
│
└── /report
```

---

# 20. ROUTE — `/`

## Business Purpose

Convert a first-time visitor into an active research journey.

User phải hiểu:

```text
What is this?

What problem does it solve?

What can I do here?

Where should I start?
```

---

## Section 1 — Hero

UI:

```text
Understand.
Compare.
Choose better UI directions.
```

Business intent:

Truyền đạt value proposition.

CTA:

```text
Explore Styles
→ /styles

Compare Styles
→ /compare
```

---

## Section 2 — Research Scope

UI:

```text
13+ UI Directions

5 Research Lenses

2000–2026
```

Business intent:

Thiết lập credibility và scope.

Không phải vanity statistics.

---

## Section 3 — Featured Directions

Business logic:

Không chọn 6 style ngẫu nhiên.

Phải cover nhiều classification.

Ví dụ:

```text
Modern SaaS
→ interface direction

Minimal
→ broad visual direction

Glassmorphism
→ aesthetic

Material
→ design language

Flat
→ historical paradigm

Web 2.0
→ historical aesthetic
```

Business intent:

Cho user thấy diversity của knowledge system.

---

## Section 4 — Research Framework

Giới thiệu:

```text
Visual Language

Usability

Accessibility

Implementation

Product Fit
```

Business intent:

Cho user hiểu các style không chỉ được phân tích dựa trên hình thức.

---

## Section 5 — Compare Teaser

Business intent:

Giới thiệu core differentiation của product.

Không so sánh bằng:

```text
Overall Score
```

Mà:

```text
Trade-offs
```

---

## Section 6 — Evolution Teaser

Business intent:

Cho thấy style không tồn tại độc lập.

Chúng:

```text
emerge

react

adapt

revive
```

---

# 21. ROUTE — `/styles`

## Business Purpose

Search và discover research entity.

Không phải chỉ gallery.

User task:

```text
Find a relevant style

Understand classification

Open research dossier
```

---

# 22. STYLE EXPLORER BUSINESS FEATURES

## Search

Search theo:

```text
Name

Alias

Keyword

Classification

Characteristic
```

---

## Filter

Filter:

```text
Classification

Era

Density

Visual Weight

Production Maturity
```

Không nên expose quá nhiều filter từ đầu.

Primary:

```text
Classification
```

---

## Sorting

Future:

```text
Alphabetical

Historical

Most relevant to context
```

Không cần phase đầu.

---

# 23. STYLE SELECTION FLOW

Khi user click style:

```text
Style Card

↓

/styles/:slug
```

Selected style phải được encode vào URL.

Business reason:

```text
Shareable

Bookmarkable

Linkable

SEO-friendly

Back/forward navigation
```

---

# 24. ROUTE — `/styles/:slug`

## Business Purpose

Biến một style từ:

```text
visual concept
```

thành:

```text
structured research object
```

User phải ra khỏi page với khả năng trả lời:

```text
What is it?

Why does it look like that?

How is it implemented?

Where does it work?

What are the risks?

What is it related to?
```

---

# 25. DOSSIER — OVERVIEW

Business questions:

```text
What is it?

What problem or philosophy does it represent?

What makes it distinct?
```

Content:

```text
Definition

Core Philosophy

Best Fit

Use Carefully

Strengths

Risks
```

---

# 26. DOSSIER — VISUAL DNA

Business purpose:

Normalize qualitative style characteristics để có thể compare.

Dimensions:

```text
Depth

Decoration

Density

Motion

Visual Weight

Brand Expression
```

Giá trị:

```text
Low
Medium
High
```

hoặc controlled scale.

Không dùng trực tiếp làm “quality score”.

---

# 27. DOSSIER — REFERENCE IMPLEMENTATION

Business purpose:

Bridge:

```text
Research
→
Engineering
```

Bao gồm:

```text
Color

Typography

Surface

Radius

Border

Shadow

Spacing

Motion
```

Business rule:

Tokens là:

```text
Representative implementation
```

không phải:

```text
Official definition
```

trừ khi style đến từ một design system chính thức.

---

# 28. DOSSIER — PATTERNS

Business purpose:

Chứng minh principles có thể chuyển thành UI patterns.

Pattern entity:

```text
Pattern Name

Purpose

Specimen

Why it fits

Risks

Context
```

Ví dụ:

```text
Glass Card

Suitable:
Hero / overlay content

Risk:
Text contrast varies with background
```

---

# 29. DOSSIER — SAME-CONTEXT SPECIMEN

Business purpose:

Chuẩn hóa comparison baseline.

System phải có shared scenarios:

```text
Dashboard

Landing

Form

Navigation

Pricing

Card
```

Mỗi scenario dùng:

```text
same content

same information hierarchy

same user goal

same functionality
```

Chỉ đổi:

```text
design direction
```

Điều này tạo fair comparison.

---

# 30. DOSSIER — EVALUATION

Business purpose:

Chuyển research thành actionable insight.

Evaluation:

```text
Usability

Accessibility

Implementation

Scalability

Information Density

Visual Expression
```

Mỗi criterion phải trả lời:

```text
What?

Why?

When does it become a problem?

What conditions improve it?
```

---

# 31. DOSSIER — PRODUCT FIT

Business question:

> Style này phù hợp với business/product context nào?

Context matrix:

```text
SaaS

Dashboard

Landing

Portfolio

E-commerce

Documentation

Mobile

Experimental
```

Không chỉ:

```text
HIGH
```

Phải có:

```text
reason
```

---

# 32. DOSSIER — RELATED DIRECTIONS

Business purpose:

Giúp user tiếp tục discovery.

Ví dụ:

```text
Glassmorphism

Related to
→ Fluent

Historical influence
→ Aero

Often combined with
→ Modern SaaS
```

CTA:

```text
Compare with Modern SaaS
```

---

# 33. DOSSIER — SOURCES

Business purpose:

Research traceability.

User có thể biết:

```text
Which claims are documented?

Which are observations?

Which are interpretations?
```

---

# 34. ROUTE — `/compare`

## Business Purpose

Giải quyết decision conflict:

> “Tôi đang cân nhắc nhiều UI direction. Sự khác biệt thực sự là gì?”

Core business principle:

```text
Compare trade-offs

not winners
```

---

# 35. COMPARE SELECTION BUSINESS RULES

User chọn:

```text
Minimum: 2 styles

Recommended maximum: 3 styles
```

Reason:

Trên 3:

```text
cognitive load ↑

visual comparison quality ↓
```

---

# 36. COMPARE URL STATE

Ví dụ:

```text
/compare?styles=modern-saas,minimal
```

Business benefit:

```text
share comparison

bookmark

return later

link from dossier
```

---

# 37. COMPARE SECTION — AT A GLANCE

Business purpose:

Tóm tắt positioning.

Không đánh giá tốt/xấu.

Ví dụ:

```text
Modern SaaS

Product-focused
Polished
Medium-high density
```

vs

```text
Minimal

Clarity-focused
Restrained
Flexible
```

---

# 38. COMPARE SECTION — SAME CONTEXT

Đây là business core của comparison.

User chọn:

```text
Dashboard
```

System render:

```text
Modern SaaS Dashboard

Minimal Dashboard

Glass Dashboard
```

Tất cả:

```text
same data

same tasks

same structure
```

Business value:

User đánh giá được tác động của style lên cùng một nghiệp vụ.

---

# 39. EXAMPLE BUSINESS SCENARIO — DASHBOARD

Same task:

> User cần kiểm tra doanh thu, số đơn hàng, conversion và recent transactions.

Shared data:

```text
Revenue
$42,500

Orders
1,284

Conversion
3.8%

Recent Transactions
...
```

Modern SaaS:

```text
Soft cards
Moderate color
Rounded components
```

Minimal:

```text
Reduced decoration
Typography hierarchy
Borders
```

Glass:

```text
Transparent panels
Blur
Layered backgrounds
```

Nghiệp vụ giữ nguyên.

Visual implementation thay đổi.

Đây là comparison hợp lệ.

---

# 40. COMPARE — CRITERIA MATRIX

System compare:

```text
Visual DNA

Usability

Accessibility

Implementation

Information Density

Product Fit
```

Không cần global total.

---

# 41. CONTEXT-AWARE COMPARISON

User có thể chọn:

```text
Evaluating for:

Dashboard
```

Khi context thay đổi:

```text
Dashboard
→ accessibility + density weight cao hơn

Portfolio
→ expression + branding weight cao hơn
```

Không nhất thiết expose weighting formula ở phase đầu.

Nhưng business logic phải hiểu:

```text
Evaluation relevance depends on context.
```

---

# 42. COMPARE — DECISION SUMMARY

System không nói:

```text
Winner: Minimal
```

System nói:

```text
Choose Minimal when...

Choose Modern SaaS when...

Use Glass when...
```

---

# 43. ROUTE — `/evolution`

## Business Purpose

Giải thích:

```text
why interface styles changed
```

Không chỉ:

```text
when they appeared
```

---

# 44. EVOLUTION DOMAIN MODEL

Một evolution event:

```text
Period

Movement

Context

Characteristics

Drivers

Limitations

Impact

Relationships

Sources
```

---

# 45. TRANSITION BUSINESS LOGIC

Ví dụ:

```text
Skeuomorphism
```

không đơn giản:

```text
↓ replaced by

Flat
```

Phải model:

```text
Skeuomorphism

↓

digital familiarity increased
mobile interfaces matured
visual complexity became costly

↓

strong shift toward abstraction

↓

Flat Design
```

Cần thể hiện:

```text
cause

reaction

influence
```

---

# 46. EVOLUTION — TAXONOMY

Business purpose:

Giải quyết confusion về terminology.

User phải hiểu:

```text
Glassmorphism
```

không cùng loại concept với:

```text
Enterprise Dashboard
```

Taxonomy giúp user hiểu composition.

---

# 47. ROUTE — `/methodology`

## Business Purpose

Giải thích:

> Tại sao research này đáng tin?

Methodology là một phần nghiệp vụ của knowledge platform, không chỉ About page.

---

# 48. RESEARCH WORKFLOW

Mỗi style phải đi qua process:

```text
DISCOVER

↓

COLLECT SOURCES

↓

CLASSIFY

↓

DECOMPOSE

↓

REPRODUCE

↓

EVALUATE

↓

COMPARE

↓

PUBLISH
```

---

# 49. THREE-LAYER RESEARCH RULE

Mọi style dossier phải phân biệt:

## A. Style Principle

```text
Điều gì định nghĩa style?
```

---

## B. Demo Implementation

```text
Project này chọn cách nào
để minh họa style?
```

---

## C. Research Interpretation

```text
Project kết luận gì sau khi
so sánh và quan sát?
```

Không được trộn ba lớp này.

---

# 50. REPORT AS RESEARCH BACKEND

Báo cáo:

> “Phân loại và phân tích so sánh các phong cách thiết kế giao diện hiện đại 2000–2026”

được xem như:

```text
Research Backend
```

Concept:

```text
REPORT

↓

NORMALIZED KNOWLEDGE

↓

PRODUCT FEATURES
```

---

# 51. REPORT PROCESSING PIPELINE

Không copy report trực tiếp.

Process:

```text
Chapter

↓

Extract Claims

↓

Extract Sources

↓

Classify Information

↓

Normalize into Schema

↓

Render into Product
```

---

# 52. EXAMPLE REPORT TRANSFORMATION

Report:

```text
Glassmorphism

History
Characteristics
Advantages
Disadvantages
Accessibility
Examples
```

Transform:

```text
overview

principles

visualDNA

evaluation

productFit

relationships

evolution

sources
```

---

# 53. ROUTE — `/finder`

## Business Purpose

Giải quyết:

> “Tôi có product requirement nhưng chưa biết chọn UI direction.”

Đây là decision-support workflow.

---

# 54. FINDER FLOW

```text
PRODUCT TYPE

↓

USER / USAGE CONTEXT

↓

PRIORITIES

↓

CONSTRAINTS

↓

STYLE MATCHING

↓

RECOMMENDATIONS

↓

COMPARE
```

---

# 55. FINDER STEP 1 — PRODUCT TYPE

Question:

```text
What are you building?
```

Options:

```text
SaaS

Admin Dashboard

Portfolio

E-commerce

Marketing Website

Documentation

Mobile Product
```

---

# 56. FINDER STEP 2 — USAGE CONTEXT

Ví dụ:

```text
How will users use it?
```

Factors:

```text
Frequent daily usage

Short campaign visit

Long reading session

Data-heavy workflows

Transaction workflows
```

Đây là nghiệp vụ quan trọng.

Không chỉ hỏi:

```text
What style do you like?
```

---

# 57. FINDER STEP 3 — PRIORITIES

```text
Accessibility

Information Density

Brand Expression

Visual Impact

Scalability

Fast Implementation

Long-term Maintainability
```

---

# 58. FINDER STEP 4 — CONSTRAINTS

Ví dụ:

```text
Accessibility-critical?

Data-heavy?

Low-end devices?

Complex responsive requirements?

Strict brand guidelines?

Small development team?
```

---

# 59. MATCHING LOGIC

Conceptual logic:

```text
MATCH SCORE

=

Product Context Match

+

Usage Context Match

+

Priority Match

+

Constraint Compatibility

−

Risk Penalties
```

Score dùng để rank recommendation internally.

Không tuyên bố scientific accuracy.

---

# 60. EXAMPLE FINDER BUSINESS CASE

Input:

```text
Product:
Financial Admin Dashboard

Usage:
Daily long-session usage

Priorities:
Dense Information
Accessibility
Scalability

Constraints:
Large data tables
Complex workflows
```

Potential result:

```text
1. Enterprise / Admin

Very Strong Fit
```

Why:

```text
+ optimized for dense workflows

+ strong table/form patterns

+ predictable hierarchy

+ scalable navigation
```

---

```text
2. Modern SaaS

Strong Fit
```

Why:

```text
+ polished product experience

+ strong reusable patterns

+ good information density
```

Trade-off:

```text
− more decorative treatment may need control
```

---

```text
Glassmorphism

Use Selectively
```

Reason:

```text
Dominant transparency is not ideal
for dense financial information.

Can still be used for selective surfaces.
```

Đây chính là nghiệp vụ của Recommendation Engine.

---

# 61. BUSINESS RULE — RECOMMENDATION EXPLANATION

Mọi recommendation phải có:

```text
Why recommended

Where it fits

Trade-offs

Risks

Alternative
```

Không chỉ:

```text
92% Match
```

---

# 62. CROSS-FEATURE BUSINESS FLOW

Các feature phải liên kết.

Example:

```text
Finder
```

recommend:

```text
Enterprise
Modern SaaS
```

↓

CTA:

```text
Compare these directions
```

↓

`/compare`

↓

User chọn Modern SaaS

↓

```text
View full research
```

↓

`/styles/modern-saas`

↓

```text
View historical context
```

↓

`/evolution`

Đây là một ecosystem.

---

# 63. DATA ARCHITECTURE

Central data model:

```text
Research Database
```

Không có database backend cũng được.

Có thể bắt đầu bằng:

```text
TypeScript structured dataset
```

---

# 64. CORE DATA ENTITIES

```text
DesignStyle

StyleClassification

EvaluationCriterion

Evaluation

ProductContext

ProductFit

Pattern

Specimen

EvolutionEvent

StyleRelationship

ResearchSource

RecommendationRule
```

---

# 65. DESIGN STYLE MODEL

```ts
interface DesignStyle {
  id: string;
  slug: string;

  name: string;
  aliases?: string[];

  classification: StyleClassification[];

  overview: StyleOverview;

  principles: StylePrinciple[];

  visualDNA: VisualDNA;

  referenceImplementation: ReferenceTokens;

  patterns: StylePattern[];

  evaluation: StyleEvaluation;

  productFit: Record<ProductContextId, ProductFit>;

  relationships: StyleRelationship[];

  evolution?: EvolutionReference;

  sources: ResearchSource[];
}
```

---

# 66. PRODUCT CONTEXT MODEL

```ts
interface ProductContext {
  id: string;

  name: string;

  characteristics: {
    informationDensity: Level;

    sessionLength: Level;

    taskComplexity: Level;

    accessibilityCriticality: Level;

    brandExpressionNeed: Level;
  };
}
```

Đây là phần nghiệp vụ rất quan trọng cho Finder.

---

# 67. EVALUATION FRAMEWORK MODEL

```ts
interface EvaluationMetric {
  level: EvaluationLevel;

  summary: string;

  strengths: string[];

  risks: string[];

  conditions?: string[];

  evidence: SourceReference[];
}
```

---

# 68. PRODUCT FIT MODEL

```ts
interface ProductFit {
  level:
    | "excellent"
    | "high"
    | "medium"
    | "low"
    | "use-selectively";

  reason: string;

  strengths: string[];

  risks: string[];

  conditions?: string[];
}
```

---

# 69. SAME-CONTEXT SPECIMEN MODEL

```ts
interface UISpecimen {
  context: SpecimenContext;

  sharedContent: SharedScenario;

  implementations: {
    styleId: string;

    component: ReactNode;
  }[];
}
```

Business rule:

```text
sharedContent cannot change
between style implementations.
```

---

# 70. BUSINESS SCENARIOS

Tạo một bộ canonical scenarios.

## Dashboard Scenario

User goal:

```text
Monitor business performance.
```

Data:

```text
Revenue

Orders

Conversion

Transactions
```

---

## E-commerce Scenario

User goal:

```text
Evaluate and purchase product.
```

Components:

```text
Product image

Price

Variant

CTA

Reviews
```

---

## Form Scenario

User goal:

```text
Complete structured input.
```

Components:

```text
Text fields

Select

Validation

CTA
```

Các style cùng render một scenario.

---

# 71. FRONTEND BUSINESS STATE

Global application state có thể gồm:

```text
selectedStyle

compareStyles

selectedCompareContext

activeFilters

finderAnswers

recommendationResult
```

---

# 72. COMPARE STATE RULE

```text
compareStyles.length >= 2

compareStyles.length <= 3
```

Nếu chọn thứ 4:

```text
Ask user to replace an existing selection
```

hoặc disable.

---

# 73. RESEARCH VERSIONING

Research có thể thay đổi.

Mỗi style nên có metadata:

```text
lastReviewed

researchVersion

sourceCount
```

Future useful:

```text
Last reviewed: July 2026
```

---

# 74. CONTENT STATUS

Mỗi style có:

```text
Draft

Reviewed

Published
```

Business benefit:

Tránh publish incomplete research.

---

# 75. PRODUCT ANALYTICS — FUTURE

Có thể track:

```text
Most explored styles

Most compared pairs

Most selected contexts

Most recommended styles

Compare → dossier conversion

Finder → compare conversion
```

Mục tiêu:

Hiểu user sử dụng research tool thế nào.

Không cần phase đầu.

---

# 76. ERROR & EMPTY STATES

## No Style Search Result

```text
No matching UI direction found.
Try a broader keyword or classification.
```

---

## Compare < 2

```text
Select at least two directions to compare.
```

---

## Missing Research

```text
This research section is still being reviewed.
```

Không invent content.

---

# 77. NON-FUNCTIONAL BUSINESS REQUIREMENTS

## Performance

Interactive previews không được khiến research navigation chậm.

---

## Accessibility

Project nghiên cứu accessibility nên bản thân website phải:

```text
Keyboard accessible

Reduced motion

Semantic structure

Sufficient contrast

Accessible chart labels
```

---

## Shareability

Major state phải share được bằng URL.

---

## Consistency

Một metric chỉ có một source-of-truth.

---

## Research Traceability

Critical claims phải có evidence hoặc được đánh dấu inference.

---

# 78. BUSINESS ACCEPTANCE CRITERIA — LANDING

User mới vào phải:

```text
Understand product purpose within ~10 seconds.
```

Có thể:

```text
Explore

Compare

Learn evolution
```

từ landing.

---

# 79. BUSINESS ACCEPTANCE CRITERIA — STYLE DOSSIER

Sau khi đọc một dossier user phải trả lời được:

```text
What is this style?

What defines it?

Where does it fit?

Where does it struggle?

How is it implemented?

What should I compare it with?
```

---

# 80. BUSINESS ACCEPTANCE CRITERIA — COMPARE

User phải:

```text
Select 2–3 styles

Choose context

See same-context UI

Understand practical differences

Understand trade-offs
```

Không được có:

```text
Universal winner
```

---

# 81. BUSINESS ACCEPTANCE CRITERIA — EVOLUTION

User phải hiểu:

```text
What changed

Why it changed

What influenced the change
```

Không chỉ nhớ năm.

---

# 82. BUSINESS ACCEPTANCE CRITERIA — FINDER

Recommendation phải:

```text
respond to product requirements
```

không phải:

```text
respond mainly to visual preference.
```

Mỗi result có reasoning.

---

# 83. SYSTEM ARCHITECTURE — CONCEPTUAL

```text
                    RESEARCH REPORT
                       2000–2026

                           │

                           ▼

                  RESEARCH KNOWLEDGE BASE

                           │

         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼

       STYLES           EVOLUTION         SOURCES

         │
         ▼

     EVALUATION

         │
     ┌───┴────────────┐
     ▼                ▼

  COMPARE          PRODUCT FIT

     │                │
     └────────┬───────┘
              ▼

        RECOMMENDATION

              ▼

           DECISION
```

---

# 84. TWO-LAYER PRODUCT ARCHITECTURE

Toàn bộ project nên được nhìn theo 2 layer.

# LAYER A — RESEARCH & BUSINESS LOGIC

```text
Classification

Style knowledge

Evaluation rules

Product contexts

Relationships

Comparison logic

Recommendation logic

Sources
```

Đây là:

```text
WHAT THE SYSTEM KNOWS
```

---

# LAYER B — USER EXPERIENCE

```text
Landing

Explorer

Dossier

Compare

Evolution

Finder
```

Đây là:

```text
HOW USERS INTERACT WITH THAT KNOWLEDGE
```

Hai layer không được trộn lẫn.

---

# 85. EXAMPLE

Research Layer:

```text
Glassmorphism

Accessibility:
Requires Care

Reason:
Background-dependent contrast.

Dashboard Fit:
Low as dominant visual treatment.
```

UX Layer:

```text
/styles/glassmorphism
```

hiển thị thông tin đó trong dossier.

```text
/compare
```

dùng cùng thông tin so với Minimal.

```text
/finder
```

dùng cùng information để giảm recommendation score nếu:

```text
Accessibility Critical = true
```

Một business fact được tái sử dụng ở nhiều UI.

---

# 86. IMPLEMENTATION ROADMAP

## PHASE 0 — BUSINESS & RESEARCH FOUNDATION

Ưu tiên cao nhất.

Tasks:

```text
Define taxonomy

Define Style domain model

Define Product Context model

Define evaluation framework

Define Product Fit logic

Normalize report

Normalize sources

Define canonical UI scenarios
```

Output:

```text
Stable Business + Research Model
```

---

# 87. PHASE 1 — ROUTING & INFORMATION ARCHITECTURE

```text
/

/styles

/styles/:slug

/compare

/evolution

/methodology
```

Không build Finder trước.

---

# 88. PHASE 2 — RESEARCH DOSSIER

Implement:

```text
Overview

Visual DNA

Reference Implementation

Patterns

Same-context specimens

Evaluation

Product Fit

Relationships

Sources
```

---

# 89. PHASE 3 — COMPARISON ENGINE

Business logic trước UI.

Define:

```text
What can be compared?

Which criteria?

How context affects interpretation?

How missing data is handled?
```

Sau đó UI:

```text
Selector

Same-context comparison

Matrix

Trade-offs

Decision guidance
```

---

# 90. PHASE 4 — EVOLUTION SYSTEM

Normalize:

```text
Events

Movements

Relationships

Historical drivers

Sources
```

Sau đó build:

```text
Timeline

Transition Stories

Relationship Map

Taxonomy
```

---

# 91. PHASE 5 — METHODOLOGY

Document:

```text
Research workflow

Evaluation definitions

Source standards

Limitations

Interpretation rules
```

---

# 92. PHASE 6 — FINDER BUSINESS ENGINE

Define:

```text
Product contexts

User usage patterns

Priorities

Constraints

Weighting rules

Risk penalties
```

Sau đó mới build UI wizard.

---

# 93. PHASE 7 — FULL REPORT

`/report`

Không phải core interaction.

Vai trò:

```text
Deep research publication
```

---

# 94. DEVELOPMENT PRIORITY

```text
P0

Business Domain Model
Research Data Model
Taxonomy
Evaluation Framework
Routing
```

---

```text
P1

Style Dossiers

Compare Engine
```

---

```text
P2

Evolution

Methodology
```

---

```text
P3

Finder

Report

Advanced tooling
```

---

# 95. WHAT MAKES THIS A SOFTWARE ENGINEERING PROJECT

Không chỉ:

```text
13 visual themes
```

Mà có:

```text
Domain modeling

Structured datasets

Routing architecture

State management

Search/filter logic

Comparison engine

Context-based evaluation

Rule-based recommendations

Reusable rendering system

Research traceability
```

---

# 96. WHAT MAKES THIS A PRODUCT PROJECT

Có:

```text
User problem

User journeys

Decision workflows

Product contexts

Business rules

Trade-off evaluation

Recommendation reasoning
```

---

# 97. WHAT MAKES THIS A UI/UX RESEARCH PROJECT

Có:

```text
Historical analysis

Visual taxonomy

Design principles

Interactive specimens

Accessibility research

Usability evaluation

Comparative analysis
```

---

# 98. PROJECT POSITIONING FOR PORTFOLIO

Không mô tả:

> A website showcasing 13 UI design styles.

Nên mô tả:

> Interface Style Research is an interactive research and decision-support platform that structures modern UI design knowledge into explorable style dossiers, contextual comparisons, historical relationships, and product-oriented evaluation frameworks.

Technical story:

> I transformed long-form design research into a structured domain model and built reusable systems for interactive reproduction, contextual comparison, and design-direction decision support.

---

# 99. FINAL PRODUCT FLOW

```text
USER HAS A QUESTION

        │
        ▼

"What styles exist?"

        │
        ▼

EXPLORE

        │
        ▼

"What does this style mean?"

        │
        ▼

DOSSIER

        │
        ▼

"How does it compare?"

        │
        ▼

COMPARE

        │
        ▼

"Why did these styles evolve?"

        │
        ▼

EVOLUTION

        │
        ▼

"What fits my product?"

        │
        ▼

FINDER

        │
        ▼

DESIGN DECISION
```

---

# 100. FINAL PRINCIPLE

Interface Style Research phải cân bằng ba trụ cột:

```text
              RESEARCH
                 ▲
                / \
               /   \
              /     \
             /       \
            /         \
     ENGINEERING ─── PRODUCT
```

## Research

Hệ thống biết điều gì và dựa trên evidence nào?

## Product

Người dùng cần giải quyết quyết định gì?

## Engineering

Dữ liệu, logic và interaction được xây dựng thế nào để giải quyết quyết định đó?

Phần UI chỉ là cách ba hệ thống này được trình bày cho người dùng.

---

# 101. NEXT IMMEDIATE STEP

Không nên bắt đầu ngay bằng việc code `/compare`.

Bước tiếp theo nên là:

```text
01

Lấy full report 2000–2026
```

↓

```text
02

Tách từng thông tin thành domain data
```

↓

```text
03

Chuẩn hóa 13 styles
```

↓

```text
04

Định nghĩa Product Context
```

↓

```text
05

Định nghĩa Evaluation Framework
```

↓

```text
06

Định nghĩa Same-context Business Scenarios
```

↓

```text
07

Sau đó mới xây Dossier + Compare
```

Foundation cần đạt:

```text
Research Data

+

Business Rules

+

UX Specification
```

trước khi mở rộng feature.

---

# FINAL PROJECT DEFINITION

**Interface Style Research là một nền tảng nghiên cứu và hỗ trợ ra quyết định về thiết kế giao diện, trong đó kiến thức lịch sử, nguyên lý thiết kế, implementation patterns, usability, accessibility và product context được chuẩn hóa thành một hệ thống dữ liệu có cấu trúc; từ đó người dùng có thể khám phá, so sánh và lựa chọn UI direction phù hợp với bài toán sản phẩm cụ thể.**
