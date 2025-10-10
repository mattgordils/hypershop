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
   * Build availability map for option values
   * Based on the current variant selections, determines which option values
   * have at least one available variant
   */
  buildAvailabilityMap(variants, currentVariant) {
    const map = {};
    const currentOptions = currentVariant.options;

    // For each option position (0, 1, 2)
    for (let position = 0; position < currentOptions.length; position++) {
      // Get all unique values for this option position
      const uniqueValues = [...new Set(variants.map(v => v.options[position]))];

      uniqueValues.forEach(value => {
        const mapKey = `${position + 1}-${value}`;

        // Check if there's an available variant with this value
        // that matches the other currently selected options
        const hasAvailableVariant = variants.some(variant => {
          if (!variant.available) return false;
          if (variant.options[position] !== value) return false;

          // Check if this variant matches other selected options
          for (let i = 0; i < currentOptions.length; i++) {
            if (i === position) continue; // Skip the position we're checking
            if (variant.options[i] !== currentOptions[i]) {
              return false;
            }
          }

          return true;
        });

        map[mapKey] = hasAvailableVariant;
      });
    }

    return map;
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
      // Cards: Use Shopify product JSON endpoint
      const productUrl = this.dataset.url || this.closest('[data-url]')?.dataset.url;
      return productUrl ? `${productUrl}.js` : null;
    }
  }

  /**
   * Fetch page and replace content
   * PDP: Fetches section HTML and replaces dynamic content
   * Cards: Fetches product JSON and updates image/price/button
   */
  fetchAndReplace(fetchUrl, section, containerElement, updateId, sectionId) {
    if (!this.isPDP) {
      // Cards: Use existing variant data from the page (no fetch needed!)
      // The product_option_form already has all variant data in a JSON script tag
      const form = this.closest('add-to-cart-form');
      const jsonScript = form.querySelector('[type="application/json"]');

      if (!jsonScript) {
        console.error('Could not find variant data JSON in card');
        return;
      }

      const variantData = JSON.parse(jsonScript.textContent);
      console.log('Variant data from page:', variantData);
      console.log('Current variant:', this.currentVariant);

      // Find the selected variant
      const selectedVariant = variantData.find(v => v.id === this.currentVariant.id);

      if (!selectedVariant) {
        console.error('Could not find selected variant in variant data');
        return;
      }

      console.log('Selected variant:', selectedVariant);

      // Update card image if variant has an image
      if (selectedVariant.featured_image) {
        const imgElement = containerElement.querySelector('img');
        if (imgElement) {
          // Get the original image's width and height attributes to determine aspect ratio
          const width = imgElement.getAttribute('width') || 640;
          const height = imgElement.getAttribute('height');

          let targetWidth = 640;
          let targetHeight;

          // If we have height, calculate the aspect ratio and maintain it
          if (height) {
            const ratio = width / height;
            targetHeight = Math.round(targetWidth / ratio);
          } else {
            // Default to 3:4 ratio (0.75) which is used in product cards
            targetHeight = Math.round(targetWidth / 0.75); // 853
          }

          // Use Shopify's image sizing with both width and height to crop/scale properly
          const imageUrl = selectedVariant.featured_image.src;
          const sizedImageUrl = imageUrl.replace(/\.(jpg|jpeg|png|gif|webp)/i, `_${targetWidth}x${targetHeight}_crop_center.$1`);
          imgElement.src = sizedImageUrl;
          // Clear srcset so browser uses our sized src
          imgElement.srcset = '';
        }
      }

      // Update price and compare_at_price
      const priceContainer = containerElement.querySelector('[id^="cardPrice-"]');
      if (priceContainer) {
        // Update meta price for schema.org
        const priceMetaElement = priceContainer.querySelector('[itemprop="price"]');
        if (priceMetaElement) {
          const formattedPrice = (selectedVariant.price / 100).toFixed(2);
          priceMetaElement.content = formattedPrice;
        }

        // Find the price display element (rendered by product_price snippet)
        const priceDisplay = priceContainer.querySelector('#productPrice');
        if (priceDisplay) {
          const price = selectedVariant.price / 100;
          const compareAtPrice = selectedVariant.compare_at_price ? selectedVariant.compare_at_price / 100 : null;

          const priceWrapper = priceDisplay.querySelector('[data-variant-price]')
          const compareAtPriceWrapper = priceDisplay.querySelector('[data-price-compare]')

          // Format using Shopify money format (assuming USD for now)
          const formatMoney = (cents) => {
            return `$${(cents).toFixed(2)}`;
          };

          if (compareAtPrice && compareAtPrice > price) {
            // Show sale price with compare at price
            compareAtPriceWrapper.innerHTML = formatMoney(price)
          } else {
            // Regular price only
            priceWrapper.innerHTML = formatMoney(price)
          }
        }
      }

      // Build availability map for all option values
      // This tells us which option values have at least one available variant
      const availabilityMap = this.buildAvailabilityMap(variantData, selectedVariant);

      // Update all variant selectors to match the selected variant
      // Update radio buttons
      const variantRadios = containerElement.querySelectorAll('variant-radios');
      variantRadios.forEach((radioGroup, index) => {
        const optionValue = selectedVariant.options[index];
        const radioInputs = radioGroup.querySelectorAll('input[type="radio"]');

        radioInputs.forEach(radio => {
          const isSelected = radio.value === optionValue;
          const mapKey = `${index + 1}-${radio.value}`;
          const isAvailable = availabilityMap[mapKey];

          // Update checked state
          radio.checked = isSelected;
          if (isSelected) {
            radio.setAttribute('checked', 'checked');
          } else {
            radio.removeAttribute('checked');
          }

          // Update disabled state
          if (isAvailable) {
            radio.removeAttribute('disabled');
            radio.disabled = false;
          } else {
            radio.setAttribute('disabled', 'disabled');
            radio.disabled = true;
          }

          // Update label classes for visual feedback
          const label = radioGroup.querySelector(`label[for="${radio.id}"]`);
          if (label) {
            if (isSelected) {
              label.classList.add('border-current');
              label.classList.remove('border-transparent');
            } else {
              label.classList.remove('border-current');
              label.classList.add('border-transparent');
            }

            if (!isAvailable) {
              label.classList.add('cursor-not-allowed', 'text-light-text-color', 'opacity-50');
              label.classList.remove('cursor-pointer');
            } else {
              label.classList.remove('cursor-not-allowed', 'text-light-text-color', 'opacity-50');
              label.classList.add('cursor-pointer');
            }
          }
        });
      });

      // Update select dropdowns
      const variantSelectElements = containerElement.querySelectorAll('variant-selects select');
      variantSelectElements.forEach((select, index) => {
        const optionValue = selectedVariant.options[index];

        // Update selected value
        select.value = optionValue;
        Array.from(select.options).forEach(option => {
          if (option.value === optionValue) {
            option.setAttribute('selected', 'selected');
          } else {
            option.removeAttribute('selected');
          }

          // Update disabled state
          const mapKey = `${index + 1}-${option.value}`;
          const isAvailable = availabilityMap[mapKey];

          if (isAvailable) {
            option.removeAttribute('disabled');
            option.disabled = false;
          } else {
            option.setAttribute('disabled', 'disabled');
            option.disabled = true;
          }
        });
      });

      // Update product URLs to include variant
      const productLinks = containerElement.querySelectorAll('a[href*="/products/"]');
      productLinks.forEach(link => {
        const url = new URL(link.href);
        url.searchParams.set('variant', selectedVariant.id);
        link.href = url.toString();
      });

      // Update badges based on variant
      const saleBadge = containerElement.querySelector('[data-badge="sale"]');
      if (saleBadge) {
        const isOnSale = selectedVariant.compare_at_price && selectedVariant.compare_at_price > selectedVariant.price;
        if (isOnSale) {
          saleBadge.classList.remove('hidden');
        } else {
          saleBadge.classList.add('hidden');
        }
      }

      const soldOutBadge = containerElement.querySelector('[data-badge="sold-out"]');
      if (soldOutBadge) {
        if (!selectedVariant.available) {
          soldOutBadge.classList.remove('hidden');
        } else {
          soldOutBadge.classList.add('hidden');
        }
      }

      // Trigger reinitialization
      const event = new CustomEvent('section:updated', {
        bubbles: true,
        detail: { container: containerElement }
      });
      containerElement.dispatchEvent(event);

      return;
    }

    // PDP: Fetch section HTML
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
        }

        if (!fetchedSection) {
          return;
        }

        // Check if fetched section is significantly smaller (likely incomplete in dev mode)
        const sizeRatio = fetchedSection.innerHTML.length / section.innerHTML.length;

        if (sizeRatio < 0.8 && this.isPDP) {
          const fallbackUrl = fetchUrl.replace(/&sections=[^&]*/, '');
          return this.fetchAndReplace(fallbackUrl, section, containerElement, updateId, sectionId);
        }

        // Find container in fetched section
        const selector = updateId ? `[data-product-update="${updateId}"]` : '[data-product-update]';
        const newContainer = fetchedSection.querySelector(selector);

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
