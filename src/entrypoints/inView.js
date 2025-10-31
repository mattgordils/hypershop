if (!customElements.get("in-view")) {
  customElements.define(
    "in-view",
    class inView extends HTMLElement {
      constructor() {
        super();
        //
        const observer = new IntersectionObserver(item => {
          const inViewItem = item[0]
          if (inViewItem.isIntersecting) {
            this.classList.add('in-view');
          }
        }, {
          threshold: .1
        });

        observer.observe(this)
        
      }

      
    }
  );
}

if (!customElements.get("parallax-view")) {
  customElements.define(
    "parallax-view",
    class parallaxView extends HTMLElement {
      constructor() {
        super();
        this.ticking = false;
        //
        this.observer = new IntersectionObserver(item => {
          const inViewItem = item[0]
          if (inViewItem.isIntersecting) {
            this.classList.add('in-view');
          }
        }, {
          threshold: .5
        });
      }

      connectedCallback() {
        this.onScrollHandler = this.onScroll.bind(this);
        window.addEventListener('scroll', this.onScrollHandler, { passive: true });
      }

      disconnectedCallback() {
        window.removeEventListener('scroll', this.onScrollHandler);
      }

      onScroll() {
        if (!this.ticking) {
          requestAnimationFrame(() => {
            this.updateParallax();
            this.ticking = false;
          });
          this.ticking = true;
        }
      }

      updateParallax() {
        // Get the viewport height
        const viewportHeight = window.innerHeight;

        // Get the scroll top
        const scrollTop = window.scrollY;

        // Get the element offset top
        const elementOffsetTop = this.offsetTop;

        // Calculate the percentage of the element that's in view
        const percentage = (scrollTop + viewportHeight - elementOffsetTop) / (viewportHeight + this.offsetHeight);

        if (percentage >= 0 && percentage <= 1) {
          this.style.setProperty('--percentage', percentage);
        }
      }
    }
  );
}