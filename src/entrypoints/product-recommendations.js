/**
 * Product Recommendations Component
 *
 * Fetches product recommendations with intelligent fallbacks:
 * 1. Shopify Product Recommendations API
 * 2. Products from same collection
 * 3. Products with same tags
 * 4. Random products
 *
 * Always excludes the current product from results.
 */

if (!customElements.get('product-recommendations')) {
  customElements.define(
    'product-recommendations',
    class ProductRecommendations extends HTMLElement {
      constructor() {
        super()
        this.productHandle = this.dataset.productHandle
        this.productId = this.dataset.productId
        this.collectionHandle = this.dataset.collectionHandle
        this.productTags = this.dataset.productTags ? this.dataset.productTags.split(',').map(t => t.trim()) : []
        this.minProducts = parseInt(this.dataset.minProducts) || 4
        this.maxProducts = parseInt(this.dataset.maxProducts) || 8
        this.hideSoldOut = this.dataset.hideSoldOut === 'true'
        this.sectionId = this.dataset.sectionId
      }

      async connectedCallback() {
        // Read the markup on connect, not in the constructor — the element can be built
        // by importNode (section re-render), whose constructor runs before the children.
        this.container = this.querySelector('[data-carousel-track]')
        this.slideshow = this.querySelector('slide-show')

        if (!this.productId || !this.container) {
          console.error('product-recommendations: Missing required elements or data attributes', {
            productId: this.productId,
            container: this.container
          })
          return
        }

        try {
          const products = await this.fetchProducts()
          await this.renderProducts(products)
        } catch (error) {
          console.error('product-recommendations: Error fetching products', error)
          // Don't leave skeletons pulsing forever over a fetch that failed.
          this.closest('.shopify-section')?.style.setProperty('display', 'none')
          this.style.display = 'none'
        }
      }

      async fetchProducts() {
        let products = []

        // Step 1: Try Shopify Product Recommendations API
        try {
          const recommendations = await this.fetchRecommendations()
          products = [...recommendations]
        } catch {
          // This source is optional — fall through to the next one.
        }

        // Filter out products without images (always)
        products = this.filterProductsWithImages(products)

        // Filter out sold out products if option is enabled
        if (this.hideSoldOut) {
          const beforeFilter = products.length
          products = this.filterAvailableProducts(products)
        }

        // Step 2: If we need more products, fetch from same collection
        if (products.length < this.minProducts && this.collectionHandle) {
          try {
            const collectionProducts = await this.fetchCollectionProducts()
            let filtered = this.filterProductsWithImages(collectionProducts)
            if (this.hideSoldOut) {
              filtered = this.filterAvailableProducts(filtered)
            }
            products = this.mergeProducts(products, filtered)
          } catch {
            // This source is optional — fall through to the next one.
          }
        }

        // Step 3: If we still need more, fetch products with same tags
        if (products.length < this.minProducts && this.productTags.length > 0) {
          try {
            const taggedProducts = await this.fetchTaggedProducts()
            let filtered = this.filterProductsWithImages(taggedProducts)
            if (this.hideSoldOut) {
              filtered = this.filterAvailableProducts(filtered)
            }
            products = this.mergeProducts(products, filtered)
          } catch {
            // This source is optional — fall through to the next one.
          }
        }

        // Step 4: If we still need more, fetch random products
        if (products.length < this.minProducts) {
          try {
            const randomProducts = await this.fetchRandomProducts()
            let filtered = this.filterProductsWithImages(randomProducts)
            if (this.hideSoldOut) {
              filtered = this.filterAvailableProducts(filtered)
            }
            products = this.mergeProducts(products, filtered)
          } catch {
            // This source is optional — fall through to the next one.
          }
        }


        // Shuffle the final list to ensure randomness across all sources
        const shuffled = this.shuffleArray(products)

        // Limit to max and return
        return shuffled.slice(0, this.maxProducts)
      }

      async fetchRecommendations() {
        // Fetch more products when hiding sold out to account for filtering
        const fetchLimit = this.hideSoldOut ? Math.max(this.maxProducts * 3, 20) : this.maxProducts

        const response = await fetch(
          `/recommendations/products.json?product_id=${this.productId}&limit=${fetchLimit}`
        )

        if (!response.ok) {
          throw new Error('Recommendations API request failed')
        }

        const data = await response.json()
        return this.filterCurrentProduct(data.products || [])
      }

      async fetchCollectionProducts() {
        const response = await fetch(
          `/collections/${this.collectionHandle}/products.json?limit=250`
        )

        if (!response.ok) {
          throw new Error('Collection products request failed')
        }

        const data = await response.json()
        return this.filterCurrentProduct(data.products || [])
      }

      async fetchTaggedProducts() {
        // Fetch products matching any of the tags
        const response = await fetch(
          `/collections/all/products.json?limit=250`
        )

        if (!response.ok) {
          throw new Error('Tagged products request failed')
        }

        const data = await response.json()
        const taggedProducts = (data.products || []).filter(product => {
          return this.productTags.some(tag => product.tags.includes(tag))
        })

        return this.filterCurrentProduct(taggedProducts)
      }

      async fetchRandomProducts() {
        const response = await fetch(
          `/collections/all/products.json?limit=250`
        )

        if (!response.ok) {
          throw new Error('Random products request failed')
        }

        const data = await response.json()

        const shuffled = this.shuffleArray(data.products || [])
        const afterFilter = this.filterCurrentProduct(shuffled)

        return afterFilter
      }

      filterCurrentProduct(products) {
        return products.filter(product =>
          product.id.toString() !== this.productId &&
          product.handle !== this.productHandle
        )
      }

      filterAvailableProducts(products) {
        // Check for available products - handle both API response formats
        const available = products.filter(product => {
          // Recommendations API includes 'available' field
          if (typeof product.available === 'boolean') {
            return product.available
          }

          // Collections API doesn't include 'available', check variants instead
          if (product.variants && product.variants.length > 0) {
            return product.variants.some(variant => variant.available === true)
          }

          // If no variants data, assume available
          return true
        })

        return available
      }

      filterProductsWithImages(products) {
        const withImages = products.filter(product => {
          // Check if product has a valid featured image
          if (product.featured_image && typeof product.featured_image === 'string' && product.featured_image.length > 0) {
            return true
          }

          // Check if product has any valid images in images array
          if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            // Check if first image is valid
            const firstImage = product.images[0]
            if (typeof firstImage === 'string' && firstImage.length > 0) {
              return true
            }
            // Handle if images are objects with src property
            if (firstImage && typeof firstImage === 'object' && firstImage.src && firstImage.src.length > 0) {
              return true
            }
          }

          return false
        })

        const filtered = products.length - withImages.length
        if (filtered > 0) {
        }
        return withImages
      }

      mergeProducts(existing, newProducts) {
        const existingIds = new Set(existing.map(p => p.id))
        const uniqueNew = newProducts.filter(p => !existingIds.has(p.id))
        return [...existing, ...uniqueNew]
      }

      shuffleArray(array) {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
      }

      async renderProducts(products) {
        // Nothing to recommend: the whole section goes, skeletons and all, rather than
        // leaving a heading over an empty track.
        if (products.length === 0) {
          this.closest('.shopify-section')?.style.setProperty('display', 'none')
          this.style.display = 'none'
          return
        }

        try {
          // Fetch all product cards in parallel
          const cardPromises = products.map(product =>
            fetch(`/products/${product.handle}?view=card`)
              .then(response => {
                if (!response.ok) {
                  return ''
                }
                return response.text()
              })
              .catch(err => {
                return ''
              })
          )

          const cards = await Promise.all(cardPromises)
          const slides = cards.filter(card => card.trim())

          if (!slides.length) {
            this.closest('.shopify-section')?.style.setProperty('display', 'none')
            this.style.display = 'none'
            return
          }

          // The track is a carousel, so each card has to arrive as a slide — this is
          // what replaces the skeletons that held the layout open.
          this.container.innerHTML = slides
            .map(card => `<div class="slider-slide">${card}</div>`)
            .join('')

          // Embla measured the skeletons. Rebuild against the real slides so the snap
          // points, arrows and dots match what is actually in the track now.
          this.slideshow?.refresh()
        } catch (error) {
          console.error('product-recommendations: Failed to render cards', error)
        }
      }
    }
  )
}
