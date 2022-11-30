class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange(event) {

    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateProductForm();
      if (this.dataset.context !== 'card-product') {
        this.updateURL();
        this.updateShareUrl();
      }
      this.updateVariantInput();
      this.renderProductInfo();
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

  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;

    if (this.dataset.context === 'card-product') {
      const $img = $(`#ProductCard-${this.dataset.section}-${this.dataset.productId} img`)
      $img.attr('src', this.currentVariant.featured_image.src);
      $img.attr('alt', this.currentVariant.featured_image.alt);
      $img.attr('srcset', '')
      //featured_image
    } else {
      const mediaGallery = $(`#MediaGallery-${this.dataset.section} .slick-slider`);
      const mediaThumbnails = $(`#pdpThumbnails`);
      const mediaGallerySlides = $(`#MediaGallery-${this.dataset.section} .slick-slider .slide`);
      const mediaId = this.dataset.section + '-' + this.currentVariant.featured_media.id

      $('#selectedOption').text(this.currentVariant.title)

      let sanitizedTitle = this.currentVariant.title.replace(/[^A-Z0-9]+/ig, "-");
      mediaGallery.attr('data-selected-variant', sanitizedTitle)

      const filterKey = '.variant-' + sanitizedTitle;

      mediaGallery.slick('slickUnfilter')
      mediaGallery.slick('slickFilter', filterKey).slick('refresh')
      // .slick('slickGoTo', 0)
      // mediaGallery.slick('slickGoTo', 0)
      let newSlideCount = $('#pdpThumbnails .slide.variant-' + sanitizedTitle + ':not(.slick-cloned)').length
      if (newSlideCount && newSlideCount > 10) {
        newSlideCount = 10
      }
      mediaThumbnails.css({ '--slide-count': newSlideCount });
      // mediaThumbnails.slick({ slidesToShow: newSlideCount }).slick('refresh');

      const currentSlideIndex = mediaGallery.find(`[data-media-id='${ mediaId }']`).index()

      const modalContent = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`);
      if (!modalContent) return;
      const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
      modalContent.prepend(newMediaModal);
    }
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateProductForm() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    const currentVariantId = this.currentVariant.id;
    let productForm = $(this).parent()[0].querySelector('product-form');
    if (this.dataset.context !== 'card-product') {
    } else {
      productForm = $(this).parent().parent()[0];
    }
    productForm.setAttribute('data-current-variant', currentVariantId);

    $('*[class^="variant-checked-"]').each((index, item) => {
      $(item).prop('checked', false);
    });

    $('*[class^="variant-show-"]').each((index, item) => {
      if (item.classList.toString().includes(currentVariantId)) {
        $(item).removeClass('hidden');
        $(productForm).addClass('has-preorder');
      } else {
        $(item).addClass('hidden');
        $(productForm).removeClass('has-preorder');
      }
    })
  }

  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}`);
    if (!shareButton || !shareButton.updateUrl) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

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

  renderProductInfo() {
    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.getElementById(`price-${this.dataset.section}`);
        const source = html.getElementById(`price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);
        if (source && destination) destination.innerHTML = source.innerHTML;

        const price = document.getElementById(`price-${this.dataset.section}`);

        if (price) price.classList.remove('visibility-hidden');
        this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
      });
  }

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

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}

customElements.define('variant-selects', VariantSelects);

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
        if (this.options.includes(el.value)) $(el).attr('checked','checked');
      });
    })
  }
}

customElements.define('variant-radios', VariantRadios);

if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.context = this.dataset.context || null;
        this.form = this.querySelector('form');
        this.form.querySelector('[name=id]').disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.qty = document.querySelector('quantity-input.pdp-quantity input');
        this.submitButton = this.querySelector('[type="submit"]');
        this.loadingSpinner = this.context === 'cart-quick-add' ? this.querySelector('.cart-quick-add__spinner') : this.querySelector('.loading-overlay__spinner')
        this.quickAdd = this.context === 'cart-quick-add' ? this.querySelector('.cart-quick-add__add') : null
        this.bundleItems = this.dataset.bundle || null
        this.bundleName = this.dataset.bundleName || null
        
        if (document.querySelector('cart-drawer')) {
          this.submitButton.setAttribute('aria-haspopup', 'dialog');
        }

      }

      onSubmitHandler(evt) {
        const qty = this.qty.getAttribute('value')
        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        
        if (this.loadingSpinner) {
          this.loadingSpinner.classList.remove('hidden');
        }

        if (this.quickAdd) {
          this.quickAdd.classList.add('hidden');
        }
        
        let config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);
        if (this.cart) {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map(section => section.id),
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }
        config.body = formData;

        if (this.bundleItems !== null) {
          const bundleItemIds = this.bundleItems.split(',');
          var bundleName = this.bundleName;

          const itemArray = [];
          bundleItemIds.forEach(item => {
            itemArray.push({
              id: item,
              quantity: qty,
              properties: { 'bundle': bundleName }
            });
          });

          let bodyData = {
            items: itemArray,
            sections: this.cart.getSectionsToRender().map(section => section.id),
            sections_url: window.location.pathname
          };

          config = fetchConfig('json');
          config.body = JSON.stringify(bodyData);

          ///
          fetch(`${routes.cart_add_url}`, config)
            .then(response => response.json())
            .then(response => {
              if (response.product_id) {
                if (window.cartItems.includes(response.product_id) === false) {
                    window.cartItems = [...window.cartItems, `${response.product_id}`]
                }
              }
              
              if (response.status) {
                this.handleErrorMessage(response.description);

                const soldOutMessage =
                  this.submitButton.querySelector('.sold-out-message');
                if (!soldOutMessage) return;
                this.submitButton.setAttribute('aria-disabled', true);
                this.submitButton.querySelector('span').classList.add('hidden');
                soldOutMessage.classList.remove('hidden');
                this.error = true;
                return;
              } else if (!this.cart) {
                window.location = window.routes.cart_url;
                return;
              }

              this.error = false;
              const quickAddModal = this.closest('quick-add-modal');
              if (quickAddModal) {
                document.body.addEventListener(
                  'modalClosed',
                  () => {
                    setTimeout(() => {
                      this.cart.renderContents(response);
                    });
                  },
                  {once: true},
                );
                quickAddModal.hide(true);
              } else {
                this.cart.renderContents(response);
              }
            })
            .catch(e => {
              console.error(e);
            })
            .finally(() => {
              this.submitButton.classList.remove('loading');
              if (this.cart && this.cart.classList.contains('is-empty'))
                this.cart.classList.remove('is-empty');
              if (!this.error) this.submitButton.removeAttribute('aria-disabled');
              
              if (this.loadingSpinner) {
                this.loadingSpinner.classList.add('hidden');
              }
      
              if (this.quickAdd) {
                this.quickAdd.classList.remove('hidden');
              }
            });
          ///
        } else {
          fetch(`${routes.cart_add_url}`, config)
            .then(response => response.json())
            .then(response => {
              if (response.product_id) {
                if (window.cartItems.includes(response.product_id) === false) {
                    window.cartItems = [...window.cartItems, `${response.product_id}`]
                }
              }
              
              if (response.status) {
                this.handleErrorMessage(response.description);

                const soldOutMessage =
                  this.submitButton.querySelector('.sold-out-message');
                if (!soldOutMessage) return;
                this.submitButton.setAttribute('aria-disabled', true);
                this.submitButton.querySelector('span').classList.add('hidden');
                soldOutMessage.classList.remove('hidden');
                this.error = true;
                return;
              } else if (!this.cart) {
                window.location = window.routes.cart_url;
                return;
              }

              this.error = false;
              const quickAddModal = this.closest('quick-add-modal');
              if (quickAddModal) {
                document.body.addEventListener(
                  'modalClosed',
                  () => {
                    setTimeout(() => {
                      this.cart.renderContents(response);
                    });
                  },
                  {once: true},
                );
                quickAddModal.hide(true);
              } else {
                this.cart.renderContents(response);
              }
            })
            .catch(e => {
              console.error(e);
            })
            .finally(() => {
              this.submitButton.classList.remove('loading');
              if (this.cart && this.cart.classList.contains('is-empty'))
                this.cart.classList.remove('is-empty');
              if (!this.error) this.submitButton.removeAttribute('aria-disabled');
              
              if (this.loadingSpinner) {
                this.loadingSpinner.classList.add('hidden');
              }
      
              if (this.quickAdd) {
                this.quickAdd.classList.remove('hidden');
              }
            });
        }
      }

      handleErrorMessage(errorMessage = false) {
        this.errorMessageWrapper =
          this.errorMessageWrapper ||
          this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage =
          this.errorMessage ||
          this.errorMessageWrapper.querySelector(
            '.product-form__error-message',
          );

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    },
  );
}