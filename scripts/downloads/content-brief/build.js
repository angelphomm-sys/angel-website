// Builds the Word version of the SEO content brief template from fields.json.
// Usage (from a folder that has the `docx` npm package): node build.js <path/to/fields.json> <out.docx>
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, TableLayoutType, PageBreak, Footer, TabStopType, VerticalAlign, HeightRule,
} = require("docx");

const F = JSON.parse(fs.readFileSync(process.argv[2] || "fields.json", "utf8"));
const OUT = process.argv[3] || "seo-content-brief-template.docx";

const RED = "BB2426", INK = "210F10", CREAM = "F1E7D4", ICE = "C7DEE9", LINE = "D9CDB8", MUTED = "6B5A50", WHITE = "FFFFFF";
const FONT = "Arial";
const W = 10080; // US Letter, 0.75in margins
const LABEL = 2900, ANSWER = W - LABEL;
const pct = (widths) => { const px = widths.map((w) => Math.round((W * w) / 100)); px[px.length - 1] += W - px.reduce((a, b) => a + b, 0); return px; };

const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };
const none = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: none, bottom: none, left: none, right: none };
const pad = { top: 60, bottom: 60, left: 140, right: 140 };
const shade = (fill) => ({ fill, type: ShadingType.CLEAR, color: "auto" });

const run = (text, o = {}) => new TextRun({ text, font: FONT, color: INK, size: 20, ...o });
const p = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], ...o });
const table = (widths, rows) => new Table({ layout: TableLayoutType.FIXED, width: { size: W, type: WidthType.DXA }, columnWidths: widths, rows });
const cell = (children, width, o = {}) => new TableCell({
  borders, width: { size: width, type: WidthType.DXA }, margins: pad, verticalAlign: VerticalAlign.TOP,
  children: Array.isArray(children) ? children : [children], ...o,
});

function heading(num, text, hint) {
  const out = [p([...(num ? [run(`${num}  `, { color: RED, bold: true, size: 24 })] : []), run(text, { bold: true, size: 24 })], { spacing: { before: 200, after: hint ? 30 : 90 }, keepNext: true })];
  if (hint) out.push(p(run(hint, { size: 17, color: MUTED }), { spacing: { after: 100 }, keepNext: true }));
  return out;
}
function fieldRow([label, prompt, example, answer], height = 520) {
  const left = [p(run(label, { bold: true }))];
  if (prompt) left.push(p(run(prompt, { size: 16 }), { spacing: { before: 30 } }));
  if (example) left.push(p(run(`e.g. ${example}`, { size: 15, italics: true, color: MUTED }), { spacing: { before: 30 } }));
  return new TableRow({ height: { value: height, rule: HeightRule.ATLEAST }, cantSplit: true, children: [
    cell(left, LABEL, { shading: shade(CREAM) }), cell(p(run(answer || "", { size: 18 })), ANSWER),
  ] });
}
const fieldTable = (fields, height) => table([LABEL, ANSWER], fields.map((f) => fieldRow(f, height)));
function grid(cols, widths, rows, height, prefill = {}) {
  const head = new TableRow({ tableHeader: true, children: cols.map((c, i) => cell(p(run(c, { bold: true, size: 17, color: WHITE })), widths[i], { shading: shade(INK) })) });
  const body = rows.map((row, r) => {
    let cells = Array.isArray(row) ? row : [row, ...cols.slice(1).map(() => "")];
    if (prefill[String(r)]) cells = [cells[0], ...prefill[String(r)]];
    return new TableRow({ height: { value: height, rule: HeightRule.ATLEAST }, cantSplit: true,
      children: cells.map((c, i) => cell(p(run(c, i === 0 ? { bold: true, size: 17 } : (Array.isArray(row) ? { size: 18 } : { size: 16, italics: true, color: MUTED }))), widths[i])) });
  });
  return table(widths, [head, ...body]);
}
function pairs(rows) {
  const L = 3000;
  return table([L, W - L], rows.map(([l, t]) => new TableRow({ cantSplit: true, children: [
    cell(p(run(l, { bold: true, size: 18 })), L, { shading: shade(CREAM) }), cell(p(run(t, { size: 18 })), W - L)] })));
}
function callout(title, body, fill) {
  return table([W], [new TableRow({ children: [new TableCell({ borders: noBorders, width: { size: W, type: WidthType.DXA }, shading: shade(fill),
    margins: { top: 140, bottom: 140, left: 200, right: 200 }, children: [p([run(title + "  ", { bold: true }), run(body)])] })] })]);
}
function titleBlock(title, sub) {
  const rule = { bottom: { style: BorderStyle.SINGLE, size: 12, color: RED, space: 8 } };
  const out = F.kicker ? [p(run(F.kicker, { bold: true, color: RED, size: 18 }), { spacing: { after: 60 } })] : [];
  if (!sub) return [...out, p(run(title, { bold: true, size: 40 }), { spacing: { after: 180 }, border: rule })];
  return [...out, p(run(title, { bold: true, size: 44 }), { spacing: { after: 80 } }), p(run(sub, { size: 19 }), { spacing: { after: 200 }, border: rule })];
}
function metaTable() {
  const widths = pct(F.meta[0].map((c) => c[1]));
  return table(widths, F.meta.map((row) => new TableRow({ height: { value: 560, rule: HeightRule.ATLEAST }, children: row.map((c, i) => {
    const span = i === row.length - 1 ? widths.length - row.length + 1 : 1;
    const w = widths.slice(i, i + span).reduce((a, b) => a + b, 0);
    const kids = [p(run(c[0], { bold: true, size: 17 }))];
    if (c[2]) kids.push(p(run(c[2], { size: 16 }), { spacing: { before: 60 } }));
    return cell(kids, w, span > 1 ? { columnSpan: span } : {});
  }) })));
}
const check = (text) => p([run("☐  ", { size: 22 }), run(text)], { spacing: { before: 60, after: 60 } });
const gap = (after = 100) => p(run(""), { spacing: { after } });

