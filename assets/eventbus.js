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

/***/ "./src/entrypoints/eventbus.js":
/*!*************************************!*\
  !*** ./src/entrypoints/eventbus.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EventBus)\n/* harmony export */ });\nclass EventBus {\n  constructor() {\n    this.bus = document.createElement(\"event-bus\");\n  }\n  addEventListener(event, callback) {\n    this.bus.addEventListener(event, callback);\n  }\n  removeEventListener(event, callback) {\n    this.bus.removeEventListener(event, callback);\n  }\n  dispatchEvent(event, detail = {}) {\n    this.bus.dispatchEvent(new CustomEvent(event, { detail }));\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZW50cnlwb2ludHMvZXZlbnRidXMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlLGVBQWU7QUFBQSxFQUU1QixjQUFjO0FBQ1osU0FBSyxNQUFNLFNBQVMsY0FBYztBQUFBO0FBQUEsRUFJcEMsaUJBQWlCLE9BQU8sVUFBVTtBQUNoQyxTQUFLLElBQUksaUJBQWlCLE9BQU87QUFBQTtBQUFBLEVBTW5DLG9CQUFvQixPQUFPLFVBQVU7QUFDbkMsU0FBSyxJQUFJLG9CQUFvQixPQUFPO0FBQUE7QUFBQSxFQUl0QyxjQUFjLE9BQU8sU0FBUyxJQUFJO0FBQ2hDLFNBQUssSUFBSSxjQUFjLElBQUksWUFBWSxPQUFPLEVBQUU7QUFBQTtBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hvcGlmeS1zdGFydGVyLy4vc3JjL2VudHJ5cG9pbnRzL2V2ZW50YnVzLmpzPzEwNjEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRCdXMge1xuICAvLyBJbml0aWFsaXplIGEgbmV3IGV2ZW50IGJ1cyBpbnN0YW5jZS5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5idXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdldmVudC1idXMnKTtcbiAgfVxuXG4gIC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lci5cbiAgYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmJ1cy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLlxuICAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmJ1cy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyBEaXNwYXRjaCBhbiBldmVudC5cbiAgZGlzcGF0Y2hFdmVudChldmVudCwgZGV0YWlsID0ge30pIHtcbiAgICB0aGlzLmJ1cy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldmVudCwgeyBkZXRhaWwgfSkpO1xuICB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/entrypoints/eventbus.js\n\n}");

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
/******/ 	__webpack_modules__["./src/entrypoints/eventbus.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;