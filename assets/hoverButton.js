(()=>{function t(){const t=document.querySelectorAll(".hover-button"),e=document.querySelectorAll(".hover-button-hollow");for(hoverButton of t){const t=hoverButton.parentElement;hoverButton.setAttribute("width",t.offsetWidth)}for(hoverButtonHollow of e){const t=hoverButtonHollow.parentElement;hoverButtonHollow.setAttribute("width",t.offsetWidth),t.classList.remove("invisible")}}window.onload=function(){t(),window.addEventListener("resize",t);const e=document.querySelectorAll(".hover-button-container");for(container of e)container.addEventListener("mouseover",(t=>{t.currentTarget.querySelector(".hover-button").classList.add("opacity-0")})),container.addEventListener("mouseout",(t=>{t.currentTarget.querySelector(".hover-button").classList.remove("opacity-0")})),container.addEventListener("click",(t=>{const e=t.currentTarget.getAttribute("data-form-to-submit");e&&""!==e&&document.querySelector("."+e).submit()}))}})();