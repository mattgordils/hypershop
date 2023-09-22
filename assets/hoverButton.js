/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/entrypoints/hoverButton.js":
/*!****************************************!*\
  !*** ./src/entrypoints/hoverButton.js ***!
  \****************************************/
/***/ (() => {

eval("window.onload = function() {\n  updateButtonWidth();\n  window.addEventListener(\"resize\", updateButtonWidth);\n  const containers = document.querySelectorAll(\".hover-button-container\");\n  for (container of containers) {\n    container.addEventListener(\"mouseover\", (event) => {\n      let target = event.currentTarget;\n      let hoverButton2 = target.querySelector(\".hover-button\");\n      hoverButton2.classList.add(\"opacity-0\");\n    });\n    container.addEventListener(\"mouseout\", (event) => {\n      let target = event.currentTarget;\n      let hoverButton2 = target.querySelector(\".hover-button\");\n      hoverButton2.classList.remove(\"opacity-0\");\n    });\n    container.addEventListener(\"click\", (event) => {\n      let container2 = event.currentTarget;\n      const formClass = container2.getAttribute(\"data-form-to-submit\");\n      if (formClass && formClass !== \"\") {\n        const form = document.querySelector(\".\" + formClass);\n        form.submit();\n      }\n    });\n  }\n};\nfunction updateButtonWidth() {\n  const hoverButtons = document.querySelectorAll(\".hover-button\");\n  const hoverButtonHollows = document.querySelectorAll(\".hover-button-hollow\");\n  for (hoverButton of hoverButtons) {\n    const parent = hoverButton.parentElement;\n    hoverButton.setAttribute(\"width\", parent.offsetWidth);\n  }\n  for (hoverButtonHollow of hoverButtonHollows) {\n    const parent = hoverButtonHollow.parentElement;\n    hoverButtonHollow.setAttribute(\"width\", parent.offsetWidth);\n    parent.classList.remove(\"invisible\");\n  }\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/hoverButton.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/entrypoints/hoverButton.js"]();
/******/ 	
/******/ })()
;