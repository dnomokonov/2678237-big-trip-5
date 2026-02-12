import {createFormTemplate} from './templates';
import AbstractStatefulView from '@framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {FORM_DATEPICKER} from '@utils/dateUtils';

export default class Form extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleCloseEdit = null;
  #handleSubmitForm = null;
  #datepickerFrom = null;
  #datepickerTo = null;

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

    this.#setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
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

  #setDatepicker() {
    const [dateFromInput, dateToInput] = this.element.querySelectorAll('.event__input--time');

    this.#datepickerFrom = flatpickr(
      dateFromInput,
      {
        dateFormat: FORM_DATEPICKER,
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#handleDateFromChange
      }
    );

    this.#datepickerTo = flatpickr(
      dateToInput,
      {
        dateFormat: FORM_DATEPICKER,
        enableTime: true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#handleDateToChange
      }
    );
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

  #handleDateFromChange = ([selectedDate]) => {
    this._setState({ dateFrom: selectedDate.toISOString() });

    if (this.#datepickerTo) {
      this.#datepickerTo.set('minDate', selectedDate);
    }
  };

  #handleDateToChange = ([selectedDate]) => {
    this._setState({ dateTo: selectedDate.toISOString() });
  };
}
