// patch-fixes.js — FIX 1 (solid card backgrounds) + FIX 2 (financial numbers)
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "src", "App.jsx");

let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
let count = 0;

function replace(oldStr, newStr, label) {
  if (!src.includes(oldStr)) {
    console.warn(`  ⚠️  NOT FOUND: ${label}`);
    return;
  }
  src = src.replace(oldStr, newStr);
  count++;
  console.log(`  ✓  ${label}`);
}

// ─── FIX 1A: Update CSS card classes ────────────────────────────────────────

replace(
  `.card-on-dark { background: rgba(40,60,105,0.45); border: 1px solid rgba(80,110,170,0.25); border-radius: 20px; padding: 32px; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }`,
  `.card-on-dark { background: #2a4a7a; border: 2px solid rgba(100,140,200,0.35); border-radius: 20px; padding: 32px; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }`,
  "card-on-dark background → #2a4a7a"
);

replace(
  `.card-on-light { background: #182145; border: 1px solid rgba(24,33,69,0.1); border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(24,33,69,0.15); transition: transform 0.3s ease, box-shadow 0.3s ease; }`,
  `.card-on-light { background: #2a4a7a; border: 2px solid rgba(100,140,200,0.25); border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(24,33,69,0.15); transition: transform 0.3s ease, box-shadow 0.3s ease; }`,
  "card-on-light background → #2a4a7a"
);

replace(
  `.card-on-red { background: rgba(24,33,69,0.85); border: 1px solid rgba(240,224,178,0.1); border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }`,
  `.card-on-red { background: #2a4a7a; border: 2px solid rgba(100,140,200,0.3); border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }`,
  "card-on-red background → #2a4a7a"
);

// Update card h3/p text colors
replace(
  `.card-on-dark h3 { color: #F0E0B2; } .card-on-dark p { color: rgba(240,224,178,0.6); }`,
  `.card-on-dark h3 { color: #F0E0B2; } .card-on-dark p { color: rgba(240,224,178,0.7); }`,
  "card-on-dark text colors"
);
replace(
  `.card-on-light h3 { color: #F0E0B2; } .card-on-light p { color: rgba(240,224,178,0.6); }`,
  `.card-on-light h3 { color: #F0E0B2; } .card-on-light p { color: rgba(240,224,178,0.7); }`,
  "card-on-light text colors"
);

// Legacy aliases
replace(
  `/* Legacy aliases kept for safety */ .card-glass { background: rgba(40,60,105,0.45); border: 1px solid rgba(80,110,170,0.25); border-radius: 20px; padding: 32px; }`,
  `/* Legacy aliases kept for safety */ .card-glass { background: #2a4a7a; border: 2px solid rgba(100,140,200,0.35); border-radius: 20px; padding: 32px; }`,
  "card-glass → #2a4a7a"
);
replace(
  `.card-dark { background: #182145; border: 1px solid rgba(24,33,69,0.1); border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(24,33,69,0.15); }`,
  `.card-dark { background: #2a4a7a; border: 2px solid rgba(100,140,200,0.25); border-radius: 20px; padding: 32px; box-shadow: 0 4px 20px rgba(24,33,69,0.15); }`,
  "card-dark → #2a4a7a"
);
replace(
  `.card-inverted { background: rgba(24,33,69,0.85); border: 1px solid rgba(240,224,178,0.1); border-radius: 20px; padding: 32px; }`,
  `.card-inverted { background: #2a4a7a; border: 2px solid rgba(100,140,200,0.3); border-radius: 20px; padding: 32px; }`,
  "card-inverted → #2a4a7a"
);

// ─── FIX 1B: Moat card inline styles ────────────────────────────────────────

// Card background (normal + hover)
replace(
  `background: hov ? "rgba(50,75,120,0.5)" : "rgba(40,60,105,0.45)",`,
  `background: "#2a4a7a",`,
  "MoatCard inline background → #2a4a7a"
);

// Top-edge gradient highlight (glass-morphism remnant)
replace(
  `background: \`linear-gradient(90deg, transparent, \${hov ? "rgba(200,170,100,0.5)" : "rgba(150,160,200,0.1)"}, transparent)\`,
        transition: "background 0.35s ease" }}/>`,
  `background: "transparent" }}/>`,
  "MoatCard top-edge gradient → transparent"
);

// Corner radial gradient (glass-morphism remnant)
replace(
  `background: \`radial-gradient(circle at top right, \${hov ? "rgba(200,170,100,0.06)" : "rgba(100,120,170,0.03)"}, transparent 70%)\`,
        transition: "background 0.35s ease" }}/>`,
  `background: "transparent" }}/>`,
  "MoatCard corner radial → transparent"
);

// Icon badge area background
replace(
  `background: hov ? "rgba(200,170,100,0.08)" : "rgba(100,120,170,0.06)",`,
  `background: "rgba(255,255,255,0.08)",`,
  "MoatCard icon bg → subtle white"
);

