const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, AlignmentType, TableLayoutType, PageBreak, Footer, Header, TabStopType, VerticalAlign, HeightRule,
} = require("docx");

// Brand: red, near-black, cream, ice. Arial so it renders the same for everyone.
const RED = "BB2426", INK = "210F10", CREAM = "F1E7D4", ICE = "C7DEE9", LINE = "D9CDB8", WHITE = "FFFFFF";
const FONT = "Arial";
const W = 10080; // US Letter, 0.75in margins

const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const pad = { top: 90, bottom: 90, left: 140, right: 140 };

const run = (text, o = {}) => new TextRun({ text, font: FONT, color: INK, size: 20, ...o });
const p = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], ...o });

function heading(text, num) {
  return p([run(num ? `${num}  ` : "", { color: RED, bold: true, size: 24 }), run(text, { bold: true, size: 24 })],
    { spacing: { before: 280, after: 120 }, keepNext: true });
}

function cell(children, width, o = {}) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA }, margins: pad, verticalAlign: VerticalAlign.TOP,
    children: Array.isArray(children) ? children : [children], ...o,
  });
}
const shade = (fill) => ({ fill, type: ShadingType.CLEAR, color: "auto" });

// Field row: label + prompt on the left (cream), blank answer space on the right.
function fieldRow(label, prompt, height = 620) {
  return new TableRow({
    height: { value: height, rule: HeightRule.ATLEAST }, cantSplit: true,
    children: [
      cell([p(run(label, { bold: true })), p(run(prompt, { size: 16 }), { spacing: { before: 40 } })], 3800, { shading: shade(CREAM) }),
      cell(p(run("")), 6280),
    ],
  });
}
function fieldTable(rows) {
  return new Table({ layout: TableLayoutType.FIXED, width: { size: W, type: WidthType.DXA }, columnWidths: [3800, 6280], rows });
}

function headRow(labels, widths) {
  return new TableRow({
    tableHeader: true,
    children: labels.map((l, i) => cell(p(run(l, { bold: true, size: 17, color: WHITE })), widths[i], { shading: shade(INK) })),
  });
}
function blankRows(n, widths, first, height = 520) {
  return Array.from({ length: n }, (_, r) => new TableRow({
    height: { value: height, rule: HeightRule.ATLEAST }, cantSplit: true,
    children: widths.map((w, i) => cell(p(run(i === 0 && first ? first(r) : "", { bold: i === 0 })), w)),
  }));
}
function grid(labels, widths, n, first, height) {
  return new Table({ layout: TableLayoutType.FIXED, width: { size: W, type: WidthType.DXA }, columnWidths: widths, rows: [headRow(labels, widths), ...blankRows(n, widths, first, height)] });
}

function callout(title, body, fill = ICE) {
  return new Table({
    layout: TableLayoutType.FIXED, width: { size: W, type: WidthType.DXA }, columnWidths: [W],
    rows: [new TableRow({ children: [new TableCell({
      borders: noBorders, width: { size: W, type: WidthType.DXA }, shading: shade(fill),
      margins: { top: 140, bottom: 140, left: 200, right: 200 },
      children: [p([run(title + "  ", { bold: true }), run(body)])],
    })] })],
  });
}

const box = "☐"; // empty ballot box
function check(text) {
  return p([run(box + "  ", { size: 22 }), run(text)], { spacing: { before: 60, after: 60 }, indent: { left: 0 } });
}

function titleBlock(title, sub) {
  return [
    p([run("CONTENT BRIEF TEMPLATE", { bold: true, color: RED, size: 18 })], { spacing: { after: 60 } }),
    p(run(title, { bold: true, size: 44 }), { spacing: { after: 80 } }),
    p(run(sub, { size: 21 }), { spacing: { after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: RED, space: 8 } } }),
  ];
}

// ---------- Page 1: the decisions ----------
const page1 = [
  ...titleBlock("Content brief", "One page of decisions before the first draft. Fill it in order; most briefs take about 20 minutes."),
  new Table({
    layout: TableLayoutType.FIXED, width: { size: W, type: WidthType.DXA }, columnWidths: [5040, 2520, 2520],
    rows: [new TableRow({ children: [
      cell([p(run("Working title", { bold: true, size: 17 })), p(run(""))], 5040),
      cell([p(run("Writer", { bold: true, size: 17 })), p(run(""))], 2520),
      cell([p(run("Publish date", { bold: true, size: 17 })), p(run(""))], 2520),
    ] })],
  }),
  heading("Reader and goal", "01"),
  fieldTable([
    fieldRow("Reader", "Who is this for? One sentence, specific enough to picture."),
    fieldRow("Goal", "What should they know or do when they finish?"),
  ]),
  heading("Search", "02"),
  fieldTable([
    fieldRow("Primary keyword", "The phrase your reader types. Add monthly searches and difficulty."),
    fieldRow("Secondary keywords", "Two or three related phrases or questions (People also ask, autocomplete)."),
    fieldRow("Search intent", "Search it yourself. What do the results show people expect: a how-to, a list, a review?"),
  ]),
  heading("Angle and shape", "03"),
  fieldTable([
    fieldRow("The gap", "What none of the top three results do. Fill in page 2 first, then summarize here."),
    fieldRow("Angle", "The one idea your piece adds."),
    fieldRow("Length", "Top-three average ÷ 3 = a starting point, not a quota.", 480),
  ]),
  heading("Next step and proof", "04"),
  fieldTable([
    fieldRow("Call to action", "The one thing the reader should do next. Decide it now, not after the draft."),
    fieldRow("Success measure", "One number to check 30 days after publishing (ranking, time on page, clicks)."),
  ]),
  p(run(""), { spacing: { after: 120 } }),
  callout("Ready to write?", "You should be able to say the reader, the goal, and the gap in one sentence each. If you can't, keep researching before you draft."),
];

