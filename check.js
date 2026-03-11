const fs = require("fs");
const src = fs.readFileSync("src/App.jsx", "utf8");
const checks = ["{ARROW_SVG}", "mobile-global", "style={{display:"];
checks.forEach(c => {
  const idx = src.indexOf(c);
  if (idx !== -1) {
    console.log("FOUND:", c, "at", idx);
    console.log("Context:", src.slice(idx - 30, idx + 80).replace(/\n/g, "\\n"));
  } else {
    console.log("OK (not found):", c);
  }
});

// Also check for any unclosed JSX tags or mismatched braces in the SVG insertions
const svgInserts = [...src.matchAll(/inline-flex.*?alignItems.*?gap/g)];
console.log("SVG inline-flex occurrences:", svgInserts.length);
svgInserts.forEach((m, i) => console.log(i, m[0].slice(0, 60)));
