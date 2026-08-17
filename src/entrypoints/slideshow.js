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
      }

      // Everything below reads this element's own markup, so it belongs on connect rather
      // than in the constructor. A variant change re-renders the gallery and the new
      // <slide-show> arrives via document.importNode() — whose constructor runs BEFORE the
      // children are cloned in. Built there, the carousel initialises with zero slides and
      // silently does nothing, which is why the slideshow died after changing a variant.
      connectedCallback() {
        if (this.initialized) return
        this.initialized = true

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
        // Thumbnail rails follow the same nested-or-external rule as the other
        // controls — the PDP gallery keeps its rail outside the slide-show so it
        // can sit beside the track and survive grid/scrolling layouts.
        this.navs = this.#collectControls('slider-nav')
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

      /**
       * Rebuild against the slides that are in the track now.
       *
       * Sections that fetch their cards (product recommendations) connect with a track of
       * skeletons, so Embla measured those and nothing else. Every listener this class
       * adds is tied to an AbortController that destroySlideshow() fires, so a rebuild
       * can't leave a second click handler on an arrow that survived the swap.
       */
      refresh() {
        this.destroySlideshow()
        this.initialized = false
        this.connectedCallback()
      }

      editorActions(embla) {
        if (document.body.dataset.shopifyEditor === 'true' && this.slides?.length > 1) {
          const blockEditor = (ev) => {
            const { target } = ev
            // Find index on selected slide
            const selectedIndex = Array.from(this.slides).findIndex(
              (slide) => slide?.dataset?.shopifyEditorBlock === target?.dataset?.shopifyEditorBlock
            )
            // Not every slide-show is built from blocks — the product gallery's
            // slides come from product.media, so selecting a PDP block finds
            // nothing here and findIndex returns -1. Scrolling to -1 would yank
            // the gallery to a phantom slide.
            if (selectedIndex < 0) return

            // Go to selected slide on select in editor
            embla.scrollTo(selectedIndex)
          }

          document.addEventListener('shopify:block:select', blockEditor, { signal: this.signal })
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

        // One controller per build. Arrows and thumbnail rails outlive a rebuild — they
        // can sit outside the slide-show entirely — so without this a refresh() would
        // bind them twice and one click would scroll two slides.
        this.controller = new AbortController()
        this.signal = this.controller.signal

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
            mql.addEventListener('change', handler, { signal: this.signal })
            this.mediaQueryHandlers.push({ mql, handler })
          })
        }

        setupBreakpointListeners()

        // Bind every arrow set (nested + external) to the same embla instance.
        // Multiple arrow pairs stay perfectly in sync because they all call
        // through to the same embla.scrollNext / scrollPrev.
        // A drag ends with a click on whatever was under the pointer. That never mattered
        // for small arrow buttons, but the PDP's half-width click zones cover the slides —
        // without this, every swipe would also advance a slide. clickAllowed() is false
        // for exactly that trailing click.
        this.arrowNexts.forEach((btn) => {
          btn.addEventListener('click', () => {
            if (embla.clickAllowed && !embla.clickAllowed()) return
            embla.scrollNext()
            updateSlide()
          }, { signal: this.signal })
        })
        this.arrowPrevs.forEach((btn) => {
          btn.addEventListener('click', () => {
            if (embla.clickAllowed && !embla.clickAllowed()) return
            embla.scrollPrev()
            updateSlide()
          }, { signal: this.signal })
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

          setNavActive(this.currentSlide)

          setTheme()
        }

        // Bring the active thumbnail to the START of its rail's scrollport, on
        // whichever axis overflows — the same rail is a row under the media and
        // a column beside it. Aligning to the start rather than doing the
        // minimum scroll keeps the active thumb high in a tall column instead
        // of clinging to the bottom edge; the browser clamps the request at
        // each end, so the last few thumbs settle without a dead gap.
        //
        // Offsets are measured from the scrollport edge inset by scroll-padding,
        // which is what keeps a thumb clear of the gutter the rails hold at the
        // start — the header gutter on the sticky column, the media gutter on
        // the under/overlaid rows.
        //
        // Deliberately NOT scrollIntoView(): that walks up the ancestor chain
        // and would drag the page (and the sticky header with it) whenever a
        // thumb sat off-screen. Scrolling the rail directly leaves the manual
        // scroll position of everything else alone.
        const revealNavButton = (nav, button) => {
          // The rail the other viewport uses is display:none, and measuring it
          // would just produce zeroed rects.
          if (!nav.clientWidth && !nav.clientHeight) return

          const navBox = nav.getBoundingClientRect()
          const btnBox = button.getBoundingClientRect()
          const style = getComputedStyle(nav)
          const inset = (value) => parseFloat(value) || 0
          const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth'

          // Rounded, and sub-pixel deltas dropped entirely. getBoundingClientRect returns
          // fractions, and the gutters are clamp() values that rarely land on a whole
          // pixel — scrolling by 0.4px leaves a hairline of the neighbouring thumb
          // showing at the edge instead of the active one sitting flush.
          const left = nav.scrollWidth > nav.clientWidth
            ? Math.round(btnBox.left - (navBox.left + inset(style.scrollPaddingLeft)))
            : 0
          const top = nav.scrollHeight > nav.clientHeight
            ? Math.round(btnBox.top - (navBox.top + inset(style.scrollPaddingTop)))
            : 0

          if (!left && !top) return
          nav.scrollBy({ left, top, behavior })
        }

        const setNavActive = (index) => {
          if (!this.navs?.length) return

          // updateSlide re-runs on reInit and on every settle, so only reveal
          // when the selection actually moved. Re-issuing scrollBy mid-flight
          // would measure a half-finished smooth scroll and overshoot it.
          const moved = index !== this.navActiveIndex
          this.navActiveIndex = index

          this.navs.forEach((nav) => {
            let activeButton = null
            nav.querySelectorAll('button').forEach((button, buttonIndex) => {
              const isActive = buttonIndex === index
              button.classList.toggle('active', isActive)
              // Mirrored as an attribute so CSS can hang any treatment off
              // [data-active] — a border, a scale — not just what `.active` styles.
              button.dataset.active = isActive ? 'true' : 'false'
              if (isActive) activeButton = button
            })
            if (activeButton && moved) revealNavButton(nav, activeButton)
          })
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
              button.dataset.active = index === 0 ? 'true' : 'false'
              button.addEventListener('click', () => { embla.scrollTo(index) }, { signal: this.signal })
              this.dotItems.push({ button, index })
            })
          })
        }

        const isEmblaActive = () => Boolean(embla.internalEngine()?.options?.active)

        const renderNav = () => {
          if (!this.navs?.length) return

          this.navs.forEach((nav) => {
            nav.querySelectorAll('button').forEach((button, index) => {
              button.addEventListener('click', () => {
                // When embla is inactive the slides are laid out as a static
                // grid/column, so scrollTo is a no-op — the rail becomes a jump
                // list over the page instead. Slides carry scroll-margin so the
                // sticky header doesn't eat the top of the target.
                if (isEmblaActive()) {
                  embla.scrollTo(index)
                  this.currentSlide = index
                  return
                }

                // The first slide is the top of the gallery, and in a stacked layout
                // that's effectively the top of the page — anything above it
                // (breadcrumbs, the header) is what a shopper expects to get back to.
                // scrollIntoView would stop at the slide's own scroll-margin instead.
                if (index === 0) {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  return
                }

                this.slides[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }, { signal: this.signal })
            })
          })

          observeStaticSlides()
        }

        // Embla emits no scroll events while inactive, so the rail's active
        // state has to come from the page scroll. The rootMargin collapses the
        // viewport to a band at its middle, leaving at most one slide
        // intersecting at a time.
        const observeStaticSlides = () => {
          if (!('IntersectionObserver' in window) || !this.slides.length) return

          this.navObserver = new IntersectionObserver(
            (entries) => {
              if (isEmblaActive()) return
              const current = entries.find((entry) => entry.isIntersecting)
              if (!current) return
              setNavActive(Array.from(this.slides).indexOf(current.target))
            },
            { rootMargin: '-45% 0px -45% 0px' }
          )

          this.slides.forEach((slide) => this.navObserver.observe(slide))
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
        // 'scroll' only fires while a transition is animating, so a snap that
        // lands immediately — a thumbnail click, scrollTo during a variant
        // swap — would otherwise leave the active thumbnail on the old index.
        // 'select' fires the moment the selection changes and 'settle' once it
        // comes to rest; updateSlide is idempotent, so both are safe to add.
        embla.on('select', updateSlide)
        embla.on('settle', updateSlide)
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

      disconnectedCallback() {
        this.destroySlideshow()
        this.initialized = false
      }

      destroySlideshow() {
        // Drop every listener this build added — arrow clicks, dot clicks, thumbnail
        // clicks, breakpoint changes and the editor's block:select hook on `document`,
        // which is the one that outlives the element itself.
        if (this.controller) {
          this.controller.abort()
          this.controller = null
          this.signal = null
        }

        // Destroy Embla instance
        if (this.embla) {
          this.embla.destroy()
          this.embla = null
        }
        // Stop watching slides for the static-mode thumbnail rail
        if (this.navObserver) {
          this.navObserver.disconnect()
          this.navObserver = null
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
