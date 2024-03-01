import { createDomElement } from "../lib/createDomElement.js";

const DEFAULT_IMAGE = "resources/images/no-image-dark.png";

export class ArticlesView {
  #renderArea;

  /**
   *  @param {?HTMLElement} container
   */
  constructor(container) {
    this.#renderArea = container;
  }

  /**
   * @param {import('../api/newsApi.js').Article} article
   * @returns {boolean}
   */

  /**
   * @param {import('../api/newsApi.js').Article} newsArticle
   * @returns {HTMLDivElement}
   */
  #createArticleCard(newsArticle) {
    const newsCard = createDomElement("div", {
      classNames: ["articles__news-card", "news-card"],
    });
    const articleHeader = createDomElement("h2", {
      classNames: ["news-card__header"],
      innerText: newsArticle.title,
    });

    const articleImage = createDomElement("img", {
      classNames: ["news-card__image"],
      attributes: {
        onerror: `this.src='${DEFAULT_IMAGE}'`,
        alt: "News article picture",
        src: newsArticle.urlToImage || DEFAULT_IMAGE,
      },
    });

    const articleDescription = createDomElement("p", {
      classNames: ["news-card__description"],
      innerText: newsArticle.description,
    });
    const articleButton = createDomElement("a", {
      classNames: ["news-card__link"],
      attributes: {
        href: newsArticle.url,
        target: "_blank",
      },
      innerText: "Read More",
    });

    newsCard.append(articleHeader, articleImage, articleDescription, articleButton);
    return newsCard;
  }

  /** Renders news articles cards
   *  @param {import('../api/newsApi.js').Article[]} articles
   */
  render(articles) {
    const cards = articles.map(this.#createArticleCard);
    if (this.#renderArea?.innerHTML) {
      this.#renderArea.innerHTML = "";
    }
    this.#renderArea?.append(...cards);
  }
}
