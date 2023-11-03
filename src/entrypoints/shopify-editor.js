import { closeModal, openModal } from './modal'
import { toggleCollapsibleItem } from './collapsible'

const refreshSlideshow = section => {
  const sectionSlideshows = section.querySelectorAll('slide-show')
  if (sectionSlideshows?.length > 0) {
    sectionSlideshows.forEach(slideshow => {
      slideshow.slider.update()
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

function blockEditor(ev) {
  const { target } = ev;
  console.log('target: ', target.querySelector('[data-collapsible="content"]'))

  const collapseContent = target.querySelector('[data-collapsible="content"]')
  const collapseIcon = target.querySelector('[data-collapsible="icon"]')

  toggleCollapsibleItem(collapseContent, collapseIcon, 'inherit')
}

document.addEventListener("shopify:section:select", sectionEditor);
document.addEventListener("shopify:section:deselect", sectionEditor);
document.addEventListener("shopify:section:load", sectionEditor);

document.addEventListener("shopify:block:select", blockEditor);
document.addEventListener("shopify:block:deselect", blockEditor);
