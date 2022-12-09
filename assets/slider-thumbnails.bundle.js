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

/***/ "./src/entries/slider-thumbnails.js":
/*!******************************************!*\
  !*** ./src/entries/slider-thumbnails.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sliderThumbnails\": () => (/* binding */ sliderThumbnails)\n/* harmony export */ });\nconst sliderThumbnails = main => {\n  return slider => {\n    function removeActive() {\n      slider.slides.forEach(slide => {\n        slide.classList.remove(\"active\");\n      });\n    }\n    function addActive(idx) {\n      slider.slides[idx].classList.add(\"active\");\n    }\n    function addClickEvents() {\n      slider.slides.forEach((slide, idx) => {\n        slide.addEventListener(\"click\", () => {\n          main.moveToIdx(idx);\n        });\n      });\n    }\n    slider.on(\"created\", () => {\n      addActive(slider.track.details.rel);\n      addClickEvents();\n      console.log('slider created');\n      if (main) {\n        main.on(\"animationStarted\", main => {\n          console.log(main);\n          removeActive();\n          const next = main.animator.targetIdx || 0;\n          addActive(main.track.absToRel(next));\n          slider.moveToIdx(main.track.absToRel(next));\n          // slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))\n        });\n      }\n    });\n  };\n};\n\n//# sourceURL=webpack://hypershop/./src/entries/slider-thumbnails.js?");

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
/******/ 	__webpack_modules__["./src/entries/slider-thumbnails.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;