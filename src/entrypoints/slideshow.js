import EmblaCarousel from 'embla-carousel'
import ClassNames from 'embla-carousel-class-names'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'

if (!customElements.get('slide-show')) {
  customElements.define(
    'slide-show',
    class Slideshow extends HTMLElement {
      constructor() {
        super()

        this.slidesToShow = this?.dataset?.slidesToShow
          ? this?.dataset?.slidesToShow.split(',')
          : '1'
        this.loop = this.dataset.loop === 'true' ? true : false
        this.axis = this.dataset.axis || 'x'
        this.align = this.dataset.align || 'center'
        this.autoplay = this.dataset.autoplay === 'true' ? true : false
        this.autoplaySpeed = this?.dataset?.autoplaySpeed
          ? parseInt(this.dataset.autoplaySpeed)
          : 3000
        this.drag = this.dataset.drag === 'false' ? false : true
        this.fade = this.dataset.fade === 'true' ? true : false
        this.dots = this.querySelector('.slider-dots')
        this.dotItems = false
        this.arrowNext = this.querySelector('.slider-next')
        this.arrowPrev = this.querySelector('.slider-prev')
        this.slides = this.querySelectorAll('.slider-slide') || []
        this.navs = this.querySelectorAll('.slider-nav')
        this.currentSlide = 0
        this.breakpoints = this?.dataset?.breakpoints ? JSON.parse(this?.dataset?.breakpoints) : {}
        this.initializeSlideshow()
      }

      editorActions(embla) {
        if (document.body.dataset.shopifyEditor === 'true' && this.slides?.length > 1) {
          const blockEditor = (ev) => {
            const { target } = ev
            // Find index on selected slide
            const selectedIndex = Array.from(this.slides).findIndex(
              (slide) => slide?.dataset?.shopifyEditorBlock === target?.dataset?.shopifyEditorBlock
            )
            // Go to selected slide on select in editor

            embla.scrollTo(selectedIndex)
          }

          document.addEventListener('shopify:block:select', blockEditor)
        }
      }

      initializeSlideshow() {
        const slidesToShow = this.slidesToShow
        const loop = this.loop

        if (slidesToShow) {
          this.style.setProperty('--slides-xs', slidesToShow[0])
          this.style.setProperty('--slides-sm', slidesToShow[1] || slidesToShow[0])
          this.style.setProperty(
            '--slides-md',
            slidesToShow[2] || slidesToShow[1] || slidesToShow[0]
          )
          this.style.setProperty(
            '--slides-lg',
            slidesToShow[3] || slidesToShow[2] || slidesToShow[1] || slidesToShow[0]
          )
          this.style.setProperty(
            '--slides-xl',
            slidesToShow[4] ||
            slidesToShow[3] ||
            slidesToShow[2] ||
            slidesToShow[1] ||
            slidesToShow[0]
          )
          this.style.setProperty(
            '--slides-2xl',
            slidesToShow[5] ||
            slidesToShow[4] ||
            slidesToShow[3] ||
            slidesToShow[2] ||
            slidesToShow[1] ||
            slidesToShow[0]
          )
          this.style.setProperty(
            '--slides-3xl',
            slidesToShow[6] ||
            slidesToShow[5] ||
            slidesToShow[4] ||
            slidesToShow[3] ||
            slidesToShow[2] ||
            slidesToShow[1] ||
            slidesToShow[0]
          )
        }

        const options = {
          loop: loop,
          axis: this.axis,
          align: this.align,
          watchDrag: this.drag,
          containScroll: 'trimSnaps',
          breakpoints: this.breakpoints
        }

        // initialize slider
        let plugins = [ClassNames()]
        if (this.autoplay) {
          plugins = [...plugins, Autoplay({
            delay: this.autoplaySpeed,
            stopOnLastSnap: !this.loop
          })]
        }
        if (this.fade) {
          plugins = [...plugins, Fade()]
        }

        const embla = EmblaCarousel(this, options, plugins)

        // Store embla instance and resize handler for cleanup
        this.embla = embla
        this.resizeHandler = null

        const toggleActiveWhenScrollable = () => {
          setTimeout(() => {
            const hasSlides = this.slides && this.slides.length > 0
            let isScrollable = embla.internalEngine().scrollSnaps.length > 1

            // Hide controls if not scrollable, but don't mark as inactive if we have slides
            if (!isScrollable) {
              this?.arrowNext?.classList.add('!hidden')
              this?.arrowPrev?.classList.add('!hidden')
              this?.dots?.classList.add('!hidden')
            } else {
              this?.arrowNext?.classList.remove('!hidden')
              this?.arrowPrev?.classList.remove('!hidden')
              this?.dots?.classList.remove('!hidden')
            }

            // Only reInit with active: false if we have no slides at all
            // If we have slides that exactly match slides-to-show, keep active: true
            embla.reInit({ active: hasSlides })
          }, 100)
        }

        // Slider Controls
        if (this.arrowNext) {
          this.arrowNext.addEventListener('click', () => {
            embla.scrollNext()
            updateSlide()
          })
        }

        if (this.arrowPrev) {
          this.arrowPrev.addEventListener('click', () => {
            embla.scrollPrev()
            updateSlide()
          })
        }

        const setTheme = () => {
          if (this.classList.contains('change-color')) {
            const slideClasses = Array.from(this.classList)
            const slideColor = this?.slides[this.currentSlide]?.dataset?.colorScheme || ''
            const classToRemove = slideClasses.find(cls => cls.includes('theme-'));

            if (!this.classList.contains(slideColor)) {
              this.classList.remove(classToRemove)
              this.classList.add(slideColor)
            }
          }
        }

        const updateSlide = () => {
          if (this.arrowPrev) {
            this.arrowPrev.disabled = !embla.canScrollPrev()
          }
          if (this.arrowNext) {
            this.arrowNext.disabled = !embla.canScrollNext()
          }
          this.currentSlide = embla
            .slideNodes()
            .findIndex((node) => node?.classList.contains('is-snapped'))
          this.querySelectorAll('#currentSlide').forEach((item) => {
            item.innerHTML = this.currentSlide + 1
          })

          if (this.dotItems) {
            this.dotItems?.forEach((item, index) => {
              if (index === this.currentSlide) {
                item.classList.add('active')
              } else {
                item.classList.remove('active')
              }
            })
          }

          if (this.navs?.length > 0) {
            Array.from(this.navs).forEach((nav) => {
              const buttons = nav.querySelectorAll('button')
              if (buttons?.length > 0) {
                buttons.forEach((button, index) => {
                  if (index === this.currentSlide) {
                    button.classList.add('active')
                  } else {
                    button.classList.remove('active')
                  }
                })
              }
            })
          }

          setTheme()
        }

        const setInactive = () => {
          if (embla?.internalEngine()?.options?.active) {
            this.classList.remove('inactive')
          } else {
            this.classList.add('inactive')
          }
        }

        const renderDots = () => {
          if (this.dots) {
            let dotItems = ''

            embla.slideNodes()?.forEach((slide, index) => {
              dotItems +=
                '<button class="slider-dot" title="Go to slide ' +
                (index + 1) +
                '"><span>' +
                (index + 1) +
                '</span></button>'
            })

            this.dots.innerHTML = dotItems
            this.dotItems = this?.dots?.querySelectorAll('.slider-dot')

            if (this.dotItems) {
              this.dotItems?.forEach((item, index) => {
                if (index === 0) {
                  item.classList.add('active')
                }
                item?.addEventListener('click', () => {
                  embla.scrollTo(index)
                })
              })
            }
          }
        }

        const renderNav = () => {
          if (this.navs?.length > 0) {
            Array.from(this.navs).forEach((nav) => {
              const buttons = nav.querySelectorAll('button')
              if (buttons?.length > 0) {
                buttons.forEach((button, index) => {
                  button.addEventListener('click', () => {
                    embla.scrollTo(index)
                    this.currentSlide = index
                  })
                })
              }
            })
          }
        }

        // Store resize handler so we can remove it later
        this.resizeHandler = () => {
          toggleActiveWhenScrollable()
          setInactive()
        }

        embla.on('scroll', updateSlide)
        window.addEventListener('resize', this.resizeHandler)
        toggleActiveWhenScrollable()
        updateSlide()
        renderDots()
        setInactive()
        renderNav()
        this.editorActions(embla)
      }

      destroySlideshow() {
        // Destroy Embla instance
        if (this.embla) {
          this.embla.destroy()
          this.embla = null
        }
        // Remove resize listener
        if (this.resizeHandler) {
          window.removeEventListener('resize', this.resizeHandler)
          this.resizeHandler = null
        }
      }
    }
  )
}
