import MockService from '@service/mockService';
import DestinationsModel from '@model/destinationsModel';
import OffersModel from '@model/offersModel';
import PointsModel from '@model/pointsModel';
import BoardPresenter from '@presenter/boardPresenter';
import FilterModel from '@model/filterModel';
import FilterPresenter from '@presenter/filterPresenter';

const boardContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const pointAddButton = document.querySelector('.trip-main__event-add-btn');

const service = new MockService();
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);
const pointsModel = new PointsModel(service);
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  pointsModel,
});

const boardPresenter = new BoardPresenter({
  boardContainer,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleCloseNewPoint
});

function handleCreateNewPoint() {
  boardPresenter.createNewPoint();
  pointAddButton.disabled = true;
}

function handleCloseNewPoint() {
  pointAddButton.disabled = false;
}

pointAddButton.addEventListener('click', handleCreateNewPoint);

filterPresenter.init();
boardPresenter.init();
