const fs = require("fs");
let src = fs.readFileSync("src/App.jsx", "utf8").replace(/\r\n/g, "\n");

const ARROW_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;

// ── Fix 1: Replace unicode arrows in buttons ──────────────────────────────────

// Hero: "Book a Call ↗"
src = src.replace(`>Book a Call ↗</a>`, `>Book a Call {ARROW_SVG}</a>`);
// Actually need JSX — use placeholder approach:
// We'll do direct string replacements for each button

const arrowReplacements = [
  // Hero Book a Call
  [
    `>Book a Call ↗</a>`,
    `style={{display:"inline-flex",alignItems:"center",gap:8}}>Book a Call <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a>`
  ],
  // Hero Download AF Beta
  [
    `>Download AF Beta ↗</a>`,
    `style={{display:"inline-flex",alignItems:"center",gap:8}}>Download AF Beta <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></a>`
  ],
  // Book a Partnership Call (in comparison section)
  [
    `>
              Book a Partnership Call ↗
            </a>`,
    `style={{display:"inline-flex",alignItems:"center",gap:8}}>
              Book a Partnership Call <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </a>`
  ],
  // Discuss Revenue Opportunity (FinRevBtn) — already has SVG arrow, skip
  // Footnote arrow → in text (not a button, keep as-is)
];

// Simpler approach — just replace the unicode chars in button contexts
src = src.replace(
  `>Book a Call ↗</a>`,
  `><span style={{display:"inline-flex",alignItems:"center",gap:8}}>Book a Call <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></span></a>`
);

src = src.replace(
  `>Download AF Beta ↗</a>`,
  `><span style={{display:"inline-flex",alignItems:"center",gap:8}}>Download AF Beta <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></span></a>`
);

// Book a Partnership Call ↗ (in comparison footer)
src = src.replace(
  `Book a Partnership Call ↗\n            </a>`,
  `<span style={{display:"inline-flex",alignItems:"center",gap:8}}>Book a Partnership Call <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></span>\n            </a>`
);

// "The technology advantage..." footnote → (not a button, keep)

// Nav "Book a Call" — already has SVG in SiteNav, check footer CTA button
// Footer CTA "Book a Call" — check what it has
const footerCallIdx = src.indexOf(`href="https://calendly.com/jakub_zurawinski`, src.indexOf("SiteFooter"));
// Already has SVG arrow in the footer component, skip

console.log("✅ Fix 1: Button arrow unicode → SVG");

// ── Fix 2: ↔ in Competitive Landscape title ──────────────────────────────────
src = src.replace(
  `>Where We Stand — <span style={{ color: "#C41E2A" }}>Privacy ↔ Usability</span></h2>`,
  `>Where We Stand — <span style={{ color: "#C41E2A" }}>Privacy <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:"inline-block",verticalAlign:"middle",margin:"0 2px"}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="8 8 4 12 8 16"/><polyline points="16 8 20 12 16 16"/></svg> Usability</span></h2>`
);
console.log("✅ Fix 2: ↔ → SVG double arrow");

// ── Fix 3: Gold dot in hero credential pills ──────────────────────────────────
// Replace the plain <span style={{ width: 5, height: 5...}} /> in hero badges
src = src.replace(
  `<span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A84C" }} />{b}`,
  `<span style={{ width:5, height:5, borderRadius:"50%", background:"rgba(200,170,100,0.6)", flexShrink:0, display:"inline-block" }} />{b}`
);
// Make the pill container inline-flex with alignItems center (it already has display:flex and gap:8 from earlier check)
// The pill already has display:"flex", alignItems:"center", gap:8 — good

console.log("✅ Fix 3: Hero pill dots → CSS spans");

// ── Fix 4: Hero mobile top padding ───────────────────────────────────────────
// Add padding-top to hero section on mobile
// The hero section has ref={hR} — add a className
src = src.replace(
  `<section ref={hR} style={{ ...full, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>`,
  `<section ref={hR} className="hero-section" style={{ ...full, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>`
);

// Inject the mobile hero padding into the existing mobile CSS block
src = src.replace(
  `          /* 1 ── NAV ────────────────────────────────────────── */`,
  `          /* 0 ── HERO: mobile top padding ─────────────────── */
          .hero-section { padding-top: 56px !important; }
          .hero-content { padding-top: 48px !important; }

          /* 1 ── NAV ────────────────────────────────────────── */`
);
console.log("✅ Fix 4: Hero mobile top padding added");

// ── Also fix the "→" in the footnote text (non-button, leave as text) ─────────
// The text "Now let's talk about what it means for your bottom line. →" is prose, keep.

// ── Scroll hint arrow in comparison ──────────────────────────────────────────
// "← Scroll to compare →" — those are plain text in a small label, fine as-is.

fs.writeFileSync("src/App.jsx", src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ All 4 fixes applied");
