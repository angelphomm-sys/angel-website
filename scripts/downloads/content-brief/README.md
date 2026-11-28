# SEO content brief template (download)

All wording lives in `fields.json`. Edit it, then rebuild both files:

1. Word: from a folder with the `docx` npm package installed,
   `node build.js <repo>/scripts/downloads/content-brief/fields.json <repo>/public/downloads/seo-content-brief-template.docx`
2. PDF: `python3 make_html.py fields.json template.html`, then
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf=<repo>/public/downloads/seo-content-brief-template.pdf template.html`
   Check it is still 6 pages (4 to fill in, 2 for the example).

Offered in content/posts/how-to-write-an-seo-content-brief.mdx (Download component, components/Download.tsx).
