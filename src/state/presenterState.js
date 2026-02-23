export default class PresenterState {
  #currentPresenter = null;

  openPresenter(presenter) {
    if (this.#currentPresenter && this.#currentPresenter !== presenter) {
      if (!this.#currentPresenter.resetToView) {
        this.#currentPresenter.destroy();
      } else {
        this.#currentPresenter.resetToView();
      }
    }
    this.#currentPresenter = presenter;
  }

  closePresenter() {
    this.#currentPresenter = null;
  }
}
