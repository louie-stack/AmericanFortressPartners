const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

// Widen main grid container
const OLD1 = `maxWidth: 1100, margin: "0 auto", padding: "64px 5vw 0",
        display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, alignItems: "start",`;
const NEW1 = `maxWidth: 1440, margin: "0 auto", padding: "64px 7vw 0",
        display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: 88, alignItems: "start",`;

// Widen bottom bar
const OLD2 = `maxWidth: 1100, margin: "48px auto 0",
        padding: "20px 5vw",`;
const NEW2 = `maxWidth: 1440, margin: "48px auto 0",
        padding: "20px 7vw",`;

if (!src.includes(OLD1)) { console.error("❌ grid block not found"); process.exit(1); }
if (!src.includes(OLD2)) { console.error("❌ bottom bar block not found"); process.exit(1); }

src = src.replace(OLD1, NEW1).replace(OLD2, NEW2);

fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ Footer widened");
