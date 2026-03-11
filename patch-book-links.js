const fs = require("fs");
const path = require("path");
const CALENDLY = "https://calendly.com/jakub_zurawinski/intro-call?month=2026-03";

const filePath = path.join(__dirname, "src", "App.jsx");
let src = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");

// 1. NAV — <button style={btnR}>Book a Call</button>
src = src.replace(
  `<button style={btnR}>Book a Call</button>`,
  `<a href="${CALENDLY}" target="_blank" rel="noopener noreferrer" style={{...btnR, textDecoration:"none"}}>Book a Call</a>`
);

// 2. HERO — <button ...>Book a Call ↗</button>
src = src.replace(
  `>Book a Call ↗</button>`,
  `>Book a Call ↗</a>`
);
src = src.replace(
  `<button style={{
                ...btnR,
                animation: hV ? "heroBtnUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.5s both" : "none", opacity: 0,
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(196,30,42,0.7), 0 0 48px rgba(196,30,42,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}`,
  `<a href="${CALENDLY}" target="_blank" rel="noopener noreferrer" style={{
                ...btnR,
                animation: hV ? "heroBtnUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.5s both" : "none", opacity: 0,
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
                textDecoration: "none",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 24px rgba(196,30,42,0.7), 0 0 48px rgba(196,30,42,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}`
);

// 3. CTA SECTION — "Book a Call" (line ~1608, inside CTASection)
// It's an <a> in the CTA left card — check if already linked
if (src.includes(`href="https://calendly.com/jakub_zurawinski/intro-call?month=2026-03"`)) {
  console.log("ℹ️  CTA section already has correct calendly link");
} else {
  // Find the Book a Call link in CTASection and fix href
  src = src.replace(
    `href="https://calendly.com/jakub-americanfortress"`,
    `href="${CALENDLY}"`
  );
}

// 4. FINANCIAL — FinRevBtn: <button> → <a>
src = src.replace(
  `      <button
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          fontFamily: "Outfit", fontSize: "0.85rem", fontWeight: 600,
          padding: "14px 32px", color: "#fff", border: "none", borderRadius: 4,
          cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: 8,
          background: hov
            ? "linear-gradient(135deg, #d64545 0%, #b83232 100%)"
            : "linear-gradient(135deg, #c53030 0%, #9b2424 100%)",
          boxShadow: hov
            ? "0 4px 20px rgba(197,48,48,0.35), inset 0 0 0 1px rgba(220,160,80,0.15)"
            : "0 2px 12px rgba(197,48,48,0.2)",
          transform: hov ? "translateY(-1px)" : "translateY(0)",
          transition: "all 0.2s ease",
        }}>
        Discuss Revenue Opportunity`,
  `      <a href="${CALENDLY}" target="_blank" rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{
          fontFamily: "Outfit", fontSize: "0.85rem", fontWeight: 600,
          padding: "14px 32px", color: "#fff", border: "none", borderRadius: 4,
          cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
          background: hov
            ? "linear-gradient(135deg, #d64545 0%, #b83232 100%)"
            : "linear-gradient(135deg, #c53030 0%, #9b2424 100%)",
          boxShadow: hov
            ? "0 4px 20px rgba(197,48,48,0.35), inset 0 0 0 1px rgba(220,160,80,0.15)"
            : "0 2px 12px rgba(197,48,48,0.2)",
          transform: hov ? "translateY(-1px)" : "translateY(0)",
          transition: "all 0.2s ease",
        }}>
        Discuss Revenue Opportunity`
);
// close tag
src = src.replace(
  `        </svg>
      </button>
    </div>
  );
}

function SlotDigit`,
  `        </svg>
      </a>
    </div>
  );
}

function SlotDigit`
);

fs.writeFileSync(filePath, src.replace(/\n/g, "\r\n"), "utf8");
console.log("✅ All Book a Call / Discuss Revenue links fixed");
