# Custom fonts (non–Theme-Store builds)

This theme ships a **merchant-uploaded custom font** feature for client / custom
builds. It is **intentionally excluded from Theme Store submissions** because the
Store prohibits it:

> "All fonts must use the setting type `font_picker`." — "Custom fonts aren't accepted."
> — [Shopify Theme Store requirements](https://shopify.dev/themes/store/requirements)

A runtime toggle is **not** enough to satisfy that rule — reviewers read the
schema and Liquid source, so the capability has to be physically absent from the
submitted theme. The build below strips it.

> ⚠️ `STORE_BUILD=1` only affects webpack (JS/CSS minification). It does **not**
> touch Liquid or `settings_schema.json`, which `shopify theme push` sends as-is.
> That's why we strip those files with a script instead.

---

## What the feature does

Under **Theme settings → Typography**, three `url` fields sit beneath the native
`font_picker` fields:

- `custom_font_heading_url` → overrides `--secondary-font` (headings)
- `custom_font_body_url` → overrides `--main-font` (body)
- `custom_font_button_url` → overrides `--button-font` (buttons)

When a URL is set, [`snippets/theme-settings.liquid`](snippets/theme-settings.liquid)
emits an `@font-face` rule and re-declares the matching CSS variable. Empty fields
fall back to the `font_picker` selection, so the feature is invisible until used.

### How a merchant uses it

1. Shopify admin → **Content → Files** → upload a `.woff2`.
   (Upload to Files, **not** the theme code editor — some font files corrupt there.)
2. Copy the file's CDN URL (`https://cdn.shopify.com/...`).
3. Paste it into the matching **Custom … font (.woff2 URL)** field in Typography.

Notes / limitations:
- `.woff2` only. One file covers all weights (`font-weight: 100 900`); for separate
  weights/italics, add more `@font-face` rules in the marked block.
- Keep the file on Shopify's CDN (Files) — an external host trips theme-check's
  `RemoteAsset` rule and hurts performance.
- Optional perf upgrade: add a `<link rel="preload">` for the woff2 near the top of
  `theme-settings.liquid` (also inside marker comments so it strips too).

---

## How the gating works

Two physically-strippable hooks, removed by
[`scripts/strip-custom-fonts.js`](scripts/strip-custom-fonts.js):

1. **`snippets/theme-settings.liquid`** — the block is wrapped in
   `{%- comment -%} CUSTOM_FONTS_START … CUSTOM_FONTS_END {%- endcomment -%}`.
   The script deletes that region inclusive.
2. **`config/settings_schema.json`** — the three settings use **leading-comma JSON
   style** so every line contains `custom_font_`:
   ```json
   { "type": "font_picker", "id": "font_button", ... }
   , { "type": "url", "id": "custom_font_heading_url", ... }
   , { "type": "url", "id": "custom_font_body_url", ... }
   , { "type": "url", "id": "custom_font_button_url", ... }
   ```
   The script drops every line containing `custom_font_`; because the comma leads
   each added line (and `font_button` has no trailing comma), the JSON stays valid
   whether the lines are present or stripped.

The script backs the two files up to `scripts/.custom-fonts-backup/` (gitignored)
before stripping, and `--restore` copies them back.

---

## Commands

```bash
# Custom / client build — nothing to do, the feature is on by default.
npm run build && shopify theme push

# Theme Store submission — strip, push, auto-restore:
npm run push:store          # build:store → prep:store → theme push → restore

# Or run the steps manually:
npm run build:store         # webpack, unminified for reviewers
npm run prep:store          # strip the custom-font feature (backs up first)
shopify theme push          # push / or build a ZIP for submission
npm run restore:custom-fonts # put the feature back
```

> Commit your work before `prep:store` / `push:store`. Restore is backup-based, but
> committing first is the reliable safety net.

---

## Re-adding from scratch (if the hooks ever get lost)

1. **`config/settings_schema.json`** — in the `"Typography"` group, after the
   `font_button` `font_picker`, add (leading-comma style):
   ```json
   , { "type": "url", "id": "custom_font_heading_url", "label": "Custom headings font (.woff2 URL)", "info": "Non–Theme-Store builds only. ..." }
   , { "type": "url", "id": "custom_font_body_url", "label": "Custom body font (.woff2 URL)", "info": "..." }
   , { "type": "url", "id": "custom_font_button_url", "label": "Custom button font (.woff2 URL)", "info": "..." }
   ```
2. **`snippets/theme-settings.liquid`** — inside the `{% style %}` block, after the
   main `:root { … }` closes, add the `CUSTOM_FONTS_START … END` block: read the
   three settings, emit an `@font-face` per non-blank URL (family names
   `custom-heading` / `custom-body` / `custom-button`), then a `:root { … }` that
   re-declares `--secondary-font` / `--main-font` / `--button-font`.
3. Keep the `scripts/strip-custom-fonts.js`, the `prep:store` / `restore:custom-fonts`
   / `push:store` npm scripts, and the `scripts/.custom-fonts-backup` gitignore entry.

---

## Theme Store submission checklist

- [ ] `npm run prep:store` (or `push:store`) so the feature is stripped.
- [ ] `shopify theme check` passes with **0 errors**.
- [ ] No `custom_font_*` settings remain in `config/settings_schema.json`.
- [ ] No `CUSTOM_FONTS_*` markers remain in `snippets/theme-settings.liquid`.
- [ ] Typography still works through the native `font_picker` fields.
