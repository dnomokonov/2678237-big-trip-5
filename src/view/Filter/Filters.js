import AbstractView from '@framework/view/abstract-view';
import {createFiltersTemplate} from './templates';

export default class Filters extends AbstractView {
  #filters = [];
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#handleFilterType);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilterType);
  }

  #handleFilterType = (evt) => {
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
    return this.#handleFilterTypeChange(input.dataset.filterType);
  };
}
