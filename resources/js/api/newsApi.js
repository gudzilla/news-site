import { BaseRequest } from "../lib/baseRequest.js";
/**
 * @typedef Article
 * @property {string} author
 * @property {?string} content
 * @property {?string} description
 * @property {string} title
 * @property {string} url
 * @property {?string} urlToImage
 */

/**
 * @typedef GetSearchResultResponse
 * @property {Article[]} articles
 * @property {number} totalResults
 */

/**
 * @typedef Source
 * @property {string} category
 * @property {string} country
 * @property {string} description
 * @property {string} id
 * @property {string} language
 * @property {string} name
 * @property {string} url
 */

/**
 * @typedef GetNewsSourcesResponse
 * @property {Source[]} sources
 */

export class NewsApi extends BaseRequest {
  #API_KEY = "44378235c0ac40778296d3adf6921a8d";
  #defaultCountry;
  #defaultParams;
  /**
   * @param {Object} [param0 = {}]
   * @param {string} [param0.country = "us"]
   * @param {number} [param0.pageSize = 25]
   */
  constructor({ country = "us", pageSize = 25 } = {}) {
    super({ baseUrl: "https://newsapi.org/v2" });
    this.#defaultCountry = country;
    this.#defaultParams = {
      pageSize: pageSize,
      apiKey: this.#API_KEY,
    };
  }

  /**
   * @async
   * @param {Object} params Parameters for news
   * @param {String} [params.country] Country to search news for
   * @param {String} params.category Category to search
   * @param {Number} [params.pageSize] Custom pageSize (default: 20)
   * @param {Number} [params.page] Page number
   * @returns {Promise<GetSearchResultResponse>}
   */
  async getTopHeadlines(params) {
    const requestParams = {
      params: {
        country: this.#defaultCountry,
        ...this.#defaultParams,
        ...params,
      },
    };

    /**
     * @type {import('../lib/baseRequest.js').ResponseData<GetSearchResultResponse>}
     */
    const request = await this.get("/top-headlines", requestParams);

    return request.body;
  }

  /**
   * @async
   * @param {Object} params Parameters for news search
   * @param {String} params.q  Query to search
   * @param {String} [params.sortBy]  Options: relevancy, popularity, publishedAt
   * @param {Number} [params.pageSize] Custom pageSize (default: 30)
   * @param {Number} [params.page] Page number
   * @returns {Promise<GetSearchResultResponse>}
   */
  async getSearchResult(params) {
    const requestParams = {
      params: {
        ...this.#defaultParams,
        ...params,
      },
    };

    const request = await this.get("/everything", requestParams);
    return request.body;
  }

  async getNews(params) {
    if (params.q !== "") {
      return this.getSearchResult({
        q: `"${params.q}"`,
        sortBy: params.sortBy,
      });
    } else {
      return this.getTopHeadlines({
        category: params.category,
        country: params.country,
      });
    }
  }
}
