const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

// ── 1. Add section IDs ────────────────────────────────────────────────────────

const patches = [
  // PROBLEM — "Your Users Are Exposed"
  [
    `<section ref={pR} style={{ ...full, background: "linear-gradient(180deg,#0F1D35,#0A1628)" }}>`,
    `<section id="exposed" ref={pR} style={{ ...full, background: "linear-gradient(180deg,#0F1D35,#0A1628)" }}>`,
  ],
  // SOLUTION 1 — FortressNames
  [
    `<section ref={s1R} style={{ ...full, position:"relative", overflow:"hidden", minHeight:"100vh", display:"flex", alignItems:"center" }}>`,
    `<section id="fortressnames" ref={s1R} style={{ ...full, position:"relative", overflow:"hidden", minHeight:"100vh", display:"flex", alignItems:"center" }}>`,
  ],
  // SOLUTION 2 — Confidentiality Machine
  [
    `<section ref={s2R} style={{ ...full, background: "#0F1D35", position: "relative", overflow: "hidden" }}>`,
    `<section id="confidentiality" ref={s2R} style={{ ...full, background: "#0F1D35", position: "relative", overflow: "hidden" }}>`,
  ],
  // COMPETITIVE LANDSCAPE
  [
    `<section style={{ ...full, background: "#0A1628" }}>
          <Stars count={20} color="rgba(201,168,76,0.1)" />
          <CompetitiveLandscapeInner />
        </section>`,
    `<section id="landscape" style={{ ...full, background: "#0A1628" }}>
          <Stars count={20} color="rgba(201,168,76,0.1)" />
          <CompetitiveLandscapeInner />
        </section>`,
  ],
  // COMPARISON TABLE — ComparisonSection is a self-contained component; wrap with id div
  [
    `{/* COMPARISON TABLE */}
        <ComparisonSection />`,
    `{/* COMPARISON TABLE */}
        <div id="comparison"><ComparisonSection /></div>`,
  ],
  // REVENUE SHARE
  [
    `<section ref={rR2} style={full}>`,
    `<section id="revenue" ref={rR2} style={full}>`,
  ],
  // FINANCIAL
  [
    `{/* FINANCIAL */}
        <FinancialSection />`,
    `{/* FINANCIAL */}
        <div id="financial"><FinancialSection /></div>`,
  ],
  // MOAT
  [
    `{/* MOAT */}
        <MoatSection mR={mR} mV={mV} />`,
    `{/* MOAT */}
        <div id="moat"><MoatSection mR={mR} mV={mV} /></div>`,
  ],
  // CTA / contact
  [
    `{/* CTA */}
        <CTASection ctR={ctR} ctV={ctV} />`,
    `{/* CTA */}
        <div id="contact"><CTASection ctR={ctR} ctV={ctV} /></div>`,
  ],
];

for (const [OLD, NEW] of patches) {
  if (!src.includes(OLD)) {
    console.error("❌ Could not find patch target:\n", OLD.slice(0, 80));
    process.exit(1);
  }
  src = src.replace(OLD, NEW);
}

// ── 2. Replace SiteFooter component ──────────────────────────────────────────

const FOOTER_START = "// ─── Site Footer ────────────────────────────────────────────────────────────";
const FOOTER_END   = "\nexport default function AF()";

const startIdx = src.indexOf(FOOTER_START);
const endIdx   = src.indexOf(FOOTER_END);

if (startIdx === -1 || endIdx === -1) {
  console.error("❌ Could not locate SiteFooter boundaries");
  process.exit(1);
}

