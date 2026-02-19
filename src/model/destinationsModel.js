export default class DestinationsModel {
  #destinations = [];

  constructor(service) {
    this.#destinations = service.getDestinations();
  }

  get destinations() {
    return this.#destinations;
  }
}
