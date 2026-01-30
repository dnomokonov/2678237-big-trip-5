import AbstractView from '@framework/view/abstract-view';
import {createSortingTemplate} from '@view/Filter/templates';

export default class Filters extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createSortingTemplate(this.#filters);
  }
}
