class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
    this.setOptionAvailability();
  }

  onVariantChange(event) {

    this.updateOptions();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      // this.updateMedia();
      // this.updateProductForm();
      if (this.dataset.context !== 'card-product') {
        // this.updateURL();
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
    const parent = this.closest('div')
    const variantData = JSON.parse(parent.querySelector('[type="application/json"]').textContent)
    const variants = variantData
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
        console.log(option.value)
      }
    })
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  // TODO: Functions for variant changes when necessary
  // updateMedia() {}
  // updateURL() {}
  // updateProductForm() {} // Not sure what this one does
  // updateShareUrl() {}

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