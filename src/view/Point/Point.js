import AbstractView from '@framework/view/abstract-view';
import {createEventTemplate} from './templates';

export default class Point extends AbstractView {
  #data = null;
  #handleEditClick = null;
  #handleToggleFavorite = null;

  constructor({data, onEditClick, onFavoriteToggle}) {
    super();
    this.#data = data;
    this.#handleEditClick = onEditClick;
    this.#handleToggleFavorite = onFavoriteToggle;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#toggleFavoriteHandler);
  }

  get template() {
    return createEventTemplate(this.#data);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #toggleFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.#handleToggleFavorite();
  };
}