// ─── FIX 1C: CTA section mkCard inline styles ───────────────────────────────

replace(
  `background: hov ? "rgba(30,45,85,0.9)" : "rgba(24,33,69,0.85)",`,
  `background: "#2a4a7a",`,
  "CTASection mkCard background → #2a4a7a"
);

// Top-edge gradient in CTA cards (topHL function)
replace(
  `background: \`linear-gradient(90deg, transparent, \${hov ? "rgba(200,170,100,0.4)" : "rgba(150,160,200,0.1)"}, transparent)\`,
    transition: "background 0.3s ease",`,
  `background: "transparent",`,
  "CTASection topHL gradient → transparent"
);

// ─── FIX 1D: G_CARD global constant ─────────────────────────────────────────

replace(
  `const G_CARD    = { background: "#121F3A", border: "1px solid rgba(201,168,76,0.1)", borderRadius: 12, padding: 36, position: "relative", overflow: "hidden" };`,
  `const G_CARD    = { background: "#2a4a7a", border: "2px solid rgba(100,140,200,0.3)", borderRadius: 20, padding: 36, position: "relative", overflow: "hidden" };`,
  "G_CARD → #2a4a7a"
);

// G_CARDTOP gradient line (top-edge highlight)
replace(
  `const G_CARDTOP = { position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)" };`,
  `const G_CARDTOP = { position: "absolute", top: 0, left: 0, right: 0, height: 0 };`,
  "G_CARDTOP gradient → hidden"
);

// ─── FIX 2A: Financial number font sizes ────────────────────────────────────

replace(
  `.fin-num-lg { font-size: clamp(36px, 12vw, 110px) !important; }`,
  `.fin-num-lg { font-size: clamp(2.5rem, 5vw, 4.5rem) !important; white-space: nowrap; display: inline; }`,
  "fin-num-lg font-size reduced"
);

replace(
  `.fin-num-xl { font-size: clamp(40px, 14vw, 130px) !important; }`,
  `.fin-num-xl { font-size: clamp(2.5rem, 5vw, 4.5rem) !important; white-space: nowrap; display: inline; }`,
  "fin-num-xl font-size reduced"
);

// ─── FIX 2B: Dollar sign inline display + parent container fix ──────────────

// $1M dollar sign: wrap container div in display:flex
replace(
  `<div style={{ lineHeight:0.9 }}>
            <span className="fin-num-lg" style={{ fontFamily:"'Monument Extended',sans-serif", fontSize:"clamp(60px,11vw,130px)", color:"#182145", lineHeight:0.9, letterSpacing:"-1px" }}>$</span>`,
  `<div style={{ lineHeight:0.9, display:"flex", alignItems:"flex-end", flexWrap:"nowrap", whiteSpace:"nowrap" }}>
            <span className="fin-num-lg" style={{ fontFamily:"'Monument Extended',sans-serif", fontSize:"clamp(60px,11vw,130px)", color:"#182145", lineHeight:0.9, letterSpacing:"-1px", display:"inline" }}>$</span>`,
  "$1M container → flex row, dollar sign inline"
);

// $200K dollar sign wrapper: add opacity for phase 3 trigger + display:flex
replace(
  `<div style={{ position:"relative", display:"inline-block",
            animation: impactNum ? "impactScale 0.4s ease-out forwards" : "none",
            overflow:"hidden" }}>
            <span className="fin-num-xl" style={{ fontFamily:"'Monument Extended',sans-serif", fontSize:"clamp(68px,13vw,155px)", color:"#DD1E21",
              lineHeight:0.9, letterSpacing:"-1px",
              textShadow: phase >= 4 ? "0 0 40px rgba(221,30,33,0.2),0 0 80px rgba(221,30,33,0.08)" : "none",
              transition:"text-shadow 0.4s ease" }}>$</span>`,
  `<div style={{ position:"relative", display:"inline-flex", alignItems:"flex-end", flexWrap:"nowrap", whiteSpace:"nowrap",
            animation: impactNum ? "impactScale 0.4s ease-out forwards" : "none",
            overflow:"hidden",
            opacity: phase >= 3 ? 1 : 0, transition:"opacity 0.3s ease" }}>
            <span className="fin-num-xl" style={{ fontFamily:"'Monument Extended',sans-serif", fontSize:"clamp(68px,13vw,155px)", color:"#DD1E21",
              lineHeight:0.9, letterSpacing:"-1px",
              textShadow: phase >= 4 ? "0 0 40px rgba(221,30,33,0.2),0 0 80px rgba(221,30,33,0.08)" : "none",
              transition:"text-shadow 0.4s ease", display:"inline" }}>$</span>`,
  "$200K wrapper → inline-flex, opacity:0 until phase 3, dollar sign inline"
);

// ─── Write ────────────────────────────────────────────────────────────────────

const out = src.replace(/\n/g, "\r\n");
fs.writeFileSync(filePath, out);
console.log(`\nDone — ${count} replacements applied.`);
