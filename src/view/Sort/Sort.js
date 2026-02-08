import AbstractView from '@framework/view/abstract-view';
import {createSortingTemplate} from './templates';

export default class Sort extends AbstractView {
  #sorts = null;
  #handleSortTypeChange = null;

  constructor({sorts, onChangeSortType}) {
    super();
    this.#sorts = sorts;
    this.#handleSortTypeChange = onChangeSortType;
    this.element.addEventListener('click', this.#handleSortType);
  }

  get template() {
    return createSortingTemplate(this.#sorts);
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
