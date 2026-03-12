// patch-fixes6.js — Six fixes
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

// ─── FIX 1: Remove dot-pattern from FortressNames section ────────────────────
replace(
  `          <div className="dot-pattern" style={{ right:"-80px", top:"40px", transform:"rotate(-15deg)", opacity:0.5 }} />`,
  ``,
  "FIX 1: Remove dot-pattern from FortressNames"
);

// ─── FIX 2: Two Revenue Engines card — solid background ──────────────────────
replace(
  `background: "linear-gradient(135deg,#121F3A,rgba(221,30,33,0.03))", borderImage: "linear-gradient(135deg,rgba(201,168,76,0.3),transparent 50%,rgba(221,30,33,0.2)) 1"`,
  `background: "#2a4a7a", border: "2px solid rgba(100,140,200,0.35)", borderRadius: 20`,
  "FIX 2: Two Revenue Engines card → solid #2a4a7a"
);

// Remove the cardTop gradient highlight inside that card (glass remnant)
// The card uses `<div style={cardTop} />` — we can't easily target just this one,
// so instead neutralise G_CARDTOP if it's still rendering height (already set to height:0 in prev patch)
// The description text colour update:
replace(
  `<span style={{ fontSize: "0.9rem", color: "#7A8599" }}><strong style={{ color: "#F0E0B2" }}>{a}</strong> - {b}</span>`,
  `<span style={{ fontSize: "14px", color: "rgba(240,224,178,0.7)" }}><strong style={{ color: "#F0E0B2" }}>{a}</strong> — {b}</span>`,
  "FIX 2: Two Revenue Engines description text colour"
);

// ─── FIX 3: Confidentiality section body text ────────────────────────────────
// Bullet text: `mut` style object — used globally, so target just inside s2 via the inline style
// The bullet text uses `style={mut}` where `const mut = { fontSize: "0.88rem", color: "#7A8599", lineHeight: 1.55 }`
// We need to override just the confidentiality bullets. They're rendered with:
// <span style={mut}>{f}</span> inside the confidentiality map
// Replace the specific confidentiality bullets with explicit styles
replace(
  `{["Hides amounts, sender, and receiver details on-chain","Compliance-ready: selective disclosure for regulators (CM Proof of Funds)","Works across DeFi protocols and standard transfers"].map((f, i) => (
                  <div key={i} style={{ ...feat(s2V, 0.3 + i * 0.1), marginBottom: 16 }}>
                    <span style={fchk}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(201,168,76,0.6)", display: "block" }} /></span>
                    <span style={mut}>{f}</span>
                  </div>
                ))}`,
  `{["Hides amounts, sender, and receiver details on-chain","Compliance-ready: selective disclosure for regulators (CM Proof of Funds)","Works across DeFi protocols and standard transfers"].map((f, i) => (
                  <div key={i} style={{ ...feat(s2V, 0.3 + i * 0.1), marginBottom: 16 }}>
                    <span style={fchk}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(201,168,76,0.6)", display: "block" }} /></span>
                    <span style={{ fontSize: "16px", color: "#333333", lineHeight: 1.7 }}>{f}</span>
                  </div>
                ))}`,
  "FIX 3: Confidentiality bullet text → darker, larger"
);

// Subtitle text
replace(
  `<p style={{ ...rv(s2V, 0.22), color: "#7A8599", fontSize: "1.05rem", marginBottom: 32 }}>On-chain transaction privacy layer - compliance-ready, not a mixer</p>`,
  `<p style={{ ...rv(s2V, 0.22), color: "#555555", fontSize: "16px", marginBottom: 32 }}>On-chain transaction privacy layer — compliance-ready, not a mixer</p>`,
  "FIX 3: Confidentiality subtitle text"
);

// ─── FIX 4: Financial /mo sizing ─────────────────────────────────────────────
replace(
  `        .per-month { font-size: 0.3em !important; font-weight: 400 !important; opacity: 0.5 !important; margin-left: 4px !important; }`,
  `        .per-month { font-size: 0.2em !important; font-weight: 400 !important; opacity: 0.4 !important; margin-left: 4px !important; vertical-align: baseline !important; }`,
  "FIX 4: /mo text smaller"
);

// ─── FIX 5: Footer border-top ────────────────────────────────────────────────
replace(
  `        borderTop: "1px solid rgba(100,110,150,0.06)",`,
  `        borderTop: "none",`,
  "FIX 5: Footer border-top removed"
);

// ─── FIX 6: Replace ↔ SVG arrow with em dash ─────────────────────────────────
replace(
  `}>Where We Stand - <span style={{ color: "#DD1E21" }}>Privacy <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:"inline-block",verticalAlign:"middle",margin:"0 2px"}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="8 8 4 12 8 16"/><polyline points="16 8 20 12 16 16"/></svg> Usability</span></h2>`,
  `}>Where We Stand — <span style={{ color: "#DD1E21" }}>Privacy <span style={{fontSize:"0.6em",opacity:0.5,margin:"0 6px",verticalAlign:"middle"}}>vs</span> Usability</span></h2>`,
  "FIX 6: Replace ↔ SVG with clean 'vs' separator"
);

const out = src.replace(/\n/g, "\r\n");
fs.writeFileSync(filePath, out);
console.log(`\nDone — ${count} replacements applied.`);
