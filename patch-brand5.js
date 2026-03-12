/**
 * patch-brand5.js — American Fortress Master Visual Reskin
 * Implements all 9 prompts from the master document.
 * Run:  node patch-brand5.js
 */

const fs = require("fs");
const path = require("path");

// ─── Helpers ──────────────────────────────────────────────────────────────────
const r = (src, from, to, label) => {
  if (!src.includes(from)) {
    console.log(`  (skip) ${label || from.slice(0,60).replace(/\n/g,"↵")}`);
    return src;
  }
  const n = src.split(from).length - 1;
  console.log(`✓ (×${n}) ${label || from.slice(0,60).replace(/\n/g,"↵")}`);
  return src.split(from).join(to);
};

// ─── Step 1: Create colored brushstroke SVG copies in /public/images/ ─────────
const IMG_DIR = path.join(__dirname, "public", "images");
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

const SVG1 = fs.readFileSync(path.join(__dirname, "public", "brand-assets", "brush-divider-dark.svg"), "utf8");
const SVG2 = fs.readFileSync(path.join(__dirname, "public", "brand-assets", "brush-divider-mid.svg"), "utf8");
const DOT_PATTERN = fs.readFileSync(path.join(__dirname, "public", "brand-assets", "af-illustration.svg"), "utf8");

// Fix: replace any hardcoded fill in SVGs then set our color
const setFill = (svgContent, color) => {
  // Replace all fill="..." with fill="<color>" except fill="none"
  return svgContent.replace(/fill="(?!none)[^"]*"/g, `fill="${color}"`);
};

fs.writeFileSync(path.join(IMG_DIR, "brush-navy.svg"),    setFill(SVG1, "#182145"));
fs.writeFileSync(path.join(IMG_DIR, "brush-beige.svg"),   setFill(SVG1, "#F0E0B2"));
fs.writeFileSync(path.join(IMG_DIR, "brush-red.svg"),     setFill(SVG1, "#DD1E21"));
fs.writeFileSync(path.join(IMG_DIR, "brush-navy-2.svg"),  setFill(SVG2, "#182145"));
fs.writeFileSync(path.join(IMG_DIR, "brush-beige-2.svg"), setFill(SVG2, "#F0E0B2"));
fs.writeFileSync(path.join(IMG_DIR, "dot-pattern.svg"),   DOT_PATTERN);
console.log("✓ Brushstroke SVG variants created in /public/images/");

// ─── Step 2: index.html — font system ─────────────────────────────────────────
const HTML = path.join(__dirname, "index.html");
let html = fs.readFileSync(HTML, "utf8").replace(/\r\n/g, "\n");

// Remove ALL old font links (Oswald, Archivo Black, JetBrains Mono, etc)
html = html.replace(/<link[^>]*googleapis\.com\/css2[^>]*Oswald[^>]*>/g, "");
html = html.replace(/<link[^>]*googleapis\.com\/css2[^>]*Archivo[^>]*>/g, "");

// Ensure only Space Grotesk Google Font + preconnects remain
if (!html.includes("Space+Grotesk")) {
  html = html.replace(
    "</head>",
    `  <link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">\n</head>`
  );
}
console.log("✓ index.html — fonts updated (only Space Grotesk)");
fs.writeFileSync(HTML, html.replace(/\n/g, "\r\n"), "utf8");

// ─── Step 3: App.jsx — comprehensive patches ──────────────────────────────────
const APP = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(APP, "utf8").replace(/\r\n/g, "\n");

// ── 3A: @font-face for Monument Extended OTF + CSS overhaul ─────────────────
// Inject @font-face at top of <style> block + update :root
src = r(src,
  `<style>{\`
        
        :root {`,
  `<style>{\`
        @font-face {
          font-family: 'Monument Extended';
          src: url('/fonts/MonumentExtended-Regular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Monument Extended';
          src: url('/fonts/MonumentExtended-Ultrabold.otf') format('opentype');
          font-weight: 800;
          font-style: normal;
          font-display: swap;
        }
        
        :root {`,
  "@font-face Monument Extended injected"
);

