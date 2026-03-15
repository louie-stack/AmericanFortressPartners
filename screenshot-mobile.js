const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const sections = [
    { name: 'hero', selector: '.hero-section' },
    { name: 'exposed', selector: '#exposed' },
    { name: 'fortressnames', selector: '#fortressnames' },
    { name: 'confidentiality', selector: '#confidentiality' },
    { name: 'landscape', selector: '#landscape' },
    { name: 'comparison', selector: '#comparison' },
    { name: 'revenue', selector: '#revenue' },
    { name: 'financial', selector: '#financial' },
    { name: 'moat', selector: '#moat' },
    { name: 'trusted', selector: '#trusted' },
    { name: 'contact', selector: '#contact' },
  ];

  for (const s of sections) {
    try {
      const el = await page.$(s.selector);
      if (el) {
        await el.screenshot({ path: `C:/Users/Graph/.openclaw/workspace/mobile-${s.name}.png` });
        console.log('OK: ' + s.name);
      } else {
        console.log('MISSING: ' + s.name);
      }
    } catch(e) { console.log('ERR ' + s.name + ': ' + e.message); }
  }
  await browser.close();
})();
