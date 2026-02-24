import Form from '@view/Form/Form';
import ItemList from '@view/itemList/ItemList';
import {appendElement} from '@utils/common';
import {remove, render, RenderPosition} from '@framework/render';
import {BLANK_POINT, UpdateType, UserAction} from '@/const';
import { v4 as uuidv4 } from 'uuid';

export default class NewPointPresenter {
  #pointListContainer = null;
  #stateManager = null;

  #handleDataChange = null;
  #handleDestroy = null;

  #destinationsModel = null;
  #offersModel = null;

  #pointEditComponent = null;
  #itemListComponent = new ItemList();

  constructor({pointListContainer, destinationsModel, offersModel, stateManager, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#stateManager = stateManager;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init = () => {
    if (this.#pointEditComponent !== null) {
      return;
    }

    const availableTypes = this.#offersModel.offers;
    const defaultType = availableTypes.length > 0 ? availableTypes[0].type : '';

    this.#pointEditComponent = new Form({
      point: {...BLANK_POINT, type: defaultType},
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      onSubmitForm: this.#handleSubmitForm,
      onCloseForm: this.#handleCloseClick
    });

    appendElement(this.#itemListComponent, this.#pointEditComponent);
    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    this.#stateManager.openPresenter(this);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    remove(this.#itemListComponent);
    this.#pointEditComponent = null;

    this.#stateManager.closePresenter();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleSubmitForm = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: uuidv4(), ...point}
    );
    this.destroy();
  };

  #handleCloseClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
