import dayjs from 'dayjs';
import {sort} from '@/const';

function isSortByDay(a, b) {
  return dayjs(a.dateFrom).diff(dayjs(b.dateFrom));
}

function isSortByTime(a, b) {
  const durationA = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
  const durationB = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
  return durationB - durationA;
}

function isSortByPrice(a, b) {
  return b.basePrice - a.basePrice;
}

function generateSorts() {
  return Object.entries(sort).map(([type, method]) => ({
    type,
    isDisabled: !method,
  }));
}

export {
  isSortByDay,
  isSortByTime,
  isSortByPrice,
  generateSorts
};
