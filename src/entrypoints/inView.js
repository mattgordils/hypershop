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
        //
        this.observer = new IntersectionObserver(item => {
          const inViewItem = item[0]
          if (inViewItem.isIntersecting) {
            console.log(inViewItem.intersectionRatio)
            this.classList.add('in-view');
          }
          console.log(inViewItem.intersectionRatio)
        }, {
          threshold: .5
        });
      }

      connectedCallback() {
        this.onScrollHandler = this.onScroll.bind(this);
        window.addEventListener('scroll', this.onScrollHandler, false);
      }

      onScroll() {
        // Get the element
        const element = this

        // Get the viewport height
        const viewportHeight = window.innerHeight;

        // Get the scroll top
        const scrollTop = window.scrollY;

        // Get the element offset top
        const elementOffsetTop = element.offsetTop;

        // Calculate the percentage of the element that's in view
        const percentage = Math.round((scrollTop + viewportHeight - elementOffsetTop) / (viewportHeight + element.offsetHeight) * 100);

        if (percentage >= 0 && percentage <= 100) {
          this.style.cssText = "--percentage: " + percentage / 100
        }

      } 
    }
  );
}