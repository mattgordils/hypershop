# Custom data: metafields & metaobjects

This theme reads several **metafields** and **metaobjects** to power features. This
file is the complete inventory of that "custom data contract" — what a merchant
must create, and the exact structure each feature expects.

## ⚠️ These must be created manually — theme install cannot create them

A theme can only **read** metafields and metaobjects. It **cannot create the
definitions** when it's installed or published — there is no theme mechanism for
that. Until the definition exists in the store's admin (or is created by an app or
the Admin API), the feature that depends on it simply renders nothing.

So for each item below, the merchant must, in **Admin → Settings → Custom data**:

1. Create the **definition** (metafield definition, and/or metaobject definition).
2. Use the **exact namespace + key** (metafields) or **type handle** (metaobjects)
   the theme expects — these are listed below.
3. **Populate values** on the relevant products/pages/articles.

The theme fails safe: a missing or empty definition never errors, the feature is
just absent.

---

## How metafields vs. metaobjects work (quick primer)

- **Metafield** — a single extra field attached to a resource (product, page,
  article, shop…). Addressed as `resource.metafields.<namespace>.<key>`. Has a
  **type** (text, integer, boolean, rich text, file reference, list of…, etc.).
- **Metaobject** — a reusable, structured *record type* you define once (with its
  own fields) and create many entries of. A metafield can be "a reference to" or
  "a list of" a metaobject. Addressed as `shop.metaobjects.<type>[<handle>]` or
  reached through a metafield whose type is that metaobject.

---

## Inventory

### 1. Product reviews — `reviews.rating` + `reviews.rating_count`

| | |
| --- | --- |
| Owner | Product |
| Keys | `reviews.rating`, `reviews.rating_count` |
| Types | Rating, Integer |
| Read by | [`snippets/structured-data.liquid`](snippets/structured-data.liquid) → `AggregateRating` |
| Namespace/keys configurable in | Theme settings → SEO & structured data |

Usually populated automatically by a review app (Judge.me, Loox, Okendo, Yotpo).
**Full setup, app notes, and Google policy → [README-seo.md](README-seo.md).**

### 2. FAQ — `custom.faqs` (list of an FAQ metaobject)

| | |
| --- | --- |
| Owner | Product and/or Page |
| Key | `custom.faqs` |
| Type | List of metaobjects → an FAQ metaobject (`question` + `answer` fields) |
| Read by | [`snippets/faq-schema.liquid`](snippets/faq-schema.liquid) → `FAQPage` |
| Namespace/key configurable in | Theme settings → SEO & structured data |

Requires **both** a metaobject definition and a list-of-metaobjects metafield.
**Full step-by-step → [README-seo.md](README-seo.md).**

### 3. Featured article — `custom.featured`

| | |
| --- | --- |
| Owner | Article |
| Key | `custom.featured` |
| Type | **True/False (boolean)** |
| Read by | [`sections/blog-list.liquid`](sections/blog-list.liquid) |
| Effect | When true, the article's card spans two columns (`col-span-2`) in the blog grid — a visual "featured" treatment. |

**Setup:** Admin → Settings → Custom data → **Articles** → Add definition → name
it as you like, namespace/key **`custom.featured`**, type **True/False**. Toggle it
on for articles you want featured.

> Note: the blog section can also feature the *first* article automatically via the
> section setting "Feature first item" — the metafield is an additional, per-article
> override.

### 4. Article featured video — `custom.featured_video`

| | |
| --- | --- |
| Owner | Article |
| Key | `custom.featured_video` |
| Type | **File reference — video** (the code reads `.value` then `.preview_image`) |
| Read by | [`snippets/article-card.liquid`](snippets/article-card.liquid) |
| Effect | Supplies media for the article card; if the article has no image, the video's `preview_image` is used as the card thumbnail. |

**Setup:** Admin → Settings → Custom data → **Articles** → Add definition,
namespace/key **`custom.featured_video`**, type **File** (accept video). Upload a
video per article where you want one.

### 5. Color swatches — `color_list` metaobject

| | |
| --- | --- |
| Owner | Shop (global metaobject) |
| Type handle | **`color_list`** |
| Entry fields | `color` (**Color**), `swatch` (**File / image**, optional) |
| Read by | [`snippets/filters.liquid`](snippets/filters.liquid) (Color filter swatches) |
| Lookup | `shop.metaobjects.color_list[filter_value.label]` — an entry is matched to a color filter option by its handle/label. |

Drives the colored dots shown next to color options in collection filters. For each
color the store sells, create one `color_list` entry:

**Setup:**

1. Admin → Settings → Custom data → **Metaobjects → Add definition**.
2. Name it so its **type handle is `color_list`**. Add fields:
   - `color` — type **Color** (the hex shown as the swatch dot).
   - `swatch` — type **File** (image), optional — a texture/pattern image shown
     instead of a flat color (e.g. for multicolor or patterned options).
3. Add one **entry per color option value** you use (e.g. "Blue", "Forest Green").
   The entry must be resolvable by the color's filter label — match the entry
   **handle** to the option value (Shopify handleizes, e.g. "Forest Green" →
   `forest-green`). Test a filtered collection page and confirm the dot appears.

If an entry is missing, the theme falls back to a neutral swatch color
(`var(--hr-color)`), so filters still work — the dot just isn't color-accurate.

---

## Where each is configured in theme settings

Only the **SEO** metafields (1 & 2) are remappable in the theme editor
(Theme settings → SEO & structured data), because review apps and merchants use
different namespaces. The rest (3–5) use fixed `custom.*` / `color_list` names
that the merchant matches exactly when creating the definition.

## Validating

- Structured-data metafields (1 & 2): [Google Rich Results Test](https://search.google.com/test/rich-results).
- Featured article/video (3 & 4): view the blog page and confirm layout/media.
- Color swatches (5): open a collection with color filters and confirm the dots.
