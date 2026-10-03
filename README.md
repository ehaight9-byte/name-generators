# Band Name Forge

Static site of genre-specific band name generators. No build step on the host.

## Add a generator
1. Add an entry to `generators.json` (slug, title, blurb, intro, word lists `a`/`b`/optional `c`, patterns).
2. Run `node build.js`.
3. Commit everything and push to `main`. Netlify publishes automatically.

Pattern tokens: `{a}` `{a2}` `{b}` `{b2}` `{c}`.
Set `site.url` in `generators.json` to the live address to generate `sitemap.xml` and `robots.txt`.
