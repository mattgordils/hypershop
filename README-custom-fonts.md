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

Under **Theme settings → Typography**, each of the three font roles (heading,
body, button) has:

- A **"Use uploaded … font"** checkbox (`use_uploaded_font_heading` /
  `use_uploaded_font_body` / `use_uploaded_font_button`)
- **Four `.woff2` URL fields** — Regular, Italic, Bold, Bold Italic — that only
  appear when the matching checkbox is on

When the checkbox is on, the native `font_picker` for that role is hidden and
[`snippets/theme-settings.liquid`](snippets/theme-settings.liquid) emits an
`@font-face` for each URL that's set:

| Slot        | `font-weight` | `font-style` |
|-------------|---------------|--------------|
| Regular     | 400           | normal       |
| Italic      | 400           | italic       |
| Bold        | 700           | normal       |
| Bold Italic | 700           | italic       |

The CSS variables `--secondary-font` / `--main-font` / `--button-font` are then
re-declared to point at the custom family (`custom-heading` / `custom-body` /
`custom-button`) with the picker's `fallback_families` as the fallback chain.

Empty URL slots simply aren't emitted — the browser will synthesize fake bold or
italic from whatever face *is* present, which mirrors the merchant's expectation
that "bold text should look bold, even if I only uploaded Regular."

### How a merchant uses it

1. Shopify admin → **Content → Files** → upload one `.woff2` per weight/style.
   (Upload to Files, **not** the theme code editor — some font files corrupt there.)
2. Copy each file's CDN URL (`https://cdn.shopify.com/...`).
3. Toggle **Use uploaded … font** in Typography, then paste the URLs into the
   matching slots. Regular is the minimum; the other three are optional.

Notes / limitations:
- `.woff2` only.
- Keep the files on Shopify's CDN (Files) — an external host trips theme-check's
  `RemoteAsset` rule and hurts performance.
- Optional perf upgrade: add a `<link rel="preload">` for the Regular woff2 near
  the top of `theme-settings.liquid` (inside the marker comments so it strips too).

---

## How the gating works

Two physically-strippable hooks, removed by
[`scripts/strip-custom-fonts.js`](scripts/strip-custom-fonts.js):

1. **`snippets/theme-settings.liquid`** — the block is wrapped in
   `{%- comment -%} CUSTOM_FONTS_START … CUSTOM_FONTS_END {%- endcomment -%}`.
   The script deletes that region inclusive.

2. **`config/settings_schema.json`** — every custom-font setting definition uses
   an id that starts with `custom_font_` or `use_uploaded_font_`, and each is on
   its own **leading-comma line** so removal keeps the JSON valid:
   ```json
   { "type": "font_picker", "id": "font_button", ..., "visible_if": "..." }
   , { "type": "checkbox", "id": "use_uploaded_font_heading", ... }
   , { "type": "url",      "id": "custom_font_heading_url", ... }
   , { "type": "url",      "id": "custom_font_heading_italic_url", ... }
   ...
   ```
   The script drops any line whose `"id": "..."` matches the two prefixes, and
   also strips the `, "visible_if": "..."` fragment from surviving picker lines
   when it references a removed toggle. Because comma leads each added line (and
   the last `font_picker` has no trailing comma), the JSON stays valid either way.

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

1. **`config/settings_schema.json`** — in the `"Typography"` group, add
   `"visible_if"` to each of the three `font_picker` fields:
   ```json
   { "type": "font_picker", "id": "font_heading", ..., "visible_if": "{{ settings.use_uploaded_font_heading != true }}" }
   ```
   Then after the pickers (leading-comma style), add for each role:
   ```json
   , { "type": "checkbox", "id": "use_uploaded_font_heading", "label": "Use uploaded headings font", "default": false }
   , { "type": "url", "id": "custom_font_heading_url",             "label": "Headings — Regular (.woff2 URL)",     "visible_if": "{{ settings.use_uploaded_font_heading }}" }
   , { "type": "url", "id": "custom_font_heading_italic_url",      "label": "Headings — Italic (.woff2 URL)",      "visible_if": "{{ settings.use_uploaded_font_heading }}" }
   , { "type": "url", "id": "custom_font_heading_bold_url",        "label": "Headings — Bold (.woff2 URL)",        "visible_if": "{{ settings.use_uploaded_font_heading }}" }
   , { "type": "url", "id": "custom_font_heading_bold_italic_url", "label": "Headings — Bold Italic (.woff2 URL)", "visible_if": "{{ settings.use_uploaded_font_heading }}" }
   ```
   Repeat for `body` and `button`.
2. **`snippets/theme-settings.liquid`** — inside the `{% style %}` block, after the
   main `:root { … }` closes, add the `CUSTOM_FONTS_START … END` block: gated by
   each `use_uploaded_font_*` toggle, emit four `@font-face` rules per role
   (weights 400/700 × styles normal/italic) for the URLs that are set, then a
   `:root { … }` re-declaring `--secondary-font` / `--main-font` / `--button-font`.
3. Keep the `scripts/strip-custom-fonts.js`, the `prep:store` / `restore:custom-fonts`
   / `push:store` npm scripts, and the `scripts/.custom-fonts-backup` gitignore entry.

---

## Theme Store submission checklist

- [ ] `npm run prep:store` (or `push:store`) so the feature is stripped.
- [ ] `shopify theme check` passes with **0 errors**.
- [ ] No `custom_font_*` or `use_uploaded_font_*` settings remain in
      `config/settings_schema.json`.
- [ ] No `CUSTOM_FONTS_*` markers remain in `snippets/theme-settings.liquid`.
- [ ] Surviving `font_picker` lines have no `visible_if` referencing removed
      toggles.
- [ ] Typography still works through the native `font_picker` fields.
