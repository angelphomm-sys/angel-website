"""Builds template.html (the PDF version) from fields.json. Usage: python3 make_html.py fields.json template.html"""
import html, json, sys

F = json.load(open(sys.argv[1] if len(sys.argv) > 1 else "fields.json"))
OUT = sys.argv[2] if len(sys.argv) > 2 else "template.html"
RED, INK, CREAM, ICE, LINE = "#BB2426", "#210F10", "#F1E7D4", "#C7DEE9", "#D9CDB8"
e = html.escape


def field(label, prompt, h=24):
    return f'<tr><th><b>{e(label)}</b><span>{e(prompt)}</span></th><td style="height:{h}px"></td></tr>'


def grid(cols, widths, rows, first=None, h=26):
    head = "".join(f'<th style="width:{w}%">{e(c)}</th>' for c, w in zip(cols, widths))
    body = "".join("<tr>" + "".join(f'<td style="height:{h}px">{e(first(r)) if (first and i == 0) else ""}</td>' for i in range(len(cols))) + "</tr>" for r in range(rows))
    return f'<table class="grid"><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table>'


def sec(num, title):
    return f"<h2><em>{num}</em>{e(title)}</h2>"


css = f"""
@page {{ size: Letter; margin: 0.45in 0.75in 0.6in;
  @bottom-left {{ content: "{F['footer_left']}"; font-family: Arial, sans-serif; font-size: 8pt; color: {INK}; }}
  @bottom-right {{ content: "{F['footer_right']}"; font-family: Arial, sans-serif; font-size: 8pt; font-weight: 700; color: {RED}; }} }}
* {{ box-sizing:border-box; }}
body {{ font-family:'Instrument Sans', Arial, sans-serif; color:{INK}; font-size:10pt; margin:0; }}
.page {{ page-break-after:always; }} .page:last-child {{ page-break-after:auto; }}
.kicker {{ color:{RED}; font-weight:700; font-size:8.5pt; letter-spacing:.06em; }}
h1 {{ font-size:24pt; margin:4px 0; }}
.sub {{ font-size:10.5pt; margin:0 0 10px; padding-bottom:8px; border-bottom:2px solid {RED}; }}
h2 {{ font-size:12pt; margin:9px 0 4px; }} h2 em {{ font-style:normal; color:{RED}; margin-right:8px; }}
.hint {{ font-size:9pt; margin:0 0 6px; }}
table {{ width:100%; border-collapse:collapse; }}
.f th {{ width:38%; background:{CREAM}; text-align:left; vertical-align:top; padding:6px 9px; border:1px solid {LINE}; font-weight:400; }}
.f th b {{ display:block; font-size:10pt; }} .f th span {{ display:block; font-size:8pt; margin-top:2px; }}
.f td {{ border:1px solid {LINE}; padding:6px 9px; vertical-align:top; }}
.meta td {{ border:1px solid {LINE}; padding:5px 9px; height:32px; vertical-align:top; font-size:8.5pt; font-weight:700; }}
.grid th {{ background:{INK}; color:#fff; font-size:8.5pt; text-align:left; padding:5px 8px; }}
.grid td {{ border:1px solid {LINE}; padding:5px 8px; font-weight:700; font-size:9pt; vertical-align:top; }}
.callout {{ background:{ICE}; padding:7px 12px; margin-top:8px; font-size:9.5pt; }} .callout.cream {{ background:{CREAM}; }}
.check {{ margin:4px 0; font-size:10pt; }} .check:before {{ content:'\\2610'; font-size:12pt; margin-right:8px; }}
.gap {{ height:8px; }}
"""

p1 = f'<div class="page"><div class="kicker">{e(F["kicker"])}</div><h1>{e(F["title"])}</h1><p class="sub">{e(F["subtitle"])}</p>'
p1 += '<table class="meta"><tr><td style="width:50%">Working title</td><td style="width:25%">Writer</td><td>Publish date</td></tr></table>'
for s in F["sections"]:
    p1 += sec(s["num"], s["title"]) + '<table class="f">' + "".join(field(l, pr) for l, pr in s["fields"]) + "</table>"
p1 += f'<div class="callout"><b>{e(F["ready"][0])}</b> {e(F["ready"][1])}</div></div>'

r, o, s, pub = F["ranks"], F["outline"], F["sources"], F["publish"]
p2 = '<div class="page">' + sec(r["num"], r["title"]) + f'<p class="hint">{e(r["hint"])}</p>'
p2 += grid(r["cols"], [5, 31, 11, 26.5, 26.5], 3, lambda i: str(i + 1), 48)
p2 += '<div class="gap"></div><table class="f">' + field(r["ai"][0], r["ai"][1], 30) + "</table>"
p2 += sec(o["num"], o["title"]) + f'<p class="hint">{e(o["hint"])}</p>' + grid(o["cols"], [15, 46, 39], len(o["levels"]), lambda i: o["levels"][i], 24)
p2 += sec(s["num"], s["title"]) + f'<p class="hint">{e(s["hint"])}</p>' + grid(s["cols"], [46, 42, 12], 5, None, 24)
p2 += sec(pub["num"], pub["title"]) + "".join(f'<div class="check">{e(i)}</div>' for i in pub["items"]) + "</div>"

x = F["example"]
p3 = f'<div class="page"><div class="kicker">{e(F["kicker"])}</div><h1>{e(x["title"])}</h1><p class="sub">{e(x["subtitle"])}</p><table class="f">'
p3 += "".join(f"<tr><th><b>{e(l)}</b></th><td>{e(t)}</td></tr>" for l, t in x["rows"]) + "</table>"
p3 += f'<div class="callout cream"><b>{e(x["note"][0])}</b> {e(x["note"][1])}</div></div>'

doc = f"""<!doctype html><html><head><meta charset="utf-8"><title>SEO Content Brief Template</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;700&display=swap" rel="stylesheet"><style>{css}</style></head>
<body>{p1}{p2}{p3}</body></html>"""
open(OUT, "w").write(doc)
print("written", OUT)
