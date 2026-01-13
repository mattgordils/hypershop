export const toggleCollapsibleItem = (content, icon, expand) => {
  // Use areaHidden to toggle visibility
  if (expand === 'inherit') {
    expand = content.ariaHidden === 'true'
  }
  //
  if (expand) {
    content.ariaHidden = 'false'
    if (icon) {
      icon.dataset.icon = 'minus'
    }
  } else {
    content.ariaHidden = 'true'
    if (icon) {
      icon.dataset.icon = 'plus'
    }
  }
}

if (!customElements.get("collapsible-item")) {
  customElements.define(
    "collapsible-item",
    class collapsibleItem extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        // Use setTimeout to ensure child elements are fully parsed
        setTimeout(() => {
          this.trigger = this.querySelectorAll('[data-collapsible="trigger"]')
          this.content = this.querySelector('[data-collapsible="content"]')
          this.icon = this.querySelector('[data-collapsible="icon"] .animated-icon')

          if (!this.content) {
            console.error('collapsible-item: No content element found', this)
            return
          } else {
            this.content.ariaHidden = 'true'
          }

          this.trigger.forEach(item => {
            item.addEventListener('click', event => {
              toggleCollapsibleItem(this.content, this.icon, 'inherit')
            })
          })
        }, 0)
      }
    }
  )
}

if (!customElements.get("collapsible-trigger")) {
  customElements.define(
    "collapsible-trigger",
    class collapsibleTrigger extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        this.addEventListener('click', () => {
          const targetId = this.dataset.id
          if (!targetId) {
            console.error('collapsible-trigger: No data-id attribute found', this)
            return
          }

          const targetItem = document.getElementById(targetId)
          if (!targetItem || targetItem.tagName.toLowerCase() !== 'collapsible-item') {
            console.error(`collapsible-trigger: No collapsible-item found with id "${targetId}"`, this)
            return
          }

          const content = targetItem.querySelector('[data-collapsible="content"]')
          const icon = targetItem.querySelector('[data-collapsible="icon"] .animated-icon')

          if (!content) {
            console.error(`collapsible-trigger: Target collapsible-item "${targetId}" has no content element`, targetItem)
            return
          }

          toggleCollapsibleItem(content, icon, 'inherit')
        })
      }
    }
  )
}

if (!customElements.get("accordion-list")) {
  customElements.define(
    "accordion-list",
    class accordionList extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        // Use setTimeout to ensure child elements are fully parsed
        setTimeout(() => {
          this.trigger = this.querySelectorAll('[data-collapsible="trigger"]')
          this.content = this.querySelectorAll('[data-collapsible="content"]')
          this.collapsibleItems = this.querySelectorAll('collapsible-item')

          if (this.dataset.initialOpen) {
            const item = this.collapsibleItems[this.dataset.initialOpen]
            const content = item.querySelector('[data-collapsible="content"]')
            const icon = item.querySelector('[data-collapsible="icon"] .animated-icon')
            toggleCollapsibleItem(content, icon, true)
          }

          this.trigger.forEach(item => {
            item.addEventListener('click', event => {
              const parent = item.closest('collapsible-item')
              this.collapsibleItems.forEach(item => {
                const content = item.querySelector('[data-collapsible="content"]')
                const icon = item.querySelector('[data-collapsible="icon"] .animated-icon')
                if (item.id !== parent.id) {
                  // Close other items
                  toggleCollapsibleItem(content, icon, false)
                }
              })
            })
          })
        }, 0)
      }
    }
  )
}