const children = [...titleBlock(F.title)];
for (const b of F.blocks) {
  if (b.type === "meta") children.push(metaTable());
  else if (b.type === "fields") children.push(...heading(b.num, b.title, b.hint), fieldTable(b.fields, (b.height || 22) * 14));
  else if (b.type === "grid") {
    children.push(...heading(b.num, b.title, b.hint), grid(b.cols, pct(b.widths), b.first, b.height * 12, b.prefill));
    if (b.after) children.push(gap(60), fieldTable(b.after, 560));
  } else if (b.type === "callout") children.push(gap(), callout(b.title, b.body, b.tone === "cream" ? CREAM : ICE));
  else if (b.type === "check") children.push(...heading(b.num, b.title), ...b.items.map(check));
  else if (b.type === "break") children.push(p(new PageBreak()));
  else if (b.type === "example") {
    const x = F.example;
    children.push(p(new PageBreak()), ...titleBlock(x.title, x.subtitle), pairs(x.rows), p(new PageBreak()),
      ...heading(null, "Outline"), grid(["Heading level", "Heading", "Words"], pct([18, 70, 12]), x.outline, 0),
      ...heading(null, "Links, sources, and images"), pairs(x.links), gap(160), callout(x.note[0], x.note[1], CREAM));
  }
}

const doc = new Document({
  creator: "Angel Phommachan", title: "SEO Content Brief Template",
  description: "An SEO content brief template for one blog post, with a filled-in example.",
  styles: { default: { document: { run: { font: FONT, size: 20, color: INK } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
    footers: { default: new Footer({ children: [p([run(F.footer_left || "", { size: 16 }), run("\t" + F.footer_right, { size: 16, color: RED, bold: true })],
      { tabStops: [{ type: TabStopType.RIGHT, position: W }] })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(OUT, buf); console.log("written", OUT, buf.length); });