// Update --font-heading to remove fallback
src = r(src,
  `--font-heading: 'Monument Extended', 'Oswald', sans-serif;`,
  `--font-heading: 'Monument Extended', sans-serif;`,
  "--font-heading → no Oswald fallback"
);

// Remove Oswald from font-family in any remaining inline styles
src = r(src, `'Oswald', sans-serif`, `'Monument Extended', sans-serif`, "inline Oswald → Monument Extended");
src = r(src, `'Oswald'`, `'Monument Extended'`, "standalone Oswald refs");

// ── 3B: Dot-pattern CSS (add to style block) ──────────────────────────────────
src = r(src,
  `        .dot-pattern { position:absolute; width:200px; height:200px; background: radial-gradient(circle, #DD1E21 2px, transparent 2px), radial-gradient(circle, #103F6E 2px, transparent 2px); background-size:16px 16px; background-position:0 0, 8px 8px; opacity:0.12; pointer-events:none; }
        .dot-pattern--tr { top:32px; right:32px; }
        .dot-pattern--bl { bottom:32px; left:32px; }`,
  `        .dot-pattern { position:absolute; width:400px; height:534px; background:url('/images/dot-pattern.svg') no-repeat center; background-size:contain; pointer-events:none; z-index:1; opacity:0.6; }
        @media(max-width:768px){ .dot-pattern { width:250px; height:334px; } }`,
  "dot-pattern CSS → real SVG asset"
);

// ── 3C: Brushstroke section divider CSS ───────────────────────────────────────
// Add after dot-pattern CSS, before the .section-badge rules
src = r(src,
  `        .section-badge {`,
  `        .section-brush { width:100%; line-height:0; overflow:hidden; position:relative; z-index:10; }
        .section-brush img { width:100%; height:60px; object-fit:fill; display:block; }
        @media(max-width:768px){ .section-brush img { height:40px; } }
        .section-badge {`,
  "section-brush CSS added"
);

// ── 3D: Typography scale — body/heading selectors ────────────────────────────
// Add typography rules before closing </style>
// Find the TODO comment near end of style block
src = r(src,
  `/* TODO: swap 'Oswald' for Monument Extended .woff2 once files are available — Oswald used as wider fallback */`,
  `/* TODO: swap @font-face URLs to .woff2 once converted from .otf for better loading performance */
        h1, h2 { font-family: var(--font-heading); font-weight: 800; text-transform: uppercase; }
        h3 { font-family: var(--font-heading); font-weight: 400; }
        body, p, li, td { font-family: var(--font-body); }
        .hero h1, .hero-title { font-weight: 800; font-size: clamp(2.5rem,6vw,4.5rem); line-height: 1.0; letter-spacing: 1px; color: #F0E0B2; }
        button, .btn, [class*="btn"] { font-family: var(--font-heading); font-weight: 400; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; border-radius: 4px; }`,
  "typography scale CSS added"
);

// ── 3E: Navbar — logo glow color, scroll progress bar ────────────────────────
src = r(src,
  `background: "linear-gradient(to right, rgba(221,30,33,0.9), rgba(200,50,50,0.7))"`,
  `background: "linear-gradient(to right, #DD1E21, #E6412A)"`,
  "navbar progress bar → brand red gradient"
);

// ── 3F: Replace Stripe component with brushstroke renderer ───────────────────
// New Stripe: takes a `brush` prop with SVG path, renders a full-width brushstroke
src = r(src,
  `const Stripe = ({ flip }) => (
  <div style={{ width: "100%", height: 3, background: \`linear-gradient(\${flip ? 270 : 90}deg, transparent, rgba(201,168,76,0.3) 20%, rgba(212,43,43,0.5) 50%, rgba(201,168,76,0.3) 80%, transparent)\` }} />
);`,
  `const Stripe = ({ brush = "/images/brush-navy.svg", flip }) => (
  <div className="section-brush" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <img src={brush} alt="" role="presentation" />
  </div>
);`,
  "Stripe component → brushstroke renderer"
);

