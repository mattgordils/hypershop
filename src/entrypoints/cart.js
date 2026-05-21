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
// Every query is scoped to the section wrapper so the drawer and the cart page
// can coexist on the cart page without colliding, even though they share the
// same #cartContent / #cartLineItem / #cartUpdate hooks.
const refreshCartSection = (sectionTitle, fullRefresh = false) => {
  const scope = '#shopify-section-' + sectionTitle
  if (!document.querySelector(scope + ' #cartContent')) {
    // This cart surface isn't on the current page — nothing to refresh
    return false
  }

  return fetch(window.Shopify.routes.root + "?sections=" + sectionTitle)
    .then(res => res.json())
    .then(res => {
      const currentCartContent = document.querySelector(scope + ' #cartContent')

      const el = document.createElement('div')
      el.innerHTML = res[sectionTitle]

      const oldCartCount = document.querySelector(scope + ' #cartHeader')?.dataset.cartCount
      const newCartCount = el.querySelector('#cartHeader')?.dataset.cartCount

      const oldLineCount = document.querySelectorAll(scope + ' #cartLineItem')?.length
      const newLineCount = el.querySelectorAll('#cartLineItem')?.length

      if (newCartCount == 0 || oldCartCount == 0 || oldCartCount == null || (oldLineCount !== newLineCount)) {
        fullRefresh = true
      }

      if (fullRefresh) {
        const newCartContent = el.querySelector('#cartContent')
        if (newCartContent && currentCartContent) {
          currentCartContent.outerHTML = newCartContent.outerHTML
        }
      }

      // Update the partial pieces that live outside #cartContent or need
      // syncing after a partial change (header count, shipping meter, totals).
      const updateItems = document.querySelectorAll(scope + ' #cartUpdate')
      const updatedItems = el.querySelectorAll('#cartUpdate')
      updateItems?.forEach((item, index) => {
        if (updatedItems[index]?.innerHTML && item) {
          item.innerHTML = updatedItems[index].innerHTML
        }
      });

      updateCartCount()
    })
}

// Refresh every cart surface present on the page. The drawer is always rendered
// via the header group; the cart page additionally renders `main_cart`.
export const refreshCart = (fullRefresh = false) => {
  refreshCartSection('page_cart-panel', fullRefresh)
  refreshCartSection('main_cart', fullRefresh)
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