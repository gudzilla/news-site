export class BaseRequest {
  #baseUrl;
  #defaultHeaders;

  constructor({ baseUrl, headers = {} }) {
    this.#baseUrl = baseUrl;
    this.#defaultHeaders = headers;
  }

  #prepairQueryString(params) {
    let queryString = "";

    for (const [key, value] of Object.entries(params)) {
      queryString += queryString === "" ? "?" : "&";
      queryString += `${key}=${value}`;
    }

    return queryString;
  }

  #request({ url, method = "get", params = {}, headers = {} }) {
    const requestHeaders = {
      ...this.#defaultHeaders,
      ...headers,
    };

    const queryString = this.#prepairQueryString(params);

    const promise = fetch(`${this.#baseUrl}${url}${queryString}`, {
      method,
      headers: requestHeaders,
    });

    return promise;
  }

  async get(url, { params, headers } = {}) {
    const response = await this.#request({ url, params, headers });
    const responseData = {};

    responseData.ok = response.ok;
    responseData.status = response.status;

    responseData.headers = {};
    for (const [key, value] of response.headers.entries()) {
      responseData.headers[key] = value;
    }

    if (response.headers.get("content-type").includes("application/json")) {
      console.log("Request response is JSON.");
      responseData.body = await response.json();
    } else {
      console.log("Request response is NOT JSON!");
    }

    return responseData;
  }

  post() {}

  delete() {}

  patch() {}

  put() {}
}
