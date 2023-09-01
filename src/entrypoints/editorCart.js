import { closeModal, openModal } from './modal'

function hideInEditor(ev) {
  const { target } = ev;
  console.log(target)
  if (target.id !== "shopify-section-cart") {
    openModal('cartDrawer')
  } else {
    closeModal('cartDrawer')
  }
}

function showInEditor(ev) {
  const { target } = ev;
  console.log(target)
  if (target.id === "shopify-section-cart") {
    openModal('cartDrawer')
  } else {
    closeModal('cartDrawer')
  }
}

document.removeEventListener("shopify:section:deselect", hideInEditor);
document.addEventListener("shopify:section:deselect", hideInEditor);
document.removeEventListener("shopify:section:load", showInEditor);
document.addEventListener("shopify:section:load", showInEditor);
