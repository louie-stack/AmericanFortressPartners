const fs = require("fs");
let src = fs.readFileSync("src/App.jsx", "utf8").replace(/\r\n/g, "\n");

const UP_RIGHT = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;

// ── FIX 1a: Hero "Book a Call ↗" ─────────────────────────────────────────────
if (!src.includes(">Book a Call ↗</a>")) {
  console.warn("⚠️  Hero Book a Call ↗ not found");
} else {
  src = src.replace(
    `>Book a Call ↗</a>`,
    `><span style={{display:"inline-flex",alignItems:"center",gap:8}}>Book a Call ${UP_RIGHT}</span></a>`
  );
  console.log("✅ Hero Book a Call");
}

// ── FIX 1b: Hero "Download AF Beta ↗" ────────────────────────────────────────
if (!src.includes(">Download AF Beta ↗</a>")) {
  console.warn("⚠️  Download AF Beta ↗ not found");
} else {
  src = src.replace(
    `>Download AF Beta ↗</a>`,
    `><span style={{display:"inline-flex",alignItems:"center",gap:8}}>Download AF Beta ${UP_RIGHT}</span></a>`
  );
  console.log("✅ Download AF Beta");
}

// ── FIX 1c: "Book a Partnership Call ↗" ──────────────────────────────────────
const PARTNER_OLD = `Book a Partnership Call ↗\n            </a>`;
if (!src.includes(PARTNER_OLD)) {
  console.warn("⚠️  Book a Partnership Call not found");
} else {
  src = src.replace(
    PARTNER_OLD,
    `<span style={{display:"inline-flex",alignItems:"center",gap:8}}>Book a Partnership Call ${UP_RIGHT}</span>\n            </a>`
  );
  console.log("✅ Book a Partnership Call");
}

// ── FIX 2: ↔ in Competitive Landscape title ──────────────────────────────────
const BI_DIR = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:"inline-block",verticalAlign:"middle",margin:"0 2px"}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="8 8 4 12 8 16"/><polyline points="16 8 20 12 16 16"/></svg>`;

const LND_OLD = `>Where We Stand — <span style={{ color: "#C41E2A" }}>Privacy ↔ Usability</span></h2>`;
if (!src.includes(LND_OLD)) {
  console.warn("⚠️  Landscape title not found");
} else {
  src = src.replace(
    LND_OLD,
    `>Where We Stand — <span style={{ color: "#C41E2A" }}>Privacy ${BI_DIR} Usability</span></h2>`
  );
  console.log("✅ ↔ → SVG");
}

// ── FIX 3: Gold dots in hero credential pills ─────────────────────────────────
const DOT_OLD = `<span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A84C" }} />{b}`;
if (!src.includes(DOT_OLD)) {
  console.warn("⚠️  Hero pill dot not found");
} else {
  src = src.replace(
    DOT_OLD,
    `<span style={{ width:5, height:5, borderRadius:"50%", background:"rgba(200,170,100,0.6)", flexShrink:0, display:"inline-block" }} />{b}`
  );
  console.log("✅ Pill dots → CSS");
}

// ── FIX 4: Hero section className + mobile padding ────────────────────────────
const HERO_SEC_OLD = `<section ref={hR} style={{ ...full, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>`;
if (!src.includes(HERO_SEC_OLD)) {
  console.warn("⚠️  Hero section tag not found");
} else {
  src = src.replace(
    HERO_SEC_OLD,
    `<section ref={hR} className="hero-section" style={{ ...full, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>`
  );
  console.log("✅ hero-section className added");
}

// Inject mobile padding into the existing mobile CSS block
const MOB_ANCHOR = `          /* 1 ── NAV ────────────────────────────────────────── */`;
if (src.includes(MOB_ANCHOR) && !src.includes(".hero-section { padding-top")) {
  src = src.replace(
    MOB_ANCHOR,
    `          /* 0 ── HERO TOP PADDING ──────────────────────────── */
          .hero-section { padding-top: 56px !important; }
          .hero-content { padding-top: 44px !important; }

          ${MOB_ANCHOR.trim()}`
  );
  console.log("✅ Hero mobile padding injected");
} else if (src.includes(".hero-section { padding-top")) {
  console.log("ℹ️  Hero padding already present");
} else {
  console.warn("⚠️  Mobile CSS anchor not found for hero padding");
}

// ── Validate: no literal braces or broken patterns ────────────────────────────
if (src.includes("{ARROW_SVG}") || src.includes("{UP_RIGHT}") || src.includes("{BI_DIR}")) {
  console.error("❌ Literal variable reference found in JSX — aborting");
  process.exit(1);
}

fs.writeFileSync("src/App.jsx", src.replace(/\n/g, "\r\n"), "utf8");
console.log("\n✅ All 4 fixes applied cleanly");