// ── 3G: Replace each Stripe instance with correct colored brushstroke ─────────
// Using surrounding context to uniquely identify each occurrence

// 1. Hero(dark) → Exposed(beige): beige brush
src = r(src,
  `        </section>

        <Stripe />


        <section id="exposed"`,
  `        </section>

        <Stripe brush="/images/brush-beige.svg" />

        <section id="exposed"`,
  "Stripe[1]: Hero→Exposed → beige"
);

// 2. Exposed(beige) → FortressNames(dark): navy brush
src = r(src,
  `        </section>

        <Stripe flip />

        {/* SOLUTION 1 */}`,
  `        </section>

        <Stripe brush="/images/brush-navy.svg" flip />

        {/* SOLUTION 1 */}`,
  "Stripe[2]: Exposed→FortressNames → navy"
);

// 3. FortressNames(dark) → Confidentiality(beige): beige-2 brush
src = r(src,
  `        </section>

        <Stripe />

        {/* SOLUTION 2 */}`,
  `        </section>

        <Stripe brush="/images/brush-beige-2.svg" />

        {/* SOLUTION 2 */}`,
  "Stripe[3]: FortressNames→Confidentiality → beige-2"
);

// 4. Confidentiality(beige) → Landscape(dark): navy-2 brush
src = r(src,
  `        </section>

        <Stripe flip />


        {/* COMPETITIVE LANDSCAPE */}`,
  `        </section>

        <Stripe brush="/images/brush-navy-2.svg" flip />

        {/* COMPETITIVE LANDSCAPE */}`,
  "Stripe[4]: Confidentiality→Landscape → navy-2"
);

// 5. Landscape(dark) → Comparison(beige): beige brush
src = r(src,
  `        </section>

        <Stripe />

        {/* COMPARISON TABLE */}`,
  `        </section>

        <Stripe brush="/images/brush-beige.svg" />

        {/* COMPARISON TABLE */}`,
  "Stripe[5]: Landscape→Comparison → beige"
);

// 6. Comparison(beige) → Revenue(dark): navy brush
src = r(src,
  `        <Stripe flip />

        {/* REVENUE SHARE */}`,
  `        <Stripe brush="/images/brush-navy.svg" flip />

        {/* REVENUE SHARE */}`,
  "Stripe[6]: Comparison→Revenue → navy"
);

// 7. Revenue(dark) → Financial(beige): beige-2 brush
src = r(src,
  `        </section>

        <Stripe />

        {/* FINANCIAL */}`,
  `        </section>

        <Stripe brush="/images/brush-beige-2.svg" />

        {/* FINANCIAL */}`,
  "Stripe[7]: Revenue→Financial → beige-2"
);

// 8. Financial(beige) → Moat(dark): navy-2 brush
src = r(src,
  `        <Stripe flip />

        {/* MOAT */}`,
  `        <Stripe brush="/images/brush-navy-2.svg" flip />

        {/* MOAT */}`,
  "Stripe[8]: Financial→Moat → navy-2"
);

// 9. Moat(dark) → Trusted(dark): navy brush (both dark)
src = r(src,
  `        </section>

        <Stripe />

        {/* TRUSTED BY */}`,
  `        </section>

        <Stripe brush="/images/brush-navy.svg" />

        {/* TRUSTED BY */}`,
  "Stripe[9]: Moat→Trusted → navy"
);

// 10. Trusted(dark) → CTA(red): red brush
src = r(src,
  `        </section>

        <Stripe flip />

        <div id="contact">`,
  `        </section>

        <Stripe brush="/images/brush-red.svg" flip />

        <div id="contact">`,
  "Stripe[10]: Trusted→CTA → red"
);

