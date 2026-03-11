const fs = require("fs");
const filePath = "src/App.jsx";
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

// 1. Remove Stars from Financial section
const oldStars = `\n      <Stars count={30} color="rgba(201,168,76,0.16)"/>\n`;
if (!src.includes(oldStars)) {
  // try alternate spacing
  console.warn("Stars line not found exactly — skipping Stars removal");
} else {
  src = src.replace(oldStars, "\n");
  console.log("Stars removed");
}

// 2. Replace plain CTA button with hover-enabled version
const oldBtn = `        <div style={{ marginTop:40, opacity: ctaVis ? 1 : 0,
          transform: ctaVis ? "translateY(0)" : "translateY(12px)",
          transition:"opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" }}>
          <button style={{ fontFamily:"'JetBrains Mono'", fontSize:"0.72rem", letterSpacing:"0.1em",
            textTransform:"uppercase", padding:"14px 32px", background:"#C41E2A",
            color:"#fff", border:"none", borderRadius:4, cursor:"pointer" }}>
            Discuss Revenue Opportunity \u2197
          </button>
        </div>`;

const newBtn = `        <FinRevBtn vis={ctaVis}/>`;

if (!src.includes(oldBtn)) {
  console.error("CTA button old text NOT FOUND");
  // debug
  const idx = src.indexOf("Discuss Revenue Opportunity");
  console.log(JSON.stringify(src.substring(idx - 200, idx + 100)));
  process.exit(1);
}
src = src.replace(oldBtn, newBtn);
console.log("Button replaced with FinRevBtn reference");

// 3. Insert FinRevBtn component just before FinancialSection function
const INSERT_BEFORE = "function FinancialSection()";
if (!src.includes(INSERT_BEFORE)) { console.error("Insert point not found"); process.exit(1); }

const BTN_COMPONENT = `function FinRevBtn({ vis }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ marginTop:40, opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(12px)",
      transition:"opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" }}>
      <button
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          fontFamily: "Outfit", fontSize: "0.85rem", fontWeight: 600,
          padding: "14px 32px", color: "#fff", border: "none", borderRadius: 4,
          cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: 8,
          background: hov
            ? "linear-gradient(135deg, #d64545 0%, #b83232 100%)"
            : "linear-gradient(135deg, #c53030 0%, #9b2424 100%)",
          boxShadow: hov
            ? "0 4px 20px rgba(197,48,48,0.35), inset 0 0 0 1px rgba(220,160,80,0.15)"
            : "0 2px 12px rgba(197,48,48,0.2)",
          transform: hov ? "translateY(-1px)" : "translateY(0)",
          transition: "all 0.2s ease",
        }}>
        Discuss Revenue Opportunity
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"/>
          <polyline points="7,7 17,7 17,17"/>
        </svg>
      </button>
    </div>
  );
}

`;

src = src.replace(INSERT_BEFORE, BTN_COMPONENT + INSERT_BEFORE);

fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("patch-fin-btn done");
