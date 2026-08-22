# SYNRA — Design Direction

## Three initial directions

### Theme Name: Tactile Editorial Utility
**Very Brief Intro:** An expressive agency identity built from oversized serif typography, quiet surfaces, and diagram-like progressions that make growth feel tangible. It balances an editorial magazine sensibility with precise digital craft.
**Probability:** 0.07

### Theme Name: Kinetic Peach Signal
**Very Brief Intro:** A restrained motion-led system where peach and terracotta marks behave like signals moving across a calm canvas. It emphasizes momentum, orchestration, and the feeling of an intelligent growth engine.
**Probability:** 0.03

### Theme Name: Soft Industrial Atelier
**Very Brief Intro:** A warm, material-first studio language inspired by paper, worktables, and well-made tools. It uses stronger blocks, tactile surfaces, and close-up detail to make the small team feel hands-on and capable.
**Probability:** 0.08

## Chosen approach: Tactile Editorial Utility

### Design Movement
Contemporary editorial design crossed with Swiss International Typographic Style and digital agency art direction. The site treats typography as architecture: large, confident statements establish the story, while fine labels, ruled lines, and directional markers give the page the rigor of a working growth system.

### Core Principles
1. **Clarity with character:** Every section must quickly explain a real SYNRA capability without falling into dashboard patterns or generic agency language.
2. **Whitespace as confidence:** Generous calm space lets headlines and project imagery carry weight; density is reserved for useful detail.
3. **Editorial asymmetry:** Layouts should create visual rhythm through offset columns, numbered rails, side notes, and staggered image crops rather than a centered card grid.
4. **Motion with purpose:** Movement should reveal hierarchy, show relationships, or reward exploration. Nothing animates simply to decorate.

### Color Philosophy
Albescent White (#F7E9DE) is the visual field: warm, intelligent, and more human than a clinical white. Deep Blue Coal (#2A2D30) gives the work authority and makes the editorial headlines feel inked onto paper. Blue Coal (#515559) is the working text color. Peach Fuzz (#FFBE98) acts as the warm invitation to act, while Spanish Pink (#F0BBB4) and Terra Cotta (#EA785B) introduce controlled energy at transitions, markers, and hover moments. Warm Surface (#FFF7F2) is used sparingly to create a page-within-a-page feeling.

### Layout Paradigm
A long-form, scroll-led narrative with an offset content rail. The desktop layout uses a persistent left index, wide editorial spreads, and alternating image/text placements; the mobile layout becomes a vertical sequence of strong type, short annotations, and full-bleed moments rather than a collapsed desktop grid. Sections should feel like pages in a thoughtful field guide to digital growth.

### Signature Elements
- A fine **growth rail**: numbered markers and thin rules that connect phases like BUILD → GET FOUND → GET CUSTOMERS → GROW.
- **Editorial annotations**: eyebrow labels, compact metadata, dates, services, and small directional arrows that make the work feel documented and real.
- **Peach signal shapes**: restrained circles, underlines, and corner blocks used as a visual cue for action, not as random decoration.

### Interaction Philosophy
Interactions should feel like well-made tools: immediate, tactile, and legible. Buttons gain a slight lift and arrow travel; project imagery has a slow, intentional scale shift; navigation links use short underline or color transitions. Cursor enhancements appear only on desktop and communicate context instead of distracting from content.

### Animation
Entrance sequences use line-by-line reveals for major headings, then a 40–70ms stagger for supporting details. Scroll reveals should use opacity and transform only, with image masks and subtle vertical drift reserved for prominent visuals. Project hovers use a 500–700ms ease-out for a refined, editorial feel. Background motifs may drift by a few pixels, never loop aggressively. Respect `prefers-reduced-motion`: remove smooth-scroll interpolation, parallax, and non-essential transforms while preserving clear state changes.

### Typography System
Display: **DM Serif Display**, used for high-impact headlines with responsive clamp sizing, generous line-height, and selective italic emphasis. UI/body: **Manrope**, used for navigation, labels, supporting copy, and metadata with careful letter spacing. Hierarchy: 11–12px uppercase labels, 16–20px body copy, 24–32px section titles, and 72–160px display headlines depending on viewport. Serif headlines should not be paired with excessive bolding; scale and placement provide emphasis.

### Brand Essence
SYNRA is the focused digital growth partner for ambitious businesses that need their online presence built, discovered, managed, and made more intelligent — without agency bloat. **Clear. Warm. Exacting.**

### Brand Voice
Headlines are direct and assured. CTAs are active and human, never pushy. Microcopy is concise, specific, and lightly optimistic.

Example headline: **Build the presence your next customer can find.**

Example CTA: **Let’s make your growth easier to see. ↗**

### Wordmark & Logo
The wordmark should be a custom uppercase sans treatment with a distinctive split in the **Y** or a small offset crossbar that suggests synergy and connection. The symbol is a bold abstract **four-point convergence mark**: four peach/terracotta strokes meeting around a small negative-space center, representing BUILD, GROW, MANAGE, and AUTOMATE converging into one system. Use the symbol alone in the navigation and favicon; keep the wordmark typographic and restrained.

### Signature Brand Color
**Peach Fuzz #FFBE98** is SYNRA’s ownable signal color: optimistic and tactile against Albescent White, warm enough to humanize technology, and strong enough to make an action feel unmistakable without becoming loud.

## Implementation guardrails

- Treat Humaan as a quality and interaction reference only; do not reproduce its layout, identity, assets, or copy.
- Keep Albescent White dominant across the page.
- Use generated imagery for the hero and selected work where it creates real visual value; avoid repeating the same image.
- Keep the website frontend-only and modular.
- Maintain semantic HTML, visible focus states, alt text, reduced-motion behavior, and a clear mobile navigation experience.

## Style Decisions

- The page is a warm editorial field guide rather than a conventional agency dashboard.
- The primary visual axis is a left rail and staggered spreads, not repeated centered cards.
- Glassmorphism is limited to the floating navigation and selected action controls.
- Generated images should feel art-directed and low-key enough to support dark editorial text or be used within contained media frames; never place unreadable text directly over uncertain image areas.
- Motion should explain progression and hierarchy, with mobile receiving intentional layouts rather than a simple desktop collapse.

## Style Decisions

- **SYNRA identity rule:** The custom uppercase SYNRA wordmark and four-point convergence symbol should be visible in the first viewport, with the convergence idea recurring subtly in rails, markers, and transition moments.
- **Peach signal rule:** Peach Fuzz `#FFBE98` is reserved for primary actions, phase markers, key numerals, and decisive emphasis rather than generic headline highlighting.
- **Editorial rhythm rule:** Headline treatments alternate between display scale, ruled systems, side annotations, media spreads, and compact utility detail so the page reads as a field guide instead of a repeated template.
- **Growth rail rule:** BUILD → GET FOUND → GET CUSTOMERS → GROW is the connective operating model, expressed through consistent numbered markers, phase labels, arrows, and rules across the hero, services, process, and footer.
- **Utility proof rule:** Capability content includes outcome cues, service metadata, and documented details wherever the visitor needs confidence about what SYNRA actually does.
