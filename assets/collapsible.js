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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toggleCollapsibleItem: () => (/* binding */ toggleCollapsibleItem)\n/* harmony export */ });\nconst toggleCollapsibleItem = (content, icon, expand) => {\n  if (expand === \"inherit\") {\n    expand = content.ariaHidden === \"true\";\n  }\n  if (expand) {\n    content.ariaHidden = \"false\";\n    icon.dataset.icon = \"minus\";\n  } else {\n    content.ariaHidden = \"true\";\n    icon.dataset.icon = \"plus\";\n  }\n};\nif (!customElements.get(\"collapsible-item\")) {\n  customElements.define(\n    \"collapsible-item\",\n    class collapsibleItem extends HTMLElement {\n      constructor() {\n        super();\n        this.trigger = this.querySelectorAll('[data-collapsible=\"trigger\"]');\n        this.content = this.querySelector('[data-collapsible=\"content\"]');\n        this.icon = this.querySelector('[data-collapsible=\"icon\"] .animated-icon');\n        this.content.ariaHidden = \"true\";\n        this.trigger.forEach((item) => {\n          item.addEventListener(\"click\", (event) => {\n            toggleCollapsibleItem(this.content, this.icon, \"inherit\");\n          });\n        });\n      }\n    }\n  );\n}\nif (!customElements.get(\"accordion-list\")) {\n  customElements.define(\n    \"accordion-list\",\n    class accordionList extends HTMLElement {\n      constructor() {\n        super();\n        this.trigger = this.querySelectorAll('[data-collapsible=\"trigger\"]');\n        this.content = this.querySelectorAll('[data-collapsible=\"content\"]');\n        this.collapsibleItems = this.querySelectorAll(\"collapsible-item\");\n        if (this.dataset.initialOpen) {\n          const item = this.collapsibleItems[this.dataset.initialOpen];\n          const content = item.querySelector('[data-collapsible=\"content\"]');\n          const icon = item.querySelector('[data-collapsible=\"icon\"] .animated-icon');\n          toggleCollapsibleItem(content, icon, true);\n        }\n        this.trigger.forEach((item) => {\n          item.addEventListener(\"click\", (event) => {\n            const parent = item.closest(\"collapsible-item\");\n            this.collapsibleItems.forEach((item2) => {\n              const content = item2.querySelector('[data-collapsible=\"content\"]');\n              const icon = item2.querySelector('[data-collapsible=\"icon\"] .animated-icon');\n              if (item2.id !== parent.id) {\n                toggleCollapsibleItem(content, icon, false);\n              }\n            });\n          });\n        });\n      }\n    }\n  );\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZW50cnlwb2ludHMvY29sbGFwc2libGUuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLE1BQU0sd0JBQXdCLENBQUMsU0FBUyxNQUFNLFdBQVc7QUFFOUQsTUFBSSxXQUFXLFdBQVc7QUFDeEIsYUFBUyxRQUFRLGVBQWU7QUFBQSxFQUNsQztBQUVBLE1BQUksUUFBUTtBQUNWLFlBQVEsYUFBYTtBQUNyQixTQUFLLFFBQVEsT0FBTztBQUFBLEVBQ3RCLE9BQU87QUFDTCxZQUFRLGFBQWE7QUFDckIsU0FBSyxRQUFRLE9BQU87QUFBQSxFQUN0QjtBQUNGO0FBRUEsSUFBSSxDQUFDLGVBQWUsSUFBSSxrQkFBa0IsR0FBRztBQUMzQyxpQkFBZTtBQUFBLElBQ2I7QUFBQSxJQUNBLE1BQU0sd0JBQXdCLFlBQVk7QUFBQSxNQUN4QyxjQUFjO0FBQ1osY0FBTTtBQUVOLGFBQUssVUFBVSxLQUFLLGlCQUFpQiw4QkFBOEI7QUFDbkUsYUFBSyxVQUFVLEtBQUssY0FBYyw4QkFBOEI7QUFDaEUsYUFBSyxPQUFPLEtBQUssY0FBYywwQ0FBMEM7QUFFekUsYUFBSyxRQUFRLGFBQWE7QUFFMUIsYUFBSyxRQUFRLFFBQVEsVUFBUTtBQUMzQixlQUFLLGlCQUFpQixTQUFTLFdBQVM7QUFDdEMsa0NBQXNCLEtBQUssU0FBUyxLQUFLLE1BQU0sU0FBUztBQUFBLFVBQzFELENBQUM7QUFBQSxRQUNILENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQUksQ0FBQyxlQUFlLElBQUksZ0JBQWdCLEdBQUc7QUFDekMsaUJBQWU7QUFBQSxJQUNiO0FBQUEsSUFDQSxNQUFNLHNCQUFzQixZQUFZO0FBQUEsTUFDdEMsY0FBYztBQUNaLGNBQU07QUFFTixhQUFLLFVBQVUsS0FBSyxpQkFBaUIsOEJBQThCO0FBQ25FLGFBQUssVUFBVSxLQUFLLGlCQUFpQiw4QkFBOEI7QUFDbkUsYUFBSyxtQkFBbUIsS0FBSyxpQkFBaUIsa0JBQWtCO0FBRWhFLFlBQUksS0FBSyxRQUFRLGFBQWE7QUFDNUIsZ0JBQU0sT0FBTyxLQUFLLGlCQUFpQixLQUFLLFFBQVEsV0FBVztBQUMzRCxnQkFBTSxVQUFVLEtBQUssY0FBYyw4QkFBOEI7QUFDakUsZ0JBQU0sT0FBTyxLQUFLLGNBQWMsMENBQTBDO0FBQzFFLGdDQUFzQixTQUFTLE1BQU0sSUFBSTtBQUFBLFFBQzNDO0FBRUEsYUFBSyxRQUFRLFFBQVEsVUFBUTtBQUMzQixlQUFLLGlCQUFpQixTQUFTLFdBQVM7QUFDdEMsa0JBQU0sU0FBUyxLQUFLLFFBQVEsa0JBQWtCO0FBQzlDLGlCQUFLLGlCQUFpQixRQUFRLENBQUFBLFVBQVE7QUFDcEMsb0JBQU0sVUFBVUEsTUFBSyxjQUFjLDhCQUE4QjtBQUNqRSxvQkFBTSxPQUFPQSxNQUFLLGNBQWMsMENBQTBDO0FBQzFFLGtCQUFJQSxNQUFLLE9BQU8sT0FBTyxJQUFJO0FBRXpCLHNDQUFzQixTQUFTLE1BQU0sS0FBSztBQUFBLGNBQzVDO0FBQUEsWUFDRixDQUFDO0FBQUEsVUFDSCxDQUFDO0FBQUEsUUFDSCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaG9waWZ5LXN0YXJ0ZXIvLi9zcmMvZW50cnlwb2ludHMvY29sbGFwc2libGUuanM/YmRlNyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgdG9nZ2xlQ29sbGFwc2libGVJdGVtID0gKGNvbnRlbnQsIGljb24sIGV4cGFuZCkgPT4ge1xuICAvLyBVc2UgYXJlYUhpZGRlbiB0byB0b2dnbGUgdmlzaWJpbGl0eVxuICBpZiAoZXhwYW5kID09PSAnaW5oZXJpdCcpIHtcbiAgICBleHBhbmQgPSBjb250ZW50LmFyaWFIaWRkZW4gPT09ICd0cnVlJ1xuICB9XG4gIC8vXG4gIGlmIChleHBhbmQpIHtcbiAgICBjb250ZW50LmFyaWFIaWRkZW4gPSAnZmFsc2UnXG4gICAgaWNvbi5kYXRhc2V0Lmljb24gPSAnbWludXMnXG4gIH0gZWxzZSB7XG4gICAgY29udGVudC5hcmlhSGlkZGVuID0gJ3RydWUnXG4gICAgaWNvbi5kYXRhc2V0Lmljb24gPSAncGx1cydcbiAgfVxufVxuXG5pZiAoIWN1c3RvbUVsZW1lbnRzLmdldChcImNvbGxhcHNpYmxlLWl0ZW1cIikpIHtcbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKFxuICAgIFwiY29sbGFwc2libGUtaXRlbVwiLFxuICAgIGNsYXNzIGNvbGxhcHNpYmxlSXRlbSBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICAvL1xuICAgICAgICB0aGlzLnRyaWdnZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbGxhcHNpYmxlPVwidHJpZ2dlclwiXScpXG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMucXVlcnlTZWxlY3RvcignW2RhdGEtY29sbGFwc2libGU9XCJjb250ZW50XCJdJylcbiAgICAgICAgdGhpcy5pY29uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2xsYXBzaWJsZT1cImljb25cIl0gLmFuaW1hdGVkLWljb24nKVxuXG4gICAgICAgIHRoaXMuY29udGVudC5hcmlhSGlkZGVuID0gJ3RydWUnXG5cbiAgICAgICAgdGhpcy50cmlnZ2VyLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRvZ2dsZUNvbGxhcHNpYmxlSXRlbSh0aGlzLmNvbnRlbnQsIHRoaXMuaWNvbiwgJ2luaGVyaXQnKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICApXG59XG5cbmlmICghY3VzdG9tRWxlbWVudHMuZ2V0KFwiYWNjb3JkaW9uLWxpc3RcIikpIHtcbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKFxuICAgIFwiYWNjb3JkaW9uLWxpc3RcIixcbiAgICBjbGFzcyBhY2NvcmRpb25MaXN0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMudHJpZ2dlciA9IHRoaXMucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29sbGFwc2libGU9XCJ0cmlnZ2VyXCJdJylcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb2xsYXBzaWJsZT1cImNvbnRlbnRcIl0nKVxuICAgICAgICB0aGlzLmNvbGxhcHNpYmxlSXRlbXMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2NvbGxhcHNpYmxlLWl0ZW0nKVxuXG4gICAgICAgIGlmICh0aGlzLmRhdGFzZXQuaW5pdGlhbE9wZW4pIHtcbiAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5jb2xsYXBzaWJsZUl0ZW1zW3RoaXMuZGF0YXNldC5pbml0aWFsT3Blbl1cbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2xsYXBzaWJsZT1cImNvbnRlbnRcIl0nKVxuICAgICAgICAgIGNvbnN0IGljb24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbGxhcHNpYmxlPVwiaWNvblwiXSAuYW5pbWF0ZWQtaWNvbicpXG4gICAgICAgICAgdG9nZ2xlQ29sbGFwc2libGVJdGVtKGNvbnRlbnQsIGljb24sIHRydWUpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gaXRlbS5jbG9zZXN0KCdjb2xsYXBzaWJsZS1pdGVtJylcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2libGVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2xsYXBzaWJsZT1cImNvbnRlbnRcIl0nKVxuICAgICAgICAgICAgICBjb25zdCBpY29uID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb2xsYXBzaWJsZT1cImljb25cIl0gLmFuaW1hdGVkLWljb24nKVxuICAgICAgICAgICAgICBpZiAoaXRlbS5pZCAhPT0gcGFyZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2xvc2Ugb3RoZXIgaXRlbXNcbiAgICAgICAgICAgICAgICB0b2dnbGVDb2xsYXBzaWJsZUl0ZW0oY29udGVudCwgaWNvbiwgZmFsc2UpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIClcbn0iXSwibmFtZXMiOlsiaXRlbSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/entrypoints/collapsible.js\n\n}");

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