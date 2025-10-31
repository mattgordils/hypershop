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
        this.scrollEndTimer = null;
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

        // Set initial percentage value after layout is complete
        // Use double RAF to ensure all layout/paint has happened
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.updateParallax();
          });
        });

        // Also recalculate after window load (in case images affect layout)
        if (document.readyState === 'loading') {
          window.addEventListener('load', () => {
            this.updateParallax();
          }, { once: true });
        }
      }

      disconnectedCallback() {
        window.removeEventListener('scroll', this.onScrollHandler);
        if (this.scrollEndTimer) {
          clearTimeout(this.scrollEndTimer);
        }
      }

      onScroll() {
        if (!this.ticking) {
          requestAnimationFrame(() => {
            this.updateParallax();
            this.ticking = false;
          });
          this.ticking = true;
        }

        // Ensure final update when scrolling stops
        clearTimeout(this.scrollEndTimer);
        this.scrollEndTimer = setTimeout(() => {
          this.updateParallax();
        }, 100);
      }

      parseMarginValue(value) {
        if (!value) return 0;

        const trimmed = value.trim();
        const numValue = parseFloat(trimmed);

        if (trimmed.endsWith('%')) {
          // Percentage of element height
          return (numValue / 100) * this.offsetHeight;
        } else if (trimmed.endsWith('vw')) {
          // Viewport width
          return (numValue / 100) * window.innerWidth;
        } else if (trimmed.endsWith('vh')) {
          // Viewport height
          return (numValue / 100) * window.innerHeight;
        } else {
          // Default to pixels
          return numValue;
        }
      }

      updateParallax() {
        // Get the viewport height
        const viewportHeight = window.innerHeight;

        // Get the scroll top
        const scrollTop = window.scrollY;

        // Get the element offset top
        const elementOffsetTop = this.offsetTop;

        // Parse margin values (supports px, %, vw, vh)
        const marginTop = this.parseMarginValue(this.dataset.marginTop || this.dataset.margin);
        const marginBottom = this.parseMarginValue(this.dataset.marginBottom || this.dataset.margin);

        // Calculate the percentage of the element that's in view
        let percentage = (scrollTop + viewportHeight - elementOffsetTop - marginTop) / (viewportHeight + this.offsetHeight + marginTop + marginBottom);

        // Clamp between 0 and 1, with small tolerance to ensure we hit boundaries
        if (percentage < 0.02) {
          percentage = 0;
        } else if (percentage > 0.98) {
          percentage = 1;
        }

        if (percentage >= 0 && percentage <= 1) {
          this.style.setProperty('--percentage', percentage);
        }
      }
    }
  );
}