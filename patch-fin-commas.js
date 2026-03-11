const fs = require("fs");
const filePath = "src/App.jsx";
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

// Fix: 200,000 has 6 digits [2,0,0,0,0,0], comma belongs before index 3
// [1,4] → wrong: $2,000,00
// [3]   → correct: $200,000
const old1 = `  const CM5   = [1, 4];  // 200,000`;
const new1  = `  const CM5   = [3];     // 200,000`;

if (!src.includes(old1)) {
  // try alternate
  const old2 = `  const CM5   = [1,4];  // 200,000`;
  if (src.includes(old2)) {
    src = src.replace(old2, new1);
    console.log("Fixed CM5 (alt spacing)");
  } else {
    // search and show
    const idx = src.indexOf("CM5");
    console.error("CM5 not matched — showing context:");
    console.log(JSON.stringify(src.substring(idx - 10, idx + 60)));
    process.exit(1);
  }
} else {
  src = src.replace(old1, new1);
  console.log("Fixed CM5");
}

fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("Done");
