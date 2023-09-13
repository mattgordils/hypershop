/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/entrypoints/cart.js":
/*!*********************************!*\
  !*** ./src/entrypoints/cart.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"refreshCart\": () => (/* binding */ refreshCart)\n/* harmony export */ });\nconst refreshCart = (fullRefresh = false) => {\n  fetch(window.Shopify.routes.root + \"?sections=cart\").then((res) => res.json()).then((res) => {\n    var _a, _b;\n    const currentCartDrawer = document.querySelector(\"#shopify-section-cart #cartContent\");\n    const currentCartHeader = document.querySelector(\"#shopify-section-cart #cartHeader\");\n    var el = document.createElement(\"div\");\n    el.innerHTML = res[\"cart\"];\n    const oldCartCount = document.querySelector(\"#shopify-section-cart #cartHeader\").dataset.cartCount;\n    const newCartCount = el.querySelector(\"#cartHeader\").dataset.cartCount;\n    const oldlineCount = (_a = document.querySelectorAll(\"#shopify-section-cart #cartLineItem\")) == null ? void 0 : _a.length;\n    const newlineCount = (_b = el.querySelectorAll(\"#shopify-section-cart #cartLineItem\")) == null ? void 0 : _b.length;\n    if (newCartCount == 0 || oldCartCount == 0 || oldlineCount !== newlineCount) {\n      fullRefresh = true;\n    }\n    if (fullRefresh) {\n      const cartContent = el.querySelector(\"#cartContent\");\n      const cartHeader = el.querySelector(\"#cartHeader\");\n      currentCartDrawer.outerHTML = cartContent.outerHTML;\n      currentCartHeader.outerHTML = cartHeader.outerHTML;\n    } else {\n      const updateItems = document.querySelectorAll(\"#shopify-section-cart #cartUpdate\");\n      const updatedItems = el.querySelectorAll(\"#shopify-section-cart #cartUpdate\");\n      updateItems.forEach((item, index) => {\n        item.innerHTML = updatedItems[index].innerHTML;\n      });\n    }\n    const cartCountItems = document.querySelectorAll(\"#cartCount\");\n    cartCountItems.forEach((item) => {\n      item.innerHTML = newCartCount;\n    });\n  });\n};\nif (!customElements.get(\"cart-remove-item\")) {\n  customElements.define(\"cart-remove-item\", class CartRemoveItem extends HTMLElement {\n    constructor() {\n      super();\n      this.cartRemoveButton = this.querySelector(\".cart-remove-item\");\n      this.cartRemoveButton.addEventListener(\"click\", (event) => {\n        let formData = {\n          updates: {\n            [event.currentTarget.dataset.itemId]: 0\n          }\n        };\n        fetch(window.Shopify.routes.root + \"cart/update.js\", {\n          method: \"POST\",\n          headers: {\n            \"Content-Type\": \"application/json\"\n          },\n          body: JSON.stringify(formData)\n        }).then((data) => {\n          refreshCart(true);\n        }).catch((error) => {\n          console.error(\"Error:\", error);\n        });\n      });\n    }\n  });\n}\nif (!customElements.get(\"cart-quantity-adjust\")) {\n  customElements.define(\"cart-quantity-adjust\", class QuantityAdjust extends HTMLElement {\n    constructor() {\n      super();\n      this.quantityChangeButtons = this.querySelectorAll(\".quantity-change\");\n      this.onQuantityChangeButtonClick = this.onQuantityChangeButtonClick.bind(this);\n      this.quantityChangeButtons.forEach((quantityChangeButton) => {\n        quantityChangeButton.onclick = this.onQuantityChangeButtonClick;\n      });\n    }\n    onQuantityChangeButtonClick(event) {\n      const quantityChangeButton = event.currentTarget;\n      this.getQuantityDivFromChangeButton(quantityChangeButton).classList.add(\"opacity-0\");\n      const itemId = parseInt(quantityChangeButton.getAttribute(\"data-product-id\"));\n      const itemQuantity = parseInt(quantityChangeButton.getAttribute(\"data-new-quantity\"));\n      let formData = {\n        updates: {\n          [itemId]: itemQuantity\n        }\n      };\n      let successHandler = (response) => {\n        const parent = quantityChangeButton.parentElement;\n        this.getQuantityDivFromChangeButton(quantityChangeButton).innerHTML = itemQuantity;\n        this.getQuantityDivFromChangeButton(quantityChangeButton).classList.remove(\"opacity-0\");\n        const decreaseQuantityButton = parent.querySelector(\".quantity-down\");\n        decreaseQuantityButton.setAttribute(\"data-new-quantity\", itemQuantity - 1);\n        const increaseQuantityButton = parent.querySelector(\".quantity-up\");\n        increaseQuantityButton.setAttribute(\"data-new-quantity\", itemQuantity + 1);\n        return response.json();\n      };\n      successHandler = successHandler.bind(quantityChangeButton);\n      fetch(window.Shopify.routes.root + \"cart/update.js\", {\n        method: \"POST\",\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(formData)\n      }).then((data) => successHandler(data)).then((data) => {\n        refreshCart();\n        document.querySelectorAll(\".cart-item-count\").forEach((element) => {\n          element.innerHTML = data.item_count;\n        });\n      }).catch((error) => {\n        console.error(\"Error:\", error);\n      });\n    }\n    getQuantityDivFromChangeButton(buttonDiv) {\n      const parent = buttonDiv.parentElement;\n      return parent.querySelector(\".quantity-current\");\n    }\n  });\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/cart.js?");

/***/ }),

