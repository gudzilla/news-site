import { BaseRequest } from "../baseRequest.js";
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
  #pageSize;
  #defaultCountry;
  #defaultParams;
  /**
   * @param {Object} [param0 = {}]
   * @param {string} [param0.country = "us"]
   * @param {number} [param0.pageSize = 30]
   */
  constructor({ country = "us", pageSize = 30 } = {}) {
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
   * @param {String} params.country Country to search news for
   * @param {String} params.category Category to search
   * @param {String} [params.search] Query to search
   * @param {Number} [params.pageSize] Custom pageSize (default: 20)
   * @param {Number} [params.page] Page number
   * @returns {Promise<GetSearchResultResponse>}
   */
  async getTopHeadlines(params) {
    const requestParams = {
      params: {
        ...this.#defaultParams,
        ...params,
      },
    };

    /**
     * @type {import('../baseRequest.js').ResponseData<GetSearchResultResponse>}
     */
    const request = await this.get("/top-headlines", requestParams);

    return request.body;
  }

  /**
   * @async
   * @param {Object} params Parameters for news-sources
   * @param {String} params.category Possible options: business, entertainment, general, health, science, sports, technology
   * @param {String} params.language Sources that display news in a specific language
   * @param {String} params.country Sources that display news in a specific country
   * @param {String} params.q Query to search
   * @param {Number} params.pageSize Custom pageSize (default: 20)
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
   * @param {Object} params Parameters for news search
   * @param {String} params.q  Query to search
   * @param {String} params.searchIn  Options: title, description, content
   * @param {String} params.sources  Id of a news source
   * @param {String} params.language  Language for news search
   * @param {String} params.sortBy  Options: relevancy, popularity, publishedAt
   * @param {String} params.from  Time for the Oldest article allowed. (e.g. 2024-02-10 or 2024-02-10T15:42:50)
   * @param {String} params.to  Time for the newest article allowed (e.g. 2024-02-10 or 2024-02-10T15:42:50)
   * @param {Number} params.pageSize Custom pageSize (default: 30)
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
