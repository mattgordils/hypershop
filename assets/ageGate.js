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

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

eval("!function(t, e) {\n   true ? module.exports = e() : 0;\n}(this, function() {\n  \"use strict\";\n  var t = 1e3, e = 6e4, n = 36e5, r = \"millisecond\", i = \"second\", s = \"minute\", u = \"hour\", a = \"day\", o = \"week\", c = \"month\", f = \"quarter\", h = \"year\", d = \"date\", l = \"Invalid Date\", $ = /^(\\d{4})[-/]?(\\d{1,2})?[-/]?(\\d{0,2})[Tt\\s]*(\\d{1,2})?:?(\\d{1,2})?:?(\\d{1,2})?[.:]?(\\d+)?$/, y = /\\[([^\\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: \"en\", weekdays: \"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday\".split(\"_\"), months: \"January_February_March_April_May_June_July_August_September_October_November_December\".split(\"_\"), ordinal: function(t2) {\n    var e2 = [\"th\", \"st\", \"nd\", \"rd\"], n2 = t2 % 100;\n    return \"[\" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + \"]\";\n  } }, m = function(t2, e2, n2) {\n    var r2 = String(t2);\n    return !r2 || r2.length >= e2 ? t2 : \"\" + Array(e2 + 1 - r2.length).join(n2) + t2;\n  }, v = { s: m, z: function(t2) {\n    var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;\n    return (e2 <= 0 ? \"+\" : \"-\") + m(r2, 2, \"0\") + \":\" + m(i2, 2, \"0\");\n  }, m: function t2(e2, n2) {\n    if (e2.date() < n2.date())\n      return -t2(n2, e2);\n    var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);\n    return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);\n  }, a: function(t2) {\n    return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);\n  }, p: function(t2) {\n    return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || \"\").toLowerCase().replace(/s$/, \"\");\n  }, u: function(t2) {\n    return t2 === void 0;\n  } }, g = \"en\", D = {};\n  D[g] = M;\n  var p = function(t2) {\n    return t2 instanceof b;\n  }, S = function t2(e2, n2, r2) {\n    var i2;\n    if (!e2)\n      return g;\n    if (typeof e2 == \"string\") {\n      var s2 = e2.toLowerCase();\n      D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);\n      var u2 = e2.split(\"-\");\n      if (!i2 && u2.length > 1)\n        return t2(u2[0]);\n    } else {\n      var a2 = e2.name;\n      D[a2] = e2, i2 = a2;\n    }\n    return !r2 && i2 && (g = i2), i2 || !r2 && g;\n  }, w = function(t2, e2) {\n    if (p(t2))\n      return t2.clone();\n    var n2 = typeof e2 == \"object\" ? e2 : {};\n    return n2.date = t2, n2.args = arguments, new b(n2);\n  }, O = v;\n  O.l = S, O.i = p, O.w = function(t2, e2) {\n    return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });\n  };\n  var b = function() {\n    function M2(t2) {\n      this.$L = S(t2.locale, null, true), this.parse(t2);\n    }\n    var m2 = M2.prototype;\n    return m2.parse = function(t2) {\n      this.$d = function(t3) {\n        var e2 = t3.date, n2 = t3.utc;\n        if (e2 === null)\n          return new Date(NaN);\n        if (O.u(e2))\n          return new Date();\n        if (e2 instanceof Date)\n          return new Date(e2);\n        if (typeof e2 == \"string\" && !/Z$/i.test(e2)) {\n          var r2 = e2.match($);\n          if (r2) {\n            var i2 = r2[2] - 1 || 0, s2 = (r2[7] || \"0\").substring(0, 3);\n            return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);\n          }\n        }\n        return new Date(e2);\n      }(t2), this.$x = t2.x || {}, this.init();\n    }, m2.init = function() {\n      var t2 = this.$d;\n      this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();\n    }, m2.$utils = function() {\n      return O;\n    }, m2.isValid = function() {\n      return !(this.$d.toString() === l);\n    }, m2.isSame = function(t2, e2) {\n      var n2 = w(t2);\n      return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);\n    }, m2.isAfter = function(t2, e2) {\n      return w(t2) < this.startOf(e2);\n    }, m2.isBefore = function(t2, e2) {\n      return this.endOf(e2) < w(t2);\n    }, m2.$g = function(t2, e2, n2) {\n      return O.u(t2) ? this[e2] : this.set(n2, t2);\n    }, m2.unix = function() {\n      return Math.floor(this.valueOf() / 1e3);\n    }, m2.valueOf = function() {\n      return this.$d.getTime();\n    }, m2.startOf = function(t2, e2) {\n      var n2 = this, r2 = !!O.u(e2) || e2, f2 = O.p(t2), l2 = function(t3, e3) {\n        var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);\n        return r2 ? i2 : i2.endOf(a);\n      }, $2 = function(t3, e3) {\n        return O.w(n2.toDate()[t3].apply(n2.toDate(\"s\"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);\n      }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = \"set\" + (this.$u ? \"UTC\" : \"\");\n      switch (f2) {\n        case h:\n          return r2 ? l2(1, 0) : l2(31, 11);\n        case c:\n          return r2 ? l2(1, M3) : l2(0, M3 + 1);\n        case o:\n          var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;\n          return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);\n        case a:\n        case d:\n          return $2(v2 + \"Hours\", 0);\n        case u:\n          return $2(v2 + \"Minutes\", 1);\n        case s:\n          return $2(v2 + \"Seconds\", 2);\n        case i:\n          return $2(v2 + \"Milliseconds\", 3);\n        default:\n          return this.clone();\n      }\n    }, m2.endOf = function(t2) {\n      return this.startOf(t2, false);\n    }, m2.$set = function(t2, e2) {\n      var n2, o2 = O.p(t2), f2 = \"set\" + (this.$u ? \"UTC\" : \"\"), l2 = (n2 = {}, n2[a] = f2 + \"Date\", n2[d] = f2 + \"Date\", n2[c] = f2 + \"Month\", n2[h] = f2 + \"FullYear\", n2[u] = f2 + \"Hours\", n2[s] = f2 + \"Minutes\", n2[i] = f2 + \"Seconds\", n2[r] = f2 + \"Milliseconds\", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;\n      if (o2 === c || o2 === h) {\n        var y2 = this.clone().set(d, 1);\n        y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;\n      } else\n        l2 && this.$d[l2]($2);\n      return this.init(), this;\n    }, m2.set = function(t2, e2) {\n      return this.clone().$set(t2, e2);\n    }, m2.get = function(t2) {\n      return this[O.p(t2)]();\n    }, m2.add = function(r2, f2) {\n      var d2, l2 = this;\n      r2 = Number(r2);\n      var $2 = O.p(f2), y2 = function(t2) {\n        var e2 = w(l2);\n        return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);\n      };\n      if ($2 === c)\n        return this.set(c, this.$M + r2);\n      if ($2 === h)\n        return this.set(h, this.$y + r2);\n      if ($2 === a)\n        return y2(1);\n      if ($2 === o)\n        return y2(7);\n      var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;\n      return O.w(m3, this);\n    }, m2.subtract = function(t2, e2) {\n      return this.add(-1 * t2, e2);\n    }, m2.format = function(t2) {\n      var e2 = this, n2 = this.$locale();\n      if (!this.isValid())\n        return n2.invalidDate || l;\n      var r2 = t2 || \"YYYY-MM-DDTHH:mm:ssZ\", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {\n        return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);\n      }, d2 = function(t3) {\n        return O.s(s2 % 12 || 12, t3, \"0\");\n      }, $2 = f2 || function(t3, e3, n3) {\n        var r3 = t3 < 12 ? \"AM\" : \"PM\";\n        return n3 ? r3.toLowerCase() : r3;\n      };\n      return r2.replace(y, function(t3, r3) {\n        return r3 || function(t4) {\n          switch (t4) {\n            case \"YY\":\n              return String(e2.$y).slice(-2);\n            case \"YYYY\":\n              return O.s(e2.$y, 4, \"0\");\n            case \"M\":\n              return a2 + 1;\n            case \"MM\":\n              return O.s(a2 + 1, 2, \"0\");\n            case \"MMM\":\n              return h2(n2.monthsShort, a2, c2, 3);\n            case \"MMMM\":\n              return h2(c2, a2);\n            case \"D\":\n              return e2.$D;\n            case \"DD\":\n              return O.s(e2.$D, 2, \"0\");\n            case \"d\":\n              return String(e2.$W);\n            case \"dd\":\n              return h2(n2.weekdaysMin, e2.$W, o2, 2);\n            case \"ddd\":\n              return h2(n2.weekdaysShort, e2.$W, o2, 3);\n            case \"dddd\":\n              return o2[e2.$W];\n            case \"H\":\n              return String(s2);\n            case \"HH\":\n              return O.s(s2, 2, \"0\");\n            case \"h\":\n              return d2(1);\n            case \"hh\":\n              return d2(2);\n            case \"a\":\n              return $2(s2, u2, true);\n            case \"A\":\n              return $2(s2, u2, false);\n            case \"m\":\n              return String(u2);\n            case \"mm\":\n              return O.s(u2, 2, \"0\");\n            case \"s\":\n              return String(e2.$s);\n            case \"ss\":\n              return O.s(e2.$s, 2, \"0\");\n            case \"SSS\":\n              return O.s(e2.$ms, 3, \"0\");\n            case \"Z\":\n              return i2;\n          }\n          return null;\n        }(t3) || i2.replace(\":\", \"\");\n      });\n    }, m2.utcOffset = function() {\n      return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);\n    }, m2.diff = function(r2, d2, l2) {\n      var $2, y2 = this, M3 = O.p(d2), m3 = w(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {\n        return O.m(y2, m3);\n      };\n      switch (M3) {\n        case h:\n          $2 = D2() / 12;\n          break;\n        case c:\n          $2 = D2();\n          break;\n        case f:\n          $2 = D2() / 3;\n          break;\n        case o:\n          $2 = (g2 - v2) / 6048e5;\n          break;\n        case a:\n          $2 = (g2 - v2) / 864e5;\n          break;\n        case u:\n          $2 = g2 / n;\n          break;\n        case s:\n          $2 = g2 / e;\n          break;\n        case i:\n          $2 = g2 / t;\n          break;\n        default:\n          $2 = g2;\n      }\n      return l2 ? $2 : O.a($2);\n    }, m2.daysInMonth = function() {\n      return this.endOf(c).$D;\n    }, m2.$locale = function() {\n      return D[this.$L];\n    }, m2.locale = function(t2, e2) {\n      if (!t2)\n        return this.$L;\n      var n2 = this.clone(), r2 = S(t2, e2, true);\n      return r2 && (n2.$L = r2), n2;\n    }, m2.clone = function() {\n      return O.w(this.$d, this);\n    }, m2.toDate = function() {\n      return new Date(this.valueOf());\n    }, m2.toJSON = function() {\n      return this.isValid() ? this.toISOString() : null;\n    }, m2.toISOString = function() {\n      return this.$d.toISOString();\n    }, m2.toString = function() {\n      return this.$d.toUTCString();\n    }, M2;\n  }(), _ = b.prototype;\n  return w.prototype = _, [[\"$ms\", r], [\"$s\", i], [\"$m\", s], [\"$H\", u], [\"$W\", a], [\"$M\", c], [\"$y\", h], [\"$D\", d]].forEach(function(t2) {\n    _[t2[1]] = function(e2) {\n      return this.$g(e2, t2[0], t2[1]);\n    };\n  }), w.extend = function(t2, e2) {\n    return t2.$i || (t2(e2, b, w), t2.$i = true), w;\n  }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {\n    return w(1e3 * t2);\n  }, w.en = D[g], w.Ls = D, w.p = {}, w;\n});\n\n\n//# sourceURL=webpack://shopify-starter/./node_modules/dayjs/dayjs.min.js?");

