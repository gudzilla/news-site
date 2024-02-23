import { BaseRequest } from "../baseRequest.js";
/**
 * @typedef Article
 * @property {string} author
 * @property {?string} content
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
  #pageSize;
  #defaultCountry;
  #defaultParams;
  /**
   * @constructor
   * @param {{ country?: string; pageSize?: number; }} [param0={}]
   * @param {string} [param0.country="gb"]
   * @param {number} [param0.pageSize=21]
   */
  constructor({ country = "gb", pageSize = 30 } = {}) {
    super({ baseUrl: "https://newsapi.org/v2" });
    this.#defaultCountry = country;
    this.#defaultParams = {
      pageSize: pageSize,
      apiKey: this.#API_KEY,
    };
  }

  /**
   * @async
   * @param params {Object} Parameters for news
   * @param params.country {String} Country to search news for
   * @param params.category {String} Category to search
   * @param params.search {String} Query to search
   * @param params.pageSize {Number} Custom pageSize (default: 20)
   * @returns {Promise<GetSearchResultResponse>}
   */
  async getTopHeadlines(params) {
    const requestParams = {
      params: {
        ...this.#defaultParams,
        ...params,
      },
    };

    const request = await this.get("/top-headlines", requestParams);

    return request.body;
  }

  /**
   * @async
   * @param params {Object} Parameters for news-sources
   * @param params.category {String} Possible options: business, entertainment, general, health, science, sports, technology
   * @param params.language {String} Sources that display news in a specific language
   * @param params.country {String} Sources that display news in a specific country
   * @returns {Promise<GetNewsSourcesResponse>}
   */
  async getNewsSources(params) {
    const requestParams = {
      params: {
        apiKey: this.#API_KEY,
        ...params,
      },
    };

    const request = await this.get("/top-headlines/sources", requestParams);

    return request.body;
  }

  /**q
   * @async
   * @param params {Object} Parameters for news search
   * @param params.search {String} Query to search
   * @param params.searchIn {String} Options: title, description, content
   * @param params.sources {String} Id of a news source
   * @param params.language {String} Language for news search
   * @param params.sortBy {String} Options: relevancy, popularity, publishedAt
   * @param params.from {String} Time for the Oldest article allowed. (e.g. 2024-02-10 or 2024-02-10T15:42:50)
   * @param params.to {String} Time for the newest article allowed (e.g. 2024-02-10 or 2024-02-10T15:42:50)
   * @param params.pageSize {Number} Custom pageSize (default: 20)
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
}
