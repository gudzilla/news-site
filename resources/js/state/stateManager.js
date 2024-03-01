export class StateManager {
  #defaultState;
  #currentState;
  /** @type {Function[]} */
  #subscribers = [];
  /** @param {*} state */
  constructor(state) {
    this.#defaultState = state;
    this.#currentState = state;
  }

  /** @param {*} callback */
  setState(callback) {
    this.#currentState = typeof callback === "function" ? callback(this.#currentState) : callback;
    this.#subscribers.forEach((callback) => {
      callback(this.#currentState);
    });
  }

  resetState() {
    this.setState(this.#defaultState);
  }

  getState() {
    return this.#currentState;
  }

  subscribe(callback) {
    this.#subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.#subscribers = this.#subscribers.filter((item) => item !== callback);
  }
}
