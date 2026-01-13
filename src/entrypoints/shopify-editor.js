import { closeModal, openModal } from './modal'
import { toggleCollapsibleItem } from './collapsible'

const refreshSlideshow = section => {
  const sectionSlideshows = section.querySelectorAll('slide-show')
  if (sectionSlideshows?.length > 0) {
    sectionSlideshows.forEach(slideshow => {
      slideshow.slider.update()

      // Restore slide position after reload
      const storedSlideIndex = sessionStorage.getItem(`slideshow-${section.id}-index`)
      if (storedSlideIndex !== null && slideshow.embla) {
        const index = parseInt(storedSlideIndex)

        // Store original autoplay and disable it
        if (!slideshow.dataset.originalAutoplay) {
          slideshow.dataset.originalAutoplay = slideshow.dataset.autoplay
        }
        slideshow.dataset.autoplay = 'false'

        setTimeout(() => {
          slideshow.embla.scrollTo(index)
          // Stop autoplay after scrolling
          const autoplayPlugin = slideshow.embla.plugins().autoplay
          if (autoplayPlugin) {
            autoplayPlugin.stop()
          }
        }, 100)
      }
    })
  }
}

const toggleSectionModal = (section, open = true) => {
  if (section.querySelector('modal-component')) {
    if (open) {
      const modal = section.querySelector('modal-component')
      openModal(modal.id)
    } else {
      closeModal()
    }
  }
}

const setInview = (section) => {
  if (section.querySelector('in-view')) {
    const inViewItems = section.querySelectorAll('in-view')
    inViewItems.forEach(item => {
      if (!item.classList.contains('in-view')) {
        item.classList.add('in-view')
      }
    })
  }
}

function sectionEditor(ev) {
  const { target } = ev;
  const section = document.querySelector('#' + target.id)

  console.log(ev)

  // Cart Drawer
  if (ev.type === 'shopify:section:select') {
    // Open Section Modal On Select
    toggleSectionModal(section)
    // Refresh Slideshows On Select
    refreshSlideshow(section)
    // Make Sure in-view items transition in
    setInview(section)
  }

  if (ev.type === 'shopify:section:deselect') {
    // Close Section Modal On Select
    toggleSectionModal(section, false)
    // Refresh Slideshows On Select
    refreshSlideshow(section)
    // Make Sure in-view items transition in
    setInview(section)
  }

  if (ev.type === 'shopify:section:load') {
    // Refresh Slideshows On Select
    refreshSlideshow(section)
    // Make Sure in-view items transition in
    setInview(section)
  }

  return
}

const handleSlideSelection = (target, isSelect) => {
  const section = target.closest('[data-shopify-editor-section]')
  const slideshow = section?.querySelector('slide-show')

  if (slideshow && slideshow.embla) {
    const slides = Array.from(slideshow.querySelectorAll('.slider-slide'))

    // First, try to find slider-slide that matches the block's shopify-editor-block ID (for direct blocks)
    let sliderSlide = slides.find(
      (slide) => slide?.dataset?.shopifyEditorBlock === target?.dataset?.shopifyEditorBlock
    )

    // If not found, check if the target is a child block inside a slider-slide
    if (!sliderSlide) {
      sliderSlide = slides.find((slide) => {
        // Check if this slide contains a block that contains the target
        const blockInSlide = slide.querySelector(`[data-shopify-editor-block="${target?.dataset?.shopifyEditorBlock}"]`)
        return blockInSlide !== null
      })
    }

    if (sliderSlide) {
      if (isSelect) {
        // Store the current slide index for restoration after section reload
        const slideIndex = sliderSlide.dataset.index
        if (section && slideIndex !== undefined) {
          sessionStorage.setItem(`slideshow-${section.id}-index`, slideIndex)
        }

        // Store original autoplay value if not already stored
        if (!slideshow.dataset.originalAutoplay) {
          slideshow.dataset.originalAutoplay = slideshow.dataset.autoplay
        }
        // Disable autoplay
        slideshow.dataset.autoplay = 'false'
        // Stop autoplay if it's running
        const autoplayPlugin = slideshow.embla.plugins().autoplay
        if (autoplayPlugin) {
          autoplayPlugin.stop()
        }
      } else {
        // Clear stored slide index on deselect
        if (section) {
          sessionStorage.removeItem(`slideshow-${section.id}-index`)
        }

        // Restore original autoplay value
        if (slideshow.dataset.originalAutoplay) {
          slideshow.dataset.autoplay = slideshow.dataset.originalAutoplay
          delete slideshow.dataset.originalAutoplay
          // Restart autoplay if it was originally enabled
          if (slideshow.dataset.autoplay === 'true') {
            const autoplayPlugin = slideshow.embla.plugins().autoplay
            if (autoplayPlugin) {
              autoplayPlugin.play()
            }
          }
        }
      }
    }
  }
}

function blockEditor(ev) {
  const { target } = ev

  const collapseContent = target.querySelector('[data-collapsible="content"]')
  const collapseIcon = target.querySelector('[data-collapsible="icon"]')

  if (collapseContent) {
    toggleCollapsibleItem(collapseContent, collapseIcon, 'inherit')
  }

  // Handle slide selection
  console.log('EV: ', ev.type)

  if (ev.type === 'shopify:block:select') {
    handleSlideSelection(target, true)
  } else if (ev.type === 'shopify:block:deselect') {
    handleSlideSelection(target, false)
  }
}

document.addEventListener("shopify:section:select", sectionEditor);
document.addEventListener("shopify:section:deselect", sectionEditor);
document.addEventListener("shopify:section:load", sectionEditor);

document.addEventListener("shopify:block:select", blockEditor);
document.addEventListener("shopify:block:deselect", blockEditor);
