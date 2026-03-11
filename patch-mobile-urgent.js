const fs = require("fs");
let src = fs.readFileSync("src/App.jsx", "utf8").replace(/\r\n/g, "\n");

// ── 1. Add className="nav-center" to the absolutely-positioned nav links div ──
src = src.replace(
  `      {/* Center: Nav links */}\n      <div ref={navLinksRef} style={{\n        position: "absolute", left: "50%", transform: "translateX(-50%)",\n        display: "flex", alignItems: "center", gap: 4,\n      }}>`,
  `      {/* Center: Nav links */}\n      <div ref={navLinksRef} className="nav-center" style={{\n        position: "absolute", left: "50%", transform: "translateX(-50%)",\n        display: "flex", alignItems: "center", gap: 4,\n      }}>`
);
console.log(src.includes('className="nav-center"') ? "✅ nav-center className added" : "⚠️  nav-center not added");

// ── 2. Add className="nr-row" to the hex→name flex row ──────────────────────
src = src.replace(
  `style={{ display:"flex", alignItems:"center", gap:24, marginBottom:20 }}>`,
  `className="nr-row" style={{ display:"flex", alignItems:"center", gap:24, marginBottom:20 }}>`
);

// Add className to arrow span
src = src.replace(
  `style={{ fontSize:20, color:"rgba(100,110,150,0.4)", flexShrink:0 }}>→</span>`,
  `className="nr-arrow" style={{ fontSize:20, color:"rgba(100,110,150,0.4)", flexShrink:0 }}>→</span>`
);

// Add className to hex address span
src = src.replace(
  `style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"clamp(11px,1.5vw,16px)", color:"rgba(160,165,185,0.5)", letterSpacing:"0.05em", maxWidth:280, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>`,
  `className="nr-hex" style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:"clamp(11px,1.5vw,16px)", color:"rgba(160,165,185,0.5)", letterSpacing:"0.05em", maxWidth:280, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>`
);

// ── 3. Add id to Trusted By section ─────────────────────────────────────────
src = src.replace(
  `<section ref={lR} style={{ ...full, background: "#0F1D35", overflow: "hidden" }}>`,
  `<section id="trusted" ref={lR} style={{ ...full, background: "#0F1D35", overflow: "hidden" }}>`
);

// ── 4. Add className to wallet address text ──────────────────────────────────
src = src.replace(
  `<div style={{ position: "relative", zIndex: 3, fontSize: "clamp(0.65rem,1.2vw,0.88rem)", color: addrColor, wordBreak: "break-all",`,
  `<div className="wallet-addr" style={{ position: "relative", zIndex: 3, fontSize: "clamp(0.65rem,1.2vw,0.88rem)", color: addrColor, wordBreak: "break-all",`
);

// ── 5. Add className to financial inner container ────────────────────────────
src = src.replace(
  `style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, position:"relative", zIndex:1 }}`,
  `className="fin-inner" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, position:"relative", zIndex:1 }}`
);

// ── 6. Add className to revenue section cards grid ───────────────────────────
// Find mgrid2 inside the revenue section (uses hovRev state)
src = src.replace(
  `<div className="mgrid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>\n              <div\n                onMouseEnter={() => setHovRev(0)}`,
  `<div className="mgrid2 rev-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>\n              <div\n                onMouseEnter={() => setHovRev(0)}`
);

console.log("✅ All classNames applied");

// ── 7. Replace the entire mobile CSS block with clean definitive version ──────
const MOBILE_START = `        @media (max-width: 768px) {\n\n          /* ═══════════════════════════════════════════\n             PRIORITY 1: Global overflow fix`;
const END_480 = `        @media (max-width: 480px) {`;
const mStart = src.indexOf(MOBILE_START);
const e480Start = src.indexOf(END_480, mStart);
const e480End = src.indexOf("\n        }", e480Start) + "\n        }".length;

if (mStart === -1) { console.error("❌ Mobile CSS start not found"); process.exit(1); }
if (e480Start === -1) { console.error("❌ 480px block not found"); process.exit(1); }

