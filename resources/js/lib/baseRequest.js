/**
 * @template T
 * @typedef ResponseData
 * @property {boolean} ok
 * @property {number} status
 * @property {Object.<string, string>} headers
 * @property {T} body
 */

export class BaseRequest {
  #baseUrl;
  #defaultHeaders;

  constructor({ baseUrl, headers = {} }) {
    this.#baseUrl = baseUrl;
    this.#defaultHeaders = headers;
  }

  /**
   * @param {Headers} headers
   * @param {string} contentType
   * @returns {boolean}
   */
  #contentIs(headers, contentType) {
    return headers.get("content-type")?.includes(contentType) ?? false;
  }

  /**
   * @param {Headers} headers
   * @returns {Object.<string, string>}
   */
  #toObject(headers) {
    /** @type {Object.<string, string>} */
    const newObj = {};
    for (const [key, value] of headers.entries()) {
      newObj[key] = value;
    }
    return newObj;
  }
  /**
   *
   * @param {Object.<string,string>} params
   * @returns {string}
   */
  #prepairQueryString(params) {
    const queryString = new URLSearchParams(params);
    return "?" + queryString.toString();
  }

  /**
   *
   * @param {Object} param0
   * @param {string} param0.url
   * @param {string} [param0.method = get]
   * @param {Object.<string, string>} param0.params
   * @param {Object.<string, string>} [param0.headers]
   * @returns {Promise}
   */
  #request({ url, method = "get", params = {}, headers = {} }) {
    const requestHeaders = {
      ...this.#defaultHeaders,
      ...headers,
    };

    const queryString = this.#prepairQueryString(params);

    return fetch(`${this.#baseUrl}${url}${queryString}`, {
      method,
      headers: requestHeaders,
    });
  }

  /**
   * Description placeholder
   * @async
   * @template T
   * @param {String} url
   * @param {Object} [options]
   * @param {Object} [options.params]
   * @param {Object.<string, string>} [options.headers]
   * @returns {Promise<ResponseData<T>>}
   */

  async get(url, { params, headers } = {}) {
    const response = await this.#request({ url, params, headers });

    const body = this.#contentIs(response.headers, "application/json") ? await response.json() : await response.text();

    const responseData = {
      ok: response.ok,
      status: response.status,
      headers: this.#toObject(response.headers),
      body,
    };

    return responseData;
  }
}
