import AbstractView from '@framework/view/abstract-view';
import {createMessageTemplate} from './templates';

export default class Message extends AbstractView {
  #message = null;

  constructor({message}) {
    super();
    this.#message = message;
  }

  get template() {
    return createMessageTemplate(this.#message);
  }
}
