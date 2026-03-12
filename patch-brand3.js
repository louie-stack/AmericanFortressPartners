/**
 * patch-brand3.js  — American Fortress brand Round 3
 * Run:  node patch-brand3.js
 *
 * Changes:
 *   A. index.html — preconnect + Google Fonts <link> tags (reliable font loading)
 *   B. App.jsx <style> block — add :root CSS vars + utility classes
 *      (card-glass, card-dark, card-inverted, icon-badge, btn-primary/outline/inverted,
 *       section-badge, section-dot)
 *   C. Hero title — remove whiteSpace:nowrap, add wordBreak/overflowWrap
 *   D. Feature Comparison table — fix for LIGHT bg
 *      (table container, header row bg, feature cell colour, AF stars, row borders,
 *       impact flash, CmpSym competitor symbols, footer text)
 *   E. Navbar — add bottom border
 *   F. Comparison mobile scroll hint — update scroll hint text colour
 */

const fs   = require("fs");
const path = require("path");

// ─── index.html ───────────────────────────────────────────────────────────────
const HTML_FILE = path.join(__dirname, "index.html");
let html = fs.readFileSync(HTML_FILE, "utf8").replace(/\r\n/g, "\n");

const FONT_LINKS = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">`;

if (!html.includes("fonts.googleapis.com")) {
  html = html.replace("</head>", `${FONT_LINKS}\n</head>`);
  console.log("✓ index.html — added font preconnect + link tags");
} else {
  console.log("  (skip) index.html — font links already present");
}
fs.writeFileSync(HTML_FILE, html.replace(/\n/g, "\r\n"), "utf8");

// ─── App.jsx ──────────────────────────────────────────────────────────────────
const APP_FILE = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(APP_FILE, "utf8").replace(/\r\n/g, "\n");

const r = (from, to, label) => {
  if (!src.includes(from)) {
    console.log(`  (skip – not found) ${label || from.slice(0,70).replace(/\n/g,"↵")}`);
    return;
  }
  const n = src.split(from).length - 1;
  src = src.split(from).join(to);
  console.log(`✓ (×${n}) ${label || from.slice(0,70).replace(/\n/g,"↵")}`);
};

