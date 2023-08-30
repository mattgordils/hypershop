import { getSelectedOptions, getVariant } from './global'

class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
    this.parent = this.closest('div');
    this.variantData = [];
    this.context = this.dataset.context
    this.setMasterId();
    this.setOptionAvailability();
    if (this.context === 'PDP') {
      // Update content for PDP
      this.updateURL();
      // this.updateMedia();
      // this.updateShareUrl();
    }
  }

  onVariantChange(event) {

    this.updateOptions();
    // this.toggleAddButton(true, '', false); TODO
    // this.updatePickupAvailability(); TODO?
    // this.removeErrorMessage(); TODO?
    this.setMasterId();

    if (!this.currentVariant) {
      // this.toggleAddButton(true, '', true); TODO
      // this.setUnavailable();
    } else {
      // this.updateMedia();
      // this.updateProductForm();
      if (this.context === 'PDP') {
        // Update content for PDP
        this.updateURL();
        // this.updateMedia();
        // this.updateShareUrl();
      }
      this.updateVariantInput();
      // this.renderProductInfo();
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  // Disable unavailabile options
  setOptionAvailability = () => {
    const variants = this.variantData
    const checkAvailability = value => {
      const selectedVariant = variants && variants.find(({ options }) => (
        options.find(x => x === value)
      ))
      return (selectedVariant && selectedVariant.available)
    }

    // For each option, check and set availability
    const options = this.querySelectorAll('option, input[type=radio]')
    options.forEach(option => {
      if(!checkAvailability(option.value)) {
        option.setAttribute('disabled', true)
      }
    })
  }

  setMasterId() {
    this.variantData = JSON.parse(this.parent.querySelector('[type="application/json"]').textContent)
    const productOptions = this.parent.querySelectorAll('variant-radios input, variant-selects')
    const selectedOptions = getSelectedOptions(productOptions)
    const currentVariant = getVariant(selectedOptions, this.variantData)
    this.currentVariant = currentVariant
  }

  updateURL() {
    const productUrl = this.parent.dataset.url
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${productUrl}?variant=${this.currentVariant.id}`);
  }

  // TODO: Functions for variant changes when necessary
  // updateMedia() {}
  // updateShareUrl() {}
  // Function to enable and disable buy now button?

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}, #quick-add-${this.dataset.productId}, #quick-add-slide-${this.dataset.productId}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

}

if (!customElements.get('variant-selects')) {
  customElements.define('variant-selects', VariantSelects);
}

// Reuse Logic for Radios
class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
    
    fieldsets.forEach(fieldSet => {
      // Set all radios inactive
      Array.from(fieldSet.querySelectorAll('input')).forEach(el => el.removeAttribute('checked'))
      // Set radios active when value is an active option
      Array.from(fieldSet.querySelectorAll('input')).forEach(el => {
        if (this.options.includes(el.value)) {
          el.setAttribute('checked', 'checked')
        }
      });
    })
  }
}

if (!customElements.get('variant-radios')) {
  customElements.define('variant-radios', VariantRadios);
}