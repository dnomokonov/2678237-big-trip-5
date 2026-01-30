import AbstractView from '@framework/view/abstract-view';
import {createFiltersTemplate} from './templates';

export default class Filters extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}
