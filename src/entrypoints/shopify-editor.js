import { closeModal, openModal } from './modal'

function showInEditor(ev) {
  const { target } = ev;

  // Cart Drawer
  if (ev.type === 'shopify:section:select') {
    if (target.id === 'shopify-section-cart') {
      openModal('cartDrawer')
    }
  }

  if (ev.type === 'shopify:section:deselect') {
    if (target.id === 'shopify-section-cart') {
      closeModal()
    }
  }

  return
}

document.addEventListener("shopify:section:select", showInEditor);
document.addEventListener("shopify:section:deselect", showInEditor);
document.addEventListener("shopify:section:load", showInEditor);