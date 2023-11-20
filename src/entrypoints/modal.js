import EventBus from './eventbus';
window.EventBus = new EventBus;

const setModalState = (event) => {
  const activeModal = document.querySelector('modal-component#' + event.detail)
  if (activeModal) {
    if (activeModal.classList.contains('open')) {
      // Do nothing if modal is already open
      return
    } else {
      activeModal.classList.add('open', 'animating')
      activeModal.classList.add('animating')
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
}

window.EventBus.addEventListener('setModal', setModalState)

export const closeModal = id => {
  let body = document.querySelector("body");
  window.EventBus.dispatchEvent("setModal", "false")
}

export const openModal = id => {
  if (id) {
    window.EventBus.dispatchEvent("setModal", id)
  }
}

class Modal extends HTMLElement {
  constructor() {
    super();
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