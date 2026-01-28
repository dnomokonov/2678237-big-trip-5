import {render} from '@framework/render';
import {appendElement} from '@utils/common';

import List from '@view/List/List';
import ItemList from '@view/itemList/ItemList';
import Filters from '@view/Filter/Filters';
import Sort from '@view/Sort/Sort';
import Point from '@view/Point/Point';

export default class Presenter {
  eventList = new List();
  tripEvents = document.querySelector('.trip-events');
  filters = document.querySelector('.trip-controls__filters');

  constructor({pointsModel, destinationsModel, offersModel}) {
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.points = [...this.pointsModel.get()];
    this.destinations = [...this.destinationsModel.get()];
    this.offers = [...this.offersModel.get()];

    render(new Filters(), this.filters);
    render(new Sort(), this.tripEvents);
    render(this.eventList, this.tripEvents);

    for (let i = 1; i < this.points.length - 1; i++) {
      const itemList = new ItemList();
      const currentPoint = this.points[i];
      appendElement(itemList, new Point({
        point: currentPoint,
        destination: this.destinationsModel.findDestination(currentPoint.destination),
        offers: this.offers,
      }));
      render(itemList, this.eventList.element);
    }
  }
}
