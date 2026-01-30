import AbstractView from '@framework/view/abstract-view';
import {createFormTemplate} from './templates';

export default class Form extends AbstractView {
  #data = null;
  #handleCloseEdit = null;
  #handleSubmitForm = null;

  constructor({data, onEditClick, onSubmitForm}) {
    super();
    this.#data = data;
    this.#handleCloseEdit = onEditClick;
    this.#handleSubmitForm = onSubmitForm;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandleClick);
    this.element.addEventListener('submit', this.#submitHandleClick);
  }

  get template() {
    return createFormTemplate(this.#data);
  }

  #closeHandleClick = (evt) => {
    evt.preventDefault();
    this.#handleCloseEdit();
  };

  #submitHandleClick = (evt) => {
    evt.preventDefault();
    this.#handleSubmitForm();
  };
}
