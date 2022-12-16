/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/entries/global.js":
/*!*******************************!*\
  !*** ./src/entries/global.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ \"./src/entries/modal.js\");\n/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modal_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\n// Set Up Event Bus\nclass EventBus extends HTMLElement {\n  constructor() {\n    super();\n    // initialize event list\n    this.eventObject = {\n      menuUpdate: 'shop:menu-update',\n      mobileMenuUpdate: 'shop:mobile-nav-update',\n      cartUpdate: 'shop:cart-update',\n      variantUpdate: 'shop:variant-update',\n      productNavUpdate: 'shop:pn-udpate',\n      miniCartUpdate: 'shop:minicart-update',\n      recircUpdate: 'shop:recirc-update',\n      recircCartUpdate: 'shop:recirc-cart-add'\n    };\n    // id of the callback function list\n    this.callbackId = 0;\n  }\n\n  // publish event\n  publish(eventName, ...args) {\n    // Get all the callback functions of the current event\n    const callbackObject = this.eventObject[eventName];\n    if (!callbackObject) return console.warn(eventName + \" not found!\");\n\n    // execute each callback function\n    for (let id in callbackObject) {\n      // pass parameters when executing\n      callbackObject[id](...args);\n    }\n  }\n  // Subscribe to events\n  subscribe(eventName, callback) {\n    // initialize this event\n    if (!this.eventObject[eventName]) {\n      // Use object storage to improve the efficiency of deletion when logging out the callback function\n      this.eventObject[eventName] = {};\n    }\n    const id = this.callbackId++;\n\n    // store the callback function of the subscriber\n    // callbackId needs to be incremented after use for the next callback function\n    this.eventObject[eventName][id] = callback;\n\n    // Every time you subscribe to an event, a unique unsubscribe function is generated\n    const unSubscribe = () => {\n      // clear the callback function of this subscriber\n      delete this.eventObject[eventName][id];\n\n      // If this event has no subscribers, also clear the entire event object\n      if (Object.keys(this.eventObject[eventName]).length === 0) {\n        delete this.eventObject[eventName];\n      }\n    };\n    return {\n      unSubscribe\n    };\n  }\n}\ncustomElements.define('event-bus', EventBus);\nwindow.EventBus = document.querySelector('event-bus');\n\n// MODALS\nwindow.EventBus.subscribe(\"setModal\", id => {\n  if (id && document.querySelector('modal-component#' + id)) {\n    if (document.querySelector('modal-component#' + id).classList.contains('open')) {\n      document.querySelector('modal-component#' + id).classList.remove('open');\n      setTimeout(() => {\n        document.querySelector('modal-component#' + id).classList.remove('animating');\n      }, 300);\n    } else {\n      document.querySelector('modal-component#' + id).classList.add('open', 'animating');\n      document.querySelector('modal-component#' + id).classList.add('animating');\n    }\n  } else {\n    const modals = document.querySelectorAll('modal-component');\n    modals.forEach(modal => {\n      modal.classList.remove('open');\n      setTimeout(() => {\n        modal.classList.remove('animating');\n      }, 300);\n    });\n  }\n});\n\n// UPDATE CART\nwindow.EventBus.subscribe(\"updateCart\", cart => {\n  fetch(window.Shopify.routes.root + \"?sections=cart-drawer\").then(res => res.json()).then(res => {\n    const currentCartDrawer = document.querySelector('#shopify-section-cart-drawer');\n    currentCartDrawer.outerHTML = res['cart-drawer'];\n    window.EventBus.publish(\"setModal\", \"cartDrawer\");\n  });\n  document.querySelectorAll('#cartCount').forEach(item => {\n    item.innerHTML = cart?.item_count || 0;\n  });\n});\n\n// VARIANT INPUTS\nclass VariantSelects extends HTMLElement {\n  constructor() {\n    super();\n    this.addEventListener('change', this.onVariantChange);\n  }\n  onVariantChange() {\n    this.updateOptions();\n    this.updateMasterId();\n    this.toggleAddButton(true, '', false);\n    this.updatePickupAvailability();\n    this.removeErrorMessage();\n    if (!this.currentVariant) {\n      this.toggleAddButton(true, '', true);\n      this.setUnavailable();\n    } else {\n      this.updateMedia();\n      this.updateURL();\n      this.updateVariantInput();\n      this.renderProductInfo();\n      this.updateShareUrl();\n    }\n  }\n  updateOptions() {\n    this.options = Array.from(this.querySelectorAll('select'), select => select.value);\n  }\n  updateMasterId() {\n    this.currentVariant = this.getVariantData().find(variant => {\n      return !variant.options.map((option, index) => {\n        return this.options[index] === option;\n      }).includes(false);\n    });\n  }\n  updateMedia() {\n    if (!this.currentVariant) return;\n    if (!this.currentVariant.featured_media) return;\n    const mediaGalleries = document.querySelectorAll(`[id^=\"MediaGallery-${this.dataset.section}\"]`);\n    mediaGalleries.forEach(mediaGallery => mediaGallery.setActiveMedia(`${this.dataset.section}-${this.currentVariant.featured_media.id}`, true));\n    const modalContent = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`);\n    if (!modalContent) return;\n    const newMediaModal = modalContent.querySelector(`[data-media-id=\"${this.currentVariant.featured_media.id}\"]`);\n    modalContent.prepend(newMediaModal);\n  }\n  updateURL() {\n    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;\n    window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);\n  }\n  updateShareUrl() {\n    const shareButton = document.getElementById(`Share-${this.dataset.section}`);\n    if (!shareButton || !shareButton.updateUrl) return;\n    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);\n  }\n  updateVariantInput() {\n    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`);\n    productForms.forEach(productForm => {\n      const input = productForm.querySelector('input[name=\"id\"]');\n      input.value = this.currentVariant.id;\n      input.dispatchEvent(new Event('change', {\n        bubbles: true\n      }));\n    });\n  }\n  updatePickupAvailability() {\n    const pickUpAvailability = document.querySelector('pickup-availability');\n    if (!pickUpAvailability) return;\n    if (this.currentVariant && this.currentVariant.available) {\n      pickUpAvailability.fetchAvailability(this.currentVariant.id);\n    } else {\n      pickUpAvailability.removeAttribute('available');\n      pickUpAvailability.innerHTML = '';\n    }\n  }\n  removeErrorMessage() {\n    const section = this.closest('section');\n    if (!section) return;\n    const productForm = section.querySelector('product-form');\n    if (productForm) productForm.handleErrorMessage();\n  }\n  renderProductInfo() {\n    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`).then(response => response.text()).then(responseText => {\n      const html = new DOMParser().parseFromString(responseText, 'text/html');\n      const destination = document.getElementById(`price-${this.dataset.section}`);\n      const source = html.getElementById(`price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);\n      if (source && destination) destination.innerHTML = source.innerHTML;\n      const price = document.getElementById(`price-${this.dataset.section}`);\n      if (price) price.classList.remove('visibility-hidden');\n      this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);\n    });\n  }\n  toggleAddButton(disable = true, text, modifyClass = true) {\n    const productForm = document.getElementById(`product-form-${this.dataset.section}`);\n    if (!productForm) return;\n    const addButton = productForm.querySelector('[name=\"add\"]');\n    const addButtonText = productForm.querySelector('[name=\"add\"] > span');\n    if (!addButton) return;\n    if (disable) {\n      addButton.setAttribute('disabled', 'disabled');\n      if (text) addButtonText.textContent = text;\n    } else {\n      addButton.removeAttribute('disabled');\n      addButtonText.textContent = window.variantStrings.addToCart;\n    }\n    if (!modifyClass) return;\n  }\n  setUnavailable() {\n    const button = document.getElementById(`product-form-${this.dataset.section}`);\n    const addButton = button.querySelector('[name=\"add\"]');\n    const addButtonText = button.querySelector('[name=\"add\"] > span');\n    const price = document.getElementById(`price-${this.dataset.section}`);\n    if (!addButton) return;\n    addButtonText.textContent = window.variantStrings.unavailable;\n    if (price) price.classList.add('visibility-hidden');\n  }\n  getVariantData() {\n    this.variantData = this.variantData || JSON.parse(this.querySelector('[type=\"application/json\"]').textContent);\n    return this.variantData;\n  }\n}\ncustomElements.define('variant-selects', VariantSelects);\nclass VariantRadios extends VariantSelects {\n  constructor() {\n    super();\n  }\n  updateOptions() {\n    const fieldsets = Array.from(this.querySelectorAll('fieldset'));\n    this.options = fieldsets.map(fieldset => {\n      return Array.from(fieldset.querySelectorAll('input')).find(radio => radio.checked).value;\n    });\n    fieldsets.forEach(fieldSet => {\n      // Set all radios inactive\n      Array.from(fieldSet.querySelectorAll('input')).forEach(el => el.removeAttribute('checked'));\n      // Set radios active when value is an active option\n      Array.from(fieldSet.querySelectorAll('input')).forEach(el => {\n        if (this.options.includes(el.value)) {\n          el.setAttribute('checked', 'checked');\n        }\n      });\n    });\n  }\n}\ncustomElements.define('variant-radios', VariantRadios);\n\n// QUANTITY INPUT\nclass QuantityInput extends HTMLElement {\n  constructor() {\n    super();\n    this.input = this.querySelector('.qty-value');\n    this.changeEvent = new Event('change', {\n      bubbles: true\n    });\n    this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onButtonClick.bind(this)));\n  }\n  onButtonClick(event) {\n    event.preventDefault();\n    const previousValue = this.input.html;\n    if (event.target.name === 'plus') {\n      console.log(this.input.html);\n      this.input.html = parseInt(this.input.html) + 1;\n    } else {\n      this.input.html = parseInt(this.input.html) - 1;\n    }\n    // if (previousValue !== this.input.html) this.input.dispatchEvent(this.changeEvent);\n  }\n}\n\nfunction debounce(fn, wait) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn.apply(this, args), wait);\n  };\n}\ncustomElements.define('quantity-input', QuantityInput);\n\n// PRODUCT FORM\nif (!customElements.get('product-form')) {\n  const fetchConfig = (type = 'json') => {\n    return {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n        'Accept': `application/${type}`\n      }\n    };\n  };\n  customElements.define('product-form', class ProductForm extends HTMLElement {\n    constructor() {\n      super();\n      this.context = this.dataset.context || null;\n      this.form = this.querySelector('form');\n      this.form.querySelector('[name=id]').disabled = false;\n      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));\n      this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');\n      this.qty = document.querySelector('quantity-input.pdp-quantity input');\n      this.submitButton = this.querySelector('[type=\"submit\"]');\n      this.loadingSpinner = this.context === 'cart-quick-add' ? this.querySelector('.cart-quick-add__spinner') : this.querySelector('.loading-overlay__spinner');\n      this.quickAdd = this.context === 'cart-quick-add' ? this.querySelector('.cart-quick-add__add') : null;\n      this.bundleItems = this.dataset.bundle || null;\n      this.bundleName = this.dataset.bundleName || null;\n      if (document.querySelector('cart-drawer')) {\n        this.submitButton.setAttribute('aria-haspopup', 'dialog');\n      }\n    }\n    onSubmitHandler(evt) {\n      const qty = this?.qty?.getAttribute('value') || 1;\n      evt.preventDefault();\n      if (this.submitButton.getAttribute('aria-disabled') === 'true') return;\n      this.handleErrorMessage();\n      this.submitButton.setAttribute('aria-disabled', true);\n      this.submitButton.classList.add('loading');\n      if (this.loadingSpinner) {\n        this.loadingSpinner.classList.remove('hidden');\n      }\n      if (this.quickAdd) {\n        this.quickAdd.classList.add('hidden');\n      }\n      let config = fetchConfig('javascript');\n      config.headers['X-Requested-With'] = 'XMLHttpRequest';\n      delete config.headers['Content-Type'];\n      const formData = new FormData(this.form);\n      // if (this.cart) {\n      //   formData.append(\n      //     'sections',\n      //     this.cart.getSectionsToRender().map(section => section.id),\n      //   );\n      //   formData.append('sections_url', window.location.pathname);\n      //   this.cart.setActiveElement(document.activeElement);\n      // }\n      config.body = formData;\n      fetch(`${routes.cart_add_url}`, config).then(response => response.json()).then(response => {\n        if (response.product_id) {\n          if (window.cartItems.includes(response.product_id) === false) {\n            window.cartItems = [...window.cartItems, `${response.product_id}`];\n          }\n        }\n        let uniqueLineItems = [...new Set(window.cartItems)];\n        console.log(window);\n        console.log(response);\n        fetch(`/cart.js`, config).then(response => response.json()).then(response => {\n          console.log('cartjs: ', response);\n          window.EventBus.publish(\"updateCart\", response);\n        }).catch(e => {\n          console.error(e);\n        });\n        if (response.status) {\n          this.handleErrorMessage(response.description);\n          const soldOutMessage = this.submitButton.querySelector('.sold-out-message');\n          if (!soldOutMessage) return;\n          this.submitButton.setAttribute('aria-disabled', true);\n          this.submitButton.querySelector('span').classList.add('hidden');\n          soldOutMessage.classList.remove('hidden');\n          this.error = true;\n          return;\n        } else if (!this.cart) {\n          // window.location = window.routes.cart_url\n          // console.log('dom: ', dom)\n          return;\n        }\n        this.error = false;\n        // this.cart.renderContents(response)\n      }).catch(e => {\n        console.error(e);\n      }).finally(() => {\n        this.submitButton.classList.remove('loading');\n        // window.EventBus.publish(\"setModal\", false);\n        if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');\n        if (!this.error) this.submitButton.removeAttribute('aria-disabled');\n        if (this.loadingSpinner) {\n          this.loadingSpinner.classList.add('hidden');\n        }\n      });\n    }\n    handleErrorMessage(errorMessage = false) {\n      this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');\n      if (!this.errorMessageWrapper) return;\n      this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');\n      this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);\n      if (errorMessage) {\n        this.errorMessage.textContent = errorMessage;\n      }\n    }\n  });\n}\n\n//# sourceURL=webpack://hypershop/./src/entries/global.js?");

/***/ }),

/***/ "./src/entries/modal.js":
/*!******************************!*\
  !*** ./src/entries/modal.js ***!
  \******************************/
/***/ (() => {

eval("class Modal extends HTMLElement {\n  constructor() {\n    super();\n    this.closeButtons = this.querySelectorAll('#closeModal');\n    this.closeButtons.forEach(item => {\n      item.addEventListener('click', event => {\n        this.closeModal();\n      });\n    });\n  }\n  closeModal() {\n    window.EventBus.publish(\"setModal\", false);\n  }\n}\ncustomElements.define('modal-component', Modal);\nclass ModalTrigger extends HTMLElement {\n  constructor() {\n    super();\n    this.modalId = this.dataset.modalId;\n    this.addEventListener('click', event => {\n      console.log('this', this.dataset.modalId);\n      this.openModal();\n    });\n  }\n  openModal() {\n    window.EventBus.publish(\"setModal\", this.modalId);\n  }\n}\ncustomElements.define('modal-trigger', ModalTrigger);\n\n//# sourceURL=webpack://hypershop/./src/entries/modal.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/entries/global.js");
/******/ 	
/******/ })()
;