import AbstractView from '@framework/view/abstract-view';
import {createFormTemplate} from './templates';

export default class Form extends AbstractView {
  #data = null;
  #handleCloseEdit = null;

  constructor({data, onEditClick}) {
    super();
    this.#data = data;
    this.#handleCloseEdit = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandleClick);
  }

  get template() {
    return createFormTemplate(this.#data);
  }

  #closeHandleClick = (evt) => {
    evt.preventDefault();
    this.#handleCloseEdit();
  };
}
