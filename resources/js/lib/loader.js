const loader = document.getElementById("loader");

export class Loader {
  show() {
    loader.classList.remove("main-news__loader_notVisible");
  }
  hide() {
    loader.classList.add("main-news__loader_notVisible");
  }
}
