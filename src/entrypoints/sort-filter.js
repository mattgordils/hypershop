import { toggleCollapsibleItem } from './collapsible'

const debounce = (func, timeout = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

// The price "list of ranges" style is one radio group carrying both bounds, because
// Shopify accepts a single price range per request. "20:100" → gte=20 & lte=100;
// "1000:" is the open-ended top bucket, so it sends no upper bound.
const PRICE_BUCKET = 'price_bucket'

const priceBucketParams = (value) => {
  const [gte, lte] = value.split(':')
  const params = []

  if (gte) params.push({ 'filter.v.price.gte': gte })
  if (lte) params.push({ 'filter.v.price.lte': lte })

  return params
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
      // Binding happens on connect (not in the constructor) because instances of the
      // filters snippet can live anywhere in the document — outside this element, even
      // outside its section. Those listeners have to be torn down when this element is
      // replaced by a re-render, or the next instance would double-bind them.
      connectedCallback() {
        this.controller = new AbortController()
        this.signal = this.controller.signal

        this.section = this
        this.collectionUrl = this.dataset.url
        this.sectionId = this.dataset.sectionId
        this.pageContent = document.querySelector('#pageContent')
        this.sortItems = this.querySelector('#sortItems')

        this.collectInstances()
        this.bindInputs()
        this.bindLinks()
        this.bindCollapsibleSync()
        this.sortDropdown()
      }

      disconnectedCallback() {
        this.controller?.abort()
        this.fetchController?.abort()
      }

      // Every rendered copy of the filters snippet for this section, wherever it sits.
      collectInstances = () => {
        this.filterInstances = Array.from(
          document.querySelectorAll(`[data-filters][data-filters-for="${this.sectionId}"]`)
        )
        this.filterInputs = this.filterInstances.flatMap((instance) =>
          Array.from(instance.querySelectorAll('input'))
        )
        this.sortAndFilterItems = [
          ...Array.from(this.querySelectorAll('#sortItems input')),
          ...this.filterInputs,
        ]
        // Instance-scoped ones, plus any elsewhere in the grid (the empty state's button)
        this.clearAllFilters = Array.from(
          new Set([
            ...this.querySelectorAll('[data-clear-all-filters]'),
            ...this.filterInstances.flatMap((instance) =>
              Array.from(instance.querySelectorAll('[data-clear-all-filters]'))
            ),
          ])
        )
        this.removeFilterItems = this.filterInstances.flatMap((instance) =>
          Array.from(instance.querySelectorAll('a.remove-filter'))
        )
      }

      bindInputs = () => {
        this.sortAndFilterItems.forEach((sfItem) => {
          sfItem?.addEventListener(
            'change',
            (event) => {
              const input = event.target

              if (input.type === 'checkbox' && input.checked) {
                // Checking "All" clears that filter's values; checking a value clears its
                // "All" — in every instance, so a stale "All" elsewhere can't drop the
                // selection when the query string is built.
                const checkedAll = input.value === 'all'
                this.filterInputs.forEach((item) => {
                  if (item.name !== input.name) return
                  if (checkedAll ? item.value !== 'all' : item.value === 'all') {
                    item.checked = false
                  }
                })
              }

              this.syncInstances(input)
              this.sortAndFilter()
            },
            { signal: this.signal }
          )
        })
      }

      bindLinks = () => {
        this.removeFilterItems.forEach((rItem) => {
          rItem?.addEventListener(
            'click',
            (event) => {
              event.preventDefault()
              this.sortAndFilter(false, event.currentTarget.href)
            },
            { signal: this.signal }
          )
        })

        this.clearAllFilters.forEach((button) => {
          button.addEventListener(
            'click',
            () => {
              this.sortAndFilter(true)
            },
            { signal: this.signal }
          )
        })
      }

      // Mirror a changed input onto its twins elsewhere, so the drawer, the sidebar and
      // the bar's sort dropdown always agree — before the section re-renders and for the
      // query string built from them below. Sort is included: it renders both in the bar
      // and inside the drawer's filter list, and two disagreeing copies would put two
      // sort_by values in the URL.
      syncInstances = (input) => {
        if (!input.name) return

        const isChoice = input.type === 'checkbox' || input.type === 'radio'

        this.sortAndFilterItems.forEach((item) => {
          if (item === input || item.name !== input.name) return

          if (isChoice) {
            if (item.value !== input.value) return
            item.checked = input.checked
          } else {
            item.value = input.value
            // Let anything drawing from the value (price-slider's fill/readouts) redraw.
            item.dispatchEvent(new Event('input', { bubbles: true }))
          }
        })
      }

      groupContent = (group) => group?.querySelector('[data-collapsible="content"]')

      groupIcon = (group) => group?.querySelector('[data-collapsible="icon"] .animated-icon')

      isGroupExpanded = (group) => this.groupContent(group)?.getAttribute('aria-hidden') === 'false'

      // Filter groups keep their expanded state in sync across instances: expanding
      // "Size" in the panel expands it in the sidebar too.
      bindCollapsibleSync = () => {
        this.filterInstances.forEach((instance) => {
          instance.addEventListener(
            'click',
            (event) => {
              const trigger = event.target.closest?.('[data-collapsible="trigger"]')
              const group = trigger?.closest('[data-filter-key]')
              if (!group) return

              // collapsible-item handles this same click on the trigger itself, so by
              // now the group holds its new state — copy it to the other instances.
              const expanded = this.isGroupExpanded(group)

              this.filterInstances.forEach((other) => {
                if (other === instance) return
                const twin = other.querySelector(
                  `[data-filter-key="${CSS.escape(group.dataset.filterKey)}"]`
                )
                if (!twin) return
                toggleCollapsibleItem(this.groupContent(twin), this.groupIcon(twin), expanded)
              })
            },
            { signal: this.signal }
          )
        })
      }

      expandedGroupKeys = () => {
        const keys = new Set()

        this.filterInstances.forEach((instance) => {
          instance.querySelectorAll('[data-filter-key]').forEach((group) => {
            if (this.isGroupExpanded(group)) {
              keys.add(group.dataset.filterKey)
            }
          })
        })

        return keys
      }

      // Applied to freshly rendered markup — including markup still inside a <template>,
      // before it's inserted — so groups never flash collapsed after a filter change.
      restoreExpandedGroups = (root, keys) => {
        root.querySelectorAll('[data-filter-key]').forEach((group) => {
          const content = this.groupContent(group)
          if (!content) return

          const expanded = keys.has(group.dataset.filterKey)
          content.setAttribute('aria-hidden', expanded ? 'false' : 'true')

          const icon = this.groupIcon(group)
          if (icon) {
            icon.dataset.icon = expanded ? 'minus' : 'plus'
          }
        })
      }

      // Instances that live outside this section aren't touched by the re-render, so
      // rebuild them from the fresh markup, re-pointing ids at their own namespace.
      refreshDetachedInstances = (fresh, keys) => {
        const sectionWrapper = this.section.parentElement
        const source = fresh.querySelector('[data-filters]')
        const sourceUid = source?.dataset.filtersUid

        this.filterInstances.forEach((instance) => {
          if (sectionWrapper.contains(instance)) return
          const uid = instance.dataset.filtersUid
          if (!source || !sourceUid || !uid) return

          const clone = source.cloneNode(true)

          if (uid !== sourceUid) {
            clone.querySelectorAll('[id], [for]').forEach((node) => {
              ;['id', 'for'].forEach((attribute) => {
                const value = node.getAttribute(attribute)
                if (value?.includes(`-${sourceUid}-`)) {
                  node.setAttribute(attribute, value.replace(`-${sourceUid}-`, `-${uid}-`))
                }
              })
            })
          }

          instance.innerHTML = clone.innerHTML
          this.restoreExpandedGroups(instance, keys)
        })
      }

      // Drawers (modal-component) holding a filters instance: a filter change must
      // not close them. Open/close itself stays modal-component's job.
      openDrawerIds = () => {
        const ids = new Set()

        this.filterInstances.forEach((instance) => {
          const modal = instance.closest('modal-component')
          if (modal?.id && modal.classList.contains('open')) {
            ids.add(modal.id)
          }
        })

        return ids
      }

      restoreOpenDrawers = (root, ids) => {
        if (!ids.size) return

        root.querySelectorAll('modal-component').forEach((modal) => {
          if (ids.has(modal.id)) {
            modal.classList.add('open')
          }
        })
      }

      sortDropdown = () => {
        const trigger = this?.sortItems?.querySelector('#sortTrigger')
        const triggerIcon = trigger?.querySelector('.icon')
        const list = this?.sortItems?.querySelector('#sortList')

        trigger?.addEventListener(
          'click',
          () => {
            if (list.classList.contains('hidden')) {
              list.classList.remove('hidden')
              triggerIcon.classList.add('rotate-180')
            } else {
              list.classList.add('hidden')
              triggerIcon.classList.remove('rotate-180')
            }
          },
          { signal: this.signal }
        )
      }

      sortAndFilter = (reset = false, fetchUrl = false) => {
        let sfValues = false

        // Find all "all" checkboxes that are checked
        const allCheckboxes = this.sortAndFilterItems.filter(
          item => item.value === 'all' && item.checked
        )
        const excludeNames = allCheckboxes.map(item => item.name)
        const seen = new Set()

        sfValues = this.sortAndFilterItems
          .flatMap((item) => {
            if (item.value && item.name) {
              // Skip if this filter's name is in the exclude list
              if (excludeNames.includes(item.name)) {
                return null
              }
              if ((item.type === 'checkbox' || item.type === 'radio') && item.checked) {
                if (item.name === PRICE_BUCKET) {
                  return priceBucketParams(item.value)
                }
                if (item.type === 'radio' && sfValues[item.name]) {
                  sfValues[item.name] = item.value
                } else {
                  return { [item.name]: item.value }
                }
              } else if (item.type === 'range') {
                // A slider parked on its own bound isn't a filter — don't send it.
                const bound = item.dataset.omitAt === 'max' ? item.max : item.min
                return item.value === bound ? null : { [item.name]: item.value }
              } else if (item.type === 'number' || item.type === 'text') {
                return { [item.name]: item.value }
              }
            }
          })
          .filter((item) => item !== undefined && item !== null)
          .filter((param) => {
            // Each filter is rendered once per instance, so send every name/value once
            const key = Object.keys(param)[0] + '=' + Object.values(param)[0]
            if (seen.has(key)) return false
            seen.add(key)
            return true
          })

        // collectionUrl may carry a base query string that must persist across
        // filter/sort changes (e.g. search's ?q=…&type=product). Split it off so
        // it isn't clobbered, then re-attach it to every URL we build.
        const [pagePath, baseQuery] = this.collectionUrl.split('?')
        const basePrefix = baseQuery ? '&' + baseQuery : ''
        const sectionId = this.sectionId

        let sectionUrl = pagePath + '?sections=' + sectionId + basePrefix + qs(sfValues, '&')
        let newPageUrl = pagePath + (baseQuery ? '?' + baseQuery + qs(sfValues, '&') : qs(sfValues))

        if (reset) {
          sectionUrl = pagePath + '?sections=' + sectionId + basePrefix
          newPageUrl = pagePath + (baseQuery ? '?' + baseQuery : '')
        }

        if (fetchUrl) {
          // remove-filter / clear links already encode the full desired state
          const newFq = fetchUrl.split('?')[1]
          if (newFq) {
            sectionUrl = pagePath + '?sections=' + sectionId + '&' + newFq
            newPageUrl = pagePath + '?' + newFq
          } else {
            sectionUrl = pagePath + '?sections=' + sectionId + basePrefix
            newPageUrl = pagePath + (baseQuery ? '?' + baseQuery : '')
          }
        }

        this.section.classList.add('opacity-50')

        // UI state the server knows nothing about, carried across the re-render
        const expandedKeys = this.expandedGroupKeys()
        const openDrawers = this.openDrawerIds()
        const focusedId = document.activeElement?.id

        // Arrow-keying through a radio group fires a change per option, so supersede the
        // in-flight request rather than letting an older response land last.
        this.fetchController?.abort()
        this.fetchController = new AbortController()

        fetch(sectionUrl, { signal: this.fetchController.signal })
          .then((res) => res.json())
          .then((res) => {
            const template = document.createElement('template')
            template.innerHTML = res[this.sectionId].trim()
            const fresh = template.content.firstElementChild
            if (!fresh) return

            // Custom elements inside a template are inert, so the restored state is in
            // place before anything connects — no collapse-then-expand flash, and a
            // drawer that was open is open on the first paint rather than sliding in again.
            this.restoreExpandedGroups(fresh, expandedKeys)
            this.restoreOpenDrawers(fresh, openDrawers)
            this.refreshDetachedInstances(fresh, expandedKeys)

            // Replacing the section connects a new collection-grid, which rebinds every
            // instance (including the refreshed detached ones); this one disconnects and
            // drops its listeners.
            this.section.parentElement.replaceWith(fresh)

            // The focused control was just replaced; put focus back on its twin so
            // keyboard users don't get dumped at the top of the page mid-filtering.
            if (focusedId) {
              document.getElementById(focusedId)?.focus({ preventScroll: true })
            }

            window.history.replaceState({}, '', newPageUrl)
          })
          .catch((error) => {
            if (error.name === 'AbortError') return
            console.error('Error:', error)
            this.section.classList.remove('opacity-50')
          })

        return
      }
    }
  )
}
