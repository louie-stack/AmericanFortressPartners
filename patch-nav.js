const fs = require("fs");
const CALENDLY = "https://calendly.com/jakub_zurawinski/intro-call?month=2026-03";

let src = fs.readFileSync("src/App.jsx", "utf8").replace(/\r\n/g, "\n");

// ── 1. Add CSS keyframe for logoGlow into the existing <style> block ──────────
// Find the first <style> tag inside the component and prepend the keyframe
const STYLE_ANCHOR = `@keyframes heroLineUp`;
const LOGO_GLOW_KF = `@keyframes logoGlow {
          0%,100% { filter: drop-shadow(0 0 4px rgba(197,48,48,0.15)); }
          50% { filter: drop-shadow(0 0 10px rgba(197,48,48,0.3)) drop-shadow(0 0 20px rgba(197,48,48,0.1)); }
        }
        `;
if (!src.includes("logoGlow")) {
  src = src.replace(STYLE_ANCHOR, LOGO_GLOW_KF + STYLE_ANCHOR);
  console.log("✅ logoGlow keyframe added");
} else {
  console.log("ℹ️  logoGlow already present");
}

// ── 2. Replace the nav block ──────────────────────────────────────────────────
const OLD_NAV = `        {/* NAV */}
        <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100, padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,22,40,0.88)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
          <AFLogo height={36} />
          <a href="https://calendly.com/jakub_zurawinski/intro-call?month=2026-03" target="_blank" rel="noopener noreferrer" style={{...btnR, textDecoration:"none"}}>Book a Call</a>
        </nav>`;

const NEW_NAV = `        {/* NAV */}
        <SiteNav />`;

if (!src.includes(OLD_NAV)) { console.error("❌ OLD_NAV not found"); process.exit(1); }
src = src.replace(OLD_NAV, NEW_NAV);
console.log("✅ Nav replaced with <SiteNav />");

// ── 3. Insert SiteNav component before export default function AF() ───────────
const EXPORT_ANCHOR = "export default function AF()";

const SITE_NAV = `
// ─── Site Nav ─────────────────────────────────────────────────────────────────
function SiteNav() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection,  setActiveSection]  = useState("");
  const [pillStyle,      setPillStyle]      = useState({ opacity: 0 });
  const [hovNav,         setHovNav]         = useState(null);
  const [hovBtn,         setHovBtn]         = useState(false);
  const navLinksRef = useRef(null);
  const linkRefs    = useRef({});

  const NAV_LINKS = [
    { label: "Problem",    href: "#exposed" },
    { label: "Solution",   href: "#fortressnames" },
    { label: "Comparison", href: "#comparison" },
    { label: "Revenue",    href: "#revenue" },
    { label: "Technology", href: "#moat" },
  ];

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const observers = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Sliding pill
  useEffect(() => {
    const updatePill = () => {
      const activeLink = linkRefs.current["#" + activeSection];
      const container  = navLinksRef.current;
      if (!activeLink || !container) { setPillStyle({ opacity: 0 }); return; }
      const cRect = container.getBoundingClientRect();
      const lRect = activeLink.getBoundingClientRect();
      setPillStyle({ left: lRect.left - cRect.left, width: lRect.width, opacity: 1 });
    };
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [activeSection]);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      height: 64, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 2.5vw",
      background: "rgba(12,18,37,0.85)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
    }}>
      {/* Bottom border glow */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 10%, rgba(100,110,150,0.1) 30%, rgba(200,170,100,0.06) 50%, rgba(100,110,150,0.1) 70%, transparent 90%)",
      }} />
      {/* Scroll progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, zIndex: 2,
        height: 2, width: scrollProgress * 100 + "%",
        background: "linear-gradient(90deg, #c53030 0%, #daa545 100%)",
        boxShadow: "0 0 8px rgba(200,170,100,0.3)",
        transition: "width 0.1s linear",
      }} />

      {/* Left: Logo */}
      <div style={{ animation: "logoGlow 4s ease-in-out infinite", flexShrink: 0 }}>
        <AFLogo height={36} />
      </div>

      {/* Center: Nav links */}
      <div ref={navLinksRef} style={{
        position: "absolute", left: "50%", transform: "translateX(-50%)",
        display: "flex", alignItems: "center", gap: 4,
      }}>
        {/* Sliding pill */}
        <div style={{
          position: "absolute", top: "50%", transform: "translateY(-50%)",
          height: 30, borderRadius: 8,
          background: "rgba(200,170,100,0.08)",
          border: "1px solid rgba(200,170,100,0.12)",
          pointerEvents: "none", zIndex: 1,
          transition: "left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
          ...pillStyle,
        }} />

        {NAV_LINKS.map((link, i) => {
          const isActive = activeSection === link.href.slice(1);
          return (
            <React.Fragment key={link.href}>
              <a
                ref={el => linkRefs.current[link.href] = el}
                href={link.href}
                onClick={e => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }); }}
                onMouseEnter={() => setHovNav(i)}
                onMouseLeave={() => setHovNav(null)}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fontWeight: 500,
                  letterSpacing: "2px", textTransform: "uppercase",
                  padding: "6px 12px", whiteSpace: "nowrap",
                  position: "relative", zIndex: 2, textDecoration: "none",
                  color: isActive ? "rgba(200,170,100,0.9)" : hovNav === i ? "rgba(200,170,100,0.7)" : "rgba(160,165,185,0.45)",
                  transition: "color 0.25s ease", cursor: "pointer",
                }}>
                {link.label}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(200,170,100,0.2)", flexShrink: 0 }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Right: Book a Call */}
      <a href="${CALENDLY}" target="_blank" rel="noopener noreferrer"
        onMouseEnter={() => setHovBtn(true)}
        onMouseLeave={() => setHovBtn(false)}
        style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
          letterSpacing: "1px", textTransform: "uppercase", color: "#fff",
          padding: "8px 22px", borderRadius: 8, textDecoration: "none",
          display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
          background: hovBtn ? "linear-gradient(135deg,#d64545 0%,#b83232 100%)" : "linear-gradient(135deg,#c53030 0%,#9b2424 100%)",
          boxShadow: hovBtn ? "0 4px 16px rgba(197,48,48,0.3)" : "0 2px 8px rgba(197,48,48,0.15)",
          transform: hovBtn ? "translateY(-1px)" : "none",
          transition: "all 0.2s ease",
        }}>
        Book a Call
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M7 7h10v10"/>
        </svg>
      </a>

      {/* Mobile: hide nav links */}
      <style>{\`
        @media (max-width: 768px) {
          .sitenav-links { display: none !important; }
          nav { height: 56px !important; padding: 0 16px !important; }
        }
      \`}</style>
    </nav>
  );
}

`;

src = src.replace(EXPORT_ANCHOR, SITE_NAV + EXPORT_ANCHOR);
console.log("✅ SiteNav component inserted");

// Also need React.Fragment — check if React is imported as namespace
// File uses named imports only, so use a workaround: import Fragment from React
// Actually React.Fragment requires React in scope. Let's use the JSX fragment shorthand <>
// Replace React.Fragment with just wrapping via <> in the component we just added
src = src.replace(/React\.Fragment/g, "React.Fragment"); // keep as-is, need React namespace

// Check if React is imported
if (!src.includes("import React") && !src.includes("import * as React")) {
  // Add React import at top
  src = src.replace(
    `import { useState, useEffect, useRef }`,
    `import React, { useState, useEffect, useRef }`
  );
  console.log("✅ Added React default import");
} else {
  console.log("ℹ️  React already imported");
}

fs.writeFileSync("src/App.jsx", src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ Nav patch complete");