/***/ }),

/***/ "./src/entrypoints/ageGate.js":
/*!************************************!*\
  !*** ./src/entrypoints/ageGate.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ \"./src/entrypoints/modal.js\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ \"./node_modules/dayjs/dayjs.min.js\");\n/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nif (!customElements.get(\"age-gate\")) {\n  customElements.define(\"age-gate\", class AgeGate extends HTMLElement {\n    constructor() {\n      super();\n      this.ageYes = this.querySelector(\"#ageYes\");\n      this.ageYes.addEventListener(\"click\", this.setCookie);\n      this.expirationLimit = this.dataset.expire;\n      this.openAgegate();\n    }\n    openAgegate() {\n      const expirationLimit = this.expirationLimit || 2;\n      const ageTimestamp = localStorage.getItem(\"legalAgeTimestamp\");\n      const tokenAge = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(Date()).diff(dayjs__WEBPACK_IMPORTED_MODULE_1___default()(ageTimestamp), \"day\", true);\n      if (!ageTimestamp || tokenAge > expirationLimit) {\n        localStorage.removeItem(\"legalAgeTimestamp\");\n        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(\"ageGate\");\n      }\n    }\n    setCookie() {\n      localStorage.setItem(\"legalAgeTimestamp\", new Date());\n      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)();\n    }\n  });\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/ageGate.js?");

/***/ }),

