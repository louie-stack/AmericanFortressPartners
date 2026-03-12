/**
 * brandTokens.js — American Fortress brand design tokens
 * Single source of truth for all brand-approved values.
 * Usage: import { brand } from '../brandTokens.js'
 */

export const brand = {
  colors: {
    // ── Brand palette (from brand guidelines) ──────────────────────────────
    vividRed:        "#DD1E21",
    navyBlue:        "#103F6E",
    midnightIndigo:  "#182145",
    warmBeige:       "#F0E0B2",
    softCream:       "#FDFAF4",
    black:           "#000000",
    blueHazeStart:   "#D9E9FF",
    blueHazeEnd:     "#85BAFF",
    whiteEmberStart: "#FFFFFF",
    whiteEmberEnd:   "#E6412A",

    // ── Functional / derived ───────────────────────────────────────────────
    darkBg:               "#182145",    // DARK section background
    lightBg:              "#FDFAF4",    // LIGHT section background
    redBg:                "#DD1E21",    // RED/CTA section background

    // Red scale
    redDark:              "#B01819",    // dark gradient stop
    redHover:             "#E6412A",    // hover/lighter stop

    // Text
    textOnDark:           "#FDFAF4",
    textOnDarkMuted:      "rgba(253,250,244,0.6)",
    textOnDarkSubtle:     "rgba(253,250,244,0.4)",
    textOnLight:          "#182145",
    textOnLightBody:      "#333333",
    textOnLightMuted:     "#555555",
    textOnRed:            "#FDFAF4",

    // Cards
    cardBgOnDark:         "rgba(25,38,68,0.8)",
    cardBorderOnDark:     "rgba(100,120,170,0.15)",
    cardBgOnLight:        "#182145",    // dark card on light bg
    cardBorderOnLight:    "rgba(24,33,69,0.06)",
    cardBgOnRed:          "#182145",    // inverted dark card on red bg
    cardBorderOnRed:      "rgba(253,250,244,0.1)",

    // Gradients
    ctaGradient:          "linear-gradient(135deg, #DD1E21 0%, #B01819 100%)",
    ctaGradientHover:     "linear-gradient(135deg, #E6412A 0%, #DD1E21 100%)",
    progressBar:          "linear-gradient(90deg, #DD1E21 0%, #E6412A 100%)",
    footerTopBorder:      "linear-gradient(90deg, transparent 5%, #DD1E21 30%, #F0E0B2 55%, #85BAFF 80%, transparent 95%)",

    // Functional accents (site-specific, not in core brand palette)
    gold:                 "#daa545",    // interactive accent on dark sections only
  },

  fonts: {
    // TODO: Replace 'Archivo Black' with Monument Extended when .woff2 files available
    heading: "'Monument Extended', 'Archivo Black', sans-serif",
    body:    "'Space Grotesk', sans-serif",
  },

  // ── Section background assignment (scroll order) ──────────────────────────
  sectionBgs: {
    navbar:         "dark",   // #182145
    hero:           "dark",
    exposed:        "light",  // #FDFAF4
    fortressnames:  "dark",
    confidentiality:"light",
    landscape:      "dark",
    comparison:     "light",
    revenue:        "dark",
    financial:      "light",
    moat:           "dark",
    contact:        "red",    // #DD1E21
    footer:         "dark",
  },
};
