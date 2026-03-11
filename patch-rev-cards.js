const fs = require("fs");
const filePath = "src/App.jsx";
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

const revenueIdx = src.indexOf("A New Revenue Stream");
const START = src.indexOf('<div\n                onMouseEnter={() => setHovRev(0)}', revenueIdx);
const END   = src.indexOf('\n            </div>\n          </div>\n        </section>', START) + '\n            </div>'.length;
if (START === -1 || END === -1) { console.error("Markers not found"); process.exit(1); }
console.log("Revenue cards block:", START, "->", END);

const NEW_CARDS = `<div
                onMouseEnter={() => setHovRev(0)} onMouseLeave={() => setHovRev(null)}
                style={{
                  borderRadius: 12, padding: 36, position: "relative", overflow: "hidden",
                  backdropFilter: "blur(12px)",
                  background: hovRev === 0
                    ? "linear-gradient(145deg, rgba(200,170,100,0.06) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
                    : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",
                  border: \`1px solid \${hovRev === 0 ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.15)"}\`,
                  boxShadow: hovRev === 0
                    ? "0 0 40px rgba(200,170,100,0.08), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)"
                    : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",
                  transform: hovRev === 0 ? "translateY(-3px) scale(1.01)" : "translateY(0) scale(1)",
                  transition: "all 0.35s ease",
                }}>
                <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
                  background: \`linear-gradient(90deg, transparent, \${hovRev === 0 ? "rgba(200,170,100,0.4)" : "rgba(150,160,200,0.1)"}, transparent)\`,
                  transition: "background 0.35s ease" }}/>
                <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60,
                  background: \`radial-gradient(circle at top right, \${hovRev === 0 ? "rgba(200,170,100,0.06)" : "rgba(100,120,170,0.03)"}, transparent 70%)\`,
                  transition: "background 0.35s ease" }}/>
                <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: "1.3rem", letterSpacing: "0.06em", marginBottom: 4,
                  color: hovRev === 0 ? "#f0ece2" : "rgba(210,215,230,0.8)", transition: "color 0.35s ease" }}>FOR NAME SERVICES</h3>
                <p style={{ fontFamily: "'JetBrains Mono'", fontSize: "0.7rem", color: "#3D4A63", marginBottom: 20, letterSpacing: "0.06em",
                  opacity: hovRev === 0 ? 0.75 : 1, transition: "opacity 0.35s ease" }}>ENS, Space ID, SNS, etc.</p>
                {["Privacy upgrade for all existing sold domain names","20% commission on every privacy name upgrade","Additional 20% for affiliate/community promoters","Pricing adjustable per partner"].map((t, i) => (
                  <p key={i} style={{ ...bpt("#C9A84C"), color: hovRev === 0 ? "rgba(180,185,210,0.7)" : "rgba(160,170,195,0.5)", transition: "color 0.35s ease" }}><span style={bpdot("#C9A84C")} />{t}</p>
                ))}
              </div>
              <div
                onMouseEnter={() => setHovRev(1)} onMouseLeave={() => setHovRev(null)}
                style={{
                  borderRadius: 12, padding: 36, position: "relative", overflow: "hidden",
                  backdropFilter: "blur(12px)",
                  background: hovRev === 1
                    ? "linear-gradient(145deg, rgba(200,170,100,0.06) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
                    : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",
                  border: \`1px solid \${hovRev === 1 ? "rgba(200,170,100,0.25)" : "rgba(100,120,170,0.15)"}\`,
                  boxShadow: hovRev === 1
                    ? "0 0 40px rgba(200,170,100,0.08), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)"
                    : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",
                  transform: hovRev === 1 ? "translateY(-3px) scale(1.01)" : "translateY(0) scale(1)",
                  transition: "all 0.35s ease",
                }}>
                <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
                  background: \`linear-gradient(90deg, transparent, \${hovRev === 1 ? "rgba(200,170,100,0.4)" : "rgba(150,160,200,0.1)"}, transparent)\`,
                  transition: "background 0.35s ease" }}/>
                <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60,
                  background: \`radial-gradient(circle at top right, \${hovRev === 1 ? "rgba(200,170,100,0.06)" : "rgba(100,120,170,0.03)"}, transparent 70%)\`,
                  transition: "background 0.35s ease" }}/>
                <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: "1.3rem", letterSpacing: "0.06em", marginBottom: 20,
                  color: hovRev === 1 ? "#f0ece2" : "rgba(210,215,230,0.8)", transition: "color 0.35s ease" }}>FOR WALLETS</h3>
                {["Same 20% + 20% affiliate revenue share","Native Send-to-Name\u2122 enhances UX & retention","Free random names drive onboarding","Paid custom names drive revenue"].map((t, i) => (
                  <p key={i} style={{ ...bpt("#C9A84C"), color: hovRev === 1 ? "rgba(180,185,210,0.7)" : "rgba(160,170,195,0.5)", transition: "color 0.35s ease" }}><span style={bpdot("#C9A84C")} />{t}</p>
                ))}
              </div>
            </div>`;

src = src.slice(0, START) + NEW_CARDS + src.slice(END);
fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("Revenue stream cards patched");
