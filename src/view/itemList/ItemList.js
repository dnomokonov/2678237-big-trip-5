import AbstractView from '@framework/view/abstract-view';
import {createItemListTemplate} from './templates';

export default class ItemList extends AbstractView {
  get template() {
    return createItemListTemplate();
  }
}
