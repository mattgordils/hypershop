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

eval("{const scrollThreshold = 40;\nclass StickyHeader extends HTMLElement {\n  constructor() {\n    super();\n    this.scrollThreshold = 40;\n    this.ticking = false;\n  }\n  connectedCallback() {\n    this.header = document.querySelector(\".section-header:has(sticky-header)\");\n    this.scrollThreshold = document.querySelector(\".section-notification-banner\").offsetHeight || 40;\n    this.headerBounds = {};\n    this.onScrollHandler = this.onScroll.bind(this);\n    console.log(\"scrollThreshold\", this.scrollThreshold);\n    window.addEventListener(\"scroll\", this.onScrollHandler, { passive: true });\n    this.requestTick();\n  }\n  disconnectedCallback() {\n    window.removeEventListener(\"scroll\", this.onScrollHandler);\n  }\n  onScroll() {\n    this.requestTick();\n  }\n  requestTick() {\n    if (!this.ticking) {\n      requestAnimationFrame(() => {\n        this.updateHeader();\n        this.ticking = false;\n      });\n      this.ticking = true;\n    }\n  }\n  updateHeader() {\n    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n    if (scrollTop > this.scrollThreshold) {\n      this.header?.classList.add(\"scrolled\");\n    } else {\n      this.header?.classList.remove(\"scrolled\");\n    }\n  }\n}\nif (!customElements.get(\"sticky-header\")) {\n  customElements.define(\"sticky-header\", StickyHeader);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3RhbC1jb250cm9sLy4vc3JjL2VudHJ5cG9pbnRzL25hdi5qcz82YTcyIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNjcm9sbFRocmVzaG9sZCA9IDQwO1xuXG5jbGFzcyBTdGlja3lIZWFkZXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zY3JvbGxUaHJlc2hvbGQgPSA0MDtcbiAgICB0aGlzLnRpY2tpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24taGVhZGVyOmhhcyhzdGlja3ktaGVhZGVyKScpO1xuICAgIHRoaXMuc2Nyb2xsVGhyZXNob2xkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tbm90aWZpY2F0aW9uLWJhbm5lcicpLm9mZnNldEhlaWdodCB8fCA0MDtcbiAgICB0aGlzLmhlYWRlckJvdW5kcyA9IHt9O1xuICAgIHRoaXMub25TY3JvbGxIYW5kbGVyID0gdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpO1xuXG4gICAgY29uc29sZS5sb2coJ3Njcm9sbFRocmVzaG9sZCcsIHRoaXMuc2Nyb2xsVGhyZXNob2xkKVxuXG4gICAgLy8gVXNlIHBhc3NpdmUgbGlzdGVuZXIgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsSGFuZGxlciwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgLy8gU2V0IGluaXRpYWwgc3RhdGVcbiAgICB0aGlzLnJlcXVlc3RUaWNrKCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbEhhbmRsZXIpO1xuICB9XG5cbiAgb25TY3JvbGwoKSB7XG4gICAgdGhpcy5yZXF1ZXN0VGljaygpO1xuICB9XG5cbiAgcmVxdWVzdFRpY2soKSB7XG4gICAgaWYgKCF0aGlzLnRpY2tpbmcpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudXBkYXRlSGVhZGVyKCk7XG4gICAgICAgIHRoaXMudGlja2luZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnRpY2tpbmcgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUhlYWRlcigpIHtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcblxuICAgIGlmIChzY3JvbGxUb3AgPiB0aGlzLnNjcm9sbFRocmVzaG9sZCkge1xuICAgICAgdGhpcy5oZWFkZXI/LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVhZGVyPy5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxlZCcpO1xuICAgIH1cbiAgfVxufVxuaWYgKCFjdXN0b21FbGVtZW50cy5nZXQoJ3N0aWNreS1oZWFkZXInKSkge1xuICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ3N0aWNreS1oZWFkZXInLCBTdGlja3lIZWFkZXIpO1xufVxuIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGtCQUFrQjtBQUV4QixNQUFNLHFCQUFxQixZQUFZO0FBQUEsRUFDckMsY0FBYztBQUNaLFVBQU07QUFDTixTQUFLLGtCQUFrQjtBQUN2QixTQUFLLFVBQVU7QUFBQSxFQUNqQjtBQUFBLEVBRUEsb0JBQW9CO0FBQ2xCLFNBQUssU0FBUyxTQUFTLGNBQWMsb0NBQW9DO0FBQ3pFLFNBQUssa0JBQWtCLFNBQVMsY0FBYyw4QkFBOEIsRUFBRSxnQkFBZ0I7QUFDOUYsU0FBSyxlQUFlLENBQUM7QUFDckIsU0FBSyxrQkFBa0IsS0FBSyxTQUFTLEtBQUssSUFBSTtBQUU5QyxZQUFRLElBQUksbUJBQW1CLEtBQUssZUFBZTtBQUduRCxXQUFPLGlCQUFpQixVQUFVLEtBQUssaUJBQWlCLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFHekUsU0FBSyxZQUFZO0FBQUEsRUFDbkI7QUFBQSxFQUVBLHVCQUF1QjtBQUNyQixXQUFPLG9CQUFvQixVQUFVLEtBQUssZUFBZTtBQUFBLEVBQzNEO0FBQUEsRUFFQSxXQUFXO0FBQ1QsU0FBSyxZQUFZO0FBQUEsRUFDbkI7QUFBQSxFQUVBLGNBQWM7QUFDWixRQUFJLENBQUMsS0FBSyxTQUFTO0FBQ2pCLDRCQUFzQixNQUFNO0FBQzFCLGFBQUssYUFBYTtBQUNsQixhQUFLLFVBQVU7QUFBQSxNQUNqQixDQUFDO0FBQ0QsV0FBSyxVQUFVO0FBQUEsSUFDakI7QUFBQSxFQUNGO0FBQUEsRUFFQSxlQUFlO0FBQ2IsVUFBTSxZQUFZLE9BQU8sZUFBZSxTQUFTLGdCQUFnQjtBQUVqRSxRQUFJLFlBQVksS0FBSyxpQkFBaUI7QUFDcEMsV0FBSyxRQUFRLFVBQVUsSUFBSSxVQUFVO0FBQUEsSUFDdkMsT0FBTztBQUNMLFdBQUssUUFBUSxVQUFVLE9BQU8sVUFBVTtBQUFBLElBQzFDO0FBQUEsRUFDRjtBQUNGO0FBQ0EsSUFBSSxDQUFDLGVBQWUsSUFBSSxlQUFlLEdBQUc7QUFDeEMsaUJBQWUsT0FBTyxpQkFBaUIsWUFBWTtBQUNyRDsiLCJuYW1lcyI6W10sImZpbGUiOiIuL3NyYy9lbnRyeXBvaW50cy9uYXYuanMiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/entrypoints/nav.js\n\n}");

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