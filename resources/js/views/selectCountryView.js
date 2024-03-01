export class SelectCountryView {
  #value;
  #onChange;
  constructor({ value, onChange }) {
    this.#value = value;
    this.#onChange = onChange;
  }

  render() {
    /** @type {?HTMLSelectElement} */
    const selectCountry = document.querySelector("#selectCountry");
    if (!selectCountry) {
      return null;
    }

    selectCountry.value = this.#value;

    selectCountry?.addEventListener("change", ({ target }) => {
      if (target instanceof HTMLSelectElement && target !== null) {
        this.#onChange(target.value);
      }
    });
  }
}
