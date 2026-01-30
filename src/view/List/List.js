import AbstractView from '@framework/view/abstract-view';
import {createEventsListTemplate} from './templates';

export default class List extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}
