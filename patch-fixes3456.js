/**
 * patch-fixes3456.js
 * FIX BRUSHES: section's brush matches the section's OWN bg color
 * FIX 3: Hero title too large
 * FIX 4: Financial title clipping (whiteSpace:nowrap removed, font-size reduced)
 * FIX 5: Navbar already fixed — verified no change needed
 * FIX 6: Button border-radius 8 → 4 (buttons only, not cards/badges)
 */

const fs = require("fs");
const path = require("path");

const r = (src, from, to, label) => {
  if (!src.includes(from)) { console.log(`  (skip) ${label}`); return src; }
  const n = src.split(from).length - 1;
  console.log(`✓ (×${n}) ${label}`);
  return src.split(from).join(to);
};

const APP = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(APP, "utf8").replace(/\r\n/g, "\n");

// ── BRUSH COLORS: match the section the brush sits IN ─────────────────────────
// Rule: dark(#182145) section → navy brush | beige section → beige brush | red → red brush
// Changes: Stripes on dark sections were wrongly set to beige; fix to navy

// 1. Hero (dark) → was brush-beige, must be brush-navy
src = r(src,
  `<Stripe brush="/images/brush-beige.svg" />\n\n        {/* PROBLEM */}\n        <section id="exposed"`,
  `<Stripe brush="/images/brush-navy.svg" />\n\n        {/* PROBLEM */}\n        <section id="exposed"`,
  "Brush: Hero(dark) → navy (was beige)"
);

// 3. FortressNames (dark) → was brush-beige-2, must be brush-navy
src = r(src,
  `<Stripe brush="/images/brush-beige-2.svg" />\n\n        {/* SOLUTION 2 */}`,
  `<Stripe brush="/images/brush-navy.svg" />\n\n        {/* SOLUTION 2 */}`,
  "Brush: FortressNames(dark) → navy (was beige-2)"
);

// 5. Landscape (dark) → was brush-beige, must be brush-navy
src = r(src,
  `<Stripe brush="/images/brush-beige.svg" />\n\n        {/* COMPARISON TABLE */}`,
  `<Stripe brush="/images/brush-navy.svg" />\n\n        {/* COMPARISON TABLE */}`,
  "Brush: Landscape(dark) → navy (was beige)"
);

// 7. Revenue (dark) → was brush-beige-2, must be brush-navy
src = r(src,
  `<Stripe brush="/images/brush-beige-2.svg" />\n\n        {/* FINANCIAL */}`,
  `<Stripe brush="/images/brush-navy.svg" />\n\n        {/* FINANCIAL */}`,
  "Brush: Revenue(dark) → navy (was beige-2)"
);

// 10. Trusted By (dark) → was brush-red, must be brush-navy
src = r(src,
  `<Stripe brush="/images/brush-red.svg" flip />\n\n        {/* CTA */}`,
  `<Stripe brush="/images/brush-navy.svg" flip />\n\n        {/* CTA */}`,
  "Brush: Trusted(dark) → navy (was red)"
);

// Verify beige sections stay correct (no change needed — log state)
const beigeBrushCount = (src.match(/brush-beige\.svg/g)||[]).length;
const beige2BrushCount = (src.match(/brush-beige-2\.svg/g)||[]).length;
console.log(`  ✓ beige brushes remaining: brush-beige×${beigeBrushCount}, brush-beige-2×${beige2BrushCount} (should be on beige sections)`);

// ── FIX 3: Hero title too large ───────────────────────────────────────────────

// "Partner With" line: reduce size, tighten letter-spacing
src = r(src,
  `fontFamily: "'Monument Extended',sans-serif", fontSize: "clamp(1rem, 2vw, 1.5rem)",
                letterSpacing: "0.35em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase",`,
  `fontFamily: "'Monument Extended',sans-serif", fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)",
                letterSpacing: "0.45em", color: "rgba(201,168,76,0.6)", textTransform: "uppercase",`,
  "Fix 3: 'Partner With' font-size reduced"
);

// "American Fortress" h1 — has two fontSize props, second wins
// Remove the duplicate first fontSize + update the second
src = r(src,
  `fontFamily: "'Monument Extended',sans-serif", fontSize: "clamp(3.8rem, 11vw, 9rem)",
                letterSpacing: "0.04em", lineHeight: 0.92, textTransform: "uppercase", color: "#F0E0B2",
                textShadow: "0 4px 60px rgba(0,0,0,0.5), 0 2px 20px rgba(0,0,0,0.3)",
                fontSize: "clamp(2rem, 8.5vw, 9rem)", wordBreak: "break-word", overflowWrap: "break-word",`,
  `fontFamily: "'Monument Extended',sans-serif",
                letterSpacing: "0.04em", lineHeight: 0.92, textTransform: "uppercase", color: "#F0E0B2",
                textShadow: "0 4px 60px rgba(0,0,0,0.5), 0 2px 20px rgba(0,0,0,0.3)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)", wordBreak: "break-word", overflowWrap: "break-word",`,
  "Fix 3: Hero h1 font-size → clamp(2rem,4vw,3.5rem)"
);

// ── FIX 4: Financial section title — remove nowrap, reduce size, fix padding ──

// Title: remove whiteSpace:nowrap, reduce font-size, add wrapping
src = r(src,
  `<h2 className="fin-title" style={{ fontFamily:"'Monument Extended',sans-serif", fontSize:"clamp(36px,5.5vw,80px)",
            letterSpacing:"0.02em", lineHeight:0.95, marginBottom:0, whiteSpace:"nowrap" }}>`,
  `<h2 className="fin-title" style={{ fontFamily:"'Monument Extended',sans-serif", fontSize:"clamp(1.6rem,3.5vw,2.8rem)",
            letterSpacing:"0.02em", lineHeight:1.05, marginBottom:0, wordBreak:"break-word", overflowWrap:"break-word" }}>`,
  "Fix 4: Financial title — nowrap removed, font-size reduced"
);

// Financial section container padding: ensure minimum 40px horizontal padding
src = r(src,
  `padding: "120px 5vw", position: "relative", overflow: "hidden",`,
  `padding: "120px max(40px, 5vw)", position: "relative", overflow: "hidden",`,
  "Fix 4: Financial section padding — min 40px horizontal"
);

// ── FIX 6: Button border-radius 8 → 4 (buttons only, not cards/badges) ────────

// Financial/CTA section CTA button (has cursor:"pointer", border:"none")
src = r(src,
  `padding:"10px 22px", borderRadius:8, border:"none", cursor:"pointer",`,
  `padding:"10px 22px", borderRadius:4, border:"none", cursor:"pointer",`,
  "Fix 6: Financial CTA button borderRadius 8→4"
);

// Navbar 'Book a Call' button
src = r(src,
  `padding: "8px 22px", borderRadius: 8, textDecoration: "none",`,
  `padding: "8px 22px", borderRadius: 4, textDecoration: "none",`,
  "Fix 6: Navbar 'Book a Call' borderRadius 8→4"
);

// ── Write ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(APP, src.replace(/\n/g, "\r\n"), "utf8");
console.log("\n✅ patch-fixes3456.js complete.");
