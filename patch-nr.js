const fs = require("fs");
const filePath = "src/App.jsx";
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

// --- NameResolver fix: remove full-widget fade, only fade content ---
const oldNR = `const phase      = time < NR_S0 ? "hex" : time < NR_S1 ? "scramble" : time < NR_S2 ? "resolved" : "fading";
  const isHex      = phase === "hex";
  const isScramble = phase === "scramble";
  const isResolved = phase === "resolved";
  const opacity    = phase === "fading" ? 0 : 1;
  const textColor  = isResolved ? "#f0ece2" : isScramble ? "rgba(200,170,100,0.7)" : "rgba(160,165,185,0.35)";

  return (
    <div style={{ opacity, transition: "opacity 0.5s ease" }}>
      <div style={{ height: 20, marginBottom: 10 }}>
        {isScramble && <span style={{ fontFamily:"'JetBrains Mono'", fontSize: 9, textTransform:"uppercase", letterSpacing:"3px", color:"rgba(200,170,100,0.85)" }}>\u25cf Resolving name...</span>}
        {isResolved && <span style={{ fontFamily:"'JetBrains Mono'", fontSize: 9, textTransform:"uppercase", letterSpacing:"3px", color:"#34D399" }}>\u2713 Identity verified \u2014 private transfer ready</span>}
      </div>
      <div style={{ position:"relative", display:"inline-flex", alignItems:"center", gap: 20 }}>
        {isResolved && <div style={{ position:"absolute", inset:"-40px -80px", background:"radial-gradient(ellipse,rgba(200,170,100,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />}
        <span style={{ fontFamily:"'JetBrains Mono'", fontSize:"clamp(12px,1.2vw,16px)", color:"#3D4A63", padding:"10px 18px", background:"rgba(196,30,42,0.04)", border:"1px solid rgba(196,30,42,0.12)", borderRadius:6, textDecoration: isHex ? "none" : "line-through", opacity: isHex ? 1 : 0.4 }}>0xA7c4...3F9b</span>
        <span style={{ fontSize:"1.5rem", color:"#C9A84C", opacity: isHex ? 0.3 : 1 }}>\u2192</span>
        <div style={{ position:"relative" }}>
          <span style={{ fontFamily:"'JetBrains Mono'", fontSize:"clamp(24px,3.5vw,40px)", fontWeight:500, color:textColor, letterSpacing: isResolved ? "3px" : "1px" }}>{text}</span>
          <div style={{ position:"absolute", bottom:4, left:0, height:2, width: isResolved ? "100%" : "0%", background:"linear-gradient(90deg,rgba(200,170,100,0.6),rgba(200,170,100,0.2))", transition:"width 0.5s ease" }} />
        </div>
      </div>
    </div>
  );
}`;

