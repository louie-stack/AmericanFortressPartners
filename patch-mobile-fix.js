const fs = require("fs");
let src = fs.readFileSync("src/App.jsx", "utf8").replace(/\r\n/g, "\n");

// ── 1. Fix Financial title: add className, allow wrapping on mobile ───────────
src = src.replace(
  `<h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5.5vw,80px)",\n            letterSpacing:"0.02em", lineHeight:0.95, marginBottom:0, whiteSpace:"nowrap" }}>`,
  `<h2 className="fin-title" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,5.5vw,80px)",\n            letterSpacing:"0.02em", lineHeight:0.95, marginBottom:0, whiteSpace:"nowrap" }}>`
);

// ── 2. Fix Revenue stream cards — add className to their container ────────────
// The revenue section uses hovRev state — find its grid container
src = src.replace(
  `<div className="mgrid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div
                onMouseEnter={() => setHovRev(0)}`,
  `<div className="mgrid2 rev-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div
                onMouseEnter={() => setHovRev(0)}`
);

// ── 3. Add className to NameResolver container for overflow control ───────────
src = src.replace(
  `<div style={{ marginBottom: 44 }}><NameResolver /></div>`,
  `<div className="nr-wrap" style={{ marginBottom: 44 }}><NameResolver /></div>`
);

// ── 4. Trusted By section — add className ────────────────────────────────────
src = src.replace(
  `<div className="msec" style={{ ...sec, textAlign: "center", paddingBottom: 0, paddingTop: 48 }}>`,
  `<div className="msec trusted-sec" style={{ ...sec, textAlign: "center", paddingBottom: 0, paddingTop: 48 }}>`
);

console.log("✅ ClassNames added");

// ── 5. Consolidate: replace the two fragmented mobile CSS blocks with one ─────
// The main style block has two @media blocks — find & replace both with clean version

// Block 1 — the large main block that starts at "/* ── Mobile (≤768px) */"
const BLOCK1_START = `        @media (max-width: 768px) {\n\n          /* ── Nav ── */`;
const BLOCK1_END_MARKER = `          .cmp-scroll-hint { display: none; }\n        }`;

const b1Start = src.indexOf(BLOCK1_START);
const b1End   = src.indexOf(BLOCK1_END_MARKER, b1Start) + BLOCK1_END_MARKER.length;

if (b1Start === -1 || b1End === -1) {
  console.error("❌ Could not find main mobile CSS block");
  process.exit(1);
}

// Block 2 — the one inside @media(max-width:768px){  (no spaces, inside style tag)
const BLOCK2_PATTERN = `        @media(max-width:768px){\n          .msec{padding:100px 20px!important}`;
const b2Start = src.indexOf(BLOCK2_PATTERN);
const b2End   = b2Start !== -1
  ? src.indexOf("\n        }\n      `}", b2Start) + "\n        }\n".length
  : -1;

