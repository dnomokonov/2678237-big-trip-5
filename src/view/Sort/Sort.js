import AbstractView from '@framework/view/abstract-view';
import {createFiltersTemplate} from '@view/Sort/templates';

export default class Sort extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}
