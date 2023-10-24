import "../styles/main.scss";
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
        this.qtyInput = this.querySelector("input[data-input='qty']");
        if (!this.addButton) {
          return undefined
        }
        this.addButton.addEventListener("click", (event) => {
          const productOptions = this.querySelectorAll('variant-radios input, variant-selects')
          const selectedOptions = getSelectedOptions(productOptions)

          let variantId = ''
          let variantData = ''
          if (this?.dataset?.variantId) {
            variantId = this.dataset.variantId
          } else {
            variantData = JSON.parse(this.querySelector('[type="application/json"]').textContent)
            variantId = getVariant(selectedOptions, variantData).id
          }
          
          let formData = {
            items: [
              {
                id: variantId,
                quantity: this.qtyInput?.value || 1
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