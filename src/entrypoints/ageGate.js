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
        this.openAgegate();
      }

      openAgegate() {
        console.log('openAgegate')
        const ageTimestamp = localStorage.getItem('legalAgeTimestamp')
        const tokenAge = dayjs(Date()).diff(dayjs(ageTimestamp), 'second', true)
        console.log('tokenAge: ', tokenAge);
        if (!ageTimestamp || tokenAge > 10) {
          localStorage.removeItem('legalAgeTimestamp')
          openModal('ageGate')
        } else {
          console.log('Youre of age!')
        }
      }

      setCookie() {
        localStorage.setItem('legalAgeTimestamp', new Date());
        closeModal();
      }
    }
  );
}