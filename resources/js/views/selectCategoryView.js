export class SelectCategoryView {
  #value;
  #onChange;
  constructor({ value, onChange }) {
    this.#value = value;
    this.#onChange = onChange;
  }

  render() {
    const chooseCategory = document.getElementById("chooseCategory");
    if (!chooseCategory) {
      return null;
    }

    /** @type {NodeListOf<HTMLInputElement>} */
    const categorieOptions = document.querySelectorAll('input[name="category"]');
    for (const option of categorieOptions) {
      if (option.value === this.#value) {
        option.setAttribute("checked", "checked");
      }
    }

    chooseCategory?.addEventListener("change", ({ target }) => {
      if (target instanceof HTMLInputElement && target !== null) {
        this.#onChange(target.value);
      }
    });
  }
}
