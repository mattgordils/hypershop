(()=>{"use strict";var e={664:(e,t,s)=>{s.d(t,{Z:()=>o});class o{constructor(){this.bus=document.createElement("event-bus")}addEventListener(e,t){this.bus.addEventListener(e,t)}removeEventListener(e,t){this.bus.removeEventListener(e,t)}dispatchEvent(e,t={}){this.bus.dispatchEvent(new CustomEvent(e,{detail:t}))}}},956:(e,t,s)=>{s.d(t,{M:()=>n,h:()=>c});var o=s(664);window.EventBus=new o.Z,window.EventBus.addEventListener("setModal",(e=>{const t=document.querySelector("modal-component#"+e.detail);t?t.classList.contains("open")?(t.classList.remove("open"),setTimeout((()=>{t.classList.remove("animating")}),500)):(t.classList.add("open","animating"),t.classList.add("animating")):document.querySelectorAll("modal-component").forEach((e=>{e.classList.remove("open"),e.classList.add("animating"),setTimeout((()=>{e.classList.remove("animating")}),500)}))}));const n=e=>{document.querySelector("body").setAttribute("data-state-cart","closed"),window.EventBus.dispatchEvent("setModal","false")},c=e=>{e&&("cartDrawer"===e&&document.querySelector("body").setAttribute("data-state-cart","open"),window.EventBus.dispatchEvent("setModal",e))};class r extends HTMLElement{constructor(){super(),this.closeButtons=this.querySelectorAll("#closeModal"),this.closeButtons.forEach((e=>{e.addEventListener("click",(e=>{n()}))}))}}customElements.get("modal-component")||customElements.define("modal-component",r);class a extends HTMLElement{constructor(){super(),this.addEventListener("click",(e=>{const t=this.dataset.modalId;t?c(t):n()}))}}customElements.get("modal-trigger")||customElements.define("modal-trigger",a)}},t={};function s(o){var n=t[o];if(void 0!==n)return n.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,s),c.exports}s.d=(e,t)=>{for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=s(664),t=s(956);function o(s){console.log("hide"),console.log(e.eventBus);const{target:o}=s;console.log(o),"shopify-section-cart"!==o.id?(0,t.h)("cartDrawer"):(0,t.M)("cartDrawer")}function n(s){console.log("show"),console.log(e.eventBus);const{target:o}=s;console.log(o),"shopify-section-cart"===o.id?(0,t.h)("cartDrawer"):(0,t.M)("cartDrawer")}document.removeEventListener("shopify:section:deselect",o),document.addEventListener("shopify:section:deselect",o),document.removeEventListener("shopify:section:load",n),document.addEventListener("shopify:section:load",n)})()})();