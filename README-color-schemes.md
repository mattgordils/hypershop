# Color schemes

Color schemes are the theme's color system. Each scheme is a set of colors a
merchant (or you) can apply to any section via its **Section color** setting.

## How it works — one source, one generator

There is a **single source of truth**: the schemes stored in the theme's color
system (`config/settings_data.json` → `color_schemes`, editable in the theme
editor). [`snippets/color-schemes.liquid`](snippets/color-schemes.liquid) reads
every scheme and generates one CSS class per scheme — `.{scheme.id}` — with all
the theme's `--` custom properties derived from that scheme's colors.

- Sections apply the class via `{{ section.settings.color_scheme }}` (the setting
  value *is* the scheme id, e.g. `theme-dark`).
- The **first scheme is the site-wide default** — the generator also writes it to
  `:root`, so background/text/colors cascade from it until a section applies
  another scheme. There's no separate "global colors" for these.
- `src/styles/global/themes.css` no longer hardcodes scheme classes — it only
  holds internal, non-selectable color combos.

The only truly global colors are **Error** and **Success** (Theme settings →
Colors), and even those can be overridden per scheme.

So there is nothing to keep in sync by hand: define a scheme once, and its class
+ colors are generated automatically.

## What each scheme controls

Every scheme has a few **base** colors plus **optional** fields that fall back to
a derived look when left blank — so a simple scheme only needs the first three:

- **Base:** Background (+ optional gradient), Text, Accent (links/highlights).
- **Optional overrides:** Line/border, Subtle background, Error, Success.
- **Optional buttons:** primary & secondary button background / label / border.

Blank optional fields reproduce the current derived styling (e.g. line = a subtle
tint of text; primary button = text-on-background). Set one only to override it.

## Add or edit a scheme — two ways, both work

**In the editor:** Theme settings → Colors → add/edit a scheme. Shopify assigns
it an id (e.g. `scheme-5`); the generator picks it up on the next render. No code
change needed.

**In code:** add an entry to `config/settings_data.json` → `current.color_schemes`:

```json
"theme-sand": {
  "settings": { "background": "#e9e2d0", "text": "#1a1a1a", "accent": "#8a5a2b" }
}
```

It appears in the Section color dropdown *and* gets its `.theme-sand` class — no
CSS or schema edit required.

## Add a new scheme color

The per-scheme colors come from the `color_scheme_group` **definition** in
[`config/settings_schema.json`](config/settings_schema.json). To add one:

1. Add a color field to `definition` (pick any `id`; type must be `color` or
   `color_background`):
   ```json
   { "type": "color", "id": "border", "label": "Border", "default": "#000000" }
   ```
2. Reference it in `color-schemes.liquid` and assign it to a `--var`:
   ```liquid
   --border-color: {{ scheme.settings.border }};
   ```

Definition ids are yours to invent — add as many as you like. Everything else
(`--light-text-color`, `--hr-color`, the button colors…) is *derived* in
`color-schemes.liquid` from these base colors; edit that formula to change how a
scheme expands.

## Roles

The `role` object maps Shopify's fixed set of semantic roles (`background`,
`text`, `primary_button`, `links`, `icons`, …) to your definition ids. Roles
drive **native Shopify UI and the editor's contextual previews** — our custom
sections don't rely on them, since they read the generated `--vars` directly. The
role key names are defined by Shopify; you can't invent new ones.

## Gradient backgrounds

Each scheme has an optional **Background gradient** picker. Leave it blank (the
common case) and the scheme uses its solid Background color. Set it and it
overrides the background with a gradient — the solid color is still kept in
`--bg-color` (used by utilities and derived colors); the gradient drives the
scheme's displayed `background` via `--bg-gradient`.

## Gotcha: no responsive variants

One class is generated per scheme (`.theme-dark`), not responsive variants like
`md:theme-dark`. To swap schemes at a breakpoint, write that media query by hand
in the section's CSS.
