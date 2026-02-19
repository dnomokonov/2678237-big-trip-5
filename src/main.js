import MockService from '@service/mockService';
import DestinationsModel from '@model/destinationsModel';
import OffersModel from '@model/offersModel';
import PointsModel from '@model/pointsModel';
import BoardPresenter from '@presenter/boardPresenter';
import FilterModel from '@model/filterModel';
import FilterPresenter from '@presenter/filterPresenter';

const boardContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const service = new MockService();
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);
const pointsModel = new PointsModel(service);
const filterModel = new FilterModel();

new FilterPresenter({
  filterContainer,
  filterModel,
  pointsModel,
}).init();

new BoardPresenter({
  boardContainer,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
}).init();
