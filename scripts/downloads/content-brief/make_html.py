"""Builds template.html (the PDF version) from fields.json. Usage: python3 make_html.py fields.json template.html"""
import html, json, sys

F = json.load(open(sys.argv[1] if len(sys.argv) > 1 else "fields.json"))
OUT = sys.argv[2] if len(sys.argv) > 2 else "template.html"
RED, INK, CREAM, ICE, LINE, MUTED = "#BB2426", "#210F10", "#F1E7D4", "#C7DEE9", "#D9CDB8", "#6B5A50"
e = html.escape


def sec(num, title, hint=None):
    out = f"<h2><em>{num}</em>{e(title)}</h2>" if num else f"<h2>{e(title)}</h2>"
    return out + (f'<p class="hint">{e(hint)}</p>' if hint else "")


def field(f, h=22):
    ex = f"<i>e.g. {e(f[2])}</i>" if len(f) > 2 and f[2] else ""
    ans = f'<span class="opts">{e(f[3])}</span>' if len(f) > 3 else ""
    return f'<tr><th><b>{e(f[0])}</b><span>{e(f[1])}</span>{ex}</th><td style="height:{h}px">{ans}</td></tr>'


def grid(cols, widths, rows, h, prefill=None, cls="grid"):
    head = "".join(f'<th style="width:{w}%">{e(c)}</th>' for c, w in zip(cols, widths))
    body = ""
    for r, row in enumerate(rows):
        cells = row if isinstance(row, list) else [row] + [""] * (len(cols) - 1)
        if prefill and str(r) in prefill:
            cells = [cells[0]] + prefill[str(r)]
        body += "<tr>" + "".join(
            f'<td class="{"first" if i == 0 else ("pre" if c else "")}" style="height:{h}px">{e(c)}</td>' for i, c in enumerate(cells)) + "</tr>"
    return f'<table class="{cls}"><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table>'


def title_block(title, sub=None):
    t = f'<div class="kicker">{e(F["kicker"])}</div>'
    return t + (f'<h1>{e(title)}</h1><p class="sub">{e(sub)}</p>' if sub else f'<h1 class="ruled">{e(title)}</h1>')


def pairs(rows):
    return '<table class="f ex-f">' + "".join(f"<tr><th><b>{e(l)}</b></th><td>{e(v)}</td></tr>" for l, v in rows) + "</table>"


css = f"""
@page {{ size: Letter; margin: 0.45in 0.75in 0.6in;
  @bottom-left {{ content: "{F['footer_left']}"; font-family: Arial, sans-serif; font-size: 8pt; color: {INK}; }}
  @bottom-right {{ content: "{F['footer_right']}"; font-family: Arial, sans-serif; font-size: 8pt; font-weight: 700; color: {RED}; }} }}
* {{ box-sizing:border-box; }}
body {{ font-family:'Instrument Sans', Arial, sans-serif; color:{INK}; font-size:10pt; margin:0; }}
.page {{ page-break-after:always; }} .page:last-child {{ page-break-after:auto; }}
.kicker {{ color:{RED}; font-weight:700; font-size:8.5pt; letter-spacing:.06em; }}
h1 {{ font-size:24pt; margin:4px 0; }} h1.ruled {{ margin-bottom:10px; padding-bottom:8px; border-bottom:2px solid {RED}; }}
.sub {{ font-size:10pt; margin:0 0 10px; padding-bottom:8px; border-bottom:2px solid {RED}; }}
h2 {{ font-size:12pt; margin:13px 0 4px; }} h2 em {{ font-style:normal; color:{RED}; margin-right:8px; }}
.page > h2:first-child {{ margin-top:0; }}
.hint {{ font-size:8.5pt; margin:0 0 5px; color:{MUTED}; }}
table {{ width:100%; border-collapse:collapse; }}
.f th {{ width:38%; background:{CREAM}; text-align:left; vertical-align:top; padding:5px 9px; border:1px solid {LINE}; font-weight:400; }}
.f th b {{ display:block; font-size:10pt; }} .f th span {{ display:block; font-size:8pt; margin-top:1px; }}
.f th i {{ display:block; font-size:7.5pt; margin-top:2px; color:{MUTED}; }}
.f td {{ border:1px solid {LINE}; padding:5px 9px; vertical-align:top; }}
.meta {{ table-layout:fixed; }} .meta td {{ border:1px solid {LINE}; padding:5px 9px; height:34px; vertical-align:top; font-size:8.5pt; }}
.meta td b {{ display:block; }} .meta td span {{ display:block; font-size:8pt; margin-top:3px; }}
.grid th, .exg th {{ background:{INK}; color:#fff; font-size:8.5pt; text-align:left; padding:5px 8px; }}
.grid td, .exg td {{ border:1px solid {LINE}; padding:4px 8px; font-size:8.5pt; vertical-align:top; }}
.grid td.first, .exg td.first {{ font-weight:700; }} .grid td.pre {{ color:{MUTED}; font-style:italic; }}
.exg td {{ font-size:9pt; }}
.callout {{ background:{ICE}; padding:7px 12px; margin-top:10px; font-size:9.5pt; }} .callout.cream {{ background:{CREAM}; }}
.check {{ margin:5px 0; font-size:10pt; }} .check:before {{ content:'\\2610'; font-size:12pt; margin-right:8px; }}
.gap {{ height:6px; }} .opts {{ font-size:9pt; white-space:pre; }}
.ex-f th {{ width:30%; }} .ex-f td, .ex-f th {{ padding:4px 9px; font-size:9pt; }}
"""

