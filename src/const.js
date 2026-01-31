import {isFuturePoint, isPastPoint, isPresentPoint} from '@utils/filterUtils';
import {
  toSortedByDay,
  toSortedByPrice,
  toSortedByTime
} from '@utils/sortUtils';

const MessagesBoard = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
  FAILED: 'Failed to load latest route information',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const filterByType = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentPoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point)),
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const sortByType = {
  [SortType.DAY]: (points) => points.sort(toSortedByDay),
  [SortType.EVENT]: null,
  [SortType.TIME]: (points) => points.sort(toSortedByTime),
  [SortType.PRICE]: (points) => points.sort(toSortedByPrice),
  [SortType.OFFERS]: null,
};

export {MessagesBoard, FilterType, filterByType, SortType, sortByType};
