/**
 * patch-brand.js  — American Fortress brand-alignment patch
 * Run:  node patch-brand.js
 *
 * Green-light changes only (navy/gold on hold):
 *   1. Google Fonts import → Archivo Black + Space Grotesk
 *      (Archivo Black = temp stand-in for Monument Extended until .woff2 available)
 *   2. Font family swaps: Bebas Neue → Archivo Black, DM Sans / IBM Plex Mono / Outfit → Space Grotesk
 *   3. Red  #c53030 / #C41E2A / #d64545 / #b83232 / #9b2424 / #D42B2B → brand reds
 *   4. rgba(197,48,48,…) / rgba(196,30,42,…) → rgba(221,30,33,…)
 *   5. Cream #f0ece2 → #FDFAF4  |  rgba(240,236,226,…) → rgba(253,250,244,…)
 *   6. Send-to-NameT → Send-to-Name™
 *   7. Scroll progress bar gradient → DD1E21 → E6412A
 *   8. Footer top-border gradient → use DD1E21 + Blue Haze #85BAFF
 */

const fs   = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(FILE, "utf8").replace(/\r\n/g, "\n");

const replacements = [
  // ── 1. Google Fonts import ──────────────────────────────────────────────────
  [
    `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`,
    `/* TODO: replace 'Archivo Black' with Monument Extended .woff2 once files are available */\n        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');`
  ],

  // ── 2a. Body font (Outfit → Space Grotesk) ─────────────────────────────────
  [
    `body{font-family:'Outfit',sans-serif;`,
    `body{font-family:'Space Grotesk',sans-serif;`
  ],

  // ── 2b. Bebas Neue → Archivo Black ─────────────────────────────────────────
  [`'Bebas Neue',sans-serif`,  `'Archivo Black',sans-serif`],
  [`"'Bebas Neue',sans-serif"`, `"'Archivo Black',sans-serif"`],
  [`"'Bebas Neue'"`,            `"'Archivo Black'"`],
  [`'Bebas Neue'`,              `'Archivo Black'`],

  // ── 2c. DM Sans → Space Grotesk ────────────────────────────────────────────
  [`'DM Sans',sans-serif`,  `'Space Grotesk',sans-serif`],
  [`"'DM Sans',sans-serif"`, `"'Space Grotesk',sans-serif"`],
  [`"'DM Sans'"`,            `"'Space Grotesk'"`],
  [`'DM Sans'`,              `'Space Grotesk'`],

  // ── 2d. IBM Plex Mono → Space Grotesk ──────────────────────────────────────
  [`'IBM Plex Mono',monospace`,  `'Space Grotesk',sans-serif`],
  [`"'IBM Plex Mono',monospace"`, `"'Space Grotesk',sans-serif"`],
  [`"'IBM Plex Mono'"`,           `"'Space Grotesk'"`],
  [`'IBM Plex Mono'`,             `'Space Grotesk'`],

  // ── 2e. Outfit (inline style references) → Space Grotesk ───────────────────
  [`fontFamily: "Outfit"`, `fontFamily: "Space Grotesk"`],
  [`fontFamily:"Outfit"`,  `fontFamily:"Space Grotesk"`],

  // ── 3. Red colours ─────────────────────────────────────────────────────────
  // Primary red: #c53030 → #DD1E21
  [`#c53030`, `#DD1E21`],
  [`#C53030`, `#DD1E21`],
  // Button red: #C41E2A → #DD1E21
  [`#C41E2A`, `#DD1E21`],
  // SVG text red: #D42B2B → #DD1E21
  [`#D42B2B`, `#DD1E21`],
  // Dark gradient red: #9b2424 → #B01819  (darker brand-consistent stop)
  [`#9b2424`, `#B01819`],
  // Hover lighter red: #d64545 → #E6412A
  [`#d64545`, `#E6412A`],
  // Hover dark red: #b83232 → #B01819
  [`#b83232`, `#B01819`],

  // ── 4. rgba red channels ────────────────────────────────────────────────────
  // rgba(197,48,48,…) → rgba(221,30,33,…)
  [`rgba(197,48,48,`, `rgba(221,30,33,`],
  // rgba(196,30,42,…) → rgba(221,30,33,…)
  [`rgba(196,30,42,`, `rgba(221,30,33,`],

  // ── 5. Cream colours ────────────────────────────────────────────────────────
  [`#f0ece2`, `#FDFAF4`],
  [`#F0ECE2`, `#FDFAF4`],
  [`rgba(240,236,226,`, `rgba(253,250,244,`],

  // ── 6. Send-to-NameT → Send-to-Name™ ────────────────────────────────────────
  [`Send-to-NameT`, `Send-to-Name™`],

  // ── 7. Scroll progress bar gradient ─────────────────────────────────────────
  [
    `background: "linear-gradient(90deg, #c53030 0%, #daa545 100%)"`,
    `background: "linear-gradient(90deg, #DD1E21 0%, #E6412A 100%)"`
  ],
  // (after the above #c53030 global replace the original is already gone,
  //  but we include the post-replace form as a safety net)
  [
    `background: "linear-gradient(90deg, #DD1E21 0%, #daa545 100%)"`,
    `background: "linear-gradient(90deg, #DD1E21 0%, #E6412A 100%)"`
  ],

  // ── 8. Footer top-border gradient ───────────────────────────────────────────
  [
    `background: "linear-gradient(90deg, transparent 5%, rgba(197,48,48,0.3) 25%, rgba(200,170,100,0.25) 50%, rgba(70,110,180,0.25) 75%, transparent 95%)"`,
    `background: "linear-gradient(90deg, transparent 5%, rgba(221,30,33,0.35) 25%, rgba(133,186,255,0.25) 50%, rgba(70,110,180,0.25) 75%, transparent 95%)"`
  ],
  // (post rgba-replace form)
  [
    `background: "linear-gradient(90deg, transparent 5%, rgba(221,30,33,0.3) 25%, rgba(200,170,100,0.25) 50%, rgba(70,110,180,0.25) 75%, transparent 95%)"`,
    `background: "linear-gradient(90deg, transparent 5%, rgba(221,30,33,0.35) 25%, rgba(133,186,255,0.25) 50%, rgba(70,110,180,0.25) 75%, transparent 95%)"`
  ],
];

let changeCount = 0;
for (const [from, to] of replacements) {
  if (src.includes(from)) {
    const count = src.split(from).length - 1;
    src = src.split(from).join(to);
    console.log(`✓ (×${count}) ${from.slice(0,60).replace(/\n/g,"\\n")}…`);
    changeCount += count;
  } else {
    console.log(`  (skip – not found) ${from.slice(0,60).replace(/\n/g,"\\n")}`);
  }
}

fs.writeFileSync(FILE, src.replace(/\n/g, "\r\n"), "utf8");
console.log(`\nDone. ${changeCount} substitutions written to ${FILE}`);
