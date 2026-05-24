import { appendNextPage } from '../lib/grid-pagination'

// Loaded only when a product grid's pagination style is "Load more button".
if (!customElements.get('load-more')) {
  customElements.define(
    'load-more',
    class LoadMore extends HTMLElement {
      connectedCallback() {
        this.button = this.querySelector('button')
        this.sectionId = this.dataset.sectionId
        this.button?.addEventListener('click', this.loadMore.bind(this))
      }

      async loadMore() {
        const nextUrl = this.dataset.gridNext
        if (!nextUrl) return

        const grid = document.querySelector(
          `#shopify-section-${this.sectionId} .product-grid__grid`
        )
        if (!grid) return

        this.button.disabled = true
        this.button.classList.add('opacity-50')

        try {
          const followingUrl = await appendNextPage(nextUrl, this.sectionId, grid)
          if (followingUrl) {
            this.dataset.gridNext = followingUrl
            this.button.disabled = false
            this.button.classList.remove('opacity-50')
          } else {
            // No more pages
            this.remove()
          }
        } catch (error) {
          console.error('Load more error:', error)
          this.button.disabled = false
          this.button.classList.remove('opacity-50')
        }
      }
    }
  )
}
