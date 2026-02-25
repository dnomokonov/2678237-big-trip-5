export default class PointDataAdapter {
  static fromApi(point) {
    return {
      id: point['id'],
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      destination: point['destination'],
      isFavorite: point['is_favorite'],
      offers: point['offers'],
      type: point['type']
    };
  }

  static listFromApi(points) {
    return points.map(PointDataAdapter.fromApi);
  }

  static toApi(point) {
    return {
      'id': point.id,
      'base_price': point.base_price,
      'date_from': point.date_from,
      'date_to': point.dateTo,
      'destination': point.destination,
      'is_favorite': point.isFavorite,
      'offers': point.offers,
      'type': point.type,
    };
  }
}
