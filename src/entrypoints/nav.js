const scrollThreshold = 40;

class StickyHeader extends HTMLElement {
  constructor() {
    super();
    this.scrollThreshold = 40;
    this.ticking = false;
  }

  connectedCallback() {
    this.header = document.querySelector('.section-header:has(sticky-header)');
    this.scrollThreshold = document.querySelector('.section-notification-banner').offsetHeight || 40;
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
