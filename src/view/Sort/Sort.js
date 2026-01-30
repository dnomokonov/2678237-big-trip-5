import AbstractView from '@framework/view/abstract-view';
import {createSortingTemplate} from './templates';

export default class Sort extends AbstractView {
  #sortItems = null;

  constructor(sortItems) {
    super();
    this.#sortItems = sortItems;
  }

  get template() {
    return createSortingTemplate(this.#sortItems);
  }
}
