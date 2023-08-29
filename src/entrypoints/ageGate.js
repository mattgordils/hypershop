import Cookies from "js-cookie";
import $ from "jquery";

const EL_GATE = ".js-ageGate";
const EL_YES = ".js-ageYes";
const COOKIE = "user_age";

let expiration;

function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();

  return false;
}

function showAgeGate() {
  document.querySelector(EL_GATE).classList.remove("hidden");
  let body = document.querySelector("body");
  body.classList.add = "fixed";
  body.setAttribute("data-state-age-gate", "open");
  bind();
}

function hideAgeGate() {
  document.querySelector(EL_GATE).classList.add("hidden");
  let body = document.querySelector("body");
  body.classList.remove = "fixed";
  body.setAttribute("data-state-age-gate", "closed");
}

function setCookie() {
  Cookies.set(COOKIE, true, { expires: expiration });
  hideAgeGate();
}

function bind() {
  const elGate = document.querySelector(EL_GATE);
  expiration = Number(elGate.getAttribute("data-cookie"));

  const elYes = elGate.querySelector(EL_YES);
  elYes.removeEventListener("click", setCookie);
  elYes.addEventListener("click", setCookie);
}

function showInCustomizer(ev) {
  const { target } = ev;
  const elGate = document.querySelector(EL_GATE).parentNode;

  if (target == elGate) {
    document.querySelector(EL_GATE).classList.remove("hidden");
  }
}

function hideInCustomizer(ev) {
  const { target } = ev;
  const elGate = document.querySelector(EL_GATE).parentNode;

  if (target == elGate) {
    document.querySelector(EL_GATE).classList.add("hidden");
  }
}

function bindCustomizer() {
  document.removeEventListener("shopify:section:select", showInCustomizer);
  document.addEventListener("shopify:section:select", showInCustomizer);

  document.removeEventListener("shopify:section:deselect", hideInCustomizer);
  document.addEventListener("shopify:section:deselect", hideInCustomizer);
}

function init() {
  const hasCookie = Cookies.get(COOKIE) == "true";
  hasCookie ? null : showAgeGate();

  window.clearAge = () => Cookies.remove(COOKIE);
  bindCustomizer();
}

init();
