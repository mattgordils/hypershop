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
    this.isOpen = false;
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  connectedCallback() {
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');

    // Close on outside click
    this.addEventListener('click', (e) => {
      if (e.target === this) {
        this.close();
      }
    });

    // Trap focus when modal is open
    this.focusableElements = this.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }

  open() {
    this.isOpen = true;
    this.classList.add('open', 'animating');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.onKeyDown);

    // Focus first focusable element
    const firstFocusable = this.focusableElements[0];
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  close() {
    this.isOpen = false;
    this.classList.remove('open');
    this.classList.add('animating');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.onKeyDown);

    setTimeout(() => {
      this.classList.remove('animating');
    }, 500);
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      this.close();
    }

    // Trap focus
    if (e.key === 'Tab') {
      const firstFocusable = this.focusableElements[0];
      const lastFocusable = this.focusableElements[this.focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }
}

if (!customElements.get('modal-component')) {
  customElements.define('modal-component', Modal);
}

class ModalTrigger extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', () => {
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