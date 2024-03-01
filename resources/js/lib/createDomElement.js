/**
 * @template {keyof HTMLElementTagNameMap} T
 * @param {T} htmlTag - HTML tag to create
 * @param {Object} options
 * @param {string[]} [options.classNames]
 * @param {Object.<string, string>} [options.attributes]
 * @param {?string} [options.innerText]
 * @returns {HTMLElementTagNameMap[T]}
 */
export function createDomElement(htmlTag, options) {
  const { classNames = [], attributes = {}, innerText } = options;
  const newElem = document.createElement(htmlTag);

  if (classNames.length) {
    newElem.classList.add(...classNames);
  }

  if (innerText) {
    newElem.innerText = innerText;
  }

  for (const [key, value] of Object.entries(attributes)) {
    newElem.setAttribute(key, value);
  }

  return newElem;
}
