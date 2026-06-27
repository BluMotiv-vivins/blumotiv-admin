export const C = {
  navyDark:    "#0A1526",
  navy:        "#0D1B2E",
  navyMid:     "#162236",
  navyLight:   "#1E2F47",
  orange:      "#E84C1E",
  orangeLight: "#FF6B3D",
  orangeDim:   "rgba(232,76,30,0.15)",
  orangeBorder:"rgba(232,76,30,0.35)",
  teal:        "#0D9488",
  tealLight:   "#14B8A8",
  tealDim:     "rgba(13,148,136,0.15)",
  tealBorder:  "rgba(13,148,136,0.35)",
  white:       "#FFFFFF",
  offWhite:    "#F7F8FA",
  slate:       "#64748B",
  slateLight:  "#94A3B8",
  border:      "#E2E8F0",
  borderDark:  "rgba(255,255,255,0.08)",
  green:       "#16A34A",
  greenLight:  "#22C55E",
  red:         "#EF4444",
  muted:       "rgba(255,255,255,0.55)",
  overlay:     "rgba(0,0,0,0.6)",
} as const;

export const FONT = {
  base:        "'Barlow', sans-serif",
  condensed:   "'Barlow Condensed', sans-serif",
};

export const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Barlow+Condensed:wght@600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#F7F8FA;color:#0D1B2E;font-family:'Barlow',sans-serif;}
a{text-decoration:none;color:inherit;}
button{cursor:pointer;border:none;outline:none;background:none;font-family:inherit;}
input,textarea,select{outline:none;font-family:inherit;}
`;

export const SHADOW = {
  card:    "0 2px 12px rgba(0,0,0,0.05)",
  cardHov: "0 4px 24px rgba(0,0,0,0.1)",
};

export const R = {
  sm:  "4px",
  md:  "8px",
  lg:  "12px",
  xl:  "16px",
  full:"9999px",
};
