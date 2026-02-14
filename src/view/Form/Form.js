import {createFormTemplate} from './templates';
import AbstractStatefulView from '@framework/view/abstract-stateful-view';

export default class Form extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleCloseEdit = null;
  #handleSubmitForm = null;

  constructor({point, destinations, offers, onCloseClick, onSubmitForm}) {
    super();
    this._setState(point);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleCloseEdit = onCloseClick;
    this.#handleSubmitForm = onSubmitForm;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandleClick);
    this.element.addEventListener('submit', this.#submitHandleClick);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#handleTypeChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#handleDestinationChange);
  }

  get template() {
    return createFormTemplate({
      point: this._state,
      destinations: this.#destinations,
      offers: this.#offers
    });
  }

  reset(point) {
    this.updateElement(point);
  }

  #closeHandleClick = (evt) => {
    evt.preventDefault();
    this.#handleCloseEdit();
  };

  #submitHandleClick = (evt) => {
    evt.preventDefault();
    this.#handleSubmitForm();
  };

  #handleTypeChange = (evt) => {
    if (evt.target.name === 'event-type') {
      const newType = evt.target.value;
      this.updateElement({ type: newType });
    }
  };

  #handleDestinationChange = (evt) => {
    const selectedDestinationName = evt.target.value;
    const selectedDestination = this.#destinations.find((destination) => destination.name === selectedDestinationName);

    if (!selectedDestination) {
      evt.target.classList.add('event__input--error');
      this.element.querySelector('.event__save-btn').disabled = true;
      return;
    }

    this.updateElement({destination: selectedDestination.id});
  };
}
