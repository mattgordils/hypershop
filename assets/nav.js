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

eval("{const scrollThreshold = 40;\nclass StickyHeader extends HTMLElement {\n  constructor() {\n    super();\n    this.scrollThreshold = 40;\n    this.ticking = false;\n  }\n  connectedCallback() {\n    this.header = document.querySelector(\".section-header:has(sticky-header)\");\n    this.scrollThreshold = document.querySelector(\".section-notification-banner\")?.offsetHeight || 40;\n    this.headerBounds = {};\n    this.onScrollHandler = this.onScroll.bind(this);\n    console.log(\"scrollThreshold\", this.scrollThreshold);\n    window.addEventListener(\"scroll\", this.onScrollHandler, { passive: true });\n    this.requestTick();\n  }\n  disconnectedCallback() {\n    window.removeEventListener(\"scroll\", this.onScrollHandler);\n  }\n  onScroll() {\n    this.requestTick();\n  }\n  requestTick() {\n    if (!this.ticking) {\n      requestAnimationFrame(() => {\n        this.updateHeader();\n        this.ticking = false;\n      });\n      this.ticking = true;\n    }\n  }\n  updateHeader() {\n    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;\n    if (scrollTop > this.scrollThreshold) {\n      this.header?.classList.add(\"scrolled\");\n    } else {\n      this.header?.classList.remove(\"scrolled\");\n    }\n  }\n}\nif (!customElements.get(\"sticky-header\")) {\n  customElements.define(\"sticky-header\", StickyHeader);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3RhbC1jb250cm9sLy4vc3JjL2VudHJ5cG9pbnRzL25hdi5qcz82YTcyIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNjcm9sbFRocmVzaG9sZCA9IDQwO1xuXG5jbGFzcyBTdGlja3lIZWFkZXIgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zY3JvbGxUaHJlc2hvbGQgPSA0MDtcbiAgICB0aGlzLnRpY2tpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24taGVhZGVyOmhhcyhzdGlja3ktaGVhZGVyKScpO1xuICAgIHRoaXMuc2Nyb2xsVGhyZXNob2xkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tbm90aWZpY2F0aW9uLWJhbm5lcicpPy5vZmZzZXRIZWlnaHQgfHwgNDA7XG4gICAgdGhpcy5oZWFkZXJCb3VuZHMgPSB7fTtcbiAgICB0aGlzLm9uU2Nyb2xsSGFuZGxlciA9IHRoaXMub25TY3JvbGwuYmluZCh0aGlzKTtcblxuICAgIGNvbnNvbGUubG9nKCdzY3JvbGxUaHJlc2hvbGQnLCB0aGlzLnNjcm9sbFRocmVzaG9sZClcblxuICAgIC8vIFVzZSBwYXNzaXZlIGxpc3RlbmVyIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbEhhbmRsZXIsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAgIC8vIFNldCBpbml0aWFsIHN0YXRlXG4gICAgdGhpcy5yZXF1ZXN0VGljaygpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGxIYW5kbGVyKTtcbiAgfVxuXG4gIG9uU2Nyb2xsKCkge1xuICAgIHRoaXMucmVxdWVzdFRpY2soKTtcbiAgfVxuXG4gIHJlcXVlc3RUaWNrKCkge1xuICAgIGlmICghdGhpcy50aWNraW5nKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlcigpO1xuICAgICAgICB0aGlzLnRpY2tpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy50aWNraW5nID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVIZWFkZXIoKSB7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cbiAgICBpZiAoc2Nyb2xsVG9wID4gdGhpcy5zY3JvbGxUaHJlc2hvbGQpIHtcbiAgICAgIHRoaXMuaGVhZGVyPy5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlYWRlcj8uY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsZWQnKTtcbiAgICB9XG4gIH1cbn1cbmlmICghY3VzdG9tRWxlbWVudHMuZ2V0KCdzdGlja3ktaGVhZGVyJykpIHtcbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdzdGlja3ktaGVhZGVyJywgU3RpY2t5SGVhZGVyKTtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxrQkFBa0I7QUFFeEIsTUFBTSxxQkFBcUIsWUFBWTtBQUFBLEVBQ3JDLGNBQWM7QUFDWixVQUFNO0FBQ04sU0FBSyxrQkFBa0I7QUFDdkIsU0FBSyxVQUFVO0FBQUEsRUFDakI7QUFBQSxFQUVBLG9CQUFvQjtBQUNsQixTQUFLLFNBQVMsU0FBUyxjQUFjLG9DQUFvQztBQUN6RSxTQUFLLGtCQUFrQixTQUFTLGNBQWMsOEJBQThCLEdBQUcsZ0JBQWdCO0FBQy9GLFNBQUssZUFBZSxDQUFDO0FBQ3JCLFNBQUssa0JBQWtCLEtBQUssU0FBUyxLQUFLLElBQUk7QUFFOUMsWUFBUSxJQUFJLG1CQUFtQixLQUFLLGVBQWU7QUFHbkQsV0FBTyxpQkFBaUIsVUFBVSxLQUFLLGlCQUFpQixFQUFFLFNBQVMsS0FBSyxDQUFDO0FBR3pFLFNBQUssWUFBWTtBQUFBLEVBQ25CO0FBQUEsRUFFQSx1QkFBdUI7QUFDckIsV0FBTyxvQkFBb0IsVUFBVSxLQUFLLGVBQWU7QUFBQSxFQUMzRDtBQUFBLEVBRUEsV0FBVztBQUNULFNBQUssWUFBWTtBQUFBLEVBQ25CO0FBQUEsRUFFQSxjQUFjO0FBQ1osUUFBSSxDQUFDLEtBQUssU0FBUztBQUNqQiw0QkFBc0IsTUFBTTtBQUMxQixhQUFLLGFBQWE7QUFDbEIsYUFBSyxVQUFVO0FBQUEsTUFDakIsQ0FBQztBQUNELFdBQUssVUFBVTtBQUFBLElBQ2pCO0FBQUEsRUFDRjtBQUFBLEVBRUEsZUFBZTtBQUNiLFVBQU0sWUFBWSxPQUFPLGVBQWUsU0FBUyxnQkFBZ0I7QUFFakUsUUFBSSxZQUFZLEtBQUssaUJBQWlCO0FBQ3BDLFdBQUssUUFBUSxVQUFVLElBQUksVUFBVTtBQUFBLElBQ3ZDLE9BQU87QUFDTCxXQUFLLFFBQVEsVUFBVSxPQUFPLFVBQVU7QUFBQSxJQUMxQztBQUFBLEVBQ0Y7QUFDRjtBQUNBLElBQUksQ0FBQyxlQUFlLElBQUksZUFBZSxHQUFHO0FBQ3hDLGlCQUFlLE9BQU8saUJBQWlCLFlBQVk7QUFDckQ7IiwibmFtZXMiOltdLCJmaWxlIjoiLi9zcmMvZW50cnlwb2ludHMvbmF2LmpzIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/entrypoints/nav.js\n\n}");

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