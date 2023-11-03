export const toggleCollapsibleItem = (content, icon, expand) => {
  // Use areaHidden to toggle visibility
  console.log(content.ariaHidden)
  if (expand === 'inherit') {
    expand = content.ariaHidden === 'true'
  }
  //
  if (expand) {
    content.ariaHidden = 'false'
    icon.dataset.icon = 'minus'
  } else {
    content.ariaHidden = 'true'
    icon.dataset.icon = 'plus'
  }
}

if (!customElements.get("collapsible-item")) {
  customElements.define(
    "collapsible-item",
    class inView extends HTMLElement {
      constructor() {
        super();
        //
        this.trigger = this.querySelectorAll('[data-collapsible="trigger"]')
        this.content = this.querySelector('[data-collapsible="content"]')
        this.icon = this.querySelector('[data-collapsible="icon"] .animated-icon')

        this.content.ariaHidden = 'true'

        this.trigger.forEach(item => {
          item.addEventListener('click', event => {
            toggleCollapsibleItem(this.content, this.icon, 'inherit')
          })
        })
      }
    }
  )
}

if (!customElements.get("accordion-list")) {
  customElements.define(
    "accordion-list",
    class inView extends HTMLElement {
      constructor() {
        super();
        //
        this.trigger = this.querySelectorAll('[data-collapsible="trigger"]')
        this.content = this.querySelectorAll('[data-collapsible="content"]')
        this.collapsibleItems = this.querySelectorAll('collapsible-item')

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

      }
    }
  )
}