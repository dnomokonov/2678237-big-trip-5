import AbstractView from '@framework/view/abstract-view';
import {createFiltersTemplate} from './templates';

export default class Filters extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
