import { closeModal, openModal } from './modal'
import { toggleCollapsibleItem } from './collapsible'

const refreshSlideshow = section => {
  const sectionSlideshows = section?.querySelectorAll('slide-show')
  if (sectionSlideshows?.length > 0) {
    sectionSlideshows.forEach(slideshow => {
      // `slider` has never been a property of <slide-show> — the instance is on
      // `embla`. This threw a TypeError and took the rest of the handler with
      // it, so setInview() never ran and re-rendered sections stayed hidden.
      slideshow.embla?.reInit()

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

// Drawer sections (cart, search, menu, age gate) reveal themselves when the merchant
// selects them in the editor, so they can see what they're editing.
//
// Opt-in via data-editor-auto-open. A modal that merely lives *inside* a content section
// — the filter drawer inside the product grid — must not hijack selection of that section.
const toggleSectionModal = (section, open = true) => {
  const modal = section?.querySelector('modal-component[data-editor-auto-open]')
  if (!modal) return

  if (open) {
    openModal(modal.id)
  } else {
    closeModal()
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
  const section = ev.target

  // Reveal work first, enhancement second. Anything that makes re-rendered
  // markup visible has to run before the slideshow/modal calls — a throw in
  // one of those used to leave the section invisible, which reads as "the
  // editor didn't re-render" and sends you to save-and-refresh.
  setInview(section)

  if (ev.type === 'shopify:section:select') {
    toggleSectionModal(section)
  }

  if (ev.type === 'shopify:section:deselect') {
    toggleSectionModal(section, false)
  }

  refreshSlideshow(section)
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

// The mini cart only appears after adding to cart, so selecting its block in the editor
// has to reveal it — otherwise there's nothing on screen to edit.
const toggleMiniCart = (target, open) => {
  const miniCart = target.matches?.('mini-cart') ? target : target.querySelector?.('mini-cart')
  if (miniCart) miniCart.dataset.visible = open ? 'true' : 'false'
}

// Selecting a tab's content block in the editor has to switch to that tab, or the
// merchant is editing a panel they can't see — only the active one is visible. Same
// reasoning as the accordion below, which opens the row that was selected.
//
// Re-rendering after a setting change resets the group to its first tab (the `checked`
// attribute comes back with the markup), and the editor re-fires select afterwards — so
// this also restores the tab they were on.
//
// Tabs are radios, so checking the one that belongs to the selected block is the whole
// job — the CSS does the rest. `label.control` is the input the label points at.
const revealTabForBlock = (target) => {
  const label = target.matches?.('.tabs__tab') ? target : target.querySelector?.('.tabs__tab')
  if (label?.control) label.control.checked = true
}

function blockEditor(ev) {
  const { target } = ev

  toggleMiniCart(target, ev.type === 'shopify:block:select')

  if (ev.type === 'shopify:block:select') revealTabForBlock(target)

  const collapseContent = target.querySelector('[data-collapsible="content"]')
  const collapseIcon = target.querySelector('[data-collapsible="icon"]')

  if (collapseContent) {
    toggleCollapsibleItem(collapseContent, collapseIcon, 'inherit')
  }

  // Handle slide selection
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
