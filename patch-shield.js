const fs = require("fs");
const filePath = "src/App.jsx";
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

const old = `function AFShieldSVG() {
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
}`;

const rep = `function AFShieldSVG() {
  return (
    <img src="/af-shield.png" alt="American Fortress Shield" width="140"
      style={{ display: "block", animation: "pulseCoreSVG 3s ease-in-out infinite" }}/>
  );
}`;

if (!src.includes(old)) { console.error("NOT FOUND"); process.exit(1); }
src = src.replace(old, rep);
fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("Done");
