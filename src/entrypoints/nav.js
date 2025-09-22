import { openModal } from './modal'

const scrollThreshold = 40

// const updateScrollDirection = () => {
//   let scrollDirection = "down"
//   let scrolled = false
//   let lastScrollY = window.pageYOffset;

//   const scrollY = window.pageYOffset;
//   const direction = scrollY > lastScrollY ? "down" : "up";
//   if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
//     scrollDirection = direction
//   }
//   lastScrollY = scrollY > 0 ? scrollY : 0;

//   if (scrollY >= scrollThreshold) {
//     console.log('scrolled')
//     scrolled = true
//   }

//   if (scrollY < scrollThreshold) {
//     console.log('NOT scrolled')
//     scrolled = false
//   }

//   // window.removeEventListener("scroll", updateScrollDirection); // clean up

// };

class StickyHeader extends HTMLElement {
  constructor() {
    super();
    this.scrollThreshold = 40;
    this.ticking = false;
  }

  connectedCallback() {
    this.header = document.getElementById('shopify-section-header');
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

// window.addEventListener("scroll", updateScrollDirection); // add event listener

function maybeOpenCart() {
  const urlParams = new URLSearchParams(window.location.search);
  if (window.location.pathname == "/cart") {
    openModal('cartDrawer')
  } else if (urlParams.get("cart-open") === "true") {
    openModal('cartDrawer')
  }
}
