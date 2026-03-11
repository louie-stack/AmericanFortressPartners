const fs = require("fs");
let src = fs.readFileSync("src/App.jsx", "utf8").replace(/\r\n/g, "\n");

// ── 1. Add classNames to key elements ────────────────────────────────────────

// Hero CTA row
src = src.replace(
  `<div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>`,
  `<div className="hero-ctas" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>`
);

// Hero badges row
src = src.replace(
  `<div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>`,
  `<div className="hero-badges" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>`
);

// Wallet scanner data grid (inside WalletScanner component)
src = src.replace(
  `style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:12 }}`,
  `className="wallet-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:12 }}`
);

// Name resolver font size - add className
src = src.replace(
  `style={{ fontSize:"clamp(22px,4vw,52px)", fontFamily:"'IBM Plex Mono',monospace",`,
  `className="nr-display" style={{ fontSize:"clamp(22px,4vw,52px)", fontFamily:"'IBM Plex Mono',monospace",`
);

// Feature chips grid - already has s1chips class

// Liberty background image - add className
src = src.replace(
  `style={{ position:"absolute", top:0, right:0, bottom:0, width:"55%", zIndex:0, backgroundImage:\`url(\${LIBERTY_SRC})\``,
  `className="liberty-bg" style={{ position:"absolute", top:0, right:0, bottom:0, width:"55%", zIndex:0, backgroundImage:\`url(\${LIBERTY_SRC})\``
);

// Confidentiality ghost word - add className for hiding on mobile
src = src.replace(
  `style={{ position: "absolute", bottom: "-2vw", left: "-1vw", fontSize: "17vw", fontFamily: "'Bebas Neue'",`,
  `className="ghost-word" style={{ position: "absolute", bottom: "-2vw", left: "-1vw", fontSize: "17vw", fontFamily: "'Bebas Neue'",`
);

// Moat section inner grid - add className
src = src.replace(
  `style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20, position:"relative", zIndex:1 }}`,
  `className="moat-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20, position:"relative", zIndex:1 }}`
);

// Financial section numbers area - look for the numbers wrapper
src = src.replace(
  `style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, position:"relative", zIndex:1 }}`,
  `className="financial-numbers" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, position:"relative", zIndex:1 }}`
);

// Comparison section inner - find the table wrapper
src = src.replace(
  `style={{ overflowX: "auto", borderRadius: 12 }}>`,
  `className="comparison-scroll" style={{ overflowX: "auto", borderRadius: 12 }}>`
);

console.log("✅ ClassNames added");

// ── 2. Inject comprehensive mobile CSS ────────────────────────────────────────
// Find the global style block (inside FinancialSection or main AF function)
// Inject into the existing style block that has @keyframes heroLineUp

const STYLE_ANCHOR = `@keyframes logoGlow {`;

const MOBILE_CSS = `/* ── Mobile (≤768px) ─────────────────────────────── */
        @media (max-width: 768px) {

          /* ── Nav ── */
          .sitenav-links { display: none !important; }
          nav[style] { height: 56px !important; padding: 0 16px !important; }
          nav .sitenav-links { display: none !important; }

          /* ── Hero ── */
          .mhero { font-size: clamp(36px, 10vw, 80px) !important; white-space: normal !important; }
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

          /* ── Global section padding ── */
          .msec { padding: 60px 20px 60px !important; }

          /* ── Two-column → single column ── */
          .mgrid2 {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          /* ── Wallet scanner ── */
          .wallet-grid { grid-template-columns: 1fr 1fr !important; }
          .wallet-grid > div { padding: 10px 12px !important; }
          .wallet-grid [style*="font-size:\"8px\""],
          .wallet-grid [style*="fontSize"] { font-size: 8px !important; }

          /* ── Liberty background (S1) ── */
          .liberty-bg { opacity: 0.05 !important; width: 100% !important; }

          /* ── Name resolver display ── */
          .nr-display { font-size: clamp(16px, 6vw, 36px) !important; }

          /* ── Feature chips (S1) ── */
          .s1chips {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }
          .s1chips > div { padding: 12px 14px !important; }

          /* ── Below 400px: chips 1 col ── */
          @media (max-width: 400px) {
            .s1chips { grid-template-columns: 1fr !important; }
          }

          /* ── Ghost word (Confidentiality) ── */
          .ghost-word { display: none !important; }

          /* ── Moat section ── */
          .moat-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }

          /* ── Financial numbers ── */
          .financial-numbers { padding: 0 20px !important; }

          /* ── Comparison table ── */
          .comparison-scroll { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }

          /* ── Footer ── */
          footer > div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 40px 20px 0 !important;
          }
          footer > div[style*="justify-content"] {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
            padding: 20px 20px !important;
          }

          /* ── CTA section cards ── */
          .mgrid2[style*="1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }

          /* ── No horizontal overflow anywhere ── */
          section, .msec, .mgrid2 {
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }
        }
        `;

if (!src.includes("@media (max-width: 768px)") || src.indexOf("@media (max-width: 768px)") === src.lastIndexOf("@media (max-width: 768px)")) {
  src = src.replace(STYLE_ANCHOR, MOBILE_CSS + STYLE_ANCHOR);
  console.log("✅ Mobile CSS block injected");
} else {
  // Already has mobile CSS from nav - inject before the existing one
  src = src.replace(STYLE_ANCHOR, MOBILE_CSS + STYLE_ANCHOR);
  console.log("✅ Mobile CSS block injected before logoGlow");
}

fs.writeFileSync("src/App.jsx", src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ Mobile patch complete");
