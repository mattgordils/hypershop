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
      console.warn('No variant found for selection');
      return;
    }

    // Step 2: Store variant ID (will be needed after DOM replacement)
    const variantId = this.currentVariant.id;

    // Step 3: Update UI based on context
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
    const form = this.closest('.add-to-cart-form, add-to-cart-form, #add-to-cart-form');
    if (!form) {
      console.warn('Form container not found');
      return;
    }

    // Get variant data JSON
    const jsonScript = form.querySelector('[type="application/json"]');
    if (!jsonScript) {
      console.warn('Variant JSON not found');
      return;
    }

    const variantData = JSON.parse(jsonScript.textContent);

    // Collect selected options from UI
    const selectedOptions = this.getSelectedOptions(form);

    console.log('Selected options:', selectedOptions);
    console.log('Variant data sample:', variantData[0]?.options);

    // Match selections to variant
    this.currentVariant = getVariant(selectedOptions, variantData);
    console.log('Current variant:', this.currentVariant);
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
      console.warn('No data-product-update element found');
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

    this.logDebugInfo(variantId, sectionId, updateId, fetchUrl);

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
   * Log debug information for troubleshooting
   */
  logDebugInfo(variantId, sectionId, updateId, fetchUrl) {
    console.log('=== Section Update Debug ===');
    console.log('isPDP:', this.isPDP);
    console.log('window.location.pathname:', window.location.pathname);
    console.log('variantId:', variantId);
    console.log('sectionId:', sectionId);
    console.log('updateId:', updateId);
    console.log('Fetching:', fetchUrl);
    console.log('===========================');
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
          return response.json().then(data => ({ type: 'json', data }));
        } else {
          return response.text().then(html => ({ type: 'html', data: html }));
        }
      })
      .then(({ type, data }) => {
        let fetchedSection;

        if (type === 'json') {
          // Sections API response - parse the section HTML from JSON
          console.log('Using Sections API (optimized)');
          const sectionHTML = data[sectionId];
          if (!sectionHTML) {
            console.warn('No section HTML in response');
            return;
          }

          const parser = new DOMParser();
          const tempDoc = parser.parseFromString(sectionHTML, 'text/html');
          fetchedSection = tempDoc.body.firstChild;
        } else {
          // Full page HTML - extract the section
          console.log('Using full page fetch');
          console.log('Fetched HTML length:', data.length);

          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          fetchedSection = doc.querySelector(`#${section.id}`);
        }

        if (!fetchedSection) {
          console.warn('Could not find section in response');
          return;
        }

        console.log('Fetched section HTML length:', fetchedSection.innerHTML.length);
        console.log('Current section HTML length:', section.innerHTML.length);

        // Find container in fetched section
        const selector = updateId ? `[data-product-update="${updateId}"]` : '[data-product-update]';
        const newContainer = fetchedSection.querySelector(selector);

        console.log('Looking for selector:', selector);
        console.log('New container found:', newContainer);

        if (!newContainer) {
          console.warn('Could not find matching container in fetched section');
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

    console.log('Found', oldDynamicElements.length, 'old dynamic elements:', oldDynamicElements);
    console.log('Found', newDynamicElements.length, 'new dynamic elements:', newDynamicElements);

    // Replace each matching pair
    oldDynamicElements.forEach((oldElement, index) => {
      const newElement = newDynamicElements[index];
      if (newElement && oldElement.parentNode) {
        console.log('Replacing dynamic element', index);
        oldElement.parentNode.replaceChild(
          document.importNode(newElement, true),
          oldElement
        );
      }
    });
  }

  /**
   * Legacy method - kept for backwards compatibility
   * Not used in current implementation
   */
  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
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

  /**
   * Override: Get selected values from radio buttons
   */
  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked)?.value;
    }).filter(Boolean);
  }
}

// Register custom element
if (!customElements.get('variant-radios')) {
  customElements.define('variant-radios', VariantRadios);
}
