const debounce = (fn, delay = 300) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

const formatMoney = (priceValue, currencyCode = 'USD') => {
  // Shopify Predictive Search API returns price in cents (e.g., "6000" for $60.00)
  // Convert to number and divide by 100 to get dollars
  const priceStr = String(priceValue)
  let amount

  // If the price contains a decimal, it's already in dollars
  if (priceStr.includes('.')) {
    amount = parseFloat(priceStr)
  } else {
    // It's in cents, divide by 100
    amount = parseInt(priceStr, 10) / 100
  }

  const hasDecimals = amount % 1 !== 0

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2
  }).format(amount)
}

if (!customElements.get('predictive-search')) {
  customElements.define(
    'predictive-search',
    class PredictiveSearch extends HTMLElement {
      constructor() {
        super()

        // Elements
        this.input = this.querySelector('[data-search-input]')
        this.loading = this.querySelector('[data-search-loading]')
        this.results = this.querySelector('[data-search-results]')

        // State containers
        this.initialState = this.querySelector('[data-search-initial]')
        this.emptyState = this.querySelector('[data-search-empty]')
        this.errorState = this.querySelector('[data-search-error]')
        this.queryDisplay = this.querySelector('[data-search-query]')

        // Result sections
        this.productsSection = this.querySelector('[data-search-products]')
        this.productsList = this.querySelector('[data-search-products-list]')
        this.collectionsSection = this.querySelector('[data-search-collections]')
        this.collectionsList = this.querySelector('[data-search-collections-list]')
        this.pagesSection = this.querySelector('[data-search-pages]')
        this.pagesList = this.querySelector('[data-search-pages-list]')
        this.articlesSection = this.querySelector('[data-search-articles]')
        this.articlesList = this.querySelector('[data-search-articles-list]')

        // View all
        this.viewAll = this.querySelector('[data-search-view-all]')
        this.viewAllLink = this.querySelector('[data-search-view-all-link]')

        // Templates
        this.productTemplate = document.querySelector('[data-template-product]')
        this.collectionTemplate = document.querySelector('[data-template-collection]')
        this.pageTemplate = document.querySelector('[data-template-page]')
        this.articleTemplate = document.querySelector('[data-template-article]')

        // Abort controller for canceling in-flight requests
        this.abortController = null

        // Bind methods
        this.onInput = debounce(this.onInput.bind(this), 300)
        this.imageWidth = '600'
        this.resultLimit = 12
      }

      connectedCallback() {
        if (this.input) {
          this.input.addEventListener('input', this.onInput)
        }

        // Track when user clicks "View all results"
        if (this.viewAllLink) {
          this.viewAllLink.addEventListener('click', this.onViewAllClick.bind(this))
        }
      }

      disconnectedCallback() {
        if (this.input) {
          this.input.removeEventListener('input', this.onInput)
        }
        if (this.viewAllLink) {
          this.viewAllLink.removeEventListener('click', this.onViewAllClick.bind(this))
        }
      }

      onViewAllClick() {
        const query = this.input?.value?.trim()
        if (query) {
          // Klaviyo submitted search event
          const _learnq = window._learnq || []
          _learnq.push(['track', 'Submitted Search', {
            SearchTerm: query
          }])

          // GA4 search event (on form submission/view all click)
          if (typeof gtag === 'function') {
            gtag('event', 'search', {
              search_term: query
            })
          }
        }
      }

      onInput() {
        const query = this.input.value.trim()

        if (query.length === 0) {
          this.reset()
          return
        }

        if (query.length < 2) {
          return
        }

        this.search(query)
      }

      async search(query) {
        // Cancel any in-flight request
        if (this.abortController) {
          this.abortController.abort()
        }
        this.abortController = new AbortController()

        this.showLoading()

        try {
          // const url = `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product,collection,page,article&resources[limit]=4`
          // Only show products
          const url = `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=${this.resultLimit || 4}`

          const response = await fetch(url, {
            signal: this.abortController.signal
          })

          if (!response.ok) {
            throw new Error('Search request failed')
          }

          const data = await response.json()
          this.renderResults(data.resources.results, query)
        } catch (error) {
          if (error.name === 'AbortError') {
            // Request was canceled, ignore
            return
          }
          console.error('Predictive search error:', error)
          this.showError()
        } finally {
          this.hideLoading()
        }
      }

      renderResults(results, query) {
        const { products, collections, pages, articles } = results

        const hasProducts = products && products.length > 0
        const hasCollections = collections && collections.length > 0
        const hasPages = pages && pages.length > 0
        const hasArticles = articles && articles.length > 0
        const hasAnyResults = hasProducts || hasCollections || hasPages || hasArticles

        // Hide all states first
        this.hideAllStates()

        if (!hasAnyResults) {
          this.showEmpty(query)

          // Fire Klaviyo event for search with no results
          this.trackSearch(query, 0)
          return
        }

        // Hide initial state only when we have results
        this.hideInitialState()

        // Render products
        if (hasProducts) {
          this.renderProducts(products)
          this.productsSection.classList.remove('hidden')
        }

        // Render collections
        if (hasCollections) {
          this.renderCollections(collections)
          this.collectionsSection.classList.remove('hidden')
        }

        // Render pages
        if (hasPages) {
          this.renderPages(pages)
          this.pagesSection.classList.remove('hidden')
        }

        // Render articles
        if (hasArticles) {
          this.renderArticles(articles)
          this.articlesSection.classList.remove('hidden')
        }

        // Show view all link
        this.viewAllLink.href = `/search?q=${encodeURIComponent(query)}`
        this.viewAll.classList.remove('hidden')

        // Fire Klaviyo event for search with results
        const totalResults = (products?.length || 0) + (collections?.length || 0) + (pages?.length || 0) + (articles?.length || 0)
        this.trackSearch(query, totalResults)
      }

      trackSearch(query, resultCount) {
        // Klaviyo search event
        const _learnq = window._learnq || []
        _learnq.push(['track', 'Searched Site', {
          SearchTerm: query,
          ResultCount: resultCount
        }])

        // GA4 search event
        if (typeof gtag === 'function') {
          gtag('event', 'search', {
            search_term: query
          })
        }
      }

      async renderProducts(products) {
        this.productsList.innerHTML = ''

        // Fetch image data via section rendering to get metafield images
        const productDataPromises = products.map(async (product) => {
          try {
            // Extract handle from URL (e.g., /products/handle -> handle)
            const handle = product.url.split('/products/')[1]?.split('?')[0]
            if (!handle) return { ...product, cardImage: null, hoverImage: null }

            // Fetch the product-images-json section to get processed metafield images
            const response = await fetch(`/products/${handle}?sections=product-images-json`)
            if (!response.ok) return { ...product, cardImage: null, hoverImage: null }

            const data = await response.json()
            const sectionHtml = data['product-images-json']

            // Parse the JSON from the section response
            const jsonMatch = sectionHtml.match(/\{[\s\S]*\}/)
            if (!jsonMatch) return { ...product, cardImage: null, hoverImage: null }

            const imageData = JSON.parse(jsonMatch[0])
            return {
              ...product,
              cardImage: imageData.cardImage || null,
              hoverImage: imageData.hoverImage || null
            }
          } catch {
            return { ...product, cardImage: null, hoverImage: null }
          }
        })

        const productsWithImages = await Promise.all(productDataPromises)

        productsWithImages.forEach((product) => {
          const clone = this.productTemplate.content.cloneNode(true)

          const link = clone.querySelector('[data-product-link]')
          const image = clone.querySelector('[data-product-image]')
          const hoverImage = clone.querySelector('[data-product-hover-image]')
          const title = clone.querySelector('[data-product-title]')
          const price = clone.querySelector('[data-product-price]')

          link.href = product.url
          title.textContent = product.title

          // Use cardImage from section (includes metafield logic), fall back to API image
          const primaryImageSrc = product.cardImage || product.image
          if (primaryImageSrc) {
            image.src = primaryImageSrc
            image.alt = product.title
          } else {
            image.remove()
          }

          // Set hover image if available
          if (hoverImage) {
            if (product.hoverImage) {
              hoverImage.src = product.hoverImage
              hoverImage.alt = product.title
            } else {
              hoverImage.remove()
            }
          }

          if (product.price) {
            const currencyCode = this.dataset.currency || 'USD'
            price.textContent = formatMoney(product.price, currencyCode)
          }

          this.productsList.appendChild(clone)
        })
      }

      renderCollections(collections) {
        this.collectionsList.innerHTML = ''

        collections.forEach((collection) => {
          const clone = this.collectionTemplate.content.cloneNode(true)

          const link = clone.querySelector('[data-collection-link]')
          const image = clone.querySelector('[data-collection-image]')
          const title = clone.querySelector('[data-collection-title]')

          link.href = collection.url
          title.textContent = collection.title

          if (collection.featured_image && collection.featured_image.url) {
            image.src = collection.featured_image.url + '&width=' + this.imageWidth
            image.alt = collection.title
          } else {
            image.parentElement.remove()
          }

          this.collectionsList.appendChild(clone)
        })
      }

      renderPages(pages) {
        this.pagesList.innerHTML = ''

        pages.forEach((page) => {
          const clone = this.pageTemplate.content.cloneNode(true)

          const link = clone.querySelector('[data-page-link]')
          const title = clone.querySelector('[data-page-title]')

          link.href = page.url
          title.textContent = page.title

          this.pagesList.appendChild(clone)
        })
      }

      renderArticles(articles) {
        this.articlesList.innerHTML = ''

        articles.forEach((article) => {
          const clone = this.articleTemplate.content.cloneNode(true)

          const link = clone.querySelector('[data-article-link]')
          const image = clone.querySelector('[data-article-image]')
          const title = clone.querySelector('[data-article-title]')
          const date = clone.querySelector('[data-article-date]')

          link.href = article.url
          title.textContent = article.title

          if (article.image) {
            image.src = article.image + '&width=' + this.imageWidth
            image.alt = article.title
          } else {
            image.parentElement.remove()
          }

          if (article.published_at) {
            const publishedDate = new Date(article.published_at)
            date.textContent = publishedDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          }

          this.articlesList.appendChild(clone)
        })
      }

      hideAllStates() {
        // Note: initialState is only hidden when there are actual results
        this.emptyState?.classList.add('hidden')
        this.errorState?.classList.add('hidden')
        this.productsSection?.classList.add('hidden')
        this.collectionsSection?.classList.add('hidden')
        this.pagesSection?.classList.add('hidden')
        this.articlesSection?.classList.add('hidden')
        this.viewAll?.classList.add('hidden')
      }

      hideInitialState() {
        this.initialState?.classList.add('hidden')
      }

      showInitialState() {
        this.initialState?.classList.remove('hidden')
      }

      showLoading() {
        this.loading?.classList.remove('hidden')
      }

      hideLoading() {
        this.loading?.classList.add('hidden')
      }

      showEmpty(query) {
        this.hideAllStates()
        if (this.queryDisplay) {
          this.queryDisplay.textContent = query
        }
        this.emptyState?.classList.remove('hidden')
      }

      showError() {
        this.hideAllStates()
        this.errorState?.classList.remove('hidden')
      }

      reset() {
        this.hideAllStates()
        this.hideLoading()
        this.initialState?.classList.remove('hidden')

        // Clear lists
        if (this.productsList) this.productsList.innerHTML = ''
        if (this.collectionsList) this.collectionsList.innerHTML = ''
        if (this.pagesList) this.pagesList.innerHTML = ''
        if (this.articlesList) this.articlesList.innerHTML = ''

        // Cancel any pending request
        if (this.abortController) {
          this.abortController.abort()
          this.abortController = null
        }
      }
    }
  )
}
