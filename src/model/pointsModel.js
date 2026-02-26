import Observable from '@framework/observable';
import PointDataAdapter from '@/adapter/pointDataAdapter';
import {UpdateType} from '@/const';

export default class PointsModel extends Observable {
  #service = null;
  #points = [];

  constructor(service) {
    super();
    this.#service = service;
  }

  async init() {
    try {
      const points = await this.#service.points;
      this.#points = PointDataAdapter.listFromApi(points);
      this._notify(UpdateType.INIT, {pointsLoad: true});
    } catch (err) {
      this.#points = [];
      this._notify(UpdateType.ERROR);
      throw err;
    }
  }

  get points() {
    return this.#points;
  }

  addPoint(updateType, newPoint) {
    this.#points.push(newPoint);
    this._notify(updateType, newPoint);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Could not update points for ${update.id}`);
    }

    try {
      const response = await this.#service.updatePoint(update);
      const updatedPoint = PointDataAdapter.fromApi(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error(`Could not update points for ${update.id}`);
    }
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
