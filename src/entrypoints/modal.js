import EventBus from './eventbus';
window.EventBus = new EventBus;

// Every open/close goes through the element's own methods, so the focus trap, Escape
// binding, scroll lock and focus restore apply no matter what triggered it. Toggling
// classes directly here (as this used to) skipped all four.
const setModalState = (event) => {
  const activeModal = document.querySelector('modal-component#' + event.detail)

  if (activeModal) {
    if (activeModal.classList.contains('open')) return
    activeModal.open()
    return
  }

  document.querySelectorAll('modal-component.open').forEach((modal) => modal.close())
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
    this.previouslyFocused = document.activeElement;
    this.classList.add('open', 'animating');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.onKeyDown);

    // Re-read: the contents can be replaced while closed (cart refreshes, section renders)
    this.focusableElements = this.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

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

    // Back to whatever opened it, otherwise focus falls to <body> and keyboard users
    // lose their place on the page.
    this.previouslyFocused?.focus?.();
    this.previouslyFocused = null;

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

    const isOverlay = this.classList.contains('overlay')

    if (isOverlay) {
      // Decorative click-catcher: Escape and the close button cover keyboard users.
      this.setAttribute('aria-hidden', 'true')
      this.setAttribute('tabindex', '-1')
    } else {
      if (!this.hasAttribute('role')) this.setAttribute('role', 'button')
      if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0')

      this.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          this.click()
        }
      })
    }

    this.addEventListener('click', () => {
      const modalId = this.dataset.modalId
      let modalIsOpen = false

      if (modalId && document.querySelector('#' + modalId + '.open')) {
        modalIsOpen = true
      }

      if (modalId && !modalIsOpen) {
        // Open modal if it isnt open already
        openModal(modalId)
      } else {
        // Close modal if it is already open
        closeModal()
      }
    })
  }
}

if (!customElements.get('modal-trigger')) {
  customElements.define('modal-trigger', ModalTrigger);
}