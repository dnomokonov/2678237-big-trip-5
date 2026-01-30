import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import {filter} from '@/const';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function isFuturePoint(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPresentPoint(point) {
  return dayjs().isSameOrAfter(point.dateFrom) && dayjs().isSameOrBefore(point.dateTo);
}

function isPastPoint(point) {
  return dayjs().isAfter(point.dateTo);
}

function generateFilters(points) {
  return Object.entries(filter).map(([filterType, filterFn]) => ({
    type: filterType,
    count: filterFn(points).length,
  }));
}

export { isFuturePoint, isPresentPoint, isPastPoint, generateFilters };
