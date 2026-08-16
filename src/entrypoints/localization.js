// Progressive enhancement for the country/language form: submit on change and drop the
// Go button. Without JS the form still works — that's why the button is in the markup
// rather than being created here.
if (!customElements.get('localization-form')) {
  customElements.define(
    'localization-form',
    class LocalizationForm extends HTMLElement {
      connectedCallback() {
        this.controller = new AbortController()
        this.form = this.querySelector('form')
        if (!this.form) return

        this.querySelector('[data-localization-submit]')?.setAttribute('hidden', '')

        this.querySelectorAll('[data-localization-select]').forEach((select) => {
          select.addEventListener('change', () => this.form.submit(), {
            signal: this.controller.signal,
          })
        })
      }

      disconnectedCallback() {
        this.controller?.abort()
      }
    }
  )
}
