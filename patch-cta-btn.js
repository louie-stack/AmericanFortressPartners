const fs = require("fs");
const CALENDLY = "https://calendly.com/jakub_zurawinski/intro-call?month=2026-03";

let src = fs.readFileSync("src/App.jsx", "utf8").replace(/\r\n/g, "\n");

const OLD_OPEN = `            <button
              onMouseEnter={() => setHovBtn(true)} onMouseLeave={() => setHovBtn(false)}
              style={{`;

const NEW_OPEN = `            <a href="${CALENDLY}" target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => setHovBtn(true)} onMouseLeave={() => setHovBtn(false)}
              style={{ textDecoration: "none",`;

if (!src.includes(OLD_OPEN)) { console.error("❌ button open tag not found"); process.exit(1); }
src = src.replace(OLD_OPEN, NEW_OPEN);

// Replace the closing </button> that comes right after the Book a Call svg block
const markerIdx = src.indexOf("Book a Call\n");
const closeIdx  = src.indexOf("</button>", markerIdx);
if (closeIdx === -1) { console.error("❌ closing button tag not found"); process.exit(1); }
src = src.slice(0, closeIdx) + "</a>" + src.slice(closeIdx + "</button>".length);

fs.writeFileSync("src/App.jsx", src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ CTA Book a Call button fixed");
