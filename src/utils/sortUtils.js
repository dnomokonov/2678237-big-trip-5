import dayjs from 'dayjs';
import {sortByType} from '@/const';

function toSortedByDay(a, b) {
  return dayjs(a.dateFrom).diff(dayjs(b.dateFrom));
}

function toSortedByTime(a, b) {
  const durationA = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
  const durationB = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
  return durationB - durationA;
}

function toSortedByPrice(a, b) {
  return b.basePrice - a.basePrice;
}

function generateSorts() {
  return Object.entries(sortByType).map(([type, method]) => ({
    type,
    isDisabled: !method,
  }));
}

export {
  toSortedByDay,
  toSortedByTime,
  toSortedByPrice,
  generateSorts
};
