import Observable from '@framework/observable';

export default class PointsModel extends Observable {
  #points = [];
  #service = null;

  constructor(service) {
    super();
    this.#service = service;
    this.#points = service.getPoints();
  }

  get points() {
    return this.#points;
  }

  addPoint(updateType, newPoint) {
    this.#points.push(newPoint);
    this._notify(updateType, newPoint);
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Could not update points for ${update.id}`);
    }

    this.#points[index] = update;

    this._notify(updateType, update);
  }

  deletePoint(updateType, pointId) {
    const index = this.#points.findIndex((p) => p.id === pointId);

    if (index === -1) {
      throw new Error(`Could not delete point for ${pointId}`);
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, pointId);
  }
}
