/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/entrypoints/collapsible.js":
/*!****************************************!*\
  !*** ./src/entrypoints/collapsible.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toggleCollapsibleItem: () => (/* binding */ toggleCollapsibleItem)\n/* harmony export */ });\nconst toggleCollapsibleItem = (content, icon, expand) => {\n  console.log(content.ariaHidden);\n  if (expand === \"inherit\") {\n    expand = content.ariaHidden === \"true\";\n  }\n  if (expand) {\n    content.ariaHidden = \"false\";\n    icon.dataset.icon = \"minus\";\n  } else {\n    content.ariaHidden = \"true\";\n    icon.dataset.icon = \"plus\";\n  }\n};\nif (!customElements.get(\"collapsible-item\")) {\n  customElements.define(\n    \"collapsible-item\",\n    class inView extends HTMLElement {\n      constructor() {\n        super();\n        this.trigger = this.querySelectorAll('[data-collapsible=\"trigger\"]');\n        this.content = this.querySelector('[data-collapsible=\"content\"]');\n        this.icon = this.querySelector('[data-collapsible=\"icon\"] .animated-icon');\n        this.content.ariaHidden = \"true\";\n        this.trigger.forEach((item) => {\n          item.addEventListener(\"click\", (event) => {\n            toggleCollapsibleItem(this.content, this.icon, \"inherit\");\n          });\n        });\n      }\n    }\n  );\n}\nif (!customElements.get(\"accordion-list\")) {\n  customElements.define(\n    \"accordion-list\",\n    class inView extends HTMLElement {\n      constructor() {\n        super();\n        this.trigger = this.querySelectorAll('[data-collapsible=\"trigger\"]');\n        this.content = this.querySelectorAll('[data-collapsible=\"content\"]');\n        this.collapsibleItems = this.querySelectorAll(\"collapsible-item\");\n        this.trigger.forEach((item) => {\n          item.addEventListener(\"click\", (event) => {\n            const parent = item.closest(\"collapsible-item\");\n            this.collapsibleItems.forEach((item2) => {\n              const content = item2.querySelector('[data-collapsible=\"content\"]');\n              const icon = item2.querySelector('[data-collapsible=\"icon\"] .animated-icon');\n              if (item2.id !== parent.id) {\n                toggleCollapsibleItem(content, icon, false);\n              }\n            });\n          });\n        });\n      }\n    }\n  );\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZW50cnlwb2ludHMvY29sbGFwc2libGUuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLE1BQU0sd0JBQXdCLENBQUMsU0FBUyxNQUFNLFdBQVc7QUFFOUQsVUFBUSxJQUFJLFFBQVEsVUFBVTtBQUM5QixNQUFJLFdBQVcsV0FBVztBQUN4QixhQUFTLFFBQVEsZUFBZTtBQUFBLEVBQ2xDO0FBRUEsTUFBSSxRQUFRO0FBQ1YsWUFBUSxhQUFhO0FBQ3JCLFNBQUssUUFBUSxPQUFPO0FBQUEsRUFDdEIsT0FBTztBQUNMLFlBQVEsYUFBYTtBQUNyQixTQUFLLFFBQVEsT0FBTztBQUFBLEVBQ3RCO0FBQ0Y7QUFFQSxJQUFJLENBQUMsZUFBZSxJQUFJLGtCQUFrQixHQUFHO0FBQzNDLGlCQUFlO0FBQUEsSUFDYjtBQUFBLElBQ0EsTUFBTSxlQUFlLFlBQVk7QUFBQSxNQUMvQixjQUFjO0FBQ1osY0FBTTtBQUVOLGFBQUssVUFBVSxLQUFLLGlCQUFpQiw4QkFBOEI7QUFDbkUsYUFBSyxVQUFVLEtBQUssY0FBYyw4QkFBOEI7QUFDaEUsYUFBSyxPQUFPLEtBQUssY0FBYywwQ0FBMEM7QUFFekUsYUFBSyxRQUFRLGFBQWE7QUFFMUIsYUFBSyxRQUFRLFFBQVEsVUFBUTtBQUMzQixlQUFLLGlCQUFpQixTQUFTLFdBQVM7QUFDdEMsa0NBQXNCLEtBQUssU0FBUyxLQUFLLE1BQU0sU0FBUztBQUFBLFVBQzFELENBQUM7QUFBQSxRQUNILENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQUksQ0FBQyxlQUFlLElBQUksZ0JBQWdCLEdBQUc7QUFDekMsaUJBQWU7QUFBQSxJQUNiO0FBQUEsSUFDQSxNQUFNLGVBQWUsWUFBWTtBQUFBLE1BQy9CLGNBQWM7QUFDWixjQUFNO0FBRU4sYUFBSyxVQUFVLEtBQUssaUJBQWlCLDhCQUE4QjtBQUNuRSxhQUFLLFVBQVUsS0FBSyxpQkFBaUIsOEJBQThCO0FBQ25FLGFBQUssbUJBQW1CLEtBQUssaUJBQWlCLGtCQUFrQjtBQUVoRSxhQUFLLFFBQVEsUUFBUSxVQUFRO0FBQzNCLGVBQUssaUJBQWlCLFNBQVMsV0FBUztBQUN0QyxrQkFBTSxTQUFTLEtBQUssUUFBUSxrQkFBa0I7QUFDOUMsaUJBQUssaUJBQWlCLFFBQVEsQ0FBQUEsVUFBUTtBQUNwQyxvQkFBTSxVQUFVQSxNQUFLLGNBQWMsOEJBQThCO0FBQ2pFLG9CQUFNLE9BQU9BLE1BQUssY0FBYywwQ0FBMEM7QUFDMUUsa0JBQUlBLE1BQUssT0FBTyxPQUFPLElBQUk7QUFFekIsc0NBQXNCLFNBQVMsTUFBTSxLQUFLO0FBQUEsY0FDNUM7QUFBQSxZQUNGLENBQUM7QUFBQSxVQUNILENBQUM7QUFBQSxRQUNILENBQUM7QUFBQSxNQUVIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3Nob3BpZnktc3RhcnRlci8uL3NyYy9lbnRyeXBvaW50cy9jb2xsYXBzaWJsZS5qcz9iZGU3Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCB0b2dnbGVDb2xsYXBzaWJsZUl0ZW0gPSAoY29udGVudCwgaWNvbiwgZXhwYW5kKSA9PiB7XG4gIC8vIFVzZSBhcmVhSGlkZGVuIHRvIHRvZ2dsZSB2aXNpYmlsaXR5XG4gIGNvbnNvbGUubG9nKGNvbnRlbnQuYXJpYUhpZGRlbilcbiAgaWYgKGV4cGFuZCA9PT0gJ2luaGVyaXQnKSB7XG4gICAgZXhwYW5kID0gY29udGVudC5hcmlhSGlkZGVuID09PSAndHJ1ZSdcbiAgfVxuICAvL1xuICBpZiAoZXhwYW5kKSB7XG4gICAgY29udGVudC5hcmlhSGlkZGVuID0gJ2ZhbHNlJ1xuICAgIGljb24uZGF0YXNldC5pY29uID0gJ21pbnVzJ1xuICB9IGVsc2Uge1xuICAgIGNvbnRlbnQuYXJpYUhpZGRlbiA9ICd0cnVlJ1xuICAgIGljb24uZGF0YXNldC5pY29uID0gJ3BsdXMnXG4gIH1cbn1cblxuaWYgKCFjdXN0b21FbGVtZW50cy5nZXQoXCJjb2xsYXBzaWJsZS1pdGVtXCIpKSB7XG4gIGN1c3RvbUVsZW1lbnRzLmRlZmluZShcbiAgICBcImNvbGxhcHNpYmxlLWl0ZW1cIixcbiAgICBjbGFzcyBpblZpZXcgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy50cmlnZ2VyID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb2xsYXBzaWJsZT1cInRyaWdnZXJcIl0nKVxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbGxhcHNpYmxlPVwiY29udGVudFwiXScpXG4gICAgICAgIHRoaXMuaWNvbiA9IHRoaXMucXVlcnlTZWxlY3RvcignW2RhdGEtY29sbGFwc2libGU9XCJpY29uXCJdIC5hbmltYXRlZC1pY29uJylcblxuICAgICAgICB0aGlzLmNvbnRlbnQuYXJpYUhpZGRlbiA9ICd0cnVlJ1xuXG4gICAgICAgIHRoaXMudHJpZ2dlci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICB0b2dnbGVDb2xsYXBzaWJsZUl0ZW0odGhpcy5jb250ZW50LCB0aGlzLmljb24sICdpbmhlcml0JylcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgKVxufVxuXG5pZiAoIWN1c3RvbUVsZW1lbnRzLmdldChcImFjY29yZGlvbi1saXN0XCIpKSB7XG4gIGN1c3RvbUVsZW1lbnRzLmRlZmluZShcbiAgICBcImFjY29yZGlvbi1saXN0XCIsXG4gICAgY2xhc3MgaW5WaWV3IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMudHJpZ2dlciA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29sbGFwc2libGU9XCJ0cmlnZ2VyXCJdJylcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb2xsYXBzaWJsZT1cImNvbnRlbnRcIl0nKVxuICAgICAgICB0aGlzLmNvbGxhcHNpYmxlSXRlbXMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvbGxhcHNpYmxlLWl0ZW0nKVxuXG4gICAgICAgIHRoaXMudHJpZ2dlci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBpdGVtLmNsb3Nlc3QoJ2NvbGxhcHNpYmxlLWl0ZW0nKVxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzaWJsZUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbGxhcHNpYmxlPVwiY29udGVudFwiXScpXG4gICAgICAgICAgICAgIGNvbnN0IGljb24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbGxhcHNpYmxlPVwiaWNvblwiXSAuYW5pbWF0ZWQtaWNvbicpXG4gICAgICAgICAgICAgIGlmIChpdGVtLmlkICE9PSBwYXJlbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAvLyBDbG9zZSBvdGhlciBpdGVtc1xuICAgICAgICAgICAgICAgIHRvZ2dsZUNvbGxhcHNpYmxlSXRlbShjb250ZW50LCBpY29uLCBmYWxzZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICB9XG4gICAgfVxuICApXG59Il0sIm5hbWVzIjpbIml0ZW0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/entrypoints/collapsible.js\n\n}");

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
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/entrypoints/collapsible.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;