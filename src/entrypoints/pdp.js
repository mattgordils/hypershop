if (!customElements.get("pdp-qty-input")) {
  customElements.define(
    "pdp-qty-input",
    class PdpQtyInput extends HTMLElement {
      constructor() {
        super();
        //
        console.log(this.dataset)
        this.qtyInput = this.querySelector('input[data-input="qty"]')

        this.qtyAdjustDecrease = this.querySelector('button#qtyDown')
        this.qtyAdjustIncrease = this.querySelector('button#qtyUp')

        this.minLimit = parseInt(this.dataset.minCount)
        this.maxLimit = parseInt(this.dataset.maxCount)
        this.increment = this?.dataset?.increment ? parseInt(this?.dataset?.increment) : 1

        this.qtyValue = parseInt(this.qtyInput.value)
        this.nextUp = this.qtyValue + this.increment
        this.nextDown = this.qtyValue - this.increment

        this.qtyAdjustIncrease.addEventListener("click", () => this.updateInput('up'))
        this.qtyAdjustDecrease.addEventListener("click", () => this.updateInput('down'))
        this.setDisabled()
      }

      setDisabled() {
        console.log('this.nextDown', this.nextDown)
        console.log('this.nextUp', this.nextUp)
        if (this.nextUp > this.maxLimit) {
          this.qtyAdjustIncrease.disabled = true
        } else {
          this.qtyAdjustIncrease.disabled = false
        }

        if (this.nextDown < this.minLimit) {
          this.qtyAdjustDecrease.disabled = true
        } else {
          this.qtyAdjustDecrease.disabled = false
        }

        // if (this.qtyInput.value == this.minLimit) {
        //   this.qtyAdjustDecrease.disabled = true
        // } else {
        //   this.qtyAdjustDecrease.disabled = false
        //   this.qtyAdjustIncrease.disabled = false
        // }
      }

      updateInput(direction) {
        let nextUp = this.qtyInput.value + this.increment
        let nextDown = this.qtyInput.value - this.increment
        if (direction === 'up') {
          this.qtyInput.value = parseInt(this.qtyInput.value) + this.increment
        } else {
          this.qtyInput.value = this.qtyInput.value - this.increment
        }
        this.nextUp = parseInt(this.qtyInput.value) + this.increment
        this.nextDown = parseInt(this.qtyInput.value) - this.increment
        this.setDisabled()
      }
    }
  );
};

// Recharge Subscription
// const subscriptionWidget = document.querySelector('.rc-container-wrapper')
// const subscriptionOptions = document?.querySelectorAll('.rc_widget__option__label')

// if (subscriptionOptions) {
//   subscriptionOptions.forEach(option => {
//     console.log('OPTION')
//   })
// }