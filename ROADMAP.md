### Pattern 1: Semantic Catalog Recommendation (The "Related Signals" Panel)
**Goal:** Proactively surface contextually relevant datasets in a side panel based on the active topic using semantic metadata matching.
* **Problem Solved:** Users visualizing a single indicator (e.g. "Primary Out-of-School Rate") often miss complementary indicators from other agencies (e.g. WASH, Climate Vulnerability).
* **UX Affordance:** A sidebar accordion or tab titled **"Recommended Context Layers"**:
  * *"We noticed you are mapping primary education. Consider overlaying these related indicators:"*
    * `[ + ]` **Safe Water in Schools (WASH)** (UNICEF)
    * `[ + ]` **Poverty Rate** (UN Data Commons)
    * `[ + ]` **Drought Vulnerability Index** (UNICEF CCRI)
* **Interaction:** One-click overlay onto the map or "Factor into Priority Index" to update analytical formulas.
* **Implementation Option:** Leverage existing vector embeddings in `discovery/search.py` to run metadata similarity against active layer DCIDs.

---

### Pattern 2: Auto-Insight & Correlation Engine (Statistical Insights)
**Goal:** Perform on-the-fly background statistical correlations between the active map layer and other available sub-national indicators to highlight hidden relationships.
* **Problem Solved:** Policy analysts need to discover which drivers correlate most strongly with an observed hotspot.
* **UX Affordance:** An insight banner or card below the map canvas:
  * > 💡 **Auto-Insight**: In Kenya, the out-of-school rate is **strongly correlated ($r = 0.78$)** with a lack of safe water in schools across all 47 counties.
* **Interaction:** One-click actions to:
  * *Compare layers side-by-side (split viewer)*
  * *Blend into a single composite vulnerability score*
* **Implementation Option:** Compute Pearson correlation coefficient ($r$) on cached subnational resolution vectors in the backend.

---

### Pattern 3: Guided "Analytical Recipes" (Composite Index Templates)
**Goal:** Guide users with pre-configured, institutional index formulas rather than requiring manual formula authoring.
* **Problem Solved:** Non-technical decision makers want established frameworks (e.g., UNICEF CCRI methodology) rather than building composite indicators from scratch.
* **UX Affordance:** Recipe selector bar when constructing a priority index:
  * `[ Standard Burden ]` $\rightarrow$ `Out-of-School Rate × Child Population`
  * `[ Equity-Weighted ]` $\rightarrow$ `Burden + Lack of Safe Water`
  * `[ Climate-Resilient ]` $\rightarrow$ `Burden + Drought Risk Score`
* **Interaction:** Selecting a recipe populates the multi-source formula, loads required layers, and computes normalized county rankings.
* **Implementation Option:** Store curated JSON formula templates in backend catalog seeds.

---

