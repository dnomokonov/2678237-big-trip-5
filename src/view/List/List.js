import AbstractView from '@framework/view/abstract-view';
import {createEventsListTemplate} from '@view/List/templates';

export default class List extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}
