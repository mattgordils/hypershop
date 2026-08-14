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
        // Initial `active` state — sections that want to be a grid at load time
        // (e.g. "no slideshow on desktop") pass data-active="false" and let a
        // breakpoint override flip it to true on other viewports.
        this.active = this.dataset.active === 'false' ? false : true
        this.autoplay = this.dataset.autoplay === 'true' ? true : false
        this.autoplaySpeed = this?.dataset?.autoplaySpeed
          ? parseInt(this.dataset.autoplaySpeed)
          : 3000
        this.drag = this.dataset.drag === 'false' ? false : true
        this.fade = this.dataset.fade === 'true' ? true : false

        // Collect controls that belong to this slide-show. Nested descendants
        // are found by class; external controls (in a heading row, a floating
        // dock, a sibling column…) opt in via data-slider="<id>". Each control
        // class is stored as an array so a single slide-show can be driven by
        // multiple arrow sets, dot rails, etc. simultaneously (product-carousel,
        // for example, renders a desktop arrow pair in its heading and a mobile
        // pair below the carousel — both pairs must stay in sync).
        this.arrowNexts = this.#collectControls('slider-next')
        this.arrowPrevs = this.#collectControls('slider-prev')
        this.dotsContainers = this.#collectControls('slider-dots')
        this.dotItems = []

        this.slides = this.querySelectorAll('.slider-slide') || []
        this.navs = this.querySelectorAll('.slider-nav')
        this.currentSlide = 0
        this.breakpoints = this?.dataset?.breakpoints ? JSON.parse(this?.dataset?.breakpoints) : {}
        this.initializeSlideshow()
      }

      #collectControls(className) {
        const nested = Array.from(this.querySelectorAll('.' + className))
        const external = this.id
          ? Array.from(document.querySelectorAll(`.${className}[data-slider="${this.id}"]`))
          : []
        // Dedupe — a control can legitimately be both nested inside the
        // slide-show AND carry data-slider="<id>" (e.g. a mobile arrow pair
        // rendered inside the slide-show that reuses the same snippet as an
        // external heading pair). Both queries would match it and we'd wire
        // its click handler twice, causing a single click to scroll twice.
        return [...new Set([...nested, ...external])]
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
          active: this.active,
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

        // Store embla instance and handlers for cleanup
        this.embla = embla
        this.mediaQueryHandlers = []

        const setControlsHidden = (hidden) => {
          const controls = [...this.arrowNexts, ...this.arrowPrevs, ...this.dotsContainers]
          controls.forEach((el) => {
            hidden ? el.classList.add('!hidden') : el.classList.remove('!hidden')
          })
        }

        const toggleActiveWhenScrollable = () => {
          setTimeout(() => {
            // Hide controls if embla itself is inactive (grid-fallback mode) OR
            // if the track has nothing to scroll to. Covers external arrows/dots
            // bound via data-slider — those don't get the .inactive CSS scope.
            const isActive = embla.internalEngine()?.options?.active
            const isScrollable = isActive && embla.internalEngine().scrollSnaps.length > 1
            setControlsHidden(!isScrollable)
          }, 100)
        }

        // Set up matchMedia listeners for breakpoints
        const setupBreakpointListeners = () => {
          Object.entries(this.breakpoints).forEach(([query, opts]) => {
            const mql = window.matchMedia(query)
            const handler = (e) => {
              // Re-init embla - it will pick up breakpoint options automatically
              embla.reInit()
              setInactive()
              toggleActiveWhenScrollable()
            }
            mql.addEventListener('change', handler)
            this.mediaQueryHandlers.push({ mql, handler })
          })
        }

        setupBreakpointListeners()

        // Bind every arrow set (nested + external) to the same embla instance.
        // Multiple arrow pairs stay perfectly in sync because they all call
        // through to the same embla.scrollNext / scrollPrev.
        this.arrowNexts.forEach((btn) => {
          btn.addEventListener('click', () => {
            embla.scrollNext()
            updateSlide()
          })
        })
        this.arrowPrevs.forEach((btn) => {
          btn.addEventListener('click', () => {
            embla.scrollPrev()
            updateSlide()
          })
        })

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
          const prevDisabled = !embla.canScrollPrev()
          const nextDisabled = !embla.canScrollNext()
          this.arrowPrevs.forEach((btn) => { btn.disabled = prevDisabled })
          this.arrowNexts.forEach((btn) => { btn.disabled = nextDisabled })

          this.currentSlide = embla
            .slideNodes()
            .findIndex((node) => node?.classList.contains('is-snapped'))
          this.querySelectorAll('#currentSlide').forEach((item) => {
            item.innerHTML = this.currentSlide + 1
          })

          if (this.dotItems.length) {
            this.dotItems.forEach(({ button, index }) => {
              if (index === this.currentSlide) {
                button.classList.add('active')
              } else {
                button.classList.remove('active')
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

        // Render dot buttons into every dots container that belongs to this
        // slide-show (nested or external). Track every button across all
        // containers so `updateSlide` can toggle .active on the matching
        // button in each one.
        const renderDots = () => {
          if (!this.dotsContainers.length) return

          let dotMarkup = ''
          embla.slideNodes()?.forEach((slide, index) => {
            dotMarkup +=
              '<button class="slider-dot" title="Go to slide ' +
              (index + 1) +
              '"><span>' +
              (index + 1) +
              '</span></button>'
          })

          this.dotItems = []
          this.dotsContainers.forEach((container) => {
            container.innerHTML = dotMarkup
            container.querySelectorAll('.slider-dot').forEach((button, index) => {
              if (index === 0) button.classList.add('active')
              button.addEventListener('click', () => { embla.scrollTo(index) })
              this.dotItems.push({ button, index })
            })
          })
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

        // Expose CSS custom properties that describe the carousel's scroll state,
        // so any pager style (scrollbar-thumb, moving underline, custom shapes)
        // can position itself continuously without knowing slide counts —
        // important because multi-slide-per-view breaks index-based math.
        //
        //   --scroll-progress : 0 → 1, how far scrolled from first to last snap
        //   --scroll-thumb    : 0 → 1, viewport / total-content width, i.e. the
        //                       natural scrollbar-thumb size for this slideshow
        //
        // Set on the slide-show (nested pagers inherit) and mirrored onto every
        // external dots container (they live outside the tree and can't inherit).
        const updateScrollVars = () => {
          const progress = Math.max(0, Math.min(1, embla.scrollProgress()))
          const rootWidth = embla.rootNode().clientWidth
          const contentWidth = embla.containerNode().scrollWidth
          const thumbRatio = contentWidth > 0 ? Math.min(1, rootWidth / contentWidth) : 1

          this.style.setProperty('--scroll-progress', progress)
          this.style.setProperty('--scroll-thumb', thumbRatio)

          this.dotsContainers.forEach((container) => {
            if (!this.contains(container)) {
              container.style.setProperty('--scroll-progress', progress)
              container.style.setProperty('--scroll-thumb', thumbRatio)
            }
          })
        }

        embla.on('scroll', updateSlide)
        embla.on('scroll', updateScrollVars)
        embla.on('reInit', updateScrollVars)
        embla.on('resize', updateScrollVars)
        toggleActiveWhenScrollable()
        updateSlide()
        updateScrollVars()
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
        // Remove matchMedia listeners
        if (this.mediaQueryHandlers) {
          this.mediaQueryHandlers.forEach(({ mql, handler }) => {
            mql.removeEventListener('change', handler)
          })
          this.mediaQueryHandlers = []
        }
      }
    }
  )
}
