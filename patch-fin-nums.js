const fs = require("fs");
let src = fs.readFileSync("src/App.jsx", "utf8").replace(/\r\n/g, "\n");

// Add className to $1M prefix span
const i1 = src.indexOf('fontSize:"clamp(60px,11vw,130px)"');
const span1 = src.lastIndexOf("<span style={{", i1);
src = src.slice(0, span1) + '<span className="fin-num-lg" style={{' + src.slice(span1 + "<span style={{".length);

// Add className to $200K prefix span (recalculate after first replacement)
const i2 = src.indexOf('fontSize:"clamp(68px,13vw,155px)"');
const span2 = src.lastIndexOf("<span style={{", i2);
src = src.slice(0, span2) + '<span className="fin-num-xl" style={{' + src.slice(span2 + "<span style={{".length);

fs.writeFileSync("src/App.jsx", src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ Financial prefix spans patched");
