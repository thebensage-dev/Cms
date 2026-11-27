// Draws the "Add block" drawer's thumbnails: a small wireframe of each block's layout, written
// to public/block-thumbnails/<slug>.svg (3:2). Run after adding a block: node scripts/block-thumbnails.mjs
import fs from "node:fs";
import path from "node:path";

const W = 480;
const H = 320;
const INK = "#9aa4b2";
const SOFT = "#dfe4ea";
const ACCENT = "#3b6fd8";

const r = (x, y, w, h, fill = SOFT, rx = 6) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
const line = (x, y, w, fill = INK) => r(x, y, w, 10, fill, 5);
const lines = (x, y, w, n, gap = 18) =>
  Array.from({ length: n }, (_, i) => line(x, y + i * gap, i === n - 1 ? w * 0.6 : w, SOFT)).join(
    "",
  );
const button = (x, y, w = 90, fill = ACCENT) => r(x, y, w, 28, fill, 14);
const circle = (cx, cy, rad, fill = SOFT) =>
  `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${fill}"/>`;
const card = (x, y, w, h) =>
  r(x, y, w, h, "#ffffff", 10) +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="${SOFT}" stroke-width="2"/>`;
const picture = (x, y, w, h) =>
  r(x, y, w, h, SOFT, 10) +
  `<path d="M${x + w * 0.15} ${y + h * 0.8} L${x + w * 0.4} ${y + h * 0.45} L${x + w * 0.58} ${y + h * 0.65} L${x + w * 0.72} ${y + h * 0.5} L${x + w * 0.88} ${y + h * 0.8} Z" fill="${INK}"/>` +
  circle(x + w * 0.75, y + h * 0.28, Math.min(w, h) * 0.08, INK);
const heading = (x, y, w = 200) => line(x, y, w * 0.4, ACCENT) + r(x, y + 20, w, 18, INK, 6);
const cardsRow = (y, n, h = 110) => {
  const gap = 16;
  const w = (W - 80 - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => {
    const x = 40 + i * (w + gap);
    return (
      card(x, y, w, h) +
      r(x + 14, y + 14, 26, 26, ACCENT, 6) +
      line(x + 14, y + 52, w - 40) +
      lines(x + 14, y + 72, w - 28, 2, 14)
    );
  }).join("");
};

const LAYOUTS = {
  header: () =>
    line(40, 40, 120, SOFT) +
    r(40, 70, 60, 6, ACCENT, 3) +
    line(40, 92, 90, ACCENT) +
    r(40, 114, 300, 30, INK) +
    lines(40, 162, 360, 3) +
    button(40, 230) +
    button(140, 230, 90, SOFT),
  legal: () =>
    r(40, 50, 60, 6, ACCENT, 3) +
    line(40, 72, 140, ACCENT) +
    r(40, 94, 260, 30, INK) +
    lines(40, 150, 400, 7),
  homeHero: () =>
    r(40, 70, 230, 30, INK) +
    r(40, 110, 180, 30, ACCENT) +
    lines(40, 160, 220, 3) +
    button(40, 230) +
    button(140, 230, 90, SOFT) +
    card(300, 60, 140, 200) +
    circle(370, 120, 30) +
    lines(320, 170, 100, 3, 16),
  directoryHero: () =>
    r(40, 70, 220, 30, INK) +
    r(40, 110, 160, 30, ACCENT) +
    lines(40, 160, 200, 2) +
    button(40, 210) +
    card(280, 50, 170, 220) +
    r(295, 70, 140, 24, SOFT, 12) +
    [0, 1, 2, 3]
      .map((i) => circle(310, 120 + i * 38, 12) + line(330, 114 + i * 38, 100, SOFT))
      .join(""),
  content: () => heading(40, 40) + lines(40, 110, 400, 6) + button(40, 240),
  image: () => picture(40, 30, 400, 230) + line(40, 280, 200, SOFT),
  imageText: () =>
    picture(40, 50, 190, 220) + heading(250, 70, 190) + lines(250, 140, 190, 5) + button(250, 240),
  columns: () =>
    heading(40, 30) +
    [0, 1, 2]
      .map((i) => line(40 + i * 140, 110, 90, INK) + lines(40 + i * 140, 136, 120, 6, 16))
      .join(""),
  textSection: () =>
    r(40, 40, 220, 18, INK) +
    lines(40, 80, 400, 4) +
    r(52, 170, 8, 8, INK, 4) +
    line(68, 169, 280, SOFT) +
    r(52, 192, 8, 8, INK, 4) +
    line(68, 191, 240, SOFT) +
    lines(40, 230, 400, 3),
  buttons: () => button(40, 146, 130) + button(186, 146, 130, SOFT),
  cardGrid: () => heading(40, 30) + cardsRow(110, 3, 170),
  timeline: () =>
    heading(40, 30) +
    `<rect x="58" y="100" width="4" height="190" fill="${SOFT}"/>` +
    [0, 1, 2]
      .map(
        (i) =>
          circle(60, 112 + i * 70, 12, ACCENT) +
          line(90, 104 + i * 70, 180, INK) +
          lines(90, 124 + i * 70, 300, 2, 14),
      )
      .join(""),
  callToAction: () =>
    r(40, 80, 400, 160, ACCENT, 18) +
    r(80, 120, 220, 22, "#ffffff", 6) +
    line(80, 154, 260, "#c9d8f6") +
    button(80, 186, 110, "#ffffff"),
  pageCards: () => heading(40, 30) + cardsRow(110, 4, 170),
  linkCards: () => heading(40, 30) + cardsRow(110, 3, 90) + cardsRow(212, 3, 90),
  pageTeaser: () =>
    heading(40, 40) + lines(40, 110, 260, 3) + button(40, 180, 110, SOFT) + card(320, 50, 120, 200),
  projectsGrid: () => heading(40, 30) + cardsRow(110, 3, 180),
  platformTeaser: () => heading(40, 30) + lines(40, 100, 300, 2) + cardsRow(150, 4, 130),
  platformMap: () =>
    [
      [60, 60],
      [200, 60],
      [340, 60],
      [130, 200],
      [270, 200],
    ]
      .map(([x, y]) => card(x, y, 100, 60) + line(x + 14, y + 24, 70))
      .join("") +
    `<path d="M160 120 L180 200 M250 120 L300 200 M300 120 L230 200" stroke="${INK}" stroke-width="3" fill="none"/>`,
  stack: () =>
    r(0, 0, W, H, "#eef1f5", 0) +
    heading(40, 30) +
    Array.from(
      { length: 12 },
      (_, i) =>
        r(40 + (i % 4) * 102, 110 + Math.floor(i / 4) * 60, 90, 44, "#ffffff", 10) +
        circle(60 + (i % 4) * 102, 132 + Math.floor(i / 4) * 60, 9, INK),
    ).join(""),
  flows: () =>
    heading(40, 30) +
    [0, 1, 2, 3]
      .map(
        (i) =>
          card(40 + i * 104, 130, 88, 100) +
          r(54 + i * 104, 146, 24, 24, ACCENT, 6) +
          line(54 + i * 104, 184, 60),
      )
      .join("") +
    [0, 1, 2]
      .map((i) => `<path d="M${130 + i * 104} 180 l12 0" stroke="${INK}" stroke-width="3"/>`)
      .join(""),
  accessTable: () =>
    heading(40, 30) +
    r(40, 110, 400, 30, INK, 6) +
    [0, 1, 2, 3].map((i) => r(40, 150 + i * 36, 400, 28, i % 2 ? "#ffffff" : SOFT, 4)).join(""),
  addressCards: () => heading(40, 30) + cardsRow(110, 2, 150),
  emailSenders: () =>
    heading(40, 30) + cardsRow(110, 2, 70) + card(40, 196, 400, 100) + lines(60, 216, 360, 4, 16),
  themeDemo: () =>
    heading(40, 30) +
    [ACCENT, "#d8453b", "#e9b949"].map((c, i) => circle(80 + i * 70, 150, 26, c)).join("") +
    card(280, 100, 160, 170) +
    r(296, 116, 128, 20, ACCENT, 6) +
    lines(296, 150, 128, 4, 16),
  apiReference: () =>
    cardsRow(30, 3, 70) +
    r(40, 120, 120, 180, SOFT, 8) +
    card(176, 120, 264, 180) +
    lines(196, 140, 220, 6, 20),
  userDirectory: () =>
    r(40, 30, 140, 22, INK) +
    button(350, 26) +
    [0, 1, 2, 3].map((i) => card(40 + i * 102, 70, 90, 46)).join("") +
    r(40, 130, 300, 28, SOFT, 14) +
    r(350, 130, 90, 28, SOFT, 14) +
    [0, 1, 2]
      .map(
        (i) =>
          card(40 + i * 136, 176, 124, 110) +
          circle(64 + i * 136, 202, 14) +
          line(86 + i * 136, 196, 70) +
          lines(54 + i * 136, 230, 96, 2, 14),
      )
      .join(""),
  userProfile: () =>
    line(40, 24, 80, SOFT) +
    card(40, 50, 400, 250) +
    r(40, 50, 400, 70, "#c9d8f6", 10) +
    circle(90, 120, 30, "#ffffff") +
    circle(90, 120, 24, ACCENT) +
    r(60, 166, 180, 20, INK) +
    button(300, 160, 60, SOFT) +
    button(370, 160, 60, SOFT) +
    [0, 1, 2, 3]
      .map((i) => line(60 + (i % 2) * 190, 210 + Math.floor(i / 2) * 40, 150, SOFT))
      .join(""),
};

const ALIASES = { pageHeader: "header", legalHeader: "legal" };
const out = path.resolve("public/block-thumbnails");
fs.mkdirSync(out, { recursive: true });
const slugs = [
  ...Object.keys(LAYOUTS).filter((k) => !["header", "legal"].includes(k)),
  ...Object.keys(ALIASES),
];
for (const slug of slugs) {
  const draw = LAYOUTS[ALIASES[slug] ?? slug];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#f7f8fa"/>${draw()}</svg>\n`;
  fs.writeFileSync(path.join(out, `${slug}.svg`), svg);
}
console.log(`Wrote ${slugs.length} thumbnails to public/block-thumbnails/`);
