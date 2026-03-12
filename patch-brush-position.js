/**
 * patch-brush-position.js
 * FIX: Brushstroke positioning (straddle boundary with negative margins)
 * FIX: Unicode escape \u26A0 → actual ⚠ character
 * FIX: Leak tag label/value colors → warm beige
 */

const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(APP, "utf8").replace(/\r\n/g, "\n");

const r = (from, to, label) => {
  if (!src.includes(from)) { console.log(`  (skip) ${label}`); return; }
  const n = src.split(from).length - 1;
  src = src.split(from).join(to);
  console.log(`✓ (×${n}) ${label}`);
};

// ── FIX BRUSH POSITIONING ──────────────────────────────────────────────────────
// Strategy: keep Stripe between sections (no DOM restructuring needed)
// Use negative margins so the brush straddles the boundary:
//   marginTop: -40  → brush pulls up 40px, covering bottom of section above
//   marginBottom: -40 → next section pulls up 40px, covering bottom of brush
// position: relative + zIndex: 10 ensures brush renders ON TOP of both section edges

r(
  `const Stripe = ({ brush = "/images/brush-navy.svg", flip }) => (
  <div style={{ display:"block", width:"100%", lineHeight:0, overflow:"hidden", fontSize:0 }}>
    <img src={brush} alt="" role="presentation"
      style={{ display:"block", width:"100%", height:70, maxWidth:"100%", objectFit:"fill",
        transform: flip ? "scaleX(-1)" : "none" }}
    />
  </div>
);`,
  `const Stripe = ({ brush = "/images/brush-navy.svg", flip }) => (
  <div style={{
    position: "relative",
    zIndex: 10,
    width: "100%",
    height: 80,
    marginTop: -40,
    marginBottom: -40,
    lineHeight: 0,
    fontSize: 0,
    pointerEvents: "none",
  }}>
    <img src={brush} alt="" role="presentation"
      style={{ display:"block", width:"100%", height:"100%", objectFit:"fill",
        transform: flip ? "scaleX(-1)" : "none" }}
    />
  </div>
);`,
  "Stripe: negative margins (-40/-40) to straddle section boundary"
);

// ── FIX UNICODE ESCAPE ─────────────────────────────────────────────────────────
// "\u26A0 Wallet Exposed" shows as literal "\U26A0" in some renderers
// Use the actual UTF-8 character ⚠ directly
r(
  `{showExposedLabel ? "\\u26A0 Wallet Exposed" : "\\u25CF Scanning address..."}`,
  `{showExposedLabel ? "⚠ Wallet Exposed" : "● Scanning address..."}`,
  "Unicode escapes → actual UTF-8 characters"
);

// ── FIX LEAK TAG LABEL COLOR ────────────────────────────────────────────────────
// Label text: was rgba(221,30,33,...) (red) → warm beige #F0E0B2
r(
  `color: hov ? "rgba(221,30,33,1)" : "rgba(221,30,33,0.75)", marginBottom: 5, transition: "color 0.25s" }}>{label}`,
  `color: "#F0E0B2", marginBottom: 5, opacity: hov ? 1 : 0.85, transition: "color 0.25s" }}>{label}`,
  "Leak tag label: red → #F0E0B2 warm beige"
);

// Value text: was pink/red tones → warm beige muted
r(
  `color: hov ? "rgba(255,205,205,1)" : "rgba(238,190,190,0.9)", transition: "color 0.25s", fontWeight: 500 }}>{value}`,
  `color: hov ? "#F0E0B2" : "rgba(240,224,178,0.7)", transition: "color 0.25s", fontWeight: 500 }}>{value}`,
  "Leak tag value: pink/red → warm beige"
);

// ── WRITE ──────────────────────────────────────────────────────────────────────
fs.writeFileSync(APP, src.replace(/\n/g, "\r\n"), "utf8");
console.log("\n✅ patch-brush-position.js complete.");
