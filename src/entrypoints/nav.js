const scrollThreshold = 40;

class StickyHeader extends HTMLElement {
  constructor() {
    super();
    this.scrollThreshold = 40;
    this.ticking = false;
  }

  connectedCallback() {
    this.header = document.getElementById('shopify-section-page_header');
    this.headerBounds = {};
    this.onScrollHandler = this.onScroll.bind(this);

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
