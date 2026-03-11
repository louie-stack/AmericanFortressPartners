const fs = require("fs");
const filePath = "src/App.jsx";
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

const START = src.indexOf('<div\n                style={{ ...card, ...rl(pV');
const END   = src.indexOf('\n            </div>', src.indexOf('FOR NAME SERVICES')) + '\n            </div>'.length;
if (START === -1 || END === -1) { console.error("Markers not found"); process.exit(1); }

const NEW_CARDS = `<div
                style={{
                  flex: "1 1 0", borderRadius: 12, padding: 36, position: "relative", overflow: "hidden",
                  backdropFilter: "blur(12px)",
                  background: hovCard === 0
                    ? "linear-gradient(145deg, rgba(200,170,100,0.06) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
                    : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",
                  border: \`1px solid \${hovCard === 0 ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.15)"}\`,
                  boxShadow: hovCard === 0
                    ? "0 0 40px rgba(200,170,100,0.08), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)"
                    : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",
                  transform: hovCard === 0 ? "translateY(-3px) scale(1.01)" : "translateY(0) scale(1)",
                  transition: "all 0.35s ease",
                }}
                onMouseEnter={() => setHovCard(0)} onMouseLeave={() => setHovCard(null)}
              >
                {/* Top edge highlight */}
                <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
                  background: \`linear-gradient(90deg, transparent, \${hovCard === 0 ? "rgba(200,170,100,0.4)" : "rgba(150,160,200,0.1)"}, transparent)\`,
                  transition: "background 0.35s ease" }}/>
                {/* Corner accent */}
                <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60,
                  background: \`radial-gradient(circle at top right, \${hovCard === 0 ? "rgba(200,170,100,0.06)" : "rgba(100,120,170,0.03)"}, transparent 70%)\`,
                  transition: "background 0.35s ease" }}/>
                <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: "1.3rem", letterSpacing: "0.08em", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: hovCard === 0
                      ? "linear-gradient(135deg, rgba(200,170,100,0.15) 0%, rgba(200,170,100,0.06) 100%)"
                      : "linear-gradient(135deg, rgba(80,100,150,0.1) 0%, rgba(60,80,130,0.05) 100%)",
                    border: \`1px solid \${hovCard === 0 ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.12)"}\`,
                    boxShadow: hovCard === 0 ? "0 0 20px rgba(200,170,100,0.12), 0 2px 8px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={hovCard === 0 ? "#daa545" : "rgba(140,155,195,0.6)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="14" rx="2" />
                      <path d="M2 10h20" />
                      <path d="M16 14h2" />
                      <path d="M22 6V4a2 2 0 00-2-2H4a2 2 0 00-2 2v2" />
                    </svg>
                  </div>
                  <span style={{ color: hovCard === 0 ? "#f0ece2" : "rgba(210,215,230,0.8)", transition: "color 0.35s ease" }}>FOR WALLETS</span>
                </h3>
                {["Address poisoning, dust attacks & phishing from transparent public addresses","Every transaction is traceable \u2014 zero financial privacy","Copy-pasting long hex strings prone to costly errors","No recovery path tied to identity"].map((t, i) => (
                  <p key={i} style={{ ...bpt(), color: hovCard === 0 ? "rgba(180,185,210,0.7)" : "rgba(160,170,195,0.5)", transition: "color 0.35s ease" }}><span style={bpdot()} />{t}</p>
                ))}
              </div>
              <div
                style={{
                  flex: "1 1 0", borderRadius: 12, padding: 36, position: "relative", overflow: "hidden",
                  backdropFilter: "blur(12px)",
                  background: hovCard === 1
                    ? "linear-gradient(145deg, rgba(200,170,100,0.06) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
                    : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",
                  border: \`1px solid \${hovCard === 1 ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.15)"}\`,
                  boxShadow: hovCard === 1
                    ? "0 0 40px rgba(200,170,100,0.08), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)"
                    : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",
                  transform: hovCard === 1 ? "translateY(-3px) scale(1.01)" : "translateY(0) scale(1)",
                  transition: "all 0.35s ease",
                }}
                onMouseEnter={() => setHovCard(1)} onMouseLeave={() => setHovCard(null)}
              >
                {/* Top edge highlight */}
                <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
                  background: \`linear-gradient(90deg, transparent, \${hovCard === 1 ? "rgba(200,170,100,0.4)" : "rgba(150,160,200,0.1)"}, transparent)\`,
                  transition: "background 0.35s ease" }}/>
                {/* Corner accent */}
                <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60,
                  background: \`radial-gradient(circle at top right, \${hovCard === 1 ? "rgba(200,170,100,0.06)" : "rgba(100,120,170,0.03)"}, transparent 70%)\`,
                  transition: "background 0.35s ease" }}/>
                <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: "1.3rem", letterSpacing: "0.08em", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: hovCard === 1
                      ? "linear-gradient(135deg, rgba(200,170,100,0.15) 0%, rgba(200,170,100,0.06) 100%)"
                      : "linear-gradient(135deg, rgba(80,100,150,0.1) 0%, rgba(60,80,130,0.05) 100%)",
                    border: \`1px solid \${hovCard === 1 ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.12)"}\`,
                    boxShadow: hovCard === 1 ? "0 0 20px rgba(200,170,100,0.12), 0 2px 8px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={hovCard === 1 ? "#daa545" : "rgba(140,155,195,0.6)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <span style={{ color: hovCard === 1 ? "#f0ece2" : "rgba(210,215,230,0.8)", transition: "color 0.35s ease" }}>FOR NAME SERVICES</span>
                </h3>
                {["Sold domains (.eth, .sol) permanently link to public wallet addresses \u2014 exposing entire transaction history","No privacy layer exists for the 10M+ names already sold","Missed recurring revenue opportunity after initial sale"].map((t, i) => (
                  <p key={i} style={{ ...bpt("#FBBF24"), color: hovCard === 1 ? "rgba(180,185,210,0.7)" : "rgba(160,170,195,0.5)", transition: "color 0.35s ease" }}><span style={bpdot("#FBBF24")} />{t}</p>
                ))}
              </div>
            </div>`;

src = src.slice(0, START) + NEW_CARDS + src.slice(END);
fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("Problem cards patched");
