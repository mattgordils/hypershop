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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getVariant\": () => (/* binding */ getVariant),\n/* harmony export */   \"getSelectedOptions\": () => (/* binding */ getSelectedOptions)\n/* harmony export */ });\n/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/main.scss */ \"./src/styles/main.scss\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ \"./src/entrypoints/modal.js\");\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart */ \"./src/entrypoints/cart.js\");\n\n\n\n\nfunction isMobileOrTablet() {\n  const ua = navigator.userAgent;\n  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {\n    return true;\n  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {\n    return true;\n  }\n  return false;\n}\nconst arraysEqual = (a, b) => {\n  if (a === b)\n    return true;\n  if (a == null || b == null)\n    return false;\n  if (a.length !== b.length)\n    return false;\n  for (var i = 0; i < a.length; ++i) {\n    if (a[i] !== b[i])\n      return false;\n  }\n  return true;\n};\nconst getVariant = (selected, variantData) => {\n  const currentVariant = variantData.find((variant) => {\n    return arraysEqual(variant.options, selected);\n  });\n  return currentVariant;\n};\nconst getSelectedOptions = (productOptions) => {\n  const selectedOptions = [];\n  productOptions.forEach((option) => {\n    if (option.querySelector(\"select\")) {\n      const selectElement = option.querySelector(\"select\");\n      selectedOptions.push(selectElement.value);\n    } else if (option.checked) {\n      selectedOptions.push(option.value);\n    }\n  });\n  return selectedOptions;\n};\nif (!customElements.get(\"add-to-cart-form\")) {\n  customElements.define(\"add-to-cart-form\", class AddToCartForm extends HTMLElement {\n    constructor() {\n      super();\n      this.addButton = this.querySelector(\".add-to-cart-btn\");\n      if (!this.addButton) {\n        return void 0;\n      }\n      this.addButton.addEventListener(\"click\", (event) => {\n        var _a;\n        const productOptions = this.querySelectorAll(\"variant-radios input, variant-selects\");\n        const selectedOptions = getSelectedOptions(productOptions);\n        let variantId = \"\";\n        let variantData = \"\";\n        if ((_a = this == null ? void 0 : this.dataset) == null ? void 0 : _a.variantId) {\n          variantId = this.dataset.variantId;\n        } else {\n          variantData = JSON.parse(this.querySelector('[type=\"application/json\"]').textContent);\n          variantId = getVariant(selectedOptions, variantData).id;\n        }\n        let formData = {\n          items: [\n            {\n              id: variantId,\n              quantity: 1\n            }\n          ]\n        };\n        fetch(window.Shopify.routes.root + \"cart/add.js\", {\n          method: \"POST\",\n          headers: {\n            \"Content-Type\": \"application/json\"\n          },\n          body: JSON.stringify(formData)\n        }).then((data) => {\n          (0,_cart__WEBPACK_IMPORTED_MODULE_2__.refreshCart)();\n        }).then(() => {\n          (0,_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(\"cartDrawer\");\n        }).catch((error) => {\n          console.error(\"Error:\", error);\n        });\n      });\n    }\n  });\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/global.js?");

/***/ }),

/***/ "./src/entrypoints/modal.js":
/*!**********************************!*\
  !*** ./src/entrypoints/modal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"closeModal\": () => (/* binding */ closeModal),\n/* harmony export */   \"openModal\": () => (/* binding */ openModal)\n/* harmony export */ });\n/* harmony import */ var _eventbus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventbus */ \"./src/entrypoints/eventbus.js\");\n\nwindow.EventBus = new _eventbus__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst setModalState = (event) => {\n  const activeModal = document.querySelector(\"modal-component#\" + event.detail);\n  if (activeModal) {\n    if (activeModal.classList.contains(\"open\")) {\n      return;\n    } else {\n      activeModal.classList.add(\"open\", \"animating\");\n      activeModal.classList.add(\"animating\");\n    }\n  } else {\n    const modals = document.querySelectorAll(\"modal-component\");\n    modals.forEach((modal) => {\n      modal.classList.remove(\"open\");\n      modal.classList.add(\"animating\");\n      setTimeout(() => {\n        modal.classList.remove(\"animating\");\n      }, 500);\n    });\n  }\n};\nwindow.EventBus.addEventListener(\"setModal\", setModalState);\nconst closeModal = (id) => {\n  let body = document.querySelector(\"body\");\n  body.setAttribute(\"data-state-cart\", \"closed\");\n  window.EventBus.dispatchEvent(\"setModal\", \"false\");\n};\nconst openModal = (id) => {\n  if (id) {\n    if (id === \"cartDrawer\") {\n      let body = document.querySelector(\"body\");\n      body.setAttribute(\"data-state-cart\", \"open\");\n    }\n    window.EventBus.dispatchEvent(\"setModal\", id);\n  }\n};\nclass Modal extends HTMLElement {\n  constructor() {\n    super();\n    this.closeButtons = this.querySelectorAll(\"#closeModal\");\n    this.closeButtons.forEach((item) => {\n      item.addEventListener(\"click\", (event) => {\n        closeModal();\n      });\n    });\n  }\n}\nif (!customElements.get(\"modal-component\")) {\n  customElements.define(\"modal-component\", Modal);\n}\nclass ModalTrigger extends HTMLElement {\n  constructor() {\n    super();\n    this.addEventListener(\"click\", (event) => {\n      const modalId = this.dataset.modalId;\n      if (modalId) {\n        openModal(modalId);\n      } else {\n        closeModal();\n      }\n    });\n  }\n}\nif (!customElements.get(\"modal-trigger\")) {\n  customElements.define(\"modal-trigger\", ModalTrigger);\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/modal.js?");

