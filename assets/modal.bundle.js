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

/***/ "./src/entries/modal.js":
/*!******************************!*\
  !*** ./src/entries/modal.js ***!
  \******************************/
/***/ (() => {

eval("class Modal extends HTMLElement {\n  constructor() {\n    super();\n    this.closeButtons = this.querySelectorAll('#closeModal');\n    this.closeButtons.forEach(item => {\n      item.addEventListener('click', event => {\n        this.closeModal();\n      });\n    });\n  }\n  closeModal() {\n    window.EventBus.publish(\"setModal\", false);\n  }\n}\ncustomElements.define('modal-component', Modal);\nclass ModalTrigger extends HTMLElement {\n  constructor() {\n    super();\n    this.modalId = this.dataset.modalId;\n    this.addEventListener('click', event => {\n      console.log('this', this.dataset.modalId);\n      this.openModal();\n    });\n  }\n  openModal() {\n    window.EventBus.publish(\"setModal\", this.modalId);\n  }\n}\ncustomElements.define('modal-trigger', ModalTrigger);\n\n//# sourceURL=webpack://hypershop/./src/entries/modal.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/entries/modal.js"]();
/******/ 	
/******/ })()
;