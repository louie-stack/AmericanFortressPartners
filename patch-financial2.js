const fs = require("fs");
const filePath = "src/App.jsx";
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

const FS_START = src.indexOf("// \u2500\u2500 FinancialSection");
const FS_END   = src.indexOf("\n\n// \u2500\u2500 NameResolver", FS_START);
if (FS_START === -1 || FS_END === -1) { console.error("markers not found"); process.exit(1); }
console.log("Replacing FinancialSection:", FS_START, "->", FS_END);

const NEW_FS = `// \u2500\u2500 FinancialSection \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

function SlotDigit({ target, active, delay, color, fontSize, addShadow }) {
  const [display,  setDisplay]  = useState(String(target));
  const [spinning, setSpinning] = useState(false);
  const [landed,   setLanded]   = useState(false);
  const timRef = useRef(null); const intRef = useRef(null);

  useEffect(() => {
    if (!active) { setDisplay(String(target)); setSpinning(false); setLanded(false); return; }
    timRef.current = setTimeout(() => {
      setSpinning(true);
      let tick = 0;
      const total = 15 + Math.floor(delay / 40);
      intRef.current = setInterval(() => {
        tick++;
        if (tick >= total) {
          clearInterval(intRef.current);
          setDisplay(String(target));
          setSpinning(false);
          setLanded(true);
        } else {
          setDisplay(String(Math.floor(Math.random() * 10)));
        }
      }, 50);
    }, delay);
    return () => { clearTimeout(timRef.current); clearInterval(intRef.current); };
  }, [active, target, delay]);

  return (
    <span style={{
      fontFamily: "'Bebas Neue',sans-serif", fontSize, color,
      lineHeight: 0.9, letterSpacing: "-1px", display: "inline-block",
      textShadow: addShadow && landed ? "0 0 40px rgba(200,170,100,0.2),0 0 80px rgba(200,170,100,0.08)" : "none",
      transform: spinning ? "scale(1.05)" : "scale(1)",
      filter: spinning ? "blur(0.5px)" : "none",
      transition: spinning ? "none" : "transform 0.2s ease, filter 0.2s ease, text-shadow 0.4s ease",
    }}>{display}</span>
  );
}

function SlotNumber({ digits, commas, active, color, fontSize, addShadow, digitDelay = 100, suffix, suffixColor }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 1 }}>
      {digits.map((d, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "flex-end" }}>
          {commas.includes(i) && (
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize, color, opacity: 0.3, lineHeight: 0.9, userSelect: "none" }}>,</span>
          )}
          <SlotDigit target={d} active={active} delay={i * digitDelay} color={color} fontSize={fontSize} addShadow={addShadow}/>
        </span>
      ))}
      {suffix && <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(20px,3.5vw,40px)", color: suffixColor, lineHeight: 0.9, paddingBottom: 4, marginLeft: 4 }}>{suffix}</span>}
    </span>
  );
}

function FinancialSection() {
  const sectionRef  = useRef(null);
  const hasPlayedRef = useRef(false);
  const timersRef   = useRef([]);
  const tickerRef   = useRef(null);

  const [phase,      setPhase]     = useState(0);
  const [shakePos,   setShakePos]  = useState({ x: 0, y: 0, tr: "none" });
  const [flash,      setFlash]     = useState(false);
  const [sw,         setSw]        = useState(false);   // shockwaves
  const [particles,  setParticles] = useState([]);
  const [impactNum,  setImpactNum] = useState(false);   // scale anim on $200K
  const [shimmer,    setShimmer]   = useState(false);
  const [underline,  setUnderline] = useState(false);
  const [glowPulse,  setGlowPulse] = useState(false);
  const [tickerVal,  setTickerVal] = useState(0);
  const [sub1Vis,    setSub1Vis]   = useState(false);
  const [divVis,     setDivVis]    = useState(false);
  const [labelVis,   setLabelVis]  = useState(false);
  const [affVis,     setAffVis]    = useState(false);
  const [ctaVis,     setCtaVis]    = useState(false);
  const [glowHot,    setGlowHot]   = useState(false);

  const t = (fn, ms) => { const id = setTimeout(fn, ms); timersRef.current.push(id); };

  const fireSequence = () => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    setPhase(1);

    t(() => { setPhase(2); setSub1Vis(true); setDivVis(true); }, 2200);

    t(() => { setPhase(3); setLabelVis(true); }, 3000);

    t(() => {
      setPhase(4);
      setGlowHot(true);
      setGlowPulse(true);

      // 1. Screen shake — transform translate, state-driven frames
      setShakePos({ x: -4, y: 3,   tr: "none" });
      t(() => setShakePos({ x: 2,  y: -1.5, tr: "none" }), 80);
      t(() => setShakePos({ x: 0,  y: 0,    tr: "transform 0.2s ease" }), 250);

      // 2. Flash
      setFlash(true);
      t(() => setFlash(false), 120);

      // 3. Impact scale on $200K
      setImpactNum(true);
      t(() => setImpactNum(false), 400);

      // 4. Shockwaves
      setSw(true);
      t(() => setSw(false), 1600);

      // 5. Particles — 32 total, mix dots/streaks
      const pts = Array.from({ length: 32 }, (_, i) => {
        const angle    = (i / 32) * Math.PI * 2;
        const dist     = 80 + Math.random() * 200;
        const tx       = Math.cos(angle) * dist;
        const ty       = Math.sin(angle) * dist;
        const size     = 3 + Math.random() * 5;
        const dur      = 0.6 + Math.random() * 0.8;
        const del      = Math.random() * 0.15;
        const isStreak = i % 2 === 0;
        const ci       = i % 3;
        const color    = ci === 0 ? "#c53030" : ci === 1 ? "#daa545" : "rgba(240,236,226,0.8)";
        const glow     = ci === 0 ? "rgba(197,48,48,0.6)" : ci === 1 ? "rgba(218,165,69,0.6)" : "rgba(240,236,226,0.4)";
        return { id: i, angle, tx, ty, size, dur, del, isStreak, color, glow };
      });
      setParticles(pts);
      t(() => setParticles([]), 1600);

      // 6. Shimmer sweep (0.3s after impact)
      t(() => { setShimmer(true); t(() => setShimmer(false), 1800); }, 300);

      // 7. Underline draw (0.2s after impact)
      t(() => setUnderline(true), 200);

      // 8. Affiliate line
      t(() => setAffVis(true), 200);

    }, 5200);

    t(() => {
      setPhase(5);
      setCtaVis(true);
      // Ticker: increment every 80ms by $20-100
      let total = 0;
      const run = () => {
        total += Math.floor(20 + Math.random() * 80);
        setTickerVal(total);
        tickerRef.current = setTimeout(run, 80);
      };
      tickerRef.current = setTimeout(run, 0);
    }, 6200);
  };

  const resetAll = () => {
    hasPlayedRef.current = false;
    timersRef.current.forEach(clearTimeout); timersRef.current = [];
    clearTimeout(tickerRef.current);
    setPhase(0); setShakePos({ x: 0, y: 0, tr: "none" });
    setFlash(false); setSw(false); setParticles([]); setImpactNum(false);
    setShimmer(false); setUnderline(false); setGlowPulse(false); setTickerVal(0);
    setSub1Vis(false); setDivVis(false); setLabelVis(false); setAffVis(false);
    setCtaVis(false); setGlowHot(false);
  };

  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) fireSequence(); else resetAll();
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => { obs.disconnect(); timersRef.current.forEach(clearTimeout); clearTimeout(tickerRef.current); };
  }, []);

  const D1M   = [1,0,0,0,0,0,0];
  const D200K = [2,0,0,0,0,0];
  const CM6   = [1,4];  // commas at position 1 and 4 → 1,000,000
  const CM5   = [1,4];  // 200,000

  return (
    <section ref={sectionRef} style={{
      background: "#0c1225", minHeight: "100vh",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "120px 5vw", position: "relative", overflow: "hidden",
      transform: \`translate(\${shakePos.x}px, \${shakePos.y}px)\`,
      transition: shakePos.tr,
    }}>
      <style>{\`
        @keyframes impactScale { 0%{transform:scale(1.15)} 50%{transform:scale(0.97)} 100%{transform:scale(1)} }
        @keyframes shockwaveRing {
          0%   { width:10px; height:10px; opacity:0.6; border-width:2px; }
          100% { width:500px; height:500px; opacity:0; border-width:0.5px; }
        }
        @keyframes burstOut {
          0%   { transform: translate(0,0) scale(1); opacity: 0.9; }
          100% { transform: translate(var(--tx),var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes goldSweep {
          0%   { left: -30%; }
          100% { left: 130%; }
        }
        @keyframes underlineDraw {
          0%   { width: 0; }
          100% { width: 100%; }
        }
        @keyframes glowPulseAnim {
          0%,100% { opacity: 0.3; }
          50%     { opacity: 0.7; }
        }
        @keyframes tickerPulse {
          0%,100% { opacity: 0.5; }
          50%     { opacity: 1; }
        }
        @keyframes tickerFadeIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
      \`}</style>

      {/* Flash — fixed viewport overlay */}
      {flash && <div style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(218,165,69,0.08)", pointerEvents:"none" }}/>}

      {/* Ambient background glow */}
      <div style={{
        position:"absolute", top:"45%", left:"50%", transform:"translate(-50%,-50%)",
        width:900, height:700, pointerEvents:"none",
        background:\`radial-gradient(ellipse, rgba(200,170,100,\${glowHot?"0.06":"0.02"}) 0%, transparent 55%)\`,
        transition:"background 0.5s ease",
      }}/>

      <Stars count={30} color="rgba(201,168,76,0.16)"/>

      <div style={{ position:"relative", zIndex:5, textAlign:"center", width:"100%", maxWidth:900 }}>

        {/* Header */}
        <div style={{ marginBottom:48 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:"#c53030",
            boxShadow:"0 0 10px rgba(197,48,48,0.5),0 0 30px rgba(197,48,48,0.15)",
            margin:"0 auto 20px" }}/>
          <div style={{ marginBottom:20 }}>
            <span style={G_LBL}><span style={G_DOT}/> Revenue Projections</span>
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(52px,8vw,100px)",
            letterSpacing:"0.02em", lineHeight:0.95, marginBottom:0 }}>
            <span style={{ color:"#E8D5B5" }}>The </span>
            <span style={{ color:"#C41E2A" }}>Financial Opportunity</span>
          </h2>
        </div>

        {/* $1,000,000 */}
        <div style={{ marginBottom:0 }}>
          <p style={{ fontFamily:"'JetBrains Mono'", fontSize:"0.65rem", letterSpacing:"0.2em",
            color:"#C9A84C", textTransform:"uppercase", marginBottom:20 }}>FORTRESSNAMES REVENUE</p>
          <div style={{ lineHeight:0.9 }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(60px,11vw,130px)", color:"#f0ece2", lineHeight:0.9, letterSpacing:"-1px" }}>$</span>
            <SlotNumber digits={D1M} commas={CM6} active={phase >= 1} color="#f0ece2"
              fontSize="clamp(60px,11vw,130px)" suffix="/mo" suffixColor="rgba(160,165,185,0.35)" digitDelay={100}/>
          </div>
          <p style={{ fontSize:"0.88rem", color:"#3D4A63", marginTop:12, fontFamily:"'Outfit'",
            opacity: sub1Vis ? 1 : 0, transform: sub1Vis ? "translateY(0)" : "translateY(8px)",
            transition:"opacity 0.5s ease, transform 0.5s ease" }}>
            100,000 names sold at $10/month
          </p>
        </div>

        {/* Divider — gradient lines + arrow */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, margin:"36px auto",
          opacity: divVis ? 1 : 0, transition:"opacity 0.5s ease" }}>
          <div style={{ flex:1, maxWidth:200, height:1, background:"linear-gradient(to right, transparent, rgba(200,170,100,0.2))" }}/>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="rgba(200,170,100,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5,7 10,13 15,7"/>
          </svg>
          <div style={{ flex:1, maxWidth:200, height:1, background:"linear-gradient(to left, transparent, rgba(200,170,100,0.2))" }}/>
        </div>

        {/* $200,000 block */}
        <div style={{ position:"relative" }}>
          <p style={{ fontFamily:"'JetBrains Mono'", fontSize:"0.65rem", letterSpacing:"0.2em",
            color:"#C9A84C", textTransform:"uppercase", marginBottom:20,
            opacity: labelVis ? 1 : 0, transform: labelVis ? "translateY(0)" : "translateY(8px)",
            transition:"opacity 0.3s ease, transform 0.3s ease" }}>YOUR 20% SHARE — RECURRING</p>

          {/* Pulsing glow behind $200K */}
          {glowPulse && (
            <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
              width:600, height:200, borderRadius:"50%", pointerEvents:"none", zIndex:0,
              background:"radial-gradient(ellipse, rgba(200,170,100,0.12) 0%, transparent 60%)",
              animation:"glowPulseAnim 2s ease-in-out infinite" }}/>
          )}

          {/* Shockwave rings */}
          {sw && [0, 0.2, 0.4].map((del, i) => (
            <div key={i} style={{
              position:"absolute", top:"50%", left:"50%", borderRadius:"50%",
              border:"2px solid rgba(218,165,69,0.5)", pointerEvents:"none", zIndex:10,
              animation:\`shockwaveRing 1.2s ease-out \${del}s forwards\`,
            }}/>
          ))}

          {/* Particles */}
          {particles.map(p => (
            <div key={p.id} style={{
              position:"absolute", top:"50%", left:"50%",
              width: p.isStreak ? p.size * 3 : p.size,
              height: p.size,
              borderRadius: p.isStreak ? 2 : "50%",
              background: p.color,
              boxShadow:\`0 0 \${p.size * 2}px \${p.glow}\`,
              pointerEvents:"none", zIndex:11,
              transform:"translate(0,0) scale(1)",
              ["--tx"]: \`\${p.tx}px\`,
              ["--ty"]: \`\${p.ty}px\`,
              rotate: p.isStreak ? \`\${(p.angle * 180 / Math.PI)}deg\` : "0deg",
              animation:\`burstOut \${p.dur}s ease-out \${p.del}s forwards\`,
              opacity: 0.9,
            }}/>
          ))}

          {/* Number + shimmer + underline */}
          <div style={{ position:"relative", display:"inline-block",
            animation: impactNum ? "impactScale 0.4s ease-out forwards" : "none",
            overflow:"hidden" }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(68px,13vw,155px)", color:"#daa545",
              lineHeight:0.9, letterSpacing:"-1px",
              textShadow: phase >= 4 ? "0 0 40px rgba(200,170,100,0.2),0 0 80px rgba(200,170,100,0.08)" : "none",
              transition:"text-shadow 0.4s ease" }}>$</span>
            <SlotNumber digits={D200K} commas={CM5} active={phase >= 3} color="#daa545"
              fontSize="clamp(68px,13vw,155px)" suffix="/mo" suffixColor="rgba(200,170,100,0.4)"
              addShadow digitDelay={120}/>
            {/* Shimmer sweep */}
            {shimmer && (
              <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", borderRadius:4 }}>
                <div style={{ position:"absolute", top:0, bottom:0, width:"30%",
                  background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)",
                  animation:"goldSweep 1.5s ease-in-out 0.3s forwards" }}/>
              </div>
            )}
          </div>

          {/* Underline draw */}
          <div style={{ maxWidth:"60%", margin:"8px auto 0", height:3,
            background:"linear-gradient(90deg,rgba(200,170,100,0.5),rgba(200,170,100,0.15))",
            width: underline ? "100%" : "0%",
            animation: underline ? "underlineDraw 0.6s ease-out 0.2s forwards" : "none",
            transition: underline ? "none" : "width 0.3s ease",
          }}/>

          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
            fontSize:"0.88rem", color:"#C41E2A", marginTop:20, opacity: affVis ? 0.7 : 0,
            transform: affVis ? "translateY(0)" : "translateY(8px)",
            transition:"opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s" }}>
            Plus affiliate commissions driving additional volume
          </p>
        </div>

        {/* Live ticker */}
        {phase >= 5 && (
          <div style={{ marginTop:40, animation:"tickerFadeIn 0.6s ease forwards" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10,
              padding:"10px 20px", borderRadius:8,
              background:"rgba(52,211,153,0.04)", border:"1px solid rgba(52,211,153,0.12)" }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#34D399",
                boxShadow:"0 0 8px rgba(52,211,153,0.6)", animation:"tickerPulse 1.2s ease-in-out infinite" }}/>
              <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:15,
                color:"rgba(100,200,120,0.7)", letterSpacing:"0.04em" }}>
                +\${tickerVal.toLocaleString()}
              </span>
              <span style={{ fontFamily:"'JetBrains Mono'", fontSize:"0.6rem",
                color:"rgba(52,211,153,0.4)", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                this session
              </span>
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop:40, opacity: ctaVis ? 1 : 0,
          transform: ctaVis ? "translateY(0)" : "translateY(12px)",
          transition:"opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" }}>
          <button style={{ fontFamily:"'JetBrains Mono'", fontSize:"0.72rem", letterSpacing:"0.1em",
            textTransform:"uppercase", padding:"14px 32px", background:"#C41E2A",
            color:"#fff", border:"none", borderRadius:4, cursor:"pointer" }}>
            Discuss Revenue Opportunity \u2197
          </button>
        </div>

      </div>
    </section>
  );
}`;

src = src.slice(0, FS_START) + NEW_FS + src.slice(FS_END);
fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("FinancialSection v2 done");
