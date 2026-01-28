import AbstractView from '@framework/view/abstract-view';
import {createFormTemplate} from './templates';

export default class Form extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createFormTemplate(this.#data);
  }
}
