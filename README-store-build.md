# Store build & the strip list

This theme ships in **two flavors**:

- **Full (custom sites):** everything, including DX tooling and dev-only features.
- **Theme Store:** a slightly stripped-down build with DX-only features removed,
  either because the Store prohibits them or because merchants don't need them.

This file is the **running list of what gets stripped** for the Theme Store
build. When you add a DX-only feature or a dev-only surface, add it here.

## The build/push flow

```
npm run push:store
# = build:store (unminified webpack) → prep:store (strip) → shopify theme push → restore
```

`prep:store` runs the strip scripts, pushes the store-safe state, then restores
your working tree so local dev is untouched. See the per-feature scripts in
`scripts/`.

## What reaches the store

`shopify theme push` uploads the theme folders (`assets/ config/ layout/ locales/
sections/ snippets/ templates/ blocks/`). Root dev files are kept out via
[`.shopifyignore`](.shopifyignore). So there are two kinds of stripping:

- **Theme-folder content** → removed by a strip script (it's inside a folder that
  ships).
- **Root dev files** → excluded by `.shopifyignore` (never uploaded).

## The strip list

| # | Item | Files affected | Method | Status |
|---|------|----------------|--------|--------|
| 1 | **Custom fonts** (merchant .woff2 upload — Store prohibits) | `snippets/theme-settings.liquid` region, `config/settings_schema.json` `custom_font_*` lines | `scripts/strip-custom-fonts.js` | ✅ Automated in `push:store` |
| 2 | **Styleguide** (dev preview of global styles) | `sections/styleguide.liquid`, `templates/page.styleguide.json`, the "Styleguide" tip paragraph in `config/settings_schema.json` (Schemes group) | delete the two files + remove the paragraph | ⏳ Manual — automate next |
| 3 | **Section-test / dump page** (QA page rendering every section) | `templates/page.section-test.json` | delete the file | ⏳ Manual — automate next |
| — | **Dev docs & build config** (README-*.md, `scripts/`, `webpack.config.js`, `postcss.config.js`, `node_modules/`) | root only | [`.shopifyignore`](.shopifyignore) | ⚠️ Partial — `src/`, `package*.json` ignored; add the rest |

## Conventions for adding a strip item

- **A whole dev-only file** (a template, a section): list it above and delete it
  in a strip script (or a shared `scripts/strip-store.js`).
- **A region inside a file that also has production code** (like custom fonts):
  wrap it in `FEATURE_START` / `FEATURE_END` marker comments and remove the
  region in a strip script — see `strip-custom-fonts.js` for the pattern.
- **JSON settings that must stay valid after removal:** use leading-comma style
  (`, { … }`) so a line can be deleted without breaking the JSON, and
  `JSON.parse` the result in the script to fail loudly. Again, see
  `strip-custom-fonts.js`.
- **A root-level dev file:** just add it to `.shopifyignore`.

Always restore after pushing (`push:store` does this automatically) so local dev
keeps the full feature set.