### Pattern 4: Vague Query Expansion & Indicator Disambiguation
**Goal:** Resolve broad, natural language inquiries into concrete candidate datasets and clarify intent before executing heavy pipelines.
* **Problem Solved:** Queries like *"Show me child vulnerability in the Horn of Africa"* are ambiguous across dozens of potential metrics.
* **UX Affordance:** 
  * Interactive candidate selection in the AI Copilot stream.
  * Dedicated **Indicator Swap Drawer** ([Issue #36](https://github.com/kerodkibatu/UNTechOver2026/issues/36)) for quick subnational coverage comparison and live preview.
* **Status / Connection:** Currently aligned with the Agent Intent Discovery stage and Issue #36.

#### 1. Interactive Indicator Disambiguation & Swap Drawer (Issue #36)
Target Issue: [#36: Interactive indicator disambiguation & swap drawer](https://github.com/kerodkibatu/UNTechOver2026/issues/36)  
Spec: `workspace/ariel/specs/issue-36-swap-drawer.md`

- [ ] **Placement & Affordance**: Add a discrete "Swap" action on hover/focus in the layer card row within the left sidebar.
- [ ] **Flyout Drawer UI**: Wireframe candidate cards showing:
  - Indicator title & custodian agency (UNICEF, World Bank, etc.)
  - Subnational coverage level (e.g., "47/47 counties")
  - Relevance score / pillar match tag
- [ ] **Interaction Flow**: Click "Swap" → open flyout drawer → live preview on hover/select → "Confirm replacement" re-renders the choropleth dynamically without page reload.

------------------

### 2. Data Trust & Cross-Source Agreement Badges (Issue #33)
Target Issue: [#33: Data trust & cross-source agreement indicators (PASS / REVIEW)](https://github.com/kerodkibatu/UNTechOver2026/issues/33)  
Spec: `workspace/ariel/specs/issue-33-trust-badges.md`

- [ ] **Badge Component & Tokens**: Visual badge styling for `PASS` (green), `REVIEW` (amber/orange), and `UNVERIFIED`.
- [ ] **Comparison Popover / Modal**:
  - Table of sources (e.g., Data Commons vs. Local GeoSight/Census).
  - Values reported, time periods & deltas.
  - Direct links to source provenance URLs.
- [ ] **Decision UX**: Source toggle/preference selector allowing user to switch primary data source.

### 3. Executive Briefing Summary Export (Issue #37)
Target Issue: [#37: Executive briefing summary export (PDF/Memo)](https://github.com/kerodkibatu/UNTechOver2026/issues/37)  
Spec: `workspace/ariel/specs/issue-37-executive-brief.md`

- [ ] **Template Layout (1–2 Page PDF/Memo)**:
  - Header: Country, theme title, date, classification tags.
  - Key metrics summary cards (3 core figures).
  - Static map thumbnail with top hotspot layer highlighted.
  - Top 5 highest-risk administrative areas (table).
  - Source provenance & methodology footer.
- [ ] **Export Trigger**: Toolbar action button and share modal entrypoint.

### 5. Content-Addressed Immutable Dashboard Snapshots (Issue #32)
Target Issue: [#32: Content-addressed immutable dashboard snapshots (SHA-256)](https://github.com/kerodkibatu/UNTechOver2026/issues/32)  
Spec: `workspace/ariel/specs/issue-32-snapshot-share.md`

- [ ] **Share Dialog Flow**: Option to "Copy Live Editable Link" vs "Copy Frozen Audit Snapshot".
- [ ] **Frozen View Mode Banner**: Header banner when viewing snapshot: *"Viewing audit snapshot from [Date]. Data is frozen."* with a "Fork & Edit" call-to-action.


### 6. AI Copilot Drawer & Predictive Data Grounding (`docs/ai-ux.md`)
- [ ] **Floating AI Copilot Drawer**: Collapsible overlay panel anchored on the map for natural language queries, reasoning timeline, and spec actions.
- [ ] **Type-Ahead Predictive Autocomplete**: Search local indicator catalog as user types, presenting rich entity chips (*Indicators*, *Hazard Overlays*, *Admin Regions*).
- [ ] **Step-Trace Reasoning Stream**: Live SSE timeline displaying agent planning phases, active tool execution badges (`running`, `done`, `error`), and spec snapshots.
- [ ] **Bidirectional Deep-Linking**: Clicking AI-generated layer/widget cards focuses and opens the corresponding native GeoSight manual panel.

### 7. Conversational Chat & Disentangled System Activity (Issue #41)
Target Issue: [#41: UX/UI: Disentangle agent chat from system logs and improve conversation visibility](https://github.com/kerodkibatu/UNTechOver2026/issues/41)

- [x] **Elevate Chat as Primary View**: Default left-pane view to conversational thread; removed jarring reset on turn start.
- [x] **Disentangled System Activity Inspector**: Replaced inline developer tool groups with `SystemActivityCard` narrative milestones (`summarizeToolGroup`) and collapsible step inspector.
- [x] **Actionable Stoppage Guidance**: High-visibility card with one-click "Switch AI Provider" and "Retry Query" buttons.
- [x] **Calm View Toggle**: Added header button to access optional calm waiting view.

## 🥈 Priority 2: Data Accuracy, Map Legibility & Layer Search

- [ ] **Fix Search Availability Per-Place Bug**:
  - Searching "drought" for `country/ITA` and `country/KEN` returns byte-identical results with `available: null` because `availability.py:206` skips `geosight` datasets.
  - Compute real availability for GeoSight candidates and rank unknown below known-good verified datasets.
- [ ] **Data-Driven Styling for Context Polygons**: Drive fill colour from `value_property` so severity reads off the map instead of static `0.35` opacity.
- [ ] **Implement Real Heatmap Layer Type**: Map `ContextLayer.geometry: "heatmap"` in `DashboardMap.tsx` to MapLibre heatmap layer instead of falling back to circles.
- [ ] **Context Layers Non-AI Browser**: Expose `GET /api/v1/discovery/context-layers` as a browsable catalog picker in the layer sidebar.
- [ ] **Overlay Draw Order & Opacity Interaction**: Verify `raiseContextLayers` preserves overlays above choropleths after basemap swaps.
- [ ] **Investigate `/dashboard/[id]/edit` Latency**: Resolve ~50s latency on warm requests with 80+ layers.

---

## 🥉 Priority 3: Alignment, Dev Handoff & Housekeeping

- [ ] **Milestone & Evaluation Alignment**: Link Issues [#29](https://github.com/kerodkibatu/UNTechOver2026/issues/29), [#30](https://github.com/kerodkibatu/UNTechOver2026/issues/30), [#34](https://github.com/kerodkibatu/UNTechOver2026/issues/34), and [#35](https://github.com/kerodkibatu/UNTechOver2026/issues/35) to Yves's evaluation deck and organize into milestones.
- [ ] **Rotate Google Data Commons API Key**: Rotate previously exposed key from git history.
- [ ] **Add `pytest` to Backend Docker Image**: Enable backend unit and integration test runner in container.
- [ ] **Fix Memory Leak in `SessionManager`**: Implement session cleanup in `app/agent/session.py` to prevent unbounded dictionary growth and leaking `ClaudeSDKClient` instances.
- [ ] **Handle Dropped Task Exceptions**: Catch `asyncio.create_task` errors in `app/routers/agent.py` to avoid hung SSE connections.

---

## ✅ Completed & Merged Upstream

- [x] **Default Basemap**: OpenStreetMap set as the default basemap (`744b520`).
- [x] **Source Misattribution Fixed**: Layer source labels now correctly credit UNICEF SDMX, UN Data Commons, and GeoSight instead of defaulting all to Google (`2c733e3`).
- [x] **Context Layer Legends**: Render layer-declared legends dynamically (`2c733e3`).
- [x] **Client Fetch Deduplication**: Prevent duplicate consecutive requests for administrative boundaries (`2c733e3`).
- [x] **Config-Driven CORS**: CORS allowed origins configured via environment settings (`fc7e138`).
- [x] **Intent Discovery Stage**: Added agent intent discovery stage before dashboard generation (`5054014`).
- [x] **AI UX & API Key Modal**: User API key modal dialog and agent session routing (`ad493e7`).
- [x] **Discovery Search Performance**: Moved `rerank()` to worker thread; warmed embeddings at startup (`d2098e8`).
- [x] **SSRF Protection on `/resolve`**: Added `_urlguard.py` domain and IP validation.
- [x] **Mounted Core Panels**: `VizControls`, `LegendPanel`, `ContextLegend`, `LevelSelector`, `WidgetRenderer`.
