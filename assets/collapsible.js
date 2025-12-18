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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toggleCollapsibleItem: () => (/* binding */ toggleCollapsibleItem)\n/* harmony export */ });\nconst toggleCollapsibleItem = (content, icon, expand) => {\n  if (expand === \"inherit\") {\n    expand = content.ariaHidden === \"true\";\n  }\n  if (expand) {\n    content.ariaHidden = \"false\";\n    if (icon) {\n      icon.dataset.icon = \"minus\";\n    }\n  } else {\n    content.ariaHidden = \"true\";\n    if (icon) {\n      icon.dataset.icon = \"plus\";\n    }\n  }\n};\nif (!customElements.get(\"collapsible-item\")) {\n  customElements.define(\n    \"collapsible-item\",\n    class collapsibleItem extends HTMLElement {\n      constructor() {\n        super();\n      }\n      connectedCallback() {\n        setTimeout(() => {\n          this.trigger = this.querySelectorAll('[data-collapsible=\"trigger\"]');\n          this.content = this.querySelector('[data-collapsible=\"content\"]');\n          this.icon = this.querySelector('[data-collapsible=\"icon\"] .animated-icon');\n          if (!this.content) {\n            console.error(\"collapsible-item: No content element found\", this);\n            return;\n          }\n          this.content.ariaHidden = \"true\";\n          this.trigger.forEach((item) => {\n            item.addEventListener(\"click\", (event) => {\n              toggleCollapsibleItem(this.content, this.icon, \"inherit\");\n            });\n          });\n        }, 0);\n      }\n    }\n  );\n}\nif (!customElements.get(\"accordion-list\")) {\n  customElements.define(\n    \"accordion-list\",\n    class accordionList extends HTMLElement {\n      constructor() {\n        super();\n      }\n      connectedCallback() {\n        setTimeout(() => {\n          this.trigger = this.querySelectorAll('[data-collapsible=\"trigger\"]');\n          this.content = this.querySelectorAll('[data-collapsible=\"content\"]');\n          this.collapsibleItems = this.querySelectorAll(\"collapsible-item\");\n          if (this.dataset.initialOpen) {\n            const item = this.collapsibleItems[this.dataset.initialOpen];\n            const content = item.querySelector('[data-collapsible=\"content\"]');\n            const icon = item.querySelector('[data-collapsible=\"icon\"] .animated-icon');\n            toggleCollapsibleItem(content, icon, true);\n          }\n          this.trigger.forEach((item) => {\n            item.addEventListener(\"click\", (event) => {\n              const parent = item.closest(\"collapsible-item\");\n              this.collapsibleItems.forEach((item2) => {\n                const content = item2.querySelector('[data-collapsible=\"content\"]');\n                const icon = item2.querySelector('[data-collapsible=\"icon\"] .animated-icon');\n                if (item2.id !== parent.id) {\n                  toggleCollapsibleItem(content, icon, false);\n                }\n              });\n            });\n          });\n        }, 0);\n      }\n    }\n  );\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZW50cnlwb2ludHMvY29sbGFwc2libGUuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLE1BQU0sd0JBQXdCLENBQUMsU0FBUyxNQUFNLFdBQVc7QUFFOUQsTUFBSSxXQUFXLFdBQVc7QUFDeEIsYUFBUyxRQUFRLGVBQWU7QUFBQSxFQUNsQztBQUVBLE1BQUksUUFBUTtBQUNWLFlBQVEsYUFBYTtBQUNyQixRQUFJLE1BQU07QUFDUixXQUFLLFFBQVEsT0FBTztBQUFBLElBQ3RCO0FBQUEsRUFDRixPQUFPO0FBQ0wsWUFBUSxhQUFhO0FBQ3JCLFFBQUksTUFBTTtBQUNSLFdBQUssUUFBUSxPQUFPO0FBQUEsSUFDdEI7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFJLENBQUMsZUFBZSxJQUFJLGtCQUFrQixHQUFHO0FBQzNDLGlCQUFlO0FBQUEsSUFDYjtBQUFBLElBQ0EsTUFBTSx3QkFBd0IsWUFBWTtBQUFBLE1BQ3hDLGNBQWM7QUFDWixjQUFNO0FBQUEsTUFDUjtBQUFBLE1BRUEsb0JBQW9CO0FBRWxCLG1CQUFXLE1BQU07QUFDZixlQUFLLFVBQVUsS0FBSyxpQkFBaUIsOEJBQThCO0FBQ25FLGVBQUssVUFBVSxLQUFLLGNBQWMsOEJBQThCO0FBQ2hFLGVBQUssT0FBTyxLQUFLLGNBQWMsMENBQTBDO0FBRXpFLGNBQUksQ0FBQyxLQUFLLFNBQVM7QUFDakIsb0JBQVEsTUFBTSw4Q0FBOEMsSUFBSTtBQUNoRTtBQUFBLFVBQ0Y7QUFFQSxlQUFLLFFBQVEsYUFBYTtBQUUxQixlQUFLLFFBQVEsUUFBUSxVQUFRO0FBQzNCLGlCQUFLLGlCQUFpQixTQUFTLFdBQVM7QUFDdEMsb0NBQXNCLEtBQUssU0FBUyxLQUFLLE1BQU0sU0FBUztBQUFBLFlBQzFELENBQUM7QUFBQSxVQUNILENBQUM7QUFBQSxRQUNILEdBQUcsQ0FBQztBQUFBLE1BQ047QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBSSxDQUFDLGVBQWUsSUFBSSxnQkFBZ0IsR0FBRztBQUN6QyxpQkFBZTtBQUFBLElBQ2I7QUFBQSxJQUNBLE1BQU0sc0JBQXNCLFlBQVk7QUFBQSxNQUN0QyxjQUFjO0FBQ1osY0FBTTtBQUFBLE1BQ1I7QUFBQSxNQUVBLG9CQUFvQjtBQUVsQixtQkFBVyxNQUFNO0FBQ2YsZUFBSyxVQUFVLEtBQUssaUJBQWlCLDhCQUE4QjtBQUNuRSxlQUFLLFVBQVUsS0FBSyxpQkFBaUIsOEJBQThCO0FBQ25FLGVBQUssbUJBQW1CLEtBQUssaUJBQWlCLGtCQUFrQjtBQUVoRSxjQUFJLEtBQUssUUFBUSxhQUFhO0FBQzVCLGtCQUFNLE9BQU8sS0FBSyxpQkFBaUIsS0FBSyxRQUFRLFdBQVc7QUFDM0Qsa0JBQU0sVUFBVSxLQUFLLGNBQWMsOEJBQThCO0FBQ2pFLGtCQUFNLE9BQU8sS0FBSyxjQUFjLDBDQUEwQztBQUMxRSxrQ0FBc0IsU0FBUyxNQUFNLElBQUk7QUFBQSxVQUMzQztBQUVBLGVBQUssUUFBUSxRQUFRLFVBQVE7QUFDM0IsaUJBQUssaUJBQWlCLFNBQVMsV0FBUztBQUN0QyxvQkFBTSxTQUFTLEtBQUssUUFBUSxrQkFBa0I7QUFDOUMsbUJBQUssaUJBQWlCLFFBQVEsQ0FBQUEsVUFBUTtBQUNwQyxzQkFBTSxVQUFVQSxNQUFLLGNBQWMsOEJBQThCO0FBQ2pFLHNCQUFNLE9BQU9BLE1BQUssY0FBYywwQ0FBMEM7QUFDMUUsb0JBQUlBLE1BQUssT0FBTyxPQUFPLElBQUk7QUFFekIsd0NBQXNCLFNBQVMsTUFBTSxLQUFLO0FBQUEsZ0JBQzVDO0FBQUEsY0FDRixDQUFDO0FBQUEsWUFDSCxDQUFDO0FBQUEsVUFDSCxDQUFDO0FBQUEsUUFDSCxHQUFHLENBQUM7QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3Nob3BpZnktc3RhcnRlci8uL3NyYy9lbnRyeXBvaW50cy9jb2xsYXBzaWJsZS5qcz9iZGU3Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCB0b2dnbGVDb2xsYXBzaWJsZUl0ZW0gPSAoY29udGVudCwgaWNvbiwgZXhwYW5kKSA9PiB7XG4gIC8vIFVzZSBhcmVhSGlkZGVuIHRvIHRvZ2dsZSB2aXNpYmlsaXR5XG4gIGlmIChleHBhbmQgPT09ICdpbmhlcml0Jykge1xuICAgIGV4cGFuZCA9IGNvbnRlbnQuYXJpYUhpZGRlbiA9PT0gJ3RydWUnXG4gIH1cbiAgLy9cbiAgaWYgKGV4cGFuZCkge1xuICAgIGNvbnRlbnQuYXJpYUhpZGRlbiA9ICdmYWxzZSdcbiAgICBpZiAoaWNvbikge1xuICAgICAgaWNvbi5kYXRhc2V0Lmljb24gPSAnbWludXMnXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnRlbnQuYXJpYUhpZGRlbiA9ICd0cnVlJ1xuICAgIGlmIChpY29uKSB7XG4gICAgICBpY29uLmRhdGFzZXQuaWNvbiA9ICdwbHVzJ1xuICAgIH1cbiAgfVxufVxuXG5pZiAoIWN1c3RvbUVsZW1lbnRzLmdldChcImNvbGxhcHNpYmxlLWl0ZW1cIikpIHtcbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKFxuICAgIFwiY29sbGFwc2libGUtaXRlbVwiLFxuICAgIGNsYXNzIGNvbGxhcHNpYmxlSXRlbSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgfVxuXG4gICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgLy8gVXNlIHNldFRpbWVvdXQgdG8gZW5zdXJlIGNoaWxkIGVsZW1lbnRzIGFyZSBmdWxseSBwYXJzZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb2xsYXBzaWJsZT1cInRyaWdnZXJcIl0nKVxuICAgICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMucXVlcnlTZWxlY3RvcignW2RhdGEtY29sbGFwc2libGU9XCJjb250ZW50XCJdJylcbiAgICAgICAgICB0aGlzLmljb24gPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbGxhcHNpYmxlPVwiaWNvblwiXSAuYW5pbWF0ZWQtaWNvbicpXG5cbiAgICAgICAgICBpZiAoIXRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignY29sbGFwc2libGUtaXRlbTogTm8gY29udGVudCBlbGVtZW50IGZvdW5kJywgdGhpcylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuY29udGVudC5hcmlhSGlkZGVuID0gJ3RydWUnXG5cbiAgICAgICAgICB0aGlzLnRyaWdnZXIuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgIHRvZ2dsZUNvbGxhcHNpYmxlSXRlbSh0aGlzLmNvbnRlbnQsIHRoaXMuaWNvbiwgJ2luaGVyaXQnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgIH1cbiAgKVxufVxuXG5pZiAoIWN1c3RvbUVsZW1lbnRzLmdldChcImFjY29yZGlvbi1saXN0XCIpKSB7XG4gIGN1c3RvbUVsZW1lbnRzLmRlZmluZShcbiAgICBcImFjY29yZGlvbi1saXN0XCIsXG4gICAgY2xhc3MgYWNjb3JkaW9uTGlzdCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgfVxuXG4gICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgLy8gVXNlIHNldFRpbWVvdXQgdG8gZW5zdXJlIGNoaWxkIGVsZW1lbnRzIGFyZSBmdWxseSBwYXJzZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb2xsYXBzaWJsZT1cInRyaWdnZXJcIl0nKVxuICAgICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29sbGFwc2libGU9XCJjb250ZW50XCJdJylcbiAgICAgICAgICB0aGlzLmNvbGxhcHNpYmxlSXRlbXMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvbGxhcHNpYmxlLWl0ZW0nKVxuXG4gICAgICAgICAgaWYgKHRoaXMuZGF0YXNldC5pbml0aWFsT3Blbikge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY29sbGFwc2libGVJdGVtc1t0aGlzLmRhdGFzZXQuaW5pdGlhbE9wZW5dXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2xsYXBzaWJsZT1cImNvbnRlbnRcIl0nKVxuICAgICAgICAgICAgY29uc3QgaWNvbiA9IGl0ZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY29sbGFwc2libGU9XCJpY29uXCJdIC5hbmltYXRlZC1pY29uJylcbiAgICAgICAgICAgIHRvZ2dsZUNvbGxhcHNpYmxlSXRlbShjb250ZW50LCBpY29uLCB0cnVlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMudHJpZ2dlci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gaXRlbS5jbG9zZXN0KCdjb2xsYXBzaWJsZS1pdGVtJylcbiAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzaWJsZUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY29sbGFwc2libGU9XCJjb250ZW50XCJdJylcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2xsYXBzaWJsZT1cImljb25cIl0gLmFuaW1hdGVkLWljb24nKVxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkICE9PSBwYXJlbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAgIC8vIENsb3NlIG90aGVyIGl0ZW1zXG4gICAgICAgICAgICAgICAgICB0b2dnbGVDb2xsYXBzaWJsZUl0ZW0oY29udGVudCwgaWNvbiwgZmFsc2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9LCAwKVxuICAgICAgfVxuICAgIH1cbiAgKVxufSJdLCJuYW1lcyI6WyJpdGVtIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/entrypoints/collapsible.js\n\n}");

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