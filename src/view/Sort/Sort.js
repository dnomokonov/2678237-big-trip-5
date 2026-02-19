import AbstractView from '@framework/view/abstract-view';
import {createSortingTemplate} from './templates';

export default class Sort extends AbstractView {
  #sorts = [];
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({sorts, currentSortType, onChangeSortType}) {
    super();
    this.#sorts = sorts;
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onChangeSortType;
    this.element.addEventListener('click', this.#handleSortType);
  }

  get template() {
    return createSortingTemplate(this.#sorts, this.#currentSortType);
  }

  #handleSortType = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    const inputId = evt.target.getAttribute('for');
    const input = this.element.querySelector(`#${inputId}`);

    if (!input || input.disabled) {
      return;
    }

    input.checked = true;
    this.#handleSortTypeChange(input.dataset.sortType);
  };
}
