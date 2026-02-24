import {generateSorts} from '@utils/sortUtils';
import {remove, render} from '@framework/render';
import {filterByType, FilterType, MessagesBoard, sortByType, SortType, UpdateType, UserAction} from '@/const';

import List from '@view/List/List';
import Sort from '@view/Sort/Sort';
import Message from '@view/Message/Message';

import PointPresenter from '@presenter/pointPresenter';
import PresenterState from '@/state/presenterState';
import NewPointPresenter from '@presenter/newPointPresenter';

export default class BoardPresenter {
  #boardContainer = null;
  #pointListComponent = new List();
  #messageComponent = null;
  #sortComponent = null;
  #newAddPointPresenter = null;

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #pointPresenters = new Map();
  #pointManagerState = new PresenterState();

  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortType.DAY;

  constructor({boardContainer, pointsModel, destinationsModel, offersModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newAddPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      stateManager: this.#pointManagerState,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModeEvent);
    this.#filterModel.addObserver(this.#handleModeEvent);
  }

  init() {
    this.#renderBoard();
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterByType[this.#filterType](points);

    return sortByType[this.#currentSortType](filteredPoints);
  }

  createNewPoint() {
    this.#newAddPointPresenter.init();
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  }

  #handleViewAction = (actionType, updateType, data) => {
    switch (actionType) {
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, data);
        break;
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, data);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, data);
        break;
    }
  };

  #handleModeEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      stateManager: this.#pointManagerState,
      onDataChange: this.#handleViewAction,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPointList(points) {
    render(this.#pointListComponent, this.#boardContainer);
    this.#renderPoints(points);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderSort() {
    const sorts = generateSorts();
    this.#sortComponent = new Sort({
      sorts,
      currentSortType: this.#currentSortType,
      onChangeSortType: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #handleSortTypeChange = (typeSort) => {
    if (this.#currentSortType === typeSort) {
      return;
    }

    this.#currentSortType = typeSort;

    this.#clearBoard();
    this.#renderBoard();
  };

  #clearBoard({resetSortType = false} = {}) {
    this.#clearPointList();

    remove(this.#sortComponent);

    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    const points = this.points;

    if (points.length === 0) {
      const currentFilterKey = this.#filterType.toUpperCase();
      this.#messageComponent = new Message({message: MessagesBoard[currentFilterKey]});
      render(this.#messageComponent, this.#boardContainer);
      return;
    }

    this.#renderSort();
    this.#renderPointList(points);
  }
}
