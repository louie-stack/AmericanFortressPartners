/**
 * patch-brand2.js  — American Fortress brand Round 2
 * Run:  node patch-brand2.js
 *
 * Changes:
 *   A. Section backgrounds (alternating DARK / LIGHT / RED per Prompt 6)
 *   B. LIGHT section heading colour overrides (#182145 over G_MEGA cream)
 *   C. Financial section number colours for LIGHT bg (Prompt 18)
 *   D. CTA section (RED bg) text & button inversion (Prompt 21)
 *   E. Global dark-bg replacements → Midnight Indigo #182145
 *   F. Footer bg gradient + top border (Prompt 22)
 *   G. Navbar bg + pill + separator dots (Prompt 10)
 *   H. Global #E8D5B5 → #FDFAF4 (brand soft cream for headings)
 */

const fs   = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(FILE, "utf8").replace(/\r\n/g, "\n");

const r = (from, to, label) => {
  if (!src.includes(from)) {
    console.log(`  (skip – not found) ${label || from.slice(0,70).replace(/\n/g,"↵")}`);
    return;
  }
  const n = src.split(from).length - 1;
  src = src.split(from).join(to);
  console.log(`✓ (×${n}) ${label || from.slice(0,70).replace(/\n/g,"↵")}`);
};

// ── A. SECTION BACKGROUNDS ──────────────────────────────────────────────────
// Do BEFORE global dark-bg replacements so originals are still in place

// A1 — "exposed" → LIGHT #FDFAF4
r(
  `style={{ ...full, background: "linear-gradient(180deg,#0F1D35,#0A1628)" }}>`,
  `style={{ ...full, background: "#FDFAF4" }}>`,
  "exposed section bg → LIGHT"
);

// A2 — "confidentiality" → LIGHT #FDFAF4
r(
  `style={{ ...full, background: "#0F1D35", position: "relative", overflow: "hidden" }}>`,
  `style={{ ...full, background: "#FDFAF4", position: "relative", overflow: "hidden" }}>`,
  "confidentiality section bg → LIGHT"
);

// A3 — ComparisonSection outer div + shake section → LIGHT #FDFAF4
r(
  `<div ref={wrapRef} style={{ background:"#0F1D35" }}>`,
  `<div ref={wrapRef} style={{ background:"#FDFAF4" }}>`,
  "ComparisonSection outer div bg → LIGHT"
);
r(
  `<section className="cmp-shake" style={{ background:"#0F1D35",`,
  `<section className="cmp-shake" style={{ background:"#FDFAF4",`,
  "ComparisonSection shake section bg → LIGHT"
);

// A4 — FinancialSection → LIGHT #FDFAF4
r(
  `background: "#0c1225", minHeight: "100vh",`,
  `background: "#FDFAF4", minHeight: "100vh",`,
  "FinancialSection bg → LIGHT"
);

// A5 — CTASection → RED #DD1E21
r(
  `<section ref={ctR} style={G_FULL}>`,
  `<section ref={ctR} style={{ ...G_FULL, background: "#DD1E21" }}>`,
  "CTASection bg → RED"
);

// ── B. LIGHT SECTION HEADING OVERRIDES ──────────────────────────────────────

// B1 — exposed h2
r(
  `...mega("clamp(2.5rem,5.5vw,4.5rem)") }}>Your Users Are`,
  `...mega("clamp(2.5rem,5.5vw,4.5rem)"), color: "#182145" }}>Your Users Are`,
  "exposed h2 → #182145"
);

// B2 — confidentiality h2
r(
  `...mega("clamp(2.5rem,5.5vw,4.5rem)"), marginBottom: 16 }}>Confidentiality`,
  `...mega("clamp(2.5rem,5.5vw,4.5rem)"), marginBottom: 16, color: "#182145" }}>Confidentiality`,
  "confidentiality h2 → #182145"
);

// B3 — comparison h2 (explicit color in JSX)
r(
  `color:"#E8D5B5", fontSize:"clamp(2rem,4.5vw,3.8rem)", marginBottom:16 }}>`,
  `color:"#182145", fontSize:"clamp(2rem,4.5vw,3.8rem)", marginBottom:16 }}>`,
  "comparison h2 → #182145"
);

