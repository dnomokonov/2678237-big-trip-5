import {isFuturePoint, isPastPoint, isPresentPoint} from '@utils/filterUtils';
import {isSortByDay, isSortByPrice, isSortByTime} from '@utils/sortUtils';

const MessagesBoard = {
  EVERTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no present events now',
  FAILED: 'Failed to load latest route information',
};

const FilterPoint = {
  EVERTHING: 'everthing',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const filter = {
  [FilterPoint.EVERTHING]: (points) => points,
  [FilterPoint.FUTURE]: (points) => points.filter((point) => isFuturePoint(point)),
  [FilterPoint.PRESENT]: (points) => points.filter((point) => isPresentPoint(point)),
  [FilterPoint.PAST]: (points) => points.filter((point) => isPastPoint(point)),
};

const SortPoint = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const sort = {
  [SortPoint.DAY]: (points) => points.sort(isSortByDay),
  [SortPoint.EVENT]: null,
  [SortPoint.TIME]: (points) => points.sort(isSortByTime),
  [SortPoint.PRICE]: (points) => points.sort(isSortByPrice),
  [SortPoint.OFFERS]: null,
};

export {MessagesBoard, FilterPoint, filter, SortPoint, sort};