/***/ "./src/entrypoints/eventbus.js":
/*!*************************************!*\
  !*** ./src/entrypoints/eventbus.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EventBus)\n/* harmony export */ });\nclass EventBus {\n  constructor() {\n    this.bus = document.createElement(\"event-bus\");\n  }\n  addEventListener(event, callback) {\n    this.bus.addEventListener(event, callback);\n  }\n  removeEventListener(event, callback) {\n    this.bus.removeEventListener(event, callback);\n  }\n  dispatchEvent(event, detail = {}) {\n    this.bus.dispatchEvent(new CustomEvent(event, { detail }));\n  }\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/eventbus.js?");

/***/ }),

/***/ "./src/entrypoints/global.js":
/*!***********************************!*\
  !*** ./src/entrypoints/global.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getVariant\": () => (/* binding */ getVariant),\n/* harmony export */   \"getSelectedOptions\": () => (/* binding */ getSelectedOptions)\n/* harmony export */ });\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/main.scss */ \"./src/styles/main.scss\");\n/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-cookie */ \"./node_modules/js-cookie/dist/js.cookie.mjs\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ \"./src/entrypoints/modal.js\");\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart */ \"./src/entrypoints/cart.js\");\nvar __defProp = Object.defineProperty;\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;\nvar __publicField = (obj, key, value) => {\n  __defNormalProp(obj, typeof key !== \"symbol\" ? key + \"\" : key, value);\n  return value;\n};\n\n\n\n\n\nfunction isMobileOrTablet() {\n  const ua = navigator.userAgent;\n  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {\n    return true;\n  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {\n    return true;\n  }\n  return false;\n}\nconst arraysEqual = (a, b) => {\n  if (a === b)\n    return true;\n  if (a == null || b == null)\n    return false;\n  if (a.length !== b.length)\n    return false;\n  for (var i = 0; i < a.length; ++i) {\n    if (a[i] !== b[i])\n      return false;\n  }\n  return true;\n};\nif (!customElements.get(\"email-capture\")) {\n  customElements.define(\"email-capture\", class EmailCapture extends HTMLElement {\n    constructor() {\n      super();\n      __publicField(this, \"EL_CAPTURE\", \".js-emailCapture\");\n      __publicField(this, \"EL_CLOSE\", \".js-emailClose\");\n      __publicField(this, \"EL_BLURRY\", \".js-emailBlurryBg\");\n      __publicField(this, \"COOKIE\", \"email_capture_seen\");\n      this.expiration = null;\n      this.init();\n    }\n    showEmailCapture() {\n      const elCapture = this.querySelector(this.EL_CAPTURE);\n      elCapture.classList.remove(\"hidden\");\n      setTimeout(() => elCapture.classList.remove(\"opacity-0\"), 500);\n      let body = document.querySelector(\"body\");\n      body.setAttribute(\"data-state-email-capture\", \"open\");\n      this.bind();\n    }\n    hideEmailCapture() {\n      const capture = this.querySelector(this.EL_CAPTURE);\n      capture.classList.add(\"opacity-0\");\n      setTimeout(() => {\n        capture.classList.add(\"hidden\");\n      }, 600);\n      let body = document.querySelector(\"body\");\n      body.setAttribute(\"data-state-email-capture\", \"closed\");\n      this.setCookie();\n    }\n    setCookie() {\n      js_cookie__WEBPACK_IMPORTED_MODULE_1__[\"default\"].set(COOKIE, true, { expires: expiration });\n    }\n    bind() {\n      const elCapture = this.querySelector(this.EL_CAPTURE);\n      this.expiration = Number(elCapture.getAttribute(\"data-cookie\"));\n      const elCloses = elCapture.querySelectorAll(this.EL_CLOSE);\n      elCloses.forEach((elClose) => {\n        elClose.removeEventListener(\"click\", this.hideEmailCapture);\n        elClose.addEventListener(\"click\", this.hideEmailCapture);\n      });\n    }\n    showInCustomizer(ev) {\n      const { target } = ev;\n      const elGate = this.querySelector(this.EL_CAPTURE).parentNode;\n      if (target == elGate) {\n        this.showEmailCapture();\n      }\n    }\n    hideInCustomizer(ev) {\n      const { target } = ev;\n      const elGate = this.querySelector(this.EL_CAPTURE).parentNode;\n      if (target == elGate) {\n        this.hideEmailCapture();\n      }\n    }\n    bindCustomizer() {\n      document.removeEventListener(\"shopify:section:select\", this.showInCustomizer);\n      document.addEventListener(\"shopify:section:select\", this.showInCustomizer);\n      document.removeEventListener(\"shopify:section:deselect\", this.hideInCustomizer);\n      document.addEventListener(\"shopify:section:deselect\", this.hideInCustomizer);\n    }\n    init() {\n      const hasCookie = js_cookie__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(this.COOKIE) == \"true\";\n      const urlParams = new URLSearchParams(window.location.search);\n      const hasEmailCaptureOverride = urlParams.get(\"email_capture_override\");\n      if (hasEmailCaptureOverride || !hasCookie) {\n        setTimeout(() => {\n          this.showEmailCapture();\n        }, hasEmailCaptureOverride ? 300 : 3e4);\n      }\n      window.clearEmail = () => js_cookie__WEBPACK_IMPORTED_MODULE_1__[\"default\"].remove(this.COOKIE);\n      this.bindCustomizer();\n    }\n  });\n}\nconst getVariant = (selected, variantData) => {\n  const currentVariant = variantData.find((variant) => {\n    return arraysEqual(variant.options, selected);\n  });\n  return currentVariant;\n};\nconst getSelectedOptions = (productOptions) => {\n  const selectedOptions = [];\n  productOptions.forEach((option) => {\n    if (option.querySelector(\"select\")) {\n      const selectElement = option.querySelector(\"select\");\n      selectedOptions.push(selectElement.value);\n    } else if (option.checked) {\n      selectedOptions.push(option.value);\n    }\n  });\n  return selectedOptions;\n};\nif (!customElements.get(\"add-to-cart-form\")) {\n  customElements.define(\"add-to-cart-form\", class AddToCartForm extends HTMLElement {\n    constructor() {\n      super();\n      this.addButton = this.querySelector(\".add-to-cart-btn\");\n      if (!this.addButton) {\n        return void 0;\n      }\n      this.addButton.addEventListener(\"click\", (event) => {\n        const productOptions = this.querySelectorAll(\"variant-radios input, variant-selects\");\n        const variantData = JSON.parse(this.querySelector('[type=\"application/json\"]').textContent);\n        const selectedOptions = getSelectedOptions(productOptions);\n        const variantId = getVariant(selectedOptions, variantData).id;\n        let formData = {\n          items: [\n            {\n              id: variantId,\n              quantity: 1\n            }\n          ]\n        };\n        fetch(window.Shopify.routes.root + \"cart/add.js\", {\n          method: \"POST\",\n          headers: {\n            \"Content-Type\": \"application/json\"\n          },\n          body: JSON.stringify(formData)\n        }).then((data) => {\n          (0,_cart__WEBPACK_IMPORTED_MODULE_3__.refreshCart)();\n        }).then(() => {\n          (0,_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)(\"cartDrawer\");\n        }).catch((error) => {\n          console.error(\"Error:\", error);\n        });\n      });\n    }\n  });\n}\nif (!customElements.get(\"show-on-email-sub-success\")) {\n  customElements.define(\"show-on-email-sub-success\", class ShowOnEmailSubSuccess extends HTMLElement {\n    constructor() {\n      super();\n      this.EL_MODAL = \".thank-you-email-subscribe\";\n      this.closeButton = document.querySelector(\".thank-you-email-subscribe-close\");\n      this.thankYouModal = document.querySelector(\".thank-you-email-subscribe\");\n      this.closeModal = this.closeModal.bind(this);\n      this.showModal = this.showModal.bind(this);\n      this.showInCustomizer = this.showInCustomizer.bind(this);\n      this.hideInCustomizer = this.hideInCustomizer.bind(this);\n      this.bindCustomizer = this.bindCustomizer.bind(this);\n      this.closeButton.addEventListener(\"click\", this.closeModal);\n      this.thankYouModal.addEventListener(\"click\", this.closeModal);\n      const urlParams = new URLSearchParams(window.location.search);\n      if (urlParams.get(\"customer_posted\")) {\n        this.showModal();\n      }\n      this.bindCustomizer();\n    }\n    closeModal(event) {\n      this.thankYouModal.classList.add(\"opacity-0\");\n      this.thankYouModal.classList.add(\"pointer-events-none\");\n      setTimeout(() => {\n        this.thankYouModal.classList.add(\"hidden\");\n      }, 3e3);\n    }\n    showModal() {\n      this.thankYouModal.classList.remove(\"hidden\");\n      this.thankYouModal.classList.remove(\"opacity-0\");\n      this.thankYouModal.classList.remove(\"pointer-events-none\");\n    }\n    showInCustomizer(ev) {\n      const { target } = ev;\n      const elGate = document.querySelector(this.EL_MODAL).parentNode.parentNode;\n      if (target == elGate) {\n        this.showModal();\n      }\n    }\n    hideInCustomizer(ev) {\n      const { target } = ev;\n      const elGate = document.querySelector(this.EL_MODAL).parentNode.parentNode;\n      if (target == elGate) {\n        this.closeModal();\n      }\n    }\n    bindCustomizer() {\n      document.removeEventListener(\"shopify:section:select\", this.showInCustomizer);\n      document.addEventListener(\"shopify:section:select\", this.showInCustomizer);\n      document.removeEventListener(\"shopify:section:deselect\", this.hideInCustomizer);\n      document.addEventListener(\"shopify:section:deselect\", this.hideInCustomizer);\n    }\n  });\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/global.js?");

