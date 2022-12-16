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

/***/ "./src/entries/cart.js":
/*!*****************************!*\
  !*** ./src/entries/cart.js ***!
  \*****************************/
/***/ (() => {

eval("class CartRemoveButton extends HTMLElement {\n  constructor() {\n    super();\n    this.addEventListener('click', event => {\n      event.preventDefault();\n      console.log('jjj');\n      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');\n      cartItems.updateQuantity(this.dataset.index, 0);\n    });\n  }\n}\ncustomElements.define('cart-remove-button', CartRemoveButton);\nclass CartItems extends HTMLElement {\n  constructor() {\n    super();\n    this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status') || document.getElementById('CartDrawer-LineItemStatus');\n    this.currentItemCount = Array.from(this.querySelectorAll('[name=\"updates[]\"]')).reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);\n    this.debouncedOnChange = debounce(event => {\n      this.onChange(event);\n    }, 300);\n    this.addEventListener('change', this.debouncedOnChange.bind(this));\n  }\n  onChange(event) {\n    this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));\n  }\n  getSectionsToRender() {\n    return [{\n      id: 'main-cart-items',\n      section: document.getElementById('main-cart-items').dataset.id,\n      selector: '.js-contents'\n    }, {\n      id: 'cart-icon-bubble',\n      section: 'cart-icon-bubble',\n      selector: '.shopify-section'\n    }, {\n      id: 'cart-live-region-text',\n      section: 'cart-live-region-text',\n      selector: '.shopify-section'\n    }, {\n      id: 'main-cart-footer',\n      section: document.getElementById('main-cart-footer').dataset.id,\n      selector: '.js-contents'\n    }];\n  }\n  updateQuantity(line, quantity, name) {\n    this.enableLoading(line);\n    const body = JSON.stringify({\n      line,\n      quantity,\n      sections: this.getSectionsToRender().map(section => section.section),\n      sections_url: window.location.pathname\n    });\n    fetch(`${routes.cart_change_url}`, {\n      ...fetchConfig(),\n      ...{\n        body\n      }\n    }).then(response => {\n      return response.text();\n    }).then(state => {\n      const parsedState = JSON.parse(state);\n      this.classList.toggle('is-empty', parsedState.item_count === 0);\n      const cartDrawerWrapper = document.querySelector('cart-drawer');\n      const cartFooter = document.getElementById('main-cart-footer');\n      if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);\n      if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);\n      this.getSectionsToRender().forEach(section => {\n        const elementToReplace = document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);\n        elementToReplace.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);\n      });\n      this.updateLiveRegions(line, parsedState.item_count);\n      const lineItem = document.getElementById(`CartItem-${line}`) || document.getElementById(`CartDrawer-Item-${line}`);\n      if (lineItem && lineItem.querySelector(`[name=\"${name}\"]`)) {\n        cartDrawerWrapper ? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name=\"${name}\"]`)) : lineItem.querySelector(`[name=\"${name}\"]`).focus();\n      } else if (parsedState.item_count === 0 && cartDrawerWrapper) {\n        trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'));\n      } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {\n        trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'));\n      }\n      this.disableLoading();\n    }).catch(() => {\n      this.querySelectorAll('.loading-overlay').forEach(overlay => overlay.classList.add('hidden'));\n      const errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');\n      errors.textContent = window.cartStrings.error;\n      this.disableLoading();\n    });\n  }\n  updateLiveRegions(line, itemCount) {\n    if (this.currentItemCount === itemCount) {\n      const lineItemError = document.getElementById(`Line-item-error-${line}`) || document.getElementById(`CartDrawer-LineItemError-${line}`);\n      const quantityElement = document.getElementById(`Quantity-${line}`) || document.getElementById(`Drawer-quantity-${line}`);\n      lineItemError.querySelector('.cart-item__error-text').innerHTML = window.cartStrings.quantityError.replace('[quantity]', quantityElement.value);\n    }\n    this.currentItemCount = itemCount;\n    this.lineItemStatusElement.setAttribute('aria-hidden', true);\n    const cartStatus = document.getElementById('cart-live-region-text') || document.getElementById('CartDrawer-LiveRegionText');\n    cartStatus.setAttribute('aria-hidden', false);\n    setTimeout(() => {\n      cartStatus.setAttribute('aria-hidden', true);\n    }, 1000);\n  }\n  getSectionInnerHTML(html, selector) {\n    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;\n  }\n  enableLoading(line) {\n    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');\n    mainCartItems.classList.add('cart__items--disabled');\n    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading-overlay`);\n    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading-overlay`);\n    [...cartItemElements, ...cartDrawerItemElements].forEach(overlay => overlay.classList.remove('hidden'));\n    document.activeElement.blur();\n    this.lineItemStatusElement.setAttribute('aria-hidden', false);\n  }\n  disableLoading() {\n    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');\n    mainCartItems.classList.remove('cart__items--disabled');\n  }\n}\ncustomElements.define('cart-items', CartItems);\nif (!customElements.get('cart-note')) {\n  customElements.define('cart-note', class CartNote extends HTMLElement {\n    constructor() {\n      super();\n      this.addEventListener('change', debounce(event => {\n        const body = JSON.stringify({\n          note: event.target.value\n        });\n        fetch(`${routes.cart_update_url}`, {\n          ...fetchConfig(),\n          ...{\n            body\n          }\n        });\n      }, 300));\n    }\n  });\n}\n;\n\n//# sourceURL=webpack://hypershop/./src/entries/cart.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/entries/cart.js"]();
/******/ 	
/******/ })()
;