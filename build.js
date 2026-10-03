// Builds one static HTML page per generator in generators.json, plus index.html and sitemap.xml.
// Run: node build.js
const fs = require('fs');
const { site, generators } = JSON.parse(fs.readFileSync('generators.json', 'utf8'));
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const page = (title, desc, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="stylesheet" href="/style.css">
</head>
<body>
<header><a href="/">${esc(site.name)}</a></header>
<main>
${body}
</main>
<footer>Free to use. Check a name isn't already taken before you print the shirts.</footer>
</body>
</html>
`;

for (const g of generators) {
  const others = generators.filter(o => o !== g)
    .map(o => `<li><a href="/${o.slug}">${esc(o.title)}</a></li>`).join('\n');
  const data = JSON.stringify({ a: g.a, b: g.b, c: g.c || [], patterns: g.patterns });
  fs.writeFileSync(`${g.slug}.html`, page(`${g.title} (Free, No Sign-Up)`, g.blurb, `<h1>${esc(g.title)}</h1>
<p>${esc(g.intro)}</p>
<button id="go">Generate names</button>
<ul id="names" aria-live="polite"></ul>
<h2>More generators</h2>
<ul class="list">
${others}
</ul>
<script>window.GEN = ${data};</script>
<script src="/app.js"></script>`));
}

fs.writeFileSync('index.html', page(`${site.name}: Free Band Name Generators by Genre`,
  'Free band name generators for specific genres: doom metal, shoegaze, bluegrass, punk, synthwave, jam bands and more.',
  `<h1>Band name generators, one genre at a time</h1>
<p>Pick your genre. Click the button. Get ten names that actually sound like that kind of band.</p>
<ul class="list">
${generators.map(g => `<li><a href="/${g.slug}">${esc(g.title)}</a><span>${esc(g.blurb)}</span></li>`).join('\n')}
</ul>`));

if (site.url) {
  const urls = ['', ...generators.map(g => g.slug)]
    .map(p => `<url><loc>${site.url}/${p}</loc></url>`).join('\n');
  fs.writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);
  fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
}
console.log(`Built ${generators.length} generator pages.`);