// ---------- Page 2: the research ----------
const page2 = [
  p(new PageBreak()),
  heading("What already ranks", "05"),
  p(run("Open the top three results that aren't ads. Skim the headings; you're looking for what's missing.", { size: 18 }), { spacing: { after: 120 } }),
  grid(["#", "Title and URL", "Length", "What it covers", "What it misses"], [500, 3080, 1100, 2700, 2700], 3, (r) => String(r + 1), 760),
  heading("Outline", "06"),
  p(run("Turn the questions from your keyword research into headings. Broad questions become H2s; follow-ups become H3s.", { size: 18 }), { spacing: { after: 120 } }),
  grid(["Level", "Heading", "Question it answers"], [1100, 4990, 3990], 6, (r) => ["H1", "H2", "H3", "H2", "H3", "H2"][r], 440),
  heading("Sources, images, and links", "07"),
  p(run("Open every source and confirm it still says what you need before you write a word.", { size: 18 }), { spacing: { after: 120 } }),
  grid(["Source, image, or link", "What it supports", "Checked"], [4590, 4290, 1200], 5, () => "", 440),
  heading("Before you publish", "08"),
  check("Primary keyword in the title, the first 100 words, and one H2"),
  check("Every number links to a source you opened"),
  check("Two or three links to your own related pages"),
  check("Images credited, with descriptive alt text"),
  check("The call to action matches the goal on page 1"),
  check("Success measure and check-in date added to your calendar"),
];

// ---------- Page 3: worked example ----------
function exRow(label, text) {
  return new TableRow({ cantSplit: true, children: [
    cell(p(run(label, { bold: true })), 3800, { shading: shade(CREAM) }),
    cell(p(run(text)), 6280),
  ] });
}
const page3 = [
  p(new PageBreak()),
  ...titleBlock("Example: a filled-in brief", "The brief behind “Owala vs. Stanley: New Colors or New Products?” on angelphommachan.com. Keyword data from Ahrefs, US."),
  fieldTable([
    exRow("Reader", "Marketers and marketing students who want to see how two brands grow after one hit product"),
    exRow("Goal", "Understand the tradeoff between refreshing a best-seller and launching new products"),
    exRow("Primary keyword", "owala vs stanley (1,800 monthly searches, very low difficulty)"),
    exRow("Secondary keywords", "owala color drop (4,600), why is owala so popular (250), stanley marketing strategy"),
    exRow("Search intent", "Shoppers comparing the bottles: every top result is a product test"),
    exRow("Top three results", "Reviewed, BYU Design Review, and a blogger review, about 1,000 to 1,600 words each"),
    exRow("The gap", "No one compared the two brands’ marketing strategies"),
    exRow("Angle", "New colors or new products: what each strategy costs and when it works"),
    exRow("Length", "Average ÷ 3 ≈ 470 words; finished at about 1,480 to cover the products, ads, and blogs"),
    exRow("Sources", "Retail Dive, Fast Company, The Drum, Owala’s Color Drop FAQ, ASI (each opened and checked)"),
    exRow("Call to action", "Notice where each brand’s ads and links send you, then answer: refresh it or build something new?"),
    exRow("Success measure", "Ranking for “owala vs stanley” and time on page after 30 days"),
  ]),
  p(run(""), { spacing: { after: 160 } }),
  callout("What changed after research:", "One planned quote was no longer on Owala’s site, so it came out before drafting. A classmate pointed out that the main growth number came from a corporate-gifting search platform, so the post now says so plainly.", CREAM),
];

const doc = new Document({
  creator: "Angel Phommachan",
  title: "Content Brief Template",
  description: "A three-page content brief template for one blog post or video, with a filled-in example.",
  styles: { default: { document: { run: { font: FONT, size: 20, color: INK } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } },
    footers: { default: new Footer({ children: [p([
      run("Content brief template by Angel Phommachan", { size: 16 }),
      run("\tangelphommachan.com", { size: 16, color: RED, bold: true }),
    ], { tabStops: [{ type: TabStopType.RIGHT, position: W }] })] }) },
    children: [...page1, ...page2, ...page3],
  }],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync("content-brief-template.docx", buf); console.log("written", buf.length); });
