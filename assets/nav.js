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

/***/ "./src/entrypoints/eventbus.js":
/*!*************************************!*\
  !*** ./src/entrypoints/eventbus.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EventBus)\n/* harmony export */ });\nclass EventBus {\n  constructor() {\n    this.bus = document.createElement(\"event-bus\");\n  }\n  addEventListener(event, callback) {\n    this.bus.addEventListener(event, callback);\n  }\n  removeEventListener(event, callback) {\n    this.bus.removeEventListener(event, callback);\n  }\n  dispatchEvent(event, detail = {}) {\n    this.bus.dispatchEvent(new CustomEvent(event, { detail }));\n  }\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/eventbus.js?");

/***/ }),

/***/ "./src/entrypoints/modal.js":
/*!**********************************!*\
  !*** ./src/entrypoints/modal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"closeModal\": () => (/* binding */ closeModal),\n/* harmony export */   \"openModal\": () => (/* binding */ openModal)\n/* harmony export */ });\n/* harmony import */ var _eventbus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventbus */ \"./src/entrypoints/eventbus.js\");\n\nwindow.EventBus = new _eventbus__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst setModalState = (event) => {\n  const activeModal = document.querySelector(\"modal-component#\" + event.detail);\n  if (activeModal) {\n    if (activeModal.classList.contains(\"open\")) {\n      return;\n    } else {\n      activeModal.classList.add(\"open\", \"animating\");\n      activeModal.classList.add(\"animating\");\n    }\n  } else {\n    const modals = document.querySelectorAll(\"modal-component\");\n    modals.forEach((modal) => {\n      modal.classList.remove(\"open\");\n      modal.classList.add(\"animating\");\n      setTimeout(() => {\n        modal.classList.remove(\"animating\");\n      }, 500);\n    });\n  }\n};\nwindow.EventBus.addEventListener(\"setModal\", setModalState);\nconst closeModal = (id) => {\n  let body = document.querySelector(\"body\");\n  body.setAttribute(\"data-state-cart\", \"closed\");\n  window.EventBus.dispatchEvent(\"setModal\", \"false\");\n};\nconst openModal = (id) => {\n  if (id) {\n    if (id === \"cartDrawer\") {\n      let body = document.querySelector(\"body\");\n      body.setAttribute(\"data-state-cart\", \"open\");\n    }\n    window.EventBus.dispatchEvent(\"setModal\", id);\n  }\n};\nclass Modal extends HTMLElement {\n  constructor() {\n    super();\n    this.closeButtons = this.querySelectorAll(\"#closeModal\");\n    this.closeButtons.forEach((item) => {\n      item.addEventListener(\"click\", (event) => {\n        closeModal();\n      });\n    });\n  }\n}\nif (!customElements.get(\"modal-component\")) {\n  customElements.define(\"modal-component\", Modal);\n}\nclass ModalTrigger extends HTMLElement {\n  constructor() {\n    super();\n    this.addEventListener(\"click\", (event) => {\n      const modalId = this.dataset.modalId;\n      if (modalId) {\n        openModal(modalId);\n      } else {\n        closeModal();\n      }\n    });\n  }\n}\nif (!customElements.get(\"modal-trigger\")) {\n  customElements.define(\"modal-trigger\", ModalTrigger);\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/modal.js?");

/***/ }),

/***/ "./src/entrypoints/nav.js":
/*!********************************!*\
  !*** ./src/entrypoints/nav.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ \"./src/entrypoints/modal.js\");\n\nconst scrollThreshold = 40;\nclass StickyHeader extends HTMLElement {\n  constructor() {\n    super();\n  }\n  connectedCallback() {\n    this.header = document.getElementById(\"shopify-section-header\");\n    this.headerBounds = {};\n    this.onScrollHandler = this.onScroll.bind(this);\n    window.addEventListener(\"scroll\", this.onScrollHandler, false);\n  }\n  onScroll() {\n    console.log(\"scroll\");\n    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n    if (scrollTop > scrollThreshold) {\n      this.header.classList.add(\"scrolled\");\n    } else {\n      this.header.classList.remove(\"scrolled\");\n    }\n  }\n}\nif (!customElements.get(\"sticky-header\")) {\n  customElements.define(\"sticky-header\", StickyHeader);\n}\nfunction maybeOpenCart() {\n  const urlParams = new URLSearchParams(window.location.search);\n  if (window.location.pathname == \"/cart\") {\n    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(\"cartDrawer\");\n  } else if (urlParams.get(\"cart-open\") === \"true\") {\n    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(\"cartDrawer\");\n  }\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/nav.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/entrypoints/nav.js");
/******/ 	
/******/ })()
;