// Build the single clean replacement block
const NEW_MOBILE_CSS = `        @media (max-width: 768px) {

          /* ═══════════════════════════════════════════
             PRIORITY 1: Global overflow fix
          ═══════════════════════════════════════════ */
          html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
          }
          section, .msec, .mgrid2, .noise {
            max-width: 100vw !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }

          /* ═══════════════════════════════════════════
             PRIORITY 2: Nav — hide center links
          ═══════════════════════════════════════════ */
          nav { height: 56px !important; padding: 0 16px !important; }
          /* Hide the absolutely-positioned center links container */
          nav > div[style*="translateX(-50%)"] { display: none !important; }
          .sitenav-links { display: none !important; }

          /* ═══════════════════════════════════════════
             PRIORITY 3: Financial title — allow wrap
          ═══════════════════════════════════════════ */
          .fin-title {
            white-space: normal !important;
            font-size: clamp(28px, 8vw, 60px) !important;
          }

          /* ═══════════════════════════════════════════
             PRIORITY 4: FortressNames — prevent overflow
          ═══════════════════════════════════════════ */
          .nr-wrap {
            overflow: hidden !important;
            max-width: 100% !important;
          }
          .nr-display {
            font-size: clamp(14px, 5vw, 32px) !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          /* ═══════════════════════════════════════════
             PRIORITY 5: Wallet scanner grid 3→2 col
          ═══════════════════════════════════════════ */
          .wallet-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .wallet-grid > div {
            padding: 10px 12px !important;
          }

          /* ═══════════════════════════════════════════
             PRIORITY 6: Trusted By — fix empty space
          ═══════════════════════════════════════════ */
          .trusted-sec { padding-top: 32px !important; padding-bottom: 32px !important; }
          .marquee-logo { height: 24px !important; }

          /* ═══════════════════════════════════════════
             GLOBAL: Section padding
          ═══════════════════════════════════════════ */
          .msec { padding: 60px 20px !important; }

          /* ═══════════════════════════════════════════
             HERO
          ═══════════════════════════════════════════ */
          .mhero {
            font-size: clamp(36px, 10vw, 72px) !important;
            white-space: normal !important;
          }
          .hero-content { padding: 0 20px !important; }
          .hero-content p { font-size: 14px !important; max-width: 90% !important; }
          .hero-ctas {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 320px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            gap: 12px !important;
          }
          .hero-ctas a {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
          .hero-badges {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            max-width: 320px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .hero-badges span {
            font-size: 8px !important;
            padding: 4px 8px !important;
            text-align: center !important;
            justify-content: center !important;
          }
          .liberty-bg { opacity: 0.05 !important; }

          /* ═══════════════════════════════════════════
             TWO-COLUMN GRIDS → SINGLE COLUMN
          ═══════════════════════════════════════════ */
          .mgrid2 {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          /* ═══════════════════════════════════════════
             FEATURE CHIPS (S1)
          ═══════════════════════════════════════════ */
          .s1chips {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }
          .s1chips > div { padding: 12px 14px !important; }

          /* ═══════════════════════════════════════════
             GHOST WORD
          ═══════════════════════════════════════════ */
          .ghost-word { display: none !important; }

          /* ═══════════════════════════════════════════
             COMPARISON TABLE
          ═══════════════════════════════════════════ */
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
          .cmp-shake { transform: none !important; }
          .ctab { display: block !important; overflow-x: auto !important; }

          /* ═══════════════════════════════════════════
             FINANCIAL OPPORTUNITY
          ═══════════════════════════════════════════ */
          .fin-num-lg { font-size: clamp(40px, 10vw, 110px) !important; }
          .fin-num-xl { font-size: clamp(44px, 11vw, 130px) !important; }
          .fin-cta { display: flex !important; justify-content: center !important; }
          .fin-cta a {
            width: 100% !important;
            max-width: 300px !important;
            text-align: center !important;
            justify-content: center !important;
          }
          [style*="shockwaveRing"] { width: 300px !important; height: 300px !important; }

          /* ═══════════════════════════════════════════
             TECHNOLOGY MOAT
          ═══════════════════════════════════════════ */
          .moat-rings, .moat-orbits, .moat-powerlines { display: none !important; }
          .moat-shield img { width: 70px !important; }
          .moat-shield { padding: 16px 0 !important; }
          .moat-card-area { max-width: 100% !important; padding: 0 4px !important; }
          .moat-row {
            flex-wrap: wrap !important;
            gap: 10px !important;
            justify-content: center !important;
          }
          .moat-row > * {
            flex: 1 1 calc(50% - 10px) !important;
            min-width: 140px !important;
            max-width: calc(50% - 5px) !important;
            box-sizing: border-box !important;
          }

          /* ═══════════════════════════════════════════
             REVENUE STREAM CARDS
          ═══════════════════════════════════════════ */
          .rev-cards {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          /* ═══════════════════════════════════════════
             CTA SECTION (Let's Build Together)
          ═══════════════════════════════════════════ */
          .cta-cards {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            max-width: 100% !important;
          }
          .cta-book-btn {
            width: 100% !important;
            max-width: 280px !important;
            text-align: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            display: flex !important;
          }
          .cta-contact-link {
            word-break: break-all !important;
            font-size: 12px !important;
          }

          /* ═══════════════════════════════════════════
             FOOTER
          ═══════════════════════════════════════════ */
          .footer-grid-texture { display: none !important; }
          footer [style*="gap: 88"],
          footer [style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 40px 20px 0 !important;
            text-align: center !important;
          }
          footer [style*="gap: 10"] { justify-content: center !important; }
          footer [style*="gap: 8"]  { justify-content: center !important; }
          footer [style*="gap: 14"] {
            flex-direction: column !important;
            align-items: center !important;
          }
          footer [style*="gap: 12"],
          footer [style*="gap: 20"] {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            justify-content: center !important;
            gap: 12px !important;
            padding: 16px 20px !important;
          }

          /* ═══════════════════════════════════════════
             TOUCH TARGETS & ACCESSIBILITY
          ═══════════════════════════════════════════ */
          nav a, nav button,
          .hero-ctas a, .cta-book-btn, footer a { min-height: 44px !important; }
          [style*="position: sticky"], [style*="position:sticky"] {
            position: -webkit-sticky !important;
            position: sticky !important;
          }

          /* ═══════════════════════════════════════════
             TYPOGRAPHY CAPS
          ═══════════════════════════════════════════ */
          .msec h2, section h2 { max-width: 100% !important; }
          .msec p, section p { max-width: 100% !important; }

          /* Scroll hint hidden on desktop (shown mobile above) */
          .cmp-scroll-hint { display: none; }
        }

        /* ── Extra breakpoint: very small (≤480px) ── */
        @media (max-width: 480px) {
          .s1chips { grid-template-columns: 1fr !important; }
          .moat-row {
            flex-direction: column !important;
            align-items: center !important;
          }
          .moat-row > * {
            flex: none !important;
            width: 100% !important;
            max-width: 400px !important;
          }
        }`;

// Remove block 1
src = src.slice(0, b1Start) + NEW_MOBILE_CSS + src.slice(b1End);
console.log("✅ Main mobile CSS block replaced");

// Remove block 2 if it exists
const b2StartNew = src.indexOf(BLOCK2_PATTERN);
if (b2StartNew !== -1) {
  const b2EndNew = src.indexOf("\n        }\n", b2StartNew) + "\n        }\n".length;
  src = src.slice(0, b2StartNew) + src.slice(b2EndNew);
  console.log("✅ Secondary mobile CSS block removed");
} else {
  console.log("ℹ️  Secondary block not found (may already be removed)");
}

fs.writeFileSync("src/App.jsx", src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ patch-mobile-fix complete");
