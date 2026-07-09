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

/***/ "./src/entrypoints/eventbus.js"
/*!*************************************!*\
  !*** ./src/entrypoints/eventbus.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EventBus)\n/* harmony export */ });\nclass EventBus {\n  // Initialize a new event bus instance.\n  constructor() {\n    this.bus = document.createElement(\"event-bus\");\n  }\n  // Add an event listener.\n  addEventListener(event, callback) {\n    this.bus.addEventListener(event, callback);\n  }\n  /**\n   * Remove an event listener.\n   */\n  removeEventListener(event, callback) {\n    this.bus.removeEventListener(event, callback);\n  }\n  // Dispatch an event.\n  dispatchEvent(event, detail = {}) {\n    this.bus.dispatchEvent(new CustomEvent(event, { detail }));\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZW50cnlwb2ludHMvZXZlbnRidXMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlLE1BQU0sU0FBUztBQUFBO0FBQUEsRUFFNUIsY0FBYztBQUNaLFNBQUssTUFBTSxTQUFTLGNBQWMsV0FBVztBQUFBLEVBQy9DO0FBQUE7QUFBQSxFQUdBLGlCQUFpQixPQUFPLFVBQVU7QUFDaEMsU0FBSyxJQUFJLGlCQUFpQixPQUFPLFFBQVE7QUFBQSxFQUMzQztBQUFBO0FBQUE7QUFBQTtBQUFBLEVBS0Esb0JBQW9CLE9BQU8sVUFBVTtBQUNuQyxTQUFLLElBQUksb0JBQW9CLE9BQU8sUUFBUTtBQUFBLEVBQzlDO0FBQUE7QUFBQSxFQUdBLGNBQWMsT0FBTyxTQUFTLENBQUMsR0FBRztBQUNoQyxTQUFLLElBQUksY0FBYyxJQUFJLFlBQVksT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQUEsRUFDM0Q7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvdGFsLWNvbnRyb2wvLi9zcmMvZW50cnlwb2ludHMvZXZlbnRidXMuanM/MTA2MSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEJ1cyB7XG4gIC8vIEluaXRpYWxpemUgYSBuZXcgZXZlbnQgYnVzIGluc3RhbmNlLlxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJ1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2V2ZW50LWJ1cycpO1xuICB9XG5cbiAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyLlxuICBhZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHRoaXMuYnVzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHRoaXMuYnVzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIERpc3BhdGNoIGFuIGV2ZW50LlxuICBkaXNwYXRjaEV2ZW50KGV2ZW50LCBkZXRhaWwgPSB7fSkge1xuICAgIHRoaXMuYnVzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50LCB7IGRldGFpbCB9KSk7XG4gIH1cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/entrypoints/eventbus.js\n\n}");

/***/ }

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
/******/ 	__webpack_modules__["./src/entrypoints/eventbus.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;