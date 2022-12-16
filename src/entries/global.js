import './modal.js'

// Set Up Event Bus
class EventBus extends HTMLElement {
  constructor() {
    super();
    // initialize event list
    this.eventObject = { 
      menuUpdate: 'shop:menu-update', 
      mobileMenuUpdate: 'shop:mobile-nav-update', 
      cartUpdate: 'shop:cart-update', 
      variantUpdate: 'shop:variant-update', 
      productNavUpdate: 'shop:pn-udpate', 
      miniCartUpdate: 'shop:minicart-update', 
      recircUpdate: 'shop:recirc-update', 
      recircCartUpdate: 'shop:recirc-cart-add', 
    }
    // id of the callback function list
    this.callbackId = 0
  }

  // publish event
  publish(eventName, ...args) {
    // Get all the callback functions of the current event
    const callbackObject = this.eventObject[eventName]

    if (!callbackObject) return console.warn(eventName + " not found!")

    // execute each callback function
    for (let id in callbackObject) {
      // pass parameters when executing
      callbackObject[id](...args)
    }
  }
  // Subscribe to events
  subscribe(eventName, callback) {
    // initialize this event
    if (!this.eventObject[eventName]) {
      // Use object storage to improve the efficiency of deletion when logging out the callback function
      this.eventObject[eventName] = {}
    }

    const id = this.callbackId++

    // store the callback function of the subscriber
    // callbackId needs to be incremented after use for the next callback function
    this.eventObject[eventName][id] = callback

    // Every time you subscribe to an event, a unique unsubscribe function is generated
    const unSubscribe = () => {
      // clear the callback function of this subscriber
      delete this.eventObject[eventName][id];

      // If this event has no subscribers, also clear the entire event object
      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    }

    return { unSubscribe }
  }
}

customElements.define('event-bus', EventBus);

window.EventBus = document.querySelector('event-bus');

// MODALS
window.EventBus.subscribe("setModal", id => {
  if (id && document.querySelector('modal-component#' + id)) {
    if (document.querySelector('modal-component#' + id).classList.contains('open')) {
      document.querySelector('modal-component#' + id).classList.remove('open')
      setTimeout(() => {
        document.querySelector('modal-component#' + id).classList.remove('animating')
      }, 300)
    } else {
      document.querySelector('modal-component#' + id).classList.add('open', 'animating')
      document.querySelector('modal-component#' + id).classList.add('animating')
    }
  } else {
    const modals = document.querySelectorAll('modal-component');
    modals.forEach(modal => {
      modal.classList.remove('open')
      setTimeout(() => {
        modal.classList.remove('animating')
      }, 300)
    })
  }
});

// UPDATE CART
window.EventBus.subscribe("updateCart", cart => {
  fetch(window.Shopify.routes.root + "?sections=cart-drawer")
    .then(res => res.json())
    .then(res => {
      const currentCartDrawer = document.querySelector('#shopify-section-cart-drawer')
      currentCartDrawer.outerHTML = res['cart-drawer']
      window.EventBus.publish("setModal", "cartDrawer")
    })
  
  document.querySelectorAll('#cartCount').forEach((item) => {
    item.innerHTML = cart?.item_count || 0
  })
})

// VARIANT INPUTS
class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
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
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
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

    const mediaGalleries = document.querySelectorAll(`[id^="MediaGallery-${this.dataset.section}"]`);
    mediaGalleries.forEach(mediaGallery => mediaGallery.setActiveMedia(`${this.dataset.section}-${this.currentVariant.featured_media.id}`, true));

    const modalContent = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`);
    if (!modalContent) return;
    const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
    modalContent.prepend(newMediaModal);
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}`);
    if (!shareButton || !shareButton.updateUrl) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;

    if (this.currentVariant && this.currentVariant.available) {
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
    if (productForm) productForm.handleErrorMessage();
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
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
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
    })
    
    fieldsets.forEach(fieldSet => {
      // Set all radios inactive
      Array.from(fieldSet.querySelectorAll('input')).forEach(el => el.removeAttribute('checked'))
      // Set radios active when value is an active option
      Array.from(fieldSet.querySelectorAll('input')).forEach(el => {
        if (this.options.includes(el.value)) { el.setAttribute('checked','checked') }
      })
    })
  }
}

customElements.define('variant-radios', VariantRadios);

// QUANTITY INPUT
class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('.qty-value');
    this.changeEvent = new Event('change', { bubbles: true })

    this.querySelectorAll('button').forEach(
      (button) => button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  onButtonClick(event) {
    event.preventDefault();
    const previousValue = this.input.html;

    if (event.target.name === 'plus') {
      console.log(this.input.html)
      this.input.html = parseInt(this.input.html) + 1
    } else {
      this.input.html = parseInt(this.input.html) - 1
    }
    // if (previousValue !== this.input.html) this.input.dispatchEvent(this.changeEvent);
  }
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

customElements.define('quantity-input', QuantityInput);

// PRODUCT FORM
if (!customElements.get('product-form')) {
  const fetchConfig = (type = 'json') => {
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
    }
  }

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
        const qty = this?.qty?.getAttribute('value') || 1
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
        // if (this.cart) {
        //   formData.append(
        //     'sections',
        //     this.cart.getSectionsToRender().map(section => section.id),
        //   );
        //   formData.append('sections_url', window.location.pathname);
        //   this.cart.setActiveElement(document.activeElement);
        // }
        config.body = formData;

        fetch(`${routes.cart_add_url}`, config)
          .then(response => response.json())
          .then(response => {
            if (response.product_id) {
              if (window.cartItems.includes(response.product_id) === false) {
                window.cartItems = [...window.cartItems, `${response.product_id}`]
              }
            }

            let uniqueLineItems = [...new Set(window.cartItems)]

            console.log(window)
            console.log(response)

            fetch(`/cart.js`, config)
              .then(response => response.json())
              .then(response => {
                console.log('cartjs: ', response)
                window.EventBus.publish("updateCart", response)
              })
              .catch(e => {
                console.error(e);
              })
            
            if (response.status) {
              this.handleErrorMessage(response.description);

              const soldOutMessage = this.submitButton.querySelector('.sold-out-message')
              if (!soldOutMessage) return
              this.submitButton.setAttribute('aria-disabled', true)
              this.submitButton.querySelector('span').classList.add('hidden')
              soldOutMessage.classList.remove('hidden')
              this.error = true
              return;
            } else if (!this.cart) {
              // window.location = window.routes.cart_url
              // console.log('dom: ', dom)
              return
            }

            this.error = false;
            // this.cart.renderContents(response)
          })
          .catch(e => {
            console.error(e);
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            // window.EventBus.publish("setModal", false);
            if (this.cart && this.cart.classList.contains('is-empty'))
              this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
            
            if (this.loadingSpinner) {
              this.loadingSpinner.classList.add('hidden');
            }
    
          });
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