const newNR = `const phase      = time < NR_S0 ? "hex" : time < NR_S1 ? "scramble" : time < NR_S2 ? "resolved" : "fading";
  const isHex      = phase === "hex";
  const isScramble = phase === "scramble";
  const isResolved = phase === "resolved";
  const isFading   = phase === "fading";
  // Only the content fades — wrapper stays visible so widget never disappears
  const contentOp  = isFading ? Math.max(0, 1 - (time - NR_S2) / (NR_CYCLE - NR_S2)) : 1;
  const textColor  = isResolved ? "#f5ede0" : isScramble ? "rgba(201,168,76,0.95)" : isFading ? "rgba(130,135,155,0.5)" : "rgba(170,175,200,0.55)";

  return (
    <div>
      <div style={{ height: 22, marginBottom: 10, opacity: contentOp, transition: "opacity 0.3s" }}>
        {isScramble && <span style={{ fontFamily:"'JetBrains Mono'", fontSize: 9, textTransform:"uppercase", letterSpacing:"3px", color:"rgba(201,168,76,0.95)" }}>\u25cf Resolving name...</span>}
        {isResolved && <span style={{ fontFamily:"'JetBrains Mono'", fontSize: 9, textTransform:"uppercase", letterSpacing:"3px", color:"#34D399" }}>\u2713 Identity verified \u2014 private transfer ready</span>}
      </div>
      <div style={{ position:"relative", display:"inline-flex", alignItems:"center", gap: 20, opacity: contentOp, transition: "opacity 0.4s" }}>
        {isResolved && <div style={{ position:"absolute", inset:"-40px -80px", background:"radial-gradient(ellipse,rgba(201,168,76,0.14) 0%,transparent 70%)", pointerEvents:"none" }} />}
        <span style={{ fontFamily:"'JetBrains Mono'", fontSize:"clamp(12px,1.2vw,16px)", color: isHex ? "rgba(185,190,215,0.7)" : "rgba(100,110,150,0.4)", padding:"10px 18px", background: isHex ? "rgba(196,30,42,0.09)" : "rgba(196,30,42,0.03)", border:\`1px solid \${isHex ? "rgba(196,30,42,0.25)" : "rgba(196,30,42,0.08)"}\`, borderRadius:6, textDecoration: isHex ? "none" : "line-through" }}>0xA7c4...3F9b</span>
        <span style={{ fontSize:"1.5rem", color:"#C9A84C", opacity: isHex ? 0.45 : 1, transition:"opacity 0.3s" }}>\u2192</span>
        <div style={{ position:"relative" }}>
          <span style={{ fontFamily:"'JetBrains Mono'", fontSize:"clamp(24px,3.5vw,40px)", fontWeight:500, color:textColor, letterSpacing: isResolved ? "3px" : "1px", transition:"color 0.3s" }}>{text}</span>
          <div style={{ position:"absolute", bottom:4, left:0, height:2, width: isResolved ? "100%" : "0%", background:"linear-gradient(90deg,#C9A84C,rgba(201,168,76,0.2))", transition:"width 0.5s ease" }} />
        </div>
      </div>
    </div>
  );
}`;

if (!src.includes(oldNR)) {
  console.error("NameResolver old text NOT FOUND");
  process.exit(1);
}
src = src.replace(oldNR, newNR);

// --- FeatureChips: brighter labels, more prominent cards ---
const oldFC = `background: h ? "rgba(200,170,100,0.06)" : "rgba(100,110,150,0.04)", border:\`1px solid \${h ? "rgba(200,170,100,0.15)" : "rgba(100,110,150,0.08)"}\`, boxShadow: h ? "0 0 20px rgba(200,170,100,0.05)" : "none", transition:"background 0.25s ease,border-color 0.25s ease,box-shadow 0.25s ease", cursor:"default" }}>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:8, color: h ? "rgba(200,170,100,0.7)" : "rgba(200,170,100,0.4)", transition:"color 0.25s ease" }}>{c.label}</div>
            <div style={{ fontSize:13, lineHeight:1.5, color: h ? "rgba(200,210,230,0.7)" : "rgba(160,165,185,0.5)", transition:"color 0.25s ease" }}>{c.desc}</div>`;

const newFC = `background: h ? "rgba(201,168,76,0.1)" : "rgba(201,168,76,0.05)", border:\`1px solid \${h ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.14)"}\`, boxShadow: h ? "0 0 24px rgba(201,168,76,0.14), 0 0 48px rgba(201,168,76,0.05)" : "0 0 8px rgba(201,168,76,0.04)", transition:"background 0.25s ease,border-color 0.25s ease,box-shadow 0.25s ease", cursor:"default" }}>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:8, color: h ? "#C9A84C" : "rgba(201,168,76,0.7)", transition:"color 0.25s ease" }}>{c.label}</div>
            <div style={{ fontSize:13, lineHeight:1.5, color: h ? "rgba(220,225,240,0.9)" : "rgba(185,190,215,0.7)", transition:"color 0.25s ease" }}>{c.desc}</div>`;

if (!src.includes(oldFC)) {
  console.error("FeatureChips old text NOT FOUND");
  // show what's there
  const idx = src.indexOf("FeatureChips");
  console.log(JSON.stringify(src.substring(idx, idx+600)));
  process.exit(1);
}
src = src.replace(oldFC, newFC);

fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("All patches applied successfully");
