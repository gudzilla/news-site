export class SearchQueryView {
  #query;
  #sortBy;
  #onChangeQuery;
  #onChangeSort;
  constructor({ query, onChangeQuery, sortBy, onChangeSort }) {
    this.#query = query;
    this.#sortBy = sortBy;
    this.#onChangeQuery = onChangeQuery;
    this.#onChangeSort = onChangeSort;
  }

  render() {
    const debouncedChange = debounce(this.#onChangeQuery, 600);
    let queryString = "";
    let newQueryString;

    /** @type {?HTMLInputElement} */
    const searchQuery = document.querySelector("#searchQuery");
    if (!searchQuery) {
      return null;
    }
    /** @type {?HTMLSelectElement} */
    const sortBy = document.querySelector("#sortBy");
    if (!sortBy) {
      return null;
    }

    sortBy.value = this.#sortBy;
    searchQuery.value = this.#query;

    const sortByBlock = document.getElementById("sortByBlock");

    sortBy?.addEventListener("change", ({ target }) => {
      if (target instanceof HTMLSelectElement && target !== null) {
        this.#onChangeSort(target.value);
      }
    });
    searchQuery?.addEventListener("input", ({ target }) => {
      if (target instanceof HTMLInputElement && target !== null) {
        newQueryString = target.value.trim();
        if (newQueryString !== queryString) {
          debouncedChange(newQueryString);
          queryString = newQueryString;
        }
      }
      if (queryString !== "") {
        if (sortByBlock?.classList.contains("news-filters__sort-by_hidden")) {
          sortByBlock?.classList.remove("news-filters__sort-by_hidden");
        }
      } else {
        sortByBlock?.classList.add("news-filters__sort-by_hidden");
      }
    });
  }
}

// DEBOUNCE
const debounce = (fn, delay = 1000) => {
  let timerId = null;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};
