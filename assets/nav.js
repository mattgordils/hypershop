/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/entrypoints/nav.js"
/*!********************************!*\
  !*** ./src/entrypoints/nav.js ***!
  \********************************/
() {

eval("{const scrollThreshold = 40;\nclass StickyHeader extends HTMLElement {\n  constructor() {\n    super();\n    this.scrollThreshold = 40;\n    this.ticking = false;\n  }\n  connectedCallback() {\n    this.header = document.querySelector(\".section-header:has(sticky-header)\");\n    this.headerBounds = {};\n    this.onScrollHandler = this.onScroll.bind(this);\n    window.addEventListener(\"scroll\", this.onScrollHandler, { passive: true });\n    this.requestTick();\n  }\n  disconnectedCallback() {\n    window.removeEventListener(\"scroll\", this.onScrollHandler);\n  }\n  onScroll() {\n    this.requestTick();\n  }\n  requestTick() {\n    if (!this.ticking) {\n      requestAnimationFrame(() => {\n        this.updateHeader();\n        this.ticking = false;\n      });\n      this.ticking = true;\n    }\n  }\n  updateHeader() {\n    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n    console.log(\"update\");\n    if (scrollTop > this.scrollThreshold) {\n      this.header?.classList.add(\"scrolled\");\n    } else {\n      this.header?.classList.remove(\"scrolled\");\n    }\n  }\n}\nif (!customElements.get(\"sticky-header\")) {\n  customElements.define(\"sticky-header\", StickyHeader);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3RhbC1jb250cm9sLy4vc3JjL2VudHJ5cG9pbnRzL25hdi5qcz82YTcyIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNjcm9sbFRocmVzaG9sZCA9IDQwO1xuXG5jbGFzcyBTdGlja3lIZWFkZXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zY3JvbGxUaHJlc2hvbGQgPSA0MDtcbiAgICB0aGlzLnRpY2tpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24taGVhZGVyOmhhcyhzdGlja3ktaGVhZGVyKScpO1xuICAgIHRoaXMuaGVhZGVyQm91bmRzID0ge307XG4gICAgdGhpcy5vblNjcm9sbEhhbmRsZXIgPSB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcyk7XG5cbiAgICAvLyBVc2UgcGFzc2l2ZSBsaXN0ZW5lciBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGxIYW5kbGVyLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICAvLyBTZXQgaW5pdGlhbCBzdGF0ZVxuICAgIHRoaXMucmVxdWVzdFRpY2soKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsSGFuZGxlcik7XG4gIH1cblxuICBvblNjcm9sbCgpIHtcbiAgICB0aGlzLnJlcXVlc3RUaWNrKCk7XG4gIH1cblxuICByZXF1ZXN0VGljaygpIHtcbiAgICBpZiAoIXRoaXMudGlja2luZykge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWFkZXIoKTtcbiAgICAgICAgdGhpcy50aWNraW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHRoaXMudGlja2luZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlSGVhZGVyKCkge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgY29uc29sZS5sb2coJ3VwZGF0ZScpXG5cbiAgICBpZiAoc2Nyb2xsVG9wID4gdGhpcy5zY3JvbGxUaHJlc2hvbGQpIHtcbiAgICAgIHRoaXMuaGVhZGVyPy5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlYWRlcj8uY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsZWQnKTtcbiAgICB9XG4gIH1cbn1cbmlmICghY3VzdG9tRWxlbWVudHMuZ2V0KCdzdGlja3ktaGVhZGVyJykpIHtcbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdzdGlja3ktaGVhZGVyJywgU3RpY2t5SGVhZGVyKTtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxrQkFBa0I7QUFFeEIsTUFBTSxxQkFBcUIsWUFBWTtBQUFBLEVBQ3JDLGNBQWM7QUFDWixVQUFNO0FBQ04sU0FBSyxrQkFBa0I7QUFDdkIsU0FBSyxVQUFVO0FBQUEsRUFDakI7QUFBQSxFQUVBLG9CQUFvQjtBQUNsQixTQUFLLFNBQVMsU0FBUyxjQUFjLG9DQUFvQztBQUN6RSxTQUFLLGVBQWUsQ0FBQztBQUNyQixTQUFLLGtCQUFrQixLQUFLLFNBQVMsS0FBSyxJQUFJO0FBRzlDLFdBQU8saUJBQWlCLFVBQVUsS0FBSyxpQkFBaUIsRUFBRSxTQUFTLEtBQUssQ0FBQztBQUd6RSxTQUFLLFlBQVk7QUFBQSxFQUNuQjtBQUFBLEVBRUEsdUJBQXVCO0FBQ3JCLFdBQU8sb0JBQW9CLFVBQVUsS0FBSyxlQUFlO0FBQUEsRUFDM0Q7QUFBQSxFQUVBLFdBQVc7QUFDVCxTQUFLLFlBQVk7QUFBQSxFQUNuQjtBQUFBLEVBRUEsY0FBYztBQUNaLFFBQUksQ0FBQyxLQUFLLFNBQVM7QUFDakIsNEJBQXNCLE1BQU07QUFDMUIsYUFBSyxhQUFhO0FBQ2xCLGFBQUssVUFBVTtBQUFBLE1BQ2pCLENBQUM7QUFDRCxXQUFLLFVBQVU7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLGVBQWU7QUFDYixVQUFNLFlBQVksT0FBTyxlQUFlLFNBQVMsZ0JBQWdCO0FBRWpFLFlBQVEsSUFBSSxRQUFRO0FBRXBCLFFBQUksWUFBWSxLQUFLLGlCQUFpQjtBQUNwQyxXQUFLLFFBQVEsVUFBVSxJQUFJLFVBQVU7QUFBQSxJQUN2QyxPQUFPO0FBQ0wsV0FBSyxRQUFRLFVBQVUsT0FBTyxVQUFVO0FBQUEsSUFDMUM7QUFBQSxFQUNGO0FBQ0Y7QUFDQSxJQUFJLENBQUMsZUFBZSxJQUFJLGVBQWUsR0FBRztBQUN4QyxpQkFBZSxPQUFPLGlCQUFpQixZQUFZO0FBQ3JEOyIsIm5hbWVzIjpbXSwiZmlsZSI6Ii4vc3JjL2VudHJ5cG9pbnRzL25hdi5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/entrypoints/nav.js\n\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/entrypoints/nav.js"]();
/******/ 	
/******/ })()
;