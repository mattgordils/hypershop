const debounce = (func, timeout = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

const qs = (parameters, prependValue = false) => {
  let queryString = ''

  parameters.forEach((param, index) => {
    let prepend = '?'
    if (index > 0) {
      prepend = '&'
    }

    if (prependValue) {
      prepend = prependValue
    }

    const paramString = Object.keys(param) + '=' + Object.values(param)

    queryString += prepend + paramString
  })

  return queryString
}

if (!customElements.get('collection-grid')) {
  customElements.define(
    'collection-grid',
    class CollectionGrid extends HTMLElement {
      constructor() {
        super()

        this.section = this
        this.collectionUrl = this.section.dataset.url
        this.sectionId = this.section.dataset.sectionId
        this.filters = this.querySelector('#collectionFilters')
        this.pageContent = document.querySelector('#pageContent')
        this.filterForm = this.filters.querySelector('form')
        this.clearAllFilters = this.querySelector('#clearAllFilters')
        this.removeFilterItems = this.querySelectorAll('a.remove-filter')
        this.sortItems = this.querySelector('#sortItems')
        this.sortAndFilterItems = this.querySelectorAll(
          '#sortItems input, #collectionFilters input'
        )

        // Hide filters at smaller screen sizes
        this.filterPanelToggle = this.querySelector('#filterPanelToggle')
        this.filterPanel = this.querySelector('#filterPanel')
        this.filterPanelOverlay = this.querySelector('#filterPanelOverlay')
        this.filterPanelClose = this.querySelector('#filterPanelClose')

        this.sortAndFilterItems.forEach((sfItem) => {
          sfItem?.addEventListener('change', () => {
            this.sortAndFilter()
          })
        })

        if (this?.removeFilterItems && this?.removeFilterItems?.length > 0) {
          this.removeFilterItems.forEach((rItem) => {
            rItem?.addEventListener('click', event => {
              event.preventDefault()
              this.sortAndFilter(false, event.target.href)
            })
          })
        }

        this.clearAllFilters?.addEventListener('click', () => {
          this.sortAndFilter(true)
        })

        this.sortDropdown()
        this.toggleFilterPanel()
      }

      toggleFilterPanel = () => {
        const banner = document.querySelector('#shopify-section-notification-banner')
        const closePanel = () => {
          document.body.classList.remove('overflow-hidden', 'sm:overflow-auto')
          banner.classList.remove('mobile-close')
          this.filterPanelOverlay.classList.add('invisible', '!opacity-0', 'pointer-events-none')
          this.filterPanel.classList.remove('active')
          this.filterPanel.classList.add('sm:-translate-x-full')
          this.filterPanel.classList.add('translate-y-full')
        }

        const openPanel = () => {
          document.body.classList.add('overflow-hidden', 'sm:overflow-auto')
          banner.classList.add('mobile-close')
          this.filterPanelOverlay.classList.remove('invisible', '!opacity-0', 'pointer-events-none')
          this.filterPanel.classList.add('active')
          this.filterPanel.classList.remove('sm:-translate-x-full')
          this.filterPanel.classList.remove('translate-y-full')
        }

        this.filterPanelToggle?.addEventListener('click', () => {
          if (this.filterPanel.classList.contains('active')) {
            closePanel()
          } else {
            openPanel()
          }
        })

        this.filterPanelOverlay?.addEventListener('click', closePanel)
        this.filterPanelClose?.addEventListener('click', closePanel)
      }

      sortDropdown = () => {
        const trigger = this.sortItems.querySelector('#sortTrigger')
        const triggerIcon = trigger.querySelector('.icon')
        const list = this.sortItems.querySelector('#sortList')

        trigger?.addEventListener('click', () => {
          if (list.classList.contains('hidden')) {
            list.classList.remove('hidden')
            triggerIcon.classList.add('rotate-180')
          } else {
            list.classList.add('hidden')
            triggerIcon.classList.remove('rotate-180')
          }
        })
      }

      sortAndFilter = (reset = false, fetchUrl = false) => {
        let sfValues = false

        sfValues = Array.from(this.sortAndFilterItems)
          .map((item) => {
            if (item.value && item.name) {
              if ((item.type === 'checkbox' || item.type === 'radio') && item.checked) {
                if (item.type === 'radio' && sfValues[item.name]) {
                  sfValues[item.name] = item.value
                } else {
                  return { [item.name]: item.value }
                }
              } else if (item.type === 'number' || item.type === 'text') {
                return { [item.name]: item.value }
              }
            }
          })
          .filter((item) => item !== undefined)

        let pageUrl = this.collectionUrl
        let sectionId = this.sectionId

        let sectionUrl = pageUrl + '?sections=' + sectionId + qs(sfValues, '&')
        let newPageUrl = pageUrl + qs(sfValues)

        if (reset) {
          sectionUrl = pageUrl + '?sections=' + sectionId
          newPageUrl = pageUrl
        }

        if (fetchUrl) {
          const newFq = fetchUrl.split('?')[1]
          if (newFq) {
            sectionUrl = pageUrl + '?sections=' + sectionId + '&' + newFq
            newPageUrl = pageUrl + '?' + newFq
          } else {
            // reset
            sectionUrl = pageUrl + '?sections=' + sectionId
            newPageUrl = pageUrl
          }
        }

        this.section.classList.add('opacity-50')

        fetch(sectionUrl)
          .then((res) => res.json())
          .then((res) => {
            console.log(res)
            this.section.parentElement.outerHTML = res[this.sectionId]
            // TODO: Scroll to top of grid on refresh
            // setTimeout(() => {
            //   const collectionGridOffset = document.querySelector('#collectionItems').getBoundingClientRect().top
            //   console.log(collectionGridOffset)
            //   window.scrollTo({
            //     top: collectionGridOffset,
            //     behavior: 'smooth'
            //   })
            // }, 200)
            this.section.classList.remove('opacity-50')
            window.history.replaceState({}, '', newPageUrl)
          })
          .then(() => {
            document.body.classList.remove('overflow-hidden', 'sm:overflow-auto')
          })
          .catch((error) => {
            console.error('Error:', error)
          })

        return
      }
    }
  )
}
