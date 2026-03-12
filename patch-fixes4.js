// patch-fixes4.js — Move .financial-amount rules OUT of media query, add !important
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "src", "App.jsx");

let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
let count = 0;

function replace(oldStr, newStr, label) {
  if (!src.includes(oldStr)) {
    console.warn(`  ⚠️  NOT FOUND: ${label}`);
    return;
  }
  src = src.replace(oldStr, newStr);
  count++;
  console.log(`  ✓  ${label}`);
}

// Step 1: Remove the financial-amount rules from inside the @media block
replace(
  `          /* 5 ── FINANCIAL OPPORTUNITY ───────────────────────── */
          .financial-amount { font-family: var(--font-heading); font-weight: 800; font-size: clamp(4rem, 8vw, 7rem); line-height: 1.0; white-space: nowrap; text-align: center; display: block; }
          .financial-amount--navy { color: #182145; }
          .financial-amount--red { color: #DD1E21; }
          .per-month { font-size: 0.3em; font-weight: 400; opacity: 0.5; margin-left: 4px; }
          .fin-title { white-space: normal !important; font-size: clamp(28px, 8vw, 60px) !important; word-break: break-word !important; }`,
  `          /* 5 ── FINANCIAL OPPORTUNITY ───────────────────────── */
          .fin-title { white-space: normal !important; font-size: clamp(28px, 8vw, 60px) !important; word-break: break-word !important; }`,
  "Remove .financial-amount from media query"
);

// Step 2: Add the rules globally, before the @media block — find the last global rule before @media
replace(
  `        /* ── Mobile (≤768px) ─────────────────────────────── */
        @media (max-width: 768px) {`,
  `        /* ── Financial Opportunity Numbers ───────────────── */
        .financial-amount { font-family: var(--font-heading) !important; font-weight: 800 !important; font-size: clamp(4rem, 8vw, 7rem) !important; line-height: 1.0 !important; white-space: nowrap !important; text-align: center !important; display: block !important; }
        .financial-amount--navy { color: #182145 !important; }
        .financial-amount--red  { color: #DD1E21 !important; }
        .per-month { font-size: 0.3em !important; font-weight: 400 !important; opacity: 0.5 !important; margin-left: 4px !important; }

        /* ── Mobile (≤768px) ─────────────────────────────── */
        @media (max-width: 768px) {`,
  "Add .financial-amount globally before media query with !important"
);

const out = src.replace(/\n/g, "\r\n");
fs.writeFileSync(filePath, out);
console.log(`\nDone — ${count} replacements applied.`);
