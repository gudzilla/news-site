import { NewsApi } from "./api/newsApi.js";
import { ArticlesView } from "./views/articlesView.js";
import { FilterState } from "./state/filterState.js";
import { SelectCountryView } from "./views/selectCountryView.js";
import { SelectCategoryView } from "./views/selectCategoryView.js";

const menuButton = document.querySelector("#mobileMenuButton");
const headerNav = document.querySelector("#headerNav");

menuButton?.addEventListener("click", function () {
  menuButton?.classList.toggle("mobile-menu-button_active");
  headerNav?.classList.toggle("navbar_mobile");
});

/** @type {?HTMLDivElement} */
const mainNewsArticles = document.querySelector("#mainNewsArticles");

const newsApi = new NewsApi();

const filters = new FilterState();

const articlesComponent = new ArticlesView(mainNewsArticles);

filters.subscribe(async (state) => {
  const response = await newsApi.getTopHeadlines({
    country: state.country,
    category: state.category,
    page: 1,
  });
  const { articles } = response;
  articlesComponent.render(articles.filter((article) => article.title !== "[Removed]" && article.url !== null));
});

filters.initialize({ country: "gb", category: "general" });

new SelectCountryView({ value: filters.getState().country, onChange: filters.setCountry }).render();
new SelectCategoryView({ value: filters.getState().category, onChange: filters.setCategory }).render();
