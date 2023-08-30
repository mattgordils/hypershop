import "../styles/main.scss";
import Cookies from "js-cookie";
import './modal';
import { openModal } from "./modal";
import { refreshCart } from "./cart";

// Utils?
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

const arraysEqual = (a, b) => {
  if (a === b) return true;
  // console.log('arry eq', a, b)
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // // If you don't care about the order of the elements inside
  // // the array, you should sort both arrays here.
  // // Please note that calling sort on an array will modify that array.
  // // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
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

// Get variant ID from selection
export const getVariant = (selected, variantData) => {
  const currentVariant = variantData.find((variant) => {
    return arraysEqual(variant.options, selected)
  });
  return currentVariant
}

// Get currently selected options
export const getSelectedOptions = productOptions => {
  const selectedOptions = []
  productOptions.forEach(option => {
    if (option.querySelector('select')) {
      const selectElement = option.querySelector('select')
      selectedOptions.push(selectElement.value)
    } else if (option.checked) {
      selectedOptions.push(option.value)
    }
  })
  return selectedOptions
}

if (!customElements.get("add-to-cart-form")) {
  customElements.define(
    "add-to-cart-form",
    class AddToCartForm extends HTMLElement {
      constructor() {
        super();
        this.addButton = this.querySelector(".add-to-cart-btn");
        if (!this.addButton) {
          return undefined
        }
        this.addButton.addEventListener("click", (event) => {
          
          const productOptions = this.querySelectorAll('variant-radios input, variant-selects')
          const variantData = JSON.parse(this.querySelector('[type="application/json"]').textContent)
          const selectedOptions = getSelectedOptions(productOptions)
          const variantId = getVariant(selectedOptions, variantData).id
          
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
            .then(() => { openModal("cartDrawer") })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
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