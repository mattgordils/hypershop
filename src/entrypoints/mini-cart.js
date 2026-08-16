// The confirmation shown after adding to cart when the theme is in "cart page" mode.
// Its presence is what tells the add-to-cart flow not to open the full drawer.
//
// The line item markup is never built here: /cart/add.js re-renders this section in the
// same request (add-to-cart passes `sections`), so what gets shown is the real cart-item
// snippet, prices and all. This element just picks the right line out of that markup.
//
// Visibility is only ever data-visible="true|false" — no modal machinery — so the reveal
// can be styled freely. See src/styles/components/mini-cart.css.
if (!customElements.get('mini-cart')) {
  customElements.define(
    'mini-cart',
    class MiniCart extends HTMLElement {
      connectedCallback() {
        this.controller = new AbortController()
        this.line = this.querySelector('[data-mini-cart-line]')

        // Read from the DOM rather than Liquid: this renders as a block, and a theme
        // block has no `section` object to interpolate an id from.
        this.sectionId =
          this.dataset.sectionId ||
          this.closest('[id^="shopify-section-"]')?.id.replace('shopify-section-', '')

        this.querySelector('[data-mini-cart-close]')?.addEventListener('click', () => this.hide(), {
          signal: this.controller.signal,
        })

        document.addEventListener(
          'keydown',
          (event) => {
            if (event.key === 'Escape' && this.dataset.visible === 'true') this.hide()
          },
          { signal: this.controller.signal }
        )
      }

      disconnectedCallback() {
        this.controller?.abort()
      }

      // `payload` is the /cart/add.js response: the added items plus, when asked for,
      // a `sections` map of freshly rendered markup.
      show = (payload) => {
        const item = payload?.items?.[0] || payload
        const markup = payload?.sections?.[this.sectionId]

        if (markup) {
          this.render(markup, item?.key)
        } else if (this.sectionId) {
          // No sections in the response (older add path) — fetch the section instead.
          fetch(`${window.Shopify.routes.root}?sections=${this.sectionId}`)
            .then((response) => response.json())
            .then((sections) => this.render(sections[this.sectionId], item?.key))
            .catch((error) => console.error('Error loading mini cart:', error))
        }

        this.dataset.visible = 'true'
      }

      hide = () => {
        this.dataset.visible = 'false'
      }

      render = (markup, key) => {
        if (!this.line || !markup) return

        const template = document.createElement('template')
        template.innerHTML = markup

        // Fall back to the last line if the key isn't found — better to show the cart's
        // most recent item than an empty confirmation.
        const lines = template.content.querySelectorAll('[data-line-key]')
        const match =
          (key && template.content.querySelector(`[data-line-key="${CSS.escape(key)}"]`)) ||
          lines[lines.length - 1]

        if (match) this.line.replaceChildren(match)
      }
    }
  )
}
