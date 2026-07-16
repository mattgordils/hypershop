# TODO

- [ ] `shopify-account` styling (page-header.liquid component)

- [ ] **Button "wipe" hover effects** — the `Theme settings → Buttons → Hover effect`
      select already offers `wipe-up`, `wipe-right`, `wipe-down`, and the choice is
      exposed as `<body data-button-hover="…">`. The animation itself is not built
      yet (those options currently fall back to the Simple color fade). To finish:
  - Add an overlay element inside the button that animates the hover background
    (e.g. a `<span class="button__wipe">` behind `.button-content`), since a wipe
    can't be done with a simple `background` transition.
  - In `src/styles/components/button.css`, drive it off the body attribute:
    `[data-button-hover="wipe-up"] .button { … }` etc., translating the overlay
    from the appropriate edge on `:hover` (up/right/down).
  - The overlay fills with `--button-hover-bg`; keep the label above it and swap
    text color to `--button-hover-color` on hover.
  - Make sure it degrades gracefully for `.secondary` / `.circle` / `.square`
    variants and respects `prefers-reduced-motion`.

  ## Questions
  - Does shopify have a native newsletter signup? I would like the option for a newsletter signup on the site but want to make sure it integrates well with shopify or any other apps people may use. what do other premium themes usually do?
  - does the contact form work and integrate directly with shopify without an app?
