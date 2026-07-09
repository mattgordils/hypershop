# SEO, breadcrumbs & structured data

This theme emits schema.org JSON-LD (rich results + AEO / AI answer engines) and
breadcrumb navigation. Most of it works out of the box, but a few features read
**Shopify metafields/metaobjects that a merchant must create in the admin**. This
file documents that admin setup.

The theme reads these through **Theme settings → SEO & structured data**, so the
merchant maps their own namespaces/keys without touching code. Defaults match
Shopify's standard conventions.

| Feature | Works automatically? | Admin setup required |
| --- | --- | --- |
| Breadcrumbs (visible + JSON-LD) | ✅ Yes | None — just assign products to collections |
| Collection-aware product breadcrumbs | ✅ Yes | None (native Shopify) |
| Product star ratings (`AggregateRating`) | ❌ No | Review metafields (usually via a review app) |
| FAQ rich results (`FAQPage`) | ❌ No | A metaobject definition + metafield |

---

## 1. Breadcrumbs & collection URLs — no admin setting needed

Breadcrumbs are built by [`snippets/breadcrumbs.liquid`](snippets/breadcrumbs.liquid)
(single source of truth for both the visible `<nav>` and the `BreadcrumbList`
JSON-LD, which [`snippets/structured_data.liquid`](snippets/structured_data.liquid)
delegates to).

Product breadcrumbs reflect **the collection the shopper navigated from**, e.g.
clicking a product inside the "Blue" collection shows `Home / Blue / Blue shirt`,
while the same product under "Tees" shows `Home / Tees / Blue shirt`.

**There is no Shopify admin setting to enable this.** It is native Shopify
behavior with two moving parts, both already handled in the theme:

1. [`snippets/product_card.liquid`](snippets/product_card.liquid) links products
   **within** the current collection on collection pages
   (`{{ product.url | within: collection }}` → `/collections/blue/products/blue-shirt`).
   That URL is what makes Shopify populate the `collection` object on the product
   page. Cards elsewhere (home, search, related) keep the plain product URL, since
   there is no navigated collection to show.
2. The breadcrumb reads that `collection` object, falling back to the product's
   first assigned collection when there's no navigation context (direct hits,
   home/search clicks).

**The only prerequisites** are the obvious ones:

- Products must be **assigned to collections** (Admin → Products → *Collections*),
  otherwise there is no middle crumb to show.
- Canonical URLs are unaffected: Shopify always emits `<link rel="canonical">` as
  the clean `/products/x`, so the `within:` links create **no duplicate-content
  risk** and need no configuration.

---

## 2. Product star ratings — review metafields

For `AggregateRating` to appear in a product's structured data (and star ratings
in Google results), the product needs a **rating value** and a **rating count**
in metafields. The theme is app-agnostic — it reads whatever namespace/keys you
point it at.

**Defaults** (Theme settings → SEO & structured data → *Product reviews*):

| Setting | Default | Shopify metafield |
| --- | --- | --- |
| Rating metafield namespace | `reviews` | `reviews` |
| Average rating key | `rating` | `reviews.rating` (type: *Rating*) |
| Rating count key | `rating_count` | `reviews.rating_count` (type: *Integer*) |

`reviews.rating` / `reviews.rating_count` is the **Shopify-standard** namespace,
and the major review apps sync to it automatically:

- **Judge.me, Loox, Okendo, Yotpo** — install the app and enable its Shopify
  metafield sync. Ratings populate `reviews.*` with no further theme changes.
- **Different namespace?** If your app writes elsewhere (or you enter ratings by
  hand), just change the three settings above to match. No code edit needed.

### Manual setup (no review app)

1. Admin → **Settings → Custom data → Products → Add definition**.
2. Create `reviews.rating` — type **Rating** (min 1, max 5).
3. Create `reviews.rating_count` — type **Integer**.
4. Enter values per product. Structured data renders only when a rating exists
   **and** the count is greater than zero.

> ⚠️ Google requires review structured data to reflect **genuine** reviews shown
> on the page. Don't emit ratings you can't substantiate — it risks a manual
> action. The theme deliberately renders nothing when the count is zero.

---

## 3. FAQ rich results — metaobject + metafield

[`snippets/faq_schema.liquid`](snippets/faq_schema.liquid) outputs `FAQPage`
JSON-LD when the current **product or page** has a list of Q&A entries. It renders
nothing otherwise, so it's safe on every page.

**Defaults** (Theme settings → SEO & structured data → *FAQ schema*):

| Setting | Default |
| --- | --- |
| FAQ metafield namespace | `custom` |
| FAQ metafield key | `faqs` |

### Setup

1. **Create the metaobject definition** — Admin → *Settings → Custom data →
   Metaobjects → Add definition* (e.g. name it "FAQ"). Add two fields:
   - `question` — **Single line text**
   - `answer` — **Rich text** (or multi-line text)
2. **Add the metafield** — Admin → *Settings → Custom data → Products* (and/or
   *Pages*) → *Add definition*:
   - Namespace and key: **`custom.faqs`** (or whatever you set in Theme settings)
   - Type: **List of metaobjects** → the "FAQ" definition from step 1.
3. **Populate it** — on a product/page, add FAQ entries to that metafield.

Once entries exist, the `FAQPage` schema is emitted automatically. To use a
different namespace/key, change the two settings above to match.

---

## Where it's wired up

- Global schema + FAQ are rendered once in
  [`layout/theme.liquid`](layout/theme.liquid) (`{% render 'structured_data' %}`
  and `{% render 'faq_schema' %}`), so they apply site-wide.
- Visible breadcrumbs are rendered per section
  (`{% render 'breadcrumbs' %}`) and can be omitted on any template without
  affecting the JSON-LD, which is emitted independently by `structured_data.liquid`.

## Validating

After setup, test a live URL with:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

Check that `BreadcrumbList`, `AggregateRating`, and `FAQPage` appear as expected.
