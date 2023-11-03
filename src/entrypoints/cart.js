// Refresh Cart
export const refreshCart = (fullRefresh = false) => {
  const cartDrawer = document.querySelector('#shopify-section-cart #cartContent')
  if (!cartDrawer) {
    // Don't run if no cart drawer section is found
    return false
  }

  fetch(window.Shopify.routes.root + "?sections=cart")
    .then(res => res.json())
    .then(res => {
      const currentCartDrawer = document.querySelector('#shopify-section-cart #cartContent')
      const currentCartHeader = document.querySelector('#shopify-section-cart #cartHeader')

      var el = document.createElement( 'div' );
      el.innerHTML = res['cart']
      const oldCartCount = document.querySelector('#shopify-section-cart #cartHeader').dataset.cartCount
      const newCartCount = el.querySelector('#cartHeader').dataset.cartCount

      const oldlineCount = document.querySelectorAll('#shopify-section-cart #cartLineItem')?.length
      const newlineCount = el.querySelectorAll('#shopify-section-cart #cartLineItem')?.length

      if (newCartCount == 0 || oldCartCount == 0 || (oldlineCount !== newlineCount)) {
        fullRefresh = true
      }

      if (fullRefresh) {
        // Full Cart Refresh
        const cartContent = el.querySelector('#cartContent')
        const cartHeader = el.querySelector('#cartHeader')
        currentCartDrawer.outerHTML = cartContent.outerHTML
        currentCartHeader.outerHTML = cartHeader.outerHTML
      } else {
        // Update Cart Pieces
        const updateItems = document.querySelectorAll('#shopify-section-cart #cartUpdate')
        const updatedItems = el.querySelectorAll('#shopify-section-cart #cartUpdate')
        updateItems.forEach((item, index) => {
          item.innerHTML = updatedItems[index].innerHTML
        });
      }

      // Close if removing the last item from the cart
      // if (newCartCount.innerHTML == 0) {
      //   setTimeout(() => {
      //     closeModal()
      //   }, 500)
      // }

      // Update Cart Counts Globally
      const cartCountItems = document.querySelectorAll('#cartCount')
      cartCountItems.forEach(item => {
        item.innerHTML = newCartCount
      });
    })
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
          };
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
          // .then((data) => {console.log(data)})
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