// ── B. CSS custom properties + utility classes ────────────────────────────────
// Inject after the opening <style> tag in the JSX return block.
// Find the existing @import line and insert :root before it.
const CSS_VARS_AND_CLASSES = `
        :root {
          --red: #DD1E21; --red-dark: #b91c1c; --red-glow: rgba(221,30,33,0.4);
          --navy: #103F6E; --indigo: #182145; --cream: #FDFAF4; --beige: #F0E0B2;
          --blue-light: #85BAFF; --gold: #daa545; --green: #22c55e;
          --bg-dark: #182145; --bg-light: #FDFAF4; --bg-red: #DD1E21;
          --font-heading: 'Archivo Black', sans-serif;
          --font-body: 'Space Grotesk', sans-serif;
          --text-on-dark: #FDFAF4; --text-on-dark-muted: rgba(253,250,244,0.55);
          --text-on-dark-faint: rgba(253,250,244,0.35);
          --text-on-light: #182145; --text-on-light-muted: #555555;
        }
        /* ── Card variants ── */
        .card-glass {
          background: linear-gradient(145deg, rgba(30,45,80,0.7) 0%, rgba(22,34,62,0.85) 50%, rgba(16,26,50,0.95) 100%);
          border: 1px solid rgba(100,120,170,0.15); border-radius: 16px; padding: 32px;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          position: relative; overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .card-glass:hover { transform: translateY(-4px); border-color: rgba(218,165,69,0.25); box-shadow: 0 8px 32px rgba(218,165,69,0.08), 0 4px 16px rgba(0,0,0,0.2); }
        .card-glass h3 { color: #FDFAF4; font-family: var(--font-heading); }
        .card-glass p  { color: rgba(253,250,244,0.6); font-family: var(--font-body); }
        .card-dark {
          background: #182145; border: 1px solid rgba(24,33,69,0.06); border-radius: 16px;
          padding: 32px; box-shadow: 0 4px 24px rgba(24,33,69,0.12);
          position: relative; overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card-dark:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(24,33,69,0.2); border-color: rgba(221,30,33,0.15); }
        .card-dark h3 { color: #FDFAF4; font-family: var(--font-heading); }
        .card-dark p  { color: rgba(253,250,244,0.65); font-family: var(--font-body); line-height: 1.6; }
        .card-inverted {
          background: #182145; border: 1px solid rgba(253,250,244,0.1); border-radius: 16px;
          padding: 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.25);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .card-inverted:hover { transform: translateY(-4px); border-color: rgba(253,250,244,0.2); box-shadow: 0 12px 40px rgba(0,0,0,0.35); }
        .card-inverted h3 { color: #FDFAF4; } .card-inverted p { color: rgba(253,250,244,0.65); }
        /* ── Icon badges ── */
        .icon-badge { width:56px; height:56px; min-width:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:transform 0.25s ease; flex-shrink:0; }
        .icon-badge svg { width:24px; height:24px; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; fill:none; }
        .card-glass:hover .icon-badge, .card-dark:hover .icon-badge, .card-inverted:hover .icon-badge { transform: scale(1.08); }
        @media(max-width:768px){ .icon-badge { width:48px; height:48px; min-width:48px; } .icon-badge svg { width:20px; height:20px; } }
        .icon-badge--red   { background: rgba(221,30,33,0.1);  border: 1px solid rgba(221,30,33,0.2);  }
        .icon-badge--red   svg { stroke: #DD1E21; }
        .icon-badge--navy  { background: rgba(16,63,110,0.1);  border: 1px solid rgba(133,186,255,0.2); }
        .icon-badge--navy  svg { stroke: #85BAFF; }
        .icon-badge--gold  { background: rgba(218,165,69,0.1); border: 1px solid rgba(218,165,69,0.2); }
        .icon-badge--gold  svg { stroke: #daa545; }
        /* ── Buttons ── */
        .btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#DD1E21,#b91c1c); color:#FDFAF4; font-family:var(--font-heading); font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:14px 28px; border:none; border-radius:8px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-primary:hover { background:linear-gradient(135deg,#e8292d,#DD1E21); transform:translateY(-2px); box-shadow:0 6px 20px rgba(221,30,33,0.3); }
        .btn-outline { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#FDFAF4; font-family:var(--font-heading); font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:14px 28px; border:1px solid rgba(253,250,244,0.25); border-radius:8px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-outline:hover { border-color:rgba(253,250,244,0.5); background:rgba(253,250,244,0.05); transform:translateY(-2px); }
        .btn-inverted { display:inline-flex; align-items:center; gap:8px; background:#182145; color:#FDFAF4; font-family:var(--font-heading); font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:14px 28px; border:none; border-radius:8px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-inverted:hover { background:#103F6E; transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,0.3); }
        /* ── Section badges / dots ── */
        .section-badge { display:inline-flex; align-items:center; gap:8px; padding:6px 16px; border:1px solid rgba(180,170,140,0.18); border-radius:999px; font-family:var(--font-heading); font-size:10px; text-transform:uppercase; letter-spacing:2.5px; margin-bottom:20px; }
        .section-badge--dark  { border-color:rgba(253,250,244,0.12); color:rgba(253,250,244,0.5); }
        .section-badge--light { border-color:rgba(24,33,69,0.12);    color:rgba(24,33,69,0.5); }
        .section-dot { width:8px; height:8px; border-radius:50%; background:#DD1E21; box-shadow:0 0 10px rgba(221,30,33,0.5); margin-bottom:16px; }
        .section-dot--light { box-shadow:0 0 8px rgba(221,30,33,0.3); }
`;

