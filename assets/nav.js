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

eval("{const scrollThreshold = 40;\nclass StickyHeader extends HTMLElement {\n  constructor() {\n    super();\n    this.scrollThreshold = 40;\n    this.ticking = false;\n  }\n  connectedCallback() {\n    this.header = document.getElementById(\"shopify-section-page_header\");\n    this.headerBounds = {};\n    this.onScrollHandler = this.onScroll.bind(this);\n    window.addEventListener(\"scroll\", this.onScrollHandler, { passive: true });\n    this.requestTick();\n  }\n  disconnectedCallback() {\n    window.removeEventListener(\"scroll\", this.onScrollHandler);\n  }\n  onScroll() {\n    this.requestTick();\n  }\n  requestTick() {\n    if (!this.ticking) {\n      requestAnimationFrame(() => {\n        this.updateHeader();\n        this.ticking = false;\n      });\n      this.ticking = true;\n    }\n  }\n  updateHeader() {\n    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n    if (scrollTop > this.scrollThreshold) {\n      this.header?.classList.add(\"scrolled\");\n    } else {\n      this.header?.classList.remove(\"scrolled\");\n    }\n  }\n}\nif (!customElements.get(\"sticky-header\")) {\n  customElements.define(\"sticky-header\", StickyHeader);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3RhbC1jb250cm9sLy4vc3JjL2VudHJ5cG9pbnRzL25hdi5qcz82YTcyIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNjcm9sbFRocmVzaG9sZCA9IDQwO1xuXG5jbGFzcyBTdGlja3lIZWFkZXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zY3JvbGxUaHJlc2hvbGQgPSA0MDtcbiAgICB0aGlzLnRpY2tpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3BpZnktc2VjdGlvbi1wYWdlX2hlYWRlcicpO1xuICAgIHRoaXMuaGVhZGVyQm91bmRzID0ge307XG4gICAgdGhpcy5vblNjcm9sbEhhbmRsZXIgPSB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcyk7XG5cbiAgICAvLyBVc2UgcGFzc2l2ZSBsaXN0ZW5lciBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGxIYW5kbGVyLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICAvLyBTZXQgaW5pdGlhbCBzdGF0ZVxuICAgIHRoaXMucmVxdWVzdFRpY2soKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsSGFuZGxlcik7XG4gIH1cblxuICBvblNjcm9sbCgpIHtcbiAgICB0aGlzLnJlcXVlc3RUaWNrKCk7XG4gIH1cblxuICByZXF1ZXN0VGljaygpIHtcbiAgICBpZiAoIXRoaXMudGlja2luZykge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWFkZXIoKTtcbiAgICAgICAgdGhpcy50aWNraW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIHRoaXMudGlja2luZyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlSGVhZGVyKCkge1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXG4gICAgaWYgKHNjcm9sbFRvcCA+IHRoaXMuc2Nyb2xsVGhyZXNob2xkKSB7XG4gICAgICB0aGlzLmhlYWRlcj8uY2xhc3NMaXN0LmFkZCgnc2Nyb2xsZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5oZWFkZXI/LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbGVkJyk7XG4gICAgfVxuICB9XG59XG5pZiAoIWN1c3RvbUVsZW1lbnRzLmdldCgnc3RpY2t5LWhlYWRlcicpKSB7XG4gIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnc3RpY2t5LWhlYWRlcicsIFN0aWNreUhlYWRlcik7XG59XG4iXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sa0JBQWtCO0FBRXhCLE1BQU0scUJBQXFCLFlBQVk7QUFBQSxFQUNyQyxjQUFjO0FBQ1osVUFBTTtBQUNOLFNBQUssa0JBQWtCO0FBQ3ZCLFNBQUssVUFBVTtBQUFBLEVBQ2pCO0FBQUEsRUFFQSxvQkFBb0I7QUFDbEIsU0FBSyxTQUFTLFNBQVMsZUFBZSw2QkFBNkI7QUFDbkUsU0FBSyxlQUFlLENBQUM7QUFDckIsU0FBSyxrQkFBa0IsS0FBSyxTQUFTLEtBQUssSUFBSTtBQUc5QyxXQUFPLGlCQUFpQixVQUFVLEtBQUssaUJBQWlCLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFHekUsU0FBSyxZQUFZO0FBQUEsRUFDbkI7QUFBQSxFQUVBLHVCQUF1QjtBQUNyQixXQUFPLG9CQUFvQixVQUFVLEtBQUssZUFBZTtBQUFBLEVBQzNEO0FBQUEsRUFFQSxXQUFXO0FBQ1QsU0FBSyxZQUFZO0FBQUEsRUFDbkI7QUFBQSxFQUVBLGNBQWM7QUFDWixRQUFJLENBQUMsS0FBSyxTQUFTO0FBQ2pCLDRCQUFzQixNQUFNO0FBQzFCLGFBQUssYUFBYTtBQUNsQixhQUFLLFVBQVU7QUFBQSxNQUNqQixDQUFDO0FBQ0QsV0FBSyxVQUFVO0FBQUEsSUFDakI7QUFBQSxFQUNGO0FBQUEsRUFFQSxlQUFlO0FBQ2IsVUFBTSxZQUFZLE9BQU8sZUFBZSxTQUFTLGdCQUFnQjtBQUVqRSxRQUFJLFlBQVksS0FBSyxpQkFBaUI7QUFDcEMsV0FBSyxRQUFRLFVBQVUsSUFBSSxVQUFVO0FBQUEsSUFDdkMsT0FBTztBQUNMLFdBQUssUUFBUSxVQUFVLE9BQU8sVUFBVTtBQUFBLElBQzFDO0FBQUEsRUFDRjtBQUNGO0FBQ0EsSUFBSSxDQUFDLGVBQWUsSUFBSSxlQUFlLEdBQUc7QUFDeEMsaUJBQWUsT0FBTyxpQkFBaUIsWUFBWTtBQUNyRDsiLCJuYW1lcyI6W10sImZpbGUiOiIuL3NyYy9lbnRyeXBvaW50cy9uYXYuanMiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/entrypoints/nav.js\n\n}");

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