export default class PointsModel {
  #points = [];
  #service = null;

  constructor(service) {
    this.#service = service;
    this.#points = service.getPoints();
  }

  get points() {
    return this.#points;
  }

  updatePoint(updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if(index === -1) {
      return;
    }

    this.#points[index] = updatedPoint;
  }
}
