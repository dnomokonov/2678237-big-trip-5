import AbstractView from '@framework/view/abstract-view';
import {createSortingTemplate} from './templates';

export default class Sort extends AbstractView {
  get template() {
    return createSortingTemplate();
  }
}