// B4 — confidentiality ghost text (rgba on light bg)
r(
  `color: "#E8D5B5", opacity: 0.025, lineHeight: 1, pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>CONFIDENTIALITY`,
  `color: "#182145", opacity: 0.04, lineHeight: 1, pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap" }}>CONFIDENTIALITY`,
  "confidentiality ghost text → dark + opacity 0.04"
);

// ── C. FINANCIAL SECTION — LIGHT BG NUMBER COLOURS ──────────────────────────

// C1 — "The Financial Opportunity" title lead word (cream → dark)
r(
  `<span className="fin-num-xl" style={{ color:"#E8D5B5" }}>The </span>`,
  `<span className="fin-num-xl" style={{ color:"#182145" }}>The </span>`,
  "Financial title 'The' → #182145"
);

// C2 — $1,000,000 dollar sign (cream → dark)
r(
  `<span className="fin-num-lg" style={{ fontFamily:"'Archivo Black',sans-serif", fontSize:"clamp(60px,11vw,130px)", color:"#FDFAF4", lineHeight:0.9, letterSpacing:"-1px" }}>$</span>`,
  `<span className="fin-num-lg" style={{ fontFamily:"'Archivo Black',sans-serif", fontSize:"clamp(60px,11vw,130px)", color:"#182145", lineHeight:0.9, letterSpacing:"-1px" }}>$</span>`,
  "Financial $1M dollar sign → #182145"
);

// C3 — SlotNumber $1M digits (cream → dark)
r(
  `active={phase >= 1} color="#FDFAF4"\n              fontSize="clamp(60px,11vw,130px)" suffix="/mo" suffixColor="rgba(160,165,185,0.35)"`,
  `active={phase >= 1} color="#182145"\n              fontSize="clamp(60px,11vw,130px)" suffix="/mo" suffixColor="rgba(24,33,69,0.35)"`,
  "SlotNumber $1M color → #182145"
);

// C4 — $200K dollar sign (gold → brand red)
r(
  `className="fin-num-xl" style={{ fontFamily:"'Archivo Black',sans-serif", fontSize:"clamp(68px,13vw,155px)", color:"#daa545",\n              lineHeight:0.9, letterSpacing:"-1px",\n              textShadow: phase >= 4 ? "0 0 40px rgba(200,170,100,0.2),0 0 80px rgba(200,170,100,0.08)"`,
  `className="fin-num-xl" style={{ fontFamily:"'Archivo Black',sans-serif", fontSize:"clamp(68px,13vw,155px)", color:"#DD1E21",\n              lineHeight:0.9, letterSpacing:"-1px",\n              textShadow: phase >= 4 ? "0 0 40px rgba(221,30,33,0.2),0 0 80px rgba(221,30,33,0.08)"`,
  "Financial $200K dollar sign → #DD1E21"
);

// C5 — SlotNumber $200K (gold → brand red)
r(
  `active={phase >= 3} color="#daa545"\n              fontSize="clamp(68px,13vw,155px)" suffix="/mo" suffixColor="rgba(200,170,100,0.4)"`,
  `active={phase >= 3} color="#DD1E21"\n              fontSize="clamp(68px,13vw,155px)" suffix="/mo" suffixColor="rgba(221,30,33,0.4)"`,
  "SlotNumber $200K color → #DD1E21"
);

// ── D. CTA SECTION (RED BG) — TEXT & BUTTON INVERSION ───────────────────────

