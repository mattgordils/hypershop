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
        this.container = this.querySelector('[data-product-container]')
        this.loading = this.querySelector('[data-loading]')
      }

      async connectedCallback() {
        console.log('product-recommendations: Initializing', {
          productId: this.productId,
          productHandle: this.productHandle,
          collectionHandle: this.collectionHandle,
          tags: this.productTags,
          min: this.minProducts,
          max: this.maxProducts,
          hideSoldOut: this.hideSoldOut,
          hasContainer: !!this.container
        })

        if (!this.productId || !this.container) {
          console.error('product-recommendations: Missing required elements or data attributes', {
            productId: this.productId,
            container: this.container
          })
          return
        }

        try {
          const products = await this.fetchProducts()
          console.log('product-recommendations: Fetched products', products)
          await this.renderProducts(products)
        } catch (error) {
          console.error('product-recommendations: Error fetching products', error)
          this.hideLoading()
        }
      }

      async fetchProducts() {
        let products = []

        // Step 1: Try Shopify Product Recommendations API
        try {
          const recommendations = await this.fetchRecommendations()
          products = [...recommendations]
          console.log('product-recommendations: Step 1 (Recommendations API):', products.length, 'products')
        } catch (error) {
          console.warn('product-recommendations: Recommendations API failed', error)
        }

        // Filter out products without images (always)
        products = this.filterProductsWithImages(products)

        // Filter out sold out products if option is enabled
        if (this.hideSoldOut) {
          const beforeFilter = products.length
          products = this.filterAvailableProducts(products)
          console.log(`product-recommendations: Filtered sold out: ${beforeFilter} -> ${products.length}`)
        }

        // Step 2: If we need more products, fetch from same collection
        if (products.length < this.minProducts && this.collectionHandle) {
          try {
            const collectionProducts = await this.fetchCollectionProducts()
            let filtered = this.filterProductsWithImages(collectionProducts)
            if (this.hideSoldOut) {
              filtered = this.filterAvailableProducts(filtered)
            }
            console.log('product-recommendations: Step 2 (Collection):', filtered.length, 'products')
            products = this.mergeProducts(products, filtered)
            console.log('product-recommendations: After merge:', products.length, 'products')
          } catch (error) {
            console.warn('product-recommendations: Collection fetch failed', error)
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
            console.log('product-recommendations: Step 3 (Tagged):', filtered.length, 'products')
            products = this.mergeProducts(products, filtered)
            console.log('product-recommendations: After merge:', products.length, 'products')
          } catch (error) {
            console.warn('product-recommendations: Tagged products fetch failed', error)
          }
        }

        // Step 4: If we still need more, fetch random products
        if (products.length < this.minProducts) {
          console.log(`product-recommendations: Step 4 (Random) - need ${this.minProducts - products.length} more products`)
          try {
            const randomProducts = await this.fetchRandomProducts()
            let filtered = this.filterProductsWithImages(randomProducts)
            if (this.hideSoldOut) {
              filtered = this.filterAvailableProducts(filtered)
            }
            console.log('product-recommendations: Step 4 (Random):', filtered.length, 'products')
            products = this.mergeProducts(products, filtered)
            console.log('product-recommendations: After merge:', products.length, 'products')
          } catch (error) {
            console.warn('product-recommendations: Random products fetch failed', error)
          }
        }

        console.log('product-recommendations: Final product count:', products.length)

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
        console.log('product-recommendations: Random fetch raw:', data.products?.length || 0, 'products')

        const shuffled = this.shuffleArray(data.products || [])
        const afterFilter = this.filterCurrentProduct(shuffled)
        console.log('product-recommendations: Random after filtering current product:', afterFilter.length, 'products')

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

        console.log(`product-recommendations: filterAvailableProducts: ${products.length} -> ${available.length}`)
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
          console.log(`product-recommendations: filterProductsWithImages: ${products.length} -> ${withImages.length} (filtered ${filtered} products without images)`)
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
        console.log('product-recommendations: Rendering', products.length, 'products')

        if (products.length === 0) {
          console.log('product-recommendations: No products to render')
          this.hideLoading()
          this.style.display = 'none'
          return
        }

        this.container.innerHTML = ''

        try {
          // Fetch all product cards in parallel
          const cardPromises = products.map(product =>
            fetch(`/products/${product.handle}?view=card`)
              .then(response => {
                if (!response.ok) {
                  console.warn(`Failed to fetch card for ${product.handle}`)
                  return ''
                }
                return response.text()
              })
              .catch(err => {
                console.warn(`Error fetching card for ${product.handle}:`, err)
                return ''
              })
          )

          const cards = await Promise.all(cardPromises)

          // Insert all cards
          this.container.innerHTML = cards.filter(card => card).join('')

          console.log('product-recommendations: Rendered', this.container.children.length, 'product cards')
        } catch (error) {
          console.error('product-recommendations: Failed to render cards', error)
        }

        this.hideLoading()
      }

      hideLoading() {
        if (this.loading) {
          this.loading.style.display = 'none'
        }
      }
    }
  )
}