const FOOTER_COMPONENT = `// ─── Site Footer ─────────────────────────────────────────────────────────────
function SiteFooter() {
  const [hovSocial,  setHovSocial]  = React.useState(null);
  const [hovNav,     setHovNav]     = React.useState(null);
  const [hovContact, setHovContact] = React.useState(null);
  const [hovPolicy,  setHovPolicy]  = React.useState(null);
  const [hovTop,     setHovTop]     = React.useState(false);
  const [hovCta,     setHovCta]     = React.useState(false);

  const socials = [
    {
      key: "telegram",
      href: "https://t.me/americanfortress",
      label: "Telegram",
      path: "M11.944 0A12 12 0 1 0 12 24a12 12 0 0 0-.056-24zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.504-1.356 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
    },
    {
      key: "x",
      href: "https://x.com/americanfortress",
      label: "X / Twitter",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    },
    {
      key: "discord",
      href: "https://discord.gg/americanfortress",
      label: "Discord",
      path: "M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"
    },
    {
      key: "youtube",
      href: "https://youtube.com/@americanfortress",
      label: "YouTube",
      path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    }
  ];

  const navLinks = [
    { label: "The Problem",             href: "#exposed" },
    { label: "FortressNames",           href: "#fortressnames" },
    { label: "Confidentiality Machine", href: "#confidentiality" },
    { label: "Competitive Landscape",   href: "#landscape" },
    { label: "Feature Comparison",      href: "#comparison" },
    { label: "Revenue Share",           href: "#revenue" },
    { label: "Financial Opportunity",   href: "#financial" },
    { label: "Technology Moat",         href: "#moat" },
    { label: "Contact",                 href: "#contact" },
  ];

  return (
    <footer style={{
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(180deg, #0c1225 0%, #070b18 50%, #040710 100%)",
    }}>
      {/* Grid texture */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: 0.035,
        backgroundImage: "linear-gradient(rgba(200,210,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,210,240,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 70%)",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Top border */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent 5%, rgba(197,48,48,0.3) 25%, rgba(200,170,100,0.25) 50%, rgba(70,110,180,0.25) 75%, transparent 95%)",
      }} />
      {/* Ambient glows */}
      <div style={{ position:"absolute", top:-20, left:"50%", transform:"translateX(-50%)", width:800, height:300, background:"radial-gradient(ellipse at center, rgba(200,170,100,0.05) 0%, transparent 60%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-50, left:-50, width:400, height:300, background:"radial-gradient(ellipse at center, rgba(197,48,48,0.04) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-50, right:-50, width:400, height:300, background:"radial-gradient(ellipse at center, rgba(70,110,180,0.04) 0%, transparent 65%)", pointerEvents:"none" }} />

      {/* Main grid */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "64px 5vw 0",
        display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, alignItems: "start",
        position: "relative", zIndex: 1,
      }}>

        {/* ── Col 1: Brand ── */}
        <div>
          {/* Logo row */}
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:18 }}>
            <img src="/af-shield.png" alt="AF" style={{ width:44, filter:"drop-shadow(0 0 8px rgba(197,48,48,0.15))" }} />
            <div>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:3, color:"#f0ece2" }}>American Fortress</div>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"rgba(200,170,100,0.4)", marginTop:2 }}>The Universal Privacy Layer</div>
            </div>
          </div>
          {/* Description */}
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, lineHeight:1.7, color:"rgba(160,165,185,0.35)", maxWidth:300, margin:"0 0 18px" }}>
            Patented Send-to-Name™ privacy technology. Integrates into any custodial or non-custodial wallet via SDK.
          </p>
          {/* Pills */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
            {["22 Patents","Multi-Chain","Compliance-Ready"].map(p => (
              <span key={p} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:8, letterSpacing:"1.5px", textTransform:"uppercase", color:"rgba(160,165,185,0.3)", border:"1px solid rgba(100,110,150,0.08)", borderRadius:10, padding:"3px 10px" }}>{p}</span>
            ))}
          </div>
          {/* Social icons */}
          <div style={{ display:"flex", gap:10 }}>
            {socials.map((s, i) => (
              <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                onMouseEnter={() => setHovSocial(i)}
                onMouseLeave={() => setHovSocial(null)}
                style={{
                  width:36, height:36, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center",
                  background: hovSocial === i ? "rgba(200,170,100,0.08)" : "rgba(100,110,150,0.05)",
                  border: hovSocial === i ? "1px solid rgba(200,170,100,0.2)" : "1px solid rgba(100,110,150,0.08)",
                  boxShadow: hovSocial === i ? "0 0 12px rgba(200,170,100,0.06)" : "none",
                  transform: hovSocial === i ? "translateY(-2px)" : "none",
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={hovSocial === i ? "#daa545" : "rgba(160,165,185,0.4)"} style={{ transition:"fill 0.25s ease" }}>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── Col 2: Navigation ── */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, fontWeight:500, letterSpacing:2, textTransform:"uppercase", color:"rgba(200,170,100,0.4)", marginBottom:18 }}>Sections</div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {navLinks.map((n, i) => (
              <a key={n.href} href={n.href}
                onMouseEnter={() => setHovNav(i)}
                onMouseLeave={() => setHovNav(null)}
                style={{
                  fontFamily:"'DM Sans',sans-serif", fontSize:13,
                  color: hovNav === i ? "rgba(200,170,100,0.8)" : "rgba(160,165,185,0.45)",
                  textDecoration: "none", transition:"color 0.2s ease",
                }}>
                {n.label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Col 3: Contact ── */}
        <div>
          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, fontWeight:500, letterSpacing:2, textTransform:"uppercase", color:"rgba(200,170,100,0.4)", marginBottom:18 }}>Contact</div>
          <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:20 }}>
            {[
              {
                key:"email", href:"mailto:jakub@americanfortress.io", label:"jakub@americanfortress.io",
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>
              },
              {
                key:"phone", href:"https://wa.me/971585133461", label:"+971 585 133 461", target:"_blank",
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              },
              {
                key:"web", href:"https://americanfortress.io", label:"americanfortress.io", target:"_blank",
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              },
            ].map((c, i) => (
              <a key={c.key} href={c.href} target={c.target} rel="noopener noreferrer"
                onMouseEnter={() => setHovContact(i)}
                onMouseLeave={() => setHovContact(null)}
                style={{
                  display:"flex", alignItems:"center", gap:8,
                  fontFamily:"'DM Sans',sans-serif", fontSize:13,
                  color: hovContact === i ? "rgba(200,170,100,0.8)" : "rgba(160,165,185,0.45)",
                  textDecoration: "none", transition:"color 0.2s ease",
                }}>
                <span style={{ flexShrink:0, opacity: hovContact === i ? 0.9 : 0.5, transition:"opacity 0.2s ease" }}>{c.icon}</span>
                {c.label}
              </a>
            ))}
          </div>
          {/* CTA button */}
          <a href="https://calendly.com/jakub-americanfortress" target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setHovCta(true)}
            onMouseLeave={() => setHovCta(false)}
            style={{
              display:"inline-flex", alignItems:"center", gap:7,
              fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600, letterSpacing:"1px",
              textTransform:"uppercase", textDecoration:"none",
              padding:"10px 22px", borderRadius:8, border:"none", cursor:"pointer",
              background: hovCta
                ? "linear-gradient(135deg,#d64545 0%,#b83232 100%)"
                : "linear-gradient(135deg,#c53030 0%,#9b2424 100%)",
              boxShadow: hovCta ? "0 4px 16px rgba(197,48,48,0.3)" : "0 2px 10px rgba(197,48,48,0.15)",
              transform: hovCta ? "translateY(-1px)" : "none",
              color: "#fff",
              transition: "all 0.25s ease",
            }}>
            Book a Call
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        maxWidth: 1100, margin: "48px auto 0",
        padding: "20px 5vw",
        borderTop: "1px solid rgba(100,110,150,0.06)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
        position: "relative", zIndex: 1,
      }}>
        <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"rgba(160,165,185,0.25)", letterSpacing:"0.5px", margin:0 }}>
          © 2026 American Fortress. All rights reserved.
        </p>
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          {[["Privacy Policy","#"],["Terms of Service","#"]].map(([label, href], i) => (
            <a key={label} href={href}
              onMouseEnter={() => setHovPolicy(i)}
              onMouseLeave={() => setHovPolicy(null)}
              style={{
                fontFamily:"'IBM Plex Mono',monospace", fontSize:10,
                color: hovPolicy === i ? "rgba(200,170,100,0.5)" : "rgba(160,165,185,0.25)",
                textDecoration:"none", transition:"color 0.2s ease",
              }}>
              {label}
            </a>
          ))}
          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
            onMouseEnter={() => setHovTop(true)}
            onMouseLeave={() => setHovTop(false)}
            aria-label="Back to top"
            style={{
              width:40, height:40, borderRadius:"50%",
              display:"flex", alignItems:"center", justifyContent:"center",
              background: hovTop
                ? "linear-gradient(135deg,rgba(200,170,100,0.12),rgba(200,170,100,0.04))"
                : "rgba(100,110,150,0.06)",
              border: hovTop ? "1px solid rgba(200,170,100,0.25)" : "1px solid rgba(100,110,150,0.1)",
              boxShadow: hovTop ? "0 0 15px rgba(200,170,100,0.08)" : "none",
              transform: hovTop ? "translateY(-3px)" : "none",
              cursor:"pointer", transition:"all 0.25s ease",
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={hovTop ? "#daa545" : "rgba(160,165,185,0.4)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition:"stroke 0.25s ease" }}>
              <polyline points="18,15 12,9 6,15"/>
            </svg>
          </button>
        </div>
      </div>

      {/* bottom breathing room */}
      <div style={{ height: 32 }} />
    </footer>
  );
}

`;

src = src.slice(0, startIdx) + FOOTER_COMPONENT + src.slice(endIdx);

fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ Footer v2 + section IDs patched successfully");
