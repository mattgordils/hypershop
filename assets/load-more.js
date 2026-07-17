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

/***/ "./src/entrypoints/load-more.js"
/*!**************************************!*\
  !*** ./src/entrypoints/load-more.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_grid_pagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/grid-pagination */ \"./src/lib/grid-pagination.js\");\n\nif (!customElements.get(\"load-more\")) {\n  customElements.define(\n    \"load-more\",\n    class LoadMore extends HTMLElement {\n      connectedCallback() {\n        this.button = this.querySelector(\"button\");\n        this.sectionId = this.dataset.sectionId;\n        this.button?.addEventListener(\"click\", this.loadMore.bind(this));\n      }\n      async loadMore() {\n        const nextUrl = this.dataset.gridNext;\n        if (!nextUrl)\n          return;\n        const grid = document.querySelector(\n          `#shopify-section-${this.sectionId} .product-grid__grid`\n        );\n        if (!grid)\n          return;\n        this.button.disabled = true;\n        this.button.classList.add(\"opacity-50\");\n        try {\n          const followingUrl = await (0,_lib_grid_pagination__WEBPACK_IMPORTED_MODULE_0__.appendNextPage)(nextUrl, this.sectionId, grid);\n          if (followingUrl) {\n            this.dataset.gridNext = followingUrl;\n            this.button.disabled = false;\n            this.button.classList.remove(\"opacity-50\");\n          } else {\n            this.remove();\n          }\n        } catch (error) {\n          console.error(\"Load more error:\", error);\n          this.button.disabled = false;\n          this.button.classList.remove(\"opacity-50\");\n        }\n      }\n    }\n  );\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZW50cnlwb2ludHMvbG9hZC1tb3JlLmpzIiwibWFwcGluZ3MiOiI7O0FBQStCO0FBRy9CLElBQUksQ0FBQyxlQUFlLElBQUksV0FBVyxHQUFHO0FBQ3BDLGlCQUFlO0FBQUEsSUFDYjtBQUFBLElBQ0EsTUFBTSxpQkFBaUIsWUFBWTtBQUFBLE1BQ2pDLG9CQUFvQjtBQUNsQixhQUFLLFNBQVMsS0FBSyxjQUFjLFFBQVE7QUFDekMsYUFBSyxZQUFZLEtBQUssUUFBUTtBQUM5QixhQUFLLFFBQVEsaUJBQWlCLFNBQVMsS0FBSyxTQUFTLEtBQUssSUFBSSxDQUFDO0FBQUEsTUFDakU7QUFBQSxNQUVBLE1BQU0sV0FBVztBQUNmLGNBQU0sVUFBVSxLQUFLLFFBQVE7QUFDN0IsWUFBSSxDQUFDO0FBQVM7QUFFZCxjQUFNLE9BQU8sU0FBUztBQUFBLFVBQ3BCLG9CQUFvQixLQUFLO0FBQUEsUUFDM0I7QUFDQSxZQUFJLENBQUM7QUFBTTtBQUVYLGFBQUssT0FBTyxXQUFXO0FBQ3ZCLGFBQUssT0FBTyxVQUFVLElBQUksWUFBWTtBQUV0QyxZQUFJO0FBQ0YsZ0JBQU0sZUFBZSxNQUFNLG9FQUFjLENBQUMsU0FBUyxLQUFLLFdBQVcsSUFBSTtBQUN2RSxjQUFJLGNBQWM7QUFDaEIsaUJBQUssUUFBUSxXQUFXO0FBQ3hCLGlCQUFLLE9BQU8sV0FBVztBQUN2QixpQkFBSyxPQUFPLFVBQVUsT0FBTyxZQUFZO0FBQUEsVUFDM0MsT0FBTztBQUVMLGlCQUFLLE9BQU87QUFBQSxVQUNkO0FBQUEsUUFDRixTQUFTLE9BQVA7QUFDQSxrQkFBUSxNQUFNLG9CQUFvQixLQUFLO0FBQ3ZDLGVBQUssT0FBTyxXQUFXO0FBQ3ZCLGVBQUssT0FBTyxVQUFVLE9BQU8sWUFBWTtBQUFBLFFBQzNDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3RhbC1jb250cm9sLy4vc3JjL2VudHJ5cG9pbnRzL2xvYWQtbW9yZS5qcz82YzZmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFwcGVuZE5leHRQYWdlIH0gZnJvbSAnLi4vbGliL2dyaWQtcGFnaW5hdGlvbidcblxuLy8gTG9hZGVkIG9ubHkgd2hlbiBhIHByb2R1Y3QgZ3JpZCdzIHBhZ2luYXRpb24gc3R5bGUgaXMgXCJMb2FkIG1vcmUgYnV0dG9uXCIuXG5pZiAoIWN1c3RvbUVsZW1lbnRzLmdldCgnbG9hZC1tb3JlJykpIHtcbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKFxuICAgICdsb2FkLW1vcmUnLFxuICAgIGNsYXNzIExvYWRNb3JlIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKVxuICAgICAgICB0aGlzLnNlY3Rpb25JZCA9IHRoaXMuZGF0YXNldC5zZWN0aW9uSWRcbiAgICAgICAgdGhpcy5idXR0b24/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5sb2FkTW9yZS5iaW5kKHRoaXMpKVxuICAgICAgfVxuXG4gICAgICBhc3luYyBsb2FkTW9yZSgpIHtcbiAgICAgICAgY29uc3QgbmV4dFVybCA9IHRoaXMuZGF0YXNldC5ncmlkTmV4dFxuICAgICAgICBpZiAoIW5leHRVcmwpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAjc2hvcGlmeS1zZWN0aW9uLSR7dGhpcy5zZWN0aW9uSWR9IC5wcm9kdWN0LWdyaWRfX2dyaWRgXG4gICAgICAgIClcbiAgICAgICAgaWYgKCFncmlkKSByZXR1cm5cblxuICAgICAgICB0aGlzLmJ1dHRvbi5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgdGhpcy5idXR0b24uY2xhc3NMaXN0LmFkZCgnb3BhY2l0eS01MCcpXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBmb2xsb3dpbmdVcmwgPSBhd2FpdCBhcHBlbmROZXh0UGFnZShuZXh0VXJsLCB0aGlzLnNlY3Rpb25JZCwgZ3JpZClcbiAgICAgICAgICBpZiAoZm9sbG93aW5nVXJsKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXQuZ3JpZE5leHQgPSBmb2xsb3dpbmdVcmxcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmRpc2FibGVkID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ29wYWNpdHktNTAnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBObyBtb3JlIHBhZ2VzXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0xvYWQgbW9yZSBlcnJvcjonLCBlcnJvcilcbiAgICAgICAgICB0aGlzLmJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5idXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnb3BhY2l0eS01MCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIClcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/entrypoints/load-more.js\n\n}");

