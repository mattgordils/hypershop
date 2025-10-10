/**
 * Variant Selection Handler
 *
 * Manages product variant selection and updates UI accordingly.
 * Works in two contexts:
 * - PDP (Product Detail Page): Updates URL and re-renders product content
 * - Cards (Collection/Cart): Re-renders individual product cards
 *
 * Uses Shopify's full page fetch + DOM replacement strategy for performance.
 */

import { getVariant } from './global'

class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);

    // Determine context: PDP vs Cards
    this.isPDP = this.dataset.context === 'PDP';

    // Initialize only on first page load (not after re-render)
    if (this.isPDP && !this.isReinitialization()) {
      this.init();
    }
  }

  /**
   * Check if this is a re-initialization after section re-render
   * If URL has variant param, we just re-rendered and shouldn't init again
   */
  isReinitialization() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('variant');
  }

  /**
   * Initialize on page load
   * Gets current variant and syncs URL (PDP only)
   */
  init() {
    this.updateCurrentVariant();

    if (this.currentVariant) {
      this.updateURL();
    }
  }

  /**
   * Handle variant option change (user interaction)
   * Main entry point for variant updates
   */
  onVariantChange() {
    // Step 1: Determine which variant is now selected
    this.updateCurrentVariant();

    if (!this.currentVariant) {
      return;
    }

    // Step 3: Store variant ID (will be needed after DOM replacement)
    const variantId = this.currentVariant.id;

    // Step 4: Update UI based on context
    if (this.isPDP) {
      this.updateURL();           // Update browser URL
      this.updateSection(variantId); // Re-render product section
    } else {
      this.updateSection(variantId); // Re-render product card only
    }
  }

  /**
   * Determine currently selected variant
   * Reads all option selections and matches against variant data
   */
  updateCurrentVariant() {
    // Find form containing variant data
    const form = this.closest('add-to-cart-form');
    if (!form) {
      return;
    }

    // Get variant data JSON
    const jsonScript = form.querySelector('[type="application/json"]');
    if (!jsonScript) {
      return;
    }

    const variantData = JSON.parse(jsonScript.textContent);

    // Collect selected options from UI
    const selectedOptions = this.getSelectedOptions(form);

    // Match selections to variant
    this.currentVariant = getVariant(selectedOptions, variantData);
  }

  /**
   * Extract selected option values from form
   * Handles both select dropdowns and radio buttons
   */
  getSelectedOptions(form) {
    const selectedOptions = [];

    // Get values from variant-selects (dropdown selects)
    const variantSelects = form.querySelectorAll('variant-selects select');
    variantSelects.forEach(select => {
      selectedOptions.push(select.value);
    });

    // Get values from variant-radios (radio buttons)
    const variantRadioGroups = form.querySelectorAll('variant-radios fieldset');
    variantRadioGroups.forEach(fieldset => {
      const checkedRadio = fieldset.querySelector('input[type="radio"]:checked');
      if (checkedRadio) {
        selectedOptions.push(checkedRadio.value);
      }
    });

    return selectedOptions;
  }

  /**
   * Update browser URL with variant parameter
   * PDP only - keeps URL in sync with selection
   */
  updateURL() {
    if (!this.isPDP || !this.currentVariant) return;

    const productUrl = this.dataset.url || this.closest('[data-url]')?.dataset.url;
    if (!productUrl) return;

    const url = `${productUrl}?variant=${this.currentVariant.id}`;
    window.history.replaceState({}, '', url);
  }

  /**
   * Re-render product content via Shopify page fetch
   *
   * Strategy:
   * 1. Fetch full product page with new variant
   * 2. Parse HTML to find matching section
   * 3. Replace only [data-dynamic-content] elements
   * 4. Preserves wrapper/scripts to avoid event listener loss
   */
  updateSection(variantId) {
    if (!variantId) return;

    // Find container that needs updating
    const containerElement = this.closest('[data-product-update]');

    if (!containerElement) {
      return;
    }

    const updateId = containerElement.dataset.productUpdate || '';

    // Find parent Shopify section
    const section = this.closest('.shopify-section');

    if (!section) return;

    const sectionId = section.id.replace('shopify-section-', '');
    if (!sectionId) return;

    // Build fetch URL
    const fetchUrl = this.buildFetchURL(variantId, sectionId);
    if (!fetchUrl) return;

    // Fetch and update (will auto-detect Sections API vs full page)
    this.fetchAndReplace(fetchUrl, section, containerElement, updateId, sectionId);
  }

  /**
   * Build URL to fetch updated content
   * Both PDP and Cards use Sections API for optimized performance
   *
   * Uses Sections API when available for better performance (smaller payload)
   */
  buildFetchURL(variantId, sectionId) {
    if (this.isPDP) {
      // PDP: Use current page with Sections API
      return `${window.location.pathname}?variant=${variantId}&sections=${sectionId}`;
    } else {
      // Cards: Use product page with Sections API
      const productUrl = this.dataset.url || this.closest('[data-url]')?.dataset.url;
      return productUrl ? `${productUrl}?variant=${variantId}&sections=${sectionId}` : null;
    }
  }

  /**
   * Fetch page and replace dynamic content elements
   * Handles both Sections API (JSON response) and full page (HTML) automatically
   */
  fetchAndReplace(fetchUrl, section, containerElement, updateId, sectionId) {
    fetch(fetchUrl)
      .then(response => {
        const contentType = response.headers.get('content-type');

        // Check if this is a Sections API response (JSON)
        if (contentType && contentType.includes('application/json')) {
          return response.json().then(data => {
            return { type: 'json', data };
          });
        } else {
          return response.text().then(html => {
            return { type: 'html', data: html };
          });
        }
      })
      .then(({ type, data }) => {
        let fetchedSection;

        if (type === 'json') {
          // Sections API response - parse the section HTML from JSON
          const sectionHTML = data[sectionId];

          if (!sectionHTML) {
            // Fallback: Try without Sections API
            const fallbackUrl = fetchUrl.replace(/&sections=[^&]*/, '');
            return this.fetchAndReplace(fallbackUrl, section, containerElement, updateId, sectionId);
          }

          const parser = new DOMParser();
          const tempDoc = parser.parseFromString(sectionHTML, 'text/html');
          fetchedSection = tempDoc.body.firstChild;
        } else {
          // Full page HTML - extract the section
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          fetchedSection = doc.querySelector(`#${section.id}`);

          console.log(doc)
        }

        if (!fetchedSection) {
          return;
        }

        console.log('fetchedSection', fetchedSection)

        // Check if fetched section is significantly smaller (likely incomplete in dev mode)
        const sizeRatio = fetchedSection.innerHTML.length / section.innerHTML.length;

        if (sizeRatio < 0.8 && this.isPDP) {
          const fallbackUrl = fetchUrl.replace(/&sections=[^&]*/, '');
          return this.fetchAndReplace(fallbackUrl, section, containerElement, updateId, sectionId);
        }

        // Find container in fetched section
        const selector = updateId ? `[data-product-update="${updateId}"]` : '[data-product-update]';
        const newContainer = fetchedSection.querySelector(selector);

        console.log('selector: ', selector)
        console.log('newContainer: ', newContainer)

        if (!newContainer) {
          return;
        }

        // Replace dynamic content elements
        this.replaceDynamicElements(containerElement, newContainer);
      })
      .catch(error => {
        console.error('Error updating section:', error);
      });
  }

  /**
   * Replace all [data-dynamic-content] elements
   * Preserves static wrapper to keep event listeners intact
   */
  replaceDynamicElements(containerElement, newContainer) {
    const oldDynamicElements = containerElement.querySelectorAll('[data-dynamic-content]');
    const newDynamicElements = newContainer.querySelectorAll('[data-dynamic-content]');

    // Replace each matching pair
    oldDynamicElements.forEach((oldElement, index) => {
      const newElement = newDynamicElements[index];
      if (newElement && oldElement.parentNode) {
        // Only skip updates for actual image galleries (aspect-square class)
        // Don't skip for product info sections that happen to contain images
        const isImageGallery = oldElement.classList.contains('aspect-square');

        if (isImageGallery) {
          // Compare image sources to see if variant image changed
          const oldImg = oldElement.querySelector('img');
          const newImg = newElement.querySelector('img');

          if (oldImg && newImg && oldImg.src === newImg.src) {
            return;
          }
        }

        oldElement.parentNode.replaceChild(
          document.importNode(newElement, true),
          oldElement
        );
      }
    });

    // After replacing elements, trigger reinitialization for custom elements
    // This ensures event listeners are reattached to new DOM nodes
    const event = new CustomEvent('section:updated', {
      bubbles: true,
      detail: { container: containerElement }
    });
    containerElement.dispatchEvent(event);
  }
}

// Register custom element
if (!customElements.get('variant-selects')) {
  customElements.define('variant-selects', VariantSelects);
}

/**
 * Variant Radios - extends VariantSelects
 * Same functionality but for radio button interfaces
 */
class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }
}

// Register custom element
if (!customElements.get('variant-radios')) {
  customElements.define('variant-radios', VariantRadios);
}