pages, cur = [], title_block(F["title"])
for b in F["blocks"]:
    t = b["type"]
    if t == "meta":
        ncol = max(len(r) for r in F["meta"])
        cur += '<table class="meta"><colgroup>' + "".join(f'<col style="width:{c[1]}%">' for c in F["meta"][0]) + "</colgroup>" + "".join(
            "<tr>" + "".join(f'<td colspan="{1 + (ncol - len(row) if i == len(row) - 1 else 0)}"><b>{e(c[0])}</b>' + (f"<span>{e(c[2])}</span>" if len(c) > 2 else "") + "</td>" for i, c in enumerate(row)) + "</tr>"
            for row in F["meta"]) + "</table>"
    elif t == "fields":
        cur += sec(b["num"], b["title"], b.get("hint")) + '<table class="f">' + "".join(field(f, b.get("height", 22)) for f in b["fields"]) + "</table>"
    elif t == "grid":
        cur += sec(b["num"], b["title"], b.get("hint")) + grid(b["cols"], b["widths"], b["first"], b["height"], b.get("prefill"))
        if b.get("after"):
            cur += '<div class="gap"></div><table class="f">' + "".join(field(f, 28) for f in b["after"]) + "</table>"
    elif t == "callout":
        cur += f'<div class="callout{" cream" if b.get("tone") == "cream" else ""}"><b>{e(b["title"])}</b> {e(b["body"])}</div>'
    elif t == "check":
        cur += sec(b["num"], b["title"]) + "".join(f'<div class="check">{e(i)}</div>' for i in b["items"])
    elif t == "break":
        pages.append(cur); cur = ""
    elif t == "example":
        pages.append(cur)
        x = F["example"]
        pages.append(title_block(x["title"], x["subtitle"]) + pairs(x["rows"]))
        cur = sec(None, "Outline") + grid(["Heading level", "Heading", "Words"], [18, 70, 12], x["outline"], 0, cls="exg")
        cur += sec(None, "Links, sources, and images") + pairs(x["links"])
        cur += f'<div class="callout cream"><b>{e(x["note"][0])}</b> {e(x["note"][1])}</div>'
pages.append(cur)
pages = [p for p in pages if p]

doc = f"""<!doctype html><html><head><meta charset="utf-8"><title>SEO Content Brief Template</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"><style>{css}</style></head>
<body>{"".join(f'<div class="page">{p}</div>' for p in pages)}</body></html>"""
open(OUT, "w").write(doc)
print("written", OUT, len(pages), "pages")
