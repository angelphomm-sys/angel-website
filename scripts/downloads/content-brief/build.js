// Builds the Word version of the SEO content brief template from fields.json.
// Usage (from a folder that has the `docx` npm package): node build.js <path/to/fields.json> <out.docx>
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, TableLayoutType, PageBreak, Footer, TabStopType, VerticalAlign, HeightRule,
} = require("docx");

const F = JSON.parse(fs.readFileSync(process.argv[2] || "fields.json", "utf8"));
const OUT = process.argv[3] || "content-brief-template.docx";

const RED = "BB2426", INK = "210F10", CREAM = "F1E7D4", ICE = "C7DEE9", LINE = "D9CDB8", WHITE = "FFFFFF";
const FONT = "Arial";
const W = 10080; // US Letter, 0.75in margins
const LABEL = 3800, ANSWER = W - LABEL;

const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };
const none = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: none, bottom: none, left: none, right: none };
const pad = { top: 90, bottom: 90, left: 140, right: 140 };
const shade = (fill) => ({ fill, type: ShadingType.CLEAR, color: "auto" });

const run = (text, o = {}) => new TextRun({ text, font: FONT, color: INK, size: 20, ...o });
const p = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], ...o });
const table = (widths, rows) => new Table({ layout: TableLayoutType.FIXED, width: { size: W, type: WidthType.DXA }, columnWidths: widths, rows });
const cell = (children, width, o = {}) => new TableCell({
  borders, width: { size: width, type: WidthType.DXA }, margins: pad, verticalAlign: VerticalAlign.TOP,
  children: Array.isArray(children) ? children : [children], ...o,
});

function heading(num, text) {
  return p([run(`${num}  `, { color: RED, bold: true, size: 24 }), run(text, { bold: true, size: 24 })], { spacing: { before: 260, after: 110 }, keepNext: true });
}
function hint(text) { return p(run(text, { size: 18 }), { spacing: { after: 110 } }); }
function fieldRow(label, prompt, height = 520) {
  return new TableRow({ height: { value: height, rule: HeightRule.ATLEAST }, cantSplit: true, children: [
    cell([p(run(label, { bold: true })), p(run(prompt, { size: 16 }), { spacing: { before: 40 } })], LABEL, { shading: shade(CREAM) }),
    cell(p(run("")), ANSWER),
  ] });
}
function exRow(label, text) {
  return new TableRow({ cantSplit: true, children: [cell(p(run(label, { bold: true })), LABEL, { shading: shade(CREAM) }), cell(p(run(text)), ANSWER)] });
}
function grid(cols, widths, n, first, height) {
  const head = new TableRow({ tableHeader: true, children: cols.map((c, i) => cell(p(run(c, { bold: true, size: 17, color: WHITE })), widths[i], { shading: shade(INK) })) });
  const rows = Array.from({ length: n }, (_, r) => new TableRow({ height: { value: height, rule: HeightRule.ATLEAST }, cantSplit: true,
    children: widths.map((w, i) => cell(p(run(i === 0 && first ? first(r) : "", { bold: true, size: 18 })), w)) }));
  return table(widths, [head, ...rows]);
}
function callout(title, body, fill) {
  return table([W], [new TableRow({ children: [new TableCell({ borders: noBorders, width: { size: W, type: WidthType.DXA }, shading: shade(fill),
    margins: { top: 140, bottom: 140, left: 200, right: 200 }, children: [p([run(title + "  ", { bold: true }), run(body)])] })] })]);
}
function titleBlock(title, sub) {
  return [
    p(run(F.kicker, { bold: true, color: RED, size: 18 }), { spacing: { after: 60 } }),
    p(run(title, { bold: true, size: 44 }), { spacing: { after: 80 } }),
    p(run(sub, { size: 21 }), { spacing: { after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: RED, space: 8 } } }),
  ];
}
const check = (text) => p([run("☐  ", { size: 22 }), run(text)], { spacing: { before: 60, after: 60 } });

const page1 = [
  ...titleBlock(F.title, F.subtitle),
  table([5040, 2520, 2520], [new TableRow({ children: [
    cell([p(run("Working title", { bold: true, size: 17 })), p(run(""))], 5040),
    cell([p(run("Writer", { bold: true, size: 17 })), p(run(""))], 2520),
    cell([p(run("Publish date", { bold: true, size: 17 })), p(run(""))], 2520),
  ] })]),
  ...F.sections.flatMap((s) => [heading(s.num, s.title), table([LABEL, ANSWER], s.fields.map(([l, pr]) => fieldRow(l, pr)))]),
  p(run(""), { spacing: { after: 100 } }),
  callout(F.ready[0], F.ready[1], ICE),
];

const page2 = [
  p(new PageBreak()),
  heading(F.ranks.num, F.ranks.title), hint(F.ranks.hint),
  grid(F.ranks.cols, [500, 3080, 1100, 2700, 2700], 3, (r) => String(r + 1), 720),
  p(run(""), { spacing: { after: 60 } }),
  table([LABEL, ANSWER], [fieldRow(F.ranks.ai[0], F.ranks.ai[1], 560)]),
  heading(F.outline.num, F.outline.title), hint(F.outline.hint),
  grid(F.outline.cols, [1500, 4790, 3790], F.outline.levels.length, (r) => F.outline.levels[r], 420),
  heading(F.sources.num, F.sources.title), hint(F.sources.hint),
  grid(F.sources.cols, [4590, 4290, 1200], 5, null, 420),
  heading(F.publish.num, F.publish.title),
  ...F.publish.items.map(check),
];

const page3 = [
  p(new PageBreak()),
  ...titleBlock(F.example.title, F.example.subtitle),
  table([LABEL, ANSWER], F.example.rows.map(([l, t]) => exRow(l, t))),
  p(run(""), { spacing: { after: 160 } }),
  callout(F.example.note[0], F.example.note[1], CREAM),
];

const doc = new Document({
  creator: "Angel Phommachan", title: "SEO Content Brief Template",
  description: "A three-page SEO content brief template for one blog post, with a filled-in example.",
  styles: { default: { document: { run: { font: FONT, size: 20, color: INK } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
    footers: { default: new Footer({ children: [p([run(F.footer_left, { size: 16 }), run("\t" + F.footer_right, { size: 16, color: RED, bold: true })],
      { tabStops: [{ type: TabStopType.RIGHT, position: W }] })] }) },
    children: [...page1, ...page2, ...page3],
  }],
});
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("written", OUT, buf.length); });
