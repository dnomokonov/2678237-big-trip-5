import Form from '@view/Form/Form';
import Point from '@view/Point/Point';
import ItemList from '@view/itemList/ItemList';

import {remove, render, replace} from '@framework/render';
import {appendElement} from '@utils/common';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #stateManager = null;
  #handleDataChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, stateManager, onDataChange}) {
    this.#pointListContainer = pointListContainer;
    this.#stateManager = stateManager;
    this.#handleDataChange = onDataChange;
  }

  init({point, destinations, offers}) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

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
      onCloseClick: this.#handleCloseForm ,
      onSubmitForm: this.#handleSubmitForm,
    });

    const itemList = new ItemList();
    appendElement(itemList, this.#pointComponent);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(itemList, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetToView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
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

  #handleCloseForm = () => {
    this.#replaceFormToPoint();
    this.#stateManager.closePresenter();
  };

  #handleSubmitForm = () => {
    this.#handleCloseForm();
  };

  #handleToggleFavorite = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
