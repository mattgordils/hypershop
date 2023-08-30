import { eventBus } from './eventbus';
import { closeModal, openModal } from './modal'

function hideInEditor(ev) {
  console.log('hide')
  console.log(eventBus)
  const { target } = ev;
  console.log(target)
  if (target.id !== "shopify-section-cart") {
    openModal('cartDrawer')
  } else {
    closeModal('cartDrawer')
  }
}

function showInEditor(ev) {
  console.log('show')
  console.log(eventBus)
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