/***/ }),

/***/ "./src/entrypoints/variantSelects.js":
/*!*******************************************!*\
  !*** ./src/entrypoints/variantSelects.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ \"./src/entrypoints/global.js\");\nvar __defProp = Object.defineProperty;\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;\nvar __publicField = (obj, key, value) => {\n  __defNormalProp(obj, typeof key !== \"symbol\" ? key + \"\" : key, value);\n  return value;\n};\n\nclass VariantSelects extends HTMLElement {\n  constructor() {\n    super();\n    __publicField(this, \"setOptionAvailability\", () => {\n      const variants = this.variantData;\n      const checkAvailability = (value) => {\n        const selectedVariant = variants && variants.find(({ options: options2 }) => options2.find((x) => x === value));\n        return selectedVariant && selectedVariant.available;\n      };\n      const options = this.querySelectorAll(\"option, input[type=radio]\");\n      options.forEach((option) => {\n        if (!checkAvailability(option.value)) {\n          option.setAttribute(\"disabled\", true);\n          option.checked = false;\n        }\n      });\n    });\n    this.addEventListener(\"change\", this.onVariantChange);\n    this.parent = this.closest(\"div\");\n    this.parentCard = this.closest(\".product-card\");\n    this.variantData = [];\n    this.context = this.dataset.context;\n    this.setMasterId();\n    this.setOptionAvailability();\n    if (this.context === \"PDP\") {\n      this.updateURL();\n    }\n  }\n  onVariantChange(event) {\n    this.updateOptions();\n    this.setMasterId();\n    if (!this.currentVariant.id) {\n    } else {\n      if (this.context === \"PDP\") {\n        this.updateURL();\n      }\n      if (this.parentCard) {\n        this.updateCardMedia();\n      }\n      this.updateVariantInput();\n    }\n  }\n  updateOptions() {\n    this.options = Array.from(this.querySelectorAll(\"select\"), (select) => select.value);\n  }\n  setMasterId(event) {\n    this.variantData = JSON.parse(this.parent.querySelector('[type=\"application/json\"]').textContent);\n    const productOptions = this.parent.querySelectorAll(\"variant-radios input, variant-selects\");\n    const selectedOptions = (0,_global__WEBPACK_IMPORTED_MODULE_0__.getSelectedOptions)(productOptions);\n    const currentVariant = (0,_global__WEBPACK_IMPORTED_MODULE_0__.getVariant)(selectedOptions, this.variantData);\n    this.currentVariant = currentVariant;\n    console.log(currentVariant);\n  }\n  updateURL() {\n    const productUrl = this.parent.dataset.url;\n    if (!this.currentVariant || this.dataset.updateUrl === \"false\")\n      return;\n    window.history.replaceState({}, \"\", `${productUrl}?variant=${this.currentVariant.id}`);\n  }\n  updateCardMedia() {\n    console.log(\"updateCardMedia\");\n    const newFeaturedImage = this.currentVariant.featured_image.src;\n    const cardImage = this.parentCard.querySelector(\"#cardImage\");\n    cardImage.src = newFeaturedImage;\n    cardImage.srcset = newFeaturedImage;\n  }\n  updateVariantInput() {\n    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}, #quick-add-${this.dataset.productId}, #quick-add-slide-${this.dataset.productId}`);\n    productForms.forEach((productForm) => {\n      const input = productForm.querySelector('input[name=\"id\"]');\n      input.value = this.currentVariant.id;\n      input.dispatchEvent(new Event(\"change\", { bubbles: true }));\n    });\n  }\n}\nif (!customElements.get(\"variant-selects\")) {\n  customElements.define(\"variant-selects\", VariantSelects);\n}\nclass VariantRadios extends VariantSelects {\n  constructor() {\n    super();\n  }\n  updateOptions() {\n    const fieldsets = Array.from(this.querySelectorAll(\"fieldset\"));\n    this.options = fieldsets.map((fieldset) => {\n      return Array.from(fieldset.querySelectorAll(\"input\")).find((radio) => radio.checked).value;\n    });\n    fieldsets.forEach((fieldSet) => {\n      Array.from(fieldSet.querySelectorAll(\"input\")).forEach((el) => el.removeAttribute(\"checked\"));\n      Array.from(fieldSet.querySelectorAll(\"input\")).forEach((el) => {\n        if (this.options.includes(el.value)) {\n          el.setAttribute(\"checked\", \"checked\");\n        }\n      });\n    });\n  }\n}\nif (!customElements.get(\"variant-radios\")) {\n  customElements.define(\"variant-radios\", VariantRadios);\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/variantSelects.js?");

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://shopify-starter/./src/styles/main.scss?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/entrypoints/variantSelects.js");
/******/ 	
/******/ })()
;