/***/ },

/***/ "./src/lib/grid-pagination.js"
/*!************************************!*\
  !*** ./src/lib/grid-pagination.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   appendNextPage: () => (/* binding */ appendNextPage)\n/* harmony export */ });\nasync function appendNextPage(nextUrl, sectionId, grid) {\n  if (!nextUrl || !grid)\n    return null;\n  const url = new URL(nextUrl, window.location.origin);\n  url.searchParams.set(\"sections\", sectionId);\n  const response = await fetch(url.pathname + url.search);\n  if (!response.ok)\n    throw new Error(`HTTP ${response.status}`);\n  const data = await response.json();\n  const html = data[sectionId];\n  if (!html)\n    return null;\n  const doc = new DOMParser().parseFromString(html, \"text/html\");\n  const newGrid = doc.querySelector(\".product-grid__grid\");\n  if (!newGrid)\n    return null;\n  const fragment = document.createDocumentFragment();\n  for (const child of newGrid.children) {\n    if (!child.classList.contains(\"product-grid__promo\")) {\n      fragment.appendChild(child.cloneNode(true));\n    }\n  }\n  grid.appendChild(fragment);\n  const nextControl = doc.querySelector(\"[data-grid-next]\");\n  return nextControl ? nextControl.getAttribute(\"data-grid-next\") : null;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGliL2dyaWQtcGFnaW5hdGlvbi5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBV08sZUFBZSxlQUFlLFNBQVMsV0FBVyxNQUFNO0FBQzdELE1BQUksQ0FBQyxXQUFXLENBQUM7QUFBTSxXQUFPO0FBRTlCLFFBQU0sTUFBTSxJQUFJLElBQUksU0FBUyxPQUFPLFNBQVMsTUFBTTtBQUNuRCxNQUFJLGFBQWEsSUFBSSxZQUFZLFNBQVM7QUFFMUMsUUFBTSxXQUFXLE1BQU0sTUFBTSxJQUFJLFdBQVcsSUFBSSxNQUFNO0FBQ3RELE1BQUksQ0FBQyxTQUFTO0FBQUksVUFBTSxJQUFJLE1BQU0sUUFBUSxTQUFTLFFBQVE7QUFFM0QsUUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQ2pDLFFBQU0sT0FBTyxLQUFLLFNBQVM7QUFDM0IsTUFBSSxDQUFDO0FBQU0sV0FBTztBQUVsQixRQUFNLE1BQU0sSUFBSSxVQUFVLEVBQUUsZ0JBQWdCLE1BQU0sV0FBVztBQUM3RCxRQUFNLFVBQVUsSUFBSSxjQUFjLHFCQUFxQjtBQUN2RCxNQUFJLENBQUM7QUFBUyxXQUFPO0FBRXJCLFFBQU0sV0FBVyxTQUFTLHVCQUF1QjtBQUNqRCxhQUFXLFNBQVMsUUFBUSxVQUFVO0FBQ3BDLFFBQUksQ0FBQyxNQUFNLFVBQVUsU0FBUyxxQkFBcUIsR0FBRztBQUNwRCxlQUFTLFlBQVksTUFBTSxVQUFVLElBQUksQ0FBQztBQUFBLElBQzVDO0FBQUEsRUFDRjtBQUNBLE9BQUssWUFBWSxRQUFRO0FBRXpCLFFBQU0sY0FBYyxJQUFJLGNBQWMsa0JBQWtCO0FBQ3hELFNBQU8sY0FBYyxZQUFZLGFBQWEsZ0JBQWdCLElBQUk7QUFDcEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b3RhbC1jb250cm9sLy4vc3JjL2xpYi9ncmlkLXBhZ2luYXRpb24uanM/ZmVkYyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFNoYXJlZCBoZWxwZXIgZm9yIFwiTG9hZCBtb3JlXCIgYW5kIFwiSW5maW5pdGUgc2Nyb2xsXCIgb24gdGhlIHByb2R1Y3QgZ3JpZC5cbiAqIEZldGNoZXMgdGhlIG5leHQgcmVzdWx0cyBwYWdlIHZpYSB0aGUgU2VjdGlvbiBSZW5kZXJpbmcgQVBJIGFuZCBhcHBlbmRzIGl0c1xuICogcHJvZHVjdCBjYXJkcyB0byB0aGUgY3VycmVudCBncmlkLiBQcm9tbyBjYXJkcyBhcmUgc2tpcHBlZCAodGhleSBiZWxvbmcgdG9cbiAqIHRoZSBmaXJzdCBwYWdlIG9ubHkpLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuZXh0VXJsIC0gcGFnaW5hdGUubmV4dC51cmwgKGFscmVhZHkgY2FycmllcyBwYWdlICsgZmlsdGVycy9xKVxuICogQHBhcmFtIHtzdHJpbmd9IHNlY3Rpb25JZCAtIHRoZSBzZWN0aW9uIGlkIChTZWN0aW9uIFJlbmRlcmluZyBBUEkga2V5ICsgc2NvcGUpXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBncmlkIC0gdGhlIC5wcm9kdWN0LWdyaWRfX2dyaWQgdG8gYXBwZW5kIGludG9cbiAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZ3xudWxsPn0gdGhlIGZvbGxvd2luZyBwYWdlJ3MgVVJMLCBvciBudWxsIHdoZW4gZmluaXNoZWRcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFwcGVuZE5leHRQYWdlKG5leHRVcmwsIHNlY3Rpb25JZCwgZ3JpZCkge1xuICBpZiAoIW5leHRVcmwgfHwgIWdyaWQpIHJldHVybiBudWxsXG5cbiAgY29uc3QgdXJsID0gbmV3IFVSTChuZXh0VXJsLCB3aW5kb3cubG9jYXRpb24ub3JpZ2luKVxuICB1cmwuc2VhcmNoUGFyYW1zLnNldCgnc2VjdGlvbnMnLCBzZWN0aW9uSWQpXG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwucGF0aG5hbWUgKyB1cmwuc2VhcmNoKVxuICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9YClcblxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gIGNvbnN0IGh0bWwgPSBkYXRhW3NlY3Rpb25JZF1cbiAgaWYgKCFodG1sKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ3RleHQvaHRtbCcpXG4gIGNvbnN0IG5ld0dyaWQgPSBkb2MucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtZ3JpZF9fZ3JpZCcpXG4gIGlmICghbmV3R3JpZCkgcmV0dXJuIG51bGxcblxuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5ld0dyaWQuY2hpbGRyZW4pIHtcbiAgICBpZiAoIWNoaWxkLmNsYXNzTGlzdC5jb250YWlucygncHJvZHVjdC1ncmlkX19wcm9tbycpKSB7XG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjaGlsZC5jbG9uZU5vZGUodHJ1ZSkpXG4gICAgfVxuICB9XG4gIGdyaWQuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG5cbiAgY29uc3QgbmV4dENvbnRyb2wgPSBkb2MucXVlcnlTZWxlY3RvcignW2RhdGEtZ3JpZC1uZXh0XScpXG4gIHJldHVybiBuZXh0Q29udHJvbCA/IG5leHRDb250cm9sLmdldEF0dHJpYnV0ZSgnZGF0YS1ncmlkLW5leHQnKSA6IG51bGxcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/lib/grid-pagination.js\n\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/entrypoints/load-more.js");
/******/ 	
/******/ })()
;