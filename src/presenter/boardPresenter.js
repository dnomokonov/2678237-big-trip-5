import {generateFilters} from '@utils/filterUtils';
import {generateSorts} from '@utils/sortUtils';
import {render} from '@framework/render';
import {MessagesBoard, sortByType, SortType} from '@/const';

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

  #points = [];
  #sourcedPoints = [];
  #destinations = [];
  #offers = [];

  #pointPresenters = new Map();
  #pointManagerState = new PresenterState();

  #currentSortType = SortType.DAY;

  constructor({pointsModel, destinationsModel, offersModel}) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];

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

  #renderPointList() {
    render(this.#pointListComponent, this.#tripEvents);
    this.#renderPoints();
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderFilters() {
    const filters = generateFilters(this.#points);
    render(new Filters(filters), this.#filtersContainer);
  }

  #renderSort() {
    const sorts = generateSorts();
    render(new Sort({
      sorts,
      onChangeSortType: this.#handleSortTypeChange
    }), this.#tripEvents);
  }

  #handleSortTypeChange = (typeSort) => {
    if (this.#currentSortType === typeSort) {
      return;
    }

    this.#points = sortByType[typeSort](this.#sourcedPoints);
    this.#currentSortType = typeSort;

    this.#clearPointList();
    this.#renderPointList();
  };

  #renderBoard() {
    this.#renderFilters();

    if (this.#points.length === 0) {
      render(new Message({message: MessagesBoard.EVERYTHING}), this.#tripEvents);
      return;
    }

    this.#renderSort();
    this.#renderPointList();
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
