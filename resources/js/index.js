import { NewsApi } from "./api/newsApi.js";

const menuButton = document.querySelector("#mobileMenuButton");
const headerNav = document.querySelector("#headerNav");

menuButton.addEventListener("click", function () {
  menuButton.classList.toggle("mobile-menu-button_active");
  headerNav.classList.toggle("navbar_mobile");
});

const mainNewsArticles = document.querySelector("#mainNewsArticles");

function createDomElementWithClasses(htmlTag, ...CSSclasses) {
  const newElem = document.createElement(htmlTag);
  newElem.classList.add(...CSSclasses);
  return newElem;
}

function renderNewsCard(newsArticle) {
  const newsCard = createDomElementWithClasses("div", "articles__news-card", "news-card");
  const articleHeader = createDomElementWithClasses("h2", "news-card__header");
  articleHeader.innerText = newsArticle.title;
  const articleImage = createDomElementWithClasses("img", "news-card__image");
  if (newsArticle.urlToImage) {
    articleImage.src = newsArticle.urlToImage;
  } else {
    articleImage.src = "/resources/images/no-image-dark.png";
  }
  articleImage.setAttribute("onerror", "this.src='/resources/images/no-image-dark.png'");
  articleImage.setAttribute("alt", "News article picture");
  const articleDescription = createDomElementWithClasses("p", "news-card__description");
  console.log(newsArticle.description);
  articleDescription.innerText = newsArticle.description;

  const articleButton = createDomElementWithClasses("button", "news-card__button");
  articleButton.innerText = "Read More";

  newsCard.append(articleHeader);
  newsCard.append(articleImage);
  newsCard.append(articleDescription);
  newsCard.append(articleButton);
  mainNewsArticles.append(newsCard);
}

const newsApi = new NewsApi();

async function loadMainPage() {
  let i = 0;
  const response = await newsApi.getSearchResult({ q: "книги", language: "ru", pageSize: 40, page: 1 });
  console.log(response);
  for (const newsArticle of response.articles) {
    // if (newsArticle.title !== "[Removed]" && newsArticle.description !== null) {
    if (newsArticle.title !== "[Removed]") {
      renderNewsCard(newsArticle);
    }
  }
}

loadMainPage();
