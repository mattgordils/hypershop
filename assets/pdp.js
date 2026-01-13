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

/***/ "./src/entrypoints/pdp.js":
/*!********************************!*\
  !*** ./src/entrypoints/pdp.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_main_product_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/main-product.scss */ \"./src/styles/main-product.scss\");\n\nif (!customElements.get(\"pdp-qty-input\")) {\n  customElements.define(\n    \"pdp-qty-input\",\n    class PdpQtyInput extends HTMLElement {\n      constructor() {\n        super();\n        this.qtyInput = this.querySelector('input[data-input=\"qty\"]');\n        this.qtyAdjustDecrease = this.querySelector(\"button#qtyDown\");\n        this.qtyAdjustIncrease = this.querySelector(\"button#qtyUp\");\n        this.minLimit = parseInt(this.dataset.minCount);\n        this.maxLimit = parseInt(this.dataset.maxCount);\n        this.increment = this?.dataset?.increment ? parseInt(this?.dataset?.increment) : 1;\n        this.qtyValue = parseInt(this.qtyInput.value);\n        this.nextUp = this.qtyValue + this.increment;\n        this.nextDown = this.qtyValue - this.increment;\n        this.qtyAdjustIncrease.addEventListener(\"click\", () => this.updateInput(\"up\"));\n        this.qtyAdjustDecrease.addEventListener(\"click\", () => this.updateInput(\"down\"));\n        this.setDisabled();\n      }\n      setDisabled() {\n        if (this.nextUp > this.maxLimit) {\n          this.qtyAdjustIncrease.disabled = true;\n        } else {\n          this.qtyAdjustIncrease.disabled = false;\n        }\n        if (this.nextDown < this.minLimit) {\n          this.qtyAdjustDecrease.disabled = true;\n        } else {\n          this.qtyAdjustDecrease.disabled = false;\n        }\n      }\n      updateInput(direction) {\n        let nextUp = this.qtyInput.value + this.increment;\n        let nextDown = this.qtyInput.value - this.increment;\n        if (direction === \"up\") {\n          this.qtyInput.value = parseInt(this.qtyInput.value) + this.increment;\n        } else {\n          this.qtyInput.value = this.qtyInput.value - this.increment;\n        }\n        this.nextUp = parseInt(this.qtyInput.value) + this.increment;\n        this.nextDown = parseInt(this.qtyInput.value) - this.increment;\n        this.setDisabled();\n      }\n    }\n  );\n}\n;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZW50cnlwb2ludHMvcGRwLmpzIiwibWFwcGluZ3MiOiI7O0FBQXFDO0FBRXJDLElBQUksQ0FBQyxlQUFlLElBQUksZUFBZSxHQUFHO0FBQ3hDLGlCQUFlO0FBQUEsSUFDYjtBQUFBLElBQ0EsTUFBTSxvQkFBb0IsWUFBWTtBQUFBLE1BQ3BDLGNBQWM7QUFDWixjQUFNO0FBRU4sYUFBSyxXQUFXLEtBQUssY0FBYyx5QkFBeUI7QUFFNUQsYUFBSyxvQkFBb0IsS0FBSyxjQUFjLGdCQUFnQjtBQUM1RCxhQUFLLG9CQUFvQixLQUFLLGNBQWMsY0FBYztBQUUxRCxhQUFLLFdBQVcsU0FBUyxLQUFLLFFBQVEsUUFBUTtBQUM5QyxhQUFLLFdBQVcsU0FBUyxLQUFLLFFBQVEsUUFBUTtBQUM5QyxhQUFLLFlBQVksTUFBTSxTQUFTLFlBQVksU0FBUyxNQUFNLFNBQVMsU0FBUyxJQUFJO0FBRWpGLGFBQUssV0FBVyxTQUFTLEtBQUssU0FBUyxLQUFLO0FBQzVDLGFBQUssU0FBUyxLQUFLLFdBQVcsS0FBSztBQUNuQyxhQUFLLFdBQVcsS0FBSyxXQUFXLEtBQUs7QUFFckMsYUFBSyxrQkFBa0IsaUJBQWlCLFNBQVMsTUFBTSxLQUFLLFlBQVksSUFBSSxDQUFDO0FBQzdFLGFBQUssa0JBQWtCLGlCQUFpQixTQUFTLE1BQU0sS0FBSyxZQUFZLE1BQU0sQ0FBQztBQUMvRSxhQUFLLFlBQVk7QUFBQSxNQUNuQjtBQUFBLE1BRUEsY0FBYztBQUNaLFlBQUksS0FBSyxTQUFTLEtBQUssVUFBVTtBQUMvQixlQUFLLGtCQUFrQixXQUFXO0FBQUEsUUFDcEMsT0FBTztBQUNMLGVBQUssa0JBQWtCLFdBQVc7QUFBQSxRQUNwQztBQUVBLFlBQUksS0FBSyxXQUFXLEtBQUssVUFBVTtBQUNqQyxlQUFLLGtCQUFrQixXQUFXO0FBQUEsUUFDcEMsT0FBTztBQUNMLGVBQUssa0JBQWtCLFdBQVc7QUFBQSxRQUNwQztBQUFBLE1BUUY7QUFBQSxNQUVBLFlBQVksV0FBVztBQUNyQixZQUFJLFNBQVMsS0FBSyxTQUFTLFFBQVEsS0FBSztBQUN4QyxZQUFJLFdBQVcsS0FBSyxTQUFTLFFBQVEsS0FBSztBQUMxQyxZQUFJLGNBQWMsTUFBTTtBQUN0QixlQUFLLFNBQVMsUUFBUSxTQUFTLEtBQUssU0FBUyxLQUFLLElBQUksS0FBSztBQUFBLFFBQzdELE9BQU87QUFDTCxlQUFLLFNBQVMsUUFBUSxLQUFLLFNBQVMsUUFBUSxLQUFLO0FBQUEsUUFDbkQ7QUFDQSxhQUFLLFNBQVMsU0FBUyxLQUFLLFNBQVMsS0FBSyxJQUFJLEtBQUs7QUFDbkQsYUFBSyxXQUFXLFNBQVMsS0FBSyxTQUFTLEtBQUssSUFBSSxLQUFLO0FBQ3JELGFBQUssWUFBWTtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hvcGlmeS1zdGFydGVyLy4vc3JjL2VudHJ5cG9pbnRzL3BkcC5qcz81YWM0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlcy9tYWluLXByb2R1Y3Quc2Nzc1wiO1xuXG5pZiAoIWN1c3RvbUVsZW1lbnRzLmdldChcInBkcC1xdHktaW5wdXRcIikpIHtcbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKFxuICAgIFwicGRwLXF0eS1pbnB1dFwiLFxuICAgIGNsYXNzIFBkcFF0eUlucHV0IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMucXR5SW5wdXQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W2RhdGEtaW5wdXQ9XCJxdHlcIl0nKVxuXG4gICAgICAgIHRoaXMucXR5QWRqdXN0RGVjcmVhc2UgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiNxdHlEb3duJylcbiAgICAgICAgdGhpcy5xdHlBZGp1c3RJbmNyZWFzZSA9IHRoaXMucXVlcnlTZWxlY3RvcignYnV0dG9uI3F0eVVwJylcblxuICAgICAgICB0aGlzLm1pbkxpbWl0ID0gcGFyc2VJbnQodGhpcy5kYXRhc2V0Lm1pbkNvdW50KVxuICAgICAgICB0aGlzLm1heExpbWl0ID0gcGFyc2VJbnQodGhpcy5kYXRhc2V0Lm1heENvdW50KVxuICAgICAgICB0aGlzLmluY3JlbWVudCA9IHRoaXM/LmRhdGFzZXQ/LmluY3JlbWVudCA/IHBhcnNlSW50KHRoaXM/LmRhdGFzZXQ/LmluY3JlbWVudCkgOiAxXG5cbiAgICAgICAgdGhpcy5xdHlWYWx1ZSA9IHBhcnNlSW50KHRoaXMucXR5SW5wdXQudmFsdWUpXG4gICAgICAgIHRoaXMubmV4dFVwID0gdGhpcy5xdHlWYWx1ZSArIHRoaXMuaW5jcmVtZW50XG4gICAgICAgIHRoaXMubmV4dERvd24gPSB0aGlzLnF0eVZhbHVlIC0gdGhpcy5pbmNyZW1lbnRcblxuICAgICAgICB0aGlzLnF0eUFkanVzdEluY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLnVwZGF0ZUlucHV0KCd1cCcpKVxuICAgICAgICB0aGlzLnF0eUFkanVzdERlY3JlYXNlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLnVwZGF0ZUlucHV0KCdkb3duJykpXG4gICAgICAgIHRoaXMuc2V0RGlzYWJsZWQoKVxuICAgICAgfVxuXG4gICAgICBzZXREaXNhYmxlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubmV4dFVwID4gdGhpcy5tYXhMaW1pdCkge1xuICAgICAgICAgIHRoaXMucXR5QWRqdXN0SW5jcmVhc2UuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5xdHlBZGp1c3RJbmNyZWFzZS5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5uZXh0RG93biA8IHRoaXMubWluTGltaXQpIHtcbiAgICAgICAgICB0aGlzLnF0eUFkanVzdERlY3JlYXNlLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucXR5QWRqdXN0RGVjcmVhc2UuZGlzYWJsZWQgPSBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgKHRoaXMucXR5SW5wdXQudmFsdWUgPT0gdGhpcy5taW5MaW1pdCkge1xuICAgICAgICAvLyAgIHRoaXMucXR5QWRqdXN0RGVjcmVhc2UuZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgdGhpcy5xdHlBZGp1c3REZWNyZWFzZS5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgIC8vICAgdGhpcy5xdHlBZGp1c3RJbmNyZWFzZS5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgIC8vIH1cbiAgICAgIH1cblxuICAgICAgdXBkYXRlSW5wdXQoZGlyZWN0aW9uKSB7XG4gICAgICAgIGxldCBuZXh0VXAgPSB0aGlzLnF0eUlucHV0LnZhbHVlICsgdGhpcy5pbmNyZW1lbnRcbiAgICAgICAgbGV0IG5leHREb3duID0gdGhpcy5xdHlJbnB1dC52YWx1ZSAtIHRoaXMuaW5jcmVtZW50XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd1cCcpIHtcbiAgICAgICAgICB0aGlzLnF0eUlucHV0LnZhbHVlID0gcGFyc2VJbnQodGhpcy5xdHlJbnB1dC52YWx1ZSkgKyB0aGlzLmluY3JlbWVudFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucXR5SW5wdXQudmFsdWUgPSB0aGlzLnF0eUlucHV0LnZhbHVlIC0gdGhpcy5pbmNyZW1lbnRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5leHRVcCA9IHBhcnNlSW50KHRoaXMucXR5SW5wdXQudmFsdWUpICsgdGhpcy5pbmNyZW1lbnRcbiAgICAgICAgdGhpcy5uZXh0RG93biA9IHBhcnNlSW50KHRoaXMucXR5SW5wdXQudmFsdWUpIC0gdGhpcy5pbmNyZW1lbnRcbiAgICAgICAgdGhpcy5zZXREaXNhYmxlZCgpXG4gICAgICB9XG4gICAgfVxuICApO1xufTtcblxuLy8gUmVjaGFyZ2UgU3Vic2NyaXB0aW9uXG4vLyBjb25zdCBzdWJzY3JpcHRpb25XaWRnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmMtY29udGFpbmVyLXdyYXBwZXInKVxuLy8gY29uc3Qgc3Vic2NyaXB0aW9uT3B0aW9ucyA9IGRvY3VtZW50Py5xdWVyeVNlbGVjdG9yQWxsKCcucmNfd2lkZ2V0X19vcHRpb25fX2xhYmVsJylcblxuLy8gaWYgKHN1YnNjcmlwdGlvbk9wdGlvbnMpIHtcbi8vICAgc3Vic2NyaXB0aW9uT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coJ09QVElPTicpXG4vLyAgIH0pXG4vLyB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/entrypoints/pdp.js\n\n}");

/***/ }),

/***/ "./src/styles/main-product.scss":
/*!**************************************!*\
  !*** ./src/styles/main-product.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3R5bGVzL21haW4tcHJvZHVjdC5zY3NzIiwibWFwcGluZ3MiOiI7QUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Nob3BpZnktc3RhcnRlci8uL3NyYy9zdHlsZXMvbWFpbi1wcm9kdWN0LnNjc3M/ZDIzNiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/styles/main-product.scss\n\n}");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/entrypoints/pdp.js");
/******/ 	
/******/ })()
;