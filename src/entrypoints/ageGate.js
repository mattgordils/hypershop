import { openModal, closeModal } from "./modal";
import dayjs from "dayjs"

if (!customElements.get("age-gate")) {
  customElements.define(
    "age-gate",
    class AgeGate extends HTMLElement {
      constructor() {
        super();
        //
        this.ageYes = this.querySelector('#ageYes')
        this.ageYes.addEventListener('click', this.setCookie)
        this.expirationLimit = this.dataset.expire
        this.openAgegate();
      }

      openAgegate() {
        const expirationLimit = this.expirationLimit || 2
        const ageTimestamp = localStorage.getItem('legalAgeTimestamp')
        const tokenAge = dayjs(Date()).diff(dayjs(ageTimestamp), 'day', true)
        if (!ageTimestamp || tokenAge > expirationLimit) {
          localStorage.removeItem('legalAgeTimestamp')
          openModal('ageGate')
        }
      }

      setCookie() {
        localStorage.setItem('legalAgeTimestamp', new Date());
        closeModal();
      }
    }
  );
}