const fs = require("fs");
let src = fs.readFileSync("src/App.jsx", "utf8").replace(/\r\n/g, "\n");

// ── 1. Add missing classNames ────────────────────────────────────────────────

// Moat orbit dots wrapper
src = src.replace(
  `return (\n    <div style={{ position: "absolute", top: "50%", left: "50%", zIndex: 0, pointerEvents: "none" }}>\n      {or`,
  `return (\n    <div className="moat-orbits" style={{ position: "absolute", top: "50%", left: "50%", zIndex: 0, pointerEvents: "none" }}>\n      {or`
);

// Moat power lines wrapper
src = src.replace(
  `return (\n    <svg width="900" height="600" viewBox="0 0 900 600"\n      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-`,
  `return (\n    <svg className="moat-powerlines" width="900" height="600" viewBox="0 0 900 600"\n      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-`
);

// Moat rings wrapper (inside MoatRings return)
src = src.replace(
  `<div style={{ position: "absolute", top: "50%", left: "50%", zIndex: 0, pointerEvents: "none" }}>\n      {rings.map`,
  `<div className="moat-rings" style={{ position: "absolute", top: "50%", left: "50%", zIndex: 0, pointerEvents: "none" }}>\n      {rings.map`
);

// Marquee logos
src = src.replace(
  `<img key={rep} src="/logos.png" alt="partners" style={{ height: 36, width: "auto", flexShrink: 0, margin: "0 16px", opaci`,
  `<img key={rep} src="/logos.png" alt="partners" className="marquee-logo" style={{ height: 36, width: "auto", flexShrink: 0, margin: "0 16px", opaci`
);

// Moat shield wrapper
src = src.replace(
  `<div style={{ display: "flex", justifyContent: "center", padding: "36px 0", position: "relative", zIndex: 3 }}>\n            <AFShieldSVG/>`,
  `<div className="moat-shield" style={{ display: "flex", justifyContent: "center", padding: "36px 0", position: "relative", zIndex: 3 }}>\n            <AFShieldSVG/>`
);

// Moat card area
src = src.replace(
  `<div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>`,
  `<div className="moat-card-area" style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>`
);

// CTA section cards grid
src = src.replace(
  `<div className="mgrid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 800, margin: "0 auto" }}>`,
  `<div className="mgrid2 cta-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 800, margin: "0 auto" }}>`
);

// CTA Book a Call button
src = src.replace(
  `href="https://calendly.com/jakub_zurawinski/intro-call?month=2026-03" target="_blank" rel="noopener noreferrer"\n              onMouseEnter={() => setHovBtn(true)}`,
  `href="https://calendly.com/jakub_zurawinski/intro-call?month=2026-03" target="_blank" rel="noopener noreferrer"\n              className="cta-book-btn"\n              onMouseEnter={() => setHovBtn(true)}`
);

// CTA email link
src = src.replace(
  `<a href="mailto:jakub@americanfortress.io"\n                onMouseEnter={() => setHovMail(true)}`,
  `<a href="mailto:jakub@americanfortress.io" className="cta-contact-link"\n                onMouseEnter={() => setHovMail(true)}`
);

// Footer grid texture
src = src.replace(
  `{/* Grid texture */}\n      <div style={{\n        position: "absolute", inset: 0,\n        opacity: 0.035,`,
  `{/* Grid texture */}\n      <div className="footer-grid-texture" style={{\n        position: "absolute", inset: 0,\n        opacity: 0.035,`
);

// Comparison shake section
src = src.replace(
  `<section style={{ background:"#0F1D35", overflow:"hidden", transform:\`translate(\${shakeOffset.x}px,\${shakeOffset.y}px)\` }}>`,
  `<section className="cmp-shake" style={{ background:"#0F1D35", overflow:"hidden", transform:\`translate(\${shakeOffset.x}px,\${shakeOffset.y}px)\` }}>`
);

console.log("✅ ClassNames added");

