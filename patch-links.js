const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

const replacements = [
  // Social links — footer socials array
  [`href: "https://t.me/americanfortress"`,         `href: "https://t.me/americanfortress"`],  // already correct
  [`href: "https://x.com/americanfortress"`,        `href: "https://x.com/Americanfort_io"`],
  [`href: "https://discord.gg/americanfortress"`,   `href: "https://discord.com/invite/americanfortress"`],
  [`href: "https://youtube.com/@americanfortress"`, `href: "https://www.youtube.com/@AmericanFortress"`],

  // Book a Call — footer CTA button
  [`href="https://calendly.com/jakub-americanfortress"`, `href="https://calendly.com/jakub_zurawinski/intro-call?month=2026-03"`],

  // Download AF Beta button (it's a <button>, make it an <a>)
  [
    `>Download AF Beta ↗</button>`,
    `>Download AF Beta ↗</button>`
  ],
];

let changed = 0;
for (const [OLD, NEW] of replacements) {
  if (OLD === NEW) continue; // skip no-ops
  if (!src.includes(OLD)) {
    console.warn(`⚠️  Not found: ${OLD.slice(0, 60)}`);
    continue;
  }
  src = src.replace(OLD, NEW);
  changed++;
  console.log(`✅ Replaced: ${OLD.slice(0, 60)}`);
}

// Download AF Beta: convert <button> to <a> tag
const OLD_BTN = `>Download AF Beta ↗</button>`;
const NEW_BTN_WRAP_OLD = `style={{
                ...btnG,
                animation: hV ? "heroBtnUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.65s both" : "none", opacity: 0,
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(201,168,76,0.5), 0 0 48px rgba(201,168,76,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >Download AF Beta ↗</button>`;
const NEW_BTN_WRAP_NEW = `style={{
                ...btnG,
                animation: hV ? "heroBtnUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.65s both" : "none", opacity: 0,
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
                textDecoration: "none", display: "inline-block",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(201,168,76,0.5), 0 0 48px rgba(201,168,76,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >Download AF Beta ↗</a>`;

// Also need to change the opening tag from <button to <a href=...
const OLD_TAG = `<button style={{
                ...btnG,
                animation: hV ? "heroBtnUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.65s both" : "none", opacity: 0,
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}`;
const NEW_TAG = `<a href="https://americanfortress.io/partner-wallets" target="_blank" rel="noopener noreferrer" style={{
                ...btnG,
                animation: hV ? "heroBtnUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.65s both" : "none", opacity: 0,
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
                textDecoration: "none", display: "inline-block",
              }}`;

if (src.includes(OLD_TAG)) {
  src = src.replace(OLD_TAG, NEW_TAG);
  // close tag
  src = src.replace(">Download AF Beta ↗</button>", ">Download AF Beta ↗</a>");
  console.log("✅ Download AF Beta: button → <a> with correct href");
  changed++;
} else {
  console.warn("⚠️  Download AF Beta button opening tag not found");
}

// Book a Partnership Call button in comparison section — wrap with link
const OLD_BOOK = `<button style={{ fontFamily:"'JetBrains Mono'", fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", padding:"14px 28px", background:"#C41E2A", color:"#fff", border:"none", borderRadius:4, cursor:"pointer" }}>
              Book a Partnership Call ↗
            </button>`;
const NEW_BOOK = `<a href="https://calendly.com/jakub_zurawinski/intro-call?month=2026-03" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'JetBrains Mono'", fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase", padding:"14px 28px", background:"#C41E2A", color:"#fff", border:"none", borderRadius:4, cursor:"pointer", textDecoration:"none", display:"inline-block" }}>
              Book a Partnership Call ↗
            </a>`;
if (src.includes(OLD_BOOK)) {
  src = src.replace(OLD_BOOK, NEW_BOOK);
  console.log("✅ Book a Partnership Call: button → <a> with calendly link");
  changed++;
} else {
  console.warn("⚠️  Book a Partnership Call button not found");
}

// CTA section "Schedule a partnership call" link (line ~1563)
// Find any existing href for the CTA section book-a-call
if (src.includes(`href="https://calendly.com/jakub_zurawinski/intro-call?month=2026-03"`)) {
  console.log("ℹ️  Calendly CTA already correct");
}

fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log(`\n✅ Done — ${changed} changes applied`);
