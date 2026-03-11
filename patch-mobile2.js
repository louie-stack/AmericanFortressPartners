const fs = require("fs");
let src = fs.readFileSync("src/App.jsx", "utf8").replace(/\r\n/g, "\n");

// ── 1. Add classNames ────────────────────────────────────────────────────────

const replacements = [
  // Comparison table inner wrapper
  [
    `<div style={{ background:"rgba(14,22,45,0.4)", border:"1px solid rgba(100,110,150,0.08)", borderRadius:12, overflow:"hidden" }}>`,
    `<div className="cmp-table" style={{ background:"rgba(14,22,45,0.4)", border:"1px solid rgba(100,110,150,0.08)", borderRadius:12, overflow:"hidden" }}>`
  ],
  // Comparison outer wrap
  [
    `<div style={{ maxWidth:1000, margin:"0 auto", padding:"80px 48px", width:"100%" }}>`,
    `<div className="cmp-wrap" style={{ maxWidth:1000, margin:"0 auto", padding:"80px 48px", width:"100%" }}>`
  ],
  // Comparison footer
  [
    `display:"flex", justifyContent:"space-between", alignItems:"center",
            marginTop:12, flexWrap:"wrap", gap:12,`,
    `display:"flex", justifyContent:"space-between", alignItems:"center",
            marginTop:12, flexWrap:"wrap", gap:12, className__fix:"cmp-footer",`
  ],
  // Moat top row
  [
    `<div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 16, position: "relative", zIndex: 2 }}>
            {MOAT_CARDS_TOP`,
    `<div className="moat-row" style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 16, position: "relative", zIndex: 2 }}>
            {MOAT_CARDS_TOP`
  ],
  // Moat bottom row
  [
    `<div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 16, position: "relative", zIndex: 2 }}>
            {MOAT_CARDS_BOT`,
    `<div className="moat-row" style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 16, position: "relative", zIndex: 2 }}>
            {MOAT_CARDS_BOT`
  ],
  // Financial CTA wrapper
  [
    `<div style={{ marginTop:40, opacity: vis ? 1 : 0,`,
    `<div className="fin-cta" style={{ marginTop:40, opacity: vis ? 1 : 0,`
  ],
  // Financial $1M prefix $
  [
    `<span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(60px,11vw,130px)", color:"rgba(240,236,226,0.12)",`,
    `<span className="fin-num-lg" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(60px,11vw,130px)", color:"rgba(240,236,226,0.12)",`
  ],
  // Financial $200K prefix $
  [
    `<span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(68px,13vw,155px)", color:"rgba(200,170,100,0.15)",`,
    `<span className="fin-num-xl" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(68px,13vw,155px)", color:"rgba(200,170,100,0.15)",`
  ],
  // Comparison scroll hint injection (before grid table comment)
  [
    `{/* Grid table */}`,
    `{/* Scroll hint — shown on mobile only */}
          <div className="cmp-scroll-hint">
            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:"1.5px", color:"rgba(160,165,185,0.35)", textTransform:"uppercase" }}>← Scroll to compare →</span>
          </div>
          {/* Grid table */}`
  ],
];

let changed = 0;
for (const [OLD, NEW] of replacements) {
  if (!src.includes(OLD)) {
    console.warn(`⚠️  Not found: ${OLD.slice(0,60).replace(/\n/g," ")}`);
    continue;
  }
  src = src.replace(OLD, NEW);
  changed++;
}

// Fix the comparison footer className hack — inline className doesn't work in style obj
// The footer div needs a proper className prop — find it a different way
// Replace the style object approach we added with proper className
src = src.replace(
  `display:"flex", justifyContent:"space-between", alignItems:"center",
            marginTop:12, flexWrap:"wrap", gap:12, className__fix:"cmp-footer",`,
  `display:"flex", justifyContent:"space-between", alignItems:"center",
            marginTop:12, flexWrap:"wrap", gap:12,`
);
// Add className properly to the div
src = src.replace(
  `<div style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            marginTop:12, flexWrap:"wrap", gap:12,`,
  `<div className="cmp-footer" style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            marginTop:12, flexWrap:"wrap", gap:12,`
);

console.log(`✅ ${changed} className replacements done`);

// ── 2. Inject additional mobile CSS ─────────────────────────────────────────
const MOBILE_ANCHOR = `/* ── Mobile (≤768px) ─────────────────────────────── */`;
if (!src.includes(MOBILE_ANCHOR)) {
  console.error("❌ Mobile CSS anchor not found — run patch-mobile.js first");
  process.exit(1);
}

// Find the end of the existing @media block — look for the closing pattern
const mediaStart  = src.indexOf(MOBILE_ANCHOR);
// The media block ends with:   }        ` (closing brace then backtick close of template literal)
const mediaClose  = src.indexOf("\n        }\n      `}", mediaStart);
if (mediaClose === -1) {
  console.error("❌ Could not find end of mobile @media block");
  process.exit(1);
}

const EXTRA_CSS = `

          /* ── §5 Confidentiality: right card full width ── */
          .mgrid2 > div > div[style*="card"] {
            width: 100% !important;
            box-sizing: border-box !important;
          }

          /* ── §6 Competitive Landscape: stack insight below chart ── */
          .mgrid2[style*="320px"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          /* ── §7 Comparison: horizontal scroll ── */
          .cmp-wrap { padding: 40px 20px !important; }
          .cmp-table {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .cmp-table > div { min-width: 700px !important; }
          .cmp-scroll-hint {
            display: flex !important;
            justify-content: center !important;
            margin-bottom: 8px !important;
          }
          .cmp-footer {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .cmp-footer a, .cmp-footer button {
            width: 100% !important;
            max-width: 300px !important;
            text-align: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }

          /* ── §9 Financial: slot number sizes ── */
          .fin-num-lg { font-size: clamp(40px,10vw,130px) !important; }
          .fin-num-xl { font-size: clamp(44px,11vw,155px) !important; }
          .fin-cta {
            display: flex !important;
            justify-content: center !important;
          }
          .fin-cta a {
            width: 100% !important;
            max-width: 300px !important;
            text-align: center !important;
            justify-content: center !important;
          }
          /* Shockwave rings smaller on mobile */
          [style*="shockwaveRing"] {
            width: 300px !important;
            height: 300px !important;
          }

          /* ── §10 Technology Moat: 2-col card rows ── */
          .moat-row {
            flex-wrap: wrap !important;
            gap: 10px !important;
            justify-content: center !important;
          }
          .moat-row > * {
            flex: 1 1 calc(50% - 10px) !important;
            min-width: 140px !important;
            max-width: calc(50% - 5px) !important;
          }
          /* Scroll hint hidden on desktop */
          .cmp-scroll-hint { display: none; }`;

src = src.slice(0, mediaClose) + EXTRA_CSS + src.slice(mediaClose);
console.log("✅ Extra mobile CSS injected");

fs.writeFileSync("src/App.jsx", src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ patch-mobile2 complete");
