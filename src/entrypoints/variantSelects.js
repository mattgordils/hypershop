class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange(event) {

    this.updateOptions();
    // this.updateMasterId();
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

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  // updateMedia() {
  //   if (!this.currentVariant) return;
  //   if (!this.currentVariant.featured_media) return;

  //   if (this.dataset.context === 'card-product') {
  //     const $img = (`#ProductCard-${this.dataset.section}-${this.dataset.productId} img`)
  //     $img.attr('src', this.currentVariant.featured_image.src);
  //     $img.attr('alt', this.currentVariant.featured_image.alt);
  //     $img.attr('srcset', '')
  //     //featured_image
  //   } else {
  //     const mediaGallery = $(`#MediaGallery-${this.dataset.section} .slick-slider`);
  //     const mediaThumbnails = $(`#pdpThumbnails`);
  //     const mediaGallerySlides = $(`#MediaGallery-${this.dataset.section} .slick-slider .slide`);
  //     const mediaId = this.dataset.section + '-' + this.currentVariant.featured_media.id

  //     $('#selectedOption').text(this.currentVariant.title)

  //     let sanitizedTitle = this.currentVariant.title.replace(/[^A-Z0-9]+/ig, "-");
  //     mediaGallery.attr('data-selected-variant', sanitizedTitle)

  //     const filterKey = '.variant-' + sanitizedTitle;

  //     mediaGallery.slick('slickUnfilter')
  //     mediaGallery.slick('slickFilter', filterKey).slick('refresh')
  //     // .slick('slickGoTo', 0)
  //     // mediaGallery.slick('slickGoTo', 0)
  //     let newSlideCount = $('#pdpThumbnails .slide.variant-' + sanitizedTitle + ':not(.slick-cloned)').length
  //     if (newSlideCount && newSlideCount > 10) {
  //       newSlideCount = 10
  //     }
  //     mediaThumbnails.css({ '--slide-count': newSlideCount });
  //     // mediaThumbnails.slick({ slidesToShow: newSlideCount }).slick('refresh');

  //     const currentSlideIndex = mediaGallery.find(`[data-media-id='${ mediaId }']`).index()

  //     const modalContent = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`);
  //     if (!modalContent) return;
  //     const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
  //     modalContent.prepend(newMediaModal);
  //   }
  // }

  // updateURL() {
  //   if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
  //   window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  // }

  // updateProductForm() {
  //   if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
  //   const currentVariantId = this.currentVariant.id;
  //   let productForm = $(this).parent()[0].querySelector('product-form');
  //   if (this.dataset.context !== 'card-product') {
  //   } else {
  //     productForm = $(this).parent().parent()[0];
  //   }
  //   productForm.setAttribute('data-current-variant', currentVariantId);

  //   $('*[class^="variant-checked-"]').each((index, item) => {
  //     $(item).prop('checked', false);
  //   });

  //   $('*[class^="variant-show-"]').each((index, item) => {
  //     if (item.classList.toString().includes(currentVariantId)) {
  //       $(item).removeClass('hidden');
  //       $(productForm).addClass('has-preorder');
  //     } else {
  //       $(item).addClass('hidden');
  //       $(productForm).removeClass('has-preorder');
  //     }
  //   })
  // }

  // updateShareUrl() {
  //   const shareButton = document.getElementById(`Share-${this.dataset.section}`);
  //   if (!shareButton || !shareButton.updateUrl) return;
  //   shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  // }

  updateVariantInput() {
    
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}, #quick-add-${this.dataset.productId}, #quick-add-slide-${this.dataset.productId}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;

    if (this.currentVariant && this.currentVariant.available && pickUpAvailability.fetchAvailability) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }

  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;

    const productForm = section.querySelector('product-form');
    if (productForm && productForm.handleErrorMessage) productForm.handleErrorMessage();
  }

  // renderProductInfo() {
  //   fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`)
  //     .then((response) => response.text())
  //     .then((responseText) => {
  //       const html = new DOMParser().parseFromString(responseText, 'text/html')
  //       const destination = document.getElementById(`price-${this.dataset.section}`);
  //       const source = html.getElementById(`price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);
  //       if (source && destination) destination.innerHTML = source.innerHTML;

  //       const price = document.getElementById(`price-${this.dataset.section}`);

  //       if (price) price.classList.remove('visibility-hidden');
  //       this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
  //     });
  // }

  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    // const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      // if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      // addButtonText.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }

  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}`);
    if (!addButton) return;
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('visibility-hidden');
  }

  // getVariantData() {
  //   this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
  //   console.log(this.variantData)
  //   return this.variantData;
  // }
}

customElements.define('variant-selects', VariantSelects);

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

customElements.define('variant-radios', VariantRadios);