// Insert after the opening `<style>{` backtick
r(
  `<style>{\`\n        @import url(`,
  `<style>{\`${CSS_VARS_AND_CLASSES}\n        @import url(`,
  "inject :root vars + utility CSS classes into <style> block"
);

// ── C. Hero title — fix overflow clipping ─────────────────────────────────────
// Remove whiteSpace:"nowrap" from the h1 and add overflow protection
r(
  `textShadow: "0 4px 60px rgba(0,0,0,0.5), 0 2px 20px rgba(0,0,0,0.3)",\n                whiteSpace: "nowrap", fontSize: "clamp(2rem, 8.5vw, 9rem)",`,
  `textShadow: "0 4px 60px rgba(0,0,0,0.5), 0 2px 20px rgba(0,0,0,0.3)",\n                fontSize: "clamp(2rem, 8.5vw, 9rem)", wordBreak: "break-word", overflowWrap: "break-word",`,
  "hero h1 — remove whiteSpace:nowrap, add wordBreak/overflowWrap"
);
// Also remove overflow:hidden from the hero h1 parent wrapper div
// (the overflow:hidden on the parent causes the clip — change to overflow:visible for the h1 parent)
r(
  `{/* Line 2: AMERICAN FORTRESS — massive, dominant */}\n            <div style={{ overflow: "hidden", marginBottom: 0 }}>`,
  `{/* Line 2: AMERICAN FORTRESS — massive, dominant */}\n            <div style={{ overflow: "visible", marginBottom: 0 }}>`,
  "hero h1 parent div — overflow:hidden → overflow:visible"
);

// ── D. Feature Comparison table — fix for LIGHT background ───────────────────

// D1 — Table container: remove the dark semi-transparent bg (it creates "grey blob" on cream)
r(
  `<div className="cmp-table" style={{ background:"rgba(14,22,45,0.4)", border:"1px solid rgba(100,110,150,0.08)", borderRadius:12, overflow:"hidden" }}>`,
  `<div className="cmp-table" style={{ background:"transparent", border:"1px solid rgba(24,33,69,0.08)", borderRadius:12, overflow:"hidden" }}>`,
  "comparison table container — remove dark glass bg"
);

// D2 — Header row: add dark bg for visibility + update text colour
r(
  `<div style={{ display:"grid", gridTemplateColumns:gridCols, padding:"10px 20px", borderBottom:"1px solid rgba(100,110,150,0.1)" }}>`,
  `<div style={{ display:"grid", gridTemplateColumns:gridCols, padding:"10px 20px", background:"#182145", borderBottom:"1px solid rgba(100,110,150,0.1)", borderRadius:"12px 12px 0 0" }}>`,
  "comparison header row — dark bg"
);

// D3 — Header cell text colour: all #FDFAF4 except AF col uses gold underline
r(
  `color: ci === 1 ? "#daa545" : "#7A8599",`,
  `color: ci === 1 ? "#daa545" : "#FDFAF4",`,
  "comparison header cell text → cream (AF col stays gold)"
);

// D4 — Feature name cell: cream-ish text → dark navy for light bg
r(
  `<div style={{ fontSize:13.5, color:"rgba(200,205,220,0.7)", display:"flex", alignItems:"center" }}>{feat}</div>`,
  `<div style={{ fontSize:13.5, color:"#182145", fontWeight: 500, display:"flex", alignItems:"center" }}>{feat}</div>`,
  "comparison feature label → #182145"
);

// D5 — Row border: update to dark-on-light
r(
  `borderBottom: isLast ? "none" : "1px solid rgba(100,110,150,0.05)",`,
  `borderBottom: isLast ? "none" : "1px solid rgba(24,33,69,0.07)",`,
  "comparison row border → dark-on-light"
);

