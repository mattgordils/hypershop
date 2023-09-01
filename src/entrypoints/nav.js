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
  }

  connectedCallback() {
    this.header = document.getElementById('shopify-section-header');
    this.headerBounds = {};
    this.onScrollHandler = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScrollHandler, false);
  }

  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // let scrollDirection = "down"
    // const lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    // const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    // const direction = scrollY > lastScrollY ? "down" : "up";
    // if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
    //   scrollDirection = direction
    //   console.log(direction)
    // }

    if (scrollTop > scrollThreshold) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
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
