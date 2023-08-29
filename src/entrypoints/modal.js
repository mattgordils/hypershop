import { eventBus } from './eventbus'

export const closeModal = id => {
  let body = document.querySelector("body");
  body.setAttribute("data-state-cart", "closed");
  eventBus.publish("setModal", false)
}

export const openModal = id => {
  if (id) {
    if (id === 'cartDrawer') {
      let body = document.querySelector("body");
      body.setAttribute("data-state-cart", "open");
    }
    eventBus.publish("setModal", id)
  }
}

class Modal extends HTMLElement {
  constructor() {
    super();
    this.closeButtons = this.querySelectorAll('#closeModal')
    
    this.closeButtons.forEach(item => {
      item.addEventListener('click', event => {
        closeModal()
      })
    })
  }
}

if (!customElements.get('modal-component')) {
  customElements.define('modal-component', Modal);
}

class ModalTrigger extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', event => {
      const modalId = this.dataset.modalId
      console.log(event)
      if (modalId) {
        openModal(modalId)
      } else {
        closeModal()
      }
    })
  }
}

if (!customElements.get('modal-trigger')) {
  customElements.define('modal-trigger', ModalTrigger);
}

// MODALS
eventBus.subscribe("setModal", id => {
  if (id && document.querySelector('modal-component#' + id)) {
    if (document.querySelector('modal-component#' + id).classList.contains('open')) {
      document.querySelector('modal-component#' + id).classList.remove('open')
      setTimeout(() => {
        document.querySelector('modal-component#' + id).classList.remove('animating')
      }, 500)
    } else {
      document.querySelector('modal-component#' + id).classList.add('open', 'animating')
      document.querySelector('modal-component#' + id).classList.add('animating')
    }
  } else {
    const modals = document.querySelectorAll('modal-component');
    modals.forEach(modal => {
      modal.classList.remove('open')
      modal.classList.add('animating')
      setTimeout(() => {
        modal.classList.remove('animating')
      }, 500)
    })
  }
});