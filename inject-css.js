const fs = require("fs");
const FILE = "src/App.jsx";
let src = fs.readFileSync(FILE, "utf8").replace(/\r\n/g, "\n");

const CSS_VARS = `
        :root {
          --red: #DD1E21; --red-dark: #b91c1c; --red-glow: rgba(221,30,33,0.4);
          --navy: #103F6E; --indigo: #182145; --cream: #FDFAF4; --beige: #F0E0B2;
          --blue-light: #85BAFF; --gold: #daa545; --green: #22c55e;
          --bg-dark: #182145; --bg-light: #FDFAF4; --bg-red: #DD1E21;
          --font-heading: 'Archivo Black', sans-serif;
          --font-body: 'Space Grotesk', sans-serif;
          --text-on-dark: #FDFAF4; --text-on-dark-muted: rgba(253,250,244,0.55);
          --text-on-light: #182145; --text-on-light-muted: #555555;
        }
        .card-glass { background: linear-gradient(145deg, rgba(30,45,80,0.7) 0%, rgba(22,34,62,0.85) 50%, rgba(16,26,50,0.95) 100%); border: 1px solid rgba(100,120,170,0.15); border-radius: 16px; padding: 32px; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); position: relative; overflow: hidden; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .card-glass:hover { transform: translateY(-4px); border-color: rgba(218,165,69,0.25); box-shadow: 0 8px 32px rgba(218,165,69,0.08), 0 4px 16px rgba(0,0,0,0.2); }
        .card-dark { background: #182145; border: 1px solid rgba(24,33,69,0.06); border-radius: 16px; padding: 32px; box-shadow: 0 4px 24px rgba(24,33,69,0.12); position: relative; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .card-dark:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(24,33,69,0.2); border-color: rgba(221,30,33,0.15); }
        .card-inverted { background: #182145; border: 1px solid rgba(253,250,244,0.1); border-radius: 16px; padding: 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.25); transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .card-inverted:hover { transform: translateY(-4px); border-color: rgba(253,250,244,0.2); box-shadow: 0 12px 40px rgba(0,0,0,0.35); }
        .icon-badge { width:56px; height:56px; min-width:56px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:transform 0.25s ease; flex-shrink:0; }
        .icon-badge svg { width:24px; height:24px; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; fill:none; }
        .card-glass:hover .icon-badge,.card-dark:hover .icon-badge,.card-inverted:hover .icon-badge { transform: scale(1.08); }
        @media(max-width:768px){ .icon-badge { width:48px; height:48px; min-width:48px; } }
        .icon-badge--red  { background: rgba(221,30,33,0.1);  border: 1px solid rgba(221,30,33,0.2);  }
        .icon-badge--navy { background: rgba(16,63,110,0.1);  border: 1px solid rgba(133,186,255,0.2); }
        .icon-badge--gold { background: rgba(218,165,69,0.1); border: 1px solid rgba(218,165,69,0.2); }
        .btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#DD1E21,#b91c1c); color:#FDFAF4; font-family:var(--font-heading); font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; padding:14px 28px; border:none; border-radius:8px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-primary:hover { background:linear-gradient(135deg,#e8292d,#DD1E21); transform:translateY(-2px); box-shadow:0 6px 20px rgba(221,30,33,0.3); }
        .btn-outline { display:inline-flex; align-items:center; gap:8px; background:transparent; color:#FDFAF4; font-family:var(--font-heading); font-size:13px; text-transform:uppercase; letter-spacing:1.5px; padding:14px 28px; border:1px solid rgba(253,250,244,0.25); border-radius:8px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-outline:hover { border-color:rgba(253,250,244,0.5); background:rgba(253,250,244,0.05); transform:translateY(-2px); }
        .btn-inverted { display:inline-flex; align-items:center; gap:8px; background:#182145; color:#FDFAF4; font-family:var(--font-heading); font-size:13px; text-transform:uppercase; letter-spacing:1.5px; padding:14px 28px; border:none; border-radius:8px; cursor:pointer; transition:all 0.25s ease; text-decoration:none; }
        .btn-inverted:hover { background:#103F6E; transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,0.3); }
        .section-badge { display:inline-flex; align-items:center; gap:8px; padding:6px 16px; border:1px solid rgba(180,170,140,0.18); border-radius:999px; font-family:var(--font-heading); font-size:10px; text-transform:uppercase; letter-spacing:2.5px; margin-bottom:20px; }
        .section-badge--dark  { border-color:rgba(253,250,244,0.12); color:rgba(253,250,244,0.5); }
        .section-badge--light { border-color:rgba(24,33,69,0.12);    color:rgba(24,33,69,0.5); }
        .section-dot { width:8px; height:8px; border-radius:50%; background:#DD1E21; box-shadow:0 0 10px rgba(221,30,33,0.5); margin-bottom:16px; }
        .section-dot--light { box-shadow:0 0 8px rgba(221,30,33,0.3); }
`;

const TARGET = "/* TODO: replace 'Archivo Black' with Monument Extended .woff2 once files are available */";
if (src.includes(TARGET)) {
  src = src.replace(TARGET, CSS_VARS + "        " + TARGET);
  fs.writeFileSync(FILE, src.replace(/\n/g, "\r\n"), "utf8");
  console.log("✓ CSS vars + utility classes injected into <style> block");
} else {
  console.log("skip — target comment not found");
}
