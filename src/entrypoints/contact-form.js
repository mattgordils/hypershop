// Contact form, submitted in place.
//
// Shopify's {% form 'contact' %} has no JSON endpoint, so this posts the same form data the
// browser would and reads the outcome from the response: a successful send redirects to
// ?contact_posted=true, while a rejected one re-renders the page with the errors in it,
// which get lifted back out of the returned HTML.
//
// Same shape as newsletter-form.js — the customer form signals with customer_posted=true,
// this one with contact_posted=true. The form still works untouched without JS, which is
// why the listener is added here rather than the markup depending on it.

if (!customElements.get('contact-form')) {
  customElements.define(
    'contact-form',
    class ContactForm extends HTMLElement {
      connectedCallback() {
        this.controller = new AbortController()

        this.form = this.querySelector('form')
        this.button = this.querySelector('button[type="submit"]')
        this.success = this.querySelector('[data-contact-success]')
        this.errorWrap = this.querySelector('[data-contact-error-wrap]')
        this.errors = this.errorWrap?.querySelector('[id]')

        this.form?.addEventListener('submit', this.handleSubmit, {
          signal: this.controller.signal
        })
      }

      disconnectedCallback() {
        this.controller?.abort()
      }

      handleSubmit = async (event) => {
        // Let the browser show its own validation messages first.
        if (!this.form.checkValidity()) return

        event.preventDefault()
        this.setBusy(true)
        this.close(this.errorWrap)
        this.close(this.success)

        try {
          const response = await fetch(this.form.action, {
            method: 'POST',
            body: new FormData(this.form),
            headers: { Accept: 'text/html' }
          })

          // Shopify can answer a submission with its spam challenge instead. That page has
          // to be completed by hand, and it can't be shown from inside this component, so
          // hand the browser over to it rather than reporting a failure that isn't one.
          if (response.url.includes('/challenge')) {
            window.location.href = response.url
            return
          }

          const html = await response.text()

          if (response.ok && response.url.includes('contact_posted=true')) {
            this.showSuccess()
            return
          }

          this.showError(this.errorFrom(html))
        } catch (error) {
          console.error('Contact form submission failed:', error)
          this.showError(this.dataset.errorText)
        } finally {
          this.setBusy(false)
        }
      }

      // Shopify re-renders the whole page with the errors inside the same container, so
      // pull them back out rather than inventing our own copy.
      errorFrom = (html) => {
        if (!html || !this.errors?.id) return this.dataset.errorText

        const parsed = new DOMParser().parseFromString(html, 'text/html')
        const text = parsed.getElementById(this.errors.id)?.textContent.trim()

        return text || this.dataset.errorText
      }

      setBusy = (busy) => {
        if (!this.button) return
        this.button.disabled = busy
        this.button.setAttribute('aria-busy', busy ? 'true' : 'false')
      }

      showSuccess = () => {
        // Reset before opening: the confirmation replaces the form's contents conceptually,
        // and a resubmit of the same message is never what someone wants.
        this.form.reset()
        this.open(this.success)
        this.success?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }

      showError = (message) => {
        if (!this.errors) return
        this.errors.textContent = message || this.dataset.errorText || ''
        this.open(this.errorWrap)
      }

      open = (element) => element?.setAttribute('data-open', 'true')

      close = (element) => element?.setAttribute('data-open', 'false')
    }
  )
}
