const debounce = (fn, wait = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

// Refresh Cart
const updateCartCount = () => {
  const cartCountItems = document.querySelectorAll('#cartCount')
  cartCountItems.forEach(item => {
    const newCartCount = document.querySelector('#cartHeader')?.dataset.cartCount
    let prependContent = ''
    let appendContent = ''
    if (newCartCount > 0) {
      if (item.dataset.emptyHide) {
        item.classList.remove('hidden')
      }
      if (item.dataset.prepend) {
        prependContent = item.dataset.prepend
      }
      if (item.dataset.append) {
        appendContent = item.dataset.append
      }
      item.innerHTML = prependContent + newCartCount + appendContent
    } else {
      if (item.dataset.emptyHide) {
        item.classList.add('hidden')
      }
      item.innerHTML = null
    }
  });
}

// Refresh a single cart surface (the cart drawer or the cart page) in place.
// Every query is scoped to the surface's own root so the drawer and the cart page
// can coexist on the cart page without colliding, even though they share the
// same #cartContent / #cartLineItem / #cartUpdate hooks.
//
// `root` carries data-cart-section="{{ section.id }}" — the id has to come from Liquid,
// not the section's filename. A section placed by a JSON template gets a generated id
// (template--123__main), so hardcoding 'main-cart' silently matched nothing and the cart
// page never refreshed.
const refreshCartSection = (root, fullRefresh = false) => {
  const sectionId = root?.dataset.cartSection
  if (!sectionId || !root.querySelector('#cartContent')) {
    // This cart surface isn't on the current page — nothing to refresh
    return false
  }

  return fetch(window.Shopify.routes.root + "?sections=" + sectionId)
    .then(res => res.json())
    .then(res => {
      const currentCartContent = root.querySelector('#cartContent')

      const el = document.createElement('div')
      el.innerHTML = res[sectionId]

      const oldCartCount = root.querySelector('#cartHeader')?.dataset.cartCount
      const newCartCount = el.querySelector('#cartHeader')?.dataset.cartCount

      const oldLineCount = root.querySelectorAll('#cartLineItem')?.length
      const newLineCount = el.querySelectorAll('#cartLineItem')?.length

      if (newCartCount == 0 || oldCartCount == 0 || oldCartCount == null || (oldLineCount !== newLineCount)) {
        fullRefresh = true
      }

      if (fullRefresh) {
        const newCartContent = el.querySelector('#cartContent')
        if (newCartContent && currentCartContent) {
          // The note lives inside #cartContent, so a full refresh would discard whatever
          // is being typed (removing an item mid-sentence, say). Carry the in-progress
          // text and the caret across the swap, then let the component save it.
          const oldNote = currentCartContent.querySelector('[data-cart-note]')
          const noteValue = oldNote?.value
          const noteFocused = oldNote && document.activeElement === oldNote
          const caret = oldNote?.selectionStart

          currentCartContent.outerHTML = newCartContent.outerHTML

          const freshNote = root.querySelector('[data-cart-note]')
          if (freshNote && noteValue != null && freshNote.value !== noteValue) {
            freshNote.value = noteValue
            freshNote.dispatchEvent(new Event('input', { bubbles: true }))
            if (noteFocused) {
              freshNote.focus()
              freshNote.setSelectionRange(caret, caret)
            }
          }
        }
      }

      // Update the partial pieces that live outside #cartContent or need
      // syncing after a partial change (header count, shipping meter, totals).
      const updateItems = root.querySelectorAll('#cartUpdate')
      const updatedItems = el.querySelectorAll('#cartUpdate')
      updateItems?.forEach((item, index) => {
        if (updatedItems[index]?.innerHTML && item) {
          item.innerHTML = updatedItems[index].innerHTML
        }
      });

      updateCartCount()
    })
}

// Refresh every cart surface present on the page — the drawer (rendered in the layout)
// and, on the cart page, the cart section too. Both tag themselves with
// data-cart-section, so new surfaces are picked up without touching this file.
//
// Only #cartContent and the #cartUpdate fragments are swapped, never the whole section:
// app blocks live outside #cartContent, so their DOM (and any JS an app bound to it)
// survives a cart update untouched.
export const refreshCart = (fullRefresh = false) => {
  document.querySelectorAll('[data-cart-section]').forEach((root) => {
    refreshCartSection(root, fullRefresh)
  })
}

// Order note. Saves to cart.note as the shopper types (debounced) and again on blur, so
// the note survives a cart refresh — a refresh re-renders it from the saved cart, and
// anything still unsaved would be lost.
//
// Deliberately does NOT call refreshCart(): re-rendering the cart while someone is typing
// would blow away the textarea they're in.
if (!customElements.get("cart-note")) {
  customElements.define(
    "cart-note",
    class CartNote extends HTMLElement {
      connectedCallback() {
        this.controller = new AbortController()
        this.input = this.querySelector("[data-cart-note]")
        this.status = this.querySelector("[data-cart-note-status]")
        if (!this.input) return

        this.lastSaved = this.input.value
        this.debouncedSave = debounce(() => this.save(), 600)

        this.input.addEventListener("input", this.debouncedSave, { signal: this.controller.signal })
        this.input.addEventListener("blur", () => this.save(), { signal: this.controller.signal })
      }

      disconnectedCallback() {
        this.controller?.abort()
        this.saveController?.abort()
      }

      save = () => {
        const note = this.input.value
        if (note === this.lastSaved) return

        this.saveController?.abort()
        this.saveController = new AbortController()
        this.lastSaved = note

        fetch(window.Shopify.routes.root + "cart/update.js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note }),
          signal: this.saveController.signal,
        })
          .then((response) => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            this.setStatus("Note saved")
          })
          .catch((error) => {
            if (error.name === "AbortError") return
            console.error("Error saving cart note:", error)
            this.lastSaved = null // let the next attempt retry
            this.setStatus("Couldn't save your note")
          })
      }

      setStatus = (message) => {
        if (!this.status) return
        this.status.textContent = message
        this.status.classList.remove("opacity-0")
        clearTimeout(this.statusTimer)
        this.statusTimer = setTimeout(() => this.status.classList.add("opacity-0"), 2000)
      }
    }
  )
}

