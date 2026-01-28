import AbstractView from '@framework/view/abstract-view';
import {createEventTemplate} from '@view/Point/templates';

export default class Point extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createEventTemplate(this.#data);
  }
}
