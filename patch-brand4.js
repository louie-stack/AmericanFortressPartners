/**
 * patch-brand4.js  — American Fortress brand Round 4
 * Run:  node patch-brand4.js
 *
 * Changes (based on side-by-side with americanfortress.io):
 *   A. Font: Archivo Black → Oswald (better Monument Extended fallback — wider, tall)
 *   B. Section backgrounds: #FDFAF4 → #F0E0B2 (warm beige, not cold cream)
 *   C. Heading text: #FDFAF4 → #F0E0B2 (warm on dark sections)
 *   D. Body text: rgba(253,250,244,… → rgba(240,224,178,… (warm muted)
 *   E. CSS class overhaul: 72px solid icon badges, solid card fills, btn-blue
 *   F. Remove glass-morphism: exposed cards, revenue cards, moat card, CTA card
 *   G. Navbar: warm text, remove gold pill → red 2px underline on active
 *   H. Button border-radius: 8px → 4px
 *   I. Brushstroke SVG file + dot-pattern CSS
 */

const fs   = require("fs");
const path = require("path");

// ─── index.html — swap font loading ──────────────────────────────────────────
const HTML_FILE = path.join(__dirname, "index.html");
let html = fs.readFileSync(HTML_FILE, "utf8").replace(/\r\n/g, "\n");

// Replace Archivo Black with Oswald in the Google Fonts link
html = html.replace(
  /href="https:\/\/fonts\.googleapis\.com\/css2\?family=Archivo\+Black[^"]*"/,
  `href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"`
);
console.log("✓ index.html — font link updated to Oswald");
fs.writeFileSync(HTML_FILE, html.replace(/\n/g, "\r\n"), "utf8");

