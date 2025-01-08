(()=>{var t={357:(t,e,n)=>{"use strict";n.d(e,{q:()=>o});const o=(t=!1)=>{if(!document.querySelector("#shopify-section-cart #cartContent"))return!1;fetch(window.Shopify.routes.root+"?sections=cart").then((t=>t.json())).then((e=>{var n,o;const r=document.querySelector("#shopify-section-cart #cartContent"),s=document.querySelector("#shopify-section-cart #cartHeader");var i=document.createElement("div");i.innerHTML=e.cart;const a=document.querySelector("#shopify-section-cart #cartHeader").dataset.cartCount,c=i.querySelector("#cartHeader").dataset.cartCount,l=null==(n=document.querySelectorAll("#shopify-section-cart #cartLineItem"))?void 0:n.length,d=null==(o=i.querySelectorAll("#shopify-section-cart #cartLineItem"))?void 0:o.length;if(0!=c&&0!=a&&l===d||(t=!0),t){const t=i.querySelector("#cartContent"),e=i.querySelector("#cartHeader");r.outerHTML=t.outerHTML,s.outerHTML=e.outerHTML}else{const t=document.querySelectorAll("#shopify-section-cart #cartUpdate"),e=i.querySelectorAll("#shopify-section-cart #cartUpdate");t.forEach(((t,n)=>{t.innerHTML=e[n].innerHTML}))}document.querySelectorAll("#cartCount").forEach((t=>{t.innerHTML=c}))}))};customElements.get("cart-remove-item")||customElements.define("cart-remove-item",class extends HTMLElement{constructor(){super(),this.cartRemoveButton=this.querySelector(".cart-remove-item"),this.cartRemoveButton.addEventListener("click",(t=>{let e={updates:{[t.currentTarget.dataset.itemId]:0}};fetch(window.Shopify.routes.root+"cart/update.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((t=>{o(!0)})).catch((t=>{console.error("Error:",t)}))}))}}),customElements.get("cart-quantity-adjust")||customElements.define("cart-quantity-adjust",class extends HTMLElement{constructor(){super(),this.quantityChangeButtons=this.querySelectorAll(".quantity-change"),this.onQuantityChangeButtonClick=this.onQuantityChangeButtonClick.bind(this),this.quantityChangeButtons.forEach((t=>{t.onclick=this.onQuantityChangeButtonClick}))}onQuantityChangeButtonClick(t){const e=t.currentTarget;this.getQuantityDivFromChangeButton(e).classList.add("opacity-0");const n=parseInt(e.getAttribute("data-product-id")),r=parseInt(e.getAttribute("data-new-quantity"));let s={updates:{[n]:r}},i=t=>{const n=e.parentElement;return this.getQuantityDivFromChangeButton(e).innerHTML=r,this.getQuantityDivFromChangeButton(e).classList.remove("opacity-0"),n.querySelector(".quantity-down").setAttribute("data-new-quantity",r-1),n.querySelector(".quantity-up").setAttribute("data-new-quantity",r+1),t.json()};i=i.bind(e),fetch(window.Shopify.routes.root+"cart/update.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}).then((t=>i(t))).then((t=>{o(),document.querySelectorAll(".cart-item-count").forEach((e=>{e.innerHTML=t.item_count}))})).catch((t=>{console.error("Error:",t)}))}getQuantityDivFromChangeButton(t){return t.parentElement.querySelector(".quantity-current")}})},3:(t,e,n)=>{"use strict";const o=(t,e,n)=>{console.log(t.ariaHidden),"inherit"===n&&(n="true"===t.ariaHidden),n?(t.ariaHidden="false",e.dataset.icon="minus"):(t.ariaHidden="true",e.dataset.icon="plus")};customElements.get("collapsible-item")||customElements.define("collapsible-item",class extends HTMLElement{constructor(){super(),this.trigger=this.querySelectorAll('[data-collapsible="trigger"]'),this.content=this.querySelector('[data-collapsible="content"]'),this.icon=this.querySelector('[data-collapsible="icon"] .animated-icon'),this.content.ariaHidden="true",this.trigger.forEach((t=>{t.addEventListener("click",(t=>{o(this.content,this.icon,"inherit")}))}))}}),customElements.get("accordion-list")||customElements.define("accordion-list",class extends HTMLElement{constructor(){super(),this.trigger=this.querySelectorAll('[data-collapsible="trigger"]'),this.content=this.querySelectorAll('[data-collapsible="content"]'),this.collapsibleItems=this.querySelectorAll("collapsible-item"),this.trigger.forEach((t=>{t.addEventListener("click",(e=>{const n=t.closest("collapsible-item");this.collapsibleItems.forEach((t=>{const e=t.querySelector('[data-collapsible="content"]'),r=t.querySelector('[data-collapsible="icon"] .animated-icon');t.id!==n.id&&o(e,r,!1)}))}))}))}})},664:(t,e,n)=>{"use strict";n.d(e,{Z:()=>o});class o{constructor(){this.bus=document.createElement("event-bus")}addEventListener(t,e){this.bus.addEventListener(t,e)}removeEventListener(t,e){this.bus.removeEventListener(t,e)}dispatchEvent(t,e={}){this.bus.dispatchEvent(new CustomEvent(t,{detail:e}))}}},654:()=>{customElements.get("in-view")||customElements.define("in-view",class extends HTMLElement{constructor(){super(),new IntersectionObserver((t=>{t[0].isIntersecting&&this.classList.add("in-view")}),{threshold:.1}).observe(this)}}),customElements.get("parallax-view")||customElements.define("parallax-view",class extends HTMLElement{constructor(){super(),this.observer=new IntersectionObserver((t=>{const e=t[0];e.isIntersecting&&(console.log(e.intersectionRatio),this.classList.add("in-view")),console.log(e.intersectionRatio)}),{threshold:.5})}connectedCallback(){this.onScrollHandler=this.onScroll.bind(this),window.addEventListener("scroll",this.onScrollHandler,!1)}onScroll(){const t=window.innerHeight,e=window.scrollY,n=this.offsetTop,o=Math.round((e+t-n)/(t+this.offsetHeight)*100);o>=0&&o<=100&&(this.style.cssText="--percentage: "+o/100)}})},956:(t,e,n)=>{"use strict";n.d(e,{h:()=>r});var o=n(664);window.EventBus=new o.Z,window.EventBus.addEventListener("setModal",(t=>{const e=document.querySelector("modal-component#"+t.detail);if(e){if(e.classList.contains("open"))return;e.classList.add("open","animating"),e.classList.add("animating")}else document.querySelectorAll("modal-component").forEach((t=>{t.classList.remove("open"),t.classList.add("animating"),setTimeout((()=>{t.classList.remove("animating")}),500)}))}));const r=t=>{t&&window.EventBus.dispatchEvent("setModal",t)};class s extends HTMLElement{constructor(){super()}}customElements.get("modal-component")||customElements.define("modal-component",s);class i extends HTMLElement{constructor(){super(),this.addEventListener("click",(t=>{const e=this.dataset.modalId;e?r(e):(document.querySelector("body"),window.EventBus.dispatchEvent("setModal","false"))}))}}customElements.get("modal-trigger")||customElements.define("modal-trigger",i)}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var s=e[o]={exports:{}};return t[o](s,s.exports,n),s.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t,e=n(956),o=n(357);n(3),n(654),document.addEventListener("DOMContentLoaded",(()=>{console.log("\n╔    ╗  Site by STUDIO HYPERLINK\n║ ╠╣ ║  www.studiohyper.link\n╚    ╝  Hot Bagels, Hotter Websites\n ")})),t=()=>{const t=window.innerHeight;(function(){const t=navigator.userAgent;return!!/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(t)||!!/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(t)})()&&document.body.style.setProperty("--vh",.01*t+"px")},"complete"===document.readyState||"interactive"===document.readyState?setTimeout(t,1):document.addEventListener("DOMContentLoaded",t),customElements.get("add-to-cart-form")||customElements.define("add-to-cart-form",class extends HTMLElement{constructor(){super(),this.addButton=this.querySelector(".add-to-cart-btn"),this.qtyInput=this.querySelector("input[data-input='qty']"),this.addButton&&this.addButton.addEventListener("click",(t=>{var n,r;t.preventDefault();const s=(t=>{const e=[];return t.forEach((t=>{if(t.querySelector("select")){const n=t.querySelector("select");e.push(n.value)}else t.checked&&e.push(t.value)})),e})(this.querySelectorAll("variant-radios input, variant-selects")),i=this.querySelector(".rc-widget .rc-selling-plans select.rc-selling-plans-dropdown__select"),a=this.querySelectorAll('[name^="property_"]');console.log("propertiesInputs: ",a);let c={};(null==a?void 0:a.length)>0&&a.forEach((t=>{var e;let n="",o=!1;if((null==(e=null==t?void 0:t.dataset)?void 0:e.title)&&(n=t.dataset.title),"fieldset"===t.type){const e=t.querySelectorAll("input"),n=[];e.forEach((t=>{t.checked&&n.push(t.value)})),o=n.join(", ")}else o=t.dataset.value||t.value;o&&(c[n]=o)})),console.log("properties: ",c);let l="",d="";(null==(n=null==this?void 0:this.dataset)?void 0:n.variantId)?l=this.dataset.variantId:(d=JSON.parse(this.querySelector('[type="application/json"]').textContent),l=((t,e)=>e.find((e=>((t,e)=>{if(t===e)return!0;if(null==t||null==e)return!1;if(t.length!==e.length)return!1;for(var n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0})(e.options,t))))(s,d).id);let u={items:[{id:l,selling_plan:(null==i?void 0:i.value)||null,quantity:(null==(r=this.qtyInput)?void 0:r.value)||1,properties:c}]};fetch(window.Shopify.routes.root+"cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)}).then((t=>{console.log(t),(0,o.q)()})).then((()=>{(0,e.h)("cartDrawer")})).catch((t=>{console.error("Error:",t)}))}))}})})()})();