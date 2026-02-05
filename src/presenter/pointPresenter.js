import Form from '@view/Form/Form';
import Point from '@view/Point/Point';
import ItemList from '@view/itemList/ItemList';

import {render, replace} from '@framework/render';
import {appendElement} from '@utils/common';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #stateManager = null;
  #onDataChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, stateManager, onDataChange}) {
    this.#pointListContainer = pointListContainer;
    this.#stateManager = stateManager;
    this.#onDataChange = onDataChange;
  }

  init({point, destinations, offers}) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#renderPoint();
  }

  resetToView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #renderPoint() {
    this.#pointComponent = new Point({
      data: {
        point: this.#point,
        destinations: this.#destinations,
        offers: this.#offers,
      },
      onEditClick: this.#handleEditClick,
      onFavoriteToggle: this.#handleToggleFavorite,
    });

    this.#pointEditComponent = new Form({
      data: {
        point: this.#point,
        destinations: this.#destinations,
        offers: this.#offers,
      },
      onCloseClick: this.#handleCloseFrom ,
      onSubmitForm: this.#handleSubmitForm,
    });

    const itemList = new ItemList();
    appendElement(itemList, this.#pointComponent);

    render(itemList, this.#pointListContainer);
  }

  #updatePoint() {
    const updatedPoint = new Point({
      data: {
        point: this.#point,
        destinations: this.#destinations,
        offers: this.#offers,
      },
      onEditClick: this.#handleEditClick,
      onFavoriteToggle: this.#handleToggleFavorite,
    });

    replace(updatedPoint, this.#pointComponent);
    this.#pointComponent = updatedPoint;
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    this.#stateManager.openPresenter(this);
  };

  #handleCloseFrom = () => {
    this.#replaceFormToPoint();
    this.#stateManager.closePresenter(this);
  };

  #handleSubmitForm = () => {
    this.#handleCloseFrom();
  };

  #handleToggleFavorite = () => {
    const updatedPoint = {...this.#point, isFavorite: !this.#point.isFavorite};
    this.#onDataChange(updatedPoint);
    this.#point = updatedPoint;
    this.#updatePoint();
  };
}
