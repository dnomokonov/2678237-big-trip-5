import Observable from '@framework/observable';
import {UpdateType} from '@/const';

export default class OffersModel extends Observable {
  #service = null;
  #offers = [];

  constructor(service) {
    super();
    this.#service = service;
  }

  async init() {
    try {
      const response = await this.#service.offers;
      this.#offers = response;
      this._notify(UpdateType.INIT, {offersLoad: true});
    } catch (err) {
      this.#offers = [];
      this._notify(UpdateType.ERROR);
      throw err;
    }
  }

  get offers() {
    return this.#offers;
  }
}
