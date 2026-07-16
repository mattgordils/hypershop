const scrollThreshold = 40;

class StickyHeader extends HTMLElement {
  constructor() {
    super();
    this.scrollThreshold = 40;
    this.ticking = false;
  }

  connectedCallback() {
    this.header = document.querySelector('.section-header:has(sticky-header)');
    this.scrollThreshold = document.querySelector('.section-notification-banner')?.offsetHeight || 40;
    this.headerBounds = {};
    this.onScrollHandler = this.onScroll.bind(this);

    console.log('scrollThreshold', this.scrollThreshold)

    // Use passive listener for better performance
    window.addEventListener('scroll', this.onScrollHandler, { passive: true });

    // Set initial state
    this.requestTick();
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.onScrollHandler);
  }

  onScroll() {
    this.requestTick();
  }

  requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateHeader();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.scrollThreshold) {
      this.header?.classList.add('scrolled');
    } else {
      this.header?.classList.remove('scrolled');
    }
  }
}
if (!customElements.get('sticky-header')) {
  customElements.define('sticky-header', StickyHeader);
}

/**
 * <menu-item> — click-to-open dropdown for a top-level header menu item that
 * has sublinks. Open state is exposed as `data-open="true"` on the host so
 * styling can target `[data-open="true"]` selectors from CSS or Tailwind
 * (`group-data-[open=true]/menu:*`). The trigger button also mirrors state via
 * `aria-expanded`. Only one menu-item may be open at a time — opening another
 * or clicking outside closes the current one, and Escape closes + refocuses.
 */
class MenuItem extends HTMLElement {
  constructor() {
    super();
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
  }

  connectedCallback() {
    this.trigger = this.querySelector('[data-menu-trigger]');
    this.trigger?.addEventListener('click', this.onTriggerClick.bind(this));
    this.querySelector('[data-menu-backdrop]')?.addEventListener('click', () => this.close());
    document.addEventListener('click', this.onDocumentClick);
    document.addEventListener('keydown', this.onKeydown);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener('keydown', this.onKeydown);
  }

  get isOpen() {
    return this.dataset.open === 'true';
  }

  set isOpen(value) {
    this.dataset.open = value ? 'true' : 'false';
    this.trigger?.setAttribute('aria-expanded', value ? 'true' : 'false');
  }

  onTriggerClick(event) {
    event.preventDefault();
    if (this.isOpen) this.close();
    else this.open();
  }

  open() {
    // Only one menu-item open at a time
    document.querySelectorAll('menu-item[data-open="true"]').forEach((item) => {
      if (item !== this) item.close();
    });
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  onDocumentClick(event) {
    if (!this.isOpen) return;
    if (this.contains(event.target)) return;
    this.close();
  }

  onKeydown(event) {
    if (event.key !== 'Escape' || !this.isOpen) return;
    this.close();
    this.trigger?.focus();
  }
}

if (!customElements.get('menu-item')) {
  customElements.define('menu-item', MenuItem);
}
