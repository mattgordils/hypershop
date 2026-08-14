// Dual-thumb price slider. Two stacked range inputs behave as one control: this keeps
// them from crossing, drives the fill and the value readouts, and otherwise stays out of
// the way — the inputs are named filter.v.price.gte/lte, so <collection-grid> collects
// them like any other filter input and their native `change` (on release) refetches.
if (!customElements.get('price-slider')) {
  customElements.define(
    'price-slider',
    class PriceSlider extends HTMLElement {
      connectedCallback() {
        this.controller = new AbortController()

        this.min = this.querySelector('[data-price-thumb="min"]')
        this.max = this.querySelector('[data-price-thumb="max"]')
        this.fill = this.querySelector('[data-price-fill]')
        this.outputs = {
          min: this.querySelector('[data-price-output="min"]'),
          max: this.querySelector('[data-price-output="max"]'),
        }

        if (!this.min || !this.max) return

        // Money formatting comes from the server-rendered readouts, so the shopper's
        // currency and format are respected without reimplementing the money filter.
        this.formatSample = this.outputs.max?.textContent.trim() || ''

        ;[this.min, this.max].forEach((input) => {
          input.addEventListener('input', () => this.handleInput(input), {
            signal: this.controller.signal,
          })
        })

        this.render()
      }

      disconnectedCallback() {
        this.controller?.abort()
      }

      handleInput = (input) => {
        const min = Number(this.min.value)
        const max = Number(this.max.value)

        // Push rather than swap: the thumb you're dragging keeps following the cursor.
        if (min > max) {
          if (input === this.min) {
            this.max.value = String(min)
          } else {
            this.min.value = String(max)
          }
        }

        this.render()
      }

      // "$1,234.00" → "$" + formatted number, reusing whatever the server produced.
      format = (value) => {
        const [prefix] = this.formatSample.match(/^[^\d]*/) || ['']
        const [suffix] = this.formatSample.match(/[^\d.,]*$/) || ['']
        const hasDecimals = /[.,]\d{2}$/.test(this.formatSample)

        return prefix + value.toLocaleString(undefined, {
          minimumFractionDigits: hasDecimals ? 2 : 0,
          maximumFractionDigits: hasDecimals ? 2 : 0,
        }) + suffix
      }

      render = () => {
        const bound = Number(this.max.max) || 0
        const min = Number(this.min.value)
        const max = Number(this.max.value)

        if (bound > 0) {
          this.fill?.style.setProperty('--fill-start', `${(min / bound) * 100}%`)
          this.fill?.style.setProperty('--fill-end', `${(max / bound) * 100}%`)
        }

        if (this.outputs.min) this.outputs.min.textContent = this.format(min)
        if (this.outputs.max) this.outputs.max.textContent = this.format(max)
      }
    }
  )
}
