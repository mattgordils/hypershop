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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   refreshCart: () => (/* binding */ refreshCart)\n/* harmony export */ });\nconst refreshCart = (fullRefresh = false) => {\n  const cartDrawer = document.querySelector(\"#shopify-section-cart #cartContent\");\n  if (!cartDrawer) {\n    return false;\n  }\n  fetch(window.Shopify.routes.root + \"?sections=cart\").then((res) => res.json()).then((res) => {\n    var _a, _b;\n    const currentCartDrawer = document.querySelector(\"#shopify-section-cart #cartContent\");\n    const currentCartHeader = document.querySelector(\"#shopify-section-cart #cartHeader\");\n    var el = document.createElement(\"div\");\n    el.innerHTML = res[\"cart\"];\n    const oldCartCount = document.querySelector(\"#shopify-section-cart #cartHeader\").dataset.cartCount;\n    const newCartCount = el.querySelector(\"#cartHeader\").dataset.cartCount;\n    const oldlineCount = (_a = document.querySelectorAll(\"#shopify-section-cart #cartLineItem\")) == null ? void 0 : _a.length;\n    const newlineCount = (_b = el.querySelectorAll(\"#shopify-section-cart #cartLineItem\")) == null ? void 0 : _b.length;\n    if (newCartCount == 0 || oldCartCount == 0 || oldlineCount !== newlineCount) {\n      fullRefresh = true;\n    }\n    if (fullRefresh) {\n      const cartContent = el.querySelector(\"#cartContent\");\n      currentCartDrawer.outerHTML = cartContent.outerHTML;\n    } else {\n      const updateItems = document.querySelectorAll(\"#shopify-section-cart #cartUpdate\");\n      const updatedItems = el.querySelectorAll(\"#shopify-section-cart #cartUpdate\");\n      updateItems.forEach((item, index) => {\n        item.innerHTML = updatedItems[index].innerHTML;\n      });\n    }\n    const cartCountItems = document.querySelectorAll(\"#cartCount\");\n    cartCountItems.forEach((item) => {\n      item.innerHTML = newCartCount;\n    });\n  });\n};\nif (!customElements.get(\"cart-remove-item\")) {\n  customElements.define(\n    \"cart-remove-item\",\n    class CartRemoveItem extends HTMLElement {\n      constructor() {\n        super();\n        this.cartRemoveButton = this.querySelector(\".cart-remove-item\");\n        this.cartRemoveButton.addEventListener(\"click\", (event) => {\n          var _a, _b, _c;\n          let formData = {\n            updates: {\n              [event.currentTarget.dataset.itemId]: 0\n            }\n          };\n          if (event.currentTarget.dataset.itemId.includes(\", \")) {\n            const variantIds = (_c = (_b = (_a = event == null ? void 0 : event.currentTarget) == null ? void 0 : _a.dataset) == null ? void 0 : _b.itemId.split(\", \")) == null ? void 0 : _c.filter((item) => item !== \"\");\n            const updatesObj = {};\n            if (variantIds.length > 0) {\n              variantIds.forEach((id) => {\n                updatesObj[id] = 0;\n              });\n            }\n            formData = {\n              updates: updatesObj\n            };\n          }\n          fetch(window.Shopify.routes.root + \"cart/update.js\", {\n            method: \"POST\",\n            headers: {\n              \"Content-Type\": \"application/json\"\n            },\n            body: JSON.stringify(formData)\n          }).then((data) => {\n            refreshCart(true);\n          }).catch((error) => {\n            console.error(\"Error:\", error);\n          });\n        });\n      }\n    }\n  );\n}\nif (!customElements.get(\"cart-quantity-adjust\")) {\n  customElements.define(\n    \"cart-quantity-adjust\",\n    class QuantityAdjust extends HTMLElement {\n      constructor() {\n        super();\n        this.quantityChangeButtons = this.querySelectorAll(\".quantity-change\");\n        this.onQuantityChangeButtonClick = this.onQuantityChangeButtonClick.bind(this);\n        this.quantityChangeButtons.forEach((quantityChangeButton) => {\n          quantityChangeButton.onclick = this.onQuantityChangeButtonClick;\n        });\n      }\n      onQuantityChangeButtonClick(event) {\n        const quantityChangeButton = event.currentTarget;\n        this.getQuantityDivFromChangeButton(quantityChangeButton).classList.add(\n          \"opacity-0\"\n        );\n        const itemId = parseInt(\n          quantityChangeButton.getAttribute(\"data-product-id\")\n        );\n        const itemQuantity = parseInt(\n          quantityChangeButton.getAttribute(\"data-new-quantity\")\n        );\n        let formData = {\n          updates: {\n            [itemId]: itemQuantity\n          }\n        };\n        let successHandler = (response) => {\n          const parent = quantityChangeButton.parentElement;\n          this.getQuantityDivFromChangeButton(quantityChangeButton).innerHTML = itemQuantity;\n          this.getQuantityDivFromChangeButton(\n            quantityChangeButton\n          ).classList.remove(\"opacity-0\");\n          const decreaseQuantityButton = parent.querySelector(\".quantity-down\");\n          decreaseQuantityButton.setAttribute(\n            \"data-new-quantity\",\n            itemQuantity - 1\n          );\n          const increaseQuantityButton = parent.querySelector(\".quantity-up\");\n          increaseQuantityButton.setAttribute(\n            \"data-new-quantity\",\n            itemQuantity + 1\n          );\n          return response.json();\n        };\n        successHandler = successHandler.bind(quantityChangeButton);\n        fetch(window.Shopify.routes.root + \"cart/update.js\", {\n          method: \"POST\",\n          headers: {\n            \"Content-Type\": \"application/json\"\n          },\n          body: JSON.stringify(formData)\n        }).then((data) => successHandler(data)).then((data) => {\n          refreshCart();\n          document.querySelectorAll(\".cart-item-count\").forEach((element) => {\n            element.innerHTML = data.item_count;\n          });\n        }).catch((error) => {\n          console.error(\"Error:\", error);\n        });\n      }\n      getQuantityDivFromChangeButton(buttonDiv) {\n        const parent = buttonDiv.parentElement;\n        return parent.querySelector(\".quantity-current\");\n      }\n    }\n  );\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/cart.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/entrypoints/cart.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;