// Remove Cart Item
if (!customElements.get("cart-remove-item")) {
  customElements.define(
    "cart-remove-item",
    class CartRemoveItem extends HTMLElement {
      constructor() {
        super();
        this.cartRemoveButton = this.querySelector(".cart-remove-item");
        this.cartRemoveButton.addEventListener("click", (event) => {
          let formData = {
            updates: {
              [event.currentTarget.dataset.itemId]: 0,
            },
          }

          if (event.currentTarget.dataset.itemId.includes(', ')) {
            const variantIds = event?.currentTarget?.dataset?.itemId.split(', ')?.filter(item => item !== '')
            const updatesObj = {}
            if (variantIds.length > 0) {
              variantIds.forEach(id => {
                updatesObj[id] = 0
              })
            }

            formData = {
              updates: updatesObj
            }
          }
          
          fetch(window.Shopify.routes.root + "cart/update.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((data) => {
              refreshCart(true);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      }
    }
  );
}

// Update Cart Quantity
if (!customElements.get("cart-quantity-adjust")) {
  customElements.define(
    "cart-quantity-adjust",
    class QuantityAdjust extends HTMLElement {
      constructor() {
        super();
        this.quantityChangeButtons = this.querySelectorAll(".quantity-change");
        this.onQuantityChangeButtonClick = this.onQuantityChangeButtonClick.bind(this);

        this.quantityChangeButtons.forEach((quantityChangeButton) => {
          quantityChangeButton.onclick = this.onQuantityChangeButtonClick;
        });
      }

      onQuantityChangeButtonClick(event) {
        const quantityChangeButton = event.currentTarget;
        this.getQuantityDivFromChangeButton(quantityChangeButton).classList.add(
          "opacity-0"
        );
        const itemId = parseInt(
          quantityChangeButton.getAttribute("data-product-id")
        );
        const itemQuantity = parseInt(
          quantityChangeButton.getAttribute("data-new-quantity")
        );

        let formData = {
          updates: {
            [itemId]: itemQuantity,
          },
        };
        let successHandler = (response) => {
          const parent = quantityChangeButton.parentElement;
          this.getQuantityDivFromChangeButton(quantityChangeButton).innerHTML =
            itemQuantity;
          this.getQuantityDivFromChangeButton(
            quantityChangeButton
          ).classList.remove("opacity-0");

          const decreaseQuantityButton = parent.querySelector(".quantity-down");
          decreaseQuantityButton.setAttribute(
            "data-new-quantity",
            itemQuantity - 1
          );

          const increaseQuantityButton = parent.querySelector(".quantity-up");
          increaseQuantityButton.setAttribute(
            "data-new-quantity",
            itemQuantity + 1
          );
          return response.json();
        };
        successHandler = successHandler.bind(quantityChangeButton);
        fetch(window.Shopify.routes.root + "cart/update.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((data) => successHandler(data))
          .then((data) => {
            refreshCart();
            document.querySelectorAll(".cart-item-count").forEach((element) => {
              element.innerHTML = data.item_count;
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      getQuantityDivFromChangeButton(buttonDiv) {
        const parent = buttonDiv.parentElement;
        return parent.querySelector(".quantity-current");
      }
    }
  );
}

// Discount Form
if (!customElements.get("discount-form")) {
  customElements.define(
    "discount-form",
    class DiscountForm extends HTMLElement {
      constructor() {
        super();
        this.input = this.querySelector('input[type="text"]');
        this.button = this.querySelector('button');
        this.statusMessage = this.querySelector('.discount-status');

        // Bind event handlers
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        // Set initial button state
        this.updateButtonState();

        // Add event listeners
        this.input.addEventListener('input', this.onInputChange);
        this.input.addEventListener('keydown', this.onKeyDown);
        this.button.addEventListener('click', this.onSubmit);
      }

      onKeyDown(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (!this.button.disabled) {
            this.onSubmit(event);
          }
        }
      }

      onInputChange() {
        this.updateButtonState();
        // Clear status message when user starts typing
        if (this.statusMessage) {
          this.statusMessage.textContent = '';
          this.statusMessage.classList.add('hidden');
        }
      }

      updateButtonState() {
        const hasValue = this.input.value.trim().length > 0;
        this.button.disabled = !hasValue;

        if (hasValue) {
          this.button.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
          this.button.classList.add('opacity-50', 'cursor-not-allowed');
        }
      }

      showStatus(message, isError = false) {
        if (!this.statusMessage) return;

        this.statusMessage.textContent = message;
        this.statusMessage.classList.remove('hidden');

        if (isError) {
          this.statusMessage.classList.remove('text-green');
          this.statusMessage.classList.add('text-error');
        } else {
          this.statusMessage.classList.remove('text-error');
          this.statusMessage.classList.add('text-green');
        }
      }

      onSubmit(event) {
        event.preventDefault();

        const discountCode = this.input.value.trim();
        if (!discountCode) return;

        // Disable button and show loading state
        this.button.disabled = true;
        this.button.classList.add('opacity-50');
        const originalText = this.button.textContent;
        this.button.textContent = 'Applying...';

        // Store the cart state before applying discount
        let cartBeforeDiscount = null;

        fetch(window.Shopify.routes.root + 'cart.js')
          .then(res => res.json())
          .then(cart => {
            cartBeforeDiscount = cart;

            // Apply discount code
            return fetch(window.Shopify.routes.root + 'discount/' + encodeURIComponent(discountCode));
          })
          .then(() => {
            // Small delay to ensure Shopify has processed the discount
            return new Promise(resolve => setTimeout(resolve, 500));
          })
          .then(() => {
            // Refresh the cart to show updated totals
            refreshCart(true);

            // Check if discount was applied by fetching cart again
            return fetch(window.Shopify.routes.root + 'cart.js');
          })
          .then(res => res.json())
          .then(cart => {
            // Reset button state
            this.button.textContent = originalText;
            this.updateButtonState();

            // Check if discount was applied
            if (cart.cart_level_discount_applications && cart.cart_level_discount_applications.length > 0) {
              const appliedDiscount = cart.cart_level_discount_applications.find(
                d => d.title.toLowerCase() === discountCode.toLowerCase()
              );
              if (appliedDiscount) {
                this.showStatus(`Discount code "${discountCode}" applied successfully!`);
                this.input.value = '';
                return;
              }
            }

            // Discount wasn't applied - determine why
            let errorMessage = `Discount code "${discountCode}" could not be applied.`;

            // Check if cart is empty
            if (!cart.items || cart.items.length === 0) {
              errorMessage += ' Your cart is empty.';
            }
            // Check if cart total is too low (common minimum purchase requirement)
            else if (cartBeforeDiscount && cart.total_price < 100) { // Less than $1
              errorMessage += ' This discount may require a minimum purchase amount.';
            }
            // Check if there are any items that might be excluded
            else if (cart.items && cart.items.length > 0) {
              errorMessage += ' This code may be invalid, expired, or not applicable to items in your cart.';
            }
            else {
              errorMessage += ' Please check the code and try again.';
            }

            this.showStatus(errorMessage, true);
          })
          .catch((error) => {
            console.error('Error applying discount:', error);

            // Reset button state
            this.button.textContent = originalText;
            this.updateButtonState();
            this.showStatus('Error applying discount code. Please check your connection and try again.', true);
          });
      }
    }
  );
}

// Remove Discount
if (!customElements.get("discount-remove")) {
  customElements.define(
    "discount-remove",
    class DiscountRemove extends HTMLElement {
      constructor() {
        super();
        this.button = this.querySelector('button');

        // Bind event handler
        this.onRemove = this.onRemove.bind(this);

        // Add event listener
        this.button.addEventListener('click', this.onRemove);
      }

      onRemove(event) {
        event.preventDefault();

        // Disable button and add loading state
        this.button.disabled = true;
        this.button.classList.add('opacity-50');

        // Remove discount by sending empty string to /cart/update.js
        fetch(window.Shopify.routes.root + 'cart/update.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            discount: '' // Empty string removes the discount
          })
        })
        .then(response => response.json())
        .then(data => {
          // Refresh the cart to show updated totals
          refreshCart(true);

          // Re-enable button
          this.button.disabled = false;
          this.button.classList.remove('opacity-50');
        })
        .catch((error) => {
          console.error('Error removing discount:', error);

          // Re-enable button
          this.button.disabled = false;
          this.button.classList.remove('opacity-50');

          // Still try to refresh cart
          refreshCart(true);
        });
      }
    }
  );
}