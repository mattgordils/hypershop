import { openModal } from './modal'

function maybeOpenCart() {
  const urlParams = new URLSearchParams(window.location.search);
  if (window.location.pathname == "/cart") {
    openModal('cartDrawer')
  } else if (urlParams.get("cart-open") === "true") {
    openModal('cartDrawer')
  }
}