/***/ }),

/***/ "./src/entrypoints/modal.js":
/*!**********************************!*\
  !*** ./src/entrypoints/modal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"closeModal\": () => (/* binding */ closeModal),\n/* harmony export */   \"openModal\": () => (/* binding */ openModal)\n/* harmony export */ });\n/* harmony import */ var _eventbus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventbus */ \"./src/entrypoints/eventbus.js\");\n\nwindow.EventBus = new _eventbus__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst setModalState = (event) => {\n  const activeModal = document.querySelector(\"modal-component#\" + event.detail);\n  if (activeModal) {\n    if (activeModal.classList.contains(\"open\")) {\n      activeModal.classList.remove(\"open\");\n      setTimeout(() => {\n        activeModal.classList.remove(\"animating\");\n      }, 500);\n    } else {\n      activeModal.classList.add(\"open\", \"animating\");\n      activeModal.classList.add(\"animating\");\n    }\n  } else {\n    const modals = document.querySelectorAll(\"modal-component\");\n    modals.forEach((modal) => {\n      modal.classList.remove(\"open\");\n      modal.classList.add(\"animating\");\n      setTimeout(() => {\n        modal.classList.remove(\"animating\");\n      }, 500);\n    });\n  }\n};\nwindow.EventBus.addEventListener(\"setModal\", setModalState);\nconst closeModal = (id) => {\n  let body = document.querySelector(\"body\");\n  body.setAttribute(\"data-state-cart\", \"closed\");\n  window.EventBus.dispatchEvent(\"setModal\", \"false\");\n};\nconst openModal = (id) => {\n  if (id) {\n    if (id === \"cartDrawer\") {\n      let body = document.querySelector(\"body\");\n      body.setAttribute(\"data-state-cart\", \"open\");\n    }\n    window.EventBus.dispatchEvent(\"setModal\", id);\n  }\n};\nclass Modal extends HTMLElement {\n  constructor() {\n    super();\n    this.closeButtons = this.querySelectorAll(\"#closeModal\");\n    this.closeButtons.forEach((item) => {\n      item.addEventListener(\"click\", (event) => {\n        closeModal();\n      });\n    });\n  }\n}\nif (!customElements.get(\"modal-component\")) {\n  customElements.define(\"modal-component\", Modal);\n}\nclass ModalTrigger extends HTMLElement {\n  constructor() {\n    super();\n    this.addEventListener(\"click\", (event) => {\n      const modalId = this.dataset.modalId;\n      if (modalId) {\n        openModal(modalId);\n      } else {\n        closeModal();\n      }\n    });\n  }\n}\nif (!customElements.get(\"modal-trigger\")) {\n  customElements.define(\"modal-trigger\", ModalTrigger);\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/modal.js?");

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://shopify-starter/./src/styles/main.scss?");

