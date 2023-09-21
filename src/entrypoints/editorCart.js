import { closeModal, openModal } from './modal'

function showInEditor(ev) {
  const { target } = ev;
  console.log('EVNT: ',ev.type);

  if (ev.type === 'shopify:section:select') {
    console.log('select: ', target.id);
    if (target.id === 'shopify-section-cart') {
      openModal('cartDrawer')
    }
  }

  if (ev.type === 'shopify:section:deselect') {
    console.log('deselet: ', target.id);
    if (target.id === 'shopify-section-cart') {
      closeModal()
    }
  }

  return

  // console.log('target: ',target)
  // if (target.id === "shopify-section-cart") {
  //   openModal('cartDrawer')
  // } else {
  //   closeModal()
  // }
}

document.addEventListener("shopify:section:select", showInEditor);
document.addEventListener("shopify:section:deselect", showInEditor);
document.addEventListener("shopify:section:load", showInEditor);

// document.removeEventListener("shopify:section:load", showInEditor);
