const fs = require("fs");
const filePath = "src/App.jsx";
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

const BLOCK_START = src.indexOf("// \u2500\u2500 MoatSection");
const BLOCK_END   = src.indexOf("export default function AF()");
if (BLOCK_START === -1 || BLOCK_END === -1) { console.error("Markers not found"); process.exit(1); }

const NEW_MOAT = `// \u2500\u2500 MoatSection \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

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

// Card positions in SVG space (900x600 viewport, center 450,300)
const CARD_POSITIONS = [
  { x: -276, y: -175 },
  { x:    0, y: -175 },
  { x:  276, y: -175 },
  { x: -276, y:  175 },
  { x:    0, y:  175 },
  { x:  276, y:  175 },
];

function MoatRings() {
  const rings = [
    { size: 130, border: "1.5px solid rgba(197,48,48,0.2)",        shadow: "0 0 12px rgba(197,48,48,0.06), inset 0 0 12px rgba(197,48,48,0.04)", anim: null },
    { size: 320, border: "1px solid rgba(240,236,226,0.07)",        shadow: "0 0 15px rgba(240,236,226,0.02)",                                     anim: "ringBreath 7s ease-in-out infinite" },
    { size: 550, border: "1px solid rgba(70,110,180,0.08)",         shadow: "0 0 15px rgba(70,110,180,0.02)",                                      anim: null },
    { size: 700, border: "1px dashed rgba(100,110,150,0.05)",       shadow: null,                                                                  anim: "dashedSpin 180s linear infinite" },
  ];
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", zIndex: 0, pointerEvents: "none" }}>
      {rings.map((r, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: r.size, height: r.size, borderRadius: "50%",
          border: r.border, boxShadow: r.shadow || undefined,
          transform: "translate(-50%, -50%)",
          animation: r.anim || undefined,
        }}/>
      ))}
    </div>
  );
}

function MoatOrbitDots() {
  const orbits = [
    { size: 150, anim: "energyTrail1 8s linear infinite", dots: [
      { offset:  75, sz: 6, color: "#c53030",              shadow: "0 0 6px rgba(197,48,48,0.7), 0 0 16px rgba(197,48,48,0.3)" },
      { offset: -75, sz: 5, color: "#f0ece2",              shadow: "0 0 5px rgba(240,236,226,0.6), 0 0 14px rgba(240,236,226,0.2)" },
    ]},
    { size: 310, anim: "energyTrail2 12s linear infinite", dots: [
      { offset:  155, sz: 7, color: "#f0ece2",             shadow: "0 0 5px rgba(240,236,226,0.6), 0 0 14px rgba(240,236,226,0.2)" },
      { offset: -155, sz: 6, color: "rgba(80,120,200,0.9)",shadow: "0 0 6px rgba(80,120,200,0.6), 0 0 16px rgba(80,120,200,0.25)" },
    ]},
    { size: 500, anim: "energyTrail1 18s linear infinite", dots: [
      { offset:  250, sz: 5, color: "#c53030",             shadow: "0 0 6px rgba(197,48,48,0.7), 0 0 16px rgba(197,48,48,0.3)" },
      { offset: -250, sz: 4, color: "rgba(80,120,200,0.9)",shadow: "0 0 6px rgba(80,120,200,0.6), 0 0 16px rgba(80,120,200,0.25)" },
    ]},
  ];
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", zIndex: 0, pointerEvents: "none" }}>
      {orbits.map((orbit, oi) => (
        <div key={oi} style={{
          position: "absolute", top: "50%", left: "50%",
          width: orbit.size, height: orbit.size,
          animation: orbit.anim,
        }}>
          {orbit.dots.map((dot, di) => (
            <div key={di} style={{
              position: "absolute", top: "50%", left: "50%",
              transform: \`translate(calc(-50% + \${dot.offset}px), -50%)\`,
              width: dot.sz, height: dot.sz, borderRadius: "50%",
              background: dot.color, boxShadow: dot.shadow,
            }}/>
          ))}
        </div>
      ))}
    </div>
  );
}

function MoatPowerLines({ hoveredIndex, activated }) {
  const SX = 450; const SY = 300;
  return (
    <svg width="900" height="600" viewBox="0 0 900 600"
      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1, pointerEvents: "none", overflow: "visible" }}>
      {CARD_POSITIONS.map((pos, i) => {
        if (!activated.has(i)) return null;
        const isHov = hoveredIndex === i;
        const x1 = SX + pos.x; const y1 = SY + pos.y;
        const pathD = \`M \${x1} \${y1} L \${SX} \${SY}\`;
        return (
          <g key={i} style={{ transition: "opacity 0.4s ease" }}>
            {/* Glow layer */}
            <line x1={x1} y1={y1} x2={SX} y2={SY}
              stroke={isHov ? "rgba(200,170,100,0.25)" : "rgba(200,170,100,0.08)"}
              strokeWidth={isHov ? 4 : 2}
              style={{ filter: \`blur(\${isHov ? 3 : 2}px)\`, transition: "all 0.4s ease" }}/>
            {/* Main line */}
            <line x1={x1} y1={y1} x2={SX} y2={SY}
              stroke={isHov ? "rgba(200,170,100,0.5)" : "rgba(200,170,100,0.12)"}
              strokeWidth={isHov ? 1.5 : 0.8}
              strokeDasharray={isHov ? undefined : "4,6"}
              style={{ transition: "all 0.4s ease" }}/>
            {/* Node dot at card end */}
            <circle cx={x1} cy={y1} r={isHov ? 4 : 2.5}
              fill={isHov ? "#daa545" : "rgba(200,170,100,0.3)"}
              style={{ filter: isHov ? "drop-shadow(0 0 4px rgba(218,165,69,0.6))" : "none", transition: "all 0.4s ease" }}/>
            {/* Travelling energy dot — hovered only */}
            {isHov && (
              <circle r="3" fill="#daa545" style={{ filter: "drop-shadow(0 0 4px rgba(218,165,69,0.6))" }}>
                <animateMotion dur="1.5s" repeatCount="indefinite" path={pathD}/>
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function MoatCard({ label, desc, icon, delay, hov, onMouseEnter, onMouseLeave }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    ob.observe(el); return () => ob.disconnect();
  }, []);
  const iconColor = hov ? "#daa545" : "rgba(140,155,195,0.6)";
  return (
    <div ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
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
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: \`linear-gradient(90deg, transparent, \${hov ? "rgba(200,170,100,0.5)" : "rgba(150,160,200,0.1)"}, transparent)\`,
        transition: "background 0.35s ease" }}/>
      <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60,
        background: \`radial-gradient(circle at top right, \${hov ? "rgba(200,170,100,0.06)" : "rgba(100,120,170,0.03)"}, transparent 70%)\`,
        transition: "background 0.35s ease" }}/>
      <div style={{ width: 48, height: 48, borderRadius: 12, margin: "0 auto 18px",
        background: hov ? "rgba(200,170,100,0.08)" : "rgba(100,120,170,0.06)",
        border: \`1px solid \${hov ? "rgba(200,170,100,0.2)" : "rgba(100,120,170,0.1)"}\`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: hov ? "0 0 20px rgba(200,170,100,0.12)" : "none",
        transition: "all 0.35s ease" }}>
        {icon(iconColor)}
      </div>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: "1rem", letterSpacing: "0.06em", marginBottom: 10,
        color: hov ? "#f0ece2" : "rgba(210,215,230,0.8)", transition: "color 0.35s ease" }}>{label}</div>
      <div style={{ fontSize: "0.82rem", lineHeight: 1.6,
        color: hov ? "rgba(190,195,215,0.75)" : "rgba(160,170,195,0.5)", transition: "color 0.35s ease" }}>{desc}</div>
    </div>
  );
}

function AFShieldSVG() {
  return (
    <svg width="110" height="130" viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: "pulseCoreSVG 3s ease-in-out infinite" }}>
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

function MoatSection({ mR, mV }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activated,    setActivated]    = useState(() => new Set());

  const handleHover = (i) => {
    setHoveredIndex(i);
    setActivated(prev => { const s = new Set(prev); s.add(i); return s; });
  };
  const handleLeave = () => setHoveredIndex(null);

  return (
    <section ref={mR} style={{ ...G_FULL, position: "relative", overflow: "hidden", background: "linear-gradient(180deg,#0A1628,#0D172E,#0A1628)" }}>
      <Stars count={20} color="rgba(201,168,76,0.06)"/>
      <style>{\`
        @keyframes pulseCoreSVG {
          0%,100% { filter: drop-shadow(0 0 20px rgba(197,48,48,0.3)) drop-shadow(0 0 40px rgba(200,170,100,0.15)); }
          50%      { filter: drop-shadow(0 0 34px rgba(197,48,48,0.6)) drop-shadow(0 0 70px rgba(200,170,100,0.28)); }
        }
        @keyframes ringBreath {
          0%,100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }
        @keyframes dashedSpin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes energyTrail1 {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes energyTrail2 {
          from { transform: translate(-50%,-50%) rotate(360deg); }
          to   { transform: translate(-50%,-50%) rotate(0deg); }
        }
      \`}</style>

      <div className="msec" style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 48px", position: "relative", zIndex: 2, textAlign: "center" }}>

        {/* Header */}
        <div style={{ marginBottom: 0 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c53030",
            boxShadow: "0 0 10px rgba(197,48,48,0.5), 0 0 30px rgba(197,48,48,0.15)",
            margin: "0 auto 20px" }}/>
          <div style={{ marginBottom: 16 }}><span style={G_LBL}><span style={G_DOT}/> Why Partner With Us</span></div>
          <h2 style={{ ...G_MEGA("clamp(2.5rem,5.5vw,4.5rem)"), marginBottom: 64 }}>
            The Technology <span style={{ color: "#daa545" }}>Moat</span>
          </h2>
        </div>

        {/* Card grid + rings + shield */}
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          {/* Rings — centered on shield, behind everything */}
          <MoatRings/>
          {/* Orbit dots */}
          <MoatOrbitDots/>
          {/* Power lines SVG */}
          <MoatPowerLines hoveredIndex={hoveredIndex} activated={activated}/>

          {/* Top row — cards 0,1,2 */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 16, position: "relative", zIndex: 2 }}>
            {MOAT_CARDS_TOP.map((c, i) => (
              <MoatCard key={i} {...c} delay={0.1 + i * 0.08}
                hov={hoveredIndex === i}
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={handleLeave}/>
            ))}
          </div>

          {/* Center shield */}
          <div style={{ display: "flex", justifyContent: "center", padding: "36px 0", position: "relative", zIndex: 3 }}>
            <AFShieldSVG/>
          </div>

          {/* Bottom row — cards 3,4,5 */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 16, position: "relative", zIndex: 2 }}>
            {MOAT_CARDS_BOT.map((c, i) => (
              <MoatCard key={i} {...c} delay={0.3 + i * 0.08}
                hov={hoveredIndex === i + 3}
                onMouseEnter={() => handleHover(i + 3)}
                onMouseLeave={handleLeave}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

`;

src = src.slice(0, BLOCK_START) + NEW_MOAT + src.slice(BLOCK_END);
fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("MoatSection v2 patch applied");
