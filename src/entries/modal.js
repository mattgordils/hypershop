class Modal extends HTMLElement {
  constructor() {
    super();
    this.closeButtons = this.querySelectorAll('#closeModal')
    
    this.closeButtons.forEach(item => {
      item.addEventListener('click', event => {
        this.closeModal()
      })
    })
  }

  closeModal() {
    window.EventBus.publish("setModal", false);
  }
}

customElements.define('modal-component', Modal);

class ModalTrigger extends HTMLElement {
  constructor() {
    super();
    this.modalId = this.dataset.modalId

    this.addEventListener('click', event => {
      console.log('this', this.dataset.modalId)
      this.openModal()
    })
  }

  openModal() {
    window.EventBus.publish("setModal", this.modalId);
  }
}

customElements.define('modal-trigger', ModalTrigger);