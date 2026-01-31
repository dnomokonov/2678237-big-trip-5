import AbstractView from '@framework/view/abstract-view';
import {createSortingTemplate} from './templates';

export default class Sort extends AbstractView {
  #sorts = null;

  constructor(sorts) {
    super();
    this.#sorts = sorts;
  }

  get template() {
    return createSortingTemplate(this.#sorts);
  }
}