/***/ }),

/***/ "./node_modules/js-cookie/dist/js.cookie.mjs":
/*!***************************************************!*\
  !*** ./node_modules/js-cookie/dist/js.cookie.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/*! js-cookie v3.0.1 | MIT */\n/* eslint-disable no-var */\nfunction assign (target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i];\n    for (var key in source) {\n      target[key] = source[key];\n    }\n  }\n  return target\n}\n/* eslint-enable no-var */\n\n/* eslint-disable no-var */\nvar defaultConverter = {\n  read: function (value) {\n    if (value[0] === '\"') {\n      value = value.slice(1, -1);\n    }\n    return value.replace(/(%[\\dA-F]{2})+/gi, decodeURIComponent)\n  },\n  write: function (value) {\n    return encodeURIComponent(value).replace(\n      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,\n      decodeURIComponent\n    )\n  }\n};\n/* eslint-enable no-var */\n\n/* eslint-disable no-var */\n\nfunction init (converter, defaultAttributes) {\n  function set (key, value, attributes) {\n    if (typeof document === 'undefined') {\n      return\n    }\n\n    attributes = assign({}, defaultAttributes, attributes);\n\n    if (typeof attributes.expires === 'number') {\n      attributes.expires = new Date(Date.now() + attributes.expires * 864e5);\n    }\n    if (attributes.expires) {\n      attributes.expires = attributes.expires.toUTCString();\n    }\n\n    key = encodeURIComponent(key)\n      .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)\n      .replace(/[()]/g, escape);\n\n    var stringifiedAttributes = '';\n    for (var attributeName in attributes) {\n      if (!attributes[attributeName]) {\n        continue\n      }\n\n      stringifiedAttributes += '; ' + attributeName;\n\n      if (attributes[attributeName] === true) {\n        continue\n      }\n\n      // Considers RFC 6265 section 5.2:\n      // ...\n      // 3.  If the remaining unparsed-attributes contains a %x3B (\";\")\n      //     character:\n      // Consume the characters of the unparsed-attributes up to,\n      // not including, the first %x3B (\";\") character.\n      // ...\n      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];\n    }\n\n    return (document.cookie =\n      key + '=' + converter.write(value, key) + stringifiedAttributes)\n  }\n\n  function get (key) {\n    if (typeof document === 'undefined' || (arguments.length && !key)) {\n      return\n    }\n\n    // To prevent the for loop in the first place assign an empty array\n    // in case there are no cookies at all.\n    var cookies = document.cookie ? document.cookie.split('; ') : [];\n    var jar = {};\n    for (var i = 0; i < cookies.length; i++) {\n      var parts = cookies[i].split('=');\n      var value = parts.slice(1).join('=');\n\n      try {\n        var foundKey = decodeURIComponent(parts[0]);\n        jar[foundKey] = converter.read(value, foundKey);\n\n        if (key === foundKey) {\n          break\n        }\n      } catch (e) {}\n    }\n\n    return key ? jar[key] : jar\n  }\n\n  return Object.create(\n    {\n      set: set,\n      get: get,\n      remove: function (key, attributes) {\n        set(\n          key,\n          '',\n          assign({}, attributes, {\n            expires: -1\n          })\n        );\n      },\n      withAttributes: function (attributes) {\n        return init(this.converter, assign({}, this.attributes, attributes))\n      },\n      withConverter: function (converter) {\n        return init(assign({}, this.converter, converter), this.attributes)\n      }\n    },\n    {\n      attributes: { value: Object.freeze(defaultAttributes) },\n      converter: { value: Object.freeze(converter) }\n    }\n  )\n}\n\nvar api = init(defaultConverter, { path: '/' });\n/* eslint-enable no-var */\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);\n\n\n//# sourceURL=webpack://shopify-starter/./node_modules/js-cookie/dist/js.cookie.mjs?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/entrypoints/global.js");
/******/ 	
/******/ })()
;