const NEW_MOBILE = `        @media (max-width: 768px) {

          /* 1 ── NAV ────────────────────────────────────────── */
          nav { height: 56px !important; padding: 0 16px !important; }
          .nav-center { display: none !important; }
          .sitenav-links { display: none !important; }

          /* 2 ── GLOBAL OVERFLOW ─────────────────────────────── */
          html, body { overflow-x: hidden !important; max-width: 100vw !important; }
          section { overflow-x: hidden !important; max-width: 100vw !important; box-sizing: border-box !important; }
          .noise { overflow-x: hidden !important; }
          .msec { padding: 60px 20px !important; max-width: 100vw !important; box-sizing: border-box !important; }
          .mgrid2 { grid-template-columns: 1fr !important; gap: 20px !important; }

          /* 3 ── WALLET SCANNER ──────────────────────────────── */
          .wallet-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .wallet-grid > div { padding: 10px 12px !important; }
          .wallet-addr { font-size: 10px !important; overflow: hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important; }

          /* 4 ── FORTRESSNAMES ───────────────────────────────── */
          .nr-wrap { overflow: hidden !important; max-width: 100% !important; }
          .nr-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .nr-hex { font-size: 12px !important; max-width: 100% !important; overflow: hidden !important; text-overflow: ellipsis !important; }
          .nr-arrow { transform: rotate(90deg) !important; display: block !important; }
          .nr-display { font-size: clamp(22px, 8vw, 44px) !important; }
          .s1chips { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .s1chips > div { padding: 12px 14px !important; }
          .liberty-bg { opacity: 0.05 !important; }

          /* 5 ── FINANCIAL OPPORTUNITY ───────────────────────── */
          .fin-title { white-space: normal !important; font-size: clamp(28px, 8vw, 60px) !important; word-break: break-word !important; }
          .fin-num-lg { font-size: clamp(36px, 12vw, 110px) !important; }
          .fin-num-xl { font-size: clamp(40px, 14vw, 130px) !important; }
          .fin-inner { padding: 0 16px !important; box-sizing: border-box !important; overflow: hidden !important; }
          .fin-cta { display: flex !important; justify-content: center !important; }
          .fin-cta a { width: 100% !important; max-width: 300px !important; text-align: center !important; justify-content: center !important; }
          .cmp-shake { transform: none !important; }

          /* 6 ── TRUSTED BY ──────────────────────────────────── */
          #trusted { min-height: auto !important; }
          #trusted > .msec { padding: 40px 20px !important; }
          .marquee-logo { height: 20px !important; }

          /* 7 ── CONFIDENTIALITY ─────────────────────────────── */
          .ghost-word { display: none !important; }

          /* 8 ── TECHNOLOGY MOAT ─────────────────────────────── */
          .moat-rings, .moat-orbits, .moat-powerlines { display: none !important; }
          .moat-shield img { width: 70px !important; }
          .moat-shield { padding: 16px 0 !important; }
          .moat-card-area { max-width: 100% !important; overflow: hidden !important; }
          .moat-row { flex-direction: column !important; align-items: center !important; gap: 12px !important; }
          .moat-row > * { width: 100% !important; max-width: 400px !important; flex: none !important; box-sizing: border-box !important; }

          /* ── HERO ──────────────────────────────────────────── */
          .mhero { font-size: clamp(36px, 10vw, 72px) !important; white-space: normal !important; }
          .hero-content { padding: 0 20px !important; }
          .hero-content p { font-size: 14px !important; max-width: 90% !important; }
          .hero-ctas { flex-direction: column !important; width: 100% !important; max-width: 320px !important; margin: 0 auto !important; gap: 12px !important; }
          .hero-ctas a { width: 100% !important; text-align: center !important; justify-content: center !important; box-sizing: border-box !important; }
          .hero-badges { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 8px !important; max-width: 320px !important; margin: 0 auto !important; }
          .hero-badges span { font-size: 8px !important; padding: 4px 8px !important; text-align: center !important; justify-content: center !important; }

          /* ── COMPARISON ────────────────────────────────────── */
          .cmp-wrap { padding: 40px 20px !important; }
          .cmp-table { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }
          .cmp-table > div { min-width: 700px !important; }
          .cmp-scroll-hint { display: flex !important; justify-content: center !important; margin-bottom: 8px !important; }
          .cmp-footer { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .cmp-footer a, .cmp-footer button { width: 100% !important; max-width: 300px !important; text-align: center !important; justify-content: center !important; box-sizing: border-box !important; }
          .ctab { display: block !important; overflow-x: auto !important; }

          /* ── REVENUE CARDS ─────────────────────────────────── */
          .rev-cards { grid-template-columns: 1fr !important; gap: 16px !important; }

          /* ── CTA SECTION ───────────────────────────────────── */
          .cta-cards { grid-template-columns: 1fr !important; gap: 16px !important; max-width: 100% !important; }
          .cta-book-btn { width: 100% !important; max-width: 280px !important; text-align: center !important; justify-content: center !important; box-sizing: border-box !important; margin: 0 auto !important; display: flex !important; }
          .cta-contact-link { word-break: break-all !important; font-size: 12px !important; }

          /* ── FOOTER ────────────────────────────────────────── */
          .footer-grid-texture { display: none !important; }
          footer [style*="gap: 88"], footer [style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; gap: 32px !important; padding: 40px 20px 0 !important; text-align: center !important; }
          footer [style*="gap: 10"] { justify-content: center !important; }
          footer [style*="gap: 8"]  { justify-content: center !important; }
          footer [style*="gap: 14"] { flex-direction: column !important; align-items: center !important; }
          footer [style*="gap: 12"], footer [style*="gap: 20"] { flex-direction: column !important; align-items: center !important; text-align: center !important; justify-content: center !important; gap: 12px !important; padding: 16px 20px !important; }

          /* ── TOUCH / A11Y ──────────────────────────────────── */
          nav a, nav button, .hero-ctas a, .cta-book-btn, footer a { min-height: 44px !important; }
          [style*="position: sticky"] { position: -webkit-sticky !important; position: sticky !important; }
          .msec h2, section h2 { max-width: 100% !important; }
          .cmp-scroll-hint { display: none; }
        }

        @media (max-width: 480px) {
          .s1chips { grid-template-columns: 1fr !important; }
        }`;

src = src.slice(0, mStart) + NEW_MOBILE + src.slice(e480End);
console.log("✅ Mobile CSS fully replaced");

// ── 8. Inject html/body overflow fix into index.html ─────────────────────────
let html = fs.readFileSync("index.html", "utf8");
if (!html.includes("overflow-x: hidden")) {
  html = html.replace("</head>", `  <style>html,body{overflow-x:hidden;max-width:100vw}</style>\n  </head>`);
  fs.writeFileSync("index.html", html, "utf8");
  console.log("✅ index.html: overflow fix added");
}

fs.writeFileSync("src/App.jsx", src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ Done");
