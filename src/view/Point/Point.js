import AbstractView from '@framework/view/abstract-view';
import {createEventTemplate} from '@view/Point/templates';

export default class Point extends AbstractView {
  #data = null;
  #handleEditClick = null;

  constructor({data, onEditClick}) {
    super();
    this.#data = data;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createEventTemplate(this.#data);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
