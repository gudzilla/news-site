import { StateManager } from "./stateManager.js";

export class FilterState extends StateManager {
  constructor() {
    super({
      country: "us",
      category: "general",
      q: "",
      searchIn: "title,description,content",
      language: "en",
      sortBy: "publishedAt",
    });
    this.setCountry = this.setCountry.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
  }

  /**
   *
   * @param {Object} params
   * @param {string} [params.country] - Country to search news for
   * @param {string} [params.category] - News category
   * @param {string} [params.q] - Query to searchb
   * @param {string} [params.searchIn] - Options: title, description, content
   * @param {string} [params.sortBy] - Options: relevancy, popularity, publishedAt
   */

  initialize(params) {
    this.setState((currentState) => ({ ...currentState, ...params }));
  }

  /** @param {string} country */
  setCountry(country) {
    this.setState((currentState) => {
      return { ...currentState, country };
    });
  }
  /** @param {string} category */
  setCategory(category) {
    this.setState((currentState) => {
      return { ...currentState, category };
    });
  }
  /** @param {string} q */
  setQuery(q) {
    this.setState((currentState) => {
      return { ...currentState, q };
    });
  }
  /** @param {string} sortBy */
  setSortBy(sortBy) {
    this.setState((currentState) => {
      return { ...currentState, sortBy };
    });
  }
}
