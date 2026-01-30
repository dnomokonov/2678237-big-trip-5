import {isFuturePoint, isPastPoint, isPresentPoint} from '@utils/filterUtils';

const MessagesBoard = {
  EVERTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no present events now',
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

export {MessagesBoard, FilterPoint, filter};
