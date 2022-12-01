import KeenSlider from '../../node_modules/keen-slider/keen-slider.js'
// Additional Plugins
import { sliderNavigation } from './slider-navigation.js'
import { sliderThumbnails } from './slider-thumbnails.js'
import { sliderAutoplay } from './slider-autoplay'

class SliderComponent extends HTMLElement {
  constructor() {
    super();
    this.hasNavigation = true
    this.thumbnailsFor = this.dataset.thumbnails;
    this.sliderMain = document.querySelector('#' + this.thumbnailsFor);
    this.sliderSettings = this?.dataset?.sliderSettings ? JSON.parse(this.dataset.sliderSettings) : false

    this.initPages()
  }

  initPages() {
    let plugins = []
    let mainSlider = false
    let slideCount = 1
    const {
      origin,
      perView,
      spacing,
      mode,
      duration,
      autoplay,
      navigation,
      loop
    } = this.sliderSettings

    if (this?.thumbnailsFor && this?.sliderMain) {
      slideCount = this.sliderMain.querySelectorAll('.keen-slider__slide').length
      mainSlider = new KeenSlider(
        '#Slider-main',
        {
          loop: loop || true,
          initial: 0,
          mode: mode || 'snap',
          defaultAnimation: {
            duration: duration || 750
          },
        },
        [sliderNavigation]
      )
      plugins = [sliderThumbnails(mainSlider)]
    }

    if (autoplay) {
      plugins.push(sliderAutoplay)
    }

    if (navigation) {
      plugins.push(sliderNavigation)
    }

    const slider = new KeenSlider(
      this,
      {
        loop: loop || false,
        initial: 0,
        mode: mode || 'snap',
        drag: this?.thumbnailsFor ? false : true,
        defaultAnimation: {
          duration: duration || 750
        },
        slides: {
          origin: origin || 'auto',
          perView: perView || (this?.thumbnailsFor ? slideCount : 1),
          spacing: spacing || 0,
        },
        created: () => {
          // console.log('created')
        }
      },
      [sliderThumbnails(mainSlider)]
    )
  }
}

customElements.define('slider-component', SliderComponent);