/**
 * patch-brush-fix.js
 * FIX 1: Add preserveAspectRatio="none" to all brush SVGs + fix CSS for full-width stretch
 * FIX 2: Correct brush colors per section — beige for most, red for CTA area
 */

const fs = require("fs");
const path = require("path");

// ── FIX 1A: Add preserveAspectRatio="none" to all brush SVG source files ──────
const IMG = path.join(__dirname, "public", "images");
const brushFiles = ["brush-navy.svg", "brush-beige.svg", "brush-red.svg", "brush-navy-2.svg", "brush-beige-2.svg"];

brushFiles.forEach(name => {
  const file = path.join(IMG, name);
  let svg = fs.readFileSync(file, "utf8");
  // Add preserveAspectRatio="none" to the root <svg> opening tag
  svg = svg.replace(
    /(<svg\b[^>]*)(>)/,
    (match, tag, close) => {
      if (tag.includes("preserveAspectRatio")) return match; // already there
      return tag + ' preserveAspectRatio="none"' + close;
    }
  );
  fs.writeFileSync(file, svg, "utf8");
  console.log("✓ preserveAspectRatio=none added →", name);
});

// ── FIX 1B: Fix CSS in App.jsx for full-width stretch ──────────────────────────
const APP = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(APP, "utf8").replace(/\r\n/g, "\n");

// Replace the section-brush CSS block with a robust full-width version
src = src.replace(
  /\.section-brush \{ width:100%; line-height:0; overflow:hidden; position:relative; z-index:10; \}\s*\.section-brush img \{ width:100%; height:60px; object-fit:fill; display:block; \}\s*@media\(max-width:768px\)\{ \.section-brush img \{ height:40px; \} \}/,
  `.section-brush { display:block; width:100%; line-height:0; overflow:hidden; font-size:0; }
        .section-brush img { display:block; width:100%; height:70px; max-width:100%; object-fit:fill; }
        @media(max-width:768px){ .section-brush img { height:44px; } }`
);
console.log("✓ .section-brush CSS → robust full-width version");

// ── FIX 1C: Update Stripe component — ensure img has explicit style ──────────
// Current: <img src={brush} alt="" role="presentation" />
// Fix: add explicit style to img tag to guarantee full-width
src = src.replace(
  `const Stripe = ({ brush = "/images/brush-navy.svg", flip }) => (
  <div className="section-brush" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <img src={brush} alt="" role="presentation" />
  </div>
);`,
  `const Stripe = ({ brush = "/images/brush-navy.svg", flip }) => (
  <div style={{ display:"block", width:"100%", lineHeight:0, overflow:"hidden", fontSize:0 }}>
    <img src={brush} alt="" role="presentation"
      style={{ display:"block", width:"100%", height:70, maxWidth:"100%", objectFit:"fill",
        transform: flip ? "scaleX(-1)" : "none" }}
    />
  </div>
);`
);
console.log("✓ Stripe component → inline styles guarantee full-width stretch");

// ── FIX 2: Correct brush colors per spec ──────────────────────────────────────
// Spec says: beige for most transitions, navy for Moat→Trusted, red for CTA area
// Current mapping (from patch5) vs required:

// Exposed→FortressNames: was brush-navy, should be brush-beige
src = src.replace(
  `<Stripe brush="/images/brush-navy.svg" flip />\n\n        {/* SOLUTION 1 */}`,
  `<Stripe brush="/images/brush-beige.svg" flip />\n\n        {/* SOLUTION 1 */}`
);
console.log("✓ Exposed→FortressNames: navy → beige");

// Confidentiality→Landscape: was brush-navy-2, should be brush-beige
src = src.replace(
  `<Stripe brush="/images/brush-navy-2.svg" flip />\n\n        {/* COMPETITIVE LANDSCAPE */}`,
  `<Stripe brush="/images/brush-beige.svg" flip />\n\n        {/* COMPETITIVE LANDSCAPE */}`
);
console.log("✓ Confidentiality→Landscape: navy-2 → beige");

// Comparison→Revenue: was brush-navy, should be brush-beige
src = src.replace(
  `<Stripe brush="/images/brush-navy.svg" flip />\n\n        {/* REVENUE SHARE */}`,
  `<Stripe brush="/images/brush-beige.svg" flip />\n\n        {/* REVENUE SHARE */}`
);
console.log("✓ Comparison→Revenue: navy → beige");

// Financial→Moat: was brush-navy-2, should be brush-beige
src = src.replace(
  `<Stripe brush="/images/brush-navy-2.svg" flip />\n\n        {/* MOAT */}`,
  `<Stripe brush="/images/brush-beige.svg" flip />\n\n        {/* MOAT */}`
);
console.log("✓ Financial→Moat: navy-2 → beige");

// CTA→Footer: was brush-navy, should be brush-red
src = src.replace(
  `<Stripe brush="/images/brush-navy.svg" />\n        <SiteFooter />`,
  `<Stripe brush="/images/brush-red.svg" />\n        <SiteFooter />`
);
console.log("✓ CTA→Footer: navy → red");

// Write
fs.writeFileSync(APP, src.replace(/\n/g, "\r\n"), "utf8");
console.log("\n✅ patch-brush-fix.js complete.");
