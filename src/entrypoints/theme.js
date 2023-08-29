import "../styles/main.scss";
import Cookies from "js-cookie";
import './eventbus'
import './modal'
import { closeModal, openModal } from "./modal";

function isMobileOrTablet() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return true; // tablet
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return true; // mobile
  }
  return false;
}

const refreshCart = (fullRefresh = false) => {
  console.log('refreshCart')
  fetch(window.Shopify.routes.root + "?sections=cart")
    .then(res => res.json())
    .then(res => {
      const currentCartDrawer = document.querySelector('#shopify-section-cart #cartContent')

      var el = document.createElement( 'div' );
      el.innerHTML = res['cart']
      const newCartCount = el.querySelector('#cartCount')
      const oldCartCount = document.querySelector('#shopify-section-cart #cartCount')
      if (fullRefresh || (newCartCount !== oldCartCount)) {
        // Full Cart Refresh
        const cartContent = el.querySelector('#cartContent')
        currentCartDrawer.outerHTML = cartContent.outerHTML
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
      const cartCount = el.querySelector('#cartCount')
      const cartCountItems = document.querySelectorAll('#cartCount')
      cartCountItems.forEach(item => {
        item.innerHTML = cartCount.innerHTML
      });
    })
}

if (!customElements.get("email-capture")) {
  customElements.define(
    "email-capture",
    class EmailCapture extends HTMLElement {
      EL_CAPTURE = ".js-emailCapture";
      EL_CLOSE = ".js-emailClose";
      EL_BLURRY = ".js-emailBlurryBg";
      COOKIE = "email_capture_seen";

      constructor() {
        super();
        this.expiration = null;
        this.init();
      }

      showEmailCapture() {
        const elCapture = this.querySelector(this.EL_CAPTURE);
        elCapture.classList.remove("hidden");
        setTimeout(() => elCapture.classList.remove("opacity-0"), 500);
        let body = document.querySelector("body");
        body.setAttribute("data-state-email-capture", "open");
        this.bind();
      }

      hideEmailCapture() {
        const capture = this.querySelector(this.EL_CAPTURE);
        capture.classList.add("opacity-0");
        setTimeout(() => {
          capture.classList.add("hidden");
        }, 600);
        let body = document.querySelector("body");
        body.setAttribute("data-state-email-capture", "closed");
        this.setCookie();
      }

      setCookie() {
        Cookies.set(COOKIE, true, { expires: expiration });
      }

      bind() {
        const elCapture = this.querySelector(this.EL_CAPTURE);
        this.expiration = Number(elCapture.getAttribute("data-cookie"));

        const elCloses = elCapture.querySelectorAll(this.EL_CLOSE);
        elCloses.forEach((elClose) => {
          elClose.removeEventListener("click", this.hideEmailCapture);
          elClose.addEventListener("click", this.hideEmailCapture);
        });
      }

      showInCustomizer(ev) {
        const { target } = ev;
        const elGate = this.querySelector(this.EL_CAPTURE).parentNode;

        if (target == elGate) {
          this.showEmailCapture();
        }
      }

      hideInCustomizer(ev) {
        const { target } = ev;
        const elGate = this.querySelector(this.EL_CAPTURE).parentNode;

        if (target == elGate) {
          this.hideEmailCapture();
        }
      }

      bindCustomizer() {
        document.removeEventListener(
          "shopify:section:select",
          this.showInCustomizer
        );
        document.addEventListener(
          "shopify:section:select",
          this.showInCustomizer
        );

        document.removeEventListener(
          "shopify:section:deselect",
          this.hideInCustomizer
        );
        document.addEventListener(
          "shopify:section:deselect",
          this.hideInCustomizer
        );
      }

      init() {
        const hasCookie = Cookies.get(this.COOKIE) == "true";
        const urlParams = new URLSearchParams(window.location.search);
        const hasEmailCaptureOverride = urlParams.get("email_capture_override");
        if (hasEmailCaptureOverride || !hasCookie) {
          setTimeout(
            () => {
              this.showEmailCapture();
            },
            hasEmailCaptureOverride ? 300 : 30000
          );
        }

        window.clearEmail = () => Cookies.remove(this.COOKIE);
        this.bindCustomizer();
      }
    }
  );
}

if (!customElements.get("add-to-cart-form")) {
  customElements.define(
    "add-to-cart-form",
    class AddToCartForm extends HTMLElement {
      constructor() {
        super();
        this.addButton = this.querySelector(".add-to-cart-btn");
        this.addButton.addEventListener("click", (event) => {
          const variantId = parseInt(this.querySelector("select").value);
          let formData = {
            items: [
              {
                id: variantId,
                quantity: 1,
              },
            ],
          };
          fetch(window.Shopify.routes.root + "cart/add.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((data) => {
              refreshCart();
            })
            .then(() => {
              setTimeout(() => {
                console.log('open')
                openModal("cartDrawer");
              }, 500)
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      }
    }
  );
}

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

if (!customElements.get("show-on-email-sub-success")) {
  customElements.define(
    "show-on-email-sub-success",
    class ShowOnEmailSubSuccess extends HTMLElement {
      constructor() {
        super();
        this.EL_MODAL = ".thank-you-email-subscribe";

        this.closeButton = document.querySelector(
          ".thank-you-email-subscribe-close"
        );
        this.thankYouModal = document.querySelector(
          ".thank-you-email-subscribe"
        );

        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.showInCustomizer = this.showInCustomizer.bind(this);
        this.hideInCustomizer = this.hideInCustomizer.bind(this);
        this.bindCustomizer = this.bindCustomizer.bind(this);

        this.closeButton.addEventListener("click", this.closeModal);
        this.thankYouModal.addEventListener("click", this.closeModal);

        // show toast if customer just subscribed to email
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("customer_posted")) {
          this.showModal();
        }

        this.bindCustomizer();
      }

      closeModal(event) {
        this.thankYouModal.classList.add("opacity-0");
        this.thankYouModal.classList.add("pointer-events-none");
        setTimeout(() => {
          this.thankYouModal.classList.add("hidden");
        }, 3000);
      }

      showModal() {
        this.thankYouModal.classList.remove("hidden");
        this.thankYouModal.classList.remove("opacity-0");
        this.thankYouModal.classList.remove("pointer-events-none");
      }

      showInCustomizer(ev) {
        const { target } = ev;
        const elGate = document.querySelector(this.EL_MODAL).parentNode
          .parentNode;

        if (target == elGate) {
          this.showModal();
        }
      }

      hideInCustomizer(ev) {
        const { target } = ev;
        const elGate = document.querySelector(this.EL_MODAL).parentNode
          .parentNode;

        if (target == elGate) {
          this.closeModal();
        }
      }

      bindCustomizer() {
        document.removeEventListener(
          "shopify:section:select",
          this.showInCustomizer
        );
        document.addEventListener(
          "shopify:section:select",
          this.showInCustomizer
        );

        document.removeEventListener(
          "shopify:section:deselect",
          this.hideInCustomizer
        );
        document.addEventListener(
          "shopify:section:deselect",
          this.hideInCustomizer
        );
      }
    }
  );
}