// 11. CTA(red) → Footer: navy brush
src = r(src,
  `        <Stripe />
        <SiteFooter />`,
  `        <Stripe brush="/images/brush-navy.svg" />
        <SiteFooter />`,
  "Stripe[11]: CTA→Footer → navy"
);

// ── 3H: Dot pattern placement in specific sections ────────────────────────────

// FortressNames section: add dot-pattern as first child after opening div
src = r(src,
  `<div className="msec" style={{ maxWidth:900, marginLeft:"6vw", marginRight:"auto", padding:"120px 0 120px", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", zIndex:1 }}>`,
  `<div className="dot-pattern" style={{ right:"-80px", top:"40px", transform:"rotate(-15deg)", opacity:0.5 }} />
          <div className="msec" style={{ maxWidth:900, marginLeft:"6vw", marginRight:"auto", padding:"120px 0 120px", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", zIndex:1 }}>`,
  "dot-pattern added to FortressNames"
);

// Revenue section: add dot-pattern
src = r(src,
  `<section id="revenue" ref={rR2} style={full}>
          <div className="mgrid2 rev-cards"`,
  `<section id="revenue" ref={rR2} style={{ ...full, position:"relative", overflow:"hidden" }}>
          <div className="dot-pattern" style={{ right:"-100px", bottom:"-60px", opacity:0.4 }} />
          <div className="mgrid2 rev-cards"`,
  "dot-pattern added to Revenue section"
);

// ── 3I: Per-section polish ────────────────────────────────────────────────────

// Hero: credential pill dots → red (#DD1E21 instead of gold)
src = r(src,
  `<span style={{ width:5, height:5, borderRadius:"50%", background:"rgba(200,170,100,0.6)", flexShrink:0, display:"inline-block" }} />{b}`,
  `<span style={{ width:5, height:5, borderRadius:"50%", background:"#DD1E21", flexShrink:0, display:"inline-block" }} />{b}`,
  "hero pill dots → #DD1E21"
);

// Hero: credential pill border → warm beige
src = r(src,
  `border: "1px solid rgba(201,168,76,0.15)", color: "rgba(122,133,153,0.8)", background: "rgba(4,11,24,0.5)",
                  backdropFilter: "blur(8px)", cursor: "default",`,
  `border: "1px solid rgba(240,224,178,0.12)", color: "rgba(240,224,178,0.6)", background: "rgba(18,33,69,0.5)",
                  cursor: "default",`,
  "hero credential pills → warm beige style"
);

// NameResolver: gold name accent stays (already correct)
// FortressNames: Ghost text opacity on light bg 
src = r(src,
  `className="ghost-word" className="ghost-word"`,
  `className="ghost-word"`,
  "remove duplicate ghost-word className"
);

// Comparison footer CTA: ensure .btn-red class
// Financial: shockwave rings
src = r(src,
  `borderColor: "rgba(221,30,33,`,
  `borderColor: "rgba(221,30,33,`,
  "(no-op) moat ring color already red"
);

// Footer: ensure top border uses warm beige
src = r(src,
  `borderTop: "1px solid rgba(201,168,76,0.15)"`,
  `borderTop: "1px solid rgba(240,224,178,0.12)"`,
  "footer top border → warm beige"
);

// ── 3J: Remove ghost border bottom on exposed cards (now using card-on-light CSS) ─
// The exposed cards should have overflow:hidden on section already

// ── 3K: Navbar logo glow → red ───────────────────────────────────────────────
src = r(src,
  `"0 0 30px rgba(201,168,76,0.7), 0 0 60px rgba(201,168,76,0.3)"`,
  `"0 0 30px rgba(221,30,33,0.5), 0 0 60px rgba(221,30,33,0.2)"`,
  "navbar logo glow → red"
);

// Write
fs.writeFileSync(APP, src.replace(/\n/g, "\r\n"), "utf8");
console.log("\n✅ patch-brand5.js complete.");
