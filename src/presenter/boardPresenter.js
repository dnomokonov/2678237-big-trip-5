import {generateFilters} from '@utils/filterUtils';
import {generateSorts} from '@utils/sortUtils';
import {render} from '@framework/render';
import {MessagesBoard} from '@/const';

import List from '@view/List/List';
import Filters from '@view/Filter/Filters';
import Sort from '@view/Sort/Sort';
import Message from '@view/Message/Message';

import PointPresenter from '@presenter/pointPresenter';
import PresenterState from '@/state/presenterState';

export default class BoardPresenter {
  #pointListComponent = new List();
  #tripEvents = document.querySelector('.trip-events');
  #filtersContainer = document.querySelector('.trip-controls__filters');

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #points = null;
  #destinations = null;
  #offers = null;

  #pointPresenters = new Map();
  #pointManagerState = new PresenterState();

  constructor({pointsModel, destinationsModel, offersModel}) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#destinationsModel.get()];
    this.#offers = [...this.#offersModel.get()];

    this.#renderBoard();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      stateManager: this.#pointManagerState,
      onDataChange: this.#handlePointChange,
    });
    pointPresenter.init({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
    });
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderFilters() {
    const filters = generateFilters(this.#points);
    render(new Filters(filters), this.#filtersContainer);
  }

  #renderSorting() {
    const sorts = generateSorts();
    render(new Sort(sorts), this.#tripEvents);
  }

  #renderBoard() {
    this.#renderFilters();
    this.#renderSorting();

    if (this.#points.length === 0) {
      render(new Message({message: MessagesBoard.EVERYTHING}), this.#tripEvents);
      return;
    }

    render(this.#pointListComponent, this.#tripEvents);
    this.#renderPoints();
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointsModel.updatePoint(updatedPoint);
    this.#points = [...this.#pointsModel.points];
    this.#pointPresenters.get(updatedPoint.id).init({
      point: updatedPoint,
      destinations: this.#destinations,
      offers: this.#offers,
    });
  };
}