/***/ "./src/entrypoints/eventbus.js":
/*!*************************************!*\
  !*** ./src/entrypoints/eventbus.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EventBus)\n/* harmony export */ });\nclass EventBus {\n  constructor() {\n    this.bus = document.createElement(\"event-bus\");\n  }\n  addEventListener(event, callback) {\n    this.bus.addEventListener(event, callback);\n  }\n  removeEventListener(event, callback) {\n    this.bus.removeEventListener(event, callback);\n  }\n  dispatchEvent(event, detail = {}) {\n    this.bus.dispatchEvent(new CustomEvent(event, { detail }));\n  }\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/eventbus.js?");

/***/ }),

/***/ "./src/entrypoints/modal.js":
/*!**********************************!*\
  !*** ./src/entrypoints/modal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"closeModal\": () => (/* binding */ closeModal),\n/* harmony export */   \"openModal\": () => (/* binding */ openModal)\n/* harmony export */ });\n/* harmony import */ var _eventbus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventbus */ \"./src/entrypoints/eventbus.js\");\n\nwindow.EventBus = new _eventbus__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst setModalState = (event) => {\n  const activeModal = document.querySelector(\"modal-component#\" + event.detail);\n  if (activeModal) {\n    if (activeModal.classList.contains(\"open\")) {\n      return;\n    } else {\n      activeModal.classList.add(\"open\", \"animating\");\n      activeModal.classList.add(\"animating\");\n    }\n  } else {\n    const modals = document.querySelectorAll(\"modal-component\");\n    modals.forEach((modal) => {\n      modal.classList.remove(\"open\");\n      modal.classList.add(\"animating\");\n      setTimeout(() => {\n        modal.classList.remove(\"animating\");\n      }, 500);\n    });\n  }\n};\nwindow.EventBus.addEventListener(\"setModal\", setModalState);\nconst closeModal = (id) => {\n  let body = document.querySelector(\"body\");\n  body.setAttribute(\"data-state-cart\", \"closed\");\n  window.EventBus.dispatchEvent(\"setModal\", \"false\");\n};\nconst openModal = (id) => {\n  if (id) {\n    if (id === \"cartDrawer\") {\n      console.log(\"OPEN CART\");\n      let body = document.querySelector(\"body\");\n      body.setAttribute(\"data-state-cart\", \"open\");\n    }\n    window.EventBus.dispatchEvent(\"setModal\", id);\n  }\n};\nclass Modal extends HTMLElement {\n  constructor() {\n    super();\n    this.closeButtons = this.querySelectorAll(\"#closeModal\");\n    this.closeButtons.forEach((item) => {\n      item.addEventListener(\"click\", (event) => {\n        closeModal();\n      });\n    });\n  }\n}\nif (!customElements.get(\"modal-component\")) {\n  customElements.define(\"modal-component\", Modal);\n}\nclass ModalTrigger extends HTMLElement {\n  constructor() {\n    super();\n    this.addEventListener(\"click\", (event) => {\n      const modalId = this.dataset.modalId;\n      if (modalId) {\n        openModal(modalId);\n      } else {\n        closeModal();\n      }\n    });\n  }\n}\nif (!customElements.get(\"modal-trigger\")) {\n  customElements.define(\"modal-trigger\", ModalTrigger);\n}\n\n\n//# sourceURL=webpack://shopify-starter/./src/entrypoints/modal.js?");

/***/ })

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/entrypoints/ageGate.js");
/******/ 	
/******/ })()
;