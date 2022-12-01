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

/***/ "./src/entries/slider-navigation.js":
/*!******************************************!*\
  !*** ./src/entries/slider-navigation.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"sliderNavigation\": () => (/* binding */ sliderNavigation)\n/* harmony export */ });\nconst sliderNavigation = slider => {\n  let wrapper, dots, arrows, arrowLeft, arrowRight;\n  function markup(remove) {\n    wrapperMarkup(remove);\n    dotMarkup(remove);\n    arrowMarkup(remove);\n  }\n  function removeElement(elment) {\n    elment.parentNode.removeChild(elment);\n  }\n  function createDiv(className) {\n    var div = document.createElement(\"div\");\n    var classNames = className.split(\" \");\n    classNames.forEach(name => div.classList.add(name));\n    return div;\n  }\n  function arrowMarkup(remove) {\n    if (remove) {\n      removeElement(arrowLeft);\n      removeElement(arrowRight);\n      return;\n    }\n    arrows = createDiv(\"arrows\");\n    arrowLeft = createDiv(\"arrow arrow--left\");\n    arrowLeft.addEventListener(\"click\", () => slider.prev());\n    arrowRight = createDiv(\"arrow arrow--right\");\n    arrowRight.addEventListener(\"click\", () => slider.next());\n    wrapper.appendChild(arrows);\n    arrows.appendChild(arrowLeft);\n    arrows.appendChild(arrowRight);\n  }\n  function wrapperMarkup(remove) {\n    if (remove) {\n      var parent = wrapper.parentNode;\n      while (wrapper.firstChild) parent.insertBefore(wrapper.firstChild, wrapper);\n      removeElement(wrapper);\n      return;\n    }\n    wrapper = createDiv(\"navigation-wrapper\");\n    slider.container.parentNode.appendChild(wrapper);\n    wrapper.appendChild(slider.container);\n  }\n  function dotMarkup(remove) {\n    if (remove) {\n      removeElement(dots);\n      return;\n    }\n    dots = createDiv(\"dots\");\n    slider.track.details.slides.forEach((_e, idx) => {\n      var dot = createDiv(\"dot\");\n      dot.addEventListener(\"click\", () => slider.moveToIdx(idx));\n      dots.appendChild(dot);\n    });\n    wrapper.appendChild(dots);\n  }\n  function updateClasses() {\n    var slide = slider.track.details.rel;\n    slide === 0 ? arrowLeft.classList.add(\"arrow--disabled\") : arrowLeft.classList.remove(\"arrow--disabled\");\n    slide === slider.track.details.slides.length - 1 ? arrowRight.classList.add(\"arrow--disabled\") : arrowRight.classList.remove(\"arrow--disabled\");\n    Array.from(dots.children).forEach(function (dot, idx) {\n      idx === slide ? dot.classList.add(\"dot--active\") : dot.classList.remove(\"dot--active\");\n    });\n  }\n  slider.on(\"created\", () => {\n    markup();\n    updateClasses();\n  });\n  slider.on(\"optionsChanged\", () => {\n    console.log(2);\n    markup(true);\n    markup();\n    updateClasses();\n  });\n  slider.on(\"slideChanged\", () => {\n    updateClasses();\n  });\n  slider.on(\"destroyed\", () => {\n    markup(true);\n  });\n};\n\n//# sourceURL=webpack://hypershop/./src/entries/slider-navigation.js?");

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
/******/ 	__webpack_modules__["./src/entries/slider-navigation.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;