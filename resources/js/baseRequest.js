export class BaseRequest {
  #baseUrl;
  #defaultHeaders;

  constructor({ baseUrl, headers = {} }) {
    this.#baseUrl = baseUrl;
    this.#defaultHeaders = headers;
  }

  #contentIs(headers, contentType) {
    return headers.get("content-type").includes(contentType);
  }

  #toObject(headers) {
    const newObj = {};
    for (const [key, value] of headers.entries()) {
      newObj[key] = value;
    }
    return newObj;
  }

  #prepairQueryString(params) {
    const queryString = new URLSearchParams(params);
    return "?" + queryString.toString();
  }

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