// ── 2. Find end of existing mobile CSS and inject new rules ──────────────────
// Find the closing of the @media block — it ends with a specific pattern
const src_check = src;
// Look for the last occurrence of the mobile media block closing
const moatCssLine = `          .moat-row > * {\n            flex: 1 1 calc(50% - 10px) !important;\n            min-width: 140px !important;\n            max-width: calc(50% - 5px) !important;\n          }`;

if (!src.includes(moatCssLine)) {
  console.error("❌ Cannot find moat-row CSS end anchor");
  // Try finding the media block end another way
  const mediaIdx = src.lastIndexOf("@media (max-width: 768px)");
  const afterMedia = src.indexOf("}", src.indexOf("{", mediaIdx + 30)); // first closing brace of media
  console.log("Media block starts at:", mediaIdx);
  process.exit(1);
}

// Insert after .moat-row > * block
const INSERT_AFTER = `          .moat-row > * {\n            flex: 1 1 calc(50% - 10px) !important;\n            min-width: 140px !important;\n            max-width: calc(50% - 5px) !important;\n          }`;

const EXTRA_CSS = `

          /* ── §10 Moat: hide rings, orbits, power lines ── */
          .moat-rings, .moat-orbits, .moat-powerlines { display: none !important; }

          /* ── §10 Moat: shield smaller ── */
          .moat-shield img { width: 80px !important; }
          .moat-shield { padding: 20px 0 !important; }

          /* ── §10 Moat: card area full width ── */
          .moat-card-area { max-width: 100% !important; padding: 0 4px !important; }

          /* ── §10 Moat: each card max 400px centered ── */
          .moat-row > * {
            max-width: 400px !important;
            margin: 0 auto !important;
          }

          /* ── §10 Moat: 1-col on very small screens ── */
          @media (max-width: 480px) {
            .moat-row {
              flex-direction: column !important;
              align-items: center !important;
            }
            .moat-row > * {
              flex: none !important;
              width: 100% !important;
              max-width: 400px !important;
            }
          }

          /* ── §11 Trusted By: logo size ── */
          .marquee-logo { height: 24px !important; }

          /* ── §12 CTA section: stack cards ── */
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

          /* ── §13 Footer: single column, centered ── */
          footer > div:first-of-type + div {
            grid-template-columns: 1fr !important;
          }
          footer [style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 40px 20px 0 !important;
          }
          footer [style*="gap: 88"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 40px 20px 0 !important;
            text-align: center !important;
          }
          /* Center social icons and pills */
          footer [style*="gap: 10"] { justify-content: center !important; }
          footer [style*="gap: 8"]  { justify-content: center !important; }
          footer [style*="gap: 14"] { align-items: center !important; }

          /* Footer bottom bar: stack vertically */
          footer [style*="gap: 12"][style*="justifyContent"] {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 12px !important;
            padding: 16px 20px !important;
          }
          footer [style*="gap: 20"] {
            justify-content: center !important;
          }

          /* Footer grid texture hidden */
          .footer-grid-texture { display: none !important; }

          /* ── §15 Disable screen shake on mobile ── */
          .cmp-shake { transform: none !important; }

          /* ── §15 Sticky: webkit fallback ── */
          [style*="position: sticky"], [style*="position:sticky"] {
            position: -webkit-sticky !important;
            position: sticky !important;
          }

          /* ── §15 Touch targets min 44px ── */
          nav a, nav button { min-height: 44px !important; }
          .hero-ctas a, .cta-book-btn, footer a { min-height: 44px !important; }

          /* ── §14 Typography cap ── */
          .msec h2, section h2 { max-width: 100% !important; }
`;

src = src.replace(INSERT_AFTER, INSERT_AFTER + EXTRA_CSS);
console.log("✅ Extra mobile CSS (§10–15) injected");

fs.writeFileSync("src/App.jsx", src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ patch-mobile3 complete");
