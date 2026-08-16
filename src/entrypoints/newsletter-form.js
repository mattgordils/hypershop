// Newsletter signup, submitted in place.
//
// Shopify's {% form 'customer' %} has no JSON endpoint, so this posts the same form data
// the browser would and reads the outcome from the response: a successful signup redirects
// to ?customer_posted=true, while a rejected one re-renders the page with the errors in
// it, which get lifted out of the returned HTML.
//
// The form still works untouched without JS — the listener is added here rather than the
// markup being JS-dependent — and the server-rendered success state (from a real reload)
// is still honoured, so both paths land in the same place.
if (!customElements.get('newsletter-form')) {
  customElements.define(
    'newsletter-form',
    class NewsletterForm extends HTMLElement {
      connectedCallback() {
        this.controller = new AbortController()

        this.form = this.querySelector('form')
        this.input = this.querySelector('[data-newsletter-input]')
        this.button = this.querySelector('button[type="submit"]')
        this.defaultIcon = this.querySelector('[data-newsletter-icon="default"]')
        this.successIcon = this.querySelector('[data-newsletter-icon="success"]')
        this.announce = this.querySelector('[data-newsletter-announce]')
        this.error = this.querySelector('[data-newsletter-error]')

        this.form?.addEventListener('submit', this.handleSubmit, {
          signal: this.controller.signal,
        })

        // Rendered mid-success by a non-JS submission — schedule the same revert.
        if (this.dataset.success === 'true') this.scheduleReset()
      }

      disconnectedCallback() {
        this.controller?.abort()
        clearTimeout(this.timer)
      }

      handleSubmit = async (event) => {
        // Let the browser handle its own validation message first
        if (!this.form.checkValidity()) return

        event.preventDefault()
        this.setBusy(true)
        this.clearError()

        try {
          const response = await fetch(this.form.action, {
            method: 'POST',
            body: new FormData(this.form),
            headers: { Accept: 'text/html' },
          })

          const html = await response.text()

          // Shopify signals a successful customer signup by redirecting to
          // ?customer_posted=true; fetch follows it, so the final URL is the tell.
          if (response.ok && response.url.includes('customer_posted=true')) {
            this.showSuccess()
            return
          }

          this.showError(this.errorFrom(html))
        } catch (error) {
          console.error('Newsletter signup failed:', error)
          this.showError(this.dataset.errorText)
        } finally {
          this.setBusy(false)
        }
      }

      // Shopify re-renders the whole page with the error inside the same container, so
      // pull it back out rather than inventing our own copy.
      errorFrom = (html) => {
        if (!html || !this.error?.id) return this.dataset.errorText

        const parsed = new DOMParser().parseFromString(html, 'text/html')
        const text = parsed.getElementById(this.error.id)?.textContent.trim()

        return text || this.dataset.errorText
      }

      setBusy = (busy) => {
        if (!this.button) return
        this.button.disabled = busy
        this.button.setAttribute('aria-busy', busy ? 'true' : 'false')
      }

      showSuccess = () => {
        if (this.input) {
          this.input.value = ''
          this.input.placeholder = this.dataset.successText || ''
          this.input.removeAttribute('aria-invalid')
        }

        this.defaultIcon?.setAttribute('hidden', '')
        this.successIcon?.removeAttribute('hidden')

        if (this.announce) this.announce.textContent = this.dataset.successText || ''
        this.dataset.success = 'true'

        this.scheduleReset()
      }

      showError = (message) => {
        if (!this.error) return
        this.error.textContent = message || this.dataset.errorText || ''
        this.error.removeAttribute('hidden')
        this.input?.setAttribute('aria-invalid', 'true')
      }

      clearError = () => {
        if (!this.error) return
        this.error.textContent = ''
        this.error.setAttribute('hidden', '')
        this.input?.removeAttribute('aria-invalid')
      }

      scheduleReset = () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => this.reset(), Number(this.dataset.resetDelay) || 3000)
      }

      reset = () => {
        // Someone who started typing during the confirmation shouldn't have it wiped.
        if (this.input && !this.input.value) {
          this.input.placeholder = this.dataset.placeholder || ''
        }

        this.defaultIcon?.removeAttribute('hidden')
        this.successIcon?.setAttribute('hidden', '')
        if (this.announce) this.announce.textContent = ''
        this.dataset.success = 'false'
      }
    }
  )
}
