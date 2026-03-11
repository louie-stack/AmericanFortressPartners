const fs = require("fs");
const filePath = "src/App.jsx";
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

const OLD_START = `        {/* MOAT */}
        <section ref={mR} style={full}>
          <div className="msec" style={sec}>
            <div style={rv(mV, 0)}><span style={lbl}><span style={dot} /> Why Partner With Us</span></div>
            <h2 style={{ ...rv(mV, 0.12), ...mega("clamp(2.5rem,5.5vw,4.5rem)", 48) }}>The Technology <span style={{ color: "#C9A84C" }}>Moat</span></h2>
            <div className="mgrid3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {[
                { i: "\u{1F6E1}", t: "Patented Technology", d: "22 inventions protected. 1 granted, 1 allowed, 3 published, 2 pending." },
                { i: "\u26A1", t: "Zero Implementation Costs", d: "SDK integration for both custodial and non-custodial wallets. Full documentation and support." },
                { i: "\u{1F517}", t: "Multi-Chain Day 1", d: "Ethereum, Base, 0G, Litecoin, DASH at launch. More chains continuously." },
                { i: "\u{1F680}", t: "Early Adopters Onboard", d: "MetaMask, Litecoin Foundation, DASH, 0G, Base, Space ID (6.7M domains), Brinks." },
                { i: "\u{1F52C}", t: "Experienced Team", d: "Decades in fintech, cryptography & blockchain. Patent portfolio with PhD cryptographers." },
                { i: "\u2705", t: "Compliance-Ready", d: "Selective disclosure satisfies regulatory requirements. Not a mixer \u2014 clean, compliant privacy." },
              ].map((c, i) => (
                <div key={i} style={{ ...card, ...rv(mV, 0.2 + i * 0.1), cursor: "default" }}>
                  <div style={cardTop} />
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: 20 }}>{c.i}</div>
                  <h3 style={{ fontFamily: "'Bebas Neue'", fontSize: "1rem", letterSpacing: "0.06em", marginBottom: 8 }}>{c.t}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#7A8599", lineHeight: 1.55 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>`;

const NEW_MOAT = `        {/* MOAT */}
        <MoatSection mR={mR} mV={mV} />`;

if (!src.includes(OLD_START)) {
  console.error("MOAT old text NOT FOUND");
  // debug: show what's around the moat section
  const idx = src.indexOf("MOAT */}");
  console.log(JSON.stringify(src.substring(idx, idx + 200)));
  process.exit(1);
}
src = src.replace(OLD_START, NEW_MOAT);

// Now check global style constants used by MoatSection
// MoatSection is at module level so it can't use aliases from AF()
// It should use G_* globals or replicate what it needs
// Let's check what G_SEC etc look like
const hasGSEC = src.includes("const G_SEC");
const hasGFULL = src.includes("const G_FULL") || src.includes("G_FULL =");
console.log("G_SEC exists:", hasGSEC, "| G_FULL exists:", hasGFULL);

// Find the insert point (before export default)
const COMPONENT_INSERT_BEFORE = "export default function AF() {";

