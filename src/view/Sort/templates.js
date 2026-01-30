import {SortPoint} from '@/const';

function createSortItemsTemplate(sortItems) {
  return sortItems.map((item) => `
    <div class="trip-sort__item  trip-sort__item--${item.type}">
      <input
        id="sort-${item.type}"
        class="trip-sort__input  visually-hidden"
        type="radio" name="trip-sort"
        value="sort-${item.type}"
        ${item.type === SortPoint.DAY ? 'checked' : ''}
        ${item.isDisabled ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="sort-${item.type}">${item.type}</label>
    </div>
  `).join('');
}

export function createSortingTemplate(sortItems) {
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortItemsTemplate(sortItems)}
    </form>
  `;
}
