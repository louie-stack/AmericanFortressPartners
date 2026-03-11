const fs = require("fs");
let src = fs.readFileSync("src/App.jsx", "utf8").replace(/\r\n/g, "\n");

const SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;

// Fix broken literal string replacement
src = src.replace(
  `>Book a Call {ARROW_SVG}</a>`,
  `><span style={{display:"inline-flex",alignItems:"center",gap:8}}>Book a Call ${SVG}</span></a>`
);

if (src.includes(">Book a Call {ARROW_SVG}</a>")) {
  console.error("❌ Still broken");
  process.exit(1);
}
console.log("✅ Fixed Book a Call button");

fs.writeFileSync("src/App.jsx", src.replace(/\n/g, "\r\n"), "utf8");
