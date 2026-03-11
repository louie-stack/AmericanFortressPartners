const fs = require("fs");
const filePath = "src/App.jsx";
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

// Find exact bounds of CTA section
const CTA_START = src.indexOf("        {/* CTA */}\n        <section ref={ctR}");
const CTA_END   = src.indexOf("\n        </section>", CTA_START) + "\n        </section>".length;
if (CTA_START === -1) { console.error("CTA start not found"); process.exit(1); }
console.log("CTA block:", CTA_START, "->", CTA_END);

const NEW_CTA = `        {/* CTA */}
        <CTASection ctR={ctR} ctV={ctV} />`;

src = src.slice(0, CTA_START) + NEW_CTA + src.slice(CTA_END);

// Insert CTASection component before export default
const INSERT_BEFORE = "export default function AF() {";
if (!src.includes(INSERT_BEFORE)) { console.error("Insert point not found"); process.exit(1); }

const CTA_COMPONENT = `// \u2500\u2500 CTASection \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function CTASection({ ctR, ctV }) {
  const [hovL,     setHovL]     = useState(false);
  const [hovR,     setHovR]     = useState(false);
  const [hovBtn,   setHovBtn]   = useState(false);
  const [hovMail,  setHovMail]  = useState(false);
  const [hovPhone, setHovPhone] = useState(false);
  const [hovPhoto, setHovPhoto] = useState(false);

  const calColor = hovL ? "#daa545" : "rgba(140,155,195,0.6)";

  const mkCard = (hov) => ({
    borderRadius: 12, padding: 36, position: "relative", overflow: "hidden",
    backdropFilter: "blur(12px)",
    background: hov
      ? "linear-gradient(145deg, rgba(200,170,100,0.06) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
      : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",
    border: \`1px solid \${hov ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.15)"}\`,
    boxShadow: hov
      ? "0 0 40px rgba(200,170,100,0.08), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)"
      : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",
    transform: hov ? "translateY(-3px)" : "translateY(0)",
    transition: "all 0.3s ease",
  });

  const topHL = (hov) => ({
    position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
    background: \`linear-gradient(90deg, transparent, \${hov ? "rgba(200,170,100,0.4)" : "rgba(150,160,200,0.1)"}, transparent)\`,
    transition: "background 0.3s ease",
  });

  return (
    <section ref={ctR} style={G_FULL}>
      <Stars count={25} color="rgba(196,30,42,0.08)" />
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse,rgba(196,30,42,0.04),transparent 70%)", pointerEvents: "none" }} />
      <div className="msec" style={{ ...G_SEC, textAlign: "center" }}>
        <h2 style={{ ...G_MEGA("clamp(2.5rem,6vw,4.5rem)", 8) }}>Let's Build <span style={{ color: "#C41E2A" }}>Together</span></h2>
        <p style={{ color: "#3D4A63", fontSize: "0.95rem", marginBottom: 48 }}>Schedule a partnership call or reach out directly</p>

        <div className="mgrid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 800, margin: "0 auto" }}>

          {/* Left — Schedule a Call */}
          <div style={{ ...mkCard(hovL), textAlign: "center" }}
            onMouseEnter={() => setHovL(true)} onMouseLeave={() => setHovL(false)}>
            <div style={topHL(hovL)}/>
            <div style={{
              width: 52, height: 52, borderRadius: 12, margin: "0 auto 20px",
              background: hovL
                ? "linear-gradient(135deg, rgba(200,170,100,0.15) 0%, rgba(200,170,100,0.06) 100%)"
                : "linear-gradient(135deg, rgba(80,100,150,0.1) 0%, rgba(60,80,130,0.05) 100%)",
              border: \`1px solid \${hovL ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.12)"}\`,
              boxShadow: hovL ? "0 0 20px rgba(200,170,100,0.12), 0 2px 8px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s ease",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={calColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: "1.2rem", letterSpacing: "0.06em", marginBottom: 8,
              color: hovL ? "#f0ece2" : "rgba(210,215,230,0.8)", transition: "color 0.3s ease" }}>SCHEDULE A CALL</h3>
            <p style={{ fontSize: "0.85rem", marginBottom: 24, lineHeight: 1.5,
              color: hovL ? "rgba(180,185,210,0.65)" : "rgba(160,165,185,0.45)", transition: "color 0.3s ease" }}>30-minute partnership discussion with our BD team</p>
            <button
              onMouseEnter={() => setHovBtn(true)} onMouseLeave={() => setHovBtn(false)}
              style={{
                fontFamily: "Outfit", fontSize: "0.85rem", fontWeight: 600, padding: "14px 32px",
                color: "#fff", border: "none", borderRadius: 4, cursor: "pointer",
                letterSpacing: "0.06em", textTransform: "uppercase",
                display: "inline-flex", alignItems: "center", gap: 8,
                background: hovBtn
                  ? "linear-gradient(135deg, #d64545 0%, #b83232 100%)"
                  : "linear-gradient(135deg, #c53030 0%, #9b2424 100%)",
                boxShadow: hovBtn
                  ? "0 4px 20px rgba(197,48,48,0.35), inset 0 0 0 1px rgba(220,160,80,0.15)"
                  : "0 2px 12px rgba(197,48,48,0.2)",
                transform: hovBtn ? "translateY(-1px)" : "translateY(0)",
                transition: "all 0.2s ease",
              }}>
              Book a Call
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7,7 17,7 17,17"/>
              </svg>
            </button>
          </div>

          {/* Right — Jakub contact */}
          <div style={{ ...mkCard(hovR), textAlign: "center" }}
            onMouseEnter={() => setHovR(true)} onMouseLeave={() => setHovR(false)}>
            <div style={topHL(hovR)}/>
            <div
              onMouseEnter={() => setHovPhoto(true)} onMouseLeave={() => setHovPhoto(false)}
              style={{
                width: 72, height: 72, borderRadius: "50%",
                border: \`2px solid \${hovPhoto ? "rgba(200,170,100,0.3)" : "rgba(100,120,170,0.15)"}\`,
                boxShadow: hovPhoto ? "0 0 20px rgba(200,170,100,0.1)" : "none",
                margin: "0 auto 14px", overflow: "hidden",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}>
              <img src="/jakub.jpg" alt="Jakub Zurawinski" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <p style={{ fontFamily: "'Bebas Neue'", fontSize: "1.1rem", letterSpacing: "0.06em",
              color: hovR ? "#f0ece2" : "rgba(210,215,230,0.8)", transition: "color 0.3s ease" }}>JAKUB ZURAWINSKI</p>
            <p style={{ fontFamily: "'JetBrains Mono'", fontSize: "0.7rem", color: "#3D4A63", marginBottom: 16, letterSpacing: "0.04em" }}>Head of Business Development</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <a href="mailto:jakub@americanfortress.io"
                onMouseEnter={() => setHovMail(true)} onMouseLeave={() => setHovMail(false)}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "8px 14px", borderRadius: 6, textDecoration: "none", fontSize: "0.83rem",
                  color: hovMail ? "rgba(200,170,100,0.85)" : "rgba(180,185,210,0.55)",
                  background: hovMail ? "rgba(200,170,100,0.05)" : "transparent",
                  transition: "all 0.2s ease",
                }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="22,4 12,13 2,4" />
                </svg>
                jakub@americanfortress.io
              </a>
              <a href="https://wa.me/971585133461" target="_blank" rel="noreferrer"
                onMouseEnter={() => setHovPhone(true)} onMouseLeave={() => setHovPhone(false)}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "8px 14px", borderRadius: 6, textDecoration: "none", fontSize: "0.83rem",
                  color: hovPhone ? "rgba(200,170,100,0.85)" : "rgba(180,185,210,0.55)",
                  background: hovPhone ? "rgba(200,170,100,0.05)" : "transparent",
                  transition: "all 0.2s ease",
                }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.13 12.7a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +971 585 133 461 (WhatsApp)
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

`;

src = src.replace(INSERT_BEFORE, CTA_COMPONENT + INSERT_BEFORE);
fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("CTASection patch applied");
