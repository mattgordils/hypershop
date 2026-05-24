import { appendNextPage } from '../lib/grid-pagination'

// Loaded only when a product grid's pagination style is "Infinite scroll".
if (!customElements.get('infinite-scroll')) {
  customElements.define(
    'infinite-scroll',
    class InfiniteScroll extends HTMLElement {
      connectedCallback() {
        this.sectionId = this.dataset.sectionId
        this.loading = false
        this.observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) this.loadMore()
          },
          { rootMargin: '800px 0px' }
        )
        this.observer.observe(this)
      }

      disconnectedCallback() {
        this.observer?.disconnect()
      }

      async loadMore() {
        if (this.loading) return

        const nextUrl = this.dataset.gridNext
        if (!nextUrl) {
          this.observer.disconnect()
          return
        }

        const grid = document.querySelector(
          `#shopify-section-${this.sectionId} .product-grid__grid`
        )
        if (!grid) return

        this.loading = true

        try {
          const followingUrl = await appendNextPage(nextUrl, this.sectionId, grid)
          if (followingUrl) {
            this.dataset.gridNext = followingUrl
            this.loading = false
          } else {
            // No more pages
            this.observer.disconnect()
            this.remove()
          }
        } catch (error) {
          console.error('Infinite scroll error:', error)
          this.loading = false
        }
      }
    }
  )
}
