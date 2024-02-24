import { NewsApi } from "./api/newsApi.js";

const DEFAULT_IMAGE = "/resources/images/no-image-dark.png";

const menuButton = document.querySelector("#mobileMenuButton");
const headerNav = document.querySelector("#headerNav");

menuButton.addEventListener("click", function () {
  menuButton.classList.toggle("mobile-menu-button_active");
  headerNav.classList.toggle("navbar_mobile");
});

const mainNewsArticles = document.querySelector("#mainNewsArticles");

function createDomElement(htmlTag, options) {
  const { classNames = [], attributes = {}, innerText } = options;
  const newElem = document.createElement(htmlTag);

  if (classNames.length) {
    newElem.classList.add(...classNames);
  }

  if (innerText) {
    newElem.innerText = innerText;
  }

  if (Object.keys(attributes).length) {
    for (const [key, value] of Object.entries(attributes)) {
      newElem.setAttribute(key, value);
    }
  }

  return newElem;
}

function createDomElementWithClasses(htmlTag, ...CSSclasses) {
  const newElem = document.createElement(htmlTag);
  newElem.classList.add(...CSSclasses);
  return newElem;
}

function renderNewsCard(newsArticle) {
  const newsCard = createDomElement("div", {
    classNames: ["articles__news-card", "news-card"],
  });
  const articleHeader = createDomElement("h2", {
    classNames: ["news-card__header"],
    innerText: newsArticle.title,
  });

  const articleImage = createDomElement("img", {
    classNames: ["news-card__image"],
    attributes: { onerror: `this.src='${DEFAULT_IMAGE}"'`, alt: "News article picture" },
  });
  articleImage.src = newsArticle.urlToImage || DEFAULT_IMAGE;

  const articleDescription = createDomElement("p", {
    classNames: ["news-card__description"],
    innerText: newsArticle.description,
  });
  const articleButton = createDomElement("button", {
    classNames: ["news-card__button"],
    innerText: "Read More",
  });

  newsCard.append(articleHeader, articleImage, articleDescription, articleButton);
  return newsCard;
}

const skipEmptyArticles = (article) => article.title !== "[Removed]";

const newsApi = new NewsApi();

async function loadMainPage() {
  const response = await newsApi.getTopHeadlines({
    country: "gb",
    category: "health",
    page: 1,
  });
  const { articles } = response;
  const cards = articles.filter(skipEmptyArticles).map(renderNewsCard);

  mainNewsArticles.append(...cards);
}

loadMainPage();