// D1 — Stars on red bg → cream
r(
  `<Stars count={25} color="rgba(221,30,33,0.08)" />`,
  `<Stars count={25} color="rgba(253,250,244,0.08)" />`,
  "CTA stars color → cream"
);
// D2 — Bottom glow on red bg → cream
r(
  `background: "radial-gradient(ellipse,rgba(221,30,33,0.04),transparent 70%)", pointerEvents: "none" }} />`,
  `background: "radial-gradient(ellipse,rgba(253,250,244,0.04),transparent 70%)", pointerEvents: "none" }} />`,
  "CTA bottom glow → cream"
);
// D3 — Subtext colour on red bg
r(
  `<p style={{ color: "#3D4A63", fontSize: "0.95rem", marginBottom: 48 }}>Schedule a partnership call`,
  `<p style={{ color: "rgba(253,250,244,0.75)", fontSize: "0.95rem", marginBottom: 48 }}>Schedule a partnership call`,
  "CTA subtext → cream 0.75"
);
// D4 — Book a Call button: text white → #DD1E21
r(
  `color: "#fff", border: "none", borderRadius: 4, cursor: "pointer",\n                letterSpacing: "0.06em", textTransform: "uppercase",\n                display: "inline-flex", alignItems: "center", gap: 8,\n                background: hovBtn\n                  ? "linear-gradient(135deg, #E6412A 0%, #B01819 100%)"\n                  : "linear-gradient(135deg, #DD1E21 0%, #B01819 100%)",\n                boxShadow: hovBtn\n                  ? "0 4px 20px rgba(221,30,33,0.35), inset 0 0 0 1px rgba(220,160,80,0.15)"\n                  : "0 2px 12px rgba(221,30,33,0.2)",`,
  `color: "#DD1E21", border: "none", borderRadius: 4, cursor: "pointer",\n                letterSpacing: "0.06em", textTransform: "uppercase",\n                display: "inline-flex", alignItems: "center", gap: 8,\n                background: hovBtn ? "#e8e4da" : "#FDFAF4",\n                boxShadow: hovBtn\n                  ? "0 4px 16px rgba(0,0,0,0.2)"\n                  : "0 2px 8px rgba(0,0,0,0.12)",`,
  "CTA Book a Call button → inverted (cream bg / red text)"
);

// ── E. GLOBAL DARK-BG REPLACEMENTS ──────────────────────────────────────────
// (section-specific changes already done above, remaining instances go to #182145)

r(`#0A1628`, `#182145`, "global #0A1628 → #182145");
r(`#0F1D35`, `#182145`, "global #0F1D35 → #182145");
r(`#0D172E`, `#182145`, "global #0D172E → #182145");
r(`#0c1225`, `#182145`, "global #0c1225 → #182145 (remaining)");

// ── F. FOOTER BACKGROUND GRADIENT ───────────────────────────────────────────
// #0c1225 already replaced above to #182145. Now fix mid/end stops.
r(`#070b18`, `#0f1a35`, "footer bg mid stop → #0f1a35");
r(`#040710`, `#0a1229`, "footer bg end stop → #0a1229");

// Footer top border → brand three-color gradient
r(
  `background: "linear-gradient(90deg, transparent 5%, rgba(221,30,33,0.35) 25%, rgba(133,186,255,0.25) 50%, rgba(70,110,180,0.25) 75%, transparent 95%)"`,
  `background: "linear-gradient(90deg, transparent 5%, #DD1E21 30%, #F0E0B2 55%, #85BAFF 80%, transparent 95%)"`,
  "footer top border → brand 3-color gradient"
);

// ── G. NAVBAR ────────────────────────────────────────────────────────────────
// G1 — Navbar background
r(
  `background: "rgba(12,18,37,0.85)",`,
  `background: "rgba(24,33,69,0.95)",`,
  "navbar bg → rgba(24,33,69,0.95)"
);
// G2 — Nav separator dots (gold → cream)
r(
  `background: "rgba(200,170,100,0.2)", flexShrink: 0`,
  `background: "rgba(253,250,244,0.15)", flexShrink: 0`,
  "nav separator dots → cream"
);
// G3 — Nav pill (gold → cream)
r(
  `background: "rgba(200,170,100,0.08)",\n          border: "1px solid rgba(200,170,100,0.12)",`,
  `background: "rgba(253,250,244,0.06)",\n          border: "1px solid rgba(253,250,244,0.10)",`,
  "nav active pill → cream"
);
// G4 — Nav link active/hover colours (gold → cream)
r(
  `color: isActive ? "rgba(200,170,100,0.9)" : hovNav === i ? "rgba(200,170,100,0.7)" : "rgba(160,165,185,0.45)"`,
  `color: isActive ? "#FDFAF4" : hovNav === i ? "rgba(253,250,244,0.75)" : "rgba(253,250,244,0.45)"`,
  "nav link colours → cream"
);

// ── H. GLOBAL HEADING CREAM (#E8D5B5 → #FDFAF4) ─────────────────────────────
// Now safe: LIGHT sections have explicit #182145 overrides above
r(`#E8D5B5`, `#FDFAF4`, "global heading cream #E8D5B5 → #FDFAF4");

// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(FILE, src.replace(/\n/g, "\r\n"), "utf8");
console.log("\n✅ patch-brand2.js complete.");
