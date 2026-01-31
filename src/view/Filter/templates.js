import {FilterType} from '@/const';

function createTripFilterTemplate(filters) {
  return filters.map((filter) => `
    <div class="trip-filters__filter">
        <input
            id="filter-${filter.type}"
            class="trip-filters__filter-input  visually-hidden"
            type="radio"
            name="trip-filter"
            value="${filter.type}"
            ${filter.type === FilterType.EVERYTHING ? 'checked' : ''}
            ${filter.count === 0 ? 'disabled' : ''}
        >
        <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
      </div>
  `).join('');
}

export function createFiltersTemplate(filters) {
  return `
    <form class="trip-filters" action="#" method="get">
      ${createTripFilterTemplate(filters)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
}
