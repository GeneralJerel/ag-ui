export const AGENT_SKILLS = `# Excalidraw Diagram Skill

Create beautiful, professional, animated Excalidraw diagrams with progressive camera reveals, color-coded zones, and polished visual design. Use this skill whenever a user asks to diagram, visualize, map, chart, illustrate, or draw anything — including architecture diagrams, flowcharts, sequence diagrams, concept explainers, system maps, process flows, and technical overviews. Also trigger for requests like "show me how X works", "draw a diagram of", "create a visual for", "make an Excalidraw of", or any time a visual explanation would be clearer than text alone.

---

## Step 1 — Always call read_me first

Before emitting ANY elements, call \`Excalidraw:read_me\`. Do not skip this step, even for simple diagrams. It provides the color palette, camera sizes, font rules, and element syntax required to produce clean output.

\`\`\`
Excalidraw:read_me()
\`\`\`

Then proceed directly to \`Excalidraw:create_view\` with your elements array — no narration about the read_me call.

---

## Step 2 — Plan the diagram before writing elements

Before writing elements, mentally sketch:

1. **What are the layers / zones?** (e.g. Frontend / Backend / Database, or Input / Process / Output)
2. **What color grammar makes sense?** Assign one color per layer and keep it consistent throughout
3. **How many camera positions do I need?** Plan 3–6 camera stops minimum for a reveal effect
4. **What’s the reading order?** Left-to-right or top-to-bottom; pick one and stick to it

---

## Step 3 — Core design rules (MUST follow)

### Camera rules
- **Always start with \`cameraUpdate\` as the first element**
- Camera sizes MUST be exact 4:3 ratios: \`400×300\`, \`600×450\`, \`800×600\`, \`1200×900\`, \`1600×1200\`
- Use **multiple cameraUpdates** throughout the array — pan to each section as you draw it
- Leave padding: if content is 500px wide, use 800×600 camera
- Final element should be a wide cameraUpdate showing the full diagram

### Color grammar (use consistently)

| Zone / Role | Fill | Stroke |
|---|---|---|
| UI / Frontend | \`#dbe4ff\` | \`#4a9eed\` |
| Logic / Agent | \`#e5dbff\` | \`#8b5cf6\` |
| Data / Storage | \`#d3f9d8\` | \`#22c55e\` |
| External / API | \`#ffd8a8\` | \`#f59e0b\` |
| Error / Alert | \`#ffc9c9\` | \`#ef4444\` |
| Notes / Decisions | \`#fff3bf\` | \`#f59e0b\` |

Zone background rectangles: use \`opacity: 40\`, \`fillStyle: "solid"\`

Node shapes: use pastel fills (\`#a5d8ff\`, \`#b2f2bb\`, \`#d0bfff\`, \`#ffd8a8\`, \`#c3fae8\`, \`#eebefa\`)

### Typography rules
- Title: \`fontSize: 26–28\`, \`strokeColor: "#1e1e1e"\`
- Subtitle / annotation: \`fontSize: 16\`, \`strokeColor: "#757575"\`
- Shape labels: \`fontSize: 16–18\` via \`label\` property on the shape
- NEVER use fontSize below 14
- NEVER use light gray on white backgrounds (minimum text color: \`#757575\`)

### Shape rules
- Use \`label: { "text": "...", "fontSize": 16 }\` directly on shapes — no separate text elements
- Minimum shape size: \`120×60\` for labeled boxes
- Add \`roundness: { type: 3 }\` for rounded corners (preferred for nodes)
- Leave 20–30px gaps between elements

### Drawing order (z-order, critical)
Emit in this sequence per section:
1. Zone background rectangle (drawn first = sits behind)
2. Zone label text
3. Node shapes (with labels)
4. Arrows between nodes
5. Then next section

NEVER dump all rectangles, then all text, then all arrows.

### Arrow rules
- Always include \`endArrowhead: "arrow"\` for directional flow
- Use \`strokeStyle: "dashed"\` for responses, return values, optional paths
- Keep arrow labels short (under 20 chars) or omit — long labels overflow
- Use \`startBinding\` / \`endBinding\` with \`fixedPoint\` to attach to shapes

---

## Step 4 — Diagram type patterns

### Architecture / System Diagram
Zones as swim lanes (left-to-right or top-to-bottom). Each zone = one architectural layer. Arrows show data/request flow between layers. End with a full-width cameraUpdate.

**Camera pattern:** Title zoom (M) → pan right zone by zone (S/M) → final overview (XL)

### Sequence / Flow Diagram
Actors as header boxes with dashed vertical lifelines. Horizontal arrows show messages. Pan camera downward as messages progress.

**Camera pattern:** Title (M) → pan right per actor drawing header + lifeline → zoom out (L) → pan down per message group → final overview (XL)

### Concept Explainer
Start zoomed on the title, then reveal parts of the concept one at a time. Use annotations (\`#fff3bf\` boxes) as callouts. Simple left-to-right flow.

**Camera pattern:** Title zoom (S) → zoom out (M) → pan section by section → final (L)

### Process / Flowchart
Diamonds for decisions, rectangles for steps. Top-to-bottom flow. Color-code by stage (e.g. initiation=blue, processing=purple, output=green).

**Camera pattern:** Top zoom → pan down per stage group → final overview

---

## Step 5 — The camera reveal technique (what makes diagrams feel alive)

The secret to great Excalidraw diagrams is **drawing section by section with camera moves**:

\`\`\`json
// 1. Start with title, zoomed in
{"type":"cameraUpdate","width":600,"height":450,"x":100,"y":0},
{"type":"text","id":"t1","x":200,"y":20,"text":"My Diagram","fontSize":28},

// 2. Pan to first zone and draw it
{"type":"cameraUpdate","width":400,"height":300,"x":20,"y":60},
{"type":"rectangle","id":"zone1", ...zone background...},
{"type":"rectangle","id":"node1", ...node with label...},

// 3. Pan to second zone
{"type":"cameraUpdate","width":400,"height":300,"x":280,"y":60},
{"type":"rectangle","id":"zone2", ...},
{"type":"rectangle","id":"node2", ...},

// 4. Draw connecting arrows (camera stays or pans to show both ends)
{"type":"cameraUpdate","width":800,"height":600,"x":0,"y":40},
{"type":"arrow","id":"a1", ...arrow from node1 to node2...},

// 5. Final wide overview
{"type":"cameraUpdate","width":1200,"height":900,"x":-20,"y":-10}
\`\`\`

This creates the "drawing itself" animation effect users love.

---

## Step 6 — Common mistakes to avoid

- **No cameraUpdate first** → diagram appears un-framed, elements clip
- **Wrong aspect ratio** → \`700×500\` causes distortion; use \`800×600\`
- **All elements at once, no panning** → loses the reveal animation
- **Overlapping elements** → check y-coordinates leave 60–80px between rows
- **Long arrow labels** → overflow the arrow; keep under 20 chars or use a note box instead
- **Emoji in text** → don’t render in Excalidraw’s font
- **Light text on white** → \`#b0b0b0\` on white is invisible; minimum \`#757575\`
- **Zone label covered by nodes** → put zone label text at top-left of zone (y + 8px from zone top), nodes start 40px below
- **Title not centered** → estimate \`text.length × fontSize × 0.5\` for width, then set \`x = diagramCenterX - estimatedWidth/2\`

---

## Step 7 — Quality checklist before emitting

- [ ] \`Excalidraw:read_me\` called
- [ ] First element is \`cameraUpdate\`
- [ ] All camera sizes are valid 4:3 ratios
- [ ] Minimum 3 camera positions used (more = better animation)
- [ ] Color grammar is consistent across zones
- [ ] All shape labels use \`label\` property, not separate text elements
- [ ] No font sizes below 14
- [ ] Zone backgrounds are drawn BEFORE the nodes inside them
- [ ] Arrows drawn AFTER both source and target shapes
- [ ] Final element is a wide cameraUpdate revealing the full diagram
- [ ] No emoji in any text strings

---

## Reference: Element snippets

**Zone background:**
\`\`\`json
{"type":"rectangle","id":"zone_bg","x":20,"y":80,"width":220,"height":380,"backgroundColor":"#dbe4ff","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#4a9eed","strokeWidth":1,"opacity":40}
\`\`\`

**Zone label:**
\`\`\`json
{"type":"text","id":"zone_lbl","x":40,"y":88,"text":"FRONTEND","fontSize":14,"strokeColor":"#2563eb"}
\`\`\`

**Node:**
\`\`\`json
{"type":"rectangle","id":"n1","x":60,"y":130,"width":150,"height":55,"backgroundColor":"#a5d8ff","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#4a9eed","strokeWidth":2,"label":{"text":"API Gateway","fontSize":16}}
\`\`\`

**Arrow (solid, directed):**
\`\`\`json
{"type":"arrow","id":"a1","x":210,"y":157,"width":100,"height":0,"points":[[0,0],[100,0]],"strokeColor":"#1e1e1e","strokeWidth":2,"endArrowhead":"arrow","startBinding":{"elementId":"n1","fixedPoint":[1,0.5]},"endBinding":{"elementId":"n2","fixedPoint":[0,0.5]}}
\`\`\`

**Arrow (dashed, response):**
\`\`\`json
{"type":"arrow","id":"a2","x":310,"y":157,"width":-100,"height":0,"points":[[0,0],[-100,0]],"strokeColor":"#757575","strokeWidth":2,"strokeStyle":"dashed","endArrowhead":"arrow"}
\`\`\`

**Annotation note:**
\`\`\`json
{"type":"rectangle","id":"note1","x":80,"y":200,"width":200,"height":36,"backgroundColor":"#fff3bf","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#f59e0b","strokeWidth":1,"opacity":80,"label":{"text":"Caches for 5 min","fontSize":14}}
\`\`\`

**Title text:**
\`\`\`json
{"type":"text","id":"title","x":150,"y":15,"text":"System Architecture","fontSize":28,"strokeColor":"#1e1e1e"}
\`\`\`

**Stick figure (user icon):**
\`\`\`json
{"type":"ellipse","id":"fig_head","x":58,"y":110,"width":20,"height":20,"backgroundColor":"#a5d8ff","fillStyle":"solid","strokeColor":"#4a9eed","strokeWidth":2},
{"type":"rectangle","id":"fig_body","x":57,"y":132,"width":22,"height":26,"backgroundColor":"#a5d8ff","fillStyle":"solid","roundness":{"type":3},"strokeColor":"#4a9eed","strokeWidth":2}
\`\`\`"

---

# SVG Diagram Generation Skill

You can generate rich, inline SVG diagrams to visually explain concepts. Use this skill whenever a visual would help the user understand a system, process, architecture, or mechanism better than text alone.

---

## When to Use

- Explaining how something works (load paths, circuits, pipelines, algorithms)
- Showing architecture or structure (system diagrams, component layouts)
- Illustrating processes or flows (flowcharts, data flow, decision trees)
- Building intuition for abstract concepts (attention mechanisms, gradient descent, recursion)

## SVG Setup

Always use this template:

\`\`\`svg
<svg width="100%" viewBox="0 0 680 H" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>
  <!-- Content here -->
</svg>
\`\`\`

- **Width is always 680px** via viewBox. Set \`width="100%"\` so it scales responsively.
- **H (height)** = bottom-most element's y + height + 40px padding. Don't guess — compute it.
- **Safe content area**: x=40 to x=640, y=40 to y=(H-40).
- **No wrapping divs**, no \`<html>\`, \`<head>\`, \`<body>\`, or DOCTYPE.
- **Background is transparent** — the host provides the background.

---

## Core Design Rules

### Typography
- **Two sizes only**: 14px for titles/labels, 12px for subtitles/descriptions.
- **Two weights only**: 400 (regular), 500 (medium/bold). Never use 600 or 700.
- **Font**: Use \`font-family="system-ui, -apple-system, sans-serif"\` or inherit from host.
- **Always set** \`text-anchor="middle"\` and \`dominant-baseline="central"\` for centered text in boxes.
- **Sentence case always**. Never Title Case or ALL CAPS.

### Text Width Estimation
At 14px, each character ≈ 8px wide. At 12px, each character ≈ 7px wide.
- "Load Balancer" (13 chars) at 14px ≈ 104px → needs rect ≈ 140px wide (with padding).
- Always compute: \`rect_width = max(title_chars × 8, subtitle_chars × 7) + 48px padding\`.

### Colors (Light/Dark Mode Safe)
Use these semantic color sets that work in both modes:

\`\`\`
Teal:    fill="#E1F5EE" stroke="#0F6E56" text="#085041"  (dark: fill="#085041" stroke="#5DCAA5" text="#9FE1CB")
Purple:  fill="#EEEDFE" stroke="#534AB7" text="#3C3489"  (dark: fill="#3C3489" stroke="#AFA9EC" text="#CECBF6")
Coral:   fill="#FAECE7" stroke="#993C1D" text="#712B13"  (dark: fill="#712B13" stroke="#F0997B" text="#F5C4B3")
Amber:   fill="#FAEEDA" stroke="#854F0B" text="#633806"  (dark: fill="#633806" stroke="#EF9F27" text="#FAC775")
Blue:    fill="#E6F1FB" stroke="#185FA5" text="#0C447C"  (dark: fill="#0C447C" stroke="#85B7EB" text="#B5D4F4")
Gray:    fill="#F1EFE8" stroke="#5F5E5A" text="#444441"  (dark: fill="#444441" stroke="#B4B2A9" text="#D3D1C7")
Red:     fill="#FCEBEB" stroke="#A32D2D" text="#791F1F"  (dark: fill="#791F1F" stroke="#F09595" text="#F7C1C1")
Green:   fill="#EAF3DE" stroke="#3B6D11" text="#27500A"  (dark: fill="#27500A" stroke="#97C459" text="#C0DD97")
Pink:    fill="#FBEAF0" stroke="#993556" text="#72243E"  (dark: fill="#72243E" stroke="#ED93B1" text="#F4C0D1")
\`\`\`

**Color meaning, not sequence**: Don't rainbow-cycle. Use 2-3 colors per diagram. Map colors to categories or physical properties (warm = heat/energy, cool = calm/cold, gray = structural/neutral).

If you're rendering inside a system that supports CSS variables, prefer:
- \`var(--color-text-primary)\` for primary text
- \`var(--color-text-secondary)\` for muted text
- \`var(--color-border-tertiary)\` for light borders

### Shapes & Layout
- **Stroke width**: 0.5px for borders, 1.5px for arrows/connectors.
- **Corner radius**: \`rx="4"\` for subtle rounding, \`rx="8"\` for emphasized. \`rx="20"\` for large containers.
- **Spacing**: 60px minimum between boxes, 24px padding inside boxes, 12px text-to-edge clearance.
- **Single-line box**: 44px tall. **Two-line box**: 56px tall.
- **Max 4-5 nodes per row** at 680px width. If more, split into multiple diagrams.
- **All connectors need \`fill="none"\`** — SVG defaults fill to black, which turns paths into black blobs.

---

## Component Patterns

### Single-Line Node
\`\`\`svg
<g>
  <rect x="100" y="20" width="180" height="44" rx="8"
        fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
  <text x="190" y="42" text-anchor="middle" dominant-baseline="central"
        font-size="14" font-weight="500" fill="#3C3489">Node title</text>
</g>
\`\`\`

### Two-Line Node
\`\`\`svg
<g>
  <rect x="100" y="20" width="200" height="56" rx="8"
        fill="#E6F1FB" stroke="#185FA5" stroke-width="0.5"/>
  <text x="200" y="38" text-anchor="middle" dominant-baseline="central"
        font-size="14" font-weight="500" fill="#0C447C">Title</text>
  <text x="200" y="56" text-anchor="middle" dominant-baseline="central"
        font-size="12" fill="#185FA5">Short subtitle</text>
</g>
\`\`\`

### Arrow Connector
\`\`\`svg
<line x1="200" y1="76" x2="200" y2="120"
      stroke="#534AB7" stroke-width="1.5" marker-end="url(#arrow)"/>
\`\`\`

### Dashed Flow Indicator
\`\`\`svg
<line x1="200" y1="76" x2="200" y2="120"
      stroke="#534AB7" stroke-width="1.5" stroke-dasharray="4 3"/>
\`\`\`

### Leader Line with Label (for annotations)
\`\`\`svg
<line x1="440" y1="100" x2="500" y2="130"
      stroke="currentColor" stroke-width="0.5" stroke-dasharray="4 4" opacity="0.5"/>
<circle cx="440" cy="100" r="2" fill="currentColor" opacity="0.5"/>
<text x="506" y="134" font-size="12" fill="currentColor" opacity="0.7">Annotation text</text>
\`\`\`

### Large Container (for structural diagrams)
\`\`\`svg
<rect x="80" y="40" width="520" height="300" rx="20"
      fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
<text x="340" y="68" text-anchor="middle"
      font-size="14" font-weight="500" fill="#085041">Container name</text>
\`\`\`

---

## Diagram Types & When to Use Each

### 1. Flowchart
**When**: Sequential processes, decision trees, pipelines.
**Layout**: Top-to-bottom or left-to-right. Single direction only.
**Rules**:
- Arrows must never cross unrelated boxes. Route around with L-bends if needed.
- Keep all same-type boxes the same height.
- Max 4-5 nodes per diagram. Break complex flows into multiple diagrams.

### 2. Structural Diagram
**When**: Containment matters — things inside other things (architecture, org charts, system components).
**Layout**: Nested rectangles. Outer = container, inner = regions.
**Rules**:
- Max 2-3 nesting levels.
- 20px minimum padding inside every container.
- Use different color ramps for parent vs child to show hierarchy.

### 3. Illustrative Diagram
**When**: Building intuition. "How does X actually work?"
**Layout**: Freeform — follows the subject's natural geometry.
**Rules**:
- Shapes can be freeform (paths, ellipses, polygons), not just rects.
- Color encodes intensity, not category (warm = active, cool = dormant).
- Overlap shapes for depth, but never let strokes cross text.
- Labels go in margins with leader lines pointing to the relevant part.

---

## Critical Checks Before Finalizing

1. **ViewBox height**: Find your lowest element (max y + height). Set H = that + 40px.
2. **No content past x=640 or below y=(H-40)**.
3. **Text fits in boxes**: \`(char_count × 8) + 48 < rect_width\` for 14px text.
4. **No arrows through boxes**: Trace every line's path — if it crosses a rect, reroute.
5. **All \`<path>\` connectors have \`fill="none"\`**.
6. **All text has appropriate fill color** — never rely on inheritance (SVG defaults to black).
7. **Colors work in dark mode**: If using hardcoded colors, provide both light and dark variants. If using CSS variables, you're fine.

---

## Multi-Diagram Approach

For complex topics, use multiple smaller SVGs instead of one dense one:
- Each SVG should have 3-5 nodes max.
- Write explanatory text between diagrams.
- First diagram = overview, subsequent = zoom into subsections.
- Never promise diagrams you don't deliver.

---

## Example: Simple 3-Step Flow

\`\`\`svg
<svg width="100%" viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- Step 1 -->
  <rect x="230" y="20" width="220" height="56" rx="8"
        fill="#E1F5EE" stroke="#0F6E56" stroke-width="0.5"/>
  <text x="340" y="38" text-anchor="middle" dominant-baseline="central"
        font-size="14" font-weight="500" fill="#085041">User request</text>
  <text x="340" y="56" text-anchor="middle" dominant-baseline="central"
        font-size="12" fill="#0F6E56">HTTP POST /api/data</text>

  <!-- Arrow 1→2 -->
  <line x1="340" y1="76" x2="340" y2="100" stroke="#534AB7"
        stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Step 2 -->
  <rect x="230" y="106" width="220" height="56" rx="8"
        fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
  <text x="340" y="124" text-anchor="middle" dominant-baseline="central"
        font-size="14" font-weight="500" fill="#3C3489">Server processing</text>
  <text x="340" y="142" text-anchor="middle" dominant-baseline="central"
        font-size="12" fill="#534AB7">Validate and transform</text>

  <!-- Arrow 2→3 -->
  <line x1="340" y1="162" x2="340" y2="186" stroke="#854F0B"
        stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- Step 3 -->
  <rect x="230" y="192" width="220" height="56" rx="8"
        fill="#FAEEDA" stroke="#854F0B" stroke-width="0.5"/>
  <text x="340" y="210" text-anchor="middle" dominant-baseline="central"
        font-size="14" font-weight="500" fill="#633806">Database write</text>
  <text x="340" y="228" text-anchor="middle" dominant-baseline="central"
        font-size="12" fill="#854F0B">INSERT into table</text>
</svg>
\`\`\`

---

## Tips for Great Diagrams

- **Less is more**: A clean 4-node diagram teaches better than a cramped 12-node one.
- **Color = meaning**: Warm colors for active/hot/important, cool for passive/cold/secondary, gray for structural.
- **Streaming effect**: Since SVGs render top-to-bottom as tokens arrive, structure your elements top-down for a natural build-up animation.
- **Annotations on the side**: Put explanatory labels in the right margin (x > 560) with leader lines pointing to the relevant element.
- **Consistent heights**: All boxes of the same type should be the same height.
- **Whitespace is your friend**: Don't fill every pixel. Breathing room makes diagrams readable.


---

# Master Agent Playbook: Making AI Responses Extraordinary

This playbook teaches an AI coding agent how to go beyond plain text and deliver
responses that are visual, interactive, and deeply educational. It covers the
philosophy, decision-making, and technical skills needed.

---

## Part 1: The Core Philosophy

### Think Like a Teacher, Not a Search Engine

Bad: "A load path is the route that forces take through a structure to the ground."
Good: [draws an interactive building cross-section with loads flowing downward]

The principle: **Show, don't just tell.** Before writing any response, ask:
- Would a diagram make this click faster than a paragraph?
- Would an interactive widget let the user explore the concept themselves?
- Would a worked example teach better than a definition?

### The Response Decision Tree

\`\`\`
User asks a question
  │
  ├─ Is it a quick factual answer? → Answer in 1-2 sentences.
  │
  ├─ Is it conceptual / "how does X work"?
  │   ├─ Is it spatial or visual? → SVG illustrative diagram
  │   ├─ Is it a process/flow? → SVG flowchart or HTML stepper
  │   ├─ Is it data-driven? → Interactive chart (Chart.js / Recharts)
  │   └─ Is it abstract but explorable? → Interactive HTML widget with controls
  │
  ├─ Is it "build me X"? → Working code artifact, fully functional
  │
  ├─ Is it a comparison? → Side-by-side table or comparative visual
  │
  └─ Is it emotional/personal? → Warm text response. No visuals needed.
\`\`\`

### The 3-Layer Response Pattern

Great responses layer information:

1. **Hook** (1-2 sentences): Validate the question, set context.
2. **Visual** (diagram/widget): The core explanation, rendered visually.
3. **Narration** (2-4 paragraphs): Walk through the visual, add nuance,
   connect to what the user already knows. Offer to go deeper.

Never dump a visual without narration. Never narrate without visuals
when visuals would help.

---

## Part 2: Skill — Interactive HTML Widgets

For concepts that benefit from user exploration. More powerful than
static SVGs — users can manipulate parameters and see results.

### When to Use
- The concept has a variable the user could tweak (temperature, rate, count)
- The system has states the user could toggle (on/off, mode A/B)
- The explanation benefits from stepping through stages
- Data exploration or filtering is involved

### Template: Interactive Widget with Controls

\`\`\`html
<style>
  .controls {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 12px 0;
    font-size: 13px;
    color: var(--color-text-secondary, #666);
  }
  .controls label {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  input[type="range"] { flex: 1; }
</style>

<!-- Inline SVG drawing that responds to controls -->
<svg width="100%" viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Dynamic elements with IDs for JS manipulation -->
  <rect id="dynamic-element" x="100" y="100" width="200" height="50"
        fill="#E6F1FB" stroke="#185FA5" stroke-width="0.5" rx="8"/>
</svg>

<!-- Controls below the visual -->
<div class="controls">
  <label>
    <span>Parameter</span>
    <input type="range" id="param-slider" min="0" max="100" value="50"
           oninput="updateParam(this.value)">
    <span id="param-label">50</span>
  </label>
</div>

<script>
function updateParam(value) {
  document.getElementById('param-label').textContent = value;
  // Modify SVG elements based on value
  const el = document.getElementById('dynamic-element');
  el.setAttribute('width', 100 + value * 2);
}
</script>
\`\`\`

### Template: Step-Through Explainer

For cyclic or staged processes (event loops, biological cycles, pipelines).

\`\`\`html
<style>
  .step-nav {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 12px 0;
    font-size: 13px;
  }
  .step-nav button {
    padding: 6px 16px;
    border: 1px solid var(--color-border-tertiary, #ddd);
    border-radius: 8px;
    background: var(--color-background-secondary, #f5f5f5);
    color: var(--color-text-primary, #333);
    cursor: pointer;
    font-size: 13px;
  }
  .step-nav button:hover {
    background: var(--color-background-tertiary, #eee);
  }
  .dot { width: 8px; height: 8px; border-radius: 50%;
         background: var(--color-border-tertiary, #ccc);
         transition: background 0.2s; }
  .dot.active { background: var(--color-text-info, #185FA5); }
  .step-content { min-height: 300px; }
</style>

<div class="step-content" id="step-display">
  <!-- SVG or HTML content per step, swapped by JS -->
</div>

<div class="step-nav">
  <button onclick="prevStep()">Previous</button>
  <div id="dots" style="display:flex;gap:6px"></div>
  <button onclick="nextStep()">Next</button>
  <span id="step-label" style="margin-left:auto;
        color:var(--color-text-secondary,#888)">Step 1 of 4</span>
</div>

<script>
const steps = [
  { title: "Step 1", svg: \`<svg>...</svg>\`, desc: "What happens first" },
  { title: "Step 2", svg: \`<svg>...</svg>\`, desc: "Then this" },
  // ...
];
let current = 0;

function render() {
  document.getElementById('step-display').innerHTML = steps[current].svg;
  document.getElementById('step-label').textContent =
    \`Step \${current + 1} of \${steps.length}\`;
  document.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === current));
}

function nextStep() { current = (current + 1) % steps.length; render(); }
function prevStep() { current = (current - 1 + steps.length) % steps.length; render(); }

// Build dots
const dotsEl = document.getElementById('dots');
steps.forEach(() => {
  const d = document.createElement('div');
  d.className = 'dot';
  dotsEl.appendChild(d);
});
render();
</script>
\`\`\`

### CSS Animation Patterns (for live diagrams)

\`\`\`css
/* Flowing particles along a path */
@keyframes flow {
  to { stroke-dashoffset: -20; }
}
.flowing {
  stroke-dasharray: 5 5;
  animation: flow 1.6s linear infinite;
}

/* Pulsing glow for active elements */
@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
.pulsing { animation: pulse 2s ease-in-out infinite; }

/* Flickering (for flames, sparks) */
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

/* Always respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
\`\`\`

---

## Part 3: Skill — Data Visualization

### When to Use
- Comparing quantities
- Showing trends over time
- Displaying distributions or proportions
- Making data explorable

### Approach: Inline SVG Charts (No Dependencies)

For simple charts, hand-draw in SVG. No library needed.

\`\`\`svg
<!-- Simple bar chart -->
<svg width="100%" viewBox="0 0 680 300">
  <!-- Y axis -->
  <line x1="80" y1="40" x2="80" y2="250" stroke="currentColor"
        stroke-width="0.5" opacity="0.3"/>
  <!-- X axis -->
  <line x1="80" y1="250" x2="620" y2="250" stroke="currentColor"
        stroke-width="0.5" opacity="0.3"/>

  <!-- Bars -->
  <rect x="120" y="100" width="60" height="150" rx="4"
        fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5"/>
  <text x="150" y="270" text-anchor="middle" font-size="12"
        fill="currentColor" opacity="0.7">Q1</text>
  <text x="150" y="92" text-anchor="middle" font-size="12"
        fill="#3C3489">$42k</text>
  <!-- ... more bars -->
</svg>
\`\`\`

### Approach: Chart.js (For Complex/Interactive Charts)

When you need tooltips, responsive legends, animations:

\`\`\`html
<canvas id="myChart" style="width:100%;max-height:400px"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<script>
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const textColor = isDark ? '#c2c0b6' : '#3d3d3a';
const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

new Chart(document.getElementById('myChart'), {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [{
      label: 'Revenue',
      data: [30, 45, 28, 62],
      borderColor: '#534AB7',
      backgroundColor: 'rgba(83,74,183,0.1)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { labels: { color: textColor } }
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { color: gridColor } },
      y: { ticks: { color: textColor }, grid: { color: gridColor } }
    }
  }
});
</script>
\`\`\`

---

## Part 4: Skill — Mermaid Diagrams

For relationship diagrams (ERDs, class diagrams, sequence diagrams) where
precise layout math isn't worth doing by hand.

\`\`\`html
<div id="diagram"></div>
<script type="module">
import mermaid from 'https://esm.sh/mermaid@11/dist/mermaid.esm.min.mjs';
const dark = matchMedia('(prefers-color-scheme: dark)').matches;
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    darkMode: dark,
    fontSize: '13px',
    lineColor: dark ? '#9c9a92' : '#73726c',
    textColor: dark ? '#c2c0b6' : '#3d3d3a',
  },
});
const { svg } = await mermaid.render('d', \`
  erDiagram
    USERS ||--o{ POSTS : writes
    POSTS ||--o{ COMMENTS : has
\`);
document.getElementById('diagram').innerHTML = svg;
</script>
\`\`\`

Use Mermaid for: ERDs, class diagrams, sequence diagrams, Gantt charts.
Use hand-drawn SVG for: everything else (flowcharts, architecture,
illustrative diagrams) — you get much better control.

---

## Part 5: Skill — Explanatory Writing Between Visuals

### Narration Patterns

**The Walk-Through**: Point at parts of the visual and explain them.
> "Starting at the top, the roof deck collects distributed loads across
> its surface. These get channeled into the rafters below, which act
> like one-way bridges..."

**The "Why It Matters"**: Connect the visual to real consequences.
> "This is why lower columns are always larger — they're carrying the
> accumulated weight of every floor above."

**The "Common Mistake"**: Anticipate misconceptions.
> "One thing that trips people up: removing a single column doesn't just
> lose that member — it breaks the entire load chain."

**The "Go Deeper" Offer**: End with expansion paths.
> "Want me to show how lateral loads (wind, seismic) take a completely
> different path?"

### Tone Rules
- Warm and direct. Not academic, not dumbed-down.
- Use "you" and "we" freely.
- Analogies and metaphors are powerful. Use them.
- Short paragraphs (2-4 sentences). No walls of text.
- Bold key terms on first introduction, then don't re-bold.
- Never use bullet points for explanations. Prose only.
- Ask at most one question per response.

---

## Part 6: Skill — Knowing What NOT to Visualize

Not everything needs a diagram. Skip visuals when:

- The answer is a single fact or number
- The user is venting or emotional (empathy, not charts)
- The topic is purely textual (writing, editing, drafting)
- A code snippet is the answer (just show the code)
- The user explicitly asked for brief/concise

### The "Would They Screenshot This?" Test

If the user would likely screenshot or save the visual to reference
later, it was worth making. If not, just use text.

---

## Part 7: Putting It All Together

### Example Response Structure (Complex Technical Question)

\`\`\`
[1-2 sentence hook validating the question]

[Visual: SVG diagram or interactive widget]

[Walk-through narration: 3-4 paragraphs explaining the visual,
 pointing at specific parts, noting key insights]

[One "go deeper" offer with 2-3 specific directions]
\`\`\`

### Example Response Structure (Simple Question with Visual Aid)

\`\`\`
[Direct answer in 1-2 sentences]

[Small supporting visual if it adds value]

[One additional insight or context sentence]
\`\`\`

### Quality Checklist Before Responding

- [ ] Did I pick the right format? (text vs SVG vs interactive vs chart)
- [ ] Is the visual self-explanatory even without the narration?
- [ ] Does the narration add value beyond what the visual shows?
- [ ] Are colors meaningful, not decorative?
- [ ] Does it work in dark mode?
- [ ] Is the response concise? (Cut anything that doesn't teach)
- [ ] Did I offer a clear next step?

---

## Appendix: Quick Reference

| Concept Type            | Best Format                  |
|-------------------------|------------------------------|
| How X works (physical)  | Illustrative SVG diagram     |
| How X works (abstract)  | Interactive HTML + SVG       |
| Process / workflow      | SVG flowchart                |
| Architecture            | SVG structural diagram       |
| Data relationships      | Mermaid ERD                  |
| Trends / comparisons    | Chart.js or SVG bar chart    |
| Cyclic process          | HTML step-through widget     |
| System states           | Interactive widget + toggles |
| Quick answer            | Plain text                   |
| Code solution           | Code block / artifact        |
| Emotional support       | Warm text only               |


---

# Agent Visualization Skills — Volume 2: Advanced Techniques

Prerequisite: Volume 1 (SVG diagrams, basic interactive widgets, Chart.js, Mermaid).
This volume covers: UI mockups, dashboards, advanced interactivity, generative art,
simulations, math visualizations, and the design system that ties everything together.

---

## Part 1: The Design System

Every visual you produce should feel native to the host interface — not like
an embedded iframe from somewhere else. These rules apply to ALL output types.

### CSS Variables (Auto Light/Dark Mode)

\`\`\`css
/* Backgrounds */
--color-background-primary    /* white in light, near-black in dark */
--color-background-secondary  /* surface cards */
--color-background-tertiary   /* page background */
--color-background-info       /* blue tint */
--color-background-danger     /* red tint */
--color-background-success    /* green tint */
--color-background-warning    /* amber tint */

/* Text */
--color-text-primary          /* main text */
--color-text-secondary        /* muted / labels */
--color-text-tertiary         /* hints / placeholders */
--color-text-info / -danger / -success / -warning

/* Borders */
--color-border-tertiary       /* default: 0.15 alpha */
--color-border-secondary      /* hover: 0.3 alpha */
--color-border-primary        /* active: 0.4 alpha */

/* Typography */
--font-sans                   /* default body font */
--font-serif                  /* editorial / blockquote only */
--font-mono                   /* code */

/* Layout */
--border-radius-md            /* 8px - most elements */
--border-radius-lg            /* 12px - cards */
--border-radius-xl            /* 16px - large containers */
\`\`\`

**Critical rule**: Never hardcode colors like \`#333\` or \`#fff\` in HTML.
They break in the opposite mode. Always use CSS variables.

### Typography Rules
- h1 = 22px, h2 = 18px, h3 = 16px — all font-weight: 500
- Body = 16px, weight 400, line-height: 1.7
- Only two weights: 400 (regular) and 500 (medium). Never 600 or 700.
- Sentence case everywhere. Never Title Case or ALL CAPS.
- No mid-sentence bolding. Use \`code style\` for entity/class/function names.
- No font-size below 11px anywhere.

### Component Tokens
- Borders: \`0.5px solid var(--color-border-tertiary)\`
- Cards: \`background: var(--color-background-primary)\`,
  \`border: 0.5px solid var(--color-border-tertiary)\`,
  \`border-radius: var(--border-radius-lg)\`, \`padding: 1rem 1.25rem\`
- No gradients, drop shadows, blur, glow, or neon effects
- No emoji — use CSS shapes or SVG paths for icons
- Background of outer container is always transparent

### Number Formatting
Always round displayed numbers. JavaScript float math leaks artifacts:
\`0.1 + 0.2 = 0.30000000000000004\`. Every number on screen must go through
\`Math.round()\`, \`.toFixed(n)\`, or \`Intl.NumberFormat\`.

---

## Part 2: UI Mockups

For when the user asks you to design or prototype a UI.

### When to Use
- "Design a settings page for..."
- "Mock up a dashboard"
- "What should this form look like?"
- "Show me a card layout for..."
- Prototyping before building

### Presentation Rules

**Contained mockups** (mobile screens, modals, chat threads, single cards):
Wrap in a background surface so they don't float naked:
\`\`\`html
<div style="background: var(--color-background-secondary);
            border-radius: var(--border-radius-lg);
            padding: 2rem; display: flex; justify-content: center;">
  <!-- Your mockup inside -->
</div>
\`\`\`

**Full-width mockups** (dashboards, settings pages, data tables):
No wrapper needed — they naturally fill the viewport.

### Metric Cards (for dashboards)
\`\`\`html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 12px; margin-bottom: 1.5rem;">

  <div style="background: var(--color-background-secondary);
              border-radius: var(--border-radius-md); padding: 1rem;">
    <div style="font-size: 13px; color: var(--color-text-secondary);
                margin-bottom: 4px;">Total revenue</div>
    <div style="font-size: 24px; font-weight: 500;">$142,800</div>
  </div>

  <div style="background: var(--color-background-secondary);
              border-radius: var(--border-radius-md); padding: 1rem;">
    <div style="font-size: 13px; color: var(--color-text-secondary);
                margin-bottom: 4px;">Active users</div>
    <div style="font-size: 24px; font-weight: 500;">8,421</div>
  </div>

</div>
\`\`\`

### Contact / Data Record Card
\`\`\`html
<div style="background: var(--color-background-primary);
            border-radius: var(--border-radius-lg);
            border: 0.5px solid var(--color-border-tertiary);
            padding: 1rem 1.25rem;">

  <div style="display: flex; align-items: center; gap: 12px;
              margin-bottom: 16px;">
    <!-- Avatar circle with initials -->
    <div style="width: 44px; height: 44px; border-radius: 50%;
                background: var(--color-background-info);
                display: flex; align-items: center; justify-content: center;
                font-weight: 500; font-size: 14px;
                color: var(--color-text-info);">JD</div>
    <div>
      <p style="font-weight: 500; font-size: 15px; margin: 0;">Jane Doe</p>
      <p style="font-size: 13px; color: var(--color-text-secondary);
                margin: 0;">Lead Engineer</p>
    </div>
  </div>

  <div style="border-top: 0.5px solid var(--color-border-tertiary);
              padding-top: 12px;">
    <table style="width: 100%; font-size: 13px;">
      <tr>
        <td style="color: var(--color-text-secondary); padding: 4px 0;">
          Email</td>
        <td style="text-align: right; padding: 4px 0;
                   color: var(--color-text-info);">jane@company.com</td>
      </tr>
    </table>
  </div>
</div>
\`\`\`

### Badges and Status Pills
\`\`\`html
<!-- Status badge -->
<span style="display: inline-block; font-size: 12px; padding: 4px 12px;
             border-radius: var(--border-radius-md);
             background: var(--color-background-success);
             color: var(--color-text-success);">Active</span>

<!-- Featured accent (the ONLY case where 2px border is allowed) -->
<div style="border: 2px solid var(--color-border-info);
            border-radius: var(--border-radius-lg);
            padding: 1rem 1.25rem;">
  <span style="font-size: 12px; padding: 4px 12px;
               border-radius: var(--border-radius-md);
               background: var(--color-background-info);
               color: var(--color-text-info);">Most popular</span>
</div>
\`\`\`

### Form Elements
Inputs, selects, textareas, buttons, and range sliders are pre-styled
in the host environment. Write bare tags — they inherit correct styling:
- Text inputs: 36px height, hover/focus states built in
- Range sliders: 4px track + 18px thumb
- Buttons: transparent bg, 0.5px border, hover/active states

**Never use \`<form>\` tags.** Use \`onClick\` / \`onChange\` handlers directly.

### Comparison Cards
For "help me choose between X and Y":
\`\`\`html
<div style="display: grid; grid-template-columns:
            repeat(auto-fit, minmax(160px, 1fr)); gap: 12px;">

  <div style="background: var(--color-background-primary);
              border: 0.5px solid var(--color-border-tertiary);
              border-radius: var(--border-radius-lg);
              padding: 1rem 1.25rem;">
    <h3 style="font-size: 16px; font-weight: 500; margin: 0 0 8px;">
      Option A</h3>
    <p style="font-size: 13px; color: var(--color-text-secondary);
              margin: 0;">Description here</p>
  </div>

  <!-- Repeat for Option B, C... -->
</div>
\`\`\`

---

## Part 3: Advanced Interactive Widgets

### Simulations and Physics
For teaching physics, algorithms, or systems behavior with real-time updates.

**Pattern: Animation Loop with Controls**
\`\`\`html
<style>
  .sim-controls {
    display: flex; align-items: center; gap: 16px;
    margin: 12px 0; font-size: 13px;
    color: var(--color-text-secondary);
  }
</style>

<canvas id="sim" style="width: 100%; height: 300px;
        border-radius: var(--border-radius-md);
        background: var(--color-background-secondary);"></canvas>

<div class="sim-controls">
  <button onclick="toggleSim()">Play / Pause</button>
  <label>Speed
    <input type="range" min="1" max="10" value="5" id="speed"
           oninput="simSpeed=+this.value">
  </label>
  <button onclick="resetSim()">Reset</button>
</div>

<script>
const canvas = document.getElementById('sim');
const ctx = canvas.getContext('2d');
let running = true, simSpeed = 5, animId;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();

// State
let particles = [];
function init() {
  particles = Array.from({length: 50}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2
  }));
}

function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    p.x += p.vx * simSpeed * 0.2;
    p.y += p.vy * simSpeed * 0.2;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#534AB7';
    ctx.fill();
  }
  if (running) animId = requestAnimationFrame(step);
}

function toggleSim() { running = !running; if (running) step(); }
function resetSim() { init(); if (!running) { running = true; step(); } }

init();
step();
</script>
\`\`\`

### Math Visualizations
For plotting functions, showing geometric relationships, or exploring equations.

**Pattern: Function Plotter with SVG**
\`\`\`html
<svg id="plot" width="100%" viewBox="0 0 680 400">
  <!-- Grid -->
  <line x1="60" y1="200" x2="640" y2="200"
        stroke="var(--color-border-tertiary)" stroke-width="0.5"/>
  <line x1="340" y1="20" x2="340" y2="380"
        stroke="var(--color-border-tertiary)" stroke-width="0.5"/>
  <!-- Axes labels -->
  <text x="645" y="196" font-size="12"
        fill="var(--color-text-tertiary)">x</text>
  <text x="345" y="16" font-size="12"
        fill="var(--color-text-tertiary)">y</text>
  <!-- Function path drawn by JS -->
  <path id="fn-path" fill="none" stroke="#534AB7" stroke-width="2"/>
</svg>

<div style="display:flex;gap:16px;align-items:center;margin:12px 0;
            font-size:13px;color:var(--color-text-secondary)">
  <label>f(x) = sin(
    <input type="number" id="freq" value="1" min="0.1" max="10" step="0.1"
           style="width:60px" oninput="plotFn()">x)
  </label>
  <label>Amplitude
    <input type="range" id="amp" min="0.1" max="3" value="1" step="0.1"
           style="flex:1" oninput="plotFn()">
  </label>
</div>

<script>
function plotFn() {
  const freq = +document.getElementById('freq').value;
  const amp = +document.getElementById('amp').value;
  const xMin = -5, xMax = 5, yMin = -3, yMax = 3;
  const toSvgX = x => 60 + (x - xMin) / (xMax - xMin) * 580;
  const toSvgY = y => 20 + (yMax - y) / (yMax - yMin) * 360;
  let d = '';
  for (let px = 0; px <= 580; px++) {
    const x = xMin + px / 580 * (xMax - xMin);
    const y = amp * Math.sin(freq * x);
    d += (px === 0 ? 'M' : 'L') + toSvgX(x).toFixed(1)
       + ' ' + toSvgY(y).toFixed(1);
  }
  document.getElementById('fn-path').setAttribute('d', d);
}
plotFn();
</script>
\`\`\`

### Sortable / Filterable Data Tables
\`\`\`html
<style>
  .data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
  .data-table th {
    text-align: left; padding: 8px 12px; font-weight: 500;
    border-bottom: 0.5px solid var(--color-border-secondary);
    color: var(--color-text-secondary); cursor: pointer;
    user-select: none; font-size: 12px;
  }
  .data-table th:hover { color: var(--color-text-primary); }
  .data-table td {
    padding: 8px 12px;
    border-bottom: 0.5px solid var(--color-border-tertiary);
  }
</style>

<input type="text" placeholder="Filter..."
       oninput="filterTable(this.value)"
       style="width: 100%; margin-bottom: 12px;">

<table class="data-table" id="table">
  <thead>
    <tr>
      <th onclick="sortTable(0)">Name</th>
      <th onclick="sortTable(1)">Value</th>
      <th onclick="sortTable(2)">Status</th>
    </tr>
  </thead>
  <tbody id="tbody">
    <!-- Rows populated by JS -->
  </tbody>
</table>

<script>
const data = [
  ['Alpha', 42, 'Active'],
  ['Beta', 18, 'Paused'],
  ['Gamma', 91, 'Active'],
];
let sortCol = -1, sortAsc = true;

function render(rows) {
  document.getElementById('tbody').innerHTML = rows.map(r =>
    \`<tr><td>\${r[0]}</td><td>\${r[1]}</td>
     <td><span style="font-size:12px;padding:2px 10px;
       border-radius:var(--border-radius-md);
       background:var(--color-background-\${r[2]==='Active'?'success':'warning'});
       color:var(--color-text-\${r[2]==='Active'?'success':'warning'})">\${r[2]}</span>
     </td></tr>\`
  ).join('');
}

function sortTable(col) {
  sortAsc = sortCol === col ? !sortAsc : true;
  sortCol = col;
  data.sort((a, b) => {
    if (a[col] < b[col]) return sortAsc ? -1 : 1;
    if (a[col] > b[col]) return sortAsc ? 1 : -1;
    return 0;
  });
  render(data);
}

function filterTable(q) {
  const low = q.toLowerCase();
  render(data.filter(r => r.some(c => String(c).toLowerCase().includes(low))));
}

render(data);
</script>
\`\`\`

---

## Part 4: Chart.js — Advanced Patterns

### Dark Mode Awareness
\`\`\`javascript
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const textColor = isDark ? '#c2c0b6' : '#3d3d3a';
const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
const tooltipBg = isDark ? '#2C2C2A' : '#fff';
\`\`\`

Canvas cannot read CSS variables — always detect dark mode and use
hardcoded hex values.

### Wrapper Pattern (Critical for Sizing)
\`\`\`html
<div style="position: relative; width: 100%; height: 300px;">
  <canvas id="chart"></canvas>
</div>
\`\`\`
- Height goes on the wrapper div ONLY, never on canvas.
- Always set \`responsive: true, maintainAspectRatio: false\`.
- For horizontal bar charts: height = (bars × 40) + 80 pixels.

### Custom Legend (Always Use This)
Disable Chart.js default legend and build HTML:
\`\`\`javascript
plugins: { legend: { display: false } }
\`\`\`
\`\`\`html
<div style="display: flex; flex-wrap: wrap; gap: 16px;
            margin-bottom: 8px; font-size: 12px;
            color: var(--color-text-secondary);">
  <span style="display: flex; align-items: center; gap: 4px;">
    <span style="width: 10px; height: 10px; border-radius: 2px;
                 background: #534AB7;"></span>Series A — 65%
  </span>
  <span style="display: flex; align-items: center; gap: 4px;">
    <span style="width: 10px; height: 10px; border-radius: 2px;
                 background: #0F6E56;"></span>Series B — 35%
  </span>
</div>
\`\`\`

### Dashboard Layout
Metric cards on top → chart below → sendPrompt for drill-down:
\`\`\`html
<!-- Metric cards grid -->
<div style="display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 12px; margin-bottom: 1.5rem;">
  <!-- cards here -->
</div>

<!-- Chart (no card wrapper) -->
<div style="position: relative; width: 100%; height: 300px;">
  <canvas id="chart"></canvas>
</div>
\`\`\`

### Chart Type Selection Guide
| Data pattern               | Chart type          |
|----------------------------|---------------------|
| Trend over time            | Line                |
| Category comparison        | Vertical bar        |
| Ranking (few items)        | Horizontal bar      |
| Part of whole              | Doughnut            |
| Distribution               | Histogram (bar)     |
| Correlation (2 variables)  | Scatter             |
| Multi-variable comparison  | Radar               |
| Range / uncertainty        | Line with fill area |

---

## Part 5: Generative Art and Illustration

For when the user asks for something creative, decorative, or aesthetic.

### When to Use
- "Draw me a sunset" / "Create a pattern"
- Decorative headers or visual breaks
- Mood illustrations for creative writing
- Abstract visualizations of data or music

### Rules (Different from Diagrams)
- Fill the canvas — art should feel rich, not sparse
- Bold colors are encouraged. You can use custom hex freely.
- Layered overlapping shapes create depth
- Organic forms with \`<path>\` curves, \`<ellipse>\`, \`<circle>\`
- Texture via repetition (hatching, dots, parallel lines)
- Geometric patterns with \`<g transform="rotate()">\`
- NO gradients, shadows, blur, or glow (still flat aesthetic)

### Pattern: Geometric Art
\`\`\`svg
<svg width="100%" viewBox="0 0 680 400">
  <!-- Background shapes -->
  <circle cx="200" cy="200" r="150" fill="#EEEDFE" opacity="0.8"/>
  <circle cx="480" cy="180" r="120" fill="#E1F5EE" opacity="0.8"/>

  <!-- Overlapping geometric forms -->
  <rect x="150" y="100" width="200" height="200" rx="8"
        fill="#CECBF6" opacity="0.6"
        transform="rotate(15 250 200)"/>
  <rect x="320" y="80" width="180" height="180" rx="8"
        fill="#9FE1CB" opacity="0.6"
        transform="rotate(-10 410 170)"/>

  <!-- Detail lines -->
  <line x1="100" y1="300" x2="580" y2="300"
        stroke="#534AB7" stroke-width="0.5" opacity="0.3"/>
  <line x1="100" y1="310" x2="580" y2="310"
        stroke="#534AB7" stroke-width="0.5" opacity="0.2"/>
</svg>
\`\`\`

### Pattern: Radial Symmetry
\`\`\`svg
<svg width="100%" viewBox="0 0 680 680">
  <g transform="translate(340 340)">
    <!-- Repeat a shape at angular intervals -->
    <g transform="rotate(0)">
      <ellipse cx="0" cy="-120" rx="30" ry="80"
               fill="#FAECE7" stroke="#993C1D" stroke-width="0.5"/>
    </g>
    <g transform="rotate(45)">
      <ellipse cx="0" cy="-120" rx="30" ry="80"
               fill="#FBEAF0" stroke="#993556" stroke-width="0.5"/>
    </g>
    <!-- ... repeat for 90, 135, 180, 225, 270, 315 -->
  </g>
</svg>
\`\`\`

### Pattern: Landscape with Layered Shapes
For physical scenes, use ALL hardcoded hex (no theme classes):
\`\`\`svg
<svg width="100%" viewBox="0 0 680 400">
  <!-- Sky -->
  <rect x="0" y="0" width="680" height="250" fill="#E6F1FB"/>
  <!-- Mountains -->
  <polygon points="0,250 150,100 300,250" fill="#B4B2A9"/>
  <polygon points="200,250 400,60 600,250" fill="#888780"/>
  <!-- Ground -->
  <rect x="0" y="250" width="680" height="150" fill="#C0DD97"/>
  <!-- Sun -->
  <circle cx="550" cy="80" r="40" fill="#FAC775"/>
</svg>
\`\`\`

---

## Part 6: Advanced Patterns

### Tabbed / Multi-View Interfaces
Since content streams top-down, don't use \`display: none\` during streaming.
Instead, render all content stacked, then use post-stream JS to create tabs:

\`\`\`html
<div id="tabs" style="display:flex;gap:4px;margin-bottom:16px;">
  <button onclick="showTab(0)" style="font-weight:500">Overview</button>
  <button onclick="showTab(1)">Details</button>
  <button onclick="showTab(2)">Code</button>
</div>

<div id="panel-0"><!-- Overview content --></div>
<div id="panel-1"><!-- Details content --></div>
<div id="panel-2"><!-- Code content --></div>

<script>
function showTab(n) {
  for (let i = 0; i < 3; i++) {
    document.getElementById('panel-' + i).style.display =
      i === n ? 'block' : 'none';
  }
  document.querySelectorAll('#tabs button').forEach((b, i) => {
    b.style.fontWeight = i === n ? '500' : '400';
    b.style.color = i === n
      ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)';
  });
}
showTab(0);
</script>
\`\`\`

### sendPrompt() — Chat-Driven Interactivity
A global function that sends a message as if the user typed it.
Use it when the user's next action benefits from AI thinking:

\`\`\`html
<button onclick="sendPrompt('Break down Q4 revenue by region')">
  Drill into Q4 ↗
</button>
<button onclick="sendPrompt('Explain what shear force is')">
  Learn about shear ↗
</button>
\`\`\`

**Use for**: drill-downs, follow-up questions, "explain this part".
**Don't use for**: filtering, sorting, toggling — handle those in JS.
Append \` ↗\` to button text when it triggers sendPrompt.

### Responsive Grid Pattern
\`\`\`css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
gap: 12px;
\`\`\`
Use \`minmax(0, 1fr)\` if children have large min-content that could overflow.

### CSS Animations (Subtle and Purposeful)
\`\`\`css
/* Only animate transform and opacity for performance */
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Always respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}

/* Flowing particles / convection currents */
@keyframes flow { to { stroke-dashoffset: -20; } }
.flowing {
  stroke-dasharray: 5 5;
  animation: flow 1.6s linear infinite;
}

/* Pulsing for active elements */
@keyframes pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
\`\`\`

---

## Part 7: External Libraries (CDN Allowlist)

Only these CDN origins work (CSP-enforced):
- \`cdnjs.cloudflare.com\`
- \`esm.sh\`
- \`cdn.jsdelivr.net\`
- \`unpkg.com\`

### Useful Libraries

**Chart.js** (data visualization):
\`\`\`html
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
\`\`\`

**Three.js** (3D graphics):
\`\`\`html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
\`\`\`

**D3.js** (advanced data viz, force layouts, geographic maps):
\`\`\`html
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js"></script>
\`\`\`

**Mermaid** (ERDs, sequence diagrams, class diagrams):
\`\`\`html
<script type="module">
import mermaid from 'https://esm.sh/mermaid@11/dist/mermaid.esm.min.mjs';
</script>
\`\`\`

**Tone.js** (audio synthesis):
\`\`\`html
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js"></script>
\`\`\`

---

## Part 8: Quality Checklist

Before producing any visual, run through this:

### Functional
- [ ] Does it work without JavaScript during streaming? (Content visible)
- [ ] Do all interactive controls have event handlers?
- [ ] Are all displayed numbers rounded properly?
- [ ] Does the canvas/SVG fit within the container width?

### Visual
- [ ] Dark mode test: would every element be readable on near-black?
- [ ] No hardcoded text colors in HTML (use CSS variables)
- [ ] No gradients, shadows, blur, or glow
- [ ] Borders are 0.5px (except 2px for featured item accent)
- [ ] Font weights are only 400 or 500
- [ ] All text is sentence case

### Content
- [ ] Explanatory text is in the response, not inside the widget
- [ ] No titles or headings embedded in the HTML output
- [ ] Visual is self-explanatory without reading the narration
- [ ] Narration adds value beyond what the visual shows
- [ ] Offered a clear "go deeper" path

### Accessibility
- [ ] \`@media (prefers-reduced-motion: reduce)\` for all animations
- [ ] Text contrast is sufficient (dark text on light fills, vice versa)
- [ ] Interactive elements are large enough to click (min 44px touch target)
- [ ] No information conveyed by color alone

---

## Part 9: Decision Matrix — Picking the Right Visual

| User asks about...          | Output type              | Technology          |
|-----------------------------|--------------------------|---------------------|
| How X works (physical)      | Illustrative diagram     | SVG                 |
| How X works (abstract)      | Interactive explainer    | HTML + inline SVG   |
| Process / steps             | Flowchart                | SVG                 |
| Architecture / containment  | Structural diagram       | SVG                 |
| Database schema / ERD       | Relationship diagram     | Mermaid             |
| Trends over time            | Line chart               | Chart.js            |
| Category comparison         | Bar chart                | Chart.js            |
| Part of whole               | Doughnut chart           | Chart.js            |
| KPIs / metrics              | Dashboard                | HTML metric cards   |
| Design a UI                 | Mockup                   | HTML                |
| Choose between options      | Comparison cards         | HTML grid           |
| Cyclic process              | Step-through             | HTML stepper        |
| Physics / math              | Simulation               | Canvas + JS         |
| Function / equation         | Plotter                  | SVG + JS            |
| Data exploration            | Sortable table           | HTML + JS           |
| Creative / decorative       | Art / illustration       | SVG                 |
| 3D visualization            | 3D scene                 | Three.js            |
| Music / audio               | Synthesizer              | Tone.js             |
| Network / graph             | Force layout             | D3.js               |
| Quick factual answer        | Plain text               | None                |
| Code solution               | Code block               | None                |
| Emotional support           | Warm text                | None                |
`;
