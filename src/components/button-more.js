import AbstractComponent from "./abstract-component.js";

const createMoreTaskButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createMoreTaskButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
