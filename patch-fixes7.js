// patch-fixes7.js — Five fixes
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

// ─── FIX 1: Remove dot-pattern from MoatSection ──────────────────────────────
replace(
  `      <div className="dot-pattern" style={{ right:"-60px", top:"60px", opacity:0.5 }} />
      <Stars count={20} color="rgba(201,168,76,0.06)"/>`,
  `      <Stars count={20} color="rgba(201,168,76,0.06)"/>`,
  "FIX 1: Remove dot-pattern from MoatSection"
);

// ─── FIX 2: Financial numbers slightly smaller + supporting text ──────────────
// Number container size
replace(
  `        .fin-slot-wrap { font-family: var(--font-heading) !important; font-weight: 800 !important; font-size: clamp(4rem, 8vw, 7rem) !important; line-height: 1.0 !important; white-space: nowrap !important; }`,
  `        .fin-slot-wrap { font-family: var(--font-heading) !important; font-weight: 800 !important; font-size: clamp(3rem, 6vw, 5.5rem) !important; line-height: 1.0 !important; white-space: nowrap !important; }`,
  "FIX 2: Financial numbers → clamp(3rem,6vw,5.5rem)"
);

// /mo size
replace(
  `        .per-month { font-size: 0.2em !important; font-weight: 400 !important; opacity: 0.4 !important; margin-left: 4px !important; vertical-align: baseline !important; }`,
  `        .per-month { font-size: 0.25em !important; font-weight: 400 !important; opacity: 0.4 !important; margin-left: 4px !important; vertical-align: baseline !important; }`,
  "FIX 2: /mo → 0.25em"
);

// ─── FIX 3: Replace "vs" separator with em dash ──────────────────────────────
replace(
  `}>Where We Stand — <span style={{ color: "#DD1E21" }}>Privacy <span style={{fontSize:"0.6em",opacity:0.5,margin:"0 6px",verticalAlign:"middle"}}>vs</span> Usability</span></h2>`,
  `}>Where We Stand — <span style={{ color: "#DD1E21" }}>Privacy <span style={{fontSize:"0.5em",opacity:0.5,margin:"0 10px",verticalAlign:"middle",color:"#DD1E21"}}>↔</span> Usability</span></h2>`,
  "FIX 3: 'vs' → ↔ separator"
);

// ─── FIX 4: CTA section — reduce gap between subtitle and cards ───────────────
replace(
  `<p style={{ color: "rgba(240,224,178,0.75)", fontSize: "0.95rem", marginBottom: 48 }}>Schedule a partnership call or reach out directly</p>`,
  `<p style={{ color: "rgba(240,224,178,0.75)", fontSize: "0.95rem", marginBottom: 24 }}>Schedule a partnership call or reach out directly</p>`,
  "FIX 4: CTA subtitle marginBottom 48 → 24"
);

// ─── FIX 5: Remove footer top border gradient line ────────────────────────────
replace(
  `      {/* Top border */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent 5%, #DD1E21 30%, #F0E0B2 55%, #85BAFF 80%, transparent 95%)",
      }} />`,
  `      {/* Top border removed */}`,
  "FIX 5: Remove footer top border gradient line"
);

const out = src.replace(/\n/g, "\r\n");
fs.writeFileSync(filePath, out);
console.log(`\nDone — ${count} replacements applied.`);
