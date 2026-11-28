# Content brief template (download)

- `build.js` builds `public/downloads/content-brief-template.docx` (run from a folder with the `docx` npm package: `node build.js`, then copy the output).
- `template.html` is the same template for the PDF. Print it with headless Chrome:
  `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf=public/downloads/content-brief-template.pdf scripts/downloads/content-brief/template.html`
- Keep the two in sync when a field changes. The post that offers it: content/posts/how-to-write-a-content-brief.mdx.
