/**
 * patch-brand5b.js — Fix the skipped items from patch-brand5.js
 */

const fs = require("fs");
const path = require("path");

const r = (src, from, to, label) => {
  if (!src.includes(from)) {
    console.log(`  (skip) ${label || from.slice(0,60).replace(/\n/g,"↵")}`);
    return src;
  }
  const n = src.split(from).length - 1;
  console.log(`✓ (×${n}) ${label}`);
  return src.split(from).join(to);
};

const APP = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(APP, "utf8").replace(/\r\n/g, "\n");

// 1. Stripe[1]: Hero→Exposed (unique context found)
src = r(src,
  `        </section>

        <Stripe />

        {/* PROBLEM */}
        <section id="exposed"`,
  `        </section>

        <Stripe brush="/images/brush-beige.svg" />

        {/* PROBLEM */}
        <section id="exposed"`,
  "Stripe[1]: Hero→Exposed → beige"
);

// 2. Stripe[9]: Moat→Trusted
src = r(src,
  `        <div id="moat"><MoatSection mR={mR} mV={mV} /></div>

        <Stripe />

        {/* TRUSTED BY */}`,
  `        <div id="moat"><MoatSection mR={mR} mV={mV} /></div>

        <Stripe brush="/images/brush-navy.svg" />

        {/* TRUSTED BY */}`,
  "Stripe[9]: Moat→Trusted → navy"
);

// 3. Trusted → CTA (check context again)
const trustedClose = `        </section>

        <Stripe />

        <div id="contact">`;
if (src.includes(trustedClose)) {
  src = src.split(trustedClose).join(
    `        </section>

        <Stripe brush="/images/brush-red.svg" />

        <div id="contact">`
  );
  console.log("✓ Stripe[10]: Trusted→CTA → red");
} else {
  // Try alternate
  const alt = `</section>\n\n        <Stripe />\n\n        <div id="contact">`;
  if (src.includes(alt)) {
    src = src.split(alt).join(`</section>\n\n        <Stripe brush="/images/brush-red.svg" />\n\n        <div id="contact">`);
    console.log("✓ Stripe[10] via alt: Trusted→CTA → red");
  } else {
    console.log("  (skip) Stripe[10] — context not found, checking manually");
  }
}

// 4. Revenue dot-pattern: the section uses style={full}
src = r(src,
  `        <section id="revenue" ref={rR2} style={full}>
          <div className="msec" style={sec}>`,
  `        <section id="revenue" ref={rR2} style={{ ...full, position:"relative", overflow:"hidden" }}>
          <div className="dot-pattern" style={{ right:"-100px", bottom:"-60px", opacity:0.4 }} />
          <div className="msec" style={sec}>`,
  "dot-pattern added to Revenue section"
);

// 5. Typography CSS — the TODO comment is different now
src = r(src,
  `/* TODO: replace 'Monument Extended' with Monument Extended .woff2 once files are available */`,
  `/* TODO: convert .otf font files to .woff2 for better performance */
        h1, h2 { font-family: var(--font-heading); font-weight: 800; text-transform: uppercase; }
        h3 { font-family: var(--font-heading); font-weight: 400; }
        button, .btn, [class*="btn"] { font-family: var(--font-heading); font-weight: 400; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; border-radius: 4px; }`,
  "typography scale + TODO comment updated"
);

// 6. Navbar logo glow — find actual string
const logoGlowIdx = src.indexOf("rgba(201,168,76,0.7), 0 0 60px rgba(201,168,76,0.3)");
if (logoGlowIdx > -1) {
  src = src.split("rgba(201,168,76,0.7), 0 0 60px rgba(201,168,76,0.3)").join("rgba(221,30,33,0.5), 0 0 60px rgba(221,30,33,0.2)");
  console.log("✓ navbar logo glow → red");
} else {
  console.log("  (skip) logo glow — different string");
}

// 7. CTA section: add dot-pattern
src = r(src,
  `    <section ref={ctR} style={{ ...G_FULL, background: "#DD1E21" }}>`,
  `    <section ref={ctR} style={{ ...G_FULL, background: "#DD1E21", position:"relative", overflow:"hidden" }}>
      <div className="dot-pattern" style={{ right:"-80px", top:"-40px", opacity:0.15 }} />`,
  "dot-pattern added to CTA section"
);

// 8. MoatSection: add dot-pattern  
src = r(src,
  `    <section ref={mR} style={{ ...G_FULL, position: "relative", overflow: "hidden", background: "linear-gradient(180deg,#182145,#182145,#182145)" }}>`,
  `    <section ref={mR} style={{ ...G_FULL, position: "relative", overflow: "hidden", background: "linear-gradient(180deg,#182145,#182145,#182145)" }}>
      <div className="dot-pattern" style={{ right:"-60px", top:"60px", opacity:0.5 }} />`,
  "dot-pattern added to MoatSection"
);

// 9. Remove @import in CSS that may have been left (check for leftover JetBrains Mono)
if (src.includes("JetBrains+Mono")) {
  // Keep JetBrains Mono since it's used for code-style numbers in financial section
  console.log("  (kept) JetBrains Mono — used in financial section");
}

// 10. Fix the remaining "Oswald" in fontFamily inline style if any
const oswaldCount = (src.match(/'Oswald'/g)||[]).length;
if (oswaldCount > 0) {
  src = src.split("'Oswald'").join("'Monument Extended'");
  console.log(`✓ (×${oswaldCount}) remaining Oswald refs → Monument Extended`);
}

// 11. navbar: fix active link — ensure 2px red underline not gold
// Check if pill already changed
if (!src.includes("rgba(240,224,178,0.06)")) {
  console.log("  (info) nav pill already patched (from brand4)");
}

fs.writeFileSync(APP, src.replace(/\n/g, "\r\n"), "utf8");
console.log("\n✅ patch-brand5b.js complete.");
