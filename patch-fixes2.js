// patch-fixes2.js — FIX 1 (financial numbers) + FIX 2 (scanner box)
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

// ─── FIX 1A: Add CSS classes for financial amounts ──────────────────────────
// Insert before the fin-title rule
replace(
  `.fin-title { white-space: normal !important; font-size: clamp(28px, 8vw, 60px) !important; word-break: break-word !important; }`,
  `.financial-amount { font-family: var(--font-heading); font-weight: 800; font-size: clamp(3rem, 6vw, 5rem); line-height: 1.1; white-space: nowrap; text-align: center; display: block; }
          .financial-amount--navy { color: #182145; }
          .financial-amount--red { color: #DD1E21; }
          .per-month { font-size: 0.3em; font-weight: 400; opacity: 0.5; margin-left: 4px; }
          .fin-title { white-space: normal !important; font-size: clamp(28px, 8vw, 60px) !important; word-break: break-word !important; }`,
  "Add .financial-amount CSS classes"
);

// ─── FIX 1B: Replace $1,000,000 number display ──────────────────────────────
replace(
  `<div style={{ lineHeight:0.9, display:"flex", alignItems:"flex-end", flexWrap:"nowrap", whiteSpace:"nowrap" }}>
            <span className="fin-num-lg" style={{ fontFamily:"'Monument Extended',sans-serif", fontSize:"clamp(60px,11vw,130px)", color:"#182145", lineHeight:0.9, letterSpacing:"-1px", display:"inline" }}>$</span>
            <SlotNumber digits={D1M} commas={CM6} active={phase >= 1} color="#182145"
              fontSize="clamp(60px,11vw,130px)" suffix="/mo" suffixColor="rgba(24,33,69,0.35)" digitDelay={100}/>
          </div>`,
  `<div className="financial-amount financial-amount--navy" style={{ opacity: phase >= 1 ? 1 : 0, transition: "opacity 0.5s ease" }}>
            $1,000,000<span className="per-month">/mo</span>
          </div>`,
  "Replace $1M slot machine with static text"
);

// ─── FIX 1C: Replace $200,000 number display (keep impact animation + phase opacity) ──
replace(
  `{/* Number + shimmer + underline */}
          <div style={{ position:"relative", display:"inline-flex", alignItems:"flex-end", flexWrap:"nowrap", whiteSpace:"nowrap",
            animation: impactNum ? "impactScale 0.4s ease-out forwards" : "none",
            overflow:"hidden",
            opacity: phase >= 3 ? 1 : 0, transition:"opacity 0.3s ease" }}>
            <span className="fin-num-xl" style={{ fontFamily:"'Monument Extended',sans-serif", fontSize:"clamp(68px,13vw,155px)", color:"#DD1E21",
              lineHeight:0.9, letterSpacing:"-1px",
              textShadow: phase >= 4 ? "0 0 40px rgba(221,30,33,0.2),0 0 80px rgba(221,30,33,0.08)" : "none",
              transition:"text-shadow 0.4s ease", display:"inline" }}>$</span>
            <SlotNumber digits={D200K} commas={CM5} active={phase >= 3} color="#DD1E21"
              fontSize="clamp(68px,13vw,155px)" suffix="/mo" suffixColor="rgba(221,30,33,0.4)"
              addShadow digitDelay={120}/>
            {/* Shimmer sweep */}
            {shimmer && (
              <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", borderRadius:4 }}>
                <div style={{ position:"absolute", top:0, bottom:0, width:"30%",
                  background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)",
                  animation:"goldSweep 1.5s ease-in-out 0.3s forwards" }}/>
              </div>
            )}
          </div>`,
  `{/* Number */}
          <div className="financial-amount financial-amount--red" style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 0.3s ease",
            animation: impactNum ? "impactScale 0.4s ease-out forwards" : "none",
            textShadow: phase >= 4 ? "0 0 40px rgba(221,30,33,0.2),0 0 80px rgba(221,30,33,0.08)" : "none",
          }}>
            $200,000<span className="per-month">/mo</span>
          </div>`,
  "Replace $200K slot machine with static text (phase-gated opacity)"
);

// ─── FIX 2A: Scanner outer container background ─────────────────────────────
replace(
  `background: "rgba(6,11,24,0.72)", boxShadow: outerGlow`,
  `background: "#2a4a7a", border: \`2px solid \${outerBorder}\`, boxShadow: outerGlow`,
  "Scanner outer bg → #2a4a7a"
);
// Also fix the border (it was 1px solid, now 2px via the bg replace above)
// Remove the old standalone border prop that now conflicts
replace(
  `border: \`1px solid \${outerBorder}\`, borderRadius: 14, background: "#2a4a7a", border: \`2px solid \${outerBorder}\``,
  `borderRadius: 14, background: "#2a4a7a", border: \`2px solid \${outerBorder}\``,
  "Scanner outer border dedup fix"
);

// ─── FIX 2B: Scanner inner address bar idle background ──────────────────────
replace(
  `const addrBg      = isFlashing ? "rgba(221,30,33,0.22)" : boxActive ? "rgba(221,30,33,0.09)" : "rgba(8,14,30,0.6)";`,
  `const addrBg      = isFlashing ? "rgba(221,30,33,0.22)" : boxActive ? "rgba(221,30,33,0.09)" : "#1e3a5e";`,
  "Scanner addrBg idle → #1e3a5e"
);

// ─── FIX 2C: Scanner inner address bar border ───────────────────────────────
replace(
  `const addrBorder  = boxActive ? "rgba(221,30,33,0.5)" : "rgba(100,110,150,0.12)";`,
  `const addrBorder  = boxActive ? "rgba(221,30,33,0.5)" : "rgba(80,120,180,0.2)";`,
  "Scanner addrBorder idle → rgba(80,120,180,0.2)"
);

// ─── Write ────────────────────────────────────────────────────────────────────
const out = src.replace(/\n/g, "\r\n");
fs.writeFileSync(filePath, out);
console.log(`\nDone — ${count} replacements applied.`);