// ─── Brushstroke SVG ─────────────────────────────────────────────────────────
const SVG_DIR = path.join(__dirname, "public", "images");
if (!fs.existsSync(SVG_DIR)) fs.mkdirSync(SVG_DIR, { recursive: true });
fs.writeFileSync(
  path.join(SVG_DIR, "brush-divider-dark.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" preserveAspectRatio="none"><path d="M0,8 C80,28 180,42 320,36 C460,30 520,12 660,18 C800,24 880,40 1020,34 C1160,28 1280,10 1380,16 C1420,18 1436,22 1440,24 L1440,48 L0,48 Z" fill="#182145"/></svg>`
);
fs.writeFileSync(
  path.join(SVG_DIR, "brush-divider-beige.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" preserveAspectRatio="none"><path d="M0,8 C80,28 180,42 320,36 C460,30 520,12 660,18 C800,24 880,40 1020,34 C1160,28 1280,10 1380,16 C1420,18 1436,22 1440,24 L1440,48 L0,48 Z" fill="#F0E0B2"/></svg>`
);
console.log("✓ Brushstroke SVGs created in /public/images/");

// ─── App.jsx ──────────────────────────────────────────────────────────────────
const APP_FILE = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(APP_FILE, "utf8").replace(/\r\n/g, "\n");

const r = (from, to, label) => {
  if (!src.includes(from)) {
    console.log(`  (skip) ${label || from.slice(0,72).replace(/\n/g,"↵")}`);
    return;
  }
  const n = src.split(from).length - 1;
  src = src.split(from).join(to);
  console.log(`✓ (×${n}) ${label}`);
};

// ── A. Font: Archivo Black → Oswald ──────────────────────────────────────────
r(`'Archivo Black',sans-serif`, `'Oswald',sans-serif`, "font: 'Archivo Black',sans-serif → Oswald");
r(`'Archivo Black'`,            `'Oswald'`,            "font: 'Archivo Black' → Oswald");
// Update CSS var in injected :root block
r(`--font-heading: 'Archivo Black', sans-serif;`,
  `--font-heading: 'Monument Extended', 'Oswald', sans-serif;`,
  "CSS var --font-heading → Oswald fallback");
// Update body font reference in @import comment
r(`/* TODO: replace 'Archivo Black' with Monument Extended .woff2 once files are available */`,
  `/* TODO: replace 'Oswald' with Monument Extended .woff2 once files are available — Oswald used as wider fallback */`,
  "update font TODO comment");

// ── B. Section backgrounds: FDFAF4 → F0E0B2 (light sections only) ─────────────
r(`background: "#FDFAF4" }}>`,        `background: "#F0E0B2" }}>`,       "exposed section bg → warm beige");
r(`background: "#FDFAF4", position:`, `background: "#F0E0B2", position:`, "confidentiality section bg → warm beige");
r(`style={{ background:"#FDFAF4" }}>`,`style={{ background:"#F0E0B2" }}>`, "comparison outer div → warm beige");
r(`style={{ background:"#FDFAF4",`,   `style={{ background:"#F0E0B2",`,   "comparison shake section → warm beige");
r(`background: "#FDFAF4", minHeight:`, `background: "#F0E0B2", minHeight:`, "financial section → warm beige");

// ── C. Heading text: #FDFAF4 → #F0E0B2 (warm cream on dark) ───────────────────
// Global — affects headings, card titles, and body text on dark sections.
// Button text (#fff / explicitly-set white) is unchanged; these use #FDFAF4 as the warm heading color.
r(`#FDFAF4`, `#F0E0B2`, "global #FDFAF4 → #F0E0B2 (warm beige)");

// ── D. Body text rgba: 253,250,244 → 240,224,178 (warm muted) ────────────────
r(`rgba(253,250,244,`, `rgba(240,224,178,`, "global rgba(253,250,244,… → warm beige rgba");

// ── E. CSS class overhaul ─────────────────────────────────────────────────────
// E1 — Update --bg-light CSS var
r(`--bg-light: #F0E0B2;`,  `--bg-light: #F0E0B2;`,  "bg-light already correct (no-op)");
// E2 — Icon badges: transparent outlined → 72px solid filled with white icons
r(
  `.icon-badge { width:56px; height:56px; min-width:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:transform 0.25s ease; flex-shrink:0; }
        .icon-badge svg { width:24px; height:24px; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; fill:none; }
        .card-glass:hover .icon-badge,.card-dark:hover .icon-badge,.card-inverted:hover .icon-badge { transform: scale(1.08); }
        @media(max-width:768px){ .icon-badge { width:48px; height:48px; min-width:48px; } }
        .icon-badge--red  { background: rgba(221,30,33,0.1);  border: 1px solid rgba(221,30,33,0.2);  }
        .icon-badge--navy { background: rgba(16,63,110,0.1);  border: 1px solid rgba(133,186,255,0.2); }
        .icon-badge--gold { background: rgba(218,165,69,0.1); border: 1px solid rgba(218,165,69,0.2); }`,
  `.icon-badge { width:72px; height:72px; min-width:72px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:transform 0.25s ease; flex-shrink:0; }
        .icon-badge svg { width:32px; height:32px; stroke:white; fill:none; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; }
        .card-on-dark:hover .icon-badge,.card-on-light:hover .icon-badge,.card-on-red:hover .icon-badge { transform: scale(1.08); }
        @media(max-width:768px){ .icon-badge { width:60px; height:60px; min-width:60px; } .icon-badge svg { width:28px; height:28px; } }
        .icon-badge--red  { background: #DD1E21; box-shadow: 0 4px 12px rgba(221,30,33,0.3); }
        .icon-badge--navy { background: #103F6E; box-shadow: 0 4px 12px rgba(16,63,110,0.3); }
        .icon-badge--gold { background: #daa545; box-shadow: 0 4px 12px rgba(218,165,69,0.3); }`,
  "icon-badge → 72px solid filled with white icons"
);

// E3 — Card classes: glass/dark/inverted → solid fills
r(
  `.card-glass { background: linear-gradient(145deg, rgba(30,45,80,0.7) 0%, rgba(22,34,62,0.85) 50%, rgba(16,26,50,0.95) 100%); border: 1px solid rgba(100,120,170,0.15); border-radius: 16px; padding: 32px; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); position: relative; overflow: hidden; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .card-glass:hover { transform: translateY(-4px); border-color: rgba(218,165,69,0.25); box-shadow: 0 8px 32px rgba(218,165,69,0.08), 0 4px 16px rgba(0,0,0,0.2); }
        .card-dark { background: #182145; border: 1px solid rgba(24,33,69,0.06); border-radius: 16px; padding: 32px; box-shadow: 0 4px 24px rgba(24,33,69,0.12); position: relative; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .card-dark:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(24,33,69,0.2); border-color: rgba(221,30,33,0.15); }
        .card-inverted { background: #182145; border: 1px solid rgba(240,224,178,0.1); border-radius: 16px; padding: 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.25); transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .card-inverted:hover { transform: translateY(-4px); border-color: rgba(240,224,178,0.2); box-shadow: 0 12px 40px rgba(0,0,0,0.35); }`,
  `.card-on-dark { background: rgba(40,60,105,0.45); border: 1px solid rgba(80,110,170,0.25); border-radius: 20px; padding: 32px; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .card-on-dark:hover { transform: translateY(-4px); border-color: rgba(133,186,255,0.35); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }
        .card-on-dark h3 { color: #F0E0B2; } .card-on-dark p { color: rgba(240,224,178,0.6); }
        .card-on-light { background: #182145; border: 1px solid rgba(24,33,69,0.1); border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(24,33,69,0.15); transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-on-light:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(24,33,69,0.25); }
        .card-on-light h3 { color: #F0E0B2; } .card-on-light p { color: rgba(240,224,178,0.6); }
        .card-on-red { background: rgba(24,33,69,0.85); border: 1px solid rgba(240,224,178,0.1); border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .card-on-red:hover { transform: translateY(-4px); border-color: rgba(240,224,178,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
        /* Legacy aliases kept for safety */ .card-glass { background: rgba(40,60,105,0.45); border: 1px solid rgba(80,110,170,0.25); border-radius: 20px; padding: 32px; }
        .card-dark { background: #182145; border: 1px solid rgba(24,33,69,0.1); border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(24,33,69,0.15); }
        .card-inverted { background: rgba(24,33,69,0.85); border: 1px solid rgba(240,224,178,0.1); border-radius: 20px; padding: 32px; }`,
  "card classes → solid fills (card-on-dark, card-on-light, card-on-red)"
);

// E4 — Add blue button + fix border-radius
r(
  `.btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#DD1E21,#b91c1c); color:#F0E0B2; font-family:var(--font-heading); font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:14px 28px; border:none; border-radius:8px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-primary:hover { background:linear-gradient(135deg,#e8292d,#DD1E21); transform:translateY(-2px); box-shadow:0 6px 20px rgba(221,30,33,0.3); }
        .btn-outline { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#F0E0B2; font-family:var(--font-heading); font-size:13px; text-transform:uppercase; letter-spacing:1.5px; padding:14px 28px; border:1px solid rgba(240,224,178,0.25); border-radius:8px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-outline:hover { border-color:rgba(240,224,178,0.5); background:rgba(240,224,178,0.05); transform:translateY(-2px); }
        .btn-inverted { display:inline-flex; align-items:center; gap:8px; background:#182145; color:#F0E0B2; font-family:var(--font-heading); font-size:13px; text-transform:uppercase; letter-spacing:1.5px; padding:14px 28px; border:none; border-radius:8px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-inverted:hover { background:#103F6E; transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,0.3); }`,
  `.btn-primary { display:inline-flex; align-items:center; gap:8px; background:#DD1E21; color:#FDFAF4; font-family:var(--font-heading); font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:16px 32px; border:none; border-radius:4px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-primary:hover { background:#c41b1e; transform:translateY(-2px); box-shadow:0 4px 16px rgba(221,30,33,0.3); }
        .btn-blue { display:inline-flex; align-items:center; gap:8px; background:#4a7ab5; color:#FDFAF4; font-family:var(--font-heading); font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:16px 32px; border:none; border-radius:4px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-blue:hover { background:#3d6a9e; transform:translateY(-2px); box-shadow:0 4px 16px rgba(74,122,181,0.3); }
        .btn-outline { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#F0E0B2; font-family:var(--font-heading); font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:14px 32px; border:2px solid rgba(240,224,178,0.3); border-radius:4px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-outline:hover { border-color:rgba(240,224,178,0.6); background:rgba(240,224,178,0.05); }
        .btn-inverted { display:inline-flex; align-items:center; gap:8px; background:#F0E0B2; color:#DD1E21; font-family:var(--font-heading); font-size:14px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:16px 32px; border:none; border-radius:4px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-inverted:hover { background:#e8d4a0; transform:translateY(-2px); box-shadow:0 4px 16px rgba(0,0,0,0.2); }`,
  "btn classes → 4px radius, add btn-blue, btn-inverted = warm beige"
);

// E5 — Dot pattern CSS (add after section-dot)
r(
  `.section-dot--light { box-shadow:0 0 8px rgba(221,30,33,0.3); }`,
  `.section-dot--light { box-shadow:0 0 8px rgba(221,30,33,0.3); }
        .dot-pattern { position:absolute; width:200px; height:200px; background: radial-gradient(circle, #DD1E21 2px, transparent 2px), radial-gradient(circle, #103F6E 2px, transparent 2px); background-size:16px 16px; background-position:0 0, 8px 8px; opacity:0.12; pointer-events:none; }
        .dot-pattern--tr { top:32px; right:32px; }
        .dot-pattern--bl { bottom:32px; left:32px; }`,
  "add dot-pattern CSS"
);

// ── F. Remove glass-morphism from JSX cards ───────────────────────────────────

// F1 — MoatCard (line ~1404) — glass on dark bg → solid
r(
  `backdropFilter: "blur(12px)", overflow: "hidden", position: "relative", cursor: "default",
        background: hov
          ? "linear-gradient(145deg, rgba(200,170,100,0.08) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
          : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",`,
  `overflow: "hidden", position: "relative", cursor: "default",
        background: hov ? "rgba(50,75,120,0.5)" : "rgba(40,60,105,0.45)",`,
  "MoatCard: glass → solid dark"
);

// F2 — mkCard in CTASection (line ~1547) — glass on red bg → solid dark
r(
  `backdropFilter: "blur(12px)",
    background: hov
      ? "linear-gradient(145deg, rgba(200,170,100,0.06) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
      : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",`,
  `background: hov ? "rgba(30,45,85,0.9)" : "rgba(24,33,69,0.85)",`,
  "mkCard (CTA): glass → solid dark-on-red"
);

// F3 — Exposed card 1 (hovCard === 0) — glass on light beige → solid dark
r(
  `backdropFilter: "blur(12px)",
                  background: hovCard === 0
                    ? "linear-gradient(145deg, rgba(200,170,100,0.06) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
                    : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",
                  border: \`1px solid \${hovCard === 0 ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.15)"}\`,
                  boxShadow: hovCard === 0
                    ? "0 0 40px rgba(200,170,100,0.08), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)"
                    : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",`,
  `background: "#182145",
                  border: "1px solid rgba(24,33,69,0.1)",
                  boxShadow: hovCard === 0 ? "0 8px 32px rgba(24,33,69,0.25)" : "0 4px 20px rgba(24,33,69,0.15)",`,
  "exposed card 0: glass → solid dark"
);

// F4 — Exposed card 2 (hovCard === 1) — glass on light beige → solid dark
r(
  `backdropFilter: "blur(12px)",
                  background: hovCard === 1
                    ? "linear-gradient(145deg, rgba(200,170,100,0.06) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
                    : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",
                  border: \`1px solid \${hovCard === 1 ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.15)"}\`,
                  boxShadow: hovCard === 1
                    ? "0 0 40px rgba(200,170,100,0.08), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)"
                    : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",`,
  `background: "#182145",
                  border: "1px solid rgba(24,33,69,0.1)",
                  boxShadow: hovCard === 1 ? "0 8px 32px rgba(24,33,69,0.25)" : "0 4px 20px rgba(24,33,69,0.15)",`,
  "exposed card 1: glass → solid dark"
);

// F5 — Revenue card 1 (hovRev === 0) — glass on dark → solid
r(
  `backdropFilter: "blur(12px)",
                  background: hovRev === 0
                    ? "linear-gradient(145deg, rgba(200,170,100,0.06) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
                    : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",
                  border: \`1px solid \${hovRev === 0 ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.15)"}\`,
                  boxShadow: hovRev === 0
                    ? "0 0 40px rgba(200,170,100,0.08), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)"
                    : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",`,
  `background: hovRev === 0 ? "rgba(50,75,120,0.5)" : "rgba(40,60,105,0.45)",
                  border: \`1px solid \${hovRev === 0 ? "rgba(133,186,255,0.35)" : "rgba(80,110,170,0.25)"}\`,
                  boxShadow: hovRev === 0 ? "0 8px 32px rgba(0,0,0,0.2)" : "none",`,
  "revenue card 0: glass → solid dark"
);

// F6 — Revenue card 2 (hovRev === 1) — glass on dark → solid
r(
  `backdropFilter: "blur(12px)",
                  background: hovRev === 1
                    ? "linear-gradient(145deg, rgba(200,170,100,0.06) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
                    : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",
                  border: \`1px solid \${hovRev === 1 ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.15)"}\`,
                  boxShadow: hovRev === 1
                    ? "0 0 40px rgba(200,170,100,0.08), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)"
                    : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",`,
  `background: hovRev === 1 ? "rgba(50,75,120,0.5)" : "rgba(40,60,105,0.45)",
                  border: \`1px solid \${hovRev === 1 ? "rgba(133,186,255,0.35)" : "rgba(80,110,170,0.25)"}\`,
                  boxShadow: hovRev === 1 ? "0 8px 32px rgba(0,0,0,0.2)" : "none",`,
  "revenue card 1: glass → solid dark"
);

// ── G. Navbar: warm text tones, replace gold pill → red underline ──────────────

// G1 — Nav bg: warm border-bottom
r(
  `borderBottom: "1px solid rgba(100,120,170,0.1)",`,
  `borderBottom: "1px solid rgba(240,224,178,0.08)",`,
  "navbar border-bottom → warm beige"
);

// G2 — Gold sliding pill → red 2px underline strip
r(
  `background: "rgba(240,224,178,0.06)",\n          border: "1px solid rgba(240,224,178,0.10)",`,
  `background: "transparent",\n          borderBottom: "2px solid #DD1E21",\n          borderRadius: 0, height: 2, top: "auto", bottom: 0,`,
  "nav pill → red 2px bottom underline"
);

// G3 — Nav link text: warm beige tones
r(
  `color: isActive ? "#F0E0B2" : hovNav === i ? "rgba(240,224,178,0.75)" : "rgba(240,224,178,0.45)"`,
  `color: isActive ? "#F0E0B2" : hovNav === i ? "#F0E0B2" : "rgba(240,224,178,0.55)"`,
  "nav link colours → warm beige"
);

// G4 — Separator dots: warm beige
r(
  `background: "rgba(240,224,178,0.15)", flexShrink: 0`,
  `background: "rgba(240,224,178,0.2)", flexShrink: 0`,
  "nav separator dots → slightly warmer"
);

// ── H. Button border-radius 8px → 4px (inline button styles) ──────────────────
// The major inline-styled buttons
r(
  `borderRadius: 4, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase",\n                display: "inline-block" }}>`,
  `borderRadius: 4, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase",\n                display: "inline-block" }}>`,
  "comparison footer CTA radius already 4 (no-op)"
);

// Fix the Book a Call nav button
r(
  `background: hovBtn ? "linear-gradient(135deg,#E6412A 0%,#B01819 100%)" : "linear-gradient(135deg,#DD1E21 0%,#B01819 100%)",`,
  `background: hovBtn ? "#c41b1e" : "#DD1E21",`,
  "navbar Book a Call button → solid red"
);

// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(APP_FILE, src.replace(/\n/g, "\r\n"), "utf8");
console.log("\n✅ patch-brand4.js complete.");
