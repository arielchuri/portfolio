# United Nations GeosightAI

**Generative AI for Geospatial Humanitarian & Policy Intelligence**

### Overview
I worked on **United Nations GeosightAI** (as part of the UNTechOver 2026 initiative) to bring conversational AI to UNICEF’s GeoSight geospatial platform. I presented this work directly to the **United Nations Office of Information and Communications Technology (OICT)** and to **Google** (Data Commons).

Policy analysts and humanitarian field teams rely on data from UNICEF, the World Bank, and UN Data Commons to figure out where aid and funding need to go first. The data exists, but pulling subnational indicators together—like crossing out-of-school rates with safe water access and drought risk across 47 counties—usually takes hours of hunting through fragmented catalogs and wrestling with GIS tools.

We built an AI copilot that lets decision-makers ask broad questions in plain language and get a live, multi-layered map and priority index in seconds.

### Context & My Role
When you are mapping child vulnerability or resource allocation, AI hallucinations aren't just annoying—they are dangerous. My focus as the UX/UI designer was making the AI **grounded, inspectable, and easy to steer**. 

Rather than hiding the machine behind a chat box, I designed the interface so analysts stay in control of the data:
- **Disambiguating vague intent:** Turning broad prompts (*"Show me child vulnerability in the Horn of Africa"*) into clear candidate datasets before building the map, with a swap drawer to compare subnational coverage and preview layers live.
- **Trust & provenance:** Surfacing where every number comes from (UNICEF SDMX, Data Commons, local census), flagging cross-source discrepancies (`PASS` / `REVIEW`), and keeping the agent's step-by-step reasoning inspectable without cluttering the conversation.
- **Guided analysis:** Giving non-technical users proven analytical recipes—like equity-weighted or climate-resilient composite indexes—alongside proactive suggestions for related context layers and statistical correlations.

---

### 1. AI Copilot, Intent Disambiguation & Indicator Swap
Queries like *"Show me child vulnerability in the Horn of Africa"* are ambiguous across dozens of metrics. Instead of guessing and running a heavy pipeline on the wrong dataset, the copilot surfaces candidate indicators first.

I also separated the conversational thread from noisy developer logs—replacing raw tool dumps with clean narrative milestones (`SystemActivityCard`) and a collapsible step inspector—and designed an interactive **Indicator Swap Drawer** so analysts can swap layers without starting over.
- **Type-Ahead Predictive Grounding:** Searches the local indicator catalog as you type, surfacing entity chips for *Indicators*, *Hazard Overlays*, and *Admin Regions*.
- **Indicator Swap Drawer:** Hovering any layer opens a flyout comparing candidate datasets by custodian agency (UNICEF, World Bank), subnational coverage (e.g., *47/47 counties*), and relevance—with live choropleth previews on hover.
- **Disentangled System Activity:** Keeps the chat readable with a calm waiting view, collapsible step-trace reasoning, and one-click provider switching if a query stalls.
- **Bidirectional Deep-Linking:** Clicking an AI-generated layer card focuses and opens the corresponding native GeoSight control panel.

### 2. Guided Analytical Recipes & Proactive Signals
Users mapping a single indicator (like *Primary Out-of-School Rate*) often miss critical drivers from other agencies, like WASH or climate vulnerability. At the same time, non-technical decision-makers need established institutional frameworks (like UNICEF’s CCRI methodology) rather than writing formulas from scratch.

I combined semantic catalog recommendations, background statistical correlations, and one-click composite recipes into a guided analytical workflow:
- **Related Signals Panel:** Uses vector embeddings to suggest complementary layers in the sidebar (e.g., *Safe Water in Schools*, *Poverty Rate*, *Drought Vulnerability Index*) with one-click map overlay.
- **Auto-Insight Correlation Banner:** Runs background Pearson correlations ($r$) across subnational vectors to surface hidden relationships—e.g., *"In Kenya, the out-of-school rate is strongly correlated ($r = 0.78$) with a lack of safe water in schools across all 47 counties"*—with one-click split-screen comparison.
- **Analytical Recipes:** Pre-configured formula templates (`Standard Burden`, `Equity-Weighted`, `Climate-Resilient`) that automatically load required layers and compute normalized county rankings.

### 3. Data Trust, Provenance & Cross-Source Agreement
Humanitarian allocations require verifiable numbers. When global aggregates (like Google / UN Data Commons) differ from local GeoSight or national census feeds, analysts need to see the delta immediately.

- **Cross-Source Agreement Badges:** Visual `PASS`, `REVIEW`, and `UNVERIFIED` tokens on every layer card.
- **Provenance Comparison Popover:** Side-by-side table showing values, time periods, deltas, and direct source URLs across agencies, with a toggle to switch the primary source.
- **Accurate Attribution:** Corrected source labeling across the platform so UNICEF SDMX, UN Data Commons, and GeoSight feeds are explicitly credited.

### 4. Immutable Audit Snapshots & Executive Briefings
Insights on a screen need to travel into policy meetings and funding proposals without losing their audit trail.

- **Frozen Audit Snapshots (SHA-256):** Share dialog lets analysts choose between a *Live Editable Link* and a *Frozen Audit Snapshot*—locking the exact data state with a clear provenance banner and a *"Fork & Edit"* action.
- **Executive Briefing Export (PDF/Memo):** One-click 1–2 page briefing generator featuring top-line summary metrics, a static hotspot map thumbnail, a table of the top 5 highest-risk administrative areas, and full methodology footnotes.
