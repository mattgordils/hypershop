/**
 * Predictive search (<predictive-search>) — Section Rendering API version.
 *
 * On input it fetches the `predictive-search` SECTION (server-rendered with the
 * real product-card component) via /search/suggest?section_id=predictive-search
 * and swaps the returned markup into the drawer. Scope (products always, pages /
 * blog posts optional) comes from data-attributes set by page-search-panel.liquid.
 */

const debounce = (fn, delay = 250) => {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }
}

class PredictiveSearch extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('[data-search-input]')
    this.loading = this.querySelector('[data-search-loading]')
    this.initialState = this.querySelector('[data-search-initial]')
    this.errorState = this.querySelector('[data-search-error]')
    this.resultsTarget = this.querySelector('[data-predictive-results]')
    this.viewAll = this.querySelector('[data-search-view-all]')
    this.viewAllLink = this.querySelector('[data-search-view-all-link]')

    // Config from Liquid.
    this.searchUrl = this.dataset.searchUrl || '/search/suggest'
    this.searchPageUrl = this.dataset.searchPageUrl || '/search'
    this.limit = parseInt(this.dataset.limit || '6', 10)
    const types = []
    if (this.dataset.searchProducts === 'true') types.push('product')
    if (this.dataset.searchPages === 'true') types.push('page')
    if (this.dataset.searchArticles === 'true') types.push('article')
    if (types.length === 0) types.push('product') // never search nothing
    this.resourceTypes = types.join(',')

    this.controller = null

    if (this.input) {
      this.input.addEventListener('input', debounce(() => this.onInput(), 250))
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const q = this.input.value.trim()
          if (q) window.location.href = this.resultsPageUrl(q)
        }
      })
    }

    // Autofocus the input when the drawer opens (modal-component gains .open).
    const modal = this.closest('modal-component')
    if (modal && this.input) {
      this.modalObserver = new MutationObserver(() => {
        if (modal.classList.contains('open')) {
          setTimeout(() => this.input.focus(), 60)
        }
      })
      this.modalObserver.observe(modal, { attributes: true, attributeFilter: ['class'] })
    }
  }

  // The predictive endpoint prefix-matches the final term, so "camp co" finds
  // "Camp Collar Shirt". The results page only does that when asked, via
  // options[prefix]=last — without it the same query returns nothing. `type=product`
  // matches what the results page itself submits.
  resultsPageUrl(query) {
    return `${this.searchPageUrl}?q=${encodeURIComponent(query)}&type=product&options%5Bprefix%5D=last`
  }

  onInput() {
    const query = this.input.value.trim()
    if (!query) {
      this.reset()
      return
    }
    this.search(query)
  }

  reset() {
    if (this.resultsTarget) this.resultsTarget.innerHTML = ''
    this.initialState?.classList.remove('hidden')
    this.errorState?.classList.add('hidden')
    this.viewAll?.classList.add('hidden')
    this.loading?.classList.add('hidden')
  }

  async search(query) {
    this.initialState?.classList.add('hidden')
    this.errorState?.classList.add('hidden')
    this.loading?.classList.remove('hidden')

    if (this.controller) this.controller.abort()
    this.controller = new AbortController()

    try {
      const params = new URLSearchParams()
      params.set('q', query)
      params.set('resources[type]', this.resourceTypes)
      params.set('resources[limit]', this.limit)
      params.set('section_id', 'predictive-search')

      const response = await fetch(`${this.searchUrl}?${params.toString()}`, {
        signal: this.controller.signal,
      })
      if (!response.ok) throw new Error(`Search failed: ${response.status}`)

      const text = await response.text()
      const doc = new DOMParser().parseFromString(text, 'text/html')
      const inner = doc.querySelector('[data-predictive-results-inner]')

      if (this.resultsTarget) {
        this.resultsTarget.innerHTML = inner ? inner.innerHTML : ''
      }
      if (this.viewAllLink) this.viewAllLink.href = this.resultsPageUrl(query)
      this.viewAll?.classList.remove('hidden')
    } catch (err) {
      if (err.name === 'AbortError') return
      this.errorState?.classList.remove('hidden')
      this.viewAll?.classList.add('hidden')
    } finally {
      this.loading?.classList.add('hidden')
    }
  }
}

if (!customElements.get('predictive-search')) {
  customElements.define('predictive-search', PredictiveSearch)
}
