import { getSelectedOptions, getVariant } from './global'

class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
    this.parent = this.closest('div');
    this.parentCard = this.closest('.product-card');
    this.pdpForm = this.closest('add-to-cart-form')
    this.variantData = [];
    this.context = this.dataset.context
    this.addToCartButton = this.parent.querySelector('.button.add-to-cart-btn')
    this.setMasterId();
    this.setAddToCardEnabled();
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
    this.setAddToCardEnabled();

    if (!this.currentVariant.id) {
      // this.toggleAddButton(true, '', true); TODO
      // this.setUnavailable();
    } else {
      // this.updateMedia();
      // this.updateProductForm();
      if (this.context === 'PDP') {
        // Update content for PDP
        this.updateURL();
        this.updateSection();
        // this.updateMedia();
        // this.updateShareUrl();
      }
      if (this.parentCard) {
        this.updateCardMedia()
      }
      this.updateVariantInput();
      // this.renderProductInfo();
    }
  }

  updateOptions = () => {
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
    const options = this.querySelectorAll('option, input[type=radio], input[type=checkbox]')
    options.forEach(option => {
      if(!checkAvailability(option.value)) {
        option.setAttribute('disabled', true)
        option.checked = false
      }
    })
  }

  setAddToCardEnabled = () => {
    const options = this.querySelectorAll('option, input[type=radio], input[type=checkbox]');
    const productOptions = Array.from(options)
    if (options && options.length > 0) {
      const checkedOptions = productOptions.filter(option => option.checked)[0];
      if (checkedOptions) {
        this.addToCartButton.disabled = false
      } else {
        this.addToCartButton.disabled = true
      }
    }
  }

  setMasterId = () => {
    this.variantData = JSON.parse(this.parent.querySelector('[type="application/json"]').textContent)
    const productOptions = this.parent.querySelectorAll('variant-radios input, variant-selects')
    const selectedOptions = getSelectedOptions(productOptions)
    const currentVariant = getVariant(selectedOptions, this.variantData)
    this.currentVariant = currentVariant
  }

  updateURL = () => {
    const productUrl = this.parent.dataset.url
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${productUrl}?variant=${this.currentVariant.id}`);
  }

  updateSection() {
    const sectionToUpdate = this.closest('.shopify-section').id
    const prevSection = document.querySelector('#mainPDP')

    if (sectionToUpdate && this.currentVariant.id !== this.initialVariant) {
      const sectionId = sectionToUpdate.split('shopify-section-')[1]
      const contextUrl = (window.location.pathname + '?variant=' + this.currentVariant.id)

      fetch(contextUrl + "&sections=" + sectionId)
        .then(res => res.json())
        .then(res => {
          var el = document.createElement( 'div' )
          el.innerHTML = res[sectionId]

          // const prevSection = document.querySelector('#mainPDP')
          const nextSection = el.querySelector('#mainPDP')

          if (this.refreshSection) {
            prevSection.outerHTML = nextSection.outerHTML
          } else {
            const oldPdpPrice = this.pdpForm.querySelector('#productPrice')
            const newPdpPrice = el.querySelector('#productPrice')
            oldPdpPrice.innerHTML = newPdpPrice.innerHTML
          }

          return
        })
    }
  }

  // TODO: Functions for variant changes when necessary
  // updateMedia() {}
  // updateShareUrl() {}
  // Function to enable and disable buy now button?

  updateCardMedia = () => {
    const newFeaturedImage = this?.currentVariant?.featured_image?.src
    if (newFeaturedImage) {
      // Update image based on variant selections
      const cardImage = this.parentCard.querySelector('#cardImage')
      cardImage.src = newFeaturedImage
      cardImage.srcset = newFeaturedImage
    }

    const cardPrice = this.parentCard.querySelector('#cardPrice')
    if (cardPrice) {
      // Update price based on variant selections
      cardPrice.innerHTML = '$' + (this.currentVariant.price / 100).toFixed(2);
    }
  }

  updateVariantInput = () => {
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