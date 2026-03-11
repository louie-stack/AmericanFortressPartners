const fs = require("fs");
const filePath = "src/App.jsx";
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

// Find and replace the FinancialSection block
const FS_START = src.indexOf("// \u2500\u2500 FinancialSection");
const FS_END   = src.indexOf("\n\n// \u2500\u2500 NameResolver", FS_START);
if (FS_START === -1 || FS_END === -1) { console.error("FinancialSection markers not found"); process.exit(1); }
console.log("FinancialSection block:", FS_START, "->", FS_END);

const NEW_FS = `// \u2500\u2500 FinancialSection \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

// Single rolling digit
function SlotDigit({ target, active, delay, color, fontSize, shadow }) {
  const [display, setDisplay] = useState(target);
  const [spinning, setSpinning] = useState(false);
  const [landed,   setLanded]   = useState(false);
  const timerRef   = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!active) { setDisplay(target); setSpinning(false); setLanded(false); return; }
    const totalTicks = 15 + Math.floor(delay / 40);
    timerRef.current = setTimeout(() => {
      setSpinning(true);
      let tick = 0;
      intervalRef.current = setInterval(() => {
        tick++;
        if (tick >= totalTicks) {
          clearInterval(intervalRef.current);
          setDisplay(target);
          setSpinning(false);
          setLanded(true);
        } else {
          setDisplay(Math.floor(Math.random() * 10));
        }
      }, 50);
    }, delay);
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(intervalRef.current);
    };
  }, [active, target, delay]);

  return (
    <span style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize,
      color,
      lineHeight: 0.9,
      letterSpacing: "-1px",
      display: "inline-block",
      textShadow: landed && shadow ? shadow : "none",
      transform: spinning ? "scale(1.05)" : "scale(1)",
      filter: spinning ? "blur(0.5px)" : "none",
      transition: spinning ? "none" : "transform 0.2s ease, filter 0.2s ease, text-shadow 0.4s ease",
    }}>{display}</span>
  );
}

// Comma separator
function Comma({ color }) {
  return (
    <span style={{
      fontFamily: "'Bebas Neue', sans-serif",
      color,
      opacity: 0.3,
      lineHeight: 0.9,
      letterSpacing: "-1px",
      userSelect: "none",
    }}>,</span>
  );
}

// Slot machine number — takes digits array like [1,0,0,0,0,0,0]
function SlotNumber({ digits, commaPositions, active, color, fontSize, suffix, suffixColor, shadow, digitDelay = 100 }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "flex-end", gap: 1 }}>
      {digits.map((d, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "flex-end" }}>
          {commaPositions.includes(i) && <Comma color={color}/>}
          <SlotDigit
            target={d} active={active} delay={i * digitDelay}
            color={color} fontSize={fontSize} shadow={shadow}
          />
        </span>
      ))}
      {suffix && (
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(20px, 3.5vw, 40px)",
          color: suffixColor, lineHeight: 0.9, paddingBottom: 4, marginLeft: 4,
        }}>{suffix}</span>
      )}
    </div>
  );
}

// Impact particle
function ImpactParticle({ x, y, color, angle, speed, size }) {
  const [pos, setPos] = useState({ x, y, opacity: 1 });
  const startRef = useRef(null);
  const rafRef   = useRef(null);

  useEffect(() => {
    const run = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const t = (ts - startRef.current) / 800;
      if (t >= 1) { setPos(p => ({ ...p, opacity: 0 })); return; }
      const ease = 1 - t * t;
      setPos({
        x: x + Math.cos(angle) * speed * t * 80,
        y: y + Math.sin(angle) * speed * t * 80 + t * t * 30,
        opacity: 1 - t,
      });
      rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{
      position: "absolute", left: pos.x, top: pos.y,
      width: size, height: size, borderRadius: "50%",
      background: color, opacity: pos.opacity,
      pointerEvents: "none", transform: "translate(-50%,-50%)",
      boxShadow: \`0 0 \${size * 2}px \${color}\`,
    }}/>
  );
}

function FinancialSection() {
  const sectionRef = useRef(null);
  // Phase state
  const [phase, setPhase] = useState(0); // 0=idle, 1=rolling1M, 2=landed1M, 3=rolling200K, 4=impact, 5=ticker
  const hasPlayedRef = useRef(false);
  // Screen shake
  const [shake, setShake] = useState(false);
  // Flash
  const [flash, setFlash] = useState(false);
  // Shockwave
  const [shockwave, setShockwave] = useState(false);
  // Shimmer (underline sweep)
  const [shimmer, setShimmer] = useState(false);
  // Particles
  const [particles, setParticles] = useState([]);
  // Ambient glow
  const [glowHot, setGlowHot] = useState(false);
  // Live ticker
  const [tickerVal, setTickerVal] = useState(0);
  const tickerRef = useRef(null);
  // CTA visible
  const [ctaVis, setCtaVis] = useState(false);
  // 200K underline
  const [underline, setUnderline] = useState(false);
  // Subtitle / divider / label
  const [sub1Vis,   setSub1Vis]   = useState(false);
  const [divVis,    setDivVis]    = useState(false);
  const [labelVis,  setLabelVis]  = useState(false);

  const timersRef = useRef([]);
  const addTimer = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  const fireSequence = () => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    // Phase 1 — $1M rolls (0ms)
    setPhase(1);

    // Phase 2 — $1M landed (2200ms)
    addTimer(() => {
      setPhase(2);
      setSub1Vis(true);
      setDivVis(true);
    }, 2200);

    // Phase 3 — $200K rolls (3000ms)
    addTimer(() => {
      setPhase(3);
      setLabelVis(true);
    }, 3000);

    // Phase 4 — IMPACT (5200ms)
    addTimer(() => {
      setPhase(4);
      setGlowHot(true);
      setFlash(true);
      setShockwave(true);
      setShake(true);
      setUnderline(true);
      // Generate particles
      const pts = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: "50%", y: "62%",
        color: i % 3 === 0 ? "rgba(197,48,48,0.8)" : i % 3 === 1 ? "#daa545" : "rgba(240,236,226,0.6)",
        angle: (i / 18) * Math.PI * 2,
        speed: 0.6 + Math.random() * 0.8,
        size: 3 + Math.random() * 4,
      }));
      setParticles(pts);
      addTimer(() => setFlash(false), 120);
      addTimer(() => setShockwave(false), 700);
      addTimer(() => setShake(false), 500);
      addTimer(() => setShimmer(true), 200);
      addTimer(() => setShimmer(false), 900);
      addTimer(() => setParticles([]), 900);
    }, 5200);

    // Phase 5 — ticker + CTA (6200ms)
    addTimer(() => {
      setPhase(5);
      setCtaVis(true);
      // Ticker: count from 0 to 200000 over 4s, then keep climbing slowly
      const TARGET = 200000;
      const DUR = 4000;
      const startT = performance.now();
      const run = (now) => {
        const t = Math.min(1, (now - startT) / DUR);
        const ease = 1 - Math.pow(1 - t, 3);
        setTickerVal(Math.round(ease * TARGET));
        if (t < 1) tickerRef.current = requestAnimationFrame(run);
        else {
          // After reaching target, keep a slow climb
          let extra = 0;
          const drift = () => {
            extra += Math.floor(Math.random() * 3);
            setTickerVal(TARGET + extra);
            tickerRef.current = setTimeout(drift, 800 + Math.random() * 400);
          };
          tickerRef.current = setTimeout(drift, 1200);
        }
      };
      tickerRef.current = requestAnimationFrame(run);
    }, 6200);
  };

  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        fireSequence();
      } else {
        // Reset on leave
        hasPlayedRef.current = false;
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
        cancelAnimationFrame(tickerRef.current);
        clearTimeout(tickerRef.current);
        setPhase(0); setFlash(false); setShockwave(false); setShake(false);
        setShimmer(false); setParticles([]); setGlowHot(false); setTickerVal(0);
        setCtaVis(false); setUnderline(false); setSub1Vis(false); setDivVis(false); setLabelVis(false);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => { obs.disconnect(); timersRef.current.forEach(clearTimeout); cancelAnimationFrame(tickerRef.current); clearTimeout(tickerRef.current); };
  }, []);

  const FM_DIGITS   = [1,0,0,0,0,0,0];
  const FM_COMMAS   = [1, 4]; // commas before index 1 and 4 -> 1,000,000
  const S200_DIGITS = [2,0,0,0,0,0];
  const S200_COMMAS = [1, 4]; // 200,000

  const active1M   = phase >= 1;
  const active200K = phase >= 3;
  const landed200K = phase >= 4;

  return (
    <section ref={sectionRef} style={{
      background: "#0c1225", minHeight: "100vh",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "120px 5vw", position: "relative", overflow: "hidden",
    }}>
      <style>{\`
        @keyframes shockwaveRing {
          0%   { transform: translate(-50%,-50%) scale(0.2); opacity: 0.9; }
          100% { transform: translate(-50%,-50%) scale(3.5); opacity: 0; }
        }
        @keyframes finShake {
          0%,100% { transform: translateX(0); }
          15%     { transform: translateX(-6px); }
          30%     { transform: translateX(6px); }
          45%     { transform: translateX(-4px); }
          60%     { transform: translateX(4px); }
          75%     { transform: translateX(-2px); }
          90%     { transform: translateX(2px); }
        }
        @keyframes shimmerSweep {
          0%   { left: -100%; opacity: 0.8; }
          60%  { left: 130%;  opacity: 0.8; }
          100% { left: 130%;  opacity: 0; }
        }
        @keyframes tickerBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
      \`}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)",
        width: 900, height: 700, pointerEvents: "none",
        background: \`radial-gradient(ellipse, rgba(200,170,100,\${glowHot ? "0.06" : "0.02"}) 0%, transparent 55%)\`,
        transition: "background 0.5s ease",
      }}/>

      {/* Stars */}
      <Stars count={30} color="rgba(201,168,76,0.16)"/>

      {/* Flash overlay */}
      {flash && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(218,165,69,0.12)", zIndex: 20, pointerEvents: "none" }}/>
      )}

      {/* Shockwave ring */}
      {shockwave && (
        <div style={{
          position: "absolute", top: "62%", left: "50%",
          width: 200, height: 200, borderRadius: "50%",
          border: "2px solid rgba(218,165,69,0.7)",
          boxShadow: "0 0 20px rgba(218,165,69,0.4)",
          pointerEvents: "none", zIndex: 15,
          animation: "shockwaveRing 0.7s ease-out forwards",
        }}/>
      )}

      {/* Particles */}
      {particles.map(p => <ImpactParticle key={p.id} {...p}/>)}

      {/* Content — shakes on impact */}
      <div style={{
        position: "relative", zIndex: 5, textAlign: "center", width: "100%", maxWidth: 900,
        animation: shake ? "finShake 0.5s ease-out" : "none",
      }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c53030",
            boxShadow: "0 0 10px rgba(197,48,48,0.5), 0 0 30px rgba(197,48,48,0.15)",
            margin: "0 auto 20px" }}/>
          <div style={{ marginBottom: 20 }}>
            <span style={G_LBL}><span style={G_DOT}/> Revenue Projections</span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 8vw, 100px)",
            letterSpacing: "0.02em", lineHeight: 0.95, marginBottom: 0 }}>
            <span style={{ color: "#E8D5B5" }}>The </span>
            <span style={{ color: "#C41E2A" }}>Financial Opportunity</span>
          </h2>
        </div>

        {/* $1,000,000 block */}
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontFamily: "'JetBrains Mono'", fontSize: "0.65rem", letterSpacing: "0.2em",
            color: "#C9A84C", textTransform: "uppercase", marginBottom: 20 }}>FORTRESSNAMES REVENUE</p>
          <div style={{ lineHeight: 0.9 }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(60px, 11vw, 130px)", color: "#f0ece2", lineHeight: 0.9, letterSpacing: "-1px" }}>$</span>
            <SlotNumber
              digits={FM_DIGITS} commaPositions={FM_COMMAS}
              active={active1M} color="#f0ece2"
              fontSize="clamp(60px, 11vw, 130px)"
              suffix="/mo" suffixColor="rgba(160,165,185,0.35)"
              digitDelay={100}
            />
          </div>
          <p style={{ fontSize: "0.88rem", color: "#3D4A63", marginTop: 12, fontFamily: "'Outfit'",
            opacity: sub1Vis ? 1 : 0, transform: sub1Vis ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease" }}>
            100,000 names sold at $10/month
          </p>
        </div>

        {/* Divider */}
        <div style={{
          width: divVis ? 60 : 0, height: 1, background: "rgba(201,168,76,0.15)",
          margin: "36px auto", transition: "width 0.6s ease",
        }}/>

        {/* $200,000 block */}
        <div style={{ position: "relative" }}>
          <p style={{ fontFamily: "'JetBrains Mono'", fontSize: "0.65rem", letterSpacing: "0.2em",
            color: "#C9A84C", textTransform: "uppercase", marginBottom: 20,
            opacity: labelVis ? 1 : 0, transform: labelVis ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease" }}>YOUR 20% SHARE — RECURRING</p>
          <div style={{ position: "relative", display: "inline-block", lineHeight: 0.9 }}>
            <span style={{ fontFamily: "'Bebas Neue'", fontSize: "clamp(68px, 13vw, 155px)", color: "#daa545", lineHeight: 0.9, letterSpacing: "-1px",
              textShadow: landed200K ? "0 0 40px rgba(200,170,100,0.2), 0 0 80px rgba(200,170,100,0.08)" : "none" }}>$</span>
            <SlotNumber
              digits={S200_DIGITS} commaPositions={S200_COMMAS}
              active={active200K} color="#daa545"
              fontSize="clamp(68px, 13vw, 155px)"
              suffix="/mo" suffixColor="rgba(200,170,100,0.4)"
              shadow="0 0 40px rgba(200,170,100,0.2), 0 0 80px rgba(200,170,100,0.08)"
              digitDelay={120}
            />
            {/* Shimmer sweep */}
            {shimmer && (
              <div style={{
                position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
                borderRadius: 4,
              }}>
                <div style={{
                  position: "absolute", top: 0, bottom: 0, width: "40%",
                  background: "linear-gradient(90deg, transparent, rgba(218,165,69,0.25), transparent)",
                  animation: "shimmerSweep 0.7s ease-out forwards",
                }}/>
              </div>
            )}
            {/* Gold underline */}
            <div style={{
              position: "absolute", bottom: -6, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, transparent, #daa545, transparent)",
              opacity: underline ? 1 : 0,
              transform: underline ? "scaleX(1)" : "scaleX(0)",
              transition: "opacity 0.3s ease, transform 0.4s ease",
              transformOrigin: "center",
            }}/>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: "0.88rem", color: "#C41E2A", marginTop: 20, opacity: 0.7 }}>
            Plus affiliate commissions driving additional volume
          </p>
        </div>

        {/* Live ticker */}
        {phase >= 5 && (
          <div style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399",
              boxShadow: "0 0 8px rgba(52,211,153,0.6)", animation: "tickerBlink 1.2s ease-in-out infinite" }}/>
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: "0.72rem", color: "rgba(52,211,153,0.8)",
              letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Live \u2014 Your share this month: <strong style={{ color: "#34D399" }}>\${tickerVal.toLocaleString()}</strong>
            </span>
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: 48, opacity: ctaVis ? 1 : 0,
          transform: ctaVis ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <button style={{ fontFamily: "'JetBrains Mono'", fontSize: "0.72rem", letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "14px 32px", background: "#C41E2A",
            color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
            Discuss Revenue Opportunity \u2197
          </button>
        </div>

      </div>
    </section>
  );
}`;

src = src.slice(0, FS_START) + NEW_FS + src.slice(FS_END);
fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("FinancialSection rebuilt");