// D6 — Even row background: update to dark-on-light
r(
  `: i % 2 === 0 ? "transparent" : "rgba(100,110,150,0.02)"`,
  `: i % 2 === 0 ? "transparent" : "rgba(24,33,69,0.03)"`,
  "comparison even row bg → dark-on-light"
);

// D7 — Impact flash: gold tint → red tint on cream
r(
  `? "rgba(218,165,69,0.08)"`,
  `? "rgba(221,30,33,0.06)"`,
  "comparison impact flash row bg → red tint"
);

// D8 — AF column stars: gold → brand red
r(
  `display:"inline-block", fontSize:18, color:"#daa545",`,
  `display:"inline-block", fontSize:18, color:"#DD1E21",`,
  "comparison AF stars → #DD1E21"
);
// AF star glow
r(
  `? "brightness(2.8) drop-shadow(0 0 12px rgba(218,165,69,0.9))"`,
  `? "brightness(1.5) drop-shadow(0 0 12px rgba(221,30,33,0.9))"`,
  "comparison AF star glow → red"
);
r(
  `: isAlive ? "drop-shadow(0 0 3px rgba(218,165,69,0.3))" : "none"`,
  `: isAlive ? "drop-shadow(0 0 3px rgba(221,30,33,0.3))" : "none"`,
  "comparison AF star default glow → red"
);

// D9 — AF column bg/border: gold → red tint
r(
  `background: isAlive && !isImpact ? "rgba(218,165,69,0.04)" : "transparent"`,
  `background: isAlive && !isImpact ? "rgba(221,30,33,0.04)" : "transparent"`,
  "comparison AF col bg → red tint"
);
r(
  `borderLeft:"1px solid rgba(218,165,69,0.08)",\n                    borderRight:"1px solid rgba(218,165,69,0.08)",`,
  `borderLeft:"1px solid rgba(221,30,33,0.08)",\n                    borderRight:"1px solid rgba(221,30,33,0.08)",`,
  "comparison AF col border → red"
);

// D10 — Competitor CmpSym symbols: gold stars → muted on light bg
r(
  `if (v === "c") return <span style={{ fontSize:16, color:"rgba(200,170,100,0.6)" }}>★</span>;`,
  `if (v === "c") return <span style={{ fontSize:16, color:"rgba(24,33,69,0.25)" }}>★</span>;`,
  "CmpSym check → muted navy"
);
r(
  `if (v === "p") return <span style={{ fontSize:14, color:"rgba(200,170,100,0.5)" }}>△</span>;`,
  `if (v === "p") return <span style={{ fontSize:14, color:"rgba(24,33,69,0.18)" }}>△</span>;`,
  "CmpSym partial → muted navy"
);
r(
  `return <span style={{ fontSize:14, color:"rgba(100,110,150,0.2)" }}>—</span>;`,
  `return <span style={{ fontSize:14, color:"rgba(24,33,69,0.12)" }}>—</span>;`,
  "CmpSym none → very muted"
);

// D11 — Comparison footer text
r(
  `color:"rgba(150,155,180,0.35)", fontSize:13 }}>`,
  `color:"rgba(24,33,69,0.45)", fontSize:13 }}>`,
  "comparison footer footnote text → dark-on-light"
);

// D12 — Scroll hint text (mobile)
r(
  `color:"rgba(160,165,185,0.35)", textTransform:"uppercase" }}>← Scroll to compare →</span>`,
  `color:"rgba(24,33,69,0.35)", textTransform:"uppercase" }}>← Scroll to compare →</span>`,
  "comparison scroll hint → dark-on-light (×2)"
);

// ── E. Navbar — add bottom border ────────────────────────────────────────────
r(
  `backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",\n    }}>`,
  `backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",\n      borderBottom: "1px solid rgba(100,120,170,0.1)",\n    }}>`,
  "navbar — add bottom border"
);

// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(APP_FILE, src.replace(/\n/g, "\r\n"), "utf8");
console.log("\n✅ patch-brand3.js complete.");