const MOAT_COMPONENT = `// \u2500\u2500 MoatSection \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

const MOAT_CARDS_TOP = [
  {
    label: "Patented Technology",
    desc: "22 inventions protected. 1 granted, 1 allowed, 3 published, 2 pending.",
    icon: (color) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2L4 5v5c0 3.5 2.5 6.5 6 7.5C14.5 16.5 17 13.5 17 10V5l-7-3z"/>
        <polyline points="7,10 9,12 13,8"/>
      </svg>
    ),
  },
  {
    label: "Zero Implementation Costs",
    desc: "SDK integration for both custodial and non-custodial wallets. Full documentation and support.",
    icon: (color) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13,2 13,8 17,8"/>
        <polyline points="7,18 7,12 3,12"/>
        <line x1="17" y1="2" x2="13" y2="8"/>
        <line x1="3" y1="18" x2="7" y2="12"/>
        <line x1="17" y1="8" x2="3" y2="12"/>
      </svg>
    ),
  },
  {
    label: "Multi-Chain Day 1",
    desc: "Ethereum, Base, 0G, Litecoin, DASH at launch. More chains continuously.",
    icon: (color) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="10" r="2"/>
        <circle cx="15" cy="5" r="2"/>
        <circle cx="15" cy="15" r="2"/>
        <line x1="7" y1="9" x2="13" y2="6"/>
        <line x1="7" y1="11" x2="13" y2="14"/>
      </svg>
    ),
  },
];

const MOAT_CARDS_BOT = [
  {
    label: "Early Adopters Onboard",
    desc: "MetaMask, Litecoin Foundation, DASH, 0G, Base, Space ID (6.7M domains), Brinks.",
    icon: (color) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l2.5 5.5h5.5L14 11l1.8 5.5L10 14l-5.8 2.5L6 11 2 7.5h5.5z"/>
      </svg>
    ),
  },
  {
    label: "Experienced Team",
    desc: "Decades in fintech, cryptography & blockchain. Patent portfolio with PhD cryptographers.",
    icon: (color) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3"/>
        <path d="M3 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
        <circle cx="15.5" cy="6" r="2"/>
        <path d="M17.5 15c0-2-1.2-3.7-3-4.5"/>
      </svg>
    ),
  },
  {
    label: "Compliance-Ready",
    desc: "Selective disclosure satisfies regulatory requirements. Not a mixer \u2014 clean, compliant privacy.",
    icon: (color) => (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="14" height="14" rx="3"/>
        <polyline points="7,10 9,12 13,8"/>
      </svg>
    ),
  },
];

function MoatCard({ label, desc, icon, delay }) {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    ob.observe(el); return () => ob.disconnect();
  }, []);

  const iconColor = hov ? "#daa545" : "rgba(140,155,195,0.6)";

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        flex: "1 1 0", maxWidth: 260, borderRadius: 12, padding: "26px 22px", textAlign: "center",
        backdropFilter: "blur(12px)", overflow: "hidden", position: "relative", cursor: "default",
        background: hov
          ? "linear-gradient(145deg, rgba(200,170,100,0.08) 0%, rgba(20,32,60,0.9) 40%, rgba(14,22,45,0.95) 100%)"
          : "linear-gradient(145deg, rgba(25,38,68,0.8) 0%, rgba(16,26,48,0.9) 50%, rgba(12,20,40,0.95) 100%)",
        border: \`1px solid \${hov ? "rgba(200,170,100,0.3)" : "rgba(100,120,170,0.15)"}\`,
        boxShadow: hov
          ? "0 0 40px rgba(200,170,100,0.1), 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)"
          : "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)",
        transform: vis ? (hov ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)") : "translateY(20px)",
        opacity: vis ? 1 : 0,
        transition: \`all 0.35s ease \${vis ? delay : 0}s\`,
      }}>
      {/* Top edge highlight */}
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: \`linear-gradient(90deg, transparent, \${hov ? "rgba(200,170,100,0.5)" : "rgba(150,160,200,0.1)"}, transparent)\`,
        transition: "background 0.35s ease" }} />
      {/* Corner accent */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60,
        background: \`radial-gradient(circle at top right, \${hov ? "rgba(200,170,100,0.06)" : "rgba(100,120,170,0.03)"}, transparent 70%)\`,
        transition: "background 0.35s ease" }} />
      {/* Icon */}
      <div style={{ width: 48, height: 48, borderRadius: 12, margin: "0 auto 18px",
        background: hov ? "rgba(200,170,100,0.08)" : "rgba(100,120,170,0.06)",
        border: \`1px solid \${hov ? "rgba(200,170,100,0.2)" : "rgba(100,120,170,0.1)"}\`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hov ? "0 0 20px rgba(200,170,100,0.12)" : "none",
        transition: "all 0.35s ease" }}>
        {icon(iconColor)}
      </div>
      {/* Label */}
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: "1rem", letterSpacing: "0.06em", marginBottom: 10,
        color: hov ? "#f0ece2" : "rgba(210,215,230,0.8)", transition: "color 0.35s ease" }}>{label}</div>
      {/* Desc */}
      <div style={{ fontSize: "0.82rem", lineHeight: 1.6,
        color: hov ? "rgba(190,195,215,0.75)" : "rgba(160,170,195,0.5)", transition: "color 0.35s ease" }}>{desc}</div>
    </div>
  );
}

function AFShieldSVG() {
  return (
    <svg width="110" height="130" viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 0 20px rgba(197,48,48,0.3)) drop-shadow(0 0 40px rgba(200,170,100,0.15))", animation: "pulseCoreSVG 3s ease-in-out infinite" }}>
      <path d="M55 6L8 25v36c0 27 19 50 47 61C83 111 102 88 102 61V25L55 6z"
        fill="rgba(10,18,36,0.95)" stroke="rgba(196,30,42,0.75)" strokeWidth="1.5"/>
      <path d="M55 16L20 31v30c0 22 15 40 35 49C70 101 90 83 90 61V31L55 16z"
        fill="none" stroke="rgba(200,170,100,0.18)" strokeWidth="1"/>
      <text x="55" y="74" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="36"
        fill="#C9A84C" letterSpacing="2">AF</text>
      <rect x="28" y="83" width="54" height="2" rx="1" fill="rgba(196,30,42,0.55)"/>
    </svg>
  );
}

function ConcentricRings() {
  const [tick, setTick] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  useEffect(() => {
    const run = (ts) => {
      if (!startRef.current) startRef.current = ts;
      setTick(ts - startRef.current);
      rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const t = tick / 1000;
  const rings = [
    { rx: 110, ry: 96,  strokeOp: 0.1,  dash: "none",  speed: 0 },
    { rx: 175, ry: 154, strokeOp: 0.07, dash: "5 10",  speed: 0.12 },
    { rx: 245, ry: 215, strokeOp: 0.05, dash: "3 14",  speed: -0.08 },
    { rx: 330, ry: 290, strokeOp: 0.03, dash: "7 18",  speed: 0.05 },
  ];
  const dots = [
    { ri: 1, a0: 0,   spd: 0.45,   sz: 4,   col: "rgba(197,48,48,0.85)" },
    { ri: 1, a0: 180, spd: 0.45,   sz: 3,   col: "rgba(200,170,100,0.7)" },
    { ri: 2, a0: 90,  spd: -0.28,  sz: 3.5, col: "rgba(197,48,48,0.6)" },
    { ri: 2, a0: 270, spd: -0.28,  sz: 2.5, col: "rgba(200,170,100,0.55)" },
    { ri: 3, a0: 45,  spd: 0.16,   sz: 3,   col: "rgba(100,120,200,0.5)" },
    { ri: 3, a0: 225, spd: 0.16,   sz: 2.5, col: "rgba(197,48,48,0.4)" },
  ];
  const cx = 450; const cy = 380;

  return (
    <svg width="100%" height="100%" viewBox="0 0 900 760"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <defs>
        <radialGradient id="moatGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(197,48,48,0.06)"/>
          <stop offset="100%" stopColor="rgba(10,22,40,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={340} ry={310} fill="url(#moatGlow)"/>
      {rings.map((rng, i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rng.rx} ry={rng.ry}
          fill="none" stroke="rgba(100,120,170,1)" strokeWidth="1"
          opacity={rng.strokeOp} strokeDasharray={rng.dash === "none" ? undefined : rng.dash}
          strokeDashoffset={rng.speed !== 0 ? (t * rng.speed * 80) % 100 : 0}/>
      ))}
      {dots.map((d, i) => {
        const rng = rings[d.ri];
        const angle = (d.a0 * Math.PI / 180) + t * d.spd;
        const x = cx + rng.rx * Math.cos(angle);
        const y = cy + rng.ry * Math.sin(angle);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={d.sz * 2.2} fill={d.col} opacity={0.12}/>
            <circle cx={x} cy={y} r={d.sz} fill={d.col}/>
          </g>
        );
      })}
    </svg>
  );
}

function MoatSection({ mR, mV }) {
  const sec2  = { padding: "100px 48px", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" };
  const lbl2  = G_LBL;
  const dot2  = G_DOT;

  return (
    <section ref={mR} style={{ ...G_FULL, position: "relative", overflow: "hidden", background: "linear-gradient(180deg,#0A1628,#0D172E,#0A1628)" }}>
      <Stars count={20} color="rgba(201,168,76,0.06)"/>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}><ConcentricRings/></div>
      <style>{\`
        @keyframes pulseCoreSVG {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(197,48,48,0.3)) drop-shadow(0 0 40px rgba(200,170,100,0.15)); }
          50%       { filter: drop-shadow(0 0 34px rgba(197,48,48,0.6)) drop-shadow(0 0 70px rgba(200,170,100,0.28)); }
        }
      \`}</style>

      <div className="msec" style={sec2}>
        {/* Header */}
        <div style={{ marginBottom: 0 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c53030",
            boxShadow: "0 0 10px rgba(197,48,48,0.5), 0 0 30px rgba(197,48,48,0.15)",
            margin: "0 auto 20px" }} />
          <div style={{ marginBottom: 16 }}><span style={lbl2}><span style={dot2}/> Why Partner With Us</span></div>
          <h2 style={{ ...G_MEGA("clamp(2.5rem,5.5vw,4.5rem)"), marginBottom: 64 }}>
            The Technology <span style={{ color: "#daa545" }}>Moat</span>
          </h2>
        </div>

        {/* Card grid + shield */}
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          {/* Top row */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 16, position: "relative", zIndex: 2 }}>
            {MOAT_CARDS_TOP.map((c, i) => <MoatCard key={i} {...c} delay={0.1 + i * 0.08}/>)}
          </div>
          {/* Center shield */}
          <div style={{ display: "flex", justifyContent: "center", padding: "36px 0", position: "relative", zIndex: 3 }}>
            <AFShieldSVG/>
          </div>
          {/* Bottom row */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 16, position: "relative", zIndex: 2 }}>
            {MOAT_CARDS_BOT.map((c, i) => <MoatCard key={i} {...c} delay={0.3 + i * 0.08}/>)}
          </div>
        </div>
      </div>
    </section>
  );
}

`;

if (!src.includes(COMPONENT_INSERT_BEFORE)) {
  console.error("Insert point 'export default function AF()' NOT FOUND");
  process.exit(1);
}
src = src.replace(COMPONENT_INSERT_BEFORE, MOAT_COMPONENT + COMPONENT_INSERT_BEFORE);

fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("MoatSection patch applied successfully");
