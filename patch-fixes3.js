// patch-fixes3.js — FIX 1 (financial number size) + FIX 2 (scanner → red)
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

// ─── FIX 1: Financial amount size ────────────────────────────────────────────
replace(
  `.financial-amount { font-family: var(--font-heading); font-weight: 800; font-size: clamp(3rem, 6vw, 5rem); line-height: 1.1; white-space: nowrap; text-align: center; display: block; }`,
  `.financial-amount { font-family: var(--font-heading); font-weight: 800; font-size: clamp(4rem, 8vw, 7rem); line-height: 1.0; white-space: nowrap; text-align: center; display: block; }`,
  "financial-amount size → clamp(4rem,8vw,7rem)"
);

// ─── FIX 2A: Scanner outer container ─────────────────────────────────────────
// Background + border-radius + padding
replace(
  `margin: "32px 0 48px", padding: "28px 28px 24px", borderRadius: 14, background: "#2a4a7a", border: \`2px solid \${outerBorder}\``,
  `margin: "32px 0 48px", padding: "40px", borderRadius: 20, background: "#DD1E21", border: \`2px solid \${outerBorder}\``,
  "Scanner outer → red bg, 20px radius, 40px padding"
);

// Outer border idle colour
replace(
  `const outerBorder = boxActive ? "rgba(221,30,33,0.55)" : "rgba(100,110,150,0.1)";`,
  `const outerBorder = boxActive ? "rgba(150,20,20,0.8)" : "rgba(180,40,40,0.4)";`,
  "Scanner outerBorder idle → rgba(180,40,40,0.4)"
);

// ─── FIX 2B: Scanner computed colour values ───────────────────────────────────
// Address bar bg (idle → dark overlay on red)
replace(
  `const addrBg      = isFlashing ? "rgba(221,30,33,0.22)" : boxActive ? "rgba(221,30,33,0.09)" : "#1e3a5e";`,
  `const addrBg      = isFlashing ? "rgba(0,0,0,0.4)" : boxActive ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.25)";`,
  "Scanner addrBg → dark overlays on red"
);

// Address bar border
replace(
  `const addrBorder  = boxActive ? "rgba(221,30,33,0.5)" : "rgba(80,120,180,0.2)";`,
  `const addrBorder  = boxActive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)";`,
  "Scanner addrBorder → white overlay"
);

// Address bar text colour
replace(
  `const addrColor   = boxActive ? "rgba(240,185,185,0.95)" : "rgba(160,165,185,0.5)";`,
  `const addrColor   = boxActive ? "#FDFAF4" : "rgba(253,250,244,0.7)";`,
  "Scanner addrColor → warm white"
);

// ─── FIX 2C: Status label colour ─────────────────────────────────────────────
replace(
  `color: showExposedLabel ? "#DD1E21" : "rgba(160,165,185,0.45)", fontWeight: showExposedLabel ? 700 : 400`,
  `color: showExposedLabel ? "#FDFAF4" : "rgba(253,250,244,0.7)", fontWeight: showExposedLabel ? 700 : 400`,
  "Scanner status label → white text"
);

// ─── FIX 2D: Scan beam → white (visible on red bg) ───────────────────────────
replace(
  `background: "linear-gradient(180deg,rgba(255,80,80,0.4),#DD1E21,rgba(255,80,80,0.4))", boxShadow: "0 0 6px 3px rgba(221,30,33,1), 0 0 22px 8px rgba(221,30,33,0.75), 0 0 55px 14px rgba(221,30,33,0.4)"`,
  `background: "linear-gradient(180deg,transparent,rgba(255,255,255,0.85),transparent)", boxShadow: "0 0 8px 3px rgba(255,255,255,0.7), 0 0 24px 8px rgba(255,255,255,0.3)"`,
  "Scan beam → white (visible on red bg)"
);

// Scan progress fill → white overlay
replace(
  `background: isScanning ? "linear-gradient(90deg,rgba(221,30,33,0.14) 0%,rgba(221,30,33,0.28) 80%,rgba(221,30,33,0.1) 100%)" : "transparent"`,
  `background: isScanning ? "linear-gradient(90deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.2) 80%,rgba(0,0,0,0.05) 100%)" : "transparent"`,
  "Scan progress sweep → dark overlay on red"
);

// ─── FIX 2E: Leaked data tags → dark overlays ────────────────────────────────
replace(
  `background: hov ? "rgba(221,30,33,0.2)" : "rgba(221,30,33,0.11)", border: \`1px solid \${hov ? "rgba(221,30,33,0.6)" : "rgba(221,30,33,0.3)"}\`, boxShadow: hov ? "0 0 22px rgba(221,30,33,0.28), 0 0 44px rgba(221,30,33,0.1)" : "0 0 12px rgba(221,30,33,0.1)"`,
  `background: hov ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.2)", border: \`1px solid \${hov ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.12)"}\`, boxShadow: hov ? "0 0 12px rgba(0,0,0,0.3)" : "none"`,
  "Leaked tags → dark overlays on red"
);

// Tag connector line
replace(
  `background: hov ? "rgba(221,30,33,0.65)" : "rgba(221,30,33,0.3)"`,
  `background: hov ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)"`,
  "Tag connector lines → white"
);

// ─── Write ────────────────────────────────────────────────────────────────────
const out = src.replace(/\n/g, "\r\n");
fs.writeFileSync(filePath, out);
console.log(`\nDone — ${count} replacements applied.`);
