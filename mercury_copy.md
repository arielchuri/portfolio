# Mercury-GeoSight: Project Copy Draft

**Project**: Mercury-GeoSight  
**Subtitle**: Generative AI • Geospatial Intelligence • UI/UX Design & Trust Architecture  
**Role**: Lead UI/UX Designer  

---

## Hero & Executive Summary
### Headline: Conversational Analytics for Mission-Critical Data
Mercury-GeoSight bridges high-dimensional geospatial datasets with generative AI, transforming complex operational telemetry into interactive, real-time dashboards.

As the Lead UI/UX Designer, I focused on human-centered AI: translating ambiguous user intent into clear visual dashboards through plain language, while designing rigorous UX safeguards against false data and hallucinations.

* **Asset Slot**: Hero Walkthrough (`images/mercury/geosight_hero_walkthrough.mp4`)  
  *Wide Figma walkthrough animation showcasing the full dashboard interface: the natural language prompt bar at top, live geospatial map layers, and coordinated metric panels.*

---

## Row 1: The Challenge
### Headline: Complexity vs. Instant Insight
Geospatial platforms and operational dashboards are traditionally dense, rigid, and slow to configure. Analysts and decision-makers spend critical hours adjusting spatial filters, configuring multi-axis charts, or filing requests with data teams.

Our objective was to give users immediate access to answers through natural conversation without obscuring the analytical depth required for high-stakes tactical decisions.

* **Asset Slot**: Contrast Diagram (`images/mercury/challenge_complexity_contrast.png`)  
  *Visual comparison diagram contrasting fragmented legacy dashboard controls with the unified Mercury-GeoSight prompt-driven canvas.*

---

## Row 2: Plain-Language Dashboard Generation
### Headline: Plain-Language Dashboard Creation
Rather than wading through menus, users type or speak natural queries:  
*"Show logistics bottlenecks and severe weather alerts across the Midwest over the last 48 hours."*

The system interprets temporal bounds, geographic entities, and key metrics, generating a coordinated dashboard in seconds. I designed the visual feedback mechanisms that display parsed intent chips, allowing users to verify how their words mapped to analytical queries.

* **Asset Slot**: Dynamic Generation Loop (`images/mercury/plain_language_generation.mp4`)  
  *Animation demonstrating prompt input, semantic tag breakdown, and fluid assembly of interactive geospatial maps and metric widgets.*

---

## Row 3: Direct Manipulation & Iterative Tuning
### Headline: Iterative Co-Creation & Direct Manipulation
AI generation is only the first step. True utility comes from fluid iteration. I designed a dual-interaction paradigm: users can modify the layout through follow-up natural language prompts or directly manipulate widget sliders, bounding boxes, and chart filters.

This hybrid approach prevents the "start over" trap common in chat-only tools, giving users precise control over visualizations once generated.

* **Asset Slot**: Interaction Loop (`images/mercury/iterative_direct_manipulation.mp4`)  
  *Micro-interaction animation showing a user adjusting an AI-generated threshold slider and refining the view with a follow-up prompt chip.*

---

## Row 4: Safeguards Against False Data
### Headline: Safeguards Against False Data & Hallucinations
In critical operational domains, unverified AI outputs are unacceptable. Trust was our foundational design pillar. I created three key safety layers:
- **Data Provenance Badges**: Every chart item displays direct lineage back to raw database tables.
- **Confidence Scoring & Flagging**: Proactive visual cues communicate model certainty, warning users when data is sparse or extrapolative.
- **Inspectable SQL / Query Logic**: An inspectable side-panel reveals the exact query parameters behind the visual, allowing domain experts to audit the machine's reasoning.

* **Asset Slot**: Provenance & Trust UI Detail (`images/mercury/data_provenance_guardrails.png`)  
  *High-fidelity UI detail showing an inspectable data provenance drawer, confidence score tooltips, and SQL audit trail overlay.*

---

## Row 5: Designing for Latency & AI Uncertainty
### Headline: Designing for System Uncertainty & Latency
AI models process millions of data points, which can introduce query latency. Furthermore, natural language can be ambiguous.

I crafted progressive skeleton states that communicate system thinking stages ("Querying satellite layers..." → "Synthesizing anomaly metrics..."), as well as proactive disambiguation dialogs that ask for quick clarification rather than guessing wrong.

* **Asset Slot**: Transitional States (`images/mercury/latency_and_uncertainty_states.mp4`)  
  *Demonstration of progressive loading animations, stage-by-stage status indicators, and multi-option disambiguation popovers.*

## Row 5: Model Agnosticism & Cost Governance
### Headline: Model Agnosticism & Cost Control
Enterprise deployments require architectural flexibility and strict budget predictability. I designed governance controls that give administrators and teams direct authority over their model backends and inference costs.

The interface enables seamless hot-swapping between frontier LLMs and on-premise models, paired with real-time token expenditure tracking to prevent bill shock.

* **Key Capabilities**:
  - **Pluggable Model Routing**: Dynamic switching between OpenAI, Anthropic, and self-hosted on-prem models.
  - **Pre-Query Cost Estimator**: Real-time token estimates before running heavy multi-turn spatial queries.
  - **Model Tier Toggles**: Fast extraction vs. deep analytical reasoning mode selection.
  - **Token Telemetry & Quotas**: Transparent burn rates and team-level budget limits.

* **Asset Slot**: Model Routing & Token Governance UI (`images/geosight/placeholder_cost_governance.svg`)  
  *Figma detail screen showing model selector dropdown, pre-query token cost estimate chips, and monthly spend telemetry gauge.*

---

## Row 6: Impact & Design System
### Headline: Impact & System Scalability
Mercury-GeoSight proved that generative AI can elevate enterprise geospatial intelligence from a niche analyst tool to an accessible, organization-wide asset.

By combining natural-language fluidity with rigorous guardrails, we dramatically cut dashboard authoring time from hours to seconds while establishing full trust in the underlying intelligence.

* **Asset Slot**: Design System Showcase (`images/mercury/geosight_design_system.png`)  
  *Design system showcase featuring prompt inputs, provenance tags, geospatial map overlays, and dark-mode data visualization tokens.*
