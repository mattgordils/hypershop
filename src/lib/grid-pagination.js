/**
 * Shared helper for "Load more" and "Infinite scroll" on the product grid.
 * Fetches the next results page via the Section Rendering API and appends its
 * product cards to the current grid. Promo cards are skipped (they belong to
 * the first page only).
 *
 * @param {string} nextUrl - paginate.next.url (already carries page + filters/q)
 * @param {string} sectionId - the section id (Section Rendering API key + scope)
 * @param {HTMLElement} grid - the .product-grid__grid to append into
 * @returns {Promise<string|null>} the following page's URL, or null when finished
 */
export async function appendNextPage(nextUrl, sectionId, grid) {
  if (!nextUrl || !grid) return null

  const url = new URL(nextUrl, window.location.origin)
  url.searchParams.set('sections', sectionId)

  const response = await fetch(url.pathname + url.search)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = await response.json()
  const html = data[sectionId]
  if (!html) return null

  const doc = new DOMParser().parseFromString(html, 'text/html')
  const newGrid = doc.querySelector('.product-grid__grid')
  if (!newGrid) return null

  const fragment = document.createDocumentFragment()
  for (const child of newGrid.children) {
    if (!child.classList.contains('product-grid__promo')) {
      fragment.appendChild(child.cloneNode(true))
    }
  }
  grid.appendChild(fragment)

  const nextControl = doc.querySelector('[data-grid-next]')
  return nextControl ? nextControl.getAttribute('data-grid-next') : null
}
