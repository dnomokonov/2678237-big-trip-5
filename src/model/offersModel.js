export default class OffersModel {
  #offers = [];

  constructor(service) {
    this.#offers = service.getOffers();
  }

  get offers() {
    return this.#offers;
  }
}
