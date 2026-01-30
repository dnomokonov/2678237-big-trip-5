import {render, replace} from '@framework/render';
import {appendElement} from '@utils/common';

import List from '@view/List/List';
import ItemList from '@view/itemList/ItemList';
import Filters from '@view/Filter/Filters';
import Sort from '@view/Sort/Sort';
import Point from '@view/Point/Point';
import Form from '@view/Form/Form';

export default class Presenter {
  #eventList = new List();
  #tripEvents = document.querySelector('.trip-events');
  #filtersContainer = document.querySelector('.trip-controls__filters');

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({pointsModel, destinationsModel, offersModel}) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.points = [...this.#pointsModel.get()];
    this.destinations = [...this.#destinationsModel.get()];
    this.offers = [...this.#offersModel.get()];

    render(new Filters(), this.#filtersContainer);
    render(new Sort(), this.#tripEvents);
    render(this.#eventList, this.#tripEvents);

    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint({
        point: this.points[i],
        destinations: this.destinations,
        offers: this.offers,
      });
    }
  }

  #renderPoint(data) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointEditForm = new Form({
      data,
      onEditClick: () => {
        replaceFormToPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onSubmitForm: () => {
        replaceFormToPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointComponent = new Point({
      data,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditForm, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditForm);
    }

    const itemList = new ItemList();
    appendElement(itemList, pointComponent);
    render(itemList, this.#eventList.element);
  }

}
