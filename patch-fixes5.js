// patch-fixes5.js — Restore slot machine markup with container-level sizing
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

// ─── 1. Restore $1,000,000 slot machine ──────────────────────────────────────
// Replace static text div with container + SlotNumber
replace(
  `          <div className="financial-amount financial-amount--navy" style={{ opacity: phase >= 1 ? 1 : 0, transition: "opacity 0.5s ease" }}>
            $1,000,000<span className="per-month">/mo</span>
          </div>`,
  `          <div className="fin-slot-wrap" style={{ opacity: phase >= 1 ? 1 : 0, transition: "opacity 0.5s ease",
            display:"flex", alignItems:"baseline", justifyContent:"center", flexWrap:"nowrap" }}>
            <span style={{ color:"#182145", letterSpacing:"-1px", lineHeight:1, display:"inline-block" }}>$</span>
            <SlotNumber digits={D1M} commas={CM6} active={phase >= 1} color="#182145"
              fontSize="1em" suffix="/mo" suffixColor="rgba(24,33,69,0.35)" digitDelay={100}/>
          </div>`,
  "Restore $1M slot machine with container sizing"
);

// ─── 2. Restore $200,000 slot machine ────────────────────────────────────────
replace(
  `          {/* Number */}
          <div className="financial-amount financial-amount--red" style={{
            opacity: phase >= 3 ? 1 : 0,
            transition: "opacity 0.3s ease",
            animation: impactNum ? "impactScale 0.4s ease-out forwards" : "none",
            textShadow: phase >= 4 ? "0 0 40px rgba(221,30,33,0.2),0 0 80px rgba(221,30,33,0.08)" : "none",
          }}>
            $200,000<span className="per-month">/mo</span>
          </div>`,
  `          {/* Number + shimmer */}
          <div className="fin-slot-wrap" style={{
            position:"relative", display:"inline-flex", alignItems:"baseline", justifyContent:"center",
            flexWrap:"nowrap", overflow:"hidden",
            opacity: phase >= 3 ? 1 : 0, transition:"opacity 0.3s ease",
            animation: impactNum ? "impactScale 0.4s ease-out forwards" : "none",
          }}>
            <span style={{ color:"#DD1E21", letterSpacing:"-1px", lineHeight:1, display:"inline-block",
              textShadow: phase >= 4 ? "0 0 40px rgba(221,30,33,0.2),0 0 80px rgba(221,30,33,0.08)" : "none",
              transition:"text-shadow 0.4s ease" }}>$</span>
            <SlotNumber digits={D200K} commas={CM5} active={phase >= 3} color="#DD1E21"
              fontSize="1em" suffix="/mo" suffixColor="rgba(221,30,33,0.4)"
              addShadow digitDelay={120}/>
            {shimmer && (
              <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", borderRadius:4 }}>
                <div style={{ position:"absolute", top:0, bottom:0, width:"30%",
                  background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)",
                  animation:"goldSweep 1.5s ease-in-out 0.3s forwards" }}/>
              </div>
            )}
          </div>`,
  "Restore $200K slot machine with container sizing"
);

// ─── 3. Update CSS: replace .financial-amount with .fin-slot-wrap ────────────
// Remove the old .financial-amount global rules and replace with .fin-slot-wrap
replace(
  `        /* ── Financial Opportunity Numbers ───────────────── */
        .financial-amount { font-family: var(--font-heading) !important; font-weight: 800 !important; font-size: clamp(4rem, 8vw, 7rem) !important; line-height: 1.0 !important; white-space: nowrap !important; text-align: center !important; display: block !important; }
        .financial-amount--navy { color: #182145 !important; }
        .financial-amount--red  { color: #DD1E21 !important; }
        .per-month { font-size: 0.3em !important; font-weight: 400 !important; opacity: 0.5 !important; margin-left: 4px !important; }`,
  `        /* ── Financial Opportunity Numbers ───────────────── */
        .fin-slot-wrap { font-family: var(--font-heading) !important; font-weight: 800 !important; font-size: clamp(4rem, 8vw, 7rem) !important; line-height: 1.0 !important; white-space: nowrap !important; }
        .fin-slot-wrap span { font-size: inherit !important; font-weight: inherit !important; font-family: inherit !important; line-height: inherit !important; }
        .per-month { font-size: 0.3em !important; font-weight: 400 !important; opacity: 0.5 !important; margin-left: 4px !important; }`,
  "Replace .financial-amount CSS with .fin-slot-wrap"
);

const out = src.replace(/\n/g, "\r\n");
fs.writeFileSync(filePath, out);
console.log(`\nDone — ${count} replacements applied.`);
