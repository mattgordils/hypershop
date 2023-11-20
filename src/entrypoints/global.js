import "../styles/main.scss";
import { openModal } from "./modal";
import { refreshCart } from "./cart";

// Components
import './modal';
import './collapsible';
import './inView';

// Console Signature
document.addEventListener('DOMContentLoaded', () => {
  console.log('\n╔    ╗  Site by STUDIO HYPERLINK\n║ ╠╣ ║  www.studiohyper.link\n╚    ╝  Hot Bagels, Hotter Websites\n ');
})

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

export const docReady = fn => {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1)
  } else {
      document.addEventListener("DOMContentLoaded", fn)
  }
}

docReady(() => {
  const windowHeight = window.innerHeight
  if (isMobileOrTablet()) {
    document.body.style.setProperty('--vh', `${windowHeight * 0.01}px`)
  }
})

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
          event.preventDefault();
          const productOptions = this.querySelectorAll('variant-radios input, variant-selects')
          const selectedOptions = getSelectedOptions(productOptions)

          const subscription = this.querySelector('.rc-widget .rc-selling-plans select.rc-selling-plans-dropdown__select')
          const propertiesInputs = this.querySelectorAll('[name^="property_"]')

          console.log('propertiesInputs: ',propertiesInputs)
          
          let properties = {}
          if (propertiesInputs?.length > 0) {
            propertiesInputs.forEach(prop => {
              let title = ''
              let value = false
              if (prop?.dataset?.title) {
                title = prop.dataset.title
              }

              if (prop.type === 'fieldset') {
                const checkedItems = prop.querySelectorAll('input')
                const checkedValues = []
                checkedItems.forEach(item => {
                  if (item.checked) {
                    checkedValues.push(item.value)
                  }
                })
                value = checkedValues.join(', ')
              } else {
                value = prop.dataset.value || prop.value
              }
              
              if (value) {
                properties[title] = value
              }
            })
          }

          console.log('properties: ',properties)

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
                selling_plan: subscription?.value || null,
                quantity: this.qtyInput?.value || 1,
                properties: properties
              }
            ]
          }

          fetch(window.Shopify.routes.root + "cart/add.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          })
          .then(data => {
            console.log(data)
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